import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../components/CategorySelector';
import DifficultySelector from '../components/DifficultySelector';
import ActivitySelectorModal from '../components/ActivitySelectorModal';
import Flashcards from '../components/Flashcards';
import NavBar from '../components/NavBar';
import ChatBar from '../components/ChatBar';
import { useChat } from '../components/ChatContext';

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const bgmRef = React.useRef(null);
  const [isBgmPlaying, setIsBgmPlaying] = useState(true);

  const {
    showChatBar,
    setShowChatBar,
    roomNumber,
    setRoomNumber
  } = useChat();

  // Handle category selection
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Handle difficulty selection - show activity modal
  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowActivityModal(true);
  };

  // Handle activity selection - start flashcards
  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(false);
    
    // Stop background music when answering flashcards
    if (bgmRef.current) {
      bgmRef.current.pause();
      setIsBgmPlaying(false);
    }
  };

  // Handle flashcard completion
  const handleFlashcardComplete = (score, total) => {
    setShowChatBar(false); // Hide chat bar after completion
    // Reset selections to go back to category selection
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedActivity(null);
    // You can add navigation or show results here
    console.log(`Completed with score: ${score}/${total}`);
  };

  const handleJoinFriend = () => {
    setShowModal(true);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setRoomNumber(e.target.value);
  };

  // Function to handle "Join" button click
  const handleJoinClick = () => {
    if (roomNumber) {
      setShowModal(false);
      setShowChatBar(true);
    } else {
      alert('Please enter a valid room number');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <ChatBar />
      {/* Background Music */}
      <audio
        ref={bgmRef}
        src="/src/assets/sounds/game-bgmusic.mp3"
        autoPlay
        loop
        style={{ display: 'none' }}
      />
      <main className="max-w-screen-lg mx-auto py-5 px-4 text-center">
  {/* Only show the image if not answering flashcards */}
  {(!selectedCategory || !selectedDifficulty || !selectedActivity) && (
    <div className="mb-8">
      <img 
        src="/src/assets/categoryheader.jpg" 
        alt="Main image" 
        className="w-500 h-70 -my-5"
      />
    </div>
  )}

  {/* Show different components based on selection state */}
  {!selectedCategory ? (
    <CategorySelector 
      onSelectCategory={handleSelectCategory}
      onJoinFriend={handleJoinFriend}
    />
  ) : !selectedDifficulty ? (
    <DifficultySelector 
      onSelectDifficulty={handleSelectDifficulty}
    />
  ) : !selectedActivity ? (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Select an Activity for {selectedCategory} - {selectedDifficulty}</h2>
      <button 
        onClick={() => setShowActivityModal(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600"
      >
        Choose Activity
      </button>
    </div>
  ) : (
    <Flashcards 
      category={selectedCategory}
      difficulty={selectedDifficulty}
      activity={selectedActivity}
      onComplete={handleFlashcardComplete}
    />
  )}
</main>

      {/* Activity Selection Modal */}
      <ActivitySelectorModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        onSelect={handleSelectActivity}
      />

      {/* Join Friend Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-90 text-center">
            <h2 className="text-2xl font-semibold mb-4">Join a Friend</h2>
            <input
              type="text"
              placeholder="Enter room number to join a friend"
              className="w-full p-4 mb-4 border rounded-md"
              value={roomNumber}
              onChange={handleInputChange}
            />
            <div className="flex justify-center space-x-4">
              <button
                className="bg-blue-800 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-900"
                onClick={handleJoinClick}
              >
                Join
              </button>
              <button
                className="text-white bg-red-800 px-6 py-2 rounded-lg cursor-pointer hover:bg-red-900"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;