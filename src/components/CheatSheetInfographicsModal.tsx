import React, { useState } from 'react';
import { X, Printer, Download, Sparkles, BookOpen, Calculator, Layers, Flame } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  grade: number;
}

export function CheatSheetInfographicsModal({ isOpen, onClose, grade }: Props) {
  const [activeSheet, setActiveSheet] = useState<'algebra' | 'basic' | 'vedic' | 'abacus'>('algebra');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Visual Infographics & Quick-Reference Cheat Sheets</h3>
              <p className="text-xs text-slate-300">Class {grade} & K-12 Formula Cards, High-Contrast Rules & Sutras</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print cheat sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex flex-wrap gap-2">
          {[
            { id: 'algebra', label: 'Algebra Master Sheet', icon: Calculator, color: 'text-emerald-700' },
            { id: 'vedic', label: 'Vedic 16 Sutras Sheet', icon: Flame, color: 'text-rose-700' },
            { id: 'abacus', label: 'Abacus Bead Formulas', icon: Layers, color: 'text-amber-700' },
            { id: 'basic', label: 'Basic Math & Formulas', icon: BookOpen, color: 'text-blue-700' },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSheet(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSheet === tab.id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sheet Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs">
          {/* ALGEBRA CHEAT SHEET */}
          {activeSheet === 'algebra' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Algebra Fundamental Identities & Equations</h4>
                  <p className="text-xs text-slate-500">Core identities, quadratic solutions, laws of indices & binomial formulas</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-xs">
                  CBSE Classes 6–12
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <h5 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>🌟 Key Expansion Identities</span>
                  </h5>
                  <ul className="space-y-1.5 font-mono text-xs text-emerald-900 font-semibold">
                    <li className="bg-white p-2 rounded-lg border border-emerald-100">(a + b)² = a² + 2ab + b²</li>
                    <li className="bg-white p-2 rounded-lg border border-emerald-100">(a - b)² = a² - 2ab + b²</li>
                    <li className="bg-white p-2 rounded-lg border border-emerald-100">a² - b² = (a + b)(a - b)</li>
                    <li className="bg-white p-2 rounded-lg border border-emerald-100">(x + a)(x + b) = x² + (a + b)x + ab</li>
                    <li className="bg-white p-2 rounded-lg border border-emerald-100">(a + b)³ = a³ + 3a²b + 3ab² + b³</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-2">
                  <h5 className="font-extrabold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>🎯 Quadratic Master Formula</span>
                  </h5>
                  <div className="bg-white p-3 rounded-xl border border-indigo-100 space-y-2 font-mono">
                    <div className="text-center font-bold text-indigo-900 text-sm py-1 bg-indigo-50 rounded-lg">
                      ax² + bx + c = 0
                    </div>
                    <div className="text-center text-xs text-slate-700 py-1 font-semibold">
                      x = (-b ± √(b² - 4ac)) / (2a)
                    </div>
                    <div className="text-[11px] text-slate-600 font-sans pt-1 border-t border-slate-100">
                      <strong>Discriminant D = b² - 4ac:</strong>
                      <div className="mt-1 space-y-0.5 text-[11px]">
                        <div>• D &gt; 0: Two distinct real roots</div>
                        <div>• D = 0: Two equal real roots (-b/2a)</div>
                        <div>• D &lt; 0: Two complex conjugate roots</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                  <h5 className="font-extrabold text-amber-950 text-xs uppercase tracking-wider">
                    ⚡ Laws of Exponents & Logarithms
                  </h5>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-amber-100">aᵐ × aⁿ = aᵐ⁺ⁿ</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">(aᵐ)ⁿ = aᵐⁿ</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">a⁰ = 1 (a ≠ 0)</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">log(ab) = log a + log b</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">log(a/b) = log a - log b</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
                  <h5 className="font-extrabold text-purple-950 text-xs uppercase tracking-wider">
                    📐 Senior Calculus & Vectors (Classes 11–12)
                  </h5>
                  <ul className="space-y-1 font-mono text-[11px] text-purple-900">
                    <li className="bg-white p-1.5 rounded-lg border border-purple-100">d/dx(xⁿ) = n·xⁿ⁻¹</li>
                    <li className="bg-white p-1.5 rounded-lg border border-purple-100">d/dx(sin x) = cos x ; d/dx(cos x) = -sin x</li>
                    <li className="bg-white p-1.5 rounded-lg border border-purple-100">∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C (n ≠ -1)</li>
                    <li className="bg-white p-1.5 rounded-lg border border-purple-100">A⁻¹ = (1/|A|) · adj(A)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* VEDIC SUTRAS CHEAT SHEET */}
          {activeSheet === 'vedic' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Vedic Speed Maths 16 Core Sutras</h4>
                  <p className="text-xs text-slate-500">Ancient mental calculation algorithms formulated by Swami Bharati Krishna Tirtha</p>
                </div>
                <span className="px-2.5 py-1 bg-rose-100 text-rose-800 font-bold rounded-lg text-xs">
                  All Grades
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  {
                    name: "Ekadhikena Purvena",
                    meaning: "By one more than the previous one",
                    use: "Squaring numbers ending in 5 (e.g. 85² = 8×9 | 25 = 7225), converting 1/19 to recurring decimal."
                  },
                  {
                    name: "Nikhilam Navatashcaramam Dashatah",
                    meaning: "All from 9 and the last from 10",
                    use: "Multiplication near powers of 10 (e.g. 98×97 = 9506), subtraction from 1000, 10000."
                  },
                  {
                    name: "Urdhva Tiryagbhyam",
                    meaning: "Vertically and Crosswise",
                    use: "General multiplication of ANY two numbers of any number of digits in one single line."
                  },
                  {
                    name: "Paravartya Yojayet",
                    meaning: "Transpose and Apply",
                    use: "Solving linear algebraic equations, synthetic polynomial division without long division."
                  },
                  {
                    name: "Shunyam Samyasamuccaye",
                    meaning: "When the collection is the same, it is zero",
                    use: "Instant roots of equations like 3x + 2 = 5x + 2 => x = 0."
                  },
                  {
                    name: "Anurupyena",
                    meaning: "Proportionately",
                    use: "Multiplication when numbers are near sub-bases like 50, 200, 500."
                  },
                  {
                    name: "Sankalana Vyavakalanabhyam",
                    meaning: "By addition and by subtraction",
                    use: "Simultaneous linear equations like 23x + 31y = 85 and 31x + 23y = 77."
                  },
                  {
                    name: "Puranapuranabhyam",
                    meaning: "By completion or non-completion",
                    use: "Completing squares in algebra, factoring cubic equations."
                  }
                ].map((sutra, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/40 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-rose-950 text-xs">{idx + 1}. {sutra.name}</h5>
                    </div>
                    <p className="text-[11px] font-semibold text-rose-800 italic">"{sutra.meaning}"</p>
                    <p className="text-[11px] text-slate-700 leading-snug pt-1 border-t border-rose-100">
                      <strong>Application: </strong>{sutra.use}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABACUS CHEAT SHEET */}
          {activeSheet === 'abacus' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Soroban Abacus Rules & Complements</h4>
                  <p className="text-xs text-slate-500">Formulas for 5-complements (Small Friends) and 10-complements (Big Friends)</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-lg text-xs">
                  Physical & Mental
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <h5 className="font-extrabold text-amber-950 text-xs uppercase tracking-wider">
                    🖐️ Small Friends (5-Complements)
                  </h5>
                  <p className="text-[11px] text-slate-600">Used when lower deck Earth beads (1-4) are insufficient, but upper Heaven bead (5) is free.</p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-amber-100">+4 = +5 - 1</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">-4 = -5 + 1</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">+3 = +5 - 2</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">-3 = -5 + 2</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">+2 = +5 - 3</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">-2 = -5 + 3</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">+1 = +5 - 4</div>
                    <div className="bg-white p-2 rounded-lg border border-amber-100">-1 = -5 + 4</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3">
                  <h5 className="font-extrabold text-orange-950 text-xs uppercase tracking-wider">
                    🔟 Big Friends (10-Complements)
                  </h5>
                  <p className="text-[11px] text-slate-600">Used when current rod is full and you need to carry 1 to the next left rod.</p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-orange-100">+9 = -1 + 10</div>
                    <div className="bg-white p-2 rounded-lg border border-orange-100">-9 = -10 + 1</div>
                    <div className="bg-white p-2 rounded-lg border border-orange-100">+8 = -2 + 10</div>
                    <div className="bg-white p-2 rounded-lg border border-orange-100">-8 = -10 + 2</div>
                    <div className="bg-white p-2 rounded-lg border border-orange-100">+7 = -3 + 10</div>
                    <div className="bg-white p-2 rounded-lg border border-orange-100">-7 = -10 + 3</div>
                    <div className="bg-white p-2 rounded-lg border border-orange-100">+6 = -4 + 10</div>
                    <div className="bg-white p-2 rounded-lg border border-orange-100">-6 = -10 + 4</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BASIC MATH CHEAT SHEET */}
          {activeSheet === 'basic' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Basic Maths & Geometry Cheat Sheet</h4>
                  <p className="text-xs text-slate-500">Divisibility tests, geometric perimeters, areas and volume formulas</p>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-bold rounded-lg text-xs">
                  Classes 1–10
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                  <h5 className="font-extrabold text-blue-950 text-xs uppercase tracking-wider">
                    🔢 Fast Divisibility Tests
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="bg-white p-2 rounded-lg border border-blue-100">
                      <strong>Divisible by 3:</strong> Sum of all digits is a multiple of 3.
                    </li>
                    <li className="bg-white p-2 rounded-lg border border-blue-100">
                      <strong>Divisible by 4:</strong> Last two digits form a number divisible by 4.
                    </li>
                    <li className="bg-white p-2 rounded-lg border border-blue-100">
                      <strong>Divisible by 8:</strong> Last three digits form a number divisible by 8.
                    </li>
                    <li className="bg-white p-2 rounded-lg border border-blue-100">
                      <strong>Divisible by 9:</strong> Sum of all digits is a multiple of 9.
                    </li>
                    <li className="bg-white p-2 rounded-lg border border-blue-100">
                      <strong>Divisible by 11:</strong> (Sum of odd-place digits) - (Sum of even-place digits) = 0 or 11k.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    📏 2D & 3D Mensuration Formulas
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Circle Area:</strong> πr²
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Circumference:</strong> 2πr
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Triangle Area:</strong> ½ × b × h
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Trapezium:</strong> ½(a + b)h
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Cylinder Vol:</strong> πr²h
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Sphere Vol:</strong> (4/3)πr³
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
