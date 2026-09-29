import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  BookMarked,
  Calculator,
  Flame,
  Grid,
  Sparkles,
  Zap,
  Globe,
  Bot,
  Sliders,
  Printer,
  LogIn,
  LogOut,
  User as UserIcon,
  Headphones,
  CheckCircle2,
  Trophy,
  Calendar,
  Radio,
  Moon,
  Sun,
  BookA
} from 'lucide-react';
import { GradeLevel } from '../types/curriculum';
import { loginWithGoogle, loginAsGuest, logoutUser } from '../lib/firebase';
import { User } from 'firebase/auth';
import { StreakData } from '../types/streak';
import { getLocalDateString } from '../lib/streak';

export type AppView =
  | 'ai_agent'
  | 'curriculum'
  | 'cbse_books'
  | 'olympiad_arena'
  | 'arithmetic_lab'
  | 'tips_tricks_arena'
  | 'cbse_multiverse'
  | 'search_agent'
  | 'dynamic_solver'
  | 'abacus_tool'
  | 'vedic_tool'
  | 'algebra_tool'
  | 'weekly_planner';

interface NavbarProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onOpenProgress: () => void;
  onOpenCustomInstructions: () => void;
  onOpenLiveTutor: () => void;
  onOpenCheatSheets: () => void;
  onOpenGlossary?: () => void;
  completedQuizzesCount: number;
  currentUser: User | null;
  streakData: StreakData;
  onOpenStreak: () => void;
  onOpenPodcast?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGrade,
  onSelectGrade,
  activeView,
  setActiveView,
  onOpenProgress,
  onOpenCustomInstructions,
  onOpenLiveTutor,
  onOpenCheatSheets,
  onOpenGlossary,
  completedQuizzesCount,
  currentUser,
  streakData,
  onOpenStreak,
  onOpenPodcast,
  darkMode,
  onToggleDarkMode
}) => {
  const [authLoading, setAuthLoading] = useState(false);
  const today = getLocalDateString();
  const isStreakActiveToday = streakData.lastActiveDate === today;

  const handleSignIn = async () => {
    setAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.warn('Google sign-in canceled or failed, attempting guest login:', err);
      try {
        await loginAsGuest();
      } catch (guestErr) {
        console.error('Guest login failed:', guestErr);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logoutUser();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Wordmark & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('curriculum')}
              className="text-left group flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
                V
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent group-hover:opacity-90 transition-all">
                    Virat Maths Academy
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 text-[10px] font-extrabold uppercase">
                    K-12
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    Math, Abacus &amp; Vedic Speed
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-[10px] font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Devs: VIRAT SHANKHDHAR &amp; AADYA SHANKHDHAR
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveView('ai_agent')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'ai_agent'
                  ? 'bg-purple-600 text-white font-black shadow-xs ring-2 ring-purple-400/40'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 font-bold'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Agent</span>
            </button>

            <button
              onClick={() => setActiveView('curriculum')}
              className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeView === 'curriculum'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum</span>
            </button>

            <button
              onClick={() => setActiveView('cbse_books')}
              className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeView === 'cbse_books'
                  ? 'bg-blue-50 text-blue-800 font-bold ring-1 ring-blue-300'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="CBSE, ICSE & State Board Curriculums"
            >
              <BookMarked className="w-3.5 h-3.5 text-blue-600" />
              <span>Boards (CBSE · ICSE · State)</span>
            </button>

            <button
              onClick={() => setActiveView('olympiad_arena')}
              className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'olympiad_arena'
                  ? 'bg-amber-50 text-amber-800 font-bold ring-1 ring-amber-300'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Olympiad Arena</span>
            </button>

            <button
              onClick={() => setActiveView('arithmetic_lab')}
              className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeView === 'arithmetic_lab'
                  ? 'bg-emerald-50 text-emerald-800 font-bold ring-1 ring-emerald-300'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Speed Arithmetic</span>
            </button>

            <button
              onClick={() => setActiveView('tips_tricks_arena')}
              className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeView === 'tips_tricks_arena'
                  ? 'bg-orange-50 text-orange-800 font-bold ring-1 ring-orange-200'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span>Tips & Tricks</span>
            </button>

            <button
              onClick={() => setActiveView('cbse_multiverse')}
              className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeView === 'cbse_multiverse'
                  ? 'bg-purple-50 text-purple-800 font-bold ring-1 ring-purple-200'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>AI Solver</span>
            </button>

            <button
              onClick={() => setActiveView('weekly_planner')}
              className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeView === 'weekly_planner'
                  ? 'bg-indigo-50 text-indigo-800 font-bold ring-1 ring-indigo-200'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Study Planner</span>
            </button>
          </nav>

          {/* Zone 3: Actions, Tools, Auth */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Flow AI Podcast Studio Button */}
            {onOpenPodcast && (
              <button
                onClick={onOpenPodcast}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Open Flow AI Multi-Host Math Podcast Studio"
              >
                <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                <span className="hidden lg:inline">Flow AI Podcast</span>
              </button>
            )}

            {/* Live Voice Tutor Button */}
            <button
              onClick={onOpenLiveTutor}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open Live Voice Math Tutor (Aria)"
            >
              <Headphones className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden xl:inline">Live Voice Tutor</span>
            </button>

            {/* Math Concept Glossary Quick Launch */}
            {onOpenGlossary && (
              <button
                onClick={onOpenGlossary}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent dark:border-slate-700"
                title="Open Math Concept Glossary (Definitions & Visual Models)"
              >
                <BookA className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden xl:inline">Glossary</span>
              </button>
            )}

            {/* Cheat Sheets Quick Launch */}
            <button
              onClick={onOpenCheatSheets}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent dark:border-slate-700"
              title="View Visual Cheat Sheets & Formulas"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="hidden xl:inline">Cheat Sheets</span>
            </button>

            {/* Custom Instructions */}
            <button
              onClick={onOpenCustomInstructions}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent dark:border-slate-700"
              title="Configure AI Custom Instructions"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden xl:inline">Custom Instructions</span>
            </button>

            {/* Class Dropdown */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl p-1">
              <label htmlFor="grade-select" className="text-[11px] font-bold text-slate-500 dark:text-slate-400 pl-1.5">
                Class:
              </label>
              <select
                id="grade-select"
                value={currentGrade}
                onChange={(e) => onSelectGrade(Number(e.target.value) as GradeLevel)}
                className="bg-white dark:bg-slate-900 text-xs font-extrabold text-slate-900 dark:text-slate-100 rounded-lg py-1 px-2 shadow-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    Class {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Global Dark Mode / Late-Night Study Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700 shadow-2xs group"
                title={darkMode ? "Switch to Light Mode (Day Study)" : "Switch to Dark Mode (Late-Night Studying)"}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:rotate-45 transition-transform" />
                    <span className="hidden xl:inline text-amber-300 font-extrabold">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:-rotate-12 transition-transform" />
                    <span className="hidden xl:inline text-slate-600 dark:text-slate-300 font-extrabold">Night</span>
                  </>
                )}
              </button>
            )}

            {/* Student Progress Badge */}
            <button
              onClick={onOpenProgress}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 rounded-xl transition-colors cursor-pointer"
              title="Student Progress & Badges"
            >
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-mono bg-amber-200/80 dark:bg-amber-800/80 text-amber-900 dark:text-amber-100 px-1.5 py-0.2 rounded text-[11px]">
                {completedQuizzesCount}
              </span>
            </button>

            {/* Daily Learning Streak Counter */}
            <button
              onClick={onOpenStreak}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-xs group ${
                isStreakActiveToday
                  ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 border-orange-300 text-orange-950 hover:border-orange-400 hover:shadow-orange-200/50'
                  : streakData.currentStreak > 0
                  ? 'bg-amber-50/80 border-dashed border-amber-300 text-amber-900 hover:bg-amber-100'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-orange-50/60 dark:hover:bg-orange-950/40 hover:text-orange-900 dark:hover:text-orange-200 hover:border-orange-200 dark:hover:border-orange-700'
              }`}
              title={
                isStreakActiveToday
                  ? `${streakData.currentStreak} Day Learning Streak! Active today! Click to view daily quest & calendar.`
                  : streakData.currentStreak > 0
                  ? `${streakData.currentStreak} Day Learning Streak! Practice today to keep it going!`
                  : 'Start your Daily Learning Streak! Click to view daily rewards.'
              }
            >
              <div className="relative flex items-center justify-center">
                <Flame
                  className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                    isStreakActiveToday
                      ? 'text-orange-500 fill-orange-500 animate-pulse drop-shadow-xs'
                      : streakData.currentStreak > 0
                      ? 'text-amber-500 fill-amber-500/40'
                      : 'text-slate-400 group-hover:text-orange-500'
                  }`}
                />
                {isStreakActiveToday && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white dark:ring-slate-900" />
                )}
              </div>
              <div className="flex items-center gap-1 font-mono">
                <span
                  className={`text-[12px] font-black ${
                    isStreakActiveToday ? 'text-orange-700 dark:text-orange-300' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {streakData.currentStreak}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
                  {streakData.currentStreak === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              {!isStreakActiveToday && streakData.currentStreak > 0 && (
                <span className="hidden xl:inline text-[9px] font-extrabold uppercase px-1 py-0.2 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 animate-pulse">
                  Due
                </span>
              )}
            </button>

            {/* User Profile / Google Sign-In */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200 dark:border-slate-800">
                <div
                  className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs"
                  title={currentUser.displayName || currentUser.email || 'User'}
                >
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={authLoading}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors shadow-xs cursor-pointer border border-transparent dark:border-slate-700"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Mobile Horizontal Bar */}
        <div className="lg:hidden flex items-center gap-2 py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto text-xs font-bold text-slate-600 dark:text-slate-300 scrollbar-none">
          {/* Mobile Dark Mode Toggle */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 shrink-0 cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Night</span>
                </>
              )}
            </button>
          )}

          {/* Mobile Glossary Button */}
          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0 cursor-pointer"
            >
              <BookA className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              <span>Glossary</span>
            </button>
          )}

          <button
            onClick={onOpenStreak}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold shrink-0 ${
              isStreakActiveToday
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs'
                : 'bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current text-white" />
            <span>{streakData.currentStreak}d Streak</span>
          </button>

          <button
            onClick={() => setActiveView('ai_agent')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 ${
              activeView === 'ai_agent' ? 'bg-purple-600 text-white' : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
            }`}
          >
            <Bot className="w-3 h-3" />
            <span>AI Agent</span>
          </button>

          {onOpenPodcast && (
            <button
              onClick={onOpenPodcast}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-700 shadow-2xs"
            >
              <Radio className="w-3 h-3 text-purple-600 animate-pulse" />
              <span>🎙️ Flow AI Podcast</span>
            </button>
          )}

          <button
            onClick={() => setActiveView('curriculum')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'curriculum' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveView('cbse_books')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'cbse_books' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            📚 CBSE · ICSE · State
          </button>
          <button
            onClick={() => setActiveView('olympiad_arena')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'olympiad_arena' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            🏆 Olympiad Arena
          </button>
          <button
            onClick={() => setActiveView('arithmetic_lab')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'arithmetic_lab' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            ⚡ Speed Arithmetic
          </button>
          <button
            onClick={() => setActiveView('tips_tricks_arena')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'tips_tricks_arena' ? 'bg-orange-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Tips & Tricks
          </button>
          <button
            onClick={() => setActiveView('cbse_multiverse')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'cbse_multiverse' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            AI Solver
          </button>
          <button
            onClick={() => setActiveView('search_agent')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'search_agent' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Live Search
          </button>
          <button
            onClick={() => setActiveView('dynamic_solver')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'dynamic_solver' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Step Solver
          </button>
          <button
            onClick={() => setActiveView('weekly_planner')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg flex items-center gap-1 shrink-0 ${
              activeView === 'weekly_planner' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Study Planner</span>
          </button>
          <button
            onClick={() => setActiveView('abacus_tool')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'abacus_tool' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Abacus
          </button>
          <button
            onClick={() => setActiveView('vedic_tool')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'vedic_tool' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Vedic Lab
          </button>
          <button
            onClick={() => setActiveView('algebra_tool')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg shrink-0 ${
              activeView === 'algebra_tool' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            Balance Scale
          </button>
        </div>
      </div>
    </header>
  );
};
