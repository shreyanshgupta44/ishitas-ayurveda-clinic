# 🌿 Dr. Ishita's Ayurveda Clinic Website

A modern, responsive website for Dr. Ishita Kesharwani's Ayurveda Clinic, featuring online consultation booking, comprehensive services, and professional healthcare information.

## 🏥 About the Clinic

Dr. Ishita Kesharwani is a certified Ayurvedic practitioner offering personalized healthcare solutions through traditional Ayurvedic medicine. The clinic provides both in-person and online consultations with comprehensive treatment plans.

## ✨ Features

### 🎯 Core Features
- **Multi-step Consultation Booking**: Interactive 4-step form for appointment scheduling
- **Online & In-Person Consultations**: Flexible consultation options
- **Comprehensive Services**: Detailed treatment offerings with pricing
- **Professional Design**: Modern, responsive UI with Ayurvedic theme
- **Email Notifications**: Automated email alerts for consultation requests
- **MongoDB Integration**: Secure data storage for patient information

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Progressive Form**: Step-by-step consultation booking process
- **Real-time Validation**: Form validation and error handling
- **Professional UI**: Beautiful design with Ayurvedic color scheme
- **Accessibility**: WCAG compliant design elements

### 🔧 Technical Features
- **React Frontend**: Modern React with Vite for fast development
- **Node.js Backend**: RESTful API with Express.js
- **MongoDB Database**: Scalable NoSQL database
- **EmailJS Integration**: Client-side email notifications
- **Tailwind CSS**: Utility-first CSS framework
- **Environment Configuration**: Secure environment variable management

## 🏗️ Project Structure

```
ishitas-website/
├── ayurveda-clinic/          # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   └── assets/          # Static assets
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
├── ayurveda-clinic-backend/  # Node.js Backend
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   └── server.js            # Main server file
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for database)

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd ayurveda-clinic
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   Create `.env` file in `ayurveda-clinic/` directory:
   ```env
   VITE_API_URL=http://localhost:5001
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd ayurveda-clinic-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure MongoDB**:
   - Create MongoDB Atlas cluster
   - Get connection string
   - Update `config.js` with your connection string

4. **Start backend server**:
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Frontend (`ayurveda-clinic/`)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend (`ayurveda-clinic-backend/`)
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
```

## 🎨 Design System

### Color Palette
- **Primary**: Ayurvedic Green (`#8FBC8F`)
- **Secondary**: Earth Brown (`#A0522D`)
- **Accent**: Sage Green (`#9CAF88`)
- **Background**: Light Cream (`#F5F5DC`)

### Typography
- **Headings**: Serif font family
- **Body**: Sans-serif font family
- **Responsive**: Mobile-first design approach

## 📊 Services & Pricing

### Consultation Types
- **Online Consultation**: ₹250 (60 minutes)
- **In-Person Consultation**: ₹500 (90 minutes)
- **Follow-up Session**: ₹200 (45 minutes)

### Treatment Services
- **Panchakarma Therapies**: ₹800 - ₹1,500
- **Herbal Medicines**: ₹300 - ₹800
- **Lifestyle Counseling**: ₹400
- **Diet Planning**: ₹300
- **Yoga & Meditation**: ₹500

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

### Backend (config.js)
```javascript
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

## 📧 Email Configuration

The website uses EmailJS for sending consultation notifications. To set up:

1. Create EmailJS account at [emailjs.com](https://www.emailjs.com/)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template
4. Add credentials to frontend environment variables

## 🚀 Deployment

### Frontend Deployment (GitHub Pages)
1. Build the project: `npm run build`
2. Deploy to GitHub Pages or any static hosting service

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy to Heroku, Railway, or any Node.js hosting platform
3. Update frontend API URL to production backend URL

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Dr. Ishita Kesharwani**
- **Email**: [contact@drishitaayurveda.com]
- **Phone**: [+91-XXXXXXXXXX]
- **Address**: [Clinic Address]

## 🙏 Acknowledgments

- Ayurvedic medicine principles and practices
- Modern web development technologies
- Open source community contributions
- Patient trust and feedback

---

**Built with ❤️ for holistic healthcare and wellness** 
