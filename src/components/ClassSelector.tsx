import React from 'react';
import { GradeLevel } from '../types/curriculum';
import { gradeList } from '../data/curriculumData';

interface ClassSelectorProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({ currentGrade, onSelectGrade }) => {
  const getTierForGrade = (grade: GradeLevel): string => {
    if (grade <= 5) return 'Primary';
    if (grade <= 8) return 'Middle';
    if (grade <= 10) return 'Secondary';
    return 'Senior';
  };

  const tiers: { name: string; range: [number, number]; desc: string }[] = [
    { name: 'Primary', range: [1, 5], desc: 'Classes 1 - 5' },
    { name: 'Middle', range: [6, 8], desc: 'Classes 6 - 8' },
    { name: 'Secondary', range: [9, 10], desc: 'Classes 9 - 10' },
    { name: 'Senior', range: [11, 12], desc: 'Classes 11 - 12' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm mb-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">Select Student Class (Grade)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tailored curriculum across 12 levels covering Basic Maths, Algebra, Abacus &amp; Vedic Speed Maths
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Active:</span>
          <span className="font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded">
            Class {currentGrade} ({getTierForGrade(currentGrade)})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
        {gradeList.map((grade) => {
          const isSelected = grade === currentGrade;
          const tier = getTierForGrade(grade);
          return (
            <button
              key={grade}
              onClick={() => onSelectGrade(grade)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all cursor-pointer text-center ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200 dark:ring-indigo-900'
                  : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="text-xs font-semibold opacity-75">Class</span>
              <span className="text-lg font-extrabold font-mono leading-none my-0.5">{grade}</span>
              <span className={`text-[10px] uppercase tracking-wider font-medium truncate max-w-full ${isSelected ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'}`}>
                {tier}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
