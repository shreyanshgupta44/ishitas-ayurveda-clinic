const express = require('express');
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const { protect, authorize, checkPermission } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
router.get('/', protect, checkPermission('read_appointments'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.scheduledDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Filter by appointment type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by doctor
    if (req.query.doctor) {
      query.assignedDoctor = req.query.doctor;
    }

    // Get appointments
    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName email phone')
      .populate('assignedDoctor', 'firstName lastName professionalInfo.specialization')
      .sort({ scheduledDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments(query);

    res.json({
      success: true,
      count: appointments.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      appointments
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get appointment statistics
// @route   GET /api/appointments/stats
// @access  Private
router.get('/stats', protect, checkPermission('read_appointments'), async (req, res) => {
  try {
    // Get today's appointments
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const todayAppointments = await Appointment.countDocuments({
      scheduledDate: { $gte: todayStart, $lt: todayEnd }
    });

    // Get this week's appointments
    const weekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekAppointments = await Appointment.countDocuments({
      scheduledDate: { $gte: weekStart, $lt: todayEnd }
    });

    // Get appointments by status
    const statusStats = await Appointment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get appointments by type
    const typeStats = await Appointment.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      stats: {
        todayAppointments,
        weekAppointments,
        statusStats,
        typeStats
      }
    });

  } catch (error) {
    console.error('Get appointment stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
router.get('/:id', protect, checkPermission('read_appointments'), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('assignedDoctor', 'firstName lastName professionalInfo');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
router.post('/', protect, checkPermission('create_appointments'), [
  body('patient', 'Patient ID is required').notEmpty(),
  body('type', 'Appointment type is required').isIn(['consultation', 'treatment', 'follow-up']),
  body('scheduledDate', 'Scheduled date is required').isISO8601(),
  body('scheduledTime', 'Scheduled time is required').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
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

    // Check if patient exists
    const patient = await Patient.findById(req.body.patient);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Check for scheduling conflicts
    const scheduledDateTime = new Date(`${req.body.scheduledDate}T${req.body.scheduledTime}`);
    const conflictingAppointment = await Appointment.findOne({
      scheduledDate: {
        $gte: new Date(scheduledDateTime.getTime() - 30 * 60000), // 30 minutes before
        $lte: new Date(scheduledDateTime.getTime() + 30 * 60000)  // 30 minutes after
      },
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Time slot is already booked'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      ...req.body,
      scheduledDate: scheduledDateTime,
      createdBy: req.user.id
    });

    // Populate the created appointment
    await appointment.populate('patient', 'firstName lastName email phone');

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment
    });

  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
router.put('/:id', protect, checkPermission('update_appointments'), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // If updating scheduled date/time, check for conflicts
    if (req.body.scheduledDate || req.body.scheduledTime) {
      const scheduledDate = req.body.scheduledDate || appointment.scheduledDate;
      const scheduledTime = req.body.scheduledTime || appointment.scheduledTime;
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);

      const conflictingAppointment = await Appointment.findOne({
        _id: { $ne: req.params.id },
        scheduledDate: {
          $gte: new Date(scheduledDateTime.getTime() - 30 * 60000),
          $lte: new Date(scheduledDateTime.getTime() + 30 * 60000)
        },
        status: { $in: ['scheduled', 'confirmed'] }
      });

      if (conflictingAppointment) {
        return res.status(400).json({
          success: false,
          message: 'Time slot is already booked'
        });
      }

      req.body.scheduledDate = scheduledDateTime;
    }

    // Update appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user.id },
      { new: true, runValidators: true }
    ).populate('patient', 'firstName lastName email phone');

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, checkPermission('update_appointments'), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Appointment is already cancelled'
      });
    }

    // Update appointment status
    appointment.status = 'cancelled';
    appointment.cancellationReason = req.body.reason || 'No reason provided';
    appointment.cancelledBy = req.user.id;
    appointment.cancelledAt = new Date();
    appointment.updatedBy = req.user.id;

    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointment
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Complete appointment
// @route   PUT /api/appointments/:id/complete
// @access  Private
router.put('/:id/complete', protect, checkPermission('update_appointments'), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    if (appointment.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Appointment is already completed'
      });
    }

    // Update appointment status
    appointment.status = 'completed';
    appointment.completedAt = new Date();
    appointment.updatedBy = req.user.id;

    // Add consultation notes if provided
    if (req.body.consultationNotes) {
      appointment.consultationNotes = req.body.consultationNotes;
    }

    // Add treatment given if provided
    if (req.body.treatmentGiven) {
      appointment.treatmentGiven = req.body.treatmentGiven;
    }

    // Add follow-up recommendations if provided
    if (req.body.followUpRecommendations) {
      appointment.followUpRecommendations = req.body.followUpRecommendations;
    }

    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment completed successfully',
      appointment
    });

  } catch (error) {
    console.error('Complete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 