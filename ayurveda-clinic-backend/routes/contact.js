const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, authorize, checkPermission, optionalAuth } = require('../middleware/auth');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email configuration
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'noreply@ayurvedaclinic.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Contact form submissions (no database model, just for sending emails)
// In a real application, you might want to store these in a database

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', [
  body('name', 'Name is required').notEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  body('phone', 'Phone number is required').notEmpty(),
  body('subject', 'Subject is required').notEmpty().trim(),
  body('message', 'Message is required').notEmpty().trim()
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

    const { name, email, phone, subject, message } = req.body;

    // Log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date()
    });

    try {
      const transporter = createEmailTransporter();
      
      // Send notification to clinic
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@ayurvedaclinic.com',
        to: 'shreyansh205gupta@gmail.com',
        subject: `New Contact Form: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a4d; border-bottom: 3px solid #2d5a4d; padding-bottom: 10px;">
              📧 New Contact Form Submission
            </h2>
            <div style="background-color: #f9fffe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 5px;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px;">
              This email was sent from Dr. Ishita Kesharwani's Ayurveda Clinic contact form.
            </p>
          </div>
        `
      });
      
      // Send auto-reply to sender
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@ayurvedaclinic.com',
        to: email,
        subject: 'Thank you for contacting us - Dr. Ishita Kesharwani\'s Ayurveda Clinic',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2d5a4d; border-bottom: 3px solid #2d5a4d; padding-bottom: 10px;">
              🌿 Thank you for contacting us
            </h2>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Dr. Ishita Kesharwani's Ayurveda Clinic. We have received your message and will get back to you within 24 hours.</p>
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Contact Information:</strong></p>
              <p style="margin: 5px 0;">📞 Phone: +91 72756 45873</p>
              <p style="margin: 5px 0;">📧 Email: info@ishitaayurveda.com</p>
              <p style="margin: 5px 0;">📍 Address: Asaram, Ashram Rd, Manas Nagar, Krishna Nagar, Lucknow, UP 226023</p>
            </div>
            <p>Best regards,<br><strong>Dr. Ishita Kesharwani's Ayurveda Clinic</strong></p>
          </div>
        `
      });

      console.log('Contact form emails sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails, just log it
    }

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Submit appointment request from website
// @route   POST /api/contact/appointment-request
// @access  Public
router.post('/appointment-request', [
  body('firstName', 'First name is required').notEmpty().trim(),
  body('lastName', 'Last name is required').notEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  body('phone', 'Phone number is required').notEmpty(),
  body('preferredDate', 'Preferred date is required').notEmpty(),
  body('preferredTime', 'Preferred time is required').notEmpty(),
  body('consultationType', 'Consultation type is required').isIn(['online', 'in-person']),
  body('healthConcerns', 'Health concerns are required').notEmpty().trim()
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
      preferredDate, 
      preferredTime, 
      consultationType, 
      healthConcerns,
      previousVisit,
      currentMedications,
      emergencyContact
    } = req.body;

    // Log the appointment request
    console.log('Appointment request:', {
      firstName,
      lastName,
      email,
      phone,
      preferredDate,
      preferredTime,
      consultationType,
      healthConcerns,
      previousVisit,
      currentMedications,
      emergencyContact,
      timestamp: new Date()
    });

    // Here you would typically:
    // 1. Save to database as a pending appointment
    // 2. Send email notification to clinic staff
    // 3. Send confirmation email to the patient
    
    // You can add email sending logic here
    /*
    // Send notification to clinic
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.APPOINTMENTS_EMAIL,
      subject: `New Appointment Request - ${firstName} ${lastName}`,
      html: `
        <h3>New Appointment Request</h3>
        <p><strong>Patient:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime}</p>
        <p><strong>Consultation Type:</strong> ${consultationType}</p>
        <p><strong>Health Concerns:</strong></p>
        <p>${healthConcerns}</p>
        ${previousVisit ? `<p><strong>Previous Visit:</strong> ${previousVisit}</p>` : ''}
        ${currentMedications ? `<p><strong>Current Medications:</strong> ${currentMedications}</p>` : ''}
        ${emergencyContact ? `<p><strong>Emergency Contact:</strong> ${emergencyContact}</p>` : ''}
      `
    });
    
    // Send confirmation to patient
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Appointment Request Received',
      html: `
        <h3>Appointment Request Received</h3>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for your appointment request. We have received your information and will contact you within 24 hours to confirm your appointment.</p>
        <p><strong>Requested Date:</strong> ${preferredDate}</p>
        <p><strong>Requested Time:</strong> ${preferredTime}</p>
        <p><strong>Consultation Type:</strong> ${consultationType}</p>
        <p>Please keep your phone available as we may call to confirm the details.</p>
        <p>Best regards,<br>Dr. Ishita's Ayurveda Clinic</p>
      `
    });
    */

    res.json({
      success: true,
      message: 'Your appointment request has been received. We will contact you within 24 hours to confirm.'
    });

  } catch (error) {
    console.error('Appointment request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Submit consultation request from website
// @route   POST /api/contact/consultation-request
// @access  Public
router.post('/consultation-request', [
  body('firstName', 'First name is required').notEmpty().trim(),
  body('lastName', 'Last name is required').notEmpty().trim(),
  body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  body('phone', 'Phone number is required').notEmpty(),
  body('age', 'Age is required').isInt({ min: 1, max: 120 }),
  body('gender', 'Gender is required').notEmpty(),
  body('primaryConcern', 'Primary concern is required').notEmpty().trim(),
  body('consultationType', 'Consultation type is required').isIn(['initial', 'followup', 'online']),
  body('preferredDate', 'Preferred date is required').notEmpty(),
  body('preferredTime', 'Preferred time is required').notEmpty(),
  body('urgency', 'Urgency level is required').isIn(['normal', 'urgent', 'asap'])
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
      firstName, lastName, email, phone, age, gender,
      primaryConcern, symptoms, previousTreatments, medications, allergies,
      consultationType, preferredDate, preferredTime, urgency,
      lifestyle, diet, exercise, sleep, stress, additionalNotes
    } = req.body;

    // Log the consultation request
    console.log('Consultation request received:', {
      patient: `${firstName} ${lastName}`,
      email,
      phone,
      consultationType,
      preferredDate,
      preferredTime,
      timestamp: new Date()
    });

    try {
      const transporter = createEmailTransporter();
      
      // Email content for clinic staff
      const clinicEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5a4d; border-bottom: 3px solid #2d5a4d; padding-bottom: 10px;">
            🌿 New Consultation Request - Dr. Ishita Kesharwani's Ayurveda Clinic
          </h2>
          
          <div style="background-color: #f9fffe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a4d; margin-top: 0;">Personal Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Gender:</strong> ${gender}</p>
          </div>

          <div style="background-color: #f9fffe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a4d; margin-top: 0;">Health Information</h3>
            <p><strong>Primary Concern:</strong> ${primaryConcern}</p>
            ${symptoms ? `<p><strong>Symptoms:</strong> ${symptoms}</p>` : ''}
            ${previousTreatments ? `<p><strong>Previous Treatments:</strong> ${previousTreatments}</p>` : ''}
            ${medications ? `<p><strong>Current Medications:</strong> ${medications}</p>` : ''}
            ${allergies ? `<p><strong>Allergies:</strong> ${allergies}</p>` : ''}
          </div>

          <div style="background-color: #f9fffe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a4d; margin-top: 0;">Appointment Details</h3>
            <p><strong>Consultation Type:</strong> ${consultationType.charAt(0).toUpperCase() + consultationType.slice(1)}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime}</p>
            <p><strong>Urgency:</strong> ${urgency.toUpperCase()}</p>
          </div>

          ${lifestyle || diet || exercise || sleep || stress || additionalNotes ? `
          <div style="background-color: #f9fffe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a4d; margin-top: 0;">Lifestyle Information</h3>
            ${lifestyle ? `<p><strong>Daily Routine:</strong> ${lifestyle}</p>` : ''}
            ${diet ? `<p><strong>Diet:</strong> ${diet}</p>` : ''}
            ${exercise ? `<p><strong>Exercise:</strong> ${exercise}</p>` : ''}
            ${sleep ? `<p><strong>Sleep:</strong> ${sleep}</p>` : ''}
            ${stress ? `<p><strong>Stress:</strong> ${stress}</p>` : ''}
            ${additionalNotes ? `<p><strong>Additional Notes:</strong> ${additionalNotes}</p>` : ''}
          </div>` : ''}

          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-left: 4px solid #2d5a4d;">
            <p style="margin: 0; font-style: italic;">
              <strong>Next Steps:</strong> Please contact the patient within 24 hours to confirm the appointment.
            </p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This email was sent from Dr. Ishita Kesharwani's Ayurveda Clinic website consultation form.
          </p>
        </div>
      `;

      // Send notification to clinic staff
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@ayurvedaclinic.com',
        to: 'shreyansh205gupta@gmail.com',
        subject: `🌿 New Consultation Request - ${firstName} ${lastName} (${urgency.toUpperCase()})`,
        html: clinicEmailHtml
      });

      // Send confirmation email to patient
      const patientEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5a4d; border-bottom: 3px solid #2d5a4d; padding-bottom: 10px;">
            🌿 Thank You for Your Consultation Request
          </h2>
          
          <p>Dear ${firstName} ${lastName},</p>
          
          <p>Thank you for choosing Dr. Ishita Kesharwani's Ayurveda Clinic. We have received your consultation request and will contact you within 24 hours to confirm your appointment.</p>
          
          <div style="background-color: #f9fffe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a4d; margin-top: 0;">Your Request Details:</h3>
            <p><strong>Consultation Type:</strong> ${consultationType.charAt(0).toUpperCase() + consultationType.slice(1)}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime}</p>
            <p><strong>Primary Concern:</strong> ${primaryConcern}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #2d5a4d; margin-top: 0;">What happens next?</h4>
            <ul style="margin: 0;">
              <li>Our team will review your information</li>
              <li>We'll call you within 24 hours to confirm your appointment</li>
              <li>You'll receive appointment confirmation details</li>
              <li>Prepare any questions you'd like to discuss with Dr. Ishita</li>
            </ul>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Contact Information:</strong></p>
            <p style="margin: 5px 0;">📞 Phone: +91 72756 45873</p>
            <p style="margin: 5px 0;">📧 Email: info@ishitaayurveda.com</p>
            <p style="margin: 5px 0;">📍 Address: Asaram, Ashram Rd, Manas Nagar, Krishna Nagar, Lucknow, UP 226023</p>
          </div>
          
          <p>We look forward to helping you on your journey to wellness through Ayurveda.</p>
          
          <p>With warm regards,<br>
          <strong>Dr. Ishita Kesharwani's Ayurveda Clinic</strong></p>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you need to make changes to your appointment request, please call us at +91 72756 45873.
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'noreply@ayurvedaclinic.com',
        to: email,
        subject: 'Consultation Request Received - Dr. Ishita Kesharwani\'s Ayurveda Clinic',
        html: patientEmailHtml
      });

      console.log('Consultation request emails sent successfully');

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails, just log it
    }

    res.json({
      success: true,
      message: 'Your consultation request has been received successfully! We will contact you within 24 hours to confirm your appointment.'
    });

  } catch (error) {
    console.error('Consultation request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get clinic information
// @route   GET /api/contact/clinic-info
// @access  Public
router.get('/clinic-info', async (req, res) => {
  try {
    // This would typically come from a database or configuration
    const clinicInfo = {
      name: "Dr. Ishita's Ayurveda Clinic",
      address: {
        street: "123 Health Street",
        city: "Wellness City",
        state: "State",
        zipCode: "12345",
        country: "India"
      },
      phone: "+91 9876543210",
      email: "info@drishitaayurveda.com",
      emergencyPhone: "+91 9876543211",
      workingHours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "9:00 AM - 2:00 PM",
        sunday: "Closed"
      },
      services: [
        "Panchakarma Treatments",
        "Herbal Consultations",
        "Detox Programs",
        "Diet & Nutrition Counseling",
        "Stress Management",
        "Skin & Hair Care",
        "Women's Health"
      ],
      socialMedia: {
        facebook: "https://facebook.com/drishitaayurveda",
        instagram: "https://instagram.com/drishitaayurveda",
        youtube: "https://youtube.com/@drishitaayurveda",
        twitter: "https://twitter.com/drishitaayurveda"
      }
    };

    res.json({
      success: true,
      clinicInfo
    });

  } catch (error) {
    console.error('Get clinic info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 