export type TrophyTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export type AchievementCategory =
  | 'streak'
  | 'problems'
  | 'algebra'
  | 'abacus'
  | 'vedic'
  | 'olympiad'
  | 'retention'
  | 'curriculum';

export interface BadgeAchievement {
  id: string;
  title: string;
  description: string;
  criteria: string;
  category: AchievementCategory;
  tier: TrophyTier;
  iconName: string;
  points: number; // XP points awarded
  targetValue: number; // e.g. 10 for 10-day streak, 100 for 100 problems
  currentProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string; // ISO date string
}

export interface UserStats {
  problemsSolved: number;
  algebraProblemsSolved: number;
  abacusCalculations: number;
  vedicCalculations: number;
  olympiadProblemsSolved: number;
  quizzesCompleted: number;
  perfectQuizzes: number;
  currentStreak: number;
  longestStreak: number;
  retentionMastered: number;
  lastUpdated: string;
}
