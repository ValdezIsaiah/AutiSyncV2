import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/loginpage");
  };

  const adminpage = (e) => {
    e.preventDefault();
    navigate("/tracking");
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
      <header className="relative bg-white/80 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            <div 
              onClick={adminpage} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">
                AutiSync v2.0
              </h1>
            </div>
            
            <button  
              onClick={handleLogin} 
              className=" cursor-pointer btn-autism-friendly bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-900 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container text-center">
          {/* Welcome Section */}
          <section className="py-5">
            <div className="max-w-4xl mx-auto">
              {/* Hero content */}
              <div className="mb-12 animate-fade-in-scale">
                <h2 className="text-5xl sm:text-6xl font-bold mb-6">
                  <span className="block text-gray-800">Welcome to</span>
                  <span className="text-blue-900">
                    AutiSync v2.0
                  </span>
                </h2>
                
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-slide-up">
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                    <span className="font-semibold text-blue-600">Understanding Autism</span>, 
                    <span className="font-semibold text-purple-600"> Empowering Unique Learners</span>
                  </p>
                  <p className="text-lg text-gray-600 mt-1">
                    Discover how AutiSync supports your child's amazing learning journey! ✨
                  </p>
                </div>
              </div>

        
            </div>
          </section>

          {/* What is Autism Section */}
          <section className="pb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-12 flex items-center justify-center">
              
              What is Autism?
              <span className="text-5xl mr-4 animate-bounce-gentle">🤔</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: '💡',
                  title: 'A Different Brain',
                  description: 'Autism is how some people\'s brains work. It\'s not bad—it\'s just different and special!',
                  gradient: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: '🌈',
                  title: 'Everyone is Unique',
                  description: 'Autism looks different for each person. Some need help with talking, others with sounds or changes.',
                  gradient: 'from-pink-400 to-purple-500'
                },
                {
                  icon: '🌟',
                  title: 'Special Strengths',
                  description: 'People with autism can focus really well, love routines, and are very loyal friends!',
                  gradient: 'from-blue-400 to-cyan-500'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="card-autism-friendly bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center border border-white/20 relative overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${item.gradient} opacity-10 rounded-full blur-2xl`}></div>
                  
                  <div className={`inline-flex w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl items-center justify-center text-4xl mb-6 shadow-lg transform hover:scale-110 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Decorative dots */}
                  <div className="flex justify-center space-x-2 mt-6">
                    {[1,2,3].map(dot => (
                      <div key={dot} className={`w-2 h-2 bg-gradient-to-r ${item.gradient} rounded-full opacity-60`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How AutiSync Supports Learning */}
          <section className="pb-13">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-12 flex items-center justify-center">
              <span className="text-5xl mr-4 animate-float">🚀</span>
              How AutiSync Supports Learning
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: '🎯',
                  title: 'Your Way to Learn',
                  description: 'AutiSync fits how you learn best. Fast or slow—it\'s up to you!',
                  color: 'bg-blue-500'
                },
                {
                  icon: '👀',
                  title: 'Fun & Visual',
                  description: 'We use games, pictures, and easy steps to help you learn.',
                  color: 'bg-purple-500'
                },
                {
                  icon: '🧠',
                  title: 'Routines That Help',
                  description: 'Same steps every time so you feel safe and ready.',
                  color: 'bg-green-500'
                },
                {
                  icon: '🗣️',
                  title: 'Important Life Skills',
                  description: 'We help you practice talking, feelings, and everyday things.',
                  color: 'bg-pink-500'
                },
                {
                  icon: '📈',
                  title: 'We Track Your Wins',
                  description: 'Your grown-ups can see what you\'re learning and how awesome you\'re doing!',
                  color: 'bg-indigo-500'
                },
                {
                  icon: '🔇',
                  title: 'Calm & Comfy',
                  description: 'AutiSync is gentle on your eyes and ears. You can change the look and sound to feel good.',
                  color: 'bg-teal-500'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="card-autism-friendly bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl text-center border border-white/20 relative overflow-hidden"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className={`inline-flex w-16 h-16 ${item.color} rounded-xl items-center justify-center text-3xl mb-4 shadow-lg text-white transform hover:scale-110 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="pb-16">
            <div className="w-380 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl animate-float">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3 animate-wiggle">🚀</span>
                Ready to Start Learning?
              </h3>
              <p className="text-xl opacity-90 mb-6">
                Join thousands of students on their amazing learning adventure!
              </p>
              <button 
                onClick={handleLogin}
                className="btn-autism-friendly bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Your Journey! ✨
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-white/20 py-6 -mt-9">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-gray-600 font-semibold">AutiSync - Empowering Every Learner</span>
          </div>
          <p className="text-sm text-gray-500">
            Making learning accessible, engaging, and fun for everyone! 🌈
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
