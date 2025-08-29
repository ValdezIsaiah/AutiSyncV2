import React from "react";

const activities = [
  { 
    id: 1, 
    name: "Identification", 
    icon: "🔍", 
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100"
  },
  { 
    id: 2, 
    name: "Numbers", 
    icon: "🔢", 
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100"
  },
  { 
    id: 3, 
    name: "Colors", 
    icon: "🎨", 
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100"
  },
  { 
    id: 4, 
    name: "Shapes", 
    icon: "📐", 
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    hoverColor: "hover:bg-orange-100"
  },
  { 
    id: 5, 
    name: "Spelling", 
    icon: "📝", 
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    hoverColor: "hover:bg-pink-100"
  },
];

const ActivitySelectorModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-125 relative border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white relative">
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-">Choose Your Learning Adventure</h2>
            <p className="text-sm text-white/90">Pick an activity that excites you! 🌟</p>
          </div>
        </div>

        {/* Activities Grid - Single Row */}
        <div className="p-1">
          <div className="grid grid-cols-1 gap-1">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => {
                  onSelect(activity.name);
                  onClose();
                }}
                className={`
                  ${activity.bgColor} ${activity.hoverColor}
                  cursor-pointer rounded-2xl h-25 shadow-lg hover:shadow-xl
                  transition-all duration-300 transform hover:scale-105
                  border-2 border-white/50 hover:border-white
                  group relative overflow-hidden
                `}
              >
                {/* Background Decoration */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className=" absolute top-2 right-2 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>
                </div>

                {/* Icon */}
                <div className={`
                  w-12 h-12 bg-gradient-to-r ${activity.color} 
                  rounded-2xl mx-auto mb-1 flex items-center justify-center
                  shadow-lg group-hover:shadow-xl transform group-hover:scale-110
                  transition-all duration-300
                `}>
                  <span className="text-2xl text-white">{activity.icon}</span>
                </div>

                {/* Activity Name */}
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                  {activity.name}
                </h3>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActivitySelectorModal;