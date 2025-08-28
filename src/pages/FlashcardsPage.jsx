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
    // Resume background music after completion
    if (bgmRef.current) {
      bgmRef.current.currentTime = 0;
      bgmRef.current.play();
      setIsBgmPlaying(true);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-yellow-200/30 rounded-full blur-lg animate-pulse-gentle"></div>
      </div>
      
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
      
      {/* Enhanced Progress Indicator with Modern Design */}
      
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-flow"></div>


      <main className={`transition-all duration-500 relative z-10 ${showChatBar ? 'sm:ml-80 lg:ml-96' : ''} max-w-none sm:max-w-7xl mx-auto `}>
        {/* Enhanced Welcome header with modern animations */}
        {(!selectedCategory || !selectedDifficulty || !selectedActivity) && (
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-scale">
            <div className="sm:mb-15 relative">
              {/* Decorative elements around image */}
              <div className="absolute top-14 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60 animate-float"></div>
              <div className="absolute -bottom-34 -right-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-60 animate-float-delayed"></div>
              <div className="absolute top-10 -right-8 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-60 animate-bounce-gentle"></div>
              
              {/* Floating elements */}
              <div className="absolute top-34 left-4 text-3xl animate-bounce-gentle">⭐</div>
              <div className="absolute -bottom-24 right-4 text-2xl animate-float">🚀</div>
            </div>
            
          </div>
        )}

        {/* Enhanced Content Area with Modern Cards */}
        <div className="relative">
          {!selectedCategory ? (
            <div className="transform transition-all duration-700 ease-out -mt-10 animate-slide-up">
              <CategorySelector 
                onSelectCategory={handleSelectCategory}
                onJoinFriend={handleJoinFriend}
              />
            </div>
          ) : !selectedDifficulty ? (
            <div className="-mt-10 transform transition-all duration-700 ease-out sm:space-y-8 animate-slide-up">
              <DifficultySelector 
                onSelectDifficulty={handleSelectDifficulty}
                selectedCategory={selectedCategory}
                onGoBack={() => setSelectedCategory(null)}
                onJoinFriend={handleJoinFriend}
              />
            </div>
          ) : !selectedActivity ? (
            <div className="transform transition-all duration-700 ease-out animate-slide-up">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20 text-center relative overflow-hidden">
                {/* Enhanced decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50"></div>
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-bl from-purple-200/20 to-transparent rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-pink-200/20 to-transparent rounded-full blur-2xl animate-float-delayed"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                    <div className="text-center sm:text-left">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center justify-center sm:justify-start mb-2">
                        <span className="text-4xl sm:text-5xl mr-3 animate-spin-slow">🎮</span>
                        Ready to Start!
                      </h2>
                      <p className="text-lg text-gray-600">Everything looks perfect! Let's begin your adventure!</p>
                    </div>
                    <button
                      onClick={() => setSelectedDifficulty(null)}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="text-xl">←</span>
                      <span className="font-semibold">Go Back</span>
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 mb-10 border-2 border-purple-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 via-purple-100/20 to-pink-100/20 rounded-3xl animate-pulse-gentle"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Your Perfect Selection:</h3>
                      <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-12">
                        <div className="text-center transform hover:scale-110 transition-all duration-300">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                            <div className="text-4xl animate-bounce-gentle">📚</div>
                          </div>
                          <div className="font-bold text-lg text-gray-700">{selectedCategory}</div>
                        </div>
                        <div className="text-6xl text-gray-300 hidden sm:block animate-pulse-gentle">•</div>
                        <div className="text-center transform hover:scale-110 transition-all duration-300">
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                            <div className="text-4xl animate-bounce-gentle">⭐</div>
                          </div>
                          <div className="font-bold text-lg text-gray-700">{selectedDifficulty}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowActivityModal(true)}
                    className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white px-10 py-5 rounded-3xl text-xl sm:text-2xl font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center mx-auto space-x-4 border-4 border-white/20 backdrop-blur-sm"
                  >
                    <span className="text-3xl animate-bounce-gentle">🚀</span>
                    <span>Choose Your Activity</span>
                    <span className="text-3xl animate-float">✨</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="transform transition-all duration-700 ease-out animate-fade-in-scale">
              <Flashcards 
                category={selectedCategory}
                difficulty={selectedDifficulty}
                activity={selectedActivity}
                onComplete={handleFlashcardComplete}
              />
            </div>
          )}
        </div>
      </main>

      {/* Activity Selection Modal - Enhanced */}
      <ActivitySelectorModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        onSelect={handleSelectActivity}
      />

      {/* Enhanced Join Friend Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-gradient-to-br from-black/40 via-purple-900/20 to-pink-900/20 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 scale-100 border border-white/20 relative overflow-hidden animate-modal-appear">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/30"></div>
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-bl from-purple-200/20 to-transparent rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-transparent rounded-full blur-xl animate-float-delayed"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="text-7xl animate-bounce-gentle">👥</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-xs animate-pulse">✓</span>
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
                  Join a Friend! 🚀
                </h2>
                
              </div>
              
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Room number (e.g., 1234)"
                    className="w-full p-4 border-3 border-purple-200 rounded-2xl text-lg text-center font-bold bg-white/70 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200/50 transition-all duration-300 shadow-lg"
                    value={roomNumber}
                    onChange={handleInputChange}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl animate-pulse">
                    🎯
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3"
                  onClick={handleJoinClick}
                >
                  <span className="text-2xl animate-bounce-gentle">🚀</span>
                  <span>Join Room</span>
                  <span className="text-xl animate-pulse">✨</span>
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Custom Styles for Modern Autism-Friendly Design */}
      <style jsx>{`
        /* Gentle floating animations */
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            filter: brightness(1);
          }
          50% { 
            transform: translateY(-12px) rotate(2deg); 
            filter: brightness(1.1);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            filter: brightness(1);
          }
          50% { 
            transform: translateY(-8px) rotate(-1deg); 
            filter: brightness(1.05);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        /* Gentle bouncing - autism-friendly */
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.5) rotate(180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(0deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2.5s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        /* Gentle pulsing effects */
        @keyframes pulse-gentle {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.03); 
            opacity: 0.9; 
          }
        }
        
        @keyframes success-pulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); 
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.5); 
          }
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-success-pulse {
          animation: success-pulse 2s ease-in-out infinite;
        }
        
        /* Smooth slide and scale animations */
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-modal-appear {
          animation: modal-appear 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Progress filling animation */
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-progress-fill {
          animation: progress-fill 0.8s ease-out;
        }
        
        /* Text shimmer effect */
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-text-shimmer {
          background-size: 200% 200%;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        
        /* Gradient flow animation */
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 4s ease-in-out infinite;
        }
        
        /* Slow gentle spin */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        /* Fade in animation */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        /* Enhanced accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Smooth transitions for all interactive elements */
        .transition-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Enhanced focus styles for accessibility */
        button:focus-visible {
          outline: 3px solid #a855f7;
          outline-offset: 3px;
          box-shadow: 0 0 0 6px rgba(168, 85, 247, 0.2);
        }
        
        input:focus-visible {
          outline: 3px solid #a855f7;
          outline-offset: 2px;
          box-shadow: 0 0 0 6px rgba(168, 85, 247, 0.15);
        }
        
        /* Active button effects */
        button:active {
          transform: scale(0.97);
        }
        
        /* Hover lift effect */
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }
        
        /* Scrollbar customization */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
        
        /* Glassmorphism effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Loading shimmer effect */
        @keyframes loading-shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
        
        .loading-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200px 100%;
          animation: loading-shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default FlashcardsPage;