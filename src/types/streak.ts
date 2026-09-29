export interface DailyActivityItem {
  id: string;
  type: 'quiz' | 'arithmetic' | 'solver' | 'checkin' | 'abacus' | 'vedic' | 'video';
  title: string;
  timestamp: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD in local time
  activeDates: string[]; // List of YYYY-MM-DD dates in history
  activitiesToday: DailyActivityItem[];
  streakShieldAvailable: boolean; // Grace period / freeze shield
  totalDaysActive: number;
  lastUpdated: string;
}

export interface StreakMilestone {
  days: number;
  title: string;
  reward: string;
  iconName: string;
  unlocked: boolean;
}

export interface DayStatus {
  dayName: string; // 'M', 'T', 'W', 'T', 'F', 'S', 'S'
  fullDayName: string; // 'Mon', 'Tue'
  dateStr: string; // 'YYYY-MM-DD'
  dayNumber: number; // 1-31
  isToday: boolean;
  isActive: boolean;
  isPast: boolean;
}
