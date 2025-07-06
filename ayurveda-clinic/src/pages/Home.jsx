import React from 'react';
import { Link } from 'react-router-dom';
import YouTubeSection from '../components/YouTubeSection';

const Home = () => {
  const services = [
    {
      icon: '🧘‍♀️',
      title: 'Panchakarma Therapy',
      description: 'Traditional detox and rejuvenation treatments',
      link: '/services'
    },
    {
      icon: '🌿',
      title: 'Herbal Consultations',
      description: 'Personalized herbal medicine prescriptions',
      link: '/services'
    },
    {
      icon: '🍃',
      title: 'Detox Programs',
      description: 'Complete body purification programs',
      link: '/services'
    },
    {
      icon: '🥗',
      title: 'Diet & Nutrition',
      description: 'Ayurvedic dietary guidance and planning',
      link: '/services'
    },
    {
      icon: '💆‍♀️',
      title: 'Stress Relief',
      description: 'Mental wellness and stress management',
      link: '/services'
    },
    {
      icon: '🌺',
      title: 'Women\'s Health',
      description: 'Specialized care for women\'s wellness',
      link: '/services'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      text: 'Dr. Ishita\'s treatment for my chronic digestive issues was life-changing. Her holistic approach and personalized care made all the difference.',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      text: 'The Panchakarma therapy here helped me recover from years of stress and anxiety. I feel completely rejuvenated.',
      rating: 5
    },
    {
      name: 'Anita Patel',
      location: 'Bangalore',
      text: 'Excellent consultation and treatment for PCOS. Dr. Ishita\'s knowledge and compassionate approach is remarkable.',
      rating: 5
    }
  ];

  const featuredContent = [
    {
      title: 'Understanding Your Dosha',
      category: 'Wellness Guide',
      excerpt: 'Learn about the three doshas (Vata, Pitta, Kapha) and how they influence your health and well-being.',
      image: '🔮',
      readTime: '5 min read'
    },
    {
      title: 'Seasonal Ayurvedic Practices',
      category: 'Lifestyle',
      excerpt: 'Discover how to align your daily routine with the seasons for optimal health and balance.',
      image: '🌸',
      readTime: '7 min read'
    },
    {
      title: 'Herbal Remedies for Common Ailments',
      category: 'Natural Healing',
      excerpt: 'Safe and effective herbal solutions for everyday health concerns you can try at home.',
      image: '🌿',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ayurveda-50 via-earth-50 to-sage-50 bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ayurveda-800 leading-tight">
                  Discover the Ancient Wisdom of 
                  <span className="gradient-text block">Ayurveda</span>
                </h1>
                <p className="text-lg md:text-xl text-sage-600 leading-relaxed">
                  Experience holistic healing and wellness with Dr. Ishita, a certified Ayurvedic practitioner 
                  dedicated to restoring balance and vitality in your life through time-tested natural remedies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consultation" className="btn-primary text-center">
                  Book Your Consultation
                </Link>
                <Link to="/about" className="btn-outline text-center">
                  Meet Dr. Ishita
                </Link>
              </div>
              <div className="flex items-center space-x-8 text-sm text-sage-600">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-ayurveda-500 rounded-full"></span>
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-earth-500 rounded-full"></span>
                  <span>1000+ Happy Patients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-sage-500 rounded-full"></span>
                  <span>Certified Practitioner</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-ayurveda-100 to-earth-100 rounded-3xl p-8 shadow-soft">
                <div className="text-center space-y-6">
                  <div className="text-8xl">🧘‍♀️</div>
                  <h3 className="text-2xl font-serif font-semibold text-ayurveda-800">
                    Your Journey to Wellness Starts Here
                  </h3>
                  <p className="text-sage-600">
                    Personalized treatments based on your unique constitution and health needs
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-earth-400 to-ayurveda-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-sage-400 to-ayurveda-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Ayurvedic Services</h2>
            <p className="section-subtitle">
              Comprehensive healing solutions tailored to your individual needs and constitution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card hover:scale-105 transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="text-4xl">{service.icon}</div>
                  <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                    {service.title}
                  </h3>
                  <p className="text-sage-600 text-sm">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-ayurveda-600 hover:text-ayurveda-700 font-medium text-sm group"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <YouTubeSection />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-ayurveda-50 to-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="section-title text-left">Why Choose Dr. Ishita's Ayurveda Clinic?</h2>
                <p className="text-sage-600 text-lg">
                  We combine ancient Ayurvedic wisdom with modern healthcare practices to provide 
                  comprehensive, personalized treatment plans.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-ayurveda-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ayurveda-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ayurveda-800 mb-2">Personalized Treatment Plans</h4>
                    <p className="text-sage-600 text-sm">Every treatment is customized based on your unique constitution, lifestyle, and health goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-ayurveda-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ayurveda-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ayurveda-800 mb-2">Certified & Experienced</h4>
                    <p className="text-sage-600 text-sm">Dr. Ishita brings over 15 years of experience in traditional Ayurvedic medicine.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-ayurveda-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ayurveda-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ayurveda-800 mb-2">Holistic Approach</h4>
                    <p className="text-sage-600 text-sm">We address the root cause of illness, not just the symptoms, for lasting wellness.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-ayurveda-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ayurveda-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-ayurveda-800 mb-2">Natural & Safe</h4>
                    <p className="text-sage-600 text-sm">All treatments use natural herbs and therapies with minimal side effects.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-serif font-semibold text-ayurveda-800">
                    Ready to Begin Your Healing Journey?
                  </h3>
                  <p className="text-sage-600">
                    Schedule your consultation today and discover how Ayurveda can transform your health and well-being.
                  </p>
                  <div className="space-y-4">
                    <Link to="/consultation" className="btn-primary w-full inline-block text-center">
                      Book Consultation Now
                    </Link>
                    <Link to="/contact" className="btn-outline w-full inline-block text-center">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Patients Say</h2>
            <p className="section-subtitle">
              Real stories from people who have transformed their health with our Ayurvedic treatments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-earth-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sage-700 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-ayurveda-800">{testimonial.name}</p>
                    <p className="text-sm text-sage-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-20 bg-gradient-to-br from-sage-50 to-ayurveda-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Wellness Content</h2>
            <p className="section-subtitle">
              Explore our guides and articles on Ayurvedic wisdom and natural healing
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((content, index) => (
              <div key={index} className="card hover:scale-105 transition-all duration-300">
                <div className="space-y-4">
                  <div className="text-4xl text-center">{content.image}</div>
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-ayurveda-100 text-ayurveda-700 text-xs font-medium rounded-full">
                      {content.category}
                    </span>
                    <h3 className="text-xl font-serif font-semibold text-ayurveda-800">
                      {content.title}
                    </h3>
                    <p className="text-sage-600 text-sm">
                      {content.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-sage-500">{content.readTime}</span>
                    <button className="text-ayurveda-600 hover:text-ayurveda-700 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ayurveda-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">
              Start Your Ayurvedic Journey Today
            </h2>
            <p className="text-xl text-ayurveda-100 leading-relaxed">
              Take the first step towards natural healing and holistic wellness. 
              Our expert consultations are designed to understand your unique needs and create 
              a personalized treatment plan just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/consultation" className="btn-secondary">
                Schedule Consultation
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-ayurveda-700">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 