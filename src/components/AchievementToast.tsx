import React, { useEffect } from 'react';
import { Trophy, Award, Star, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { BadgeAchievement } from '../types/achievements';

interface AchievementToastProps {
  badge: BadgeAchievement | null;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ badge, onClose }) => {
  useEffect(() => {
    if (!badge) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-2 border-amber-400/80 rounded-3xl p-4 shadow-2xl text-white relative overflow-hidden ring-4 ring-amber-400/20">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-28 h-28 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-black text-xl animate-pulse">
            🏆
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>New Trophy Unlocked!</span>
              </span>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-sm font-black text-white leading-tight truncate">
              {badge.title}
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
              {badge.description}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                +{badge.points} XP
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {badge.tier} Tier
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
