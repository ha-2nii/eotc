import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../components/layout/LanguageContext';
import { MOCK_ZEMA_TRACKS } from '../data/mockZema';
import { MOCK_CALENDAR_EVENTS, UPCOMING_FEASTS } from '../data/mockCalendar';
import { DIGITAL_CHANT_SERVICES } from '../data/mockChants';
import type { ChantSection, ChantVerse } from '../data/mockChants';
import { TODAY_LITURGY, CANONICAL_FASTS, MOCK_SERMONS } from '../data/mockWorship';
import { MezmurView } from '../components/worship/MezmurView';
import type { SermonItem } from '../data/mockWorship';
import {
  Calendar as CalendarIcon,
  Book,
  Maximize2,
  Minimize2,
  Download,
  Play,
  Pause,
  Sparkles,
  Volume2,
  Moon,
  BookOpen,
  ArrowRight,
  Sun,
  Clock,
  BookMarked,
  Mic2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  Shield,
  Bell,
  SkipForward,
  SkipBack,
  Gauge,
  Info,
  Filter,
  Printer,
  Type,
  Eye,
  Search,
  Video,
  FileText,
  Headphones,
  User,
  Share2,
} from 'lucide-react';

type WorshipSubTab = 'hub' | 'calendar' | 'fasting' | 'sermons' | 'mezmur';

export const WorshipView: React.FC = () => {
  const { activeView, activeTrackId, setActiveTrackId, language } = useLanguage();

  const [subTab, setSubTab] = useState<WorshipSubTab>('hub');
  const [zemaMode, setZemaMode] = useState<string>('ALL');
  const [zemaCategory, setZemaCategory] = useState<string>('ALL');
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const audioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
  const [selectedSermonId, setSelectedSermonId] = useState<string | null>(null);
  const [activeSermonModal, setActiveSermonModal] = useState<SermonItem | null>(null);
  const [sermonSearchQuery, setSermonSearchQuery] = useState<string>('');
  const [sermonFilterTab, setSermonFilterTab] = useState<'all' | 'feast' | 'preacher' | 'topic'>('all');
  const [selectedPreacherFilter, setSelectedPreacherFilter] = useState<string>('ALL');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('ALL');
  const [selectedFeastFilter, setSelectedFeastFilter] = useState<string>('ALL');
  const [sermonTranscriptLang, setSermonTranscriptLang] = useState<'am' | 'en'>('am');
  const [sermonShareToast, setSermonShareToast] = useState<boolean>(false);
  const [remindedFeasts, setRemindedFeasts] = useState<number[]>([]);

  const activeService = DIGITAL_CHANT_SERVICES[selectedChantId] || DIGITAL_CHANT_SERVICES['sunday-qidase'];
  const activeSection = activeService.sections[selectedSectionIndex] || activeService.sections[0];
  const activeDayDetail = MOCK_CALENDAR_EVENTS[selectedCalDate] || MOCK_CALENDAR_EVENTS['2026-08-12'];

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
  const filteredZema = MOCK_ZEMA_TRACKS.filter(
    (t) => (zemaMode === 'ALL' || t.mode === zemaMode) && (zemaCategory === 'ALL' || t.category === zemaCategory)
  );
  const activeZemaTrack = MOCK_ZEMA_TRACKS.find((t) => t.id === activeTrackId) || null;
  const currentFast = CANONICAL_FASTS.find((f) => f.id === selectedFastId) || CANONICAL_FASTS[0];

  // Simulate audio progress when a track is playing
  useEffect(() => {
    if (activeTrackId) {
      setAudioProgress(0);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            clearInterval(audioIntervalRef.current!);
            return 100;
          }
          return prev + (100 / ((activeZemaTrack?.durationSecs || 240) / audioSpeed));
        });
      }, 1000);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setAudioProgress(0);
    }
    return () => { if (audioIntervalRef.current) clearInterval(audioIntervalRef.current); };
  }, [activeTrackId, audioSpeed]);

  const formatTime = (pct: number, totalSecs: number) => {
    const elapsed = Math.floor((pct / 100) * totalSecs);
    return `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
  };

  // Calendar month data
  const MONTHS = [
    { ethName: 'ነሐሴ (Nehase)', gregName: 'August 2026', ethNum: 2018, startOffset: 3, days: 30, datePrefix: '2026-08-', gregOffset: 6 },
    { ethName: 'መስከረም (Meskerem)', gregName: 'September 2026', ethNum: 2019, startOffset: 5, days: 30, datePrefix: '2026-09-', gregOffset: -9 },
  ];
  const currentMonth = MONTHS[calMonth];

  // Sync route with activeView
  useEffect(() => {
    if (activeView === 'worship/calendar') setSubTab('calendar');
    else if (activeView === 'worship/fasting') setSubTab('fasting');
    else if (activeView === 'worship/sermons') setSubTab('sermons');
    else if (activeView === 'worship/mezmur') setSubTab('mezmur');
    else if (activeView === 'worship') {
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

  const NAV_TABS: { id: WorshipSubTab; labelEn: string; labelAm: string; icon: React.ElementType }[] = [
    { id: 'hub',         labelEn: 'Resources Hub',        labelAm: 'የሀብታት ማዕከል',       icon: Sparkles },
    { id: 'calendar',    labelEn: 'Liturgical Calendar', labelAm: 'የቤተ ክርስቲያን ቀን',   icon: CalendarIcon },
    { id: 'fasting',     labelEn: 'Fasting Guide',       labelAm: 'የጾም መመሪያ',         icon: Moon },
    { id: 'sermons',     labelEn: 'Sermons',             labelAm: 'ስብከቶች',             icon: Mic2 },
    { id: 'mezmur',      labelEn: 'Mezmur & Hymns',      labelAm: 'መዝሙራት',             icon: Volume2 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fadeIn">

      {/* Sub-Navigation Header */}
      <div className="bg-white p-2 rounded-2xl border border-[#E6DFD1] flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#2C1D07] hover:bg-[#FAF8F3] border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'en' ? tab.labelEn : tab.labelAm}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={exportICSCalendar}
          className="btn-outline text-xs py-2 px-4 bg-white shadow-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export .ICS</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          VIEW 1: WORSHIP MAIN HUB
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
                  id: 'calendar' as WorshipSubTab,
                  icon: CalendarIcon,
                  titleEn: 'Liturgical Calendar',
                  titleAm: 'የቤተ ክርስቲያን ዘመን',
                  descEn: 'Follow the daily cycle of the Church. Feasts, commemorations and lectionary readings.',
                  descAm: 'የቤተ ክርስቲያንን የዕለት ዑደት ይከተሉ። ክብረ በዓላት፣ የቅዱሳን ቀናት እና ምንባባት።',
                  iconColor: '#1A2C1C',
                },
                {
                  id: 'fasting' as WorshipSubTab,
                  icon: Moon,
                  titleEn: 'Fasting Guide',
                  titleAm: 'ፆምና ጸሎት',
                  descEn: 'Understand the sacred fasts, their meaning, traditions and guidelines.',
                  descAm: 'ቅዱሱን ጾሞች ፣ ትርጉሙን፣ ወጉን እና ሥርዓቱን ይረዱ።',
                  iconColor: '#1D4ED8',
                },
                {
                  id: 'sermons' as WorshipSubTab,
                  icon: Mic2,
                  titleEn: 'Sermons',
                  titleAm: 'ስብከቶች',
                  descEn: 'Listen and reflect on inspiring teachings from bishops, priests and deacons.',
                  descAm: 'ከጳጳሳት፣ ካህናትና ዲያቆናት አነቃቂ ትምህርቶች ያዳምጡ።',
                  iconColor: '#7C3AED',
                },
                {
                  id: 'mezmur' as WorshipSubTab,
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
                  <span>{language === 'en' ? 'Back to Worship Hub' : 'ወደ ማዕከሉ ተመለስ'}</span>
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
                    <span>{language === 'en' ? 'Back to Worship Hub' : 'ወደ ማዕከሉ ተመለስ'}</span>
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
          VIEW 5: FASTING GUIDE (FULL)
      ═══════════════════════════════════════════ */}
      {subTab === 'fasting' && (
        <div className="space-y-8 animate-fadeIn pb-12">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A1120] p-8 md:p-12 rounded-3xl text-white space-y-4 relative overflow-hidden shadow-xl border border-[#3B82F6]/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/20 via-[#60A5FA]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#3B82F6]/20 border border-[#3B82F6]/40 px-3.5 py-1.5 rounded-full text-xs text-[#93C5FD] font-bold uppercase tracking-wider">
                <Moon className="w-3.5 h-3.5" />
                <span>ሰባቱ አቅደ ጾሞች • The 7 Canonical Fasts</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-geez leading-tight">
                {language === 'en' ? 'EOTC Fasting Guide — ፆምና ጸሎት' : 'ሥርዓተ ጾም ወጸሎት — ሰባቱ ጾሞች'}
              </h1>
              <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed">
                {language === 'en'
                  ? 'The Ethiopian Orthodox Tewahedo Church observes over 220 fasting days every year — the most extensive canonical fasting tradition in Christendom. Fasting is a sacred union of prayer, physical abstinence, repentance, and almsgiving.'
                  : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በዓመት ከ220 የሚበልጡ የጾም ቀናት አሏት። ጾም ከጸሎት፣ ከምጽዋትና ከስግደት ጋር ተጣምሮ ለእግዚአብሔር የሚቀርብ ቅዱስ መሥዋዕት ነው።'}
              </p>
            </div>
          </div>

          {/* Today's Fast Status & Live Active Countdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Today's Status Banner (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1A2C1C] to-[#0D1A0F] p-6 md:p-8 rounded-3xl border border-[#C8A84B]/30 text-white space-y-5 shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#006B3C] text-[#A3E6C2] border border-[#A3E6C2]/30 animate-pulse">
                    <CheckCircle className="w-3 h-3" />
                    Today is a Fasting Day
                  </span>
                  <span className="text-[10px] text-[#94A3B8] font-mono">{TODAY_LITURGY.gregorianDate.split(',')[1]}</span>
                </div>

                <div>
                  <span className="text-xs text-[#C8A84B] font-bold font-geez">{TODAY_LITURGY.ethiopianDate}</span>
                  <h2 className="text-2xl font-black font-geez text-white mt-1">
                    {TODAY_LITURGY.fastNameAmharic}
                  </h2>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Fast of the Holy Assumption of St. Mary (Filseta)</p>
                </div>

                {/* Abstinence & Dietary Rules quick badges */}
                <div className="p-4 rounded-2xl bg-white/8 border border-white/10 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#C8A84B] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#C8A84B]">Abstinence Hours:</p>
                      <p className="text-[11px] text-[#E2E8F0]">Strict fast (no food or water) until 3:00 PM (9:00 local time) or post-Qidase.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 border-t border-white/10 pt-2">
                    <Shield className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#4ADE80]">Dietary Rules:</p>
                      <p className="text-[11px] text-[#E2E8F0]">100% Vegan plant-based diet. Strict prohibition of meat, poultry, fish, eggs, milk, cheese, and butter.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSubTab('calendar')}
                  className="w-full bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>{language === 'en' ? 'View in Liturgical Calendar' : 'በቀን መቁጠሪያ ይመልከቱ'}</span>
                </button>
              </div>
            </div>

            {/* Right: Current Active Fast Progress & Countdown (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09]">
                      Active Fast Season • የወቅቱ ጾም
                    </span>
                    <h3 className="text-xl font-black text-[#2C1D07] font-geez mt-0.5">
                      ፆመ ፍልሰታ — Fast of the Dormition (Day 6 of 16)
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#855B09] font-mono">10</span>
                    <p className="text-[9px] text-[#9CA3AF] font-bold uppercase">Days Remaining</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mt-5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#855B09] font-geez">ነሐሴ ፩ (Aug 7) — Start</span>
                    <span className="text-[#006B3C]">37.5% Completed</span>
                    <span className="text-[#800020] font-geez">ነሐሴ ፲፮ (Aug 22) — Feast</span>
                  </div>
                  <div className="h-3 bg-[#FAF8F3] border border-[#E6DFD1] rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#C8A84B] to-[#006B3C] rounded-full transition-all duration-1000 shadow-sm"
                      style={{ width: '37.5%' }}
                    />
                  </div>
                  <p className="text-[11px] text-[#6B7280] italic text-center pt-1">
                    "And they persevered in the fast of Saint Mary with intense prayers and daily Divine Liturgies..."
                  </p>
                </div>

                {/* 3 Quick Highlight Stats */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="p-3 bg-[#FFF5DB] rounded-2xl border border-[#C8A84B]/40 text-center">
                    <span className="text-[10px] text-[#855B09] font-bold uppercase block">Duration</span>
                    <span className="text-base font-black text-[#2C1D07] font-mono">16 Days</span>
                  </div>
                  <div className="p-3 bg-[#F0FDF4] rounded-2xl border border-[#86EFAC] text-center">
                    <span className="text-[10px] text-[#15803D] font-bold uppercase block">Liturgies</span>
                    <span className="text-base font-black text-[#15803D] font-mono">Daily (ዕለታዊ)</span>
                  </div>
                  <div className="p-3 bg-[#FAF8F3] rounded-2xl border border-[#E6DFD1] text-center">
                    <span className="text-[10px] text-[#6B7280] font-bold uppercase block">Feast Culmination</span>
                    <span className="text-base font-black text-[#800020] font-geez">ዕርገተ ማርያም</span>
                  </div>
                </div>
              </div>

              {/* Devotional quote */}
              <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#E6DFD1] flex items-center justify-between text-xs">
                <span className="font-geez font-bold text-[#2C1D07]">
                  «ጾምሰ ፡ ትፌውስ ፡ ቁስለ ፡ ነፍስ ፡ ወታበርህ ፡ አዕይንተ ፡ ልብ» — ቅዱስ ያሬድ
                </span>
                <span className="text-[10px] text-[#855B09] font-bold shrink-0 ml-3">Saint Yared</span>
              </div>
            </div>

          </div>

          {/* The Seven Fasting Periods Overview & Selector */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
            <div className="border-b border-[#E6DFD1] pb-4">
              <span className="text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider bg-[#FFF5DB] px-3 py-1 rounded-full inline-block mb-2">
                Canonical Canon • ሰባቱ የቤተ ክርስቲያን ጾሞች
              </span>
              <h2 className="text-2xl md:text-3xl font-black font-geez text-[#2C1D07]">
                {language === 'en' ? 'The Seven Canonical Fasts of the Church' : 'ሰባቱ አጽዋማት (The 7 Canonical Fasts)'}
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Select any fast below to inspect its biblical foundations, duration, dates, and strict dietary observance.
              </p>
            </div>

            {/* 7 Fast Selector Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {CANONICAL_FASTS.map((fast) => {
                const isSelected = selectedFastId === fast.id;
                return (
                  <button
                    key={fast.id}
                    onClick={() => setSelectedFastId(fast.id)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1A2C1C] border-[#C8A84B] text-white shadow-lg ring-2 ring-[#C8A84B]/50'
                        : 'bg-[#FAF8F3] border-[#E6DFD1] hover:border-[#C8A84B] hover:bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#C8A84B] text-[#1A2C1C]' : 'bg-white text-[#855B09] border border-[#E6DFD1]'
                        }`}>
                          {fast.durationDays} Days
                        </span>
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-[#94A3B8]' : 'text-[#6B7280]'}`}>
                          {fast.season.split('(')[0]}
                        </span>
                      </div>
                      <h4 className="text-sm font-black font-geez leading-snug">{fast.nameAmharic}</h4>
                      <p className={`text-[10px] leading-tight ${isSelected ? 'text-[#94A3B8]' : 'text-[#6B7280]'}`}>
                        {fast.nameEnglish}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[10px] font-bold">
                      <span className={isSelected ? 'text-[#C8A84B]' : 'text-[#855B09]'}>
                        {fast.scriptureReference.split('(')[0]}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Fast Deep-Dive Dossier */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-6 shadow-inner">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#1A2C1C] text-[#C8A84B]">
                      {currentFast.durationDays} Total Days
                    </span>
                    <span className="text-xs font-bold text-[#855B09]">{currentFast.season}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black font-geez text-[#2C1D07]">
                    {currentFast.nameAmharic} — {currentFast.nameEnglish}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTrackId('zema-1')}
                  className="flex items-center gap-2 bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to Fasting Zema</span>
                </button>
              </div>

              {/* 3-Column Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Column 1: Theological & Spiritual Purpose */}
                <div className="p-5 rounded-2xl bg-white border border-[#E6DFD1] space-y-2.5 shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Spiritual Purpose (መንፈሳዊ ዓላማ)
                  </span>
                  <p className="text-xs text-[#4A3B22] leading-relaxed">
                    {language === 'en' ? currentFast.descriptionEn : currentFast.descriptionAm}
                  </p>
                </div>

                {/* Column 2: Dietary Rules & Permitted Foods */}
                <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#86EFAC] space-y-2.5 shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Dietary Observance (የምግብ ሥርዓት)
                  </span>
                  <p className="text-xs text-[#065F46] leading-relaxed">
                    {currentFast.dietaryRules}
                  </p>
                  <div className="text-[10px] text-[#15803D] font-bold pt-1 border-t border-[#86EFAC]/50">
                    Prohibited: Meat, Poultry, Eggs, Milk, Cheese, Animal Butter.
                  </div>
                </div>

                {/* Column 3: Biblical Basis & Scripture Quotes */}
                <div className="p-5 rounded-2xl bg-[#FFF5DB] border border-[#C8A84B]/40 space-y-2.5 shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" />
                    Biblical Foundation (የመጽሐፍ ቅዱስ መሠረት)
                  </span>
                  <p className="text-sm font-black font-geez text-[#2C1D07]">
                    {currentFast.scriptureReference}
                  </p>
                  <p className="text-xs text-[#6B7280] italic">
                    Canonical foundation derived from the Holy Apostles and church councils in Fetha Negest.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Fasting Rules Reference Guide (4 Structured Pillars) */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
            <div className="border-b border-[#E6DFD1] pb-4">
              <span className="text-[10px] text-[#855B09] font-extrabold uppercase tracking-wider bg-[#FFF5DB] px-3 py-1 rounded-full inline-block mb-2">
                Fetha Negest Canon • ሥርዓተ ቤተ ክርስቲያን
              </span>
              <h2 className="text-2xl font-black font-geez text-[#2C1D07]">
                {language === 'en' ? 'Complete EOTC Fasting Rules Reference Guide' : 'አጠቃላይ የጾም ሥርዓትና ቀኖና መመሪያ'}
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Canonical standards on vegan diet, daily abstinence timing, prayer prostrations, and legitimate exemptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Pillar 1: Plant-Based Vegan Diet */}
              <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] flex items-center justify-center text-[#15803D] font-bold">
                  🌱
                </div>
                <h4 className="text-sm font-black font-geez text-[#2C1D07]">1. 100% Vegan Diet</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  All canonical fasts require complete abstinence from all animal products: meat, poultry, fish, eggs, dairy, cheese, milk, and animal fats. Legumes, grains, vegetables, and oils are blessed.
                </p>
              </div>

              {/* Pillar 2: Timing & Abstinence Hours */}
              <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5DB] border border-[#C8A84B] flex items-center justify-center text-[#855B09] font-bold">
                  ⏰
                </div>
                <h4 className="text-sm font-black font-geez text-[#2C1D07]">2. Abstinence Timing</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Fasting days require total abstinence from all food and liquid from midnight until the 9th hour (3:00 PM local / 9:00 local Ethiopic time) or until the Eucharistic Liturgy concludes.
                </p>
              </div>

              {/* Pillar 3: Canonical Exemptions */}
              <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#1D4ED8] font-bold">
                  🛡️
                </div>
                <h4 className="text-sm font-black font-geez text-[#2C1D07]">3. Legitimate Exemptions</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Children under 7 years, the severely ill, the elderly, pregnant or nursing mothers, and soldiers in battle may receive pastoral dispensation from their father confessor (የነፍስ አባት).
                </p>
              </div>

              {/* Pillar 4: Prayer & Spiritual Works */}
              <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F2] border border-[#FECACA] flex items-center justify-center text-[#991B1B] font-bold">
                  🕊️
                </div>
                <h4 className="text-sm font-black font-geez text-[#2C1D07]">4. Prayer & Almsgiving</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Fasting without prayer and charity is merely dieting. Believers perform prostrations (ስግደት), attend morning Qidase, forgive grievances, and give alms to the needy (ምጽዋት).
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          VIEW 6: SERMONS (FULL)
      ═══════════════════════════════════════════ */}
      {subTab === 'sermons' && (() => {
        const featuredSermon = MOCK_SERMONS.find((s) => s.isFeatured) || MOCK_SERMONS[0];

        // Filter sermons by search query and active tab filters
        const filteredSermons = MOCK_SERMONS.filter((s) => {
          // Search query matching
          const q = sermonSearchQuery.toLowerCase().trim();
          const matchesQuery = !q || (
            s.titleAmharic.toLowerCase().includes(q) ||
            s.titleEnglish.toLowerCase().includes(q) ||
            s.preacher.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            (s.feastDay && s.feastDay.toLowerCase().includes(q)) ||
            s.scriptureTheme.toLowerCase().includes(q) ||
            s.summary.toLowerCase().includes(q)
          );

          if (!matchesQuery) return false;

          // Tab-specific filters
          if (sermonFilterTab === 'feast' && selectedFeastFilter !== 'ALL') {
            return s.feastDay?.includes(selectedFeastFilter);
          }
          if (sermonFilterTab === 'preacher' && selectedPreacherFilter !== 'ALL') {
            return s.preacher.includes(selectedPreacherFilter);
          }
          if (sermonFilterTab === 'topic' && selectedTopicFilter !== 'ALL') {
            return s.category === selectedTopicFilter;
          }

          return true;
        });

        // Preachers list for filter
        const uniquePreachers = Array.from(new Set(MOCK_SERMONS.map((s) => s.preacher.split('(')[0].trim())));
        const uniqueTopics = Array.from(new Set(MOCK_SERMONS.map((s) => s.category)));
        const uniqueFeasts = Array.from(new Set(MOCK_SERMONS.filter((s) => s.feastDay).map((s) => s.feastDay!)));

        return (
          <div className="space-y-8 animate-fadeIn pb-12">

            {/* Share Toast */}
            {sermonShareToast && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
                <CheckCircle className="w-4 h-4 text-[#4ADE80]" />
                <span>Sermon link copied to clipboard!</span>
              </div>
            )}

            {/* Top Header & Search Bar */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
                <div>
                  <button onClick={() => setSubTab('hub')} className="inline-flex items-center gap-1 text-xs text-[#855B09] font-bold hover:text-[#2C1D07] mb-2 transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Back to Worship Hub' : 'ወደ ማዕከሉ ተመለስ'}</span>
                  </button>
                  <div className="inline-flex items-center gap-2 bg-[#F5F3FF] border border-[#DDD6FE] px-3.5 py-1 rounded-full text-xs text-[#7C3AED] font-bold uppercase tracking-wider mb-2">
                    <Mic2 className="w-3.5 h-3.5" />
                    <span>ቅዱሳን ስብከቶች • Sacred Homilies & Teachings</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                    {language === 'en' ? 'Sermons & Spiritual Teachings' : 'ስብከቶችና መንፈሳዊ ትምህርቶች'}
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Authentic Orthodox homilies from His Holiness the Patriarch, esteemed scholars, and ordained clergy.
                  </p>
                </div>

                {/* Search Input */}
                <div className="w-full lg:w-96 relative">
                  <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={sermonSearchQuery}
                    onChange={(e) => setSermonSearchQuery(e.target.value)}
                    placeholder={language === 'en' ? 'Search by preacher, feast, scripture...' : 'ስብከት፣ መምህር፣ በዓል ይፈልጉ...'}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F3] border border-[#E6DFD1] focus:border-[#7C3AED] focus:bg-white rounded-xl text-xs text-[#2C1D07] font-medium placeholder-[#9CA3AF] focus:outline-none transition-all shadow-inner"
                  />
                  {sermonSearchQuery && (
                    <button
                      onClick={() => setSermonSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#9CA3AF] hover:text-[#2C1D07]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Tabs (Latest / By Feast / By Preacher / By Topic) */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] mr-2">Filter Tabs:</span>
                  {[
                    { id: 'all', label: 'Latest (ሁሉም)' },
                    { id: 'feast', label: 'By Feast (በበዓላት)' },
                    { id: 'preacher', label: 'By Preacher (በመምህራን)' },
                    { id: 'topic', label: 'By Topic (በርዕሰ ጉዳይ)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSermonFilterTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        sermonFilterTab === tab.id
                          ? 'bg-[#7C3AED] text-white shadow-md'
                          : 'bg-[#FAF8F3] text-[#6B7280] hover:text-[#2C1D07] border border-[#E6DFD1] hover:bg-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sub-Filter Pill Row */}
                {sermonFilterTab === 'preacher' && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E6DFD1]/60">
                    <span className="text-[10px] font-bold text-[#6B7280] mr-1">Preacher:</span>
                    <button
                      onClick={() => setSelectedPreacherFilter('ALL')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                        selectedPreacherFilter === 'ALL' ? 'bg-[#1A2C1C] text-[#C8A84B]' : 'bg-[#FAF8F3] text-[#6B7280] border border-[#E6DFD1]'
                      }`}
                    >
                      All Preachers
                    </button>
                    {uniquePreachers.map((pr) => (
                      <button
                        key={pr}
                        onClick={() => setSelectedPreacherFilter(pr)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold font-geez transition-all ${
                          selectedPreacherFilter === pr ? 'bg-[#7C3AED] text-white shadow-sm' : 'bg-[#FAF8F3] text-[#6B7280] hover:bg-white border border-[#E6DFD1]'
                        }`}
                      >
                        {pr}
                      </button>
                    ))}
                  </div>
                )}

                {sermonFilterTab === 'topic' && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E6DFD1]/60">
                    <span className="text-[10px] font-bold text-[#6B7280] mr-1">Topic:</span>
                    <button
                      onClick={() => setSelectedTopicFilter('ALL')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                        selectedTopicFilter === 'ALL' ? 'bg-[#1A2C1C] text-[#C8A84B]' : 'bg-[#FAF8F3] text-[#6B7280] border border-[#E6DFD1]'
                      }`}
                    >
                      All Topics
                    </button>
                    {uniqueTopics.map((top) => (
                      <button
                        key={top}
                        onClick={() => setSelectedTopicFilter(top)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          selectedTopicFilter === top ? 'bg-[#7C3AED] text-white shadow-sm' : 'bg-[#FAF8F3] text-[#6B7280] hover:bg-white border border-[#E6DFD1]'
                        }`}
                      >
                        {top}
                      </button>
                    ))}
                  </div>
                )}

                {sermonFilterTab === 'feast' && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E6DFD1]/60">
                    <span className="text-[10px] font-bold text-[#6B7280] mr-1">Feast:</span>
                    <button
                      onClick={() => setSelectedFeastFilter('ALL')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                        selectedFeastFilter === 'ALL' ? 'bg-[#1A2C1C] text-[#C8A84B]' : 'bg-[#FAF8F3] text-[#6B7280] border border-[#E6DFD1]'
                      }`}
                    >
                      All Feasts
                    </button>
                    {uniqueFeasts.map((fst) => (
                      <button
                        key={fst}
                        onClick={() => setSelectedFeastFilter(fst)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold font-geez transition-all ${
                          selectedFeastFilter === fst ? 'bg-[#7C3AED] text-white shadow-sm' : 'bg-[#FAF8F3] text-[#6B7280] hover:bg-white border border-[#E6DFD1]'
                        }`}
                      >
                        {fst}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Featured Sermon Highlight Hero (Top) */}
            {!sermonSearchQuery && sermonFilterTab === 'all' && (
              <div className="bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#0F172A] p-8 md:p-10 rounded-3xl text-white space-y-6 relative overflow-hidden shadow-2xl border border-[#C8A84B]/40">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#7C3AED]/30 via-[#C8A84B]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#C8A84B] text-[#1A2C1C] shadow-sm">
                        <Star className="w-3 h-3 fill-current" />
                        Featured Patriarchal Teaching
                      </span>
                      {featuredSermon.feastDay && (
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-[#C8A84B] border border-white/10 font-geez">
                          ✦ {featuredSermon.feastDay}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#C8A84B]" />
                      <span>{featuredSermon.duration}</span>
                      <span>•</span>
                      <span>{featuredSermon.date}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-4xl font-black font-geez text-white leading-tight">
                      {language === 'en' ? featuredSermon.titleEnglish : featuredSermon.titleAmharic}
                    </h3>
                    <p className="text-sm font-bold text-[#C8A84B] font-geez mt-2">{featuredSermon.preacher}</p>
                    <p className="text-xs text-[#94A3B8]">{featuredSermon.role}</p>
                  </div>

                  <p className="text-xs md:text-sm text-[#E2E8F0] leading-relaxed max-w-3xl">
                    {featuredSermon.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setActiveSermonModal(featuredSermon);
                        setSelectedSermonId(featuredSermon.id);
                        if (featuredSermon.audioTrackId) setActiveTrackId(featuredSermon.audioTrackId);
                      }}
                      className="bg-[#C8A84B] hover:bg-[#B8973A] text-[#1A2C1C] px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Listen / Watch Message ({featuredSermon.duration})</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveSermonModal(featuredSermon);
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                    >
                      <FileText className="w-4 h-4 text-[#C8A84B]" />
                      <span>Read Text Transcript</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sermon List Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-[#2C1D07] font-geez">
                  {language === 'en' ? 'Sermons Library' : 'የስብከቶች ዝርዝር'} ({filteredSermons.length} sermons)
                </h3>
              </div>

              {filteredSermons.length === 0 && (
                <div className="bg-white p-12 rounded-3xl border border-[#E6DFD1] text-center text-[#9CA3AF] font-geez space-y-2">
                  <Mic2 className="w-10 h-10 mx-auto opacity-30" />
                  <p className="font-bold text-sm">ምንም ስብከት አልተገኘም። (No sermons matched your search.)</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSermons.map((sermon) => {
                  const isPlaying = activeTrackId === sermon.audioTrackId && selectedSermonId === sermon.id;
                  return (
                    <div
                      key={sermon.id}
                      className={`bg-white rounded-3xl border transition-all shadow-sm hover:shadow-xl p-6 flex flex-col justify-between space-y-4 group ${
                        selectedSermonId === sermon.id
                          ? 'border-[#7C3AED] ring-2 ring-[#DDD6FE]'
                          : 'border-[#E6DFD1] hover:border-[#7C3AED]'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Badges line */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]">
                            {sermon.category}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF] font-mono">
                            {sermon.mediaType === 'video' ? <Video className="w-3 h-3 text-[#7C3AED]" /> : <Headphones className="w-3 h-3 text-[#855B09]" />}
                            <span>{sermon.duration}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-black text-[#2C1D07] font-geez leading-snug group-hover:text-[#7C3AED] transition-colors line-clamp-2">
                          {language === 'en' ? sermon.titleEnglish : sermon.titleAmharic}
                        </h4>

                        {/* Preacher Profile box */}
                        <div className="p-3.5 bg-[#FAF8F3] rounded-2xl border border-[#E6DFD1] space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C1D07] font-geez truncate">
                            <User className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                            <span>{sermon.preacher}</span>
                          </div>
                          <p className="text-[10px] text-[#6B7280] truncate">{sermon.role}</p>
                          <div className="flex items-center justify-between text-[9px] text-[#855B09] font-mono pt-1 border-t border-[#E6DFD1]/50 mt-1">
                            <span>{sermon.date}</span>
                            {sermon.feastDay && <span className="font-geez text-[#800020] font-bold">✦ {sermon.feastDay}</span>}
                          </div>
                        </div>

                        {/* Scripture Theme */}
                        <div className="flex items-center gap-1.5 text-xs text-[#855B09] font-bold">
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{sermon.scriptureTheme}</span>
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-[#4A3B22] leading-relaxed line-clamp-3">
                          {sermon.summary}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-2 border-t border-[#E6DFD1]/60">
                        <button
                          onClick={() => {
                            setSelectedSermonId(sermon.id);
                            setActiveSermonModal(sermon);
                            if (sermon.audioTrackId) setActiveTrackId(sermon.audioTrackId);
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            isPlaying
                              ? 'bg-[#7C3AED] text-white'
                              : 'bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] hover:bg-[#7C3AED] hover:text-white'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          <span>{isPlaying ? 'Playing...' : sermon.mediaType === 'video' ? 'Watch' : 'Listen'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveSermonModal(sermon);
                          }}
                          className="px-3 py-2.5 bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] rounded-xl text-xs font-bold text-[#6B7280] transition-all shadow-sm"
                          title="Read Transcript"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#7C3AED]" />
                        </button>

                        <a
                          href={sermon.audioUrl}
                          download
                          className="px-3 py-2.5 bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] rounded-xl text-xs font-bold text-[#6B7280] transition-all shadow-sm flex items-center justify-center"
                          title="Download for offline listening"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Full-Screen Interactive Sermon Stage / Player View */}
            {activeSermonModal && (
              <div className="fixed inset-0 z-50 bg-[#FAF8F3] overflow-y-auto text-[#2C1D07] animate-fadeIn flex flex-col">
                
                {/* Top Full-Width Navigation & Action Bar */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E6DFD1] px-6 py-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveSermonModal(null)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:bg-[#C8A84B] hover:text-[#1A2C1C] hover:border-[#C8A84B] text-xs font-bold transition-all shadow-sm group"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                      <span>{language === 'en' ? 'Back to All Sermons' : 'ወደ ስብከቶች ዝርዝር ተመለስ'}</span>
                    </button>

                    <div className="hidden md:flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]">
                        {activeSermonModal.category}
                      </span>
                      {activeSermonModal.feastDay && (
                        <span className="text-[10px] text-[#800020] font-geez font-bold bg-[#FFF5DB] border border-[#C8A84B]/40 px-2.5 py-0.5 rounded-full">
                          ✦ {activeSermonModal.feastDay}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Header Actions */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        setSermonShareToast(true);
                        setTimeout(() => setSermonShareToast(false), 3000);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:bg-white text-[#6B7280] hover:text-[#2C1D07] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      title="Share Sermon"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>

                    <a
                      href={activeSermonModal.audioUrl}
                      download
                      className="px-3.5 py-2 rounded-xl bg-[#1A2C1C] text-[#C8A84B] hover:bg-[#0D1A0F] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>

                    <button
                      onClick={() => setActiveSermonModal(null)}
                      className="w-9 h-9 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:bg-[#800020] hover:text-white flex items-center justify-center text-sm font-bold text-[#6B7280] transition-colors"
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Main Full-Screen Content Stage (2 Columns on desktop) */}
                <div className="flex-1 p-4 md:p-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column (7 cols): Media Player & Preacher Details */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Media Screen (Video or Audio Box) */}
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#E6DFD1] bg-black">
                      {activeSermonModal.videoUrl ? (
                        <div className="aspect-video w-full">
                          <video
                            controls
                            autoPlay
                            className="w-full h-full object-cover"
                            poster="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=80"
                          >
                            <source src={activeSermonModal.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : (
                        <div className="p-8 md:p-12 bg-gradient-to-br from-[#1A2C1C] via-[#0F1D11] to-[#0A130B] text-white space-y-8 border-b border-[#C8A84B]/30">
                          <div className="flex items-center justify-between">
                            <div className="w-16 h-16 rounded-2xl bg-[#C8A84B]/20 border border-[#C8A84B]/50 flex items-center justify-center shadow-lg">
                              <Volume2 className="w-8 h-8 text-[#C8A84B] animate-pulse" />
                            </div>
                            <span className="text-xs font-mono font-bold text-[#C8A84B] bg-white/10 px-3 py-1 rounded-full">
                              {activeSermonModal.duration} • High-Fidelity Audio
                            </span>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] text-[#C8A84B] font-extrabold uppercase tracking-widest block">Now Playing Homily</span>
                            <h3 className="text-2xl md:text-3xl font-black font-geez text-white leading-tight">
                              {activeSermonModal.titleAmharic}
                            </h3>
                            <p className="text-xs text-[#94A3B8]">{activeSermonModal.titleEnglish}</p>
                          </div>

                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                            <audio controls autoPlay className="w-full">
                              <source src={activeSermonModal.audioUrl} type="audio/mpeg" />
                            </audio>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preacher & Sermon Overview Card */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                        <div>
                          <h2 className="text-xl md:text-2xl font-black font-geez text-[#2C1D07]">
                            {language === 'en' ? activeSermonModal.titleEnglish : activeSermonModal.titleAmharic}
                          </h2>
                          <p className="text-xs text-[#855B09] font-geez font-bold mt-1">
                            {activeSermonModal.preacher}
                          </p>
                          <p className="text-[11px] text-[#6B7280]">{activeSermonModal.role}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#855B09] bg-[#FFF5DB] px-3 py-1.5 rounded-xl border border-[#C8A84B]/40 shrink-0">
                          📅 {activeSermonModal.date}
                        </span>
                      </div>

                      {/* Scripture Theme Banner */}
                      <div className="p-4 bg-[#FFF5DB] rounded-2xl border border-[#C8A84B]/50 flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-[#855B09] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09]">Scripture Text (የስብከቱ መሪ ኃይለ ቃል)</span>
                          <p className="text-sm font-black font-geez text-[#2C1D07] mt-0.5">{activeSermonModal.scriptureTheme}</p>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-[#855B09] uppercase tracking-wider">Sermon Summary & Exegesis:</span>
                        <p className="text-xs md:text-sm text-[#4A3B22] leading-relaxed">
                          {activeSermonModal.summary}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Right Column (5 cols): Full Interactive Transcript & Next Sermons */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Transcript Card */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#7C3AED]" />
                          <span className="text-sm font-black font-geez text-[#2C1D07]">የስብከቱ ጽሑፍ • Transcript</span>
                        </div>

                        {/* Amharic / English Toggle */}
                        <div className="flex items-center gap-1 bg-[#FAF8F3] p-1 rounded-xl border border-[#E6DFD1]">
                          <button
                            onClick={() => setSermonTranscriptLang('am')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-lg font-geez transition-all ${
                              sermonTranscriptLang === 'am' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#2C1D07]'
                            }`}
                          >
                            አማርኛ
                          </button>
                          <button
                            onClick={() => setSermonTranscriptLang('en')}
                            className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                              sermonTranscriptLang === 'en' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#2C1D07]'
                            }`}
                          >
                            English
                          </button>
                        </div>
                      </div>

                      {/* Scrollable Text Box */}
                      <div className="p-6 bg-[#FAF8F3] rounded-2xl border border-[#E6DFD1] min-h-[340px] max-h-[460px] overflow-y-auto space-y-4 text-xs leading-loose select-text shadow-inner">
                        {sermonTranscriptLang === 'am' ? (
                          <p className="font-geez font-medium text-[#2C1D07] text-sm md:text-base leading-loose whitespace-pre-line">
                            {activeSermonModal.transcriptAm || 'የዚህ ስብከት ሙሉ ጽሑፍ በቅርቡ ይጫናል።'}
                          </p>
                        ) : (
                          <p className="font-serif italic text-[#374151] text-sm md:text-base leading-loose whitespace-pre-line">
                            "{activeSermonModal.transcriptEn || 'English sermon transcript will be uploaded shortly.'}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Up Next / Related Sermons */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#855B09] border-b border-[#E6DFD1] pb-2">
                        {language === 'en' ? 'More Sermons in this Series:' : 'ተዛማጅ ስብከቶች:'}
                      </h4>
                      <div className="space-y-2">
                        {MOCK_SERMONS.filter((s) => s.id !== activeSermonModal.id).slice(0, 3).map((other) => (
                          <div
                            key={other.id}
                            onClick={() => {
                              setActiveSermonModal(other);
                              setSelectedSermonId(other.id);
                              if (other.audioTrackId) setActiveTrackId(other.audioTrackId);
                            }}
                            className="p-3 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#7C3AED] hover:bg-white cursor-pointer transition-all flex items-center justify-between gap-3 shadow-xs"
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-black font-geez text-[#2C1D07] truncate">{other.titleAmharic}</p>
                              <p className="text-[10px] text-[#6B7280] truncate">{other.preacher} • {other.duration}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                              <Play className="w-3 h-3 ml-0.5 fill-current" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

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

