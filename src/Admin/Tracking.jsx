import React, { useState } from 'react';
import { CheckCircleIcon, AcademicCapIcon, UsersIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Tracking = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');
  
  const metrics = [
    {
      title: 'TOTAL ACTIVITIES',
      value: 127,
      change: '+12% from last month',
      icon: <AcademicCapIcon className="w-8 h-8 text-blue-600" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'COMPLETION RATE',
      value: '78%',
      change: '+5% from last month',
      icon: <div className="w-8 h-8 text-green-600 text-2xl">🎯</div>,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'AVERAGE SCORE',
      value: '87.5',
      change: '+3.2 from last month',
      icon: <StarIcon className="w-8 h-8 text-yellow-600" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'STREAK DAYS',
      value: 14,
      change: 'Current streak',
      icon: <FireIcon className="w-8 h-8 text-orange-600" />,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const categories = [
    { name: 'Academic Skills', percent: 75, count: '45/60', icon: '📚', color: 'bg-blue-500' },
    { name: 'Social & Daily Life', percent: 71, count: '32/45', icon: '👥', color: 'bg-green-500' },
    { name: 'Object Recognition', percent: 80, count: '28/35', icon: '✏️', color: 'bg-purple-500' },
  ];

  const recentActivities = [
    {
      title: 'Counting Numbers 1-10',
      user: 'Emma Johnson',
      category: 'Academic',
      time: '2 hours ago',
      difficulty: 'Easy',
      score: '95%',
      difficultyColor: 'bg-green-100 text-green-800',
      avatar: 'EJ'
    },
    {
      title: 'Grocery Shopping Simulation',
      user: 'Michael Chen',
      category: 'Social/Daily Life',
      time: '4 hours ago',
      difficulty: 'Medium',
      score: '87%',
      difficultyColor: 'bg-yellow-100 text-yellow-800',
      avatar: 'MC'
    },
    {
      title: 'Object Recognition Challenge',
      user: 'Sarah Williams',
      category: 'Objects',
      time: '6 hours ago',
      difficulty: 'Hard',
      score: '98%',
      difficultyColor: 'bg-red-100 text-red-800',
      avatar: 'SW'
    },
  ];

  const milestones = [
    {
      title: 'First Steps',
      description: 'Complete 5 activities',
      percent: 100,
      color: 'bg-green-500',
      completed: true,
    },
    {
      title: 'Learning Streak',
      description: 'Complete activities 7 days in a row',
      percent: 85,
      color: 'bg-blue-500',
      completed: false,
    },
    {
      title: 'Category Explorer',
      description: 'Try all 3 categories',
      percent: 100,
      color: 'bg-green-500',
      completed: true,
    },
    {
      title: 'Master Learner',
      description: 'Complete 50 activities',
      percent: 76,
      color: 'bg-blue-500',
      completed: false,
    },
  ];

  const badges = [
    {
      title: 'Academic Star',
      description: 'Complete 20 academic activities',
      icon: '⭐',
      earned: true,
    },
    {
      title: 'Color Master',
      description: 'Complete 5 color-related activities',
      icon: '🎨',
      earned: true,
    },
    {
      title: 'Shape Explorer',
      description: 'Finish 5 shape activities',
      icon: '🔷',
      earned: true,
    },
    {
      title: 'Number Ninja',
      description: 'Answer 20 number-related questions correctly',
      icon: '🔢',
      earned: false,
    },
    {
      title: 'Consistency Champ',
      description: 'Complete activities 3 days in a row',
      icon: '📅',
      earned: false,
    },
    {
      title: 'Helper Badge',
      description: 'Activities done collaboratively with parent/teacher',
      icon: '🤝',
      earned: true,
    },
    {
      title: 'Daily Life Hero',
      description: 'Finish 5 Daily Life Skills activities',
      icon: '🏠',
      earned: false,
    },
    {
      title: 'All-Rounder',
      description: 'Complete at least one activity in every category',
      icon: '🏆',
      earned: false,
    },
  ];

  const navigate = useNavigate();

  const AdminProfile = (e) => {
    e.preventDefault();
    navigate("/adminprofile");
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Monitor student progress and activity analytics</p>
          </div>

          <div className="flex items-center space-x-4">
            <select 
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            
            <button
              onClick={() => navigate('/admin/students')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <UsersIcon className="w-5 h-5" />
              <span>Manage Students</span>
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
              <div className={`${metric.bgColor} rounded-xl p-3 w-fit mb-4`}>
                {metric.icon}
              </div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">{metric.title}</p>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{metric.value}</h2>
              <p className="text-sm text-green-600 font-medium">{metric.change}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Category Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Learning Categories</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="space-y-6">
              {categories.map((cat, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="font-semibold text-gray-700">{cat.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{cat.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`${cat.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{cat.percent}% complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <span className="text-2xl">📄</span>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold">
                        {activity.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500">
                          {activity.user} • {activity.category} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${activity.difficultyColor}`}>
                        {activity.difficulty}
                      </span>
                      <span className="font-bold text-green-600 text-lg">{activity.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Milestones */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Learning Milestones</h3>
            <div className="space-y-4">
              {milestones.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 border-2 transition-all duration-200 ${
                    item.completed 
                      ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="font-bold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    {item.completed && (
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{item.percent}% complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Achievements & Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 text-center transition-all duration-200 transform hover:scale-105 ${
                    badge.earned 
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300 shadow-md' 
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-3">{badge.icon}</div>
                  <p className="font-bold text-sm text-gray-800 mb-1">{badge.title}</p>
                  <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                  {badge.earned && (
                    <p className="text-xs text-orange-600 font-bold bg-yellow-200 px-2 py-1 rounded-full">
                      Earned! 🎉
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;