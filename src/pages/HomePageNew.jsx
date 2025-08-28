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
    { emotion: "Happy", description: "I finished my homework! 📚", image: "src/assets/happy.png", level: 5, time: "2 hours ago" },
    { emotion: "Calm", description: "Reading my favorite book 📖", image: "src/assets/calm.png", level: 4, time: "5 hours ago" },
    { emotion: "Excited", description: "Going to the park today! 🌳", image: "src/assets/excited.png", level: 5, time: "Yesterday" },
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
    const colors = ['bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-400', 'bg-red-600'];
    return colors[level - 1] || 'bg-gray-500';
  };

  const getLevelEmoji = (level) => {
    const emojis = ['😊', '🙂', '😐', '😟', '😢'];
    return emojis[level - 1] || '😐';
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
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AutiSync
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/home" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                <span className="mr-2">🏠</span>Home
              </a>
              <a href="/flashcardspage" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                <span className="mr-2">🎯</span>Activities
              </a>
              <a href="/studentpage" className="text-blue-600 font-semibold transition-colors duration-200 flex items-center">
                <span className="mr-2">😊</span>Learning Hub
              </a>
            </nav>
            
            <div 
              onClick={studentProfileRoute}
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
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Video Tutorial Section */}
        <section className="mb-12">
          <div className="card-autism-friendly bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                <span className="text-4xl mr-3 animate-bounce-gentle">🎬</span>
                Video Tutorial
              </h2>
              <p className="text-lg text-gray-600">
                Learn about emotions and feelings! Watch and learn together! 📚
              </p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-20 object-cover"
                controls
                loop
                muted
                poster="/src/assets/banner.jpg"
              >
                <source src="/src/assets/videotutorial.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center">
                  <span className="mr-2">💡</span>
                  Learning about feelings!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Emotion Selection Section */}
        <section className="mb-12" id="emotion-selection">
          <div className="card-autism-friendly bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3 animate-wiggle">🌈</span>
                How are you feeling today?
              </h2>
              <p className="text-lg text-gray-600">
                Choose the emotion that matches how you feel right now! 💭
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
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
        </section>

        {/* Expression Wall */}
        <section>
          <div className="card-autism-friendly bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-4xl mr-3 animate-float">📖</span>
              Your Emotion Journal
            </h2>
            
            <div className="grid gap-6">
              {expressions.map((expr, index) => (
                <div 
                  key={index} 
                  className="card-autism-friendly bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
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
                        <span className="text-sm text-gray-500">{expr.time}</span>
                      </div>
                      <p className="text-gray-700">{expr.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="card-autism-friendly bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3 animate-float">📚</span>
                Categories
              </h2>
              <p className="text-lg text-gray-600">
                Choose what you want to learn today! 🎯
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Academic Category */}
              <div className="card-autism-friendly bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl text-center cursor-pointer border-3 border-white/50 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-4xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">ACADEMIC</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Learn basic school stuff in fun ways!
                </p>
              </div>

              {/* Social/Daily Life Skills Category */}
              <div className="card-autism-friendly bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-3xl text-center cursor-pointer border-3 border-white/50 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-4xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">SOCIAL/DAILY LIFE SKILL</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Practice talking, sharing, and feelings.
                </p>
              </div>

              {/* Objects Category */}
              <div className="card-autism-friendly bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl text-center cursor-pointer border-3 border-white/50 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-4xl">✏️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">OBJECTS</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Play with shapes and things we use every day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Difficulty Levels Section */}
        <section className="mb-12">
          <div className="card-autism-friendly bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3 animate-bounce-gentle">⭐</span>
                Difficulty Levels
              </h2>
              <p className="text-lg text-gray-600">
                Pick the level that's just right for you! 🎯
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Easy Level */}
              <div className="card-autism-friendly bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl text-center cursor-pointer border-3 border-white/50 hover:border-green-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-4xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">EASY</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Start here. Simple and fun!
                </p>
              </div>

              {/* Medium Level */}
              <div className="card-autism-friendly bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-3xl text-center cursor-pointer border-3 border-white/50 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-4xl">⭐</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">MEDIUM</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  A little harder. Let's level up!
                </p>
              </div>

              {/* Hard Level */}
              <div className="card-autism-friendly bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl text-center cursor-pointer border-3 border-white/50 hover:border-red-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-4xl">!</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">HARD</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ready for a challenge? Let's go big!
                </p>
              </div>
            </div>

            {/* Start Learning Button */}
            <div className="text-center mt-8">
              <button className="btn-autism-friendly bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto">
                <span className="mr-3 text-2xl">🚀</span>
                Start Learning
              </button>
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
    </div>
  );
};

export default HomePage;
