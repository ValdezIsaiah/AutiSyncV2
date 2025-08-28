// src/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const backToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const homePageRoute = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  const signupPageRoute = (e) => {
    e.preventDefault();
    navigate("/signuppage");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-32 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-xl animate-bounce-gentle"></div>
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-fade-in-scale">
        {/* Header with logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AutiSync
          </h2>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <span className="text-2xl mr-2 animate-wiggle">👋</span>
              Welcome Back!
            </h3>
            <p className="text-gray-600 text-sm">
              Ready to continue your amazing learning adventure? Let's get started! ✨
            </p>
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-bold text-gray-700 mb-2"
            >
              <span className="text-lg mr-2">📧</span>
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 transition-all duration-300"
                placeholder="you@example.com"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-400 text-sm">📧</span>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="flex items-center text-sm font-bold text-gray-700 mb-2"
            >
              <span className="text-lg mr-2">🔒</span>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg transition-all duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <span className="text-lg">
                  {showPassword ? "🙈" : "👀"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-600 font-semibold underline decoration-2 underline-offset-2 hover:decoration-blue-600 transition-all duration-200"
            >
              Forgot password? 🤔
            </button>
          </div>

          <button
            onClick={homePageRoute}
            type="submit"
            className="btn-autism-friendly w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <span className="mr-2">🚀</span>
            Start Learning!
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={signupPageRoute}
                className="text-blue-500 hover:text-blue-600 font-semibold underline decoration-2 underline-offset-2 hover:decoration-blue-600 transition-all duration-200"
              >
                Sign up here! 🎉
              </button>
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={backToHome}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <span className="mr-2">🏠</span>
              Back to Home
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/30 rounded-full animate-bounce-gentle"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400/30 rounded-full animate-float"></div>
      </div>

      {/* Encouraging message */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 animate-float">
        <p className="text-sm font-semibold text-gray-700 flex items-center">
          <span className="text-lg mr-2 animate-pulse-gentle">⭐</span>
          You're doing amazing! Keep learning and growing! 🌱
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
