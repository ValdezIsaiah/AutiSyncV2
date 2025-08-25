import React, { useEffect, useState } from "react";

const AlarmingEmotions = () => {
  const [emotions, setEmotions] = useState([]);

  // Fetch data from backend API
  useEffect(() => {
  // Mock data for development
  const mockEmotions = [
    { studentName: "John Doe", time: "10:30 AM", emotion: "Angry", level: "High" },
    { studentName: "Jane Smith", time: "11:00 AM", emotion: "Sad", level: "Medium" },
    { studentName: "Alex Kim", time: "11:15 AM", emotion: "Happy", level: "Low" },
    { studentName: "Alex Kim", time: "11:15 AM", emotion: "Happy", level: "Low" },
    { studentName: "Alex Kim", time: "11:15 AM", emotion: "Happy", level: "Low" },
    { studentName: "Alex Kim", time: "11:15 AM", emotion: "Happy", level: "Low" },
    { studentName: "Alex Kim", time: "11:15 AM", emotion: "Happy", level: "Low" },
  ];
  setEmotions(mockEmotions);
}, []);

  const AdminProfile = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/adminprofile"); // Redirect to the LoginPage route
  };

  return (
     <>
    <header className="bg-blue-500 text-white py-3">
        <div className="w-full mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
            
            <a href="/tracking" className="text-white hover:text-gray-300">Tracking</a>
            <a href="/activities" className="text-white hover:text-gray-300">Activities</a>
            <a href="/alarmingemotions" className="text-white hover:text-gray-300">Expression Wall</a>
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
      

    <div className="p-6">
      {/* Header */}
      
      
      <h1 className="text-2xl font-bold mb-6">Alarming Emotions Notifications</h1>

      {/* Grid of emotion cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {emotions.map((emo, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md bg-white border-l-4 ${
              emo.emotion === "Angry"
                ? "border-red-500"
                : emo.emotion === "Sad"
                ? "border-orange-400"
                : "border-gray-300"
            }`}
          >
            {/* Student name + time */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">{emo.studentName}</h2>
              <span className="text-sm text-gray-500">{emo.time}</span>
            </div>

            {/* Emotion and Level */}
            <p className="text-sm text-red-600 font-medium">
              Emotion: {emo.emotion}
            </p>
            <p className="text-sm">Level: {emo.level}</p>

            {/* View details button */}
            <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded shadow">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};


export default AlarmingEmotions;
