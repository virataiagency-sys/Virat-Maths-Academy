import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Flame,
  Trophy,
  AlertCircle,
  Bell,
  Trash2,
  Sparkles,
  Award,
  ChevronRight,
  Filter,
  Layers,
  ArrowRight,
  Check,
  RotateCcw,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';
import {
  DayOfWeek,
  ScheduledTopic,
  QuizReminder,
  WeeklyPlannerData
} from '../types/planner';
import { GradeLevel, PillarType } from '../types/curriculum';
import { StreakData } from '../types/streak';
import { getLocalDateString } from '../lib/streak';
import {
  DAYS_OF_WEEK,
  getTodayDayOfWeek,
  loadWeeklyPlannerData,
  saveWeeklyPlannerData,
  saveWeeklyPlannerCloud,
  loadWeeklyPlannerCloud,
  getDefaultWeeklyPlanner
} from '../lib/planner';
import confetti from 'canvas-confetti';
import { recordAchievementActivity } from '../lib/achievements';

interface WeeklyStudyPlannerProps {
  currentGrade: GradeLevel;
  streakData: StreakData;
  onRecordStreakActivity: (type: any, title: string) => void;
  onNavigateToQuiz?: (grade: GradeLevel, pillar: PillarType) => void;
  onNavigateToOlympiad?: (grade: GradeLevel) => void;
  userId?: string | null;
}

export const WeeklyStudyPlanner: React.FC<WeeklyStudyPlannerProps> = ({
  currentGrade,
  streakData,
  onRecordStreakActivity,
  onNavigateToQuiz,
  onNavigateToOlympiad,
  userId
}) => {
  const [plannerData, setPlannerData] = useState<WeeklyPlannerData>(() =>
    loadWeeklyPlannerData(currentGrade)
  );

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(() => getTodayDayOfWeek());
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
  const [targetAddDay, setTargetAddDay] = useState<DayOfWeek>('Monday');

  // Form states for new topic
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicGrade, setNewTopicGrade] = useState<GradeLevel>(currentGrade);
  const [newTopicPillar, setNewTopicPillar] = useState<ScheduledTopic['pillar']>('basic_maths');
  const [newTopicMinutes, setNewTopicMinutes] = useState(25);
  const [newTopicPriority, setNewTopicPriority] = useState<ScheduledTopic['priority']>('medium');
  const [newTopicNotes, setNewTopicNotes] = useState('');

  // Form states for new reminder
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderGrade, setNewReminderGrade] = useState<GradeLevel>(currentGrade);
  const [newReminderPillar, setNewReminderPillar] = useState<QuizReminder['pillar']>('basic_maths');
  const [newReminderDate, setNewReminderDate] = useState(() => getLocalDateString());
  const [newReminderTime, setNewReminderTime] = useState('17:00');
  const [newReminderNotes, setNewReminderNotes] = useState('');

  const todayDay = getTodayDayOfWeek();
  const todayDateStr = getLocalDateString();
  const isStreakActiveToday = streakData.lastActiveDate === todayDateStr;

  // Sync with cloud on sign in
  useEffect(() => {
    if (!userId) return;
    loadWeeklyPlannerCloud(userId).then((cloudData) => {
      if (cloudData && cloudData.topics && cloudData.topics.length > 0) {
        setPlannerData(cloudData);
        saveWeeklyPlannerData(cloudData);
      }
    });
  }, [userId]);

  // Persist locally & cloud
  const updatePlanner = (updated: WeeklyPlannerData) => {
    setPlannerData(updated);
    saveWeeklyPlannerData(updated);
    if (userId) {
      saveWeeklyPlannerCloud(userId, updated);
    }
  };

  // Metrics
  const completedTopicsCount = useMemo(
    () => plannerData.topics.filter((t) => t.isCompleted).length,
    [plannerData.topics]
  );
  const totalTopicsCount = plannerData.topics.length;
  const completionPercentage = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;

  // Count of days that have at least one completed topic
  const completedDaysCount = useMemo(() => {
    const daysWithCompleted = new Set(
      plannerData.topics.filter((t) => t.isCompleted).map((t) => t.day)
    );
    return daysWithCompleted.size;
  }, [plannerData.topics]);

  // Handle toggling topic completion
  const handleToggleTopic = (topicId: string) => {
    const target = plannerData.topics.find((t) => t.id === topicId);
    if (!target) return;

    const willBeCompleted = !target.isCompleted;

    const updatedTopics = plannerData.topics.map((t) => {
      if (t.id === topicId) {
        return {
          ...t,
          isCompleted: willBeCompleted,
          completedAt: willBeCompleted ? new Date().toISOString() : undefined
        };
      }
      return t;
    });

    updatePlanner({
      ...plannerData,
      topics: updatedTopics,
      lastUpdated: new Date().toISOString()
    });

    if (willBeCompleted) {
      // Award streak activity & achievement
      onRecordStreakActivity('study_planner', `Completed Study Topic: ${target.title}`);
      recordAchievementActivity('problemsSolved', 2);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  // Handle deleting a topic
  const handleDeleteTopic = (topicId: string) => {
    const updated = {
      ...plannerData,
      topics: plannerData.topics.filter((t) => t.id !== topicId),
      lastUpdated: new Date().toISOString()
    };
    updatePlanner(updated);
  };

  // Handle adding new topic
  const handleAddTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const newTopic: ScheduledTopic = {
      id: `top_${Date.now()}`,
      day: targetAddDay,
      title: newTopicTitle.trim(),
      grade: newTopicGrade,
      pillar: newTopicPillar,
      estimatedMinutes: Number(newTopicMinutes) || 20,
      priority: newTopicPriority,
      isCompleted: false,
      notes: newTopicNotes.trim() || undefined
    };

    updatePlanner({
      ...plannerData,
      topics: [...plannerData.topics, newTopic],
      lastUpdated: new Date().toISOString()
    });

    setNewTopicTitle('');
    setNewTopicNotes('');
    setIsAddTopicModalOpen(false);
  };

  // Handle adding new quiz reminder
  const handleAddReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle.trim()) return;

    const newRem: QuizReminder = {
      id: `rem_${Date.now()}`,
      title: newReminderTitle.trim(),
      grade: newReminderGrade,
      pillar: newReminderPillar,
      scheduledDate: newReminderDate,
      scheduledTime: newReminderTime,
      isDismissed: false,
      isCompleted: false,
      notes: newReminderNotes.trim() || undefined
    };

    updatePlanner({
      ...plannerData,
      quizReminders: [...plannerData.quizReminders, newRem],
      lastUpdated: new Date().toISOString()
    });

    setNewReminderTitle('');
    setNewReminderNotes('');
    setIsAddReminderModalOpen(false);
  };

  // Handle completing / dismissing reminder
  const handleDismissReminder = (remId: string) => {
    const updated = {
      ...plannerData,
      quizReminders: plannerData.quizReminders.filter((r) => r.id !== remId),
      lastUpdated: new Date().toISOString()
    };
    updatePlanner(updated);
  };

  // Apply quick routine preset
  const handleApplyPreset = (presetName: string) => {
    let newPlan: WeeklyPlannerData;
    if (presetName === 'olympiad') {
      newPlan = {
        ...getDefaultWeeklyPlanner(currentGrade),
        topics: [
          {
            id: 'top_1',
            day: 'Monday',
            title: `SOF IMO Class ${currentGrade} Chapter 1 & 2 Concept Review`,
            grade: currentGrade,
            pillar: 'olympiad',
            estimatedMinutes: 30,
            priority: 'high',
            isCompleted: false
          },
          {
            id: 'top_2',
            day: 'Tuesday',
            title: `Achievers Section 2-Mark HOTS Cryptarithmetic Puzzles`,
            grade: currentGrade,
            pillar: 'olympiad',
            estimatedMinutes: 35,
            priority: 'high',
            isCompleted: false
          },
          {
            id: 'top_3',
            day: 'Wednesday',
            title: `Geometry Perimeter Unfolding & Symmetry Tricks`,
            grade: currentGrade,
            pillar: 'olympiad',
            estimatedMinutes: 25,
            priority: 'medium',
            isCompleted: false
          },
          {
            id: 'top_4',
            day: 'Thursday',
            title: `Number Sense Cyclicity Modulo 4 & Last Digit Powers`,
            grade: currentGrade,
            pillar: 'olympiad',
            estimatedMinutes: 30,
            priority: 'high',
            isCompleted: false
          },
          {
            id: 'top_5',
            day: 'Friday',
            title: `Full SOF IMO 2023-24 Previous Year Paper Solving`,
            grade: currentGrade,
            pillar: 'olympiad',
            estimatedMinutes: 45,
            priority: 'high',
            isCompleted: false
          },
          {
            id: 'top_6',
            day: 'Saturday',
            title: `Spaced Repetition Review for Weak Stumbled Concepts`,
            grade: currentGrade,
            pillar: 'basic_maths',
            estimatedMinutes: 20,
            priority: 'medium',
            isCompleted: false
          },
          {
            id: 'top_7',
            day: 'Sunday',
            title: `Timed Speed Olympiad Sprint Contest (10 Questions)`,
            grade: currentGrade,
            pillar: 'olympiad',
            estimatedMinutes: 20,
            priority: 'high',
            isCompleted: false
          }
        ]
      };
    } else {
      newPlan = getDefaultWeeklyPlanner(currentGrade);
    }
    updatePlanner(newPlan);
  };

  const getPillarBadgeStyle = (pillar: ScheduledTopic['pillar']) => {
    switch (pillar) {
      case 'algebra':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'abacus':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'vedic_maths':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'olympiad':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'cbse':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner: Study Consistency & Streak Integration */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden space-y-6">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Consistency Planner</span>
              </span>
              <span className="text-xs text-slate-400">Class {currentGrade}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Weekly Study &amp; Quiz Planner
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Plan your daily mathematical topics, set timed quiz reminders, and complete scheduled drills to automatically power your continuous learning streak.
            </p>
          </div>

          {/* Integrated Streak & Consistency Tracker */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 flex items-center gap-5 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg relative shrink-0">
              <Flame className="w-8 h-8 fill-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-mono text-white">
                  {streakData.currentStreak} Day{streakData.currentStreak !== 1 ? 's' : ''}
                </span>
                {isStreakActiveToday ? (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                    Active Today
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    Goal Pending
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {isStreakActiveToday
                  ? 'Streak preserved! Great job today.'
                  : 'Complete any study topic below to keep your streak!'}
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Consistency Progress Bar & Quick Presets */}
        <div className="pt-4 border-t border-indigo-900/80 grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative z-10">
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-indigo-200">
                Weekly Schedule Progress: {completedTopicsCount} / {totalTopicsCount} Topics ({completionPercentage}%)
              </span>
              <span className="text-amber-300 font-mono">{completedDaysCount} of 7 Days Active</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(3, completionPercentage))}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 text-xs">
            <span className="text-slate-400 font-bold">Apply Preset:</span>
            <button
              onClick={() => handleApplyPreset('balanced')}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer border border-white/10"
            >
              4 Pillars Core
            </button>
            <button
              onClick={() => handleApplyPreset('olympiad')}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold transition-colors cursor-pointer border border-rose-400/30"
            >
              Olympiad Sprint
            </button>
          </div>
        </div>
      </div>

      {/* SECTION: UPCOMING QUIZ & CONTEST REMINDERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Upcoming Quiz &amp; Contest Reminders</h3>
              <p className="text-xs text-slate-500">
                Set scheduled dates for your milestone quizzes and mock competitions.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddReminderModalOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Quiz Reminder</span>
          </button>
        </div>

        {plannerData.quizReminders.length === 0 ? (
          <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-medium">No quiz reminders scheduled. Click above to schedule one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {plannerData.quizReminders.map((rem) => {
              const isToday = rem.scheduledDate === todayDateStr;
              const isPast = rem.scheduledDate < todayDateStr;

              return (
                <div
                  key={rem.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isToday
                      ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                      : isPast
                      ? 'bg-slate-50 border-slate-200 opacity-70'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 truncate">
                        {rem.title}
                      </span>
                      {isToday && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase animate-pulse">
                          Due Today
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-mono font-bold text-slate-700">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {rem.scheduledDate} {rem.scheduledTime && `@ ${rem.scheduledTime}`}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                        Class {rem.grade}
                      </span>
                    </div>

                    {rem.notes && (
                      <p className="text-[11px] text-slate-600 italic">{rem.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {rem.pillar === 'olympiad' ? (
                      <button
                        onClick={() => onNavigateToOlympiad?.(rem.grade)}
                        className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        title="Start Olympiad Mock Contest"
                      >
                        <span>Start Contest</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const targetPillar: PillarType =
                            rem.pillar === 'algebra' || rem.pillar === 'abacus' || rem.pillar === 'vedic_maths'
                              ? rem.pillar
                              : 'basic_maths';
                          onNavigateToQuiz?.(rem.grade, targetPillar);
                        }}
                        className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        title="Start Quiz Arena"
                      >
                        <span>Take Quiz</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDismissReminder(rem.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                      title="Dismiss reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION: 7-DAY INTERACTIVE WEEKLY PLANNER */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>7-Day Daily Topic Schedule</span>
            </h3>
            <p className="text-xs text-slate-500">
              Track and complete daily topics to maintain your learning consistency.
            </p>
          </div>

          {/* Day of Week Selector Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            {DAYS_OF_WEEK.map((day) => {
              const isToday = day === todayDay;
              const isSelected = day === selectedDay;
              const dayTopics = plannerData.topics.filter((t) => t.day === day);
              const isDayDone = dayTopics.length > 0 && dayTopics.every((t) => t.isCompleted);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isToday
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{day.slice(0, 3)}</span>
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                  {isDayDone && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Topics List Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black text-slate-900">{selectedDay}&apos;s Scheduled Math Topics</h4>
              {selectedDay === todayDay && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                  Today
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setTargetAddDay(selectedDay);
                setIsAddTopicModalOpen(true);
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Topic for {selectedDay}</span>
            </button>
          </div>

          {/* Topics for Selected Day */}
          {(() => {
            const dayTopics = plannerData.topics.filter((t) => t.day === selectedDay);

            if (dayTopics.length === 0) {
              return (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-bold">
                    No topics scheduled for {selectedDay}.
                  </p>
                  <button
                    onClick={() => {
                      setTargetAddDay(selectedDay);
                      setIsAddTopicModalOpen(true);
                    }}
                    className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Schedule a math topic</span>
                  </button>
                </div>
              );
            }

            return (
              <div className="space-y-3">
                {dayTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      topic.isCompleted
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => handleToggleTopic(topic.id)}
                        className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                          topic.isCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'bg-white border-slate-300 text-transparent hover:border-indigo-500'
                        }`}
                        title={topic.isCompleted ? 'Mark as incomplete' : 'Mark as completed to earn streak!'}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5
                            className={`text-sm font-bold truncate ${
                              topic.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            {topic.title}
                          </h5>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPillarBadgeStyle(
                              topic.pillar
                            )}`}
                          >
                            {topic.pillar.replace('_', ' ').toUpperCase()}
                          </span>

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            Class {topic.grade}
                          </span>
                        </div>

                        {topic.notes && (
                          <p className="text-xs text-slate-500 leading-relaxed">{topic.notes}</p>
                        )}

                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {topic.estimatedMinutes} mins
                          </span>
                          <span>•</span>
                          <span
                            className={`font-bold capitalize ${
                              topic.priority === 'high'
                                ? 'text-rose-600'
                                : topic.priority === 'medium'
                                ? 'text-amber-600'
                                : 'text-slate-500'
                            }`}
                          >
                            {topic.priority} Priority
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                      title="Delete topic"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {/* MODAL: ADD TOPIC */}
      {isAddTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-black text-slate-900">Schedule Topic for {targetAddDay}</h4>
              <button
                onClick={() => setIsAddTopicModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTopicSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Topic Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fractions Addition & Decimals"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class / Grade</label>
                  <select
                    value={newTopicGrade}
                    onChange={(e) => setNewTopicGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white cursor-pointer"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={g}>
                        Class {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pillar</label>
                  <select
                    value={newTopicPillar}
                    onChange={(e) => setNewTopicPillar(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white cursor-pointer"
                  >
                    <option value="basic_maths">Basic Maths</option>
                    <option value="algebra">Algebra</option>
                    <option value="abacus">Abacus</option>
                    <option value="vedic_maths">Vedic Maths</option>
                    <option value="olympiad">Olympiad IMO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={newTopicMinutes}
                    onChange={(e) => setNewTopicMinutes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTopicPriority}
                    onChange={(e) => setNewTopicPriority(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes / Target</label>
                <input
                  type="text"
                  placeholder="e.g. Complete worksheet 2 and review errors"
                  value={newTopicNotes}
                  onChange={(e) => setNewTopicNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTopicModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Add Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD REMINDER */}
      {isAddReminderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-black text-slate-900">Schedule Quiz Reminder</h4>
              <button
                onClick={() => setIsAddReminderModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReminderSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Quiz / Contest Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 4 Fractions Chapter Quiz"
                  value={newReminderTitle}
                  onChange={(e) => setNewReminderTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    required
                    value={newReminderDate}
                    onChange={(e) => setNewReminderDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newReminderTime}
                    onChange={(e) => setNewReminderTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={newReminderGrade}
                    onChange={(e) => setNewReminderGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white cursor-pointer"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={g}>
                        Class {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Type</label>
                  <select
                    value={newReminderPillar}
                    onChange={(e) => setNewReminderPillar(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white cursor-pointer"
                  >
                    <option value="basic_maths">Basic Maths Quiz</option>
                    <option value="algebra">Algebra Quiz</option>
                    <option value="abacus">Abacus Quiz</option>
                    <option value="vedic_maths">Vedic Maths Quiz</option>
                    <option value="olympiad">SOF IMO Contest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Aim for 90%+ score"
                  value={newReminderNotes}
                  onChange={(e) => setNewReminderNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddReminderModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Schedule Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
