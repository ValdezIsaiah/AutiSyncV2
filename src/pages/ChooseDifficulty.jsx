import React from 'react';

const ChooseDifficulty = () => {
  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category}`);
    // Add your logic for category navigation or actions
  };

  const handleJoinFriendClick = () => {
    console.log("Join a Friend button clicked");
    // Add your logic for the Join a Friend action
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-6 ml-auto mr-6">
            <a href="/studentpage" className="text-white hover:text-gray-300">Home</a>
            <a href="#activity-selection" className="text-white hover:text-gray-300">Activity</a>
            <a href="#emotion-selection" className="text-white hover:text-gray-300">Expression</a>
          </nav>
          <div className="flex items-center">
            <img
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-screen-lg mx-auto py-10 px-4 text-center">
        <div className="mb-8">
          <img 
            src="/src/assets/categoryheader.jpg" 
            alt="Main image" 
            className="w-500 h-70 -my-5"
          />
        </div>
        <div className="flex flex-rows-2 gap-145">
        <h2 className="text-3xl font-bold mt-3 mb-6">Choose Difficulty</h2>
        {/* Join a Friend Button */}
    
        </div>

        <div className="flex flex-cols-3 gap-5 mb-6">
          {/* Category buttons */}
          <button 
            className="bg-blue-100 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={() => handleCategoryClick('Academic')}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">👌</div>
              <div className="font-semibold text-xl">Easy</div>
            </div>
          </button>
          <button 
            className="bg-blue-100 cursor-pointer py-4 rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={() => handleCategoryClick('Social / Daily Life Skill')}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">🫡</div>
              <div className="font-semibold text-xl">Medium</div>
            </div>
          </button>
          <button 
            className="bg-blue-100 py-4 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={() => handleCategoryClick('Object')}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">🫥</div>
              <div className="font-semibold text-xl">Hard</div>
            </div>
          </button>
        </div>

      </main>
    </div>
  );
};

export default ChooseDifficulty;
