import React from 'react';
import { GitBranch, Image as ImageIcon, Lightbulb, HelpCircle } from 'lucide-react';

export type DimensionType = 'flowchart' | 'infographics' | 'tips_tricks' | 'quiz';

interface DimensionTabsProps {
  activeDimension: DimensionType;
  onChangeDimension: (dimension: DimensionType) => void;
  quizCount: number;
}

export const DimensionTabs: React.FC<DimensionTabsProps> = ({
  activeDimension,
  onChangeDimension,
  quizCount
}) => {
  const tabs: { id: DimensionType; label: string; icon: React.ReactNode; countLabel?: string }[] = [
    {
      id: 'flowchart',
      label: 'Flowchart',
      icon: <GitBranch className="w-4 h-4" />,
    },
    {
      id: 'infographics',
      label: 'Infographics',
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      id: 'tips_tricks',
      label: 'Tips & Tricks',
      icon: <Lightbulb className="w-4 h-4" />,
    },
    {
      id: 'quiz',
      label: 'Interactive Quiz',
      icon: <HelpCircle className="w-4 h-4" />,
      countLabel: `${quizCount} Qs`,
    },
  ];

  return (
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto pb-px">
      <div className="flex items-center gap-2 sm:gap-4">
        {tabs.map((tab) => {
          const isActive = activeDimension === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeDimension(tab.id)}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 rounded-t-lg'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.countLabel && (
                <span className={`text-xs px-1.5 py-0.2 rounded-full font-mono font-medium ${
                  isActive
                    ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.countLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
