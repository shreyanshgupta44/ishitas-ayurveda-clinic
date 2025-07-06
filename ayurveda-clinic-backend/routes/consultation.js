const express = require('express');
const { body, validationResult } = require('express-validator');
const ConsultationRequest = require('../models/ConsultationRequest');
const router = express.Router();

// @desc    Submit consultation request
// @route   POST /api/consultation
// @access  Public
router.post('/', [
  // Personal Information Validation
  body('firstName', 'First name is required').notEmpty().trim().isLength({ min: 2, max: 50 }),
  body('lastName', 'Last name is required').notEmpty().trim().isLength({ min: 2, max: 50 }),
  body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  body('phone', 'Phone number is required').notEmpty().trim(),
  body('age', 'Age is required and must be between 1 and 120').isInt({ min: 1, max: 120 }),
  body('gender', 'Gender is required').isIn(['male', 'female', 'other']),
  
  // Consultation Details Validation
  body('consultationType', 'Consultation type is required').isIn(['online', 'in-person']),
  body('preferredDate', 'Preferred date is required').notEmpty().trim(),
  body('preferredTime', 'Preferred time is required').notEmpty().trim(),
  
  // Health Information Validation
  body('healthConcerns', 'Health concerns are required').notEmpty().trim().isLength({ max: 1000 }),
  body('symptoms').optional().trim().isLength({ max: 500 }),
  body('currentMedications').optional().trim().isLength({ max: 500 }),
  body('previousVisit').optional().isBoolean(),
  
  // Emergency Contact Validation (optional)
  body('emergencyContact.name').optional().trim().isLength({ max: 100 }),
  body('emergencyContact.phone').optional().trim(),
  body('emergencyContact.relationship').optional().trim().isLength({ max: 50 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      consultationType,
      preferredDate,
      preferredTime,
      healthConcerns,
      symptoms,
      currentMedications,
      previousVisit,
      emergencyContact
    } = req.body;

    // Create new consultation request
    const consultationRequest = new ConsultationRequest({
      firstName,
      lastName,
      email,
      phone,
      age,
      gender,
      consultationType,
      preferredDate,
      preferredTime,
      healthConcerns,
      symptoms,
      currentMedications,
      previousVisit,
      emergencyContact
    });

    // Save to database
    await consultationRequest.save();

    // Log the successful submission
    console.log('New consultation request submitted:', {
      id: consultationRequest._id,
      name: `${firstName} ${lastName}`,
      email,
      consultationType,
      timestamp: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully! We will contact you soon.',
      data: {
        id: consultationRequest._id,
        status: consultationRequest.status
      }
    });

  } catch (error) {
    console.error('Consultation submission error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A consultation request with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get all consultation requests (for admin use)
// @route   GET /api/consultation
// @access  Private (you can add authentication later)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const consultationRequests = await ConsultationRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ConsultationRequest.countDocuments(query);

    res.json({
      success: true,
      data: consultationRequests,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });

  } catch (error) {
    console.error('Get consultation requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @desc    Get consultation request by ID
// @route   GET /api/consultation/:id
// @access  Private (you can add authentication later)
router.get('/:id', async (req, res) => {
  try {
    const consultationRequest = await ConsultationRequest.findById(req.params.id);
    
    if (!consultationRequest) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found'
      });
    }

    res.json({
      success: true,
      data: consultationRequest
    });

  } catch (error) {
    console.error('Get consultation request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @desc    Update consultation request status
// @route   PUT /api/consultation/:id/status
// @access  Private (you can add authentication later)
router.put('/:id/status', [
  body('status', 'Status is required').isIn(['pending', 'confirmed', 'cancelled', 'completed']),
  body('notes').optional().trim().isLength({ max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { status, notes } = req.body;

    const consultationRequest = await ConsultationRequest.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!consultationRequest) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found'
      });
    }

    res.json({
      success: true,
      message: 'Consultation request status updated successfully',
      data: consultationRequest
    });

  } catch (error) {
    console.error('Update consultation status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router; 