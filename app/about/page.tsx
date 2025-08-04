/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
    const teamMembers = [
        {
            name: 'Emmanuel T. Oluwayomi',
            role: 'Founder & CEO',
            image: '/images/ceo.jpg',
            description: 'A visionary student entrepreneur with a passion for transforming education. Emmanuel founded Boss’s Academy to give learners across Africa smarter, easier ways to study. He leads all innovation, design, and partnerships—ensuring every student gets the tools they need to thrive.'
        },
        {
            name: 'Tatenda K. Gogoma',
            role: 'Head of Marketing & Techinal Advisor',
            image: '/images/mark.jpg',
            description: 'Tatenda is the creative force behind Boss’s Academy’s outreach and academic development.With strong IGCSE credentials and tech experience, she drives promotions, contributes to educational content, and advises on user needs—bridging marketing with student - focused impact.'
        },
    ];

    const milestones = [
        {
            year: '2023',
            title: 'January - Founded',
            description: 'Boss’s Academy is founded, with a mission to provide free, syllabus-aligned resources for IGCSE students.'
        },
        {
            year: '2023',
            title: 'March - Launched',
            description: ' Launch of our first website (built on Google Sites), featuring curated past papers and notes.'
        },
        {
            year: '2023',
            title: 'July - Platform Growth',
            description: 'Expanded to include A-Level resources, serving over 300 students.'
        },
        {
            year: '2024',
            title: 'Resource Farming',
            description: 'Dedicated focus on resource collection and organization, building up comprehensive content for IGCSE, and A-Level.'
        },
        {
            year: '2025',
            title: 'January - Mobile App Launch',
            description: 'Official mobile app development begins, starting with Resource Access.'
        },
        {
            year: '2025',
            title: 'April Mobile App Expansion',
            description: 'Integration of Study Tracker and Notification System.'
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
                        backgroundImage: `url('/images/about.jpg')`
                    }}
                ></div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold mb-6 text-[#edb232]">
                        About Boss's Academy
                    </h1>
                    <p className="text-xl text-[#a6a6a6] max-w-3xl mx-auto">
                        Learn Today, Lead Tomorrow - Our mission to transform education through innovative learning solutions
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-[#0b131c] mb-8">Our Mission</h2>
                        <p className="text-xl text-[#a6a6a6] mb-8">
                            At Boss's Academy, we believe that every student deserves access to high-quality educational resources that inspire learning and foster academic excellence. Founded on January 23, 2023, our mission is to bridge the gap between traditional education and modern learning needs.
                        </p>

                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <div className="text-6xl font-bold text-[#edb232] mb-4" style={{ fontFamily: 'Pacifico, serif' }}>
                                "Learn Today, Lead Tomorrow"
                            </div>
                            <p className="text-lg text-[#a6a6a6]">
                                This isn't just our motto - it's our commitment to empowering students with the knowledge, skills, and confidence they need to become the leaders of tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-[#0b131c] mb-6">Our Story</h2>
                            <p className="text-lg text-[#a6a6a6] mb-6">
                                Boss’s Academy was founded on January 23, 2023, with a vision to bridge the gap in quality education for students across Botswana and beyond. What began as a simple idea to make learning resources more accessible has grown into a full-fledged platform—offering free notes, past papers, interactive quizzes, and more for IGCSE, A-Level, and IB learners.
                            </p>
                            <p className="text-lg text-[#a6a6a6] mb-6">
                                Starting with a small collection of IGCSE materials, we've grown into a comprehensive e-learning platform serving students across IGCSE, A-Level, and IB programs. Our commitment to quality, innovation, and student success drives everything we do.
                            </p>
                            <p className="text-lg text-[#a6a6a6] mb-6">
                                Driven by passion, innovation, and a belief in equal opportunity, Boss’s Academy continues to empower students through technology, mentorship, and practical learning tools—both online and offline.
                            </p>
                            <p className="text-lg text-[#a6a6a6]">
                                We’re not just building a platform—we’re building a future of confident, capable learners.
                            </p>
                        </div>

                        <div className="w-full h-96 flex items-center justify-center bg-[radial-gradient(circle_at_center,_#325d8e,_#0b131c)] rounded-lg">
                            <div
                                className="w-48 h-48 bg-contain bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url('/images/logocircle.jpg')`
                                }}
                            ></div>
                        </div>


                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Our Core Values</h2>
                        <p className="text-xl text-[#a6a6a6]">
                            The principles that guide our mission and define our approach to education
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="w-16 h-16 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-4">
                                <i className="ri-lightbulb-line text-2xl text-[#0b131c]"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#0b131c] mb-3">Innovation</h3>
                            <p className="text-[#a6a6a6]">
                                We continuously evolve our methods and tools to meet the changing needs of modern education.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="w-16 h-16 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-4">
                                <i className="ri-shield-check-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#0b131c] mb-3">Quality</h3>
                            <p className="text-[#a6a6a6]">
                                Every resource we provide is carefully curated and reviewed by educational experts.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="w-16 h-16 flex items-center justify-center bg-[#edb232] rounded-full mx-auto mb-4">
                                <i className="ri-group-line text-2xl text-[#0b131c]"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#0b131c] mb-3">Accessibility</h3>
                            <p className="text-[#a6a6a6]">
                                We believe quality education should be accessible to all students, regardless of location.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <div className="w-16 h-16 flex items-center justify-center bg-[#325d8e] rounded-full mx-auto mb-4">
                                <i className="ri-heart-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-semibold text-[#0b131c] mb-3">Empowerment</h3>
                            <p className="text-[#a6a6a6]">
                                We empower students to take control of their learning journey and achieve their goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Meet Our Team</h2>
                        <p className="text-xl text-[#a6a6a6]">
                            The passionate educators and innovators behind Boss's Academy
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
                                <div
                                    className="w-48 h-48 bg-cover bg-center rounded-xl mx-auto mb-4"
                                    style={{
                                        backgroundImage: `url('${member.image}')`
                                    }}
                                ></div>
                                <h3 className="text-xl font-semibold text-[#0b131c] mb-2">{member.name}</h3>
                                <p className="text-[#edb232] font-semibold mb-3">{member.role}</p>
                                <p className="text-[#a6a6a6] text-sm">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#0b131c] mb-4">Our Journey</h2>
                        <p className="text-xl text-[#a6a6a6]">
                            Key milestones in our mission to transform education
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="flex-shrink-0 w-20 h-20 bg-[#edb232] rounded-full flex items-center justify-center mr-6">
                                        <span className="text-xl font-bold text-[#0b131c]">{milestone.year}</span>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
                                        <h3 className="text-xl font-semibold text-[#0b131c] mb-2">{milestone.title}</h3>
                                        <p className="text-[#a6a6a6]">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#0b131c] text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4 text-[#edb232]">Join Our Mission</h2>
                    <p className="text-xl mb-8 text-[#a6a6a6] max-w-2xl mx-auto">
                        Be part of the educational revolution. Whether you're a student, teacher, or education enthusiast, there's a place for you at Boss's Academy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/subjects" className="bg-[#edb232] text-[#0b131c] px-8 py-3 rounded-lg font-semibold hover:bg-[#d4a02c] transition-colors cursor-pointer whitespace-nowrap">
                            Start Learning
                        </Link>
                        <Link href="/contact" className="border-2 border-[#edb232] text-[#edb232] px-8 py-3 rounded-lg font-semibold hover:bg-[#edb232] hover:text-[#0b131c] transition-colors cursor-pointer whitespace-nowrap">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}