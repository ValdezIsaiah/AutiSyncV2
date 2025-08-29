import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    parentEmail: '',
    address: '',
    gender: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userType, setUserType] = useState("student"); // "student" or "admin"

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loginPageRoute = (e) => {
    e.preventDefault();
    navigate("/loginpage");
  };

  const backToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Validate passwords match (only for admin accounts)
    if (userType === 'admin' && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            age: userType === 'student' ? parseInt(formData.age) : null,
            parent_email: userType === 'student' ? formData.parentEmail : null,
            address: formData.address,
            gender: formData.gender, // Gender for both students and admins
            phone_number: userType === 'admin' ? formData.phoneNumber : null,
            user_type: userType // Store the user type
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Success
      setSuccess("Account created successfully! Please check your email to verify your account.");
      console.log('Signup successful:', data);
      
      // Optionally redirect after a delay
      setTimeout(() => {
        navigate("/loginpage");
      }, 3000);

    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-32 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-xl animate-bounce-gentle"></div>
      </div>

      <div className="relative z-10 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20 animate-fade-in-scale">
        {/* Header with logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 -mt-2">
            AutiSync
          </h2>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center">
              <span className="text-2xl mr-2 animate-bounce-gentle">🎉</span>
              Create Your Account!
            </h3>
            <p className="text-gray-600 text-sm">
              Join the amazing learning adventure! Let's get started on your journey! ✨
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl text-sm">
            {success}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSignup}>
          {/* User type selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3 text-center">
              <span className="text-lg mr-2">🎯</span>
              What type of account would you like to create?
            </label>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className={`px-6 py-3 rounded-xl font-bold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base shadow-sm flex items-center space-x-2 ${
                  userType === 'student' 
                    ? 'bg-blue-100 border-blue-500 text-blue-900 transform scale-105' 
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setUserType('student')}
              >
                <span className="text-xl">👦</span>
                <span>Student</span>
              </button>
              <button
                type="button"
                className={`px-6 py-3 rounded-xl font-bold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base shadow-sm flex items-center space-x-2 ${
                  userType === 'admin' 
                    ? 'bg-purple-100 border-purple-500 text-purple-900 transform scale-105' 
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setUserType('admin')}
              >
                <span className="text-xl">🧑‍🏫</span>
                <span>Teacher/Admin</span>
              </button>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="fullName" className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <span className="text-lg mr-2">👤</span>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <span className="text-lg mr-2">📧</span>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 transition-all duration-300"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Address Field - For both students and admins */}
          <div>
            <label htmlFor="address" className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <span className="text-lg mr-2">🏠</span>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Age Field - Only show for students */}
          {userType === 'student' && (
            <div>
              <label htmlFor="age" className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <span className="text-lg mr-2">🎂</span>
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 transition-all duration-300"
                placeholder="How old are you?"
                min="5"
                max="25"
                required={userType === 'student'}
              />
            </div>
          )}

          {/* Parent Email Field - Only show for students */}
          {userType === 'student' && (
            <div>
              <label htmlFor="parentEmail" className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <span className="text-lg mr-2">👨‍👩‍👧‍👦</span>
                Parent/Guardian Email
              </label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 transition-all duration-300"
                placeholder="parent@example.com"
                required={userType === 'student'}
              />
            </div>
          )}

          {/* Gender Field - For both students and admins */}
          <div>
            <label htmlFor="gender" className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <span className="text-lg mr-2">⚧️</span>
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg transition-all duration-300"
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Phone Number Field - Only show for admins */}
          {userType === 'admin' && (
            <div>
              <label htmlFor="phoneNumber" className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <span className="text-lg mr-2">📞</span>
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 transition-all duration-300"
                placeholder="+63 912 345 6789"
                required={userType === 'admin'}
              />
            </div>
          )}

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="flex items-center text-sm font-bold text-gray-700 mb-2">
              <span className="text-lg mr-2">🔒</span>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg transition-all duration-300"
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <span className="text-lg">{showPassword ? "🙈" : "👀"}</span>
              </button>
            </div>
          </div>

          {/* Confirm Password Field - Only show for admins */}
          {userType === 'admin' && (
            <div>
              <label htmlFor="confirmPassword" className="flex items-center text-sm font-bold text-gray-700 mb-2">
                <span className="text-lg mr-2">🔒</span>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg transition-all duration-300"
                  placeholder="Confirm your password"
                  required={userType === 'admin'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <span className="text-lg">{showConfirmPassword ? "🙈" : "👀"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-autism-friendly w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <span className="mr-2">⏳</span>
                Creating Account...
              </>
            ) : (
              <>
                <span className="mr-2">🎉</span>
                {userType === 'admin' ? 'Create Admin Account!' : 'Start My Learning Adventure!'}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={loginPageRoute}
                className="text-blue-500 hover:text-blue-600 font-semibold underline decoration-2 underline-offset-2 hover:decoration-blue-600 transition-all duration-200"
              >
                Log in here! 🚀
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
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/30 rounded-full animate-bounce-gentle"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400/30 rounded-full animate-float"></div>
      </div>

      {/* Encouraging message */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 animate-float">
        <p className="text-sm font-semibold text-gray-700 flex items-center">
          <span className="text-lg mr-2 animate-pulse-gentle">🌟</span>
          Welcome to your amazing learning journey! 🎈
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
