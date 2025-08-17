import React from 'react';
import { useNavigate } from 'react-router-dom';



const ActivitiesPage = () => {

  const navigate = useNavigate();

  const addactivity = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/addactivity"); // Redirect to the LoginPage route
  };

  const AdminProfile = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/adminprofile"); // Redirect to the LoginPage route
  };

  return (
    <div className=" bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
    
            <a href="/tracking" className="text-white hover:text-gray-300">Tracking</a>
            <a href="activities" className="text-white hover:text-gray-300">Activities</a>
            <a href="/alarmingemotions" className="text-white hover:text-gray-300">Alarming Emotions</a>
          </nav>
          <div className="flex items-center">
            <img onClick={AdminProfile}
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </header>
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 m-auto max-w-6xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-600">Activities</h2>
          <button onClick={addactivity} className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 cursor-pointer transition">
            ADD ACTIVITY
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer">
            <h3 className="font-semibold text-lg">Counting</h3>
            <p className="text-gray-700">Let’s learn counting!</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer">
            <h3 className="font-semibold text-lg">Identify</h3>
            <p className="text-gray-700">Identify items</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer">
            <h3 className="font-semibold text-lg">Connect</h3>
            <p className="text-gray-700">Connect related patterns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
