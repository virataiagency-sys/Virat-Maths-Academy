import React, { useState } from 'react';
import { Scale, RotateCcw, ArrowRight, CheckCircle2, Sparkles, Plus, Minus, Divide } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EquationPreset {
  id: string;
  name: string;
  initialA: number; // coefficient of x
  initialB: number; // constant on LHS
  initialC: number; // constant on RHS
  display: string;
}

export const AlgebraBalanceVisualizer: React.FC = () => {
  const presets: EquationPreset[] = [
    { id: '1', name: 'Standard 2-Step', initialA: 2, initialB: 4, initialC: 14, display: '2x + 4 = 14' },
    { id: '2', name: 'Triple Mystery', initialA: 3, initialB: 6, initialC: 21, display: '3x + 6 = 21' },
    { id: '3', name: 'Four Boxes', initialA: 4, initialB: 8, initialC: 24, display: '4x + 8 = 24' },
    { id: '4', name: 'Single Step', initialA: 5, initialB: 0, initialC: 35, display: '5x = 35' },
  ];

  const [selectedPreset, setSelectedPreset] = useState<EquationPreset>(presets[0]);
  const [coeffA, setCoeffA] = useState(presets[0].initialA);
  const [constB, setConstB] = useState(presets[0].initialB);
  const [constC, setConstC] = useState(presets[0].initialC);
  const [stepLog, setStepLog] = useState<string[]>(['Initial state: ' + presets[0].display]);
  const [isSolved, setIsSolved] = useState(false);

  const resetToPreset = (preset: EquationPreset) => {
    setSelectedPreset(preset);
    setCoeffA(preset.initialA);
    setConstB(preset.initialB);
    setConstC(preset.initialC);
    setStepLog(['Initial state: ' + preset.display]);
    setIsSolved(false);
  };

  const handleSubtractConst = () => {
    if (constB === 0) return;
    const amount = constB;
    const newB = 0;
    const newC = constC - amount;
    setConstB(newB);
    setConstC(newC);
    setStepLog((prev) => [
      ...prev,
      `Subtracted ${amount} from both sides -> ${coeffA}x = ${newC}`,
    ]);

    if (coeffA === 1) {
      setIsSolved(true);
      try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
    }
  };

  const handleDivideCoeff = () => {
    if (coeffA <= 1) return;
    const divisor = coeffA;
    const newA = 1;
    const newC = constC / divisor;
    setCoeffA(newA);
    setConstC(newC);
    setStepLog((prev) => [
      ...prev,
      `Divided both sides by ${divisor} -> x = ${newC}`,
    ]);
    setIsSolved(true);
    try { confetti({ particleCount: 60, spread: 70 }); } catch (e) {}
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Algebra Balance Scale Visualizer</h2>
            <p className="text-xs text-slate-500">
              An equation is a physical seesaw. Maintain balance by performing the exact same operation on both sides!
            </p>
          </div>
        </div>

        <button
          onClick={() => resetToPreset(selectedPreset)}
          className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Equation</span>
        </button>
      </div>

      {/* Preset selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-bold text-slate-700 mr-1">Choose equation:</span>
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => resetToPreset(p)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
              selectedPreset.id === p.id
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {p.display}
          </button>
        ))}
      </div>

      {/* The Visual Balance Scale */}
      <div className="p-6 bg-slate-900 rounded-2xl text-white mb-6 shadow-inner relative overflow-hidden">
        {/* Current State Equation Banner */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Current Equation State
          </span>
          <div className="text-3xl font-extrabold font-mono tracking-wider text-white">
            {coeffA > 1 ? `${coeffA}x` : coeffA === 1 ? 'x' : '0'}
            {constB > 0 ? ` + ${constB}` : constB < 0 ? ` - ${Math.abs(constB)}` : ''}
            {' = '}
            {constC}
          </div>
        </div>

        {/* Seesaw Balance Graphic */}
        <div className="max-w-lg mx-auto py-4">
          <div className="relative">
            {/* The Horizontal Balance Beam */}
            <div className="h-3 bg-slate-700 rounded-full mx-auto relative shadow-md">
              {/* Left Pan Attachment */}
              <div className="absolute left-8 -bottom-16 w-36 flex flex-col items-center">
                <div className="w-0.5 h-12 bg-slate-500 mb-1" />
                <div className="w-full bg-slate-800 border-2 border-emerald-500/80 rounded-xl p-2.5 text-center shadow-lg">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    Left Pan (LHS)
                  </span>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap">
                    {Array.from({ length: coeffA }).map((_, i) => (
                      <span key={`box-${i}`} className="w-7 h-7 rounded bg-indigo-600 border border-indigo-400 text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                        x
                      </span>
                    ))}
                    {constB > 0 && (
                      <span className="px-2 py-1 rounded bg-amber-600 border border-amber-400 text-white text-xs font-mono font-bold">
                        +{constB}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Fulcrum (Center Pivot Triangle) */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-emerald-500" />

              {/* Right Pan Attachment */}
              <div className="absolute right-8 -bottom-16 w-36 flex flex-col items-center">
                <div className="w-0.5 h-12 bg-slate-500 mb-1" />
                <div className="w-full bg-slate-800 border-2 border-emerald-500/80 rounded-xl p-2.5 text-center shadow-lg">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    Right Pan (RHS)
                  </span>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 rounded bg-emerald-700 border border-emerald-500 text-white text-sm font-mono font-bold">
                      {constC}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-24"></div>
        </div>

        {/* Solved celebration banner */}
        {isSolved && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-400/50 rounded-xl text-center flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Success! The variable x is completely isolated: x = {constC}!</span>
          </div>
        )}
      </div>

      {/* Action Controls for isolating x */}
      <div className="space-y-3 mb-6">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          Available Balancing Operations
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleSubtractConst}
            disabled={constB === 0}
            className="p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950 font-semibold text-xs"
          >
            <div className="flex items-center gap-2">
              <Minus className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Subtract {constB || 'constant'} from both sides</span>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-700" />
          </button>

          <button
            onClick={handleDivideCoeff}
            disabled={coeffA <= 1}
            className="p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-50 hover:bg-indigo-100 border-indigo-300 text-indigo-950 font-semibold text-xs"
          >
            <div className="flex items-center gap-2">
              <Divide className="w-4 h-4 text-indigo-700 shrink-0" />
              <span>Divide both sides by coefficient {coeffA}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-700" />
          </button>
        </div>
      </div>

      {/* Step by Step Execution History Log */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <span className="text-xs font-bold text-slate-700 block mb-2">Algebraic Step Proof Log:</span>
        <div className="space-y-1">
          {stepLog.map((log, index) => (
            <div key={index} className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
