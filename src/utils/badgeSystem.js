// Badge System Utility for AutiSync
// Manages badge definitions, criteria, and calculations for student achievements

export const BADGE_RARITIES = {
  COMMON: 'common',
  RARE: 'rare', 
  EPIC: 'epic',
  LEGENDARY: 'legendary'
};

export const BADGE_TYPES = {
  PERFORMANCE: 'performance',
  COMPLETION: 'completion',
  EXPLORATION: 'exploration',
  MASTERY: 'mastery',
  STREAK: 'streak',
  SPECIAL: 'special'
};

// Badge definitions with enhanced criteria and metadata
export const createBadgeDefinitions = (category, difficulty, activity) => [
  {
    id: 'perfect_score',
    name: 'Perfect Score Champion',
    description: 'Answered every question correctly! Amazing!',
    icon: '🏆',
    gradient: 'from-yellow-400 via-yellow-500 to-amber-600',
    rarity: BADGE_RARITIES.LEGENDARY,
    type: BADGE_TYPES.PERFORMANCE,
    criteria: (score, total, stats) => score === total && total > 0,
    points: 100
  },
  {
    id: 'excellent_performance',
    name: 'Excellence Star',
    description: 'Scored 80% or higher! Outstanding work!',
    icon: '⭐',
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
    rarity: BADGE_RARITIES.EPIC,
    type: BADGE_TYPES.PERFORMANCE,
    criteria: (score, total, stats) => score >= total * 0.8 && score < total,
    points: 50
  },
  {
    id: 'good_effort',
    name: 'Rising Star',
    description: 'Scored 60% or higher! Great progress!',
    icon: '🌟',
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    rarity: BADGE_RARITIES.RARE,
    type: BADGE_TYPES.PERFORMANCE,
    criteria: (score, total, stats) => score >= total * 0.6 && score < total * 0.8,
    points: 25
  },
  {
    id: 'completion_badge',
    name: 'Activity Finisher',
    description: 'Completed the entire activity! Well done!',
    icon: '🎯',
    gradient: 'from-green-400 via-green-500 to-green-600',
    rarity: BADGE_RARITIES.COMMON,
    type: BADGE_TYPES.COMPLETION,
    criteria: (score, total, stats) => total > 0,
    points: 10
  },
  {
    id: 'category_explorer',
    name: `${category} Explorer`,
    description: `Discovered the wonderful world of ${category}!`,
    icon: getCategoryIcon(category),
    gradient: 'from-indigo-400 via-indigo-500 to-indigo-600',
    rarity: BADGE_RARITIES.COMMON,
    type: BADGE_TYPES.EXPLORATION,
    criteria: (score, total, stats) => stats.category === category && score > 0,
    points: 15
  },
  {
    id: 'difficulty_master',
    name: `${difficulty} Difficulty Master`,
    description: `Conquered ${difficulty} level challenges!`,
    icon: getDifficultyIcon(difficulty),
    gradient: getDifficultyGradient(difficulty),
    rarity: getDifficultyRarity(difficulty),
    type: BADGE_TYPES.MASTERY,
    criteria: (score, total, stats) => stats.difficulty === difficulty && score > 0,
    points: getDifficultyPoints(difficulty)
  },
  {
    id: 'fast_learner',
    name: 'Quick Thinker',
    description: 'Answered questions rapidly and accurately!',
    icon: '⚡',
    gradient: 'from-yellow-300 via-orange-400 to-red-500',
    rarity: BADGE_RARITIES.RARE,
    type: BADGE_TYPES.SPECIAL,
    criteria: (score, total, stats) => stats.averageTime && stats.averageTime < 10 && score >= total * 0.7,
    points: 40
  },
  {
    id: 'first_try_success',
    name: 'First Try Hero',
    description: 'Got the first answer right immediately!',
    icon: '🎪',
    gradient: 'from-pink-400 via-rose-500 to-red-600',
    rarity: BADGE_RARITIES.RARE,
    type: BADGE_TYPES.SPECIAL,
    criteria: (score, total, stats) => stats.firstQuestionCorrect === true,
    points: 30
  },
  {
    id: 'persistent_learner',
    name: 'Never Give Up',
    description: 'Showed great persistence throughout!',
    icon: '💪',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    rarity: BADGE_RARITIES.COMMON,
    type: BADGE_TYPES.SPECIAL,
    criteria: (score, total, stats) => total >= 3 && score > 0,
    points: 20
  },
  {
    id: 'color_master',
    name: 'Color Master',
    description: 'Awarded for completing 5 color-related activities',
    icon: '🎨',
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
    rarity: BADGE_RARITIES.RARE,
    type: BADGE_TYPES.MASTERY,
    criteria: (score, total, stats) => stats.colorActivitiesCompleted >= 5,
    points: 75
  },
  {
    id: 'shape_explorer',
    name: 'Shape Explorer',
    description: 'Awarded after finishing 5 shape activities',
    icon: '🔷',
    gradient: 'from-blue-400 via-indigo-500 to-indigo-600',
    rarity: BADGE_RARITIES.RARE,
    type: BADGE_TYPES.MASTERY,
    criteria: (score, total, stats) => stats.shapeActivitiesCompleted >= 5,
    points: 75
  },
  {
    id: 'number_ninja',
    name: 'Number Ninja',
    description: 'Earned by correctly answering 20 number-related questions',
    icon: '🔢',
    gradient: 'from-green-400 via-green-500 to-green-600',
    rarity: BADGE_RARITIES.EPIC,
    type: BADGE_TYPES.MASTERY,
    criteria: (score, total, stats) => stats.correctNumberAnswers >= 20,
    points: 100
  },
  {
    id: 'consistency_champ',
    name: 'Consistency Champ',
    description: 'Given for completing activities 3 days in a row',
    icon: '📅',
    gradient: 'from-orange-400 via-orange-500 to-red-500',
    rarity: BADGE_RARITIES.EPIC,
    type: BADGE_TYPES.STREAK,
    criteria: (score, total, stats) => stats.consecutiveDays >= 3,
    points: 100
  },
  {
    id: 'helper_badge',
    name: 'Helper Badge',
    description: 'For activities done collaboratively with a parent/teacher',
    icon: '🤝',
    gradient: 'from-orange-400 via-orange-500 to-orange-600',
    rarity: BADGE_RARITIES.RARE,
    type: BADGE_TYPES.SPECIAL,
    criteria: (score, total, stats) => stats.collaborativeActivities >= 1,
    points: 50
  },
  {
    id: 'daily_life_hero',
    name: 'Daily Life Hero',
    description: 'Awarded for finishing 5 "Daily Life Skills" activities',
    icon: '🏠',
    gradient: 'from-teal-400 via-teal-500 to-teal-600',
    rarity: BADGE_RARITIES.RARE,
    type: BADGE_TYPES.MASTERY,
    criteria: (score, total, stats) => stats.dailyLifeActivitiesCompleted >= 5,
    points: 75
  },
  {
    id: 'all_rounder',
    name: 'All-Rounder',
    description: 'Earned when a student completes at least one activity in every category',
    icon: '🏆',
    gradient: 'from-yellow-400 via-yellow-500 to-amber-600',
    rarity: BADGE_RARITIES.LEGENDARY,
    type: BADGE_TYPES.MASTERY,
    criteria: (score, total, stats) => stats.allCategoriesCompleted === true,
    points: 150
  }
];

// Helper functions for dynamic badge properties
export function getCategoryIcon(category) {
  const icons = {
    'Academic': '📚',
    'Social': '👥',
    'Life Skills': '🏠',
    'Daily Life Skills': '🏠',
    'Communication': '💬',
    'Math': '🔢',
    'Numbers': '🔢',
    'Science': '🔬',
    'Reading': '📖',
    'Art': '🎨',
    'Colors': '🎨',
    'Shapes': '🔷',
    'Music': '🎵',
    'Physical': '💪'
  };
  return icons[category] || '📚';
}

export function getDifficultyIcon(difficulty) {
  const icons = {
    'Easy': '🌱',
    'Medium': '🔥',
    'Hard': '💎'
  };
  return icons[difficulty] || '🌱';
}

export function getDifficultyGradient(difficulty) {
  const gradients = {
    'Easy': 'from-green-300 via-green-400 to-green-500',
    'Medium': 'from-orange-400 via-orange-500 to-red-500',
    'Hard': 'from-purple-500 via-indigo-500 to-blue-600'
  };
  return gradients[difficulty] || 'from-green-300 via-green-400 to-green-500';
}

export function getDifficultyRarity(difficulty) {
  const rarities = {
    'Easy': BADGE_RARITIES.COMMON,
    'Medium': BADGE_RARITIES.RARE,
    'Hard': BADGE_RARITIES.EPIC
  };
  return rarities[difficulty] || BADGE_RARITIES.COMMON;
}

export function getDifficultyPoints(difficulty) {
  const points = {
    'Easy': 15,
    'Medium': 25,
    'Hard': 50
  };
  return points[difficulty] || 15;
}

// Calculate earned badges based on performance and criteria
export function calculateEarnedBadges(score, total, category, difficulty, activity, stats = {}) {
  const badgeDefinitions = createBadgeDefinitions(category, difficulty, activity);
  const earnedBadges = [];
  
  const enhancedStats = {
    ...stats,
    category,
    difficulty,
    activity,
    percentage: total > 0 ? (score / total) * 100 : 0
  };
  
  badgeDefinitions.forEach(badge => {
    if (badge.criteria(score, total, enhancedStats)) {
      earnedBadges.push({
        ...badge,
        earnedAt: new Date().toISOString(),
        sessionScore: `${score}/${total}`,
        percentage: enhancedStats.percentage.toFixed(1)
      });
    }
  });
  
  return earnedBadges;
}

// Badge storage and retrieval (for future implementation with local storage or backend)
export function saveBadgesToStorage(badges, studentId = 'guest') {
  try {
    const existingBadges = getBadgesFromStorage(studentId);
    const allBadges = [...existingBadges, ...badges];
    
    // Remove duplicates based on badge ID
    const uniqueBadges = allBadges.filter((badge, index, self) => 
      index === self.findIndex(b => b.id === badge.id)
    );
    
    localStorage.setItem(`student_badges_${studentId}`, JSON.stringify(uniqueBadges));
    return uniqueBadges;
  } catch (error) {
    console.error('Error saving badges:', error);
    return badges;
  }
}

export function getBadgesFromStorage(studentId = 'guest') {
  try {
    const saved = localStorage.getItem(`student_badges_${studentId}`);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error retrieving badges:', error);
    return [];
  }
}

export function getBadgeStats(studentId = 'guest') {
  const badges = getBadgesFromStorage(studentId);
  const stats = {
    total: badges.length,
    legendary: badges.filter(b => b.rarity === BADGE_RARITIES.LEGENDARY).length,
    epic: badges.filter(b => b.rarity === BADGE_RARITIES.EPIC).length,
    rare: badges.filter(b => b.rarity === BADGE_RARITIES.RARE).length,
    common: badges.filter(b => b.rarity === BADGE_RARITIES.COMMON).length,
    totalPoints: badges.reduce((sum, badge) => sum + (badge.points || 0), 0)
  };
  
  return stats;
}

// Badge achievement messages
export function getBadgeAchievementMessage(earnedBadges) {
  const count = earnedBadges.length;
  const hasLegendary = earnedBadges.some(b => b.rarity === BADGE_RARITIES.LEGENDARY);
  const hasEpic = earnedBadges.some(b => b.rarity === BADGE_RARITIES.EPIC);
  
  if (hasLegendary) {
    return {
      title: "LEGENDARY ACHIEVEMENT! 🏆",
      message: "You've achieved something truly extraordinary! Your dedication and skill are inspiring!",
      emotion: "🎆"
    };
  } else if (hasEpic || count >= 4) {
    return {
      title: "EPIC SUCCESS! ⭐",
      message: "Outstanding performance! You're showing incredible growth and determination!",
      emotion: "🚀"
    };
  } else if (count >= 3) {
    return {
      title: "AMAZING WORK! 🌟",
      message: "You're doing wonderfully! Your hard work is really paying off!",
      emotion: "✨"
    };
  } else if (count >= 2) {
    return {
      title: "GREAT JOB! 🎯",
      message: "Excellent progress! You're building fantastic skills!",
      emotion: "🎪"
    };
  } else {
    return {
      title: "WELL DONE! 🌱",
      message: "Every step forward is an achievement! Keep learning and growing!",
      emotion: "💫"
    };
  }
}
