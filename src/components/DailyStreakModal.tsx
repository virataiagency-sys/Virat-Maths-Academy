import React, { useState } from 'react';
import {
  X,
  Flame,
  Zap,
  Award,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Calendar,
  Star
} from 'lucide-react';
import { StreakData } from '../types/streak';
import {
  getWeeklyTracker,
  getStreakMilestones,
  getStreakEncouragement,
  getLocalDateString
} from '../lib/streak';
import { AppView } from './Navbar';

interface DailyStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakData: StreakData;
  onClaimDailyCheckin: () => void;
  onNavigateView: (view: AppView) => void;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({
  isOpen,
  onClose,
  streakData,
  onClaimDailyCheckin,
  onNavigateView
}) => {
  if (!isOpen) return null;

  const [claimSuccess, setClaimSuccess] = useState(false);
  const today = getLocalDateString();
  const isActiveToday = streakData.lastActiveDate === today;
  const weeklyDays = getWeeklyTracker(streakData.activeDates);
  const milestones = getStreakMilestones(streakData.longestStreak);
  const encouragement = getStreakEncouragement(streakData.currentStreak, isActiveToday);

  const handleClaim = () => {
    onClaimDailyCheckin();
    setClaimSuccess(true);
    setTimeout(() => {
      setClaimSuccess(false);
    }, 4000);
  };

  const handleStartTask = (view: AppView) => {
    onNavigateView(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close Streak Dashboard"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Flame Celebration Header */}
        <div className="text-center pt-2 pb-5 border-b border-slate-100">
          <div className="relative inline-flex items-center justify-center mb-3">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isActiveToday
                ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-300/50 scale-105'
                : 'bg-gradient-to-tr from-slate-200 to-amber-200 text-amber-700'
            }`}>
              <Flame className={`w-11 h-11 ${isActiveToday ? 'animate-bounce text-white drop-shadow-md' : 'text-amber-600'}`} />
            </div>

            {/* Glowing ring if active */}
            {isActiveToday && (
              <span className="absolute inset-0 rounded-full ring-4 ring-orange-300/50 animate-ping pointer-events-none" />
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {streakData.currentStreak}
            </h2>
            <span className="text-xl font-extrabold text-slate-700">
              {streakData.currentStreak === 1 ? 'Day Learning Streak' : 'Days Learning Streak'}
            </span>
          </div>

          <p className="text-xs font-bold text-slate-500 max-w-md mx-auto">
            {encouragement.subtext}
          </p>

          {/* Status Chip */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            {isActiveToday ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Streak Active Today!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-orange-100 text-orange-800 border border-orange-300 animate-pulse">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                Daily Practice Pending
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              All-Time Best: {streakData.longestStreak} {streakData.longestStreak === 1 ? 'Day' : 'Days'}
            </span>

            {streakData.streakShieldAvailable && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200" title="Grace protection enabled: Keeps streak safe for 1 missed day">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Shield Ready
              </span>
            )}
          </div>
        </div>

        {/* Weekly Calendar Track (Mon - Sun) */}
        <div className="py-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>This Week's Activity</span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              {streakData.activeDates?.length || 0} Total Active Days
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeklyDays.map((day) => (
              <div
                key={day.dateStr}
                className={`flex flex-col items-center py-2.5 px-1 rounded-2xl border text-center transition-all ${
                  day.isToday
                    ? day.isActive
                      ? 'bg-gradient-to-b from-orange-50 to-amber-50 border-orange-300 shadow-xs ring-2 ring-orange-200'
                      : 'bg-amber-50/50 border-dashed border-amber-300 ring-1 ring-amber-200'
                    : day.isActive
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-[10px] font-extrabold text-slate-500 mb-1">
                  {day.fullDayName}
                </span>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs my-0.5 ${
                  day.isActive
                    ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-xs'
                    : day.isToday
                    ? 'bg-white text-orange-600 border border-orange-300'
                    : 'bg-slate-200/70 text-slate-500'
                }`}>
                  {day.isActive ? (
                    <Flame className="w-4 h-4 fill-white" />
                  ) : (
                    <span>{day.dayNumber}</span>
                  )}
                </div>

                <span className={`text-[10px] font-semibold mt-1 ${
                  day.isActive
                    ? 'text-emerald-700'
                    : day.isToday
                    ? 'text-orange-600 font-extrabold'
                    : 'text-slate-400'
                }`}>
                  {day.isActive ? 'Done' : day.isToday ? 'Today' : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Claim / Check-In Action Card */}
        <div className="py-4 border-b border-slate-100">
          {!isActiveToday ? (
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 p-4 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  Lock In Today's Streak!
                </h4>
                <p className="text-xs text-orange-100 mt-0.5">
                  Click to log today's check-in and power up your daily streak immediately!
                </p>
              </div>

              <button
                onClick={handleClaim}
                className="w-full sm:w-auto px-4 py-2 bg-white text-orange-900 hover:bg-orange-50 font-extrabold text-xs rounded-xl shadow-xs transition-all transform active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
                <span>Claim Check-In (+1 Day)</span>
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-900">
                    Today's Streak Secured!
                  </h4>
                  <p className="text-[11px] text-emerald-700">
                    You've practiced today. Return tomorrow to build your {streakData.currentStreak + 1}-day streak!
                  </p>
                </div>
              </div>

              <button
                onClick={handleClaim}
                className="px-2.5 py-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Log Extra Activity
              </button>
            </div>
          )}

          {claimSuccess && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold text-center shadow-xs animate-in slide-in-from-top duration-200 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Great job! Today's streak was registered. Keep up the brilliant daily habit!</span>
            </div>
          )}
        </div>

        {/* Daily Quests to Keep Streak Surging */}
        <div className="py-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Ways to Earn &amp; Strengthen Your Streak</span>
            </h4>
          </div>

          <div className="space-y-2">
            <div
              onClick={() => handleStartTask('curriculum')}
              className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                  🎯
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Complete 1 Curriculum Quiz
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Test your concept mastery across 4 pillars in your current Class
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
            </div>

            <div
              onClick={() => handleStartTask('arithmetic_lab')}
              className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                  ⚡
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    60-Second Speed Drill
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Lightning mental arithmetic with Vedic &amp; Soroban shortcuts
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
            </div>

            <div
              onClick={() => handleStartTask('cbse_multiverse')}
              className="p-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                  🪄
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    Ask AI Problem Solver
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Deep multi-agent step breakdown from Class 1 to 12
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Streak Milestones */}
        <div className="pt-4">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Streak Milestones &amp; Honors</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5">
            {milestones.map((m) => (
              <div
                key={m.days}
                className={`p-3 rounded-xl border transition-all ${
                  m.unlocked
                    ? 'bg-amber-50/60 border-amber-300'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-slate-900">
                    {m.title}
                  </span>
                  {m.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600">✓ Achieved</span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">{m.days}d goal</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-600">{m.reward}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
