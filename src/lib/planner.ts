import {
  DayOfWeek,
  ScheduledTopic,
  QuizReminder,
  WeeklyPlannerData
} from '../types/planner';
import { GradeLevel, PillarType } from '../types/curriculum';
import { getLocalDateString } from './streak';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

const PLANNER_STORAGE_KEY = 'mathemagix_weekly_study_planner_v1';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

/**
 * Gets the YYYY-MM-DD of Monday for the given date's week
 */
export function getMondayOfCurrentWeek(d: Date = new Date()): string {
  const date = new Date(d);
  const day = date.getDay();
  // day 0 is Sunday, 1 is Monday ... 6 is Saturday
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  return getLocalDateString(monday);
}

/**
 * Returns today's DayOfWeek string (e.g. 'Monday', 'Tuesday', etc.)
 */
export function getTodayDayOfWeek(): DayOfWeek {
  const dayIndex = new Date().getDay();
  const map: Record<number, DayOfWeek> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  return map[dayIndex];
}

/**
 * Generates an initial curated weekly study plan for a given class
 */
export function getDefaultWeeklyPlanner(grade: GradeLevel = 4): WeeklyPlannerData {
  const monday = getMondayOfCurrentWeek();

  const defaultTopics: ScheduledTopic[] = [
    {
      id: 'top_mon',
      day: 'Monday',
      title: `Class ${grade} Core Concept Review & Flowchart Breakdown`,
      grade,
      pillar: 'basic_maths',
      estimatedMinutes: 25,
      priority: 'high',
      isCompleted: false,
      notes: 'Review foundational definitions and step-by-step algorithms'
    },
    {
      id: 'top_tue',
      day: 'Tuesday',
      title: `Algebra & Visual Equation Balancing Drills`,
      grade,
      pillar: 'algebra',
      estimatedMinutes: 20,
      priority: 'medium',
      isCompleted: false,
      notes: 'Use the balance visualizer to isolate variables'
    },
    {
      id: 'top_wed',
      day: 'Wednesday',
      title: `Mental Math: Virtual Abacus Bead Operations`,
      grade,
      pillar: 'abacus',
      estimatedMinutes: 15,
      priority: 'medium',
      isCompleted: false,
      notes: 'Practice complement addition on Soroban (Heaven & Earth beads)'
    },
    {
      id: 'top_thu',
      day: 'Thursday',
      title: `Vedic Speed Calculation Tricks (Sutras)`,
      grade,
      pillar: 'vedic_maths',
      estimatedMinutes: 20,
      priority: 'high',
      isCompleted: false,
      notes: 'Practice Ekadhikena Purvena for instant square and product calculation'
    },
    {
      id: 'top_fri',
      day: 'Friday',
      title: `SOF IMO Olympiad Non-Routine Problem Solving`,
      grade,
      pillar: 'olympiad',
      estimatedMinutes: 30,
      priority: 'high',
      isCompleted: false,
      notes: 'Focus on Achievers Section HOTS questions and logical reasoning'
    },
    {
      id: 'top_sat',
      day: 'Saturday',
      title: `Spaced Repetition Memory Vault Retention Review`,
      grade,
      pillar: 'basic_maths',
      estimatedMinutes: 15,
      priority: 'high',
      isCompleted: false,
      notes: 'Clear all cards due today in SM-2 Spaced Repetition engine'
    },
    {
      id: 'top_sun',
      day: 'Sunday',
      title: `Speed Arithmetic Lab Challenge (+ - × ÷ x²)`,
      grade,
      pillar: 'basic_maths',
      estimatedMinutes: 15,
      priority: 'medium',
      isCompleted: false,
      notes: '15-minute speed burst challenge to beat personal best score'
    }
  ];

  // Upcoming reminders for the week
  const today = new Date();
  const friday = new Date(today);
  friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7));

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));

  const defaultReminders: QuizReminder[] = [
    {
      id: 'rem_fri_quiz',
      title: `Class ${grade} Weekly Comprehensive Quiz`,
      grade,
      pillar: 'basic_maths',
      scheduledDate: getLocalDateString(friday),
      scheduledTime: '17:00',
      isDismissed: false,
      isCompleted: false,
      notes: 'Test recall across all 4 pillars and maintain 100% accuracy'
    },
    {
      id: 'rem_sun_oly',
      title: `SOF IMO Olympiad Sunday Mock Contest`,
      grade,
      pillar: 'olympiad',
      scheduledDate: getLocalDateString(sunday),
      scheduledTime: '10:00',
      isDismissed: false,
      isCompleted: false,
      notes: 'Timed 10-question contest simulation (Achievers section included)'
    }
  ];

  return {
    weekStartDate: monday,
    topics: defaultTopics,
    quizReminders: defaultReminders,
    weeklyGoalCompletedDays: 5,
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Loads planner data from localStorage
 */
export function loadWeeklyPlannerData(grade: GradeLevel = 4): WeeklyPlannerData {
  try {
    const raw = localStorage.getItem(PLANNER_STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultWeeklyPlanner(grade);
      saveWeeklyPlannerData(initial);
      return initial;
    }
    const parsed: WeeklyPlannerData = JSON.parse(raw);
    return parsed;
  } catch (e) {
    console.warn('Error reading planner from localStorage, using default:', e);
    return getDefaultWeeklyPlanner(grade);
  }
}

/**
 * Saves planner data to localStorage
 */
export function saveWeeklyPlannerData(data: WeeklyPlannerData): void {
  try {
    localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save weekly planner data:', e);
  }
}

/**
 * Syncs weekly planner to Firestore under user profile
 */
export async function saveWeeklyPlannerCloud(userId: string, data: WeeklyPlannerData): Promise<void> {
  const path = `users/${userId}/preferences/weekly_planner`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'weekly_planner');
    await setDoc(
      ref,
      {
        ...data,
        userId,
        syncedAt: new Date().toISOString()
      },
      { merge: true }
    );
  } catch (err: any) {
    handleFirestoreError(err, OperationType.WRITE, path);
    console.warn('Weekly study planner saved locally; cloud sync pending:', err?.message || err);
  }
}

/**
 * Loads weekly planner from Firestore if available
 */
export async function loadWeeklyPlannerCloud(userId: string): Promise<WeeklyPlannerData | null> {
  const path = `users/${userId}/preferences/weekly_planner`;
  try {
    const ref = doc(db, 'users', userId, 'preferences', 'weekly_planner');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as WeeklyPlannerData;
    }
    return null;
  } catch (err: any) {
    handleFirestoreError(err, OperationType.GET, path);
    console.warn('Could not load weekly planner from cloud, using local storage:', err?.message || err);
    return null;
  }
}
