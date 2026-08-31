import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  FileText,
  Music,
  Share2,
  Check,
  Disc,
  Heart,
  Headphones,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  MoreHorizontal,
  Clock,
  Radio,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../layout/LanguageContext';
import { MOCK_MEZMURS } from '../../data/mockMezmur';
import type { MezmurItem } from '../../data/mockMezmur';

export const MezmurView: React.FC<{ onBackToHub?: () => void }> = () => {
  const { language, setActiveTrackId } = useLanguage();

  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLyricsModal, setActiveLyricsModal] = useState<MezmurItem | null>(null);
  const [lyricsLang, setLyricsLang] = useState<'am' | 'en'>('am');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openOptionsId, setOpenOptionsId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; isLiked: boolean } | null>(null);

  // Player State
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackProgressSecs, setTrackProgressSecs] = useState<number>(154); // default ~2:34
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Persistent Liked Songs Map
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('eotc_favorite_mezmurs');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      'mezmur-1': true,
      'mezmur-2': true,
    };
  });

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eotc_favorite_mezmurs', JSON.stringify(likedMap));
    } catch {
      // ignore
    }
  }, [likedMap]);

  const likedCount = Object.values(likedMap).filter(Boolean).length;

  const playlists = [
    { id: 'ALL', labelEn: 'All Mezmurs', labelAm: 'ሁሉም መዝሙራት', icon: Radio },
    { id: 'FAVORITES', labelEn: `Liked Songs (${likedCount})`, labelAm: `የተወደዱ (${likedCount})`, icon: Heart, isSpecial: true },
    { id: 'Feast', labelEn: 'Feasts', labelAm: 'የበዓላት', icon: Music },
    { id: 'Mariology', labelEn: 'St. Mary', labelAm: 'የእመቤታችን', icon: Sparkles },
    { id: 'Meskel', labelEn: 'Holy Cross (Meskel)', labelAm: 'የመስቀል', icon: Layers },
    { id: 'Lent', labelEn: 'Great Lent', labelAm: 'የጾም', icon: Disc },
    { id: 'Saints', labelEn: 'Saints & Angels', labelAm: 'የቅዱሳን', icon: Headphones },
  ];

  const filteredMezmurs = MOCK_MEZMURS.filter((m) => {
    let matchesCategory = true;
    if (selectedPlaylist === 'FAVORITES') {
      matchesCategory = !!likedMap[m.id];
    } else if (selectedPlaylist !== 'ALL') {
      matchesCategory = m.category === selectedPlaylist;
    }

    const matchesSearch =
      m.titleAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.singerAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.singer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.album && m.album.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const currentTrack = filteredMezmurs[currentTrackIndex] || filteredMezmurs[0] || MOCK_MEZMURS[0];

  // Play audio ticker simulation
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setTrackProgressSecs((prev) => {
          if (prev >= currentTrack.durationSecs) {
            if (isRepeat) return 0;
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentTrack, isRepeat]);

  const handlePlayTrack = (track: MezmurItem, index: number) => {
    setCurrentTrackIndex(index);
    setActiveTrackId(track.id);
    setIsPlaying(true);
    setTrackProgressSecs(0);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setActiveTrackId(currentTrack.id);
    }
  };

  const handleNextTrack = () => {
    if (filteredMezmurs.length === 0) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * filteredMezmurs.length);
      setCurrentTrackIndex(randomIndex);
      setActiveTrackId(filteredMezmurs[randomIndex].id);
    } else {
      const nextIndex = (currentTrackIndex + 1) % filteredMezmurs.length;
      setCurrentTrackIndex(nextIndex);
      setActiveTrackId(filteredMezmurs[nextIndex].id);
    }
    setTrackProgressSecs(0);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (filteredMezmurs.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + filteredMezmurs.length) % filteredMezmurs.length;
    setCurrentTrackIndex(prevIndex);
    setActiveTrackId(filteredMezmurs[prevIndex].id);
    setTrackProgressSecs(0);
    setIsPlaying(true);
  };

  const toggleLike = (trackId: string, trackTitle?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const willBeLiked = !likedMap[trackId];
    setLikedMap((prev) => ({ ...prev, [trackId]: willBeLiked }));

    const title = trackTitle || MOCK_MEZMURS.find(m => m.id === trackId)?.titleAmharic || 'Mezmur';
    setToastMessage({
      text: willBeLiked
        ? `Added "${title}" to Liked Songs`
        : `Removed "${title}" from Liked Songs`,
      isLiked: willBeLiked,
    });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = (id: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - Ethiopian Orthodox Mezmur`);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
    setOpenOptionsId(null);
  };

  const formatSecs = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isFavoritesView = selectedPlaylist === 'FAVORITES';

  return (
    <div className="space-y-8 animate-fadeIn pb-32">

      {/* ═══════════════════════════════════════════
          1. HERO HEADER (DYNAMIC FOR ALL / LIKED SONGS)
      ═══════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E6DFD1] bg-[#2A1D0E] text-white">
        
        {/* Right Side Background Artwork with Smooth Gradient Blend */}
        <div 
          className="absolute inset-0 bg-cover bg-right opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${isFavoritesView ? '/assets/images/mezmur_liked_artwork.jpg' : '/assets/images/mezmur_hero_candle.jpg'}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#201509] via-[#2A1D0E]/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201509] via-transparent to-transparent opacity-80" />

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
          
          {/* Left Album / Liked Cover Art */}
          <div
            className="relative shrink-0 w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-[#C8A84B]/60 shadow-2xl group cursor-pointer"
            onClick={() => filteredMezmurs.length > 0 && handlePlayTrack(filteredMezmurs[0], 0)}
          >
            <img
              src={isFavoritesView ? '/assets/images/mezmur_liked_artwork.jpg' : '/assets/images/mezmur_hero_album.jpg'}
              alt={isFavoritesView ? 'Liked Songs' : 'Ethiopian Orthodox Mezmur & Hymns'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-[#1A2C1C] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>
          </div>

          {/* Right Hero Metadata & Controls */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-widest">
              {isFavoritesView ? (
                <>
                  <Heart className="w-3 h-3 fill-current text-rose-400" />
                  <span>YOUR SACRED FAVORITES • የተወደዱ መዝሙራት</span>
                </>
              ) : (
                <>
                  <Music className="w-3 h-3" />
                  <span>SACRED ORTHODOX MEZMUR • መዝሙር ወስብሐት</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              {isFavoritesView ? (
                language === 'en' ? 'Liked Songs' : 'የተወደዱ መዝሙራት'
              ) : (
                'Ethiopian Orthodox Mezmur & Hymns'
              )}
            </h1>

            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed max-w-2xl font-body">
              {isFavoritesView
                ? language === 'en'
                  ? 'Your personalized spiritual treasury of favorite hymns, festive chorals, and Marian devotionals.'
                  : 'የመረጧቸውና የወደዷቸው ቅዱሳን መዝሙራት፣ የበዓላት ዝማሬዎችና የጸሎት ዜማዎች ስብስብ።'
                : language === 'en'
                  ? 'Listen to spiritual hymns of praise, festive chorals, Marian devotionals, and repentance songs performed by venerable Orthodox choirs.'
                  : 'የበዓላት፣ የእመቤታችን፣ የመስቀል፣ የጾምና የንስሐ መዝሙራት በታዋቂ ዘማሪያንና በማኅበራት መዘምራን የቀረቡ።'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
              <span className="text-xs font-semibold text-[#D4AF37] bg-white/10 px-3 py-1 rounded-lg backdrop-blur-xs">
                {isFavoritesView
                  ? `${likedCount} Liked Songs • Private Collection`
                  : '154 Songs • 8 Playlists'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <button
                disabled={filteredMezmurs.length === 0}
                onClick={() => filteredMezmurs.length > 0 && handlePlayTrack(filteredMezmurs[0], 0)}
                className={`px-7 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer ${
                  filteredMezmurs.length > 0
                    ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#1A2C1C]'
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play All</span>
              </button>

              <button
                disabled={filteredMezmurs.length === 0}
                onClick={() => {
                  if (filteredMezmurs.length === 0) return;
                  setIsShuffle(true);
                  const randomIndex = Math.floor(Math.random() * filteredMezmurs.length);
                  handlePlayTrack(filteredMezmurs[randomIndex], randomIndex);
                }}
                className={`px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  filteredMezmurs.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Shuffle className="w-4 h-4 text-[#D4AF37]" />
                <span>Shuffle</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ═══════════════════════════════════════════
          2. MAIN BODY (SIDEBAR + SPOTIFY TRACKLIST)
      ═══════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ── LEFT SIDEBAR: PLAYLISTS WITH LIKED SONGS & INSPIRATION CARD ── */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          
          <div className="bg-white rounded-3xl p-5 border border-[#E6DFD1] shadow-xs space-y-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#855B09] px-2 block">
              PLAYLISTS & FAVORITES
            </span>

            <nav className="space-y-1 text-xs font-semibold">
              {playlists.map((pl) => {
                const Icon = pl.icon;
                const isActive = selectedPlaylist === pl.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => setSelectedPlaylist(pl.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? pl.isSpecial
                          ? 'bg-gradient-to-r from-[#F5E8CE] to-[#FCE7F3] text-[#855B09] font-bold shadow-2xs border border-[#C8A84B]'
                          : 'bg-[#F5E8CE] text-[#855B09] font-bold shadow-2xs border border-[#C8A84B]/40'
                        : 'text-[#4A3B22] hover:bg-[#FAF8F3] hover:text-[#2C1D07]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? pl.isSpecial ? 'text-rose-500 fill-rose-500' : 'text-[#855B09]'
                          : pl.isSpecial ? 'text-rose-400' : 'text-[#9CA3AF]'
                      }`} />
                      <span className="truncate">{language === 'en' ? pl.labelEn : pl.labelAm}</span>
                    </div>

                    {pl.isSpecial && likedCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold">
                        {likedCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sacred Melodies Quote Card */}
          <div className="p-5 rounded-3xl bg-[#FAF8F3] border border-[#E6DFD1] text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-white border border-[#E6DFD1] flex items-center justify-center shadow-xs">
              <Sparkles className="w-6 h-6 text-[#C8A84B]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-[#2C1D07] font-serif">
                Sacred melodies that uplift the soul
              </h4>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                Discover, favorite, and listen to the spiritual songs and holy hymns of our Orthodox faith.
              </p>
            </div>
          </div>

        </aside>

        {/* ── RIGHT MAIN CONTENT: SEARCH, PILLS, & TRACKLIST TABLE ── */}
        <main className="flex-1 min-w-0 space-y-6">

          {/* Category Filter Pills & Search Bar Header */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-xs">
            
            {/* Horizontal Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
              {playlists.map((pl) => {
                const isActive = selectedPlaylist === pl.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => setSelectedPlaylist(pl.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? pl.isSpecial
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-[#855B09] text-white shadow-xs'
                        : pl.isSpecial
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          : 'bg-[#FAF8F3] text-[#4A3B22] border border-[#E6DFD1] hover:bg-[#F3EFE6]'
                    }`}
                  >
                    {pl.isSpecial && <Heart className={`w-3 h-3 ${isActive ? 'fill-white' : 'fill-rose-500 text-rose-500'}`} />}
                    <span>{language === 'en' ? pl.labelEn : pl.labelAm}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input & Reset Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Search mezmur or singer...' : 'መዝሙር ወይም ዘማሪ ይፈልጉ...'}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] text-[#2C1D07] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C8A84B]"
                />
              </div>

              <button
                onClick={() => {
                  setSelectedPlaylist('ALL');
                  setSearchQuery('');
                }}
                className="px-3 py-1.5 rounded-xl border border-[#E6DFD1] bg-[#FAF8F3] hover:bg-[#F3EFE6] text-xs font-bold text-[#4A3B22] flex items-center gap-1.5 transition-colors shrink-0"
              >
                <SlidersHorizontal className="w-3 h-3 text-[#855B09]" />
                <span>Reset</span>
              </button>
            </div>

          </div>

          {/* ═══════════════════════════════════════════
              SPOTIFY LIGHT TRACKLIST TABLE
          ═══════════════════════════════════════════ */}
          <div className="bg-white rounded-3xl border border-[#E6DFD1] shadow-xs overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-3 px-6 py-3.5 border-b border-[#E6DFD1] text-[11px] font-extrabold uppercase tracking-wider text-[#855B09] bg-[#FAF8F3]">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">TITLE</div>
              <div className="col-span-3">SINGER / CHOIR</div>
              <div className="col-span-2 hidden md:block">ALBUM / OCCASION</div>
              <div className="col-span-1 text-right flex items-center justify-end gap-2">
                <Clock className="w-3.5 h-3.5 text-[#855B09]" />
              </div>
            </div>

            {/* Track Rows */}
            <div className="divide-y divide-[#E6DFD1]/60">
              {filteredMezmurs.length === 0 ? (
                <div className="p-16 text-center text-[#6B7280] space-y-4">
                  {isFavoritesView ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center mx-auto shadow-xs">
                        <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
                      </div>
                      <div className="space-y-1 max-w-sm mx-auto">
                        <h4 className="text-base font-bold text-[#2C1D07]">No favorite songs yet</h4>
                        <p className="text-xs text-[#6B7280] leading-relaxed">
                          Click the heart icon <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mx-0.5" /> next to any mezmur to save it to your personal favorites collection.
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedPlaylist('ALL')}
                        className="px-5 py-2 rounded-xl bg-[#855B09] text-white text-xs font-bold hover:bg-[#6D4A07] transition-all shadow-xs inline-flex items-center gap-2"
                      >
                        <Music className="w-3.5 h-3.5" />
                        <span>Explore All Mezmurs</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Music className="w-8 h-8 text-[#C8A84B] mx-auto opacity-50" />
                      <p className="text-sm font-semibold">No mezmurs found matching your search.</p>
                    </>
                  )}
                </div>
              ) : (
                filteredMezmurs.map((track, idx) => {
                  const isCurrent = currentTrack.id === track.id;
                  const isTrackPlaying = isCurrent && isPlaying;
                  const isLiked = !!likedMap[track.id];

                  return (
                    <div
                      key={track.id}
                      onClick={() => handlePlayTrack(track, idx)}
                      className={`grid grid-cols-12 gap-3 items-center px-6 py-3.5 text-xs transition-colors cursor-pointer group ${
                        isCurrent
                          ? 'bg-[#FFFDF5] text-[#2C1D07]'
                          : 'hover:bg-[#FAF8F3] text-[#4A3B22]'
                      }`}
                    >
                      {/* Column 1: Index / Play Icon / Equalizer */}
                      <div className="col-span-1 text-center font-bold">
                        {isTrackPlaying ? (
                          <div className="inline-flex items-center justify-center gap-0.5 text-[#C8A84B] animate-pulse">
                            <span className="w-1 h-3.5 bg-[#C8A84B] rounded-full inline-block" />
                            <span className="w-1 h-5 bg-[#C8A84B] rounded-full inline-block" />
                            <span className="w-1 h-2.5 bg-[#C8A84B] rounded-full inline-block" />
                          </div>
                        ) : (
                          <>
                            <span className="group-hover:hidden text-[#9CA3AF]">{idx + 1}</span>
                            <Play className="w-3.5 h-3.5 text-[#855B09] fill-current mx-auto hidden group-hover:block" />
                          </>
                        )}
                      </div>

                      {/* Column 2: Artwork & Title */}
                      <div className="col-span-5 flex items-center gap-3 min-w-0">
                        <img
                          src={track.albumArt || '/assets/images/mezmur_hero_album.jpg'}
                          alt={track.titleEnglish}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#E6DFD1]"
                        />
                        <div className="min-w-0">
                          <h4 className={`font-bold font-geez text-sm truncate ${
                            isCurrent ? 'text-[#855B09]' : 'text-[#2C1D07]'
                          }`}>
                            {track.titleAmharic}
                          </h4>
                          <p className="text-[11px] text-[#6B7280] truncate">
                            {track.titleEnglish}
                          </p>
                        </div>
                      </div>

                      {/* Column 3: Singer / Choir */}
                      <div className="col-span-3 truncate">
                        <span className="font-semibold text-[#855B09] hover:underline">
                          {track.singer}
                        </span>
                      </div>

                      {/* Column 4: Album / Occasion */}
                      <div className="col-span-2 hidden md:block truncate text-[#6B7280]">
                        <span>{track.album || track.category}</span>
                      </div>

                      {/* Column 5: Like & Duration & More Options */}
                      <div className="col-span-3 md:col-span-1 flex items-center justify-end gap-3 text-right">
                        
                        {/* Interactive Like / Favorite Button */}
                        <button
                          onClick={(e) => toggleLike(track.id, track.titleAmharic, e)}
                          className="p-1 text-[#9CA3AF] hover:text-rose-500 transition-all transform active:scale-125 cursor-pointer"
                          title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart
                            className={`w-4 h-4 transition-all ${
                              isLiked
                                ? 'fill-rose-500 text-rose-500 scale-110'
                                : 'text-[#9CA3AF] group-hover:text-[#6B7280]'
                            }`}
                          />
                        </button>

                        {/* Duration */}
                        <span className="text-[11px] text-[#6B7280] font-mono">
                          {track.duration}
                        </span>

                        {/* Options Button */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenOptionsId(openOptionsId === track.id ? null : track.id);
                            }}
                            className="p-1 rounded-md text-[#9CA3AF] hover:text-[#2C1D07] hover:bg-[#E6DFD1]/50 transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {/* Dropdown Menu */}
                          {openOptionsId === track.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 bottom-full mb-2 w-48 rounded-2xl bg-white border border-[#E6DFD1] shadow-xl p-1.5 z-30 space-y-1 animate-scaleUp"
                            >
                              <button
                                onClick={() => {
                                  setActiveLyricsModal(track);
                                  setOpenOptionsId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#4A3B22] hover:bg-[#FAF8F3] hover:text-[#2C1D07] text-left"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#855B09]" />
                                <span>View Lyrics</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  toggleLike(track.id, track.titleAmharic, e);
                                  setOpenOptionsId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#4A3B22] hover:bg-[#FAF8F3] hover:text-[#2C1D07] text-left"
                              >
                                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-[#855B09]'}`} />
                                <span>{isLiked ? 'Remove from Liked' : 'Add to Liked'}</span>
                              </button>

                              <button
                                onClick={(e) => handleShare(track.id, track.titleEnglish, e)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#4A3B22] hover:bg-[#FAF8F3] hover:text-[#2C1D07] text-left"
                              >
                                {copiedId === track.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                    <span className="text-green-600">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Share2 className="w-3.5 h-3.5 text-[#855B09]" />
                                    <span>Share Track</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>

        </main>

      </div>

      {/* ═══════════════════════════════════════════
          3. SPOTIFY FLOATING BOTTOM PLAYER BAR (LIGHT MODE)
      ═══════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6DFD1] shadow-2xl px-4 md:px-8 py-3">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Track Dossier & Like */}
          <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
            <img
              src={currentTrack.albumArt || '/assets/images/mezmur_hero_album.jpg'}
              alt={currentTrack.titleEnglish}
              className="w-12 h-12 rounded-xl object-cover border border-[#E6DFD1] shrink-0 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs md:text-sm text-[#2C1D07] font-geez truncate">
                {currentTrack.titleAmharic}
              </h4>
              <p className="text-[11px] text-[#855B09] font-medium truncate">
                {currentTrack.singer}
              </p>
            </div>
            <button
              onClick={(e) => toggleLike(currentTrack.id, currentTrack.titleAmharic, e)}
              className="text-[#9CA3AF] hover:text-rose-500 transition-all p-1 transform active:scale-125 cursor-pointer"
              title={likedMap[currentTrack.id] ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 ${
                  likedMap[currentTrack.id]
                    ? 'fill-rose-500 text-rose-500 scale-110'
                    : 'text-[#9CA3AF]'
                }`}
              />
            </button>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
            
            {/* Button Controls */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`p-1 transition-colors ${
                  isShuffle ? 'text-[#855B09]' : 'text-[#9CA3AF] hover:text-[#2C1D07]'
                }`}
                title="Shuffle"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handlePrevTrack}
                className="text-[#4A3B22] hover:text-[#2C1D07] p-1 transition-colors"
                title="Previous"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={togglePlayPause}
                className="w-9 h-9 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#1A2C1C] flex items-center justify-center shadow-md transform hover:scale-105 transition-all cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="text-[#4A3B22] hover:text-[#2C1D07] p-1 transition-colors"
                title="Next"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`p-1 transition-colors ${
                  isRepeat ? 'text-[#855B09]' : 'text-[#9CA3AF] hover:text-[#2C1D07]'
                }`}
                title="Repeat"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Slider */}
            <div className="flex items-center gap-2.5 w-full max-w-md text-[10px] font-mono text-[#6B7280]">
              <span>{formatSecs(trackProgressSecs)}</span>
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  setTrackProgressSecs(Math.floor(ratio * currentTrack.durationSecs));
                }}
                className="flex-1 h-1.5 bg-[#E6DFD1] rounded-full overflow-hidden cursor-pointer relative group"
              >
                <div
                  className="h-full bg-[#855B09] group-hover:bg-[#C8A84B] rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (trackProgressSecs / currentTrack.durationSecs) * 100)}%`,
                  }}
                />
              </div>
              <span>{currentTrack.duration}</span>
            </div>

          </div>

          {/* Right: Volume & Lyrics Button */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
            <button
              onClick={() => setActiveLyricsModal(currentTrack)}
              className="px-3 py-1 rounded-lg border border-[#E6DFD1] hover:bg-[#FAF8F3] text-[11px] font-bold text-[#855B09] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>Lyrics</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#6B7280] hover:text-[#2C1D07] cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#855B09]" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 h-1.5 accent-[#855B09] bg-[#E6DFD1] rounded-lg cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          4. FLOATING FAVORITES TOAST NOTIFICATION
      ═══════════════════════════════════════════ */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#1A2C1C] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#C8A84B]/40 flex items-center gap-3 animate-fadeIn">
          <Heart className={`w-4 h-4 ${toastMessage.isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
          <span className="text-xs font-semibold">{toastMessage.text}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          5. LYRICS MODAL
      ═══════════════════════════════════════════ */}
      {activeLyricsModal && (
        <div
          onClick={() => setActiveLyricsModal(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] border-2 border-[#C8A84B] rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-start justify-between border-b border-[#E6DFD1] pb-4">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#855B09] mb-1">
                  MEZMUR LYRICS • የዝማሬ ግጥም
                </div>
                <h3 className="text-2xl font-black font-geez text-[#2C1D07]">
                  {activeLyricsModal.titleAmharic}
                </h3>
                <p className="text-xs text-[#855B09] font-medium">{activeLyricsModal.titleEnglish}</p>
              </div>
              
              <button
                onClick={() => setActiveLyricsModal(null)}
                className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#E6DFD1] text-[#6B7280] hover:text-[#2C1D07] flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-[#FAF8F3] p-1 rounded-xl border border-[#E6DFD1] w-fit">
              <button
                onClick={() => setLyricsLang('am')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  lyricsLang === 'am'
                    ? 'bg-[#855B09] text-white shadow-xs'
                    : 'text-[#4A3B22] hover:text-[#2C1D07]'
                }`}
              >
                አማርኛ (Amharic)
              </button>
              <button
                onClick={() => setLyricsLang('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  lyricsLang === 'en'
                    ? 'bg-[#855B09] text-white shadow-xs'
                    : 'text-[#4A3B22] hover:text-[#2C1D07]'
                }`}
              >
                English Translation
              </button>
            </div>

            {/* Lyrics Verse Lines */}
            <div className="space-y-3 py-2 bg-white p-6 rounded-2xl border border-[#E6DFD1]">
              {lyricsLang === 'am' ? (
                activeLyricsModal.lyricsAmharic.map((line, i) => (
                  <p key={i} className="text-base md:text-lg font-geez text-[#2C1D07] leading-relaxed">
                    {line}
                  </p>
                ))
              ) : (
                (activeLyricsModal.lyricsEnglish || ['English lyrics are being prepared.']).map((line, i) => (
                  <p key={i} className="text-sm md:text-base font-serif text-[#374151] leading-relaxed italic">
                    {line}
                  </p>
                ))
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveLyricsModal(null)}
                className="px-6 py-2 rounded-xl bg-[#855B09] text-white font-bold text-xs hover:bg-[#6D4A07] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
