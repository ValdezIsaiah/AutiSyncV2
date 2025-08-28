import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon, PlusIcon, PhotoIcon, TrashIcon, CheckCircleIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

const AddActivity = () => {
  const navigate = useNavigate();

  const [activityName, setActivityName] = useState('');
  const [activityType, setActivityType] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [question, setQuestion] = useState('');
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'

  const [choices, setChoices] = useState([
    { title: '', isCorrect: false },
    { title: '', isCorrect: false },
    { title: '', isCorrect: false },
    { title: '', isCorrect: false }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission (e.g., send the data to an API)
    console.log({ 
      activityName, 
      activityType, 
      question, 
      category, 
      difficulty, 
      choices, 
      media, 
      mediaType 
    });
    // Navigate back to activities page after successful submission
    navigate('/activities');
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // for preview
      // Determine media type based on file type
      if (file.type.startsWith('image/')) {
        setMediaType('image');
      } else if (file.type.startsWith('video/')) {
        setMediaType('video');
      }
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...choices];
    updated[index][field] = value;
    setChoices(updated);
  };

  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, { title: '', isCorrect: false }]);
    }
  };

  const removeChoice = (index) => {
    if (choices.length > 2) {
      const updated = choices.filter((_, i) => i !== index);
      setChoices(updated);
    }
  };

  const AdminProfile = (e) => {
    e.preventDefault();
    navigate("/adminprofile");
  };
  

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
                    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-600 text-white p-2 rounded-xl">
                            <AcademicCapIcon className="w-8 h-8" />
                          </div>
                          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AutiSync
                          </h1>
                        </div>
                        
                        <nav className="hidden md:flex space-x-8">
                          <a href="/tracking" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Dashboard
                          </a>
                          <a href="/activities" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition-colors">
                            Activities
                          </a>
                          <a href="/alarmingemotions" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Expression Wall
                          </a>
                        </nav>
                        
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={AdminProfile}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                          >
                            <img
                              src="/src/assets/kidprofile1.jpg"
                              alt="Profile"
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
          </header>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Flashcard</h1>
            <p className="text-lg text-gray-600">Design interactive flashcard activities for autism-friendly learning</p>
          </div>
          <button
            onClick={() => navigate('/activities')}
            className="bg-blue-500 cursor-pointer hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200"
          >
            <span>← Back to Activities</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Activity Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-xl">
                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Flashcard Activity Setup</h2>
                <p className="text-gray-600">Create an engaging flashcard with question and answer choices</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Basic Settings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Basic Settings</h3>
                <div className="space-y-6">
                  {/* Activity Name and Type - Full width */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Name</label>
                      <input
                        type="text"
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        placeholder="Enter a descriptive name for this flashcard..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Type</label>
                      <select
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        required
                      >
                        <option value="">Select activity type</option>
                        <option value="Identification">🔍 Identification (What is this?)</option>
                        <option value="Matching">🔗 Matching (Match items)</option>
                        <option value="Counting">🔢 Counting (How many?)</option>
                        <option value="Colors">🎨 Colors (Color recognition)</option>
                        <option value="Shapes">📐 Shapes (Shape recognition)</option>
                        <option value="Letters">📝 Letters (Letter learning)</option>
                        <option value="Numbers">🔢 Numbers (Number learning)</option>
                        <option value="Daily Life">🏠 Daily Life Skills</option>
                        <option value="Emotions">😊 Emotions (Feeling recognition)</option>
                        <option value="Social">👥 Social Skills</option>
                        <option value="Sequence">📋 Sequencing (Order activities)</option>
                        <option value="Memory">🧠 Memory Games</option>
                      </select>
                    </div>
                  </div>

                  {/* Category and Difficulty */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Academic">📚 Academic Skills</option>
                        <option value="Social/Daily Life">👥 Social & Daily Life</option>
                        <option value="Objects">🧸 Object Recognition</option>
                        <option value="Creative">🎨 Creative Activities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        required
                      >
                        <option value="">Select difficulty level</option>
                        <option value="Easy">🟢 Easy</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="Hard">🔴 Hard</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">❓ Question Content</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Question Text</label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 resize-none"
                      placeholder="What question do you want to ask the students?"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Visual Support (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-white">
                      {preview ? (
                        <div className="space-y-4">
                          {mediaType === 'image' ? (
                            <img src={preview} alt="Preview" className="max-w-xs mx-auto rounded-lg shadow-md" />
                          ) : mediaType === 'video' ? (
                            <video 
                              src={preview} 
                              controls 
                              className="max-w-xs mx-auto rounded-lg shadow-md"
                              style={{ maxHeight: '200px' }}
                            >
                              Your browser does not support video playback.
                            </video>
                          ) : null}
                          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                            {mediaType === 'image' ? '🖼️ Image' : '🎬 Video'} - {media?.name}
                          </div>
                          <button
                            type="button"
                            onClick={() => {setPreview(null); setMedia(null); setMediaType(null);}}
                            className="text-red-500 hover:text-red-700 font-medium bg-red-50 px-4 py-2 rounded-lg transition-colors block mx-auto"
                          >
                            🗑️ Remove {mediaType === 'image' ? 'Image' : 'Video'}
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-4">
                            <div className="flex justify-center space-x-4 mb-3">
                              <PhotoIcon className="w-8 h-8 text-blue-400" />
                              <VideoCameraIcon className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-lg font-semibold text-gray-700 mb-2">Add Visual Content</p>
                            <p className="text-sm text-gray-500 mb-4">Choose an image or video to help students learn better</p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleMediaChange}
                              className="hidden"
                              id="image-upload"
                            />
                            <label
                              htmlFor="image-upload"
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer font-semibold transition-colors inline-flex items-center space-x-2"
                            >
                              <PhotoIcon className="w-5 h-5" />
                              <span>Choose Image</span>
                            </label>
                            
                            <span className="text-gray-400 hidden sm:inline">or</span>
                            
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleMediaChange}
                              className="hidden"
                              id="video-upload"
                            />
                            <label
                              htmlFor="video-upload"
                              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer font-semibold transition-colors inline-flex items-center space-x-2"
                            >
                              <VideoCameraIcon className="w-5 h-5" />
                              <span>Choose Video</span>
                            </label>
                          </div>
                          
                          <div className="mt-4 text-xs text-gray-400 space-y-1">
                            <p><strong>Images:</strong> PNG, JPG, GIF up to 5MB</p>
                            <p><strong>Videos:</strong> MP4, MOV, AVI up to 20MB</p>
                            <p className="text-blue-500 font-medium">💡 Visual content helps students with autism learn more effectively!</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Answer Choices */}
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">✅ Answer Choices</h3>
                    <p className="text-gray-600 text-sm">Add possible answers and mark the correct ones</p>
                  </div>
                  <button
                    type="button"
                    onClick={addChoice}
                    disabled={choices.length >= 6}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      choices.length >= 6 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Choice</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {choices.map((choice, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <label className="text-sm font-medium text-gray-700">Choice {index + 1}</label>
                          </div>
                          <input
                            type="text"
                            value={choice.title}
                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                            placeholder={`Enter choice ${String.fromCharCode(65 + index)}...`}
                            required
                          />
                        </div>

                        <div className="flex items-center space-x-3">
                          <label className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border-2 border-gray-200 hover:bg-green-50 hover:border-green-300 transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={choice.isCorrect}
                              onChange={(e) => handleChange(index, 'isCorrect', e.target.checked)}
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                            />
                            <CheckCircleIcon className={`w-5 h-5 ${choice.isCorrect ? 'text-green-600' : 'text-gray-400'}`} />
                            <span className="text-sm font-medium text-gray-700">Correct</span>
                          </label>

                          {choices.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeChoice(index)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all border border-red-200 hover:border-red-300"
                              title="Remove this choice"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
          <div className="flex gap-4 justify-end mt-10 x-4">
            <button
              type="button"
              onClick={() => navigate('/activities')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>Create Flashcard</span>
            </button>
          </div>
              </div>
            </div>
          </div>

        
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
