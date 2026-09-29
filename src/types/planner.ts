import { PillarType, GradeLevel } from './curriculum';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface ScheduledTopic {
  id: string;
  day: DayOfWeek;
  title: string;
  grade: GradeLevel;
  pillar: PillarType | 'olympiad' | 'cbse' | 'custom';
  estimatedMinutes: number;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  completedAt?: string;
  notes?: string;
}

export interface QuizReminder {
  id: string;
  title: string;
  grade: GradeLevel;
  pillar: PillarType | 'olympiad' | 'all';
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime?: string; // HH:MM
  isDismissed: boolean;
  isCompleted: boolean;
  notes?: string;
}

export interface WeeklyPlannerData {
  weekStartDate: string; // YYYY-MM-DD of Monday
  topics: ScheduledTopic[];
  quizReminders: QuizReminder[];
  weeklyGoalCompletedDays: number;
  customTemplateApplied?: string;
  lastUpdated: string;
}
