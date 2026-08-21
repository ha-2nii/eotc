import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/layout/LanguageContext';
import { 
  PATRIARCH_BIO, 
  PATRIARCH_LINEAGE, 
  PATRIARCH_TEACHINGS,
  type PatriarchTeachingMessage
} from '../data/mockPatriarch';
import { 
  QUICK_STATS, 
  PILLARS_OF_MYSTERY, 
  MOCK_DIOCESES, 
  MOCK_HISTORY_TIMELINE, 
  MOCK_SAINTS, 
  MOCK_SYNOD_MEMBERS,
  MOCK_SYNOD_DECISIONS,
  MOCK_SYNOD_SCHEDULE,
  MOCK_HISTORICAL_SYNOD_DOCS,
  MOCK_HISTORICAL_FIGURES,
  MOCK_DIOCESAN_NEWS,
  type DioceseInfo, 
  type SaintProfile,
  type SynodMember,
  type SynodDecision,
  type HistoricalSynodDocument,
  type HistoricalFigure,
  type DiocesanNewsItem
} from '../data/mockChurchHub';
import { 
  UserCheck, 
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
  ArrowRight, 
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
  Compass,
  Music,
  Sun,
  Flame,
  Phone,
  Mail,
  ExternalLink,
  Building,
  Newspaper
} from 'lucide-react';

export const OurChurchView: React.FC = () => {
  const { language, activeView, setActiveView } = useLanguage();
  const [subSection, setSubSection] = useState<'overview' | 'patriarch' | 'synod' | 'history' | 'saints' | 'dioceses'>('overview');
  const [selectedDioceseRegion, setSelectedDioceseRegion] = useState<'All' | 'Ethiopia' | 'Diaspora' | 'Historical See'>('All');
  const [selectedDiasporaSubRegion, setSelectedDiasporaSubRegion] = useState<string>('All');
  const [dioceseSearchQuery, setDioceseSearchQuery] = useState<string>('');
  const [selectedSaint, setSelectedSaint] = useState<SaintProfile | null>(null);
  const [selectedDiocese, setSelectedDiocese] = useState<DioceseInfo | null>(null);
  const [selectedDiocesanNews, setSelectedDiocesanNews] = useState<DiocesanNewsItem | null>(null);

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

  // Saints-specific state
  const [selectedSaintCategory, setSelectedSaintCategory] = useState<'All' | 'Theotokos (St. Mary)' | 'Apostles' | 'Martyrs' | 'Monks & Ascetics' | 'Church Fathers' | 'Ethiopian Saints'>('All');
  const [synaxariumMonth, setSynaxariumMonth] = useState<string>('All');
  const [saintSearchQuery, setSaintSearchQuery] = useState<string>('');
  const [copiedHymnId, setCopiedHymnId] = useState<string | null>(null);

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

  const filteredDioceses = MOCK_DIOCESES.filter((diocese) => {
    const matchesRegion = selectedDioceseRegion === 'All' || diocese.region === selectedDioceseRegion;
    const matchesSubRegion = selectedDiasporaSubRegion === 'All' || diocese.subRegion === selectedDiasporaSubRegion;
    const matchesQuery = 
      diocese.nameEnglish.toLowerCase().includes(dioceseSearchQuery.toLowerCase()) ||
      diocese.nameAmharic.includes(dioceseSearchQuery) ||
      diocese.seeCity.toLowerCase().includes(dioceseSearchQuery.toLowerCase()) ||
      diocese.cathedral.toLowerCase().includes(dioceseSearchQuery.toLowerCase()) ||
      diocese.archbishopEnglish.toLowerCase().includes(dioceseSearchQuery.toLowerCase());
    return matchesRegion && matchesSubRegion && matchesQuery;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 animate-fadeIn max-w-7xl">
      {/* Sub-nav switcher bar */}
      <div className="bg-white p-2 rounded-2xl border border-[#E6DFD1] flex flex-wrap items-center justify-between gap-2 shadow-sm sticky top-[72px] z-30 backdrop-blur-md bg-white/95">
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1 scrollbar-none w-full md:w-auto">
          {[
            { id: 'overview', labelEn: 'Church Overview', labelAm: 'ቤተ ክርስቲያናችን' },
            { id: 'patriarch', labelEn: 'Patriarch', labelAm: 'ፓትርያርክ' },
            { id: 'synod', labelEn: 'Holy Synod', labelAm: 'ቅዱስ ሲኖዶስ' },
            { id: 'history', labelEn: 'Church History', labelAm: 'የቤተ ክርስቲያን ታሪክ' },
            { id: 'saints', labelEn: 'Saints', labelAm: 'ቅዱሳን' },
            { id: 'dioceses', labelEn: 'Dioceses', labelAm: 'አህጉረ ስብከት' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                subSection === tab.id
                  ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm font-extrabold'
                  : 'text-[#6B7280] hover:text-[#2C1D07] hover:bg-[#FAF8F3]'
              }`}
            >
              <span>{language === 'am' ? tab.labelAm : tab.labelEn}</span>
              <span className="opacity-60 text-[10px] hidden sm:inline">
                ({language === 'am' ? tab.labelEn : tab.labelAm})
              </span>
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#855B09] px-3">
          <Church className="w-4 h-4 text-[#C8A84B]" />
          <span>Ethiopian Orthodox Tewahedo Church Hub</span>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: Main Our Church Hub (Overview)
          ========================================================================= */}
      {subSection === 'overview' && (
        <div className="space-y-12 animate-fadeIn">
          {/* 1. HERO SECTION */}
          <section className="bg-gradient-to-br from-[#FAF8F3] via-white to-[#FFF8E7] p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-[0_6px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C8A84B]/20 via-[#9E7F1E]/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-gold text-[11px] uppercase tracking-wider font-bold">
                    {language === 'am' ? 'ስለ ቤተ ክርስቲያን • OUR CHURCH' : 'OUR CHURCH • ስለ ቤተ ክርስቲያን'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#855B09] bg-[#FFF5DB] px-3 py-1 rounded-full border border-[#E6DFD1]">
                    {language === 'am' ? 'በ፬ኛው መቶ ክፍለ ዘመን የተመሠረተች' : 'Founded in the 4th Century AD'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#2C1D07] font-geez leading-tight tracking-tight">
                    {language === 'am' ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን' : 'The Ethiopian Orthodox Tewahedo Church'}
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#855B09] font-serif">
                    {language === 'am' ? 'Africa’s Oldest Autocephalous Christian Church' : 'ቤተ ክርስቲያናችን — ጥንታዊትና ሐዋርያዊት'}
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-[#4A3B22] leading-relaxed max-w-3xl">
                  {language === 'am'
                    ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በአፍሪካ እጅግ ጥንታዊትና በዓለም ቀዳሚ ከሆኑት ሐዋርያዊ አብያተ ክርስቲያናት አንዷ ናት። በሐዋርያው ቅዱስ ፊልጶስ (የሐዋ. ፰፡፳፮) ጥምቀት የጀመረው መንፈሳዊ ጉዞዋ በ፬ኛው መቶ ክፍለ ዘመን በንጉሥ ኢዛና እና በቅዱስ ፍሬምናጦስ (ከሣቴ ብርሃን) አማካኝነት የመንግሥት ሃይማኖት ሆኖ ታውጇል።'
                    : 'The Ethiopian Orthodox Tewahedo Church is Africa’s oldest Christian institution and one of the world’s most venerable apostolic churches. Rooted in the 1st-century baptism of the Ethiopian royal official (Acts 8) and established as the imperial state faith in the 4th century under King Ezana and Saint Frumentius (Abba Salama Kesate Birhan), she preserves millennia of uncorrupted apostolic faith, liturgical Zema, and sacred heritage.'}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button
                    onClick={() => handleTabChange('history')}
                    className="btn-gold flex items-center gap-2 text-sm py-3 px-6 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{language === 'am' ? 'ታሪኳን ይመርምሩ' : 'Explore Church History'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleTabChange('patriarch')}
                    className="bg-white hover:bg-[#FAF8F3] text-[#2C1D07] font-bold text-sm py-3 px-6 rounded-lg border border-[#C8A84B] flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>{language === 'am' ? 'ብፁዕ ወቅዱስ ፓትርያርክ' : 'His Holiness Patriarch'}</span>
                    <ChevronRight className="w-4 h-4 text-[#855B09]" />
                  </button>
                </div>
              </div>

              {/* Visual Hero Badge / Emblem Card */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border-2 border-[#C8A84B] shadow-xl text-center space-y-4 max-w-sm w-full relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C8A84B] to-[#9E7F1E] mx-auto flex items-center justify-center shadow-md text-white">
                    <Church className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-[#2C1D07] font-geez">መንበረ ተክለ ሃይማኖት</h3>
                    <p className="text-xs text-[#855B09] font-bold uppercase tracking-wider">See of Saint Tekle Haymanot</p>
                    <p className="text-xs text-[#6B7280] pt-1">Autocephalous Oriental Orthodox Patriarchate</p>
                  </div>
                  <div className="border-t border-[#E6DFD1] pt-3 text-xs text-[#4A3B22] italic font-serif">
                    "አሐቲ ቅድስት ቤተ ክርስቲያን" — One Holy Catholic and Apostolic Church
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. QUICK STATS SECTION */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#2C1D07] font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C8A84B]" />
                <span>{language === 'am' ? 'ዋና ዋና ቁጥራዊ መረጃዎች' : 'Church at a Glance: Key Figures'}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {QUICK_STATS.map((stat, idx) => {
                const getIcon = (name: string) => {
                  switch (name) {
                    case 'Clock': return <Clock className="w-6 h-6 text-[#855B09]" />;
                    case 'Users': return <Users className="w-6 h-6 text-[#855B09]" />;
                    case 'Church': return <Church className="w-6 h-6 text-[#855B09]" />;
                    case 'MapPin': return <MapPin className="w-6 h-6 text-[#855B09]" />;
                    default: return <Sparkles className="w-6 h-6 text-[#855B09]" />;
                  }
                };

                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FFF8E7] border border-[#E6DFD1] group-hover:border-[#C8A84B] flex items-center justify-center transition-colors">
                        {getIcon(stat.iconName)}
                      </div>
                      <span className="text-[11px] font-mono text-[#855B09] font-bold bg-[#FAF8F3] px-2.5 py-1 rounded-md border border-[#E6DFD1]">
                        {language === 'am' ? stat.labelAm : stat.labelEn}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-2xl md:text-3xl font-black text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors">
                        {stat.value}
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        {stat.subtextEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. FIVE CATEGORY CARDS SECTION */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="badge-gold text-[10px] uppercase font-bold tracking-wider">
                {language === 'am' ? 'አምስቱ ዋና ዘርፎች' : 'FIVE CORE PILLARS'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2C1D07] font-serif">
                {language === 'am' ? 'የቤተ ክርስቲያናችን አምዶች' : 'Explore Our Church Categories'}
              </h2>
              <p className="text-sm text-[#6B7280]">
                {language === 'am' 
                  ? 'ስለ ፓትርያርኩ፣ ቅዱስ ሲኖዶስ፣ ታሪክ፣ ቅዱሳንና አህጉረ ስብከት ዝርዝር መረጃዎችን ያግኙ' 
                  : 'Click any category card below to delve deep into the leadership, history, holy fathers, and worldwide dioceses.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Patriarch */}
              <div
                onClick={() => handleTabChange('patriarch')}
                className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
              >
                <div className="h-48 bg-gradient-to-tr from-[#2C1D07] to-[#855B09] relative overflow-hidden flex items-center justify-center p-6 text-white">
                  <img
                    src={PATRIARCH_BIO.photoUrl}
                    alt={PATRIARCH_BIO.nameEnglish}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="relative z-10 text-center space-y-1">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#C8A84B] text-[#1A2C1C] px-2.5 py-0.5 rounded-full mb-1">
                      CATHOLICOS PATRIARCH
                    </span>
                    <h4 className="text-xl font-bold font-geez drop-shadow-sm">{PATRIARCH_BIO.nameAmharic}</h4>
                    <p className="text-xs text-stone-200">{PATRIARCH_BIO.nameEnglish}</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#855B09] uppercase">Leadership</span>
                      <UserCheck className="w-4 h-4 text-[#C8A84B]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2C1D07] group-hover:text-[#855B09] transition-colors">
                      {language === 'am' ? 'ብፁዕ ወቅዱስ ፓትርያርክ' : 'His Holiness the Patriarch'}
                    </h3>
                    <p className="text-xs text-[#4A3B22] line-clamp-3 leading-relaxed">
                      {PATRIARCH_BIO.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E6DFD1] text-xs font-bold text-[#855B09]">
                    <span>{language === 'am' ? 'የፓትርያርኩን ታሪክ ይመልከቱ' : 'View Full Bio & Succession'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 2: Holy Synod */}
              <div
                onClick={() => handleTabChange('synod')}
                className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
              >
                <div className="h-48 bg-gradient-to-tr from-[#1A3A5C] to-[#0D1F30] relative overflow-hidden flex items-center justify-center p-6 text-white">
                  <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#C8A84B]/20 rounded-full blur-xl" />
                  <div className="relative z-10 text-center space-y-2">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-[#C8A84B]" />
                    </div>
                    <h4 className="text-xl font-bold font-geez">ቅዱስ ሲኖዶስ</h4>
                    <p className="text-xs text-stone-300">Supreme Ecclesiastical Council</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#855B09] uppercase">Governance</span>
                      <ShieldCheck className="w-4 h-4 text-[#C8A84B]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2C1D07] group-hover:text-[#855B09] transition-colors">
                      {language === 'am' ? 'ቅዱስ ሲኖዶስ' : 'The Holy Synod'}
                    </h3>
                    <p className="text-xs text-[#4A3B22] line-clamp-3 leading-relaxed">
                      {language === 'am'
                        ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን የበላይ የውሳኔና የሕግ አውጪ አካል፤ በሊቃነ ጳጳሳትና ኤጲስ ቆጶሳት የሚመራ ከፍተኛ ጉባኤ።'
                        : 'The supreme ecclesiastical legislative and administrative body governing the Church, composed of consecrated archbishops and bishops under the Patriarch.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E6DFD1] text-xs font-bold text-[#855B09]">
                    <span>{language === 'am' ? 'የሲኖዶስ መዋቅርና ውሳኔዎች' : 'Synod Structure & Decisions'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 3: Church History */}
              <div
                onClick={() => handleTabChange('history')}
                className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
              >
                <div className="h-48 bg-gradient-to-tr from-[#3D2200] to-[#800020] relative overflow-hidden flex items-center justify-center p-6 text-white">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 text-center space-y-2">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center">
                      <Clock className="w-8 h-8 text-[#C8A84B]" />
                    </div>
                    <h4 className="text-xl font-bold font-geez">ታሪከ ቤተ ክርስቲያን</h4>
                    <p className="text-xs text-stone-300">Apostolic Era to Present</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#855B09] uppercase">Heritage</span>
                      <Scroll className="w-4 h-4 text-[#C8A84B]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2C1D07] group-hover:text-[#855B09] transition-colors">
                      {language === 'am' ? 'የቤተ ክርስቲያን ታሪክ' : 'Church History & Milestones'}
                    </h3>
                    <p className="text-xs text-[#4A3B22] line-clamp-3 leading-relaxed">
                      {language === 'am'
                        ? 'ከሐዋርያው ፊልጶስ ዘመን፣ ከአክሱም መንግሥት፣ ከዘጠኙ ቅዱሳንና ከቅዱስ ያሬድ እስከ ላሊበላ ፍልፍል አብያተ ክርስቲያናት ድረስ ያለው ባለ ሁለት ሺህ ዓመት ታሪክ።'
                        : 'Explore 2,000 years of unbroken history: the Eunuch of Acts 8, Ezana’s Aksum, Nine Saints, St. Yared, Lalibela monoliths, and modern autocephaly.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E6DFD1] text-xs font-bold text-[#855B09]">
                    <span>{language === 'am' ? 'የታሪክ ዘመናትን ይመልከቱ' : 'Explore Historical Timeline'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 4: Saints */}
              <div
                onClick={() => handleTabChange('saints')}
                className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col"
              >
                <div className="h-48 bg-gradient-to-tr from-[#4A000D] to-[#9E7F1E] relative overflow-hidden flex items-center justify-center p-6 text-white">
                  <div className="absolute -left-6 -top-6 w-36 h-36 bg-[#D4AF37]/20 rounded-full blur-xl" />
                  <div className="relative z-10 text-center space-y-2">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center">
                      <Award className="w-8 h-8 text-[#C8A84B]" />
                    </div>
                    <h4 className="text-xl font-bold font-geez">ቅዱሳን ወሰማዕታት</h4>
                    <p className="text-xs text-stone-300">Synaxarium Saints & Fathers</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#855B09] uppercase">Synaxarium</span>
                      <Award className="w-4 h-4 text-[#C8A84B]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2C1D07] group-hover:text-[#855B09] transition-colors">
                      {language === 'am' ? 'ቅዱሳን አበው' : 'Synaxarium Saints'}
                    </h3>
                    <p className="text-xs text-[#4A3B22] line-clamp-3 leading-relaxed">
                      {language === 'am'
                        ? 'የቅዱሳን ጻድቃን፣ ሰማዕታት፣ ገዳማውያን አበውና እናቶች መንፈሳዊ ተጋድሎና የቅድስና ታሪክ (መጽሐፈ ስንክሳር)።'
                        : 'Biographies, feast days, and spiritual triumphs of righteous fathers: St. Frumentius, St. Yared, St. Tekle Haymanot, Abba Aregawi, and more.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E6DFD1] text-xs font-bold text-[#855B09]">
                    <span>{language === 'am' ? 'የቅዱሳን ስንክሳርን ይክፈቱ' : 'Browse Saints & Commemorations'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 5: Dioceses */}
              <div
                onClick={() => handleTabChange('dioceses')}
                className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col md:col-span-2 lg:col-span-2"
              >
                <div className="h-48 bg-gradient-to-tr from-[#0E1B30] via-[#1A3A5C] to-[#855B09] relative overflow-hidden flex items-center justify-between p-8 text-white">
                  <div className="relative z-10 space-y-2 max-w-md">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#C8A84B] text-[#1A2C1C] px-2.5 py-0.5 rounded-full">
                      GLOBAL EPISCOPAL SEES
                    </span>
                    <h4 className="text-2xl font-bold font-geez">አህጉረ ስብከት</h4>
                    <p className="text-xs text-stone-200">
                      14+ Dioceses across Ethiopia, Jerusalem, North America, Europe, Africa, and the Caribbean.
                    </p>
                  </div>
                  <div className="hidden sm:flex w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center shrink-0">
                    <Globe className="w-10 h-10 text-[#C8A84B]" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#855B09] uppercase">Jurisdictions</span>
                      <MapPin className="w-4 h-4 text-[#C8A84B]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2C1D07] group-hover:text-[#855B09] transition-colors">
                      {language === 'am' ? 'አህጉረ ስብከትና ሊቃነ ጳጳሳት' : 'Dioceses & Archdioceses'}
                    </h3>
                    <p className="text-xs text-[#4A3B22] leading-relaxed">
                      {language === 'am'
                        ? 'በሀገር ውስጥና በውጭ ሀገራት የሚገኙ አህጉረ ስብከት፣ የሊቃነ ጳጳሳት መንበረ ስብከት፣ አድባራትና ገዳማት ዝርዝር መረጃ።'
                        : 'Discover dioceses worldwide: episcopal seats, consecrated archbishops, active parishes, historic monasteries, and contact directories.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E6DFD1] text-xs font-bold text-[#855B09]">
                    <span>{language === 'am' ? 'ሁሉንም አህጉረ ስብከት ይመልከቱ' : 'Explore All 14+ Dioceses'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. FAITH OVERVIEW: TEWAHEDO CHRISTOLOGY & PILLARS */}
          <section className="bg-gradient-to-br from-[#FFF8E7] via-[#FAF8F3] to-[#FFF5DB] p-8 md:p-10 rounded-3xl border-2 border-[#D4AF37] shadow-md space-y-8 relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 opacity-10 pointer-events-none">
              <Sparkles className="w-72 h-72 text-[#855B09]" />
            </div>

            <div className="space-y-3 relative z-10 max-w-4xl">
              <div className="flex items-center gap-2 text-[#855B09]">
                <Sparkles className="w-6 h-6 text-[#C8A84B]" />
                <span className="text-xs font-bold uppercase tracking-wider">ORTHODOX TEWAHEDO DOCTRINE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2C1D07] font-serif">
                {language === 'am' ? 'የተዋሕዶ ሃይማኖት ምሥጢር' : 'Faith Overview: Tewahedo Christology'}
              </h2>
              <p className="text-sm md:text-base text-[#4A3B22] leading-relaxed">
                <strong>"Tewahedo" (ተዋሕዶ)</strong> is an ancient Ge'ez term meaning <strong>"Made One" or "Unification"</strong>. It encapsulates the Oriental Orthodox Christological doctrine of the <strong>One Incarnate Nature of God the Word (Miaphysitism — ተዋሕዶ)</strong>, as formulated by Saint Cyril of Alexandria (*Mia Physis tou Theou Logou Sesarkomene*).
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#E6DFD1] text-sm text-[#2C1D07] font-medium leading-relaxed italic border-l-4 border-l-[#C8A84B]">
                "We confess Our Lord and Savior Jesus Christ as perfect God and perfect Man, united without confusion (እምቅብዓት), without change (እምውላጤ), without division (እምፍልጠት), and without separation (እምቱሳሔ)."
              </div>
            </div>

            {/* Five Pillars of Mystery (አምስቱ አዕማደ ምሥጢር) */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-2">
                <h3 className="text-lg font-bold text-[#2C1D07] font-geez flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#855B09]" />
                  <span>{language === 'am' ? 'አምስቱ አዕማደ ምሥጢር' : 'The Five Pillars of Mystery (አምስቱ አዕማደ ምሥጢር)'}</span>
                </h3>
                <span className="text-xs text-[#855B09] font-medium">Foundational Dogma</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PILLARS_OF_MYSTERY.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="bg-white p-5 rounded-xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-full bg-[#FFF8E7] border border-[#C8A84B] text-xs font-bold text-[#855B09] flex items-center justify-center">
                        {pillar.number}
                      </span>
                      <span className="text-[10px] font-mono text-[#855B09] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E6DFD1]">
                        {pillar.scriptureRef}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#2C1D07] text-sm font-geez">{pillar.titleAmharic}</h4>
                      <p className="text-xs font-semibold text-[#855B09]">{pillar.titleEnglish}</p>
                    </div>

                    <p className="text-xs text-[#4A3B22] leading-relaxed pt-1">
                      {pillar.summary}
                    </p>
                  </div>
                ))}

                {/* 6th Card: 81 Biblical Canon */}
                <div className="bg-gradient-to-br from-[#2C1D07] to-[#1A2C1C] p-5 rounded-xl text-white space-y-2 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="badge-gold text-[9px]">CANON OF 81 BOOKS</span>
                      <BookOpen className="w-4 h-4 text-[#C8A84B]" />
                    </div>
                    <h4 className="font-bold text-white text-sm font-geez">ሰማንያ አሐዱ (81) መጻሕፍት</h4>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      The Ethiopian Orthodox Church possesses the fullest biblical canon on earth, preserving Enoch (ሄኖክ), Jubilees (ኩፋሌ), and 4 Books of Sinodos.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveView('scripture')}
                    className="text-xs text-[#C8A84B] font-bold flex items-center gap-1 hover:underline pt-2"
                  >
                    <span>Read Scripture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: Patriarch Page (Hero, Biography, Pastoral Letter, Lineage, Teachings)
          ========================================================================= */}
      {subSection === 'patriarch' && (
        <div className="space-y-12 animate-fadeIn">
          {/* 1. HERO SECTION: Full-width Photo, Name & Titles in English + Amharic */}
          <section className="bg-gradient-to-br from-[#1C1205] via-[#2C1D07] to-[#3D2200] rounded-3xl border-2 border-[#C8A84B] shadow-2xl overflow-hidden text-white relative">
            {/* Background Texture & Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center p-6 sm:p-10 lg:p-12">
              {/* Patriarch Portrait */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-sm w-full">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C8A84B] via-[#D4AF37] to-[#9E7F1E] rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-[#0E1B30] rounded-2xl overflow-hidden border-2 border-[#C8A84B] shadow-2xl">
                    <img
                      src={PATRIARCH_BIO.photoUrl}
                      alt={PATRIARCH_BIO.nameEnglish}
                      className="w-full h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                      <span className="badge-gold text-[10px] uppercase font-bold self-start mb-1">
                        6th Catholicos Patriarch
                      </span>
                      <p className="text-xs text-[#FFF5DB] font-medium">111th Successor to Saint Frumentius (Abba Salama)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patriarch Title & Identity */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {language === 'am' ? 'ፓትርያርክ ርእሰ ሊቃነ ጳጳሳት' : 'SUPREME PATRIARCH OF ETHIOPIA'}
                    </span>
                    <span className="bg-white/10 text-stone-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                      {language === 'am' ? 'መንበረ ተክለ ሃይማኖት' : 'See of Saint Tekle Haymanot'}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight drop-shadow-md">
                    {PATRIARCH_BIO.nameAmharic}
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] font-serif">
                    {PATRIARCH_BIO.nameEnglish}
                  </h2>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 space-y-2 text-xs sm:text-sm text-stone-200">
                  <div className="text-[#C8A84B] font-bold uppercase text-[11px] tracking-wider">
                    {language === 'am' ? 'ሙሉ ማዕርግ' : 'Full Canonical Title'}
                  </div>
                  <p className="font-geez leading-relaxed font-semibold text-white">
                    {PATRIARCH_BIO.titleAmharic}
                  </p>
                  <p className="text-stone-300 italic pt-1 text-xs">
                    "{PATRIARCH_BIO.titleEnglish}"
                  </p>
                </div>

                {/* Quick Info Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                    <span className="block text-[10px] text-[#C8A84B] font-bold uppercase">Enthroned</span>
                    <span className="font-bold text-xs sm:text-sm text-white">March 3, 2013</span>
                    <span className="block text-[10px] text-stone-400">Megabit 24, 2005 E.C.</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                    <span className="block text-[10px] text-[#C8A84B] font-bold uppercase">Birthplace</span>
                    <span className="font-bold text-xs sm:text-sm text-white">{PATRIARCH_BIO.birthPlace}</span>
                    <span className="block text-[10px] text-stone-400">1941 E.C. (1948 GC)</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl col-span-2 sm:col-span-1">
                    <span className="block text-[10px] text-[#C8A84B] font-bold uppercase">Enthronement Seat</span>
                    <span className="font-bold text-xs sm:text-sm text-white">Holy Trinity Cathedral</span>
                    <span className="block text-[10px] text-stone-400">Addis Ababa</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. BIOGRAPHY & MINISTRY SECTION */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-10">
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
      )}

      {/* =========================================================================
          VIEW 3: Holy Synod (Overview, Members Directory, Decisions, Schedule, Historical Docs)
          ========================================================================= */}
      {subSection === 'synod' && (
        <div className="space-y-12 animate-fadeIn">
          {/* 1. SYNOD OVERVIEW: Role, Governance & Functions */}
          <section className="bg-gradient-to-br from-[#0B1728] via-[#0E1F36] to-[#1A3A5C] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/15 pb-8">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {language === 'am' ? 'የበላይ የውሳኔና የሕግ አውጪ አካል' : 'SUPREME ECCLESIASTICAL AUTHORITY'}
                  </span>
                  <span className="bg-white/10 text-stone-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                    Apostolic Canons & Fetha Negest
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
                  ቅዱስ ሲኖዶስ (The Holy Synod)
                </h1>
                <p className="text-sm md:text-base text-stone-200 leading-relaxed max-w-3xl">
                  {language === 'am'
                    ? 'ቅዱስ ሲኖዶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ከፍተኛው መንፈሳዊና ሕጋዊ አስተዳዳሪ አካል ነው። በብፁዕ ወቅዱስ ፓትርያርኩ ፕሬዚዳንትነት በሀገር ውስጥና በመላው ዓለም የሚገኙ ሊቃነ ጳጳሳትና ኤጲስ ቆጶሳትን በሙሉ ያቀፈ ሲሆን፣ በዓመት ሁለት ጊዜ በዋና ምልዓተ ጉባኤ (በጥቅምትና በግንቦት) ይሰበሰባል።'
                    : 'The Holy Synod is the supreme legislative, judicial, and pastoral authority of the Ethiopian Orthodox Tewahedo Church. Presided over by His Holiness the Catholicos Patriarch, it unites all consecrated archbishops and bishops worldwide to safeguard orthodox dogma, legislate church canons, appoint hierarchs, and guide over 60 million faithful.'}
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3 max-w-xs w-full shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#C8A84B] to-[#9E7F1E] mx-auto flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white font-geez text-base">መንበረ ሲኖዶስ</h3>
                    <p className="text-xs text-[#D4AF37] font-semibold">Holy Synod Assembly Chamber</p>
                    <p className="text-[11px] text-stone-300 pt-1">Patriarchate Headquarters, Addis Ababa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How the Synod Functions - 4 Structural Pillars */}
            <div className="relative z-10 space-y-4">
              <h3 className="text-base font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Ecclesiastical Structure & Functional Organs</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 hover:border-[#C8A84B]/60 p-5 rounded-2xl transition-all space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ፩
                  </div>
                  <h4 className="font-bold text-white font-geez text-sm">የፓትርያርኩ ፕሬዚዳንትነት</h4>
                  <p className="text-xs font-semibold text-[#D4AF37]">Patriarchal Presidency</p>
                  <p className="text-xs text-stone-300 leading-relaxed pt-1">
                    His Holiness the Catholicos Patriarch convenes, moderates, and ratifies all synodal sessions and official pastoral decrees.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 hover:border-[#C8A84B]/60 p-5 rounded-2xl transition-all space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ፪
                  </div>
                  <h4 className="font-bold text-white font-geez text-sm">ምልዓተ ጉባኤ (ጥቅምትና ግንቦት)</h4>
                  <p className="text-xs font-semibold text-[#D4AF37]">Biannual Plenary Assembly</p>
                  <p className="text-xs text-stone-300 leading-relaxed pt-1">
                    Full assembly of all global bishops in Autumn (Tikimt) and Spring (Ginbot) for major canonical and administrative legislation.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 hover:border-[#C8A84B]/60 p-5 rounded-2xl transition-all space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ፫
                  </div>
                  <h4 className="font-bold text-white font-geez text-sm">ቋሚ ቅዱስ ሲኖዶስ</h4>
                  <p className="text-xs font-semibold text-[#D4AF37]">Standing Executive Synod</p>
                  <p className="text-xs text-stone-300 leading-relaxed pt-1">
                    Chaired weekly by the Patriarch, General Manager, and selected Metropolitans for immediate episcopal and diocesan oversight.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 hover:border-[#C8A84B]/60 p-5 rounded-2xl transition-all space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C8A84B]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ፬
                  </div>
                  <h4 className="font-bold text-white font-geez text-sm">ጠቅላይ ቤተ ክህነትና ፍርድ ቤት</h4>
                  <p className="text-xs font-semibold text-[#D4AF37]">Chancellery & Spiritual Court</p>
                  <p className="text-xs text-stone-300 leading-relaxed pt-1">
                    Directs departments of evangelism, monastic preservation, youth ministries, and canonical discipline via Fetha Negest.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. SYNOD MEMBERS DIRECTORY: Grid/List with Region & Search */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">HIERARCHS DIRECTORY</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#855B09]" />
                  <span>{language === 'am' ? 'የቅዱስ ሲኖዶስ አባላት ሊቃነ ጳጳሳት' : 'Holy Synod Members Directory'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Consecrated archbishops, metropolitans, and diocesan bishops across Ethiopia and the diaspora.
                </p>
              </div>

              {/* Region Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                {(['All', 'Patriarchate Administration', 'Ethiopia', 'Diaspora', 'Holy Land & Foreign'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedSynodRegion(r)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedSynodRegion === r
                        ? 'bg-[#C8A84B] text-[#1A2C1C]'
                        : 'text-[#6B7280] hover:bg-[#FAF8F3]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#855B09] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bishop by name, title, or diocese..."
                value={synodSearchQuery}
                onChange={(e) => setSynodSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6DFD1] text-xs focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3]"
              />
            </div>

            {/* Synod Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                .map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedSynodMember(member)}
                    className="bg-[#FAF8F3] hover:bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="h-44 bg-gradient-to-tr from-[#1A3A5C] to-[#0E1F36] relative overflow-hidden">
                      <img
                        src={member.photoUrl}
                        alt={member.nameEnglish}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <span className="badge-gold text-[9px] uppercase font-bold">
                          {member.region}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-[#2C1D07] font-geez text-base group-hover:text-[#855B09] transition-colors">
                          {member.nameAmharic}
                        </h3>
                        <h4 className="text-xs font-semibold text-[#855B09]">{member.nameEnglish}</h4>
                        <p className="text-[11px] text-[#6B7280] line-clamp-2 pt-1">
                          <strong>Diocese:</strong> {member.dioceseEnglish}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E6DFD1] flex items-center justify-between text-[10px] text-[#855B09] font-bold">
                        <span>{member.roleEnglish}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
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
      )}

      {/* =========================================================================
          VIEW 4: Church History (Timeline, Key Figures, Independence, Doctrine, Fetha Negest)
          ========================================================================= */}
      {subSection === 'history' && (
        <div className="space-y-14 animate-fadeIn">
          {/* History Hero */}
          <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {language === 'am' ? 'ባለ ሁለት ሺህ ዓመት ታሪክ' : 'TWO MILLENNIA OF UNBROKEN FAITH'}
                </span>
                <span className="bg-white/10 text-stone-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                  From Acts 8 to 21st Century
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
                ታሪከ ቤተ ክርስቲያን (Church History)
              </h1>
              <p className="text-sm md:text-base text-stone-200 leading-relaxed">
                {language === 'am'
                  ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ታሪክ ከአፍሪካ ጥንታዊው ክርስቲያናዊ ቅርስ ጋር የተሳሰረ ነው። በሐዋርያው ቅዱስ ፊልጶስ የተጠመቀው የንግሥት ህንደኬ ጃንደረባ፣ የንጉሥ ኢዛና እና የቅዱስ ፍሬምናጦስ ዘመነ አክሱም፣ የዘጠኙ ቅዱሳን ገዳማዊ ተጋድሎ፣ የቅዱስ ያሬድ ዜማ፣ የላሊበላ ፍልፍል አብያተ ክርስቲያናት እና የ፲፱፻፶፩ ዓ.ም. ራስ ገዝነት ታላላቅ ምዕራፎች ናቸው።'
                  : 'From the baptism of the royal treasurer by Saint Philip in 34 AD (Acts 8) to King Ezana’s Aksum, Saint Yared’s sacred melodies, Lalibela’s rock-hewn wonders, the 17th-century defense of Cyrillian faith in Gondar, 1959 autocephaly, and today’s worldwide digital ministry.'}
              </p>
            </div>
          </section>

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
      )}

      {/* =========================================================================
          VIEW 5: Synaxarium Saints & Commemorations
          ========================================================================= */}
      {subSection === 'saints' && (
        <div className="space-y-12 animate-fadeIn">
          {/* 1. SAINTS HERO */}
          <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {language === 'am' ? 'መጽሐፈ ስንክሳር' : 'THE SYNAXARIUM OF THE SAINTS'}
                </span>
                <span className="bg-white/10 text-stone-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                  Liturgical Calendar of Saints & Martyrs
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
                ቅዱሳን ወሰማዕታት (Holy Saints & Fathers)
              </h1>
              <p className="text-sm md:text-base text-stone-200 leading-relaxed">
                {language === 'am'
                  ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በየዕለቱ የቅዱሳንን፣ የሰማዕታትን፣ የሐዋርያትን እና የአበውን በዓላት በስንክሳር ታስባለች። እመቤታችን ቅድስት ድንግል ማርያም፣ ሊቀ ሰማዕታት ቅዱስ ጊዮርጊስ፣ አቡነ ተክለ ሃይማኖት፣ ቅዱስ ያሬድ እና ሌሎችም ቅዱሳን በጸሎታቸውና በቃል ኪዳናቸው ይታሰባሉ።'
                  : 'Commemorating the righteous ascetics, holy martyrs, apostles, and monastic luminaries whose prayers, miracles, and covenants preserve the faith of the Ethiopian Orthodox Tewahedo Church.'}
              </p>
            </div>
          </section>

          {/* 2. DAILY SAINT ("Saint of the Day" / የዕለቱ ቅዱስ) */}
          <section className="bg-gradient-to-br from-[#FFF8E7] via-white to-[#FFF5DB] p-8 rounded-3xl border-2 border-[#D4AF37] shadow-lg relative overflow-hidden space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#C8A84B] text-[#1A2C1C] flex items-center justify-center shadow-md">
                  <Sun className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <span className="badge-gold text-[10px] uppercase font-bold">TODAY'S COMMEMORATION</span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">
                    የዕለቱ ቅዱስ (Saint of the Day)
                  </h2>
                </div>
              </div>

              <div className="text-xs font-mono font-bold text-[#855B09] bg-white px-3 py-1.5 rounded-xl border border-[#E6DFD1] shadow-sm">
                Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ወርሃ ነሐሴ (Nehase)
              </div>
            </div>

            {/* Featured Daily Saint Card (Filseta / Nehase Fast commemoration) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 relative group">
                <div className="w-full h-72 rounded-2xl overflow-hidden border-2 border-[#C8A84B] shadow-md relative">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800"
                    alt="Holy Virgin Mary Assumption"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="badge-gold text-[9px] mb-1 inline-block">THEOTOKOS • ጾመ ፍልሰታ</span>
                    <h3 className="text-lg font-bold font-geez">እመቤታችን ቅድስት ድንግል ማርያም</h3>
                    <p className="text-xs text-stone-200">The Glorious Assumption (Filseta)</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#855B09] font-geez bg-white px-2.5 py-0.5 rounded border border-[#E6DFD1]">
                      ነሐሴ ፲፮ (Nehase 16)
                    </span>
                    <span className="text-xs text-[#6B7280]">Annual Feast Day</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#2C1D07] font-serif">
                    Dormition, Resurrection & Bodily Assumption of the Theotokos
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                  During the holy 16-day Fast of Filseta (ጾመ ፍልሰታ), the faithful across all Ethiopian churches gather at dawn for daily Eucharistic Liturgies celebrating the resurrection and heavenly translation of the Holy Virgin Mary's body to Paradise.
                </p>

                {/* Daily Synaxarium Excerpt & Hymn */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6DFD1] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#855B09]">
                    <span className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5" />
                      Daily Ge'ez Hymn (የዕለቱ ማኅሌት)
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('ተፈሥሒ ማርያም ድንግልተ ሥጋ ወሕሊና፡ ዘተወከፍኪ ቃልነ እምኀበ መልአክ በድንግልና።');
                        setCopiedHymnId('daily-filseta');
                        setTimeout(() => setCopiedHymnId(null), 2500);
                      }}
                      className="text-[11px] text-[#855B09] hover:text-[#2C1D07] flex items-center gap-1 font-semibold"
                    >
                      {copiedHymnId === 'daily-filseta' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedHymnId === 'daily-filseta' ? 'Copied' : 'Copy Hymn'}</span>
                    </button>
                  </div>
                  <p className="font-geez text-xs sm:text-sm text-[#2C1D07] font-semibold leading-relaxed">
                    "ተፈሥሒ ማርያም ድንግልተ ሥጋ ወሕሊና፡ ዘተወከፍኪ ቃልነ እምኀበ መልአክ በድንግልና።"
                  </p>
                  <p className="text-xs text-[#6B7280] italic">
                    "Rejoice, O Virgin Mary, pure in flesh and mind, who received the archangel’s greeting in immaculate virginity."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. SYNAXARIUM (SENKESAR) SEARCH & CATEGORIES */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="space-y-6 border-b border-[#E6DFD1] pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="badge-gold text-[10px] uppercase font-bold">LITURGICAL CALENDAR ARCHIVE</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-[#855B09]" />
                    <span>{language === 'am' ? 'መጽሐፈ ስንክሳር (የቅዱሳን ማውጫ)' : 'Synaxarium (Senkesar Archive)'}</span>
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Search and explore saint commemorations by category, month, and feast day.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#855B09] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={saintSearchQuery}
                    onChange={(e) => setSaintSearchQuery(e.target.value)}
                    placeholder={language === 'am' ? 'በስም ወይም በበዓል ፈልግ...' : 'Search saint name, feast...'}
                    className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#C8A84B]"
                  />
                </div>
              </div>

              {/* Month Selector */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#855B09] uppercase tracking-wider">Filter by Ethiopian Month (የግዕዝ ወራት):</div>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  {['All', 'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 'Megabit', 'Miyazya', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSynaxariumMonth(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        synaxariumMonth === m
                          ? 'bg-[#855B09] text-white shadow-sm'
                          : 'bg-[#FAF8F3] text-[#4A3B22] hover:bg-[#FFF8E7] border border-[#E6DFD1]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#855B09] uppercase tracking-wider">Filter by Category:</div>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  {['All', 'Theotokos (St. Mary)', 'Apostles', 'Martyrs', 'Monks & Ascetics', 'Church Fathers', 'Ethiopian Saints'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSaintCategory(cat as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedSaintCategory === cat
                          ? 'bg-[#C8A84B] text-[#1A2C1C]'
                          : 'text-[#6B7280] hover:bg-[#FAF8F3]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. SAINT PROFILES & ICON GALLERY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_SAINTS
                .filter((saint) => {
                  const matchesCategory = selectedSaintCategory === 'All' || saint.category === selectedSaintCategory;
                  const matchesMonth = synaxariumMonth === 'All' || saint.ethiopianMonth === synaxariumMonth;
                  const matchesSearch = !saintSearchQuery || 
                    saint.nameEnglish.toLowerCase().includes(saintSearchQuery.toLowerCase()) ||
                    saint.nameAmharic.includes(saintSearchQuery) ||
                    saint.title.toLowerCase().includes(saintSearchQuery.toLowerCase()) ||
                    saint.feastDay.toLowerCase().includes(saintSearchQuery.toLowerCase());
                  return matchesCategory && matchesMonth && matchesSearch;
                })
                .map((saint) => (
                  <div
                    key={saint.id}
                    onClick={() => setSelectedSaint(saint)}
                    className="bg-[#FAF8F3] hover:bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col justify-between group space-y-4"
                  >
                    {/* Authentic Icon Top Image */}
                    <div className="h-44 w-full relative overflow-hidden bg-stone-900">
                      <img
                        src={saint.iconUrl}
                        alt={saint.nameEnglish}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="badge-gold text-[9px] shadow-sm">{saint.category}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-lg font-bold font-geez group-hover:text-[#C8A84B] transition-colors line-clamp-1">
                          {saint.nameAmharic}
                        </h3>
                        <p className="text-xs text-stone-300 font-semibold line-clamp-1">{saint.nameEnglish}</p>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="px-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-xs font-mono font-bold text-[#855B09] bg-white px-2.5 py-0.5 rounded border border-[#E6DFD1]">
                          {saint.feastDay}
                        </span>
                        <span className="text-[11px] text-[#6B7280]">{saint.century}</span>
                      </div>

                      <p className="text-xs text-[#4A3B22] line-clamp-3 leading-relaxed">
                        {saint.shortBio}
                      </p>

                      <div className="text-[11px] text-[#855B09] bg-white p-2.5 rounded-lg border border-[#E6DFD1]">
                        <strong>Origin / See:</strong> {saint.monasteryOrOrigin}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 bg-white border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                      <span className="flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5" />
                        Hymns & Miracles
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Profile <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* 5. SAINT DETAIL MODAL (Biography, Miracles, Prayers & Hymns) */}
            {selectedSaint && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="badge-gold text-[10px]">{selectedSaint.category}</span>
                        <span className="text-xs font-mono text-[#855B09] font-bold">{selectedSaint.century}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">{selectedSaint.nameAmharic}</h3>
                      <p className="text-sm font-bold text-[#855B09]">{selectedSaint.nameEnglish}</p>
                      <p className="text-xs text-[#6B7280] italic">{selectedSaint.title}</p>
                    </div>
                    <button
                      onClick={() => setSelectedSaint(null)}
                      className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-5 text-xs sm:text-sm text-[#4A3B22]">
                    {/* Feast & Origin Info */}
                    <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] font-bold text-[#855B09] uppercase">FEAST DAY (የበዓል ቀን)</div>
                        <div className="font-bold text-[#2C1D07] text-sm">{selectedSaint.feastDay} ({selectedSaint.gregorianDate})</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#855B09] uppercase">MONASTERY / ORIGIN</div>
                        <div className="font-bold text-[#2C1D07] text-sm">{selectedSaint.monasteryOrOrigin}</div>
                      </div>
                    </div>

                    {/* Biography */}
                    <div>
                      <h4 className="font-bold text-[#2C1D07] text-sm mb-1.5">Spiritual Life & Synaxarium Account</h4>
                      <p className="leading-relaxed">{selectedSaint.shortBio}</p>
                    </div>

                    {/* Miracles */}
                    {selectedSaint.miracles && selectedSaint.miracles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-[#2C1D07] text-sm flex items-center gap-2">
                          <Flame className="w-4 h-4 text-[#C8A84B]" />
                          <span>Notable Miracles & Acts (ተአምራት)</span>
                        </h4>
                        <ul className="space-y-1.5 bg-[#FFF8E7] p-3.5 rounded-xl border border-[#E6DFD1]">
                          {selectedSaint.miracles.map((m, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-[#4A3B22]">
                              <span className="text-[#855B09] font-bold">•</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Associated Prayer / Hymn */}
                    {selectedSaint.prayersAndHymns && (
                      <div className="space-y-2 bg-[#FAF8F3] p-4 rounded-xl border border-[#D4AF37]">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-[#855B09] text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Music className="w-3.5 h-3.5" />
                            <span>{selectedSaint.prayersAndHymns.title}</span>
                          </h4>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${selectedSaint.prayersAndHymns.geezText}\n${selectedSaint.prayersAndHymns.amharicText}`);
                              setCopiedHymnId(selectedSaint.id);
                              setTimeout(() => setCopiedHymnId(null), 2500);
                            }}
                            className="text-[11px] text-[#855B09] hover:text-[#2C1D07] flex items-center gap-1 font-semibold"
                          >
                            {copiedHymnId === selectedSaint.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedHymnId === selectedSaint.id ? 'Copied' : 'Copy Prayer'}</span>
                          </button>
                        </div>
                        <p className="font-geez text-sm text-[#2C1D07] font-semibold leading-relaxed pt-1">
                          {selectedSaint.prayersAndHymns.geezText}
                        </p>
                        <p className="text-xs text-[#4A3B22] font-geez">
                          {selectedSaint.prayersAndHymns.amharicText}
                        </p>
                        <p className="text-[11px] text-[#6B7280] italic">
                          {selectedSaint.prayersAndHymns.englishTranslation}
                        </p>
                      </div>
                    )}

                    {/* Contributions */}
                    <div>
                      <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider mb-1">Legacy & Contributions</h4>
                      <p className="leading-relaxed bg-white p-3 rounded-lg border border-[#E6DFD1] text-xs">
                        {selectedSaint.contributions}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSaint(null)}
                    className="w-full btn-gold py-2.5 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* =========================================================================
          VIEW 6: Dioceses & Global Administrations
          ========================================================================= */}
      {subSection === 'dioceses' && (
        <div className="space-y-12 animate-fadeIn">
          {/* 1. DIOCESES HERO */}
          <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {language === 'am' ? 'አህጉረ ስብከት' : 'GLOBAL METROPOLITAN SEES'}
                </span>
                <span className="bg-white/10 text-stone-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                  14+ Dioceses Across 5 Continents
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
                አህጉረ ስብከት (Dioceses & Archdioceses)
              </h1>
              <p className="text-sm md:text-base text-stone-200 leading-relaxed">
                {language === 'am'
                  ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በኢትዮጵያ፣ በቅድስት ሀገር ኢየሩሳሌም፣ በሰሜን አሜሪካ፣ በአውሮፓ፣ በአውስትራሊያና በካሪቢያን የሚገኙ ከ፲፬ በላይ ዓበይት አህጉረ ስብከቶችንና በሺዎች የሚቆጠሩ አብያተ ክርስቲያናትን በቅዱስ ሲኖዶስ አመራር ታስተዳድራለች።'
                  : 'The Ethiopian Orthodox Tewahedo Church administers more than 14 primary domestic and international archdioceses spanning Ethiopia, the Holy Land (Jerusalem), North America, Western Europe, the Caribbean, and Australia.'}
              </p>
            </div>
          </section>

          {/* 2. DIASPORA DIOCESES SPOTLIGHT */}
          <section className="bg-gradient-to-br from-[#FAF8F3] via-white to-[#FFF8E7] p-8 rounded-3xl border-2 border-[#C8A84B] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-4">
              <div>
                <span className="badge-gold text-[10px] uppercase font-bold">INTERNATIONAL PRESENCE</span>
                <h2 className="text-xl sm:text-2xl font-black text-[#2C1D07] font-serif flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#855B09]" />
                  <span>{language === 'am' ? 'የዲያስፖራ አህጉረ ስብከት' : 'Diaspora Archdioceses & Global Ministries'}</span>
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedDioceseRegion('Diaspora');
                  setSelectedDiasporaSubRegion('All');
                }}
                className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View All Diaspora Sees</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'North America (East & Canada)', see: 'Washington, D.C. / Toronto', sub: 'North America', parishes: '95+ Parishes', icon: '🏛️' },
                { name: 'Western United States', see: 'Los Angeles / Oakland', sub: 'North America', parishes: '65+ Parishes', icon: '☀️' },
                { name: 'UK & Western Europe', see: 'London / Paris / Frankfurt', sub: 'Europe', parishes: '45+ Parishes', icon: '🏰' },
                { name: 'Australia & New Zealand', see: 'Melbourne / Sydney / Auckland', sub: 'Australia & Oceania', parishes: '28+ Parishes', icon: '🌏' },
              ].map((diaspora, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedDioceseRegion('Diaspora');
                    setSelectedDiasporaSubRegion(diaspora.sub);
                  }}
                  className="bg-white p-4 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="text-2xl">{diaspora.icon}</div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#2C1D07] group-hover:text-[#855B09] transition-colors">
                    {diaspora.name}
                  </h3>
                  <div className="text-[11px] text-[#6B7280]">{diaspora.see}</div>
                  <div className="text-[10px] font-bold text-[#855B09] pt-1 border-t border-[#E6DFD1]">
                    {diaspora.parishes}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. DIOCESE DIRECTORY: List, Search, and Region Filters */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="space-y-6 border-b border-[#E6DFD1] pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="badge-gold text-[10px] uppercase font-bold">DIRECTORY & SEES</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                    <Church className="w-6 h-6 text-[#855B09]" />
                    <span>{language === 'am' ? 'የአህጉረ ስብከት ማውጫ' : 'Diocese Directory'}</span>
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Browse all domestic and diaspora archdioceses by geographical jurisdiction.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-[#855B09] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={language === 'am' ? 'ሀገረ ስብከት፣ ከተማ ወይም ጳጳስ ፈልግ...' : 'Search diocese, city, bishop, cathedral...'}
                    value={dioceseSearchQuery}
                    onChange={(e) => setDioceseSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6DFD1] text-xs focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3]"
                  />
                </div>
              </div>

              {/* Primary Region Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {(['All', 'Ethiopia', 'Diaspora', 'Historical See'] as const).map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setSelectedDioceseRegion(region);
                      setSelectedDiasporaSubRegion('All');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedDioceseRegion === region
                        ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm'
                        : 'text-[#6B7280] hover:bg-[#FAF8F3] border border-[#E6DFD1]'
                    }`}
                  >
                    {region === 'Ethiopia' ? 'Ethiopian Sees (ሀገር ውስጥ)' : region === 'Diaspora' ? 'Diaspora Sees (ውጭ ሀገር)' : region === 'Historical See' ? 'Historical See (ኢየሩሳሌም)' : 'All Jurisdictions'}
                  </button>
                ))}
              </div>

              {/* Diaspora Sub-region filter when Diaspora selected */}
              {(selectedDioceseRegion === 'Diaspora' || selectedDioceseRegion === 'All') && (
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-[#855B09] uppercase tracking-wider">Filter by World Region:</div>
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                    {['All', 'North America', 'Europe', 'Australia & Oceania', 'Middle East', 'Caribbean & Latin America'].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedDiasporaSubRegion(sub)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap ${
                          selectedDiasporaSubRegion === sub
                            ? 'bg-[#855B09] text-white shadow-sm'
                            : 'bg-[#FAF8F3] text-[#4A3B22] hover:bg-[#FFF8E7] border border-[#E6DFD1]'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Diocese Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDioceses.map((diocese) => (
                <div
                  key={diocese.id}
                  onClick={() => setSelectedDiocese(diocese)}
                  className="bg-[#FAF8F3] hover:bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all p-6 space-y-4 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="badge-gold text-[9px]">{diocese.region}</span>
                      <span className="text-xs text-[#6B7280] flex items-center gap-1 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-[#C8A84B]" />
                        {diocese.seeCity}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                        {diocese.nameAmharic}
                      </h3>
                      <p className="text-xs font-semibold text-[#855B09]">{diocese.nameEnglish}</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E6DFD1] space-y-1 text-xs">
                      <div className="text-[#855B09] font-bold">Archbishop (ሊቀ ጳጳስ):</div>
                      <div className="text-[#2C1D07] font-semibold font-geez">{diocese.archbishopAmharic}</div>
                      <div className="text-[#6B7280] text-[11px]">{diocese.archbishopEnglish}</div>
                    </div>

                    <div className="text-xs text-[#6B7280]">
                      <strong className="text-[#2C1D07]">Cathedral:</strong> {diocese.cathedral}
                    </div>

                    <p className="text-xs text-[#4A3B22] line-clamp-2 leading-relaxed">
                      {diocese.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#2C1D07]">{diocese.parishesCount} Parishes • {diocese.monasteriesCount} Monasteries</span>
                    <span className="text-[#855B09] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Profile <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. DIOCESAN NEWS & ANNOUNCEMENTS */}
          <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">ECCLESIASTICAL DISPATCHES</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <Newspaper className="w-6 h-6 text-[#855B09]" />
                  <span>{language === 'am' ? 'የአህጉረ ስብከት ዜናዎችና ሁነቶች' : 'Diocesan News & Announcements'}</span>
                </h2>
                <p className="text-sm text-[#6B7280]">
                  Recent pastoral visits, clergy ordinations, youth conferences, and sanctuary consecrations across all dioceses.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_DIOCESAN_NEWS.map((news) => (
                <div
                  key={news.id}
                  onClick={() => setSelectedDiocesanNews(news)}
                  className="bg-[#FAF8F3] hover:bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="badge-gold text-[9px]">{news.category}</span>
                      <span className="text-xs font-mono text-[#855B09] bg-white px-2 py-0.5 rounded border border-[#E6DFD1]">
                        {news.date}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#855B09] uppercase">{news.dioceseName}</span>
                      <h3 className="text-base sm:text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors pt-0.5">
                        {news.titleAmharic}
                      </h3>
                      <h4 className="text-xs font-semibold text-[#4A3B22]">{news.title}</h4>
                    </div>

                    <p className="text-xs text-[#4A3B22] leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                    <span>Read Full Dispatch</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Diocesan News Detail Modal */}
            {selectedDiocesanNews && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp">
                  <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                    <div className="space-y-1">
                      <span className="badge-gold text-[10px]">{selectedDiocesanNews.category} • {selectedDiocesanNews.dioceseName}</span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">{selectedDiocesanNews.titleAmharic}</h3>
                      <p className="text-xs font-bold text-[#855B09]">{selectedDiocesanNews.title}</p>
                    </div>
                    <button
                      onClick={() => setSelectedDiocesanNews(null)}
                      className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="text-xs font-mono text-[#855B09] bg-[#FAF8F3] p-2.5 rounded-lg border border-[#E6DFD1]">
                    Published: {selectedDiocesanNews.date}
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#4A3B22]">
                    <h4 className="font-bold text-[#2C1D07]">Executive Summary</h4>
                    <p className="leading-relaxed bg-[#FFF8E7] p-3 rounded-lg border border-[#E6DFD1]">
                      {selectedDiocesanNews.summary}
                    </p>

                    <h4 className="font-bold text-[#2C1D07]">Full Story</h4>
                    <p className="leading-relaxed">{selectedDiocesanNews.fullStory}</p>
                  </div>

                  <button
                    onClick={() => setSelectedDiocesanNews(null)}
                    className="w-full btn-gold py-2.5 text-xs font-bold"
                  >
                    Close Dispatch
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 5. DIOCESE DETAIL PROFILE MODAL (/our-church/dioceses/[slug]) */}
          {selectedDiocese && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="badge-gold text-[10px]">{selectedDiocese.region}</span>
                      <span className="text-xs font-mono text-[#855B09] font-bold">See: {selectedDiocese.seeCity}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">{selectedDiocese.nameAmharic}</h3>
                    <p className="text-sm font-bold text-[#855B09]">{selectedDiocese.nameEnglish}</p>
                  </div>
                  <button
                    onClick={() => setSelectedDiocese(null)}
                    className="text-[#6B7280] hover:text-[#2C1D07] text-lg font-bold p-2"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-5 text-xs sm:text-sm text-[#4A3B22]">
                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6DFD1]">
                      <div className="text-[10px] font-bold text-[#855B09] uppercase">Parishes</div>
                      <div className="font-bold text-[#2C1D07] text-base">{selectedDiocese.parishesCount}+ Parishes</div>
                    </div>
                    <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6DFD1]">
                      <div className="text-[10px] font-bold text-[#855B09] uppercase">Monasteries</div>
                      <div className="font-bold text-[#2C1D07] text-base">{selectedDiocese.monasteriesCount} Monasteries</div>
                    </div>
                    <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6DFD1] col-span-2 sm:col-span-1">
                      <div className="text-[10px] font-bold text-[#855B09] uppercase">Consecration</div>
                      <div className="font-bold text-[#2C1D07] text-xs sm:text-sm">{selectedDiocese.consecrationYear}</div>
                    </div>
                  </div>

                  {/* Archbishop Card */}
                  <div className="bg-gradient-to-br from-[#FFF8E7] to-[#FAF8F3] p-4 rounded-xl border border-[#D4AF37] space-y-1">
                    <div className="text-[10px] font-bold text-[#855B09] uppercase tracking-wider">Metropolitan Archbishop (ሊቀ ጳጳስ)</div>
                    <div className="font-bold text-[#2C1D07] text-base font-geez">{selectedDiocese.archbishopAmharic}</div>
                    <div className="text-xs text-[#6B7280]">{selectedDiocese.archbishopEnglish}</div>
                  </div>

                  {/* Cathedral & History */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#855B09]" />
                        Principal Cathedral & Chancellery
                      </h4>
                      <p className="bg-[#FAF8F3] p-3 rounded-lg border border-[#E6DFD1] font-semibold text-[#2C1D07]">
                        {selectedDiocese.cathedral}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider mb-1">History & Jurisdiction Background</h4>
                      <p className="leading-relaxed">{selectedDiocese.historySummary}</p>
                    </div>
                  </div>

                  {/* Featured Parishes List */}
                  {selectedDiocese.featuredParishes && selectedDiocese.featuredParishes.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Church className="w-3.5 h-3.5 text-[#855B09]" />
                        Notable Parishes in This Diocese
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedDiocese.featuredParishes.map((p, idx) => (
                          <div key={idx} className="bg-[#FAF8F3] p-2.5 rounded-xl border border-[#E6DFD1] text-xs space-y-0.5">
                            <div className="font-bold text-[#2C1D07]">{p.name}</div>
                            <div className="text-[11px] text-[#855B09] font-geez">{p.nameAmharic}</div>
                            <div className="text-[10px] text-[#6B7280]">{p.city} • Est. {p.established}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E6DFD1] space-y-2">
                    <h4 className="font-bold text-[#855B09] text-xs uppercase tracking-wider">Chancellery Contact Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#855B09]" />
                        <span>{selectedDiocese.contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#855B09]" />
                        <span>{selectedDiocese.contactInfo.email}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="w-3.5 h-3.5 text-[#855B09]" />
                        <span>{selectedDiocese.contactInfo.address}</span>
                      </div>
                      {selectedDiocese.contactInfo.website && (
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <ExternalLink className="w-3.5 h-3.5 text-[#855B09]" />
                          <a href={selectedDiocese.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-[#855B09] hover:underline font-semibold">
                            {selectedDiocese.contactInfo.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#E6DFD1]">
                  <button
                    onClick={() => {
                      setSelectedDiocese(null);
                      setActiveView('find-a-church');
                    }}
                    className="flex-1 btn-gold py-2.5 text-xs flex items-center justify-center gap-2 font-bold"
                  >
                    <Church className="w-4 h-4" />
                    <span>Find Parishes in This Diocese</span>
                  </button>
                  <button
                    onClick={() => setSelectedDiocese(null)}
                    className="px-6 py-2.5 text-xs font-bold border border-[#E6DFD1] rounded-xl hover:bg-[#FAF8F3]"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
