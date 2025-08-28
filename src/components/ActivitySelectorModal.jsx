import React from "react";

const activities = [
  { id: 1, name: "Identification" },
  { id: 2, name: "Numbers" },
  { id: 3, name: "Colors" },
  { id: 4, name: "Shapes" },
  { id: 5, name: "Spelling" },
];

const ActivitySelectorModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br -mt-16 from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Select an Activity</h2>
        <div className="grid grid-cols-1 gap-6 ">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => {
                onSelect(activity.name);
                onClose();
              }}
              className="bg-blue-100 text-xl text-blue-800 font-semibold py-3 rounded-xl shadow hover:bg-blue-200 transition cursor-pointer "
            >
              {activity.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitySelectorModal;
