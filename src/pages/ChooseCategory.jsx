import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../components/ChatContext';

const ChooseCategory = () => {
  const [showModal, setShowModal] = useState(false);  // To manage modal visibility
  
  const navigate = useNavigate();

  const {
  showChatBar, setShowChatBar,
  roomNumber, setRoomNumber,
  chatMessages, setChatMessages,
  messageInput, setMessageInput,
  handleSendMessage
} = useChat();


  // Function to handle "Join a Friend" button click
  const handleJoinFriendClick = () => {
    setShowModal(true);  // Show the modal when the button is clicked
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setRoomNumber(e.target.value);
  };

  // Function to handle "Join" button click
  const handleJoinClick = () => {
    if (roomNumber) {
      setShowModal(false);         // Close modal
      setShowChatBar(true);        // Show chat bar
      // navigate('/chatroom');       // Navigate if needed
    } else {
      alert('Please enter a valid room number');
    }
  };

  // Function to handle category click
  const handleCategoryClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/choosedifficulty", {
      state: {
      showChatBar: showChatBar,
      roomNumber: roomNumber
      }
  }); // Redirect to the ChooseDifficulty route
  };

  const goToProfile = () => {
    navigate('/studentprofile');
  };

  // const handleSendMessage = () => {
  //   if (messageInput.trim() !== '') {
  //     const newMessage = {
  //       id: Date.now(),
  //       text: messageInput,
  //       sender: 'you', // You can toggle 'friend' for testing
  //     };
  
  //     setChatMessages([...chatMessages, newMessage]);
  //     setMessageInput('');
  
  //     // Simulate a friend's reply after 1.5 seconds
  //     setTimeout(() => {
  //       const reply = {
  //         id: Date.now() + 1,
  //         text: 'Hi there! 👋',
  //         sender: 'friend',
  //       };
  //       setChatMessages((prev) => [...prev, reply]);
  //     }, 1500);
  //   }
  // };

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
            <img onClick={goToProfile}
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full cursor-pointer transition duration-300"
            />
          </div>
        </div>
      </header>


      {showChatBar && (
  <aside className="bg-blue-100 shadow-lg w-64 h-[calc(100vh-56px)] fixed top-[56px] left-0 z-40 p-4 flex flex-col">
    {/* Chat Header */}
    <div className="mb-2">
      <h3 className="text-xl font-bold text-blue-800">Chat Room</h3>
      <p className="text-sm text-gray-700">🟢 Room: <strong>{roomNumber}</strong></p>
    </div>

    {/* Chat Messages */}
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

    {/* Input & Send */}
    <div className="mt-auto">
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
    </div>
  </aside>
)}
``


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
          <h2 className="text-3xl font-bold mt-3 mb-6">Choose Category</h2>
          {/* Join a Friend Button */}
          <button 
            className="bg-blue-500 text-white text-lg font-semibold px-6 py-0 h-11 rounded-lg mt-3 shadow-md hover:bg-blue-600 cursor-pointer"
            onClick={handleJoinFriendClick}
          >
            Join a Friend
          </button>
        </div>

        <div className="flex flex-cols-3 gap-5 mb-6">
          {/* Category buttons */}
          <button 
            className="bg-blue-100 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={(e) => handleCategoryClick(e, "Academic")}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">🎓</div>
              <div className="font-semibold text-2xl">Academic</div>
            </div>
          </button>
          <button 
            className="bg-blue-100 cursor-pointer py-4 rounded-lg shadow-md hover:bg-blue-200 w-130 h-43" 
            onClick={() => handleCategoryClick('Social / Daily Life Skill')}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">👫</div>
              <div className="font-semibold text-2xl">Social / Daily Life Skill</div>
            </div>
          </button>
         
        </div>

      </main>

      {/* Modal for Joining a Friend */}
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
      )}

    </div>
  );
};

export default ChooseCategory;
