import React, { useState, useEffect } from 'react';
import { X, Save, Sliders, Sparkles, Check, BookOpen, Brain, Shield } from 'lucide-react';
import { CustomInstructionsData, saveUserInstructions } from '../lib/firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  currentInstructions: CustomInstructionsData | null;
  onSave: (instructions: CustomInstructionsData) => void;
}

export function CustomInstructionsModal({
  isOpen,
  onClose,
  userId,
  currentInstructions,
  onSave
}: Props) {
  const [targetExam, setTargetExam] = useState<string>('CBSE');
  const [explanationTone, setExplanationTone] = useState<string>('Socratic');
  const [calculationMethod, setCalculationMethod] = useState<string>('Balanced');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [successSaved, setSuccessSaved] = useState(false);

  useEffect(() => {
    if (currentInstructions) {
      setTargetExam(currentInstructions.targetExam || 'CBSE');
      setExplanationTone(currentInstructions.explanationTone || 'Socratic');
      setCalculationMethod(currentInstructions.calculationMethod || 'Balanced');
      setCustomPrompt(currentInstructions.customPrompt || '');
    }
  }, [currentInstructions]);

  if (!isOpen) return null;

  const handleSavePreferences = async () => {
    setIsSaving(true);
    const data: CustomInstructionsData = {
      targetExam,
      explanationTone,
      calculationMethod,
      customPrompt: customPrompt.trim()
    };

    // Save locally
    try {
      localStorage.setItem('mathemagix_custom_instructions', JSON.stringify(data));
    } catch {}

    // Save to Firestore if user is authenticated
    if (userId) {
      await saveUserInstructions(userId, data);
    }

    onSave(data);
    setIsSaving(false);
    setSuccessSaved(true);
    setTimeout(() => {
      setSuccessSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10">
              <Sliders className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Custom AI Instructions & Styles</h3>
              <p className="text-xs text-indigo-200">Define how Gemini reasons, personalizes, and styles math responses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Target Exam Focus */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-2">
              Target Curriculum & Exam Goal
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'CBSE', label: 'CBSE Board (NCERT)', desc: 'Official step-by-step marking scheme' },
                { id: 'Olympiad', label: 'Math Olympiad (IMO)', desc: 'Clever non-routine problem solving' },
                { id: 'JEE', label: 'JEE Foundation', desc: 'Deep analytical conceptual rigor' },
                { id: 'MentalMath', label: 'Mental Math Master', desc: 'Vedic & Soroban speed records' },
                { id: 'General', label: 'General Enrichment', desc: 'Playful conceptual discovery' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTargetExam(item.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    targetExam === item.id
                      ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950 font-bold'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Tone */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-2">
              Pedagogical Tone & Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'Socratic', label: 'Socratic Tutor', icon: Brain },
                { id: 'Rigorous', label: 'Formal Proofs', icon: Shield },
                { id: 'Friendly', label: 'Gentle & Visual', icon: Sparkles },
                { id: 'Vedic-First', label: 'Vedic-First', icon: BookOpen }
              ].map((tone) => {
                const Icon = tone.icon;
                return (
                  <button
                    key={tone.id}
                    onClick={() => setExplanationTone(tone.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all cursor-pointer ${
                      explanationTone === tone.id
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20 text-purple-950 font-bold'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-purple-600" />
                    <span>{tone.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Calculation Method */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-2">
              Preferred Calculation Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Balanced', label: 'Balanced (Standard + Vedic)' },
                { id: 'Vedic-Primary', label: 'Vedic Speed Primary' },
                { id: 'Abacus-Soroban', label: 'Abacus Bead Visual' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCalculationMethod(m.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer text-xs font-semibold ${
                    calculationMethod === m.id
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-950'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Instruction Directives */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Specific Directives or Teacher Rules
            </label>
            <textarea
              rows={3}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="E.g., 'Always provide a real-life analogy with football or rockets', 'Highlight sign errors in red', 'Never skip intermediate factoring steps'..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-slate-800"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              These instructions are automatically sent with all Gemini problem-solving requests and saved securely to your profile.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {userId ? 'Persisting to Firestore' : 'Saving to local browser storage'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePreferences}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {successSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Instructions</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
