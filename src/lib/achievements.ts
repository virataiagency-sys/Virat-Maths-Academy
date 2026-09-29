import { BadgeAchievement, UserStats, TrophyTier } from '../types/achievements';
import confetti from 'canvas-confetti';

const STATS_STORAGE_KEY = 'mathemagix_user_stats_v1';
const BADGES_STORAGE_KEY = 'mathemagix_badges_unlocked_v1';

export const INITIAL_USER_STATS: UserStats = {
  problemsSolved: 0,
  algebraProblemsSolved: 0,
  abacusCalculations: 0,
  vedicCalculations: 0,
  olympiadProblemsSolved: 0,
  quizzesCompleted: 0,
  perfectQuizzes: 0,
  currentStreak: 0,
  longestStreak: 0,
  retentionMastered: 0,
  lastUpdated: new Date().toISOString()
};

export const BADGE_DEFINITIONS: Omit<BadgeAchievement, 'currentProgress' | 'isUnlocked' | 'unlockedAt'>[] = [
  // STREAK MILESTONES
  {
    id: 'streak_3_days',
    title: '3-Day Spark',
    description: 'Keep your daily learning flame burning for 3 consecutive days.',
    criteria: 'Reach a 3-Day Learning Streak',
    category: 'streak',
    tier: 'bronze',
    iconName: 'Flame',
    points: 50,
    targetValue: 3
  },
  {
    id: 'streak_7_days',
    title: 'Weekly Champion',
    description: 'Dedicate an entire 7-day week to continuous mathematical mastery.',
    criteria: 'Reach a 7-Day Learning Streak',
    category: 'streak',
    tier: 'silver',
    iconName: 'Flame',
    points: 150,
    targetValue: 7
  },
  {
    id: 'streak_10_days',
    title: '10-Day Streak',
    description: 'An elite milestone of persistence! 10 straight days of unstoppable math drills.',
    criteria: 'Reach an uninterrupted 10-Day Streak',
    category: 'streak',
    tier: 'gold',
    iconName: 'Award',
    points: 300,
    targetValue: 10
  },
  {
    id: 'streak_30_days',
    title: 'Monthly Titan',
    description: 'Form a lifelong habit by learning 30 consecutive days.',
    criteria: 'Reach a 30-Day Learning Streak',
    category: 'streak',
    tier: 'diamond',
    iconName: 'Trophy',
    points: 750,
    targetValue: 30
  },

  // PROBLEMS SOLVED MILESTONES
  {
    id: 'problems_10',
    title: 'Math Explorer',
    description: 'Solve your first 10 math challenges across quizzes, labs, and solvers.',
    criteria: 'Solve 10 Math Problems',
    category: 'problems',
    tier: 'bronze',
    iconName: 'CheckCircle2',
    points: 50,
    targetValue: 10
  },
  {
    id: 'problems_50',
    title: 'Problem Solver',
    description: 'Complete 50 mathematical challenges with high precision.',
    criteria: 'Solve 50 Math Problems',
    category: 'problems',
    tier: 'silver',
    iconName: 'Zap',
    points: 150,
    targetValue: 50
  },
  {
    id: 'problems_100',
    title: '100 Math Problems Solved',
    description: 'Centurion achievement! 100 mathematical problems conquered across Mathemagix.',
    criteria: 'Solve 100 Math Problems',
    category: 'problems',
    tier: 'gold',
    iconName: 'Trophy',
    points: 350,
    targetValue: 100
  },
  {
    id: 'problems_250',
    title: 'Math Marathoner',
    description: 'An extraordinary accomplishment! 250 problems solved in your learning journey.',
    criteria: 'Solve 250 Math Problems',
    category: 'problems',
    tier: 'diamond',
    iconName: 'Sparkles',
    points: 800,
    targetValue: 250
  },

  // TOPIC & PILLAR MASTERY
  {
    id: 'master_of_algebra',
    title: 'Master of Algebra',
    description: 'Master equations, algebraic visualizer balancing, and variable factorization.',
    criteria: 'Solve 15 Algebra Problems & Complete Algebra Drills',
    category: 'algebra',
    tier: 'gold',
    iconName: 'Sliders',
    points: 300,
    targetValue: 15
  },
  {
    id: 'abacus_soroban_master',
    title: 'Soroban Master',
    description: 'Perform bead computations and mental arithmetic on the Japanese Soroban Abacus.',
    criteria: 'Complete 15 Abacus Computations',
    category: 'abacus',
    tier: 'silver',
    iconName: 'Grid',
    points: 200,
    targetValue: 15
  },
  {
    id: 'vedic_speed_demon',
    title: 'Vedic Math Virtuoso',
    description: 'Harness ancient Vedic sutras like Ekadhikena Purvena and Vertically & Crosswise.',
    criteria: 'Perform 15 Vedic Speed Calculations',
    category: 'vedic',
    tier: 'gold',
    iconName: 'Zap',
    points: 250,
    targetValue: 15
  },
  {
    id: 'olympiad_gold',
    title: 'Olympiad Champion',
    description: 'Crack high-difficulty SOF IMO, SASMO, and Australian Math Olympiad non-routine problems.',
    criteria: 'Solve 10 Olympiad Arena Questions',
    category: 'olympiad',
    tier: 'gold',
    iconName: 'Award',
    points: 350,
    targetValue: 10
  },
  {
    id: 'retention_master',
    title: 'Long-Term Memory Vault',
    description: 'Graduate 10 mathematical concepts into long-term memory via the SM-2 Spaced Repetition engine.',
    criteria: 'Lock 10 Cards into Mastered Retention',
    category: 'retention',
    tier: 'gold',
    iconName: 'Brain',
    points: 300,
    targetValue: 10
  },
  {
    id: 'perfect_quiz',
    title: 'Flawless Recall',
    description: 'Complete curriculum quizzes with a 100% perfect score.',
    criteria: 'Score 100% on 3 Quizzes',
    category: 'curriculum',
    tier: 'silver',
    iconName: 'Star',
    points: 200,
    targetValue: 3
  }
];

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return { ...INITIAL_USER_STATS };
    return { ...INITIAL_USER_STATS, ...JSON.parse(raw) };
  } catch (e) {
    return { ...INITIAL_USER_STATS };
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats:', e);
  }
}

export function getUnlockedBadgesMap(): Record<string, string> {
  try {
    const raw = localStorage.getItem(BADGES_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

export function saveUnlockedBadgesMap(map: Record<string, string>): void {
  try {
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to save unlocked badges map:', e);
  }
}

/**
 * Get all badges evaluated with user's current progress and unlocked status
 */
export function getAllBadges(stats?: UserStats): BadgeAchievement[] {
  const currentStats = stats || getUserStats();
  const unlockedMap = getUnlockedBadgesMap();

  return BADGE_DEFINITIONS.map((def) => {
    let progress = 0;

    switch (def.id) {
      case 'streak_3_days':
      case 'streak_7_days':
      case 'streak_10_days':
      case 'streak_30_days':
        progress = Math.max(currentStats.currentStreak, currentStats.longestStreak);
        break;
      case 'problems_10':
      case 'problems_50':
      case 'problems_100':
      case 'problems_250':
        progress = currentStats.problemsSolved;
        break;
      case 'master_of_algebra':
        progress = currentStats.algebraProblemsSolved;
        break;
      case 'abacus_soroban_master':
        progress = currentStats.abacusCalculations;
        break;
      case 'vedic_speed_demon':
        progress = currentStats.vedicCalculations;
        break;
      case 'olympiad_gold':
        progress = currentStats.olympiadProblemsSolved;
        break;
      case 'retention_master':
        progress = currentStats.retentionMastered;
        break;
      case 'perfect_quiz':
        progress = currentStats.perfectQuizzes;
        break;
      default:
        progress = 0;
    }

    const isUnlocked = Boolean(unlockedMap[def.id]) || progress >= def.targetValue;
    const unlockedAt = unlockedMap[def.id] || (isUnlocked ? new Date().toISOString() : undefined);

    return {
      ...def,
      currentProgress: Math.min(progress, def.targetValue),
      isUnlocked,
      unlockedAt
    };
  });
}

/**
 * Records an activity metric (e.g. problemsSolved, currentStreak, etc.)
 * Checks if new badges are unlocked, awards points, and triggers confetti if unlocked!
 */
export function recordAchievementActivity(
  metric: keyof Omit<UserStats, 'lastUpdated'>,
  increment: number = 1
): { newlyUnlocked: BadgeAchievement[]; allBadges: BadgeAchievement[]; updatedStats: UserStats } {
  const stats = getUserStats();
  const unlockedMap = getUnlockedBadgesMap();

  if (metric === 'currentStreak') {
    stats.currentStreak = increment;
    if (increment > stats.longestStreak) {
      stats.longestStreak = increment;
    }
  } else if (metric === 'longestStreak') {
    stats.longestStreak = Math.max(stats.longestStreak, increment);
  } else {
    stats[metric] = (stats[metric] || 0) + increment;
  }
  stats.lastUpdated = new Date().toISOString();
  saveUserStats(stats);

  const allBadges = getAllBadges(stats);
  const newlyUnlocked: BadgeAchievement[] = [];

  allBadges.forEach((badge) => {
    if (badge.isUnlocked && !unlockedMap[badge.id]) {
      unlockedMap[badge.id] = new Date().toISOString();
      newlyUnlocked.push(badge);
    }
  });

  if (newlyUnlocked.length > 0) {
    saveUnlockedBadgesMap(unlockedMap);
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (e) {
      // Fallback gracefully
    }
  }

  return {
    newlyUnlocked,
    allBadges: getAllBadges(stats),
    updatedStats: stats
  };
}

export function getTotalAchievementPoints(badges: BadgeAchievement[]): number {
  return badges.reduce((sum, b) => (b.isUnlocked ? sum + b.points : sum), 0);
}
