import React, { useState } from 'react';
import { Sparkles, CheckCircle2, HelpCircle, ArrowRight, RefreshCw, Zap, Trophy, AlertCircle, ChevronRight } from 'lucide-react';

interface Props {
  grade: number;
}

interface ProblemStep {
  stepNumber: number;
  description: string;
  checkpointQuestion: string;
  expectedAnswer: string;
  hint: string;
}

interface DynamicProblem {
  title: string;
  statement: string;
  steps: ProblemStep[];
  finalAnswer: string;
  vedicShortcut: string;
  explanation: string;
}

const defaultProblems: Record<number, DynamicProblem> = {
  10: {
    title: "Solving Quadratic Equation via Discriminant & Vedic Checking",
    statement: "Solve the quadratic equation: 2x² - 7x + 3 = 0",
    steps: [
      {
        stepNumber: 1,
        description: "Identify coefficients a, b, c and compute Discriminant D = b² - 4ac",
        checkpointQuestion: "What is the value of Discriminant D?",
        expectedAnswer: "25",
        hint: "a = 2, b = -7, c = 3. Compute (-7)² - 4(2)(3) = 49 - 24."
      },
      {
        stepNumber: 2,
        description: "Calculate roots using Quadratic Formula: x = (-b ± √D) / (2a)",
        checkpointQuestion: "What is √D (the square root of 25)?",
        expectedAnswer: "5",
        hint: "√25 = 5. So roots are (7 + 5)/4 and (7 - 5)/4."
      },
      {
        stepNumber: 3,
        description: "Determine the larger root x₁",
        checkpointQuestion: "What is (7 + 5) / 4?",
        expectedAnswer: "3",
        hint: "12 / 4 = 3."
      }
    ],
    finalAnswer: "x = 3 or x = 1/2",
    vedicShortcut: "Vedic Lopana Sthapanabhyam: Factors of 2×3 = 6 that sum to -7 are -6 and -1. Roots are +6/2 = 3 and +1/2 = 0.5 in 3 seconds!",
    explanation: "Standard quadratic formula yields x = (7 ± 5)/4 => x = 3 and x = 0.5."
  },
  6: {
    title: "Linear Equations & Integer Balance",
    statement: "Solve for y: 4y - 8 = 16",
    steps: [
      {
        stepNumber: 1,
        description: "Isolate the variable term by adding 8 to both sides",
        checkpointQuestion: "What is 16 + 8?",
        expectedAnswer: "24",
        hint: "4y = 16 + 8."
      },
      {
        stepNumber: 2,
        description: "Divide both sides by the coefficient of y (which is 4)",
        checkpointQuestion: "What is 24 / 4?",
        expectedAnswer: "6",
        hint: "y = 24 / 4."
      }
    ],
    finalAnswer: "y = 6",
    vedicShortcut: "Paravartya Yojayet: Transpose and Divide => y = (16 + 8) / 4 = 24 / 4 = 6.",
    explanation: "Adding 8 gives 4y = 24, then dividing by 4 yields y = 6."
  },
  4: {
    title: "Fraction Addition with Common Denominators",
    statement: "Compute: 1/4 + 2/4",
    steps: [
      {
        stepNumber: 1,
        description: "Since denominators are equal (both are 4), add the numerators 1 + 2",
        checkpointQuestion: "What is 1 + 2?",
        expectedAnswer: "3",
        hint: "1 quarter plus 2 quarters."
      }
    ],
    finalAnswer: "3/4",
    vedicShortcut: "Visual slice: 1 slice of pizza out of 4 plus 2 slices gives 3/4 of the whole pizza.",
    explanation: "(1 + 2)/4 = 3/4."
  }
};

export function DynamicProblemSolver({ grade }: Props) {
  const currentProblem = defaultProblems[grade] || defaultProblems[10];
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [stepStatus, setStepStatus] = useState<Record<number, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [dynamicProblemData, setDynamicProblemData] = useState<DynamicProblem | null>(null);

  const activeProblem = dynamicProblemData || currentProblem;
  const currentStep = activeProblem.steps[activeStepIndex];
  const isFinished = activeStepIndex >= activeProblem.steps.length;

  const handleCheckStep = () => {
    if (!currentStep) return;
    const input = (userInputs[activeStepIndex] || '').trim().toLowerCase();
    const expected = currentStep.expectedAnswer.trim().toLowerCase();

    if (input === expected) {
      setStepStatus(prev => ({ ...prev, [activeStepIndex]: true }));
      if (activeStepIndex + 1 < activeProblem.steps.length) {
        setActiveStepIndex(prev => prev + 1);
      } else {
        setActiveStepIndex(activeProblem.steps.length); // completed
      }
    } else {
      setStepStatus(prev => ({ ...prev, [activeStepIndex]: false }));
    }
  };

  const handleGenerateFreshProblem = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/generate-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          pillar: 'algebra',
          topic: `Class ${grade} Curriculum Topic`,
          difficulty: 'Medium'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.steps && Array.isArray(data.steps) && data.steps.length > 0) {
          setDynamicProblemData(data);
          setActiveStepIndex(0);
          setUserInputs({});
          setStepStatus({});
          setRevealedHints({});
        }
      }
    } catch (err) {
      console.error('Failed to generate dynamic problem:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setUserInputs({});
    setStepStatus({});
    setRevealedHints({});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
              Interactive Guided Solver
            </span>
            <span className="text-xs text-slate-500 font-semibold">Class {grade} Module</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {activeProblem.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={handleGenerateFreshProblem}
            disabled={isGenerating}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Generate New Problem</span>
          </button>
        </div>
      </div>

      {/* Problem Statement Card */}
      <div className="p-4 rounded-xl bg-slate-900 text-white shadow-sm flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white/10 text-amber-300 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Problem Statement
          </span>
          <p className="text-base sm:text-lg font-bold font-mono text-white">
            {activeProblem.statement}
          </p>
        </div>
      </div>

      {/* Progress Steps Timeline */}
      <div className="flex items-center gap-2 overflow-x-auto py-2">
        {activeProblem.steps.map((st, sIdx) => {
          const isPassed = stepStatus[sIdx] === true;
          const isCurrent = sIdx === activeStepIndex;

          return (
            <div key={sIdx} className="flex items-center gap-2 shrink-0">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-800'
                    : isCurrent
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span>Step {st.stepNumber}</span>
                )}
              </div>
              {sIdx < activeProblem.steps.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Active Step Interactive Area */}
      {!isFinished && currentStep && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 animate-fadeIn">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Current Task: Step {currentStep.stepNumber} of {activeProblem.steps.length}
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">
              {currentStep.description}
            </h4>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              {currentStep.checkpointQuestion}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInputs[activeStepIndex] || ''}
                onChange={(e) =>
                  setUserInputs(prev => ({ ...prev, [activeStepIndex]: e.target.value }))
                }
                onKeyDown={(e) => e.key === 'Enter' && handleCheckStep()}
                placeholder="Enter answer..."
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
              />
              <button
                onClick={handleCheckStep}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Verify Step
              </button>
            </div>

            {/* Check Feedback */}
            {stepStatus[activeStepIndex] === false && (
              <div className="flex items-center justify-between text-xs text-rose-700 bg-rose-50 p-2.5 rounded-lg border border-rose-200 animate-shake">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Not quite! Try checking your calculations.</span>
                </div>
                {!revealedHints[activeStepIndex] && (
                  <button
                    onClick={() =>
                      setRevealedHints(prev => ({ ...prev, [activeStepIndex]: true }))
                    }
                    className="text-indigo-600 font-bold hover:underline cursor-pointer"
                  >
                    Need a Hint?
                  </button>
                )}
              </div>
            )}

            {/* Hint Box */}
            {revealedHints[activeStepIndex] && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Hint: </span>
                  <span>{currentStep.hint}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion Celebration Card */}
      {isFinished && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-emerald-950">Awesome Work! Problem Solved!</h4>
              <p className="text-xs text-emerald-800">You mastered each step with precision.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Final Result
              </span>
              <p className="font-mono font-bold text-sm text-emerald-900">{activeProblem.finalAnswer}</p>
              <p className="text-slate-600 text-[11px] mt-1">{activeProblem.explanation}</p>
            </div>

            <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1 mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Vedic 5-Second Speed Hack</span>
              </span>
              <p className="text-amber-950 text-xs leading-relaxed font-medium">
                {activeProblem.vedicShortcut}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
