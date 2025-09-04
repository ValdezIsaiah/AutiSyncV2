import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  EyeSlashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TagIcon
} from '@heroicons/react/24/solid';
import categoriesService from '../lib/categoriesService';

const CategoriesManagement = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '📚',
    color: 'from-blue-400 to-blue-600',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await categoriesService.getAllCategories();
      
      if (error) {
        setError(error);
        // Fallback to default categories
        setCategories(getDefaultCategories());
      } else {
        setCategories(data || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
      setCategories(getDefaultCategories());
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await categoriesService.getCategoryStats();
      if (data) {
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const getDefaultCategories = () => [
    {
      id: 1,
      name: 'Academic',
      description: 'Educational activities and school subjects',
      icon: '📚',
      color: 'from-blue-400 to-blue-600',
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Social/Daily Life',
      description: 'Social skills and daily living activities',
      icon: '👥',
      color: 'from-green-400 to-green-600',
      display_order: 2,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Objects',
      description: 'Object recognition and identification',
      icon: '🧩',
      color: 'from-purple-400 to-purple-600',
      display_order: 3,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];

  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);
    if (searchValue.trim() === '') {
      fetchCategories();
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await categoriesService.searchCategories(searchValue);
      
      if (error) {
        setError(error);
      } else {
        setCategories(data || []);
      }
    } catch (err) {
      console.error('Error searching categories:', err);
      setError('Failed to search categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    try {
      setLoading(true);
      const categoryData = {
        ...newCategory,
        display_order: categories.length + 1
      };

      const { data, error } = await categoriesService.createCategory(categoryData);
      
      if (error) {
        setError(error);
      } else {
        await fetchCategories();
        await fetchStats();
        setShowAddModal(false);
        resetNewCategory();
      }
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      setLoading(true);
      const { data, error } = await categoriesService.updateCategory(editingCategory.id, editingCategory);
      
      if (error) {
        setError(error);
      } else {
        await fetchCategories();
        await fetchStats();
        setEditingCategory(null);
      }
    } catch (err) {
      console.error('Error updating category:', err);
      setError('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      setLoading(true);
      const { data, error } = await categoriesService.toggleCategoryStatus(id);
      
      if (error) {
        setError(error);
      } else {
        await fetchCategories();
        await fetchStats();
      }
    } catch (err) {
      console.error('Error toggling category status:', err);
      setError('Failed to toggle category status');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      const { error } = await categoriesService.deleteCategory(id);
      
      if (error) {
        setError(error);
      } else {
        await fetchCategories();
        await fetchStats();
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setError('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const resetNewCategory = () => {
    setNewCategory({
      name: '',
      description: '',
      icon: '📚',
      color: 'from-blue-400 to-blue-600',
      display_order: 0,
      is_active: true
    });
  };

  const AdminProfile = (e) => {
    e.preventDefault();
    navigate("/adminprofile");
  };

  const colorOptions = [
    { label: 'Blue', value: 'from-blue-400 to-blue-600', preview: 'bg-gradient-to-r from-blue-400 to-blue-600' },
    { label: 'Green', value: 'from-green-400 to-green-600', preview: 'bg-gradient-to-r from-green-400 to-green-600' },
    { label: 'Purple', value: 'from-purple-400 to-purple-600', preview: 'bg-gradient-to-r from-purple-400 to-purple-600' },
    { label: 'Red', value: 'from-red-400 to-red-600', preview: 'bg-gradient-to-r from-red-400 to-red-600' },
    { label: 'Yellow', value: 'from-yellow-400 to-yellow-600', preview: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
    { label: 'Pink', value: 'from-pink-400 to-pink-600', preview: 'bg-gradient-to-r from-pink-400 to-pink-600' },
    { label: 'Indigo', value: 'from-indigo-400 to-indigo-600', preview: 'bg-gradient-to-r from-indigo-400 to-indigo-600' },
    { label: 'Orange', value: 'from-orange-400 to-orange-600', preview: 'bg-gradient-to-r from-orange-400 to-orange-600' }
  ];

  const iconOptions = ['📚', '👥', '🧩', '🎨', '🔢', '💬', '🏠', '🎵', '⚽', '🔬', '🌟', '🎯'];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <a href="/activities" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Activities
              </a>
              <a href="/categories" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition-colors">
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Category Management</h1>
            <p className="text-lg text-gray-600">Organize and manage learning activity categories</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add New Category</span>
          </button>
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
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TagIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Categories</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <EyeIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Active Categories</p>
                <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <EyeSlashIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Inactive Categories</p>
                <p className="text-2xl font-bold text-gray-800">{stats.inactive}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
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
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading categories...</h3>
            <p className="text-gray-500">Please wait while we fetch the categories</p>
          </div>
        )}

        {/* Categories List */}
        {!loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-2xl mr-4`}>
                            {category.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500">Created {new Date(category.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{category.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          category.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {category.display_order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 p-2 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(category.id)}
                            className={`${
                              category.is_active 
                                ? 'text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200' 
                                : 'text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200'
                            } p-2 rounded-lg transition-colors`}
                          >
                            {category.is_active ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or create a new category</p>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category description"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setNewCategory({...newCategory, icon})}
                        className={`p-2 text-2xl rounded-lg border-2 transition-colors ${
                          newCategory.icon === icon 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setNewCategory({...newCategory, color: color.value})}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          newCategory.color === color.value 
                            ? 'border-blue-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-6 rounded ${color.preview}`}></div>
                        <div className="text-xs mt-1">{color.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetNewCategory();
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCategory}
                  disabled={!newCategory.name.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Category</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter category description"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setEditingCategory({...editingCategory, icon})}
                        className={`p-2 text-2xl rounded-lg border-2 transition-colors ${
                          editingCategory.icon === icon 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setEditingCategory({...editingCategory, color: color.value})}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          editingCategory.color === color.value 
                            ? 'border-blue-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-6 rounded ${color.preview}`}></div>
                        <div className="text-xs mt-1">{color.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingCategory.display_order}
                    onChange={(e) => setEditingCategory({...editingCategory, display_order: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={editingCategory.is_active}
                    onChange={(e) => setEditingCategory({...editingCategory, is_active: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active Category</label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCategory}
                  disabled={!editingCategory.name.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;
