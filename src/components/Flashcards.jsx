import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

const Flashcards = ({ category, difficulty, activity, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [showModal, setShowModal] = useState(false);

    const videoRef = useRef(null);
  const audioRef = useRef(null);
  const correctAudioRef = useRef(null);

  const celebrationSound = "/src/assets/sounds/Activitycompletion.mp3"; // Place your sound file here
  const correctSound = "/src/assets/sounds/correct.mp3"; 

  // Pause video and play sound when modal appears
  useEffect(() => {
    if (showModal) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  }, [showModal]);

    useEffect(() => {
    if (showCorrect && correctAudioRef.current) {
      correctAudioRef.current.currentTime = 0;
      correctAudioRef.current.play();
    }
  }, [showCorrect]);

  // Sample questions data - you can organize this by category, difficulty, and activity
  const questionsData = {
    Academic: {
      Easy: {
        Identification: [
          {
            questionText: "What are they doing?", 
            videoSrc: "/src/assets/flashcards/brushyourteeth.mp4",
            answerChoices: ["Sleeping", "Eating", "Reading a Book", "Brushing Teeth"],
            correctAnswer: "Brushing Teeth"   
          },
          {
            questionText: "What animal is this?",
            videoSrc: "/src/assets/flashcards/dog_academic.mp4",
            answerChoices: ["Dog", "Cat", "Fish", "Bird"],
            correctAnswer: "Dog"
          },
          {
            questionText: "What number is this?",
            videoSrc: "/src/assets/flashcards/Easy-identificaction/number9.mp4",
            answerChoices: ["Eight", "Seven", "Nine", "Ten"],
            correctAnswer: "Nine"
          },
          {
            questionText: "What number is this?",
            videoSrc: "/src/assets/flashcards/Easy-identificaction/number4.mp4",
            answerChoices: ["Four", "Eight", "Six", "Ten"],
            correctAnswer: "Four"
          },
          {
            questionText: "What number is this?",
            videoSrc: "/src/assets/flashcards/Easy-identificaction/number8.mp4",
            answerChoices: ["Six", "Nine", "Eight", "Three"],
            correctAnswer: "Eight"
          }
        ],
        Numbers: [
          {
            questionText: "How many cows are there?",
            imageSrc: "/src/assets/cow.png",
            answerChoices: ["Six", "Seven", "Eight", "Five"],
            correctAnswer: "Seven"
          },
          {
            questionText: "What number is missing?",
            videoSrc: "/src/assets/flashcards/Easy-Numbers/numbers-4-easy.mp4",
            answerChoices: ["One", "Two", "Three", "Four"],
            correctAnswer: "Four"
          },
          {
            questionText: "What number are missing?",
            videoSrc: "/src/assets/flashcards/Easy-Numbers/numbers-1-easy.mp4",
            answerChoices: ["Three", "Four", "Two", "One"],
            correctAnswer: "One"
          },
          {
            questionText: "What numbers are missing?",
            videoSrc: "/src/assets/flashcards/Easy-Numbers/number6&7-easy.mp4",
            answerChoices: ["Six and Seven", "Six and Eight", "Five and Seven", "Five and Eight"],
            correctAnswer: "Six and Seven"
          },
          {
            questionText: "What number is missing?",
            videoSrc: "/src/assets/flashcards/Easy-Numbers/numbers-2-easy.mp4",
            answerChoices: ["Two", "Five", "Three", "Six"],
            correctAnswer: "Two"
          },
        ],
        Colors: [
          {
            questionText: "What color is this?",
            imageSrc: "/src/assets/flashcards/blue_circle.jpg",
            answerChoices: ["Red", "Blue", "Green", "Yellow"],
            correctAnswer: "Blue"
          }
        ],
        Shapes: [
          {
            questionText: "Which shape is this?",
            imageSrc: "/src/assets/flashcards/triangle.png",
            answerChoices: ["Circle", "Triangle", "Square", "Rectangle"],
            correctAnswer: "Triangle"
          }
        ],
        Spelling: [
          {
            questionText: "How do you spell this word?",
            imageSrc: "/src/assets/flashcards/cat.jpg",
            answerChoices: ["CAT", "COT", "CUT", "BAT"],
            correctAnswer: "CAT"
          }
        ]
      },
      Medium: {
        // Add medium difficulty questions here
      },
      Hard: {
        // Add hard difficulty questions here
      }
    },
    "Social / Daily Life Skill": {
      // Add social/daily life skill questions here
    }
  };

  const questions = questionsData[category]?.[difficulty]?.[activity] || [];
  const total = questions.length;

  // Handle answer selection
  const handleAnswerClick = (choice) => {
    if (isAnswered) return;
    
    setSelectedAnswer(choice);
    setIsAnswered(true);

    if (choice === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
      setShowCorrect(true);
      setTimeout(() => setShowCorrect(false), 1500);
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 1500);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowModal(true);
    }
  };

  const handleFinish = () => {
    setShowModal(false);
    onComplete(score, total);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-600">
          No flashcards available for {category} - {difficulty} - {activity}
        </h2>
        <p className="text-gray-500 mt-2">Please select a different combination.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Flashcard Container */}
      <div className="bg-white rounded-2xl mx-auto shadow-lg p-4 w-full max-w-4xl text-center relative">
        {/* Question Counter */}
        <div className="text-sm text-gray-500 mb-1">
          Question {currentQuestionIndex + 1} of {total}
        </div>

        {/* Question */}
        <h3 className="text-2xl font-semibold mb-6">
          {questions[currentQuestionIndex].questionText}
        </h3>

        {/* Image/Video */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {questions[currentQuestionIndex].imageSrc && (
            <img
              src={questions[currentQuestionIndex].imageSrc}
              alt={questions[currentQuestionIndex].questionText}
              className="w-full max-w-lg mb-1 object-contain rounded-lg"
            />
          )}
          {questions[currentQuestionIndex].videoSrc && (
            <video
              key={questions[currentQuestionIndex].videoSrc}
              ref={videoRef}
              className="w-full max-w-xl mb-5 rounded-lg"
              controls
              autoPlay
              loop
            >
              <source src={questions[currentQuestionIndex].videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Answer Choices */}
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestionIndex].answerChoices.map((choice, index) => (
            <button
              key={index}
              className={`${
                choice === questions[currentQuestionIndex].correctAnswer && isAnswered
                  ? "bg-green-500 text-white"
                  : selectedAnswer === choice && choice !== questions[currentQuestionIndex].correctAnswer
                  ? "bg-red-500 text-white"
                  : "bg-blue-100 hover:bg-blue-200"
              } 
              text-lg font-medium py-4 rounded-lg cursor-pointer transition-colors`}
              onClick={() => handleAnswerClick(choice)}
              disabled={isAnswered}
            >
              {choice}
            </button>
          ))}
        </div>

        {/* Correct Overlay */}
        {showCorrect && (
          <div className="absolute inset-0 backdrop-blur-sm flex flex-col justify-center items-center z-50 rounded-2xl">
            <audio ref={correctAudioRef} src={correctSound} />
            <div className="text-[8rem]">😄</div>
            <div className="text-green-500 text-4xl font-bold mt-2">CORRECT!</div>
          </div>
        )}

        {/* Wrong Overlay */}
        {showWrong && (
          <div className="absolute inset-0 backdrop-blur-sm flex flex-col justify-center items-center z-50 rounded-2xl">
            <div className="text-[8rem]">😞</div>
            <div className="text-red-500 text-4xl font-bold mt-2">WRONG!</div>
          </div>
        )}
      </div>

      {/* Next Button */}
      {isAnswered && (
        <div className="absolute -right-50 bottom-8">
          <p
            onClick={handleNextClick}
            className=" text-black text-3xl cursor-pointer hover:text-blue-600 "
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question..." : "Finish..."}
          </p>
        </div>
      )}

      {/* Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-40 z-50">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <audio ref={audioRef} src={celebrationSound} />
          <div className="bg-white rounded-lg p-12 w-[500px] shadow-lg text-center relative">
            <p className="text-5xl mb-4">🎉</p>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-xl mb-6">You completed {score}/{total} questions correctly!</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg cursor-pointer text-lg transition-colors"
              onClick={handleFinish}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;