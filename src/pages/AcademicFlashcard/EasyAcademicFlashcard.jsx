// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useChat } from '../../components/ChatContext';
// import Confetti from "react-confetti";
// import NavBar from '../../components/NavBar';
// import ChatBar from '../../components/ChatBar';

// const EasyAcademicFlashcard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { 
//     showChatBar,
//     setShowChatBar,
//     roomNumber,
//     setRoomNumber 
//   } = useChat();

//   // Initialize chat state from location or context
//   useEffect(() => {
//     if (location.state?.showChatBar !== undefined) {
//       setShowChatBar(location.state.showChatBar);
//     }
//     if (location.state?.roomNumber !== undefined) {
//       setRoomNumber(location.state.roomNumber);
//     }
//   }, [location.state, setShowChatBar, setRoomNumber]);

//   const [showModal, setShowModal] = useState(false);
//   const [score, setScore] = useState(0);
//   const [showCorrect, setShowCorrect] = useState(false);
//   const [showWrong, setShowWrong] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const questions = [
//     {
//       questionText: "How many cows are there?",
//       imageSrc: "/src/assets/cow.png",
//       answerChoices: ["Three", "Seven", "Nine", "Four"],
//       correctAnswer: "Seven"
//     },
//     {
//       questionText: "Which shape is this?",
//       imageSrc: "/src/assets/flashcards/triangle.png",
//       answerChoices: ["Circle", "Triangle", "Square", "Rectangle"],
//       correctAnswer: "Triangle"
//     },
//     {
//       questionText: "What animal is this?",
//       videoSrc: "/src/assets/flashcards/dog_academic.mp4",
//       answerChoices: ["Dog", "Cat", "Fish", "Bird"],
//       correctAnswer: "Dog"
//     },
//     {
//       questionText: "What are they doing?", 
//       videoSrc: "/src/assets/flashcards/brushyourteeth.mp4",
//       answerChoices: ["Sleeping", "Eating", "Reading a Book", "Brushing Teeth"],
//       correctAnswer: "Brushing Teeth"
//     },
//     {
//       questionText: "What is the color of the cap?",
//       videoSrc: "/src/assets/flashcards/red_cap.mp4",
//       answerChoices: ["Red", "Blue", "Green", "Yellow"],
//       correctAnswer: "Red"
//     }
//   ];

//   const total = questions.length;

//   // Handle answer selection
//   const handleAnswerClick = (choice) => {
//     setSelectedAnswer(choice);
//     setIsAnswered(true);

//     if (choice === questions[currentQuestionIndex].correctAnswer) {
//       setScore(prev => prev + 1);
//       setShowCorrect(true);
//       setTimeout(() => setShowCorrect(false), 1500);
//     } else {
//       setShowWrong(true);
//       setTimeout(() => setShowWrong(false), 1500);
//     }
//   };

//   const handleNextClick = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedAnswer(null);
//       setIsAnswered(false);
//     } else {
//       setShowChatBar(false); // Hide chat bar after completion
//       setShowModal(true);    // Show the score modal
//     }
//   };

//   const studentProfileRoute = (e) => {
//     e.preventDefault();
//     navigate("/studentprofile");
//   };

//   return (
//     <div className="bg-gray-200 font-sans min-h-screen relative">
//       {/* Use NavBar component */}
//       <NavBar onProfileClick={studentProfileRoute} />

//       {/* Use ChatBar component */}
//       <ChatBar />

//       {/* Title */}
//       <h2 className="text-blue-600 text-center pt-4 text-4xl -mt-2 font-bold mb-2">ACADEMIC</h2>

//       {/* Flashcard Container */}
//       <div className="bg-white pb-10 rounded-2xl mx-auto shadow-lg p-8 w-full max-w-4xl text-center h-140 relative">
//         {/* Question */}
//         <h3 className="text-2xl font-semibold mb-6">{questions[currentQuestionIndex].questionText}</h3>

//         {/* Show Video for Question 3 and Question 4 */}
//         {currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 4 ? (
//           <div className="flex justify-center mb-4">
//             <video
//               className="w-full max-w-lg mb-5"
//               controls
//               autoPlay
//               loop
//               onError={(e) => {
//                 console.error("Video loading error:", e);
//                 console.log("Attempted video source:", questions[currentQuestionIndex].videoSrc);
//               }}
//               key={questions[currentQuestionIndex].videoSrc}
//             >
//               <source src={questions[currentQuestionIndex].videoSrc} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ) : (
//           <div className="flex justify-center flex-wrap gap-4 mb-6">
//             <img
//               src={questions[currentQuestionIndex].imageSrc}
//               alt={questions[currentQuestionIndex].questionText}
//               className="bg-blue-100 w-140 h-70 mb-5 object-contain"
//             />
//           </div>
//         )}

//         {/* Answer Choices */}
//         <div className="grid grid-cols-2 gap-4">
//           {questions[currentQuestionIndex].answerChoices.map((choice, index) => (
//             <button
//               key={index}
//               className={`${
//                 choice === questions[currentQuestionIndex].correctAnswer && isAnswered
//                   ? "bg-green-500 text-white"
//                   : selectedAnswer === choice && choice !== questions[currentQuestionIndex].correctAnswer
//                   ? "bg-red-500 text-white"
//                   : ""
//               } 
//               bg-blue-100 hover:bg-blue-200 text-lg font-medium py-4 rounded-lg cursor-pointer -mt-2 transition-colors`}
//               onClick={() => handleAnswerClick(choice)}
//               disabled={isAnswered}
//             >
//               {choice}
//             </button>
//           ))}
//         </div>

//         {/* Correct Overlay */}
//         {showCorrect && (
//           <div className="absolute inset-0 backdrop-blur-xs flex flex-col justify-center items-center z-50 rounded-2xl">
//             <div className="text-[8rem] -mt-40">😄</div>
//             <div className="text-yellow-400 text-4xl font-bold mt-2">CORRECT!</div>
//           </div>
//         )}

//         {/* Wrong Overlay */}
//         {showWrong && (
//           <div className="absolute inset-0 backdrop-blur-xs flex flex-col justify-center items-center z-50 rounded-2xl">
//             <div className="text-[8rem] -mt-40">😞</div>
//             <div className="text-red-500 text-4xl font-bold mt-2">WRONG!</div>
//           </div>
//         )}
//       </div>

//       {/* Next Text */}
//       {isAnswered && (
//         <div
//           onClick={handleNextClick}
//           className="absolute bottom-22 right-15 text-3xl text-black-800 font-arial cursor-pointer hover:text-blue-700 transition-colors"
//         >
//           {currentQuestionIndex < questions.length - 1 ? "Next Question..." : "Finish"}
//         </div>
//       )}

//       {/* Completion Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30 cursor-pointer bg-opacity-40 z-50">
//           <Confetti width={window.innerWidth} height={window.innerHeight} />
//           <div className="bg-white rounded-lg p-12 w-[500px] shadow-lg text-center relative">
//             <p className="text-5xl mb-4">🎉</p>
//             <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
//             <p className="text-xl mb-6">You completed {score}/{total} questions correctly!</p>
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg transition-colors"
//               onClick={() => {
//                 setShowModal(false);
//                 navigate("/studentprofile");
//               }}
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EasyAcademicFlashcard;