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
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [expressions, setExpressions] = useState([]);    
  // newnewnew

  const [expressions, setExpressions] = useState([
    { emotion: "Happy", description: "Just finished a great book and feeling accomplished!", image: "src/assets/happy.jpg" },
    { emotion: "Sad", description: "Just finished a great book and feeling accomplished!", image: "src/assets/sad.jpg" },
    { emotion: "Angry", description: "Just finished a great book and feeling accomplished!", image: "src/assets/angry.jpg" },
    { emotion: "Curious", description: "Wondering about how clouds form in the sky.", image: "src/assets/curious.jpg" },
    { emotion: "Calm", description: "Listening to rain sounds while working.", image: "src/assets/calm.jpg" },
    { emotion: "Excited", description: "Going to see my favorite band tonight!", image: "src/assets/excited.jpg" },
    { emotion: "Curious", description: "Wondering what it feels to be a dog.", image: "src/assets/curious.jpg" },
    { emotion: "Sad", description: "I lost my fish!", image: "src/assets/sad.jpg" },
  ]);
  


  const navigate = useNavigate();

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    setShowModal(true); // Show the modal when an emotion is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting the form data (name and description)

    // Find the image of the selected emotion
    const emotionImage = Emotions.find((emotion) => emotion.name === selectedEmotion)?.image;

    // Create the new expression object   NEW
    const newExpression = {
      emotion: selectedEmotion,
      description,
      name,
      image: emotionImage,
    };

    // Add the new expression to the expressions array    NEW
    setExpressions((prevExpressions) => [newExpression, ...prevExpressions]);

    // Reset form and close the modal
    setName("");
    setDescription("");
    setShowModal(false);
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
          <div className="bg-gray-200 h-70 w-170 flex justify-center items-center text-lg rounded">
            Loading video tutorial...
          </div>
        </div>
      </section>

      {/* Emotion Selection Section */}
      <section id="emotion-selection" className="my-12 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-5">How are you feeling today?</h2>
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
                  className="h-14 w-18 rounded-full mx-auto mb-2"
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
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-semibold">Why are you feeling this way?</label>
                <textarea
                  id="description"
                  className="w-full p-2 border rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-lg">Share My Feeling</button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 cursor-pointer text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Others' Emotions Section */}
      <section className="my-10 flex text-center px-6">
        <div className="max-w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-4">What others are feeling</h2>
          <div className="grid grid-cols-4 gap-4">
          {expressions.map((expression, index) => (
  <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md text-left relative">
    <img
      src={expression.image}
      alt={expression.emotion}
      className="h-14 w-14 rounded-full mb-2 mx-auto "
    />
    <h3 className="font-bold text-lg text-center">{expression.emotion}</h3>
    <p className="text-sm text-gray-700 mb-1">{expression.description}</p>
    <p className="text-xs text-gray-500 italic mb-4 mt-1">Posted by {expression.name || "Anonymous"}</p>

    {/* Show comment section if toggled */}
    {expression.showComment && (
      <div className="mt-2">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full text-sm p-2 border border-gray-300 rounded mb-2"
          value={expression.currentComment || ""}
          onChange={(e) => {
            const updated = [...expressions];
            updated[index].currentComment = e.target.value;
            setExpressions(updated);
          }}
        />
        <button
          onClick={() => {
            const updated = [...expressions];
            const comment = updated[index].currentComment;
            if (!comment) return;
            updated[index].comments = [...(updated[index].comments || []), comment];
            updated[index].currentComment = "";
            setExpressions(updated);
          }}
          className="bg-blue-700 text-white text-sm px-3 py-1 rounded hover:bg-blue-800 cursor-pointer"
        >
          Post
        </button>
        {/* BACK BUTTON */}
    <button
      onClick={() => {
        const updated = [...expressions];
        updated[index].showComment = false;
        setExpressions(updated);
      }}
      className="bg-red-700 text-white text-sm px-3 py-1 rounded hover:bg-red-800 cursor-pointer"
    >
      Back
    </button>

        {/* Render Comments */}
        <div className="mt-2 space-y-1 text-base max-h-32 overflow-y-auto pr-1">
          {expression.comments?.map((comment, cIndex) => (
            <p key={cIndex} className="text-xs text-gray-700">comment: {comment}</p>
          ))}
        </div>
      </div>
    )}

    {/* Footer Section */}
    <div
  className="text-xl text-black-500 text-sm cursor-pointer hover:text-blue-600"
  onClick={() => {
    const updated = [...expressions];
    updated[index].showComment = !updated[index].showComment;
    setExpressions(updated);
  }}
>
  💬 <span className="text-xs text-gray-500">
    comment
    {expression.comments && expression.comments.length > 0 && (
      <> ({expression.comments.length})</>
    )}
  </span>
</div>
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
          <h1 className="text-2xl font-semibold text-blue-600 mb-5 -mt-3">
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
