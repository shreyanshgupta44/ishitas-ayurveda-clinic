import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert(`Error: ${data.message || 'Failed to send message. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: ['Asaram, Ashram Rd, Manas Nagar', 'Krishna Nagar, Lucknow', 'Uttar Pradesh 226023'],
      link: 'https://g.co/kgs/83RNe3r'
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+91 72756 45873', 'Available for appointments'],
      link: 'tel:+917275645873'
    },
    {
      icon: '📧',
      title: 'Email',
      details: ['info@ishitaayurveda.com', 'appointments@ishitaayurveda.com'],
      link: 'mailto:info@ishitaayurveda.com'
    }
  ];

  const workingHours = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const faqs = [
    {
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment through our online booking system, call us directly, or send us a message through this contact form.'
    },
    {
      question: 'Do you offer online consultations?',
      answer: 'Yes, we offer virtual consultations via video call for your convenience. Online consultations are available for both initial and follow-up appointments.'
    },
    {
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring a list of current medications, any previous medical reports, and a detailed description of your health concerns and symptoms.'
    },
    {
      question: 'How long is a typical consultation?',
      answer: 'Initial consultations are typically 90 minutes, while follow-up sessions are usually 60 minutes. This allows sufficient time for thorough assessment and treatment planning.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'We accept various insurance plans. Please contact us to verify if your insurance is accepted and to understand your coverage options.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ayurveda-50 to-earth-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ayurveda-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-sage-600 mb-8">
            We're here to help you on your journey to wellness. Reach out with any questions or to schedule your consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917275645873" className="btn-primary">
              Call Now
            </a>
            <a href="mailto:info@ishitaayurveda.com" className="btn-outline">
              Send Email
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-all duration-300">
                <div className="space-y-4">
                  <div className="text-4xl">{info.icon}</div>
                  <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sage-600">
                        {idx === 0 && info.link ? (
                          <a href={info.link} className="hover:text-ayurveda-600 transition-colors">
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Contact Form */}
      <section className="py-20 bg-gradient-to-br from-sage-50 to-ayurveda-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-serif font-semibold text-ayurveda-800 mb-4">
                  Visit Our Clinic
                </h2>
                <p className="text-sage-600 mb-6">
                  Our clinic is conveniently located in Krishna Nagar, Lucknow, 
                  with easy access to public transportation and parking facilities.
                </p>
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-gentle p-8 text-center">
                <div className="bg-gradient-to-br from-ayurveda-100 to-earth-100 rounded-xl p-12">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-serif font-semibold text-ayurveda-800 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-sage-600 mb-4">
                    Asaram, Ashram Rd, Manas Nagar, Krishna Nagar, Lucknow, Uttar Pradesh 226023
                  </p>
                  <a 
                    href="https://g.co/kgs/83RNe3r" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              
              {/* Transportation Info */}
              <div className="bg-white rounded-2xl shadow-gentle p-6">
                <h3 className="text-lg font-serif font-semibold text-ayurveda-800 mb-4">
                  Getting Here
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-ayurveda-600 mt-1">🚗</span>
                    <div>
                      <p className="font-medium text-ayurveda-700">By Car</p>
                      <p className="text-sage-600 text-sm">Located on Ashram Road, Krishna Nagar, Lucknow</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-ayurveda-600 mt-1">🚌</span>
                    <div>
                      <p className="font-medium text-ayurveda-700">Public Transit</p>
                      <p className="text-sage-600 text-sm">Easily accessible via local buses and auto-rickshaws</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-ayurveda-600 mt-1">🚶‍♀️</span>
                    <div>
                      <p className="font-medium text-ayurveda-700">Accessibility</p>
                      <p className="text-sage-600 text-sm">Patient-friendly clinic with comfortable seating areas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-gentle p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-semibold text-ayurveda-800 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-sage-600">
                  Have a question or need more information? We're here to help. 
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="treatment">Treatment Questions</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="insurance">Insurance Questions</option>
                    <option value="general">General Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Please describe your question or concern in detail..."
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Working Hours</h2>
            <p className="section-subtitle">
              We're here to serve you during these hours. For emergencies, please call our emergency line.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-ayurveda-50 to-earth-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-gentle">
                    <span className="font-medium text-ayurveda-800">{schedule.day}</span>
                    <span className={`text-sm ${schedule.hours === 'Closed' ? 'text-red-500' : 'text-sage-600'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-gentle">
                  <h3 className="text-lg font-serif font-semibold text-ayurveda-800 mb-4">
                    Emergency Contact
                  </h3>
                  <p className="text-sage-600 mb-4">
                    For urgent health concerns outside of our regular hours, please contact our main clinic line:
                  </p>
                  <a href="tel:+917275645873" className="btn-primary">
                    Call: +91 72756 45873
                  </a>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-gentle">
                  <h3 className="text-lg font-serif font-semibold text-ayurveda-800 mb-4">
                    Online Consultations
                  </h3>
                  <p className="text-sage-600 mb-4">
                    Virtual consultations available during extended hours:
                  </p>
                  <p className="text-sm text-sage-600">
                    Monday - Friday: 7:00 AM - 8:00 PM<br/>
                    Saturday: 8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-sage-50 to-ayurveda-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to common questions about our services and appointments
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-gentle p-6">
                <h3 className="text-lg font-serif font-semibold text-ayurveda-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-sage-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-ayurveda-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-ayurveda-100">
              Choose the method that works best for you
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="text-4xl">📞</div>
                <h3 className="text-xl font-semibold text-white">Phone Call</h3>
                <p className="text-ayurveda-100">Speak directly with our team</p>
                <a href="tel:+917275645873" className="btn-secondary">
                  Call Now
                </a>
              </div>
              
              <div className="text-center space-y-4">
                <div className="text-4xl">💬</div>
                <h3 className="text-xl font-semibold text-white">WhatsApp</h3>
                <p className="text-ayurveda-100">Quick questions and updates</p>
                <a href="https://wa.me/917275645873" className="btn-secondary">
                  WhatsApp
                </a>
              </div>
              
              <div className="text-center space-y-4">
                <div className="text-4xl">📧</div>
                <h3 className="text-xl font-semibold text-white">Email</h3>
                <p className="text-ayurveda-100">Detailed inquiries and information</p>
                <a href="mailto:info@ishitaayurveda.com" className="btn-secondary">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 