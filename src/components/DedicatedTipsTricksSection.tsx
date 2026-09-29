import React, { useState } from 'react';
import { masterTipsData, ComprehensiveTip, TipCategory, TipDifficulty } from '../data/tipsAndTricksData';
import {
  Zap,
  AlertTriangle,
  Clock,
  Target,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Filter,
  Brain,
  BookOpen,
  Layers,
  Play,
  X,
  ExternalLink,
  Video,
  Trophy
} from 'lucide-react';

interface Props {
  initialGrade?: number;
  onOpenVideoLesson?: (youtubeId: string) => void;
}

export function DedicatedTipsTricksSection({ initialGrade = 6, onOpenVideoLesson }: Props) {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(initialGrade);
  const [selectedPillar, setSelectedPillar] = useState<TipCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<TipDifficulty | 'all'>('all');
  const [activeDrillTipId, setActiveDrillTipId] = useState<string | null>(null);
  const [drillAnswers, setDrillAnswers] = useState<Record<string, { selected: number; isCorrect: boolean }>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoModalId, setActiveVideoModalId] = useState<string | null>(null);

  // Filtering
  const filteredTips = masterTipsData.filter((tip) => {
    if (selectedGrade !== 'all' && !tip.gradeRange.includes(selectedGrade)) return false;
    if (selectedPillar !== 'all' && tip.pillar !== selectedPillar) return false;
    if (selectedDifficulty !== 'all' && tip.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = tip.title.toLowerCase().includes(q) ||
        tip.theStrategy.toLowerCase().includes(q) ||
        tip.oneLiner.toLowerCase().includes(q) ||
        tip.commonStudentDifficulty.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleSelectDrillOption = (tipId: string, optionIdx: number, correctIdx: number) => {
    setDrillAnswers(prev => ({
      ...prev,
      [tipId]: {
        selected: optionIdx,
        isCorrect: optionIdx === correctIdx
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>Speed & Accuracy Mastery Arena</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Math Shortcuts, Mental Algorithms & Exam Traps
          </h1>
          <p className="text-amber-100 text-sm sm:text-base leading-relaxed mb-4">
            Curated strategies tailored for Class 1 to 12. Conquer mental fatigue, cut calculation time by up to 70%, and eliminate common algebraic misconceptions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="px-3 py-1.5 bg-black/20 rounded-xl text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Avg Time Saved: 15–30s per problem</span>
            </div>
            <div className="px-3 py-1.5 bg-black/20 rounded-xl text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-emerald-300" />
              <span>Vedic & Abacus Cognitive Patterns</span>
            </div>
            <div className="px-3 py-1.5 bg-black/20 rounded-xl text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
              <span>Common Trap Warnings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Filter Tips & Strategies</span>
          </div>
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search shortcuts or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Grade Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 mr-2">Class:</span>
          <button
            onClick={() => setSelectedGrade('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedGrade === 'all'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Classes (1-12)
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`w-8 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === g
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              C{g}
            </button>
          ))}
        </div>

        {/* Pillar & Difficulty Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          {/* Pillar Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-2">Pillar:</span>
            {[
              { id: 'all', label: 'All Pillars' },
              { id: 'basic_maths', label: 'Basic Maths' },
              { id: 'algebra', label: 'Algebra' },
              { id: 'abacus', label: 'Abacus' },
              { id: 'vedic_maths', label: 'Vedic Maths' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id as any)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  selectedPillar === p.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-2">Difficulty:</span>
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'Beginner', label: 'Beginner' },
              { id: 'Speed-Hack', label: 'Speed-Hack ⚡' },
              { id: 'Common Trap', label: 'Common Trap ⚠️' },
              { id: 'Advanced', label: 'Advanced 🔬' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDifficulty(d.id as any)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  selectedDifficulty === d.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTips.map((tip) => {
          const isDrillOpen = activeDrillTipId === tip.id;
          const userDrillStatus = drillAnswers[tip.id];

          return (
            <div
              key={tip.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Class {tip.gradeRange.join(', ')}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        tip.pillar === 'vedic_maths' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        tip.pillar === 'abacus' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        tip.pillar === 'algebra' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {tip.pillar.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      tip.difficulty === 'Speed-Hack' ? 'bg-amber-100 text-amber-800' :
                      tip.difficulty === 'Common Trap' ? 'bg-rose-100 text-rose-800' :
                      tip.difficulty === 'Advanced' ? 'bg-purple-100 text-purple-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {tip.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-medium mt-1">
                    "{tip.oneLiner}"
                  </p>

                  {tip.youtubeVideoId && (
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (onOpenVideoLesson) {
                            onOpenVideoLesson(tip.youtubeVideoId!);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trophy className="w-3 h-3 text-amber-600" />
                        <span>Practice in Olympiad Arena</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  {/* Common Student Struggle */}
                  <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Where Students Get Stuck:</span>
                    </div>
                    <p className="text-xs text-rose-900 leading-relaxed">
                      {tip.commonStudentDifficulty}
                    </p>
                  </div>

                  {/* The Strategy */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>The Master Strategy</span>
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {tip.theStrategy}
                    </p>
                  </div>

                  {/* Worked Comparison Box */}
                  <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-xl p-3.5 border border-slate-200/80 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>Example: {tip.workedExample.problem}</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px] font-bold">
                        <Clock className="w-3 h-3" />
                        Saves ~{tip.workedExample.timeSavedSeconds}s
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Conventional Method</span>
                        <p className="text-slate-600 text-xs">{tip.workedExample.conventionalWay}</p>
                      </div>
                      <div className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/80">
                        <span className="block text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Speed-Hack Method</span>
                        <p className="text-amber-950 text-xs font-semibold">{tip.workedExample.speedHackWay}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pro Warning */}
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-start gap-1.5">
                    <span className="font-bold text-amber-600">Tip:</span>
                    <span>{tip.proWarning}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Interactive Practice Drill */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                {!isDrillOpen ? (
                  <button
                    onClick={() => setActiveDrillTipId(tip.id)}
                    className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Test Your Speed with 5-Second Drill</span>
                  </button>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Quick Drill: {tip.drillQuestion.question}</span>
                      </span>
                      <button
                        onClick={() => setActiveDrillTipId(null)}
                        className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        Hide
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {tip.drillQuestion.options.map((opt, oIdx) => {
                        const isSelected = userDrillStatus?.selected === oIdx;
                        const isCorrectOption = oIdx === tip.drillQuestion.correctIndex;

                        let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400';
                        if (userDrillStatus) {
                          if (isCorrectOption) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                          else if (isSelected && !userDrillStatus.isCorrect) btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={Boolean(userDrillStatus)}
                            onClick={() => handleSelectDrillOption(tip.id, oIdx, tip.drillQuestion.correctIndex)}
                            className={`p-2 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {userDrillStatus && (
                      <div className={`p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                        userDrillStatus.isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {userDrillStatus.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-bold">{userDrillStatus.isCorrect ? 'Correct! ' : 'Oops! '}</span>
                          <span>{tip.drillQuestion.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No tips match this specific filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try switching to 'All Classes' or clear the search query.</p>
        </div>
      )}

      {/* Video Modal Popup */}
      {activeVideoModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative text-white">
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <Video className="w-4 h-4" />
                <span>Video Lesson Demonstration</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideoModalId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold mr-2"
                >
                  <span>Open in YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => setActiveVideoModalId(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModalId}?autoplay=1&rel=0`}
                title="Mathematics Video Lesson"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
