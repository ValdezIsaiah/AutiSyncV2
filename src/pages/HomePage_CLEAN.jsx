import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Emotions = [
  { name: "Happy", image: "src/assets/happy.png", color: "from-yellow-400 to-orange-500", bgColor: "bg-yellow-50" },
  { name: "Sad", image: "src/assets/sad.png", color: "from-blue-400 to-blue-600", bgColor: "bg-blue-50" },
  { name: "Angry", image: "src/assets/angry.png", color: "from-red-400 to-red-600", bgColor: "bg-red-50" },
  { name: "Excited", image: "src/assets/excited.png", color: "from-purple-400 to-pink-500", bgColor: "bg-purple-50" },
  { name: "Calm", image: "src/assets/calm.png", color: "from-green-400 to-teal-500", bgColor: "bg-green-50" },
];

const HomePage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [expressions, setExpressions] = useState([
    { emotion: "Happy", description: "Feeling Happy at level 2", image: "src/assets/happy.png", level: 5, time: "2 hours ago" },
    { emotion: "Calm", description: "Feeling calm at level 5", image: "src/assets/calm.png", level: 4, time: "5 hours ago" },
    { emotion: "Excited", description: "Feeling excited at level 4", image: "src/assets/excited.png", level: 5, time: "Yesterday" },
    { emotion: "Calm", description: "Feeling calm at level 2", image: "src/assets/calm.png", level: 5, time: "1 hour ago" },
    { emotion: "Sad", description: "Feeling sad at level 3", image: "src/assets/sad.png", level: 5, time: "2 hours ago" },
    { emotion: "Excited", description: "Feeling excited at level 1", image: "src/assets/excited.png", level: 5, time: "Yesterday" },
  ]);

  const navigate = useNavigate();

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emotionData = Emotions.find((emotion) => emotion.name === selectedEmotion);
    const newExpression = {
      emotion: selectedEmotion,
      description: `Feeling ${selectedEmotion} at level ${selectedLevel}`,
      image: emotionData?.image,
      level: selectedLevel,
      time: "Just now",
    };

    setExpressions((prev) => [newExpression, ...prev]);
    setShowModal(false);
    setSelectedLevel(3);
  };

  const studentPageRoute = () => navigate("/studentpage");
  const studentProfileRoute = () => navigate("/studentprofile");

  const getLevelColor = (level) => {
    const colors = ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-700', 'bg-orange-900'];
    return colors[level - 1] || 'bg-gray-500';
  };

  const getLevelEmoji = (level) => {
    const emojis = ['😊', '🙂', '😐', '😟', '😢'];
    return emojis[level - 1] || '😐';
  };

  const goToProfile = () => {
    navigate('/studentprofile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-32 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-xl animate-bounce-gentle"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-3 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AutiSync
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/studentpage" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                Home
              </a>
              <a href="/flashcardspage" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                Activity
              </a>
              <a href="/home" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                Expression
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div 
                onClick={goToProfile}
                className="cursor-pointer group flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-2 hover:shadow-lg transition-all duration-300"
              >
                <img
                  src="/src/assets/kidprofile1.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <span className="hidden sm:block text-sm font-semibold text-gray-700">Chris</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto py-2">
        {/* Video Tutorial Section */}
        <section className="mb-8">
          <div className="bg-white/80 p-6 shadow-2xl border border-white/20 relative overflow-hidden">
            {/* Floating emoji elements - MAXIMUM SPREAD */}
            <div className="absolute top-10 left-4 text-2xl animate-bounce-gentle">⭐</div>
            <div className="absolute top-18 right-4 text-xl animate-float">🚀</div>
            <div className="absolute top-30 left-60 text-2xl animate-float-delayed">✨</div>
            <div className="absolute top-44 right-60 text-xl animate-bounce-gentle">🌟</div>
            <div className="absolute top-58 left-2 text-2xl animate-float">🎨</div>
            <div className="absolute top-72 right-2 text-xl animate-bounce-gentle">🌈</div>
            <div className="absolute top-86 left-56 text-2xl animate-float-delayed">💫</div>
            <div className="absolute top-100 right-56 text-xl animate-pulse-gentle">🦋</div>
            <div className="absolute top-114 left-8 text-2xl animate-float">🎪</div>
            <div className="absolute top-128 right-8 text-xl animate-bounce-gentle">🎭</div>
            
            {/* Gentle gradient circles - maximum spread */}
            <div className="absolute top-1/6 left-2 w-4 h-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-pulse-gentle opacity-40"></div>
            <div className="absolute top-1/5 right-2 w-5 h-5 bg-gradient-to-r from-teal-300 to-green-300 rounded-full animate-float opacity-35"></div>
            <div className="absolute top-2/5 left-64 w-4 h-4 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full animate-bounce-gentle opacity-45"></div>
            <div className="absolute top-3/5 right-64 w-5 h-5 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full animate-float-delayed opacity-40"></div>
            <div className="absolute top-4/5 left-2 w-4 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse-gentle opacity-50"></div>
            <div className="absolute top-5/6 right-2 w-5 h-5 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full animate-float opacity-45"></div>
            <div className="absolute top-1/2 left-1 w-3 h-3 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full animate-bounce-gentle opacity-40"></div>
            <div className="absolute top-1/2 right-1 w-3 h-3 bg-gradient-to-r from-violet-300 to-purple-300 rounded-full animate-float-delayed opacity-35"></div>
            <div className="absolute top-1/3 left-72 w-4 h-4 bg-gradient-to-r from-lime-300 to-green-300 rounded-full animate-pulse-gentle opacity-42"></div>
            <div className="absolute top-2/3 right-72 w-4 h-4 bg-gradient-to-r from-orange-300 to-red-300 rounded-full animate-float opacity-38"></div>
            
            {/* Additional decorative shapes - WIDE SPREAD */}
            <div className="absolute top-12 left-12 w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-pulse-gentle"></div>
            <div className="absolute top-22 right-12 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-float"></div>
            <div className="absolute top-34 left-68 w-3 h-3 bg-blue-300 rounded-full opacity-75 animate-bounce-gentle"></div>
            <div className="absolute top-46 right-68 w-2 h-2 bg-green-300 rounded-full opacity-65 animate-float-delayed"></div>
            <div className="absolute top-60 left-4 w-3 h-3 bg-purple-300 rounded-full opacity-70 animate-pulse-gentle"></div>
            <div className="absolute top-74 right-4 w-2 h-2 bg-orange-300 rounded-full opacity-80 animate-float"></div>
            <div className="absolute top-88 left-76 w-3 h-3 bg-cyan-300 rounded-full opacity-60 animate-bounce-gentle"></div>
            <div className="absolute top-102 right-76 w-2 h-2 bg-rose-300 rounded-full opacity-75 animate-float-delayed"></div>
            <div className="absolute top-116 left-6 w-3 h-3 bg-lime-300 rounded-full opacity-70 animate-pulse-gentle"></div>
            <div className="absolute top-130 right-6 w-2 h-2 bg-indigo-300 rounded-full opacity-65 animate-float"></div>
            <div className="absolute top-144 left-80 w-3 h-3 bg-teal-300 rounded-full opacity-80 animate-bounce-gentle"></div>
            <div className="absolute top-158 right-80 w-2 h-2 bg-amber-300 rounded-full opacity-60 animate-float-delayed"></div>

            <div className="text-center mb-6 relative z-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                <span className="text-4xl mr-3 animate-bounce-gentle">🎬</span>
                Video Tutorial
              </h2>
              <p className="text-lg text-gray-600">
                Learn about emotions and feelings! Watch and learn together! 📚
              </p>
            </div>
            
            <div className="relative z-10">
              <video
                className="w-150 h-70 mx-auto object-cover"
                controls
                loop
                muted
                autoPlay
                poster="/src/assets/banner.jpg"
              >
                <source src="/src/assets/videotutorial.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* How are you feeling today section */}
            <div className="mt-8">
              <div className="text-center mt-18 mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <span className="text-4xl mr-3 animate-wiggle">🌈</span>
                  How are you feeling today?
                </h2>
                <p className="text-lg text-gray-600">
                  Choose the emotion that matches how you feel right now! 💭
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-15">
                {Emotions.map((emotion, index) => (
                  <div
                    key={index}
                    className={`card-autism-friendly ${emotion.bgColor} p-6 rounded-3xl text-center cursor-pointer border-3 transition-all duration-300 ${
                      selectedEmotion === emotion.name 
                        ? 'border-blue-500 shadow-xl scale-105' 
                        : 'border-white/50 hover:border-blue-300'
                    }`}
                    onClick={() => handleEmotionClick(emotion.name)}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${emotion.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-float`}>
                      <img
                        src={emotion.image}
                        alt={emotion.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    </div>
                    <span className="text-lg font-bold text-gray-800">{emotion.name}</span>
                    <div className="mt-2">
                      <span className="text-2xl animate-bounce-gentle">
                        {emotion.name === 'Happy' && '😊'}
                        {emotion.name === 'Sad' && '😢'}
                        {emotion.name === 'Angry' && '😠'}
                        {emotion.name === 'Excited' && '🤩'}
                        {emotion.name === 'Calm' && '😌'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotion Insights & Tips - Modern Professional Section */}
            <div className="mt-12 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <span className="text-4xl mr-3 animate-float">🧠</span>
                  Emotion Insights & Tips
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Understanding your emotions helps you grow stronger and happier every day!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Emotional Intelligence Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-float">
                      <span className="text-3xl text-white">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Emotional Intelligence</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Learning to recognize and understand your feelings helps you make better choices and connect with others more easily.
                    </p>
                  </div>
                </div>

                {/* Mindfulness Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-3xl shadow-lg border border-green-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-float-delayed">
                      <span className="text-3xl text-white">🧘</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Mindfulness Practice</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Take deep breaths and notice how you feel. Being mindful of your emotions helps you stay calm and focused.
                    </p>
                  </div>
                </div>

                {/* Growth Mindset Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-3xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-bounce-gentle">
                      <span className="text-3xl text-white">🌱</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Growth Mindset</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Every emotion teaches us something new. Embrace all feelings as opportunities to learn and grow stronger.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Emotion Tips */}
              <div className="mt-10 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-3xl shadow-lg border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                  <span className="text-3xl mr-3 animate-wiggle">💡</span>
                  Quick Emotion Tips
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-white/70 rounded-2xl shadow-sm">
                    <span className="text-2xl mb-2 block animate-bounce-gentle">😊</span>
                    <h4 className="font-semibold text-gray-800 mb-2">When Happy</h4>
                    <p className="text-sm text-gray-600">Share your joy with others!</p>
                  </div>
                  <div className="text-center p-4 bg-white/70 rounded-2xl shadow-sm">
                    <span className="text-2xl mb-2 block animate-bounce-gentle">😢</span>
                    <h4 className="font-semibold text-gray-800 mb-2">When Sad</h4>
                    <p className="text-sm text-gray-600">It's okay to cry and ask for hugs.</p>
                  </div>
                  <div className="text-center p-4 bg-white/70 rounded-2xl shadow-sm">
                    <span className="text-2xl mb-2 block animate-bounce-gentle">😠</span>
                    <h4 className="font-semibold text-gray-800 mb-2">When Angry</h4>
                    <p className="text-sm text-gray-600">Take deep breaths and count to 10.</p>
                  </div>
                  <div className="text-center p-4 bg-white/70 rounded-2xl shadow-sm">
                    <span className="text-2xl mb-2 block animate-bounce-gentle">😌</span>
                    <h4 className="font-semibold text-gray-800 mb-2">When Calm</h4>
                    <p className="text-sm text-gray-600">Enjoy this peaceful moment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Emotion Journal section */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-4xl mr-3 animate-float">📖</span>
                Your Emotion Journal
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {expressions.map((expr, index) => (
                  <div 
                    key={index} 
                    className="card-autism-friendly bg-gradient-to-r from-blue-100 to-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 w-85"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {/* Emotions shared container */}
                    <div className="flex items-center space-x-4">                
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={expr.image}
                          alt={expr.emotion}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-xl font-bold text-gray-800">{expr.emotion}</span>
                          <div className={`px-3 py-1 ${getLevelColor(expr.level)} rounded-full text-white text-sm font-semibold flex items-center space-x-1`}>
                            <span>{getLevelEmoji(expr.level)}</span>
                            <span>Level {expr.level}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700">{expr.description}</p>
                        <span className="text-sm text-gray-500">{expr.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/20 animate-fade-in-scale">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={Emotions.find((emotion) => emotion.name === selectedEmotion)?.image}
                  alt={selectedEmotion}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                You're feeling <span className="text-blue-600">{selectedEmotion}</span>! 
              </h2>
              <p className="text-gray-600 mb-6">How strong is this feeling?</p>

              {/* Level Slider */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Very Light</span>
                  <span>Very Strong</span>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10B981 0%, #F59E0B 25%, #F97316 50%, #EF4444 75%, #DC2626 100%)`
                    }}
                  />
                  <div className="flex justify-between text-2xl mt-2">
                    {[1,2,3,4,5].map(level => (
                      <span key={level} className={selectedLevel === level ? 'animate-bounce-gentle' : 'opacity-50'}>
                        {getLevelEmoji(level)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <span className={`inline-flex px-4 py-2 ${getLevelColor(selectedLevel)} text-white rounded-full font-semibold`}>
                    Level {selectedLevel} - {getLevelEmoji(selectedLevel)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-autism-friendly flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Save Feeling! ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4">
          <div className="flex justify-around">
            <button onClick={studentPageRoute} className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <span className="text-2xl mb-1">🏠</span>
              <span className="text-xs font-semibold">Home</span>
            </button>
            <a href="/flashcardspage" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600">
              <span className="text-2xl mb-1">🎯</span>
              <span className="text-xs font-semibold">Activity</span>
            </a>
            <a href="#emotion-selection" className="flex flex-col items-center p-2 text-blue-600">
              <span className="text-2xl mb-1">😊</span>
              <span className="text-xs font-semibold">Expression</span>
            </a>
          </div>
        </div>
      </div>

      {/* Custom Styles for Autism-Friendly Animations */}
      <style jsx>{`
        /* Gentle floating animations */
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            filter: brightness(1);
          }
          50% { 
            transform: translateY(-12px) rotate(2deg); 
            filter: brightness(1.1);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            filter: brightness(1);
          }
          50% { 
            transform: translateY(-8px) rotate(-1deg); 
            filter: brightness(1.05);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        /* Gentle bouncing */
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2.5s ease-in-out infinite;
        }
        
        /* Gentle pulsing effects */
        @keyframes pulse-gentle {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.03); 
            opacity: 0.9; 
          }
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        /* Wiggle animation */
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        /* Fade in scale animation */
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Accessibility: Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
