import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/layout/LanguageContext';
import { CrossWatermark } from '../components/ui/CrossWatermark';
import { DiocesesDirectory } from '../components/dioceses/DiocesesDirectory';
import { SaintsDirectory } from '../components/saints/SaintsDirectory';
import { 
  PATRIARCH_BIO, 
  PATRIARCH_LINEAGE, 
  PATRIARCH_TEACHINGS,
  type PatriarchTeachingMessage
} from '../data/mockPatriarch';
import { 
  MOCK_HISTORY_TIMELINE, 
  MOCK_SYNOD_MEMBERS,
  MOCK_SYNOD_DECISIONS,
  MOCK_SYNOD_SCHEDULE,
  MOCK_HISTORICAL_SYNOD_DOCS,
  MOCK_HISTORICAL_FIGURES,
  type SynodMember,
  type SynodDecision,
  type HistoricalSynodDocument,
  type HistoricalFigure
} from '../data/mockChurchHub';
import { 
  Clock, 
  Award, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  Church, 
  Users, 
  BookOpen, 
  Globe, 
  Scroll, 
  Layers, 
  Search, 
  Quote, 
  Copy, 
  Check, 
  Calendar,
  Scale,
  Landmark,
  Compass
} from 'lucide-react';

export const OurChurchView: React.FC = () => {
  const { language, activeView, setActiveView } = useLanguage();
  const [subSection, setSubSection] = useState<'overview' | 'patriarch' | 'synod' | 'history' | 'saints' | 'dioceses'>('overview');

  // Patriarch-specific state
  const [selectedLineageEra, setSelectedLineageEra] = useState<'All' | 'Ancient Apostolic Era' | 'Middle Ages' | 'Modern Patriarchs'>('All');
  const [selectedTeachingCategory, setSelectedTeachingCategory] = useState<'All' | 'Pastoral Encyclical' | 'Feast Sermon' | 'Peace & Unity' | 'Youth & Education'>('All');
  const [selectedTeaching, setSelectedTeaching] = useState<PatriarchTeachingMessage | null>(null);
  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);

  // Holy Synod-specific state
  const [selectedSynodRegion, setSelectedSynodRegion] = useState<'All' | 'Patriarchate Administration' | 'Ethiopia' | 'Diaspora' | 'Holy Land & Foreign'>('All');
  const [synodSearchQuery, setSynodSearchQuery] = useState<string>('');
  const [selectedSynodMember, setSelectedSynodMember] = useState<SynodMember | null>(null);
  const [selectedDecisionCategory, setSelectedDecisionCategory] = useState<'All' | 'Canonical & Dogma' | 'Peace & Unity' | 'Diocesan Governance' | 'Monastic Heritage'>('All');
  const [selectedDecision, setSelectedDecision] = useState<SynodDecision | null>(null);
  const [selectedHistoricalDoc, setSelectedHistoricalDoc] = useState<HistoricalSynodDocument | null>(null);

  // Church History-specific state
  const [selectedHistoryEraFilter, setSelectedHistoryEraFilter] = useState<string>('All');
  const [selectedHistoricalFigure, setSelectedHistoricalFigure] = useState<HistoricalFigure | null>(null);


  useEffect(() => {
    if (activeView === 'our-church/patriarch') {
      setSubSection('patriarch');
    } else if (activeView === 'our-church/synod') {
      setSubSection('synod');
    } else if (activeView === 'our-church/history') {
      setSubSection('history');
    } else if (activeView === 'our-church/saints') {
      setSubSection('saints');
    } else if (activeView === 'our-church/dioceses') {
      setSubSection('dioceses');
    } else if (activeView === 'our-church') {
      setSubSection('overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeView]);

  const handleTabChange = (tabId: 'overview' | 'patriarch' | 'synod' | 'history' | 'saints' | 'dioceses') => {
    setSubSection(tabId);
    if (tabId === 'overview') {
      setActiveView('our-church');
    } else {
      setActiveView(`our-church/${tabId}`);
    }
  };


  return (
    <div className="space-y-12 animate-fadeIn">

      {/* =========================================================================
          VIEW 1: Main Our Church Hub (Overview)
          ========================================================================= */}
      {subSection === 'overview' && (
        <div className="space-y-16 animate-fadeIn -mt-8 -mx-4 sm:-mx-8 lg:-mx-12">
          
          {/* ═══════════════════════════════════════════
              1. HERO SECTION WITH CURVED GOLD BORDER
          ═══════════════════════════════════════════ */}
          <div className="relative bg-[#120B05] text-white overflow-hidden min-h-[540px] md:min-h-[620px] flex items-center">
            {/* Background Cathedral Image on Right */}
            <div 
              className="absolute inset-0 bg-cover bg-right md:bg-[center_right] opacity-85 mix-blend-luminosity scale-100 transition-transform duration-1000"
              style={{ backgroundImage: "url('/assets/images/our_church_hero_cathedral.jpg')" }}
            />
            {/* Dark & Gold Gradient Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E0803] via-[#120B05]/95 md:via-[#120B05]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0803] via-transparent to-transparent opacity-85" />

            {/* Sacred Ethiopian Cross Watermark behind text */}
            <CrossWatermark size="xl" opacity={12} position="left" className="hidden md:block" />

            <div className="relative z-10 max-w-[1480px] mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-[72px] pt-[130px] pb-[85px]">
              <div className="max-w-2xl space-y-6">
                
                {/* Ge'ez Top Subtitle */}
                <div className="text-xs md:text-sm font-geez font-bold text-[#E5C158] tracking-widest drop-shadow-sm">
                  አንዲት ሃይማኖት አንዲት ቤተ ክርስቲያን አንዲት ቅርስ
                </div>

                {/* Main Heading: "Our" in White, "Church" in Gold */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-serif tracking-tight leading-tight drop-shadow-md">
                  <span className="text-white">Our </span>
                  <span className="text-[#C8A84B]">Church</span>
                </h1>

                {/* Fine Horizontal Gold Line & Centered Ethiopian Cross Motif */}
                <div className="flex items-center gap-3 py-1">
                  <div className="w-16 h-px bg-[#C8A84B]/70" />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]">
                    <path d="M12 2V22M2 12H22M7 7L17 17M7 17L17 7" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  <div className="w-16 h-px bg-[#C8A84B]/70" />
                </div>

                {/* Subtitle / Tagline */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#C8A84B] leading-snug">
                  One Faith. One Church. One Heritage.
                </h2>

                {/* Paragraph */}
                <p className="text-xs sm:text-sm md:text-base text-[#D1D5DB] leading-relaxed font-body drop-shadow-xs max-w-xl">
                  {language === 'am'
                    ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በዓለም ላይ ካሉ እጅግ ጥንታዊ እና ዘላቂ ከሆኑ የክርስትና ተቋማት አንዷ ናት። ቅዱስ ቅርሳችንን፣ መለኮታዊ መዋቅራችንን እና ዓለም አቀፍ መንፈሳዊ ተልእኳችንን ይመርምሩ።'
                    : "The Ethiopian Orthodox Tewahedo Church is one of the world's oldest and most enduring Christian institutions. Explore our sacred heritage, established structure, and spiritual mission to the world."}
                </p>

                {/* Two Action Buttons: "Our History" & "Our Structure" */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* Button 1: Solid Gold */}
                  <button
                    onClick={() => handleTabChange('history')}
                    className="px-6 py-3 rounded-xl bg-[#C8A84B] hover:bg-[#B8860B] text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-white" />
                    <span>Our History</span>
                  </button>

                  {/* Button 2: Gold Outlined */}
                  <button
                    onClick={() => {
                      document.getElementById('explore-church')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-xl bg-transparent hover:bg-[#C8A84B]/15 border border-[#C8A84B] text-[#E5C158] font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer"
                  >
                    <Church className="w-4 h-4 text-[#E5C158]" />
                    <span>Our Structure</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Swoop Curve with Gold Border & Center Cross Motif */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-16 text-[#FAF8F3]">
                <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" fill="currentColor" />
                <path d="M0,0 C300,90 900,90 1200,0" fill="none" stroke="#C8A84B" strokeWidth="3" />
              </svg>
              {/* Centered Cross Emblem Node on the curve */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0E0803] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg pointer-events-auto">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]">
                  <path d="M12 3V21M3 12H21M7 7L17 17M7 17L17 7" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

          </div>

          <div className="max-w-[1480px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[72px] space-y-16" id="explore-church">

            {/* ═══════════════════════════════════════════
                2. EXPLORE THE CHURCH (7 PILLARS)
            ═══════════════════════════════════════════ */}
            <section className="space-y-8 text-center">
              
              {/* Header Titles */}
              <div className="space-y-3 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-widest text-[#855B09]">
                  <span className="w-8 h-px bg-[#C8A84B]" />
                  <span>EXPLORE THE CHURCH</span>
                  <span className="w-8 h-px bg-[#C8A84B]" />
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2C1D07] font-serif">
                  {language === 'am'
                    ? 'ቅዱስ ቅርሳችንንና ሕያው ባህላችንን ይወቁ'
                    : 'Discover Our Sacred Heritage and Living Tradition'}
                </h2>

                {/* Diamond Line Motif */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="w-12 h-px bg-[#E6DFD1]" />
                  <div className="w-2 h-2 rotate-45 border border-[#C8A84B] bg-[#FFF8E7]" />
                  <div className="w-12 h-px bg-[#E6DFD1]" />
                </div>
              </div>

              {/* 7 Pillar Icons Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 pt-4">
                {[
                  {
                    id: 'patriarch',
                    title: 'Patriarch',
                    desc: 'Our spiritual father and shepherd',
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M10 4h4M7 9a5 5 0 0 1 10 0v2a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9z"/>
                        <path d="M6 19a6 6 0 0 1 12 0v3H6v-3z"/>
                        <circle cx="12" cy="10" r="1.5"/>
                      </svg>
                    ),
                    action: () => handleTabChange('patriarch'),
                  },
                  {
                    id: 'synod',
                    title: 'Holy Synod',
                    desc: 'The supreme spiritual and administrative body',
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="3"/>
                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                        <circle cx="5" cy="10" r="2"/>
                        <path d="M2 21v-1a3 3 0 0 1 3-3"/>
                        <circle cx="19" cy="10" r="2"/>
                        <path d="M22 21v-1a3 3 0 0 0-3-3"/>
                        <path d="M12 2v2M11 3h2"/>
                      </svg>
                    ),
                    action: () => handleTabChange('synod'),
                  },
                  {
                    id: 'dioceses',
                    title: 'Dioceses',
                    desc: "Jurisdictions guiding the Church's mission",
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v3M10.5 4.5h3M6 9l6-4 6 4v11H6V9z"/>
                        <path d="M10 20v-5a2 2 0 0 1 4 0v5"/>
                        <path d="M2 12h4M18 12h4"/>
                      </svg>
                    ),
                    action: () => handleTabChange('dioceses'),
                  },
                  {
                    id: 'churches',
                    title: 'Churches',
                    desc: 'Parishes and communities of faith and worship',
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v3M10.5 3.5h3M4 11l8-6 8 6v9H4v-9z"/>
                        <path d="M10 20v-4a2 2 0 0 1 4 0v4"/>
                        <circle cx="12" cy="11" r="1.5"/>
                      </svg>
                    ),
                    action: () => setActiveView('find-a-church'),
                  },
                  {
                    id: 'monasteries',
                    title: 'Monasteries',
                    desc: 'Centers of prayer, asceticism, and holiness',
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21h18M5 21V9l7-5 7 5v12"/>
                        <path d="M9 13a3 3 0 0 1 6 0v8H9v-8z"/>
                        <path d="M12 2v2M11 3h2"/>
                      </svg>
                    ),
                    action: () => handleTabChange('history'),
                  },
                  {
                    id: 'history',
                    title: 'Church History',
                    desc: 'The journey of faith through the ages',
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 2h8a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z"/>
                        <path d="M9 7h6M9 11h6M9 15h4"/>
                      </svg>
                    ),
                    action: () => handleTabChange('history'),
                  },
                  {
                    id: 'saints',
                    title: 'Saints',
                    desc: 'Holy men and women, our intercessors',
                    icon: (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="3.5"/>
                        <path d="M6 21v-2a6 6 0 0 1 12 0v2H6z"/>
                        <path d="M12 2a6.5 6.5 0 0 0-6.5 6.5"/>
                        <path d="M12 2a6.5 6.5 0 0 1 6.5 6.5"/>
                      </svg>
                    ),
                    action: () => handleTabChange('saints'),
                  },
                ].map((pillar) => (
                  <div
                    key={pillar.id}
                    onClick={pillar.action}
                    className="flex flex-col items-center text-center space-y-2.5 p-4 rounded-2xl bg-white border border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    {/* Circle Icon Badge */}
                    <div className="w-14 h-14 rounded-full border border-[#C8A84B]/40 bg-[#FAF8F3] group-hover:bg-[#FFF5DB] group-hover:border-[#C8A84B] flex items-center justify-center text-[#855B09] transition-all transform group-hover:scale-105 shadow-xs">
                      {pillar.icon}
                    </div>

                    <h3 className="font-bold text-sm text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-[11px] text-[#6B7280] leading-snug line-clamp-2">
                      {pillar.desc}
                    </p>

                    <span className="text-[#C8A84B] group-hover:text-[#855B09] font-bold text-sm transform group-hover:translate-x-1 transition-transform pt-1">
                      →
                    </span>
                  </div>
                ))}
              </div>

            </section>

            {/* ═══════════════════════════════════════════
                3. DEEP NAVY KEY STATISTICS BANNER
            ═══════════════════════════════════════════ */}
            <section className="bg-[#0A1C2E] text-white rounded-3xl p-8 md:p-12 border border-[#C8A84B]/40 shadow-xl relative overflow-hidden">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A84B]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1A3A5C]/40 rounded-full blur-2xl pointer-events-none" />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10 relative z-10">
                
                {/* Stat 1: 4th Century AD */}
                <div className="flex flex-col items-center text-center space-y-2 pt-4 sm:pt-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C8A84B]/40 flex items-center justify-center mb-1">
                    <Church className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white">
                    4th Century AD
                  </div>
                  <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">
                    Ancient Christian Heritage
                  </p>
                </div>

                {/* Stat 2: 700+ */}
                <div className="flex flex-col items-center text-center space-y-2 pt-4 sm:pt-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C8A84B]/40 flex items-center justify-center mb-1">
                    <Users className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white">
                    700+
                  </div>
                  <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">
                    Churches & Parishes
                  </p>
                </div>

                {/* Stat 3: 50+ */}
                <div className="flex flex-col items-center text-center space-y-2 pt-4 sm:pt-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C8A84B]/40 flex items-center justify-center mb-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]">
                      <path d="M12 2V22M4 9H20M8 5L16 13M8 13L16 5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white">
                    50+
                  </div>
                  <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">
                    Dioceses & Jurisdictions
                  </p>
                </div>

                {/* Stat 4: Worldwide */}
                <div className="flex flex-col items-center text-center space-y-2 pt-4 sm:pt-0">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C8A84B]/40 flex items-center justify-center mb-1">
                    <Globe className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-white">
                    Worldwide
                  </div>
                  <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">
                    Faithful in Every Continent
                  </p>
                </div>

              </div>
            </section>

            {/* ═══════════════════════════════════════════
                4. FEATURED FROM OUR CHURCH (4-CARD GRID)
            ═══════════════════════════════════════════ */}
            <section className="space-y-8">
              
              {/* Header Title with Diamond Line */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2C1D07] font-serif">
                  Featured From Our Church
                </h2>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="w-12 h-px bg-[#E6DFD1]" />
                  <div className="w-2 h-2 rotate-45 border border-[#C8A84B] bg-[#FFF8E7]" />
                  <div className="w-12 h-px bg-[#E6DFD1]" />
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: Featured Diocese */}
                <div
                  onClick={() => handleTabChange('dioceses')}
                  className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src="/assets/images/our_church_hero_cathedral.jpg"
                      alt="Addis Ababa Diocese"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] block">
                        FEATURED DIOCESE
                      </span>
                      <h3 className="text-base font-bold text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors">
                        Addis Ababa Diocese
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Explore its churches, monasteries, and spiritual activities.
                      </p>
                    </div>
                    <div className="flex justify-end pt-2 text-[#C8A84B] font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </div>

                {/* Card 2: Featured Church */}
                <div
                  onClick={() => setActiveView('find-a-church')}
                  className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src="/assets/images/holy_trinity_interior.jpg"
                      alt="Holy Trinity Cathedral"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] block">
                        FEATURED CHURCH
                      </span>
                      <h3 className="text-base font-bold text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors">
                        Holy Trinity Cathedral
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        A beacon of faith and liturgical prayer in the heart of Addis Ababa.
                      </p>
                    </div>
                    <div className="flex justify-end pt-2 text-[#C8A84B] font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </div>

                {/* Card 3: Featured Saint */}
                <div
                  onClick={() => handleTabChange('saints')}
                  className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src="/assets/images/saint_teklehaymanot_icon.jpg"
                      alt="Saint Tekle Haymanot"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] block">
                        FEATURED SAINT
                      </span>
                      <h3 className="text-base font-bold text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors">
                        Saint Tekle Haymanot
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        The enlightener of Ethiopia and our revered heavenly intercessor.
                      </p>
                    </div>
                    <div className="flex justify-end pt-2 text-[#C8A84B] font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </div>

                {/* Card 4: Latest Message */}
                <div
                  onClick={() => handleTabChange('patriarch')}
                  className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src="/assets/images/sermon_prayer_candle.jpg"
                      alt="Message from the Patriarch"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#855B09] block">
                        LATEST MESSAGE
                      </span>
                      <h3 className="text-base font-bold text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors">
                        Message from the Patriarch
                      </h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Spiritual guidance, apostolic blessing, and peace for the faithful worldwide.
                      </p>
                    </div>
                    <div className="flex justify-end pt-2 text-[#C8A84B] font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ═══════════════════════════════════════════
                5. OUR PATRIARCH HERO SPLIT CARD
            ═══════════════════════════════════════════ */}
            <section className="bg-[#FFFBF2] rounded-3xl border border-[#E6DFD1] shadow-md p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              
              {/* Sacred Ethiopian Cross Watermark on the right */}
              <CrossWatermark size="lg" opacity={12} position="right" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left: Patriarch Photo with Processional Cross */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border-2 border-[#C8A84B]/50">
                    <img
                      src="/assets/images/patriarch_hero.png"
                      alt="His Holiness Abune Mathias I"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Right: Patriarch Info & Message CTA */}
                <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#855B09] block">
                    OUR PATRIARCH
                  </span>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2C1D07] font-serif">
                    His Holiness Abune Mathias I
                  </h3>

                  <h4 className="text-sm sm:text-base font-semibold text-[#855B09] font-geez">
                    Patriarch of the Ethiopian Orthodox Tewahedo Church
                  </h4>

                  <p className="text-xs sm:text-sm md:text-base text-[#4A3B22] leading-relaxed max-w-xl">
                    "Guiding the Church with wisdom, humility, and unwavering faithfulness to the Gospel and the sacred traditions of our holy fathers."
                  </p>

                  <div className="pt-3">
                    <button
                      onClick={() => handleTabChange('patriarch')}
                      className="px-6 py-3 rounded-xl bg-[#C8A84B] hover:bg-[#B8860B] text-[#1A2C1C] font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Read His Holiness's Message</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

              </div>

            </section>

            {/* ═══════════════════════════════════════════
                6. FIND A CHURCH NEAR YOU BOTTOM CTA BANNER
            ═══════════════════════════════════════════ */}
            <section className="bg-[#0A1C2E] text-white rounded-3xl p-8 md:p-10 border border-[#C8A84B]/40 shadow-xl relative overflow-hidden">
              
              {/* Subtle Cathedral Skyline Silhouettes in Background */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-between pointer-events-none px-6">
                <Church className="w-32 h-32 text-white" />
                <Church className="w-40 h-40 text-white hidden sm:block" />
                <Church className="w-32 h-32 text-white" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  {/* Yellow/Gold Circular Map Pin Node */}
                  <div className="w-16 h-16 rounded-full bg-[#E5C158] text-[#1A2C1C] flex items-center justify-center shrink-0 shadow-lg border-2 border-white/40">
                    <MapPin className="w-8 h-8 fill-current" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Find a Church Near You
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
                      Join us in prayer and experience the beauty of the Orthodox faith in your local community.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView('find-a-church')}
                  className="px-6 py-3 rounded-xl bg-[#E5C158] hover:bg-[#D4AF37] text-[#1A2C1C] font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all shrink-0 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Find a Church</span>
                  <span>→</span>
                </button>

              </div>

            </section>

          </div>

        </div>
      )}

      {/* =========================================================================
          VIEW 2: Patriarch Page (Hero, Biography, Pastoral Letter, Lineage, Teachings)
          ========================================================================= */}
      {subSection === 'patriarch' && (
        <div className="space-y-16 animate-fadeIn -mt-8 -mx-4 sm:-mx-8 lg:-mx-12">
          
          {/* ═══════════════════════════════════════════
              1. REAL PATRIARCH HERO SECTION (SPLIT LUXURY SACRED EDITORIAL)
          ═══════════════════════════════════════════ */}
          <div className="relative bg-[#040D07] text-white overflow-hidden min-h-[560px] md:min-h-[640px] flex items-center">
            {/* Background Full-width Image: Clear on Right, Blurring to Left */}
            <div 
              className="absolute inset-0 bg-cover bg-right md:bg-[center_right] scale-100 transition-transform duration-1000"
              style={{ backgroundImage: "url('/assets/images/patriarch_hero_blend.jpg')" }}
            />

            {/* Dark Emerald & Black Gradient Overlay (Solid on Left, Dissolving to Right) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030A06] via-[#040E08]/95 via-45% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030A06] via-transparent to-transparent opacity-90" />

            {/* Sacred Ethiopian Cross Watermark behind text */}
            <CrossWatermark size="xl" opacity={12} position="left" className="hidden lg:block -translate-x-1/6" />

            {/* Main Content Grid */}
            <div className="relative z-10 max-w-[1480px] mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-[72px] pt-[130px] pb-[100px]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* ── LEFT COLUMN: ELEGANT SACRED TYPOGRAPHY & CTA ── */}
                <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
                  
                  {/* Top Golden Ethiopian Cross Symbol with Divine Glow */}
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#E5C158]">
                        <path d="M12 2V22M4 9H20M7 6L17 16M7 16L17 6" stroke="#E5C158" strokeWidth="2.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Subtitle Badge */}
                  <div className="text-[11px] md:text-xs font-extrabold uppercase tracking-[0.25em] text-[#C8A84B]">
                    SUPREME PATRIARCH OF ETHIOPIA
                  </div>

                  {/* Main Serif Heading: "His Holiness" (White) + "Abune Mathias I" (Gold) */}
                  <div className="space-y-1">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-tight drop-shadow-md">
                      <span className="text-white block">His Holiness</span>
                      <span className="text-[#E5C158] block">Abune Mathias I</span>
                    </h1>

                    {/* Amharic Heading */}
                    <div className="text-xl sm:text-2xl font-geez font-bold text-[#E5C158] pt-1">
                      ብፁዕ ወቅዱስ አቡነ ማትያስ ቀዳማዊ
                    </div>
                  </div>

                  {/* Canonical Ecclesiastical Title */}
                  <p className="text-xs sm:text-sm md:text-base text-[#D1D5DB] leading-relaxed font-body max-w-xl">
                    Catholicos Patriarch of Ethiopia, Archbishop of Axum, and Ichege of the See of Saint Tekle Haymanot.
                  </p>

                  {/* Ornamental Diamond / Cross Knot Divider */}
                  <div className="flex items-center justify-center lg:justify-start gap-3 py-1">
                    <div className="w-14 h-px bg-[#C8A84B]/60" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#E5C158]">
                      <path d="M12 2L22 12L12 22L2 12Z" stroke="#E5C158" strokeWidth="2" fill="#E5C158" fillOpacity="0.3"/>
                    </svg>
                    <div className="w-14 h-px bg-[#C8A84B]/60" />
                  </div>

                  {/* Dual Spiritual Motto Quotes */}
                  <div className="space-y-1 font-serif italic text-xs sm:text-sm">
                    <p className="text-[#E5C158]">“Faith, Unity, and Love in Christ.”</p>
                    <p className="text-[#C8A84B] font-geez not-italic text-xs sm:text-sm">“በክርስቶስ የእምነት ፣ አንድነትና ፍቅር”</p>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                    {/* Primary Button */}
                    <button
                      onClick={() => {
                        document.getElementById('patriarch-bio')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-full bg-[#E5C158] hover:bg-[#D4AF37] text-[#0C1A10] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#0C1A10]" />
                      <span>Learn More About Our Patriarch</span>
                      <span>→</span>
                    </button>

                    {/* Secondary Watch Message Button */}
                    <button
                      onClick={() => {
                        if (PATRIARCH_TEACHINGS.length > 0) {
                          setSelectedTeaching(PATRIARCH_TEACHINGS[0]);
                        }
                      }}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 backdrop-blur-md transition-all cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        ▶
                      </span>
                      <span>Watch Message</span>
                    </button>
                  </div>

                </div>

                {/* ── RIGHT COLUMN: SPACER SO BACKGROUND PORTRAIT IS VISIBLE ── */}
                <div className="lg:col-span-6 hidden lg:block min-h-[420px]" />

              </div>
            </div>

            {/* ═══════════════════════════════════════════
                BOTTOM 4-PILLAR STAT / FEATURE STRIP
            ═══════════════════════════════════════════ */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#030905]/95 backdrop-blur-md border-t border-[#C8A84B]/30 py-4 px-6 md:px-14 z-20">
              <div className="container mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#C8A84B]/20 text-center sm:text-left">
                
                {/* Pillar 1: Spiritual Leader */}
                <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4 first:pl-0">
                  <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#E5C158]">
                      <path d="M12 2V22M4 9H20M7 6L17 16M7 16L17 6" stroke="#E5C158" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Spiritual Leader</h4>
                    <p className="text-[11px] text-[#94A3B8]">of 60+ Million Faithful</p>
                  </div>
                </div>

                {/* Pillar 2: Guardian of 1,700+ Years */}
                <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center shrink-0">
                    <Church className="w-4 h-4 text-[#E5C158]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Guardian of 1,700+ Years</h4>
                    <p className="text-[11px] text-[#94A3B8]">of Apostolic Faith</p>
                  </div>
                </div>

                {/* Pillar 3: Defender of the True Faith */}
                <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-[#E5C158]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Defender of the True Faith</h4>
                    <p className="text-[11px] text-[#94A3B8]">Ethiopian Orthodox Tewahedo Church</p>
                  </div>
                </div>

                {/* Pillar 4: Shepherd of Unity */}
                <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-4 last:pr-0">
                  <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#E5C158]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white font-serif">Shepherd of Unity, Peace & Love</h4>
                    <p className="text-[11px] text-[#94A3B8]">in Christ</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="max-w-[1480px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[72px] space-y-16" id="patriarch-bio">

            {/* 2. BIOGRAPHY & MINISTRY SECTION */}
            <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-xs space-y-10">
            <div className="border-b border-[#E6DFD1] pb-6 space-y-2">
              <span className="badge-gold text-[10px] uppercase font-bold">LIFE & SERVICE</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">
                {language === 'am' ? 'የሕይወት ታሪክና ሐዋርያዊ አገልግሎት' : 'Biography & Apostolic Ministry'}
              </h2>
              <p className="text-sm text-[#6B7280]">
                {language === 'am'
                  ? 'ከገዳማዊ ምንኩስና ሕይወት እስከ መንበረ ፓትርያርክ ሢመት ያለው መንፈሳዊ ጉዞ'
                  : 'From monastic beginnings at Debre Chohé to the Patriarchal Throne of Saint Tekle Haymanot.'}
              </p>
            </div>

            {/* Life Story Text */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-sm md:text-base text-[#4A3B22] leading-relaxed">
                <h3 className="text-lg font-bold text-[#2C1D07] font-serif flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#855B09]" />
                  <span>Early Life, Monastic Formation & Election</span>
                </h3>
                <p>
                  His Holiness Abune Mathias was born <strong>Teklemariam Asrat</strong> in 1941 E.C. in Seza, Agame, Tigray. At an early age, he answered the monastic calling and entered the celebrated ancient monastery of <strong>Debre Chohé (ደብረ ጮሔ)</strong>, immersing himself in Saint Yared’s sacred Zema, Ge'ez poetic compositions (Qine), and traditional biblical exegesis.
                </p>
                <p>
                  After his monastic tonsure and priestly ordination, he was consecrated as <strong>Bishop of Jerusalem</strong> in 1978 GC by Patriarch Abune Tekle Haymanot, vigorously stewarding Ethiopia’s centuries-old rights in the Holy Land. Later elevated as <strong>Archbishop of North America</strong>, he founded dozens of new parishes and fostered multilingual youth catechism.
                </p>
                <p className="bg-[#FFF8E7] p-4 rounded-xl border-l-4 border-[#C8A84B] italic text-xs md:text-sm text-[#2C1D07]">
                  "On February 28, 2013, the Holy Synod and Electoral Assembly unanimously elected Abune Mathias as the 6th Catholicos Patriarch. On March 3, 2013, he was solemnized at Holy Trinity Cathedral in the presence of sister Oriental Orthodox Patriarchs."
                </p>
              </div>

              {/* Ministry Milestones Timeline */}
              <div className="lg:col-span-5 bg-[#FAF8F3] p-6 rounded-2xl border border-[#E6DFD1] space-y-4">
                <h3 className="text-base font-bold text-[#2C1D07] font-serif flex items-center gap-2 border-b border-[#E6DFD1] pb-3">
                  <Clock className="w-4 h-4 text-[#855B09]" />
                  <span>Key Ministry Milestones</span>
                </h3>

                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E6DFD1]">
                  {PATRIARCH_BIO.ministryMilestones.map((m, idx) => (
                    <div key={idx} className="pl-8 relative group">
                      <div className="absolute left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#C8A84B] border-2 border-white shadow-sm" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-[#855B09] bg-[#FFF5DB] px-2 py-0.5 rounded border border-[#E6DFD1]">
                          {m.year} • {m.yearAmharic}
                        </span>
                        <h4 className="text-xs font-bold text-[#2C1D07] pt-1">{m.title}</h4>
                        <p className="text-[11px] text-[#6B7280] leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pastoral Priorities */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-3">
                <h3 className="text-lg font-bold text-[#2C1D07] font-serif flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#855B09]" />
                  <span>Patriarchal Pastoral Priorities (የአመራር ዋና አቅጣጫዎች)</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PATRIARCH_BIO.pastoralPriorities.map((priority) => (
                  <div
                    key={priority.id}
                    className="bg-[#FAF8F3] hover:bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] border border-[#C8A84B]/40 flex items-center justify-center text-[#855B09]">
                        <Sparkles className="w-5 h-5 text-[#C8A84B]" />
                      </div>
                      <h4 className="font-bold text-sm text-[#2C1D07] font-geez">{priority.titleAmharic}</h4>
                      <p className="text-xs font-semibold text-[#855B09]">{priority.titleEnglish}</p>
                      <p className="text-xs text-[#6B7280] leading-relaxed pt-1">{priority.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. LATEST PASTORAL LETTER SECTION: Auto-updated Official Message */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border-2 border-[#C8A84B] shadow-md space-y-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="badge-gold text-[10px] font-bold">OFFICIAL PATRIARCHAL ENCYCLICAL</span>
                  <span className="text-[10px] font-mono text-[#855B09] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E6DFD1]">
                    Ref: {PATRIARCH_BIO.latestPastoralLetter.refNumber}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">
                  {language === 'am' ? 'የቅርብ ጊዜ አባታዊ መልእክት' : 'Latest Patriarchal Pastoral Letter'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(PATRIARCH_BIO.latestPastoralLetter.fullText);
                    setCopiedLetter(true);
                    setTimeout(() => setCopiedLetter(false), 2500);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border border-[#E6DFD1] hover:bg-[#FAF8F3] text-[#2C1D07] flex items-center gap-1.5 transition-all"
                >
                  {copiedLetter ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-[#855B09]" />}
                  <span>{copiedLetter ? 'Copied' : 'Copy Message'}</span>
                </button>
              </div>
            </div>

            {/* Letter Meta */}
            <div className="bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-[#E6DFD1] flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-[#2C1D07]">
                  {PATRIARCH_BIO.latestPastoralLetter.title}
                </h3>
                <h4 className="text-sm font-semibold text-[#855B09] font-geez">
                  {PATRIARCH_BIO.latestPastoralLetter.titleAmharic}
                </h4>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[#C8A84B]" />
                  <span>{PATRIARCH_BIO.latestPastoralLetter.date} ({PATRIARCH_BIO.latestPastoralLetter.ethiopianDate})</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span className="text-[#855B09] font-bold">{PATRIARCH_BIO.latestPastoralLetter.readTime}</span>
              </div>
            </div>

            {/* Full Formatted Letter Body */}
            <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF8F3] to-[#FFF8E7] p-6 sm:p-10 rounded-2xl border border-[#E6DFD1] text-sm md:text-base text-[#2C1D07] font-geez leading-loose whitespace-pre-line relative shadow-inner">
              <Quote className="w-12 h-12 text-[#C8A84B]/20 absolute top-4 left-4 pointer-events-none" />
              {PATRIARCH_BIO.latestPastoralLetter.fullText}
              <Quote className="w-12 h-12 text-[#C8A84B]/20 absolute bottom-4 right-4 pointer-events-none rotate-180" />
            </div>
          </section>

          {/* 4. PATRIARCHAL LINEAGE: Timeline from Frumentius to Present */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">APOSTOLIC SUCCESSION</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#855B09]" />
                  <span>{language === 'am' ? 'የፓትርያርኮችና ሊቃነ ጳጳሳት ተከታታይ ታሪክ' : 'Patriarchal Lineage of Ethiopia'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  From St. Frumentius (Abune Salama Kesate Birhan, 330 AD) to the 6th Catholicos Patriarch
                </p>
              </div>

              {/* Era Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {(['All', 'Ancient Apostolic Era', 'Middle Ages', 'Modern Patriarchs'] as const).map((era) => (
                  <button
                    key={era}
                    onClick={() => setSelectedLineageEra(era)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedLineageEra === era
                        ? 'bg-[#C8A84B] text-[#1A2C1C]'
                        : 'text-[#6B7280] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            {/* Lineage Timeline List */}
            <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E6DFD1]">
              {PATRIARCH_LINEAGE
                .filter((p) => selectedLineageEra === 'All' || p.eraCategory === selectedLineageEra)
                .map((pat) => (
                  <div key={pat.number} className="pl-14 relative group">
                    <div className="absolute left-[20px] top-4 w-4 h-4 rounded-full bg-[#C8A84B] border-4 border-white shadow-sm z-10 group-hover:scale-125 transition-transform" />
                    <div className="bg-[#FAF8F3] hover:bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-md transition-all space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#855B09] font-mono bg-[#FFF8E7] px-2 py-0.5 rounded border border-[#E6DFD1]">
                            #{pat.number}
                          </span>
                          <span className="font-bold text-[#2C1D07] font-geez text-base sm:text-lg">
                            {pat.nameAmharic}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#855B09] font-bold bg-white px-2 py-0.5 rounded border border-[#E6DFD1]">
                            {pat.eraCategory}
                          </span>
                          <span className="text-[#6B7280] font-mono text-xs bg-white px-2.5 py-1 rounded-md border border-[#E6DFD1]">
                            {pat.reignPeriod}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-[#855B09]">{pat.nameEnglish}</p>
                      <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed pt-1">
                        {pat.keyContributions}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* 5. TEACHINGS & MESSAGES: Sermons, Speeches & Official Statements */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">ARCHIVE OF TEACHINGS</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#855B09]" />
                  <span>{language === 'am' ? 'ትምህርቶች፣ ስብከቶችና ይፋዊ መግለጫዎች' : 'Teachings, Sermons & Official Messages'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Browse pastoral homilies, seasonal feast encyclicals, and ecclesiastical addresses by His Holiness.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {(['All', 'Pastoral Encyclical', 'Feast Sermon', 'Peace & Unity', 'Youth & Education'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedTeachingCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedTeachingCategory === cat
                        ? 'bg-[#C8A84B] text-[#1A2C1C]'
                        : 'text-[#6B7280] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Teachings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PATRIARCH_TEACHINGS
                .filter((t) => selectedTeachingCategory === 'All' || t.category === selectedTeachingCategory)
                .map((teaching) => (
                  <div
                    key={teaching.id}
                    onClick={() => setSelectedTeaching(teaching)}
                    className="bg-[#FAF8F3] hover:bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="badge-gold text-[9px]">{teaching.category}</span>
                        <span className="text-[11px] text-[#6B7280] flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C8A84B]" />
                          {teaching.date}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                        {teaching.titleAmharic}
                      </h3>
                      <h4 className="text-xs font-semibold text-[#855B09]">{teaching.titleEnglish}</h4>

                      <div className="text-[11px] text-[#6B7280] italic">
                        <strong>Occasion:</strong> {teaching.occasion}
                      </div>

                      <p className="text-xs text-[#4A3B22] line-clamp-3 leading-relaxed pt-1">
                        {teaching.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                      <span>Read Full Statement</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>

            {/* Teaching Detail Modal */}
            {selectedTeaching && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                    <div className="space-y-1">
                      <span className="badge-gold text-[10px]">{selectedTeaching.category}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">{selectedTeaching.titleAmharic}</h3>
                      <p className="text-xs sm:text-sm font-bold text-[#855B09]">{selectedTeaching.titleEnglish}</p>
                    </div>
                    <button
                      onClick={() => setSelectedTeaching(null)}
                      className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-[#6B7280]">
                      <strong>Date:</strong> {selectedTeaching.date} ({selectedTeaching.ethiopianDate})
                    </span>
                    <span className="text-[#855B09] font-medium">
                      <strong>Venue:</strong> {selectedTeaching.occasion}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#2C1D07]">Executive Summary</h4>
                    <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed bg-[#FFF8E7] p-3 rounded-lg border border-[#E6DFD1]">
                      {selectedTeaching.summary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#2C1D07]">Full Patriarchal Message</h4>
                    <div className="p-4 sm:p-6 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1] text-xs sm:text-sm text-[#2C1D07] font-serif leading-relaxed italic">
                      "{selectedTeaching.fullText}"
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedTeaching.fullText);
                        alert('Teaching text copied to clipboard!');
                      }}
                      className="flex-1 btn-gold py-2.5 text-xs flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Full Text</span>
                    </button>
                    <button
                      onClick={() => setSelectedTeaching(null)}
                      className="px-5 py-2.5 text-xs font-bold border border-[#E6DFD1] rounded-lg hover:bg-[#FAF8F3]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: Holy Synod (Overview, Members Directory, Decisions, Schedule, Historical Docs)
          ========================================================================= */}
      {subSection === 'synod' && (
        <div className="space-y-16 animate-fadeIn -mt-12 -mx-4 sm:-mx-8 lg:-mx-12">
          {/* ═══════════════════════════════════════════════════════════════
              1. SACRED HOLY SYNOD HERO SECTION (FULL-WIDTH EDGE-TO-EDGE SECTION)
              ═══════════════════════════════════════════════════════════════ */}
          <section className="relative w-full bg-[#030C12] text-white overflow-hidden min-h-[580px] md:min-h-[640px] flex flex-col justify-between border-b-2 border-[#C8A84B]/60 shadow-2xl">
            
            {/* Synod Archbishops & Bishops Background Assembly Photo */}
            <div 
              className="absolute inset-0 bg-cover bg-[center_top] sm:bg-[center_top_15%] opacity-85 mix-blend-luminosity"
              style={{ backgroundImage: `url('/assets/images/holy_synod_assembly.jpg')` }}
            />
            
            {/* Left Warm & Dark Vignette Gradient for Text Legibility (Matching Home Hero) */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(3,12,18,0.98) 0%, rgba(3,12,18,0.92) 42%, rgba(3,12,18,0.45) 75%, rgba(3,12,18,0.15) 100%)'
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(3,12,18,0.90) 0%, rgba(3,12,18,0.20) 50%, rgba(3,12,18,0.60) 100%)'
              }}
            />

            {/* Main Content Area with Generous Padding (Matching Home Hero) */}
            <div className="relative z-10 max-w-[1480px] mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-[72px] pt-[130px] pb-[70px] flex-1 flex flex-col justify-center">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Hero Left: Supreme Authority Typography */}
                <div className="lg:col-span-8 space-y-5 max-w-2xl">
                  
                  {/* Overline Badge */}
                  <div className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E5C158]">
                    <span className="w-6 h-0.5 bg-[#E5C158] rounded-full" />
                    <span>SUPREME ECCLESIASTICAL AUTHORITY</span>
                  </div>

                  {/* Dual Geez & English Main Titles in Signature Gold */}
                  <div className="space-y-1.5">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-geez text-[#FAF7F2] tracking-tight leading-[1.1] drop-shadow-md">
                      ቅዱስ ሲኖዶስ
                    </h1>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#E5C158] tracking-tight drop-shadow-md">
                      (The Holy Synod)
                    </h2>
                  </div>

                  {/* Gold Filigree Orthodox Cross Ornament */}
                  <div className="flex items-center gap-3 py-1 text-[#E5C158]">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#E5C158]" />
                    <span className="text-lg font-geez">✞</span>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#E5C158]" />
                  </div>

                  {/* Description with Generous Line-Height & Padding */}
                  <p className="text-xs sm:text-sm md:text-base text-[#F0E6D2] font-sans font-normal leading-relaxed max-w-xl">
                    The Holy Synod is the supreme legislative, judicial, and pastoral authority of the Ethiopian Orthodox Tewahedo Church. Presided over by His Holiness the Catholicos Patriarch, it unites all consecrated archbishops and bishops worldwide to safeguard orthodox dogma, legislate church canons, appoint hierarchs, and guide over 60 million faithful.
                  </p>
                </div>

                {/* Hero Right: Glassmorphic Assembly Chamber Badge Card */}
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <div className="bg-[#030C12]/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border-2 border-[#C8A84B]/50 text-center space-y-3.5 max-w-xs w-full shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C8A84B] to-[#E5C158] mx-auto flex items-center justify-center text-[#030C12] shadow-lg">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-[#E5C158] font-geez text-xl">ቅዱስ ሲኖዶስ</h3>
                      <p className="text-xs text-[#E5C158] font-bold font-serif">Holy Synod Assembly Chamber</p>
                      <p className="text-xs text-[#D1D5DB] pt-1 font-sans">Patriarchate Headquarters, Addis Ababa</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ── ATTACHED 4-PILLAR AUTHORITY NAVIGATION BAR ── */}
            <div className="relative z-10 w-full max-w-[1480px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[72px] pb-8 sm:pb-12">
              <div className="bg-[#030C12]/95 backdrop-blur-md rounded-2xl border border-[#C8A84B]/40 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#C8A84B]/30 shadow-2xl">

                {/* Pillar 1 */}
                <div className="flex items-center gap-3.5 px-3 pt-2 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-[#0B2319] border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] shrink-0">
                    <span className="text-xl font-geez">†</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#FAF7F2] font-geez">ፓትርያርክ ፕሬዚዳንት</h4>
                    <p className="text-xs text-[#E5C158] font-sans font-semibold">Patriarchal Presidency</p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-center gap-3.5 px-3 pt-2 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-[#0B2319] border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#FAF7F2] font-geez">በየዓመቱ ጠቅላላ ጉባኤ</h4>
                    <p className="text-xs text-[#E5C158] font-sans font-semibold">Biannual Plenary Assembly</p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-center gap-3.5 px-3 pt-2 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-[#0B2319] border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#FAF7F2] font-geez">ቋሚ ኤጲስቆጶሳት ሲኖዶስ</h4>
                    <p className="text-xs text-[#E5C158] font-sans font-semibold">Standing Executive Synod</p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="flex items-center gap-3.5 px-3 pt-2 sm:pt-0">
                  <div className="w-11 h-11 rounded-xl bg-[#0B2319] border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158] shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#FAF7F2] font-geez">መንፈሳዊ ፍርድ ቤት</h4>
                    <p className="text-xs text-[#E5C158] font-sans font-semibold">Chancellery &amp; Spiritual Court</p>
                  </div>
                </div>

              </div>
            </div>

          </section>

          {/* Inner Content Container for Remaining Synod Sections */}
          <div className="max-w-[1480px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[72px] space-y-12">

          {/* 2. SYNOD MEMBERS DIRECTORY: Horizontal List Rows */}
          <section className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
            {/* Top Toolbar: Filter Tabs on Left, Search on Right */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {(['All', 'Patriarchate Administration', 'Ethiopia', 'Diaspora', 'Holy Land & Foreign'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedSynodRegion(r)}
                    className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all whitespace-nowrap ${
                      selectedSynodRegion === r
                        ? 'bg-[#0B3B2B] text-white shadow-sm'
                        : 'text-[#5A462A] hover:bg-[#FAF8F3] hover:text-[#0B3B2B]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder="Search bishop by name, title, or diocese..."
                  value={synodSearchQuery}
                  onChange={(e) => setSynodSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#D5C9B3] text-xs focus:outline-none focus:border-[#0B3B2B] bg-[#FAF8F3] text-[#2C1D07]"
                />
                <Search className="w-4 h-4 text-[#855B09] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Synod Members Horizontal List Rows */}
            <div className="divide-y divide-[#EFE8D8]">
              {MOCK_SYNOD_MEMBERS
                .filter((member) => {
                  const matchesRegion = selectedSynodRegion === 'All' || member.region === selectedSynodRegion;
                  const matchesQuery =
                    member.nameEnglish.toLowerCase().includes(synodSearchQuery.toLowerCase()) ||
                    member.nameAmharic.includes(synodSearchQuery) ||
                    member.dioceseEnglish.toLowerCase().includes(synodSearchQuery.toLowerCase()) ||
                    member.roleEnglish.toLowerCase().includes(synodSearchQuery.toLowerCase());
                  return matchesRegion && matchesQuery;
                })
                .map((member) => {
                  const locationStr =
                    member.id === 'sm-mathias'  ? 'Addis Ababa, Ethiopia' :
                    member.id === 'sm-abraham'  ? 'Bahir Dar, Ethiopia' :
                    member.id === 'sm-petros'   ? 'New York, USA' :
                    member.id === 'sm-fanuel'   ? 'Washington D.C., USA' :
                    member.id === 'sm-samuel'   ? 'Addis Ababa, Ethiopia' :
                    member.id === 'sm-antonios' ? 'London, UK' :
                    member.id === 'sm-enbakom'  ? 'Jerusalem, Holy Land' :
                    member.id === 'sm-markos'   ? 'Sydney, Australia' :
                    member.region === 'Ethiopia' ? 'Ethiopia' :
                    member.region === 'Diaspora' ? 'Diaspora Jurisdiction' :
                    'Patriarchate Headquarters';

                  const displayRole =
                    member.id === 'sm-mathias'  ? 'Patriarch of Ethiopia' :
                    member.id === 'sm-abraham'  ? 'Chief Executive Administrator' :
                    member.id === 'sm-petros'   ? 'General Secretary of the Holy Synod' :
                    member.id === 'sm-fanuel'   ? 'Standing Commission on Foreign Relations' :
                    member.id === 'sm-samuel'   ? 'Metropolitan' :
                    member.id === 'sm-markos'   ? 'Archbishop' :
                    member.roleEnglish;

                  return (
                    <div
                      key={member.id}
                      onClick={() => setSelectedSynodMember(member)}
                      className="py-4 sm:py-5 px-3 rounded-2xl hover:bg-[#FAF8F3] transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      {/* Left: Circular avatar + Name / Diocese */}
                      <div className="flex items-center gap-4 md:w-5/12 min-w-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#C8A84B] shadow shrink-0 bg-[#FAF8F3]">
                          <img
                            src={member.photoUrl}
                            alt={member.nameEnglish}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <h3 className="font-bold text-sm sm:text-base text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors truncate">
                            {member.nameEnglish}
                          </h3>
                          <div className="text-xs font-semibold text-[#855B09] font-serif truncate">
                            {displayRole}
                          </div>
                          <div className="text-[11px] text-[#6B5A40] font-sans truncate">
                            <span className="font-semibold text-[#4A3B22]">Diocese:</span> {member.dioceseEnglish}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Jurisdiction icon + Region / Location */}
                      <div className="flex items-center gap-3 md:w-3/12 pl-[4.5rem] md:pl-0">
                        <div className="w-9 h-9 rounded-xl bg-[#F4F0E8] border border-[#E2D8C7] flex items-center justify-center shrink-0">
                          {(member.region === 'Diaspora' || member.region === 'Holy Land & Foreign') ? (
                            <Globe className="w-4 h-4 text-[#0B3B2B]" />
                          ) : (
                            <Landmark className="w-4 h-4 text-[#0B3B2B]" />
                          )}
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <div className="text-xs font-bold text-[#2C1D07] font-sans truncate">{member.region}</div>
                          <div className="text-[11px] text-[#6B5A40] font-sans truncate">{locationStr}</div>
                        </div>
                      </div>

                      {/* Right: Synod role text + arrow button */}
                      <div className="flex items-center justify-between md:justify-end gap-4 md:w-4/12 pl-[4.5rem] md:pl-0 border-t md:border-t-0 pt-2 md:pt-0 border-[#EFE8D8]">
                        <div className="hidden lg:block border-l border-[#E2D8C7] pl-5">
                          <div className="text-xs font-semibold text-[#855B09] font-serif leading-tight">
                            {member.roleEnglish}
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#0B3B2B] border border-[#D5C9B3] group-hover:border-[#0B3B2B] flex items-center justify-center text-[#855B09] group-hover:text-white transition-all shrink-0 ml-auto md:ml-4 shadow-sm">
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Member Detail Modal */}
            {selectedSynodMember && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                    <div className="space-y-1">
                      <span className="badge-gold text-[10px]">{selectedSynodMember.region}</span>
                      <h3 className="text-2xl font-black text-[#2C1D07] font-geez">{selectedSynodMember.nameAmharic}</h3>
                      <p className="text-sm font-bold text-[#855B09]">{selectedSynodMember.nameEnglish}</p>
                    </div>
                    <button
                      onClick={() => setSelectedSynodMember(null)}
                      className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#4A3B22]">
                    <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] space-y-1">
                      <div className="text-[10px] font-bold text-[#855B09] uppercase">Episcopal Title & Diocese</div>
                      <div className="font-bold text-[#2C1D07]">{selectedSynodMember.titleEnglish}</div>
                      <div className="text-xs text-[#6B7280]">{selectedSynodMember.dioceseEnglish}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6DFD1]">
                        <span className="block text-[10px] text-[#855B09] font-bold uppercase">Synod Role</span>
                        <span className="font-bold text-xs text-[#2C1D07]">{selectedSynodMember.roleEnglish}</span>
                      </div>
                      <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6DFD1]">
                        <span className="block text-[10px] text-[#855B09] font-bold uppercase">Consecration</span>
                        <span className="font-bold text-xs text-[#2C1D07]">{selectedSynodMember.consecrationYear}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSynodMember(null)}
                    className="w-full btn-gold py-2.5 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 3. RECENT DECISIONS: Decrees, Rulings & Communiqués */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">SYNODAL DECREES</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <Scroll className="w-6 h-6 text-[#C8A84B]" />
                  <span>{language === 'am' ? 'የቅርብ ጊዜ የቅዱስ ሲኖዶስ ውሳኔዎች' : 'Recent Synodal Decrees & Decisions'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Official legislative proclamations, canonical rulings, and administrative decrees.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {(['All', 'Canonical & Dogma', 'Peace & Unity', 'Diocesan Governance', 'Monastic Heritage'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedDecisionCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedDecisionCategory === cat
                        ? 'bg-[#C8A84B] text-[#1A2C1C]'
                        : 'text-[#6B7280] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Decisions List */}
            <div className="space-y-6">
              {MOCK_SYNOD_DECISIONS
                .filter((d) => selectedDecisionCategory === 'All' || d.category === selectedDecisionCategory)
                .map((decision) => (
                  <div
                    key={decision.id}
                    className="p-6 sm:p-8 rounded-2xl border border-[#E6DFD1] bg-[#FAF8F3] hover:bg-white hover:border-[#C8A84B] hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DFD1] pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="badge-gold text-[9px]">{decision.category}</span>
                          <span className="text-[10px] font-mono text-[#855B09] bg-white px-2 py-0.5 rounded border border-[#E6DFD1]">
                            {decision.documentRef}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#2C1D07] font-geez">
                          {decision.titleAmharic}
                        </h3>
                        <h4 className="text-xs font-semibold text-[#855B09]">{decision.titleEnglish}</h4>
                      </div>

                      <div className="text-right text-xs text-[#6B7280] shrink-0">
                        <div className="font-bold text-[#2C1D07]">{decision.sessionName}</div>
                        <div>{decision.date} ({decision.ethiopianDate})</div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                      {decision.summary}
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-[#855B09] uppercase tracking-wider">Key Resolutions (ዋና ዋና ውሳኔዎች):</div>
                      <ul className="space-y-1.5 text-xs text-[#2C1D07]">
                        {decision.keyResolutions.map((res, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-[#C8A84B] font-bold">✓</span>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[#E6DFD1] flex justify-end">
                      <button
                        onClick={() => setSelectedDecision(decision)}
                        className="btn-gold text-xs py-2 px-4 flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Full Decree Record</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Decision Full Record Modal */}
            {selectedDecision && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                    <div className="space-y-1">
                      <span className="badge-gold text-[10px]">{selectedDecision.category}</span>
                      <h3 className="text-xl font-black text-[#2C1D07] font-geez">{selectedDecision.titleAmharic}</h3>
                      <p className="text-xs text-[#855B09] font-bold">{selectedDecision.titleEnglish}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDecision(null)}
                      className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] flex flex-wrap justify-between gap-2 text-xs">
                    <div><strong>Session:</strong> {selectedDecision.sessionName}</div>
                    <div><strong>Ref:</strong> {selectedDecision.documentRef}</div>
                    <div><strong>Date:</strong> {selectedDecision.date}</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-[#2C1D07]">Executive Overview</h4>
                    <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">{selectedDecision.summary}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-[#2C1D07]">Ratified Resolutions</h4>
                    <div className="bg-[#FFF8E7] p-4 rounded-xl border border-[#E6DFD1] space-y-2 text-xs">
                      {selectedDecision.keyResolutions.map((res, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="font-bold text-[#855B09]">{i + 1}.</span>
                          <span className="text-[#2C1D07] font-medium">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDecision(null)}
                    className="w-full btn-gold py-2.5 text-xs font-bold"
                  >
                    Close Record
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 4. SYNOD MEETING SCHEDULE: Upcoming Assemblies & Sessions */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">CALENDAR & SESSIONS</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-[#855B09]" />
                  <span>{language === 'am' ? 'የቅዱስ ሲኖዶስ ጉባኤዎች የጊዜ ሠሌዳ' : 'Synod Meeting Schedule'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Publicly announced regular plenary sessions, standing synod meetings, and theological commissions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {MOCK_SYNOD_SCHEDULE.map((session) => (
                <div
                  key={session.id}
                  className="bg-[#FAF8F3] hover:bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        session.status === 'Upcoming'
                          ? 'bg-[#FFF5DB] text-[#855B09] border-[#C8A84B]'
                          : 'bg-green-100 text-green-800 border-green-300'
                      }`}>
                        {session.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#6B7280]">{session.sessionType}</span>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#2C1D07] text-base font-geez">{session.sessionTitleAmharic}</h3>
                      <h4 className="text-xs font-semibold text-[#855B09]">{session.sessionTitle}</h4>
                    </div>

                    <div className="space-y-1 text-xs text-[#4A3B22] bg-white p-3 rounded-xl border border-[#E6DFD1]">
                      <div className="flex items-center gap-1.5 font-bold text-[#2C1D07]">
                        <Clock className="w-3.5 h-3.5 text-[#C8A84B]" />
                        <span>{session.dates}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[11px] text-[#6B7280]">
                        <MapPin className="w-3.5 h-3.5 text-[#C8A84B] shrink-0 mt-0.5" />
                        <span>{session.venue}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-[#855B09] text-[11px] uppercase">Agenda Highlights:</span>
                      <ul className="space-y-1 text-[11px] text-[#4A3B22]">
                        {session.agendaHighlights.map((ag, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5">
                            <span className="text-[#C8A84B]">•</span>
                            <span>{ag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. HISTORICAL SYNOD DOCUMENTS: Archive of Major Past Decisions */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">CANONICAL ARCHIVES</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#855B09]" />
                  <span>{language === 'am' ? 'ታሪካዊ የቅዱስ ሲኖዶስ ሰነዶችና ድንጋጌዎች' : 'Historical Synod Documents Archive'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Landmark autocephaly treaties, synod constitutions, reconciliation covenants, and canon law codifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_HISTORICAL_SYNOD_DOCS.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedHistoricalDoc(doc)}
                  className="bg-[#FAF8F3] hover:bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="badge-gold text-[9px]">{doc.category}</span>
                      <span className="text-xs font-mono font-bold text-[#855B09] bg-white px-2 py-0.5 rounded border border-[#E6DFD1]">
                        {doc.year} ({doc.ethiopianYear})
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                      {doc.titleAmharic}
                    </h3>
                    <h4 className="text-xs font-semibold text-[#855B09]">{doc.title}</h4>

                    <p className="text-xs text-[#4A3B22] leading-relaxed pt-1">
                      {doc.summary}
                    </p>

                    <div className="text-[11px] text-[#855B09] italic bg-white p-2.5 rounded-lg border border-[#E6DFD1]">
                      <strong>Historical Significance:</strong> {doc.significance}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                    <span>{doc.pages} Pages Document Record</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Historical Doc Modal */}
            {selectedHistoricalDoc && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                    <div className="space-y-1">
                      <span className="badge-gold text-[10px]">{selectedHistoricalDoc.category}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">{selectedHistoricalDoc.titleAmharic}</h3>
                      <p className="text-xs font-bold text-[#855B09]">{selectedHistoricalDoc.title}</p>
                    </div>
                    <button
                      onClick={() => setSelectedHistoricalDoc(null)}
                      className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] flex justify-between text-xs">
                    <div><strong>Year:</strong> {selectedHistoricalDoc.year} ({selectedHistoricalDoc.ethiopianYear})</div>
                    <div><strong>Archival Length:</strong> {selectedHistoricalDoc.pages} Pages</div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-[#4A3B22]">
                    <h4 className="font-bold text-[#2C1D07]">Summary of the Covenant / Charter</h4>
                    <p className="leading-relaxed">{selectedHistoricalDoc.summary}</p>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-[#4A3B22]">
                    <h4 className="font-bold text-[#2C1D07]">Ecclesiastical Impact</h4>
                    <p className="leading-relaxed bg-[#FFF8E7] p-3 rounded-lg border border-[#E6DFD1]">
                      {selectedHistoricalDoc.significance}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedHistoricalDoc(null)}
                    className="w-full btn-gold py-2.5 text-xs font-bold"
                  >
                    Close Document Archive
                  </button>
                </div>
              </div>
            )}
          </section>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: Church History (Timeline, Key Figures, Independence, Doctrine, Fetha Negest)
          ========================================================================= */}
      {subSection === 'history' && (
        <div className="space-y-14 animate-fadeIn -mt-8 -mx-4 sm:-mx-8 lg:-mx-12">
          {/* History Hero */}
          <section className="relative w-full bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] border-b-2 border-[#C8A84B]/60 shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

            <div className="relative z-10 max-w-[1480px] mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-[72px] pt-[130px] pb-[70px] space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {language === 'am' ? 'ባለ ሁለት ሺህ ዓመት ታሪክ' : 'TWO MILLENNIA OF UNBROKEN FAITH'}
                </span>
                <span className="bg-white/10 text-stone-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                  From Acts 8 to 21st Century
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-geez leading-tight">
                ታሪከ ቤተ ክርስቲያን (Church History)
              </h1>
              <p className="text-sm md:text-base text-stone-200 leading-relaxed max-w-3xl">
                {language === 'am'
                  ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ታሪክ ከአፍሪካ ጥንታዊው ክርስቲያናዊ ቅርስ ጋር የተሳሰረ ነው። በሐዋርያው ቅዱስ ፊልጶስ የተጠመቀው የንግሥት ህንደኬ ጃንደረባ፣ የንጉሥ ኢዛና እና የቅዱስ ፍሬምናጦስ ዘመነ አክሱም፣ የዘጠኙ ቅዱሳን ገዳማዊ ተጋድሎ፣ የቅዱስ ያሬድ ዜማ፣ የላሊበላ ፍልፍል አብያተ ክርስቲያናት እና የ፲፱፻፶፩ ዓ.ም. ራስ ገዝነት ታላላቅ ምዕራፎች ናቸው።'
                  : 'From the baptism of the royal treasurer by Saint Philip in 34 AD (Acts 8) to King Ezana’s Aksum, Saint Yared’s sacred melodies, Lalibela’s rock-hewn wonders, the 17th-century defense of Cyrillian faith in Gondar, 1959 autocephaly, and today’s worldwide digital ministry.'}
              </p>
            </div>
          </section>

          {/* Inner Content Container for History Subsections */}
          <div className="max-w-[1480px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[72px] space-y-12">

          {/* 1. INTERACTIVE TIMELINE: 4th Century to Present */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">CHRONOLOGICAL MILESTONES</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#855B09]" />
                  <span>{language === 'am' ? 'የታሪክ ዘመናት የጊዜ ሠሌዳ' : 'Historical Timeline (4th Century to Present)'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Major turning points, theological milestones, and imperial epochs.
                </p>
              </div>

              {/* Era Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {['All', 'Apostolic Era', 'Aksumite Golden Age', 'Monastic Foundations', 'Zagwe Dynasty & Medieval Period', '16th Century Defense of Faith', '20th Century Autocephaly & Reforms', 'Present Day Global Era'].map((era) => (
                  <button
                    key={era}
                    onClick={() => setSelectedHistoryEraFilter(era)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedHistoryEraFilter === era
                        ? 'bg-[#C8A84B] text-[#1A2C1C]'
                        : 'text-[#6B7280] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    {era === 'Zagwe Dynasty & Medieval Period' ? 'Medieval' : era === '16th Century Defense of Faith' ? '16th c. Defense' : era === '20th Century Autocephaly & Reforms' ? '20th c. Autocephaly' : era === 'Present Day Global Era' ? 'Present Day' : era}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Cards */}
            <div className="space-y-6 relative before:absolute before:left-4 md:before:left-1/2 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E6DFD1]">
              {MOCK_HISTORY_TIMELINE
                .filter((m) => selectedHistoryEraFilter === 'All' || m.era === selectedHistoryEraFilter)
                .map((milestone, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`relative flex flex-col md:flex-row items-start ${
                        isEven ? 'md:flex-row-reverse' : ''
                      } gap-8 pl-12 md:pl-0`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-[#C8A84B] border-4 border-white shadow-md z-10" />

                      {/* Content Box */}
                      <div className="w-full md:w-[calc(50%-2.5rem)]">
                        <div className="bg-[#FAF8F3] hover:bg-white p-6 sm:p-7 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="badge-gold text-[10px]">{milestone.period}</span>
                            <span className="text-xs font-bold text-[#855B09] font-geez">{milestone.eraAmharic}</span>
                          </div>

                          <h3 className="text-lg font-bold text-[#2C1D07] font-serif">{milestone.title}</h3>
                          <h4 className="text-sm font-semibold text-[#855B09] font-geez">{milestone.titleAmharic}</h4>

                          <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                            {milestone.description}
                          </p>

                          <div className="pt-3 border-t border-[#E6DFD1] space-y-1.5 text-xs">
                            <div className="text-[#6B7280]">
                              <strong className="text-[#2C1D07]">Key Figures:</strong> {milestone.keyFigures.join(', ')}
                            </div>
                            <div className="text-[#855B09] italic bg-white p-2.5 rounded-lg border border-[#E6DFD1]">
                              <strong>Significance:</strong> {milestone.significance}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* 2. KEY HISTORICAL FIGURES */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="border-b border-[#E6DFD1] pb-6 space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">LUMINARIES OF ETHIOPIAN ORTHODOXY</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <Users className="w-6 h-6 text-[#855B09]" />
                <span>{language === 'am' ? 'ዋና ዋና ታሪካዊ ግለሰቦችና አበው' : 'Key Historical Figures & Fathers'}</span>
              </h2>
              <p className="text-sm text-[#6B7280]">
                Apostles, Christian emperors, saintly melodists, monastic reformers, and patriarchs who shaped the Church.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_HISTORICAL_FIGURES.map((figure) => (
                <div
                  key={figure.id}
                  onClick={() => setSelectedHistoricalFigure(figure)}
                  className="bg-[#FAF8F3] hover:bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="badge-gold text-[9px]">{figure.century}</span>
                      <Award className="w-4 h-4 text-[#C8A84B]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#2C1D07] font-geez text-base group-hover:text-[#855B09] transition-colors">
                        {figure.nameAmharic}
                      </h3>
                      <h4 className="text-xs font-semibold text-[#855B09]">{figure.nameEnglish}</h4>
                    </div>

                    <div className="text-[11px] font-medium text-[#2C1D07] bg-white p-2 rounded-lg border border-[#E6DFD1]">
                      {figure.role}
                    </div>

                    <p className="text-xs text-[#4A3B22] line-clamp-3 leading-relaxed">
                      {figure.biography}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                    <span>View Biography</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Historical Figure Detail Modal */}
            {selectedHistoricalFigure && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                    <div className="space-y-1">
                      <span className="badge-gold text-[10px]">{selectedHistoricalFigure.century} • {selectedHistoricalFigure.era}</span>
                      <h3 className="text-2xl font-black text-[#2C1D07] font-geez">{selectedHistoricalFigure.nameAmharic}</h3>
                      <p className="text-sm font-bold text-[#855B09]">{selectedHistoricalFigure.nameEnglish}</p>
                    </div>
                    <button
                      onClick={() => setSelectedHistoricalFigure(null)}
                      className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#4A3B22]">
                    <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1]">
                      <div className="text-[10px] font-bold text-[#855B09] uppercase">Historical Role</div>
                      <div className="font-bold text-[#2C1D07] text-base">{selectedHistoricalFigure.roleAmharic} ({selectedHistoricalFigure.role})</div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#2C1D07] mb-1">Life Story & Historic Impact</h4>
                      <p className="leading-relaxed">{selectedHistoricalFigure.biography}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#2C1D07] mb-1">Enduring Contributions</h4>
                      <p className="leading-relaxed bg-[#FFF8E7] p-3 rounded-lg border border-[#E6DFD1]">
                        {selectedHistoricalFigure.keyContributions}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedHistoricalFigure(null)}
                    className="w-full btn-gold py-2.5 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 3. CHURCH INDEPENDENCE & SOVEREIGNTY */}
          <section className="bg-gradient-to-br from-[#FAF8F3] via-white to-[#FFF8E7] p-8 md:p-12 rounded-3xl border-2 border-[#C8A84B] shadow-md space-y-8">
            <div className="space-y-2 border-b border-[#E6DFD1] pb-6">
              <span className="badge-gold text-[10px] uppercase font-bold">AUTOCEPHALY & TRADITION</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <Landmark className="w-6 h-6 text-[#855B09]" />
                <span>{language === 'am' ? 'የቤተ ክርስቲያን ራስ ገዝነትና ታሪካዊ ነጻነት' : 'Church Independence & Autocephaly'}</span>
              </h2>
              <p className="text-sm text-[#6B7280]">
                How the Ethiopian Orthodox Tewahedo Church preserved its sovereignty, Ge'ez rite, and unique apostolic identity through the ages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E6DFD1] space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] border border-[#C8A84B] flex items-center justify-center text-[#855B09] font-bold">
                  ፩
                </div>
                <h3 className="font-bold text-[#2C1D07] text-base font-geez">የአሌክሳንድሪያ ታሪካዊ መንፈሳዊ ግንኙነት</h3>
                <h4 className="text-xs font-semibold text-[#855B09]">1,600 Years of Sisterhood (330 – 1959)</h4>
                <p className="text-xs text-[#4A3B22] leading-relaxed">
                  From St. Frumentius's consecration by St. Athanasius, the EOTC maintained canonical communion with Alexandria, receiving Coptic bishops while independently retaining its full Ge'ez liturgy, sovereign imperial council, and monastic system under the Ichege of Debre Libanos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E6DFD1] space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] border border-[#C8A84B] flex items-center justify-center text-[#855B09] font-bold">
                  ፪
                </div>
                <h3 className="font-bold text-[#2C1D07] text-base font-geez">የ፲፱፻፶፩ ዓ.ም. ሙሉ ራስ ገዝነት</h3>
                <h4 className="text-xs font-semibold text-[#855B09]">The 1959 Autocephaly Covenant</h4>
                <p className="text-xs text-[#4A3B22] leading-relaxed">
                  Through peaceful negotiations led by Emperor Haile Selassie I and Coptic Pope Cyril VI, the Ethiopian Church was formally elevated to an autocephalous Patriarchate in 1959, enthroning His Holiness Abune Basilios as 1st Patriarch.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E6DFD1] space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] border border-[#C8A84B] flex items-center justify-center text-[#855B09] font-bold">
                  ፫
                </div>
                <h3 className="font-bold text-[#2C1D07] text-base font-geez">ልዩ መንፈሳዊና ባህላዊ ቅርሶች</h3>
                <h4 className="text-xs font-semibold text-[#855B09]">Preservation of Unique Apostolic Traditions</h4>
                <p className="text-xs text-[#4A3B22] leading-relaxed">
                  The Church uniquely safeguards the holy <strong>Tabot</strong> (Ark of the Covenant representation in every altar), the 81-book Biblical Canon, Saint Yared's sacred Aquaquam rhythm, and the ancient Ge'ez calendar.
                </p>
              </div>
            </div>
          </section>

          {/* 4. TEWAHEDO DOCTRINE: THE ONE NATURE OF CHRIST */}
          <section className="bg-gradient-to-br from-[#FFF8E7] via-[#FAF8F3] to-[#FFF5DB] p-8 md:p-12 rounded-3xl border-2 border-[#D4AF37] shadow-md space-y-8 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <Sparkles className="w-64 h-64 text-[#855B09]" />
            </div>

            <div className="space-y-4 relative z-10 max-w-4xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C8A84B]" />
                <span className="badge-gold text-[10px] uppercase font-bold">THEOLOGICAL CORNERSTONE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif">
                {language === 'am' ? 'የተዋሕዶ ሃይማኖት ጥልቅ ምሥጢር' : 'Tewahedo Doctrine: The One Nature of Christ'}
              </h2>

              <p className="text-sm md:text-base text-[#4A3B22] leading-relaxed">
                The name <strong>"Tewahedo" (ተዋሕዶ)</strong> is a Ge'ez word signifying <strong>"Unification / Made One"</strong>. It expresses the orthodox Miaphysite Christology formulated by Saint Cyril of Alexandria in the 5th century: <em>Mia Physis tou Theou Logou Sesarkomene</em> ("One Incarnate Nature of God the Word").
              </p>

              {/* The 4 Non-Confusion Affirmations */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-[#E6DFD1] space-y-4">
                <h3 className="font-bold text-[#2C1D07] text-sm uppercase tracking-wider text-[#855B09]">
                  The Four Indivisible Confessions of Union (አራቱ የተዋሕዶ መሠረቶች):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1]">
                    <strong className="text-[#855B09] font-geez">፩. ያለ ቅልቅል (Without Confusion / እምቅብዓት):</strong>
                    <p className="text-[#4A3B22] pt-1">Divinity and Humanity do not merge like water and milk into a third substance.</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1]">
                    <strong className="text-[#855B09] font-geez">፪. ያለ ውላጤ (Without Change / እምውላጤ):</strong>
                    <p className="text-[#4A3B22] pt-1">Divinity did not transform into flesh, nor flesh turn into spirit.</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1]">
                    <strong className="text-[#855B09] font-geez">፫. ያለ ፍልጠት (Without Division / እምፍልጠት):</strong>
                    <p className="text-[#4A3B22] pt-1">Christ is not divided into two persons or two separate operating centers.</p>
                  </div>
                  <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1]">
                    <strong className="text-[#855B09] font-geez">፬. ያለ ቱሳሔ (Without Separation / እምቱሳሔ):</strong>
                    <p className="text-[#4A3B22] pt-1">His Godhead and Manhood are united forever, even on the Holy Cross and in the Tomb.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. FETHA NEGEST (ፍትሐ ነገሥት — LAW OF THE KINGS) */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">ETHIOPIAN CANON LAW</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <Scale className="w-6 h-6 text-[#855B09]" />
                  <span>ፍትሐ ነገሥት (Fetha Negest — The Law of the Kings)</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  The ancient monumental legal and canonical codex that governed church and empire for half a millennium.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                <p>
                  The <strong>Fetha Negest (ፍትሐ ነገሥት)</strong>, meaning <em>"The Judgment of Kings"</em>, is the foundational corpus of ecclesiastical jurisprudence and civil law in the Ethiopian Orthodox Tewahedo Church. Translated into classical Ge’ez during the 15th century under Emperor Zara Yaqob by scholar Abba Petros ibn Rahi, it harmonizes biblical moral law, Apostolic Canons, and Christian justice.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Part 1 */}
                  <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1] space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 text-[#855B09] flex items-center justify-center font-bold text-xs">
                      ክፍል ፩
                    </div>
                    <h3 className="font-bold text-[#2C1D07] text-sm">Part I: Ecclesiastical Canon Law</h3>
                    <p className="text-xs text-[#6B7280]">
                      22 chapters governing the Holy Sacraments, ordination of clergy, episcopal synods, monastic discipline, feast calendars, and church properties.
                    </p>
                  </div>

                  {/* Part 2 */}
                  <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1] space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 text-[#855B09] flex items-center justify-center font-bold text-xs">
                      ክፍል ፪
                    </div>
                    <h3 className="font-bold text-[#2C1D07] text-sm">Part II: Civil & Penal Jurisprudence</h3>
                    <p className="text-xs text-[#6B7280]">
                      22 chapters establishing civil rights, family inheritance, commercial ethics, contracts, judges' integrity, and the protection of widows and the vulnerable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guiding Principle Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF8E7] to-[#FAF8F3] p-6 rounded-2xl border border-[#D4AF37] space-y-3">
                <div className="flex items-center gap-2 text-[#855B09] font-bold text-xs">
                  <Compass className="w-4 h-4 text-[#C8A84B]" />
                  <span>Foundational Legal Philosophy</span>
                </div>
                <h4 className="font-bold text-[#2C1D07] font-geez text-base">"ፍትሕ በምሕረት" — Justice Tempered with Mercy</h4>
                <p className="text-xs text-[#4A3B22] leading-relaxed">
                  Unlike secular penal systems based purely on retribution, the Fetha Negest treats justice as spiritual medicine intended to rehabilitate the offender, restore harmony in the Christian community, and uphold the fear of God.
                </p>
                <div className="border-t border-[#E6DFD1] pt-3 text-[11px] text-[#855B09] italic font-serif">
                  "Judge not according to the face of man, but judge righteous judgment with fear and trembling before Christ the King."
                </div>
              </div>
            </div>
          </section>

          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: Synaxarium Saints & Commemorations (Holy Saints & Righteous Fathers)
          ========================================================================= */}
      {subSection === 'saints' && (
        <div className="animate-fadeIn -mt-8 -mx-4 sm:-mx-8 lg:-mx-12">
          <SaintsDirectory />
        </div>
      )}

      {/* =========================================================================
          VIEW 6: Dioceses & Global Administrations (All 40 Domestic Dioceses Directory)
          ========================================================================= */}
      {subSection === 'dioceses' && (
        <div className="animate-fadeIn -mt-8 -mx-4 sm:-mx-8 lg:-mx-12">
          <DiocesesDirectory />
        </div>
      )}
    </div>
  );
};
