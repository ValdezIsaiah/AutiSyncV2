
import React from 'react';

const CategorySelector = ({ onSelectCategory, onJoinFriend }) => (
  <div className="bg-gradient-to-br -mt-15 from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 pt-13 shadow-2xl border border-white/20 w-270 mx-auto ">

    <img 
                src="/src/assets/categoryheader.jpg" 
                alt="Learning Adventure" 
                className="w-full -mt-8 sm:max-w-3xl sm:h-75 rounded-3xl shadow-2xl mx-auto transform hover:scale-105 transition-all duration-500 border-4 border-white/50 backdrop-blur-sm"
              />
    <div className="flex flex-row justify-center gap-110 mb-2 pt-10">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 animate-text-shimmer">
        Choose Category
      </h2>
      <button 
        className="btn-autism-friendly bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 mb-2"
        onClick={onJoinFriend}
      >
       Join a Friend
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <button 
        className="bg-white/80 backdrop-blur-xl border-2 border-blue-200 hover:border-blue-400 rounded-3xl shadow-xl hover:shadow-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer "
        onClick={() => onSelectCategory('Academic')}
      >
        <div className="text-6xl mb-3">🎓</div>
        <div className="font-bold text-xl text-blue-700 mb-1">Academic</div>
        <div className="text-base text-gray-600">Learn school subjects and skills!</div>
      </button>
      <button 
        className="bg-white/80 backdrop-blur-xl border-2 border-purple-200 hover:border-purple-400 rounded-3xl shadow-xl hover:shadow-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 cursor-pointer "
        onClick={() => onSelectCategory('Social / Daily Life Skill')}
      >
        <div className="text-6xl mb-3">👫</div>
        <div className="font-bold text-xl text-purple-700 mb-1">Social / Daily Life Skill</div>
        <div className="text-base text-gray-600">Practice life and social skills!</div>
      </button>
    </div>
  </div>
);

export default CategorySelector;