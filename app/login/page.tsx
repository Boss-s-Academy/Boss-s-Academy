'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

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


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0b131c] to-[#325d8e] p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
        
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
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
                Sign in to <span className="text-[#edb232] font-semibold">Boss's Academy</span> 
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

            <div className="text-center text-sm text-gray-500">
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
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Create Account</h2>
                <p className="text-sm text-gray-600 text-center">
                  Join <span className="text-[#edb232] font-semibold">Boss's Academy</span>
                </p>
                <form className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
                  <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" />
                  <button className="w-full bg-[#edb232] text-white py-2 rounded-lg">Sign Up</button>
                </form>
                <p className="text-sm text-center text-gray-500">
                  Already have an account?{' '}
                  <button onClick={() => setIsLogin(true)} className="text-[#edb232] hover:underline">Sign in</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel */}
              <div className="hidden md:flex w-1/2 bg-gradient-to-r from-[#0b131c] to-[#325d8e] items-center justify-center p-8 text-white text-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Boss's Academy</h3>
            <p className="text-sm">Learn. Build. Lead.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
