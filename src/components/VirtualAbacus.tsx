import React, { useState } from 'react';
import { RotateCcw, Target, Award, Sparkles, Volume2, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RodState {
  upper: boolean; // true if upper bead is down (active = +5)
  lower: number;  // count of lower beads moved up (0 to 4, active = +1 each)
}

export const VirtualAbacus: React.FC = () => {
  // 7 rods: index 0 (Millions) to index 6 (Units)
  const rodNames = ['Millions', '100K', '10K', 'Thousands', 'Hundreds', 'Tens', 'Units'];
  const rodMultipliers = [1000000, 100000, 10000, 1000, 100, 10, 1];

  const [rods, setRods] = useState<RodState[]>([
    { upper: false, lower: 0 },
    { upper: false, lower: 0 },
    { upper: false, lower: 0 },
    { upper: false, lower: 0 },
    { upper: false, lower: 0 },
    { upper: false, lower: 0 },
    { upper: false, lower: 0 },
  ]);

  const [targetChallenge, setTargetChallenge] = useState<number | null>(null);
  const [challengeSuccess, setChallengeSuccess] = useState(false);

  // Compute current total value
  const currentValue = rods.reduce((acc, rod, idx) => {
    const rodVal = (rod.upper ? 5 : 0) + rod.lower;
    return acc + rodVal * rodMultipliers[idx];
  }, 0);

  const toggleUpper = (rodIndex: number) => {
    setRods((prev) => {
      const next = [...prev];
      next[rodIndex] = { ...next[rodIndex], upper: !next[rodIndex].upper };
      checkChallenge(next);
      return next;
    });
  };

  const setLowerCount = (rodIndex: number, beadIndex: number) => {
    // beadIndex 0 is top lower bead, 3 is bottom lower bead
    // If clicking beadIndex, and current lower count is >= beadIndex + 1, deactivate down to beadIndex
    // Otherwise activate up to beadIndex + 1
    setRods((prev) => {
      const next = [...prev];
      const current = next[rodIndex].lower;
      const targetCount = beadIndex + 1;
      const newLower = current === targetCount ? targetCount - 1 : targetCount;
      next[rodIndex] = { ...next[rodIndex], lower: newLower };
      checkChallenge(next);
      return next;
    });
  };

  const resetAbacus = () => {
    setRods(Array(7).fill({ upper: false, lower: 0 }));
    setChallengeSuccess(false);
  };

  const generateNewChallenge = () => {
    // Random 2 or 3 digit number for friendly student practice
    const num = Math.floor(Math.random() * 899) + 12;
    setTargetChallenge(num);
    setChallengeSuccess(false);
  };

  const checkChallenge = (currentRods: RodState[]) => {
    if (targetChallenge === null) return;
    const val = currentRods.reduce((acc, rod, idx) => {
      const rodVal = (rod.upper ? 5 : 0) + rod.lower;
      return acc + rodVal * rodMultipliers[idx];
    }, 0);

    if (val === targetChallenge) {
      setChallengeSuccess(true);
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      setChallengeSuccess(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm max-w-4xl mx-auto">
      {/* Top Banner & Control Deck */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 mb-6">
        <div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Interactive Tactile Tool
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">Virtual Soroban Abacus (7 Rods)</h2>
          <p className="text-xs text-slate-500">
            Click beads to move them towards the reckoning bar. Upper bead = 5, Lower beads = 1 each.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetAbacus}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Beads</span>
          </button>

          <button
            onClick={generateNewChallenge}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Target className="w-3.5 h-3.5" />
            <span>{targetChallenge ? 'New Challenge' : 'Play Challenge'}</span>
          </button>
        </div>
      </div>

      {/* Target Challenge Prompt if active */}
      {targetChallenge !== null && (
        <div className={`p-4 rounded-xl border mb-6 flex items-center justify-between transition-all ${
          challengeSuccess
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${challengeSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {challengeSuccess ? <Sparkles className="w-5 h-5" /> : <Target className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">
                {challengeSuccess ? 'Target Achieved! 🎉' : 'Target Challenge Goal'}
              </span>
              <span className="text-lg font-extrabold font-mono">
                Set number: {targetChallenge.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Your Current Value:</span>
            <span className={`text-xl font-extrabold font-mono ${challengeSuccess ? 'text-emerald-700' : 'text-slate-800'}`}>
              {currentValue.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Abacus Numerical Readout Display */}
      <div className="p-4 bg-slate-900 rounded-xl text-white mb-6 flex items-center justify-between shadow-inner">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Current Soroban Value
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-tight">
            {currentValue.toLocaleString()}
          </span>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs text-slate-400 block">Active Formula:</span>
          <span className="text-xs font-mono text-slate-200">
            {rods.map((r, i) => ((r.upper ? 5 : 0) + r.lower)).join(' · ')}
          </span>
        </div>
      </div>

      {/* The Physical Soroban Frame */}
      <div className="relative bg-amber-950 p-4 sm:p-6 rounded-2xl border-4 border-amber-900 shadow-xl overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Rod Labels at the top */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-2 text-center">
            {rodNames.map((name, idx) => (
              <div key={idx} className="text-[10px] sm:text-xs font-bold text-amber-200/80 truncate">
                {name}
              </div>
            ))}
          </div>

          {/* Abacus Box */}
          <div className="relative bg-amber-900/40 rounded-xl p-3 sm:p-5 border-2 border-amber-800">
            {/* 7 Vertical Wooden Rods */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {rods.map((rod, rodIdx) => {
                const rodValue = (rod.upper ? 5 : 0) + rod.lower;
                const isUnitRod = rodIdx === 6;
                const isThousandsRod = rodIdx === 3;

                return (
                  <div key={rodIdx} className="flex flex-col items-center relative py-1">
                    {/* Background metal/wooden rod line */}
                    <div className="absolute top-0 bottom-0 w-1 bg-amber-700/80 rounded-full z-0" />

                    {/* UPPER DECK (Heaven Bead: worth 5) */}
                    <div className="h-16 flex flex-col justify-between items-center z-10 w-full mb-1">
                      <button
                        onClick={() => toggleUpper(rodIdx)}
                        className={`w-10 sm:w-12 h-6 sm:h-7 rounded-md shadow-md border transition-transform cursor-pointer flex items-center justify-center font-mono text-[10px] font-bold ${
                          rod.upper
                            ? 'translate-y-9 bg-amber-500 border-amber-400 text-amber-950 shadow-inner'
                            : 'translate-y-0 bg-amber-600 hover:bg-amber-500 border-amber-500 text-amber-100'
                        }`}
                        title={`Heaven Bead: ${rod.upper ? 'Active (+5)' : 'Inactive'}`}
                      >
                        5
                      </button>
                    </div>

                    {/* RECKONING BAR (Center Beam with White Dot Markers) */}
                    <div className="w-full h-3 sm:h-3.5 bg-slate-900 border-y border-amber-950 flex items-center justify-center z-20 my-1 relative shadow-sm">
                      {(isUnitRod || isThousandsRod) && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white shadow-xs" title="Reckoning Dot" />
                      )}
                    </div>

                    {/* LOWER DECK (4 Earth Beads: each worth 1) */}
                    <div className="h-36 sm:h-40 flex flex-col justify-end items-center z-10 w-full gap-1 pt-1">
                      {[0, 1, 2, 3].map((beadIdx) => {
                        const isMovedUp = beadIdx < rod.lower;
                        return (
                          <button
                            key={beadIdx}
                            onClick={() => setLowerCount(rodIdx, beadIdx)}
                            className={`w-10 sm:w-12 h-6 sm:h-7 rounded-md shadow-md border transition-transform cursor-pointer flex items-center justify-center font-mono text-[10px] font-bold ${
                              isMovedUp
                                ? 'bg-amber-400 border-amber-300 text-amber-950 shadow-inner -translate-y-4 sm:-translate-y-6'
                                : 'bg-amber-600 hover:bg-amber-500 border-amber-500 text-amber-100 translate-y-0'
                            }`}
                            title={`Earth Bead: ${isMovedUp ? 'Active (+1)' : 'Inactive'}`}
                          >
                            1
                          </button>
                        );
                      })}
                    </div>

                    {/* Single rod digit value indicator at bottom */}
                    <div className="mt-3 bg-amber-950/80 text-amber-300 text-xs sm:text-sm font-bold font-mono px-2 py-0.5 rounded border border-amber-800/80">
                      {rodValue}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Guide Footer */}
      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-900 block">How to Read &amp; Move the Soroban:</span>
          <p>
            • <strong>Heaven Bead (Top):</strong> Moves DOWN to the beam to add 5. Moves UP away from beam to subtract 5.
          </p>
          <p>
            • <strong>Earth Beads (Bottom 4):</strong> Move UP to the beam to add 1 each. Move DOWN away from beam to clear.
          </p>
          <p>
            • <strong>White Dots:</strong> Indicate key unit places (Units and Thousands rods).
          </p>
        </div>
      </div>
    </div>
  );
};
