// Configuration file for Dr. Ishita's Ayurveda Clinic Backend
// Copy this file and create a .env file with your actual values

module.exports = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,

  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ayurveda-clinic',

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',

  // Client Configuration
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  // Email Configuration (Configure these for email functionality)
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_USER: process.env.SMTP_USER || 'your-email@gmail.com',
  SMTP_PASS: process.env.SMTP_PASS || 'your-app-password',
  SMTP_FROM: process.env.SMTP_FROM || 'noreply@drishitaayurveda.com',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@drishitaayurveda.com',
  APPOINTMENTS_EMAIL: process.env.APPOINTMENTS_EMAIL || 'appointments@drishitaayurveda.com',

  // File Upload Configuration
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 10485760,
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',

  // Rate Limiting Configuration
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || 100,

  // Security Configuration
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || 12,
  LOGIN_ATTEMPTS_LIMIT: process.env.LOGIN_ATTEMPTS_LIMIT || 5,
  LOGIN_LOCK_TIME: process.env.LOGIN_LOCK_TIME || 30,

  // Clinic Information
  CLINIC_NAME: process.env.CLINIC_NAME || "Dr. Ishita's Ayurveda Clinic",
  CLINIC_PHONE: process.env.CLINIC_PHONE || '+91-9876543210',
  CLINIC_EMAIL: process.env.CLINIC_EMAIL || 'info@drishitaayurveda.com',
  CLINIC_ADDRESS: process.env.CLINIC_ADDRESS || '123 Health Street, Wellness City, State 12345',

  // Social Media Links
  FACEBOOK_URL: process.env.FACEBOOK_URL || 'https://facebook.com/drishitaayurveda',
  INSTAGRAM_URL: process.env.INSTAGRAM_URL || 'https://instagram.com/drishitaayurveda',
  YOUTUBE_URL: process.env.YOUTUBE_URL || 'https://youtube.com/@drishitaayurveda',
  TWITTER_URL: process.env.TWITTER_URL || 'https://twitter.com/drishitaayurveda'
};

// Example .env file content:
/*
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ayurveda-clinic
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
CONTACT_EMAIL=info@drishitaayurveda.com
APPOINTMENTS_EMAIL=appointments@drishitaayurveda.com
*/ 