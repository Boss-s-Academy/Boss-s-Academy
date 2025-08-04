/* eslint-disable react/no-unescaped-entities */

'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
          <section className="relative h-screen flex items-center justify-center bg-cover bg-center bg-[#0b131c] text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b131c]/90 to-[#0b131c]/90"></div>
              <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{
                      backgroundImage: "url('/images/home_bg.jpg')"  
                  }}
              ></div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#edb232]" style={{ fontFamily: 'Pacifico' }}>
            Welcome to Boss's Academy
            </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Learn Today, Lead Tomorrow
          </p>
          <p className="text-lg mb-8 text-[#ffffff] max-w-2xl mx-auto">
            Your ultimate e-learning platform for IGCSE, A-Level, and IB students. Access comprehensive resources, downloadable notes, and innovative study tools to excel in your academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subjects" className="bg-[#edb232] text-[#0b131c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
              Explore Subjects
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Our Mission</h2>
            <p className="text-xl text-[#a6a6a6] max-w-3xl mx-auto">
              At Boss's Academy, we believe that every student has the potential to excel hence why our mission is to provide comprehensive, accessible, and engaging educational resources that empower students to achieve their academic goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-4">
                <i className="ri-book-open-line text-2xl text-[#0b131c]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#0b131c] mb-4">Quality Resources</h3>
              <p className="text-[#a6a6a6]">
                Comprehensive study materials, notes, and past papers carefully curated for IGCSE, A-Level, and IB students.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-4">
                <i className="ri-smartphone-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#0b131c] mb-4">Innovative Learning</h3>
              <p className="text-[#a6a6a6]">
                Experience learning through our StudyTok app with interactive quizzes and engaging content designed for modern students.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-4">
                <i className="ri-trophy-line text-2xl text-[#0b131c]"></i>
              </div>
              <h3 className="text-xl font-semibold text-[#0b131c] mb-4">Success Focused</h3>
              <p className="text-[#a6a6a6]">
                Our goal is your success. We provide the tools and support you need to excel in your examinations and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Featured Resources</h2>
            <p className="text-xl text-[#a6a6a6]">
              Discover our most popular study materials and tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/images/igcse.jpg')` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0b131c] mb-2">IGCSE Resources</h3>
                <p className="text-[#a6a6a6] mb-4">
                  Complete study guides, revision notes, and past papers for all IGCSE subjects.
                </p>
                <Link href="/subjects" className="text-[#325d8e] hover:text-[#edb232] font-semibold cursor-pointer">
                  Explore IGCSE →
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/images/alevel.jpg')` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0b131c] mb-2">A-Level Materials</h3>
                <p className="text-[#a6a6a6] mb-4">
                  Advanced study materials and comprehensive revision resources for A-Level success.
                </p>
                <Link href="/subjects" className="text-[#325d8e] hover:text-[#edb232] font-semibold cursor-pointer">
                  Explore A-Level →
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/images/ib.jpg')` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0b131c] mb-2">IB Support</h3>
                <p className="text-[#a6a6a6] mb-4">
                  Comprehensive International Baccalaureate resources and study guides.
                </p>
                <Link href="/subjects" className="text-[#325d8e] hover:text-[#edb232] font-semibold cursor-pointer">
                  Explore IB →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/images/person.jpg')` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0b131c] mb-2">Pearson Resources - Upcoming</h3>
                <p className="text-[#a6a6a6] mb-4">
                  Complete study guides, revision notes, and past papers for Pearson subjects(Upcoming).
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/images/olevel.jpg')` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0b131c] mb-2">Cambridge O Level Resources - Upcoming</h3>
                <p className="text-[#a6a6a6] mb-4">
                  Complete study guides, revision notes, and past papers for O Level subjects(Upcoming).
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/images/other.jpg')` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0b131c] mb-2">Other more to come</h3>
                <p className="text-[#a6a6a6] mb-4">
                  We plan on diversifying to national based curriculum, such which are BGCSE, JCE, and PSLE.
                </p> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0b131c] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#edb232]">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-[#a6a6a6] max-w-2xl mx-auto">
            Join thousands of students who have transformed their academic performance with Boss's Academy. Your success story starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subjects" className="bg-[#edb232] text-[#0b131c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
              Start Learning Now
            </Link>
            <Link href="/contact" className="border-2 border-[#edb232] text-[#edb232] px-8 py-3 rounded-lg font-semibold hover:bg-[#edb232] hover:text-[#0b131c] transition-colors cursor-pointer whitespace-nowrap">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

          {isVisible && (
              <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-6 right-6 z-50 bg-[#edb232] text-white p-3 rounded-full shadow-lg hover:bg-[#d4a02c] transition-all"
                  aria-label="Back to top"
              >
                  <RiArrowUpSLine className="text-2xl" />
              </button>
          )}
      <Footer />
    </div>
  );
}
