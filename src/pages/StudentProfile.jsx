import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    username: "",
    first_name: "",
    last_name: "",
    birthday: "",
    address: "",
    gender: "",
    grade: "",
    school: "",
    interests: ["Drawing", "Animals", "Music", "Numbers"],
    achievements: 0,
    day_streak: 0,
    activities_done: 0,
    stars_earned: 0,
    favoriteColor: "#3B82F6",
    learning_style: {
      visual: true,
      goal_oriented: true,
      routine_loving: true,
      step_by_step: true
    }
  });

  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log('Fetching profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // Use maybeSingle instead of single to avoid error if no record exists

      if (error) {
        console.error('Error fetching profile:', error);
        setError(`Database error: ${error.message}`);
        return;
      }

      if (data) {
        console.log('Profile data found:', data);
        setUserInfo({
          username: data.username || `${data.first_name} ${data.last_name}`.trim(),
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          birthday: data.birthday || '',
          address: data.address || '',
          gender: data.gender || '',
          grade: data.grade || '',
          school: data.school || '',
          interests: data.interests || ["Drawing", "Animals", "Music", "Numbers"],
          achievements: data.achievements || 0,
          day_streak: data.day_streak || 0,
          activities_done: data.activities_done || 0,
          stars_earned: data.stars_earned || 0,
          favoriteColor: data.favorite_color || "#3B82F6",
          learning_style: data.learning_style || {
            visual: true,
            goal_oriented: true,
            routine_loving: true,
            step_by_step: true
          }
        });
      } else {
        console.log('No profile found, creating default profile');
        // No profile exists, create one with default values
        await createUserProfile();
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`An unexpected error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async () => {
    try {
      console.log('Creating new profile for user:', user.id);
      const { data, error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          username: user.user_metadata?.full_name || 'New User',
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          email: user.email,
          age: user.user_metadata?.age || null,
          parent_email: user.user_metadata?.parent_email || '',
          interests: ["Drawing", "Animals", "Music", "Numbers"],
          favorite_color: "#3B82F6",
          achievements: 0,
          day_streak: 0,
          activities_done: 0,
          stars_earned: 0,
          learning_style: {
            visual: true,
            goal_oriented: true,
            routine_loving: true,
            step_by_step: true
          }
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        setError(`Failed to create profile: ${error.message}`);
        return;
      }

      console.log('Profile created successfully:', data);
      // Fetch the profile again after creation
      await fetchUserProfile();
    } catch (error) {
      console.error('Error creating profile:', error);
      setError(`Error creating profile: ${error.message}`);
    }
  };

  const saveUserProfile = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      console.log('Saving profile for user:', user.id);
      console.log('Profile data to save:', userInfo);

      const profileData = {
        id: user.id,
        username: userInfo.username || `${userInfo.first_name} ${userInfo.last_name}`.trim(),
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: user.email, // Always use the current user's email
        birthday: userInfo.birthday || null,
        address: userInfo.address,
        gender: userInfo.gender,
        grade: userInfo.grade,
        school: userInfo.school,
        interests: userInfo.interests,
        favorite_color: userInfo.favoriteColor,
        learning_style: userInfo.learning_style,
        achievements: userInfo.achievements,
        day_streak: userInfo.day_streak,
        activities_done: userInfo.activities_done,
        stars_earned: userInfo.stars_earned
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert(profileData, {
          onConflict: 'id'
        })
        .select();

      if (error) {
        console.error('Error saving profile:', error);
        setError(`Failed to save profile: ${error.message}`);
        return;
      }

      console.log('Profile saved successfully:', data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Error:', error);
      setError(`An unexpected error occurred: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const backToHome = () => {
    navigate('/studentpage');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await saveUserProfile();
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleInterestChange = (index, value) => {
    const newInterests = [...userInfo.interests];
    newInterests[index] = value;
    setUserInfo({ ...userInfo, interests: newInterests });
  };

  const stats = [
    { icon: "🏆", label: "Achievements", value: userInfo.achievements, color: "from-yellow-400 to-orange-500" },
    { icon: "🔥", label: "Day Streak", value: userInfo.day_streak, color: "from-red-400 to-pink-500" },
    { icon: "🎯", label: "Activities Done", value: userInfo.activities_done, color: "from-blue-400 to-indigo-500" },
    { icon: "⭐", label: "Badges", value: userInfo.stars_earned, color: "from-purple-400 to-pink-500" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your profile</p>
          <button 
            onClick={() => navigate('/loginpage')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-32 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-xl animate-bounce-gentle"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AutiSync
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/home" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                Home
              </a>
              <a href="/flashcardspage" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                Activities
              </a>
              <a href="/studentpage" className="text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                Learning Hub
              </a>
            </nav>
            
            <button
              onClick={backToHome}
              className="btn-autism-friendly bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <span className="mr-2">← </span>
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            <strong>Error:</strong> {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
            {success}
          </div>
        )}

        {/* Profile Header Card */}
        <div className=" bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 mb-8 animate-fade-in-scale">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/src/assets/kidprofile1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle">
                <span className="text-2xl">🌟</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="first_name"
                      value={userInfo.first_name}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none text-center lg:text-left mr-2"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={userInfo.last_name}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none text-center lg:text-left"
                    />
                  </div>
                ) : (
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    Hi, {userInfo.username || `${userInfo.first_name} ${userInfo.last_name}`.trim() || 'User'}! 👋
                  </h1>
                )}
                <p className="text-lg text-gray-600">
                  You're doing amazing things every day! 🚀
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`bg-gradient-to-r ${stat.color} card-autism-friendly rounded-2xl p-4 text-white text-center shadow-lg `}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex flex-col gap-4">
              {isEditing ? (
                <button
                  onClick={handleSaveClick}
                  disabled={saving}
                  className="btn-autism-friendly bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {saving ? (
                    <>
                      <span className="mr-2">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">💾</span>
                      Save Changes
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="btn-autism-friendly bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <span className="mr-2">✏️</span>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className=" bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3 animate-wiggle">📋</span>
              About Me
            </h2>
            
            <div className="space-y-4">
              {/* Birthday */}
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
                <span className="text-2xl mr-4">🎂</span>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">Birthday</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="birthday"
                      value={userInfo.birthday}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-blue-400 focus:outline-none text-gray-800"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userInfo.birthday}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200/50">
                <span className="text-2xl mr-4">🏠</span>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-green-400 focus:outline-none text-gray-800"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{userInfo.address}</p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200/50">
                <span className="text-2xl mr-4">👤</span>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">Gender</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={userInfo.gender}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-pink-400 focus:outline-none text-gray-800"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-medium">{userInfo.gender}</p>
                  )}
                </div>
              </div>

              {/* School Info */}
              <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/50">
                <span className="text-2xl mr-4">🎓</span>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700">School & Grade</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="school"
                        value={userInfo.school}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-yellow-400 focus:outline-none text-gray-800"
                        placeholder="School name"
                      />
                      <input
                        type="text"
                        name="grade"
                        value={userInfo.grade}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-yellow-400 focus:outline-none text-gray-800"
                        placeholder="Grade level"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-800 font-medium">{userInfo.grade}</p>
                      <p className="text-gray-600 text-sm">{userInfo.school}</p>
                    </div>
                  )}
                </div>
              </div>
              <br></br>
             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3 animate-float">🎨</span>
              My Interests
            </h2>

            {/* Favorite Color */}
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200/50">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Favorite Color</label>
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <input
                      type="color"
                      name="favoriteColor"
                      value={userInfo.favoriteColor}
                      onChange={handleChange}
                      className="w-12 h-12 rounded-xl border-2 border-white shadow-lg cursor-pointer"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-white shadow-lg"
                      style={{ backgroundColor: userInfo.favoriteColor }}
                    ></div>
                  )}
                  <span className="text-gray-800 font-medium">
                    {isEditing ? "Choose your favorite color!" : "This is my favorite color!"}
                  </span>
                </div>
              </div>
              

              {/* Interests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Things I Love</label>
                <div className="grid grid-cols-2 gap-3">
                  {userInfo.interests.map((interest, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200/50 text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) => handleInterestChange(index, e.target.value)}
                          className="w-full bg-transparent text-center border-b border-teal-400 focus:outline-none text-gray-800 font-medium"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">
                            {interest === 'Drawing' && '🎨'}
                            {interest === 'Animals' && '🐾'}
                            {interest === 'Music' && '🎵'}
                            {interest === 'Numbers' && '🔢'}
                          </span>
                          <span className="text-gray-800 font-medium text-sm">{interest}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>








          {/* Interests & Preferences */}
          <div className="card-autism-friendly bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-3xl mr-3 animate-bounce-gentle">🏆</span>
           Insert the data about the tracking of progress sa students
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {[
              { icon: '⭐', title: 'First Steps', color: 'from-yellow-400 to-yellow-600' },
              { icon: '🎓', title: 'Academic Star', color: 'from-blue-400 to-blue-600' },
              { icon: '🎨', title: 'Color Master', color: 'from-purple-400 to-purple-600' },
              { icon: '�', title: 'Shape Explorer', color: 'from-blue-400 to-indigo-600' },
              { icon: '🔢', title: 'Number Ninja', color: 'from-green-400 to-green-600' },
              { icon: '🤝', title: 'Helper Badge', color: 'from-orange-400 to-orange-600' }
            ].map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-2xl bg-gradient-to-r ${achievement.color} text-white text-center shadow-lg animate-float`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-bold">{achievement.title}</div>
                <div className="text-xs opacity-90 mt-1">EARNED</div>
              </div>
            ))}
          </div>



          </div>
        </div>

        {/* Achievement Gallery */}
        <div className="mt-8 card-autism-friendly bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-3xl mr-3 animate-bounce-gentle">🏆</span>
            Data tracking progress
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '⭐', title: 'First Steps', color: 'from-yellow-400 to-yellow-600' },
              { icon: '🎓', title: 'Academic Star', color: 'from-blue-400 to-blue-600' },
              { icon: '🎨', title: 'Color Master', color: 'from-purple-400 to-purple-600' },
              { icon: '�', title: 'Shape Explorer', color: 'from-blue-400 to-indigo-600' },
              { icon: '🔢', title: 'Number Ninja', color: 'from-green-400 to-green-600' },
              { icon: '📅', title: 'Consistency Champ', color: 'from-gray-400 to-gray-600' },
              { icon: '�', title: 'Helper Badge', color: 'from-orange-400 to-orange-600' },
              { icon: '🏠', title: 'Daily Life Hero', color: 'from-teal-400 to-teal-600' },
              { icon: '🏆', title: 'All-Rounder', color: 'from-yellow-400 to-yellow-600' }
            ].map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-2xl bg-gradient-to-r ${achievement.color} text-white text-center shadow-lg animate-float`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-bold">{achievement.title}</div>
                <div className="text-xs opacity-90 mt-1">EARNED</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4">
          <div className="flex justify-around">
            <a href="/studentpage" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <span className="text-2xl mb-1">🏠</span>
              <span className="text-xs font-semibold">Home</span>
            </a>
            <a href="/flashcardspage" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <span className="text-2xl mb-1">🎯</span>
              <span className="text-xs font-semibold">Activity</span>
            </a>
            <a href="/home" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <span className="text-2xl mb-1">😊</span>
              <span className="text-xs font-semibold">Expression</span>
            </a>
            <div className="flex flex-col items-center p-2 text-blue-600">
              <span className="text-2xl mb-1">👤</span>
              <span className="text-xs font-semibold">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
