import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, ArrowRight, Check, Flame } from 'lucide-react';
import { GradeLevel, PillarType } from '../types/curriculum';
import { AppView } from './Navbar';
import { sendAgentMessage } from '../lib/agentApi';
import { AgentMessage } from '../types/agent';

interface FloatingAgentDrawerProps {
  currentGrade: GradeLevel;
  activeView: AppView;
  onNavigateView: (view: AppView, grade?: GradeLevel, pillar?: PillarType) => void;
  onScheduleTopic?: (topic: any) => void;
  onScheduleReminder?: (reminder: any) => void;
  onOpenFullAgent: () => void;
}

export const FloatingAgentDrawer: React.FC<FloatingAgentDrawerProps> = ({
  currentGrade,
  activeView,
  onNavigateView,
  onScheduleTopic,
  onScheduleReminder,
  onOpenFullAgent
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [quickReply, setQuickReply] = useState<string | null>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isBusy) return;

    const text = query.trim();
    setQuery('');
    setIsBusy(true);
    setQuickReply(null);

    try {
      const res = await sendAgentMessage({
        message: text,
        conversationHistory: [],
        grade: currentGrade,
        activeView
      });

      setQuickReply(res.reply);

      // Handle executed actions
      if (res.actions && res.actions.length > 0) {
        res.actions.forEach((act) => {
          if (act.type === 'navigate' && act.parameters?.targetView) {
            onNavigateView(act.parameters.targetView as AppView);
            setIsOpen(false);
          } else if (act.type === 'schedule_topic' && onScheduleTopic) {
            onScheduleTopic(act.parameters);
          } else if (act.type === 'schedule_reminder' && onScheduleReminder) {
            onScheduleReminder(act.parameters);
          }
        });
      }
    } catch (e: any) {
      setQuickReply(`Agent error: ${e.message || 'Could not complete request'}`);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-3.5 shadow-2xl hover:shadow-purple-500/30 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer ring-4 ring-purple-400/20 group"
          title="Open AI Math Agent Co-Pilot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-purple-600 animate-pulse" />
          </div>
          <span className="text-xs font-black pr-1 hidden sm:inline-block">AI Agent</span>
        </button>
      )}

      {/* Floating Agent Co-Pilot Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-32px)] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scaleUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-purple-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-white">ViratMagix AI Agent</h4>
                <span className="text-[10px] text-purple-300">Autonomous Math OS</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenFullAgent();
                }}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white transition-colors cursor-pointer"
              >
                Expand View ↗
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Body */}
          <div className="p-4 max-h-80 overflow-y-auto space-y-3 text-xs">
            {quickReply ? (
              <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl text-slate-800 leading-relaxed text-[11px] whitespace-pre-wrap">
                {quickReply}
              </div>
            ) : (
              <div className="space-y-2 text-slate-600 text-xs">
                <p className="font-semibold text-slate-800">
                  Give me any command or math question:
                </p>
                <div className="space-y-1 text-[11px]">
                  <button
                    onClick={() => {
                      setQuery(`Plan my math week for Class ${currentGrade}`);
                    }}
                    className="w-full text-left p-1.5 rounded-lg bg-slate-50 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    👉 Plan my math week for Class {currentGrade}
                  </button>
                  <button
                    onClick={() => {
                      setQuery('Take me to Olympiad Arena');
                    }}
                    className="w-full text-left p-1.5 rounded-lg bg-slate-50 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    👉 Take me to Olympiad Arena
                  </button>
                  <button
                    onClick={() => {
                      setQuery('Quiz me on Vedic Nikhilam speed multiplication');
                    }}
                    className="w-full text-left p-1.5 rounded-lg bg-slate-50 hover:bg-purple-50 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    👉 Quiz me on Vedic Nikhilam speed multiplication
                  </button>
                </div>
              </div>
            )}

            {isBusy && (
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Agent executing autonomous actions...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleQuickSubmit} className="p-3 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask or command the agent..."
              disabled={isBusy}
              className="flex-1 p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
            />
            <button
              type="submit"
              disabled={!query.trim() || isBusy}
              className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
