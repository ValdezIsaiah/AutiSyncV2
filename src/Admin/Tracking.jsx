import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
// import AdminProfile from './Admin/AdminProfile.jsx';

const Tracking = () => {
  const metrics = [
    {
      title: 'TOTAL ACTIVITIES',
      value: 127,
      change: '+12% from last month',
      icon: '📊',
    },
    {
      title: 'COMPLETION RATE',
      value: '78%',
      change: '+5% from last month',
      icon: '🎯',
    },
    {
      title: 'AVERAGE SCORE',
      value: '87.5',
      change: '+3.2 from last month',
      icon: '⭐',
    },
    {
      title: 'STREAK DAYS',
      value: 14,
      change: 'Current streak',
      icon: '🔥',
    },
  ];

  const categories = [
    { name: 'Academic', percent: 75, count: '45/60', icon: '📚' },
    { name: 'Social/Daily Life', percent: 71, count: '32/45', icon: '👥' },
    { name: 'Objects', percent: 80, count: '28/35', icon: '✏️' },
  ];

  const recentActivities = [
    {
      title: 'Counting Numbers 1-10',
      user: 'Emma Johnson',
      category: 'Academic',
      time: '2 hours ago',
      difficulty: 'Easy',
      score: '95%',
      color: 'green',
    },
    {
      title: 'Grocery Shopping Simulation',
      user: 'Michael Chen',
      category: 'Social/Daily Life',
      time: '4 hours ago',
      difficulty: 'Medium',
      score: '87%',
      color: 'yellow',
    },
    {
      title: 'Object Recognition Challenge',
      user: 'Sarah Williams',
      category: 'Objects',
      time: '6 hours ago',
      difficulty: 'Hard',
      score: '98%',
      color: 'red',
    },
  ];

  const milestones = [
    {
      title: 'First Steps',
      description: 'Complete 5 activities',
      percent: 100,
      color: 'green',
      completed: true,
    },
    {
      title: 'Learning Streak',
      description: 'Complete activities 7 days in a row',
      percent: 85,
      color: 'blue',
      completed: false,
    },
    {
      title: 'Category Explorer',
      description: 'Try all 3 categories',
      percent: 100,
      color: 'green',
      completed: true,
    },
    {
      title: 'Master Learner',
      description: 'Complete 50 activities',
      percent: 76,
      color: 'blue',
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
      title: 'Social Butterfly',
      description: 'Excel in social activities',
      icon: '🦋',
      earned: true,
    },
    {
      title: 'Object Master',
      description: 'Master object recognition',
      icon: '🎯',
      earned: false,
    },
    {
      title: 'Perfect Score',
      description: 'Achieve 100% on any activity',
      icon: '💯',
      earned: true,
    },
  ];

  const navigate = useNavigate();

  const landingpage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  navigate("/admin/students"); // Redirect to the Students page
  };

  const AdminProfile = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/adminprofile"); // Redirect to the LoginPage route
  };

  return (
    <div className="bg-gray-100 min-h-screen ">
        <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
            
            <a href="/tracking" className="text-white hover:text-gray-300">Tracking</a>
            <a href="/activities" className="text-white hover:text-gray-300">Activities</a>
            <a href="/alarmingemotions" className="text-white hover:text-gray-300">Expression Wall</a>
          </nav>
          <div className="flex items-center">
            <img onClick={AdminProfile}
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full cursor-pointer  "
            />
          </div>
        </div>
      </header>
      <div className="p-8">
      <div className="flex justify-between items-start mb-6 -mt-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500">Monitor user progress and activity analytics</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/students')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer rounded-lg flex items-center gap-2 transition-colors"
          >
            👥 Students
          </button>
        </div>
        {/* <div className="flex items-center gap-4">
          <div className="bg-white rounded-lg shadow px-4 py-2 flex items-center gap-2">
            <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold">
              EJ
            </div>
            <div>
              <p className="text-sm font-medium">Emma Johnson</p>
              <p className="text-xs text-gray-400">Last active: 2 hours ago</p>
            </div>
          </div>
          <select className="border border-gray-300 rounded px-3 py-1 text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>All Time</option>
          </select>
        </div> */}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow flex flex-col gap-2">
            <div className="text-2xl">{metric.icon}</div>
            <p className="text-sm text-gray-500">{metric.title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{metric.value}</h2>
            <p className="text-xs text-green-500">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Category Progress + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Progress */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Category Progress</h3>
            <span className="text-xl text-gray-400">📊</span>
          </div>
          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx}>
                <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.name}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${cat.percent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{cat.count} complete</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recent Activities</h3>
            <span className="text-xl text-gray-400">📄</span>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {activity.category} • {activity.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full bg-${
                      activity.color === 'green'
                        ? 'green-100 text-green-800'
                        : activity.color === 'yellow'
                        ? 'yellow-100 text-yellow-800'
                        : 'red-100 text-red-800'
                    }`}
                  >
                    {activity.difficulty}
                  </span>
                  <span className="font-bold text-sm">{activity.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Milestones */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Milestones</h3>
        <div className="space-y-4">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-4 ${item.completed ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
                {item.completed && (
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-${item.color}-500`}
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">{item.percent}% complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Badges & Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 text-center ${
                badge.earned ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <p className="font-semibold text-sm">{badge.title}</p>
              <p className="text-xs text-gray-600">{badge.description}</p>
              {badge.earned && (
                <p className="text-xs text-yellow-600 font-semibold mt-1">Earned!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Tracking;