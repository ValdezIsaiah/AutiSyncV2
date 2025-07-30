import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from '../../components/ChatContext';

const EasyAcademicFlashcard = () => {
  const { showChatBar, roomNumber, chatMessages, messageInput, setMessageInput, handleSendMessage } = useChat();
  const navigate = useNavigate();

  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false); // Track if the question has been answered
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

  const questions = [
    {
      questionText: "How many cows are there?",
      imageSrc: "/src/assets/cow.png",
      answerChoices: ["One", "Two", "Three", "Four"],
      correctAnswer: "Three"
    },
    {
      questionText: "Which shape is this?",
      imageSrc: "/src/assets/flashcards/triangle.png",
      answerChoices: ["Circle", "Triangle", "Square", "Rectangle"],
      correctAnswer: "Triangle"
    },
    {
      questionText: "What animal is this?",
      videoSrc: "/src/assets/flashcards/dog_academic.mp4",
      answerChoices: ["Dog", "Cat", "Fish", "Bird"],
      correctAnswer: "Dog"
    },
     {
      questionText: "What are they doing?",
      // Try one of these paths:
      videoSrc: "../src/assets/flashcards/brushyourteeth.mp4",
      // or
      answerChoices: ["Sleeping", "Eating", "Reading a Book", "Brushing Teeth"],
      correctAnswer: "Brushing Teeth"
    }
];

  const studentProfileRoute = (e) => {
    e.preventDefault();
    navigate("/studentprofile");
  };

  const handleAnswerClick = (choice) => {
    setSelectedAnswer(choice);
    setIsAnswered(true); // Mark the question as answered

    if (choice === questions[currentQuestionIndex].correctAnswer) {
      setShowCorrect(true);
      setTimeout(() => setShowCorrect(false), 2000); // Hide after 1 second
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 2000); // Hide after 1 second
    }
  };

  const handleNextClick = () => {
    // Go to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      navigate("/nextActivity"); // Navigate to the next activity after the last question
    }
    setSelectedAnswer(null); // Reset selected answer
    setIsAnswered(false); // Reset answered state
  };

  const handleExpressionClick = (e) => {
  e.preventDefault();
  navigate('/home#emotion-selection');
};

  return (
    <div className="bg-gray-200 font-sans min-h-screen relative">
      {/* Navbar */}
      <header className="bg-blue-500 text-white py-3">
        <div className="w-full mx-auto flex justify-between px-8">
          <h2 className="text-white text-2xl font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
            <a href="/studentpage" className="text-white hover:text-gray-300">Home</a>
            <a href="/choosecategory" className="text-white hover:text-gray-300">Activity</a>
            <a href="#" onClick={handleExpressionClick}  className="text-white hover:text-gray-300">Expression</a>
          </nav>
          <div onClick={studentProfileRoute} className="flex items-center cursor-pointer">
            <img src="/src/assets/kidprofile1.jpg" alt="Profile Icon" className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* Title */}
      <h2 className="text-blue-600 text-center pt-4 text-4xl -mt-2 font-bold mb-2">ACADEMIC</h2>

      {/* Flashcard Container */}
      <div className="bg-white pb-10 rounded-2xl mx-auto shadow-lg p-8 w-full max-w-4xl text-center h-140 relative">
        {/* Question */}
        <h3 className="text-2xl font-semibold mb-6">{questions[currentQuestionIndex].questionText}</h3>

        {/* Show Video for Question 3 and Question 4 */}
        {currentQuestionIndex === 2 || currentQuestionIndex === 3 ? (
          <div className="flex justify-center mb-4">
            <video
              className="w-full max-w-lg mb-5"
              controls
              autoPlay
              loop
               onError={(e) => {
                console.error("Video loading error:", e);
        console.log("Attempted video source:", questions[currentQuestionIndex].videoSrc);
               }}                    //Kani ra diay kulang para muggana ang video, mag update yate
               key={questions[currentQuestionIndex].videoSrc} // Add key to force re-render
            >
              <source src={questions[currentQuestionIndex].videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          // Show Image for other questions
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            <img
              src={questions[currentQuestionIndex].imageSrc}
              alt={questions[currentQuestionIndex].questionText}
              className="bg-blue-100 w-140 h-70 mb-5 object-contain"
            />
          </div>
        )}

        {/* Answer Choices */}
        <div className="grid grid-cols-2 gap-4">
  {questions[currentQuestionIndex].answerChoices.map((choice, index) => (
    <button
      key={index}
      className={`${
        // Show green for correct answer when any answer is selected
        choice === questions[currentQuestionIndex].correctAnswer && isAnswered
          ? "bg-green-500"
        // Show red only for the wrong selected answer
        : selectedAnswer === choice && choice !== questions[currentQuestionIndex].correctAnswer
          ? "bg-red-500"
          : ""
      } 
      bg-blue-100 hover:bg-blue-200 text-lg font-medium py-4 rounded-lg cursor-pointer -mt-2`}
      onClick={() => handleAnswerClick(choice)}
      disabled={isAnswered}
    >
      {choice}
    </button>
  ))}
</div>
        {/* Correct Overlay */}
        {showCorrect && (
          <div className="absolute inset-0 backdrop-blur-xs flex flex-col justify-center items-center z-50 rounded-2xl">
            <div className="text-[8rem] -mt-40">😄</div>
            <div className="text-yellow-400 text-4xl font-bold mt-2">CORRECT!</div>
          </div>
        )}

        {/* Wrong Overlay */}
        {showWrong && (
          <div className="absolute inset-0 backdrop-blur-xs flex flex-col justify-center items-center z-50 rounded-2xl">
            <div className="text-[8rem] -mt-40">😞</div>
            <div className="text-red-500 text-4xl font-bold mt-2">WRONG!</div>
          </div>
        )}
      </div>

      {/* Next Text */}
      {isAnswered && (
        <div
          onClick={handleNextClick}
          className="absolute bottom-22 right-15 text-3xl text-black-800 font-arial cursor-pointer hover:text-blue-700"
        >
          Next Question...
        </div>
      )}

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
    </div>
  );
};

export default EasyAcademicFlashcard;
