# Dr. Ishita's Ayurveda Clinic - Backend API

A comprehensive RESTful API for managing an Ayurveda clinic with patient management, appointment scheduling, and treatment tracking.

## 🌿 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Patient Management**: Complete patient records with medical history and Ayurvedic assessments
- **Appointment Scheduling**: Book, manage, and track appointments with conflict resolution
- **Treatment Tracking**: Manage treatments and service offerings
- **Contact Management**: Handle contact forms and appointment requests from the website
- **Security**: Rate limiting, helmet protection, CORS configuration
- **Data Validation**: Comprehensive input validation and sanitization

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ayurveda-clinic-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ayurveda-clinic
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
ayurveda-clinic-backend/
├── models/
│   ├── User.js           # User/Staff model
│   ├── Patient.js        # Patient model
│   └── Appointment.js    # Appointment model
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── patients.js       # Patient management routes
│   ├── appointments.js   # Appointment management routes
│   ├── treatments.js     # Treatment routes
│   └── contact.js        # Contact form routes
├── middleware/
│   └── auth.js           # Authentication middleware
├── config.js             # Configuration file
├── server.js             # Main application file
└── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout user

### Patients
- `GET /api/patients` - Get all patients (paginated)
- `GET /api/patients/:id` - Get single patient
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Deactivate patient
- `PUT /api/patients/:id/medical-history` - Update medical history
- `PUT /api/patients/:id/ayurvedic-assessment` - Update Ayurvedic assessment

### Appointments
- `GET /api/appointments` - Get all appointments (paginated)
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `PUT /api/appointments/:id/complete` - Complete appointment
- `GET /api/appointments/stats` - Get appointment statistics

### Treatments
- `GET /api/treatments` - Get all treatments
- `GET /api/treatments/:id` - Get single treatment
- `GET /api/treatments/category/:category` - Get treatments by category
- `GET /api/treatments/categories` - Get treatment categories

### Contact
- `POST /api/contact` - Submit contact form
- `POST /api/contact/appointment-request` - Submit appointment request
- `GET /api/contact/clinic-info` - Get clinic information

## 🔐 Authentication & Authorization

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **admin**: Full access to all resources
- **doctor**: Access to patients, appointments, and treatments
- **staff**: Limited access to patients and appointments
- **receptionist**: Access to appointments and basic patient info

### Permissions
Each route is protected by specific permissions:
- `read_patients`, `create_patients`, `update_patients`
- `read_appointments`, `create_appointments`, `update_appointments`
- `read_treatments`, `create_treatments`, `update_treatments`

## 🗄️ Database Schema

### User Model
- Authentication and authorization
- Role-based permissions
- Professional information
- Employment status

### Patient Model
- Personal information
- Medical history
- Ayurvedic assessment (Prakriti, Vikriti, etc.)
- Lifestyle information
- Emergency contacts

### Appointment Model
- Patient and doctor references
- Scheduling information
- Consultation notes
- Treatment records
- Payment tracking

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Express-validator for request validation
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Account Lockout**: Protection against brute force attacks

## 🧪 Testing

To test the API, you can use tools like:
- Postman
- Insomnia
- curl commands
- Frontend integration

### Sample API Calls

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "role": "doctor"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get patients (with token)
curl -X GET http://localhost:5000/api/patients \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 📧 Email Configuration

To enable email functionality (contact forms, appointment notifications), configure these environment variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@drishitaayurveda.com
CONTACT_EMAIL=info@drishitaayurveda.com
APPOINTMENTS_EMAIL=appointments@drishitaayurveda.com
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-mongo-uri
JWT_SECRET=your-very-secure-jwt-secret
CLIENT_URL=https://your-frontend-domain.com
```

### Deployment Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment
- **AWS**: EC2 with RDS or DocumentDB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@drishitaayurveda.com or create an issue in the repository.

---

Made with ❤️ for Dr. Ishita's Ayurveda Clinic 