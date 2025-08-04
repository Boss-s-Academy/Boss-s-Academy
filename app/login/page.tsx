'use client';

import { useState } from 'react';
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
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{
          background: "radial-gradient(circle at center, #325d8e, #0b131c)"
      }}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to Boss&apos;s Academy
          </h2>
          <p className="mt-2 text-center text-sm text-[#a6a6a6]">
            Or{' '}
            <Link href="/signup" className="font-medium text-[#edb232] hover:text-[#edb232]/80 cursor-pointer">
              create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                placeholder="Enter your email"
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#edb232] focus:border-[#edb232] text-sm"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#edb232] focus:ring-[#edb232] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-[#edb232] hover:text-[#edb232]/80 cursor-pointer">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#edb232] hover:bg-[#edb232]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#edb232] disabled:opacity-50 whitespace-nowrap cursor-pointer">
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#edb232] whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-google-fill text-red-500 mr-2 w-5 h-5 flex items-center justify-center"></i>
                  Sign in with Google
                </button>
              </div>
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