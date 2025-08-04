'use client';

import { useState, useEffect } from 'react';
import { User, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, rtdb } from '@/lib/firebase';
import { ref, get,} from 'firebase/database';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
   const [profileData, setProfileData] = useState({
      displayName: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
   });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        setProfileData(prev => ({
          ...prev,
          displayName: user.displayName || '',
          email: user.email || ''
        }));
          await Promise.all([
              loadUserNames(user.uid)
          ]);
      } else {
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const loadUserNames = async (uid: string) => {
      try {
        const userRef = ref(rtdb, `Users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setProfileData(prev => ({
            ...prev,
            firstname: data.firstName || '',
            lastname: data.lastName || ''
          }));
        }
      } catch (error) {
        console.error('Error loading names:', error);
      }
  };

  const handleSignOut = async () => {
      try {
        await signOut(auth);
        setShowDropdown(false);
        window.location.reload(); // Reloads the current page
      } catch (error) {
        console.error('Error signing out:', error);
      }
   };

  if (loading) {
    return (
      <div className="w-8 h-8 bg-[#edb232]/20 rounded-full animate-pulse"></div>
    );
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 text-white hover:text-[#edb232] transition-colors cursor-pointer"
        >
          <div className="w-8 h-8 bg-[#edb232] rounded-full flex items-center justify-center">
            <span className="text-[#0b131c] font-semibold text-sm">
              {profileData.firstname?.charAt(0) || user?.email?.charAt(0)}
            </span>
          </div>
          <span className="hidden md:inline whitespace-nowrap">
            {profileData.firstname && profileData.lastname
                      ? `${profileData.firstname} ${profileData.lastname}`
                      : user?.displayName || 'User'}
          </span>
          <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center"></i>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                <p className="font-medium">{profileData.firstname && profileData.lastname
                      ? `${profileData.firstname} ${profileData.lastname}`
                      : user?.displayName || 'User'}</p>
                <p className="text-gray-500 text-xs">{user.email}</p>
              </div>
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowDropdown(false)}
              >
                <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center inline-block mr-2"></i>
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowDropdown(false)}
              >
                <i className="ri-user-line w-4 h-4 flex items-center justify-center inline-block mr-2"></i>
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <i className="ri-logout-circle-line w-4 h-4 flex items-center justify-center inline-block mr-2"></i>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-white hover:text-[#edb232] transition-colors whitespace-nowrap cursor-pointer"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="bg-[#edb232] text-[#0b131c] px-4 py-2 rounded-lg hover:bg-[#edb232]/90 transition-colors font-medium whitespace-nowrap cursor-pointer"
      >
        Sign Up
      </Link>
    </div>
  );
}