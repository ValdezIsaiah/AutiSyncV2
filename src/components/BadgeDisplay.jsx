import React from 'react';

const BadgeDisplay = ({ badge, size = 'medium', animated = true, showDetails = true }) => {
  const sizeClasses = {
    small: 'p-3 rounded-xl',
    medium: 'p-6 rounded-2xl',
    large: 'p-8 rounded-3xl'
  };

  const iconSizes = {
    small: 'text-3xl',
    medium: 'text-5xl', 
    large: 'text-7xl'
  };

  const titleSizes = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  const descSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div 
      className={`
        bg-gradient-to-br ${badge.gradient} ${sizeClasses[size]} shadow-2xl transform 
        transition-all duration-300 border-2 border-white/30 backdrop-blur-sm relative overflow-hidden group
        ${animated ? 'hover:scale-105 animate-badge-appear' : ''}
        ${badge.rarity === 'legendary' ? 'ring-4 ring-yellow-300/60 shadow-yellow-200/30' : 
          badge.rarity === 'epic' ? 'ring-3 ring-purple-300/60 shadow-purple-200/30' : 
          badge.rarity === 'rare' ? 'ring-2 ring-blue-300/60 shadow-blue-200/30' : 
          'shadow-gray-200/20'}
      `}
    >
      {/* Rarity indicator */}
      {showDetails && (
        <div className={`
          absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase
          ${badge.rarity === 'legendary' ? 'bg-yellow-200/90 text-yellow-900' : 
            badge.rarity === 'epic' ? 'bg-purple-200/90 text-purple-900' : 
            badge.rarity === 'rare' ? 'bg-blue-200/90 text-blue-900' : 
            'bg-gray-200/90 text-gray-800'}
          transform group-hover:scale-110 transition-transform duration-300
        `}>
          {badge.rarity}
        </div>
      )}
      
      {/* Points indicator */}
      {showDetails && badge.points && (
        <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-bold text-white">+{badge.points}pts</span>
        </div>
      )}
      
      {/* Badge shine effect */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:animate-shine"></div>
      )}
      
      <div className="text-center text-white relative z-10">
        <div className={`${iconSizes[size]} mb-3 ${animated ? 'animate-bounce-gentle' : ''} drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          {badge.icon}
        </div>
        <h3 className={`${titleSizes[size]} font-bold mb-2 drop-shadow-sm`}>
          {badge.name}
        </h3>
        {showDetails && badge.description && (
          <p className={`${descSizes[size]} opacity-90 leading-relaxed`}>
            {badge.description}
          </p>
        )}
        {badge.earnedAt && showDetails && (
          <p className="text-xs opacity-75 mt-2">
            Earned: {new Date(badge.earnedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default BadgeDisplay;
