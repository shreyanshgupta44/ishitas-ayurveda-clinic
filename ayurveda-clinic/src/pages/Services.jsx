import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceCategories = [
    {
      id: 'womens-health',
      title: 'Women\'s Health',
      icon: '🌺',
      description: 'Comprehensive care for women\'s health and wellness',
      treatments: [
        {
          name: 'PCOS Management',
          description: 'Natural treatment for PCOS and hormonal imbalances',
          duration: '90 minutes',
          benefits: 'Hormonal balance, regular cycles, fertility improvement'
        },
        {
          name: 'Menstrual Disorders',
          description: 'Ayurvedic solutions for irregular or painful periods',
          duration: '60 minutes',
          benefits: 'Regular cycles, reduced pain, hormonal harmony'
        },
        {
          name: 'Fertility Support',
          description: 'Natural fertility enhancement and preconception care',
          duration: '75 minutes',
          benefits: 'Improved fertility, reproductive health, conception support'
        },
        {
          name: 'Menopause Support',
          description: 'Natural management of menopausal symptoms',
          duration: '60 minutes',
          benefits: 'Symptom relief, hormonal balance, improved quality of life'
        },
        {
          name: 'Pregnancy Care',
          description: 'Ayurvedic care during pregnancy and postpartum',
          duration: '60 minutes',
          benefits: 'Healthy pregnancy, natural delivery, postpartum recovery'
        },
        {
          name: 'Breast Health',
          description: 'Natural breast health maintenance and care',
          duration: '45 minutes',
          benefits: 'Breast health, lymphatic drainage, preventive care'
        }
      ]
    },
    {
      id: 'lifestyle-disorders',
      title: 'Lifestyle Disorder Management',
      icon: '🏃‍♀️',
      description: 'Comprehensive management of modern lifestyle-related health issues',
      treatments: [
        {
          name: 'Diabetes Management',
          description: 'Natural approaches to blood sugar control and diabetes care',
          duration: '90 minutes',
          benefits: 'Blood sugar control, reduced complications, improved energy'
        },
        {
          name: 'Hypertension Care',
          description: 'Natural blood pressure management and heart health',
          duration: '60 minutes',
          benefits: 'Blood pressure control, heart health, stress reduction'
        },
        {
          name: 'Obesity & Weight Management',
          description: 'Natural weight loss and metabolic enhancement',
          duration: '75 minutes',
          benefits: 'Healthy weight loss, improved metabolism, sustained results'
        },
        {
          name: 'Stress & Anxiety',
          description: 'Holistic stress management and anxiety relief',
          duration: '60 minutes',
          benefits: 'Stress reduction, mental clarity, emotional balance'
        },
        {
          name: 'Sleep Disorders',
          description: 'Natural treatments for insomnia and sleep issues',
          duration: '60 minutes',
          benefits: 'Better sleep quality, improved rest, daytime energy'
        },
        {
          name: 'Digestive Disorders',
          description: 'Treatment for IBS, acidity, and digestive issues',
          duration: '60 minutes',
          benefits: 'Improved digestion, gut health, reduced bloating'
        }
      ]
    },
    {
      id: 'general-physician',
      title: 'General Physician Services',
      icon: '👩‍⚕️',
      description: 'Comprehensive primary healthcare with Ayurvedic approach',
      treatments: [
        {
          name: 'Health Check-up',
          description: 'Complete health assessment and preventive care',
          duration: '90 minutes',
          benefits: 'Early disease detection, preventive care, health monitoring'
        },
        {
          name: 'Fever & Infections',
          description: 'Natural treatment for fevers and common infections',
          duration: '45 minutes',
          benefits: 'Faster recovery, natural immunity boost, symptom relief'
        },
        {
          name: 'Respiratory Health',
          description: 'Treatment for cough, cold, asthma, and respiratory issues',
          duration: '60 minutes',
          benefits: 'Improved breathing, reduced inflammation, respiratory health'
        },
        {
          name: 'Joint & Bone Health',
          description: 'Natural treatment for arthritis, joint pain, and bone health',
          duration: '75 minutes',
          benefits: 'Reduced pain, improved mobility, bone strength'
        },
        {
          name: 'Skin Conditions',
          description: 'Treatment for acne, eczema, psoriasis, and skin issues',
          duration: '60 minutes',
          benefits: 'Clear skin, reduced inflammation, natural healing'
        },
        {
          name: 'Immunity Boost',
          description: 'Natural immunity enhancement and preventive care',
          duration: '45 minutes',
          benefits: 'Stronger immunity, disease prevention, overall health'
        }
      ]
    },
    {
      id: 'consultation',
      title: 'Online and Offline Consultation',
      icon: '💻',
      description: 'Flexible consultation options for your convenience',
      treatments: [
        {
          name: 'Online Consultation',
          description: 'Virtual consultation from the comfort of your home',
          duration: '60 minutes',
          benefits: 'Convenient, time-saving, accessible from anywhere'
        },
        {
          name: 'In-Person Consultation',
          description: 'Traditional face-to-face consultation at our clinic',
          duration: '90 minutes',
          benefits: 'Personal touch, physical examination, immediate care'
        },
        {
          name: 'Follow-up Sessions',
          description: 'Regular follow-up for ongoing treatment and monitoring',
          duration: '45 minutes',
          benefits: 'Progress tracking, treatment adjustments, continuous care'
        },
        {
          name: 'Emergency Consultation',
          description: 'Urgent care consultation for immediate health concerns',
          duration: '30 minutes',
          benefits: 'Quick response, immediate relief, urgent care'
        },
        {
          name: 'Family Consultation',
          description: 'Family health consultation and preventive care',
          duration: '120 minutes',
          benefits: 'Family wellness, preventive care, health education'
        },
        {
          name: 'Second Opinion',
          description: 'Expert second opinion for complex health conditions',
          duration: '90 minutes',
          benefits: 'Expert advice, treatment options, peace of mind'
        }
      ]
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ayurveda-50 to-earth-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ayurveda-800">
              Our Ayurvedic Services
            </h1>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Comprehensive healing solutions combining ancient wisdom with modern care. 
              Each treatment is personalized to your unique constitution and health needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="btn-primary">
                Schedule Consultation
              </Link>
              <Link to="/contact" className="btn-outline">
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={category.id} className={`${categoryIndex > 0 ? 'border-t pt-20' : ''}`}>
                <div className="text-center mb-12">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ayurveda-800 mb-4">
                    {category.title}
                  </h2>
                  <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.treatments.map((treatment, index) => (
                    <div key={index} className="card hover:scale-105 transition-all duration-300">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                            {treatment.name}
                          </h3>
                          <span className="text-sm text-sage-500 bg-sage-100 px-3 py-1 rounded-full">
                            {treatment.duration}
                          </span>
                        </div>
                        <p className="text-sage-600">
                          {treatment.description}
                        </p>
                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-ayurveda-700 mb-2">Benefits:</h4>
                          <p className="text-sm text-sage-600">
                            {treatment.benefits}
                          </p>
                        </div>
                        <div className="pt-4">
                          <Link 
                            to="/consultation" 
                            className="inline-flex items-center text-ayurveda-600 hover:text-ayurveda-700 font-medium text-sm group"
                          >
                            Book This Treatment
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process Section */}
      <section className="py-20 bg-gradient-to-br from-sage-50 to-ayurveda-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Treatment Process</h2>
            <p className="section-subtitle">
              A systematic approach to healing that ensures the best outcomes for your health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-ayurveda-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-ayurveda-600">1</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Initial Consultation
                </h3>
                <p className="text-sage-600 text-sm">
                  Comprehensive assessment of your health history, lifestyle, and current concerns
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-ayurveda-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-ayurveda-600">2</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Personalized Plan
                </h3>
                <p className="text-sage-600 text-sm">
                  Custom treatment plan based on your unique constitution and health goals
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-ayurveda-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-ayurveda-600">3</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Treatment Sessions
                </h3>
                <p className="text-sage-600 text-sm">
                  Regular therapy sessions with ongoing monitoring and adjustments
                </p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-ayurveda-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-ayurveda-600">4</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                  Maintenance Care
                </h3>
                <p className="text-sage-600 text-sm">
                  Long-term wellness support and preventive care for sustained health
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Consultation & Pricing</h2>
            <p className="section-subtitle">
              Transparent pricing for quality Ayurvedic care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-semibold text-ayurveda-800">
                  Online Consultation
                </h3>
                <div className="text-3xl font-bold text-ayurveda-600">₹250</div>
                <p className="text-sage-600 text-sm">
                  60-minute virtual consultation from the comfort of your home with comprehensive health assessment
                </p>
                <Link to="/consultation" className="btn-primary w-full">
                  Book Now
                </Link>
              </div>
            </div>
            
            <div className="card text-center border-2 border-ayurveda-200">
              <div className="space-y-4">
                <div className="bg-ayurveda-100 text-ayurveda-800 px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-2xl font-serif font-semibold text-ayurveda-800">
                  In-Person Consultation
                </h3>
                <div className="text-3xl font-bold text-ayurveda-600">₹500</div>
                <p className="text-sage-600 text-sm">
                  90-minute comprehensive assessment including pulse diagnosis and personalized treatment plan
                </p>
                <Link to="/consultation" className="btn-primary w-full">
                  Schedule
                </Link>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-semibold text-ayurveda-800">
                  Follow-up Sessions
                </h3>
                <div className="text-3xl font-bold text-ayurveda-600">₹200</div>
                <p className="text-sage-600 text-sm">
                  45-minute sessions for ongoing treatment, monitoring, and plan adjustments
                </p>
                <Link to="/consultation" className="btn-primary w-full">
                  Book Follow-up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ayurveda-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-xl text-ayurveda-100 leading-relaxed">
              Choose the treatment that resonates with your health needs and start your path to wellness today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="btn-secondary">
                Book Consultation
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-ayurveda-700">
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 