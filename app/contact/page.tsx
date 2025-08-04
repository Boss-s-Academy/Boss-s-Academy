/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
   const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');
  setSubmitStatus('');

  try {
    // Instead of submitting, you just show an error message telling user to email directly
    setError('The Contact email is not available at the moment. Please directly send your query to bosssacademy906@gmail.com.');
  } catch (error: any) {
    console.error(error);
    if (error.message) {
      setError(error.message);
    } else {
      setError('An unexpected error occurred.');
    }
  } finally {
    setIsSubmitting(false);
  }
};


  const contactMethods = [
    {
      icon: 'ri-mail-line',
      title: 'Email Us',
      description: 'Get in touch with our team',
      contact: 'bossacademy906@gmail.com',
      action: 'mailto:bossacademy906@gmail.com'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Support Center',
      description: 'Get help with your studies',
      contact: 'Available 24/7',
      action: '#form'
    },
    {
      icon: 'ri-question-answer-line',
      title: 'FAQ',
      description: 'Find answers to common questions',
      contact: 'Browse FAQ',
      action: '#faq'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-[#0b131c] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b131c]/90 to-[#0b131c]/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: `url('/images/contact.jpg')` 
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#edb232]">
            Contact Us
          </h1>
          <p className="text-xl text-[#a6a6a6] max-w-3xl mx-auto">
            Have questions about our resources or need academic guidance? We're here to help you succeed in your educational journey.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Get in Touch</h2>
            <p className="text-xl text-[#a6a6a6]">
              Choose the best way to reach us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-4">
                  <i className={`${method.icon} text-2xl text-[#0b131c]`}></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0b131c] mb-3">{method.title}</h3>
                <p className="text-[#a6a6a6] mb-4">{method.description}</p>
                <Link href={method.action} className="text-[#325d8e] hover:text-[#d4a02c] font-semibold cursor-pointer">
                  {method.contact} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white" id="form">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
              {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
                <h2 className="text-4xl font-bold text-[#0b131c] mb-6">Send us a Message</h2>
                <p className="text-lg text-[#a6a6a6] mb-8">
                  Fill out the form below and we'll get back to you as soon as possible. Whether you have questions about our resources, need technical support, or want to provide feedback, we're here to help.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#325d8e] rounded-full mr-4">
                      <i className="ri-time-line text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0b131c]">Response Time</h3>
                      <p className="text-[#a6a6a6]">We typically respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#edb232] rounded-full mr-4">
                      <i className="ri-shield-check-line text-[#0b131c]"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0b131c]">Privacy</h3>
                      <p className="text-[#a6a6a6]">Your information is secure and confidential</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#325d8e] rounded-full mr-4">
                      <i className="ri-customer-service-2-line text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0b131c]">Support</h3>
                      <p className="text-[#a6a6a6]">Dedicated team ready to assist you</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#0b131c] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0b131c] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#0b131c] mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm pr-8"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="resources">Resource Request</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#0b131c] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm resize-none"
                      placeholder="Enter your message (max 500 characters)"
                    />
                    <div className="text-right text-sm text-[#a6a6a6] mt-1">
                      {formData.message.length}/500
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || formData.message.length > 500}
                    className="w-full bg-[#edb232] text-[#0b131c] py-3 px-6 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                    <p className="text-green-700 font-semibold">Thank you for your message!</p>
                    <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                    <p className="text-red-700 font-semibold">Sorry, there was an error sending your message.</p>
                    <p className="text-red-600 text-sm">Please try again or contact us directly at bossacademy906@gmail.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50" id="faq">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-[#a6a6a6]">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-[#0b131c] mb-3">How do I access the study materials?</h3>
              <p className="text-[#a6a6a6]">
                Simply browse our Subjects page and click on the download buttons for notes or past papers. All materials are free to access.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-[#0b131c] mb-3">When will StudyTok be available?</h3>
              <p className="text-[#a6a6a6]">
                We're working hard to launch StudyTok soon. Join our notification list to be the first to know when it's ready.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-[#0b131c] mb-3">Do you offer personalized tutoring?</h3>
              <p className="text-[#a6a6a6]">
                Currently, we focus on providing high-quality resources. Contact us to discuss your specific needs and we'll see how we can help.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-[#0b131c] mb-3">How can I suggest new resources?</h3>
              <p className="text-[#a6a6a6]">
                We love hearing from our users! Use the contact form above with "Resource Request" as the subject to share your suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0b131c] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#edb232]">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-[#a6a6a6] max-w-2xl mx-auto">
            Don't wait - explore our comprehensive resources and join thousands of successful students today.
          </p>
          <Link href="/subjects" className="bg-[#edb232] text-[#0b131c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
            Browse Resources
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}