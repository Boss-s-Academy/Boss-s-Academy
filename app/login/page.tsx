/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, rtdb } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ref, onValue, set } from 'firebase/database';

interface School {
    id: string;
    name: string;
    address?: string;
    district?: string;
}

type UserType = "student" | "teacher";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("student");
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const handleSchoolSelect = (schoolId: string) => {
      setFormData({
          ...formData,
          school: schoolId
      });
      setShowSchoolDropdown(false);
  };
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
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
    useEffect(() => {
        setFormData(prev => ({ ...prev, userType }));
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
          console.error('Error fetching schools:', error);           setSchoolsLoading(false);
      });
      return () => unsubscribe();
 }, [userType]);

  const getSelectedSchoolName = () => {
      const selectedSchool = schools.find(school => school.id === formData.school);
      return selectedSchool ? selectedSchool.name : 'Select your school';
   };

  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
          await signInWithEmailAndPassword(auth, email, password);
              router.push('/dashboard');
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        setError('');
        setLoading(true);

        try {
            // Step 1: User signs in with Google popup
            const result = await signInWithPopup(auth, provider);
            const googleUser = result.user;
            const email = googleUser.email;

            if (!email) {
                throw new Error('Google account must have an email.');
            }

            // Step 2: Check what sign-in methods exist for this email
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            const googleLinked = signInMethods.includes('google.com');

            if (googleLinked) {
                // ✅ Google is already linked, proceed to dashboard
                router.push('/dashboard');
            } else {
                // ❌ Google not linked, show instruction
                setError('This email is registered with a password. Please log in using email & password. You can link Google from your dashboard later.');
                await auth.signOut(); // Clear wrong sign-in
            }
        } catch (error: any) {
            console.error(error);
            if (error.code !== 'auth/popup-closed-by-user') {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
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

        if (!formData.school) {
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
            if (userType === 'student') {
                const userRef = ref(rtdb, `Users/${userCredential.user.uid}`);
                await set(userRef, {
                    firstName: formData.firstname,
                    lastName: formData.lastname,
                    email: formData.email,
                    userType: formData.userType,
                    school: formData.school,
                });
            } else {
                const userRef = ref(rtdb, `Users/${userCredential.user.uid}`);
                await set(userRef, {
                    firstName: formData.firstname,
                    lastName: formData.lastname,
                    email: formData.email,
                    userType: formData.userType,
                    school: formData.school,
                });
            }

            router.push('/');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

  return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{
          background: "radial-gradient(circle at center, #325d8e, #0b131c)",
      }}>
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
        
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-8 space-y-6 justify-center">
        <div className="mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  userType === 'student'
                    ? 'bg-[#edb232] text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="ri-graduation-cap-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('teacher')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  userType === 'teacher'
                    ? 'bg-[#edb232] text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <i className="ri-user-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                Teacher
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-sm text-gray-600">
                  Sign in to <span className="text-[#edb232] font-semibold">Boss's Academy</span> or{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="font-medium text-[#edb232] hover:text-[#edb232]/80 cursor-pointer underline"
                  >
                    create a new account
                  </button>
                </p>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox text-[#edb232]" />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-[#edb232] hover:underline">Forgot password?</Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#edb232] hover:bg-[#edb232]/90 text-white font-semibold py-3 rounded-lg shadow transition-all duration-150 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="flex items-center space-x-2 text-sm py-5 text-gray-500">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 text-sm font-medium text-gray-700 transition"
            >
               <i className="ri-google-fill text-red-500 mr-2 w-5 h-5 flex items-center justify-center"></i>
              Continue with Google
            </button>

            <div className="text-center text-sm py-5 text-gray-500">
              <Link href="/" className="text-[#edb232] hover:underline">← Back to Home</Link>
            </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
              <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Become a Young Boss</h2>
              <p className="mt-2 text-sm text-gray-600">
                  or {' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="font-medium text-[#edb232] hover:text-[#edb232]/80 cursor-pointer underline"
                  >
                    sign in to your existing account
                  </button>
                </p>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}
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

                    {/* Inside signup form */}
                    {(formData.userType === 'student' || formData.userType === 'teacher') && (
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
                    )}

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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel */}
          <div
          className="hidden md:flex w-1/2 items-center justify-center p-8 text-center "
          style={{
            background: "radial-gradient(circle at center, #325d8e, #0b131c)",
          }}
        >
          <div>
            <h3 className="text-4xl text-[#edb232] font-bold mb-4">Boss's Academy</h3>
            <h3 className="text-white text-lg">
              Your ultimate destination for top-notch resources and tools. Get ready to explore a world of learning made simple, fun, and effective
            </h3>
            <div className="flex justify-center py-5">
              <Image
                src="/images/student2.jpg"
                alt="Student Illustration"
                width={250}
                height={250}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
