import React, { useState } from 'react';
import { TipTrickItem } from '../types/curriculum';
import { Clock, AlertTriangle, Zap, CheckCircle2, ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { FlowAIPodcastModal } from './FlowAIPodcastModal';

interface TipsTricksViewerProps {
  tips: TipTrickItem[];
  classNameTitle: string;
  pillarName: string;
}

export const TipsTricksViewer: React.FC<TipsTricksViewerProps> = ({
  tips,
  classNameTitle,
  pillarName,
}) => {
  const [expandedTipId, setExpandedTipId] = useState<string | null>(tips[0]?.id || null);
  const [podcastTip, setPodcastTip] = useState<TipTrickItem | null>(null);
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedTipId(expandedTipId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-600 block">
            {classNameTitle} · {pillarName}
          </span>
          <h3 className="text-lg font-bold text-slate-900">Speed Math Tips, Tricks &amp; Traps</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>{tips.length} Speed Hacks</span>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip) => {
          const isExpanded = expandedTipId === tip.id;
          return (
            <div
              key={tip.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-all"
            >
              {/* Collapsible Card Header */}
              <button
                onClick={() => toggleExpand(tip.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-bold text-slate-900">{tip.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        tip.difficulty === 'Easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : tip.difficulty === 'Medium'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {tip.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{tip.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tip.timeSaved}</span>
                  </div>
                  <div className="p-1 rounded-md text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </button>

              {/* Card Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/30 space-y-4">
                  {/* How it works steps */}
                  <div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                      How The Trick Works
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {tip.howItWorks.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Worked Example */}
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                    <span className="text-xs font-bold text-slate-900 block mb-1">
                      Worked Example: {tip.example.question}
                    </span>
                    <div className="space-y-1 my-2">
                      {tip.example.steps.map((st, i) => (
                        <div key={i} className="text-xs font-mono text-slate-600 pl-3 border-l-2 border-indigo-300">
                          {st}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-500">Mental Output:</span>
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {tip.example.answer}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => {
                          setPodcastTip(tip);
                          setIsPodcastOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                        <span>Generate Flow AI Podcast for this Trick</span>
                      </button>
                    </div>
                  </div>

                  {/* Common Pitfall / Trap */}
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-rose-950 block">Common Exam Trap to Avoid</span>
                      <p className="text-xs text-rose-900">{tip.commonPitfall}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Flow AI Multi-Host Podcast Studio Modal */}
      {podcastTip && (
        <FlowAIPodcastModal
          isOpen={isPodcastOpen}
          onClose={() => setIsPodcastOpen(false)}
          initialQuestion={podcastTip.example.question}
          initialAnswer={podcastTip.example.answer}
          initialExplanation={{
            conventionalStepByStep: podcastTip.example.steps,
            speedHack: podcastTip.howItWorks.join(' '),
            keyTakeaway: `Speed trick for ${podcastTip.title}. Avoid trap: ${podcastTip.commonPitfall}`
          }}
          topic={pillarName}
        />
      )}
    </div>
  );
};
