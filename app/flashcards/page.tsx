'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Flashcards() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-[#0b131c] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b131c]/90 to-[#0b131c]/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Stack%20of%20colorful%20flashcards%20and%20study%20cards%20arranged%20on%20a%20wooden%20desk%2C%20bright%20educational%20setting%20with%20organized%20learning%20materials%2C%20modern%20study%20tools%20with%20clean%20design%2C%20academic%20environment%20promoting%20memorization%20and%20active%20learning%2C%20professional%20educational%20photography&width=1920&height=600&seq=flashcards-hero&orientation=landscape')` 
          }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#edb232]">
            Digital Flashcards
          </h1>
          <p className="text-xl text-[#a6a6a6] max-w-3xl mx-auto">
            Revolutionary flashcard system designed to enhance memory retention and accelerate learning
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-6">
                <i className="ri-flashlight-line text-4xl text-[#0b131c]"></i>
              </div>
              <h2 className="text-4xl font-bold text-[#0b131c] mb-6">
                Coming Soon!
              </h2>
              <p className="text-xl text-[#a6a6a6] mb-8">
                We're developing an innovative digital flashcard system that will revolutionize how you memorize and retain information. Our team is working hard to bring you the most effective study tool for IGCSE, A-Level, and IB students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-4">
                  <i className="ri-brain-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0b131c] mb-4">Smart Learning</h3>
                <p className="text-[#a6a6a6]">
                  AI-powered spaced repetition algorithm that adapts to your learning pace and optimizes retention.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-4">
                  <i className="ri-stack-line text-2xl text-[#0b131c]"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0b131c] mb-4">Organized Decks</h3>
                <p className="text-[#a6a6a6]">
                  Pre-made flashcard decks for every subject, plus the ability to create and customize your own.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-4">
                  <i className="ri-bar-chart-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-semibold text-[#0b131c] mb-4">Progress Tracking</h3>
                <p className="text-[#a6a6a6]">
                  Detailed analytics showing your learning progress, retention rates, and areas for improvement.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
              <h3 className="text-2xl font-bold text-[#0b131c] mb-6">What to Expect</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Interactive flip animations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Multi-media support (images, audio)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Offline study mode</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Collaborative study decks</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Cross-platform synchronization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Performance analytics</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Study reminders</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center bg-[#edb232] rounded-full mr-3">
                      <i className="ri-check-line text-sm text-[#0b131c]"></i>
                    </div>
                    <span className="text-[#0b131c]">Export/import functionality</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0b131c] to-[#325d8e] p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4 text-[#edb232]">Be the First to Know</h3>
              <p className="text-lg mb-6">
                Join our notification list to get early access to the flashcard feature and exclusive beta testing opportunities.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg text-[#0b131c] text-sm"
                  />
                  <button className="bg-[#edb232] text-[#0b131c] px-6 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
                    Get Notified
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Development Timeline</h2>
            <p className="text-xl text-[#a6a6a6]">
              Our roadmap for bringing you the best digital flashcard experience
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#edb232]"></div>
              
              <div className="space-y-12">
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#0b131c] mb-2">Phase 1: Design & Planning</h3>
                      <p className="text-[#a6a6a6] mb-2">User research, UI/UX design, and feature planning</p>
                      <span className="text-sm text-[#325d8e] font-semibold">Completed</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-[#325d8e] rounded-full relative z-10">
                    <i className="ri-check-line text-white"></i>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-8 h-8 flex items-center justify-center bg-[#edb232] rounded-full relative z-10">
                    <i className="ri-code-line text-[#0b131c]"></i>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#0b131c] mb-2">Phase 2: Development</h3>
                      <p className="text-[#a6a6a6] mb-2">Core functionality, algorithms, and database design</p>
                      <span className="text-sm text-[#edb232] font-semibold">In Progress</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#0b131c] mb-2">Phase 3: Testing</h3>
                      <p className="text-[#a6a6a6] mb-2">Beta testing, bug fixes, and performance optimization</p>
                      <span className="text-sm text-[#a6a6a6] font-semibold">Upcoming</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-[#a6a6a6] rounded-full relative z-10">
                    <i className="ri-bug-line text-white"></i>
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-8 h-8 flex items-center justify-center bg-[#a6a6a6] rounded-full relative z-10">
                    <i className="ri-rocket-line text-white"></i>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-[#0b131c] mb-2">Phase 4: Launch</h3>
                      <p className="text-[#a6a6a6] mb-2">Official release and feature rollout</p>
                      <span className="text-sm text-[#a6a6a6] font-semibold">Q2 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0b131c] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#edb232]">Stay Connected</h2>
          <p className="text-xl mb-8 text-[#a6a6a6] max-w-2xl mx-auto">
            While we work on bringing you the best flashcard experience, explore our other resources and stay updated on our progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subjects" className="bg-[#edb232] text-[#0b131c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
              Browse Study Materials
            </Link>
            <Link href="/contact" className="border-2 border-[#edb232] text-[#edb232] px-8 py-3 rounded-lg font-semibold hover:bg-[#edb232] hover:text-[#0b131c] transition-colors cursor-pointer whitespace-nowrap">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}