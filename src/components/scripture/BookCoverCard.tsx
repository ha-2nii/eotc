import React, { useState } from 'react';
import { Heart, ArrowRight, Volume2, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface BookCoverCardProps {
  id?: string;
  number?: number | string;
  titleAmharic: string;
  titleEnglish: string;
  titleGeez?: string;
  subtitle?: string;
  category?: string;
  testament?: 'OT' | 'NT' | 'DEUT' | 'EOTC_UNIQUE' | 'PRAYER' | 'LITURGY' | 'GEEZ' | string;
  chaptersCount?: number | string;
  description?: string;
  audioDuration?: string;
  rating?: number;
  isFavorite?: boolean;
  coverTheme?: 'gold' | 'burgundy' | 'navy' | 'emerald' | 'amber' | 'parchment' | 'purple';
  onClick?: () => void;
  actionLabel?: string;
}

export const BookCoverCard: React.FC<BookCoverCardProps> = ({
  number,
  titleAmharic,
  titleEnglish,
  titleGeez,
  subtitle,
  category,
  testament,
  chaptersCount,
  description,
  audioDuration,
  rating = 5.0,
  isFavorite = false,
  coverTheme,
  onClick,
  actionLabel,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const getCoverStyles = () => {
    if (coverTheme === 'burgundy' || testament === 'PRAYER') {
      return {
        bg: 'from-[#4A0E17] via-[#2D0A0E] to-[#1A0508]',
        accent: '#E6B87D',
        border: 'border-[#800020]/50',
        ribbon: '#C8A84B',
        emboss: 'rgba(230, 184, 125, 0.15)',
        badgeBg: 'bg-[#800020]/20 text-[#E6B87D] border-[#800020]/40',
      };
    }
    if (coverTheme === 'emerald' || testament === 'EOTC_UNIQUE') {
      return {
        bg: 'from-[#0D3B2E] via-[#07241C] to-[#041410]',
        accent: '#D4AF37',
        border: 'border-[#006B3C]/50',
        ribbon: '#50C878',
        emboss: 'rgba(212, 175, 55, 0.18)',
        badgeBg: 'bg-[#006B3C]/20 text-[#50C878] border-[#006B3C]/40',
      };
    }
    if (coverTheme === 'navy' || testament === 'NT') {
      return {
        bg: 'from-[#102A43] via-[#0A1929] to-[#050D15]',
        accent: '#90CDF4',
        border: 'border-[#2B6CB0]/50',
        ribbon: '#63B3ED',
        badgeBg: 'bg-[#2B6CB0]/20 text-[#90CDF4] border-[#2B6CB0]/40',
        emboss: 'rgba(144, 205, 244, 0.15)',
      };
    }
    if (coverTheme === 'purple' || testament === 'DEUT') {
      return {
        bg: 'from-[#3B124D] via-[#240B30] to-[#120518]',
        accent: '#E9D8FD',
        border: 'border-[#805AD5]/50',
        ribbon: '#B794F4',
        badgeBg: 'bg-[#805AD5]/20 text-[#E9D8FD] border-[#805AD5]/40',
        emboss: 'rgba(233, 216, 253, 0.15)',
      };
    }
    if (testament === 'LITURGY') {
      return {
        bg: 'from-[#3D2200] via-[#241400] to-[#140B00]',
        accent: '#FFD700',
        border: 'border-[#C8A84B]/50',
        ribbon: '#C8A84B',
        badgeBg: 'bg-[#C8A84B]/20 text-[#FFD700] border-[#C8A84B]/40',
        emboss: 'rgba(255, 215, 0, 0.18)',
      };
    }
    // Default Gold / Old Testament
    return {
      bg: 'from-[#2C1D07] via-[#1E1303] to-[#120B02]',
      accent: '#E6C687',
      border: 'border-[#C8A84B]/50',
      ribbon: '#C8A84B',
      badgeBg: 'bg-[#C8A84B]/20 text-[#E6C687] border-[#C8A84B]/40',
      emboss: 'rgba(230, 198, 135, 0.15)',
    };
  };

  const style = getCoverStyles();

  return (
    <Card
      onClick={onClick}
      className="group relative flex flex-col justify-between bg-white rounded-2xl p-3 sm:p-4 border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer select-none hover:-translate-y-1.5"
    >
      {/* ── 3D Book Cover ── */}
      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.15)] group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.25)] transition-all duration-300">

        {/* Book Spine Shadow */}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/45 via-black/20 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 left-[3px] w-[1px] bg-white/20 z-20 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/25 z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-black/20 z-20 pointer-events-none" />

        {/* Favorite Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setFavorite(!favorite); }}
          aria-label="Save to favorites"
          className="absolute top-2.5 right-2.5 z-30 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-90"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-white/80 hover:text-white'}`} />
        </button>

        {/* Book Number Tag */}
        {number !== undefined && (
          <div className="absolute top-2.5 left-3.5 z-20 px-2 py-0.5 rounded-md bg-black/45 backdrop-blur-md text-[10px] font-mono font-black text-amber-200 border border-white/10">
            #{number}
          </div>
        )}

        {/* Cover Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${style.bg} p-4 sm:p-5 flex flex-col justify-between text-white`}>
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
          <div className="absolute inset-3 border border-white/15 rounded-lg pointer-events-none" />
          <div className="absolute inset-4 border border-white/10 rounded pointer-events-none" />

          <div className="relative z-10 pt-6 text-center space-y-1">
            <span className="text-[9px] uppercase tracking-widest font-black block font-mono" style={{ color: style.accent }}>
              {category || (testament === 'EOTC_UNIQUE' ? 'Ethiopic Special' : testament) || 'EOTC SACRED CANON'}
            </span>
          </div>

          <div className="relative z-10 text-center my-auto space-y-2 py-2">
            <div className="w-9 h-9 mx-auto rounded-full border border-white/25 flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-4 h-4" style={{ color: style.accent }} />
            </div>
            <h3 className="text-base sm:text-lg font-black font-geez leading-snug tracking-wide text-white drop-shadow-md line-clamp-2">
              {titleAmharic}
            </h3>
            <p className="text-[11px] sm:text-xs font-serif font-bold text-stone-200 line-clamp-1">
              {titleEnglish}
            </p>
            {titleGeez && (
              <p className="text-[10px] font-geez opacity-70 text-stone-300 line-clamp-1">{titleGeez}</p>
            )}
          </div>

          <div className="relative z-10 text-center pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-stone-300 font-mono">
            <span>{chaptersCount !== undefined ? `${chaptersCount} Ch` : 'Canon'}</span>
            {audioDuration ? (
              <span className="flex items-center gap-1 text-amber-200">
                <Volume2 className="w-3 h-3" /> {audioDuration}
              </span>
            ) : (
              <span className="text-stone-400">፹፩ መጻሕፍት</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Metadata ── */}
      <CardContent className="pt-3 px-0 pb-0 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-stone-500 font-mono">{rating.toFixed(1)}</span>
            </div>
            <Badge
              className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${style.badgeBg} hover:opacity-90`}
            >
              {testament === 'EOTC_UNIQUE' ? 'Ethiopic' : testament || 'Canonical'}
            </Badge>
          </div>

          <h4 className="text-sm font-bold text-[#2C1D07] font-geez leading-snug group-hover:text-[#855B09] transition-colors line-clamp-1">
            {titleAmharic}
          </h4>
          <p className="text-xs text-[#855B09] font-medium line-clamp-1">{subtitle || titleEnglish}</p>
          {description && (
            <p className="text-[11px] text-[#6B7280] leading-relaxed line-clamp-2 pt-0.5">{description}</p>
          )}
        </div>
      </CardContent>

      {/* ── Footer Action ── */}
      <CardFooter className="pt-2 px-0 pb-0 border-t border-[#E6DFD1] flex items-center justify-between text-xs mt-2">
        <span className="font-mono text-[#855B09] font-bold text-[11px]">
          {chaptersCount !== undefined
            ? `${chaptersCount} ${Number(chaptersCount) === 1 ? 'Chapter' : 'Chapters'}`
            : 'Sacred Text'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 font-bold text-[#1A2C1C] group-hover:text-[#855B09] group-hover:translate-x-0.5 transition-all text-xs h-auto p-0 hover:bg-transparent"
        >
          <span>{actionLabel || 'Read Book'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
