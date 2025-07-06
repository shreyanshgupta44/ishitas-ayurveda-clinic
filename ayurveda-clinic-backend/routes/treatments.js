const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, authorize, checkPermission } = require('../middleware/auth');
const router = express.Router();

// This would typically have a Treatment model, but for now we'll create basic routes
// You can expand this based on your specific treatment tracking needs

// @desc    Get all treatments
// @route   GET /api/treatments
// @access  Private
router.get('/', protect, checkPermission('read_treatments'), async (req, res) => {
  try {
    // This would typically fetch from a Treatment model
    // For now, return example treatment data
    const treatments = [
      {
        id: 1,
        name: 'Panchakarma Detox',
        category: 'Detoxification',
        duration: '21 days',
        description: 'Complete body detoxification through traditional Panchakarma methods',
        price: 25000,
        availability: 'available'
      },
      {
        id: 2,
        name: 'Herbal Consultation',
        category: 'Consultation',
        duration: '1 hour',
        description: 'Personalized herbal medicine consultation with Dr. Ishita',
        price: 2000,
        availability: 'available'
      },
      {
        id: 3,
        name: 'Stress Relief Therapy',
        category: 'Mental Health',
        duration: '90 minutes',
        description: 'Specialized therapy for stress management and mental wellness',
        price: 3500,
        availability: 'available'
      },
      {
        id: 4,
        name: 'Skin & Hair Treatment',
        category: 'Beauty & Wellness',
        duration: '60 minutes',
        description: 'Natural Ayurvedic treatment for skin and hair problems',
        price: 2500,
        availability: 'available'
      },
      {
        id: 5,
        name: 'Women\'s Health Package',
        category: 'Women\'s Health',
        duration: '2 hours',
        description: 'Comprehensive women\'s health consultation and treatment',
        price: 4000,
        availability: 'available'
      },
      {
        id: 6,
        name: 'Diet & Nutrition Counseling',
        category: 'Nutrition',
        duration: '45 minutes',
        description: 'Personalized diet planning based on Ayurvedic principles',
        price: 1500,
        availability: 'available'
      },
      {
        id: 7,
        name: 'Abhyanga Massage',
        category: 'Massage Therapy',
        duration: '60 minutes',
        description: 'Traditional full-body oil massage for relaxation and healing',
        price: 2000,
        availability: 'available'
      }
    ];

    res.json({
      success: true,
      count: treatments.length,
      treatments
    });

  } catch (error) {
    console.error('Get treatments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get treatment categories
// @route   GET /api/treatments/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = [
      {
        name: 'Panchakarma',
        description: 'Traditional detoxification and rejuvenation therapies',
        icon: '🌿',
        treatmentCount: 5
      },
      {
        name: 'Consultation',
        description: 'Personalized consultations with Dr. Ishita',
        icon: '👩‍⚕️',
        treatmentCount: 3
      },
      {
        name: 'Detoxification',
        description: 'Body cleansing and purification treatments',
        icon: '🧘',
        treatmentCount: 4
      },
      {
        name: 'Mental Health',
        description: 'Stress management and mental wellness therapies',
        icon: '🧠',
        treatmentCount: 3
      },
      {
        name: 'Beauty & Wellness',
        description: 'Natural treatments for skin and hair care',
        icon: '✨',
        treatmentCount: 6
      },
      {
        name: 'Women\'s Health',
        description: 'Specialized treatments for women\'s health concerns',
        icon: '💐',
        treatmentCount: 4
      },
      {
        name: 'Nutrition',
        description: 'Diet and nutrition counseling based on Ayurvedic principles',
        icon: '🥗',
        treatmentCount: 2
      }
    ];

    res.json({
      success: true,
      count: categories.length,
      categories
    });

  } catch (error) {
    console.error('Get treatment categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get treatments by category
// @route   GET /api/treatments/category/:category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    
    // This would typically fetch from a Treatment model
    const allTreatments = [
      {
        id: 1,
        name: 'Panchakarma Detox',
        category: 'Detoxification',
        duration: '21 days',
        description: 'Complete body detoxification through traditional Panchakarma methods',
        price: 25000,
        availability: 'available'
      },
      {
        id: 2,
        name: 'Herbal Consultation',
        category: 'Consultation',
        duration: '1 hour',
        description: 'Personalized herbal medicine consultation with Dr. Ishita',
        price: 2000,
        availability: 'available'
      },
      {
        id: 3,
        name: 'Stress Relief Therapy',
        category: 'Mental Health',
        duration: '90 minutes',
        description: 'Specialized therapy for stress management and mental wellness',
        price: 3500,
        availability: 'available'
      }
    ];

    const treatments = allTreatments.filter(t => 
      t.category.toLowerCase() === category.toLowerCase()
    );

    res.json({
      success: true,
      count: treatments.length,
      category,
      treatments
    });

  } catch (error) {
    console.error('Get treatments by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get single treatment
// @route   GET /api/treatments/:id
// @access  Private
router.get('/:id', protect, checkPermission('read_treatments'), async (req, res) => {
  try {
    const treatmentId = parseInt(req.params.id);
    
    // This would typically fetch from a Treatment model
    // For now, return example treatment data
    const treatments = [
      {
        id: 1,
        name: 'Panchakarma Detox',
        category: 'Detoxification',
        duration: '21 days',
        description: 'Complete body detoxification through traditional Panchakarma methods',
        price: 25000,
        availability: 'available',
        details: {
          includes: ['Consultation', 'Medicines', 'Diet Plan', 'Follow-up'],
          contraindications: ['Pregnancy', 'Severe heart conditions'],
          preparation: 'Avoid heavy meals 24 hours before treatment'
        }
      },
      {
        id: 2,
        name: 'Herbal Consultation',
        category: 'Consultation',
        duration: '1 hour',
        description: 'Personalized herbal medicine consultation with Dr. Ishita',
        price: 2000,
        availability: 'available',
        details: {
          includes: ['Pulse diagnosis', 'Personalized medicine', 'Lifestyle guidance'],
          contraindications: ['None'],
          preparation: 'Bring previous medical reports if any'
        }
      }
    ];

    const treatment = treatments.find(t => t.id === treatmentId);

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: 'Treatment not found'
      });
    }

    res.json({
      success: true,
      treatment
    });

  } catch (error) {
    console.error('Get treatment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 