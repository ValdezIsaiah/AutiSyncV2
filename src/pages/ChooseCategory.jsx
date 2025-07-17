import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseCategory = () => {
  const [showModal, setShowModal] = useState(false);  // To manage modal visibility
  const [roomNumber, setRoomNumber] = useState('');   // To store the room number input
  const navigate = useNavigate();

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
      navigate('/chatroom');  // Redirect to the chatroom with the room number
    } else {
      alert('Please enter a valid room number'); // Alert if no room number entered
    }
  };

  // Function to handle category click
  const handleCategoryClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/choosedifficulty"); // Redirect to the ChooseDifficulty route
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h2 className="text-white text-lg  font-bold">AutiSync</h2>
          <nav className="flex space-x-6 ml-auto mr-6">
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
      <main className="max-w-screen-md mx-auto py-10 px-4 text-center">
        <div className="mb-8">
          <img 
            src="/src/assets/categoryheader.jpg" 
            alt="Main image" 
            className="w-500 h-60 -my-5"
          />
        </div>

        <div className="flex flex-rows-2 gap-100">
          <h2 className="text-2xl font-bold mb-6">Choose Category</h2>
          {/* Join a Friend Button */}
          <button 
            className="bg-blue-500 text-white px-6 py-0 h-10 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
            onClick={handleJoinFriendClick}
          >
            Join a Friend
          </button>
        </div>

        <div className="flex flex-cols-3 gap-5 mb-6">
          {/* Category buttons */}
          <button 
            className="bg-blue-100 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-35" 
            onClick={handleCategoryClick}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">🎓</div>
              <div className="font-semibold text-xl">Academic</div>
            </div>
          </button>
          <button 
            className="bg-blue-100 cursor-pointer py-4 rounded-lg shadow-md hover:bg-blue-200 w-130 h-35" 
            onClick={() => handleCategoryClick('Social / Daily Life Skill')}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">👫</div>
              <div className="font-semibold text-xl">Social / Daily Life Skill</div>
            </div>
          </button>
          <button 
            className="bg-blue-100 py-4 cursor-pointer rounded-lg shadow-md hover:bg-blue-200 w-130 h-35" 
            onClick={() => handleCategoryClick('Object')}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">✏️</div>
              <div className="font-semibold text-xl">Object</div>
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
              className="w-full p-2 mb-4 border rounded-md"
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
