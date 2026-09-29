import React, { useState } from 'react';
import { cbseBooksData, CBSEChapter } from '../data/cbseCurriculum';
import { CustomInstructionsData, saveProblemBookmark } from '../lib/firebase';
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  ShieldAlert,
  Search,
  Headphones,
  Send,
  Loader2,
  Bookmark,
  Check,
  Volume2,
  VolumeX,
  Copy,
  ChevronDown
} from 'lucide-react';

interface Props {
  initialGrade: number;
  initialProblem?: string;
  initialChapterTitle?: string;
  customInstructions: CustomInstructionsData | null;
  userId: string | null;
}

type AIMode = 'chatgpt' | 'claude' | 'perplexity' | 'notebooklm';

export function CBSEMultiverseSolver({
  initialGrade,
  initialProblem,
  initialChapterTitle,
  customInstructions,
  userId
}: Props) {
  const [grade, setGrade] = useState<number>(initialGrade || 10);
  const currentBook = cbseBooksData[grade] || cbseBooksData[10];

  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (initialChapterTitle) {
      const match = currentBook.chapters.find(c => c.title.toLowerCase() === initialChapterTitle.toLowerCase());
      if (match) return match.id;
    }
    return currentBook.chapters[0]?.id || '';
  });
  const selectedChapter = currentBook.chapters.find(c => c.id === selectedChapterId) || currentBook.chapters[0];

  const [customProblem, setCustomProblem] = useState<string>(initialProblem || '');
  const [activeAIMode, setActiveAIMode] = useState<AIMode>('chatgpt');
  const [isLoading, setIsLoading] = useState(false);
  const [solutionResult, setSolutionResult] = useState<{ text: string; mode: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync chapter when grade changes
  const handleGradeChange = (newGrade: number) => {
    setGrade(newGrade);
    const book = cbseBooksData[newGrade] || cbseBooksData[10];
    if (book.chapters.length > 0) {
      setSelectedChapterId(book.chapters[0].id);
    }
  };

  const handlePickProblem = (probText: string) => {
    setCustomProblem(probText);
  };

  const handleSolve = async () => {
    const chapterProblems = selectedChapter?.problems || (selectedChapter as any)?.sampleProblems || [];
    const textToSolve = customProblem.trim() || (chapterProblems[0]?.question ?? '');
    if (!textToSolve) {
      setErrorMessage('Please enter or select a math problem to solve.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const res = await fetch('/api/gemini/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          chapter: selectedChapter?.title || 'CBSE Mathematics',
          problem: textToSolve,
          mode: activeAIMode,
          customInstructions
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      setSolutionResult({ text: data.text, mode: data.mode });
    } catch (err: any) {
      console.error('Solve error:', err);
      setErrorMessage(err.message || 'Failed to generate solution. Ensure Gemini API key is configured.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBookmark = async () => {
    if (!userId || !solutionResult) return;
    const chapterProblems = selectedChapter?.problems || (selectedChapter as any)?.sampleProblems || [];
    const qText = customProblem.trim() || (chapterProblems[0]?.question ?? 'Problem');
    const id = await saveProblemBookmark(userId, {
      grade,
      topic: selectedChapter?.title || 'Math',
      question: qText,
      solution: solutionResult.text
    });
    if (id) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (solutionResult?.text) {
      // Strip markdown symbols for smoother speech
      const clean = solutionResult.text.replace(/[*#`_>-]/g, ' ');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = () => {
    if (solutionResult?.text) {
      navigator.clipboard.writeText(solutionResult.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>AI Reasoning Multiverse & CBSE Textbook Engine</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            CBSE Class 1–12 Textbook Problem Solver
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Input questions from official NCERT / CBSE books or enter your custom equation. View comparative solutions across 4 distinct AI reasoning frameworks.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-emerald-400 block mb-0.5">ChatGPT Mode</span>
              <span className="text-[11px] text-slate-400">Socratic, step-by-step guidance & intuition</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-amber-400 block mb-0.5">Claude Mode</span>
              <span className="text-[11px] text-slate-400">Rigorous proofs, constraints & axioms</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-cyan-400 block mb-0.5">Perplexity Mode</span>
              <span className="text-[11px] text-slate-400">Grounded facts & real-world STEM citations</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-purple-400 block mb-0.5">NotebookLM Mode</span>
              <span className="text-[11px] text-slate-400">Study briefs & dual-host audio podcast transcript</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Selection Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        {/* Class Selector Bar */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            1. Select CBSE Class Level:
          </label>
          <div className="flex flex-wrap items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
              <button
                key={c}
                onClick={() => handleGradeChange(c)}
                className={`w-9 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  grade === c
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                C{c}
              </button>
            ))}
          </div>
          <p className="text-xs text-indigo-700 font-semibold mt-2 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Book: {currentBook.bookTitle}</span>
          </p>
        </div>

        {/* Chapter & Problem Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. NCERT / CBSE Chapter:
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
              {currentBook.chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  Chapter {ch.number}: {ch.title}
                </option>
              ))}
            </select>
            {selectedChapter && (
              <p className="text-[11px] text-slate-500 mt-1.5 italic">
                {selectedChapter.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Sample Exercises from this Chapter:
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {(selectedChapter?.problems || (selectedChapter as any)?.sampleProblems || []).map((prob: any) => (
                <button
                  key={prob.id}
                  onClick={() => handlePickProblem(prob.question)}
                  className="w-full text-left p-2 rounded-lg text-xs bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-indigo-600 group-hover:text-indigo-800">{prob.exercise}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-500 font-medium">
                      {prob.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] line-clamp-1">{prob.question}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Input Textarea */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            3. Problem Statement (or paste question / equation):
          </label>
          <textarea
            rows={3}
            value={customProblem}
            onChange={(e) => setCustomProblem(e.target.value)}
            placeholder="E.g., Solve 2x² - 7x + 3 = 0, or calculate 98 × 97 using Vedic base 100, or evaluate ∫ x sin x dx..."
            className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Select AI Reasoning Mode */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            4. Choose AI Reasoning Lens:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => setActiveAIMode('chatgpt')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeAIMode === 'chatgpt'
                  ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>ChatGPT Mode</span>
              </div>
              <p className="text-[11px] text-slate-500">Socratic tutoring & intuition</p>
            </button>

            <button
              onClick={() => setActiveAIMode('claude')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeAIMode === 'claude'
                  ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Claude Mode</span>
              </div>
              <p className="text-[11px] text-slate-500">Axiomatic proofs & edge cases</p>
            </button>

            <button
              onClick={() => setActiveAIMode('perplexity')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeAIMode === 'perplexity'
                  ? 'bg-cyan-50/80 border-cyan-500 ring-2 ring-cyan-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1">
                <Search className="w-3.5 h-3.5 text-cyan-600" />
                <span>Perplexity Mode</span>
              </div>
              <p className="text-[11px] text-slate-500">Fact-grounded STEM citations</p>
            </button>

            <button
              onClick={() => setActiveAIMode('notebooklm')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeAIMode === 'notebooklm'
                  ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1">
                <Headphones className="w-3.5 h-3.5 text-purple-600" />
                <span>NotebookLM Mode</span>
              </div>
              <p className="text-[11px] text-slate-500">Audio podcast & study guide</p>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {customInstructions && (
              <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                <Sparkles className="w-3 h-3" />
                Applying custom instructions: {customInstructions.explanationTone} ({customInstructions.targetExam})
              </span>
            )}
          </div>
          <button
            onClick={handleSolve}
            disabled={isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing Solution...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Generate {activeAIMode.toUpperCase()} Solution</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Generation Error:</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Solution Output Box */}
      {solutionResult && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden animate-fadeIn">
          {/* Solution Header Bar */}
          <div className="bg-slate-900 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-xs uppercase tracking-wider text-indigo-300">
                AI Output Mode: {solutionResult.mode.toUpperCase()}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-300">Class {grade} CBSE</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Audio Read Aloud */}
              <button
                onClick={handleToggleSpeak}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Read solution aloud"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Listen Aloud</span>
                  </>
                )}
              </button>

              {/* Copy */}
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Bookmark to Firestore */}
              {userId && (
                <button
                  onClick={handleSaveBookmark}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSaved ? 'Saved to Cloud!' : 'Bookmark'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Solution Body */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">
              {solutionResult.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
