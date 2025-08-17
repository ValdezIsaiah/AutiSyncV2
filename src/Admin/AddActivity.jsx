import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

  

const AddActivity = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission (e.g., send the data to an API)
    console.log({ title, description, category, difficulty });
  };

  const handleImageChange = (e) => {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    

    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // for preview
  };

  const [choices, setChoices] = useState([
    { title: '', isChecked: false },
    { title: '', isChecked: false },
    { title: '', isChecked: false },
    { title: '', isChecked: false }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...choices];
    updated[index][field] = value;
    setChoices(updated);
  };

  const removeChoice = (index) => {
    const updated = choices.filter((_, i) => i !== index);
    setChoices(updated);
  };

  const ExpressionwALL = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate("/expressionwall"); // Redirect to the LoginPage route
  };
  

  return (
    <div className="bg-gray-100 ">
        {/* Header */}
        <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
            <a href="#" className="text-white hover:text-gray-300">Home</a>
            <a href="/tracking" className="text-white hover:text-gray-300">Tracking</a>
            <a href="/activities" className="text-white hover:text-gray-300">Activities</a>
            <a href="/expressionwall"  className="text-white hover:text-gray-300">Expression Wall</a>
          </nav>
          <div className="flex items-center">
            <img
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="container mt-5 px-4 py-6 m-auto max-w-6xl">
      
      <form onSubmit={handleSubmit} className="bg-[#BDF1FF] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-0">Activity Details</h2>
      <p>Add the activity details below</p>
        <div className="mb-4">
          
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3 p-2 w-full text-sm border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-4">
         
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full text-sm border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the activity"
            required
          />
        </div>

        <div className="mb-4">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full text-sm text-black-100 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option className="" value="">Select category</option>
            <option value="Educational">Educational</option>
            <option value="Creative">Creative</option>
            <option value="Physical">Physical</option>
            <option value="Emotional">Emotional</option>
          </select>
        </div>

        <div className="mb-4">
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-1 p-2 w-full text-sm border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select difficulty level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </form>
      </div>
    


      <h1 className="ml-58 text-xl ">Badges</h1>
      <div className="container -mt-4 px-4 py-6 m-auto max-w-6xl">
        <form onSubmit={handleSubmit} className="bg-[#BDF1FF] p-6 rounded-lg shadow-md">
          <button className="bg-blue-700 text-white text-sm px-3 py-1 my-0 cursor-pointer rounded   hover:bg-blue-800">
          ADD BADGE
          </button>
        </form>
        <div className="bg-gray-400 h-26 flex items-center justify-center">
          <p className="">No badges found</p>
        </div>
      </div>
      
      <h1 className="ml-58 text-xl">Questions</h1>
      <div className="container -mt-4  px-4 py-6 mx-auto max-w-6xl">
        <form onSubmit={handleSubmit} className="bg-[#BDF1FF] p-6 rounded-lg shadow-md">
        <h2 className="text-lg mb-0">Question 1 </h2>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3 p-2 w-full text-sm border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Question"
            required
          />

          <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className=" border bg-gray-300 p-1 cursor-pointer rounded mt-5"
        required
      />

      <h2 className="text-lg mb-0 mt-7">Choices </h2>
      <div className="space-y-4 w-285">
      {choices.map((choice, index) => (
        <div key={index} className="flex items-center space-x-4">
          <input
            type="text"
            value={choice.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            className="p-2 w-190 text-sm border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Choice ${index + 1}`}
            required
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={choice.isChecked}
              onChange={(e) => handleChange(index, 'isChecked', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
            <span className="text-sm">is correct</span>
          </label>

          <button
            onClick={() => removeChoice(index)}
            className="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-50 transition">
            Remove Choice
          </button>
        </div>
      ))}
    </div>
        <div className="flex justify-end space-x-6 mt-8"> 
          <button className="bg-red-800 text-white px-2 py-1 rounded-xs cursor-pointer">
            Cancel
          </button>          
          <button className="bg-blue-800 text-white px-2 py-1 rounded-xs cursor-pointer">
            Save Activity
          </button>    
          </div>


        </div>
        </form>

      </div>

    </div>
  );
};

export default AddActivity;
