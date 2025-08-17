  import React from 'react';
  import { useNavigate, useLocation } from 'react-router-dom'; // Add this import
  import { useChat } from '../components/ChatContext';



const ChooseDifficulty = () => {

  const navigate = useNavigate(); // Add this line
  const location = useLocation();

  const {
  showChatBar, setShowChatBar,
  roomNumber, setRoomNumber,
  chatMessages, setChatMessages,
  messageInput, setMessageInput,
  handleSendMessage
} = useChat();

  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category}`);
    // Add your logic for category navigation or actions
  };

  const handleJoinFriendClick = () => {
    console.log("Join a Friend button clicked");
    // Add your logic for the Join a Friend action
  };

  // Function to handle category click
  const handledifficultyClick = (e) => {
  e.preventDefault();
  navigate("/easyacademicflashcard", {
     state: {
        showChatBar: location.state?.showChatBar || false,
        roomNumber: location.state?.roomNumber || ''
     }
  });
};

  return (
    <div className="bg-gray-100 min-h-screen">

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

    
        </div>

        <div className="flex flex-cols-3 gap-5 mb-6">
          {/* Category buttons */}
          <button 
            className="bg-blue-100 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={handledifficultyClick}
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
