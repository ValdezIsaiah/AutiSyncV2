import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/loginpage"); // Redirect to the LoginPage route
  };

  return (
    <div className="bg-blue-50">
      {/* Header */}
      <header className="bg-white text-sky-700 p-3">
        <div className="container mx-auto max-w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">AutiSync</h1>
          <button  onClick={handleLogin} className="bg-sky-700 hover:bg-sky-600 text-white px-3 py-1 rounded ml-auto">Log In</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="">
        <div className="container mx-auto max-w-full px-4 text-center">
          {/* Welcome Section */}
          <section className="bg-sky-100 p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-4xl font-semibold text-blue-800 mb-4">Welcome to AutiSync</h2>
            <p className="text-x2 text-blue-700">
              Understanding Autism, Empowering Unique Learners. Discover how AutiSync supports your <br></br> child's journey.
            </p>
          </section>


          <h2 className=" text-blue-800 font-semibold text-[30px] my-[25px]">What is Autism?</h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mx-3">

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 4" />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-blue-800 mb-2">A Neurodevelopmental Difference</h3>
              <p className="text-blue-700 text-left">
                Autism Spectrum Disorder (ASD) is a difference in how the brain develops. It impacts how individuals perceive the world, communicate, and interact socially.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-500 mx-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 6v6l4 4" />
                  <path d="M3 4l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">A Spectrum of Experiences</h3>
              <p className="text-blue-700 text-left">
                Autism is a spectrum, meaning it affects each person differently. Strengths and challenges vary widely, making each individual's experience unique.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-500 mx-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 6v6l4 4" />
                  <path d="M16 9l5 5-5 5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Unique Ways of Being</h3>
              <p className="text-blue-700 text-left">
                Common characteristics can include distinct social communication styles, focused interests, repetitive patterns of behavior, and different sensory experiences.
              </p>
            </div>
          </section>


          <h2 className=" text-blue-800 font-semibold text-[30px] my-[25px]">How AutiSync Supports Learning</h2>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-2">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Personalized Learning Paths</h3>
              <p className="text-blue-700">
                AutiSync adapts to your child's unique pace and learning style, offering tailored activities that build on their strengths and interests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Visual & Interactive Content</h3>
              <p className="text-blue-700">
                Engaging visual aids, clear instructions, and interactive games make learning intuitive, fun, and more accessible.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Structured & Predictable</h3>
              <p className="text-blue-700">
                We provide consistent routines and a predictable learning environment to help reduce anxiety and promote focus.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Key Skill Development</h3>
              <p className="text-blue-700">
              Focuses on crucial developmental areas such as communication, social skills, emotional regulation, and daily living activities.
              </p>
            </div>
           
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Progress Monitoring</h3>
              <p className="text-blue-700">
              Parents and educators can easily track progress, understand achievements, and collaborate on the learning journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Sensory-Friendly Design</h3>
              <p className="text-blue-700">
                Our platform is designed with sensory sensitivities in mind, offering customizable settings for a comfortable and calming experience.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-blue-800 mt-10 text-center">
            
            <p className="text-2xl pl-80 font-semibold text-white pt-2 -mb-2 text-left">Ready to empower your child?</p>
            <div className="flex items-center justify-center space-x-2 ">
            <p className="text-sm text-white">Log in to AutiSync to begin their personalized learning adventure.</p>
            <button onClick={handleLogin} className="bg-blue-600 text-white py-1 px-1.5 hover:bg-blue-700 rounded-lg text-lg ml-5 mb-3">Log In to Begin</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
