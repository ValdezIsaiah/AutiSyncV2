import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '../components/ChatContext';
import ActivitySelectorModal from "../components/ActivitySelectorModal";
import NavBar from '../components/NavBar';

const ChooseDifficulty = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [difficulty, setDifficulty] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    showChatBar, setShowChatBar,
    roomNumber, setRoomNumber,
    chatMessages, setChatMessages,
    messageInput, setMessageInput,
    handleSendMessage
  } = useChat();


  // ✅ When selecting difficulty, open modal
  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setShowModal(true);
  };

  // ✅ After choosing activity, navigate to flashcards page
  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setShowModal(false);

    // Navigate with state
    navigate("/easyacademicflashcard", {
      state: {
        difficulty: difficulty,
        activity: activity,
        showChatBar: location.state?.showChatBar || false,
        roomNumber: location.state?.roomNumber || ''
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Use NavBar component */}
      <NavBar />
      
      {/* Chat Bar */}
      {showChatBar && (
        <aside className="bg-blue-100 shadow-lg w-64 h-[calc(100vh-56px)] fixed top-[56px] left-0 z-40 p-4 flex flex-col">
          <h3 className="text-xl font-bold text-blue-800">Chat Room</h3>
          <p className="text-sm text-gray-700">🟢 Room: <strong>{roomNumber}</strong></p>
          <div className="flex-1 overflow-y-auto mb-2 space-y-2">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded text-sm max-w-[90%] ${
                  msg.sender === 'you' ? 'bg-blue-200 self-end text-right' : 'bg-white self-start text-left'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 border rounded resize-none h-16 text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white w-full py-2 mt-1 rounded hover:bg-blue-700 text-sm"
          >
            Send
          </button>
        </aside>
      )}

    

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

        {/* ✅ Activity Selector Modal */}
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
