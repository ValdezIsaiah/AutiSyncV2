// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import StudentPage from './pages/StudentPage';
import ChooseCategory from './pages/ChooseCategory';
import ChooseDifficulty from './pages/ChooseDifficulty';
import StudentProfile from './pages/StudentProfile';

//Admin pages
import ActivitiesPage from './Admin/Activities';
import AddActivity from './Admin/AddActivity';
import ExpressionWall from './Admin/ExpressionWall';
import Tracking from './Admin/Tracking';
 

function App() {
  return (
    <Routes>
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/signuppage" element={<SignupPage />} />
      <Route path="/studentpage" element={<StudentPage />} />
      <Route path="/choosecategory" element={<ChooseCategory />} />
      <Route path="/choosedifficulty" element={<ChooseDifficulty />} />
      <Route path="/studentprofile" element={<StudentProfile />} />
      

      {/* Admin Pages */}
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/addactivity" element={<AddActivity />} />
      <Route path="/expressionwall" element={<ExpressionWall />} />
      <Route path="/tracking" element={<Tracking />} />
      
    </Routes>
  );
}

export default App;
