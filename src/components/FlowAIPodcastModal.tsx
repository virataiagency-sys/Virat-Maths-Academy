import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  Copy,
  Check,
  Radio,
  Sliders,
  SkipForward,
  SkipBack,
  Layers,
  Zap,
  Award,
  BookOpen,
  MessageSquare,
  Users,
  ChevronDown,
  RefreshCw,
  Edit3,
  Headphones,
  Music,
  HelpCircle
} from 'lucide-react';
import {
  FlowAIPodcast,
  PodcastStyle,
  PodcastDialogueLine,
  HostDuoId,
  HOST_DUOS,
  HostDuo
} from '../types/podcast';
import { generateFlowAIPodcast, GeneratePodcastParams } from '../lib/podcastApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
  initialOptions?: string[];
  initialAnswer?: string;
  initialExplanation?: any;
  grade?: number;
  topic?: string;
}

export function FlowAIPodcastModal({
  isOpen,
  onClose,
  initialQuestion,
  initialOptions,
  initialAnswer,
  initialExplanation,
  grade = 6,
  topic = 'Mathematics'
}: Props) {
  const [podcast, setPodcast] = useState<FlowAIPodcast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Studio Customization States
  const [selectedDuoId, setSelectedDuoId] = useState<HostDuoId>('classic_flow');
  const [selectedStyle, setSelectedStyle] = useState<PodcastStyle>('notebooklm_flow');
  const [showStudioSettings, setShowStudioSettings] = useState(false);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // Custom question prompt for on-the-fly generation
  const [customQuestionText, setCustomQuestionText] = useState(initialQuestion || '');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);

  // References for speech synthesis
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isPlayingRef = useRef(false);
  const activeLineRef = useRef(0);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  // Available browser voices
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const activeDuo = HOST_DUOS[selectedDuoId] || HOST_DUOS.classic_flow;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        setAvailableVoices(v);
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Sync references
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    activeLineRef.current = activeLineIndex;
  }, [isPlaying, activeLineIndex]);

  // Load podcast when opened or when question changes
  useEffect(() => {
    if (isOpen) {
      const q = initialQuestion || customQuestionText || `Class ${grade} Mathematics: Core Concept Deep Dive`;
      setCustomQuestionText(q);
      handleGeneratePodcast(q, selectedStyle, selectedDuoId);
    } else {
      stopAudio();
    }
  }, [isOpen, initialQuestion]);

  const handleGeneratePodcast = async (
    questionText: string,
    style: PodcastStyle,
    duoId: HostDuoId
  ) => {
    if (!questionText.trim()) return;
    stopAudio();
    setLoading(true);
    setError(null);

    try {
      const params: GeneratePodcastParams = {
        question: questionText,
        options: initialOptions,
        correctAnswer: initialAnswer,
        explanation: initialExplanation,
        grade,
        topic,
        podcastStyle: style,
        duoId
      };

      const result = await generateFlowAIPodcast(params);
      setPodcast(result);
      setActiveLineIndex(0);
    } catch (err: any) {
      console.error('Failed to generate podcast:', err);
      setError(err.message || 'Could not generate Flow AI podcast');
    } finally {
      setLoading(false);
    }
  };

  // Speech synthesis playback logic
  const speakLine = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !podcast) {
      return;
    }

    if (index >= podcast.dialogue.length) {
      // Reached the end
      setIsPlaying(false);
      setActiveLineIndex(0);
      return;
    }

    window.speechSynthesis.cancel();

    const line = podcast.dialogue[index];
    setActiveLineIndex(index);

    // Scroll line into view
    const elem = document.getElementById(`podcast-line-${index}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Clean spoken text
    const cleanText = line.text
      .replace(/\[.*?\]/g, '') // remove sound cues like [aha!] from speech
      .replace(/\$\$(.*?)\$\$/g, '$1')
      .replace(/\$(.*?)\$/g, '$1')
      .replace(/\\times/g, 'times')
      .replace(/\\div/g, 'divided by')
      .replace(/\\approx/g, 'approximately')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = playbackSpeed;
    utterance.volume = isMuted ? 0 : 1;

    // Pick distinct voices based on active hosts
    const isFirstHost = line.speaker === activeDuo.host1.name;
    const hostConfig = isFirstHost ? activeDuo.host1 : activeDuo.host2;

    if (hostConfig.voice === 'warm' || hostConfig.voice === 'cheerful') {
      // Prefer female / higher pitched English voice
      const femaleVoice = availableVoices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Female') ||
            v.name.includes('Zira') ||
            v.name.includes('Samantha') ||
            v.name.includes('Victoria') ||
            v.name.includes('Google UK English Female') ||
            v.name.includes('Karen'))
      );
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.pitch = hostConfig.pitch || 1.05;
    } else {
      // Male / deeper / energetic voice
      const maleVoice = availableVoices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Male') ||
            v.name.includes('David') ||
            v.name.includes('Alex') ||
            v.name.includes('Daniel') ||
            v.name.includes('Google UK English Male') ||
            v.name.includes('Rishi'))
      );
      if (maleVoice) utterance.voice = maleVoice;
      utterance.pitch = hostConfig.pitch || 0.95;
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        speakLine(index + 1);
      }
    };

    utterance.onerror = () => {
      if (isPlayingRef.current && index + 1 < (podcast?.dialogue.length || 0)) {
        speakLine(index + 1);
      }
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startAudio = () => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    speakLine(activeLineIndex);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setActiveLineIndex(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleNextLine = () => {
    if (!podcast) return;
    const nextIdx = Math.min(podcast.dialogue.length - 1, activeLineIndex + 1);
    setActiveLineIndex(nextIdx);
    if (isPlaying) {
      speakLine(nextIdx);
    }
  };

  const handlePrevLine = () => {
    const prevIdx = Math.max(0, activeLineIndex - 1);
    setActiveLineIndex(prevIdx);
    if (isPlaying) {
      speakLine(prevIdx);
    }
  };

  const handleCopyTranscript = () => {
    if (!podcast) return;
    const text = podcast.dialogue.map((d) => `[${d.speaker} (${d.role})]: ${d.text}`).join('\n\n');
    navigator.clipboard.writeText(
      `--- Flow AI Audio Overview: ${podcast.title} ---\n\n${text}\n\nTakeaway: ${podcast.keyTakeaway}`
    );
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const quickEpisodePresets = [
    {
      title: 'CBSE Quadratic Formula',
      desc: 'Shreedharacharya roots & discriminant',
      prompt: `Class 10 CBSE: Solve 2x² - 5x + 3 = 0 using the Quadratic Formula. Explain the discriminant and speed shortcuts.`
    },
    {
      title: 'ICSE Commercial RD & GST',
      desc: 'Recurring deposit maturity & ITC',
      prompt: `Class 10 ICSE: Explain the Recurring Deposit Interest formula I = P·n(n+1)r/2400 and GST Input Tax Credit rules.`
    },
    {
      title: 'State Board Cramer’s Rule',
      desc: 'Determinants Dx/D and Dy/D',
      prompt: `Class 10 State Board: Solve simultaneous equations 4x + 3y = 4 and 6x + 5y = 8 using Cramer's Rule determinants.`
    },
    {
      title: 'Speed Math Left-to-Right',
      desc: 'Zero-carry mental addition algorithm',
      prompt: `Class ${grade} Speed Math: Master Left-to-Right mental addition for 3-digit numbers and eliminate carrying overload.`
    },
    {
      title: 'Olympiad Power Cyclicity',
      desc: 'Units digit of 7^2026 mod 4',
      prompt: `SOF IMO Olympiad: What is the units digit of 7^2026? Explain the modulo 4 cyclicity orbit in 4 seconds.`
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-950 border border-purple-800/50 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col h-[740px] max-h-[94vh] text-slate-100">
        {/* Studio Top Control Banner */}
        <div className="px-5 py-4 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 border-b border-purple-800/40 flex items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 text-xl border border-white/20">
                🎙️
              </div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Flow AI Podcast Studio</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] font-bold">
                    NotebookLM Overviews
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                <span>Hosts: <strong>{activeDuo.host1.name}</strong> &amp; <strong>{activeDuo.host2.name}</strong></span>
                <span className="text-purple-400">·</span>
                <span className="text-purple-300">{activeDuo.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <button
              onClick={() => setShowStudioSettings(!showStudioSettings)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                showStudioSettings
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-purple-200 border-white/10'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-300" />
              <span>Change Studio Hosts &amp; Style</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showStudioSettings ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Podcast Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Change Studio Hosts & Style Drawer */}
        {showStudioSettings && (
          <div className="bg-slate-900 border-b border-purple-800/40 p-4 sm:p-5 space-y-4 animate-fadeIn overflow-y-auto max-h-[300px]">
            {/* Host Pairing Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Select Podcast Host Duo
                </label>
                <span className="text-[11px] text-slate-400">Choose host personalities and pedagogical pairing</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {(Object.values(HOST_DUOS) as HostDuo[]).map((duo) => {
                  const isSelected = duo.id === selectedDuoId;
                  return (
                    <button
                      key={duo.id}
                      onClick={() => {
                        setSelectedDuoId(duo.id);
                        handleGeneratePodcast(customQuestionText, selectedStyle, duo.id);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-purple-950/80 border-purple-400 ring-2 ring-purple-400/30 shadow-lg'
                          : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 text-xl mb-1.5">
                          <span>{duo.host1.avatar}</span>
                          <span className="text-xs text-purple-400 font-bold">&amp;</span>
                          <span>{duo.host2.avatar}</span>
                        </div>
                        <div className="font-extrabold text-xs text-white leading-tight">{duo.name}</div>
                        <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-snug">
                          {duo.tagline}
                        </p>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-700/60 text-[9px] text-purple-300 font-semibold flex items-center justify-between">
                        <span>{duo.host1.name} &amp; {duo.host2.name}</span>
                        {isSelected && <span className="text-emerald-400 font-bold">Active</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Show Style Selection */}
            <div>
              <label className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Select Audio Overview Style
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {[
                  { id: 'notebooklm_flow', label: '🎙️ NotebookLM Flow', desc: 'Curious & conceptual deep dive' },
                  { id: 'mental_speed_secrets', label: '⚡ Speed Secrets', desc: 'Left-to-Right & zero carry math' },
                  { id: 'olympiad_hacks', label: '🏆 Olympiad Hacks', desc: 'SOF IMO traps & 5-sec bypass' },
                  { id: 'icse_proofs', label: '🏛️ ICSE & Board Proofs', desc: 'Commercial math & theorems' },
                  { id: 'story_math', label: '📖 Story Math', desc: 'Visual models & word problems' },
                  { id: 'socratic_tutor', label: '💡 Socratic Inquiry', desc: 'Gentle step-by-step guidance' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStyle(st.id as PodcastStyle);
                      handleGeneratePodcast(customQuestionText, st.id as PodcastStyle, selectedDuoId);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedStyle === st.id
                        ? 'bg-purple-900/60 border-purple-400 text-white font-bold'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-white leading-tight">{st.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{st.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Presets Carousel */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Quick Episode Presets (CBSE · ICSE · State Board · Speed Math)
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {quickEpisodePresets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCustomQuestionText(p.prompt);
                      handleGeneratePodcast(p.prompt, selectedStyle, selectedDuoId);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-purple-900/50 border border-slate-700 hover:border-purple-500/50 text-slate-200 whitespace-nowrap cursor-pointer transition-colors shrink-0 text-left"
                  >
                    <div className="font-bold text-white text-[11px]">{p.title}</div>
                    <div className="text-[10px] text-purple-300">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audio Wave Visualizer & Live Speaker Status */}
        {isPlaying && (
          <div className="bg-purple-950/70 border-b border-purple-800/40 px-5 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-purple-400">
                <div className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" />
                <div className="w-1 h-7 bg-purple-400 rounded-full animate-pulse delay-75" />
                <div className="w-1 h-2 bg-purple-400 rounded-full animate-pulse delay-150" />
                <div className="w-1 h-8 bg-purple-400 rounded-full animate-pulse delay-100" />
                <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-200" />
                <div className="w-1 h-6 bg-purple-400 rounded-full animate-pulse delay-75" />
              </div>

              <span className="font-bold text-purple-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Now Speaking:</span>
                <span className="text-white bg-purple-800/60 px-2 py-0.5 rounded-md font-mono text-[11px]">
                  {podcast?.dialogue[activeLineIndex]?.speaker || activeDuo.host1.name}
                </span>
              </span>
            </div>

            <div className="text-[11px] text-purple-300 font-mono">
              Line {activeLineIndex + 1} of {podcast?.dialogue.length || 0}
            </div>
          </div>
        )}

        {/* Podcast Dialogue & Transcript Body */}
        <div ref={transcriptContainerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-900/60">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 animate-bounce">
                <Radio className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Flow AI Studio is Scripting Your Episode...
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Synthesizing lively dual-host banter between <strong>{activeDuo.host1.name}</strong> and{' '}
                  <strong>{activeDuo.host2.name}</strong> with speed hacks and concept breakdowns.
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="p-6 bg-rose-950/40 border border-rose-800/60 rounded-2xl text-center space-y-3">
              <p className="text-xs text-rose-300 font-bold">{error}</p>
              <button
                onClick={() => handleGeneratePodcast(customQuestionText, selectedStyle, selectedDuoId)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 cursor-pointer"
              >
                Retry Studio Generation
              </button>
            </div>
          )}

          {!loading && podcast && (
            <div className="space-y-4 max-w-3xl mx-auto">
              {/* Episode Header Card */}
              <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/30 border border-purple-700/40 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-400/30">
                      Episode Transcript · Class {podcast.grade}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1.5 tracking-tight">
                      {podcast.title}
                    </h3>
                    <p className="text-xs text-purple-200/90 italic mt-0.5">
                      "{podcast.tagline}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyTranscript}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-purple-200 border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Copy Full Transcript"
                    >
                      {copiedTranscript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTranscript ? 'Copied!' : 'Copy Transcript'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Recap Box */}
                <div className="mt-3.5 pt-3 border-t border-purple-800/40 text-xs text-slate-300">
                  <span className="text-purple-300 font-bold">Target Question:</span>{' '}
                  <span className="text-slate-200 font-medium">"{podcast.questionRecap || customQuestionText}"</span>
                </div>
              </div>

              {/* Host Dialogue Cards */}
              <div className="space-y-3 pt-1">
                {podcast.dialogue.map((line, idx) => {
                  const isCurrent = idx === activeLineIndex;
                  const isHost1 = line.speaker === activeDuo.host1.name;
                  const host = isHost1 ? activeDuo.host1 : activeDuo.host2;

                  return (
                    <div
                      key={line.id || idx}
                      id={`podcast-line-${idx}`}
                      onClick={() => {
                        setActiveLineIndex(idx);
                        speakLine(idx);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        isCurrent
                          ? 'bg-purple-900/60 border-purple-400 ring-2 ring-purple-400/40 shadow-lg translate-x-1'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-sm border ${
                            isHost1
                              ? 'bg-emerald-600/30 border-emerald-500/40 text-white'
                              : 'bg-amber-600/30 border-amber-500/40 text-white'
                          }`}
                        >
                          {host.avatar}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-xs text-white">
                                {line.speaker}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                ({line.role})
                              </span>
                              {line.soundCue && (
                                <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                                  {line.soundCue}
                                </span>
                              )}
                            </div>

                            <span className="text-[10px] font-mono text-slate-400">
                              {line.timestamp || `0:${idx * 15 < 10 ? '0' : ''}${idx * 15}`}
                            </span>
                          </div>

                          <p className={`text-xs leading-relaxed ${isCurrent ? 'text-white font-medium' : 'text-slate-300'}`}>
                            {line.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Takeaway & Speed Formula Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
                    <Award className="w-4 h-4" />
                    <span>Key Conceptual Takeaway</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    {podcast.keyTakeaway}
                  </p>
                </div>

                <div className="bg-purple-950/40 border border-purple-800/40 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Cheat Sheet Shortcut Formula</span>
                  </div>
                  <p className="text-xs text-purple-100/90 font-mono leading-relaxed">
                    {podcast.cheatSheetFormula || 'Decompose positional chunks from Left-to-Right to bypass paper carries.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audio Player Bottom HUD Bar */}
        <div className="p-4 bg-slate-950 border-t border-purple-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevLine}
              disabled={activeLineIndex === 0}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 cursor-pointer"
              title="Previous Line"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={isPlaying ? pauseAudio : startAudio}
              disabled={!podcast || loading}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer disabled:opacity-40 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'Pause Episode' : 'Play Episode'}</span>
            </button>

            <button
              onClick={handleNextLine}
              disabled={!podcast || activeLineIndex >= (podcast.dialogue.length - 1)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 cursor-pointer"
              title="Next Line"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={stopAudio}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 cursor-pointer"
              title="Reset Audio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed & Volume Tools */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[11px]">Speed:</span>
              {[0.8, 1.0, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                    playbackSpeed === spd
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 cursor-pointer border border-slate-800"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-purple-300" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
