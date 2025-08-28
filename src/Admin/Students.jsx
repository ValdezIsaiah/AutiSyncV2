import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon, MagnifyingGlassIcon, FunnelIcon, UsersIcon, CheckCircleIcon, UserIcon } from '@heroicons/react/24/solid';

const Students = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  
  // Sample student data
  const [students] = useState([
    {
      id: 1,
      name: 'Emma Johnson',
      age: 8,
      address: '123 Main St, Springfield, IL',
      gender: 'Female',
      joinDate: '2024-01-15',
      status: 'Active',
      completedActivities: 24,
      averageScore: 87,
      lastActive: '2 hours ago',
      profileColor: 'bg-pink-500'
    },
    {
      id: 2,
      name: 'Liam Smith',
      age: 7,
      address: '456 Oak Ave, Springfield, IL',
      gender: 'Male',
      joinDate: '2024-02-20',
      status: 'Active',
      completedActivities: 18,
      averageScore: 92,
      lastActive: '1 hour ago',
      profileColor: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Sophia Davis',
      age: 9,
      address: '789 Pine Rd, Springfield, IL',
      gender: 'Female',
      joinDate: '2024-01-10',
      status: 'Active',
      completedActivities: 31,
      averageScore: 89,
      lastActive: '3 hours ago',
      profileColor: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Noah Wilson',
      age: 6,
      address: '321 Elm St, Springfield, IL',
      gender: 'Male',
      joinDate: '2024-03-05',
      status: 'Inactive',
      completedActivities: 8,
      averageScore: 75,
      lastActive: '2 days ago',
      profileColor: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Isabella Brown',
      age: 8,
      address: '654 Maple Dr, Springfield, IL',
      gender: 'Female',
      joinDate: '2024-02-15',
      status: 'Active',
      completedActivities: 22,
      averageScore: 94,
      lastActive: '30 minutes ago',
      profileColor: 'bg-orange-500'
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status.toLowerCase() === statusFilter;
    const matchesGender = genderFilter === 'all' || student.gender.toLowerCase() === genderFilter;
    return matchesSearch && matchesStatus && matchesGender;
  });

  const handleBackToDashboard = () => {
    navigate('/tracking');
  };

  const AdminProfile = (e) => {
    e.preventDefault();
    navigate("/adminprofile");
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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
              <a href="/tracking" className="text-gray-600 text-lg hover:text-blue-600 font-semibold  transition-colors">
                Dashboard
              </a>
              <a href="/activities" className="text-gray-600 text-lg hover:text-blue-600 font-semibold  transition-colors">
                Activities
              </a>
              <a href="/alarmingemotions" className="text-gray-600 text-lg hover:text-blue-600 font-semibold transition-colors">
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

      <div className="max-w-full mx-auto sm:px-6  py-4">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Management</h1>
            <p className="text-lg text-gray-600">Monitor and support student learning journeys</p>
          </div>
          <button
            onClick={handleBackToDashboard}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl">
                <UsersIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Students</p>
                <p className="text-3xl font-bold text-green-600">
                  {students.filter(s => s.status === 'Active').length}
                </p>
               
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center">
              <div className="bg-pink-100 p-3 rounded-xl">
                <UserIcon className="w-8 h-8 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Female Students</p>
                <p className="text-3xl font-bold text-pink-600">
                  {students.filter(s => s.gender === 'Female').length}
                </p>
                
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl">
                <UserIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Male Students</p>
                <p className="text-3xl font-bold text-blue-600">
                  {students.filter(s => s.gender === 'Male').length}
                </p>
                
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search students by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`${student.profileColor} text-white w-16 h-16 flex items-center justify-center rounded-2xl text-xl font-bold`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500">Student ID: #{student.id}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Age:</span>
                    <span className="text-sm font-medium text-gray-700">{student.age} years old</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Gender:</span>
                    <span className="text-sm font-medium text-gray-700">{student.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Activities:</span>
                    <span className="text-sm font-medium text-blue-600">{student.completedActivities} completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Avg Score:</span>
                    <span className={`text-sm font-bold ${getScoreColor(student.averageScore)}`}>
                      {student.averageScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Last Active:</span>
                    <span className="text-sm font-medium text-gray-700">{student.lastActive}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500 mb-3">📍 {student.address}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/tracking?studentId=${student.id}`)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      View Progress
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-semibold transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No students found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;