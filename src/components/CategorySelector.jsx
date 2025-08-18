import React from 'react';

const CategorySelector = ({ onSelectCategory, onJoinFriend }) => (
  <div>
    <div className="flex flex-rows-2 gap-145">
      <h2 className="text-3xl font-bold mt-3 mb-6">Choose Category</h2>
      <button 
        className="bg-blue-500 text-white text-lg font-semibold px-6 py-0 h-11 rounded-lg mt-3 shadow-md hover:bg-blue-600 cursor-pointer"
        onClick={onJoinFriend}
      >
        Join a Friend
      </button>
    </div>
    <div className="flex flex-cols-3 gap-5 mb-6">
      <button 
        className="bg-blue-100 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
        onClick={() => onSelectCategory("Academic")}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">🎓</div>
          <div className="font-semibold text-2xl">Academic</div>
        </div>
      </button>
      <button 
        className="bg-blue-100 cursor-pointer py-4 rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
        onClick={() => onSelectCategory("Social / Daily Life Skill")}
      >
        <div className="text-center">
          <div className="text-5xl mb-2">👫</div>
          <div className="font-semibold text-2xl">Social / Daily Life Skill</div>
        </div>
      </button>
    </div>
  </div>
);

export default CategorySelector;