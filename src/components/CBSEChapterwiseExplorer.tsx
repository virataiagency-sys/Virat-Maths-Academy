import React, { useState } from 'react';
import { BoardType, BOARD_METADATA, BoardChapter, BoardProblem } from '../types/boards';
import { getBoardBook, getBoardComparison } from '../lib/boardCurriculum';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Zap,
  HelpCircle,
  Award,
  Layers,
  FileText,
  Search,
  BookMarked,
  Globe,
  Radio,
  ExternalLink,
  ShieldCheck,
  Columns
} from 'lucide-react';
import { FlowAIPodcastModal } from './FlowAIPodcastModal';

interface Props {
  initialGrade?: number;
  initialBoard?: BoardType;
  onOpenInAISolver?: (problemText: string, chapterTitle: string, grade: number) => void;
  onNavigateToVideos?: (grade: number) => void;
  onNavigateToTips?: (grade: number) => void;
  onOpenGoogleSearch?: (query: string) => void;
}

export function CBSEChapterwiseExplorer({
  initialGrade = 10,
  initialBoard = 'cbse',
  onOpenInAISolver,
  onNavigateToVideos,
  onNavigateToTips,
  onOpenGoogleSearch
}: Props) {
  const [selectedBoard, setSelectedBoard] = useState<BoardType>(initialBoard);
  const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade);

  const currentBook = getBoardBook(selectedBoard, selectedGrade);
  const boardMeta = BOARD_METADATA[selectedBoard];

  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    currentBook.chapters[0]?.id || ''
  );

  const selectedChapter: BoardChapter =
    currentBook.chapters.find((c) => c.id === selectedChapterId) ||
    currentBook.chapters[0] || {
      id: 'none',
      number: 1,
      title: 'Mathematics',
      description: '',
      keyFormulas: [],
      problems: []
    };

  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedVedic, setRevealedVedic] = useState<Record<string, boolean>>({});
  const [searchFilter, setSearchFilter] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  // Flow AI Podcast Modal State
  const [podcastModalOpen, setPodcastModalOpen] = useState(false);
  const [activePodcastProblem, setActivePodcastProblem] = useState<BoardProblem | null>(null);

  const handleGradeChange = (newGrade: number) => {
    setSelectedGrade(newGrade);
    const book = getBoardBook(selectedBoard, newGrade);
    if (book && book.chapters.length > 0) {
      setSelectedChapterId(book.chapters[0].id);
    }
  };

  const handleBoardChange = (newBoard: BoardType) => {
    setSelectedBoard(newBoard);
    const book = getBoardBook(newBoard, selectedGrade);
    if (book && book.chapters.length > 0) {
      setSelectedChapterId(book.chapters[0].id);
    }
  };

  const comparison = getBoardComparison(selectedGrade);

  const filteredProblems = selectedChapter.problems.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.question.toLowerCase().includes(q) ||
      p.exercise.toLowerCase().includes(q) ||
      p.solution.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden transition-all ${
          selectedBoard === 'cbse'
            ? 'bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900'
            : selectedBoard === 'icse'
            ? 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900'
            : 'bg-gradient-to-r from-amber-950 via-orange-950 to-slate-900'
        }`}
      >
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Multi-Board Curriculum Operating System</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white/20 text-white">
              {boardMeta.name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {selectedBoard === 'cbse' && 'CBSE / NCERT Syllabus Engine: Class 1 to 12'}
            {selectedBoard === 'icse' && 'ICSE & ISC Syllabus Engine: Concise Selina & ML Aggarwal'}
            {selectedBoard === 'state_board' && 'State Board & SCERT Engine: Regional & Practical Mathematics'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
            {boardMeta.description} Includes official textbook exercises, board exam problems, step-by-step solutions, examiner notes, and Vedic speed shortcuts.
          </p>

          {/* Quick Active Book Specs */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-200">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
              <BookMarked className="w-4 h-4 text-amber-400" />
              <span className="font-bold">{currentBook.bookTitle}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{boardMeta.authority}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOARD SELECTOR & CLASS SELECTOR BAR */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Row 1: Board Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Select Educational Board:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                id: 'cbse' as BoardType,
                title: '📘 CBSE (NCERT / Exemplar)',
                tag: 'National Entrance Standard',
                activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              },
              {
                id: 'icse' as BoardType,
                title: '📗 ICSE (CISCE / Selina)',
                tag: 'Commercial Math & Proofs',
                activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              },
              {
                id: 'state_board' as BoardType,
                title: '📙 State Board (SCERT / Local)',
                tag: 'Cramer Rule & Scholarship',
                activeClass: 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              }
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => handleBoardChange(b.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex flex-col items-start ${
                  selectedBoard === b.id
                    ? b.activeClass
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{b.title}</span>
                <span
                  className={`text-[10px] font-medium ${
                    selectedBoard === b.id ? 'text-white/80' : 'text-slate-400'
                  }`}
                >
                  {b.tag}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <Columns className="w-3.5 h-3.5 text-indigo-600" />
            <span>{showComparison ? 'Hide Board Comparison' : 'Compare All 3 Boards'}</span>
          </button>
        </div>

        {/* Optional 3-Board Comparison Drawer */}
        {showComparison && (
          <div className="bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 p-4 rounded-2xl border border-indigo-100 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-indigo-950 flex items-center gap-1.5">
                <Columns className="w-4 h-4 text-indigo-600" />
                Class {selectedGrade} Syllabus Comparison across Indian Boards:
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Curriculum Alignment Matrix</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* CBSE */}
              <div className="p-3.5 rounded-xl bg-white border border-blue-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-black text-blue-900">
                  <span>CBSE / NCERT</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">
                    Class {selectedGrade}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{comparison.cbse.focus}</p>
                <div className="pt-1.5 border-t border-slate-100 text-[11px] text-blue-800 font-semibold">
                  Sample: {comparison.cbse.sampleChapter}
                </div>
              </div>

              {/* ICSE */}
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-black text-emerald-900">
                  <span>ICSE / CISCE</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono">
                    Class {selectedGrade}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{comparison.icse.focus}</p>
                <div className="pt-1.5 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold">
                  Sample: {comparison.icse.sampleChapter}
                </div>
              </div>

              {/* State Board */}
              <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between font-black text-amber-900">
                  <span>State Board / Local</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                    Class {selectedGrade}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{comparison.state_board.focus}</p>
                <div className="pt-1.5 border-t border-slate-100 text-[11px] text-amber-800 font-semibold">
                  Sample: {comparison.state_board.sampleChapter}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Row 2: Class Level Selector Bar (1 to 12) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Class Level (1 to 12):
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => {
              const isSelected = selectedGrade === g;
              let activeColor = 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30';
              if (selectedBoard === 'icse') {
                activeColor = 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30';
              } else if (selectedBoard === 'state_board') {
                activeColor = 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-600/30';
              }

              return (
                <button
                  key={g}
                  onClick={() => handleGradeChange(g)}
                  className={`w-9 h-8 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected ? activeColor : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  C{g}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chapter Selection Grid & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Chapters Navigation List */}
        <div className="lg:col-span-1 space-y-2">
          <div className="p-3 bg-slate-100 rounded-2xl font-bold text-xs text-slate-600 uppercase tracking-wider flex items-center justify-between">
            <span>{boardMeta.shortName} Chapters</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
              {currentBook.chapters.length} Total
            </span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {currentBook.chapters.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              let selectedStyle = 'bg-blue-50 border-blue-500 text-blue-950 font-bold shadow-xs';
              let badgeColor = 'bg-blue-600 text-white';

              if (selectedBoard === 'icse') {
                selectedStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                badgeColor = 'bg-emerald-600 text-white';
              } else if (selectedBoard === 'state_board') {
                selectedStyle = 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-xs';
                badgeColor = 'bg-amber-600 text-white';
              }

              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? selectedStyle
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold ${
                        isSelected
                          ? badgeColor
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      {ch.number}
                    </span>
                    <span className="line-clamp-1">{ch.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 ${
                      isSelected
                        ? selectedBoard === 'icse'
                          ? 'text-emerald-600'
                          : selectedBoard === 'state_board'
                          ? 'text-amber-600'
                          : 'text-blue-600'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chapter Overview, Formulas & Problems */}
        <div className="lg:col-span-3 space-y-6">
          {/* Chapter Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    selectedBoard === 'icse'
                      ? 'text-emerald-700'
                      : selectedBoard === 'state_board'
                      ? 'text-amber-700'
                      : 'text-blue-700'
                  }`}
                >
                  Chapter {selectedChapter.number} · Class {selectedGrade} {boardMeta.shortName}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {selectedChapter.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  {selectedChapter.problems.length} Curated Questions
                </span>
                <button
                  onClick={() => {
                    setActivePodcastProblem(selectedChapter.problems[0] || null);
                    setPodcastModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Generate Flow AI Podcast for this Chapter"
                >
                  <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                  <span>Chapter Podcast</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedChapter.description}
            </p>

            {/* Board Highlight Note if present */}
            {selectedChapter.boardHighlight && (
              <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs text-indigo-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">{boardMeta.shortName} Pedagogical Focus: </span>
                  <span>{selectedChapter.boardHighlight}</span>
                </div>
              </div>
            )}

            {/* Key Formulas Banner */}
            {selectedChapter.keyFormulas && selectedChapter.keyFormulas.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Key Formulas & Core Identities ({boardMeta.shortName}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedChapter.keyFormulas.map((f, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-3 py-1 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-mono font-medium shadow-2xs"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Filter Inside Chapter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search in Class ${selectedGrade} ${boardMeta.shortName} Chapter problems, formulas, or solutions...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {filteredProblems.map((prob) => {
              const isSolutionOpen = revealedSolutions[prob.id] || false;
              const isVedicOpen = revealedVedic[prob.id] || false;

              return (
                <div
                  key={prob.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Problem Top Header */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-200">
                        {prob.exercise}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prob.type === 'Board Examination'
                            ? 'bg-rose-100 text-rose-800'
                            : prob.type === 'Scholarship / Competitive'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {prob.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Flow AI Podcast Button */}
                      <button
                        onClick={() => {
                          setActivePodcastProblem(prob);
                          setPodcastModalOpen(true);
                        }}
                        className="p-1.5 px-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Listen as a 2-host Flow AI Podcast"
                      >
                        <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                        <span>Flow AI Podcast</span>
                      </button>

                      {/* Ask AI Solver */}
                      {onOpenInAISolver && (
                        <button
                          onClick={() =>
                            onOpenInAISolver(prob.question, selectedChapter.title, selectedGrade)
                          }
                          className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                          <span>AI Solver</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Problem Question Statement */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-wrap">
                      {prob.question}
                    </p>

                    {/* Hint Box */}
                    {prob.hint && (
                      <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Textbook Hint: </span>
                          <span>{prob.hint}</span>
                        </div>
                      </div>
                    )}

                    {/* Board Specific Insight */}
                    {prob.boardInsight && (
                      <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2">
                        <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">{boardMeta.shortName} Examiner Insight: </span>
                          <span>{prob.boardInsight}</span>
                        </div>
                      </div>
                    )}

                    {/* Solution Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                      <button
                        onClick={() =>
                          setRevealedSolutions((prev) => ({ ...prev, [prob.id]: !prev[prob.id] }))
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSolutionOpen
                            ? 'bg-slate-800 text-white'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isSolutionOpen ? 'Hide Official Solution' : 'View Step-by-Step Solution'}</span>
                      </button>

                      {prob.vedicShortcut && (
                        <button
                          onClick={() =>
                            setRevealedVedic((prev) => ({ ...prev, [prob.id]: !prev[prob.id] }))
                          }
                          className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isVedicOpen ? 'Hide Speed Check' : 'Vedic Speed Check'}</span>
                        </button>
                      )}
                    </div>

                    {/* Detailed Solution if revealed */}
                    {isSolutionOpen && (
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap animate-fadeIn">
                        {prob.solution}
                      </div>
                    )}

                    {/* Vedic Shortcut Box if revealed */}
                    {isVedicOpen && prob.vedicShortcut && (
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs text-amber-950 animate-fadeIn">
                        <span className="font-extrabold flex items-center gap-1 text-amber-800 mb-1">
                          <Zap className="w-3.5 h-3.5 text-amber-600" />
                          <span>Speed Sanity Check Shortcut:</span>
                        </span>
                        <p>{prob.vedicShortcut}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredProblems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No problems match your search filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Flow AI Podcast Modal for any selected Board Problem */}
      {activePodcastProblem && (
        <FlowAIPodcastModal
          isOpen={podcastModalOpen}
          onClose={() => setPodcastModalOpen(false)}
          initialQuestion={activePodcastProblem.question}
          initialAnswer={activePodcastProblem.solution.split('\n')[0] || 'See full derivation'}
          initialExplanation={{
            conventionalStepByStep: activePodcastProblem.solution.split('\n'),
            speedHack: activePodcastProblem.vedicShortcut || 'Decompose and apply mathematical symmetry.',
            keyTakeaway: `${boardMeta.shortName} standard problem from ${selectedChapter.title}.`
          }}
          grade={selectedGrade}
          topic={`${boardMeta.shortName} · ${selectedChapter.title}`}
        />
      )}
    </div>
  );
}
