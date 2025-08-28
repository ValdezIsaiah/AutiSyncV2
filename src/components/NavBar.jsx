import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ onProfileClick }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate('/studentprofile');
    }
  };



  const handleExpressionClick = (e) => {
    e.preventDefault();
    navigate('/home#emotion-selection');
  };

    const studentProfileRoute = () => navigate("/studentprofile");

  return (
    <header className="bg-blue-500 text-white py-2">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h2 className="text-white text-2xl font-bold">AutiSync v2.0</h2>
        <nav className="flex items-center text-lg space-x-6">
          <a href="/home" className="text-white hover:text-blue-900 font-semibold transition-colors duration-200 flex items-center">
                Home
              </a>
          <a href="/flashcardspage" className="text-white hover:text-blue-900 font-semibold transition-colors duration-200 flex items-center">
                Activities
              </a>
          <a href="/studentpage" className="text-white  hover:text-blue-900 font-semibold transition-colors duration-200 flex items-center">
                Learning Hub
              </a>
          <div 
              onClick={studentProfileRoute}
              className="cursor-pointer group flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-1 w-23 hover:shadow-lg transition-all duration-300"
            >
              <img
                src="/src/assets/kidprofile1.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-xl object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="hidden sm:block text-sm font-semibold text-gray-700">Chris</span>
            </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;