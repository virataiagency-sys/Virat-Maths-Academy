import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  Loader2,
  Users,
  ChevronDown,
  RotateCcw,
  Zap,
  BookOpen,
  GraduationCap,
  Settings2,
  Sliders,
  Check
} from 'lucide-react';
import { TutorId, TUTOR_PERSONAS, LiveTutorPersona } from '../types/tutor';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  grade: number;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  tutorId?: TutorId;
  timestamp?: string;
}

export function LiveVoiceTutorModal({ isOpen, onClose, grade }: Props) {
  const [selectedTutorId, setSelectedTutorId] = useState<TutorId>('aria');
  const [selectedBoard, setSelectedBoard] = useState<'all' | 'cbse' | 'icse' | 'state_board' | 'olympiad'>('all');
  const [showTutorSelector, setShowTutorSelector] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [speechPitch, setSpeechPitch] = useState<number>(1.0);

  const activeTutor = TUTOR_PERSONAS[selectedTutorId] || TUTOR_PERSONAS.aria;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: TUTOR_PERSONAS.aria.sampleGreeting,
      tutorId: 'aria',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize SpeechRecognition if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputText(transcript);
            handleSendMessage(transcript);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition error:', err);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [grade]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // When changing tutor, greet the student
  const handleChangeTutor = (newTutorId: TutorId) => {
    setSelectedTutorId(newTutorId);
    setShowTutorSelector(false);
    const tutor = TUTOR_PERSONAS[newTutorId];
    if (tutor) {
      setSpeechPitch(tutor.pitch);
      setSpeechSpeed(tutor.rate);

      const welcomeMsg: Message = {
        role: 'model',
        text: tutor.sampleGreeting,
        tutorId: newTutorId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, welcomeMsg]);
      speakText(tutor.sampleGreeting, tutor.pitch, tutor.rate);
    }
  };

  const speakText = (text: string, customPitch?: number, customRate?: number) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown and formatting for smooth voice playback
    const clean = text
      .replace(/[*#`_>-]/g, ' ')
      .replace(/\$\$(.*?)\$\$/g, '$1')
      .replace(/\$(.*?)\$/g, '$1')
      .replace(/\\times/g, 'times')
      .replace(/\\div/g, 'divided by')
      .replace(/\\approx/g, 'approximately')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2');

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = customRate || speechSpeed * (activeTutor.rate || 1.0);
    utterance.pitch = customPitch || speechPitch * (activeTutor.pitch || 1.0);

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your question!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
        }
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    const userMsg: Message = {
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const newMessages: Message[] = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/live-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationHistory: newMessages.slice(-6),
          userMessage: text,
          grade,
          topic: `Class ${grade} Mathematics`,
          tutorId: selectedTutorId,
          board: selectedBoard
        })
      });

      if (!res.ok) {
        throw new Error('Server returned non-200');
      }

      const data = await res.json();
      const reply = data.reply || `That is a great math question. Let's solve it step by step!`;

      const botMsg: Message = {
        role: 'model',
        text: reply,
        tutorId: selectedTutorId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(reply);
    } catch (err) {
      console.error('Live tutor call failed:', err);
      const fallback = `Let's break this down from first principles! What is the first number or formula given in your problem?`;
      const botMsg: Message = {
        role: 'model',
        text: fallback,
        tutorId: selectedTutorId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      speakText(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[700px] max-h-[94vh]">
        {/* Tutor Top Banner */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white flex items-center justify-between border-b border-purple-900/40 relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg text-xl border border-white/20">
                {activeTutor.avatar}
              </div>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-white tracking-tight">
                  {activeTutor.name}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeTutor.badgeColor}`}>
                  {activeTutor.badge}
                </span>
                <span className="text-[10px] bg-white/10 text-purple-200 font-bold px-2 py-0.5 rounded-full">
                  Class {grade}
                </span>
              </div>
              <p className="text-xs text-purple-200/90 flex items-center gap-1.5 mt-0.5">
                {isSpeaking ? (
                  <span className="text-emerald-300 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Speaking with voice synthesis...
                  </span>
                ) : isListening ? (
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Listening to your microphone...
                  </span>
                ) : (
                  <span>{activeTutor.role}</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowTutorSelector(!showTutorSelector)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                showTutorSelector
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-white/10 hover:bg-white/20 text-purple-200 border-white/10'
              }`}
              title="Change Live Tutor Persona"
            >
              <Users className="w-3.5 h-3.5 text-purple-300" />
              <span>Change Tutor</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTutorSelector ? 'rotate-180' : ''}`} />
            </button>

            {isSpeaking && (
              <button
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }}
                className="p-2 rounded-xl text-rose-300 hover:bg-white/10 transition-colors cursor-pointer"
                title="Mute Voice"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Tutor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Change Tutor Drawer / Selector */}
        {showTutorSelector && (
          <div className="bg-slate-900 border-b border-purple-900/50 p-4 text-white space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Select Your Active Live Math Tutor
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Each tutor brings a distinct pedagogical style, voice speed, and curriculum specialization.
                </p>
              </div>

              {/* Board Focus Selector */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-medium">Board:</span>
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value as any)}
                  className="bg-slate-800 text-purple-200 text-xs px-2.5 py-1 rounded-lg border border-purple-800/60 focus:outline-none"
                >
                  <option value="all">All Boards</option>
                  <option value="cbse">CBSE / NCERT</option>
                  <option value="icse">ICSE / CISCE</option>
                  <option value="state_board">State Board / SCERT</option>
                  <option value="olympiad">SOF Olympiad</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
              {(Object.values(TUTOR_PERSONAS) as LiveTutorPersona[]).map((tutor) => {
                const isSelected = tutor.id === selectedTutorId;
                return (
                  <button
                    key={tutor.id}
                    onClick={() => handleChangeTutor(tutor.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-purple-950/80 border-purple-400 ring-2 ring-purple-400/30 shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    <div>
                      <div className="text-2xl mb-1">{tutor.avatar}</div>
                      <div className="font-extrabold text-xs text-white leading-tight">{tutor.name}</div>
                      <div className="text-[10px] text-purple-300 font-semibold mt-0.5">{tutor.badge}</div>
                      <p className="text-[10px] text-slate-300 line-clamp-2 mt-1 leading-snug">
                        {tutor.description}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[9px] text-slate-400">
                      <span>Rate: {tutor.rate}x</span>
                      <span className="text-emerald-400 font-medium">Active Voice</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Audio Wave Visualizer Indicator Bar */}
        {(isListening || isSpeaking) && (
          <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 px-4 py-2 flex items-center justify-center gap-1.5 text-emerald-400 border-b border-emerald-900/40">
            <div className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
            <div className="w-1 h-6 bg-emerald-400 rounded-full animate-pulse delay-75" />
            <div className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse delay-150" />
            <div className="w-1 h-7 bg-emerald-400 rounded-full animate-pulse delay-100" />
            <div className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-200" />
            <div className="w-1 h-5 bg-emerald-400 rounded-full animate-pulse delay-75" />
            <span className="text-xs font-bold ml-2 text-emerald-300 flex items-center gap-1">
              <span>{isListening ? 'Listening to speech' : `${activeTutor.name} is speaking...`}</span>
            </span>
          </div>
        )}

        {/* Quick Tutors Switcher Chips Bar */}
        {!showTutorSelector && (
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
            <div className="flex items-center gap-1.5 shrink-0 text-slate-500 font-bold">
              <span>Tutor:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {(Object.values(TUTOR_PERSONAS) as LiveTutorPersona[]).map((tutor) => (
                <button
                  key={tutor.id}
                  onClick={() => handleChangeTutor(tutor.id)}
                  className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
                    tutor.id === selectedTutorId
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{tutor.avatar}</span>
                  <span>{tutor.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-slate-400 text-[10px]">Speed:</span>
              <button
                onClick={() => {
                  const speeds = [0.8, 1.0, 1.2];
                  const nextIdx = (speeds.indexOf(speechSpeed) + 1) % speeds.length;
                  setSpeechSpeed(speeds[nextIdx]);
                }}
                className="px-2 py-0.5 rounded bg-white border border-slate-300 font-mono font-bold text-slate-700 hover:bg-slate-50 cursor-pointer text-[10px]"
                title="Toggle Voice Speed"
              >
                {speechSpeed}x
              </button>
            </div>
          </div>
        )}

        {/* Chat Conversation Scroll Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            const tutor = m.tutorId ? TUTOR_PERSONAS[m.tutorId] : activeTutor;

            return (
              <div key={idx} className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 text-sm font-bold mt-0.5 shadow-sm border border-purple-400/30">
                    {tutor?.avatar || '🎙️'}
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    isUser
                      ? 'bg-purple-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-100 text-[10px] text-slate-400 font-semibold">
                      <span className="text-purple-600 font-bold">{tutor?.name || 'Live Tutor'}</span>
                      <button
                        onClick={() => speakText(m.text, tutor?.pitch, tutor?.rate)}
                        className="text-purple-500 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
                        title="Replay Voice"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}

                  <div className="whitespace-pre-line">{m.text}</div>

                  {m.timestamp && (
                    <div className={`text-[9px] mt-1 text-right ${isUser ? 'text-purple-200' : 'text-slate-400'}`}>
                      {m.timestamp}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs py-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              <span>{activeTutor.name} is calculating response...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Starter Chips Tailored to Active Tutor */}
        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-bold shrink-0">Ask {activeTutor.name}:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {activeTutor.starterQuestions.map((q, qIdx) => (
              <button
                key={qIdx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-purple-50 border border-slate-200 text-slate-700 hover:text-purple-700 font-medium whitespace-nowrap cursor-pointer transition-colors shadow-2xs disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Voice Button */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`p-3 rounded-2xl transition-all cursor-pointer shadow-sm shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
              title={isListening ? 'Stop listening' : 'Start speaking with microphone'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isListening ? 'Listening to your microphone...' : `Ask ${activeTutor.name} a question...`}
              className="flex-1 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors cursor-pointer disabled:opacity-40 shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Click green microphone to speak or type formulas</span>
            <span>Active Tutor: <strong className="text-purple-700">{activeTutor.name}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
