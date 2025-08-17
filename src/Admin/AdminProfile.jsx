import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  const [showProfile, setShowProfile] = useState(true); // Set true to show modal by default
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode

  // Default profile information
  const [userInfo, setUserInfo] = useState({
    username: "Maria Leonora Theresa",
    birthday: "June 8, 2025",
    address: "Sinto Dos, Bajada, Davao City",
    gender: "Female",
  });

  const navigate = useNavigate();

  // Function to handle "Back" button
  const backToHome = () => {
    navigate('/tracking');
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle save button click
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Top Nav or Main Page */}
      <header className="bg-blue-500 text-white py-3">
        <div className="w-ful mx-auto flex justify-between  px-8">
        <h2 className="text-white text-2xl  font-bold">AutiSync</h2>
          <nav className="flex text-lg space-x-8 ml-auto mr-6">
            <a href="#" className="text-white hover:text-gray-300">Home</a>
            <a href="/tracking" className="text-white hover:text-gray-300">Tracking</a>
            <a href="activities" className="text-white hover:text-gray-300">Activities</a>
            <a href="/expressionwall" className="text-white hover:text-gray-300">Expression Wall</a>
          </nav>
          <div className="flex items-center">
            <img onClick={AdminProfile}
              src="/src/assets/kidprofile1.jpg" // Replace with the profile image URL
              alt="Profile Icon"
              className="h-8 w-8 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* Dimmed Background and Modal */}
      {showProfile && (
        <>
          {/* Overlay background */}
          <div className="fixed inset-0 bg-opacity-40 z-10"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-20 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-lg text-center relative">
              {/* Profile Image */}
              <img
                src="/src/assets/kidprofile1.jpg"
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full border-4 border-white -mt-20 shadow-md bg-white"
              />

              <h2 className="text-lg font-semibold mt-4">Hi, Maria!</h2>

              {/* Information Sections */}
              <div className="mt-4 space-y-3">
                <div className="bg-gray-200 rounded-lg py-2 px-4">
                  <p className="text-xs text-gray-600">Username</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={userInfo.username}
                      onChange={handleChange}
                      className="font-bold text-lg w-full bg-gray-100 border-none rounded-md p-2"
                    />
                  ) : (
                    <p className="font-bold">{userInfo.username}</p>
                  )}
                </div>

                <div className="bg-gray-200 rounded-lg py-2 px-4">
                  <p className="text-xs text-gray-600">Birthday</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="birthday"
                      value={userInfo.birthday}
                      onChange={handleChange}
                      className="font-bold text-lg w-full bg-gray-100 border-none rounded-md p-2"
                    />
                  ) : (
                    <p className="font-bold">{userInfo.birthday}</p>
                  )}
                </div>

                <div className="bg-gray-200 rounded-lg py-2 px-4">
                  <p className="text-xs text-gray-600">Address</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                      className="font-bold text-lg w-full bg-gray-100 border-none rounded-md p-2"
                    />
                  ) : (
                    <p className="font-bold">{userInfo.address}</p>
                  )}
                </div>

                <div className="bg-gray-200 rounded-lg py-2 px-4">
                  <p className="text-xs text-gray-600">Gender</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gender"
                      value={userInfo.gender}
                      onChange={handleChange}
                      className="font-bold text-lg w-full bg-gray-100 border-none rounded-md p-2"
                    />
                  ) : (
                    <p className="font-bold">{userInfo.gender}</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="bg-red-800 hover:bg-red-900 text-white font-semibold px-6 py-2 cursor-pointer rounded"
                  onClick={() => backToHome(false)}
                >
                  Back
                </button>
                {isEditing ? (
                  <button
                    className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 cursor-pointer rounded"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 cursor-pointer rounded"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
