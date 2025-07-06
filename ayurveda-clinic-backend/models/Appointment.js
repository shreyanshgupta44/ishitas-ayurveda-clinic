const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  // Basic Information
  appointmentId: {
    type: String,
    unique: true,
    default: function() {
      return 'APT' + Date.now() + Math.floor(Math.random() * 1000);
    }
  },
  
  // Patient Information
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient is required']
  },
  
  // Appointment Details
  appointmentType: {
    type: String,
    required: [true, 'Appointment type is required'],
    enum: ['initial', 'followup', 'online', 'emergency', 'treatment']
  },
  
  consultationType: {
    type: String,
    required: [true, 'Consultation type is required'],
    enum: [
      'general-consultation',
      'panchakarma',
      'herbal-consultation',
      'diet-nutrition',
      'stress-management',
      'womens-health',
      'skin-hair-treatment',
      'chronic-disease',
      'detox-program',
      'follow-up'
    ]
  },
  
  // Date and Time
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Appointment date must be in the future'
    }
  },
  
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  
  duration: {
    type: Number,
    default: 60, // minutes
    min: [15, 'Minimum appointment duration is 15 minutes'],
    max: [180, 'Maximum appointment duration is 3 hours']
  },
  
  // Status
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'],
    default: 'scheduled'
  },
  
  // Urgency
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  
  // Location
  location: {
    type: String,
    enum: ['clinic', 'online', 'home-visit'],
    default: 'clinic'
  },
  
  // Online Meeting Details (for virtual consultations)
  onlineMeeting: {
    platform: {
      type: String,
      enum: ['zoom', 'google-meet', 'teams', 'whatsapp', 'phone']
    },
    meetingLink: String,
    meetingId: String,
    password: String
  },
  
  // Reason and Symptoms
  reasonForVisit: {
    type: String,
    required: [true, 'Reason for visit is required']
  },
  
  symptoms: [String],
  
  currentSymptoms: {
    description: String,
    severity: {
      type: Number,
      min: 1,
      max: 10
    },
    duration: String
  },
  
  // Previous Medical History for this appointment
  previousTreatments: [String],
  currentMedications: [String],
  allergies: [String],
  
  // Pre-appointment Information
  preAppointmentNotes: String,
  
  // Consultation Details (filled during/after appointment)
  consultationNotes: {
    chiefComplaint: String,
    historyOfPresentIllness: String,
    pastMedicalHistory: String,
    familyHistory: String,
    socialHistory: String,
    reviewOfSystems: String
  },
  
  // Ayurvedic Assessment
  ayurvedicAssessment: {
    prakriti: String, // Body constitution
    vikriti: String, // Current imbalances
    pulseReading: {
      vata: String,
      pitta: String,
      kapha: String,
      overall: String
    },
    tongueExamination: String,
    eyeExamination: String,
    skinExamination: String,
    generalAppearance: String
  },
  
  // Diagnosis
  diagnosis: {
    primary: String,
    secondary: [String],
    ayurvedicDiagnosis: String,
    westernDiagnosis: String
  },
  
  // Treatment Plan
  treatmentPlan: {
    medicines: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }],
    therapies: [{
      type: String,
      duration: String,
      frequency: String,
      notes: String
    }],
    dietaryRecommendations: String,
    lifestyleChanges: String,
    exerciseRecommendations: String,
    followUpInstructions: String
  },
  
  // Prescriptions
  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }],
  
  // Payment Information
  payment: {
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Payment amount cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'partial', 'failed', 'refunded'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['cash', 'card', 'online', 'insurance', 'bank-transfer']
    },
    transactionId: String,
    paidAt: Date
  },
  
  // Follow-up
  followUp: {
    required: {
      type: Boolean,
      default: false
    },
    scheduledDate: Date,
    notes: String,
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  },
  
  // Communication
  notifications: {
    emailSent: {
      type: Boolean,
      default: false
    },
    smsSent: {
      type: Boolean,
      default: false
    },
    reminderSent: {
      type: Boolean,
      default: false
    }
  },
  
  // Doctor Notes
  doctorNotes: String,
  
  // Patient Feedback
  patientFeedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    submittedAt: Date
  },
  
  // Cancellation
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['patient', 'doctor', 'clinic', 'system']
    },
    cancelledAt: Date,
    refundAmount: Number
  },
  
  // Rescheduling
  rescheduling: {
    originalDate: Date,
    originalTime: String,
    reason: String,
    rescheduledBy: {
      type: String,
      enum: ['patient', 'doctor', 'clinic', 'system']
    },
    rescheduledAt: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for appointment datetime
AppointmentSchema.virtual('appointmentDateTime').get(function() {
  if (this.appointmentDate && this.appointmentTime) {
    const [hours, minutes] = this.appointmentTime.split(':');
    const dateTime = new Date(this.appointmentDate);
    dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return dateTime;
  }
  return null;
});

// Virtual for end time
AppointmentSchema.virtual('endTime').get(function() {
  if (this.appointmentDateTime && this.duration) {
    const endTime = new Date(this.appointmentDateTime);
    endTime.setMinutes(endTime.getMinutes() + this.duration);
    return endTime;
  }
  return null;
});

// Virtual to check if appointment is today
AppointmentSchema.virtual('isToday').get(function() {
  if (this.appointmentDate) {
    const today = new Date();
    const appointmentDate = new Date(this.appointmentDate);
    return today.toDateString() === appointmentDate.toDateString();
  }
  return false;
});

// Virtual to check if appointment is upcoming
AppointmentSchema.virtual('isUpcoming').get(function() {
  if (this.appointmentDateTime) {
    return this.appointmentDateTime > new Date();
  }
  return false;
});

// Middleware to validate no overlapping appointments
AppointmentSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('appointmentDate') || this.isModified('appointmentTime')) {
    const startTime = this.appointmentDateTime;
    const endTime = this.endTime;
    
    if (startTime && endTime) {
      const overlapping = await this.constructor.findOne({
        _id: { $ne: this._id },
        appointmentDate: this.appointmentDate,
        $or: [
          {
            $and: [
              { appointmentTime: { $lte: this.appointmentTime } },
              { $expr: { $gte: [{ $add: ['$appointmentDateTime', { $multiply: ['$duration', 60000] }] }, startTime] } }
            ]
          },
          {
            $and: [
              { appointmentTime: { $gte: this.appointmentTime } },
              { appointmentTime: { $lt: this.appointmentTime } }
            ]
          }
        ],
        status: { $in: ['scheduled', 'confirmed', 'in-progress'] }
      });
      
      if (overlapping) {
        return next(new Error('Appointment time slot is already booked'));
      }
    }
  }
  next();
});

// Indexes for better performance
AppointmentSchema.index({ patient: 1 });
AppointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });
AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ appointmentId: 1 });
AppointmentSchema.index({ consultationType: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema); 