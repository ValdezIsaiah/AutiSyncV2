import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const expressions = [
  {
    id: 1,
    emotion: 'Happy',
    emoji: '😊',
    description:
      'I felt really happy today because I got to play with my favorite toy and my mom read me a story before bed.',
    postedBy: 'Emma (Age 6)',
    time: '2 hours ago',
  },
  {
    id: 2,
    emotion: 'Excited',
    emoji: '🤩',
    description:
      'I am so excited because tomorrow is my birthday party and all my friends are coming over!',
    postedBy: 'Marcus (Age 8)',
    time: '4 hours ago',
  },
  {
    id: 3,
    emotion: 'Sad',
    emoji: '😢',
    description:
      'I felt sad when my pet fish died. I miss feeding him every morning and watching him swim.',
    postedBy: 'Lily (Age 7)',
    time: '6 hours ago',
  },
  {
    id: 4,
    emotion: 'Proud',
    emoji: '🥳',
    description:
      'I felt proud when I finished my puzzle all by myself. It had 100 pieces and took a long time!',
    postedBy: 'Alex (Age 9)',
    time: '8 hours ago',
  },
  {
    id: 5,
    emotion: 'Confused',
    emoji: '🤔',
    description:
      'I was confused during math class because the numbers were really hard and I didn’t understand the teacher.',
    postedBy: 'Sofia (Age 7)',
    time: '1 day ago',
  },
  {
    id: 6,
    emotion: 'Angry',
    emoji: '😡',
    description:
      'I got angry when my brother broke my favorite toy car. I had been playing with it!',
    postedBy: 'Jake (Age 8)',
    time: '1 day ago',
  },
];

const ExpressionWall = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('All Emotions');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const AdminProfile = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/adminprofile"); // Redirect to the LoginPage route
  };

  return (
    
    <div className="w-full bg-[#F8F9FB] ">
      <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
            
            <a href="/tracking" className="text-white hover:text-gray-300">Tracking</a>
            <a href="/activities" className="text-white hover:text-gray-300">Activities</a>
            <a href="/expressionwall"  className="text-white hover:text-gray-300">Expression Wall</a>
            <a href="/alarmingemotions" className="text-white hover:text-gray-300">Expression Wall</a>
          </nav>
          <div className="flex items-center">
            <img onClick={AdminProfile}
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </header>
      <h1 className="text-2xl font-semibold text-center mb-6 mt-5">
        Children's Expression Wall
      </h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Emotion Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Emotion:</label>
          <select
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option>All Emotions</option>
            <option>Happy</option>
            <option>Excited</option>
            <option>Sad</option>
            <option>Proud</option>
            <option>Confused</option>
            <option>Angry</option>
          </select>
        </div>

        {/* Sort by Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Sort by Date:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Date Range:</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            />
            <span className="text-gray-600 self-center">-</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Emotion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-10 gap-6">
        {expressions.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#BDF1FF] rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-blue-700 flex items-center gap-2">
              <span className="text-2xl">{exp.emoji}</span>
              {exp.emotion}
            </h2>
            <p className="text-gray-800 mt-2 text-sm">{exp.description}</p>
            <p className="mt-4 text-xs text-gray-600">
              Posted by: {exp.postedBy} <span className="ml-2">• {exp.time}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpressionWall;
