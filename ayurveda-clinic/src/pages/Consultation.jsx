import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Consultation = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    
    // Health Information
    healthConcerns: '',
    symptoms: '',
    currentMedications: '',
    previousVisit: false,
    
    // Appointment Details
    consultationType: 'online',
    preferredDate: '',
    preferredTime: '',
    
    // Additional Information
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/consultation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Send email notification
        await sendEmailNotification(formData);
        
        alert('Consultation request submitted successfully! We will contact you within 24 hours to confirm your appointment.');
        // Reset form
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', age: '', gender: '',
          healthConcerns: '', symptoms: '', currentMedications: '', previousVisit: false,
          consultationType: 'online', preferredDate: '', preferredTime: '',
          emergencyContact: { name: '', phone: '', relationship: '' }
        });
        setCurrentStep(1);
      } else {
        alert(`Error: ${data.message || 'Failed to submit consultation request. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const sendEmailNotification = async (formData) => {
    // Check if EmailJS is properly configured
    if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 
        !import.meta.env.VITE_EMAILJS_SERVICE_ID || 
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
      console.warn('EmailJS not configured. Skipping email notification.');
      return;
    }

    try {
      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        consultationType: formData.consultationType,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        healthConcerns: formData.healthConcerns,
        symptoms: formData.symptoms,
        currentMedications: formData.currentMedications,
        previousVisit: formData.previousVisit ? 'Yes' : 'No',
        emergencyContactName: formData.emergencyContact.name,
        emergencyContactPhone: formData.emergencyContact.phone,
        emergencyContactRelationship: formData.emergencyContact.relationship,
        submissionTime: new Date().toLocaleString()
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Email notification failed:', error);
      // Don't fail the form submission if email fails
    }
  };

  return (
    <div className="consultation-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ayurveda-50 to-earth-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ayurveda-800 mb-4">
            Book Your Consultation
          </h1>
          <p className="text-xl text-sage-600 mb-8">
            Schedule a personalized consultation with Dr. Ishita to begin your journey to wellness
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-sage-600">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-ayurveda-500 rounded-full"></span>
              <span>In-Person & Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-earth-500 rounded-full"></span>
              <span>Same Day Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-sage-500 rounded-full"></span>
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Information */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-ayurveda-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Online Consultation
                </h3>
                <p className="text-sage-600 text-sm">
                  60-minute virtual consultation from the comfort of your home with comprehensive health assessment
                </p>
                <div className="text-2xl font-bold text-ayurveda-600">₹250</div>
              </div>
            </div>
            
            <div className="card text-center border-2 border-ayurveda-200">
              <div className="space-y-4">
                <div className="bg-ayurveda-100 text-ayurveda-800 px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <div className="w-16 h-16 bg-ayurveda-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🩺</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  In-Person Consultation
                </h3>
                <p className="text-sage-600 text-sm">
                  90-minute comprehensive assessment including pulse diagnosis and personalized treatment plan
                </p>
                <div className="text-2xl font-bold text-ayurveda-600">₹500</div>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-ayurveda-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Follow-up Session
                </h3>
                <p className="text-sage-600 text-sm">
                  45-minute sessions for ongoing treatment monitoring and plan adjustments
                </p>
                <div className="text-2xl font-bold text-ayurveda-600">₹200</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 bg-gradient-to-br from-sage-50 to-ayurveda-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-sage-600">Step {currentStep} of 4</span>
                <span className="text-sm font-medium text-sage-600">{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-ayurveda-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-ayurveda-800 mb-2">
                      Personal Information
                    </h2>
                    <p className="text-sage-600">Tell us about yourself</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
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
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="120"
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Health Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-ayurveda-800 mb-2">
                      Health Information
                    </h2>
                    <p className="text-sage-600">Help us understand your health concerns</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Health Concerns *
                      </label>
                      <textarea
                        name="healthConcerns"
                        value={formData.healthConcerns}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        placeholder="Please describe your health concerns in detail..."
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Current Symptoms
                      </label>
                      <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Please describe your current symptoms in detail..."
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Current Medications
                      </label>
                      <textarea
                        name="currentMedications"
                        value={formData.currentMedications}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="List any medications you're currently taking..."
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Previous Visit to Clinic
                      </label>
                      <select
                        name="previousVisit"
                        value={formData.previousVisit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      >
                        <option value={false}>No, this is my first visit</option>
                        <option value={true}>Yes, I have visited before</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Appointment Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-ayurveda-800 mb-2">
                      Appointment Details
                    </h2>
                    <p className="text-sage-600">Choose your preferred consultation type and time</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Consultation Type *
                      </label>
                      <select
                        name="consultationType"
                        value={formData.consultationType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      >
                        <option value="online">Online Consultation</option>
                        <option value="in-person">In-Person Consultation</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                          Preferred Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                        >
                          <option value="">Select Time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    

                  </div>
                </div>
              )}

              {/* Step 4: Emergency Contact Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-ayurveda-800 mb-2">
                      Emergency Contact Information
                    </h2>
                    <p className="text-sage-600">Please provide emergency contact details (optional)</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        name="emergencyContact.name"
                        value={formData.emergencyContact.name}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            emergencyContact: {
                              ...prev.emergencyContact,
                              name: e.target.value
                            }
                          }));
                        }}
                        placeholder="Full name of emergency contact"
                        className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                          Emergency Contact Phone
                        </label>
                        <input
                          type="tel"
                          name="emergencyContact.phone"
                          value={formData.emergencyContact.phone}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              emergencyContact: {
                                ...prev.emergencyContact,
                                phone: e.target.value
                              }
                            }));
                          }}
                          placeholder="Phone number"
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-ayurveda-700 mb-2">
                          Relationship
                        </label>
                        <input
                          type="text"
                          name="emergencyContact.relationship"
                          value={formData.emergencyContact.relationship}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              emergencyContact: {
                                ...prev.emergencyContact,
                                relationship: e.target.value
                              }
                            }));
                          }}
                          placeholder="e.g., Spouse, Parent, Friend"
                          className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-ayurveda-500 focus:border-ayurveda-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-sage-100 text-sage-700 hover:bg-sage-200'
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What to Expect</h2>
            <p className="section-subtitle">
              Your consultation journey with Dr. Ishita
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="space-y-4">
                <div className="text-4xl">📋</div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Comprehensive Assessment
                </h3>
                <p className="text-sage-600 text-sm">
                  Detailed evaluation of your health history, lifestyle, and current concerns through traditional Ayurvedic diagnostic methods.
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="space-y-4">
                <div className="text-4xl">🫱</div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Pulse Diagnosis
                </h3>
                <p className="text-sage-600 text-sm">
                  Ancient technique of reading your pulse to understand your constitution and identify imbalances in your body systems.
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="space-y-4">
                <div className="text-4xl">📝</div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Personalized Treatment Plan
                </h3>
                <p className="text-sage-600 text-sm">
                  Customized treatment recommendations including herbal medicines, therapies, diet, and lifestyle modifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation; 