/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, rtdb} from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface School {
    id: string;
    name: string;
    address?: string;
    district?: string;
}

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Fetch schools from Firebase Realtime Database
    useEffect(() => {
        // Fast check
        if (auth.currentUser) {
            router.push('/');
            return;
        }

        // Fallback to listener (slower)
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push('/');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        school: '',
        userType: 'student'
    });
    const [schools, setSchools] = useState<School[]>([]);
    const [schoolsLoading, setSchoolsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
    useEffect(() => {
        const schoolsRef = ref(rtdb, 'Schools');

        const unsubscribe = onValue(schoolsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const schoolsList: School[] = Object.keys(data).map(key => ({
                    id: key,
                    name: data[key].name || key,
                    address: data[key].address,
                    district: data[key].district
                }));
                setSchools(schoolsList);
            }
            setSchoolsLoading(false);
        }, (error) => {
            console.error('Error fetching schools:', error);
            setSchoolsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSchoolSelect = (schoolId: string) => {
        setFormData({
            ...formData,
            school: schoolId
        });
        setShowSchoolDropdown(false);
    };

    const getSelectedSchoolName = () => {
        const selectedSchool = schools.find(school => school.id === formData.school);
        return selectedSchool ? selectedSchool.name : 'Select your school';
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (formData.userType === 'student' && !formData.school ) {
            setError('Please select your school');
            setLoading(false);
            return;
        }

        if (formData.school === " Select a school") {
            setError('Please select your school');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            // Save user data to Realtime Database
            const userRef = ref(rtdb, `Users/${userCredential.user.uid}`);
            await set(userRef, {
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                userType: formData.userType,
                school: formData.userType === 'student' ? formData.school : null,
            });

            router.push('/');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b131c] to-[#325d8e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-white">
                        Join Boss's Academy
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#a6a6a6]">
                        Or{' '}
                        <Link href="/login" className="font-medium text-[#edb232] hover:text-[#edb232]/80 cursor-pointer">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-8">
                    {/* User Type Selection */}
                    <div className="mb-6">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, userType: 'student', school: '' })}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${formData.userType === 'student'
                                        ? 'bg-[#edb232] text-white'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <i className="ri-graduation-cap-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, userType: 'teacher', school: '' })}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${formData.userType === 'teacher'
                                        ? 'bg-[#edb232] text-white'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <i className="ri-user-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                                Teacher
                            </button>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSignup}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                required
                                value={formData.firstname}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                required
                                value={formData.lastname}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                                placeholder={`Enter your ${formData.userType} email`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                School *
                            </label>
                            <div className="relative mt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                                    disabled={schoolsLoading}
                                    className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm bg-white cursor-pointer pr-8"
                                >
                                    <span className={formData.school ? 'text-gray-900' : 'text-gray-500'}>
                                        {schoolsLoading ? 'Loading schools...' : getSelectedSchoolName()}
                                    </span>
                                    {schoolsLoading ? (
                                        <i className="ri-loader-4-line animate-spin w-4 h-4 flex items-center justify-center"></i>
                                    ) : (
                                        <i className={`ri-arrow-${showSchoolDropdown ? 'up' : 'down'}-s-line w-4 h-4 flex items-center justify-center`}></i>
                                    )}
                                </button>

                                {showSchoolDropdown && !schoolsLoading && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                        {schools.length === 0 ? (
                                            <div className="px-4 py-2 text-gray-500 text-sm">No schools found</div>
                                        ) : (
                                            schools.map((school) => (
                                                <button
                                                    key={school.id}
                                                    type="button"
                                                    onClick={() => handleSchoolSelect(school.id)}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-[#edb232]/10 focus:bg-[#edb232]/10 focus:outline-none cursor-pointer"
                                                >
                                                    <div className="font-medium">{school.name}</div>
                                                    {school.address && (
                                                        <div className="text-gray-500 text-xs">{school.address}</div>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="agree-terms"
                                name="agree-terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-[#edb232] focus:ring-[#edb232] border-gray-300 rounded"
                            />
                            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the{' '}
                                <Link href="/terms" className="text-[#edb232] hover:text-[#edb232]/80 cursor-pointer">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-[#edb232] hover:text-[#edb232]/80 cursor-pointer">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#edb232] hover:bg-[#edb232]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#edb232] disabled:opacity-50 whitespace-nowrap cursor-pointer"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <i className="ri-loader-4-line animate-spin mr-2 w-4 h-4 flex items-center justify-center"></i>
                                        Creating account...
                                    </span>
                                ) : (
                                    `Create ${formData.userType === 'student' ? 'Student' : 'Teacher'} Account`
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center">
                    <Link href="/" className="text-[#edb232] hover:text-[#edb232]/80 cursor-pointer">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}