const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  
  // Authentication
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't return password in queries by default
  },
  
  // Role and Permissions
  role: {
    type: String,
    required: [true, 'User role is required'],
    enum: ['admin', 'doctor', 'staff', 'receptionist'],
    default: 'staff'
  },
  
  permissions: {
    canViewPatients: {
      type: Boolean,
      default: false
    },
    canEditPatients: {
      type: Boolean,
      default: false
    },
    canCreateAppointments: {
      type: Boolean,
      default: false
    },
    canModifyAppointments: {
      type: Boolean,
      default: false
    },
    canViewReports: {
      type: Boolean,
      default: false
    },
    canManageUsers: {
      type: Boolean,
      default: false
    },
    canAccessFinances: {
      type: Boolean,
      default: false
    }
  },
  
  // Professional Information
  professionalInfo: {
    title: {
      type: String,
      enum: ['Dr.', 'Mr.', 'Ms.', 'Mrs.', 'Prof.', 'Vaidya']
    },
    designation: String,
    department: String,
    specialization: [String],
    qualifications: [String],
    experience: Number, // years
    licenseNumber: String,
    registrationNumber: String
  },
  
  // Contact Information
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  
  // Employment Details
  employment: {
    employeeId: {
      type: String,
      unique: true,
      sparse: true
    },
    joiningDate: Date,
    workingHours: {
      monday: { start: String, end: String, available: { type: Boolean, default: true } },
      tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
      wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
      thursday: { start: String, end: String, available: { type: Boolean, default: true } },
      friday: { start: String, end: String, available: { type: Boolean, default: true } },
      saturday: { start: String, end: String, available: { type: Boolean, default: true } },
      sunday: { start: String, end: String, available: { type: Boolean, default: false } }
    },
    salary: Number,
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended', 'terminated'],
      default: 'active'
    }
  },
  
  // Profile
  profileImage: String,
  bio: String,
  languages: [String],
  
  // Security
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  
  // Two-Factor Authentication
  twoFactorAuth: {
    enabled: {
      type: Boolean,
      default: false
    },
    secret: String,
    backupCodes: [String]
  },
  
  // Preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    language: {
      type: String,
      default: 'en'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      desktop: {
        type: Boolean,
        default: true
      }
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  
  // Activity Tracking
  lastActivity: Date,
  isOnline: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  const title = this.professionalInfo?.title || '';
  return `${title} ${this.firstName} ${this.lastName}`.trim();
});

// Virtual for account locked
UserSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to set permissions based on role
UserSchema.pre('save', function(next) {
  if (this.isModified('role')) {
    switch (this.role) {
      case 'admin':
        this.permissions = {
          canViewPatients: true,
          canEditPatients: true,
          canCreateAppointments: true,
          canModifyAppointments: true,
          canViewReports: true,
          canManageUsers: true,
          canAccessFinances: true
        };
        break;
      case 'doctor':
        this.permissions = {
          canViewPatients: true,
          canEditPatients: true,
          canCreateAppointments: true,
          canModifyAppointments: true,
          canViewReports: true,
          canManageUsers: false,
          canAccessFinances: false
        };
        break;
      case 'staff':
        this.permissions = {
          canViewPatients: true,
          canEditPatients: false,
          canCreateAppointments: true,
          canModifyAppointments: true,
          canViewReports: false,
          canManageUsers: false,
          canAccessFinances: false
        };
        break;
      case 'receptionist':
        this.permissions = {
          canViewPatients: true,
          canEditPatients: false,
          canCreateAppointments: true,
          canModifyAppointments: true,
          canViewReports: false,
          canManageUsers: false,
          canAccessFinances: false
        };
        break;
    }
  }
  next();
});

// Method to check password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      role: this.role,
      email: this.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

// Method to generate password reset token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Method to increment login attempts
UserSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 attempts for 30 minutes
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 30 * 60 * 1000 }; // 30 minutes
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
UserSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Static method to get available doctors for a specific date/time
UserSchema.statics.getAvailableDoctors = function(date, time) {
  const dayOfWeek = new Date(date).toLocaleLowerCase();
  const dayMapping = {
    'sunday': 'sunday',
    'monday': 'monday',
    'tuesday': 'tuesday',
    'wednesday': 'wednesday',
    'thursday': 'thursday',
    'friday': 'friday',
    'saturday': 'saturday'
  };
  
  const day = dayMapping[dayOfWeek];
  
  return this.find({
    role: 'doctor',
    'employment.status': 'active',
    [`employment.workingHours.${day}.available`]: true,
    [`employment.workingHours.${day}.start`]: { $lte: time },
    [`employment.workingHours.${day}.end`]: { $gte: time }
  });
};

// Indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'employment.employeeId': 1 });
UserSchema.index({ 'employment.status': 1 });

module.exports = mongoose.model('User', UserSchema); 