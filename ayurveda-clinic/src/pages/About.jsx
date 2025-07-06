import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const qualifications = [
    'Bachelor of Ayurvedic Medicine & Surgery (BAMS) - Lucknow University',
    'Clinical Experience at Lokbandhu Government Hospital',
    'Founder & Lead Physician at Ayurveda Clinic',
    'Specialized in Root Cause Treatment Approach',
    'Expert in Natural Healing & Herbal Remedies',
    'Holistic Lifestyle & Diet Counseling'
  ];

  const specializations = [
    {
      icon: '🌿',
      title: 'Chronic Disease Management',
      description: 'Diabetes, Hypertension, Arthritis, Digestive Disorders'
    },
    {
      icon: '🧘‍♀️',
      title: 'Stress & Mental Health',
      description: 'Anxiety, Depression, Insomnia, Stress Management'
    },
    {
      icon: '🌺',
      title: 'Women\'s Health',
      description: 'PCOS, Menstrual Disorders, Fertility, Menopause'
    },
    {
      icon: '🌱',
      title: 'Detoxification',
      description: 'Panchakarma, Body Cleansing, Rejuvenation Therapy'
    }
  ];

  const philosophy = [
    {
      title: 'Holistic Healing',
      description: 'We believe in treating the whole person - body, mind, and spirit - not just the symptoms.',
      icon: '🔮'
    },
    {
      title: 'Natural Remedies',
      description: 'Using time-tested herbs and natural therapies to promote healing without harmful side effects.',
      icon: '🌿'
    },
    {
      title: 'Personalized Care',
      description: 'Every treatment plan is tailored to your unique constitution and individual health needs.',
      icon: '💚'
    },
    {
      title: 'Prevention First',
      description: 'Focusing on preventive care and lifestyle modifications to maintain optimal health.',
      icon: '🛡️'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ayurveda-50 to-earth-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ayurveda-800 mb-4">
              Meet Dr. Ishita Kesharwani
            </h1>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              A dedicated Ayurvedic practitioner committed to bringing ancient wisdom 
              into modern healthcare for holistic healing and wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-semibold text-ayurveda-800">
                  Dr. Ishita Kesharwani, BAMS
                </h2>
                <p className="text-lg text-sage-600 leading-relaxed">
                  Dr. Ishita Kesharwani is a qualified Ayurvedic practitioner, holding a <strong>BAMS (Bachelor of Ayurvedic Medicine and Surgery)</strong> degree from <strong>Lucknow University</strong>. With a strong foundation in traditional Ayurvedic medicine, she combines ancient healing practices with a modern approach to patient care.
                </p>
                <p className="text-sage-600 leading-relaxed">
                  She has gained valuable clinical experience during her time at <strong>Lokbandhu Government Hospital</strong>, where she treated a diverse range of patients and health conditions. Currently, Dr. Ishita is the founder and lead physician at her own <strong>Ayurveda Clinic</strong>, where she is committed to delivering personalized, holistic treatments rooted in the principles of Ayurveda.
                </p>
                <p className="text-sage-600 leading-relaxed">
                  Dr. Ishita believes in treating the root cause of illness and promoting natural healing through lifestyle changes, diet, and herbal remedies. Her compassionate care and dedication to patient wellness have made her a trusted name in the community.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-ayurveda-800">Education & Qualifications</h3>
                <div className="space-y-2">
                  {qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-ayurveda-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sage-600">{qualification}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-ayurveda-100 to-earth-100 rounded-3xl p-8 shadow-soft">
                <div className="text-center space-y-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-ayurveda-200 to-earth-200 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-6xl">👩‍⚕️</span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-semibold text-ayurveda-800">
                      "True healing comes from treating the root cause of illness, not just the symptoms. My mission is to guide you back to your natural state of health."
                    </h3>
                    <p className="text-sage-600 italic">- Dr. Ishita Kesharwani</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-earth-400 to-ayurveda-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-sage-400 to-ayurveda-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-20 bg-gradient-to-br from-sage-50 to-ayurveda-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Areas of Specialization</h2>
            <p className="section-subtitle">
              Dr. Ishita's expertise spans across various aspects of Ayurvedic medicine and wellness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-all duration-300">
                <div className="space-y-4">
                  <div className="text-4xl">{spec.icon}</div>
                  <h3 className="text-lg font-serif font-semibold text-ayurveda-800">
                    {spec.title}
                  </h3>
                  <p className="text-sage-600 text-sm">
                    {spec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Philosophy & Mission</h2>
            <p className="section-subtitle">
              We believe in the power of Ayurveda to transform lives through natural healing and holistic wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {philosophy.map((item, index) => (
              <div key={index} className="card hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                      {item.title}
                    </h3>
                    <p className="text-sage-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-ayurveda-50 to-earth-50 rounded-3xl p-8 md:p-12">
            <div className="text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-ayurveda-800">
                Our Mission
              </h3>
              <p className="text-lg text-sage-600 leading-relaxed max-w-4xl mx-auto">
                To make authentic Ayurvedic healing accessible to everyone, combining ancient wisdom with 
                modern convenience. We strive to educate, heal, and empower individuals to take control 
                of their health naturally, fostering a community of wellness that extends beyond our clinic walls.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/consultation" className="btn-primary">
                  Start Your Journey
                </Link>
                <Link to="/services" className="btn-outline">
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Achievements Section */}
      <section className="py-20 bg-ayurveda-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Experience & Achievements
            </h2>
            <p className="text-xl text-ayurveda-100 max-w-3xl mx-auto">
              A track record of successful treatments and satisfied patients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-white">BAMS</div>
              <div className="text-ayurveda-100 text-lg">Qualified Practitioner</div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-white">✓</div>
              <div className="text-ayurveda-100 text-lg">Hospital Experience</div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-white">🏥</div>
              <div className="text-ayurveda-100 text-lg">Clinic Founder</div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl md:text-5xl font-bold text-white">🌿</div>
              <div className="text-ayurveda-100 text-lg">Natural Healing</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-earth-50 to-ayurveda-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-ayurveda-800">
              Ready to Experience Ayurvedic Healing?
            </h2>
            <p className="text-xl text-sage-600 leading-relaxed">
              Schedule a consultation with Dr. Ishita to discuss your health concerns and 
              discover how Ayurveda can help you achieve optimal wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="btn-primary">
                Book Consultation
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 