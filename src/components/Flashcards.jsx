import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { 
  calculateEarnedBadges, 
  saveBadgesToStorage, 
  getBadgeAchievementMessage 
} from '../utils/badgeSystem';

const Flashcards = ({ category, difficulty, activity, onComplete }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [sessionStats, setSessionStats] = useState({
    startTime: new Date(),
    questionTimes: [],
    firstQuestionCorrect: false
  });
  const [showBadgePreview, setShowBadgePreview] = useState(false);
  const [previewBadge, setPreviewBadge] = useState(null);

    const videoRef = useRef(null);
  const audioRef = useRef(null);
  const correctAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);
  const badgeAudioRef = useRef(null);

  const celebrationSound = "/src/assets/sounds/Activitycompletion.mp3"; // Place your sound file here
  const correctSound = "/src/assets/sounds/correct.mp3"; 
  const wrongSound = "/src/assets/sounds/wrong.mp3";
  const badgeCelebrationSound = "/src/assets/sounds/Activitycompletion.mp3";

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

  useEffect(() => {
    if (showWrong && wrongAudioRef.current) {
      wrongAudioRef.current.currentTime = 0;
      wrongAudioRef.current.play();
    }
  }, [showWrong]);

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
    
    // Track timing for this question
    const questionStartTime = new Date();
    
    setSelectedAnswer(choice);
    setIsAnswered(true);

    if (choice === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
      setShowCorrect(true);
      
      // Track if first question was correct and show badge preview
      if (currentQuestionIndex === 0) {
        setSessionStats(prev => ({ ...prev, firstQuestionCorrect: true }));
        // Show preview for first try hero badge
        setPreviewBadge({
          name: 'First Try Hero',
          icon: '🎪',
          message: 'Great start! Keep it up!'
        });
        setShowBadgePreview(true);
        setTimeout(() => setShowBadgePreview(false), 2000);
      }
      
      // Show perfect score preview when getting close to end
      if (score + 1 === questions.length && currentQuestionIndex === questions.length - 1) {
        setPreviewBadge({
          name: 'Perfect Score Champion',
          icon: '🏆',
          message: 'Perfect! Amazing work!'
        });
        setShowBadgePreview(true);
        setTimeout(() => setShowBadgePreview(false), 3000);
      }
      
      setTimeout(() => setShowCorrect(false), 1500);
    } else {
      setShowWrong(true);
      setTimeout(() => setShowWrong(false), 1500);
    }
    
    // Update session stats with timing
    const questionTime = (new Date() - questionStartTime) / 1000;
    setSessionStats(prev => ({
      ...prev,
      questionTimes: [...prev.questionTimes, questionTime]
    }));
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

  // Calculate badges earned based on performance
  const calculateSessionBadges = (finalScore, totalQuestions) => {
    const endTime = new Date();
    const totalTime = (endTime - sessionStats.startTime) / 1000; // in seconds
    const averageTime = sessionStats.questionTimes.length > 0 
      ? sessionStats.questionTimes.reduce((a, b) => a + b, 0) / sessionStats.questionTimes.length 
      : totalTime / totalQuestions;

    const enhancedStats = {
      ...sessionStats,
      category,
      difficulty,
      activity,
      totalTime,
      averageTime,
      percentage: totalQuestions > 0 ? (finalScore / totalQuestions) * 100 : 0
    };

    return calculateEarnedBadges(finalScore, totalQuestions, category, difficulty, activity, enhancedStats);
  };

  const handleFinish = () => {
    setShowModal(false);
    
    // Calculate earned badges with enhanced statistics
    const badges = calculateSessionBadges(score, total);
    setEarnedBadges(badges);
    
    // Save badges to storage (for future persistence)
    if (badges.length > 0) {
      saveBadgesToStorage(badges);
    }
    
    // Show badge modal if badges were earned
    if (badges.length > 0) {
      setTimeout(() => {
        setShowBadgeModal(true);
        if (badgeAudioRef.current) {
          badgeAudioRef.current.currentTime = 0;
          badgeAudioRef.current.play();
        }
      }, 500);
    } else {
      // No badges, proceed to complete
      onComplete(score, total);
    }
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
      <div className="w-270 bg-white/90 backdrop-blur-xl rounded-3xl mx-auto shadow-2xl border border-white/20 p-6 text-center animate-fade-in-scale">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-3 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-200/20 to-yellow-200/20 rounded-full blur-xl animate-float-delayed"></div>
        
        <div className="relative z-10 ">
          {/* Question Counter with modern design */}
          <div className="-mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-6 py-1 border border-blue-200/30 inline-block">
            <div className="text-base font-bold text-gray-700 flex items-center justify-center space-x-2">
              <span className="text-2xl animate-bounce-gentle">📝</span>
              <span>Question {currentQuestionIndex + 1} of {total}</span>
              <span className="text-2xl animate-pulse-gentle">✨</span>
            </div>
          </div>

          {/* Question with improved typography */}
          <h3 className="text-3xl font-bold text-gray-800 mb-2 leading-relaxed px-4">
            {questions[currentQuestionIndex].questionText}
          </h3>

          {/* Image/Video with modern container */}
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {questions[currentQuestionIndex].imageSrc && (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200/30 shadow-lg">
                <img
                  src={questions[currentQuestionIndex].imageSrc}
                  alt={questions[currentQuestionIndex].questionText}
                  className="w-full max-w-lg object-contain rounded-xl"
                />
              </div>
            )}
            {questions[currentQuestionIndex].videoSrc && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200/30 shadow-lg">
                <video
                  key={questions[currentQuestionIndex].videoSrc}
                  ref={videoRef}
                  className="w-full max-w-xl rounded-xl shadow-md"
                  controls
                  autoPlay
                  loop
                >
                  <source src={questions[currentQuestionIndex].videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Answer Choices with autism-friendly design */}
            <div className="grid grid-cols-2 gap-6">
            {questions[currentQuestionIndex].answerChoices.map((choice, index) => (
              <button
                key={index}
                className={`
                  w-[500px]
                  ${
                    choice === questions[currentQuestionIndex].correctAnswer && isAnswered
                      ? "h-10 bg-gradient-to-r from-green-400 to-green-500 text-white border-green-300 scale-105 shadow-2xl animate-success-pulse"
                      : selectedAnswer === choice && choice !== questions[currentQuestionIndex].correctAnswer
                      ? "h-10 bg-gradient-to-r from-red-400 to-red-500 text-white border-red-300 scale-105 shadow-2xl"
                      : "h-10 -mb-2 bg-blue-100 hover:bg-blue-200 text-gray-800 border-blue-200/50 hover:border-purple-300/70"
                  } 
                  text-xl font-bold py-6 px-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 backdrop-blur-sm transform
                  focus:outline-none focus:ring-4 focus:ring-purple-200/50
                  ${!isAnswered ? 'hover:animate-bounce-gentle' : ''}
                  min-h-[4rem] flex items-center justify-center
                `}
                onClick={() => handleAnswerClick(choice)}
                disabled={isAnswered}
              >
                <span className="relative z-10">{choice}</span>
              </button>
            ))}
          </div>
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
            <audio ref={wrongAudioRef} src={wrongSound} />
            <div className="text-[8rem]">😞</div>
            <div className="text-red-500 text-4xl font-bold mt-2">WRONG!</div>
          </div>
        )}
      </div>

      {/* Enhanced Next Button */}
      {isAnswered && (
        <div className="absolute right-7 bottom-90 animate-slide-in-right">
          <button
            onClick={handleNextClick}
            className="w-50 relative right-6 top-38 cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white  py-3 rounded-2xl text-lg font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-3 border-2 border-white/30 backdrop-blur-sm animate-pulse-gentle"
          >
            <span className="text-2xl animate-bounce-gentle">
              {currentQuestionIndex < questions.length - 1 ? "➡️" : "🎯"}
            </span>
            <span>{currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}</span>
            <span className="text-xl animate-float">✨</span>
          </button>
        </div>
      )}

      {/* Badge Preview Notification */}
      {showBadgePreview && previewBadge && (
        <div className="fixed top-20 right-4 z-40 animate-slide-in-right">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white p-4 rounded-2xl shadow-2xl border-2 border-white/30 backdrop-blur-sm flex items-center space-x-3 min-w-[280px]">
            <div className="text-3xl animate-bounce-gentle">{previewBadge.icon}</div>
            <div>
              <div className="font-bold text-lg">{previewBadge.name}</div>
              <div className="text-sm opacity-90">{previewBadge.message}</div>
            </div>
            <div className="text-2xl animate-pulse-gentle">✨</div>
          </div>
        </div>
      )}

      {/* Enhanced Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black/30 via-purple-900/20 to-pink-900/20 backdrop-blur-md z-50 animate-fade-in">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <audio ref={audioRef} src={celebrationSound} />
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 w-[500px] shadow-2xl text-center relative border border-white/30 overflow-hidden animate-modal-appear">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50"></div>
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-full blur-2xl animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-pink-200/30 to-transparent rounded-full blur-xl animate-float-delayed"></div>
            
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className="text-8xl animate-bounce-gentle drop-shadow-2xl">🎉</div>
                <div className="absolute -top-2 -right-4 text-4xl animate-spin-slow">⭐</div>
                <div className="absolute -bottom-2 -left-4 text-3xl animate-float">✨</div>
                <div className="absolute top-2 left-8 text-2xl animate-pulse-gentle">🌟</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-purple-200/50">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 animate-text-shimmer">
                  Amazing Work!
                </h2>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    You scored <span className="text-3xl text-purple-600">{score}</span> out of <span className="text-3xl text-pink-600">{total}</span>!
                  </p>
                  <div className="flex justify-center items-center space-x-2 mt-3">
                    <span className="text-2xl animate-bounce-gentle">🏆</span>
                    <span className="text-lg font-semibold text-gray-700">
                      {score === total ? "Perfect Score!" : score >= total * 0.8 ? "Excellent!" : score >= total * 0.6 ? "Great Job!" : "Keep Learning!"}
                    </span>
                    <span className="text-2xl animate-bounce-gentle">🌟</span>
                  </div>
                </div>
              </div>
              
              <button
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white px-10 py-4 rounded-2xl cursor-pointer text-xl font-bold transition-all duration-300 shadow-2xl transform hover:scale-110 flex items-center mx-auto space-x-3 border-2 border-white/30 backdrop-blur-sm"
                onClick={handleFinish}
              >
                <span className="text-2xl animate-bounce-gentle">🚀</span>
                <span>Continue Adventure</span>
                <span className="text-xl animate-float">✨</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Badge Award Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black/40 via-purple-900/30 to-pink-900/30 backdrop-blur-md z-50 animate-fade-in">
          <Confetti 
            width={window.innerWidth} 
            height={window.innerHeight}
            colors={['#FFD700', '#FFA500', '#FF6347', '#9370DB', '#00CED1', '#FF69B4']}
            numberOfPieces={200}
            recycle={true}
            run={showBadgeModal}
          />
          <audio ref={badgeAudioRef} src={badgeCelebrationSound} />
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl text-center relative border border-white/30 overflow-hidden animate-modal-appear max-h-[90vh] overflow-y-auto">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-purple-50/50 to-blue-50/50"></div>
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-bl from-yellow-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-2xl animate-float-delayed"></div>
            <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-transparent rounded-full blur-xl animate-pulse-gentle"></div>
            
            <div className="relative z-10">
              {/* Dynamic Header Based on Achievement */}
              <div className="mb-8">
                {(() => {
                  const achievement = getBadgeAchievementMessage(earnedBadges);
                  return (
                    <>
                      <div className="relative mb-6">
                        <div className="text-8xl animate-bounce-gentle drop-shadow-2xl">🏅</div>
                        <div className="absolute -top-4 -right-8 text-4xl animate-spin-slow">✨</div>
                        <div className="absolute -bottom-4 -left-8 text-3xl animate-float">{achievement.emotion}</div>
                        <div className="absolute top-8 left-16 text-2xl animate-pulse-gentle">💫</div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-amber-200/50">
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-purple-600 to-blue-600 mb-3 animate-text-shimmer">
                          {achievement.title}
                        </h2>
                        <p className="text-lg text-gray-700 font-semibold mb-4">
                          {achievement.message}
                        </p>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-purple-100">
                          <p className="text-sm text-gray-600">
                            You've unlocked <span className="font-bold text-purple-600">{earnedBadges.length}</span> amazing badge{earnedBadges.length > 1 ? 's' : ''} 
                            and earned <span className="font-bold text-amber-600">{earnedBadges.reduce((sum, badge) => sum + (badge.points || 0), 0)}</span> points!
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Badges Grid with Enhanced Design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-h-60 overflow-y-auto">
                {earnedBadges.map((badge, index) => (
                  <div 
                    key={badge.id}
                    className={`
                      bg-gradient-to-br ${badge.gradient} p-6 rounded-2xl shadow-2xl transform 
                      hover:scale-105 transition-all duration-300 border-2 border-white/30 
                      backdrop-blur-sm animate-badge-appear relative overflow-hidden group
                      ${badge.rarity === 'legendary' ? 'ring-4 ring-yellow-300/60 shadow-yellow-200/30' : 
                        badge.rarity === 'epic' ? 'ring-3 ring-purple-300/60 shadow-purple-200/30' : 
                        badge.rarity === 'rare' ? 'ring-2 ring-blue-300/60 shadow-blue-200/30' : 
                        'shadow-gray-200/20'}
                    `}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Rarity indicator */}
                    <div className={`
                      absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold uppercase
                      ${badge.rarity === 'legendary' ? 'bg-yellow-200/90 text-yellow-900' : 
                        badge.rarity === 'epic' ? 'bg-purple-200/90 text-purple-900' : 
                        badge.rarity === 'rare' ? 'bg-blue-200/90 text-blue-900' : 
                        'bg-gray-200/90 text-gray-800'}
                      transform group-hover:scale-110 transition-transform duration-300
                    `}>
                      {badge.rarity}
                    </div>
                    
                    {/* Points indicator */}
                    <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-bold text-white">+{badge.points}pts</span>
                    </div>
                    
                    {/* Badge shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:animate-shine"></div>
                    
                    <div className="text-center text-white relative z-10">
                      <div className="text-5xl mb-3 animate-bounce-gentle drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        {badge.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 drop-shadow-sm">
                        {badge.name}
                      </h3>
                      <p className="text-sm opacity-90 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3 border-2 border-white/30 backdrop-blur-sm group"
                  onClick={() => {
                    setShowBadgeModal(false);
                    onComplete(score, total);
                  }}
                >
                  <span className="text-2xl animate-bounce-gentle group-hover:animate-spin-slow">🚀</span>
                  <span>Continue Adventure</span>
                  <span className="text-xl animate-float">✨</span>
                </button>
                
                <button
                  className="flex-1 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 hover:from-amber-200 hover:via-yellow-200 hover:to-amber-300 text-amber-800 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 border-2 border-amber-200/50"
                  onClick={() => navigate('/studentpage')}
                >
                  <span className="text-xl animate-bounce-gentle">🏆</span>
                  <span>View Collection</span>
                  <span className="text-lg animate-pulse-gentle">📚</span>
                </button>
              </div>
              
              {/* Badge Statistics Summary */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4 border border-gray-200/50">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="font-bold text-gray-700">{earnedBadges.reduce((sum, badge) => sum + (badge.points || 0), 0)}</div>
                    <div className="text-xs text-gray-500">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="font-bold text-gray-700">{((score / total) * 100).toFixed(0)}%</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="font-bold text-gray-700">{earnedBadges.length}</div>
                    <div className="text-xs text-gray-500">Badge{earnedBadges.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom Styles for Autism-Friendly Animations */}
      <style jsx>{`
        /* Gentle floating animations */
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            filter: brightness(1);
          }
          50% { 
            transform: translateY(-8px) rotate(1deg); 
            filter: brightness(1.05);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            filter: brightness(1);
          }
          50% { 
            transform: translateY(-6px) rotate(-0.5deg); 
            filter: brightness(1.03);
          }
        }
        
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        
        /* Gentle bouncing */
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        /* Gentle pulsing */
        @keyframes pulse-gentle {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.02); 
            opacity: 0.95; 
          }
        }
        
        @keyframes success-pulse {
          0%, 100% { 
            transform: scale(1.05); 
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.4); 
          }
          50% { 
            transform: scale(1.08); 
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); 
          }
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2.5s ease-in-out infinite;
        }
        
        .animate-success-pulse {
          animation: success-pulse 1.5s ease-in-out infinite;
        }
        
        /* Slide and scale animations */
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-modal-appear {
          animation: modal-appear 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
        
        /* Badge preview slide animation */
        @keyframes badge-slide-in {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        .animate-slide-in-right {
          animation: badge-slide-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Text effects */
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-text-shimmer {
          background-size: 200% 200%;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        
        /* Slow gentle spin */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        /* Fade in */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        
        /* Badge specific animations */
        @keyframes badge-appear {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-12deg);
          }
          to {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-badge-appear {
          animation: badge-appear 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        /* Accessibility: Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Enhanced focus styles for accessibility */
        button:focus-visible {
          outline: 3px solid #8b5cf6;
          outline-offset: 3px;
          box-shadow: 0 0 0 6px rgba(139, 92, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Flashcards;