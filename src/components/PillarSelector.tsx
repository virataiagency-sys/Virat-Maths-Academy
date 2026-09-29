import React from 'react';
import { PillarType } from '../types/curriculum';
import { Calculator, Sparkles, Grid, Flame } from 'lucide-react';

interface PillarSelectorProps {
  activePillar: PillarType;
  onSelectPillar: (pillar: PillarType) => void;
  pillarTaglines: Record<PillarType, string>;
}

export const PillarSelector: React.FC<PillarSelectorProps> = ({
  activePillar,
  onSelectPillar,
  pillarTaglines
}) => {
  const pillars: { id: PillarType; name: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'basic_maths',
      name: 'Basic Maths',
      icon: <Calculator className="w-5 h-5 text-blue-600" />,
      color: 'blue'
    },
    {
      id: 'algebra',
      name: 'Algebra',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      color: 'emerald'
    },
    {
      id: 'abacus',
      name: 'Abacus (Soroban)',
      icon: <Grid className="w-5 h-5 text-amber-600" />,
      color: 'amber'
    },
    {
      id: 'vedic_maths',
      name: 'Vedic Maths',
      icon: <Flame className="w-5 h-5 text-rose-600" />,
      color: 'rose'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {pillars.map((p) => {
        const isActive = activePillar === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelectPillar(p.id)}
            className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
              isActive
                ? 'bg-white dark:bg-slate-900 border-indigo-500 dark:border-indigo-400 shadow-md ring-2 ring-indigo-100 dark:ring-indigo-900/50'
                : 'bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className={`p-1.5 rounded-lg ${isActive ? 'bg-indigo-50 dark:bg-indigo-950/60' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {p.icon}
              </div>
              <div>
                <span className={`text-sm font-bold block ${isActive ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-900 dark:text-slate-100'}`}>
                  {p.name}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {pillarTaglines[p.id]}
            </p>
          </button>
        );
      })}
    </div>
  );
};
