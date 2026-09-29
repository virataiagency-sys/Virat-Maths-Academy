import {
  QuestionRepetitionRecord,
  RetentionLevel,
  ReviewLog,
  SpacedRepetitionStats
} from '../types/spacedRepetition';
import { QuizQuestion } from '../types/curriculum';

const LOCAL_STORAGE_KEY = 'mathemagix_spaced_repetition_v1';

/**
 * Loads all spaced repetition question records from localStorage
 */
export function loadSpacedRepetitionData(): Record<string, QuestionRepetitionRecord> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse spaced repetition data from localStorage:', e);
    return {};
  }
}

/**
 * Saves all spaced repetition question records to localStorage
 */
export function saveSpacedRepetitionData(data: Record<string, QuestionRepetitionRecord>): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save spaced repetition data:', e);
  }
}

/**
 * Check if a question is due for review today or overdue
 */
export function isQuestionDue(record?: QuestionRepetitionRecord): boolean {
  if (!record) return true; // Unreviewed / new questions are ready for learning
  const nextTime = new Date(record.nextReviewDate).getTime();
  return Date.now() >= nextTime;
}

/**
 * Get human-readable due status and color tags
 */
export function getQuestionRetentionStatus(record?: QuestionRepetitionRecord): {
  isDue: boolean;
  dueText: string;
  level: RetentionLevel;
  levelBadge: string;
  badgeColor: string;
  intervalDays: number;
} {
  if (!record || record.totalReviews === 0) {
    return {
      isDue: true,
      dueText: 'New Card · Due for Learning',
      level: 'new',
      levelBadge: '🌱 New Card',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      intervalDays: 0
    };
  }

  const nextTime = new Date(record.nextReviewDate).getTime();
  const diffMs = nextTime - Date.now();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const isDue = diffMs <= 0;

  let dueText = '';
  if (isDue) {
    const overdueDays = Math.abs(diffDays);
    dueText = overdueDays === 0 ? 'Due Today' : `Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`;
  } else {
    dueText = `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }

  let level: RetentionLevel = record.retentionLevel;
  if (isDue && record.repetitions > 0) {
    level = 'review_due';
  }

  let levelBadge = 'Learning';
  let badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';

  if (level === 'mastered') {
    levelBadge = '🏆 Mastered';
    badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  } else if (level === 'graduated') {
    levelBadge = '🧠 Graduated';
    badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
  } else if (level === 'review_due') {
    levelBadge = '⏰ Review Due';
    badgeColor = 'bg-rose-50 text-rose-700 border-rose-300 font-bold animate-pulse';
  }

  return {
    isDue,
    dueText,
    level,
    levelBadge,
    badgeColor,
    intervalDays: record.intervalDays
  };
}

/**
 * SM-2 Algorithm Calculation
 * Quality:
 * 5: Instant, perfect recall without hint
 * 4: Correct after some thought
 * 3: Correct with difficulty or after viewing hint
 * 1: Incorrect answer
 */
export function calculateSM2(
  currentRecord: QuestionRepetitionRecord | undefined,
  quality: number,
  usedHint: boolean
): {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  retentionLevel: RetentionLevel;
} {
  const currentEase = currentRecord?.easeFactor ?? 2.5;
  const currentReps = currentRecord?.repetitions ?? 0;
  const currentInterval = currentRecord?.intervalDays ?? 0;

  // If answer was incorrect (quality < 3)
  if (quality < 3) {
    return {
      repetitions: 0,
      intervalDays: 1, // Repeat tomorrow to reinforce neural pathway
      easeFactor: Math.max(1.3, currentEase - 0.2),
      retentionLevel: 'learning'
    };
  }

  // Answer was correct (quality >= 3)
  let nextReps = currentReps + 1;
  let nextInterval: number;

  if (nextReps === 1) {
    nextInterval = 1; // 1 day later
  } else if (nextReps === 2) {
    nextInterval = 3; // 3 days later
  } else if (nextReps === 3) {
    nextInterval = 7; // 1 week later
  } else {
    // Multiplied by ease factor
    nextInterval = Math.round(currentInterval * currentEase);
  }

  // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const newEase = Math.max(
    1.3,
    currentEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  let nextLevel: RetentionLevel = 'learning';
  if (nextReps >= 4 || nextInterval >= 21) {
    nextLevel = 'mastered';
  } else if (nextReps >= 2 || nextInterval >= 3) {
    nextLevel = 'graduated';
  }

  return {
    repetitions: nextReps,
    intervalDays: nextInterval,
    easeFactor: Math.round(newEase * 100) / 100,
    retentionLevel: nextLevel
  };
}

/**
 * Record a student's answer and return the updated question repetition record
 */
export function recordQuestionAnswer(
  questionId: string,
  isCorrect: boolean,
  usedHint: boolean,
  manualQuality?: number
): QuestionRepetitionRecord {
  const allRecords = loadSpacedRepetitionData();
  const existing = allRecords[questionId];

  // Auto-determine quality rating if not manually provided
  let quality = manualQuality;
  if (quality === undefined) {
    if (!isCorrect) {
      quality = 1;
    } else if (usedHint) {
      quality = 3; // Correct, but needed a hint
    } else {
      quality = 5; // Clean, perfect recall
    }
  }

  const { repetitions, intervalDays, easeFactor, retentionLevel } = calculateSM2(
    existing,
    quality,
    usedHint
  );

  const now = new Date();
  const nextReview = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  const newLog: ReviewLog = {
    timestamp: now.toISOString(),
    wasCorrect: isCorrect,
    quality,
    usedHint,
    intervalDays
  };

  const updatedRecord: QuestionRepetitionRecord = {
    questionId,
    repetitions,
    intervalDays,
    easeFactor,
    lastReviewedDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString(),
    retentionLevel,
    totalReviews: (existing?.totalReviews ?? 0) + 1,
    correctReviews: (existing?.correctReviews ?? 0) + (isCorrect ? 1 : 0),
    history: [...(existing?.history ?? []), newLog]
  };

  allRecords[questionId] = updatedRecord;
  saveSpacedRepetitionData(allRecords);

  return updatedRecord;
}

/**
 * Calculate comprehensive memory retention statistics
 */
export function calculateRetentionStats(
  questions: QuizQuestion[],
  records: Record<string, QuestionRepetitionRecord>
): SpacedRepetitionStats {
  let dueToday = 0;
  let learningCount = 0;
  let graduatedCount = 0;
  let masteredCount = 0;
  let totalReviews = 0;
  let totalCorrect = 0;

  questions.forEach((q) => {
    const rec = records[q.id];
    if (!rec || rec.totalReviews === 0) {
      dueToday++;
    } else {
      totalReviews += rec.totalReviews;
      totalCorrect += rec.correctReviews;

      if (isQuestionDue(rec)) {
        dueToday++;
      }

      if (rec.retentionLevel === 'mastered') {
        masteredCount++;
      } else if (rec.retentionLevel === 'graduated') {
        graduatedCount++;
      } else {
        learningCount++;
      }
    }
  });

  const averageAccuracy =
    totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 100;

  return {
    totalTracked: questions.length,
    dueToday,
    learningCount,
    graduatedCount,
    masteredCount,
    averageAccuracy
  };
}

/**
 * Smart Question Ordering based on Spaced Repetition Retention:
 * 1. Overdue cards (furthest in the past first)
 * 2. Due today cards
 * 3. Learning cards (stumbled upon previously)
 * 4. Unseen/new cards
 * 5. Graduated/mastered cards due in the future
 */
export function sortQuestionsBySpacedRepetition(
  questions: QuizQuestion[],
  records: Record<string, QuestionRepetitionRecord>
): QuizQuestion[] {
  const now = Date.now();

  return [...questions].sort((a, b) => {
    const recA = records[a.id];
    const recB = records[b.id];

    const dueA = isQuestionDue(recA);
    const dueB = isQuestionDue(recB);

    // If one is due and the other isn't, due question comes first
    if (dueA && !dueB) return -1;
    if (!dueA && dueB) return 1;

    // If both are due
    if (dueA && dueB) {
      const timeA = recA ? new Date(recA.nextReviewDate).getTime() : 0;
      const timeB = recB ? new Date(recB.nextReviewDate).getTime() : 0;
      // Most overdue or new comes first
      return timeA - timeB;
    }

    // Neither is due: sort by whoever is due sooner
    const timeA = recA ? new Date(recA.nextReviewDate).getTime() : now + 1000000;
    const timeB = recB ? new Date(recB.nextReviewDate).getTime() : now + 1000000;
    return timeA - timeB;
  });
}
