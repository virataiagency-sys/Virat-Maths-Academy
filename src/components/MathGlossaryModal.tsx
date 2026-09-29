import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Volume2,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Tag,
  GraduationCap,
  Filter,
  Layers,
  Calculator,
  Compass,
  Zap,
  RotateCcw
} from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryTerm, GlossaryCategory, VisualType } from '../data/glossaryData';
import { GradeLevel } from '../types/curriculum';

interface MathGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: GradeLevel;
  onSelectTermForAI?: (termName: string) => void;
}

export const MathGlossaryModal: React.FC<MathGlossaryModalProps> = ({
  isOpen,
  onClose,
  currentGrade,
  onSelectTermForAI
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory>('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | 'all'>(currentGrade);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      // Category filter
      if (selectedCategory !== 'all' && term.category !== selectedCategory) {
        return false;
      }

      // Grade relevance filter
      if (selectedGradeFilter !== 'all') {
        const gradeNum = Number(selectedGradeFilter);
        if (gradeNum < term.minGrade || gradeNum > term.maxGrade) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTerm = term.term.toLowerCase().includes(q);
        const matchesDef = term.definition.toLowerCase().includes(q);
        const matchesSimple = term.simpleExplanation.toLowerCase().includes(q);
        const matchesTags = term.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesFormula = term.formulaOrNotation?.toLowerCase().includes(q);
        if (!matchesTerm && !matchesDef && !matchesSimple && !matchesTags && !matchesFormula) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedGradeFilter]);

  if (!isOpen) return null;

  const handleCopy = (term: GlossaryTerm) => {
    const textToCopy = `${term.term}\nDefinition: ${term.definition}\nIntuition: ${term.simpleExplanation}\nExample: ${term.example}${term.formulaOrNotation ? `\nFormula: ${term.formulaOrNotation}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (term: GlossaryTerm) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === term.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText = `${term.term}. Definition: ${term.definition}. In simple terms: ${term.simpleExplanation}. Example: ${term.example}`;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(term.id);
    window.speechSynthesis.speak(utterance);
  };

  const getCategoryBadge = (cat: GlossaryTerm['category']) => {
    switch (cat) {
      case 'arithmetic':
        return { label: 'Arithmetic & Numbers', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
      case 'algebra':
        return { label: 'Algebra', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
      case 'geometry':
        return { label: 'Geometry', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-800' };
      case 'fractions':
        return { label: 'Fractions & Ratios', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border-purple-200 dark:border-purple-800' };
      case 'speed_math':
        return { label: 'Speed & Vedic Math', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border-rose-200 dark:border-rose-800' };
      case 'advanced':
        return { label: 'Advanced & Calculus', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' };
    }
  };

  // Render Visual Model Component
  const renderVisual = (term: GlossaryTerm) => {
    switch (term.visualType) {
      case 'fraction_bar':
        return (
          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Visual Proportion Model
            </div>
            {term.visualData?.bars?.map((bar: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  <span>{bar.label}</span>
                  <span>{Math.round((bar.num / bar.den) * 100)}%</span>
                </div>
                <div className="w-full h-5 bg-slate-200 dark:bg-slate-800 rounded-md overflow-hidden flex border border-slate-300 dark:border-slate-700">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-300"
                    style={{ width: `${(bar.num / bar.den) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'shape_triangle':
        return (
          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <svg viewBox="0 0 160 120" className="w-36 h-28 stroke-indigo-600 dark:stroke-indigo-400 fill-indigo-500/10 dark:fill-indigo-500/20">
              {/* Right Triangle */}
              <polygon points="20,100 140,100 140,20" strokeWidth="2.5" />
              {/* Right angle marker */}
              <polyline points="125,100 125,85 140,85" strokeWidth="1.5" fill="none" />
              {/* Labels */}
              <text x="75" y="115" textAnchor="middle" className="text-[10px] font-mono fill-slate-600 dark:fill-slate-300 font-bold">
                {term.visualData?.aLabel || 'Base a'}
              </text>
              <text x="145" y="65" textAnchor="start" className="text-[10px] font-mono fill-slate-600 dark:fill-slate-300 font-bold">
                {term.visualData?.bLabel || 'Height b'}
              </text>
              <text x="70" y="50" textAnchor="middle" className="text-[10px] font-mono fill-indigo-700 dark:fill-indigo-300 font-extrabold">
                {term.visualData?.cLabel || 'Hypotenuse c'}
              </text>
            </svg>
            <div className="text-right">
              <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Pythagorean Triple
              </span>
              <span className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
                3² + 4² = 5²
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                9 + 16 = 25
              </span>
            </div>
          </div>
        );

      case 'shape_circle':
        return (
          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <svg viewBox="0 0 140 120" className="w-32 h-28 stroke-amber-600 dark:stroke-amber-400">
              <circle cx="70" cy="60" r="45" strokeWidth="2.5" className="fill-amber-500/10 dark:fill-amber-500/20" />
              {/* Center point */}
              <circle cx="70" cy="60" r="3" className="fill-amber-600 dark:fill-amber-400" />
              {/* Radius line */}
              <line x1="70" y1="60" x2="115" y2="60" strokeWidth="2" strokeDasharray="3 3" />
              <text x="92" y="55" textAnchor="middle" className="text-[10px] font-mono fill-amber-700 dark:fill-amber-300 font-bold">
                r = 7 cm
              </text>
              {/* Diameter line */}
              <line x1="25" y1="60" x2="70" y2="60" strokeWidth="1.5" className="stroke-slate-400" />
            </svg>
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-mono">
              <div><span className="text-slate-400">Radius:</span> <strong>7 cm</strong></div>
              <div><span className="text-slate-400">Diameter:</span> <strong>14 cm (2r)</strong></div>
              <div><span className="text-slate-400">Circumference:</span> <strong>44 cm (2πr)</strong></div>
              <div><span className="text-slate-400">Area:</span> <strong className="text-amber-600 dark:text-amber-400">154 cm² (πr²)</strong></div>
            </div>
          </div>
        );

      case 'coordinate_grid':
        return (
          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <svg viewBox="0 0 140 120" className="w-32 h-28">
              {/* Grid lines */}
              <line x1="10" y1="60" x2="130" y2="60" strokeWidth="2" className="stroke-slate-500 dark:stroke-slate-400" />
              <line x1="70" y1="10" x2="70" y2="110" strokeWidth="2" className="stroke-slate-500 dark:stroke-slate-400" />
              {/* Arrows */}
              <text x="130" y="55" className="text-[9px] fill-slate-500 font-bold">+X</text>
              <text x="75" y="15" className="text-[9px] fill-slate-500 font-bold">+Y</text>
              {/* Point (3, 2) */}
              <circle cx="100" cy="40" r="4" className="fill-indigo-600 dark:fill-indigo-400" />
              <text x="105" y="38" className="text-[10px] font-mono fill-indigo-600 dark:fill-indigo-300 font-extrabold">(3, 2)</text>
              {/* Origin */}
              <circle cx="70" cy="60" r="2.5" className="fill-slate-700 dark:fill-slate-300" />
              <text x="56" y="72" className="text-[9px] font-mono fill-slate-400">(0,0)</text>
            </svg>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="font-bold text-indigo-700 dark:text-indigo-400">Quadrant I (+, +)</div>
              <div className="text-[11px] text-slate-500">X = 3 (3 units right)</div>
              <div className="text-[11px] text-slate-500">Y = 2 (2 units up)</div>
            </div>
          </div>
        );

      case 'vedic_card':
      case 'formula_card':
        return (
          <div className="bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800/60">
            <div className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider mb-1">
              {term.visualData?.title || 'Formula In Action'}
            </div>
            {term.visualData?.highlight && (
              <div className="text-sm sm:text-base font-black font-mono text-indigo-950 dark:text-indigo-200 my-1 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-900">
                {term.visualData.highlight}
              </div>
            )}
            {term.visualData?.line1 && (
              <div className="space-y-0.5 font-mono text-xs text-slate-700 dark:text-slate-300">
                <div>{term.visualData.line1}</div>
                {term.visualData.line2 && <div>{term.visualData.line2}</div>}
                {term.visualData.line3 && <div>{term.visualData.line3}</div>}
                {term.visualData.total && <div className="font-bold text-indigo-700 dark:text-indigo-300 pt-1 border-t border-indigo-200/50 dark:border-indigo-800/50">{term.visualData.total}</div>}
              </div>
            )}
            {term.visualData?.note && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {term.visualData.note}
              </div>
            )}
          </div>
        );

      case 'balance_scale':
        return (
          <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="text-center flex-1">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Left Pan</span>
              <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800 inline-block mt-0.5">
                {term.visualData?.left || '2x + 6'}
              </span>
            </div>
            <div className="text-lg font-black text-slate-400">=</div>
            <div className="text-center flex-1">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Right Pan</span>
              <span className="text-sm font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/60 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-800 inline-block mt-0.5">
                {term.visualData?.right || '14'}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[740px] max-h-[94vh] text-slate-900 dark:text-slate-100 transition-colors">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-indigo-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg font-black text-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight">
                  Math Concept Glossary
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold uppercase">
                  Class 1 - 12
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Clear definitions, intuitive everyday analogies &amp; interactive visual models
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Glossary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search math terms (e.g. Prime, Pythagoras, Discriminant, Nikhilam)..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Grade Selector Filter */}
            <div className="flex items-center gap-1.5 shrink-0 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-slate-500 dark:text-slate-400">Class:</span>
              <select
                value={selectedGradeFilter}
                onChange={(e) => setSelectedGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-transparent font-extrabold text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-white dark:bg-slate-900">All Classes (1-12)</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g} className="bg-white dark:bg-slate-900">
                    Class {g} {g === currentGrade ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {[
              { id: 'all', label: 'All Terms', icon: Layers },
              { id: 'arithmetic', label: 'Arithmetic', icon: Calculator },
              { id: 'algebra', label: 'Algebra', icon: Sparkles },
              { id: 'geometry', label: 'Geometry', icon: Compass },
              { id: 'fractions', label: 'Fractions', icon: Filter },
              { id: 'speed_math', label: 'Speed & Vedic', icon: Zap },
              { id: 'advanced', label: 'Advanced', icon: GraduationCap }
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as GlossaryCategory)}
                  className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}

            <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 pl-2 ml-auto shrink-0">
              {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
            </span>
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                No matching math concepts found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for broader keywords, or reset your class/category filters to browse all K-12 terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedGradeFilter('all');
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((term) => {
                const catBadge = getCategoryBadge(term.category);
                const isRelevantForCurrent = currentGrade >= term.minGrade && currentGrade <= term.maxGrade;

                return (
                  <div
                    key={term.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${catBadge.color}`}>
                          {catBadge.label}
                        </span>

                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {isRelevantForCurrent && (
                            <span className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                              Class {currentGrade} Core
                            </span>
                          )}
                          <span>Classes {term.minGrade}–{term.maxGrade}</span>
                        </div>
                      </div>

                      {/* Term Title & Pronunciation */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                            {term.term}
                          </h3>
                          {term.pronunciation && (
                            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                              {term.pronunciation}
                            </span>
                          )}
                        </div>

                        {/* Pronounce & Copy Audio Buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleSpeak(term)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              speakingId === term.id
                                ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600'
                            }`}
                            title="Listen to Definition & Explanation (Text to Speech)"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleCopy(term)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                            title="Copy Definition"
                          >
                            {copiedId === term.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Formal Definition */}
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                        {term.definition}
                      </p>

                      {/* "In Plain English" Analogy */}
                      <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 mb-3 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold mb-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>In Simple Words:</span>
                        </div>
                        <p className="text-amber-950 dark:text-amber-100/90 leading-relaxed">
                          {term.simpleExplanation}
                        </p>
                      </div>

                      {/* Visual Diagram or Model */}
                      {renderVisual(term)}

                      {/* Formula & Concrete Example */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 space-y-1.5 text-xs">
                        {term.formulaOrNotation && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase text-slate-400">Formula:</span>
                            <code className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                              {term.formulaOrNotation}
                            </code>
                          </div>
                        )}
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                          <strong className="text-slate-700 dark:text-slate-300">Example:</strong> {term.example}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    {onSelectTermForAI && (
                      <div className="mt-3 pt-2 flex items-center justify-end">
                        <button
                          onClick={() => {
                            onSelectTermForAI(term.term);
                            onClose();
                          }}
                          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span>Solve sample problems on this topic →</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
