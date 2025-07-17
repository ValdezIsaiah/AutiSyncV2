import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {

    const navigate = useNavigate();

    const homePageRoute = (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      navigate("/home"); // Redirect to the LoginPage route
    };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white px-8 py-4 my-4 rounded-lg shadow-lg">
        <div className="">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">AutiSync</h2>
        <h3 className="text-center text-gray-600 mb-4">Create Your Account!</h3>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter details below be sure to guide the kids to get started with their learning journey.
        </p>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="first-name" className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="middle-name" className="block text-gray-700">Middle Name</label>
            <input
              type="text"
              id="middle-name"
              name="middle-name"
              placeholder="Enter your middle name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last-name" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Enter your last name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Choose a unique username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="birthday" className="block text-gray-700">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a secure password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={homePageRoute} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
