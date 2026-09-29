import React, { useState, useEffect, useMemo } from 'react';
import { QuizQuestion } from '../types/curriculum';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Brain,
  Clock,
  Sparkles,
  Award,
  Layers,
  Calendar,
  AlertTriangle,
  Flame,
  CheckCircle2,
  SlidersHorizontal,
  TrendingUp,
  Target,
  Repeat,
  ShieldCheck,
  Check,
  Zap,
  Info
} from 'lucide-react';
import {
  loadSpacedRepetitionData,
  saveSpacedRepetitionData,
  recordQuestionAnswer,
  isQuestionDue,
  getQuestionRetentionStatus,
  calculateRetentionStats,
  sortQuestionsBySpacedRepetition
} from '../lib/spacedRepetition';
import { QuestionRepetitionRecord } from '../types/spacedRepetition';
import { saveUserSpacedRepetition, loadUserSpacedRepetition } from '../lib/firebase';
import { recordAchievementActivity } from '../lib/achievements';

export type QuizReviewMode = 'spaced_smart' | 'due_only' | 'standard';

interface QuizArenaProps {
  questions: QuizQuestion[];
  classNameTitle: string;
  pillarName: string;
  onQuizComplete?: (score: number, total: number) => void;
  userId?: string | null;
  initialPracticeMode?: boolean;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  questions,
  classNameTitle,
  pillarName,
  onQuizComplete,
  userId,
  initialPracticeMode
}) => {
  // Practice Mode Toggle (Sandbox drilling: repeat questions without altering official grade progress)
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(() => {
    if (initialPracticeMode !== undefined) return initialPracticeMode;
    try {
      return localStorage.getItem('quiz_practice_mode') === 'true';
    } catch {
      return false;
    }
  });

  const togglePracticeMode = (enabled?: boolean) => {
    setIsPracticeMode((prev) => {
      const next = enabled !== undefined ? enabled : !prev;
      try {
        localStorage.setItem('quiz_practice_mode', String(next));
      } catch {}
      return next;
    });
  };

  // Tracking practice attempts and missed questions for targeted re-drills
  const [questionAttempts, setQuestionAttempts] = useState<Record<string, number>>({});
  const [missedQuestionIds, setMissedQuestionIds] = useState<Set<string>>(new Set());
  const [drillSubsetIds, setDrillSubsetIds] = useState<string[] | null>(null);

  // Quiz Streaks: Consecutive error-free quizzes (100% correct answers)
  const [flawlessStreak, setFlawlessStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('quiz_flawless_streak');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [streakJustIgnited, setStreakJustIgnited] = useState<boolean>(false);

  // Spaced Repetition Records Cache
  const [repetitionRecords, setRepetitionRecords] = useState<Record<string, QuestionRepetitionRecord>>(
    () => loadSpacedRepetitionData()
  );

  // Review Mode: 'spaced_smart' (due first), 'due_only', or 'standard' (curriculum order)
  const [reviewMode, setReviewMode] = useState<QuizReviewMode>('spaced_smart');
  const [showMemoryStats, setShowMemoryStats] = useState(false);

  // Load cloud records if user logs in
  useEffect(() => {
    if (!userId) return;
    loadUserSpacedRepetition(userId).then((cloudData) => {
      if (cloudData && Object.keys(cloudData).length > 0) {
        setRepetitionRecords((prev) => {
          const merged = { ...prev, ...cloudData };
          saveSpacedRepetitionData(merged);
          return merged;
        });
      }
    });
  }, [userId]);

  // Sync to cloud when records update
  const syncToCloud = (updatedRecords: Record<string, QuestionRepetitionRecord>) => {
    if (userId) {
      saveUserSpacedRepetition(userId, updatedRecords).catch((err) => {
        console.warn('Spaced repetition cloud sync deferred:', err);
      });
    }
  };

  // Determine active questions sequence based on review mode and practice drill subsets
  const activeQuestions = useMemo(() => {
    let base = questions;
    if (drillSubsetIds && drillSubsetIds.length > 0) {
      base = questions.filter((q) => drillSubsetIds.includes(q.id));
      if (base.length === 0) base = questions;
    }

    if (reviewMode === 'standard') {
      return base;
    }
    if (reviewMode === 'due_only') {
      const due = base.filter((q) => isQuestionDue(repetitionRecords[q.id]));
      return due.length > 0 ? due : base;
    }
    // 'spaced_smart': overdue & due first, followed by learning, followed by future
    return sortQuestionsBySpacedRepetition(base, repetitionRecords);
  }, [questions, repetitionRecords, reviewMode, drillSubsetIds]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Last feedback for the answered question
  const [lastFeedback, setLastFeedback] = useState<{
    record: QuestionRepetitionRecord;
    wasCorrect: boolean;
  } | null>(null);

  // Retention stats for the questions set
  const stats = useMemo(
    () => calculateRetentionStats(questions, repetitionRecords),
    [questions, repetitionRecords]
  );

  const currentQ = activeQuestions[currentIndex];
  const currentRecord = currentQ ? repetitionRecords[currentQ.id] : undefined;
  const retentionStatus = getQuestionRetentionStatus(currentRecord);

  // Reset index when changing review modes
  const handleModeChange = (mode: QuizReviewMode) => {
    setReviewMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScore(0);
    setIsFinished(false);
    setLastFeedback(null);
    setDrillSubsetIds(null);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    // Track attempt count on this question card
    setQuestionAttempts((prev) => ({
      ...prev,
      [currentQ.id]: (prev[currentQ.id] || 0) + 1
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
      // In Practice Mode: Do NOT alter official achievement counters
      if (!isPracticeMode) {
        recordAchievementActivity('problemsSolved', 1);
        if (pillarName.toLowerCase().includes('algebra')) {
          recordAchievementActivity('algebraProblemsSolved', 1);
        }
      }
    } else {
      setMissedQuestionIds((prev) => new Set(prev).add(currentQ.id));
    }

    if (!isPracticeMode) {
      // Process Spaced Repetition (SM-2 Algorithm) only in Graded mode
      const updatedRecord = recordQuestionAnswer(currentQ.id, isCorrect, showHint);
      if (updatedRecord.retentionLevel === 'mastered') {
        const allRecs = loadSpacedRepetitionData();
        const masteredCount = Object.values(allRecs).filter(r => r.retentionLevel === 'mastered').length;
        recordAchievementActivity('retentionMastered', masteredCount);
      }
      setRepetitionRecords((prev) => {
        const next = { ...prev, [currentQ.id]: updatedRecord };
        syncToCloud(next);
        return next;
      });

      setLastFeedback({
        record: updatedRecord,
        wasCorrect: isCorrect
      });
    } else {
      // In Practice Mode: Provide non-destructive pedagogical feedback
      setLastFeedback({
        record: currentRecord || {
          questionId: currentQ.id,
          repetitions: 0,
          intervalDays: 1,
          easeFactor: 2.5,
          nextReviewDate: new Date().toISOString(),
          lastReviewedDate: new Date().toISOString(),
          retentionLevel: 'learning',
          totalReviews: 0,
          correctReviews: 0,
          history: []
        },
        wasCorrect: isCorrect
      });
    }
  };

  // Allow manual recall rating (Anki / SM-2 style adjustment) in Graded mode
  const handleManualRating = (quality: number) => {
    if (!currentQ || isPracticeMode) return;
    const isCorrect = selectedOption === currentQ.correctIndex;
    const updatedRecord = recordQuestionAnswer(currentQ.id, isCorrect, showHint, quality);
    setRepetitionRecords((prev) => {
      const next = { ...prev, [currentQ.id]: updatedRecord };
      syncToCloud(next);
      return next;
    });
    setLastFeedback({
      record: updatedRecord,
      wasCorrect: isCorrect
    });
  };

  // Repeat current question (Instant drill replay in Practice Mode)
  const handleRepeatCurrentQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setLastFeedback(null);
  };

  // Navigate back to previous question
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setLastFeedback(null);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      setLastFeedback(null);
    } else {
      setIsFinished(true);
      // Only record to official grade progress when NOT in Practice Mode
      if (!isPracticeMode) {
        onQuizComplete?.(score, activeQuestions.length);
      }

      // Quiz Streaks: Evaluate whether quiz was completed with zero errors
      const isFlawless = score === activeQuestions.length && activeQuestions.length > 0;
      if (isFlawless) {
        const nextStreak = flawlessStreak + 1;
        setFlawlessStreak(nextStreak);
        try {
          localStorage.setItem('quiz_flawless_streak', String(nextStreak));
        } catch {}

        if (nextStreak >= 3) {
          setStreakJustIgnited(true);
          // Energetic fire-themed confetti explosion for 3+ consecutive flawless quizzes
          try {
            confetti({
              particleCount: 130,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#ef4444', '#f97316', '#f59e0b', '#fbbf24', '#ff4500']
            });
          } catch (e) {}
        } else {
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {}
        }
      } else {
        // Quiz completed with errors: break the streak
        setFlawlessStreak(0);
        try {
          localStorage.setItem('quiz_flawless_streak', '0');
        } catch {}
        setStreakJustIgnited(false);
      }
    }
  };

  const handleRestart = (keepMode = true) => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScore(0);
    setIsFinished(false);
    setLastFeedback(null);
    setDrillSubsetIds(null);
    setMissedQuestionIds(new Set());
    setQuestionAttempts({});
    setStreakJustIgnited(false);
  };

  const handleDrillMissedOnly = () => {
    if (missedQuestionIds.size === 0) return;
    setDrillSubsetIds(Array.from(missedQuestionIds));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScore(0);
    setIsFinished(false);
    setLastFeedback(null);
  };

  if (!currentQ) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
        <Brain className="w-10 h-10 text-indigo-400 mx-auto mb-2" />
        <p className="text-slate-700 font-bold text-sm">No quiz questions available for this topic.</p>
      </div>
    );
  }

  // Quiz Finished Summary
  if (isFinished) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-sm space-y-6">
        <div
          className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-sm ${
            isPracticeMode ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
          }`}
        >
          {isPracticeMode ? <Target className="w-8 h-8" /> : <Trophy className="w-8 h-8" />}
        </div>
        <div>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 border ${
              isPracticeMode
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-indigo-50 text-indigo-800 border-indigo-200'
            }`}
          >
            {isPracticeMode ? (
              <>
                <Target className="w-3.5 h-3.5 text-amber-600" />
                <span>Practice Mode Completed (Ungraded)</span>
              </>
            ) : (
              <>
                <Trophy className="w-3.5 h-3.5 text-indigo-600" />
                <span>Official Quiz Completed (Graded)</span>
              </>
            )}
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-1">
            {isPracticeMode ? 'Focused Drill Completed!' : 'Session Completed!'}
          </h3>
          <p className="text-xs text-slate-500 font-semibold">
            {classNameTitle} · {pillarName}
            {isPracticeMode && ' · Official grade progress was not modified'}
          </p>
        </div>

        {/* Score & Retention Metrics Card */}
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isPracticeMode
              ? 'bg-gradient-to-br from-amber-50/60 to-orange-50/40 border-amber-100'
              : 'bg-gradient-to-br from-indigo-50/70 to-slate-50 border-indigo-100'
          }`}
        >
          <div
            className={`text-4xl font-black font-mono ${
              isPracticeMode ? 'text-amber-600' : 'text-indigo-600'
            }`}
          >
            {score} / {activeQuestions.length}
          </div>
          <p className="text-xs font-bold text-slate-700">
            {percentage >= 80
              ? 'Outstanding Mastery! 🌟'
              : percentage >= 50
              ? 'Solid Practice Effort! Memory pathways activated 🧠'
              : 'Keep drilling! Every repetition reinforces mental retention 💪'}
          </p>

          {isPracticeMode ? (
            <div className="pt-3 border-t border-amber-200/60 text-xs text-amber-900 bg-white/70 p-3 rounded-xl">
              <span className="font-bold flex items-center justify-center gap-1.5 text-amber-800 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Impact on Official Record</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                This practice drill was completely ungraded. Repeat questions anytime, or switch off Practice Mode to record your official score.
              </p>
            </div>
          ) : (
            <div className="pt-3 border-t border-indigo-100/80 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-indigo-50 shadow-2xs">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Tracked</span>
                <span className="font-extrabold text-slate-800 font-mono">{stats.totalTracked} Cards</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-indigo-50 shadow-2xs">
                <span className="block text-[10px] font-bold text-amber-600 uppercase">Due Today</span>
                <span className="font-extrabold text-amber-700 font-mono">{stats.dueToday} Due</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-indigo-50 shadow-2xs">
                <span className="block text-[10px] font-bold text-emerald-600 uppercase">Mastered</span>
                <span className="font-extrabold text-emerald-700 font-mono">{stats.masteredCount} Items</span>
              </div>
            </div>
          )}
        </div>

        {/* QUIZ STREAKS VISUALIZATION CARD */}
        {flawlessStreak >= 3 ? (
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-3xl p-6 text-white text-center shadow-xl border-2 border-amber-300 animate-fadeIn">
            {/* Ambient Floating Embers / Sparks */}
            <div className="absolute top-2 left-6 text-amber-200 animate-ember-float text-sm select-none">✨</div>
            <div className="absolute top-4 right-8 text-yellow-100 animate-ember-float text-xs select-none" style={{ animationDelay: '0.4s' }}>🔥</div>
            <div className="absolute bottom-3 left-10 text-amber-200 animate-ember-float text-xs select-none" style={{ animationDelay: '0.8s' }}>✨</div>
            <div className="absolute bottom-3 right-8 text-orange-200 animate-ember-float text-sm select-none" style={{ animationDelay: '1.2s' }}>🔥</div>

            {/* Fire Icon Flame Animation with Aura */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-3">
              <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-md animate-flame-aura pointer-events-none" />
              <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 flex items-center justify-center shadow-inner ring-4 ring-yellow-300/40">
                <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-100 fill-yellow-200 animate-fire-flicker drop-shadow-lg" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-black uppercase tracking-wider mb-2 text-yellow-100">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>3-in-a-Row Flawless Streak Unlocked!</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black tracking-tight mb-1 text-white drop-shadow-sm flex items-center justify-center gap-2">
              <span>🔥</span>
              <span>{flawlessStreak} CONSECUTIVE FLAWLESS QUIZZES!</span>
              <span>🔥</span>
            </h4>

            <p className="text-xs sm:text-sm text-yellow-100/95 max-w-md mx-auto leading-relaxed mb-4">
              Mathematical perfection! You have completed <strong>{flawlessStreak} consecutive quizzes</strong> without a single error. You are officially on fire!
            </p>

            {/* Streak Flame Badges */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: Math.min(flawlessStreak, 5) }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-xl bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xs"
                  title={`Flawless Quiz #${i + 1}`}
                >
                  <Flame
                    className="w-4 h-4 text-yellow-200 fill-yellow-300 animate-fire-flicker"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                </div>
              ))}
              {flawlessStreak > 5 && (
                <span className="text-xs font-black bg-white/25 px-2.5 py-1 rounded-xl">
                  +{flawlessStreak - 5} More
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 border border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs shrink-0">
                <Flame className={`w-5 h-5 ${flawlessStreak > 0 ? 'fill-orange-500 text-orange-500 animate-pulse' : 'text-slate-400'}`} />
              </div>
              <div>
                <div className="text-xs font-extrabold text-orange-950 flex items-center gap-2">
                  <span>Quiz Streaks: {flawlessStreak}/3 Flawless</span>
                  <span className="text-[10px] bg-orange-200 text-orange-900 px-2 py-0.5 rounded-full font-bold">
                    {3 - flawlessStreak} more to ignite Fire Animation!
                  </span>
                </div>
                <p className="text-[11px] text-orange-800/80 mt-0.5">
                  {flawlessStreak === 0
                    ? 'Score 100% on 3 consecutive quizzes without errors to trigger the celebratory Fire Animation!'
                    : `Zero errors on this quiz! Complete ${3 - flawlessStreak === 1 ? '1 more quiz' : '2 more quizzes'} with 100% accuracy to ignite the Fire Animation.`}
                </p>
              </div>
            </div>

            {/* 3 Flame Pip Progress */}
            <div className="flex items-center gap-1.5 shrink-0 self-center sm:self-auto">
              {[0, 1, 2].map((i) => {
                const isEarned = i < flawlessStreak;
                return (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isEarned
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-white text-slate-300 border border-slate-200'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${isEarned ? 'fill-white' : ''}`} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {isPracticeMode ? (
            <>
              <button
                onClick={() => handleRestart(true)}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Repeat className="w-4 h-4" />
                <span>Repeat Practice Drill</span>
              </button>

              {missedQuestionIds.size > 0 && !drillSubsetIds && (
                <button
                  onClick={handleDrillMissedOnly}
                  className="w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Drill Missed Questions ({missedQuestionIds.size})</span>
                </button>
              )}

              <button
                onClick={() => {
                  togglePracticeMode(false);
                  handleRestart(false);
                }}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Switch to Official Graded Mode</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleModeChange('spaced_smart')}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Brain className="w-4 h-4" />
                <span>Practice Due Spaced Cards</span>
              </button>
              <button
                onClick={() => {
                  togglePracticeMode(true);
                  handleRestart(true);
                }}
                className="w-full py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Target className="w-4 h-4 text-amber-600" />
                <span>Drill in Practice Mode</span>
              </button>
              <button
                onClick={() => handleRestart(false)}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border rounded-3xl p-5 sm:p-7 shadow-xs max-w-2xl mx-auto space-y-5 transition-all ${
        isPracticeMode ? 'border-amber-300 ring-2 ring-amber-300/30' : 'border-slate-200'
      }`}
    >
      {/* Practice Mode Toggle & Status Bar */}
      <div
        className={`rounded-2xl p-3 sm:p-3.5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isPracticeMode
            ? 'bg-amber-50/80 border-amber-200 text-amber-950 shadow-2xs'
            : 'bg-slate-50 border-slate-200/80 text-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
              isPracticeMode ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'
            }`}
          >
            {isPracticeMode ? <Target className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black">
                {isPracticeMode ? 'Practice Mode Active' : 'Graded Quiz Mode'}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isPracticeMode
                    ? 'bg-amber-200/70 text-amber-900 border-amber-300'
                    : 'bg-indigo-100 text-indigo-700 border-indigo-200'
                }`}
              >
                {isPracticeMode ? 'Ungraded Drilling' : 'Official Progress'}
              </span>
              {drillSubsetIds && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                  Missed Questions Drill ({drillSubsetIds.length})
                </span>
              )}
            </div>
            <p className="text-[11px] mt-0.5 text-slate-500">
              {isPracticeMode
                ? 'Repeat questions freely to test strategies. Your official grade progress and streaks are protected.'
                : 'Your quiz score counts directly toward your official grade progress and streaks.'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-xs font-bold text-slate-600">
              {isPracticeMode ? 'Practice ON' : 'Practice OFF'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isPracticeMode}
              onClick={() => togglePracticeMode()}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isPracticeMode ? 'bg-amber-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isPracticeMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Spaced Repetition Mode Switcher (Graded mode only or info in practice) */}
      {!isPracticeMode && (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 sm:p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>Spaced Repetition Engine</span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-mono font-bold">
                    SM-2 Active
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Schedules questions based on memory retention and retrieval intervals.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMemoryStats((prev) => !prev)}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
            >
              <TrendingUp className="w-3 h-3" />
              <span>{showMemoryStats ? 'Hide Stats' : 'Memory Stats'}</span>
            </button>
          </div>

          {/* Memory Stats Dropdown Panel */}
          {showMemoryStats && (
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs animate-fadeIn">
              <div className="p-2 bg-white rounded-xl border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Due Today</span>
                <span className="font-mono font-black text-rose-600 text-sm">{stats.dueToday}</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Learning</span>
                <span className="font-mono font-black text-amber-600 text-sm">{stats.learningCount}</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Graduated</span>
                <span className="font-mono font-black text-indigo-600 text-sm">{stats.graduatedCount}</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-100 text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Mastered</span>
                <span className="font-mono font-black text-emerald-600 text-sm">{stats.masteredCount}</span>
              </div>

              {/* Quiz Streaks Quick Test & Status in Memory Panel */}
              <div className="col-span-2 sm:col-span-4 pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Flame className={`w-3.5 h-3.5 ${flawlessStreak >= 3 ? 'text-orange-500 fill-orange-500 animate-fire-flicker' : 'text-slate-400'}`} />
                  <span>Flawless Streak: <strong className="text-slate-800 font-mono">{flawlessStreak}</strong> {flawlessStreak === 1 ? 'quiz' : 'quizzes'} without errors</span>
                  {flawlessStreak >= 3 && (
                    <span className="text-[9px] font-black uppercase bg-red-600 text-white px-1.5 py-0.2 rounded animate-pulse">
                      FIRE ON!
                    </span>
                  )}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFlawlessStreak(3);
                      try { localStorage.setItem('quiz_flawless_streak', '3'); } catch {}
                      try {
                        confetti({
                          particleCount: 100,
                          spread: 80,
                          origin: { y: 0.5 },
                          colors: ['#ef4444', '#f97316', '#f59e0b', '#fbbf24']
                        });
                      } catch {}
                    }}
                    className="text-orange-600 hover:text-orange-800 hover:underline cursor-pointer font-bold text-[10px]"
                  >
                    ⚡ Test 3x Fire Streak
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => {
                      setFlawlessStreak(0);
                      try { localStorage.setItem('quiz_flawless_streak', '0'); } catch {}
                    }}
                    className="text-slate-400 hover:text-slate-600 hover:underline cursor-pointer font-medium text-[10px]"
                  >
                    Reset Streak
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Mode:</span>
            <button
              onClick={() => handleModeChange('spaced_smart')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                reviewMode === 'spaced_smart'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Smart Spaced Review</span>
            </button>

            <button
              onClick={() => handleModeChange('due_only')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                reviewMode === 'due_only'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>Due for Review ({stats.dueToday})</span>
            </button>

            <button
              onClick={() => handleModeChange('standard')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                reviewMode === 'standard'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Curriculum Order</span>
            </button>
          </div>
        </div>
      )}

      {/* Header and Progress Bar */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <span
            className={`text-xs font-extrabold block ${
              isPracticeMode ? 'text-amber-600' : 'text-indigo-600'
            }`}
          >
            {classNameTitle} · {pillarName} {isPracticeMode ? 'Practice Drill' : 'Quiz'}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-mono font-bold text-slate-500">
              Card {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${retentionStatus.badgeColor}`}>
              {retentionStatus.levelBadge}
            </span>
            {isPracticeMode && questionAttempts[currentQ.id] && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Attempt #{questionAttempts[currentQ.id]}
              </span>
            )}
            {!isPracticeMode && (
              <span className="text-[10px] font-semibold text-slate-500">
                {retentionStatus.dueText}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quiz Streaks Visualization Widget */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border transition-all ${
              flawlessStreak >= 3
                ? 'bg-gradient-to-r from-orange-500/15 to-red-500/20 border-orange-400 text-orange-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
            title={`Flawless Quiz Streak: ${flawlessStreak} error-free quizzes in a row. Complete 3 consecutive quizzes without errors to ignite fire!`}
          >
            <div className="relative flex items-center justify-center">
              {flawlessStreak >= 3 && (
                <span className="absolute w-5 h-5 rounded-full bg-orange-400/40 blur-xs animate-flame-aura pointer-events-none" />
              )}
              <Flame
                className={`w-4 h-4 transition-all ${
                  flawlessStreak >= 3
                    ? 'text-orange-500 fill-orange-500 animate-fire-flicker'
                    : flawlessStreak > 0
                    ? 'text-orange-400 fill-orange-400'
                    : 'text-slate-400'
                }`}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold">
                {flawlessStreak >= 3 ? (
                  <span className="text-orange-600 font-extrabold flex items-center gap-1">
                    <span>{flawlessStreak}x Streak</span>
                    <span className="text-[9px] bg-red-600 text-white px-1 py-0.2 rounded font-black animate-pulse">
                      FIRE
                    </span>
                  </span>
                ) : (
                  <span>
                    Streak: <strong className="font-mono text-slate-900">{flawlessStreak}/3</strong>
                  </span>
                )}
              </span>
            </div>
          </div>

          <span
            className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
              isPracticeMode
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            Score: {score}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isPracticeMode ? 'bg-amber-500' : 'bg-indigo-600'
          }`}
          style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Difficulty: {currentQ.difficulty || 'Standard'}</span>
          {!isPracticeMode && currentRecord && currentRecord.repetitions > 0 && (
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Retention Interval: {currentRecord.intervalDays}d (Streak: {currentRecord.repetitions}x)</span>
            </span>
          )}
          {isPracticeMode && (
            <span className="text-amber-700 font-bold flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-amber-600" />
              <span>Repeatable Sandbox Question</span>
            </span>
          )}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctIndex;

          let btnClass = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-slate-50';

          if (isAnswerSubmitted) {
            if (isCorrect) {
              btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
            } else if (isSelected) {
              btnClass = 'bg-rose-50 border-rose-500 text-rose-900';
            } else {
              btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            btnClass = isPracticeMode
              ? 'bg-amber-50 border-amber-600 text-amber-900 font-bold'
              : 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold';
          }

          return (
            <button
              key={idx}
              disabled={isAnswerSubmitted}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {isAnswerSubmitted && isCorrect && (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
              )}
              {isAnswerSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hint Button and Content */}
      {!isAnswerSubmitted && (
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setShowHint((prev) => !prev)}
            className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1.5 cursor-pointer bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>{showHint ? 'Hide Hint' : isPracticeMode ? 'Show Hint (Free in Practice)' : 'Need a Hint? (-1 Recall Ease)'}</span>
          </button>
        </div>
      )}

      {showHint && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 animate-fadeIn">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Formula / Hint: </span>
            <span>{currentQ.hint}</span>
          </div>
        </div>
      )}

      {/* Answer Submitted Feedback & Spaced Repetition Scheduling Box */}
      {isAnswerSubmitted && (
        <div className="space-y-3 pt-2">
          {/* Explanation Card */}
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm border animate-fadeIn ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="font-extrabold flex items-center gap-1.5 mb-1.5">
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Correct Answer! Memory Path Consolidated.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Incorrect. Retrieval Gap Identified!</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed">{currentQ.explanation}</p>
          </div>

          {/* Practice Mode Repeat Banner */}
          {isPracticeMode && (
            <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-[11px] text-amber-900 leading-snug">
                  <strong>Practice Mode Sandbox:</strong> You can repeat this question now to reinforce the concept, or proceed to the next card.
                </span>
              </div>
              <button
                onClick={handleRepeatCurrentQuestion}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs transition-colors"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Repeat Question</span>
              </button>
            </div>
          )}

          {/* SM-2 Spaced Repetition Next Scheduling Banner (Graded mode only) */}
          {!isPracticeMode && lastFeedback && (
            <div className="p-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 text-xs text-indigo-950 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-extrabold flex items-center gap-1.5 text-indigo-900">
                  <Brain className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Spaced Review Scheduled:</span>
                </span>
                <span className="font-bold text-[11px] text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-100">
                  Interval: {lastFeedback.record.intervalDays} day{lastFeedback.record.intervalDays > 1 ? 's' : ''} (Ease: {lastFeedback.record.easeFactor})
                </span>
              </div>

              <p className="text-[11px] text-slate-600">
                {lastFeedback.wasCorrect
                  ? `Next review scheduled on ${new Date(lastFeedback.record.nextReviewDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} to lock into long-term memory.`
                  : 'Scheduled for review tomorrow (1-day interval) to reinforce neural retrieval.'}
              </p>

              {/* Anki / SuperMemo Self-Assessment Ease Rating */}
              <div className="pt-2 border-t border-indigo-100 flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Fine-Tune Memory:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleManualRating(2)}
                    className="px-2 py-1 rounded bg-white hover:bg-rose-50 text-rose-700 border border-slate-200 text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    Hard (1d)
                  </button>
                  <button
                    onClick={() => handleManualRating(4)}
                    className="px-2 py-1 rounded bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    Good ({lastFeedback.record.intervalDays}d)
                  </button>
                  <button
                    onClick={() => handleManualRating(5)}
                    className="px-2 py-1 rounded bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200 text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    Easy ({Math.max(2, Math.round(lastFeedback.record.intervalDays * 1.5))}d)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {currentIndex > 0 && (
            <button
              onClick={handlePrevQuestion}
              className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="Go back to previous question"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          )}

          {isPracticeMode && (
            <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
              <Target className="w-3 h-3 text-amber-600" />
              <span>Practice: Repeat permitted</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Repeat Question Button in Practice Mode */}
          {isPracticeMode && isAnswerSubmitted && (
            <button
              onClick={handleRepeatCurrentQuestion}
              className="py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title="Repeat this question to test alternative thinking"
            >
              <Repeat className="w-3.5 h-3.5 text-amber-700" />
              <span>Repeat This Question</span>
            </button>
          )}

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                selectedOption === null
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : isPracticeMode
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <span>Submit Answer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className={`py-2.5 px-5 rounded-xl text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                isPracticeMode
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <span>{currentIndex < activeQuestions.length - 1 ? 'Next Question' : isPracticeMode ? 'Finish Practice' : 'Complete Quiz'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
