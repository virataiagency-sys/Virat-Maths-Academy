import React, { useState } from 'react';
import {
  olympiadQuestionsData,
  OlympiadQuestion,
  OlympiadSection,
  OlympiadDifficulty
} from '../data/olympiadData';
import {
  Trophy,
  Award,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Filter,
  Brain,
  HelpCircle,
  Play,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Target,
  ExternalLink,
  BookMarked,
  Check,
  Flame,
  ArrowRight,
  Layers,
  Radio
} from 'lucide-react';
import { recordAchievementActivity } from '../lib/achievements';
import { FlowAIPodcastModal } from './FlowAIPodcastModal';

interface Props {
  initialGrade?: number;
  onOpenAIProblem?: (problemText: string) => void;
}

export function OlympiadArena({ initialGrade = 4, onOpenAIProblem }: Props) {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(initialGrade);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<OlympiadSection | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<OlympiadDifficulty | 'all'>('all');
  const [selectedChannel, setSelectedChannel] = useState<'all' | '@studywithJyotiMukhija' | '@winsomeDigitallearning' | 'other'>('all');

  // Contest Mode State
  const [contestMode, setContestMode] = useState(false);
  const [contestTimeLeft, setContestTimeLeft] = useState(600); // 10 mins
  const [contestTimerActive, setContestTimerActive] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submittedContest, setSubmittedContest] = useState(false);

  // Practice mode revealed states
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedAnalysis, setRevealedAnalysis] = useState<Record<string, boolean>>({});
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});

  // Flow AI Podcast Modal State
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);
  const [activePodcastQuestion, setActivePodcastQuestion] = useState<OlympiadQuestion | null>(null);

  // Filter questions by grade, chapter, section, difficulty, and video channel
  const filteredQuestions = olympiadQuestionsData.filter((q) => {
    if (selectedGrade !== 'all' && !q.gradeRange.includes(selectedGrade)) return false;
    if (selectedChapter !== 'all' && q.chapter !== selectedChapter) return false;
    if (selectedSection !== 'all' && q.section !== selectedSection) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (selectedChannel !== 'all') {
      if (!q.videoAnalysis) return false;
      if (selectedChannel === '@studywithJyotiMukhija' && q.videoAnalysis.channel !== '@studywithJyotiMukhija') return false;
      if (selectedChannel === '@winsomeDigitallearning' && q.videoAnalysis.channel !== '@winsomeDigitallearning') return false;
      if (selectedChannel === 'other' && (q.videoAnalysis.channel === '@studywithJyotiMukhija' || q.videoAnalysis.channel === '@winsomeDigitallearning')) return false;
    }
    return true;
  });

  // Unique chapters available for currently filtered questions
  const availableChapters = Array.from(
    new Set(
      olympiadQuestionsData
        .filter((q) => selectedGrade === 'all' || q.gradeRange.includes(selectedGrade))
        .map((q) => q.chapter)
    )
  );

  // Contest Timer effect
  React.useEffect(() => {
    let interval: any = null;
    if (contestMode && contestTimerActive && contestTimeLeft > 0) {
      interval = setInterval(() => {
        setContestTimeLeft((t) => t - 1);
      }, 1000);
    } else if (contestTimeLeft === 0 && contestMode && !submittedContest) {
      handleFinishContest();
    }
    return () => clearInterval(interval);
  }, [contestMode, contestTimerActive, contestTimeLeft, submittedContest]);

  const handleStartContest = () => {
    setContestMode(true);
    setContestTimeLeft(600);
    setContestTimerActive(true);
    setUserAnswers({});
    setSubmittedContest(false);
  };

  const handleFinishContest = () => {
    setSubmittedContest(true);
    setContestTimerActive(false);

    let correctCount = 0;
    Object.keys(userAnswers).forEach((qId) => {
      const q = olympiadQuestionsData.find((item) => item.id === qId);
      if (q && userAnswers[qId] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount > 0) {
      recordAchievementActivity('problemsSolved', correctCount);
      recordAchievementActivity('olympiadProblemsSolved', correctCount);
    }
  };

  const handleResetContest = () => {
    setContestMode(false);
    setSubmittedContest(false);
    setUserAnswers({});
    setContestTimerActive(false);
  };

  // Calculate score in contest based on official SOF IMO weighting (Achievers section is 2 or 3 marks)
  const getQuestionPoints = (q: OlympiadQuestion) => {
    if (q.section === 'Achievers') {
      return q.grade >= 5 ? 3 : 2;
    }
    return 1;
  };

  const contestScore = Object.keys(userAnswers).reduce((acc, qId) => {
    const q = olympiadQuestionsData.find((item) => item.id === qId);
    if (q && userAnswers[qId] === q.correctIndex) {
      return acc + getQuestionPoints(q);
    }
    return acc;
  }, 0);

  const totalMaxScore = filteredQuestions.reduce((acc, q) => {
    return acc + getQuestionPoints(q);
  }, 0);

  const correctAnswersCount = Object.keys(userAnswers).filter((qId) => {
    const q = olympiadQuestionsData.find((item) => item.id === qId);
    return q && userAnswers[qId] === q.correctIndex;
  }).length;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner: SOF IMO Video-Derived Quiz & Practice Arena */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>SOF International Mathematics Olympiad (IMO) · Video-Derived Quiz Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            SOF IMO Olympiad Quizzes &amp; Video Concept Breakdown
          </h1>

          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed max-w-2xl">
            Questions, quizzes, and speed strategies analyzed directly from masterclass YouTube lessons including{' '}
            <span className="font-extrabold text-white underline decoration-amber-300">@studywithJyotiMukhija</span> and{' '}
            <span className="font-extrabold text-white underline decoration-amber-300">@winsomeDigitallearning</span>. Master Logical Reasoning, Mathematical Reasoning, and Achievers Section HOTS.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!contestMode ? (
              <button
                onClick={handleStartContest}
                className="px-5 py-2.5 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Start Timed Olympiad Mock Quiz (10 Mins)</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-amber-400/40 flex items-center gap-2 font-mono font-bold text-amber-300 text-sm">
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Time Left: {formatTimer(contestTimeLeft)}</span>
                </div>
                {!submittedContest ? (
                  <button
                    onClick={handleFinishContest}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleResetContest}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return to Practice Mode</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contest Score Banner (shown when quiz is submitted) */}
      {contestMode && submittedContest && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-scaleUp">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl">
              🏆
            </div>
            <div>
              <h3 className="text-xl font-black">Olympiad Quiz Completed!</h3>
              <p className="text-xs text-emerald-100">
                You solved {correctAnswersCount} out of {filteredQuestions.length} questions correctly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-emerald-200 block uppercase font-bold">Total Weighted Score</span>
              <span className="text-3xl font-black font-mono">
                {contestScore} / {totalMaxScore} pts
              </span>
            </div>
            <button
              onClick={handleResetContest}
              className="px-4 py-2.5 bg-white text-emerald-900 font-extrabold text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              Review Video Analyses Below
            </button>
          </div>
        </div>
      )}

      {/* FILTER CONTROLS */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Source Video Channel Filter Tabs */}
        <div>
          <span className="text-xs font-bold text-slate-500 block mb-2">
            Filter by Analyzed YouTube Video Masterclass:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Video Sources & Chapters' },
              { id: '@studywithJyotiMukhija', label: '🎥 @studywithJyotiMukhija Masterclasses' },
              { id: '@winsomeDigitallearning', label: '🎥 @winsomeDigitallearning Foundation' },
              { id: 'other', label: '⭐ SOF Olympiad Success Hub' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedChannel(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedChannel === tab.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Grade, Chapter, Section */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
          {/* Class Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">Class:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Classes (1-12)</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                <option key={g} value={g}>
                  Class {g}
                </option>
              ))}
            </select>
          </div>

          {/* Section Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">Section:</span>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Olympiad Sections</option>
              <option value="Logical">Section 1: Logical Reasoning</option>
              <option value="Mathematical">Section 2: Mathematical Reasoning</option>
              <option value="Everyday">Section 3: Everyday Mathematics</option>
              <option value="Achievers">Section 4: Achievers Section (HOTS)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="Level 1">Level 1 (Foundation)</option>
              <option value="Level 2">Level 2 (Olympiad Standard)</option>
              <option value="Achievers HOTS">Achievers HOTS (Double Marks)</option>
            </select>
          </div>

          {/* Total Questions Count Pill */}
          <div className="ml-auto text-xs font-bold text-slate-500">
            Showing <span className="font-black text-amber-700 font-mono">{filteredQuestions.length}</span> Video-Analyzed Questions
          </div>
        </div>
      </div>

      {/* QUESTIONS LIST */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No questions match your current filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try selecting "All Classes" or clear specific filters to view the complete Olympiad question bank.
            </p>
            <button
              onClick={() => {
                setSelectedGrade('all');
                setSelectedChapter('all');
                setSelectedSection('all');
                setSelectedDifficulty('all');
                setSelectedChannel('all');
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, qIndex) => {
            const hasSelected = practiceAnswers[q.id] !== undefined;
            const isOptionSelected = (oIdx: number) =>
              contestMode ? userAnswers[q.id] === oIdx : practiceAnswers[q.id] === oIdx;
            const isCorrect = practiceAnswers[q.id] === q.correctIndex;
            const isHintOpen = revealedHints[q.id];
            const isSolutionOpen = revealedSolutions[q.id];
            const isAnalysisOpen = revealedAnalysis[q.id];

            return (
              <div
                key={q.id}
                className={`bg-white rounded-3xl border transition-all shadow-xs ${
                  hasSelected && !contestMode
                    ? isCorrect
                      ? 'border-emerald-300 ring-2 ring-emerald-500/10'
                      : 'border-rose-300 ring-2 ring-rose-500/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Question Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-extrabold uppercase">
                        Q{qIndex + 1} · Class {q.gradeRange.join(', ')}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                        {q.contestTag}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-semibold">
                        Ch {q.chapterNumber}: {q.chapter}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          q.section === 'Achievers'
                            ? 'bg-purple-100 text-purple-800'
                            : q.section === 'Logical'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {q.section}
                      </span>
                    </div>

                    {/* Source Channel Badge */}
                    {q.videoAnalysis && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-extrabold flex items-center gap-1">
                        <span>🎬 Analyzed:</span>
                        <span className="font-mono">{q.videoAnalysis.channel}</span>
                      </span>
                    )}
                  </div>

                  {/* Question Prompt */}
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                    {q.question}
                  </h4>
                </div>

                {/* Multiple Choice Options */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctIndex;
                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                      if (contestMode) {
                        if (submittedContest) {
                          if (isOptionCorrect) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                          } else if (isOptionSelected(oIdx) && !isOptionCorrect) {
                            btnStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                          }
                        } else if (isOptionSelected(oIdx)) {
                          btnStyle = 'bg-amber-100 border-amber-500 text-amber-950 font-bold';
                        }
                      } else if (hasSelected) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isOptionSelected(oIdx) && !isOptionCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={contestMode && submittedContest}
                          onClick={() => {
                            if (contestMode) {
                              setUserAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                            } else {
                              if (practiceAnswers[q.id] === undefined && oIdx === q.correctIndex) {
                                recordAchievementActivity('problemsSolved', 1);
                                recordAchievementActivity('olympiadProblemsSolved', 1);
                              }
                              setPracticeAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                            }
                          }}
                          className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center justify-center text-[10px] font-black shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {hasSelected && !contestMode && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {hasSelected && !contestMode && isOptionSelected(oIdx) && !isOptionCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Practice Mode Action Bar */}
                  {!contestMode && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Hint Button */}
                        <button
                          onClick={() => setRevealedHints((p) => ({ ...p, [q.id]: !p[q.id] }))}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isHintOpen ? 'Hide Hint' : 'Olympiad Hint'}</span>
                        </button>

                        {/* Video Analysis Breakdown Toggle */}
                        {q.videoAnalysis && (
                          <button
                            onClick={() => setRevealedAnalysis((p) => ({ ...p, [q.id]: !p[q.id] }))}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                              isAnalysisOpen
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                            }`}
                          >
                            <Brain className="w-3.5 h-3.5 text-rose-500" />
                            <span>{isAnalysisOpen ? 'Hide Video Analysis' : 'Show Video Analysis'}</span>
                          </button>
                        )}

                        {/* Full Solution Toggle */}
                        <button
                          onClick={() => setRevealedSolutions((p) => ({ ...p, [q.id]: !p[q.id] }))}
                          className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{isSolutionOpen ? 'Hide Solution' : 'Step-by-Step Derivation'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Flow AI Podcast Button */}
                        <button
                          onClick={() => {
                            setActivePodcastQuestion(q);
                            setIsPodcastOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                          <span>Flow AI Podcast</span>
                        </button>

                        {/* Ask AI Solver */}
                        {onOpenAIProblem && (
                          <button
                            onClick={() => onOpenAIProblem(q.question)}
                            className="text-xs text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                            <span>Ask AI Solver</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hint Card */}
                  {isHintOpen && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 animate-fadeIn">
                      <div className="font-extrabold flex items-center gap-1.5 text-amber-800">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Olympiad Strategy Hint:</span>
                      </div>
                      <p>{q.explanation.speedHack}</p>
                    </div>
                  )}

                  {/* VIDEO ANALYSIS BREAKDOWN (Derived from YouTube Masterclass) */}
                  {isAnalysisOpen && q.videoAnalysis && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white space-y-4 border border-rose-500/40 shadow-xl animate-fadeIn">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-rose-800/60">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase">
                            Video Concept Analysis
                          </span>
                          <span className="font-extrabold text-xs text-rose-300">
                            {q.videoAnalysis.channel}
                          </span>
                        </div>
                        <span className="text-xs text-slate-300 font-mono italic">
                          {q.videoAnalysis.videoTitle}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {/* Core Concept */}
                        <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                          <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                            <Brain className="w-3.5 h-3.5" />
                            <span>Core Principle Taught in Video</span>
                          </span>
                          <p className="text-slate-200 leading-relaxed font-medium">
                            {q.videoAnalysis.keyConceptAnalyzed}
                          </p>
                        </div>

                        {/* Speed Hack */}
                        <div className="p-3.5 rounded-xl bg-amber-500/15 backdrop-blur-xs border border-amber-400/30 space-y-1">
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>Instructor's Speed Shortcut</span>
                          </span>
                          <p className="text-amber-100 leading-relaxed font-medium">
                            {q.videoAnalysis.instructorSpeedHack}
                          </p>
                        </div>
                      </div>

                      {/* Common Olympiad Trap */}
                      <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-400/30 space-y-1">
                        <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>The Olympiad Trap (Where 80% Students Lose Marks)</span>
                        </span>
                        <p className="text-rose-100 leading-relaxed font-medium">
                          {q.videoAnalysis.commonOlympiadTrap}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Derivation */}
                  {isSolutionOpen && (
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs animate-fadeIn">
                      <div className="font-extrabold text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Step-by-Step Mathematical Derivation:</span>
                      </div>
                      <div className="space-y-1.5 pl-4 border-l-2 border-slate-300 text-slate-700">
                        {q.explanation.conventionalStepByStep.map((step, sIdx) => (
                          <p key={sIdx} className="leading-relaxed">
                            {step}
                          </p>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-indigo-900 font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold">Key Olympiad Takeaway:</span>
                          <span>{q.explanation.keyTakeaway}</span>
                        </div>
                        <button
                          onClick={() => {
                            setActivePodcastQuestion(q);
                            setIsPodcastOpen(true);
                          }}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Radio className="w-3.5 h-3.5" />
                          <span>Listen as Flow AI Podcast</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Flow AI Multi-Host Podcast Studio Modal */}
      {activePodcastQuestion && (
        <FlowAIPodcastModal
          isOpen={isPodcastOpen}
          onClose={() => setIsPodcastOpen(false)}
          initialQuestion={activePodcastQuestion.question}
          initialOptions={activePodcastQuestion.options}
          initialAnswer={activePodcastQuestion.options[activePodcastQuestion.correctIndex]}
          initialExplanation={activePodcastQuestion.explanation}
          grade={activePodcastQuestion.grade}
          topic={activePodcastQuestion.chapter}
        />
      )}
    </div>
  );
}
