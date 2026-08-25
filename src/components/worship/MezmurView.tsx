import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Search,
  FileText,
  Music,
  Share2,
  Check,
  Disc,
  Sparkles,
  Heart,
  ChevronRight,
  Headphones,
} from 'lucide-react';
import { useLanguage } from '../layout/LanguageContext';
import { MOCK_MEZMURS } from '../../data/mockMezmur';
import type { MezmurItem } from '../../data/mockMezmur';

export const MezmurView: React.FC<{ onBackToHub?: () => void }> = ({ onBackToHub }) => {
  const { language, activeTrackId, setActiveTrackId } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLyricsModal, setActiveLyricsModal] = useState<MezmurItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', labelEn: 'All Mezmurs', labelAm: 'ሁሉም መዝሙራት' },
    { id: 'Feast', labelEn: 'Feasts', labelAm: 'የበዓላት' },
    { id: 'Mariology', labelEn: 'St. Mary', labelAm: 'የእመቤታችን' },
    { id: 'Meskel', labelEn: 'Holy Cross (Meskel)', labelAm: 'የመስቀል' },
    { id: 'Lent', labelEn: 'Great Lent', labelAm: 'የጾም' },
    { id: 'Saints', labelEn: 'Saints & Angels', labelAm: 'የቅዱሳን' },
  ];

  const filteredMezmurs = MOCK_MEZMURS.filter((m) => {
    const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesSearch =
      m.titleAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.singerAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.singer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredMezmur = MOCK_MEZMURS.find((m) => m.featured) || MOCK_MEZMURS[0];
  const isFeaturedPlaying = activeTrackId === featuredMezmur.id;

  const handleShare = (id: string, title: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - Ethiopian Orthodox Mezmur`);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Header Banner ── */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
          <div>
            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className="inline-flex items-center gap-1 text-xs text-[#855B09] font-bold hover:text-[#2C1D07] mb-2 transition-colors"
              >
                <span>← {language === 'en' ? 'Back to Orthodox Resources Hub' : 'ወደ ሀብታት ማዕከል ተመለስ'}</span>
              </button>
            )}
            <div className="inline-flex items-center gap-2 bg-[#FFF5DB] border border-[#C8A84B] px-3 py-1 rounded-full text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider mb-2">
              <Music className="w-3 h-3" />
              <span>መዝሙር ወስብሐት • SACRED ORTHODOX MEZMUR</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-[#2C1D07] font-geez">
              {language === 'en' ? 'Ethiopian Orthodox Mezmur & Hymns' : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መዝሙራት'}
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] mt-1 max-w-2xl">
              {language === 'en'
                ? 'Listen to spiritual hymns of praise, festive chorals, Marian devotionals, and repentance songs performed by venerable Orthodox choirs.'
                : 'የበዓላት፣ የእመቤታችን፣ የመስቀል፣ የጾምና የንስሐ መዝሙራት በታዋቂ ዘማሪያንና በማኅበራት መዘምራን የቀረቡ።'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search mezmur or singer...' : 'መዝሙር ወይም ዘማሪ ይፈልጉ...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] text-xs text-[#2C1D07] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C8A84B]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                    : 'bg-[#FAF8F3] text-[#4A3B22] border border-[#E6DFD1] hover:bg-[#FFF5DB]'
                }`}
              >
                {language === 'en' ? cat.labelEn : cat.labelAm}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured Mezmur Hero Player ── */}
      {featuredMezmur && selectedCategory === 'ALL' && !searchQuery && (
        <div className="bg-gradient-to-br from-[#1A2C1C] via-[#0D1A0F] to-[#050B06] p-8 md:p-10 rounded-3xl border border-[#C8A84B]/40 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#C8A84B]/20 border border-[#C8A84B]/50 text-[#C8A84B] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Featured Mezmur • ተመራጭ መዝሙር</span>
              </div>

              <div>
                <h2 className="text-2xl md:text-4xl font-black text-white font-geez leading-snug">
                  {featuredMezmur.titleAmharic}
                </h2>
                <p className="text-sm text-[#C8A84B] font-semibold mt-1">
                  {featuredMezmur.titleEnglish}
                </p>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  {featuredMezmur.singerAmharic} • ({featuredMezmur.singer})
                </p>
              </div>

              {/* Sample Lyrics snippet */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xl space-y-1">
                <p className="text-xs text-[#D1FAE5] font-geez leading-relaxed italic">
                  "{featuredMezmur.lyricsAmharic[0]}"
                </p>
                <p className="text-[11px] text-[#94A3B8] italic">
                  "{featuredMezmur.lyricsEnglish?.[0]}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTrackId(isFeaturedPlaying ? null : featuredMezmur.id)}
                  className="bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  {isFeaturedPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isFeaturedPlaying ? 'Pause Mezmur' : `Play Mezmur (${featuredMezmur.duration})`}</span>
                </button>

                <button
                  onClick={() => setActiveLyricsModal(featuredMezmur)}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#C8A84B]" />
                  <span>{language === 'en' ? 'View Full Lyrics' : 'ሙሉ ግጥሙን እይ'}</span>
                </button>
              </div>
            </div>

            {/* Right Disc Artwork Graphic */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#2C1D07] to-[#1A2C1C] border-4 border-[#C8A84B] p-2 flex items-center justify-center shadow-2xl animate-spin-slow">
                <div className="w-20 h-20 rounded-full bg-[#1A2C1C] border-2 border-[#C8A84B] flex items-center justify-center text-center">
                  <Disc className="w-8 h-8 text-[#C8A84B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mezmur Grid List ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#2C1D07] font-geez">
            {language === 'en' ? 'Mezmur Collection' : 'የመዝሙራት ስብስብ'} ({filteredMezmurs.length})
          </h3>
          <span className="text-xs text-[#855B09] font-bold">
            {selectedCategory === 'ALL' ? (language === 'en' ? 'All Categories' : 'ሁሉም ዘርፎች') : selectedCategory}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMezmurs.map((m) => {
            const isPlaying = activeTrackId === m.id;
            return (
              <div
                key={m.id}
                className={`bg-white rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between space-y-4 hover:shadow-lg ${
                  isPlaying ? 'border-[#C8A84B] ring-2 ring-[#C8A84B]/30' : 'border-[#E6DFD1] hover:border-[#C8A84B]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40 rounded-full">
                      {m.categoryAmharic}
                    </span>
                    <span className="text-[10px] font-mono text-[#9CA3AF]">{m.duration}</span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#2C1D07] font-geez leading-snug">
                      {m.titleAmharic}
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-0.5">{m.titleEnglish}</p>
                    <p className="text-[11px] text-[#855B09] font-bold mt-1">
                      🎤 {m.singerAmharic}
                    </p>
                  </div>

                  {/* Lyrics snippet */}
                  <p className="text-xs text-[#4A3B22] font-geez bg-[#FAF8F3] p-2.5 rounded-xl border border-[#E6DFD1] leading-relaxed italic">
                    "{m.lyricsAmharic[0]}"
                  </p>
                </div>

                {/* Card Controls */}
                <div className="pt-2 border-t border-[#E6DFD1] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveTrackId(isPlaying ? null : m.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-[#1A2C1C] text-[#C8A84B]'
                        : 'bg-[#FAF8F3] hover:bg-[#FFF5DB] text-[#2C1D07] border border-[#E6DFD1]'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? 'Playing' : 'Play'}</span>
                  </button>

                  <button
                    onClick={() => setActiveLyricsModal(m)}
                    className="p-2 rounded-xl bg-[#FAF8F3] hover:bg-[#FFF5DB] text-[#855B09] border border-[#E6DFD1] transition-all cursor-pointer"
                    title="Lyrics"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShare(m.id, m.titleAmharic)}
                    className="p-2 rounded-xl bg-[#FAF8F3] hover:bg-[#FFF5DB] text-[#6B7280] hover:text-[#2C1D07] border border-[#E6DFD1] transition-all cursor-pointer"
                    title="Share"
                  >
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Full Lyrics Modal ── */}
      {activeLyricsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLyricsModal(null)}
        >
          <div
            className="bg-[#FAF8F3] border-2 border-[#C8A84B] rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-5 text-[#2C1D07] shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E6DFD1] pb-4">
              <div>
                <span className="text-[10px] font-extrabold bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B] px-2.5 py-0.5 rounded-full">
                  {activeLyricsModal.categoryAmharic}
                </span>
                <h3 className="text-xl font-black font-geez text-[#2C1D07] mt-2">
                  {activeLyricsModal.titleAmharic}
                </h3>
                <p className="text-xs text-[#6B7280]">{activeLyricsModal.singerAmharic}</p>
              </div>
              <button
                onClick={() => setActiveLyricsModal(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E6DFD1] text-[#6B7280] hover:text-[#2C1D07] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Lyrics content */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E6DFD1] space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-[#855B09] tracking-wider">
                  Amharic Lyrics (የመዝሙሩ ግጥም):
                </span>
                <div className="space-y-2 pt-1 font-geez text-sm font-bold text-[#1A2C1C] leading-loose">
                  {activeLyricsModal.lyricsAmharic.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              {activeLyricsModal.lyricsEnglish && (
                <div className="bg-[#EFF6FF] p-4 rounded-2xl border border-[#BFDBFE] space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-[#1D4ED8] tracking-wider">
                    English Translation:
                  </span>
                  <div className="space-y-1.5 pt-1 text-xs text-[#334155] italic leading-relaxed">
                    {activeLyricsModal.lyricsEnglish.map((line, idx) => (
                      <p key={idx}>"{line}"</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setActiveTrackId(activeTrackId === activeLyricsModal.id ? null : activeLyricsModal.id);
                }}
                className="bg-[#1A2C1C] text-[#C8A84B] px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                {activeTrackId === activeLyricsModal.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{activeTrackId === activeLyricsModal.id ? 'Pause Audio' : 'Play Audio'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
