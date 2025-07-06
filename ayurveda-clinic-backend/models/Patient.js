const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  // Personal Information
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
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [150, 'Age cannot exceed 150']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },

  // Medical Information
  medicalHistory: {
    allergies: [String],
    currentMedications: [String],
    previousTreatments: [String],
    chronicConditions: [String],
    surgeries: [String]
  },

  // Ayurvedic Assessment
  ayurvedicProfile: {
    primaryDosha: {
      type: String,
      enum: ['vata', 'pitta', 'kapha', 'vata-pitta', 'pitta-kapha', 'vata-kapha', 'tridoshic']
    },
    secondaryDosha: {
      type: String,
      enum: ['vata', 'pitta', 'kapha']
    },
    constitution: {
      type: String,
      enum: ['vata', 'pitta', 'kapha', 'mixed']
    },
    currentImbalance: [String],
    pulseReading: String,
    tongueExamination: String
  },

  // Health Concerns
  primaryConcern: {
    type: String,
    required: [true, 'Primary health concern is required']
  },
  symptoms: [String],
  symptomsStartDate: Date,
  symptomsFrequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'occasionally', 'rarely']
  },

  // Lifestyle Information
  lifestyle: {
    occupation: String,
    workSchedule: String,
    stressLevel: {
      type: Number,
      min: 1,
      max: 10
    },
    sleepPattern: {
      averageHours: Number,
      sleepTime: String,
      wakeTime: String,
      sleepQuality: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'poor']
      }
    },
    exercise: {
      frequency: String,
      type: [String],
      duration: String
    },
    diet: {
      type: {
        type: String,
        enum: ['vegetarian', 'vegan', 'non-vegetarian', 'pescatarian', 'other']
      },
      allergies: [String],
      preferences: [String],
      eatingHabits: String
    }
  },

  // Emergency Contact
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required']
    },
    relationship: String,
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required']
    },
    email: String
  },

  // Clinic Information
  patientId: {
    type: String,
    unique: true,
    default: function() {
      return 'PAT' + Date.now() + Math.floor(Math.random() * 1000);
    }
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastVisit: Date,
  totalVisits: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discharged'],
    default: 'active'
  },

  // Treatment History
  treatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  }],

  // Appointments
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],

  // Notes
  doctorNotes: [String],
  patientNotes: String,

  // Consent and Legal
  consentGiven: {
    type: Boolean,
    required: true,
    default: false
  },
  dataProcessingConsent: {
    type: Boolean,
    required: true,
    default: false
  },
  marketingConsent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
PatientSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age calculation if not provided
PatientSchema.virtual('calculatedAge').get(function() {
  if (this.age) return this.age;
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return null;
});

// Middleware to update age before saving
PatientSchema.pre('save', function(next) {
  if (this.dateOfBirth && !this.age) {
    this.age = this.calculatedAge;
  }
  next();
});

// Index for faster queries
PatientSchema.index({ email: 1 });
PatientSchema.index({ phone: 1 });
PatientSchema.index({ patientId: 1 });
PatientSchema.index({ 'firstName': 1, 'lastName': 1 });

module.exports = mongoose.model('Patient', PatientSchema); 