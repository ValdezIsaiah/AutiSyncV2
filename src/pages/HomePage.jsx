import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Emotions = [
  { name: "Happy", image: "src/assets/happy.jpg" },
  { name: "Sad", image: "src/assets/sad.webp" },
  { name: "Angry", image: "src/assets/angry.png" },
  { name: "Excited", image: "src/assets/excited.jpg" },
  { name: "Calm", image: "src/assets/calm.jpg" },
  // { name: "Hungry", image: "src/assets/hungry.jpg" },
  // { name: "Disappointed", image: "src/assets/disappointed.jpg" },
  // { name: "Curious", image: "src/assets/curious.jpg" },
  // { name: "Loved", image: "src/assets/loved.jpg" },
  // { name: "Shy", image: "src/assets/shy.jpg" },
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
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(3); // Default level set to 3
  const [name, setName] = useState("");
 
 // Assuming the username is dynamically set (can be from state/context)
  const username = "SampleUser"; // Replace with dynamic username

  // const [expressions, setExpressions] = useState([]);    
  // newnewnew

  const [expressions, setExpressions] = useState([
    { emotion: "Happy", description: "Feeling Happy at level 5", image: "src/assets/happy.jpg" },
    { emotion: "Sad", description: "Feeling Sad at level 2", image: "src/assets/sad.webp" },
    { emotion: "Angry", description: "Feeling Angry at level 4", image: "src/assets/angry.png" },
    { emotion: "Excited", description: "Feeling Curious at level 1", image: "src/assets/excited.jpg" },
    { emotion: "Calm", description: "Listening to rain sounds while working.", image: "src/assets/calm.jpg" },
    { emotion: "Excited", description: "Going to see my favorite band tonight!", image: "src/assets/excited.jpg" },
    { emotion: "Happy", description: "Wondering what it feels to be a dog.", image: "src/assets/happy.jpg" },
    { emotion: "Sad", description: "I lost my fish!", image: "src/assets/sad.webp" },
  ]);
  


  const navigate = useNavigate();

   const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    setShowModal(true); // Show the modal when an emotion is clicked
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Find the image of the selected emotion
  const emotionImage = Emotions.find((emotion) => emotion.name === selectedEmotion)?.image;

  // Create the new expression object with intensity level
  const newExpression = {
    emotion: selectedEmotion,
    description: `Feeling ${selectedEmotion} at level ${selectedLevel}`,
    name: "Anonymous", // Or handle this as required
    image: emotionImage,
    level: selectedLevel, // Store the level of intensity
  };

  // Add the new expression to the expressions array
  setExpressions((prevExpressions) => [newExpression, ...prevExpressions]);

  // Reset form and close the modal
  setShowModal(false);
};

const getSliderBackground = () => {
  // Calculate the percentage for each level of the slider
  const percentage = (selectedLevel - 1) * 25; // From 1 (0%) to 5 (100%)
  return `linear-gradient(to right, green ${percentage}%, yellow ${percentage + 20}%, orange ${percentage + 40}%, red ${percentage + 60}%)`;
};

  const studentPageRoute = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/studentpage"); // Redirect to the LoginPage route
  };

  const studentProfileRoute = (e) => {
    e.preventDefault(); 
    navigate("/studentprofile"); // Redirect to the LoginPage route
  };

  return (
    <div className="font-sans ">
      {/* Navbar */}
      <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
            <a href="/studentpage" className="text-white hover:text-gray-300">Home</a>
            <a href="/choosecategory" className="text-white hover:text-gray-300">Activity</a>
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
          <video
          className="w-full rounded-lg h-80 shadow-lg"
          controls
          autoPlay  
          loop
          muted
        >
          <source src="/public/assets/assets/videotutorial.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
      </section>

      {/* Emotion Selection Section */}
      <section  className="my-12 px-6 text-center">
        <div id="emotion-selection" className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-7">How are you feeling today?</h2>
          <div className="grid grid-cols-5 gap-8">
            {Emotions.map((emotion, index) => (
              <button
                key={index}
                className={`p-4 border cursor-pointer rounded-lg text-lg ${selectedEmotion === emotion.name ? "bg-blue-300" : "bg-gray-100 hover:bg-blue-200"}`}
                onClick={() => handleEmotionClick(emotion.name)}
              >
                <img
                  src={emotion.image}
                  alt={emotion.name}
                  className="h-18 w-18 rounded-full mx-auto mb-2"
                />
                <span className="block">{emotion.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <img
        src={Emotions.find((emotion) => emotion.name === selectedEmotion)?.image}
        alt={selectedEmotion}
        className="w-24 h-24 mx-auto mb-4 rounded-full"
      />
      <h2 className="text-2xl font-semibold text-center mb-4">You're feeling {selectedEmotion}</h2>

      {/* Horizontal Range Slider with Dynamic Color */}
      <div className="mb-4">
        <label htmlFor="emotion-level" className="block text-lg font-semibold">
          Select the level of your emotion:
        </label>
        <input
            type="range"
            id="emotion-level"
            min="1"
            max="5"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}  // Ensure value is treated as a number
            className="w-full  mt-4"
            style={{
              background: getSliderBackground(),  // Apply the dynamic background
            }}
          />
        <div className="flex justify-between text-xs mt-2">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-lg"
        >
          Share My Feeling
        </button>
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="bg-gray-500 cursor-pointer text-white py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* Others' Emotions Section */}
      <section className="my-10 flex text-center px-6">
        <div className="max-w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-6 ">What others are feeling</h2>
          <div className="grid grid-cols-4 gap-4">
          {expressions.map((expression, index) => (
  <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md text-left relative">
    <img
      src={expression.image}
      alt={expression.emotion}
      className="h-14 w-14 rounded-full mb-2 mx-auto "
    />
    <h3 className="font-bold text-lg text-center">{expression.emotion}</h3>
    <p className="text-lg text-gray-700 mb-1">{expression.description}</p>
<p className="text-xs text-gray-500 italic mb-4 mt-1">Posted by {expression.name || "Anonymous"}</p>


    

    {/* Footer Section */}
 
    <div className="absolute bottom-2 right-4 text-xs text-gray-500">
      {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  </div>
))}

          </div>
        </div>
      </section>
      
<div id="activity-selection" className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-6">
      <div className="container max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-blue-600 mb-5 ">
            Categories
          </h1>
          <div className="flex justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="text-xl font-semibold">ACADEMIC</h2>
              <p className="text-lg text-gray-800 mt-2">
                Learn basic school stuff in fun ways!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h2 className="text-xl font-semibold">SOCIAL/DAILY LIFE SKILL</h2>
              <p className="text-lg text-gray-800 mt-2">
                Practice talking, sharing, and feelings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl mb-4">✏️</div>
              <h2 className="text-xl font-semibold">OBJECTS</h2>
              <p className="text-lg text-gray-800 mt-2">
                Play with shapes and things we use every day.
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
              <h2 className="text-xl font-semibold">EASY</h2>
              <p className="text-lg text-gray-800 mt-2">
                Start here. Simple and fun!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl text-yellow-500 mb-4">⭐</div>
              <h2 className="text-xl font-semibold">MEDIUM</h2>
              <p className="text-lg text-gray-800 mt-2">
                A little harder. Let’s level up!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <div className="text-4xl text-red-500 mb-4">❗</div>
              <h2 className="text-xl font-semibold">HARD</h2>
              <p className="text-lg text-gray-800 mt-2">
                Ready for a challenge? Let’s go big!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
      
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
