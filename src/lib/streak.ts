import { StreakData, DayStatus, StreakMilestone, DailyActivityItem } from '../types/streak';

export const STREAK_STORAGE_KEY = 'mathemagix_daily_learning_streak';

/**
 * Returns formatted YYYY-MM-DD string for a local Date
 */
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns yesterday's YYYY-MM-DD string
 */
export function getYesterdayDateString(d: Date = new Date()): string {
  const prev = new Date(d);
  prev.setDate(prev.getDate() - 1);
  return getLocalDateString(prev);
}

/**
 * Calculates calendar day difference (dateStr1 - dateStr2)
 */
export function getDayDifference(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 999;
  const d1 = new Date(`${dateStr1}T00:00:00`);
  const d2 = new Date(`${dateStr2}T00:00:00`);
  const diffTime = d1.getTime() - d2.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Default clean streak state
 */
export function getDefaultStreakData(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    activeDates: [],
    activitiesToday: [],
    streakShieldAvailable: true,
    totalDaysActive: 0,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Resolves current streak considering whether user was active today, yesterday, or days ago.
 */
export function evaluateStreak(stored: StreakData | null): {
  normalizedData: StreakData;
  isActiveToday: boolean;
  isAtRisk: boolean;
  daysLapsed: number;
} {
  const data: StreakData = stored || getDefaultStreakData();
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  if (!data.lastActiveDate) {
    return {
      normalizedData: data,
      isActiveToday: false,
      isAtRisk: false,
      daysLapsed: 0
    };
  }

  const isActiveToday = data.lastActiveDate === today;
  const isYesterday = data.lastActiveDate === yesterday;
  const daysLapsed = getDayDifference(today, data.lastActiveDate);

  // If user was active today
  if (isActiveToday) {
    return {
      normalizedData: data,
      isActiveToday: true,
      isAtRisk: false,
      daysLapsed: 0
    };
  }

  // If user was active yesterday, their streak is intact but pending today's action!
  if (isYesterday) {
    return {
      normalizedData: {
        ...data,
        activitiesToday: [] // reset activities today since it's a new day
      },
      isActiveToday: false,
      isAtRisk: true,
      daysLapsed: 1
    };
  }

  // If user missed yesterday, check if streak shield is available
  if (daysLapsed === 2 && data.streakShieldAvailable && data.currentStreak > 1) {
    // Grace shield protects the streak!
    return {
      normalizedData: {
        ...data,
        streakShieldAvailable: false,
        activitiesToday: []
      },
      isActiveToday: false,
      isAtRisk: true,
      daysLapsed: 2
    };
  }

  // Otherwise, the streak lapsed
  return {
    normalizedData: {
      ...data,
      currentStreak: 0,
      activitiesToday: []
    },
    isActiveToday: false,
    isAtRisk: false,
    daysLapsed
  };
}

/**
 * Records a learning activity and updates streak
 */
export function recordDailyActivity(
  prevData: StreakData,
  activity: { type: DailyActivityItem['type']; title: string }
): {
  updatedData: StreakData;
  isNewDayCheckin: boolean;
} {
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();
  const alreadyActiveToday = prevData.lastActiveDate === today;

  const newActivityItem: DailyActivityItem = {
    id: `act_${Date.now()}`,
    type: activity.type,
    title: activity.title,
    timestamp: new Date().toISOString()
  };

  if (alreadyActiveToday) {
    // Already counted today's streak day, just append activity
    const updated: StreakData = {
      ...prevData,
      activitiesToday: [newActivityItem, ...(prevData.activitiesToday || [])],
      lastUpdated: new Date().toISOString()
    };
    saveLocalStreak(updated);
    return { updatedData: updated, isNewDayCheckin: false };
  }

  // New day check-in!
  let newCurrentStreak = 1;
  if (prevData.lastActiveDate === yesterday) {
    newCurrentStreak = (prevData.currentStreak || 0) + 1;
  } else if (
    getDayDifference(today, prevData.lastActiveDate) === 2 &&
    prevData.streakShieldAvailable &&
    prevData.currentStreak > 0
  ) {
    // Shield kept it alive
    newCurrentStreak = prevData.currentStreak + 1;
  }

  const newLongestStreak = Math.max(prevData.longestStreak || 0, newCurrentStreak);
  const activeDatesSet = new Set(prevData.activeDates || []);
  activeDatesSet.add(today);

  const updated: StreakData = {
    ...prevData,
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastActiveDate: today,
    activeDates: Array.from(activeDatesSet).sort(),
    activitiesToday: [newActivityItem],
    totalDaysActive: (prevData.totalDaysActive || 0) + 1,
    streakShieldAvailable: true, // Reset shield on successful streak extension
    lastUpdated: new Date().toISOString()
  };

  saveLocalStreak(updated);
  return { updatedData: updated, isNewDayCheckin: true };
}

/**
 * Loads streak from localStorage with evaluation
 */
export function loadLocalStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) {
      return getDefaultStreakData();
    }
    const parsed = JSON.parse(raw) as StreakData;
    const { normalizedData } = evaluateStreak(parsed);
    return normalizedData;
  } catch (err) {
    console.warn('Failed to load local streak data:', err);
    return getDefaultStreakData();
  }
}

/**
 * Saves streak to localStorage
 */
export function saveLocalStreak(data: StreakData): void {
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to persist streak data locally:', err);
  }
}

/**
 * Generates current 7-day week schedule (Mon to Sun)
 */
export function getWeeklyTracker(activeDates: string[]): DayStatus[] {
  const activeSet = new Set(activeDates || []);
  const today = new Date();
  const todayStr = getLocalDateString(today);

  // Find Monday of the current week (day 1, where 0 is Sun)
  const currentDayOfWeek = today.getDay(); // 0 is Sun, 1 is Mon, ..., 6 is Sat
  const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

  const monday = new Date(today);
  monday.setDate(today.getDate() + distanceToMonday);

  const days: DayStatus[] = [];
  const dayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = getLocalDateString(date);

    const isToday = dateStr === todayStr;
    const isPast = dateStr < todayStr;
    const isActive = activeSet.has(dateStr);

    days.push({
      dayName: dayLetters[i],
      fullDayName: dayShort[i],
      dateStr,
      dayNumber: date.getDate(),
      isToday,
      isActive,
      isPast
    });
  }

  return days;
}

/**
 * Milestones for streak motivation
 */
export function getStreakMilestones(longestStreak: number): StreakMilestone[] {
  return [
    {
      days: 3,
      title: '3-Day Spark',
      reward: 'Bronze Flame Badge + 50 Math XP',
      iconName: 'Flame',
      unlocked: longestStreak >= 3
    },
    {
      days: 7,
      title: '7-Day Blaze',
      reward: 'Silver Flame Badge + Streak Shield',
      iconName: 'Zap',
      unlocked: longestStreak >= 7
    },
    {
      days: 14,
      title: '14-Day Inferno',
      reward: 'Gold Flame Badge + Speed Multiplier',
      iconName: 'Award',
      unlocked: longestStreak >= 14
    },
    {
      days: 30,
      title: '30-Day Supernova',
      reward: 'Grandmaster Mathemagician Crown',
      iconName: 'Trophy',
      unlocked: longestStreak >= 30
    }
  ];
}

/**
 * Motivational quotes based on streak length
 */
export function getStreakEncouragement(currentStreak: number, isActiveToday: boolean): {
  headline: string;
  subtext: string;
  colorClass: string;
} {
  if (currentStreak === 0) {
    return {
      headline: 'Begin Your Daily Learning Habit!',
      subtext: 'Complete 1 quick quiz or math drill today to spark your 1-day learning streak.',
      colorClass: 'text-indigo-600'
    };
  }

  if (isActiveToday) {
    if (currentStreak >= 14) {
      return {
        headline: `${currentStreak} Days Strong! You are Unstoppable! 🔥`,
        subtext: 'Your math reflexes and problem-solving speed are in the top tier!',
        colorClass: 'text-rose-600'
      };
    }
    if (currentStreak >= 7) {
      return {
        headline: `${currentStreak} Days of Pure Brilliance! ⚡`,
        subtext: 'A full week of consistent practice. Keep the momentum surging!',
        colorClass: 'text-amber-600'
      };
    }
    return {
      headline: `${currentStreak}-Day Streak Active! Great job today! 🌟`,
      subtext: `Come back tomorrow to keep the flame burning and reach ${currentStreak + 1} days!`,
      colorClass: 'text-emerald-600'
    };
  }

  // Not yet active today
  return {
    headline: `Keep Your ${currentStreak}-Day Streak Alive! 🔥`,
    subtext: `Practice any topic or check in now to power up to Day ${currentStreak + 1}!`,
    colorClass: 'text-orange-600'
  };
}
