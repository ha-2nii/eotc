import React from 'react';
import {
  BookOpen, Shield, Heart, Scroll, Flame, Cross, BookMarked, Sparkles, Feather
} from 'lucide-react';

export interface CategoryRoundelItem {
  id: string;
  labelAm: string;
  labelEn: string;
  count: number | string;
  iconType?: 'torah' | 'history' | 'wisdom' | 'prophet' | 'gospel' | 'epistle' | 'unique' | 'prayer' | 'liturgy';
  active?: boolean;
  onClick: () => void;
}

export const BookCategoryRoundel: React.FC<{
  categories: CategoryRoundelItem[];
  selectedId: string;
}> = ({ categories, selectedId }) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'torah':
        return Scroll;
      case 'history':
        return Shield;
      case 'wisdom':
        return Sparkles;
      case 'prophet':
        return Flame;
      case 'gospel':
        return Cross;
      case 'epistle':
        return Feather;
      case 'unique':
        return BookMarked;
      case 'prayer':
        return Heart;
      default:
        return BookOpen;
    }
  };

  const getThemeBg = (type?: string, isActive?: boolean) => {
    if (isActive) return 'bg-[#C8A84B] text-[#1A2C1C] ring-4 ring-[#C8A84B]/20 scale-105 shadow-lg';
    switch (type) {
      case 'torah':
        return 'bg-[#FFF8E7] text-[#855B09] border-[#E6DFD1] hover:border-[#C8A84B]';
      case 'history':
        return 'bg-[#F0FDF4] text-[#166534] border-[#DCFCE7] hover:border-[#22C55E]';
      case 'wisdom':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A] hover:border-[#F59E0B]';
      case 'prophet':
        return 'bg-[#FFF1F2] text-[#9F1239] border-[#FFE4E6] hover:border-[#E11D48]';
      case 'gospel':
        return 'bg-[#EFF6FF] text-[#1E40AF] border-[#DBEAFE] hover:border-[#3B82F6]';
      case 'epistle':
        return 'bg-[#FAF5FF] text-[#6B21A8] border-[#F3E8FF] hover:border-[#A855F7]';
      case 'unique':
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0] hover:border-[#10B981]';
      case 'prayer':
        return 'bg-[#FFF5F5] text-[#9B1C1C] border-[#FDE8E8] hover:border-[#F05252]';
      default:
        return 'bg-[#FAF8F3] text-[#855B09] border-[#E6DFD1] hover:border-[#C8A84B]';
    }
  };

  return (
    <div className="w-full py-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-widest text-[#855B09]">
          Browse Canon Categories • በክፍል ይመልከቱ
        </h4>
        <span className="text-[11px] text-[#6B7280] font-mono">81 Canonical Books</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto custom-scrollbar pb-3 pt-1 px-1">
        {categories.map((cat) => {
          const Icon = getIcon(cat.iconType);
          const isActive = selectedId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={cat.onClick}
              className="flex flex-col items-center gap-2 group shrink-0 focus:outline-none transition-transform active:scale-95"
            >
              {/* Circular Avatar / Roundel */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm group-hover:shadow-md ${getThemeBg(
                  cat.iconType,
                  isActive
                )}`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />
              </div>

              {/* Category Labels below */}
              <div className="text-center max-w-[90px] space-y-0.5">
                <span
                  className={`text-xs font-bold font-geez block leading-tight truncate transition-colors ${
                    isActive ? 'text-[#855B09] font-black' : 'text-[#2C1D07] group-hover:text-[#855B09]'
                  }`}
                >
                  {cat.labelAm}
                </span>
                <span className="text-[10px] text-[#6B7280] block truncate">
                  {cat.labelEn}
                </span>
                <span className="text-[9px] font-mono font-bold text-[#C8A84B] bg-[#FFF5DB] px-1.5 py-0.2 rounded-full inline-block">
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
