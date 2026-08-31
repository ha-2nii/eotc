import React, { useState, useMemo } from 'react';
import { 
  Sun, 
  Calendar, 
  Users, 
  BookOpen, 
  Scroll, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  Search, 
  X, 
  ArrowRight,
  Cross,
  Music,
  Hourglass,
  Globe,
  Crown
} from 'lucide-react';
import { MOCK_SAINTS, type SaintProfile } from '../../data/mockChurchHub';

export const SaintsDirectory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'calendar' | 'all' | 'martyrs' | 'apostles' | 'monastics' | 'fathers' | 'teachers'>('daily');
  const [selectedSaint, setSelectedSaint] = useState<SaintProfile | null>(null);
  const [copiedHymn, setCopiedHymn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [showPrayersModal, setShowPrayersModal] = useState<boolean>(false);

  // Default featured Saint of the Day: Saint George
  const saintOfTheDay = useMemo(() => {
    return MOCK_SAINTS.find(s => s.id === 'st-george') || MOCK_SAINTS[0];
  }, []);

  const handleCopyHymn = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHymn(true);
    setTimeout(() => setCopiedHymn(false), 2500);
  };

  // Upcoming Feasts (Matching the 2-column reference design)
  const upcomingFeastsLeft = [
    {
      id: 'st-michael',
      month: 'May',
      day: '24',
      name: 'Saint Michael',
      subtitle: 'The Archangel',
      icon: '/assets/images/holy_saints_hero.jpg'
    },
    {
      id: 'st-gabriel',
      month: 'May',
      day: '26',
      name: 'Saint Gabriel',
      subtitle: 'The Archangel',
      icon: '/assets/images/holy_saints_hero.jpg'
    },
    {
      id: 'st-arsenios',
      month: 'May',
      day: '29',
      name: 'Saint Abba Arsenios',
      subtitle: 'The Great',
      icon: '/assets/images/debre_damo.jpg'
    },
  ];

  const upcomingFeastsRight = [
    {
      id: 'st-yared',
      month: 'May',
      day: '31',
      name: 'Saint Yared',
      subtitle: 'Abba of Hymns',
      icon: '/assets/images/st_yared_icon.jpg'
    },
    {
      id: 'st-tekle',
      month: 'June',
      day: '02',
      name: 'Saint Tekle Haymanot',
      subtitle: 'Our Father',
      icon: '/assets/images/saint_teklehaymanot_icon.jpg'
    },
    {
      id: 'st-mary',
      month: 'June',
      day: '04',
      name: 'Saint Mary',
      subtitle: 'Mother of God',
      icon: '/assets/images/st_mary_icon.png'
    },
  ];

  // 6 Categories for "Browse by Category" (1:1 with reference)
  const categoriesList = [
    {
      id: 'martyrs',
      title: 'Martyrs',
      subtitle: 'Our witnesses of faith who gave their lives for Christ.',
      icon: Cross,
      tabKey: 'martyrs' as const
    },
    {
      id: 'apostles',
      title: 'Apostles',
      subtitle: 'The chosen disciples who spread the Gospel and built the Church.',
      icon: Users,
      tabKey: 'apostles' as const
    },
    {
      id: 'monastics',
      title: 'Monastics',
      subtitle: 'The holy ascetics and monks who lived in devotion.',
      icon: BookOpen,
      tabKey: 'monastics' as const
    },
    {
      id: 'fathers',
      title: 'Righteous Fathers',
      subtitle: 'The saints and righteous fathers who guided us in faith.',
      icon: Crown,
      tabKey: 'fathers' as const
    },
    {
      id: 'women',
      title: 'Holy Women',
      subtitle: 'The virtuous women who followed Christ faithfully.',
      icon: Sparkles,
      tabKey: 'martyrs' as const
    },
    {
      id: 'teachers',
      title: 'Fathers & Teachers',
      subtitle: 'The theologians and teachers who explained the faith.',
      icon: Scroll,
      tabKey: 'teachers' as const
    },
  ];

  // Featured Saints 8 Circular Portraits (1:1 with reference)
  const featuredSaints = [
    { name: 'Saint Mary', subtitle: 'Mother of God', icon: '/assets/images/st_mary_icon.png', id: 'theotokos-kidane-mehret' },
    { name: 'Saint George', subtitle: 'Mighty Martyr', icon: '/assets/images/saint_george_icon.jpg', id: 'st-george' },
    { name: 'Saint Michael', subtitle: 'The Archangel', icon: '/assets/images/holy_saints_hero.jpg', id: 'theotokos-filseta' },
    { name: 'Saint Tekle Haymanot', subtitle: 'Haymanot', icon: '/assets/images/saint_teklehaymanot_icon.jpg', id: 'st-tekle-haymanot' },
    { name: 'Saint Yared', subtitle: 'Abba of Hymns', icon: '/assets/images/st_yared_icon.jpg', id: 'st-yared' },
    { name: 'Saint Abba Arsenios', subtitle: 'Abba', icon: '/assets/images/debre_damo.jpg', id: 'st-abba-aragawi' },
    { name: 'Saint Menas', subtitle: 'Wonderworker', icon: '/assets/images/holy_saints_hero.jpg', id: 'st-george' },
    { name: 'Saint Philoxenos', subtitle: 'Abba', icon: '/assets/images/saint_george_icon.jpg', id: 'st-george' },
  ];

  // Filtered saints based on search and active tab
  const filteredSaints = useMemo(() => {
    return MOCK_SAINTS.filter((saint) => {
      const matchesSearch = 
        !searchQuery ||
        saint.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saint.nameAmharic.includes(searchQuery) ||
        saint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        saint.feastDay.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMonth = selectedMonth === 'All' || saint.ethiopianMonth === selectedMonth;

      if (activeTab === 'martyrs') return matchesSearch && matchesMonth && (saint.category === 'Martyrs' || saint.title.includes('Martyr'));
      if (activeTab === 'monastics') return matchesSearch && matchesMonth && (saint.category === 'Monks & Ascetics' || saint.title.includes('Monk') || saint.title.includes('Abba') || saint.title.includes('Abune'));
      if (activeTab === 'fathers') return matchesSearch && matchesMonth && (saint.category === 'Church Fathers' || saint.title.includes('Father') || saint.title.includes('Doctor'));
      if (activeTab === 'apostles') return matchesSearch && matchesMonth && (saint.category === 'Apostles' || saint.title.includes('Apostle'));
      if (activeTab === 'teachers') return matchesSearch && matchesMonth && (saint.category === 'Church Fathers' || saint.title.includes('Theologian') || saint.title.includes('Teacher'));
      return matchesSearch && matchesMonth;
    });
  }, [activeTab, searchQuery, selectedMonth]);

  return (
    <div className="bg-[#FAF7F2] text-[#2C1D07] min-h-screen font-serif antialiased pb-24 w-full">

      {/* ═══════════════════════════════════════════════════════════════
          1. SACRED DARK OBSIDIAN TEAL HERO SECTION (1:1 with Reference)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#07241B] text-[#FAF7F2] pt-[120px] pb-0 overflow-hidden w-full">
        
        {/* Sacred Golden Saints Panoramic Painting in Background */}
        <div 
          className="absolute inset-0 bg-cover bg-right md:bg-[center_right] opacity-45 mix-blend-luminosity"
          style={{ backgroundImage: `url('/assets/images/holy_saints_hero.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031510]/95 via-[#07241B]/90 to-[#07241B]/70" />

        <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12">
            
            {/* Hero Left: Title & Descriptions */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-[#C8A84B] font-mono text-xs uppercase tracking-[0.25em] font-bold">
                <span className="text-sm font-geez">†</span>
                <span>THE SYNAXARIUM · HOLY SAINTS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] font-serif">
                Holy Saints &<br />Righteous Fathers
              </h1>

              {/* Delicate Cross Divider */}
              <div className="flex items-center gap-3 pt-0.5 text-[#C8A84B]">
                <span className="w-10 h-[1px] bg-[#C8A84B]/40" />
                <span className="text-sm font-serif font-bold">†</span>
                <span className="w-10 h-[1px] bg-[#C8A84B]/40" />
              </div>

              <p className="text-xs sm:text-sm text-[#D1D5DB] font-sans font-normal leading-relaxed max-w-xl">
                Commemorating the righteous ascetics, holy martyrs, apostles, and monastic luminaries whose prayers, miracles, and covenants preserve the faith of the Ethiopian Orthodox Tewahedo Church.
              </p>
            </div>

            {/* Hero Right: Saints Assembly Panoramic Artwork with Vignettes */}
            <div className="lg:col-span-5 hidden lg:flex justify-end relative h-[260px] overflow-hidden rounded-2xl">
              <img 
                src="/assets/images/holy_saints_hero.jpg" 
                alt="Holy Saints & Fathers Assembly" 
                className="w-full h-full object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07241B]/20 to-[#07241B]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07241B] via-transparent to-transparent opacity-80" />
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              INTEGRATED BASE NAVIGATION TABS BAR (Base of Hero)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="flex items-center border-t border-white/10 text-xs font-sans overflow-x-auto">
            
            <button
              onClick={() => {
                setActiveTab('daily');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-2 py-4 px-5 font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'daily' ? 'text-[#E5C158]' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-[#E5C158]" />
              <span>Saint of the Day</span>
              {activeTab === 'daily' && (
                <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-[#E5C158]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 py-4 px-5 font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'calendar' ? 'text-[#E5C158]' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Feast Calendar</span>
              {activeTab === 'calendar' && (
                <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-[#E5C158]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 py-4 px-5 font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'all' ? 'text-[#E5C158]' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>All Saints</span>
              {activeTab === 'all' && (
                <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-[#E5C158]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('martyrs')}
              className={`flex items-center gap-2 py-4 px-5 font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'martyrs' ? 'text-[#E5C158]' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Cross className="w-4 h-4" />
              <span>Martyrs</span>
              {activeTab === 'martyrs' && (
                <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-[#E5C158]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('apostles')}
              className={`flex items-center gap-2 py-4 px-5 font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'apostles' ? 'text-[#E5C158]' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Apostles</span>
              {activeTab === 'apostles' && (
                <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-[#E5C158]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('monastics')}
              className={`flex items-center gap-2 py-4 px-5 font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'monastics' ? 'text-[#E5C158]' : 'text-stone-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Monastics</span>
              {activeTab === 'monastics' && (
                <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-[#E5C158]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              className={`flex items-center gap-2 py-4 px-5 font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'teachers' ? 'text-[#E5C158]' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Scroll className="w-4 h-4" />
              <span>Fathers & Teachers</span>
              {activeTab === 'teachers' && (
                <span className="absolute bottom-0 left-5 right-5 h-[2.5px] bg-[#E5C158]" />
              )}
            </button>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          2. SAINT OF THE DAY SECTION (Upper Main — Free of heavy cards)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Large Icon Artwork of Saint George */}
          <div className="lg:col-span-4">
            <div 
              onClick={() => setSelectedSaint(saintOfTheDay)}
              className="rounded-2xl overflow-hidden border border-[#E2D8C7] shadow-xs relative aspect-square bg-white group cursor-pointer"
            >
              <img 
                src="/assets/images/saint_george_icon.jpg" 
                alt="Saint George on Horseback Slaying Dragon" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Center Column: Saint Details, Metadata & Actions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#855B09] font-mono text-[11px] uppercase font-bold tracking-wider">
                <span>❖ SAINT OF THE DAY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1814] font-serif flex items-center gap-2">
                <span>Saint George</span>
                <span className="text-[#855B09] text-xl">†</span>
              </h2>
              <div className="text-lg font-geez font-bold text-[#855B09]">
                ቅዱስ ጊዮርጊስ
              </div>
              <div className="text-xs text-[#7A6B56] font-sans font-medium pt-0.5">
                Martyr • Soldier Saint • 3rd Century
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3B22] font-sans leading-relaxed">
              Saint George is known for his unwavering faith, courage, and martyrdom for Christ during the persecution of Christians in the 3rd century.
            </p>

            {/* 4 Micro Attributes List/Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-sans text-[#4A3B22]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#855B09] font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>FEAST DAY</span>
                </div>
                <div className="font-bold text-[#1C1814]">May 23</div>
                <div className="text-[10px] text-[#7A6B56] font-geez">(ግንቦት 15)</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#855B09] font-mono">
                  <Cross className="w-3.5 h-3.5" />
                  <span>VIRTUES</span>
                </div>
                <div className="font-bold text-[#1C1814] truncate">Courage, Faith</div>
                <div className="text-[10px] text-[#7A6B56] font-geez">(ፅናት፣ እምነት)</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#855B09] font-mono">
                  <Hourglass className="w-3.5 h-3.5" />
                  <span>ERA</span>
                </div>
                <div className="font-bold text-[#1C1814]">3rd Century</div>
                <div className="text-[10px] text-[#7A6B56] font-geez">(በ፫ኛው መቶ)</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#855B09] font-mono">
                  <Globe className="w-3.5 h-3.5" />
                  <span>VENERATION</span>
                </div>
                <div className="font-bold text-[#1C1814]">Worldwide</div>
                <div className="text-[10px] text-[#7A6B56] font-geez">(በዓለም ዙሪያ)</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => setSelectedSaint(saintOfTheDay)}
                className="px-6 py-2.5 bg-[#0B3B2B] hover:bg-[#07241B] text-white rounded-xl text-xs font-bold font-sans flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setShowPrayersModal(true)}
                className="px-4 py-2.5 text-[#855B09] hover:text-[#0B3B2B] font-bold text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Music className="w-3.5 h-3.5 text-[#855B09]" />
                <span>Prayers & Hymns</span>
              </button>
            </div>
          </div>

          {/* Right Column: Today's Commemoration Sidebar */}
          <div className="lg:col-span-3 space-y-3 pt-2 lg:pt-0">
            <div className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#855B09]">
              TODAY'S COMMEMORATION
            </div>

            <div className="space-y-0.5">
              <div className="text-base font-bold text-[#1C1814]">Today: May 23, 2025</div>
              <div className="text-xs text-[#7A6B56] font-mono">(Nehase 15, 2017 E.C.)</div>
            </div>

            <p className="text-xs text-[#4A3B22] font-sans leading-relaxed">
              We commemorate <strong className="text-[#1C1814]">Saint George (May 23)</strong> and all the righteous martyrs of our holy faith.
            </p>

            <div className="pt-2">
              <button 
                onClick={() => setActiveTab('all')}
                className="text-xs font-bold text-[#855B09] hover:text-[#0B3B2B] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View All Saints of Today</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          3. UPCOMING FEASTS SECTION (2-Column Clean Layout)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD1]">
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
              UPCOMING FEASTS
            </h3>
            <button 
              onClick={() => setActiveTab('calendar')}
              className="text-xs font-sans font-medium text-[#855B09] hover:text-[#5B3E06] flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Feast Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            
            {/* Left Column Feasts */}
            <div className="divide-y divide-[#EFE7DA]">
              {upcomingFeastsLeft.map((feast) => (
                <div 
                  key={feast.id}
                  onClick={() => {
                    const s = MOCK_SAINTS.find(st => st.id === feast.id) || MOCK_SAINTS[0];
                    setSelectedSaint(s);
                  }}
                  className="py-3 flex items-center gap-4 group cursor-pointer"
                >
                  <div className="text-xs font-sans font-semibold text-[#1C1814] w-14 shrink-0">
                    {feast.month} {feast.day}
                  </div>

                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C8A84B]/60 shrink-0 bg-white shadow-2xs">
                    <img src={feast.icon} alt={feast.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1C1814] group-hover:text-[#855B09] transition-colors truncate">
                      {feast.name}
                    </h4>
                    <p className="text-[11px] text-[#7A6B56]">{feast.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column Feasts */}
            <div className="divide-y divide-[#EFE7DA]">
              {upcomingFeastsRight.map((feast) => (
                <div 
                  key={feast.id}
                  onClick={() => {
                    const s = MOCK_SAINTS.find(st => st.id === feast.id) || MOCK_SAINTS[0];
                    setSelectedSaint(s);
                  }}
                  className="py-3 flex items-center gap-4 group cursor-pointer"
                >
                  <div className="text-xs font-sans font-semibold text-[#1C1814] w-14 shrink-0">
                    {feast.month} {feast.day}
                  </div>

                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C8A84B]/60 shrink-0 bg-white shadow-2xs">
                    <img src={feast.icon} alt={feast.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1C1814] group-hover:text-[#855B09] transition-colors truncate">
                      {feast.name}
                    </h4>
                    <p className="text-[11px] text-[#7A6B56]">{feast.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          4. BROWSE BY CATEGORY (6 Minimalist Columns with Hairlines)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-10 pb-4">
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase pb-2 border-b border-[#E7DFD1]">
            BROWSE BY CATEGORY
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E7DFD1] text-center pt-2">
            {categoriesList.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.tabKey)}
                  className={`space-y-2.5 pt-4 sm:pt-0 sm:px-4 flex flex-col justify-between group cursor-pointer ${
                    idx === 0 ? 'sm:pl-0' : ''
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 mx-auto flex items-center justify-center text-[#855B09] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-bold text-sm text-[#1C1814] font-serif group-hover:text-[#855B09] transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] text-[#7A6B56] font-sans leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="text-xs text-[#855B09] font-medium font-sans flex items-center justify-center gap-1 group-hover:translate-x-0.5 transition-transform pt-1">
                    <span>Explore</span>
                    <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          5. FEATURED SAINTS (8 Circular Portraits Row)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-10 pb-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7DFD1]">
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
              FEATURED SAINTS
            </h3>
            
            <button 
              onClick={() => setActiveTab('all')}
              className="text-xs font-sans font-medium text-[#855B09] hover:text-[#5B3E06] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Saints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center pt-2">
            {featuredSaints.map((saint, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  const s = MOCK_SAINTS.find(st => st.id === saint.id) || MOCK_SAINTS[0];
                  setSelectedSaint(s);
                }}
                className="group cursor-pointer space-y-2 p-2 rounded-xl transition-colors"
              >
                <div className="w-18 h-18 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden border border-[#C8A84B] shadow-2xs bg-white group-hover:scale-105 group-hover:border-[#0B3B2B] transition-all">
                  <img src={saint.icon} alt={saint.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1C1814] group-hover:text-[#855B09] transition-colors leading-tight">
                    {saint.name}
                  </h4>
                  <p className="text-[10px] text-[#7A6B56] font-sans mt-0.5">{saint.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          6. TAB VIEWS: ALL SAINTS / CALENDAR / CATEGORY DIRECTORY
          ═══════════════════════════════════════════════════════════════ */}
      {activeTab !== 'daily' && (
        <section className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-12">
          <div className="bg-white border border-[#E2D8C7] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D8C7] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#855B09] tracking-wider">
                  Canonical Directory
                </span>
                <h3 className="text-2xl font-bold text-[#0B3B2B] font-serif">
                  {activeTab === 'all' && 'All Holy Saints & Church Fathers'}
                  {activeTab === 'calendar' && 'Synaxarium (ስንክሳር) Feast Calendar'}
                  {activeTab === 'martyrs' && 'Holy Martyrs (ሰማዕታት)'}
                  {activeTab === 'apostles' && 'Holy Apostles (ሐዋርያት)'}
                  {activeTab === 'monastics' && 'Monastics & Ascetics (ጻድቃን ወመነኮሳት)'}
                  {activeTab === 'fathers' && 'Righteous Church Fathers (አበው)'}
                  {activeTab === 'teachers' && 'Fathers & Teachers of the Faith (መምህራን)'}
                </h3>
              </div>

              {/* Month filter & Search Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2.5 bg-[#FAF7F2] border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] cursor-pointer"
                >
                  <option value="All">All Months (ሁሉንም)</option>
                  {['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yakatit', 'Megabit', 'Miyazya', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-[#855B09] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search saint by name, feast day..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2.5 bg-[#FAF7F2] border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B]"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Saints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSaints.map((saint) => (
                <div
                  key={saint.id}
                  onClick={() => setSelectedSaint(saint)}
                  className="bg-[#FAF7F2] border border-[#E2D8C7] rounded-xl p-5 hover:border-[#855B09] transition-all space-y-3 cursor-pointer shadow-2xs group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-[#C8A84B] shrink-0 bg-white">
                      <img src={saint.iconUrl} alt={saint.nameEnglish} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm text-[#0B3B2B] group-hover:text-[#855B09] transition-colors leading-snug">
                        {saint.nameEnglish}
                      </h4>
                      <div className="text-xs font-geez text-[#855B09] mt-0.5">{saint.nameAmharic}</div>
                      <div className="text-[11px] text-[#6B5A40] font-sans mt-1">{saint.title}</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A3B22] font-sans leading-relaxed line-clamp-2">
                    {saint.shortBio}
                  </p>

                  <div className="pt-2 border-t border-[#E2D8C7] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#855B09] font-bold">Feast: {saint.feastDay}</span>
                    <span className="text-[#0B3B2B] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      <span>View Dossier</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════════════════════════
          MODAL: SAINT PROFILE DOSSIER
          ═══════════════════════════════════════════════════════════════ */}
      {selectedSaint && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedSaint(null); }}
        >
          <div className="bg-white border-2 border-[#C8A84B] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-fadeIn text-[#2C1D07]">
            <div className="bg-[#0B3B2B] text-white p-6 relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-[#C8A84B] text-[#031510] font-bold uppercase px-2 py-0.5 rounded font-mono">
                  {selectedSaint.category}
                </span>
                <span className="text-[11px] text-[#E5C158] font-mono">Feast Day: {selectedSaint.feastDay}</span>
              </div>
              <h3 className="text-2xl font-bold font-serif">{selectedSaint.nameEnglish}</h3>
              <div className="text-sm font-geez text-[#E5C158]">{selectedSaint.nameAmharic}</div>
              <button onClick={() => setSelectedSaint(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-sans leading-relaxed text-[#4A3B22]">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border border-[#D5C9B3] shrink-0 mx-auto sm:mx-0">
                  <img src={selectedSaint.iconUrl} alt={selectedSaint.nameEnglish} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-bold text-sm text-[#0B3B2B] font-serif">{selectedSaint.title}</h4>
                  <p>{selectedSaint.shortBio || selectedSaint.contributions}</p>
                </div>
              </div>

              {selectedSaint.prayersAndHymns && (
                <div className="p-4 bg-[#FAF7F2] border border-[#E2D8C7] rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#855B09]">
                    <span>Sacred Geez Hymn (ማሕሌት) - {selectedSaint.prayersAndHymns.title}</span>
                    <button 
                      onClick={() => handleCopyHymn(selectedSaint.prayersAndHymns?.geezText || '')}
                      className="text-[10px] flex items-center gap-1 hover:text-[#0B3B2B]"
                    >
                      {copiedHymn ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHymn ? 'Copied' : 'Copy Hymn'}</span>
                    </button>
                  </div>
                  <div className="text-xs font-geez text-[#0B3B2B] leading-relaxed">
                    {selectedSaint.prayersAndHymns.geezText}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button onClick={() => setSelectedSaint(null)} className="px-5 py-2 bg-[#0B3B2B] text-white rounded-xl font-bold text-xs cursor-pointer">
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ═══════════════════════════════════════════════════════════════
          MODAL: PRAYERS & HYMNS MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {showPrayersModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPrayersModal(false); }}
        >
          <div className="bg-white border-2 border-[#C8A84B] rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-fadeIn text-[#2C1D07]">
            <div className="flex items-center justify-between border-b border-[#E2D8C7] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#855B09] tracking-wider font-mono">Sacred Liturgical Supplication</span>
                <h3 className="text-xl font-bold font-serif text-[#0B3B2B]">Prayers of Saint George</h3>
              </div>
              <button onClick={() => setShowPrayersModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#FAF7F2] border border-[#E2D8C7] rounded-xl text-xs font-geez text-[#0B3B2B] leading-relaxed space-y-2">
              <p className="font-bold text-[#855B09]">ሰላም ለከ ጊዮርጊስ ኃያል፣ ሰማዕተ ክርስቶስ ፍቁር።</p>
              <p>"Peace be upon thee, Saint George the valiant martyr of Christ, whose covenant protects the faithful and delivers the oppressed."</p>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setShowPrayersModal(false)} className="px-5 py-2 bg-[#0B3B2B] text-white rounded-xl font-bold text-xs cursor-pointer">
                Close Prayers
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SaintsDirectory;
