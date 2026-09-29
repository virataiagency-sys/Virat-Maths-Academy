import React, { useState } from 'react';
import { InfographicItem } from '../types/curriculum';
import { Bookmark, Check, Copy, Sparkles, BookOpen, Layers } from 'lucide-react';

interface InfographicsViewerProps {
  items: InfographicItem[];
  classNameTitle: string;
  pillarName: string;
}

export const InfographicsViewer: React.FC<InfographicsViewerProps> = ({
  items,
  classNameTitle,
  pillarName,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-600 block">
            {classNameTitle} · {pillarName}
          </span>
          <h3 className="text-lg font-bold text-slate-900">Visual Infographics &amp; Formula Sheets</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Layers className="w-4 h-4 text-slate-400" />
          <span>{items.length} Concept Cards</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>

                <button
                  onClick={() => handleCopy(item.id, `${item.title}: ${item.keyRule}`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Copy key concept"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Central Key Rule Highlight Box */}
              <div className="p-3 bg-gradient-to-r from-indigo-50/80 to-slate-50 rounded-lg border border-indigo-100/70 mb-4">
                <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block mb-0.5">
                  Core Rule / Identity
                </span>
                <span className="text-sm font-semibold text-indigo-950 font-mono">
                  {item.keyRule}
                </span>
              </div>

              {/* Visual bead diagram or steps breakdown */}
              <div className="space-y-2 mb-4">
                {item.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start justify-between gap-3 text-xs"
                  >
                    <span className="font-bold text-slate-700 font-mono shrink-0">
                      {detail.label}
                    </span>
                    <span className="text-slate-600 text-right font-medium">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mnemonic / Memory Hook Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-start gap-2 bg-amber-50/50 -mx-5 -mb-5 p-4 rounded-b-xl">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide block">
                  Memory Hook / Mnemonic
                </span>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {item.mnemonicOrTakeaway}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
