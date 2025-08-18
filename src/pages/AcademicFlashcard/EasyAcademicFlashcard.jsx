import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useChat } from '../../components/ChatContext';
import Confetti from "react-confetti";
import NavBar from '../../components/NavBar';

const EasyAcademicFlashcard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    showChatBar, setShowChatBar,
    roomNumber, setRoomNumber,
    chatMessages, setChatMessages,
    messageInput, setMessageInput,
    handleSendMessage
  } = useChat();

  
  useEffect(() => {
    setShowChatBar(showChatBar);
    setRoomNumber(roomNumber);
  }, [showChatBar, roomNumber, setShowChatBar, setRoomNumber]);


  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
      videoSrc: "../src/assets/flashcards/brushyourteeth.mp4",
      answerChoices: ["Sleeping", "Eating", "Reading a Book", "Brushing Teeth"],
      correctAnswer: "Brushing Teeth"
    },
    {
      questionText: "What is the color of the cap?",
      videoSrc: "../src/assets/flashcards/###",
      answerChoices: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 4"
    }
  ];

  const total = questions.length;

  const studentProfileRoute = (e) => {
    e.preventDefault();
    navigate("/studentprofile");
  };

  const handleAnswerClick = (choice) => {
    setSelectedAnswer(choice);
    setIsAnswered(true);

    if (choice === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
      setShowCorrect(true);
      setTimeout(() => setShowCorrect(false), 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 1200);
    }
  };

  const handleNextClick = () => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  } else {
    setShowChatBar(false); // Hide chat bar after completion
    setShowModal(true);    // Show the score modal
  }
};

  const handleExpressionClick = (e) => {
    e.preventDefault();
    navigate('/home#emotion-selection');
  };

  return (
    <div className="bg-gray-200 font-sans min-h-screen relative">
      {/* Use NavBar component */}
      <NavBar onProfileClick={studentProfileRoute} />

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
              }}
              key={questions[currentQuestionIndex].videoSrc}
            >
              <source src={questions[currentQuestionIndex].videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
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
                choice === questions[currentQuestionIndex].correctAnswer && isAnswered
                  ? "bg-green-500"
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
          {currentQuestionIndex < questions.length - 1 ? "Next Question..." : "Finish"}
        </div>
      )}

      {/* Chat Bar - stays visible until completion */}
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

      {/* Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="bg-white rounded-lg p-8 shadow-lg text-center relative">
            <p className="text-4xl mb-2">Congratulations!🎉</p>
            <h2 className="text-2xl mb-4">Completed {score}/{total}</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => {
                setShowModal(false);
                navigate("/studentpage");
              }}
            >
              Close
            </button>
           
          </div>
        </div>
      )}

    </div>
  );
};

export default EasyAcademicFlashcard;