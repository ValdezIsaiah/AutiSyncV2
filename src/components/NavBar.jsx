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

  return (
    <header className="bg-blue-500 text-white py-3">
      <div className="w-full mx-auto flex justify-between px-8">
        <h2 className="text-white text-2xl font-bold">AutiSync v2.0</h2>
        <nav className="flex text-lg space-x-6 ml-auto mr-6">
          <a href="/studentpage" className="text-white hover:text-gray-300">Tracking</a>
          <a href="/flashcardspage" className="text-white hover:text-gray-300">Activity</a>
          <a onClick={handleExpressionClick} className="text-white hover:text-gray-300">Expression Wall</a>
        </nav>
        <div onClick={handleProfileClick} className="flex items-center cursor-pointer">
          <img 
            src="/src/assets/kidprofile1.jpg" 
            alt="Profile Icon" 
            className="h-8 w-8 rounded-full" 
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;