
'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import Header from '../../components/Header';
import { ref, get,set} from 'firebase/database';
import { auth, rtdb } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiArrowUpSLine } from 'react-icons/ri';

interface UserPreferences {
  subjects?: string[];
  level?: string;
}

interface StudyTrackerModel {
    subject: string;
    expectedDuration: number;
    totalTimeStudied: number;
    dailyTimeStudied: number;
    lastUpdated: string;
}

type Assignment = {
    subject: string;
    title: string;
    description: string;
    dueDate: string;
    dueTime: string;
    opened?: {
        date: string;
        time: string;
    }; // opened is now a map like in Kotlin
    id: string;
}

type AssignmentData = {
    subject: string;
    assignments: Assignment[];
};

type TeacherClass = {
    subject: string;
    classNames: string[];
};

interface AssignmentType {
    id: string;
    name: string;
    dueDate: string;
    isOpened: boolean;
    openedDetails: string;
}
interface StudentData {
    student: {
        uid: string;
        fullName: string;
        email: string;
    };
    studyData: {
        subjectName: string;
        totalTimeStudied: number;
        lastUpdated: string;
        expectedTime: number;
        dailyTimeStudied: number;
    };
    assignments: {
        id: string;
        name: string;
        dueDate: string;
        isOpened: boolean;
        openedDetails: string;
    }[];
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const router = useRouter();
  const [profileData, setProfileData] = useState({
      displayName: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      level: '',
      school: '',
      userType:'',
   });
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClassName, setSelectedClassName] = useState('');
    const [selectedClassStudents, setSelectedClassStudents] = useState<StudentData[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
    const schoolId = localStorage.getItem('schoolId');
    const [teacherClasses, setTeacherClasses] = useState<TeacherClass[]>([]);

    useEffect(() => {
        // Scroll listener
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', toggleVisibility);

        // Auth listener
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                setProfileData(prev => ({
                    ...prev,
                    displayName: user.displayName || '',
                    email: user.email || '',
                }));
                await Promise.all([
                    fetchUserPreferences(user.uid),
                    loadUserNames(user.uid),
                    fetchAssignmentData(user.uid),
                    fetchStudyData(user.uid),
                    fetchTeacherClasses(user.uid)
                ]);
            }
            setLoading(false);
        });

        // ✅ Combined cleanup
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, ]);

    const loadUserNames = async (uid: string) => {
        try {
            const userRef = ref(rtdb, `Users/${uid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setProfileData(prev => ({
                    ...prev,
                    firstname: data.firstName || '',
                    lastname: data.lastName || '',
                    level: data.syllabus || '',
                    school: data.school || '',
                    userType: data.userType || ''
                }));
            }
        } catch (error) {
            console.error('Error loading names:', error);
        }
    };

  const fetchUserPreferences = async (uid: string) => {
      try {
          if (profileData.userType === 'student') {
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
          } else {
              const userRef = ref(rtdb, `Schools/${schoolId}/${uid}/preferences`);
              const snapshot = await get(userRef);
              if (snapshot.exists()) {
                  const data = snapshot.val();
                  const selectedSubjects = Object.keys(data);
                  setPreferences({ subjects: selectedSubjects });
                  setAvailableSubjects(selectedSubjects);
              }
          }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
  };

  const [studyData, setStudyData] = useState<StudyTrackerModel[]>([]);

  const fetchStudyData = async (uid: string) => {
  try {
    const userRef = ref(rtdb, `studyTime/${uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      setStudyData([]);
      return;
    }

    const tempList: StudyTrackerModel[] = [];

    snapshot.forEach(subjectSnap => {
      const subject = subjectSnap.key;
      if (!subject) return;

      const totalStudied = subjectSnap.child('totalTimeStudied').val() ?? 0;
      const dailyTimeStudied = subjectSnap.child('dailyTimeStudied').val() ?? 0;
      const lastUpdated = subjectSnap.child('lastUpdated').val() ?? '';
      const expected = subjectSnap.child('expectedDuration').val() ?? 60;

      tempList.push({
        subject,
        expectedDuration: expected,
        totalTimeStudied: totalStudied,
        dailyTimeStudied,
        lastUpdated,
      });
    });

    setStudyData(tempList);
  } catch (error) {
    console.error('Failed to load study data:', error);
  }
  };

  const unseenAssignments = assignments.flatMap(a =>
  a.assignments.filter(ass => !ass.opened || !ass.opened.date)
    );
  const seenAssignments = assignments.flatMap(a =>
      a.assignments.filter(ass => ass.opened && ass.opened.date)
    );

  const markAsSeen = async (uid: string, subject: string, assignmentId: string) => {
      try {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB'); // "dd/mm/yyyy"
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        const assignmentRef = ref(
          rtdb,
          `Users/${uid}/preferences/${subject}/Assignments/${assignmentId}/opened`
        );
        await set(assignmentRef, { date, time });

        // Refresh assignments locally
        fetchAssignmentData(uid);
      } catch (err) {
        console.error('Failed to mark as opened:', err);
      }
    };


    const fetchAssignmentData = async (uid: string) => {
        const userPrefsRef = ref(rtdb, `Users/${uid}/preferences`);
        const snapshot = await get(userPrefsRef);

        if (!snapshot.exists()) {
            console.warn('No preferences found for user:', uid);
            return;
        }

        const assignmentData: AssignmentData[] = [];

        snapshot.forEach((subjectSnap) => {
            const subjectName = subjectSnap.key!;
            const assignmentsSnap = subjectSnap.child("Assignments");

            if (!assignmentsSnap.exists()) {
                console.warn(`No assignments under subject: ${subjectName}`);
                return;
            }

            const assignmentList: Assignment[] = [];

            assignmentsSnap.forEach((child) => {
                const assignment = child.val();
                console.log("📦 Assignment fetched:", assignment); // <-- Add this
                assignmentList.push({
                    subject: subjectName,
                    title: assignment.title || 'Untitled',
                    description: assignment.description || '-',
                    dueDate: assignment.dueDate || '-',
                    dueTime: assignment.dueTime || '-',
                    opened: assignment.opened || undefined,
                    id: child.key!,
                });
            });

            assignmentData.push({ subject: subjectName, assignments: assignmentList });
        });

        console.log("📘 Final assignment data:", assignmentData); // <-- Add this
        setAssignments(assignmentData);
    };

    const fetchTeacherClasses = async (uid: string) => {
        const prefsRef = ref(rtdb, `Schools/${schoolId}/${uid}/preferences`);
        const snapshot = await get(prefsRef);
        if (!snapshot.exists()) return;

        const teacherClasses: TeacherClass[] = [];
        snapshot.forEach((subjectSnap) => {
            const subjectName = subjectSnap.key!;
            const classNames: string[] = [];
            subjectSnap.forEach((classSnap) => {
                if (classSnap.key) {
                    classNames.push(classSnap.key);
                }
            });
            teacherClasses.push({ subject: subjectName, classNames });
        });
        setTeacherClasses(teacherClasses);
    };

    const fetchStudentsForClass = async (subject: string, className: string) => {
        const classRef = ref(rtdb, `Schools/${schoolId}/${user?.uid}/preferences/${subject}/${className}`);
        const classSnap = await get(classRef);

        const students = [];
        for (const studentSnap of classSnap?.val() ? Object.entries(classSnap.val()) : []) {
            const [studentId] = studentSnap;
            const profileSnap = await get(ref(rtdb, `Users/${studentId}`));
            const profileData = profileSnap.val();
            const studySnap = await get(ref(rtdb, `studyTime/${studentId}/${subject}`));
            const studyData = studySnap.val();
            const assignmentSnap = await get(ref(rtdb, `Users/${studentId}/preferences/${subject}/Assignments`));
            const assignments = assignmentSnap.exists()
                ? Object.entries(assignmentSnap.val()).map(([id, data]: any) => ({
                    id,
                    name: data.description || 'Untitled',
                    dueDate: data.dueDate || 'Unknown',
                    isOpened: !!data.opened,
                    openedDetails: data.opened
                        ? `Date: ${data.opened.date || 'N/A'}\nTime: ${data.opened.time || 'N/A'}`
                        : 'Not Opened',
                }))
                : [];

            students.push({
                student: {
                    uid: studentId,
                    fullName: `${profileData.firstName} ${profileData.lastName}`,
                    email: profileData.email,
                },
                studyData: {
                    subjectName: subject,
                    totalTimeStudied: studyData?.totalTimeStudied || 0,
                    lastUpdated: studyData?.lastUpdated || 'Never',
                    expectedTime: studyData?.expectedDuration || 60,
                    dailyTimeStudied: studyData?.dailyTimeStudied || 0,
                },
                assignments,
            });
        }
        return students;
    };

    const handleClassClick = async (subject: string, className: string) => {
        setSelectedSubject(subject);
        setSelectedClassName(className);

        try {
            setLoading1(true);
            const students = await fetchStudentsForClass(subject, className);
            setSelectedClassStudents(students);
            setLoading1(false); // Now this will actually show data
        } catch (error) {
            console.error('Failed to fetch students:', error);
        }
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#edb232] rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-user-line text-2xl text-[#0b131c]"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0b131c] mb-2">Please Sign In</h2>
                    <p className="text-gray-600 mb-6">You need to be signed in to access your dashboard</p>
                    <Link href="/login" className="bg-[#edb232] text-[#0b131c] px-6 py-3 rounded-lg hover:bg-[#edb232]/90 transition-colors font-medium whitespace-nowrap cursor-pointer">
                        Sign In
                    </Link>
                    <Link href="/" className=" text-[#0b131c] px-6 py-3 rounded-lg transition-colors font-medium whitespace-nowrap cursor-pointer mb-2">
                        Go to home
                    </Link>
                </div>
            </div>
        );
    }

  const userSubjects = preferences?.subjects || [];
  const userLevel = preferences?.level || '';

  return (
      <div className="min-h-screen bg-gray-50">
          <Header />
      <div className="container mx-auto px-6 py-12">
              {profileData.userType === 'student' && (
                  <>
                      {/* Welcome Header */}
                      <div className="mb-8">
                          <h1 className="text-3xl font-bold text-[#0b131c] mb-2">
                              Welcome back, {profileData.firstname && profileData.lastname
                                  ? `${profileData.firstname} ${profileData.lastname}`
                                  : user?.displayName || 'User'}!
                          </h1>
                          <p className="text-gray-600">Ready to continue your learning journey?</p>
                      </div>

                      {/* User Info Card */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                          <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-[#edb232] rounded-full flex items-center justify-center">
                                  <span className="text-2xl font-bold text-[#0b131c]">
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
                                  <p className="text-gray-600">School: {profileData.school}</p>
                                  <p className="text-sm text-[#325d8e] font-medium">Level: {profileData.level}</p>
                              </div>
                          </div>
                      </div>

                      {/* Your Subjects */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-[#0b131c]">Your Subjects</h3>
                              <Link href="/profile" className="text-[#325d8e] hover:text-[#edb232] transition-colors cursor-pointer">
                                  Change Subject
                              </Link>
                          </div>

                          {userSubjects.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {userSubjects.map((subject, index) => (
                                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#edb232] transition-colors cursor-pointer">
                                          <div className="flex items-center space-x-3">
                                              <div className="w-10 h-10 bg-[#edb232]/20 rounded-lg flex items-center justify-center">
                                                  <i className="ri-book-open-line text-[#edb232]"></i>
                                              </div>
                                              <div>
                                                  <h4 className="font-medium text-[#0b131c]">{subject}</h4>
                                                  <p className="text-sm text-gray-600">{userLevel}</p>
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <div className="text-center py-8">
                                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <i className="ri-book-line text-2xl text-gray-400"></i>
                                  </div>
                                  <p className="text-gray-600 mb-4">No subjects selected yet</p>
                                  <Link href="/profile" className="bg-[#edb232] text-[#0b131c] px-6 py-3 rounded-lg hover:bg-[#edb232]/90 transition-colors font-medium whitespace-nowrap cursor-pointer">
                                      Browse Subjects
                                  </Link>
                              </div>
                          )}
                      </div>
                      {/* Your Assignment */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-[#0b131c]">Your Asignments</h3>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Unseen Assignments */}
                              <div>
                                  <h3 className="text-lg font-semibold text-[#0b131c] mb-4">Unseen Assignments</h3>
                                  {unseenAssignments.length > 0 ? (
                                      <div className="space-y-4">
                                          {unseenAssignments.map((a, i) => (
                                              <div key={i} className="border p-4 rounded-lg flex justify-between items-start">
                                                  <div>
                                                      <h4 className="font-medium text-[#0b131c]">{a.title}</h4>
                                                      <p className="text-sm text-gray-500">{a.description}</p>
                                                      <p className="text-sm text-gray-400">{a.dueDate} at {a.dueTime}</p>
                                                  </div>
                                                  <button
                                                      className="bg-[#edb232] hover:bg-[#edb232]/90 text-[#0b131c] text-xs px-3 py-1 rounded"
                                                      onClick={() => markAsSeen(user.uid, a.subject, a.id)}
                                                  >
                                                      Mark as Seen ✓
                                                  </button>
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      <p className="text-gray-500">No New Assignments</p>
                                  )}
                              </div>

                              {/* Seen Assignments */}
                              <div>
                                  <h3 className="text-lg font-semibold text-[#0b131c] mb-4">Seen Assignments</h3>
                                  {seenAssignments.length > 0 ? (
                                      <div className="space-y-4">
                                          {seenAssignments.map((a, i) => (
                                              <div key={i} className="border p-4 rounded-lg">
                                                  <h4 className="font-medium text-[#0b131c]">{a.title}</h4>
                                                  <p className="text-sm text-gray-500">{a.description}</p>
                                                  <p className="text-sm text-gray-400">{a.dueDate} at {a.dueTime}</p>
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      <p className="text-gray-500">No assignments marked as seen yet.</p>
                                  )}
                              </div>
                          </div>
                      </div>

                      {/* Study Tracker */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-[#0b131c]">Study Tracker</h3>
                          </div>

                          {studyData.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {studyData.map((item, index) => (
                                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#edb232] transition-colors cursor-pointer">
                                          <h4 className="text-lg font-semibold text-[#0b131c]">{item.subject}</h4>
                                          <div className="mb-2">
                                              <p className="text-sm text-gray-600">
                                                  {item.dailyTimeStudied} / {item.expectedDuration} mins
                                              </p>
                                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                  <div
                                                      className="bg-[#edb232] h-2 rounded-full transition-all duration-500"
                                                      style={{
                                                          width: `${Math.min(100, (item.dailyTimeStudied / item.expectedDuration) * 100)}%`,
                                                      }}
                                                  ></div>
                                              </div>
                                          </div>
                                          <p className="text-sm text-gray-600">Total Time: {item.totalTimeStudied} mins</p>
                                          <p className="text-xs text-gray-400 mt-2">Last updated: {item.lastUpdated}</p>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <div className="text-center py-8">
                                  <p className="text-gray-600">No study data available. Start tracking your study sessions.</p>
                              </div>
                          )}
                      </div>
                  </>
              )}

              {profileData.userType === 'teacher' && (
                  <>
                      {/* Welcome Header */}
                      <div className="mb-8">
                          <h1 className="text-3xl font-bold text-[#0b131c] mb-2">
                              Welcome back, {profileData.firstname && profileData.lastname
                                  ? `${profileData.firstname} ${profileData.lastname}`
                                  : user?.displayName || 'User'}!
                          </h1>
                          <p className="text-gray-600">Ready to continue your learning journey?</p>
                      </div>

                      {/* User Info Card */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                          <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-[#edb232] rounded-full flex items-center justify-center">
                                  <span className="text-2xl font-bold text-[#0b131c]">
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
                                  <p className="text-gray-600">School: {profileData.school}</p>
                              </div>
                          </div>
                      </div>

                      {/* Your Subjects */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-[#0b131c]">Your Subjects</h3>
                              <Link href="/profile" className="text-[#325d8e] hover:text-[#edb232] transition-colors cursor-pointer">
                                  Change Subject
                              </Link>
                          </div>

                          {userSubjects.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {userSubjects.map((subject, index) => (
                                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#edb232] transition-colors cursor-pointer">
                                          <div className="flex items-center space-x-3">
                                              <div className="w-10 h-10 bg-[#edb232]/20 rounded-lg flex items-center justify-center">
                                                  <i className="ri-book-open-line text-[#edb232]"></i>
                                              </div>
                                              <div>
                                                  <h4 className="font-medium text-[#0b131c]">{subject}</h4>
                                                  <p className="text-sm text-gray-600">{userLevel}</p>
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <div className="text-center py-8">
                                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <i className="ri-book-line text-2xl text-gray-400"></i>
                                  </div>
                                  <p className="text-gray-600 mb-4">No subjects selected yet</p>
                                  <Link href="/profile" className="bg-[#edb232] text-[#0b131c] px-6 py-3 rounded-lg hover:bg-[#edb232]/90 transition-colors font-medium whitespace-nowrap cursor-pointer">
                                      Browse Subjects
                                  </Link>
                              </div>
                          )}
                      </div>

                      {/* Your classes */}
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-[#0b131c]">Your Classes</h3>
                          </div>
                          <div>
                              {teacherClasses.length > 0 ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                      {teacherClasses.map((subjectBlock, idx) => (
                                          <div key={idx}>
                                              <h4 className="text-lg font-semibold text-[#0b131c] mb-2">
                                                  {subjectBlock.subject}
                                              </h4>
                                              <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                  {subjectBlock.classNames.map((className, index) => (
                                                      <div
                                                          key={index}
                                                          onClick={() => handleClassClick(subjectBlock.subject, className)}
                                                          className="border border-gray-200 rounded-lg p-4 px-5 hover:border-[#edb232] transition-colors cursor-pointer"
                                                      >
                                                          <div className="flex items-center space-x-3">
                                                              <div className="w-10 h-10 bg-[#edb232]/20 rounded-lg flex items-center justify-center">
                                                                  <i className="ri-book-open-line text-[#edb232]"></i>
                                                              </div>
                                                              <div>
                                                                  <h4 className="font-medium text-[#0b131c]">{className}</h4>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  ))}
                                              </ul>
                                          </div>
                                      ))}
                                  </div>
                              ) : (
                                  <p className="text-gray-500">No classes found.</p>
                              )}
                          </div>
                      </div>

                      {/* Your student detail */}
                      {selectedClassName && selectedSubject && (
                          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8" id="student-section">
                              <div className="flex items-center justify-between mb-4">
                                  <h3 className="text-xl font-semibold text-[#0b131c]">
                                      Your Students Data in {selectedClassName} ({selectedSubject})
                                  </h3>
                              </div>

                              {loading1 === true && (
                                  <div className="min-h-screen bg-gray-50">
                                      <div className="container mx-auto px-6 py-12">
                                          <div className="animate-pulse">
                                              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                  {[...Array(6)].map((_, i) => (
                                                      <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                                                  ))}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              )}

                              {loading1 === false && selectedClassStudents.length > 0 &&(
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                      {selectedClassStudents.map((studentData: any, index) => (
                                          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                              <h4 className="text-lg font-semibold mb-2">
                                                  {studentData.student.fullName}
                                              </h4>
                                              <p className="text-sm text-gray-600 mb-1">Email: {studentData.student.email}</p>
                                              <div className="mb-2">
                                                  <p className="text-sm text-gray-600">
                                                      {studentData.studyData.dailyTimeStudied} / {studentData.studyData.expectedTime} mins
                                                  </p>
                                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                      <div
                                                          className="bg-[#edb232] h-2 rounded-full transition-all duration-500"
                                                          style={{
                                                              width: `${Math.min(100, (studentData.studyData.dailyTimeStudied / studentData.studyData.expectedTime) * 100)}%`,
                                                          }}
                                                      ></div>
                                                  </div>
                                              </div>
                                              <p className="text-sm text-gray-600">Total Time: {studentData.studyData.totalTimeStudied} mins</p>
                                              <p className="text-xs text-gray-400 mt-2">Last updated: {studentData.studyData.lastUpdated}</p>

                                              <div className="mt-4">
                                                  <h5 className="font-medium">Assignments</h5>
                                                  {studentData.assignments.length > 0 ? (
                                                      studentData.assignments.map((a: AssignmentType, idx: number) => (
                                                          <div key={idx} className="text-sm mt-1 p-2 bg-gray-50 rounded border">
                                                              <strong>{a.name}</strong> — Due: {a.dueDate}<br />
                                                              {a.openedDetails}
                                                          </div>
                                                      ))
                                                  ) : (
                                                      <p className="text-sm text-gray-400">No assignments</p>
                                                  )}
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              )}
                          </div>
                      )}
                  </>
              )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/subjects" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-[#edb232] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-[#edb232]/20 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-book-open-line text-xl text-[#edb232]"></i>
            </div>
            <h4 className="font-semibold text-[#0b131c] mb-2">Study Materials</h4>
            <p className="text-sm text-gray-600">Access notes and past papers</p>
          </Link>
          
          <Link href="/studytok" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-[#edb232] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-[#325d8e]/20 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-question-line text-xl text-[#325d8e]"></i>
            </div>
            <h4 className="font-semibold text-[#0b131c] mb-2">StudyTok Quiz</h4>
            <p className="text-sm text-gray-600">Practice with our quiz app</p>
          </Link>
          
          <Link href="/flashcards" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-[#edb232] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-stack-line text-xl text-purple-600"></i>
            </div>
            <h4 className="font-semibold text-[#0b131c] mb-2">Flashcards</h4>
            <p className="text-sm text-gray-600">Coming soon feature</p>
          </Link>
          
          <Link href="/contact" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-[#edb232] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <i className="ri-customer-service-line text-xl text-green-600"></i>
            </div>
            <h4 className="font-semibold text-[#0b131c] mb-2">Get Help</h4>
            <p className="text-sm text-gray-600">Contact our support team</p>
          </Link>
              </div>

        {isVisible && (
              <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-6 right-6 z-50 bg-[#edb232] text-white p-3 rounded-full shadow-lg hover:bg-[#d4a02c] transition-all"
                  aria-label="Back to top"
              >
                  <RiArrowUpSLine className="text-2xl" />
              </button>
          )}
      </div>
    </div>
  );
}
