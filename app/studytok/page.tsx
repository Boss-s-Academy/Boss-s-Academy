/* eslint-disable react/no-unescaped-entities */
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function StudyTok() {
  const features = [
    {
      icon: 'ri-question-line',
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with engaging quizzes designed for IGCSE, A-Level, and IB students.'
    },
    {
      icon: 'ri-flashlight-line',
      title: 'Quick Review',
      description: 'Bite-sized learning sessions perfect for revision on the go.'
    },
    {
      icon: 'ri-trophy-line',
      title: 'Progress Tracking',
      description: 'Monitor your learning progress and celebrate your achievements.'
    },
    {
      icon: 'ri-group-line',
      title: 'Study Groups',
      description: 'Connect with fellow students and participate in collaborative learning.'
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
            backgroundImage: `url('/images/subject.jpg')` 
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#edb232]">
            StudyTok App
          </h1>
          <p className="text-xl text-[#a6a6a6] max-w-3xl mx-auto mb-8">
            Experience learning like never before with our innovative offline quiz app designed specifically for modern students
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#edb232] text-[#0b131c] px-6 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer flex items-center gap-2">
              <i className="ri-download-line text-xl"></i>
              <span>Download App (Coming Soon)</span>
            </button>
            <button className="flex items-center border-2 border-[#edb232] text-[#edb232] px-8 py-3 rounded-lg font-semibold hover:bg-[#edb232] hover:text-[#0b131c] transition-colors cursor-pointer whitespace-nowrap gap-2">
              <i className="ri-play-circle-line text-xl"></i>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl dark:text-white font-bold text-[#0b131c] mb-4">Why Choose StudyTok?</h2>
            <p className="text-xl text-[#a6a6a6]">
              Revolutionary features designed to make learning engaging and effective
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-4">
                  <i className={`${feature.icon} text-2xl text-[#0b131c]`}></i>
                </div>
                <h3 className="text-xl dark:text-white font-semibold text-[#0b131c] mb-3">{feature.title}</h3>
                <p className="text-[#a6a6a6]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl dark:text-white font-bold text-[#0b131c] mb-6">
                Learning Made Simple
              </h2>
              <p className="text-lg text-[#a6a6a6] mb-6">
                StudyTok transforms traditional studying into an interactive, engaging experience. Our offline quiz app allows you to learn anytime, anywhere, without needing an internet connection.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#325d8e] rounded-full mr-4">
                    <i className="ri-check-line text-white"></i>
                  </div>
                  <span className="text-[#0b131c] dark:text-white">Offline quiz functionality</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#325d8e] rounded-full mr-4">
                    <i className="ri-check-line text-white"></i>
                  </div>
                  <span className="text-[#0b131c] dark:text-white">Personalized learning paths</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#325d8e] rounded-full mr-4">
                    <i className="ri-check-line text-white"></i>
                  </div>
                  <span className="text-[#0b131c] dark:text-white">Real-time progress tracking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#325d8e] rounded-full mr-4">
                    <i className="ri-check-line text-white"></i>
                  </div>
                  <span className="text-[#0b131c] dark:text-white">Comprehensive subject coverage</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0b131c] to-[#325d8e] rounded-2xl p-8 text-center">
                <div 
                  className="h-96 bg-cover bg-center rounded-lg mb-6"
                  style={{ 
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=Smartphone%20mockup%20showing%20educational%20quiz%20app%20interface%20with%20colorful%20question%20screens%2C%20interactive%20buttons%2C%20and%20progress%20indicators%2C%20modern%20mobile%20app%20design%20with%20clean%20UI%20elements%2C%20bright%20and%20engaging%20educational%20technology%20display%2C%20professional%20app%20screenshot%20presentation&width=400&height=600&seq=app-preview&orientation=portrait')` 
                  }}
                ></div>
                <p className="text-white text-lg">
                  Experience the future of mobile learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-[#0b131c] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#edb232]">App Launch Coming Soon!</h2>
          <p className="text-xl mb-8 text-[#a6a6a6] max-w-2xl mx-auto">
            We're putting the finishing touches on StudyTok. Be the first to know when it's available by joining our notification list.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-[#0b131c] text-sm"
              />
              <button className="bg-[#edb232] text-[#0b131c] px-6 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-6">
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-2">
                <i className="ri-smartphone-line text-xl text-white"></i>
              </div>
              <p className="text-sm text-[#a6a6a6]">Android Only</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-2">
                <i className="ri-download-cloud-line text-xl text-white"></i>
              </div>
              <p className="text-sm text-[#a6a6a6]">Offline Mode (Premium Feature)</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-2">
                <i className="ri-wifi-off-line text-xl text-white"></i>
              </div>
               <p className="text-sm text-[#a6a6a6]">Free Download</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}