import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  Play,
  Calendar,
  Trophy,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Brain,
  RotateCcw,
  Clock,
  Layers,
  Check,
  Flame,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Radio
} from 'lucide-react';
import { GradeLevel, PillarType } from '../types/curriculum';
import { AppView } from './Navbar';
import { AgentMessage, AgentActionExecution } from '../types/agent';
import { sendAgentMessage } from '../lib/agentApi';
import confetti from 'canvas-confetti';
import { recordAchievementActivity } from '../lib/achievements';
import { FlowAIPodcastModal } from './FlowAIPodcastModal';

interface AIAgentWorkspaceProps {
  currentGrade: GradeLevel;
  activeView: AppView;
  onNavigateView: (view: AppView, grade?: GradeLevel, pillar?: PillarType) => void;
  onScheduleTopic?: (topic: any) => void;
  onScheduleReminder?: (reminder: any) => void;
  onRecordStreakActivity?: (type: any, title: string) => void;
}

export const AIAgentWorkspace: React.FC<AIAgentWorkspaceProps> = ({
  currentGrade,
  activeView,
  onNavigateView,
  onScheduleTopic,
  onScheduleReminder,
  onRecordStreakActivity
}) => {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'msg_welcome',
      role: 'agent',
      content: `Hello! I am **ViratMagix Autonomous Math Agent**, your AI co-pilot for K-12 Mathematics across **CBSE, ICSE (CISCE), and State Board (Local SCERT)** curricula, as well as Abacus, Vedic Speed Sutras, and SOF IMO Olympiads.\n\nI don't just answer questions—**I can autonomously take actions in this application for you!**\n\nTry asking me to:\n- 📗 *"Explain the ICSE Recurring Deposit interest formula I = P·n(n+1)r/2400"*\n- 📙 *"Solve 4x + 3y = 4 and 6x + 5y = 8 using State Board Cramer's Rule"*\n- 📘 *"Explain CBSE Class 10 Real Numbers Fundamental Theorem of Arithmetic"*\n- 🗓️ *"Plan my math study schedule for Class ${currentGrade}"*\n- 🎙️ *"Generate a Flow AI Podcast breakdown for my syllabus"*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thoughts: [
        'Agent initialized in autonomous mode',
        `Current student context: Class ${currentGrade}`,
        'Ready to execute application actions across CBSE, ICSE, and State Board curricula'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>({});
  const [podcastModalOpen, setPodcastModalOpen] = useState(false);
  const [podcastPromptText, setPodcastPromptText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  // Suggested Prompts
  const suggestedPrompts = [
    `🎙️ Generate a Flow AI Podcast breakdown for Class ${currentGrade}`,
    `📗 Explain the ICSE Class 10 Recurring Deposit and GST rules`,
    `📙 Show me State Board Cramer's Rule with Determinants`,
    `📘 Explain CBSE Class ${currentGrade} chapter concepts & formulas`,
    `⚡ Teach me the Left-to-Right mental addition shortcut`,
    `🗓️ Plan my weekly study routine for Class ${currentGrade}`,
    `🏆 Generate a 3-question Olympiad quiz on Fractions`,
    `⚖️ Take me to the Algebra Balance Scale`
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isProcessing) return;

    const userMsg: AgentMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const response = await sendAgentMessage({
        message: text,
        conversationHistory: [...messages, userMsg],
        grade: currentGrade,
        activeView: activeView
      });

      const agentMsg: AgentMessage = {
        id: `agent_${Date.now()}`,
        role: 'agent',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        thoughts: response.thoughts,
        actions: response.actions,
        generatedQuiz: response.generatedQuiz
      };

      setMessages((prev) => [...prev, agentMsg]);

      // Automatically execute frontend actions dispatched by the agent
      if (response.actions && response.actions.length > 0) {
        response.actions.forEach((act) => {
          if (act.type === 'navigate' && act.parameters?.targetView) {
            const destView = act.parameters.targetView as AppView;
            const destGrade = act.parameters.grade as GradeLevel;
            const destPillar = act.parameters.pillar as PillarType;
            onNavigateView(destView, destGrade, destPillar);
          } else if (act.type === 'schedule_topic' && onScheduleTopic) {
            onScheduleTopic(act.parameters);
            onRecordStreakActivity?.('study_planner', `Agent Scheduled: ${act.parameters?.title}`);
          } else if (act.type === 'schedule_reminder' && onScheduleReminder) {
            onScheduleReminder(act.parameters);
          }
        });
      }

      // Record daily activity for interacting with agent
      onRecordStreakActivity?.('agent', 'Interacted with Autonomous Math Agent');
    } catch (err: any) {
      const errorMsg: AgentMessage = {
        id: `err_${Date.now()}`,
        role: 'agent',
        content: `I encountered an issue processing your request: ${err.message || 'Server error'}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnswerQuiz = (qId: string, oIdx: number, correctIdx: number) => {
    setQuizUserAnswers((prev) => ({ ...prev, [qId]: oIdx }));
    if (oIdx === correctIdx) {
      recordAchievementActivity('problemsSolved', 1);
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch (e) {}
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Agent Top HUD Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-purple-800/40">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 shrink-0">
              <Bot className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  ViratMagix AI Agent
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Autonomous Gemini Flash Engine</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Autonomous co-pilot capable of executing app actions, scheduling study routines, generating quizzes, and explaining multi-step math.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold shrink-0">
            <button
              onClick={() => {
                setPodcastPromptText(`Class ${currentGrade} Speed Math: Master Left-to-Right addition and power cyclicity secrets`);
                setPodcastModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-purple-600/40 hover:bg-purple-600/60 border border-purple-400/40 text-purple-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
              <span>Flow AI Podcast Studio</span>
            </button>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-purple-200">
              Class {currentGrade} Context
            </span>
          </div>
        </div>

        {/* Quick Capabilities Chips */}
        <div className="pt-4 mt-4 border-t border-purple-900/60 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
          <span className="font-bold text-slate-400">Agent Powers:</span>
          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-200 border border-blue-500/30 font-medium">
            📚 CBSE · ICSE · State Board
          </span>
          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-200 border border-purple-500/30 font-medium">
            🧭 App Navigation
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-medium">
            🗓️ Study Planner Scheduling
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-200 border border-amber-500/30 font-medium">
            ⚡ Vedic &amp; Speed Math
          </span>
          <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 font-medium">
            🎙️ Flow AI Podcasts
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 font-medium">
            🏆 Olympiad Quiz Synthesis
          </span>
        </div>
      </div>

      {/* Chat & Execution Workspace */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isAgent = msg.role === 'agent';
            const hasThoughts = msg.thoughts && msg.thoughts.length > 0;
            const isThoughtsOpen = expandedThoughts[msg.id];

            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${isAgent ? 'justify-start' : 'justify-end'}`}
              >
                {isAgent && (
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] space-y-2.5 ${
                    isAgent ? 'text-slate-800' : 'text-white'
                  }`}
                >
                  {/* Thought Trace Accordion (Agent Transparency) */}
                  {isAgent && hasThoughts && (
                    <div className="rounded-xl border border-purple-200/80 bg-purple-50/50 overflow-hidden text-[11px]">
                      <button
                        onClick={() =>
                          setExpandedThoughts((prev) => ({ ...prev, [msg.id]: !prev[msg.id] }))
                        }
                        className="w-full px-3 py-1.5 text-left font-bold text-purple-900 flex items-center justify-between hover:bg-purple-100/50 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Brain className="w-3.5 h-3.5 text-purple-600" />
                          <span>Agent Reasoning &amp; Plan ({msg.thoughts!.length} steps)</span>
                        </span>
                        {isThoughtsOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-purple-600" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-purple-600" />
                        )}
                      </button>

                      {isThoughtsOpen && (
                        <div className="px-3 py-2 border-t border-purple-200/60 bg-white/70 space-y-1 font-mono text-[10px] text-purple-950">
                          {msg.thoughts!.map((t, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-purple-400">↳</span>
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions Executed Banner */}
                  {isAgent && msg.actions && msg.actions.length > 0 && (
                    <div className="space-y-1.5">
                      {msg.actions.map((act) => (
                        <div
                          key={act.id}
                          className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between gap-2 shadow-2xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <div>
                              <span className="font-extrabold text-[11px] block">{act.description}</span>
                              {act.resultSummary && (
                                <span className="text-[10px] text-emerald-700">{act.resultSummary}</span>
                              )}
                            </div>
                          </div>

                          {act.type === 'navigate' && (
                            <button
                              onClick={() => {
                                onNavigateView(act.parameters?.targetView as AppView);
                              }}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] flex items-center gap-1 cursor-pointer shrink-0"
                            >
                              <span>Open View</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Bubble Content */}
                  <div
                    className={`p-4 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-xs ${
                      isAgent
                        ? 'bg-slate-50 border border-slate-200 text-slate-900'
                        : 'bg-indigo-600 text-white font-medium ml-auto'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Generated Quiz Rendering Inside Chat */}
                  {isAgent && msg.generatedQuiz && (
                    <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-indigo-200/60">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-indigo-600" />
                          <span className="font-black text-xs text-indigo-950">
                            Generated Quiz: {msg.generatedQuiz.topic} (Class {msg.generatedQuiz.grade})
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-700">
                          {msg.generatedQuiz.questions.length} Questions
                        </span>
                      </div>

                      <div className="space-y-3">
                        {msg.generatedQuiz.questions.map((q, qIdx) => {
                          const userSelected = quizUserAnswers[q.id];
                          const hasAnswered = userSelected !== undefined;

                          return (
                            <div key={q.id} className="p-3 bg-white rounded-xl border border-indigo-100 space-y-2">
                              <p className="font-bold text-slate-900 text-xs">
                                Q{qIdx + 1}: {q.question}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {q.options.map((opt, oIdx) => {
                                  const isCorrect = oIdx === q.correctIndex;
                                  let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                                  if (hasAnswered) {
                                    if (isCorrect) {
                                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                                    } else if (userSelected === oIdx) {
                                      btnStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleAnswerQuiz(q.id, oIdx, q.correctIndex)}
                                      disabled={hasAnswered}
                                      className={`p-2 rounded-lg border text-left text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer ${btnStyle}`}
                                    >
                                      <span>{opt}</span>
                                      {hasAnswered && isCorrect && (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      )}
                                      {hasAnswered && userSelected === oIdx && !isCorrect && (
                                        <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {hasAnswered && (
                                <div className="p-2 rounded-lg bg-slate-50 text-[10px] text-slate-600 space-y-0.5 border border-slate-100">
                                  <p>
                                    <span className="font-bold">Solution:</span> {q.explanation}
                                  </p>
                                  {q.speedHack && (
                                    <p className="text-amber-700 font-semibold">
                                      ⚡ Shortcut: {q.speedHack}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isProcessing && (
            <div className="flex items-center gap-3 text-xs text-purple-700 font-bold animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Agent is reasoning and executing actions...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Starters */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-100 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[10px] font-bold text-slate-400 pl-1 uppercase tracking-wider">
              Quick Commands:
            </span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isProcessing}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask ViratMagix AI Agent to solve, plan, or navigate (e.g. "Schedule fractions for Monday")...`}
              disabled={isProcessing}
              className="flex-1 p-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/60"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isProcessing}
              className="p-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-2xl font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Flow AI Multi-Host Podcast Studio Modal */}
      <FlowAIPodcastModal
        isOpen={podcastModalOpen}
        onClose={() => setPodcastModalOpen(false)}
        initialQuestion={podcastPromptText || `Class ${currentGrade} Math Question`}
        grade={currentGrade}
        topic="CBSE & Olympiad Mathematics"
      />
    </div>
  );
};
