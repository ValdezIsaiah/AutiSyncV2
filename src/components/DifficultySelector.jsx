import React from 'react';

const DifficultySelector = ({ onSelectDifficulty }) => (
  <div>
    <h2 className="text-3xl font-bold mt-3 mb-6">Choose Difficulty</h2>
    <div className="flex flex-cols-3 gap-5 mb-6">
      <button 
        className="bg-blue-100 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
        onClick={() => onSelectDifficulty("Easy")}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">👌</div>
          <div className="font-semibold text-xl">Easy</div>
        </div>
      </button>
      <button 
        className="bg-blue-100 cursor-pointer py-4 rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
        onClick={() => onSelectDifficulty("Medium")}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">🫡</div>
          <div className="font-semibold text-xl">Medium</div>
        </div>
      </button>
      <button 
        className="bg-blue-100 py-4 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
        onClick={() => onSelectDifficulty("Hard")}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">🫥</div>
          <div className="font-semibold text-xl">Hard</div>
        </div>
      </button>
    </div>
  </div>
);

export default DifficultySelector;