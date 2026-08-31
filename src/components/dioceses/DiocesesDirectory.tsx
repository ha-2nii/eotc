import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Church, 
  ChevronRight, 
  ChevronDown,
  Search, 
  Landmark, 
  X, 
  Users, 
  RotateCcw, 
  List, 
  Map as MapIcon, 
  Globe, 
  ScrollText, 
  Filter 
} from 'lucide-react';
import { ALL_DIOCESE_REGIONS, type DioceseListing, type DioceseRegionGroup } from '../../data/allDioceses';
import { DioceseDetailView } from './DioceseDetailView';

export const DiocesesDirectory: React.FC = () => {
  // 5 Filtering Criteria States
  const [filterTerritory, setFilterTerritory] = useState<string>('all');
  const [filterBishop, setFilterBishop] = useState<string>('all');
  const [filterInstitutions, setFilterInstitutions] = useState<string>('all');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');
  const [filterDioceseType, setFilterDioceseType] = useState<string>('all');

  // Search, Sort, View Modes & Selected Diocese for Detailed View
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedDiocese, setSelectedDiocese] = useState<DioceseListing | null>(null);

  // Flatten all dioceses with their region metadata
  const allDiocesesWithRegion = useMemo(() => {
    const list: { diocese: DioceseListing; region: DioceseRegionGroup }[] = [];
    ALL_DIOCESE_REGIONS.forEach((region) => {
      region.dioceses.forEach((diocese) => {
        list.push({ diocese, region });
      });
    });
    return list;
  }, []);

  // Unique lists for filter dropdowns
  const uniqueTerritories = useMemo(() => {
    const set = new Set<string>();
    allDiocesesWithRegion.forEach(({ diocese }) => set.add(diocese.region));
    return Array.from(set);
  }, [allDiocesesWithRegion]);

  const uniqueBishops = useMemo(() => {
    const list: { name: string; shortName: string }[] = [];
    allDiocesesWithRegion.forEach(({ diocese }) => {
      const short = diocese.bishop
        .replace('His Holiness Catholicos Patriarch ', '')
        .replace('His Eminence Archbishop ', '')
        .replace('His Grace Bishop ', '');
      if (!list.some(b => b.shortName === short)) {
        list.push({ name: diocese.bishop, shortName: short });
      }
    });
    return list.sort((a, b) => a.shortName.localeCompare(b.shortName));
  }, [allDiocesesWithRegion]);

  const uniqueLanguages = useMemo(() => {
    const set = new Set<string>();
    allDiocesesWithRegion.forEach(({ diocese }) => {
      diocese.languages?.forEach(lang => set.add(lang));
    });
    return Array.from(set);
  }, [allDiocesesWithRegion]);

  // Handle Clear All
  const handleClearAll = () => {
    setFilterTerritory('all');
    setFilterBishop('all');
    setFilterInstitutions('all');
    setFilterLanguage('all');
    setFilterDioceseType('all');
    setSearchQuery('');
  };

  const hasActiveFilters = 
    filterTerritory !== 'all' || 
    filterBishop !== 'all' || 
    filterInstitutions !== 'all' || 
    filterLanguage !== 'all' || 
    filterDioceseType !== 'all' ||
    searchQuery !== '';

  // Main Filtering Logic across all 5 criteria + search + sort
  const filteredDioceses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allDiocesesWithRegion.filter(({ diocese }) => {
      // 1. Territory (Region) Filter
      if (filterTerritory !== 'all') {
        if (filterTerritory === 'Domestic' && diocese.territoryCategory !== 'Domestic') return false;
        if (filterTerritory === 'Diaspora' && diocese.territoryCategory !== 'Diaspora') return false;
        if (filterTerritory !== 'Domestic' && filterTerritory !== 'Diaspora' && diocese.region !== filterTerritory) {
          return false;
        }
      }

      // 2. Bishop Filter
      if (filterBishop !== 'all') {
        const short = diocese.bishop
          .replace('His Holiness Catholicos Patriarch ', '')
          .replace('His Eminence Archbishop ', '')
          .replace('His Grace Bishop ', '');
        if (short !== filterBishop && diocese.bishop !== filterBishop) return false;
      }

      // 3. Institutions Filter
      if (filterInstitutions !== 'all') {
        if (filterInstitutions === 'parishes-high' && diocese.parishesCount < 150) return false;
        if (filterInstitutions === 'monasteries-high' && diocese.monasteriesCount < 20) return false;
        if (filterInstitutions === 'missions-active' && (!diocese.missionsCount || diocese.missionsCount < 5)) return false;
        if (filterInstitutions === 'fellowships' && (!diocese.fellowshipsCount || diocese.fellowshipsCount < 20)) return false;
      }

      // 4. Language Filter
      if (filterLanguage !== 'all') {
        if (!diocese.languages?.some(l => l.toLowerCase().includes(filterLanguage.toLowerCase()))) {
          return false;
        }
      }

      // 5. Diocese Type / Diaspora vs Domestic Filter
      if (filterDioceseType !== 'all') {
        if (filterDioceseType === 'Domestic' && diocese.territoryCategory !== 'Domestic') return false;
        if (filterDioceseType === 'Archdiocese' && !diocese.dioceseType.includes('Archdiocese')) return false;
        if (filterDioceseType === 'Diocese' && !diocese.dioceseType.endsWith('Diocese')) return false;
        if (filterDioceseType === 'North America' && diocese.region !== 'North America') return false;
        if (filterDioceseType === 'Europe' && diocese.region !== 'Europe') return false;
        if (filterDioceseType === 'Middle East' && diocese.region !== 'Middle East') return false;
        if (filterDioceseType === 'Australia' && diocese.region !== 'Australia') return false;
      }

      // Search Query Filter
      if (q) {
        const match = 
          diocese.nameEnglish.toLowerCase().includes(q) ||
          diocese.nameAmharic.includes(q) ||
          diocese.seeCity.toLowerCase().includes(q) ||
          diocese.bishop.toLowerCase().includes(q) ||
          diocese.bishopAmharic.includes(q) ||
          diocese.cathedral.toLowerCase().includes(q) ||
          diocese.administrativeZone.toLowerCase().includes(q) ||
          diocese.region.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.diocese.nameEnglish.localeCompare(b.diocese.nameEnglish);
      }
      if (sortBy === 'name-desc') {
        return b.diocese.nameEnglish.localeCompare(a.diocese.nameEnglish);
      }
      if (sortBy === 'parishes-desc') {
        return b.diocese.parishesCount - a.diocese.parishesCount;
      }
      if (sortBy === 'monasteries-desc') {
        return b.diocese.monasteriesCount - a.diocese.monasteriesCount;
      }
      if (sortBy === 'established-asc') {
        const yearA = parseInt(a.diocese.established) || 1900;
        const yearB = parseInt(b.diocese.established) || 1900;
        return yearA - yearB;
      }
      return 0;
    });
  }, [
    allDiocesesWithRegion, 
    filterTerritory, 
    filterBishop, 
    filterInstitutions, 
    filterLanguage, 
    filterDioceseType, 
    searchQuery, 
    sortBy
  ]);

  // Clean short bishop title for table display
  const formatBishopDisplay = (bishop: string) => {
    return bishop
      .replace('His Holiness Catholicos Patriarch ', '')
      .replace('His Eminence Archbishop ', '')
      .replace('His Grace Bishop ', '');
  };

  // If a diocese is selected for detailed view, render the dedicated Detail View (1:1 with reference image)
  if (selectedDiocese) {
    return (
      <DioceseDetailView 
        diocese={selectedDiocese} 
        onBack={() => {
          setSelectedDiocese(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  // Label display helpers for filter selectors
  const getTerritoryLabel = () => {
    if (filterTerritory === 'all') return 'All Regions';
    if (filterTerritory === 'Domestic') return 'All Domestic';
    if (filterTerritory === 'Diaspora') return 'All Diaspora';
    return filterTerritory;
  };

  const getBishopLabel = () => {
    if (filterBishop === 'all') return 'All Bishops';
    return filterBishop;
  };

  const getInstitutionsLabel = () => {
    if (filterInstitutions === 'all') return 'All Institutions';
    if (filterInstitutions === 'parishes-high') return '150+ Parishes';
    if (filterInstitutions === 'monasteries-high') return '20+ Monasteries';
    if (filterInstitutions === 'missions-active') return 'Active Missions';
    if (filterInstitutions === 'fellowships') return 'Fellowships';
    return filterInstitutions;
  };

  const getLanguageLabel = () => {
    if (filterLanguage === 'all') return 'All Languages';
    return filterLanguage;
  };

  const getDioceseTypeLabel = () => {
    if (filterDioceseType === 'all') return 'All Types';
    return filterDioceseType;
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2C1D07] min-h-screen font-serif antialiased pb-24 w-full">

      {/* ═══════════════════════════════════════════════════════════════
          1. INTEGRATED HERO & SINGLE-ROW FILTER BAR (Matching Home Page Padding)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#FAF7F2] border-b border-[#E6DFD1] pt-[130px] pb-8 w-full overflow-hidden">
        <div className="w-full px-6 sm:px-12 md:px-16 lg:px-[72px]">
          
          {/* Hero Top Grid: Left Title & Info / Right Cathedral Sketch */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Eyebrow, Title, Cross Divider & Subtitle */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4 z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] uppercase tracking-[0.22em] font-mono font-bold text-[#855B09] block">
                  COMPLETE DOMESTIC & DIASPORA REGISTRY
                </span>
                <span className="w-9 h-[2px] bg-[#855B09]/50 rounded-full" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B3B2B] tracking-tight font-serif leading-[1.12]">
                All Domestic Dioceses
              </h1>

              {/* Delicate Cross Divider */}
              <div className="flex items-center gap-3 pt-1 pb-1 text-[#855B09]">
                <span className="w-12 h-[1.5px] bg-[#D5C9B3]" />
                <span className="text-sm font-serif font-bold">†</span>
                <span className="w-12 h-[1.5px] bg-[#D5C9B3]" />
              </div>

              <p className="text-sm sm:text-base text-[#5A4B35] font-sans leading-relaxed max-w-2xl">
                Explore dioceses using multiple filters and views to find information that matters to you.
              </p>
            </div>

            {/* Right Column: Architectural Cathedral Sketch Illustration */}
            <div className="md:col-span-5 lg:col-span-4 hidden md:flex justify-end items-center relative h-[230px] lg:h-[270px] overflow-hidden">
              <img 
                src="/assets/images/cathedral_sketch_hero.jpg" 
                alt="Orthodox Cathedral Architectural Sketch" 
                className="w-full h-full object-contain object-right opacity-90"
              />
              {/* Soft vignette parchment fades */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#FAF7F2]/10 to-[#FAF7F2]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent opacity-80" />
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              INTEGRATED FILTER TOOLBAR (Single Clean Full-Width Row)
              ═══════════════════════════════════════════════════════════════ */}
          <div className="pt-8 mt-6 border-t border-[#E7DFD1]/80 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              
              {/* 1. Search Box */}
              <div className="relative flex-1 min-w-[220px] max-w-[280px]">
                <Search className="w-4 h-4 text-[#855B09] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search diocese, city, or cathedral..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-[#FAF7F2] border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] placeholder-[#8C7E6A] font-sans focus:outline-none focus:border-[#0B3B2B] focus:bg-white transition-colors"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7E6A] hover:text-[#2C1D07] cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 2. Center Filter Controls */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 lg:gap-8 text-xs font-sans">
                
                {/* Filter 1: Region */}
                <div className="relative group flex flex-col cursor-pointer">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#2C1D07]">
                    <MapPin className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Region</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A6B56] hover:text-[#0B3B2B] font-medium mt-0.5">
                    <span className="truncate max-w-[100px]">{getTerritoryLabel()}</span>
                    <ChevronDown className="w-3 h-3 text-[#855B09]" />
                  </div>
                  <select
                    value={filterTerritory}
                    onChange={(e) => setFilterTerritory(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="all">All Regions</option>
                    <option value="Domestic">🇪🇹 All Domestic Regions</option>
                    <option value="Diaspora">🌐 All Diaspora Regions</option>
                    <optgroup label="Domestic Territories">
                      {uniqueTerritories.filter(t => !['North America', 'Europe', 'Middle East', 'Australia'].includes(t)).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Diaspora Territories">
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Middle East">Middle East & Holy Land</option>
                      <option value="Australia">Australia & Oceania</option>
                    </optgroup>
                  </select>
                </div>

                {/* Filter 2: Bishop */}
                <div className="relative group flex flex-col cursor-pointer">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#2C1D07]">
                    <Users className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Bishop</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A6B56] hover:text-[#0B3B2B] font-medium mt-0.5">
                    <span className="truncate max-w-[100px]">{getBishopLabel()}</span>
                    <ChevronDown className="w-3 h-3 text-[#855B09]" />
                  </div>
                  <select
                    value={filterBishop}
                    onChange={(e) => setFilterBishop(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="all">All Bishops</option>
                    {uniqueBishops.map((b) => (
                      <option key={b.shortName} value={b.shortName}>
                        {b.shortName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter 3: Institutions */}
                <div className="relative group flex flex-col cursor-pointer">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#2C1D07]">
                    <Landmark className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Institutions</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A6B56] hover:text-[#0B3B2B] font-medium mt-0.5">
                    <span className="truncate max-w-[100px]">{getInstitutionsLabel()}</span>
                    <ChevronDown className="w-3 h-3 text-[#855B09]" />
                  </div>
                  <select
                    value={filterInstitutions}
                    onChange={(e) => setFilterInstitutions(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="all">All Institutions</option>
                    <option value="parishes-high">High Parish Count (150+)</option>
                    <option value="monasteries-high">Major Monasteries (20+)</option>
                    <option value="missions-active">Active Missions</option>
                    <option value="fellowships">Large Fellowships</option>
                  </select>
                </div>

                {/* Filter 4: Language */}
                <div className="relative group flex flex-col cursor-pointer">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#2C1D07]">
                    <Globe className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Language</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A6B56] hover:text-[#0B3B2B] font-medium mt-0.5">
                    <span className="truncate max-w-[100px]">{getLanguageLabel()}</span>
                    <ChevronDown className="w-3 h-3 text-[#855B09]" />
                  </div>
                  <select
                    value={filterLanguage}
                    onChange={(e) => setFilterLanguage(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="all">All Languages</option>
                    <option value="Amharic">Amharic (አማርኛ)</option>
                    <option value="Ge'ez">Ge'ez (ግዕዝ)</option>
                    <option value="Tigrinya">Tigrinya (ትግርኛ)</option>
                    <option value="Afaan Oromo">Afaan Oromo</option>
                    <option value="English">English</option>
                  </select>
                </div>

                {/* Filter 5: Diocese Type */}
                <div className="relative group flex flex-col cursor-pointer">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#2C1D07]">
                    <Church className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Diocese Type</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#7A6B56] hover:text-[#0B3B2B] font-medium mt-0.5">
                    <span className="truncate max-w-[100px]">{getDioceseTypeLabel()}</span>
                    <ChevronDown className="w-3 h-3 text-[#855B09]" />
                  </div>
                  <select
                    value={filterDioceseType}
                    onChange={(e) => setFilterDioceseType(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="all">All Types</option>
                    <option value="Domestic">Domestic Dioceses</option>
                    <option value="Archdiocese">Archdioceses</option>
                    <option value="Diocese">Standard Dioceses</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

              </div>

              {/* 3. Action Buttons: Reset & Filter */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 text-xs text-[#855B09] hover:text-[#2C1D07] font-semibold font-sans px-2.5 py-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={() => {}}
                  className="px-5 py-2.5 bg-[#0B3B2B] hover:bg-[#07241B] text-white rounded-xl text-xs font-bold font-sans flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Filter</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          2. RESULTS TOOLBAR: COUNT, SORTING & VIEW TOGGLES (Full Width)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full px-6 sm:px-10 lg:px-12 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD1]">
          
          {/* Results Count */}
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-bold text-[#0B3B2B] font-serif">
              {filteredDioceses.length} Dioceses Found
            </span>
            {hasActiveFilters && (
              <span className="text-xs text-[#855B09] font-sans font-medium">
                (filtered from {allDiocesesWithRegion.length} total)
              </span>
            )}
          </div>

          {/* Sort & View Toggle Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A6B56] font-sans font-medium hidden sm:inline">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-[#FAF7F2] border border-[#D5C9B3] rounded-lg text-xs text-[#2C1D07] font-sans font-medium focus:outline-none focus:border-[#0B3B2B] cursor-pointer"
              >
                <option value="name-asc">Diocese Name (A–Z)</option>
                <option value="name-desc">Diocese Name (Z–A)</option>
                <option value="parishes-desc">Parishes Count (High to Low)</option>
                <option value="monasteries-desc">Monasteries Count (High to Low)</option>
                <option value="established-asc">Oldest Established</option>
              </select>
            </div>

            {/* View Switcher: List View / Map View */}
            <div className="flex items-center bg-[#EFE8D8] p-1 rounded-lg border border-[#D5C9B3]">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#0B3B2B] text-white shadow-2xs'
                    : 'text-[#4A3B22] hover:text-[#0B3B2B]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List View</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-md text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-[#0B3B2B] text-white shadow-2xs'
                    : 'text-[#4A3B22] hover:text-[#0B3B2B]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          3. MAIN VIEW: EDGE-TO-EDGE FULL WIDTH LIST VIEW TABLE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full pt-1">
        
        {viewMode === 'list' ? (
          /* ── FULL WIDTH LIST VIEW TABLE (1:1 with Screenshot) ── */
          <div className="w-full bg-white border-t border-b border-[#E2D8C7] overflow-x-auto shadow-2xs">
            <table className="w-full text-left border-collapse font-sans text-xs">
              {/* Table Header */}
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#E2D8C7] text-[#855B09] text-[11px] uppercase tracking-[0.15em] font-mono">
                  <th className="py-4.5 px-6 sm:px-8 font-bold">Diocese</th>
                  <th className="py-4.5 px-6 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Bishop</span>
                    </div>
                  </th>
                  <th className="py-4.5 px-6 font-bold">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Territory (Region)</span>
                    </div>
                  </th>
                  <th className="py-4.5 px-6 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5" />
                      <span>Institutions</span>
                    </div>
                  </th>
                  <th className="py-4.5 px-6 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Language of Service</span>
                    </div>
                  </th>
                  <th className="py-4.5 px-6 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Church className="w-3.5 h-3.5" />
                      <span>Diocese Type</span>
                    </div>
                  </th>
                  <th className="py-4.5 px-6 font-bold">
                    <div className="flex items-center gap-1.5">
                      <ScrollText className="w-3.5 h-3.5" />
                      <span>Established</span>
                    </div>
                  </th>
                  <th className="py-4.5 pr-8 pl-6 font-bold text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#F0EAE1]">
                {filteredDioceses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-20 text-center text-[#8C7E6A] font-serif">
                      <Search className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#855B09]" />
                      <p className="text-base font-bold text-[#2C1D07]">No diocese matches the selected filters</p>
                      <p className="text-xs text-[#6B5A40] mt-1">Try resetting your criteria or clearing active search terms.</p>
                      <button
                        onClick={handleClearAll}
                        className="mt-4 px-4 py-2 bg-[#0B3B2B] text-white rounded-xl text-xs font-bold font-sans cursor-pointer"
                      >
                        Clear All Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredDioceses.map(({ diocese }) => (
                    <tr
                      key={diocese.id}
                      onClick={() => setSelectedDiocese(diocese)}
                      className="group hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      {/* 1. DIOCESE (Emblem + English + Geez) */}
                      <td className="py-5 px-6 sm:px-8 align-middle">
                        <div className="flex items-center gap-3.5">
                          {/* Emblem Badge */}
                          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C8A84B]/60 flex items-center justify-center text-[#855B09] font-geez text-sm font-bold shadow-2xs shrink-0 group-hover:bg-[#0B3B2B] group-hover:text-[#E5C158] transition-colors">
                            †
                          </div>
                          <div>
                            <div className="font-serif font-bold text-sm text-[#0B3B2B] group-hover:text-[#855B09] transition-colors">
                              {diocese.nameEnglish}
                            </div>
                            <div className="text-xs font-geez text-[#855B09] mt-0.5">
                              {diocese.nameAmharic}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. BISHOP */}
                      <td className="py-5 px-6 align-middle">
                        <div className="font-semibold text-xs text-[#2C1D07]">
                          {formatBishopDisplay(diocese.bishop)}
                        </div>
                        <div className="text-[11px] font-geez text-[#6B5A40] mt-0.5">
                          {diocese.bishopAmharic}
                        </div>
                      </td>

                      {/* 3. TERRITORY (REGION) */}
                      <td className="py-5 px-6 align-middle text-xs text-[#4A3B22] font-medium">
                        <div className="flex items-center gap-1.5">
                          <span>{diocese.region}</span>
                        </div>
                        <div className="text-[11px] text-[#8C7E6A] font-mono mt-0.5">
                          {diocese.seeCity}
                        </div>
                      </td>

                      {/* 4. INSTITUTIONS */}
                      <td className="py-5 px-6 align-middle">
                        <div className="space-y-0.5 text-[11px]">
                          <div className="font-semibold text-[#0B3B2B]">
                            {diocese.parishesCount} Parishes
                          </div>
                          <div className="text-[#6B5A40]">
                            {diocese.monasteriesCount} Monasteries
                          </div>
                          {diocese.missionsCount > 0 && (
                            <div className="text-[#855B09] text-[10px]">
                              {diocese.missionsCount} Missions
                            </div>
                          )}
                        </div>
                      </td>

                      {/* 5. LANGUAGE OF SERVICE */}
                      <td className="py-5 px-6 align-middle">
                        <div className="text-xs text-[#2C1D07] font-medium">
                          {diocese.languages?.join(', ') || 'Amharic, Ge\'ez'}
                        </div>
                      </td>

                      {/* 6. DIOCESE TYPE */}
                      <td className="py-5 px-6 align-middle">
                        <span className={`inline-block px-3 py-1 text-[11px] font-semibold rounded-lg ${
                          diocese.dioceseType.includes('Archdiocese')
                            ? 'bg-[#0B3B2B]/10 text-[#0B3B2B] font-bold border border-[#0B3B2B]/20'
                            : 'bg-[#FAF7F2] text-[#6B5A40] border border-[#E2D8C7]'
                        }`}>
                          {diocese.dioceseType}
                        </span>
                      </td>

                      {/* 7. ESTABLISHED */}
                      <td className="py-5 px-6 align-middle font-mono text-xs text-[#6B5A40]">
                        {diocese.established}
                      </td>

                      {/* 8. ACTIONS */}
                      <td className="py-5 pr-8 pl-6 align-middle text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDiocese(diocese);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3B2B] group-hover:text-[#855B09] group-hover:translate-x-0.5 transition-all cursor-pointer"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Table Footer Summary */}
            <div className="w-full bg-[#FAF7F2] px-6 sm:px-8 py-4 border-t border-[#E2D8C7] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6B5A40] font-sans">
              <span>Ethiopian Orthodox Tewahedo Church — Canonical Diocesan Directory</span>
              <span className="font-mono font-semibold">Showing {filteredDioceses.length} of {allDiocesesWithRegion.length} Total Dioceses</span>
            </div>
          </div>
        ) : (
          /* ── MAP / TERRITORIAL REGION EXPLORER VIEW (Full Width) ── */
          <div className="w-full px-6 sm:px-10 lg:px-12 space-y-6">
            <div className="bg-white border border-[#E2D8C7] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2D8C7] pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#0B3B2B]">
                    Canonical Territories & Regional Jurisdictions
                  </h3>
                  <p className="text-xs text-[#6B5A40] font-sans mt-1">
                    Visual geographic breakdown of dioceses across Ethiopian regional states and worldwide diaspora jurisdictions.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#855B09] bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E2D8C7]">
                  {ALL_DIOCESE_REGIONS.length} Regional Groups
                </span>
              </div>

              {/* Regional Jurisdiction Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ALL_DIOCESE_REGIONS.map((region) => {
                  return (
                    <div 
                      key={region.id}
                      className="bg-[#FAF7F2] border border-[#E2D8C7] rounded-2xl p-5 hover:border-[#855B09] transition-all space-y-4 shadow-2xs"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{region.regionIcon}</span>
                          <div>
                            <h4 className="font-bold text-sm text-[#0B3B2B] font-serif">{region.regionName}</h4>
                            <div className="text-xs font-geez text-[#855B09]">{region.regionAmharic}</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono bg-[#0B3B2B] text-white px-2 py-0.5 rounded-md font-bold">
                          {region.dioceses.length} Sees
                        </span>
                      </div>

                      <p className="text-xs text-[#6B5A40] font-sans leading-relaxed line-clamp-2">
                        {region.description}
                      </p>

                      <div className="pt-3 border-t border-[#E2D8C7] space-y-2">
                        <div className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#855B09]">
                          Dioceses in this territory:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {region.dioceses.map((d) => (
                            <button
                              key={d.id}
                              onClick={() => setSelectedDiocese(d)}
                              className="text-[11px] px-2.5 py-1 bg-white hover:bg-[#0B3B2B] hover:text-white border border-[#D5C9B3] rounded-lg text-[#2C1D07] transition-colors text-left cursor-pointer"
                            >
                              {d.nameEnglish.replace('Diocese of ', '').replace('Archdiocese of ', '')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

export default DiocesesDirectory;
