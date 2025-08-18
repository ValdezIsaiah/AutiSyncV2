import React from "react";
import { useNavigate } from 'react-router-dom';

const StudentPage = () => {

    const navigate = useNavigate();

    const flashcardspage = (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      navigate("/flashcardspage"); // Redirect to the LoginPage route
    };

    const goToProfile = () => {
      navigate('/studentprofile');
    };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-6 ml-auto mr-6">
            <a href="/studentpage" className="text-white hover:text-gray-300">Home</a>
            <a href="/flashcardspage" className="text-white hover:text-gray-300">Activity</a>
            <a href="/home" className="text-white hover:text-gray-300">Expression</a>
          </nav>
          <div className="flex items-center cursor-pointer">
            <img onClick={goToProfile}
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      <div>
        <img
            src="/src/assets/banner.jpg" // Replace with the banner image URL
       className="bg-gray-600 h-70 w-1151 mt-0 mx- flex justify-center items-center text-lg "/>

      </div>

      {/* Main Content */}
      {/* <main className="flex "> */}
      <div className="container mx-auto p-6 -ml-0 flex flex-col gap-10">
        {/* Left Column: Streak */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between w-95">
        <div flex flex-rows-2>
          <h2 className="text-xl font-bold text-sky-700">Welcome, </h2>
          <h1 className="text-[32px] font-semibold mt-1">Chris!</h1>
          </div>
          <p className="mt-2 text-gray-600">
            These are all your rewards and achievements! 
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between w-95 -mt-6">
           <div className="flex flex-rows-2">
            <span className="font-bold leading-tight  text-[46px] w-50">4th day Streak!</span>
            <img
              src="/src/assets/firesticker.png" // Replace with the actual image path
              alt="Streak Icon"
              className="h-28 w-30 rounded-full ml-0  "
            />
            </div> 
            <p className="text-sm mt-5 text-gray-600">You’re doing Great, Keep Going!</p>
        </div>

        </div>

        {/* Right Column: Badges */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-265 ml-111 mt-[-403px] ">
          <div className="flex flex-rows-2 gap-135 ml-3 -mb-2">
          <div>
            <h2 className="text-2xl font-bold text-sky-700">Badges</h2>
             <p className="mt-1 text-gray-600">Perform Activities to Collect Badges!</p>
          </div>
          <div>

          <button onClick={flashcardspage} className="mt-2 w-50 bg-sky-600 text-white cursor-pointer hover:bg-sky-700 py-2 rounded-full">Collect Badges!</button>
          </div>
          </div>
        
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-yellow-200 rounded-full p-4 mx-auto mb-2">
                <span className="text-xl text-yellow-800">⭐</span>
              </div>
              <h3 className="font-bold">First Steps</h3>
              <p className="text-sm text-gray-500">Completed your first activity</p>
              <p className="text-green-500 font-semibold">EARNED</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-blue-200 rounded-full p-4 mx-auto mb-2">
                <span className="text-xl text-blue-800">🎓</span>
              </div>
              <h3 className="font-bold">Academic Star</h3>
              <p className="text-sm text-gray-500">Completed 5 academic activities</p>
              <p className="text-green-500 font-semibold">EARNED</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-pink-200 rounded-full p-4 mx-auto mb-2">
                <span className="text-xl text-pink-800">🦋</span>
              </div>
              <h3 className="font-bold">Social Butterfly</h3>
              <p className="text-sm text-gray-500">Mastered social interactions</p>
              <p className="text-green-500 font-semibold">EARNED</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-gray-200 rounded-full p-4 mx-auto mb-2">
                <span className="text-xl text-gray-600">🏆</span>
              </div>
              <h3 className="font-bold">Perfect Week</h3>
              <p className="text-sm text-gray-500">Complete activities 7 days in a row</p>
              <p className="text-gray-400 font-semibold">LOCKED</p>
            </div>
            {/* New badges for autism special education students */}
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-green-200 rounded-full p-4 mx-auto mb-2">
                <span className="text-xl text-green-800">👂</span>
              </div>
              <h3 className="font-bold">Communication Champion</h3>
              <p className="text-sm text-gray-500">Improved communication skills</p>
              <p className="text-green-500 font-semibold">EARNED</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-indigo-200 rounded-full p-4 mx-auto mb-2">
                <span className="text-xl text-indigo-800">🧩</span>
              </div>
              <h3 className="font-bold">Puzzle Master</h3>
              <p className="text-sm text-gray-500">Completed cognitive activities</p>
              <p className="text-green-500 font-semibold">EARNED</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-teal-200 rounded-full p-4 mx-auto mb-2">
                <span className="text-xl text-teal-800">🖌️</span>
              </div>
              <h3 className="font-bold">Creative Artist</h3>
              <p className="text-sm text-gray-500">Engaged in creative arts</p>
              <p className="text-green-500 font-semibold">EARNED</p>
            </div>    
          </div>
        </div>
        {/* </main> */}
    </div>
  );
};

export default StudentPage;
