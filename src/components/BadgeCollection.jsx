import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBadgesFromStorage, getBadgeStats, BADGE_RARITIES } from '../utils/badgeSystem';
import BadgeDisplay from './BadgeDisplay';

const BadgeCollection = ({ studentId = 'guest' }) => {
  const navigate = useNavigate();
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState({});
  const [filterRarity, setFilterRarity] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const studentBadges = getBadgesFromStorage(studentId);
    const badgeStats = getBadgeStats(studentId);
    setBadges(studentBadges);
    setStats(badgeStats);
  }, [studentId]);

  const filteredBadges = badges.filter(badge => 
    filterRarity === 'all' || badge.rarity === filterRarity
  );

  const sortedBadges = [...filteredBadges].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.earnedAt) - new Date(a.earnedAt);
    } else if (sortBy === 'rarity') {
      const rarityOrder = ['legendary', 'epic', 'rare', 'common'];
      return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    } else if (sortBy === 'points') {
      return (b.points || 0) - (a.points || 0);
    }
    return 0;
  });

  const getRarityColor = (rarity) => {
    const colors = {
      legendary: 'text-yellow-600 bg-yellow-100',
      epic: 'text-purple-600 bg-purple-100',
      rare: 'text-blue-600 bg-blue-100',
      common: 'text-gray-600 bg-gray-100'
    };
    return colors[rarity] || colors.common;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-xl animate-bounce-gentle"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-6">
            <div className="text-8xl animate-bounce-gentle">🏆</div>
            <div className="absolute -top-2 -right-4 text-4xl animate-spin-slow">⭐</div>
            <div className="absolute -bottom-2 -left-4 text-3xl animate-float">✨</div>
          </div>
          
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4 animate-text-shimmer">
            My Badge Collection
          </h1>
          <p className="text-xl text-gray-700 font-semibold">
            Your amazing achievements and progress!
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100 shadow-lg">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-bold text-gray-800">{stats.total || 0}</div>
            <div className="text-sm text-gray-600">Total Badges</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100 shadow-lg">
            <div className="text-4xl mb-2">💎</div>
            <div className="text-3xl font-bold text-purple-600">{stats.legendary || 0}</div>
            <div className="text-sm text-gray-600">Legendary</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100 shadow-lg">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-blue-600">{stats.epic || 0}</div>
            <div className="text-sm text-gray-600">Epic</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100 shadow-lg">
            <div className="text-4xl mb-2">🌟</div>
            <div className="text-3xl font-bold text-amber-600">{stats.totalPoints || 0}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-purple-100 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-lg font-semibold text-gray-700 mr-3">Filter by rarity:</span>
              {['all', 'legendary', 'epic', 'rare', 'common'].map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setFilterRarity(rarity)}
                  className={`
                    px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105
                    ${filterRarity === rarity 
                      ? rarity === 'all' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : `${getRarityColor(rarity)} ring-2 ring-current`
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {rarity === 'all' ? '🌈 All' : 
                   rarity === 'legendary' ? '💎 Legendary' :
                   rarity === 'epic' ? '⭐ Epic' :
                   rarity === 'rare' ? '🌟 Rare' : '🔹 Common'}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-700">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-purple-200 bg-white/70 backdrop-blur-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="rarity">Rarity</option>
                <option value="points">Points</option>
              </select>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        {sortedBadges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sortedBadges.map((badge, index) => (
              <div key={`${badge.id}-${badge.earnedAt}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <BadgeDisplay 
                  badge={badge} 
                  size="medium" 
                  animated={true} 
                  showDetails={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 opacity-50">🏆</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No badges yet</h3>
            <p className="text-lg text-gray-500 mb-6">
              Start learning activities to earn your first badges!
            </p>
            <button
              onClick={() => navigate('/student')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Learning! 🚀
            </button>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto space-x-3"
          >
            <span className="text-xl">←</span>
            <span>Go Back</span>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes badge-appear {
          from { opacity: 0; transform: scale(0.5) rotate(180deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2.5s ease-in-out infinite;
        }
        
        .animate-badge-appear {
          animation: badge-appear 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-text-shimmer {
          background-size: 200% 200%;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BadgeCollection;
