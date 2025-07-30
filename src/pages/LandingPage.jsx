import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/loginpage"); // Redirect to the LoginPage route
  };

  const adminpage = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/tracking"); // Redirect to the LoginPage route
  };

  return (
    <div className="bg-blue-50">
      {/* Header */}
      <header className="bg-white text-sky-700 p-3">
        <div className="container mx-auto max-w-full px-5 flex justify-between items-center">
          <h1 onClick={adminpage} className="text-2xl font-bold">AutiSync</h1>
          <button  onClick={handleLogin} className="bg-sky-700 hover:bg-sky-600 text-white px-3 py-1 rounded ml-auto">Log In</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="">
        <div className="container mx-auto max-w-full px-4 text-center">
          {/* Welcome Section */}
          <section className="bg-sky-100 p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-4xl font-semibold text-sky-700 mb-4">Welcome to AutiSync</h2>
            <p className="text-x2 text-gray-700">
              Understanding Autism, Empowering Unique Learners. Discover how AutiSync supports your <br></br> child's journey.
            </p>
          </section>


          <h2 className="text-sky-700 font-semibold text-[30px] my-[25px]">What is Autism?</h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mx-3">

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                
              </div>
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">💡</span>   A Different Brain</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
                Autism is how some people’s brains work. It’s not bad—it’s just different.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                
              </div>
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">🌈</span>     Everyone is Unique</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
              Autism looks different for each person. Some need help with talking, others with sounds or changes.              
             </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                
              </div>
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">🌟 </span>    Special Strengths</h3>
              <p className="text-[20px] text-gray-700 text-left px-3t">
              People with autism can focus really well, love routines, and are very loyal.              
              </p>
            </div>
          </section>


          <h2 className="text-sky-700 font-semibold text-[30px] my-[25px]">How AutiSync Supports Learning</h2>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-2">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">🚀</span>    Your Way to Learn</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
                AutiSync fits how you learn best. Fast or slow—it's up to you!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">👀</span>    Fun & Visual</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
                We use games, pictures, and easy steps to help you learn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">🧠</span>    Routines That Help</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
                Same steps every time so you feel safe and ready.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">🗣️</span>     Important Life Skills</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
              We help you practice talking, feelings, and everyday things.
              </p>
            </div>
           
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">📈</span>     We Track Your Wins</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
              Your grown-ups can see what you're learning and how awesome you're doing!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-5"><span className="inline-block w-8 h-8 text-[30px]">🔇</span>     Calm & Comfy</h3>
              <p className="text-[20px] text-gray-700 text-left px-3">
                AutiSync is gentle on your eyes and ears. You can change the look and sound to feel good.
              </p>
            </div>
          </section>

          
        </div>
        {/* Call to Action */}
        <section className="bg-blue-800 mt-10 text-center w-full mx-auto ">
            
            <p className="text-2xl pl-121 font-semibold text-white pt-2 -mb-2 text-left">Ready to empower your child?</p>
            <div className="flex items-center justify-center space-x-2 ">
            <p className="text-sm text-white">Log in to AutiSync to begin their personalized learning adventure.</p>
            <button onClick={handleLogin} className="bg-blue-600 text-white py-1 px-1.5 hover:bg-blue-700 rounded-lg text-lg ml-5 mb-3">Log In to Begin</button>
            </div>
          </section>
      </main>
    </div>
  );
};

export default LandingPage;
