import React, { useState, useMemo } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { MOCK_CHURCHES } from '../../data/mockChurches';
import type { Church } from '../../data/mockChurches';
import {
  Clock, Calendar, MapPin, Radio, Bell,
  Search, ChevronRight, Check,
  Compass, BookOpen,
  Bookmark, Sparkles, Cross,
  Users, Church as ChurchIcon,
  ArrowLeft, Flame
} from 'lucide-react';

interface ServicesScheduleViewProps {
  onSelectChurch: (church: Church) => void;
  onBackToFinder?: () => void;
}

export interface UpcomingServiceItem {
  id: string;
  category: 'EPISCOPAL LITURGY' | 'MAHLET VIGIL' | 'FASTING LITURGY' | 'PATRIARCHAL LITURGY' | 'SUNDAY SCHOOL' | 'EVENING WAZIM';
  titleEn: string;
  titleAm: string;
  churchId: string;
  churchName: string;
  churchNameAmharic: string;
  churchLocation: string;
  day: string;
  month: string;
  year: string;
  gregorianDate: string;
  ethiopianDate: string;
  time: string;
  languages: string;
  photoUrl: string;
  dateCategory: 'all' | 'today' | 'this_week' | 'this_month';
  streamingUrl?: string;
  iconType: 'chalice' | 'cross' | 'book' | 'candle' | 'flame';
}

const MOCK_UPCOMING_SERVICES: UpcomingServiceItem[] = [
  {
    id: 'srv-1',
    category: 'EPISCOPAL LITURGY',
    titleEn: 'Sunday Divine Liturgy & Eucharistic Celebration',
    titleAm: 'የሰንበት ማለዳ የበዓል ቅዳሴና ቅዱስ ቍርባን',
    churchId: 'holy-trinity',
    churchName: 'Holy Trinity Cathedral',
    churchNameAmharic: 'መንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል',
    churchLocation: 'Arat Kilo, Addis Ababa',
    day: '23',
    month: 'AUG',
    year: '2026',
    gregorianDate: 'Aug 23, 2026',
    ethiopianDate: 'ነሐሴ 17, 2018',
    time: '6:00 AM – 10:30 AM',
    languages: "Gē'ez • Amharic • English",
    photoUrl: '/assets/images/find_hero_cathedral.jpg',
    dateCategory: 'this_week',
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    iconType: 'cross'
  },
  {
    id: 'srv-2',
    category: 'MAHLET VIGIL',
    titleEn: 'All-Night Mahlet (Prayer Vigil)',
    titleAm: 'የሌሊት ማኅሌተ ያሬድና ዋዜማ',
    churchId: 'st-mary-bole',
    churchName: 'St. Mary Church',
    churchNameAmharic: 'ደብረ ምሕረት ቅድስት ማርያም ቤተ ክርስቲያን',
    churchLocation: 'Bole, Addis Ababa',
    day: '23',
    month: 'AUG',
    year: '2026',
    gregorianDate: 'Aug 23, 2026',
    ethiopianDate: 'ግንቦት 23, 2017',
    time: '8:00 PM – 5:00 AM',
    languages: "Gē'ez • Amharic",
    photoUrl: '/assets/images/holy_trinity_interior.jpg',
    dateCategory: 'this_week',
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    iconType: 'candle'
  },
  {
    id: 'srv-3',
    category: 'FASTING LITURGY',
    titleEn: 'Fasting Liturgy',
    titleAm: 'የጾም ቅዳሴ (፱ኛው ሰዓት)',
    churchId: 'st-george-lideta',
    churchName: 'St. George Church',
    churchNameAmharic: 'ደብረ ጽጌ ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን',
    churchLocation: 'Lideta, Addis Ababa',
    day: '04',
    month: 'JUN',
    year: '2026',
    gregorianDate: 'Jun 4, 2026',
    ethiopianDate: 'ግንቦት 27, 2017',
    time: '1:00 PM – 3:30 PM',
    languages: "Gē'ez • Amharic",
    photoUrl: '/assets/images/gondar_debre_birhan.jpg',
    dateCategory: 'this_month',
    iconType: 'chalice'
  },
  {
    id: 'srv-4',
    category: 'PATRIARCHAL LITURGY',
    titleEn: 'Patriarchal Divine Liturgy',
    titleAm: 'የመንበረ ፓትርያርክ የቅዱስ ሲኖዶስ ቅዳሴ',
    churchId: 'st-george-cathedral',
    churchName: 'St. George Cathedral',
    churchNameAmharic: 'ገነተ ጽጌ ቅዱስ ጊዮርጊስ ካቴድራል',
    churchLocation: 'Addis Ababa',
    day: '06',
    month: 'JUN',
    year: '2026',
    gregorianDate: 'Jun 6, 2026',
    ethiopianDate: 'ግንቦት 29, 2017',
    time: '6:00 AM – 11:00 AM',
    languages: "Gē'ez • Amharic • English",
    photoUrl: '/assets/images/holy_synod_assembly.jpg',
    dateCategory: 'this_month',
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    iconType: 'cross'
  }
];

export const ServicesScheduleView: React.FC<ServicesScheduleViewProps> = ({
  onSelectChurch,
  onBackToFinder
}) => {
  const { setActiveView } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedChurchFilter, setSelectedChurchFilter] = useState<string>('All');
  const [timeRange, setTimeRange] = useState<'all' | 'today' | 'this_week' | 'this_month'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['srv-1']));
  const [reminderIds, setReminderIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from saved services');
      } else {
        next.add(id);
        showToast('Service saved to bookmarks');
      }
      return next;
    });
  };

  const toggleReminder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReminderIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Service reminder cancelled');
      } else {
        next.add(id);
        showToast('Reminder set for Divine Service');
      }
      return next;
    });
  };

  // Filtered services
  const filteredServices = useMemo(() => {
    return MOCK_UPCOMING_SERVICES.filter(srv => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        srv.titleEn.toLowerCase().includes(q) ||
        srv.titleAm.includes(q) ||
        srv.churchName.toLowerCase().includes(q) ||
        srv.churchNameAmharic.includes(q) ||
        srv.churchLocation.toLowerCase().includes(q)
      );

      const matchesCat = selectedCategory === 'All' || srv.category === selectedCategory;
      const matchesLang = selectedLanguage === 'All' || srv.languages.includes(selectedLanguage);
      const matchesChurch = selectedChurchFilter === 'All' || srv.churchName === selectedChurchFilter;
      const matchesTime = timeRange === 'all' || srv.dateCategory === timeRange || (timeRange === 'this_month' && srv.dateCategory === 'this_week');

      return matchesSearch && matchesCat && matchesLang && matchesChurch && matchesTime;
    });
  }, [searchQuery, selectedCategory, selectedLanguage, selectedChurchFilter, timeRange]);

  const handleOpenChurch = (churchName: string) => {
    const found = MOCK_CHURCHES.find(c => 
      c.nameEnglish.toLowerCase().includes(churchName.toLowerCase()) || 
      churchName.toLowerCase().includes(c.nameEnglish.toLowerCase())
    ) || MOCK_CHURCHES[0];
    onSelectChurch(found);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2C1D07] min-h-screen font-serif antialiased pb-24">

      {/* ── Toast Notification ─────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3B2B] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#C8A84B] flex items-center gap-2 text-xs font-sans animate-fadeIn">
          <Check className="w-4 h-4 text-[#E5C158]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO BANNER WITH SACRED ALTAR PHOTO (1:1 with Screenshot)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative text-white pt-28 pb-16 overflow-hidden bg-[#061D16]">
        
        {/* Sacred Altar Background Photo on Right */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/services_hero_altar.jpg"
            alt="Illuminated Holy Gospel and Altar"
            className="w-full h-full object-cover object-right"
          />
          {/* Dark Forest Green Gradient fading from Left to Right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#061D16] via-[#061D16]/95 via-45% to-[#061D16]/30" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
        </div>

        <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="max-w-2xl space-y-4">
            
            {/* Small Gold Header Badge */}
            <div className="flex items-center gap-2 text-[#C8A84B] font-mono text-xs uppercase tracking-[0.22em] font-bold">
              <span>LITURGICAL SCHEDULE · GLOBAL PARISHES</span>
            </div>

            {/* Huge Serif Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.08]">
              Upcoming Services
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#D1D5DB] font-sans leading-relaxed">
              Discover Divine Liturgies, Mahlet Vigils<br className="hidden sm:inline" />
              and Parish Worship across EOTC Churches worldwide.
            </p>

            {/* Two Action Pill Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Button 1: Find Services Near Me (Dark Pill with Subtle Gold Border) */}
              <button
                onClick={() => {
                  setTimeRange('today');
                  const el = document.getElementById('services-list-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-full bg-[#051811] hover:bg-[#092b1f] border border-[#C8A84B]/60 text-white font-sans text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#C8A84B]" />
                <span>Find Services Near Me</span>
              </button>

              {/* Button 2: Select Your Church (Solid Gold Pill) */}
              <button
                onClick={() => onBackToFinder ? onBackToFinder() : setActiveView('find-a-church')}
                className="px-5 py-2.5 rounded-full bg-[#C8A84B] hover:bg-[#b89539] text-[#1A1208] font-sans text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ChurchIcon className="w-4 h-4 text-[#1A1208]" />
                <span>Select Your Church</span>
              </button>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          2. BREADCRUMBS & "THIS SUNDAY" FEATURED CARD
          ═══════════════════════════════════════════════════════════════ */}
      <main className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-6 space-y-8">
        
        {/* Back link */}
        <div>
          <button
            onClick={() => onBackToFinder ? onBackToFinder() : setActiveView('find-a-church')}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#7A6B56] hover:text-[#0B3B2B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Church Finder</span>
          </button>
        </div>

        {/* ── Featured "THIS SUNDAY" Banner (1:1 with Screenshot) ── */}
        <section className="bg-white border border-[#E7DFD1] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side: Service Details & CTAs */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Category Label */}
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
                THIS SUNDAY
              </span>

              {/* Big Title */}
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1814] leading-tight">
                Sunday Divine Liturgy & Eucharistic Celebration
              </h2>

              {/* Meta Tags Row */}
              <div className="space-y-1.5 text-xs font-sans text-[#5A4B35]">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#855B09]" />
                    <span className="font-semibold text-[#1C1814]">Aug 23, 2026</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#855B09]" />
                    <span className="font-geez font-semibold text-[#855B09]">ነሐሴ 17, 2018</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#855B09]" />
                  <span>6:00 AM – 10:30 AM</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#855B09]" />
                  <span>Holy Trinity Cathedral, Arat Kilo, Addis Ababa, Ethiopia</span>
                </div>
              </div>

              {/* Paragraph Description */}
              <p className="text-xs sm:text-sm text-[#5A4B35] font-sans leading-relaxed pt-1">
                Parishes worldwide commence Morning Divine Liturgy at 6:00 AM. Join the faithful for the Anaphora of St. Basil, St. Yared Digua choral hymns, and pastoral sermons.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenChurch('Holy Trinity Cathedral')}
                  className="px-5 py-2.5 rounded-xl bg-[#0B3B2B] hover:bg-[#07241B] text-white font-sans text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Join Service</span>
                </button>

                <a
                  href="https://youtube.com/@EOTCTvOfficial"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-[#FAF7F2] border border-[#C8A84B] text-[#855B09] font-sans text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Radio className="w-3.5 h-3.5 text-[#855B09] animate-pulse" />
                  <span>Watch Live</span>
                </a>
              </div>

            </div>

            {/* Right Side: Landscape Photo of Priest with Chalice */}
            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#E7DFD1] shadow-2xs bg-stone-100">
                <img
                  src="/assets/images/services_priest_liturgy.jpg"
                  alt="Priest raising Holy Chalice during Liturgy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </section>


        {/* ── 3. SUNDAY READINGS STRIP (1:1 with Screenshot) ───────── */}
        <section className="bg-[#FAF7F2] border border-[#E7DFD1] rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left Label */}
            <div className="shrink-0 lg:pr-6 lg:border-r lg:border-[#E7DFD1]">
              <span className="text-xs font-serif font-bold tracking-[0.18em] text-[#855B09] uppercase block">
                SUNDAY<br className="hidden lg:block" /> READINGS
              </span>
            </div>

            {/* 4 Reading Cards in a row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
              
              {/* Reading 1: Epistle */}
              <div className="bg-white border border-[#E2D8C7] rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B3B2B] text-[#E5C158] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#855B09] tracking-wider">EPISTLE</div>
                  <div className="text-xs font-bold text-[#1C1814] truncate font-sans">1 Corinthians 15:1–28</div>
                </div>
              </div>

              {/* Reading 2: Acts */}
              <div className="bg-white border border-[#E2D8C7] rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B3B2B] text-[#E5C158] flex items-center justify-center shrink-0">
                  <Cross className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#855B09] tracking-wider">ACTS</div>
                  <div className="text-xs font-bold text-[#1C1814] truncate font-sans">Acts 20:7–12</div>
                </div>
              </div>

              {/* Reading 3: Catholic Epistle */}
              <div className="bg-white border border-[#E2D8C7] rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B3B2B] text-[#E5C158] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#855B09] tracking-wider">CATHOLIC EPISTLE</div>
                  <div className="text-xs font-bold text-[#1C1814] truncate font-sans">1 Peter 2:1–10</div>
                </div>
              </div>

              {/* Reading 4: Holy Gospel */}
              <div className="bg-white border border-[#E2D8C7] rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0B3B2B] text-[#E5C158] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#855B09] tracking-wider">HOLY GOSPEL</div>
                  <div className="text-xs font-bold text-[#1C1814] truncate font-sans">John 6:35–58</div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            4. FULL-WIDTH MAIN SECTION: Filters + Services Table
            ═══════════════════════════════════════════════════════════════ */}
        {/* ═══════════════════════════════════════════════════════════════
            4. UPCOMING SERVICES LIST (Matching User Reference Design)
            ═══════════════════════════════════════════════════════════════ */}
        <div id="services-list-section" className="pt-4 space-y-8">
          
          {/* ── Search & Filter Controls Bar ────────────────────── */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Left Filter Controls */}
            <div className="flex flex-wrap items-center gap-2.5 flex-1">
              {/* Search input */}
              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <Search className="w-4 h-4 text-[#855B09] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by service, church, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-white border border-[#E5DFD5] rounded-xl text-xs text-[#2C1D07] font-sans placeholder:text-stone-400 focus:outline-none focus:border-[#0B3B2B] shadow-2xs"
                />
              </div>

              {/* Dropdown 1: Service Types */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2 bg-white border border-[#E5DFD5] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] shadow-2xs cursor-pointer"
              >
                <option value="All">All Service Types</option>
                <option value="EPISCOPAL LITURGY">Episcopal Liturgy</option>
                <option value="MAHLET VIGIL">Mahlet Vigil</option>
                <option value="FASTING LITURGY">Fasting Liturgy</option>
                <option value="PATRIARCHAL LITURGY">Patriarchal Liturgy</option>
              </select>

              {/* Dropdown 2: Languages */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3.5 py-2 bg-white border border-[#E5DFD5] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] shadow-2xs cursor-pointer"
              >
                <option value="All">All Languages</option>
                <option value="Ge'ez">Gē'ez (ግዕዝ)</option>
                <option value="Amharic">Amharic (አማርኛ)</option>
                <option value="English">English</option>
              </select>

              {/* Dropdown 3: Churches */}
              <select
                value={selectedChurchFilter}
                onChange={(e) => setSelectedChurchFilter(e.target.value)}
                className="px-3.5 py-2 bg-white border border-[#E5DFD5] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] shadow-2xs cursor-pointer max-w-[160px] truncate"
              >
                <option value="All">All Churches</option>
                <option value="Holy Trinity Cathedral">Holy Trinity Cathedral</option>
                <option value="St. Mary Church">St. Mary Church</option>
                <option value="St. George Church">St. George Church</option>
                <option value="St. George Cathedral">St. George Cathedral</option>
              </select>
            </div>

            {/* Right Date Filter Tabs */}
            <div className="flex items-center gap-1 bg-white border border-[#E5DFD5] rounded-xl p-1 shadow-2xs text-xs font-sans self-start lg:self-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'today', label: 'Today' },
                { id: 'this_week', label: 'This Week' },
                { id: 'this_month', label: 'This Month' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setTimeRange(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    timeRange === tab.id
                      ? 'bg-[#0E281F] text-white font-bold'
                      : 'text-[#5A4B35] hover:text-[#0E281F]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* ── Section Title ────────────────────────────────────── */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0E281F] tracking-tight">
              Upcoming Services
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B56] font-sans">
              Join us in prayer and worship across our churches.
            </p>
          </div>

          {/* ── Timeline + Service Items ─────────────────────────── */}
          <div className="relative">
            {/* Continuous Vertical Timeline Line */}
            <div className="absolute left-[88px] sm:left-[96px] top-6 bottom-6 w-[1.5px] bg-[#E5DFD5] hidden md:block" />

            <div className="space-y-8">
              {filteredServices.map((srv) => {
                const isBookmarked = bookmarkedIds.has(srv.id);
                const hasReminder = reminderIds.has(srv.id);

                return (
                  <div
                    key={srv.id}
                    className="relative flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6 pt-6 first:pt-0 border-t border-[#EAE4D9] first:border-t-0"
                  >
                    {/* Left: Date Block & Timeline Node */}
                    <div className="flex items-center md:items-start gap-3.5 md:w-[110px] shrink-0">
                      {/* Date Stack */}
                      <div className="w-14 text-center md:text-left">
                        <div className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1814] leading-none">
                          {srv.day}
                        </div>
                        <div className="text-[11px] font-bold tracking-wider text-[#855B09] font-mono mt-0.5">
                          {srv.month}
                        </div>
                        <div className="text-[11px] text-stone-500 font-sans">
                          {srv.year}
                        </div>
                      </div>

                      {/* Timeline Icon Node */}
                      <div className="relative z-10 w-9 h-9 rounded-full bg-[#0E281F] border-2 border-[#FAF7F2] shadow-sm flex items-center justify-center text-[#E5C158] shrink-0">
                        {srv.iconType === 'candle' ? (
                          <Flame className="w-4 h-4 text-[#E5C158]" />
                        ) : srv.iconType === 'chalice' ? (
                          <div className="w-3.5 h-3.5 rounded-full border border-[#E5C158] flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-[#E5C158] rounded-full" />
                          </div>
                        ) : (
                          <span className="font-serif font-bold text-sm text-[#E5C158] leading-none">†</span>
                        )}
                      </div>
                    </div>

                    {/* Service Row Main Content */}
                    <div className="flex-1 min-w-0 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 bg-transparent">
                      
                      {/* Thumbnail Image */}
                      <div className="relative w-full sm:w-72 md:w-80 h-44 sm:h-48 rounded-2xl overflow-hidden border border-[#E5DFD5] shadow-xs bg-stone-100 shrink-0">
                        <img
                          src={srv.photoUrl}
                          alt={srv.titleEn}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Middle: Details */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="text-[10px] font-mono font-bold tracking-widest text-[#855B09] uppercase">
                          {srv.category}
                        </div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold font-serif text-[#1C1814] leading-tight hover:text-[#0E281F] transition-colors">
                          {srv.titleEn}
                        </h3>
                        <div className="space-y-0.5 text-xs text-[#5A4B35] font-sans">
                          <div className="flex items-center gap-1.5 font-semibold text-[#2C1D07]">
                            <MapPin className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                            <span>{srv.churchName}</span>
                          </div>
                          <div className="pl-5 text-stone-500 text-[11px]">
                            {srv.churchLocation}
                          </div>
                        </div>
                        <div className="text-xs font-medium text-[#0E281F] pt-1">
                          {srv.languages}
                        </div>
                      </div>

                      {/* Right: Time, Date & Action Buttons */}
                      <div className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#EAE4D9]">
                        <div className="space-y-1.5 text-xs font-sans">
                          <div className="flex items-center gap-2 font-bold text-[#1C1814]">
                            <Clock className="w-4 h-4 text-[#855B09] shrink-0" />
                            <span>{srv.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#5A4B35] font-geez">
                            <Calendar className="w-4 h-4 text-[#855B09] shrink-0" />
                            <span>{srv.ethiopianDate}</span>
                          </div>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex items-center gap-2.5 pt-1">
                          <button
                            onClick={() => handleOpenChurch(srv.churchName)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0E281F] hover:bg-[#081B14] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                          >
                            <span>View Details</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#E5C158]" />
                          </button>

                          {/* Bookmark Button */}
                          <button
                            onClick={(e) => toggleBookmark(srv.id, e)}
                            title="Save service"
                            className="w-10 h-10 rounded-xl border border-[#D5C9B3] hover:border-[#0E281F] flex items-center justify-center text-[#0E281F] bg-white transition-colors cursor-pointer shrink-0"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#0E281F] text-[#0E281F]' : ''}`} />
                          </button>

                          {/* Reminder Bell Button */}
                          <button
                            onClick={(e) => toggleReminder(srv.id, e)}
                            title="Set reminder"
                            className="w-10 h-10 rounded-xl border border-[#D5C9B3] hover:border-[#0E281F] flex items-center justify-center text-[#0E281F] bg-white transition-colors cursor-pointer shrink-0"
                          >
                            <Bell className={`w-4 h-4 ${hasReminder ? 'fill-[#0E281F] text-[#0E281F]' : ''}`} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default ServicesScheduleView;
