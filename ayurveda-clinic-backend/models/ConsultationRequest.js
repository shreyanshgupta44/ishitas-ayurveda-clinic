const mongoose = require('mongoose');

const ConsultationRequestSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age cannot be more than 120']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },

  // Consultation Details
  consultationType: {
    type: String,
    required: [true, 'Consultation type is required'],
    enum: ['online', 'in-person']
  },
  preferredDate: {
    type: String,
    required: [true, 'Preferred date is required']
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required']
  },

  // Health Information
  healthConcerns: {
    type: String,
    required: [true, 'Health concerns are required'],
    trim: true,
    maxlength: [1000, 'Health concerns cannot be more than 1000 characters']
  },
  symptoms: {
    type: String,
    trim: true,
    maxlength: [500, 'Symptoms cannot be more than 500 characters']
  },
  currentMedications: {
    type: String,
    trim: true,
    maxlength: [500, 'Current medications cannot be more than 500 characters']
  },
  previousVisit: {
    type: Boolean,
    default: false
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Emergency contact name cannot be more than 100 characters']
    },
    phone: {
      type: String,
      trim: true
    },
    relationship: {
      type: String,
      trim: true,
      maxlength: [50, 'Relationship cannot be more than 50 characters']
    }
  },

  // Status and Timestamps
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  }
}, {
  timestamps: true
});

// Create indexes for better query performance (only status and createdAt since email is already indexed in schema)
ConsultationRequestSchema.index({ status: 1 });
ConsultationRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ConsultationRequest', ConsultationRequestSchema, 'consultationrequests'); 