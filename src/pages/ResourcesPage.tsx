import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../components/layout/LanguageContext';
import { MOCK_CALENDAR_EVENTS, UPCOMING_FEASTS } from '../data/mockCalendar';
import { DIGITAL_CHANT_SERVICES } from '../data/mockChants';
import type { ChantSection, ChantVerse } from '../data/mockChants';
import { TODAY_LITURGY, CANONICAL_FASTS, MOCK_SERMONS } from '../data/mockResources';
import { MezmurView } from '../components/resources/MezmurView';
import type { SermonItem } from '../data/mockResources';
import {
  Calendar as CalendarIcon,
  Book,
  Maximize2,
  Minimize2,
  Download,
  Play,
  Pause,
  Volume2,
  Moon,
  BookOpen,
  ArrowRight,
  Clock,
  BookMarked,
  Mic2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  Shield,
  Bell,
  Printer,
  Type,
  Eye,
  Search,
  FileText,
  Headphones,
  User,
  Share2,
  Check,
  Award,
  Music,
  SlidersHorizontal,
  ListMusic,
  Bookmark,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';

type ResourceSubTab = 'hub' | 'calendar' | 'fasting' | 'sermons' | 'mezmur' | 'chant-stand';

export const ResourcesView: React.FC = () => {
  const { activeView, setActiveTrackId, language } = useLanguage();

  const [subTab, setSubTab] = useState<ResourceSubTab>('hub');
  const [selectedChantId, setSelectedChantId] = useState<string>('sunday-qidase');
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);
  const [fontSizePx, setFontSizePx] = useState<number>(28);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [chantLangMode, setChantLangMode] = useState<'geez-only' | 'bilingual' | 'trilingual'>('bilingual');
  const [chantTheme, setChantTheme] = useState<'parchment' | 'dark' | 'white'>('parchment');
  const [isChantAudioPlaying, setIsChantAudioPlaying] = useState<boolean>(false);
  const [chantAudioProgress, setChantAudioProgress] = useState<number>(0);
  const chantAudioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [calMonth, setCalMonth] = useState<number>(0);
  const [selectedCalDate, setSelectedCalDate] = useState<string>('2026-08-12');
  const [showDayModal, setShowDayModal] = useState<boolean>(false);
  const [selectedFastId, setSelectedFastId] = useState<string>('abiy-tsom');
  const [activeSermonModal, setActiveSermonModal] = useState<SermonItem | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<SermonItem | null>(null);
  const [sermonSearchQuery, setSermonSearchQuery] = useState<string>('');
  const [sermonCategoryPill, setSermonCategoryPill] = useState<string>('All');
  const [sermonSortBy, setSermonSortBy] = useState<'Newest' | 'Most Popular' | 'Oldest'>('Newest');
  const [savedSermons, setSavedSermons] = useState<string[]>([]);
  const [sermonTranscriptLang, setSermonTranscriptLang] = useState<'am' | 'en'>('am');
  const [sermonShareToast, setSermonShareToast] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [remindedFeasts, setRemindedFeasts] = useState<number[]>([]);

  const activeService = DIGITAL_CHANT_SERVICES[selectedChantId] || DIGITAL_CHANT_SERVICES['sunday-qidase'];
  const activeSection = activeService.sections[selectedSectionIndex] || activeService.sections[0];
  const activeDayDetail = MOCK_CALENDAR_EVENTS[selectedCalDate] || MOCK_CALENDAR_EVENTS['2026-08-12'];
  const currentFast = CANONICAL_FASTS.find((f) => f.id === selectedFastId) || CANONICAL_FASTS[0];

  // Handle service audio playback
  useEffect(() => {
    if (isChantAudioPlaying) {
      setChantAudioProgress(0);
      if (chantAudioIntervalRef.current) clearInterval(chantAudioIntervalRef.current);
      chantAudioIntervalRef.current = setInterval(() => {
        setChantAudioProgress((prev) => {
          if (prev >= 100) {
            clearInterval(chantAudioIntervalRef.current!);
            setIsChantAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (chantAudioIntervalRef.current) clearInterval(chantAudioIntervalRef.current);
    }
    return () => {
      if (chantAudioIntervalRef.current) clearInterval(chantAudioIntervalRef.current);
    };
  }, [isChantAudioPlaying]);

  // Calendar month data
  const MONTHS = [
    { ethName: 'ነሐሴ (Nehase)', gregName: 'August 2026', ethNum: 2018, startOffset: 3, days: 30, datePrefix: '2026-08-', gregOffset: 6 },
    { ethName: 'መስከረም (Meskerem)', gregName: 'September 2026', ethNum: 2019, startOffset: 5, days: 30, datePrefix: '2026-09-', gregOffset: -9 },
  ];
  const currentMonth = MONTHS[calMonth];

  // Sync route with activeView
  useEffect(() => {
    if (activeView === 'resources/calendar') setSubTab('calendar');
    else if (activeView === 'resources/fasting') setSubTab('fasting');
    else if (activeView === 'resources/sermons') setSubTab('sermons');
    else if (activeView === 'resources/mezmur') setSubTab('mezmur');
    else if (activeView === 'resources/chant-stand') setSubTab('chant-stand');
    else if (activeView === 'resources' || activeView === 'orthodox-resources') {
      setSubTab('hub');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeView]);

  const exportICSCalendar = () => {
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//EOTC Digital Liturgical Calendar//EN\nBEGIN:VEVENT\nSUMMARY:Debre Tabor (Feast of Transfiguration) - EOTC\nDESCRIPTION:Holy Liturgy and Fasting Guidance\nDTSTART:20260812T060000Z\nDTEND:20260812T100000Z\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EOTC_Liturgical_Calendar_2026.ics';
    a.click();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fadeIn">



      {/* ═══════════════════════════════════════════
          VIEW 1: ORTHODOX RESOURCES MAIN HUB
      ═══════════════════════════════════════════ */}
      {subTab === 'hub' && (
        <div className="animate-fadeIn bg-[#FAF8F3] -mx-4 md:-mx-8 -mt-8 pb-12">

          {/* ── Split Hero: Left text / Right manuscript image ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
            {/* Left: Text */}
            <div className="bg-[#FAF8F3] px-8 md:px-14 py-12 md:py-16 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#C8A84B] uppercase tracking-widest">
                <span className="w-4 h-px bg-[#C8A84B]" />
                Orthodox Resources Hub
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#2C1D07] font-geez leading-tight">
                {language === 'en'
                  ? <><span>Rooted in Faith.</span><br /><span className="text-[#C8A84B]">Guided by Tradition.</span></>
                  : <><span>በእምነት ሥር.</span><br /><span className="text-[#C8A84B]">በወግ ተመርቷል።</span></>}
              </h1>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-md">
                {language === 'en'
                  ? 'Your center for the liturgical life of the Ethiopian Orthodox Tewahedo Church. Explore the calendar, fasting seasons, sermons, hymns and daily spiritual resources to grow in faith and walk in the light of Christ.'
                  : 'ጌጥ የሆነው ሥርዓተ ቅዳሴ፣ አቢይ ጾምና ሌሎች ሰባቱ ጾሞች፣ ስብከቶችና ሥርዓተ ቤተ ክርስቲያን ያጠቃለለ ምንጭ።'}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[#C8A84B] text-xl">✦</span>
                <span className="text-[#C8A84B] text-xl">✦</span>
                <span className="text-[#C8A84B] text-xl">✦</span>
              </div>
            </div>

            {/* Right: Manuscript Image */}
            <div className="relative overflow-hidden min-h-[300px] lg:min-h-[420px]">
              <img
                src="/manuscript_hero.jpg"
                alt="Ancient Ethiopian Orthodox Manuscript"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#FAF8F3]/20" />
            </div>
          </div>

          {/* ── EXPLORE BY CATEGORY row ── */}
          <div className="px-8 md:px-14 py-10 bg-white border-y border-[#E6DFD1]">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#855B09]">Explore by Category</span>
              <span className="flex-1 h-px bg-[#E6DFD1]" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                {
                  id: 'calendar' as ResourceSubTab,
                  icon: CalendarIcon,
                  titleEn: 'Liturgical Calendar',
                  titleAm: 'የቤተ ክርስቲያን ዘመን',
                  descEn: 'Follow the daily cycle of the Church. Feasts, commemorations and lectionary readings.',
                  descAm: 'የቤተ ክርስቲያንን የዕለት ዑደት ይከተሉ። ክብረ በዓላት፣ የቅዱሳን ቀናት እና ምንባባት።',
                  iconColor: '#1A2C1C',
                },
                {
                  id: 'fasting' as ResourceSubTab,
                  icon: Moon,
                  titleEn: 'Fasting Guide',
                  titleAm: 'ፆምና ጸሎት',
                  descEn: 'Understand the sacred fasts, their meaning, traditions and guidelines.',
                  descAm: 'ቅዱሱን ጾሞች ፣ ትርጉሙን፣ ወጉን እና ሥርዓቱን ይረዱ።',
                  iconColor: '#1D4ED8',
                },
                {
                  id: 'sermons' as ResourceSubTab,
                  icon: Mic2,
                  titleEn: 'Sermons',
                  titleAm: 'ስብከቶች',
                  descEn: 'Listen and reflect on inspiring teachings from bishops, priests and deacons.',
                  descAm: 'ከጳጳሳት፣ ካህናትና ዲያቆናት አነቃቂ ትምህርቶች ያዳምጡ።',
                  iconColor: '#7C3AED',
                },
                {
                  id: 'mezmur' as ResourceSubTab,
                  icon: Volume2,
                  titleEn: 'Mezmur & Hymns',
                  titleAm: 'መዝሙራት',
                  descEn: 'Sacred hymns of praise, devotion and repentance from our rich spiritual heritage.',
                  descAm: 'ከሃብታማ ክርስቲያናዊ ቅርሳችን የሚወጡ ቅዱሳን ዝማሬዎች።',
                  iconColor: '#C8A84B',
                },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSubTab(cat.id)}
                    className="text-left group space-y-3"
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                      style={{ background: cat.iconColor + '12', border: `1.5px solid ${cat.iconColor}25` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cat.iconColor }} />
                    </div>
                    <h3 className="text-sm font-black text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                      {language === 'en' ? cat.titleEn : cat.titleAm}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {language === 'en' ? cat.descEn : cat.descAm}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold pt-1" style={{ color: cat.iconColor }}>
                      <span>Discover</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── 3-Column Bottom: Today in Church / Lectionary / Upcoming Feasts ── */}
          <div className="px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Col 1: TODAY IN THE CHURCH (dark green panel) */}
            <div className="bg-gradient-to-br from-[#1A2C1C] to-[#0D1A0F] p-6 rounded-2xl border border-[#C8A84B]/20 text-white space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8A84B' fill-rule='evenodd'%3E%3Crect x='27' y='0' width='6' height='60'/%3E%3Crect x='0' y='27' width='60' height='6'/%3E%3C/g%3E%3C/svg%3E")`
              }} />              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-px bg-[#C8A84B]" />
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#C8A84B]">Today in the Church</span>
                </div>

                {/* Saint icon + feast */}
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#C8A84B]/20 border border-[#C8A84B]/30 flex items-center justify-center shrink-0 text-2xl">
                    ✝
                  </div>
                  <div>
                    <p className="text-[10px] text-[#C8A84B] font-bold">{TODAY_LITURGY.ethiopianDate}</p>
                    <h3 className="text-sm font-black text-white font-geez leading-snug mt-0.5">
                      {language === 'en' ? TODAY_LITURGY.feastNameEnglish : TODAY_LITURGY.feastNameAmharic}
                    </h3>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{TODAY_LITURGY.gregorianDate}</p>
                  </div>
                </div>

                {/* Stat pills */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/8 border border-white/10 rounded-lg px-2 py-2 space-y-0.5">
                    <p className="text-[8px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Fast Day</p>
                    <p className="text-[11px] font-bold text-white">{TODAY_LITURGY.isFast ? `Yes (${TODAY_LITURGY.fastNameAmharic})` : 'No Fast'}</p>
                  </div>
                  <div className="bg-white/8 border border-white/10 rounded-lg px-2 py-2 space-y-0.5">
                    <p className="text-[8px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Mode (Degua)</p>
                    <p className="text-[11px] font-bold text-white">Ezil</p>
                  </div>
                  <div className="bg-white/8 border border-white/10 rounded-lg px-2 py-2 space-y-0.5">
                    <p className="text-[8px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Reading</p>
                    <p className="text-[11px] font-bold text-white font-geez truncate">{TODAY_LITURGY.readings.epistle.verseEnglish}</p>
                  </div>
                  <div className="bg-white/8 border border-white/10 rounded-lg px-2 py-2 space-y-0.5">
                    <p className="text-[8px] font-extrabold uppercase tracking-wider text-[#94A3B8]">Gospel</p>
                    <p className="text-[11px] font-bold text-white font-geez truncate">{TODAY_LITURGY.readings.gospel.verseEnglish}</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setSubTab('calendar')}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] py-2 rounded-lg text-[10px] font-bold transition-all"
                  >
                    <CalendarIcon className="w-3 h-3" />
                    View Full Calendar
                  </button>
                  <button
                    onClick={() => setSubTab('calendar')}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-[10px] font-bold border border-white/20 transition-all"
                  >
                    <BookOpen className="w-3 h-3" />
                    See Today's Readings
                  </button>
                </div>
              </div>
            </div>

            {/* Col 2: TODAY'S LECTIONARY READINGS */}
            <div className="bg-white rounded-2xl border border-[#E6DFD1] p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E6DFD1] pb-3">
                <span className="w-3 h-px bg-[#855B09]" />
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#855B09]">Today's Lectionary Readings</span>
              </div>

              {/* Epistle */}
              <div onClick={() => setSubTab('calendar')} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] cursor-pointer transition-colors group border border-transparent hover:border-[#E6DFD1]">
                <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] border border-[#86EFAC] flex items-center justify-center shrink-0">
                  <BookMarked className="w-3.5 h-3.5 text-[#15803D]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#855B09]">Epistle · {TODAY_LITURGY.readings.epistle.verseEnglish}</p>
                  <p className="text-xs font-black text-[#2C1D07] font-geez truncate mt-0.5">{TODAY_LITURGY.readings.epistle.textGeez}</p>
                  <p className="text-[10px] text-[#6B7280] italic truncate">"{TODAY_LITURGY.readings.epistle.textEnglish}"</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#C8A84B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Gospel */}
              <div onClick={() => setSubTab('calendar')} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] cursor-pointer transition-colors group border border-transparent hover:border-[#E6DFD1]">
                <div className="w-8 h-8 rounded-lg bg-[#FFF5DB] border border-[#C8A84B]/40 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-[#855B09]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#855B09]">Gospel · {TODAY_LITURGY.readings.gospel.verseEnglish}</p>
                  <p className="text-xs font-black text-[#2C1D07] font-geez truncate mt-0.5">{TODAY_LITURGY.readings.gospel.textGeez}</p>
                  <p className="text-[10px] text-[#6B7280] italic truncate">"{TODAY_LITURGY.readings.gospel.textEnglish}"</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#C8A84B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Memory Verse */}
              <div onClick={() => setSubTab('calendar')} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] cursor-pointer transition-colors group border border-transparent hover:border-[#E6DFD1]">
                <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center shrink-0">
                  <Star className="w-3.5 h-3.5 text-[#7C3AED]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#7C3AED]">Memory Verse · {TODAY_LITURGY.readings.psalm.verseEnglish}</p>
                  <p className="text-xs font-black text-[#2C1D07] font-geez truncate mt-0.5">{TODAY_LITURGY.readings.psalm.textGeez}</p>
                  <p className="text-[10px] text-[#6B7280] italic truncate">"{TODAY_LITURGY.readings.psalm.textEnglish}"</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#C8A84B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <button onClick={() => setSubTab('calendar')} className="w-full text-center text-xs text-[#855B09] font-bold hover:text-[#2C1D07] transition-colors pt-1">
                View All Readings →
              </button>
            </div>

            {/* Col 3: UPCOMING FEASTS */}
            <div className="bg-white rounded-2xl border border-[#E6DFD1] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-px bg-[#855B09]" />
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#855B09]">Upcoming Feasts</span>
                </div>
                <button onClick={() => setSubTab('calendar')} className="text-[10px] font-bold text-[#855B09] hover:text-[#2C1D07] flex items-center gap-0.5 transition-colors">
                  View Calendar <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1">
                {UPCOMING_FEASTS.slice(0, 4).map((feast) => {
                  const dateStr = feast.dateGreg.split(',')[0];
                  const parts = dateStr.trim().split(' ');
                  const month = parts[0]?.slice(0, 3).toUpperCase() ?? '';
                  const day = parts[1] ?? '';
                  return (
                    <div
                      key={feast.id}
                      onClick={() => setSubTab('calendar')}
                      className="flex items-center gap-3 py-2.5 border-b border-[#F5F0E8] last:border-0 group cursor-pointer hover:bg-[#FAF8F3] rounded-lg px-1 transition-colors"
                    >
                      <div className="w-11 shrink-0 text-center">
                        <p className="text-[8px] font-extrabold uppercase tracking-widest text-[#855B09]">{month}</p>
                        <p className="text-xl font-black text-[#2C1D07] leading-none">{day}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-[#2C1D07] font-geez truncate group-hover:text-[#855B09] transition-colors">
                          {language === 'en' ? feast.nameEnglish : feast.nameAmharic}
                        </p>
                        <p className="text-[10px] text-[#9CA3AF] truncate">{feast.dateEth} E.C. • {feast.category}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C8A84B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>

              <button onClick={() => setSubTab('calendar')} className="w-full text-center text-xs text-[#855B09] font-bold hover:text-[#2C1D07] transition-colors">
                View All Feasts →
              </button>
            </div>

          </div>

        </div>
      )}


      {/* ═══════════════════════════════════════════
          VIEW 2: MEZMUR & HYMNS (FULL)
      ═══════════════════════════════════════════ */}
      {subTab === 'mezmur' && (
        <MezmurView onBackToHub={() => setSubTab('hub')} />
      )}

      {/* ═══════════════════════════════════════════
          VIEW 3: LITURGICAL CALENDAR (FULL)
      ═══════════════════════════════════════════ */}
      {subTab === 'calendar' && (
        <div className="space-y-6 animate-fadeIn">

          {/* Calendar Header */}
          <div className="bg-gradient-to-br from-[#1A2C1C] to-[#0D1A0F] p-6 md:p-8 rounded-3xl text-white border border-[#C8A84B]/30 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <button onClick={() => setSubTab('hub')} className="inline-flex items-center gap-1 text-xs text-[#C8A84B] font-bold hover:text-white mb-1 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Back to Resources Hub' : 'ወደ ማዕከሉ ተመለስ'}</span>
                </button>
                <div className="inline-flex items-center gap-2 bg-[#C8A84B]/20 border border-[#C8A84B]/50 text-[#C8A84B] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  <CalendarIcon className="w-3 h-3" />
                  <span>Liturgical Calendar • የቤተ ክርስቲያን ዘመን ቍጥር</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black font-geez">
                  {currentMonth.ethName}
                </h2>
                <p className="text-sm text-[#94A3B8]">{currentMonth.gregName} &nbsp;•&nbsp; E.C. {currentMonth.ethNum}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Month Navigation */}
                <button
                  onClick={() => setCalMonth(Math.max(0, calMonth - 1))}
                  disabled={calMonth === 0}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCalMonth(Math.min(1, calMonth + 1))}
                  disabled={calMonth === 1}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={exportICSCalendar}
                  className="flex items-center gap-2 bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ICS</span>
                </button>
              </div>
            </div>
              <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-white/10 text-[11px]">
              {[
                { dot: 'bg-[#C8A84B]', label: 'Major Feast (ዓቢይ ወቅት)' },
                { dot: 'bg-[#800020]', label: 'Lord\'s Feast (የጌታ ዓቢይ)' },
                { dot: 'bg-[#006B3C]', label: 'Fasting Day (ፆም)' },
                { dot: 'bg-[#1D4ED8]', label: 'Commemoration (ዝክረ ቅዱሳን)' },
                { dot: 'bg-[#374151]', label: 'Ordinary Day (ተራ ቀን)' },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-[#94A3B8] font-semibold">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${l.dot}`} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-[#E6DFD1] shadow-sm">
            {/* Day-of-week Headers */}
            <div className="grid grid-cols-7 gap-1.5 mb-2">
              {[
                { eth: 'እሑድ', greg: 'Sun' },
                { eth: 'ሰኞ', greg: 'Mon' },
                { eth: 'ማክሰ', greg: 'Tue' },
                { eth: 'ረቡዕ', greg: 'Wed' },
                { eth: 'ሐሙስ', greg: 'Thu' },
                { eth: 'ዓርብ', greg: 'Fri' },
                { eth: 'ቅዳሜ', greg: 'Sat' },
              ].map((d) => (
                <div key={d.greg} className="py-2 text-center">
                  <p className="text-[10px] font-extrabold text-[#855B09] font-geez">{d.eth}</p>
                  <p className="text-[9px] text-[#9CA3AF]">{d.greg}</p>
                </div>
              ))}
            </div>

            {/* Empty offset cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: currentMonth.startOffset }, (_, i) => (
                <div key={`empty-${i}`} className="min-h-[70px] rounded-xl" />
              ))}

              {/* Day Cells */}
              {Array.from({ length: currentMonth.days }, (_, i) => {
                const dayNum = i + 1;
                const gregDay = calMonth === 0 ? dayNum + 6 : dayNum - 9;

                // Feast/fast logic for Nehase (Aug)
                const isDebreTabor  = calMonth === 0 && dayNum === 6;
                const isFilseta     = calMonth === 0 && dayNum === 16;
                const isFilsetaFast = calMonth === 0 && dayNum >= 1 && dayNum <= 16;
                const isEnkutatash  = calMonth === 1 && dayNum === 1;
                const isMeskel      = calMonth === 1 && dayNum === 17;
                const isWednesday   = (dayNum + currentMonth.startOffset) % 7 === 3;
                const isFriday      = (dayNum + currentMonth.startOffset) % 7 === 5;
                const isWeeklyFast  = isWednesday || isFriday;

                const calKey = calMonth === 0
                  ? (isDebreTabor ? '2026-08-12' : isFilseta ? '2026-08-16' : dayNum === 7 ? '2026-08-13' : null)
                  : (isEnkutatash ? '2026-09-11' : isMeskel ? '2026-09-27' : null);

                let cellClass = 'bg-white border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-sm';
                if (isDebreTabor || isMeskel) cellClass = 'bg-[#FFF5DB] border-[#C8A84B] ring-2 ring-[#C8A84B]/40 shadow-md';
                else if (isFilseta) cellClass = 'bg-[#FDF2F2] border-[#FECACA] ring-2 ring-[#800020]/30 shadow-md';
                else if (isEnkutatash) cellClass = 'bg-[#F0FDF4] border-[#86EFAC] ring-2 ring-[#006B3C]/30 shadow-md';
                else if (isFilsetaFast || isWeeklyFast) cellClass = 'bg-[#F2FBF5] border-[#A3E6C2] hover:border-[#006B3C]';

                return (
                  <div
                    key={dayNum}
                    onClick={() => {
                      if (calKey) { setSelectedCalDate(calKey); setShowDayModal(true); }
                    }}
                    className={`min-h-[70px] p-2 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      calKey ? 'cursor-pointer' : 'cursor-default'
                    } ${cellClass}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] md:text-[11px] font-bold font-geez ${
                        isDebreTabor || isFilseta || isEnkutatash || isMeskel ? 'text-[#855B09]' : 'text-[#2C1D07]'
                      }`}>
                        {calMonth === 0 ? 'ነሐሴ' : 'መስከ'} {dayNum}
                      </span>
                      {gregDay > 0 && gregDay <= 31 && (
                        <span className="text-[9px] text-[#9CA3AF]">
                          {calMonth === 0 ? 'Aug' : 'Sep'} {gregDay}
                        </span>
                      )}
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {isDebreTabor && <span className="block bg-[#C8A84B] text-[#1A2C1C] text-[8px] md:text-[9px] font-black px-1 py-0.5 rounded truncate text-center">ደብረ ታቦር</span>}
                      {isFilseta && <span className="block bg-[#800020] text-white text-[8px] md:text-[9px] font-black px-1 py-0.5 rounded truncate text-center">ፍልሰታ</span>}
                      {isEnkutatash && <span className="block bg-[#006B3C] text-white text-[8px] md:text-[9px] font-black px-1 py-0.5 rounded truncate text-center">እንቁጣጣሽ</span>}
                      {isMeskel && <span className="block bg-[#C8A84B] text-[#1A2C1C] text-[8px] md:text-[9px] font-black px-1 py-0.5 rounded truncate text-center">መስቀል</span>}
                      {isFilsetaFast && !isDebreTabor && !isFilseta && <span className="block text-[8px] text-[#006B3C] font-bold">ፆመ ፍልሰ</span>}
                      {isWeeklyFast && !isFilsetaFast && <span className="block text-[8px] text-[#1D4ED8] font-bold">{isWednesday ? 'ሮብ' : 'ዓርብ'}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Feasts + Fasting Quick Link */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Upcoming Feasts */}
            <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-4">
                <h3 className="text-base font-black text-[#2C1D07] font-geez flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#C8A84B]" />
                  {language === 'en' ? 'Upcoming Feasts' : 'መጪ ወቅቶች'}
                </h3>
                <span className="text-[10px] text-[#6B7280] font-bold">{UPCOMING_FEASTS.length} feasts</span>
              </div>
              <div className="space-y-3">
                {UPCOMING_FEASTS.map((feast) => (
                  <div
                    key={feast.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {/* Countdown bubble */}
                      <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm ${
                        feast.daysLeft === 0 ? 'bg-[#C8A84B] text-[#1A2C1C]' : 'bg-[#1A2C1C] text-[#C8A84B]'
                      }`}>
                        <span className="text-[11px] font-black leading-none">{feast.daysLeft === 0 ? 'Today' : feast.daysLeft}</span>
                        {feast.daysLeft !== 0 && <span className="text-[8px] font-bold opacity-70">days</span>}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2C1D07] font-geez">{feast.nameAmharic}</p>
                        <p className="text-[10px] text-[#6B7280]">{feast.nameEnglish}</p>
                        <p className="text-[9px] text-[#855B09] font-semibold mt-0.5">{feast.dateEth} · {feast.dateGreg}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[9px] font-bold bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40 px-2 py-0.5 rounded-full">
                        {feast.category}
                      </span>
                      <button
                        onClick={() => setRemindedFeasts((prev) => prev.includes(feast.id) ? prev.filter((id) => id !== feast.id) : [...prev, feast.id])}
                        className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                          remindedFeasts.includes(feast.id)
                            ? 'bg-[#006B3C] text-white'
                            : 'bg-white border border-[#E6DFD1] text-[#6B7280] hover:border-[#C8A84B] hover:text-[#855B09]'
                        }`}
                      >
                        <Bell className="w-3 h-3" />
                        <span>{remindedFeasts.includes(feast.id) ? 'Reminded' : 'Remind'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fasting Quick Link */}
            <div className="space-y-4">
              {/* Today's Fast Status */}
              <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] p-6 rounded-3xl text-white space-y-4 border border-[#3B82F6]/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-[#93C5FD]" />
                  <h3 className="text-sm font-extrabold text-[#93C5FD] uppercase tracking-wider">
                    {language === 'en' ? "Today's Fast Status" : 'የዛሬ ጾም ሁኔታ'}
                  </h3>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                  <p className="text-base font-black font-geez">{TODAY_LITURGY.fastNameAmharic}</p>
                  <p className="text-xs text-[#94A3B8]">{TODAY_LITURGY.fastStatusText}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <CheckCircle className="w-4 h-4 text-[#4ADE80]" />
                    <span className="text-xs text-[#D1FAE5] font-semibold">Strict Vegan Fast until 3:00 PM</span>
                  </div>
                </div>
                <button
                  onClick={() => setSubTab('fasting')}
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Full Fasting Guide' : 'ሙሉ የጾም መምሪያ'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* ICS Export Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF5DB] border border-[#C8A84B]/50 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-[#855B09]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#2C1D07]">
                      {language === 'en' ? 'Add to Your Calendar' : 'ወደ ቀን መቁጠሪያዎ ጨምሩ'}
                    </h4>
                    <p className="text-[10px] text-[#6B7280]">Google Calendar · Apple Calendar · Outlook</p>
                  </div>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Download the full EOTC liturgical year as a standard .ICS file — all major feasts, fast seasons, and saint commemorations.
                </p>
                <button
                  onClick={exportICSCalendar}
                  className="w-full bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download EOTC Calendar .ICS</span>
                </button>
              </div>
            </div>
          </div>

          {/* Day Detail Modal */}
          {showDayModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#FAF8F3] border-4 border-[#C8A84B] rounded-3xl max-w-lg w-full p-7 space-y-5 text-[#2C1D07] shadow-2xl relative max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="border-b border-[#E6DFD1] pb-4 pr-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B] px-2.5 py-0.5 rounded-full">{activeDayDetail.ethiopianDate}</span>
                    <span className="text-[10px] text-[#9CA3AF]">{activeDayDetail.gregorianDate}</span>
                  </div>
                  <h3 className="text-xl font-black font-geez text-[#800020] leading-tight">{activeDayDetail.feastNameAmharic || activeDayDetail.saintOfDayAmharic}</h3>
                  {activeDayDetail.feastNameEnglish && <p className="text-sm text-[#6B7280] mt-1">{activeDayDetail.feastNameEnglish}</p>}
                </div>
                <button onClick={() => setShowDayModal(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-[#6B7280] hover:text-[#2C1D07] hover:bg-[#E6DFD1] font-bold transition-colors">✕</button>

                <div className="space-y-3">
                  {/* Saint of the Day */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-sm space-y-2">
                    <span className="text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3" /> Saint of the Day
                    </span>
                    <p className="font-geez font-bold text-[#2C1D07] text-base">{activeDayDetail.saintOfDayAmharic}</p>
                    <p className="text-xs text-[#6B7280]">{activeDayDetail.saintOfDayEnglish}</p>
                    <p className="text-xs text-[#4A3B22] leading-relaxed border-t border-[#E6DFD1] pt-2 mt-2">{activeDayDetail.saintBioText}</p>
                  </div>

                  {/* Fasting */}
                  <div className={`p-4 rounded-2xl border shadow-sm space-y-1.5 ${
                    activeDayDetail.isFast ? 'bg-[#F0FDF4] border-[#86EFAC]' : 'bg-[#FAF8F3] border-[#E6DFD1]'
                  }`}>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${ activeDayDetail.isFast ? 'text-[#15803D]' : 'text-[#855B09]' }`}>
                      <Moon className="w-3 h-3" />
                      {activeDayDetail.isFast ? 'Fasting Day' : 'Non-Fasting'} — {activeDayDetail.fastName || 'Ordinary Day'}
                    </span>
                    <p className={`text-xs font-semibold leading-relaxed ${ activeDayDetail.isFast ? 'text-[#065F46]' : 'text-[#6B7280]' }`}>
                      {activeDayDetail.fastingGuidance}
                    </p>
                  </div>

                  {/* Daily Readings */}
                  <div className="bg-[#FFF5DB] p-4 rounded-2xl border border-[#C8A84B]/40 space-y-2.5">
                    <span className="text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Daily Readings
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-base leading-none mt-0.5">📖</span>
                        <div>
                          <span className="text-[9px] font-extrabold text-[#855B09] uppercase">Psalm:</span>
                          <p className="text-xs text-[#2C1D07] font-semibold">{activeDayDetail.psalmReading}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-base leading-none mt-0.5">✉️</span>
                        <div>
                          <span className="text-[9px] font-extrabold text-[#855B09] uppercase">Epistle:</span>
                          <p className="text-xs text-[#2C1D07] font-semibold">{activeDayDetail.epistleReading}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-base leading-none mt-0.5">✝️</span>
                        <div>
                          <span className="text-[9px] font-extrabold text-[#855B09] uppercase">Gospel:</span>
                          <p className="text-xs text-[#2C1D07] font-semibold">{activeDayDetail.gospelReading}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setShowDayModal(false)} className="flex-1 bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] py-2.5 rounded-xl text-xs font-bold shadow-md transition-all">Close</button>
                  <button onClick={() => { setSubTab('fasting'); setShowDayModal(false); }} className="flex-1 bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] text-[#2C1D07] py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all">
                    Fasting Guide →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          VIEW 4: DIGITAL CHANT STAND (FULL)
      ═══════════════════════════════════════════ */}
      {subTab === 'chant-stand' && (
        <div className={`space-y-6 animate-fadeIn ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto p-4 md:p-8 ' + (chantTheme === 'dark' ? 'bg-[#0A0F0D]' : chantTheme === 'white' ? 'bg-[#FFFFFF]' : 'bg-[#F4EFE6]') : ''}`}>
          
          {/* Top Control Bar & Service Selector */}
          <div className={`rounded-3xl border transition-all shadow-sm ${
            chantTheme === 'dark'
              ? 'bg-[#131E18] border-[#C8A84B]/30 text-white'
              : chantTheme === 'white'
              ? 'bg-white border-[#E6DFD1] text-[#2C1D07]'
              : 'bg-[#FFFDF9] border-[#E6DFD1] text-[#2C1D07]'
          } p-6 md:p-8 space-y-6`}>
            
            {/* Header & Back Navigation */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#E6DFD1]/50 pb-5">
              <div>
                {!isFullscreen && (
                  <button onClick={() => setSubTab('hub')} className="inline-flex items-center gap-1 text-xs text-[#855B09] font-bold hover:text-[#2C1D07] mb-2 transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Back to Resources Hub' : 'ወደ ማዕከሉ ተመለስ'}</span>
                  </button>
                )}
                <div className="inline-flex items-center gap-2 bg-[#FFF5DB] border border-[#C8A84B] px-3 py-1 rounded-full text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider mb-2">
                  <Book className="w-3.5 h-3.5" />
                  <span>ዲጂታል ዜማ መቆሚያ • Digital Chant Stand for Debteras</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black font-geez leading-snug">
                  {language === 'en' ? activeService.titleEnglish : activeService.titleAmharic}
                </h2>
                <p className="text-xs text-[#855B09] font-geez mt-0.5">{activeService.titleGeez} — {activeService.subtitle}</p>
              </div>

              {/* Quick Actions (Audio / Fullscreen / Print) */}
              <div className="flex flex-wrap items-center gap-2.5">
                {activeService.audioUrl && (
                  <button
                    onClick={() => setIsChantAudioPlaying(!isChantAudioPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                      isChantAudioPlaying
                        ? 'bg-[#800020] text-white animate-pulse'
                        : 'bg-[#C8A84B] text-[#1A2C1C] hover:bg-[#B8973A]'
                    }`}
                  >
                    {isChantAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isChantAudioPlaying ? 'Chant Audio Playing...' : 'Play Zema Audio'}</span>
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#E6DFD1] hover:bg-[#FAF8F3] transition-all shadow-sm"
                  title="Print or Save PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isFullscreen
                      ? 'bg-[#800020] text-white'
                      : 'bg-[#1A2C1C] text-[#C8A84B] hover:bg-[#0D1A0F]'
                  }`}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span>{isFullscreen ? 'Exit Stand View' : 'Debtera Stand Mode'}</span>
                </button>
              </div>
            </div>

            {/* Service Selector: 5 Available Services */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09]">
                {language === 'en' ? 'Select Liturgical Service (ሥርዓት ይምረጡ):' : 'ሥርዓተ ጸሎት ይምረጡ:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {Object.values(DIGITAL_CHANT_SERVICES).map((srv) => {
                  const isSelected = selectedChantId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => {
                        setSelectedChantId(srv.id);
                        setSelectedSectionIndex(0);
                        setIsChantAudioPlaying(false);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all space-y-1 ${
                        isSelected
                          ? 'bg-[#1A2C1C] border-[#C8A84B] text-white shadow-md ring-2 ring-[#C8A84B]/50'
                          : 'bg-white/60 hover:bg-white border-[#E6DFD1] hover:border-[#C8A84B]'
                      }`}
                    >
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full inline-block ${
                        isSelected ? 'bg-[#C8A84B] text-[#1A2C1C]' : 'bg-[#FAF8F3] text-[#855B09] border border-[#E6DFD1]'
                      }`}>
                        {srv.category}
                      </span>
                      <p className="text-xs font-black font-geez truncate">{srv.titleAmharic}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-[#94A3B8]' : 'text-[#6B7280]'}`}>{srv.titleEnglish}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section Navigator Tabs */}
            <div className="space-y-2 pt-2 border-t border-[#E6DFD1]/50">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09]">
                {language === 'en' ? 'Section Navigator (ክፍሎች):' : 'የሥርዓቱ ክፍሎች:'}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {activeService.sections.map((sec: ChantSection, idx: number) => {
                  const isSecActive = selectedSectionIndex === idx;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSectionIndex(idx)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSecActive
                          ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm ring-1 ring-[#855B09]'
                          : 'bg-[#FAF8F3] text-[#6B7280] hover:text-[#2C1D07] hover:bg-white border border-[#E6DFD1]'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-geez">{language === 'en' ? sec.titleEnglish : sec.titleAmharic}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Control Bar (Font size, Language toggle, Stand Theme) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E6DFD1]/50 bg-[#FAF8F3]/50 p-3 rounded-2xl">
              
              {/* Font Size Adjusters */}
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-[#855B09]" />
                <span className="text-xs font-bold text-[#6B7280]">Font Size:</span>
                <button
                  onClick={() => setFontSizePx(Math.max(18, fontSizePx - 4))}
                  className="w-7 h-7 rounded-lg bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] text-sm font-black flex items-center justify-center shadow-sm"
                  title="Smaller"
                >
                  -
                </button>
                <span className="font-mono text-xs font-bold text-[#855B09] w-12 text-center">{fontSizePx}px</span>
                <button
                  onClick={() => setFontSizePx(Math.min(64, fontSizePx + 4))}
                  className="w-7 h-7 rounded-lg bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] text-sm font-black flex items-center justify-center shadow-sm"
                  title="Larger"
                >
                  +
                </button>

                {/* Font Size Presets */}
                <div className="hidden sm:flex items-center gap-1 ml-2">
                  {[24, 32, 42, 54].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSizePx(sz)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                        fontSizePx === sz ? 'bg-[#855B09] text-white' : 'bg-white border border-[#E6DFD1] text-[#6B7280]'
                      }`}
                    >
                      {sz === 24 ? 'Standard' : sz === 32 ? 'Medium' : sz === 42 ? 'Large' : 'Stand XL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Display Toggle */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E6DFD1]">
                <Eye className="w-3.5 h-3.5 text-[#855B09] ml-1.5" />
                {[
                  { id: 'geez-only', label: "Ge'ez Only (ግዕዝ ብቻ)" },
                  { id: 'bilingual', label: "Ge'ez + Amharic" },
                  { id: 'trilingual', label: "Trilingual" },
                ].map((langOpt) => (
                  <button
                    key={langOpt.id}
                    onClick={() => setChantLangMode(langOpt.id as any)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                      chantLangMode === langOpt.id
                        ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm'
                        : 'text-[#6B7280] hover:text-[#2C1D07]'
                    }`}
                  >
                    {langOpt.label}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E6DFD1]">
                {[
                  { id: 'parchment', label: '📜 Parchment', bg: '#FFFDF9' },
                  { id: 'dark', label: '🌙 Dark Stand', bg: '#131E18' },
                  { id: 'white', label: '☀️ White', bg: '#FFFFFF' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setChantTheme(th.id as any)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                      chantTheme === th.id
                        ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                        : 'text-[#6B7280] hover:text-[#2C1D07]'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Sync Player Bar (When active) */}
            {isChantAudioPlaying && activeService.audioUrl && (
              <div className="p-4 rounded-2xl bg-[#1A2C1C] border border-[#C8A84B] text-white space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#C8A84B] animate-bounce" />
                    <span className="font-bold font-geez text-[#C8A84B]">{activeService.titleAmharic} — Zema Recitation</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#94A3B8]">{activeService.audioDuration || 'Live Service'}</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C8A84B] rounded-full transition-all duration-1000" style={{ width: `${chantAudioProgress}%` }} />
                </div>
              </div>
            )}

          </div>

          {/* Large Chant Text Display Sheet (Debtera Stand View) */}
          <div
            className={`rounded-3xl border p-6 md:p-12 shadow-md space-y-10 min-h-[600px] transition-all ${
              chantTheme === 'dark'
                ? 'bg-[#0E1612] border-[#C8A84B]/30 text-[#E0E6E2]'
                : chantTheme === 'white'
                ? 'bg-white border-[#E6DFD1] text-[#2C1D07]'
                : 'bg-[#FFFDF7] border-[#E6DFD1] text-[#2C1D07]'
            }`}
          >
            {/* Section Banner Header */}
            <div className="text-center border-b border-[#E6DFD1]/60 pb-6 space-y-2">
              <span className="text-[11px] font-extrabold uppercase px-3 py-1 bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40 rounded-full">
                {activeService.titleAmharic} • ክፍል {selectedSectionIndex + 1}
              </span>
              <h3 className="text-2xl md:text-3xl font-black font-geez mt-2 text-[#800020]">
                {activeSection.titleGeez}
              </h3>
              <p className="text-sm font-bold text-[#855B09]">
                {activeSection.titleAmharic} — {activeSection.titleEnglish}
              </p>
              {activeSection.description && (
                <p className="text-xs text-[#6B7280] italic max-w-xl mx-auto">{activeSection.description}</p>
              )}
            </div>

            {/* Chant Verses Flow */}
            <div className="space-y-12 w-full">
              {activeSection.verses.map((verse: ChantVerse) => {
                // Role Badge Styling
                const roleColors: Record<string, { bg: string; text: string; border: string }> = {
                  Priest: { bg: '#FDF2F2', text: '#991B1B', border: '#FECACA' },
                  Deacon: { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
                  People: { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' },
                  Cantor: { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
                  Choir:  { bg: '#FAF5FF', text: '#6B21A8', border: '#E9D5FF' },
                };
                const rStyle = roleColors[verse.role || 'Cantor'] || roleColors.Cantor;

                return (
                  <div
                    key={verse.id}
                    className={`p-6 md:p-8 rounded-3xl border transition-all space-y-5 ${
                      chantTheme === 'dark'
                        ? 'bg-[#15221B] border-white/10 hover:border-[#C8A84B]/50'
                        : 'bg-white/90 border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm'
                    }`}
                  >
                    {/* Verse Metadata Line (Role + Zema Notation) */}
                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                      <div className="flex items-center gap-2.5">
                        {verse.role && (
                          <span
                            className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5"
                            style={{ background: rStyle.bg, color: rStyle.text, border: `1px solid ${rStyle.border}` }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {verse.roleGeez} • {verse.role}
                          </span>
                        )}
                        <span className="text-[11px] font-mono font-bold text-[#855B09]">
                          ቍጥር {verse.number}
                        </span>
                      </div>

                      {verse.zemaNotation && (
                        <span className="text-[10px] font-extrabold bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/50 px-2.5 py-0.5 rounded-full">
                          ዜማ፡ {verse.zemaNotation}
                        </span>
                      )}
                    </div>

                    {/* Ge'ez Primary Text (Large debtera font) */}
                    <p
                      className="font-geez font-black leading-loose text-center tracking-wide drop-shadow-sm select-text"
                      style={{
                        fontSize: `${fontSizePx}px`,
                        color: chantTheme === 'dark' ? '#F3E8CE' : '#2C1D07',
                        lineHeight: 1.8,
                      }}
                    >
                      {verse.geez}
                    </p>

                    {/* Amharic Translation (Shown in bilingual and trilingual modes) */}
                    {(chantLangMode === 'bilingual' || chantLangMode === 'trilingual') && (
                      <p
                        className="font-geez font-semibold text-center leading-relaxed"
                        style={{
                          fontSize: `${Math.max(14, fontSizePx * 0.55)}px`,
                          color: chantTheme === 'dark' ? '#93C5FD' : '#800020',
                        }}
                      >
                        {verse.amharic}
                      </p>
                    )}

                    {/* English Translation (Shown in trilingual mode) */}
                    {chantLangMode === 'trilingual' && (
                      <p
                        className="font-sans italic text-center leading-relaxed"
                        style={{
                          fontSize: `${Math.max(13, fontSizePx * 0.48)}px`,
                          color: chantTheme === 'dark' ? '#94A3B8' : '#4B5563',
                        }}
                      >
                        "{verse.english}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Next / Previous Section Navigation */}
            <div className="flex items-center justify-between border-t border-[#E6DFD1]/60 pt-6">
              <button
                onClick={() => setSelectedSectionIndex(Math.max(0, selectedSectionIndex - 1))}
                disabled={selectedSectionIndex === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#FAF8F3] border border-[#E6DFD1] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Section</span>
              </button>

              <span className="text-xs font-bold text-[#855B09]">
                Section {selectedSectionIndex + 1} of {activeService.sections.length}
              </span>

              <button
                onClick={() => setSelectedSectionIndex(Math.min(activeService.sections.length - 1, selectedSectionIndex + 1))}
                disabled={selectedSectionIndex === activeService.sections.length - 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <span>Next Section</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          VIEW 5: FASTING GUIDE (FULL) - CLEAN & CARDLESS
      ═══════════════════════════════════════════ */}
      {subTab === 'fasting' && (() => {
        const FAST_AVATARS: Record<string, string> = {
          'abiy-tsom': '/assets/images/crosses_sunset.jpg',
          'filseta': '/assets/images/st_mary_icon.png',
          'tsome-nebiyat': '/assets/images/liturgical_manuscript_featured.jpg',
          'tsome-hawaryat': '/assets/images/news_synod_bishops.jpg',
          'tsome-dihnet': '/assets/images/eotc_cross_watermark.png',
          'tsome-nineveh': '/assets/images/debre_damo.jpg',
          'tsome-gahad': '/assets/images/eotc_vigil_background.jpg',
        };

        const FAST_SHORT_SEASONS: Record<string, string> = {
          'abiy-tsom': 'Spring',
          'filseta': 'Nehase 1 - Nehase 16',
          'tsome-nebiyat': 'Hidar 15 - Tahsas 28',
          'tsome-hawaryat': 'Following Pentecost until Sene 5',
          'tsome-dihnet': 'Year-round',
          'tsome-nineveh': 'Two weeks before the Great Lent',
          'tsome-gahad': 'Eve of Genna & Timkat',
        };

        return (
          <div className="space-y-16 animate-fadeIn pb-16">
            
            {/* ── 1. HERO SECTION (DARK WARM ATMOSPHERE WITH SACRED MANUSCRIPT) ── */}
            <div className="relative -mx-4 md:-mx-8 -mt-8 bg-[#0D140E] text-white overflow-hidden rounded-b-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] items-center">
                
                {/* Left Column: Title and Sacred Introduction */}
                <div className="lg:col-span-7 px-8 md:px-14 py-12 md:py-16 space-y-5 z-10">
                  <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-[#C8A84B]">
                    ORTHODOX RESOURCES
                  </div>

                  <h1 className="text-3xl md:text-5xl font-black font-serif text-white tracking-tight leading-tight">
                    {language === 'en' ? 'EOTC Fasting Guide' : 'የኢ/ኦ/ተ/ቤተ ክርስቲያን የጾም መመሪያ'}
                  </h1>

                  {/* Diamond / Cross Ornament */}
                  <div className="flex items-center gap-2 text-[#C8A84B]">
                    <span className="text-xs">❖</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black font-geez text-[#C8A84B]">
                    {language === 'en' ? 'የጾም መመሪያ' : 'ሥርዓተ ጾም ወጸሎት — ሰባቱ ጾሞች'}
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-[#D1D5DB] leading-relaxed max-w-xl">
                    {language === 'en'
                      ? 'The Ethiopian Orthodox Tewahedo Church observes over 220 fasting days every year — the most extensive canonical fasting tradition in Christendom. Fasting is a sacred union of prayer, physical abstinence, repentance, and almsgiving.'
                      : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በዓመት ከ220 የሚበልጡ የጾም ቀናት አሏት። ጾም ከጸሎት፣ ከምጽዋትና ከስግደት ጋር ተጣምሮ ለእግዚአብሔር የሚቀርብ ቅዱስ መሥዋዕት ነው።'}
                  </p>
                </div>

                {/* Right Column: Hero Image with seamless dark fade */}
                <div className="lg:col-span-5 relative h-full min-h-[280px] lg:min-h-[380px] flex items-center justify-end overflow-hidden">
                  <img
                    src="/assets/images/fasting_hero_bg.jpg"
                    alt="Sacred Bible and Cross by Candlelight"
                    className="w-full h-full object-cover object-center lg:object-right"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0D140E] via-transparent to-transparent opacity-90 lg:opacity-80" />
                </div>

              </div>
            </div>

            {/* ── 2. TODAY'S FAST STATUS & ACTIVE FAST SEASON (CARDLESS DUAL COLUMN) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-2">
              
              {/* Left Column: Today's Status Details (Seamless, No Card) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Today is a Fasting Day */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-[#15803D] flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#15803D] block">
                      TODAY IS A FASTING DAY
                    </span>
                    <h3 className="text-base font-black font-geez text-[#2C1D07]">
                      {TODAY_LITURGY.fastNameAmharic} (Filseta Fast)
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Fast of the Holy Assumption of St. Mary (Filseta)
                    </p>
                  </div>
                </div>

                {/* 2. Abstinence Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF5DB] border border-[#C8A84B] text-[#855B09] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] block">
                      ABSTINENCE HOURS
                    </span>
                    <p className="text-xs text-[#4A3B22] leading-relaxed">
                      Strict fast (no food or water) until 3:00 PM (9:00 local time) or post-Qidase.
                    </p>
                  </div>
                </div>

                {/* 3. Dietary Rules */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-[#15803D] flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] block">
                      DIETARY RULES
                    </span>
                    <p className="text-xs text-[#4A3B22] leading-relaxed">
                      100% vegan plant-based diet. Strict prohibition of meat, poultry, fish, eggs, milk, cheese, and butter.
                    </p>
                  </div>
                </div>

                {/* 4. Calendar Link */}
                <div className="pt-2">
                  <button
                    onClick={() => setSubTab('calendar')}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#855B09] hover:text-[#2C1D07] transition-colors cursor-pointer"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>View in Liturgical Calendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Right Column: Active Fast Season Progress (Seamless, No Outer Card) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Header & Days Remaining */}
                <div className="flex items-start justify-between border-b border-[#E6DFD1] pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] block">
                      ACTIVE FAST SEASON
                    </span>
                    <h3 className="text-lg md:text-xl font-black font-geez text-[#2C1D07] mt-1">
                      ፆመ ፍልሰታ — Fast of the Dormition (Day 6 of 16)
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-3xl font-black text-[#855B09] font-mono leading-none block">10</span>
                    <span className="text-[9px] text-[#9CA3AF] font-bold uppercase tracking-wider">Days Remaining</span>
                  </div>
                </div>

                {/* Progress Bar and Dates */}
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs font-bold">
                    <div>
                      <span className="text-[#9CA3AF] text-[10px] block font-normal uppercase">Start</span>
                      <span className="text-[#855B09] font-geez">ነሐሴ ፩ (Aug 7)</span>
                    </div>
                    <div className="text-center self-end">
                      <span className="text-xs font-bold text-[#2C1D07]">37.5% Completed</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#9CA3AF] text-[10px] block font-normal uppercase">Feast</span>
                      <span className="text-[#800020] font-geez">ነሐሴ ፲፮ (Aug 22)</span>
                    </div>
                  </div>

                  <div className="h-2 bg-[#E6DFD1]/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1A2C1C] rounded-full transition-all duration-1000"
                      style={{ width: '37.5%' }}
                    />
                  </div>

                  <p className="text-xs text-[#6B7280] italic text-center pt-2">
                    "And they persevered in the fast of Saint Mary with intense prayers and daily Divine Liturgies..."
                  </p>
                </div>

                {/* 3 Stats (Clean columns, no boxed containers) */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E6DFD1] text-center">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider block">
                      DURATION
                    </span>
                    <span className="text-sm md:text-base font-black text-[#2C1D07] font-mono">
                      16 Days
                    </span>
                  </div>
                  <div className="space-y-1 border-x border-[#E6DFD1]">
                    <span className="text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider block">
                      LITURGIES
                    </span>
                    <span className="text-sm md:text-base font-black text-[#2C1D07] font-mono">
                      Daily (ዕለታዊ)
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider block">
                      FEAST CULMINATION
                    </span>
                    <span className="text-sm md:text-base font-black text-[#800020] font-geez">
                      ዕርገተ ማርያም
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* ── 3. THE SEVEN CANONICAL FASTS OF THE CHURCH (TIMELINE WITH CONNECTING LINE) ── */}
            <div className="space-y-10 pt-6">
              
              {/* Section Header (Centered, Clean) */}
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#C8A84B]">
                  CANONICAL CANON
                </div>
                <div className="text-[#C8A84B] text-xs">❖</div>
                <h2 className="text-2xl md:text-4xl font-black font-serif text-[#2C1D07]">
                  The Seven Canonical Fasts of the Church
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Select any fast to explore its biblical foundations, duration, dates, and dietary observance.
                </p>
              </div>

              {/* Connected Timeline Row */}
              <div className="relative">
                
                {/* Horizontal Connecting Line behind icons */}
                <div className="hidden lg:block absolute top-[52px] left-12 right-12 h-[1px] bg-[#E6DFD1] z-0" />

                {/* 7 Fast Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
                  {CANONICAL_FASTS.map((fast) => {
                    const isSelected = selectedFastId === fast.id;
                    const avatar = FAST_AVATARS[fast.id] || '/assets/images/crosses_sunset.jpg';
                    const shortSeason = FAST_SHORT_SEASONS[fast.id] || fast.season;

                    return (
                      <div
                        key={fast.id}
                        onClick={() => setSelectedFastId(fast.id)}
                        className="flex flex-col items-center text-center cursor-pointer group space-y-2.5 transition-transform"
                      >
                        {/* Duration Badge */}
                        <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          isSelected ? 'text-[#855B09] font-black' : 'text-[#855B09]'
                        }`}>
                          {fast.durationDays} DAYS
                        </span>

                        {/* Circular Image Node */}
                        <div
                          className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all p-0.5 bg-white shadow-xs ${
                            isSelected
                              ? 'border-[#C8A84B] ring-4 ring-[#C8A84B]/20 scale-105'
                              : 'border-[#E6DFD1] group-hover:border-[#C8A84B]'
                          }`}
                        >
                          <img
                            src={avatar}
                            alt={fast.nameEnglish}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>

                        {/* Fast Name */}
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-black font-geez text-[#2C1D07] group-hover:text-[#855B09] transition-colors leading-tight">
                            {fast.nameAmharic.split('(')[0]}
                          </h4>
                          <p className="text-[10px] text-[#4A3B22] font-medium leading-tight">
                            {fast.nameAmharic.includes('(') ? `(${fast.nameAmharic.split('(')[1]}` : `(${fast.nameEnglish})`}
                          </p>
                        </div>

                        {/* Season Subtext */}
                        <span className="text-[10px] text-[#9CA3AF] leading-tight block">
                          {shortSeason}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* ── 4. SELECTED FAST DETAIL (SEAMLESS CARDLESS DOSSIER WITH EXTENSIVE EXPLANATIONS) ── */}
            <div className="pt-8 border-t border-[#E6DFD1] space-y-8">
              
              {/* Header Row: Badges, Full Titles, Canonical Origin (No Zema Button) */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40">
                    {currentFast.durationDays} TOTAL DAYS
                  </span>
                  <span className="text-xs font-bold text-[#855B09] bg-[#FAF8F3] px-3 py-1 rounded-full border border-[#E6DFD1]">
                    {currentFast.season}
                  </span>
                  <span className="text-[10px] font-semibold text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#86EFAC]/60">
                    Canonical Authority: {currentFast.canonicalOrigin}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black font-geez text-[#2C1D07] pt-1">
                  {currentFast.nameAmharic} — {currentFast.nameEnglish}
                </h3>
              </div>

              {/* Main 2-Column Split: Image on Left + Comprehensive Theological Dossier on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Atmospheric Sacred Image + Quick Summary Card */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="h-[280px] lg:h-[360px] rounded-3xl overflow-hidden shadow-lg border border-[#E6DFD1]">
                    <img
                      src={FAST_AVATARS[currentFast.id] || '/assets/images/crosses_sunset.jpg'}
                      alt={currentFast.nameEnglish}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Biblical Foundation Highlight */}
                  <div className="p-4 rounded-2xl bg-[#FFF5DB] border border-[#C8A84B]/40 space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-[#855B09]" />
                      BIBLICAL FOUNDATION • የመጽሐፍ ቅዱስ መሠረት
                    </span>
                    <p className="text-sm font-black font-geez text-[#2C1D07]">
                      {currentFast.scriptureReference}
                    </p>
                    <p className="text-[11px] text-[#6B7280] italic">
                      Derived from the Holy Apostles, Ecumenical Councils, and the Fetha Negest (ሕገ መንግሥት ቀኖና).
                    </p>
                  </div>
                </div>

                {/* Right Column: In-Depth Breakdown Sections */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* 1. Spiritual Purpose & Significance */}
                  <div className="space-y-2.5 pb-5 border-b border-[#E6DFD1]">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#855B09] flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#855B09]" />
                      1. SPIRITUAL PURPOSE & THEOLOGY (መንፈሳዊ ዓላማና ትርጉም)
                    </span>
                    <p className="text-xs sm:text-sm text-[#3D3020] leading-relaxed">
                      {language === 'en' ? currentFast.descriptionEn : currentFast.descriptionAm}
                    </p>

                    {/* Core Spiritual Themes Checklist */}
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase text-[#855B09] block mb-2">
                        {language === 'en' ? 'Core Spiritual Pillars & Meditations:' : 'የጾሙ ዋና ዋና መንፈሳዊ ምሰሶዎች:'}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(language === 'en' ? currentFast.spiritualThemesEn : currentFast.spiritualThemesAm).map((theme, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#4A3B22]">
                            <Check className="w-3.5 h-3.5 text-[#006B3C] shrink-0 mt-0.5" />
                            <span>{theme}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Historical & Patristic Background */}
                  <div className="space-y-2 pb-5 border-b border-[#E6DFD1]">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#855B09] flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#855B09]" />
                      2. HISTORICAL & PATRISTIC ORIGIN (ታሪካዊና ቀኖናዊ አመጣጥ)
                    </span>
                    <p className="text-xs sm:text-sm text-[#3D3020] leading-relaxed">
                      {language === 'en' ? currentFast.historicalBackgroundEn : currentFast.historicalBackgroundAm}
                    </p>
                  </div>

                  {/* 3. Liturgical Practices & Hymnody */}
                  <div className="space-y-2 pb-5 border-b border-[#E6DFD1]">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#855B09] flex items-center gap-1.5">
                      <Music className="w-4 h-4 text-[#855B09]" />
                      3. LITURGICAL RITES & HYMNODY (የሥርዓተ አምልኮና የዜማ ሥርዓት)
                    </span>
                    <p className="text-xs sm:text-sm text-[#3D3020] leading-relaxed">
                      {language === 'en' ? currentFast.liturgicalPracticesEn : currentFast.liturgicalPracticesAm}
                    </p>
                  </div>

                  {/* 4. Dietary Observance & Abstinence Timing */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#15803D]" />
                      4. CANONICAL DIETARY LAWS & ABSTINENCE (የምግብና የሰዓታት ሥርዓት)
                    </span>
                    <p className="text-xs sm:text-sm text-[#065F46] leading-relaxed">
                      {currentFast.dietaryRules}
                    </p>
                    <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1] text-xs text-[#6B7280] space-y-1">
                      <p className="font-bold text-[#855B09]">
                        Strict Prohibition: Meat, Poultry, Fish, Eggs, Milk, Butter, Animal Cheese & Animal Fats.
                      </p>
                      <p className="text-[11px]">
                        Permitted: All legumes, vegetables, fruits, cereals, grains, bread, and vegetable oils.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        );
      })()}

      {/* ═══════════════════════════════════════════
      {/* ═══════════════════════════════════════════
          VIEW 6: SERMONS & TEACHINGS (YOUTUBE DESIGN)
      ═══════════════════════════════════════════ */}
      {subTab === 'sermons' && (() => {
        const featuredSermon = MOCK_SERMONS.find((s) => s.isFeatured) || MOCK_SERMONS[0];

        // Filter sermons by category pill, search query, and sort
        const categoryFilter = (s: SermonItem) => {
          if (sermonCategoryPill === 'All') return true;
          if (sermonCategoryPill === 'Feasts') return s.category === 'Feasts' || s.category === 'Feast of Tabor' || !!s.feastDay;
          if (sermonCategoryPill === 'Gospel') return s.category === 'Gospel' || s.scriptureTheme.includes('Matthew') || s.scriptureTheme.includes('Luke') || s.scriptureTheme.includes('John');
          if (sermonCategoryPill === 'Faith') return s.category === 'Faith';
          if (sermonCategoryPill === 'Prayer') return s.category === 'Prayer';
          if (sermonCategoryPill === 'Family') return s.category === 'Family' || s.category === 'Youth & Family';
          if (sermonCategoryPill === 'Youth') return s.category === 'Youth' || s.category === 'Youth & Family';
          if (sermonCategoryPill === 'Church Life') return s.category === 'Church History' || s.category === 'Spiritual Life' || s.category === 'Theology';
          return s.category === sermonCategoryPill;
        };

        const searchFilter = (s: SermonItem) => {
          const q = sermonSearchQuery.toLowerCase().trim();
          if (!q) return true;
          return (
            s.titleAmharic.toLowerCase().includes(q) ||
            s.titleEnglish.toLowerCase().includes(q) ||
            s.preacher.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            (s.feastDay && s.feastDay.toLowerCase().includes(q)) ||
            s.scriptureTheme.toLowerCase().includes(q) ||
            s.summary.toLowerCase().includes(q)
          );
        };

        const sortedSermons = [...MOCK_SERMONS].sort((a, b) => {
          if (sermonSortBy === 'Most Popular') {
            const viewsA = parseFloat((a.views || '0').replace(/[^0-9.]/g, ''));
            const viewsB = parseFloat((b.views || '0').replace(/[^0-9.]/g, ''));
            return viewsB - viewsA;
          }
          return 0;
        });

        const latestSermons = sortedSermons
          .filter((s) => s.id !== featuredSermon.id)
          .filter(categoryFilter)
          .filter(searchFilter)
          .slice(0, 5);

        const popularSermons = sortedSermons
          .filter((s) => s.id.includes('popular') || (s.views && parseFloat(s.views) > 40))
          .filter(searchFilter)
          .slice(0, 5);

        const toggleBookmark = (id: string, e: React.MouseEvent) => {
          e.stopPropagation();
          setSavedSermons((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
          );
        };

        return (
          <div className="flex flex-col lg:flex-row gap-8 items-start animate-fadeIn pb-16">

            {/* Share Toast */}
            {sermonShareToast && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
                <CheckCircle className="w-4 h-4 text-[#4ADE80]" />
                <span>Sermon link copied to clipboard!</span>
              </div>
            )}

            {/* ═══════════════════════════════════════════
                LEFT SIDEBAR (PLAYLISTS, SUBSCRIBE)
            ═══════════════════════════════════════════ */}
            <aside className="w-full lg:w-64 shrink-0 space-y-6">
              
              {/* Category: PLAYLISTS */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#855B09] px-3 block">
                  PLAYLISTS
                </span>
                <nav className="space-y-0.5 text-xs text-[#4A3B22]">
                  {[
                    'Feast Day Sermons',
                    'Sunday Gospel Reflections',
                    'Lent Teachings',
                    'Youth Messages',
                    'Family & Life',
                  ].map((playlist, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (playlist.includes('Feast')) setSermonCategoryPill('Feasts');
                        else if (playlist.includes('Gospel')) setSermonCategoryPill('Gospel');
                        else if (playlist.includes('Lent')) setSermonCategoryPill('Faith');
                        else if (playlist.includes('Youth')) setSermonCategoryPill('Youth');
                        else if (playlist.includes('Family')) setSermonCategoryPill('Family');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF8F3] transition-colors text-left group"
                    >
                      <ListMusic className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#855B09] transition-colors" />
                      <span className="truncate">{playlist}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => setSermonCategoryPill('All')}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-[#855B09] hover:text-[#2C1D07] transition-colors pt-2"
                  >
                    <span>View all playlists</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </nav>
              </div>

              {/* Stay Inspired Subscription Card */}
              <div className="p-5 rounded-3xl bg-[#FAF8F3] border border-[#E6DFD1] text-center space-y-3 shadow-xs">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white border border-[#E6DFD1] flex items-center justify-center shadow-xs">
                  <BookOpen className="w-6 h-6 text-[#C8A84B]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[#2C1D07] font-serif">
                    Stay inspired
                  </h4>
                  <p className="text-[11px] text-[#6B7280] leading-relaxed">
                    Subscribe to receive updates when new sermons are published.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isSubscribed
                      ? 'bg-[#15803D] text-white'
                      : 'bg-[#1A2C1C] hover:bg-[#0D1A0F] text-white'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>{isSubscribed ? 'Subscribed ✓' : 'Subscribe Now'}</span>
                  <ChevronDown className="w-3 h-3 text-[#C8A84B]" />
                </button>
              </div>

            </aside>

            {/* ═══════════════════════════════════════════
                MAIN CONTENT AREA (HEADER, FEATURED, VIDEOS)
            ═══════════════════════════════════════════ */}
            <main className="flex-1 min-w-0 space-y-8">
              
              {/* Breadcrumb & Header Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#855B09] font-medium">
                  <button onClick={() => setSubTab('hub')} className="hover:underline">Home</button>
                  <span>›</span>
                  <button onClick={() => setSubTab('hub')} className="hover:underline">Orthodox Resources</button>
                  <span>›</span>
                  <span className="text-[#2C1D07] font-bold">Sermons & Teachings</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-black font-serif text-[#2C1D07]">
                  Sermons & Teachings
                </h1>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Listen, watch, and learn from the teachings of our fathers to strengthen our faith and walk with Christ.
                </p>
              </div>

              {/* Search Bar & Sort Dropdown */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Search Input with Filter Icon */}
                <div className="w-full sm:max-w-xl relative">
                  <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={sermonSearchQuery}
                    onChange={(e) => setSermonSearchQuery(e.target.value)}
                    placeholder="Search sermons, speakers, topics..."
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E6DFD1] focus:border-[#C8A84B] rounded-xl text-xs text-[#2C1D07] placeholder-[#9CA3AF] focus:outline-none transition-all shadow-xs"
                  />
                  <button
                    onClick={() => setSermonSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2C1D07]"
                    title="Filters"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="text-xs text-[#6B7280]">Sort by:</span>
                  <select
                    value={sermonSortBy}
                    onChange={(e) => setSermonSortBy(e.target.value as any)}
                    className="bg-white border border-[#E6DFD1] text-xs font-semibold text-[#2C1D07] py-2 px-3 rounded-xl focus:outline-none focus:border-[#C8A84B] shadow-xs cursor-pointer"
                  >
                    <option value="Newest">Newest</option>
                    <option value="Most Popular">Most Popular</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </div>

              </div>

              {/* ── FEATURED SERMON (YOUTUBE-STYLE SPLIT HERO) ── */}
              {!sermonSearchQuery && (
                <div className="bg-white rounded-3xl border border-[#E6DFD1] p-6 md:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  
                  {/* Left Column: 16:9 Video Thumbnail with Play Button */}
                  <div
                    onClick={() => setActiveVideoModal(featuredSermon)}
                    className="lg:col-span-7 aspect-video relative rounded-2xl overflow-hidden shadow-md cursor-pointer group bg-black"
                  >
                    <img
                      src={featuredSermon.thumbnailUrl || '/assets/images/sermon_hero_priest.jpg'}
                      alt={featuredSermon.titleEnglish}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Dark gradient overlay on thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Center Circular Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white text-[#1A2C1C] flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge Bottom Right */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {featuredSermon.duration}
                    </div>
                  </div>

                  {/* Right Column: Featured Sermon Details */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#855B09] block">
                      FEATURED SERMON
                    </span>

                    <div className="space-y-1">
                      <h2 className="text-2xl md:text-3xl font-black font-serif text-[#2C1D07] leading-tight">
                        {featuredSermon.titleEnglish}
                      </h2>
                      <p className="text-base font-black font-geez text-[#855B09]">
                        {featuredSermon.titleAmharic}
                      </p>
                    </div>

                    {/* Preacher & Scripture Details */}
                    <div className="space-y-1 text-xs text-[#6B7280]">
                      <div className="flex items-center gap-1.5 text-[#2C1D07] font-semibold">
                        <User className="w-3.5 h-3.5 text-[#855B09]" />
                        <span>By {featuredSermon.preacher}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span>📅 {featuredSermon.ethiopianDate}</span>
                        <span>•</span>
                        <span>{featuredSermon.gregorianDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#855B09] font-medium pt-0.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{featuredSermon.scriptureTheme}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#4A3B22] leading-relaxed">
                      {featuredSermon.summary}
                    </p>

                    {/* Action Buttons Row */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <button
                        onClick={() => {
                          if (featuredSermon.audioTrackId) setActiveTrackId(featuredSermon.audioTrackId);
                        }}
                        className="inline-flex items-center gap-2 bg-[#1A2C1C] hover:bg-[#0D1A0F] text-[#FAF8F3] px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                      >
                        <Headphones className="w-3.5 h-3.5 text-[#C8A84B]" />
                        <span>Listen</span>
                      </button>

                      <button
                        onClick={() => setActiveVideoModal(featuredSermon)}
                        className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF8F3] text-[#2C1D07] border border-[#E6DFD1] px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-[#855B09] fill-current" />
                        <span>Watch</span>
                      </button>

                      <button
                        onClick={() => setActiveSermonModal(featuredSermon)}
                        className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF8F3] text-[#2C1D07] border border-[#E6DFD1] px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#855B09]" />
                        <span>Read</span>
                      </button>

                      <button
                        onClick={(e) => toggleBookmark(featuredSermon.id, e)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          savedSermons.includes(featuredSermon.id)
                            ? 'bg-[#FFF5DB] border-[#C8A84B] text-[#855B09]'
                            : 'bg-white border-[#E6DFD1] text-[#6B7280] hover:text-[#2C1D07]'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${savedSermons.includes(featuredSermon.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* ── LATEST SERMONS SECTION (HORIZONTAL FILTER PILLS & 5-COLUMN VIDEO GRID) ── */}
              <div className="space-y-4">
                
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black font-serif text-[#2C1D07]">
                    Latest Sermons
                  </h3>
                  <button
                    onClick={() => setSermonCategoryPill('All')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#855B09] hover:text-[#2C1D07] transition-colors"
                  >
                    <span>View all sermons</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Category Filter Pills (Scrollable Row) */}
                <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
                  <div className="flex items-center gap-2 shrink-0">
                    {[
                      'All',
                      'Feasts',
                      'Gospel',
                      'Faith',
                      'Prayer',
                      'Family',
                      'Youth',
                      'Church Life',
                    ].map((cat) => {
                      const isSelected = sermonCategoryPill === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSermonCategoryPill(cat)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-[#1A2C1C] text-white shadow-xs'
                              : 'bg-white hover:bg-[#FAF8F3] text-[#4A3B22] border border-[#E6DFD1]'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setSermonCategoryPill('All')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] text-xs font-bold text-[#4A3B22] shrink-0 cursor-pointer shadow-xs"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Filters</span>
                  </button>
                </div>

                {/* 5-Column Video Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {latestSermons.map((sermon) => (
                    <div
                      key={sermon.id}
                      onClick={() => setActiveVideoModal(sermon)}
                      className="group cursor-pointer space-y-2.5 flex flex-col justify-between"
                    >
                      {/* Video Thumbnail (16:9 with duration badge) */}
                      <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xs border border-[#E6DFD1] bg-black">
                        <img
                          src={sermon.thumbnailUrl || '/assets/images/sermon_prayer_candle.jpg'}
                          alt={sermon.titleEnglish}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-white text-[#1A2C1C] flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-md group-hover:scale-105 transition-all">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                          {sermon.duration}
                        </div>
                      </div>

                      {/* Video Info (Title, 3-dots, Preacher, Dates) */}
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs font-black text-[#2C1D07] group-hover:text-[#855B09] transition-colors line-clamp-1 leading-snug">
                              {sermon.titleEnglish}
                            </h4>
                            <p className="text-[11px] font-black font-geez text-[#4A3B22] truncate">
                              {sermon.titleAmharic}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSermonModal(sermon);
                            }}
                            className="text-[#9CA3AF] hover:text-[#2C1D07] p-0.5 shrink-0"
                            title="More details"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#6B7280] truncate font-medium">
                          {sermon.preacher}
                        </p>

                        <div className="text-[10px] text-[#9CA3AF] space-y-0.5">
                          <p className="truncate">{sermon.ethiopianDate || sermon.date}</p>
                          <p className="truncate">{sermon.gregorianDate || sermon.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* ── POPULAR THIS MONTH SECTION ── */}
              <div className="space-y-4 pt-4 border-t border-[#E6DFD1]">
                
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black font-serif text-[#2C1D07]">
                    Popular This Month
                  </h3>
                  <button
                    onClick={() => {
                      setSermonSortBy('Most Popular');
                      setSermonCategoryPill('All');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#855B09] hover:text-[#2C1D07] transition-colors"
                  >
                    <span>View all popular</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* 5-Column Video Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {popularSermons.map((sermon) => (
                    <div
                      key={sermon.id}
                      onClick={() => setActiveVideoModal(sermon)}
                      className="group cursor-pointer space-y-2.5 flex flex-col justify-between"
                    >
                      {/* Video Thumbnail (16:9 with duration badge) */}
                      <div className="aspect-video relative rounded-2xl overflow-hidden shadow-xs border border-[#E6DFD1] bg-black">
                        <img
                          src={sermon.thumbnailUrl || '/assets/images/why_eotc_banner.jpg'}
                          alt={sermon.titleEnglish}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-white text-[#1A2C1C] flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-md group-hover:scale-105 transition-all">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                          {sermon.duration}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs font-black text-[#2C1D07] group-hover:text-[#855B09] transition-colors line-clamp-1 leading-snug">
                              {sermon.titleEnglish}
                            </h4>
                            <p className="text-[11px] font-black font-geez text-[#4A3B22] truncate">
                              {sermon.titleAmharic}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSermonModal(sermon);
                            }}
                            className="text-[#9CA3AF] hover:text-[#2C1D07] p-0.5 shrink-0"
                            title="More details"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#6B7280] truncate font-medium">
                          {sermon.preacher}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] pt-0.5">
                          <span>{sermon.views || '35.4K views'}</span>
                          <span>•</span>
                          <span>{sermon.gregorianDate || sermon.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </main>

            {/* ═══════════════════════════════════════════
                YOUTUBE VIDEO THEATRE MODAL
            ═══════════════════════════════════════════ */}
            {activeVideoModal && (
              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto p-4 md:p-8 flex items-center justify-center animate-fadeIn">
                <div className="w-full max-w-5xl bg-[#121814] text-white rounded-3xl border border-[#C8A84B]/40 shadow-2xl overflow-hidden space-y-6 p-6 md:p-8 relative">
                  
                  {/* Top Bar with Title & Close */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#C8A84B] font-extrabold uppercase tracking-widest block">
                        NOW PLAYING • የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ስብከት
                      </span>
                      <h3 className="text-xl md:text-2xl font-black font-serif text-white">
                        {activeVideoModal.titleEnglish} — <span className="font-geez">{activeVideoModal.titleAmharic}</span>
                      </h3>
                    </div>

                    <button
                      onClick={() => setActiveVideoModal(null)}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#800020] text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  {/* YouTube Player Screen (Embedded 16:9 Player) */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 relative">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1&rel=0&modestbranding=1`}
                      title={activeVideoModal.titleEnglish}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  {/* Video Metadata & Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[#C8A84B] font-bold">
                        <User className="w-4 h-4" />
                        <span className="font-geez">{activeVideoModal.preacher}</span>
                        <span>•</span>
                        <span className="text-white/70 font-normal">{activeVideoModal.role}</span>
                      </div>
                      <p className="text-white/60 text-[11px]">
                        📅 {activeVideoModal.ethiopianDate || activeVideoModal.date} • 📖 {activeVideoModal.scriptureTheme}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href);
                          setSermonShareToast(true);
                          setTimeout(() => setSermonShareToast(false), 3000);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#C8A84B]" />
                        <span>Share</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveSermonModal(activeVideoModal);
                          setActiveVideoModal(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Read Transcript</span>
                      </button>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-white/80 leading-relaxed">
                    <p>{activeVideoModal.summary}</p>
                  </div>

                </div>
              </div>
            )}

            {/* ═══════════════════════════════════════════
                TRANSCRIPT & EXEGESIS MODAL
            ═══════════════════════════════════════════ */}
            {activeSermonModal && (
              <div className="fixed inset-0 z-50 bg-[#FAF8F3] overflow-y-auto text-[#2C1D07] animate-fadeIn flex flex-col">
                
                {/* Top Navigation Bar */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E6DFD1] px-6 py-4 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveSermonModal(null)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:bg-[#C8A84B] hover:text-[#1A2C1C] text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Sermons</span>
                    </button>

                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40">
                      {activeSermonModal.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveVideoModal(activeSermonModal);
                        setActiveSermonModal(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#1A2C1C] text-[#FAF8F3] text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-[#C8A84B] fill-current" />
                      <span>Watch Video</span>
                    </button>

                    <button
                      onClick={() => setActiveSermonModal(null)}
                      className="w-9 h-9 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:bg-[#800020] hover:text-white flex items-center justify-center text-sm font-bold text-[#6B7280] transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Content Stage */}
                <div className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full space-y-6">
                  <div className="space-y-2 border-b border-[#E6DFD1] pb-6">
                    <h2 className="text-2xl md:text-4xl font-black font-serif text-[#2C1D07]">
                      {activeSermonModal.titleEnglish}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-black font-geez text-[#855B09]">
                      {activeSermonModal.titleAmharic}
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      {activeSermonModal.preacher} • {activeSermonModal.ethiopianDate || activeSermonModal.date} • {activeSermonModal.scriptureTheme}
                    </p>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#855B09] uppercase tracking-wider">
                      Sermon Text Transcript:
                    </span>
                    <div className="flex items-center gap-1 bg-[#FAF8F3] p-1 rounded-xl border border-[#E6DFD1]">
                      <button
                        onClick={() => setSermonTranscriptLang('am')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg font-geez transition-all ${
                          sermonTranscriptLang === 'am' ? 'bg-[#1A2C1C] text-[#FAF8F3]' : 'text-[#6B7280]'
                        }`}
                      >
                        አማርኛ
                      </button>
                      <button
                        onClick={() => setSermonTranscriptLang('en')}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                          sermonTranscriptLang === 'en' ? 'bg-[#1A2C1C] text-[#FAF8F3]' : 'text-[#6B7280]'
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </div>

                  {/* Transcript Content Box */}
                  <div className="p-8 bg-white rounded-3xl border border-[#E6DFD1] shadow-xs text-sm leading-loose">
                    {sermonTranscriptLang === 'am' ? (
                      <p className="font-geez text-[#2C1D07] text-base md:text-lg leading-loose whitespace-pre-line">
                        {activeSermonModal.transcriptAm || 'የዚህ ስብከት ሙሉ ጽሑፍ በቅርቡ ይጫናል።'}
                      </p>
                    ) : (
                      <p className="font-serif text-[#374151] text-base md:text-lg leading-loose whitespace-pre-line">
                        {activeSermonModal.transcriptEn || 'English sermon transcript will be uploaded shortly.'}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        );
      })()}
    </div>
  );
};


