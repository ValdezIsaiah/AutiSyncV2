// src/LoginPage.jsx
import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const backToHome = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/loginpage"); // Redirect to the LoginPage route
  };

  const homePageRoute = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/home"); // Redirect to the LoginPage route
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md sm:max-w-md ">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-2">
          AutiSync
        </h2>
        <h3 className="text-lg text-center text-gray-700 mb-3">Welcome Back!</h3>
        <p className="text-center text-gray-500 mb-4 text-sm">Please enter your details to log in.</p>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="********"
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg"
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <a
              href="#"
              className="text-xs text-blue-500 hover:text-blue-600"
            >
              Forgot password?
            </a>
          </div>

          <button
            onClick={homePageRoute}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 text-xs">
          Don’t have an account?{" "}
          <a
            href="./SignupPage"
            className="text-blue-500 hover:text-blue-600"
          >
            Sign up here
          </a>
        </p>

        <footer className="mt-8 text-center text-xs text-gray-400">
          <p>© 2025 AutoSync. All rights reserved.</p>
          <a href="./" className="text-blue-500 hover:text-blue-600">
            Back to Home
          </a>
        </footer>
      </div>
    </div>
  );
}

export default LoginPage;

