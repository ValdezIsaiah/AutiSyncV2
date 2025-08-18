import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '../components/ChatContext';
import ActivitySelectorModal from "../components/ActivitySelectorModal";
import NavBar from '../components/NavBar';
import ChatBar from '../components/ChatBar';

const ChooseDifficulty = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [difficulty, setDifficulty] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { showChatBar, roomNumber } = useChat();

  // When selecting difficulty, open modal
  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setShowModal(true);
  };

  // After choosing activity, navigate to flashcards page
  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setShowModal(false);

    navigate("/easyacademicflashcard", {
      state: {
        difficulty: difficulty,
        activity: activity,
        showChatBar: location.state?.showChatBar ?? showChatBar,
        roomNumber: location.state?.roomNumber ?? roomNumber
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Use NavBar component */}
      <NavBar />

      {/* Use ChatBar component */}
      <ChatBar />

      {/* Main content */}
      <main className="max-w-screen-lg mx-auto py-10 px-4 text-center">
        <div className="mb-8">
          <img 
            src="/src/assets/categoryheader.jpg" 
            alt="Main image" 
            className="w-500 h-70 -my-5"
          />
        </div>

        <h2 className="text-3xl font-bold mt-3 mb-6">Choose Difficulty</h2>

        <div className="flex flex-cols-3 gap-5 mb-6">
          <button 
            className="bg-blue-100 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={() => handleDifficultySelect("Easy")}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">👌</div>
              <div className="font-semibold text-xl">Easy</div>
            </div>
          </button>

          <button 
            className="bg-blue-100 cursor-pointer py-4 rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={() => handleDifficultySelect("Medium")}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">🫡</div>
              <div className="font-semibold text-xl">Medium</div>
            </div>
          </button>

          <button 
            className="bg-blue-100 py-4 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={() => handleDifficultySelect("Hard")}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">🫥</div>
              <div className="font-semibold text-xl">Hard</div>
            </div>
          </button>
        </div>

        <ActivitySelectorModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSelect={handleActivitySelect}
        />
      </main>
    </div>
  );
};

export default ChooseDifficulty;