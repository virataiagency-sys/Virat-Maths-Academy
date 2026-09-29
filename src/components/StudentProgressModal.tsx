import React, { useState } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  Star,
  Flame,
  Trophy,
  RotateCcw,
  Calendar,
  ChevronRight,
  Brain,
  Clock,
  Zap,
  Sliders,
  Sparkles,
  Grid,
  Lock,
  User as UserIcon,
  ShieldCheck,
  Medal
} from 'lucide-react';
import { GradeLevel } from '../types/curriculum';
import { gradeList } from '../data/curriculumData';
import { StreakData } from '../types/streak';
import { getLocalDateString } from '../lib/streak';
import { loadSpacedRepetitionData, isQuestionDue } from '../lib/spacedRepetition';
import {
  getAllBadges,
  getUserStats,
  getTotalAchievementPoints,
  BADGE_DEFINITIONS
} from '../lib/achievements';
import { BadgeAchievement, TrophyTier, AchievementCategory } from '../types/achievements';
import { User } from 'firebase/auth';

interface StudentProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedQuizzes: Record<string, number>; // key: `${grade}_${pillar}`, value: score
  onResetProgress: () => void;
  streakData?: StreakData;
  onOpenStreakModal?: () => void;
  currentUser?: User | null;
}

export const StudentProgressModal: React.FC<StudentProgressModalProps> = ({
  isOpen,
  onClose,
  completedQuizzes,
  onResetProgress,
  streakData,
  onOpenStreakModal,
  currentUser
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const totalCompleted = Object.keys(completedQuizzes).length;
  const maxPossibleQuizzes = 12 * 4; // 12 classes * 4 pillars = 48
  const completionPercentage = Math.round((totalCompleted / maxPossibleQuizzes) * 100);
  const today = getLocalDateString();
  const isStreakActiveToday = streakData?.lastActiveDate === today;

  // Retrieve user achievements & stats
  const stats = getUserStats();
  // Sync streak if passed
  if (streakData) {
    stats.currentStreak = Math.max(stats.currentStreak, streakData.currentStreak);
    stats.longestStreak = Math.max(stats.longestStreak, streakData.longestStreak);
  }
  const allBadges = getAllBadges(stats);
  const unlockedBadges = allBadges.filter((b) => b.isUnlocked);
  const totalPoints = getTotalAchievementPoints(allBadges);

  // Trophy Tier Counts
  const diamondCount = unlockedBadges.filter((b) => b.tier === 'diamond').length;
  const goldCount = unlockedBadges.filter((b) => b.tier === 'gold').length;
  const silverCount = unlockedBadges.filter((b) => b.tier === 'silver').length;
  const bronzeCount = unlockedBadges.filter((b) => b.tier === 'bronze').length;

  // Filtered badges
  const filteredBadges = allBadges.filter((b) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'unlocked') return b.isUnlocked;
    if (selectedCategory === 'streak') return b.category === 'streak';
    if (selectedCategory === 'problems') return b.category === 'problems';
    if (selectedCategory === 'topics')
      return ['algebra', 'abacus', 'vedic', 'olympiad', 'retention'].includes(b.category);
    return true;
  });

  // Render icon helper
  const renderBadgeIcon = (iconName: string, tier: TrophyTier, isUnlocked: boolean) => {
    const iconClass = `w-6 h-6 ${isUnlocked ? 'text-white' : 'text-slate-400'}`;
    switch (iconName) {
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Trophy':
        return <Trophy className={iconClass} />;
      case 'Award':
        return <Award className={iconClass} />;
      case 'Sliders':
        return <Sliders className={iconClass} />;
      case 'Grid':
        return <Grid className={iconClass} />;
      case 'Brain':
        return <Brain className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

  const getTierBadgeStyle = (tier: TrophyTier, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        bg: 'bg-slate-100 border-slate-300 text-slate-500',
        iconBg: 'bg-slate-200',
        label: 'Locked',
        pill: 'bg-slate-200 text-slate-600'
      };
    }
    switch (tier) {
      case 'diamond':
        return {
          bg: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border-cyan-300 shadow-md ring-1 ring-cyan-400/30',
          iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-300/50',
          label: '💎 Diamond Trophy',
          pill: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black'
        };
      case 'gold':
        return {
          bg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-300 shadow-md ring-1 ring-amber-400/30',
          iconBg: 'bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-300/50',
          label: '🥇 Gold Trophy',
          pill: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black'
        };
      case 'silver':
        return {
          bg: 'bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100 border-slate-300 shadow-sm ring-1 ring-slate-400/20',
          iconBg: 'bg-gradient-to-br from-slate-400 to-slate-600 shadow-slate-300/50',
          label: '🥈 Silver Trophy',
          pill: 'bg-slate-700 text-white font-bold'
        };
      case 'bronze':
        return {
          bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-stone-50 border-orange-200 shadow-xs',
          iconBg: 'bg-gradient-to-br from-amber-700 to-orange-800 shadow-orange-300/50',
          label: '🥉 Bronze Trophy',
          pill: 'bg-amber-800 text-amber-100 font-bold'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header with User Info */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md">
              {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'M'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {currentUser?.displayName || 'Mathemagix Student'}
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {currentUser ? 'Signed In' : 'Guest Account'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {currentUser?.email || 'Local Profile & Achievement Showcase'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trophy Points & Digital Trophy Showcase Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                Mathemagix Achievement Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                  {totalPoints.toLocaleString()}
                </span>
                <span className="text-xs text-amber-200 font-bold uppercase">XP Points</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-indigo-200 font-medium block">Trophies Earned</span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                {unlockedBadges.length} / {allBadges.length}
              </span>
            </div>
          </div>

          {/* Trophy Tier Medals Count */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-indigo-900/80 relative z-10">
            <div className="p-2 bg-white/10 rounded-xl text-center backdrop-blur-xs">
              <span className="text-sm block">💎</span>
              <span className="text-[11px] font-extrabold text-cyan-300 block">{diamondCount} Diamond</span>
            </div>
            <div className="p-2 bg-white/10 rounded-xl text-center backdrop-blur-xs">
              <span className="text-sm block">🥇</span>
              <span className="text-[11px] font-extrabold text-amber-300 block">{goldCount} Gold</span>
            </div>
            <div className="p-2 bg-white/10 rounded-xl text-center backdrop-blur-xs">
              <span className="text-sm block">🥈</span>
              <span className="text-[11px] font-extrabold text-slate-300 block">{silverCount} Silver</span>
            </div>
            <div className="p-2 bg-white/10 rounded-xl text-center backdrop-blur-xs">
              <span className="text-sm block">🥉</span>
              <span className="text-[11px] font-extrabold text-amber-200 block">{bronzeCount} Bronze</span>
            </div>
          </div>
        </div>

        {/* Daily Learning Streak Banner */}
        {streakData && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border border-orange-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isStreakActiveToday
                    ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-xs'
                    : 'bg-orange-100 text-orange-600'
                }`}
              >
                <Flame className={`w-6 h-6 ${isStreakActiveToday ? 'fill-white animate-pulse' : ''}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900 font-mono">
                    {streakData.currentStreak} Day{streakData.currentStreak !== 1 ? 's' : ''} Streak
                  </span>
                  {isStreakActiveToday && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Active Today!
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Longest Streak: <span className="font-bold text-slate-800">{streakData.longestStreak} days</span> · Total Active: {streakData.totalDaysActive} days
                </p>
              </div>
            </div>

            {onOpenStreakModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenStreakModal();
                }}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Streak Quest</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* BADGES & DIGITAL TROPHIES SECTION */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Badges & Digital Trophies</span>
              </h4>
              <p className="text-xs text-slate-500">
                Unlock exclusive trophies by reaching milestones in streaks, problem solving, and topics.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All' },
                { id: 'unlocked', label: `Unlocked (${unlockedBadges.length})` },
                { id: 'streak', label: 'Streaks' },
                { id: 'problems', label: 'Problems' },
                { id: 'topics', label: 'Topics' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredBadges.map((badge) => {
              const styles = getTierBadgeStyle(badge.tier, badge.isUnlocked);
              const progressPct = Math.round((badge.currentProgress / badge.targetValue) * 100);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${styles.bg}`}
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${styles.iconBg}`}
                    >
                      {renderBadgeIcon(badge.iconName, badge.tier, badge.isUnlocked)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h5 className="font-extrabold text-sm text-slate-900 truncate">
                          {badge.title}
                        </h5>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${styles.pill}`}>
                          +{badge.points} XP
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-slate-500 block mb-1">
                        {styles.label}
                      </span>
                      <p className="text-xs text-slate-600 leading-snug line-clamp-2">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress or Unlock Status */}
                  <div className="pt-2 border-t border-slate-200/60">
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="text-slate-600">
                        {badge.isUnlocked ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-extrabold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Milestone Achieved!</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            Progress: {badge.currentProgress} / {badge.targetValue}
                          </span>
                        )}
                      </span>
                      <span className="font-mono font-bold text-slate-700">{progressPct}%</span>
                    </div>

                    <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          badge.isUnlocked
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            : 'bg-indigo-600'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(badge.isUnlocked ? 100 : 4, progressPct))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Spaced Repetition Memory Retention Card */}
        {(() => {
          const spacedData = loadSpacedRepetitionData();
          const items = Object.values(spacedData);
          const totalTracked = items.length;
          const masteredCount = items.filter((i) => i.retentionLevel === 'mastered').length;
          const dueCount = items.filter((i) => isQuestionDue(i)).length;

          return (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-extrabold text-indigo-950">
                    Spaced Repetition Memory Vault
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-white text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                  SM-2 Active
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/80 p-2 rounded-xl border border-indigo-100/70">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Tracked</span>
                  <span className="font-extrabold text-slate-900 font-mono">{totalTracked}</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-indigo-100/70">
                  <span className="block text-[10px] font-bold text-rose-500 uppercase">Due Today</span>
                  <span className="font-extrabold text-rose-600 font-mono">{dueCount}</span>
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-indigo-100/70">
                  <span className="block text-[10px] font-bold text-emerald-500 uppercase">Mastered</span>
                  <span className="font-extrabold text-emerald-700 font-mono">{masteredCount}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Global Curriculum Completion */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Curriculum Progress (Classes 1 - 12)</span>
            <span className="text-indigo-600 font-mono">
              {totalCompleted} / {maxPossibleQuizzes} Units ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(2, completionPercentage))}%` }}
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onResetProgress}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Curriculum Progress</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
