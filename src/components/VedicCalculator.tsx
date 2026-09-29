import React, { useState } from 'react';
import { Flame, ArrowRight, Sparkles, Check, Play, BookOpen } from 'lucide-react';

type SutraKey = 'ekadhikena' | 'nikhilam' | 'urdhva' | 'ekanyunena' | 'eleven';

export const VedicCalculator: React.FC = () => {
  const [activeSutra, setActiveSutra] = useState<SutraKey>('ekadhikena');

  // State for Ekadhikena
  const [ekNum, setEkNum] = useState<number>(75);

  // State for Nikhilam
  const [nikNum1, setNikNum1] = useState<number>(96);
  const [nikNum2, setNikNum2] = useState<number>(93);

  // State for Urdhva
  const [urdNum1, setUrdNum1] = useState<number>(23);
  const [urdNum2, setUrdNum2] = useState<number>(14);

  // State for Ekanyunena
  const [ekyNum, setEkyNum] = useState<number>(47);

  // State for Multiply by 11
  const [elevenNum, setElevenNum] = useState<number>(58);

  const sutras: { key: SutraKey; name: string; english: string; tag: string }[] = [
    { key: 'ekadhikena', name: 'Ekadhikena Purvena', english: 'By One More than the Previous', tag: 'Fast Squares ending in 5' },
    { key: 'nikhilam', name: 'Nikhilam Navatashcaramam', english: 'All from 9 & Last from 10', tag: 'Base 100 / 1000 Multiplication' },
    { key: 'urdhva', name: 'Urdhva Tiryagbhyam', english: 'Vertically & Crosswise', tag: 'General 2-Digit Multiplication' },
    { key: 'ekanyunena', name: 'Ekanyunena Purvena', english: 'By One Less than the Previous', tag: 'Multiplication by 99 / 999' },
    { key: 'eleven', name: 'Multiply by 11', english: 'Sandwich Addition Method', tag: 'Instant 11 Multiplication' },
  ];

  // Render calculation details for Ekadhikena
  const renderEkadhikena = () => {
    const tens = Math.floor(ekNum / 10);
    const leftPart = tens * (tens + 1);
    const rightPart = 25;
    const finalAnswer = leftPart * 100 + rightPart;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold text-slate-700">Square a number ending in 5:</label>
          <div className="flex items-center gap-2">
            {[25, 45, 75, 85, 95, 115].map((preset) => (
              <button
                key={preset}
                onClick={() => setEkNum(preset)}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border cursor-pointer ${
                  ekNum === preset ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl text-white">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="text-xs text-rose-400 font-bold uppercase">Sutra Formula</span>
            <span className="text-xs font-mono text-slate-300">Answer = [ n x (n + 1) ] | 25</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center my-3">
            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">1. Previous Digit (Tens)</span>
              <span className="text-lg font-mono font-bold text-amber-300">{tens}</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">2. Left Part: {tens} x ({tens} + 1)</span>
              <span className="text-lg font-mono font-bold text-rose-400">{leftPart}</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">3. Right Part (Always 5^2)</span>
              <span className="text-lg font-mono font-bold text-emerald-400">25</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Final Square ({ekNum}²):</span>
            <span className="text-2xl font-mono font-extrabold text-amber-300">
              {finalAnswer.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render calculation details for Nikhilam
  const renderNikhilam = () => {
    const base = 100;
    const dev1 = nikNum1 - base;
    const dev2 = nikNum2 - base;
    const leftPart = nikNum1 + dev2;
    const rightPart = dev1 * dev2;
    const rightFormatted = String(rightPart).padStart(2, '0');
    const finalAnswer = leftPart * 100 + rightPart;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-700">Preset pairs near Base 100:</span>
          {[
            [96, 93],
            [98, 97],
            [104, 107],
            [105, 108]
          ].map(([p1, p2]) => (
            <button
              key={`${p1}x${p2}`}
              onClick={() => { setNikNum1(p1); setNikNum2(p2); }}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border cursor-pointer ${
                nikNum1 === p1 && nikNum2 === p2 ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {p1} x {p2}
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-900 rounded-xl text-white">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="text-xs text-rose-400 font-bold uppercase">Sutra Base = 100</span>
            <span className="text-xs font-mono text-slate-300">Deviations: {dev1 >= 0 ? `+${dev1}` : dev1} and {dev2 >= 0 ? `+${dev2}` : dev2}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center my-3">
            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Left Part (Cross-Addition)</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                {nikNum1} + ({dev2}) = {leftPart}
              </span>
              <span className="text-xl font-mono font-bold text-rose-400">{leftPart}</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Right Part (Deviations Product)</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                ({dev1}) x ({dev2}) = {rightPart}
              </span>
              <span className="text-xl font-mono font-bold text-emerald-400">{rightFormatted}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Product ({nikNum1} x {nikNum2}):</span>
            <span className="text-2xl font-mono font-extrabold text-amber-300">
              {finalAnswer.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render calculation details for Urdhva
  const renderUrdhva = () => {
    const a1 = Math.floor(urdNum1 / 10);
    const a0 = urdNum1 % 10;
    const b1 = Math.floor(urdNum2 / 10);
    const b0 = urdNum2 % 10;

    const step1 = a0 * b0; // units
    const step1Unit = step1 % 10;
    const carry1 = Math.floor(step1 / 10);

    const step2 = (a1 * b0) + (a0 * b1) + carry1; // cross
    const step2Unit = step2 % 10;
    const carry2 = Math.floor(step2 / 10);

    const step3 = (a1 * b1) + carry2; // tens
    const finalAnswer = urdNum1 * urdNum2;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-700">Preset 2-Digit pairs:</span>
          {[
            [23, 14],
            [31, 21],
            [42, 33],
            [54, 25]
          ].map(([p1, p2]) => (
            <button
              key={`${p1}x${p2}`}
              onClick={() => { setUrdNum1(p1); setUrdNum2(p2); }}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border cursor-pointer ${
                urdNum1 === p1 && urdNum2 === p2 ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {p1} x {p2}
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-900 rounded-xl text-white">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="text-xs text-rose-400 font-bold uppercase">3-Stage Crosswise Arrow Pattern</span>
            <span className="text-xs font-mono text-slate-300">[ | ]  [ X ]  [ | ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center my-3">
            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Step 1: Vertical Right</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">{a0} x {b0} = {step1}</span>
              <span className="text-lg font-mono font-bold text-emerald-400">
                Unit: {step1Unit} {carry1 > 0 ? `(Carry ${carry1})` : ''}
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Step 2: Crosswise Sum</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                ({a1}x{b0}) + ({a0}x{b1}) + {carry1} = {step2}
              </span>
              <span className="text-lg font-mono font-bold text-amber-400">
                Middle: {step2Unit} {carry2 > 0 ? `(Carry ${carry2})` : ''}
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Step 3: Vertical Left</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">
                ({a1} x {b1}) + {carry2} = {step3}
              </span>
              <span className="text-lg font-mono font-bold text-rose-400">
                Left: {step3}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Single Line Product ({urdNum1} x {urdNum2}):</span>
            <span className="text-2xl font-mono font-extrabold text-amber-300">
              {finalAnswer.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render calculation details for Ekanyunena
  const renderEkanyunena = () => {
    const leftPart = ekyNum - 1;
    const compTen = 100 - ekyNum;
    const finalAnswer = leftPart * 100 + compTen;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-700">Multiply any 2-digit number by 99:</span>
          {[24, 38, 47, 65, 82, 94].map((preset) => (
            <button
              key={preset}
              onClick={() => setEkyNum(preset)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border cursor-pointer ${
                ekyNum === preset ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {preset} x 99
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-900 rounded-xl text-white">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="text-xs text-rose-400 font-bold uppercase">Sutra: One Less Than The Previous</span>
            <span className="text-xs font-mono text-slate-300">Left: (N - 1) | Right: Complement from 100</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center my-3">
            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Left Half: Subtract 1</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">{ekyNum} - 1</span>
              <span className="text-2xl font-mono font-bold text-rose-400">{leftPart}</span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Right Half: Nikhilam Complement</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">100 - {ekyNum}</span>
              <span className="text-2xl font-mono font-bold text-emerald-400">{compTen}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Instant Product ({ekyNum} x 99):</span>
            <span className="text-2xl font-mono font-extrabold text-amber-300">
              {finalAnswer.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Render calculation details for Multiply by 11
  const renderEleven = () => {
    const tens = Math.floor(elevenNum / 10);
    const units = elevenNum % 10;
    const sumMiddle = tens + units;
    const finalAnswer = elevenNum * 11;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-700">Multiply by 11:</span>
          {[24, 35, 43, 58, 67, 89].map((preset) => (
            <button
              key={preset}
              onClick={() => setElevenNum(preset)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md border cursor-pointer ${
                elevenNum === preset ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {preset} x 11
            </button>
          ))}
        </div>

        <div className="p-4 bg-slate-900 rounded-xl text-white">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="text-xs text-rose-400 font-bold uppercase">The Sandwich Rule</span>
            <span className="text-xs font-mono text-slate-300">Head: {tens} | Filling: {tens} + {units} | Tail: {units}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center my-3">
            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Left Bread (Tens)</span>
              <span className="text-xl font-mono font-bold text-rose-400">
                {sumMiddle >= 10 ? `${tens} + 1 = ${tens + 1}` : tens}
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Sandwich Middle Sum</span>
              <span className="text-xs font-mono text-slate-300 block mb-1">{tens} + {units} = {sumMiddle}</span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {sumMiddle % 10} {sumMiddle >= 10 ? '(Carry 1)' : ''}
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg">
              <span className="text-[11px] text-slate-400 block mb-1">Right Bread (Units)</span>
              <span className="text-xl font-mono font-bold text-emerald-400">{units}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Calculated Product ({elevenNum} x 11):</span>
            <span className="text-2xl font-mono font-extrabold text-amber-300">
              {finalAnswer.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 mb-6">
        <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
          <Flame className="w-6 h-6 fill-rose-500 text-rose-600" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Vedic Speed Math Interactive Lab</h2>
          <p className="text-xs text-slate-500">
            Witness how 16 ancient Sanskrit sutras turn complex arithmetic into mental reflex in seconds.
          </p>
        </div>
      </div>

      {/* Sutra Selector Segmented Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
        {sutras.map((s) => {
          const isActive = activeSutra === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setActiveSutra(s.key)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-200 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <span className={`text-xs font-extrabold block truncate ${isActive ? 'text-rose-900' : 'text-slate-900'}`}>
                {s.name}
              </span>
              <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                {s.english}
              </span>
              <span className={`text-[10px] font-bold block mt-1 ${isActive ? 'text-rose-600' : 'text-slate-400'}`}>
                {s.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Sutra Interactive Workbench */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        {activeSutra === 'ekadhikena' && renderEkadhikena()}
        {activeSutra === 'nikhilam' && renderNikhilam()}
        {activeSutra === 'urdhva' && renderUrdhva()}
        {activeSutra === 'ekanyunena' && renderEkanyunena()}
        {activeSutra === 'eleven' && renderEleven()}
      </div>
    </div>
  );
};
