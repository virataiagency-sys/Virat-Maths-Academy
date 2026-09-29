import React, { useState, useEffect } from 'react';
import {
  ArithmeticOperation,
  arithmeticOperationsData,
  OperationDetail
} from '../data/arithmeticTricks';
import {
  Zap,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Calculator,
  Flame,
  Layers,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface Props {
  initialOperation?: ArithmeticOperation;
  onCompleteActivity?: (title: string) => void;
}

export function ArithmeticMasteryLab({ initialOperation = 'addition', onCompleteActivity }: Props) {
  const [activeOp, setActiveOp] = useState<ArithmeticOperation>(initialOperation);
  const [activeTab, setActiveTab] = useState<'techniques' | 'calculator' | 'speed_drill'>('techniques');

  const currentOpData = arithmeticOperationsData[activeOp];

  // Calculator State
  const [calcNum1, setCalcNum1] = useState<number>(47);
  const [calcNum2, setCalcNum2] = useState<number>(38);

  // Speed Drill State
  const [drillActive, setDrillActive] = useState(false);
  const [drillTimeLeft, setDrillTimeLeft] = useState(60);
  const [drillDuration, setDrillDuration] = useState<30 | 60 | 120>(60);
  const [drillQuestion, setDrillQuestion] = useState<{ n1: number; n2?: number; answer: number; text: string } | null>(null);
  const [drillUserAnswer, setDrillUserAnswer] = useState('');
  const [drillScore, setDrillScore] = useState(0);
  const [drillStreak, setDrillStreak] = useState(0);
  const [drillTotalAttempted, setDrillTotalAttempted] = useState(0);
  const [drillFinished, setDrillFinished] = useState(false);

  // Generate question for drill
  const generateDrillQuestion = () => {
    let n1 = 0;
    let n2 = 0;
    let answer = 0;
    let text = '';

    if (activeOp === 'addition') {
      n1 = Math.floor(Math.random() * 80) + 15;
      n2 = Math.floor(Math.random() * 80) + 12;
      answer = n1 + n2;
      text = `${n1} + ${n2}`;
    } else if (activeOp === 'subtraction') {
      const a = Math.floor(Math.random() * 120) + 40;
      const b = Math.floor(Math.random() * 70) + 10;
      n1 = Math.max(a, b);
      n2 = Math.min(a, b);
      answer = n1 - n2;
      text = `${n1} - ${n2}`;
    } else if (activeOp === 'multiplication') {
      n1 = Math.floor(Math.random() * 30) + 11;
      n2 = Math.floor(Math.random() * 12) + 2;
      answer = n1 * n2;
      text = `${n1} × ${n2}`;
    } else if (activeOp === 'division') {
      n2 = Math.floor(Math.random() * 8) + 2;
      answer = Math.floor(Math.random() * 25) + 3;
      n1 = n2 * answer;
      text = `${n1} ÷ ${n2}`;
    } else if (activeOp === 'square') {
      n1 = Math.floor(Math.random() * 35) + 5;
      answer = n1 * n1;
      text = `${n1}²`;
    } else if (activeOp === 'cube') {
      n1 = Math.floor(Math.random() * 12) + 2;
      answer = n1 * n1 * n1;
      text = `${n1}³`;
    }

    setDrillQuestion({ n1, n2, answer, text });
    setDrillUserAnswer('');
  };

  // Timer effect
  useEffect(() => {
    let timer: any = null;
    if (drillActive && drillTimeLeft > 0) {
      timer = setInterval(() => {
        setDrillTimeLeft(t => t - 1);
      }, 1000);
    } else if (drillActive && drillTimeLeft === 0) {
      setDrillActive(false);
      setDrillFinished(true);
      if (onCompleteActivity) {
        onCompleteActivity(`Speed Arithmetic Sprint (${activeOp})`);
      }
    }
    return () => clearInterval(timer);
  }, [drillActive, drillTimeLeft]);

  const handleStartDrill = () => {
    setDrillActive(true);
    setDrillFinished(false);
    setDrillTimeLeft(drillDuration);
    setDrillScore(0);
    setDrillStreak(0);
    setDrillTotalAttempted(0);
    generateDrillQuestion();
  };

  const handleSubmitDrillAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drillQuestion || !drillUserAnswer.trim()) return;

    const val = parseFloat(drillUserAnswer.trim());
    setDrillTotalAttempted(prev => prev + 1);

    if (val === drillQuestion.answer) {
      setDrillScore(prev => prev + 1);
      setDrillStreak(prev => prev + 1);
    } else {
      setDrillStreak(0);
    }

    generateDrillQuestion();
  };

  // Calculate live breakdown for Calculator Mode
  const getCalculationBreakdown = () => {
    const a = calcNum1;
    const b = calcNum2;

    if (activeOp === 'addition') {
      const sum = a + b;
      const nearest10 = Math.round(a / 10) * 10;
      const diff = nearest10 - a;
      return {
        standardResult: `${a} + ${b} = ${sum}`,
        vedicBreakdown: `Rounding method: Round ${a} to base ${nearest10} (${diff >= 0 ? `+${diff}` : diff}). Add to ${b}: ${nearest10} + ${b} = ${nearest10 + b}. Adjust by ${-diff}: Answer = ${sum}.`,
        abacusTip: `Soroban: Put ${a}. Add ${b} by first adding tens (+${Math.floor(b/10)*10}), then units (+${b%10}) using 5/10-complements.`
      };
    } else if (activeOp === 'subtraction') {
      const diff = a - b;
      return {
        standardResult: `${a} - ${b} = ${diff}`,
        vedicBreakdown: `Equal addition: Add complement of ${b} to base 10 or 100 to both numbers to eliminate borrowing.`,
        abacusTip: `Soroban: Represent ${a}. Clear tens from left rod, then subtract units on right rod.`
      };
    } else if (activeOp === 'multiplication') {
      const prod = a * b;
      return {
        standardResult: `${a} × ${b} = ${prod}`,
        vedicBreakdown: `Urdhva Tiryagbhyam (Vertically & Crosswise): Multiply unit digits (${a%10} × ${b%10}), cross-multiply and add, then multiply tens.`,
        abacusTip: `Soroban: Place multiplicand on left, accumulate products column by column.`
      };
    } else if (activeOp === 'division') {
      const q = Math.floor(a / (b || 1));
      const rem = a % (b || 1);
      return {
        standardResult: `${a} ÷ ${b} = ${q} with remainder ${rem}`,
        vedicBreakdown: `Paravartya Yojayet: Transpose divisor flag to compute single-line quotient and remainder.`,
        abacusTip: `Soroban: Successive subtraction of divisor multiples from dividend.`
      };
    } else if (activeOp === 'square') {
      const sq = a * a;
      const isEndingIn5 = a % 10 === 5;
      const tens = Math.floor(a / 10);
      return {
        standardResult: `${a}² = ${sq}`,
        vedicBreakdown: isEndingIn5
          ? `Ekadhikena Purvena: Since unit digit is 5, left part is ${tens} × (${tens} + 1) = ${tens * (tens + 1)}. Right part is 25. Result = ${sq}!`
          : `Duplex Method: a² | 2ab | b² for ${a} => (${tens})² | 2(${tens})(${a%10}) | (${a%10})² = ${sq}.`,
        abacusTip: `Geometric area: Decompose into ${tens*10}² + 2(${tens*10})(${a%10}) + (${a%10})² = ${sq}.`
      };
    } else if (activeOp === 'cube') {
      const cb = a * a * a;
      return {
        standardResult: `${a}³ = ${cb}`,
        vedicBreakdown: `Anurupyena ratio method: Form ratio row a³ | a²b | ab² | b³, double the middle terms and sum with carries = ${cb}.`,
        abacusTip: `3D Volume: Visualized as a 3D block decomposed into main core cube and 3 lateral prisms.`
      };
    }

    return { standardResult: '', vedicBreakdown: '', abacusTip: '' };
  };

  const breakdown = getCalculationBreakdown();

  return (
    <div className="space-y-6">
      {/* Operation Selection Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {(['addition', 'subtraction', 'multiplication', 'division', 'square', 'cube'] as ArithmeticOperation[]).map((opKey) => {
            const op = arithmeticOperationsData[opKey];
            const isSelected = activeOp === opKey;

            return (
              <button
                key={opKey}
                onClick={() => {
                  setActiveOp(opKey);
                  setDrillActive(false);
                  setDrillFinished(false);
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-700'
                }`}
              >
                <span className="text-xl font-black font-mono">{op.symbol}</span>
                <span className="text-xs font-bold">{op.title.replace(' Mastery', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Header Banner for Active Operation */}
      <div className={`bg-gradient-to-r ${currentOpData.colorScheme.gradient} rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden`}>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Speed Computation & Powers Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            {currentOpData.title}
          </h2>
          <p className="text-sm text-white/90 leading-relaxed mb-4">
            {currentOpData.tagline}
          </p>

          {/* Sub Mode Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { id: 'techniques', label: 'Speed Techniques & Formulas', icon: Flame },
              { id: 'calculator', label: 'Live Step-by-Step Calculator', icon: Calculator },
              { id: 'speed_drill', label: 'Rapid Mental Math Drill', icon: Clock }
            ].map((subTab) => {
              const Icon = subTab.icon;
              return (
                <button
                  key={subTab.id}
                  onClick={() => setActiveTab(subTab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === subTab.id
                      ? 'bg-white text-slate-900 shadow-md font-extrabold'
                      : 'bg-black/20 hover:bg-black/30 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{subTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: TECHNIQUES & FORMULAS */}
      {activeTab === 'techniques' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Overview Note */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-xs flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900">Key Cognitive Shift: </span>
              <span>{currentOpData.overview}</span>
            </div>
          </div>

          {/* Methods Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentOpData.methods.map((method, mIdx) => (
              <div
                key={mIdx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        method.source === 'Vedic Maths'
                          ? 'bg-rose-100 text-rose-800'
                          : method.source === 'Abacus Soroban'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {method.source}
                    </span>
                    <span className="text-xs font-bold text-slate-400">Method {mIdx + 1}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{method.name}</h3>
                  <p className="text-xs text-indigo-600 font-medium mb-3 italic">"{method.tagline}"</p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Execution Steps:
                    </span>
                    {method.steps.map((st, sIdx) => (
                      <div key={sIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="font-bold text-slate-400 shrink-0">{sIdx + 1}.</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Worked Example Box */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-800 font-bold">
                    <span>Example: {method.workedExample.input}</span>
                    <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-mono">
                      = {method.workedExample.result}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {method.workedExample.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: LIVE STEP-BY-STEP CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Interactive Algorithm Breakdown
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              Calculate & Inspect {currentOpData.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter any numbers to see how Standard, Vedic, and Abacus mental steps compare.
            </p>
          </div>

          {/* Number Inputs */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">First Number:</label>
              <input
                type="number"
                value={calcNum1}
                onChange={(e) => setCalcNum1(Number(e.target.value) || 0)}
                className="w-32 px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {activeOp !== 'square' && activeOp !== 'cube' && (
              <>
                <span className="text-2xl font-black text-slate-400 mt-5">{currentOpData.symbol}</span>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Second Number:</label>
                  <input
                    type="number"
                    value={calcNum2}
                    onChange={(e) => setCalcNum2(Number(e.target.value) || 1)}
                    className="w-32 px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </>
            )}

            {/* Quick Preset Buttons */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Quick Try:</label>
              <div className="flex items-center gap-1.5">
                {[
                  { n1: 85, n2: 35 },
                  { n1: 98, n2: 97 },
                  { n1: 65, n2: 25 },
                  { n1: 12, n2: 4 }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCalcNum1(preset.n1);
                      setCalcNum2(preset.n2);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-semibold cursor-pointer"
                  >
                    {activeOp === 'square' || activeOp === 'cube' ? preset.n1 : `${preset.n1}, ${preset.n2}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {/* Standard Result */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                1. Standard Result
              </span>
              <p className="text-base font-bold font-mono text-slate-900">{breakdown.standardResult}</p>
            </div>

            {/* Vedic Shortcut Breakdown */}
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-500" />
                <span>2. Vedic Speed Algorithm</span>
              </span>
              <p className="text-xs text-rose-950 font-medium leading-relaxed">
                {breakdown.vedicBreakdown}
              </p>
            </div>

            {/* Abacus / Spatial Model */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-500" />
                <span>3. Abacus & Spatial Mental Image</span>
              </span>
              <p className="text-xs text-amber-950 font-medium leading-relaxed">
                {breakdown.abacusTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: RAPID MENTAL MATH DRILL */}
      {activeTab === 'speed_drill' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Speed Drill Sprint
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                Mental {currentOpData.title} Arena
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Solve as many rapid arithmetic questions as you can before the clock expires!
              </p>
            </div>

            {/* Duration Selector */}
            {!drillActive && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Timer:</span>
                {[30, 60, 120].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDrillDuration(d as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      drillDuration === d
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            )}
          </div>

          {!drillActive && !drillFinished && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-sm">
                <Play className="w-8 h-8 fill-indigo-700 translate-x-0.5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Ready to Test Your Mental Speed?</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  You'll have {drillDuration} seconds to complete random {currentOpData.title} problems. Streak bonuses reward consecutive correct answers.
                </p>
              </div>
              <button
                onClick={handleStartDrill}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Start Sprint Now
              </button>
            </div>
          )}

          {drillActive && drillQuestion && (
            <div className="space-y-6 max-w-lg mx-auto py-4">
              {/* Dashboard Bar */}
              <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white rounded-2xl font-mono text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span>{drillTimeLeft}s</span>
                </div>
                <div>
                  Score: <span className="text-emerald-400 font-bold">{drillScore}</span>
                </div>
                <div>
                  Streak: <span className="text-orange-400 font-bold">🔥 {drillStreak}</span>
                </div>
              </div>

              {/* The Active Question */}
              <div className="text-center py-8 bg-slate-50 rounded-3xl border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Compute Mentally
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900 mt-2">
                  {drillQuestion.text}
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmitDrillAnswer} className="flex gap-2">
                <input
                  type="number"
                  autoFocus
                  value={drillUserAnswer}
                  onChange={(e) => setDrillUserAnswer(e.target.value)}
                  placeholder="Enter answer & press Enter..."
                  className="flex-1 text-center font-mono font-bold text-lg px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {/* Drill Finished Summary */}
          {drillFinished && (
            <div className="text-center py-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-200 space-y-4">
              <Award className="w-14 h-14 text-indigo-600 mx-auto" />
              <div>
                <h4 className="text-2xl font-black text-slate-900">Sprint Complete!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  You scored <span className="font-bold text-indigo-700">{drillScore}</span> correct out of{' '}
                  <span className="font-bold text-slate-800">{drillTotalAttempted}</span> attempted (
                  {drillTotalAttempted > 0 ? Math.round((drillScore / drillTotalAttempted) * 100) : 0}% accuracy).
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartDrill}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setDrillFinished(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Back to Hub
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
