import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Emotions = [
  { name: "Happy", image: "src/assets/happy.jpg" },
  { name: "Sad", image: "src/assets/sad.jpg" },
  { name: "Angry", image: "src/assets/angry.jpg" },
  { name: "Excited", image: "src/assets/excited.jpg" },
  { name: "Hungry", image: "src/assets/hungry.jpg" },
  { name: "Disappointed", image: "src/assets/disappointed.jpg" },
  { name: "Curious", image: "src/assets/curious.jpg" },
  { name: "Loved", image: "src/assets/loved.jpg" },
  { name: "Calm", image: "src/assets/calm.jpg" },
  { name: "Shy", image: "src/assets/shy.jpg" },
];

const expressions = [
  {
    emotion: "Happy",
    description: "Just finished a great book and feeling accomplished!",
    image: "src/assets/happy.jpg" // Replace with the actual image path
  },
  {
    emotion: "Sad",
    description: "Just finished a great book and feeling accomplished!",
    image: "src/assets/sad.jpg" // Replace with the actual image path
  },
  {
    emotion: "Angry",
    description: "Just finished a great book and feeling accomplished!",
    image: "src/assets/angry.jpg" // Replace with the actual image path
  },
  {
    emotion: "Curious",
    description: "Wondering about how clouds form in the sky.",
    image: "src/assets/curious.jpg" // Replace with the actual image path
  },
  {
    emotion: "Calm",
    description: "Listening to rain sounds while working.",
    image: "src/assets/calm.jpg" // Replace with the actual image path
  },
  {
    emotion: "Excited",
    description: "Going to see my favorite band tonight!",
    image: "src/assets/excited.jpg" // Replace with the actual image path
  },
];

const HomePage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const navigate = useNavigate();

  const handleEmotionClick = (emotion) => {
    navigate('/studentpage');
  };

  const studentPageRoute = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/studentpage"); // Redirect to the LoginPage route
  };

  const studentProfileRoute = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/studentprofile"); // Redirect to the LoginPage route
  };

  return (
    <div className="font-sans ">
      {/* Navbar */}
      <header className="bg-blue-500 text-white py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <h2 className="text-white text-lg  font-bold">AutiSync</h2>
          <nav className="flex space-x-6 ml-auto mr-6">
            <a href="/studentpage" className="text-white hover:text-gray-300">Home</a>
            <a href="#activity-selection" className="text-white hover:text-gray-300">Activity</a>
            <a href="#emotion-selection" className="text-white hover:text-gray-300">Expression</a>
          </nav>
          <div onClick={studentProfileRoute} className="flex items-center cursor-pointer">
            <img
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Video Tutorial Section */}
      <section className="my-8 flex px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-1">Video Tutorial</h2>
          <p className="text-base mb-3">Empowering daily life skills for everyone.</p>
          <div className="bg-gray-200 h-64 w-170 flex justify-center items-center text-lg rounded">
            Loading video tutorial...
          </div>
        </div>
      </section>

      {/* Emotion Selection Section */}
      <section id="emotion-selection" className="my-12 px-6 text-center">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
    <div className="grid grid-cols-5 gap-8">
      {Emotions.map((emotion, index) => (
        <button
          key={index}
          className={`p-4 border rounded-lg text-lg ${selectedEmotion === emotion.name ? "bg-blue-300" : "bg-gray-100 hover:bg-blue-200"}`}
          onClick={() => handleEmotionClick(emotion.name)}
        >
          <img
            src={emotion.image}
            alt={emotion.name}
            className="h-14 w-18 rounded-full mx-auto mb-2"
          />
          <span className="block">{emotion.name}</span> {/* Added block for spacing */}
        </button>
      ))}
    </div>
  </div>
</section>

      {/* Others' Emotions Section */}
      <section className="my-12 flex text-center px-6">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">What others are feeling</h2>
    <div className="grid grid-cols-3 gap-4">
      {expressions.map((expression, index) => (
        <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
          <img
            src={expression.image}
            alt={expression.emotion}
            className="h-16 w-16 rounded-full mx-auto mb-2"
          />
          <h3 className="font-bold text-lg">{expression.emotion}</h3>
          <p className="text-sm text-gray-700">{expression.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
<div id="activity-selection" className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
      <div className="container max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-blue-600 mb-4">
            Categories
          </h1>
          <div className="flex justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="text-xl font-semibold">ACADEMIC</h2>
              <p className="text-sm text-gray-600 mt-2">
                Educational activities and learning exercises designed to build
                foundational academic skills through interactive gameplay.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h2 className="text-xl font-semibold">SOCIAL/Daily LIFE SKILL</h2>
              <p className="text-sm text-gray-600 mt-2">
                Social interaction scenarios and communication practice to
                develop interpersonal skills and emotional understanding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl mb-4">✏️</div>
              <h2 className="text-xl font-semibold">OBJECTS</h2>
              <p className="text-sm text-gray-600 mt-2">
                Object recognition and manipulation activities to enhance fine
                motor skills and practical daily living abilities.
              </p>
            </div>
          </div>
        </div>

        {/* Difficulty Levels */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-blue-600 mb-4">Difficulty Levels</h1>
          <div className="flex justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl text-green-500 mb-4">✔️</div>
              <h2 className="text-xl font-semibold">Easy</h2>
              <p className="text-sm text-gray-600 mt-2">
                Simple tasks perfect for beginners, focusing on basic
                recognition and fundamental skill development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl text-yellow-500 mb-4">⭐</div>
              <h2 className="text-xl font-semibold">Medium</h2>
              <p className="text-sm text-gray-600 mt-2">
                Intermediate challenges that build upon basic skills with more
                complex scenarios and multi-step processes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl text-red-500 mb-4">❗</div>
              <h2 className="text-xl font-semibold">Hard</h2>
              <p className="text-sm text-gray-600 mt-2">
                Advanced activities for experienced learners, featuring complex
                problem-solving and real-world applications.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
      
          <div className="mt-4">
            <button onClick={studentPageRoute} className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg cursor-pointer hover:bg-blue-700">
              Start Learning 
            </button>
            <p className="text-gray-500 mt-5">© 2025 AutiSync. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  

    </div>
  );
};

export default HomePage;
