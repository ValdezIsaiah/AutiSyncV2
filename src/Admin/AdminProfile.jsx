import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AcademicCapIcon, PencilIcon, CheckIcon, XMarkIcon, UserCircleIcon, CalendarIcon, MapPinIcon, IdentificationIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function AdminProfile() {
  const [showProfile, setShowProfile] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Default profile information for teacher/admin
  const [userInfo, setUserInfo] = useState({
    firstName: "Maria Leonora",
    lastName: "Theresa",
    email: "maria.theresa@autisync.edu",
    employeeId: "TCH-2024-001",
    department: "Special Education",
    position: "Senior Special Education Teacher",
    specialization: "Autism Spectrum Disorders",
    birthday: "June 8, 1985",
    address: "Sinto Dos, Bajada, Davao City",
    phone: "+63 912 345 6789",
    gender: "Female",
    education: "Master's in Special Education"
  });

  const navigate = useNavigate();

  // Function to handle "Back" button
  const backToHome = () => {
    navigate('/tracking');
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
      } else {
        navigate('/'); // Redirect to LandingPage
      }
    } catch (error) {
      console.error('Unexpected error during logout:', error);
    }
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle save button click
  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you could add API call to save the profile data
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset any unsaved changes if needed
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const AdminProfile = () => {
    // This function can be used for profile actions
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <AcademicCapIcon className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AutiSync
              </h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/tracking" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Dashboard
              </a>
              <a href="/activities" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Activities
              </a>
              <a href="/alarmingemotions" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Expression Wall
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={AdminProfile}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <img
                  src="/src/assets/kidprofile1.jpg"
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && (
        <>
          {/* Overlay background */}
          <div className="fixed inset-0 bg-bg-opacity-50 z-40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              
              {/* Header Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-3xl relative">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src="/src/assets/kidprofile1.jpg"
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  
                  {/* Basic Info */}
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-bold mb-2">
                      {userInfo.firstName} {userInfo.lastName}
                    </h2>
                    <p className="text-blue-100 text-lg font-medium mb-1">{userInfo.position}</p>
                    <p className="text-blue-200 mb-2">{userInfo.department}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        ID: {userInfo.employeeId}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={handleEditClick}
                          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-gray-50 transition-colors shadow-lg"
                        >
                          <PencilIcon className="w-5 h-5" />
                          <span>Edit Profile</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveClick}
                          className="bg-green-500 text-white px-4 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-green-600 transition-colors shadow-lg"
                        >
                          <CheckIcon className="w-5 h-5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-red-500 text-white px-4 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <XMarkIcon className="w-5 h-5" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <UserCircleIcon className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                    </div>

                    <div className="space-y-4">
                      {/* First Name */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.firstName}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.lastName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.phone}</p>
                        )}
                      </div>

                      {/* Birthday */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>Date of Birth</span>
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="birthday"
                            value={userInfo.birthday}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.birthday}</p>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
                        {isEditing ? (
                          <select
                            name="gender"
                            value={userInfo.gender}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.gender}</p>
                        )}
                      </div>

                      {/* Address */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-2">
                          <MapPinIcon className="w-4 h-4" />
                          <span>Address</span>
                        </label>
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={userInfo.address}
                            onChange={handleChange}
                            rows="2"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.address}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <IdentificationIcon className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-800">Professional Information</h3>
                    </div>

                    <div className="space-y-4">
                      {/* Employee ID */}
                      <div className="bg-purple-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Employee ID</label>
                        <p className="text-lg font-semibold text-gray-800">{userInfo.employeeId}</p>
                      </div>

                      {/* Position */}
                      <div className="bg-purple-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Position</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="position"
                            value={userInfo.position}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.position}</p>
                        )}
                      </div>

                      {/* Department */}
                      <div className="bg-purple-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Department</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="department"
                            value={userInfo.department}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.department}</p>
                        )}
                      </div>

                      {/* Specialization */}
                      <div className="bg-purple-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Specialization</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="specialization"
                            value={userInfo.specialization}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.specialization}</p>
                        )}
                      </div>

                      {/* Education */}
                      <div className="bg-purple-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Education</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="education"
                            value={userInfo.education}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-gray-800">{userInfo.education}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={backToHome}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2"
                    >
                      <span>← Back to Dashboard</span>
                    </button>
                    
                    <div className="text-sm text-gray-500">
                      Last updated: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
