import React from 'react';

const DifficultySelector = ({ onSelectDifficulty, onJoinFriend, selectedCategory, onGoBack }) => (
  <div className="bg-gradient-to-br -mt-10 from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-10 border border-white/20 relative overflow-hidden mx-auto w-270">
    {/* Decorative background */}
    <div className="absolute top-0 right-0 w-270 h-32 bg-gradient-to-bl from-purple-200/20 to-transparent rounded-full blur-2xl"></div>
    
    {/* Choose your level details container */}
    <div className="relative z-10 -mt-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-5">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center justify-center sm:justify-start mb-2">
            <span className="text-4xl sm:text-5xl mr-3 animate-bounce-gentle">🎯</span>
            Choose Your Level
          </h2>
        </div>
        <button
          onClick={onGoBack}
          className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="text-xl">←</span>
          <span className="font-semibold">Go Back</span>
        </button>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border-2 border-purple-100 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20 rounded-2xl animate-pulse-gentle"></div>
        <div className="relative z-10 text-center">
          <p className="text-xl sm:text-2xl text-gray-800 flex items-center justify-center">
            <span className="font-bold text-purple-600">Selected Category:</span> 
            <span className="ml-3 font-bold text-pink-600">{selectedCategory}</span>
            <span className="ml-3 text-3xl animate-bounce-gentle">📚</span>
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-110 mb-2 pt-4">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 animate-text-shimmer">
          Choose Difficulty
        </h2>
        <button 
          className="btn-autism-friendly bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 mb-2"
          onClick={onJoinFriend}
        >
         Join a Friend
        </button>
      </div>
    </div>

    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <button 
        className="bg-white/80 backdrop-blur-xl border-2 border-green-200 hover:border-green-400 rounded-3xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 cursor-pointer " 
        onClick={() => onSelectDifficulty("Easy")}
      >
        <div className="text-7xl mb-4">😊</div>
        <div className="font-bold text-2xl text-green-700 mb-2">Easy</div>
        <div className="text-base text-gray-600 text-center">Perfect for beginners!</div>
      </button>
      
      <button 
        className="bg-white/80 backdrop-blur-xl border-2 border-orange-200 hover:border-orange-400 rounded-3xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 cursor-pointer " 
        onClick={() => onSelectDifficulty("Medium")}
      >
        <div className="text-7xl mb-4">🤔</div>
        <div className="font-bold text-2xl text-orange-700 mb-2">Medium</div>
        <div className="text-base text-gray-600 text-center">A fun challenge!</div>
      </button>
      
      <button 
        className="bg-white/80 backdrop-blur-xl border-2 border-red-200 hover:border-red-400 rounded-3xl shadow-xl hover:shadow-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 cursor-pointer " 
        onClick={() => onSelectDifficulty("Hard")}
      >
        <div className="text-7xl mb-4">💪</div>
        <div className="font-bold text-2xl text-red-700 mb-2">Hard</div>
        <div className="text-base text-gray-600 text-center">For experts like you!</div>
      </button>
    </div>
  </div>
);

export default DifficultySelector;