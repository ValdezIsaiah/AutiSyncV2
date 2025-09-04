import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon, PlusIcon, PlayIcon, ClockIcon, StarIcon } from '@heroicons/react/24/solid';
import activitiesService from '../lib/activitiesService';
import categoriesService from '../lib/categoriesService';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, byCategory: {} });

  // Fetch activities on component mount
  useEffect(() => {
    fetchActivities();
    fetchCategories();
    fetchStats();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await categoriesService.getActiveCategories();
      
      if (error) {
        console.error('Error fetching categories:', error);
        // Fallback to default categories
        setCategories(getDefaultCategories());
      } else {
        // Transform categories to match the expected format
        const formattedCategories = [
          { value: 'all', label: 'All Activities', icon: '📚' },
          ...(data || []).map(cat => ({
            value: cat.name,
            label: cat.name,
            icon: cat.icon
          }))
        ];
        setCategories(formattedCategories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories(getDefaultCategories());
    }
  };

  const getDefaultCategories = () => [
    { value: 'all', label: 'All Activities', icon: '📚' },
    { value: 'Academic', label: 'Academic Skills', icon: '📖' },
    { value: 'Social/Daily Life', label: 'Social & Daily Life', icon: '👥' },
    { value: 'Objects', label: 'Object Recognition', icon: '🧩' }
  ];

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const { data, error } = await activitiesService.getAllActivities();
      
      if (error) {
        setError(error);
        // Fallback to sample data if database fails
        setActivities(getSampleActivities());
      } else {
        setActivities(data || []);
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError('Failed to load activities');
      // Fallback to sample data
      setActivities(getSampleActivities());
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await activitiesService.getActivityStats();
      if (data) {
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Sample data as fallback
  const getSampleActivities = () => [
    {
      id: 1,
      title: 'Counting Adventures',
      description: 'Fun counting activities with colorful numbers!',
      category: 'Academic',
      difficulty: 'Easy',
      duration: '10-15 min',
      participants: 24,
      icon: '🔢',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      title: 'Shape Detective',
      description: 'Identify and match different shapes and patterns',
      category: 'Academic', 
      difficulty: 'Medium',
      duration: '15-20 min',
      participants: 18,
      icon: '🔺',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 3,
      title: 'Grocery Shopping Helper',
      description: 'Practice daily life skills at the virtual store',
      category: 'Social/Daily Life',
      difficulty: 'Medium',
      duration: '20-25 min', 
      participants: 15,
      icon: '🛒',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      title: 'Object Explorer',
      description: 'Discover and categorize everyday objects',
      category: 'Objects',
      difficulty: 'Easy',
      duration: '10-15 min',
      participants: 22,
      icon: '🧸',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  // Handle search functionality  
  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);
    if (searchValue.trim() === '') {
      fetchActivities();
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await activitiesService.searchActivities(searchValue);
      
      if (error) {
        setError(error);
      } else {
        setActivities(data || []);
      }
    } catch (err) {
      console.error('Error searching activities:', err);
      setError('Failed to search activities');
    } finally {
      setLoading(false);
    }
  };

  // Handle category filter
  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    
    try {
      setLoading(true);
      let data, error;
      
      if (category === 'all') {
        ({ data, error } = await activitiesService.getAllActivities());
      } else {
        ({ data, error } = await activitiesService.getActivitiesByCategory(category));
      }
      
      if (error) {
        setError(error);
      } else {
        setActivities(data || []);
      }
    } catch (err) {
      console.error('Error filtering activities:', err);
      setError('Failed to filter activities');
    } finally {
      setLoading(false);
    }
  };

  // Activities are already filtered via database queries, so we can use them directly
  const filteredActivities = activities;

  const addActivity = (e) => {
    e.preventDefault();
    navigate("/addactivity");
  };

  const AdminProfile = (e) => {
    e.preventDefault();
    navigate("/adminprofile");
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 max-h-screen">
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
              <a href="/categories" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Categories
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Learning Activities</h1>
            <p className="text-lg text-gray-600">Engaging activities designed for autism-friendly learning</p>
          </div>
          
          <button 
            onClick={addActivity} 
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create New Activity</span>
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
              <div className="absolute left-4 top-3.5">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryFilter(category.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedCategory === category.value
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <PlayIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Activities</p>
                <p className="text-2xl font-bold text-gray-800">{activities.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <StarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Active Students</p>
                <p className="text-2xl font-bold text-gray-800">79</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <ClockIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Avg. Completion</p>
                <p className="text-2xl font-bold text-gray-800">85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading activities</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading activities...</h3>
            <p className="text-gray-500">Please wait while we fetch the latest activities</p>
          </div>
        )}

        {/* Activities Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden"
            >
              <div className={`h-32 bg-gradient-to-r ${activity.color} flex items-center justify-center`}>
                <div className="text-6xl">{activity.icon}</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(activity.difficulty)}`}>
                    {activity.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{activity.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-gray-700">{activity.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-700">{activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Participants:</span>
                    <span className="font-medium text-green-600">{activity.participants} students</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                    View Details
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-semibold transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {!loading && filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No activities found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;