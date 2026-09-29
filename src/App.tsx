/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GradeLevel, PillarType } from './types/curriculum';
import { allGradesData, getGradeCurriculum } from './data/curriculumData';
import { Navbar, AppView } from './components/Navbar';
import { ClassSelector } from './components/ClassSelector';
import { PillarSelector } from './components/PillarSelector';
import { DimensionTabs, DimensionType } from './components/DimensionTabs';
import { FlowchartViewer } from './components/FlowchartViewer';
import { InfographicsViewer } from './components/InfographicsViewer';
import { TipsTricksViewer } from './components/TipsTricksViewer';
import { QuizArena } from './components/QuizArena';
import { VirtualAbacus } from './components/VirtualAbacus';
import { VedicCalculator } from './components/VedicCalculator';
import { AlgebraBalanceVisualizer } from './components/AlgebraBalanceVisualizer';
import { StudentProgressModal } from './components/StudentProgressModal';
import { DedicatedTipsTricksSection } from './components/DedicatedTipsTricksSection';
import { CBSEMultiverseSolver } from './components/CBSEMultiverseSolver';
import { CBSEChapterwiseExplorer } from './components/CBSEChapterwiseExplorer';
import { OlympiadArena } from './components/OlympiadArena';
import { ArithmeticMasteryLab } from './components/ArithmeticMasteryLab';
import { GoogleSearchAgent } from './components/GoogleSearchAgent';
import { DynamicProblemSolver } from './components/DynamicProblemSolver';
import { CustomInstructionsModal } from './components/CustomInstructionsModal';
import { LiveVoiceTutorModal } from './components/LiveVoiceTutorModal';
import { CheatSheetInfographicsModal } from './components/CheatSheetInfographicsModal';
import { DailyStreakModal } from './components/DailyStreakModal';
import { WeeklyStudyPlanner } from './components/WeeklyStudyPlanner';
import { AIAgentWorkspace } from './components/AIAgentWorkspace';
import { FloatingAgentDrawer } from './components/FloatingAgentDrawer';
import { FlowAIPodcastModal } from './components/FlowAIPodcastModal';
import { MathGlossaryModal } from './components/MathGlossaryModal';
import { loadWeeklyPlannerData, saveWeeklyPlannerData, saveWeeklyPlannerCloud } from './lib/planner';
import { AchievementToast } from './components/AchievementToast';
import { BadgeAchievement } from './types/achievements';
import { recordAchievementActivity } from './lib/achievements';
import { StreakData, DailyActivityItem } from './types/streak';
import { loadLocalStreak, saveLocalStreak, recordDailyActivity, evaluateStreak } from './lib/streak';
import {
  auth,
  onAuthStateChanged,
  User,
  loadUserInstructions,
  CustomInstructionsData,
  saveQuizScore,
  saveUserStreak,
  loadUserStreak
} from './lib/firebase';
import {
  BookOpen,
  Grid,
  Flame,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Award,
  Zap,
  Globe,
  CheckCircle2,
  Headphones,
  Printer,
  Sliders,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(4);
  const [activePillar, setActivePillar] = useState<PillarType>('basic_maths');
  const [activeDimension, setActiveDimension] = useState<DimensionType>('flowchart');
  const [activeView, setActiveView] = useState<AppView>('curriculum');
  const [aiSolverInitialProblem, setAiSolverInitialProblem] = useState<string>('');
  const [aiSolverInitialChapter, setAiSolverInitialChapter] = useState<string>('');

  // Modals state
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [isCustomInstructionsOpen, setIsCustomInstructionsOpen] = useState(false);
  const [isLiveTutorOpen, setIsLiveTutorOpen] = useState(false);
  const [isCheatSheetsOpen, setIsCheatSheetsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isPodcastStudioOpen, setIsPodcastStudioOpen] = useState(false);
  const [podcastStudioProblem, setPodcastStudioProblem] = useState<string>('');

  // Daily Streak State
  const [streakData, setStreakData] = useState<StreakData>(() => loadLocalStreak());
  const [unlockedToastBadge, setUnlockedToastBadge] = useState<BadgeAchievement | null>(null);

  // Auth & User state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customInstructions, setCustomInstructions] = useState<CustomInstructionsData | null>(() => {
    try {
      const saved = localStorage.getItem('mathemagix_custom_instructions');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Track completed quizzes
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mathemagix_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Load custom instructions from Firestore with local fallback
          const instructions = await loadUserInstructions(user.uid);
          if (instructions) {
            setCustomInstructions(instructions);
          }
        } catch (e) {
          console.warn('Could not load user instructions from network, keeping local cache:', e);
        }

        try {
          // Sync streak with Firestore
          const cloudStreak = await loadUserStreak(user.uid);
          if (cloudStreak) {
            setStreakData((prev) => {
              const currentStreak = Math.max(prev.currentStreak, cloudStreak.currentStreak || 0);
              const longestStreak = Math.max(prev.longestStreak, cloudStreak.longestStreak || 0);
              const combinedDates = Array.from(
                new Set([...(prev.activeDates || []), ...(cloudStreak.activeDates || [])])
              ).sort();
              const merged: StreakData = {
                ...prev,
                ...cloudStreak,
                currentStreak,
                longestStreak,
                activeDates: combinedDates,
              };
              const { normalizedData } = evaluateStreak(merged);
              saveLocalStreak(normalizedData);
              return normalizedData;
            });
          } else {
            // First time login with existing local streak
            saveUserStreak(user.uid, streakData).catch(() => {});
          }
        } catch (err) {
          console.warn('Could not sync streak with cloud (offline/queued):', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Save progress locally
  useEffect(() => {
    try {
      localStorage.setItem('mathemagix_progress', JSON.stringify(completedQuizzes));
    } catch {}
  }, [completedQuizzes]);

  // Global Dark Mode Theme State (Night study mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      console.warn('Error syncing theme:', e);
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Record Daily Learning Activity
  const handleRecordStreakActivity = (type: DailyActivityItem['type'], title: string) => {
    setStreakData((prev) => {
      const { updatedData } = recordDailyActivity(prev, { type, title });
      if (currentUser) {
        saveUserStreak(currentUser.uid, updatedData).catch(() => {});
      }
      // Record Streak Milestones for Badges
      const { newlyUnlocked } = recordAchievementActivity('currentStreak', updatedData.currentStreak);
      recordAchievementActivity('longestStreak', updatedData.longestStreak);
      if (newlyUnlocked.length > 0) {
        setUnlockedToastBadge(newlyUnlocked[0]);
      }
      return updatedData;
    });
  };

  const handleQuizComplete = (score: number, total: number) => {
    const key = `${currentGrade}_${activePillar}`;
    setCompletedQuizzes((prev) => ({
      ...prev,
      [key]: Math.max(prev[key] || 0, score),
    }));

    // Record streak advancement for completing learning quiz
    handleRecordStreakActivity('quiz', `Class ${currentGrade} Quiz: ${activePillar}`);

    // Record Problem Solving & Quiz Milestones
    const { newlyUnlocked: problemsUnlocked } = recordAchievementActivity('problemsSolved', score);
    const { newlyUnlocked: quizzesUnlocked } = recordAchievementActivity('quizzesCompleted', 1);

    let newlyUnlockedBadge: BadgeAchievement | null = null;
    if (problemsUnlocked.length > 0) newlyUnlockedBadge = problemsUnlocked[0];
    else if (quizzesUnlocked.length > 0) newlyUnlockedBadge = quizzesUnlocked[0];

    if (score === total) {
      const { newlyUnlocked: perfectUnlocked } = recordAchievementActivity('perfectQuizzes', 1);
      if (perfectUnlocked.length > 0) newlyUnlockedBadge = perfectUnlocked[0];
    }

    if (activePillar === 'algebra') {
      const { newlyUnlocked: algUnlocked } = recordAchievementActivity('algebraProblemsSolved', score);
      if (algUnlocked.length > 0) newlyUnlockedBadge = algUnlocked[0];
    }

    if (newlyUnlockedBadge) {
      setUnlockedToastBadge(newlyUnlockedBadge);
    }

    // If signed into Firebase, persist quiz score to Firestore
    if (currentUser) {
      saveQuizScore(currentUser.uid, {
        grade: currentGrade,
        pillar: activePillar,
        score,
        totalQuestions: total
      });
    }
  };

  const handleResetProgress = () => {
    setCompletedQuizzes({});
    try {
      localStorage.removeItem('mathemagix_progress');
    } catch {}
  };

  // Agent Autonomous Execution Handlers
  const handleAgentScheduleTopic = (topicParams: any) => {
    try {
      const planner = loadWeeklyPlannerData(currentGrade);
      const newTopic = {
        id: `top_${Date.now()}`,
        day: topicParams.day || 'Monday',
        title: topicParams.title || 'Agent Scheduled Topic',
        grade: topicParams.grade || currentGrade,
        pillar: topicParams.pillar || 'basic_maths',
        estimatedMinutes: topicParams.estimatedMinutes || 25,
        priority: topicParams.priority || 'medium',
        isCompleted: false,
        notes: topicParams.notes || 'Scheduled autonomously by AI Agent'
      };
      const updated = {
        ...planner,
        topics: [...planner.topics, newTopic],
        lastUpdated: new Date().toISOString()
      };
      saveWeeklyPlannerData(updated);
      if (currentUser) {
        saveWeeklyPlannerCloud(currentUser.uid, updated);
      }
    } catch (e) {
      console.warn('Error saving agent-scheduled topic:', e);
    }
  };

  const handleAgentScheduleReminder = (remParams: any) => {
    try {
      const planner = loadWeeklyPlannerData(currentGrade);
      const newRem = {
        id: `rem_${Date.now()}`,
        title: remParams.title || 'Agent Quiz Reminder',
        grade: remParams.grade || currentGrade,
        pillar: remParams.pillar || 'basic_maths',
        scheduledDate: remParams.scheduledDate || new Date().toISOString().split('T')[0],
        scheduledTime: remParams.scheduledTime || '17:00',
        isDismissed: false,
        isCompleted: false,
        notes: remParams.notes || 'Scheduled autonomously by AI Agent'
      };
      const updated = {
        ...planner,
        quizReminders: [...planner.quizReminders, newRem],
        lastUpdated: new Date().toISOString()
      };
      saveWeeklyPlannerData(updated);
      if (currentUser) {
        saveWeeklyPlannerCloud(currentUser.uid, updated);
      }
    } catch (e) {
      console.warn('Error saving agent-scheduled reminder:', e);
    }
  };

  const gradeData = getGradeCurriculum(currentGrade);
  const pillarContent = gradeData.pillars[activePillar];

  const pillarTaglines: Record<PillarType, string> = {
    basic_maths: gradeData.pillars.basic_maths.tagline,
    algebra: gradeData.pillars.algebra.tagline,
    abacus: gradeData.pillars.abacus.tagline,
    vedic_maths: gradeData.pillars.vedic_maths.tagline,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        currentGrade={currentGrade}
        onSelectGrade={(g) => setCurrentGrade(g)}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenCustomInstructions={() => setIsCustomInstructionsOpen(true)}
        onOpenLiveTutor={() => setIsLiveTutorOpen(true)}
        onOpenCheatSheets={() => setIsCheatSheetsOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        completedQuizzesCount={Object.keys(completedQuizzes).length}
        currentUser={currentUser}
        streakData={streakData}
        onOpenStreak={() => setIsStreakModalOpen(true)}
        onOpenPodcast={() => {
          setPodcastStudioProblem(`Class ${currentGrade} Speed Math: Master Left-to-Right addition and power cyclicity secrets`);
          setIsPodcastStudioOpen(true);
        }}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 0: AUTONOMOUS AI AGENT WORKSPACE */}
        {activeView === 'ai_agent' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <AIAgentWorkspace
              currentGrade={currentGrade}
              activeView={activeView}
              onNavigateView={(view, grade, pillar) => {
                if (grade) setCurrentGrade(grade);
                if (pillar) setActivePillar(pillar);
                setActiveView(view);
              }}
              onScheduleTopic={handleAgentScheduleTopic}
              onScheduleReminder={handleAgentScheduleReminder}
              onRecordStreakActivity={handleRecordStreakActivity}
            />
          </div>
        )}

        {/* VIEW 1: CURRICULUM BROWSER (Grade 1 to 12) */}
        {activeView === 'curriculum' && (
          <div>
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white mb-6 shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{gradeData.levelTier}</span>
                  <span>·</span>
                  <span>Class {currentGrade} Syllabus</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  {gradeData.gradeTitle}
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {gradeData.themeDescription}
                </p>

                {/* Quick launch interactive tools pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveView('cbse_books')}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 rounded-xl text-xs font-semibold text-blue-200 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>CBSE Books (1-12)</span>
                  </button>

                  <button
                    onClick={() => setActiveView('olympiad_arena')}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-xl text-xs font-semibold text-amber-200 transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Olympiad Arena</span>
                  </button>

                  <button
                    onClick={() => setActiveView('arithmetic_lab')}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-xl text-xs font-semibold text-emerald-200 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Speed Arithmetic (+ - × ÷ x² x³)</span>
                  </button>

                  <button
                    onClick={() => setActiveView('tips_tricks_arena')}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/40 rounded-xl text-xs font-semibold text-orange-200 transition-colors cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-orange-400" />
                    <span>Speed Mastery Arena</span>
                  </button>

                  <button
                    onClick={() => setActiveView('cbse_multiverse')}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 rounded-xl text-xs font-semibold text-purple-200 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Solver</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Class Selector Grid (Classes 1 - 12) */}
            <ClassSelector
              currentGrade={currentGrade}
              onSelectGrade={(g) => setCurrentGrade(g)}
            />

            {/* 4 Pillars Selector */}
            <PillarSelector
              activePillar={activePillar}
              onSelectPillar={(p) => setActivePillar(p)}
              pillarTaglines={pillarTaglines}
            />

            {/* 4 Dimension Tabs (Flowchart, Infographics, Tips & Tricks, Quiz) */}
            <DimensionTabs
              activeDimension={activeDimension}
              onChangeDimension={(d) => setActiveDimension(d)}
              quizCount={pillarContent.quiz.length}
            />

            {/* Active Dimension Content */}
            <div className="min-h-[400px]">
              {activeDimension === 'flowchart' && (
                <FlowchartViewer
                  data={pillarContent.flowchart}
                  classNameTitle={`Class ${currentGrade}`}
                  pillarName={pillarContent.pillarName}
                />
              )}

              {activeDimension === 'infographics' && (
                <InfographicsViewer
                  items={pillarContent.infographics}
                  classNameTitle={`Class ${currentGrade}`}
                  pillarName={pillarContent.pillarName}
                />
              )}

              {activeDimension === 'tips_tricks' && (
                <TipsTricksViewer
                  tips={pillarContent.tipsAndTricks}
                  classNameTitle={`Class ${currentGrade}`}
                  pillarName={pillarContent.pillarName}
                />
              )}

              {activeDimension === 'quiz' && (
                <QuizArena
                  questions={pillarContent.quiz}
                  classNameTitle={`Class ${currentGrade}`}
                  pillarName={pillarContent.pillarName}
                  onQuizComplete={handleQuizComplete}
                  userId={currentUser?.uid || null}
                />
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: DEDICATED CBSE CHAPTERWISE EXPLORER & SOLUTIONS */}
        {activeView === 'cbse_books' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <CBSEChapterwiseExplorer
              initialGrade={currentGrade}
              onOpenInAISolver={(prob, ch, gr) => {
                setAiSolverInitialProblem(prob);
                setAiSolverInitialChapter(ch);
                setCurrentGrade(gr as any);
                setActiveView('cbse_multiverse');
              }}
              onNavigateToVideos={(gr) => {
                setCurrentGrade(gr as any);
                setActiveView('olympiad_arena');
              }}
              onNavigateToTips={(gr) => {
                setCurrentGrade(gr as any);
                setActiveView('tips_tricks_arena');
              }}
            />
          </div>
        )}

        {/* VIEW 3: OLYMPIAD ARENA (IMO / CONTESTS) */}
        {activeView === 'olympiad_arena' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <OlympiadArena
              initialGrade={currentGrade}
              onOpenAIProblem={(prob) => {
                setAiSolverInitialProblem(prob);
                setActiveView('cbse_multiverse');
              }}
            />
          </div>
        )}

        {/* VIEW 4: ARITHMETIC SPEED & POWERS LAB (+ - × ÷ x² x³) */}
        {activeView === 'arithmetic_lab' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <ArithmeticMasteryLab
              onCompleteActivity={(title) => handleRecordStreakActivity('arithmetic', title)}
            />
          </div>
        )}

        {/* VIEW 5: DEDICATED TIPS & TRICKS SECTION */}
        {activeView === 'tips_tricks_arena' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <DedicatedTipsTricksSection
              initialGrade={currentGrade}
              onOpenVideoLesson={() => {
                setActiveView('olympiad_arena');
              }}
            />
          </div>
        )}

        {/* VIEW 6: CBSE TEXTBOOK & AI MULTIVERSE SOLVER (ChatGPT, Claude, Perplexity, NotebookLM) */}
        {activeView === 'cbse_multiverse' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <CBSEMultiverseSolver
              initialGrade={currentGrade}
              initialProblem={aiSolverInitialProblem}
              initialChapterTitle={aiSolverInitialChapter}
              customInstructions={customInstructions}
              userId={currentUser?.uid || null}
            />
          </div>
        )}

        {/* VIEW 4: REAL-TIME SEARCH GROUNDED AGENT */}
        {activeView === 'search_agent' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <GoogleSearchAgent
              grade={currentGrade}
              pillar={activePillar}
            />
          </div>
        )}

        {/* VIEW 5: DYNAMIC STEP-BY-STEP PROBLEM SOLVER */}
        {activeView === 'dynamic_solver' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <DynamicProblemSolver grade={currentGrade} />
          </div>
        )}

        {/* VIEW 6: INTERACTIVE VIRTUAL ABACUS */}
        {activeView === 'abacus_tool' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <VirtualAbacus />
          </div>
        )}

        {/* VIEW 7: VEDIC SPEED MATH LAB */}
        {activeView === 'vedic_tool' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <VedicCalculator />
          </div>
        )}

        {/* VIEW 8: ALGEBRA EQUATION BALANCER */}
        {activeView === 'algebra_tool' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <AlgebraBalanceVisualizer />
          </div>
        )}

        {/* VIEW 9: WEEKLY STUDY & QUIZ PLANNER */}
        {activeView === 'weekly_planner' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setActiveView('curriculum')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Grade Curriculum
              </button>
            </div>
            <WeeklyStudyPlanner
              currentGrade={currentGrade}
              streakData={streakData}
              onRecordStreakActivity={handleRecordStreakActivity}
              onNavigateToQuiz={(grade, pillar) => {
                setCurrentGrade(grade);
                setActivePillar(pillar);
                setActiveDimension('quiz');
                setActiveView('curriculum');
              }}
              onNavigateToOlympiad={(grade) => {
                setCurrentGrade(grade);
                setActiveView('olympiad_arena');
              }}
              userId={currentUser?.uid || null}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <StudentProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        completedQuizzes={completedQuizzes}
        onResetProgress={handleResetProgress}
        streakData={streakData}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        currentUser={currentUser}
      />

      <AchievementToast
        badge={unlockedToastBadge}
        onClose={() => setUnlockedToastBadge(null)}
      />

      <DailyStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakData={streakData}
        onClaimDailyCheckin={() => handleRecordStreakActivity('checkin', 'Daily Check-In Claimed')}
        onNavigateView={(view) => setActiveView(view)}
      />

      <CustomInstructionsModal
        isOpen={isCustomInstructionsOpen}
        onClose={() => setIsCustomInstructionsOpen(false)}
        userId={currentUser?.uid || null}
        currentInstructions={customInstructions}
        onSave={(newInst) => setCustomInstructions(newInst)}
      />

      <LiveVoiceTutorModal
        isOpen={isLiveTutorOpen}
        onClose={() => setIsLiveTutorOpen(false)}
        grade={currentGrade}
      />

      <CheatSheetInfographicsModal
        isOpen={isCheatSheetsOpen}
        onClose={() => setIsCheatSheetsOpen(false)}
        grade={currentGrade}
      />

      {/* Math Concept Glossary Modal */}
      <MathGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        currentGrade={currentGrade}
        onSelectTermForAI={(termName) => {
          setActiveView('cbse_multiverse');
        }}
      />

      {/* Global Flow AI Multi-Host Podcast Studio Modal */}
      <FlowAIPodcastModal
        isOpen={isPodcastStudioOpen}
        onClose={() => setIsPodcastStudioOpen(false)}
        initialQuestion={podcastStudioProblem || `Class ${currentGrade} Speed Math: How do Left-to-Right mental addition and power cyclicity shortcuts work?`}
        grade={currentGrade}
        topic="CBSE & Olympiad Speed Mathematics"
      />

      {/* Floating Autonomous AI Agent Co-Pilot */}
      <FloatingAgentDrawer
        currentGrade={currentGrade}
        activeView={activeView}
        onNavigateView={(view, grade, pillar) => {
          if (grade) setCurrentGrade(grade);
          if (pillar) setActivePillar(pillar);
          setActiveView(view);
        }}
        onScheduleTopic={handleAgentScheduleTopic}
        onScheduleReminder={handleAgentScheduleReminder}
        onOpenFullAgent={() => setActiveView('ai_agent')}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-slate-100">ViratMagix Mathe</span>
            <span>·</span>
            <span>K-12 Math, Abacus & Vedic Speed Learning</span>
            <span>·</span>
            <span>Classes 1–12</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>CBSE NCERT Books</span>
            <span>·</span>
            <span>AI Reasoning (ChatGPT, Claude, Perplexity, NotebookLM)</span>
            <span>·</span>
            <span>Live Search Grounding</span>
            <span>·</span>
            <span>Firestore Persistent Storage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
