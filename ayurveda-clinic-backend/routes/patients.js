const express = require('express');
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const { protect, authorize, checkPermission } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
router.get('/', protect, checkPermission('read_patients'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Search by name, phone, or email
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = {
        $or: [
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
          { phone: searchRegex }
        ]
      };
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Get patients
    const patients = await Patient.find(query)
      .select('-medicalHistory.detailedHistory -ayurvedicAssessment.detailedAssessment')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Patient.countDocuments(query);

    res.json({
      success: true,
      count: patients.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      patients
    });

  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
router.get('/:id', protect, checkPermission('read_patients'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      patient
    });

  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private
router.post('/', protect, checkPermission('create_patients'), [
  body('firstName', 'First name is required').notEmpty().trim(),
  body('lastName', 'Last name is required').notEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  body('phone', 'Phone number is required').notEmpty(),
  body('dateOfBirth', 'Date of birth is required').isDate(),
  body('gender', 'Gender is required').isIn(['male', 'female', 'other'])
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

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ 
      $or: [
        { email: req.body.email },
        { phone: req.body.phone }
      ]
    });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'Patient with this email or phone already exists'
      });
    }

    // Create patient
    const patient = await Patient.create({
      ...req.body,
      registeredBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      patient
    });

  } catch (error) {
    console.error('Create patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
router.put('/:id', protect, checkPermission('update_patients'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Update patient
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user.id },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Patient updated successfully',
      patient: updatedPatient
    });

  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Soft delete
    await Patient.findByIdAndUpdate(req.params.id, {
      status: 'inactive',
      updatedBy: req.user.id
    });

    res.json({
      success: true,
      message: 'Patient deactivated successfully'
    });

  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update patient medical history
// @route   PUT /api/patients/:id/medical-history
// @access  Private
router.put('/:id/medical-history', protect, checkPermission('update_patients'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Update medical history
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { 
        medicalHistory: req.body,
        updatedBy: req.user.id 
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Medical history updated successfully',
      patient: updatedPatient
    });

  } catch (error) {
    console.error('Update medical history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update patient Ayurvedic assessment
// @route   PUT /api/patients/:id/ayurvedic-assessment
// @access  Private
router.put('/:id/ayurvedic-assessment', protect, checkPermission('update_patients'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Update Ayurvedic assessment
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { 
        ayurvedicAssessment: req.body,
        updatedBy: req.user.id 
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Ayurvedic assessment updated successfully',
      patient: updatedPatient
    });

  } catch (error) {
    console.error('Update Ayurvedic assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 