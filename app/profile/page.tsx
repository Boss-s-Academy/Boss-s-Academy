'use client';

import { useState, useEffect } from 'react';
import { User, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';
import { auth, rtdb } from '@/lib/firebase';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserPreferences {
  subjects: string[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    subjects: []
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [activeTab1, setActiveTab1] = useState('subject');
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();
  
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
              loadUserPreferences(user.uid),
              loadUserNames(user.uid)
          ]);
      } else {
        router.push('/');
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

  const loadUserPreferences = async (uid: string) => {
      try {
        const userRef = ref(rtdb, `Users/${uid}/preferences`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();

          const selectedSubjects = Object.keys(data).filter(key => data[key] === true);

          setPreferences({
            subjects: selectedSubjects
          });

          // ✅ Load all available subjects (keys from Firebase, even if false)
          const allSubjects = Object.keys(data);
          setAvailableSubjects(allSubjects);
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
   };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage({ type: '', text: '' });

      try {
          if (profileData.displayName !== user.displayName) {
              await updateProfile(user, {
                  displayName: profileData.displayName
              });
          }

          if (profileData.newPassword && profileData.currentPassword) {
              if (profileData.newPassword !== profileData.confirmPassword) {
                  throw new Error('New passwords do not match');
              }

              const credential = EmailAuthProvider.credential(
                  user.email!,
                  profileData.currentPassword
              );
              await reauthenticateWithCredential(user, credential);
              await updatePassword(user, profileData.newPassword);

              setProfileData(prev => ({
                  ...prev,
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: ''
              }));
          }

          // 🔥 Save names to RTDB
          const userRef = ref(rtdb, `Users/${user.uid}`);
          await update(userRef, {
              firstname: profileData.firstname,
              lastname: profileData.lastname,
          });

          setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } catch (error: any) {
          setMessage({ type: 'error', text: error.message });
      } finally {
          setSaving(false);
      }
  };

  const handlePreferencesUpdate = async () => {
      if (!user) return;

      setSaving(true);
      setMessage({ type: '', text: '' });

      try {
        const userRef = ref(rtdb, `Users/${user.uid}/preferences`);
        const levelRef = ref(rtdb, `Users/${user.uid}/syllabus`);

        // Define curriculum subject groups (you can move this out to avoid redefining each time)
        const allIBSubjects = [
          'English A Language and Literature',
          'French AB Initio', 'French B', 'Spanish AB Initio',
          'Business Management', 'Digital Societies', 'Geography', 'History',
          'Biology', 'Chemistry', 'Environmental Systems and Societies', 'Physics',
          'Mathematics Applications and Interpretations', 'Mathematics Analysis and Approaches',
          'Visual Arts', 'CAS', 'Extended Essay', 'Theory of Knowledge',
        ];

        let validSubjects: string[] = [];

        if (activeTab1 === 'IGCSE') {
          validSubjects = preferences.subjects.filter((subject) =>
            igcseSubjects.includes(subject)
          );
        } else if (activeTab1 === 'A-Level') {
          validSubjects = preferences.subjects.filter((subject) =>
            aLevelSubjects.includes(subject)
          );
        } else if (activeTab1 === 'IB') {
          validSubjects = preferences.subjects.filter((subject) =>
            allIBSubjects.includes(subject)
          );
        }

        // Map valid subjects to true for saving
        const subjectMap: Record<string, boolean> = {};
        validSubjects.forEach((subject) => {
          subjectMap[subject] = true;
        });

          await set(userRef, subjectMap);
          await set(levelRef, activeTab1);

        setMessage({ type: 'success', text: 'Preferences updated successfully!' });
      } catch (error: any) {
        setMessage({ type: 'error', text: error.message });
      } finally {
        setSaving(false);
      }
    };

  const toggleSubject = (subject: string) => {
    setPreferences(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const igcseSubjects: string[] = [
  'Accounting – 0452',
  'Art & Design – 0400',
  'Biology – 0610',
  'Business Studies – 0450',
  'Chemistry – 0620',
  'Computer Science – 0478',
  'Drama – 0411',
  'Economics – 0455',
  'English – First Language – 0500',
  'English – Literature in English – 0475',
  'Enterprise – 0454',
  'French – Foreign Language – 0520',
  'Geography – 0460',
  'Global Perspectives – 0457',
  'History – 0470',
  'Information Communication and Technology – 0417',
  'Mathematics – Additional – 0606',
  'Mathematics – 0580',
  'Music – 0410',
  'Physics – 0625',
  'Sciences – Co-ordinated (Double) – 0654',
  'Travel and Tourism – 0471'
  ];

const aLevelSubjects: string[] = [
  'Accounting – 9706',
  'Biology – 9700',
  'Business Studies – 9609',
  'Chemistry – 9701',
  'Computer Science – 9618',
  'Economics – 9708',
  'Geography – 9696',
  'History – 9489',
  'Information Technology – 9626',
  'Mathematics – Further – 9231',
  'Mathematics – 9709',
  'Physics – 9702'
];


  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#edb232] mx-auto mb-4"></div>
          <p className="text-[#0b131c]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#f8f9fa] ">
          <Header />
      <div className="container mx-auto px-6 max-w-4xl py-6">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/dashboard" className="text-[#325d8e] hover:text-[#edb232] transition-colors cursor-pointer">
              <i className="ri-arrow-left-line w-6 h-6 flex items-center justify-center"></i>
            </Link>
            <h1 className="text-3xl font-bold text-[#0b131c]">Profile Settings</h1>
          </div>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-b-2 border-[#edb232] text-[#edb232]'
                  : 'text-gray-500 hover:text-[#0b131c]'
              }`}
            >
              <i className="ri-user-line w-5 h-5 flex items-center justify-center inline-block mr-2"></i>
              Profile Info
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-4 font-medium whitespace-nowrap cursor-pointer ${
                activeTab === 'preferences'
                  ? 'border-b-2 border-[#edb232] text-[#edb232]'
                  : 'text-gray-500 hover:text-[#0b131c]'
              }`}
            >
              <i className="ri-settings-3-line w-5 h-5 flex items-center justify-center inline-block mr-2"></i>
              Change Subjects
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-20 h-20 bg-[#edb232] rounded-full flex items-center justify-center">
                    <span className="text-[#0b131c] font-bold text-2xl">
                      {profileData.firstname?.charAt(0) || user?.email?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#0b131c]">
                      {profileData.firstname && profileData.lastname
                      ? `${profileData.firstname} ${profileData.lastname}`
                      : user?.displayName || 'User'}
                    </h2>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={profileData.firstname}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm"
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={profileData.lastname}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                      disabled
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-[#0b131c] mb-4">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#edb232] focus:border-transparent text-sm"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#edb232] text-[#0b131c] px-6 py-2 rounded-lg hover:bg-[#edb232]/90 transition-colors font-medium disabled:opacity-50 whitespace-nowrap cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-[#0b131c] mb-4">Change Subjects</h3>
                    <div className="flex justify-center gap-6 mb-6 text-sm font-semibold text-[#0b131c]">
                      <button onClick={() => setActiveTab1('IGCSE')} className={`${activeTab1 === 'IGCSE' ? 'text-[#edb232]' : 'text-gray-500'} hover:text-[#edb232]`}>
                        Cambridge IGCSE
                      </button>
                      <button onClick={() => setActiveTab1('A-Level')} className={`${activeTab1 === 'A-Level' ? 'text-[#edb232]' : 'text-gray-500'} hover:text-[#edb232]`}>
                        Cambridge AS & A-Level
                      </button>
                      <button onClick={() => setActiveTab1('IB')} className={`${activeTab1 === 'IB' ? 'text-[#edb232]' : 'text-gray-500'} hover:text-[#edb232]`}>
                        International Baccalaureate
                      </button>
                    </div>
                  <div className="w-full">
                    {activeTab1 === 'IGCSE' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {igcseSubjects.map((subject) => (
                          <label key={subject} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={preferences.subjects.includes(subject)}
                              onChange={() => toggleSubject(subject)}
                              className="accent-[#edb232]"
                            />
                            <span>{subject}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {activeTab1 === 'A-Level' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {aLevelSubjects.map((subject) => (
                          <label key={subject} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={preferences.subjects.includes(subject)}
                              onChange={() => toggleSubject(subject)}
                              className="accent-[#edb232]"
                            />
                            <span>{subject}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {activeTab1 === 'IB' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Group 1 */}
                        <div>
                          <h4 className="text-[#0b131c] font-semibold text-lg mb-2">
                            Group 1 - Studies in Language and Literature
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols gap-2">
                            {['English A Language and Literature'].map(subject => (
                              <label key={subject} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={preferences.subjects.includes(subject)}
                                  onChange={() => toggleSubject(subject)}
                                  className="accent-[#edb232]"
                                />
                                <span>{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Group 2 */}
                        <div>
                          <h4 className="text-[#0b131c] font-semibold text-lg mb-2">
                            Group 2 - Language Acquisition
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols gap-2">
                            {[
                              'French AB Initio',
                              'French B',
                              'Spanish AB Initio'
                            ].map(subject => (
                              <label key={subject} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={preferences.subjects.includes(subject)}
                                  onChange={() => toggleSubject(subject)}
                                  className="accent-[#edb232]"
                                />
                                <span>{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Group 3 */}
                        <div>
                          <h4 className="text-[#0b131c] font-semibold text-lg mb-2">
                            Group 3 - Individuals and Societies
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols gap-2">
                            {[
                              'Business Management',
                              'Digital Societies',
                              'Geography',
                              'History'
                            ].map(subject => (
                              <label key={subject} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={preferences.subjects.includes(subject)}
                                  onChange={() => toggleSubject(subject)}
                                  className="accent-[#edb232]"
                                />
                                <span>{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Group 4 */}
                        <div>
                          <h4 className="text-[#0b131c] font-semibold text-lg mb-2">
                            Group 4 - Sciences
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols gap-2">
                            {[
                              'Biology',
                              'Chemistry',
                              'Environmental Systems and Societies',
                              'Physics'
                            ].map(subject => (
                              <label key={subject} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={preferences.subjects.includes(subject)}
                                  onChange={() => toggleSubject(subject)}
                                  className="accent-[#edb232]"
                                />
                                <span>{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Group 5 */}
                        <div>
                          <h4 className="text-[#0b131c] font-semibold text-lg mb-2">
                            Group 5 - Mathematics
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols gap-2">
                            {[
                              'Mathematics Applications and Interpretations',
                              'Mathematics Analysis and Approaches'
                            ].map(subject => (
                              <label key={subject} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={preferences.subjects.includes(subject)}
                                  onChange={() => toggleSubject(subject)}
                                  className="accent-[#edb232]"
                                />
                                <span>{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Group 6 */}
                        <div>
                          <h4 className="text-[#0b131c] font-semibold text-lg mb-2">
                            Group 6 - The Arts
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols gap-2">
                            {[
                              'Visual Arts'
                            ].map(subject => (
                              <label key={subject} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={preferences.subjects.includes(subject)}
                                  onChange={() => toggleSubject(subject)}
                                  className="accent-[#edb232]"
                                />
                                <span>{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Core Courses */}
                        <div>
                          <h4 className="text-[#0b131c] font-semibold text-lg mb-2">
                            Core Courses
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols gap-2">
                            {[
                              'CAS',
                              'Extended Essay',
                              'Theory of Knowledge'
                            ].map(subject => (
                              <label key={subject} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={preferences.subjects.includes(subject)}
                                  onChange={() => toggleSubject(subject)}
                                  className="accent-[#edb232]"
                                />
                                <span>{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handlePreferencesUpdate}
                    disabled={saving}
                    className="bg-[#edb232] text-[#0b131c] px-6 py-2 rounded-lg hover:bg-[#edb232]/90 transition-colors font-medium disabled:opacity-50 whitespace-nowrap cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Update Subjects'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}