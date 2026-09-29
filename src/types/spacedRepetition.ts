export type RetentionLevel = 'new' | 'learning' | 'review_due' | 'graduated' | 'mastered';

export interface ReviewLog {
  timestamp: string;
  wasCorrect: boolean;
  quality: number; // 1 to 5 scale (SM-2)
  usedHint: boolean;
  intervalDays: number;
}

export interface QuestionRepetitionRecord {
  questionId: string;
  repetitions: number; // Consecutive successful repetitions
  intervalDays: number; // Current interval in days
  easeFactor: number; // SM-2 ease factor (default 2.5, min 1.3)
  lastReviewedDate: string; // ISO date string
  nextReviewDate: string; // ISO date string
  retentionLevel: RetentionLevel;
  totalReviews: number;
  correctReviews: number;
  history: ReviewLog[];
}

export interface SpacedRepetitionStats {
  totalTracked: number;
  dueToday: number;
  learningCount: number;
  graduatedCount: number;
  masteredCount: number;
  averageAccuracy: number;
}
