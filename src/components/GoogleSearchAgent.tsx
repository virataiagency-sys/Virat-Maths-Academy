import React, { useState, useEffect, useMemo } from 'react';
import {
  Globe,
  Search,
  ExternalLink,
  Loader2,
  Sparkles,
  CheckCircle2,
  Sliders,
  Filter,
  GraduationCap,
  Layers,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Info,
  ChevronDown
} from 'lucide-react';
import { PillarType, GradeLevel } from '../types/curriculum';

export interface GoogleSearchAgentProps {
  grade?: GradeLevel | number;
  pillar?: PillarType | string;
  topic?: string;
}

const PILLAR_CONFIGS: Record<
  string,
  { label: string; icon: string; badgeColor: string; description: string; queryKeywords: string }
> = {
  basic_maths: {
    label: 'Basic Maths & CBSE/NCERT',
    icon: '📐',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Foundational concepts, textbook curriculum, real-world examples & step-by-step reasoning',
    queryKeywords: 'CBSE NCERT foundational math concepts and step-by-step curriculum'
  },
  algebra: {
    label: 'Algebra & Equations',
    icon: '🔣',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Linear & quadratic equations, polynomial factorization, graphs & algebraic methods',
    queryKeywords: 'algebra equations expressions and polynomial factorization'
  },
  abacus: {
    label: 'Abacus & Mental Calculation',
    icon: '🧮',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Soroban abacus bead mechanics, visual memory, rapid mental arithmetic & speed techniques',
    queryKeywords: 'Soroban abacus bead visualization rapid mental calculation'
  },
  vedic_maths: {
    label: 'Vedic Math & Speed Sutras',
    icon: '⚡',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: '16 ancient Vedic sutras, left-to-right shortcuts, zero-carry addition & lightning multiplication',
    queryKeywords: 'Vedic mathematics speed sutras mental math shortcuts'
  }
};

export function GoogleSearchAgent({ grade: initialGrade, pillar: initialPillar, topic }: GoogleSearchAgentProps) {
  // Automatically parse user grade level from props or localStorage
  const parsedGrade = useMemo<number>(() => {
    if (typeof initialGrade === 'number' && initialGrade >= 1 && initialGrade <= 12) {
      return initialGrade;
    }
    try {
      const savedInstructions = localStorage.getItem('mathemagix_custom_instructions');
      if (savedInstructions) {
        const parsed = JSON.parse(savedInstructions);
        if (parsed?.gradeLevel) return Number(parsed.gradeLevel);
      }
    } catch {}
    return 6; // sensible default
  }, [initialGrade]);

  // Automatically parse active curriculum pillar from props or default
  const parsedPillar = useMemo<string>(() => {
    if (initialPillar && typeof initialPillar === 'string') {
      return initialPillar;
    }
    return 'basic_maths';
  }, [initialPillar]);

  // Active state with user override ability
  const [selectedGrade, setSelectedGrade] = useState<number>(parsedGrade);
  const [selectedPillar, setSelectedPillar] = useState<string>(parsedPillar);
  const [appendContextQualifiers, setAppendContextQualifiers] = useState<boolean>(true);
  const [showQualifierSettings, setShowQualifierSettings] = useState<boolean>(false);

  // Sync state if props change
  useEffect(() => {
    if (initialGrade) setSelectedGrade(initialGrade);
  }, [initialGrade]);

  useEffect(() => {
    if (initialPillar) setSelectedPillar(initialPillar);
  }, [initialPillar]);

  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    grade?: number;
    pillar?: string;
    grounding: {
      searchQueries: string[];
      searchChunks: Array<{ web?: { uri?: string; title?: string } }>;
    };
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const activePillarConfig = PILLAR_CONFIGS[selectedPillar] || PILLAR_CONFIGS.basic_maths;

  // Age group derivation
  const ageGroupText = useMemo(() => {
    if (selectedGrade <= 3) return `Primary (Ages ${selectedGrade + 5}-${selectedGrade + 6})`;
    if (selectedGrade <= 8) return `Middle School (Ages ${selectedGrade + 5}-${selectedGrade + 6})`;
    return `Secondary (Ages ${selectedGrade + 5}-${selectedGrade + 6})`;
  }, [selectedGrade]);

  // Dynamic context qualifiers string
  const contextQualifiersString = useMemo(() => {
    return `Class ${selectedGrade} (${ageGroupText}) · ${activePillarConfig.label}`;
  }, [selectedGrade, ageGroupText, activePillarConfig]);

  // Age- and curriculum-adapted trending exploration queries
  const dynamicSampleQueries = useMemo(() => {
    const g = selectedGrade;
    if (selectedPillar === 'vedic_maths') {
      return [
        `Class ${g} Vedic math: Nikhilam sutra for rapid multiplication near base 100`,
        `Class ${g} Vedic division shortcuts using Paravartya Yojayet`,
        `Historical origin of 16 Vedic Mathematics sutras by Bharati Krishna Tirthaji`,
        `Vedic math square roots and cube roots 5-second mental algorithms for Class ${g}`,
        `Recent research studies: Does Vedic mental math increase Olympiad arithmetic speed?`
      ];
    }
    if (selectedPillar === 'abacus') {
      return [
        `Class ${g} Soroban abacus: 5-complement and 10-complement bead formulas`,
        `Recent World Abacus & Mental Arithmetic Association (WAAMA) championship results`,
        `Neuroscience research on abacus visual calculation and right-brain development`,
        `Class ${g} mental abacus (Anzan) speed training drills and flash calculation`,
        `How Soroban abacus helps Class ${g} students eliminate paper borrowing in subtraction`
      ];
    }
    if (selectedPillar === 'algebra') {
      return [
        `Class ${g} algebra: Latest CBSE board syllabus circulars & question blueprint`,
        `Real-world STEM applications: How linear & quadratic equations guide satellite orbits`,
        `Fact-check: Has the Riemann Hypothesis or Birch-Swinnerton-Dyer Conjecture been proved?`,
        `Class ${g} polynomial factorization and synthetic division speed tricks`,
        `DeepMind AlphaProof and AlphaGeometry: Recent AI breakthroughs in algebraic geometry`
      ];
    }
    // Default: basic_maths
    return [
      `Latest CBSE & NCERT Class ${g} mathematics sample paper circulars & exam updates`,
      `Who won the most recent International Mathematical Olympiad (IMO) and top problems?`,
      `Class ${g} geometric proofs: Visualizing the Pythagorean theorem without equations`,
      `Recent breakthroughs in prime numbers, twin primes, and mathematical conjectures`,
      `Practical classroom math: Best visual models for teaching fractions to Class ${g}`
    ];
  }, [selectedGrade, selectedPillar]);

  const handleSearch = async (textToSearch?: string) => {
    const rawQuery = (textToSearch || query).trim();
    if (!rawQuery) return;

    setIsLoading(true);
    setErrorMessage(null);

    // Build the qualified query when qualifiers are active
    const qualifiedQuery = appendContextQualifiers
      ? `${rawQuery} (Context: Class ${selectedGrade} school level, ${activePillarConfig.label} curriculum alignment)`
      : rawQuery;

    try {
      const res = await fetch('/api/gemini/search-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: rawQuery,
          qualifiedQuery,
          grade: selectedGrade,
          pillar: activePillarConfig.label,
          topic: topic || undefined
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error('Search error:', err);
      setErrorMessage(err.message || 'Failed to query search-grounded agent.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.text);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-300" />
            <span>Google Search Grounded Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Real-Time Math News &amp; Fact-Checking Agent
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-4">
            Powered by live Google Search grounding. Queries are automatically enriched with your current grade level
            and active curriculum pillar to ensure age-appropriate vocabulary, educational alignment, and verified web citations.
          </p>

          {/* Active Context Qualifier Summary Tag */}
          <div className="inline-flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/20 text-xs">
            <span className="text-blue-300 font-semibold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-300" />
              <span>Auto-Parsed Context:</span>
            </span>
            <span className="font-bold text-white bg-blue-600/60 px-2 py-0.5 rounded-lg border border-blue-400/40">
              Class {selectedGrade}
            </span>
            <span className="text-blue-300 font-bold">·</span>
            <span className="font-bold text-white bg-indigo-600/60 px-2 py-0.5 rounded-lg border border-indigo-400/40 flex items-center gap-1">
              <span>{activePillarConfig.icon}</span>
              <span>{activePillarConfig.label}</span>
            </span>
            <span className="text-blue-300 font-bold">·</span>
            <span className="text-emerald-300 font-medium text-[11px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{appendContextQualifiers ? 'Qualifiers Active' : 'Direct Search'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Query Input Card with Context Qualifiers Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        {/* Qualifier Tuning Bar */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold shrink-0">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">
                  Search Context Qualifiers:
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activePillarConfig.badgeColor}`}>
                  {activePillarConfig.icon} {activePillarConfig.label}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  Class {selectedGrade}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {appendContextQualifiers
                  ? `Qualifying search for Class ${selectedGrade} level and ${activePillarConfig.label}.`
                  : 'Searching without grade qualifiers.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Toggle Qualifiers On/Off */}
            <button
              onClick={() => setAppendContextQualifiers(!appendContextQualifiers)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                appendContextQualifiers
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
              }`}
              title="Toggle automatic grade and curriculum qualifiers"
            >
              <span>{appendContextQualifiers ? '✓ Qualifiers Applied' : 'Qualifiers Paused'}</span>
            </button>

            {/* Customize Grade/Pillar Override Dropdown */}
            <button
              onClick={() => setShowQualifierSettings(!showQualifierSettings)}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showQualifierSettings
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
              }`}
              title="Customize search grade and curriculum pillar"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Qualifier Settings Expansion Drawer */}
        {showQualifierSettings && (
          <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-4 space-y-3 animate-fadeIn text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Adjust Search Target Grade &amp; Pillar Context</span>
              </span>
              <button
                onClick={() => {
                  setSelectedGrade(parsedGrade);
                  setSelectedPillar(parsedPillar);
                }}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to App Defaults</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Target Grade Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Target Grade Level:
                </label>
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                        selectedGrade === g
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Class {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Pillar Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Target Curriculum Domain:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(PILLAR_CONFIGS).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPillar(key)}
                      className={`p-2 rounded-xl text-left font-bold transition-all cursor-pointer border ${
                        selectedPillar === key
                          ? 'bg-white border-blue-500 shadow-xs ring-2 ring-blue-500/20 text-blue-900'
                          : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[11px]">
                        <span>{config.icon}</span>
                        <span className="truncate">{config.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Context String Preview */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>
                Search qualifier token:{' '}
                <code className="text-blue-700 font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  Class {selectedGrade} ({ageGroupText}) · {activePillarConfig.label}
                </code>
              </span>
              <span className="text-emerald-600 font-bold">✓ Age &amp; Syllabus Filter Applied</span>
            </div>
          </div>
        )}

        {/* Search Input Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={`Ask about Class ${selectedGrade} math news, ${activePillarConfig.label}, or CBSE/ICSE updates...`}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
          </div>

          <button
            onClick={() => handleSearch()}
            disabled={isLoading || !query.trim()}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl transition-all shadow-md hover:shadow-blue-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
            <span>Search Live</span>
          </button>
        </div>

        {/* Dynamic Context-Aware Trending Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                Trending Explorations for Class {selectedGrade} ({activePillarConfig.label}):
              </span>
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {dynamicSampleQueries.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(sq);
                  handleSearch(sq);
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-all border border-slate-200/80 cursor-pointer text-left flex items-center gap-1.5"
              >
                <span className="text-blue-500 text-[10px]">↳</span>
                <span>{sq}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-center gap-2">
          <Info className="w-4 h-4 text-rose-600 shrink-0" />
          <div>
            <span className="font-bold">Search Error: </span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Grounded Result Display */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
          {/* Result Header Bar */}
          <div className="bg-slate-900 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-400/30">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Grounded with Real-Time Google Search</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px]">
                    Class {result.grade || selectedGrade} Aligned
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Target Domain: <strong className="text-slate-300">{result.pillar || activePillarConfig.label}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyResult}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                title="Copy response"
              >
                {copiedResponse ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedResponse ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Grounding Search Queries Tags */}
            {result.grounding.searchQueries && result.grounding.searchQueries.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                <span className="font-bold text-slate-600 text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Search className="w-3 h-3 text-blue-500" />
                  <span>Google Search Queries Executed:</span>
                </span>
                {result.grounding.searchQueries.map((sq, sIdx) => (
                  <span
                    key={sIdx}
                    className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-md font-mono text-[11px] text-slate-700"
                  >
                    "{sq}"
                  </span>
                ))}
              </div>
            )}

            {/* Formatted Answer Text */}
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
              {result.text}
            </div>

            {/* Citations & Web Sources */}
            {result.grounding.searchChunks && result.grounding.searchChunks.length > 0 && (
              <div className="pt-5 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verified Web Citations &amp; Live Sources</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {result.grounding.searchChunks
                    .filter((c) => c.web?.uri)
                    .map((chunk, cIdx) => (
                      <a
                        key={cIdx}
                        href={chunk.web?.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/70 hover:border-blue-300 transition-all flex items-center justify-between text-xs text-slate-700 group cursor-pointer shadow-2xs"
                      >
                        <span className="truncate font-semibold text-slate-800 group-hover:text-blue-700">
                          {chunk.web?.title || chunk.web?.uri}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
