import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import type { LanguageMode } from './LanguageContext';
import { SearchModal } from '../modals/SearchModal';
import {
  Globe,
  Menu,
  X,
  Search,
  LogIn,
  ChevronDown,
  BookOpen,
  Compass,
  Heart,
  GraduationCap,
  Newspaper,
  Church,
  Sparkles,
  ChevronRight,
  Shield
} from 'lucide-react';

/* ── EOTC Official Emblem ──────────────────────────────── */
const EOTCLogo: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img
      src="/assets/images/eotc_emblem.png"
      alt="EOTC Official Emblem"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        transform: 'scale(1.6)',
        display: 'block'
      }}
    />
  </div>
);

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    activeView,
    setActiveView,
    setIsAuthOpen,
  } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.querySelector('section');
      if (heroEl) {
        const threshold = heroEl.offsetHeight - 80;
        setIsScrolled(window.scrollY >= threshold);
      } else {
        setIsScrolled(window.scrollY > 600);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'home',          labelEn: 'Home',           labelAm: 'መነሻ', icon: Church },
    { 
      id: 'scripture',     
      labelEn: 'Scripture',      
      labelAm: 'መጽሐፍ ቅዱስ',
      icon: BookOpen,
      dropdown: [
        { id: 'scripture', labelEn: 'Scripture Hub', labelAm: 'ቅዱሳት መጻሕፍት ማዕከል' },
        { id: 'scripture/bible', labelEn: 'Holy Bible (81 Books)', labelAm: 'መጽሐፍ ቅዱስ (፹፩)' },
        { id: 'scripture/prayer', labelEn: 'Prayer Books', labelAm: 'የጸሎት መጻሕፍት' },
        { id: 'scripture/liturgy', labelEn: 'Liturgical Texts', labelAm: 'የቅዳሴ መጻሕፍት' },
        { id: 'scripture/geez', labelEn: "Ge'ez Learning", labelAm: 'ግዕዝ ትምህርት' },
      ]
    },
    { 
      id: 'resources',
      labelEn: 'Orthodox Resources',
      labelAm: 'ኦርቶዶክሳዊ ሀብታት',
      icon: Sparkles,
      dropdown: [
        { id: 'resources', labelEn: 'Orthodox Resources Hub', labelAm: 'የሀብታት ማዕከል' },
        { id: 'resources/calendar', labelEn: 'Liturgical Calendar', labelAm: 'የአብነት የቀን መቁጠሪያ' },
        { id: 'resources/fasting', labelEn: 'Fasting Guide', labelAm: 'የጾም መመሪያ' },
        { id: 'resources/sermons', labelEn: 'Sermons', labelAm: 'ስብከቶች' },
        { id: 'resources/mezmur', labelEn: 'Mezmur & Hymns', labelAm: 'መዝሙራት' },
      ]
    },
    { 
      id: 'our-church',
      labelEn: 'Our Church',
      labelAm: 'ቤተ ክርስቲያን',
      icon: Shield,
      dropdown: [
        { id: 'our-church', labelEn: 'Our Church Hub', labelAm: 'የቤተ ክርስቲያን ማዕከል' },
        { id: 'our-church/patriarch', labelEn: 'Patriarch', labelAm: 'ፓትርያርክ' },
        { id: 'our-church/synod', labelEn: 'Holy Synod', labelAm: 'ቅዱስ ሲኖዶስ' },
        { id: 'our-church/history', labelEn: 'Church History', labelAm: 'የቤተ ክርስቲያን ታሪክ' },
        { id: 'our-church/saints', labelEn: 'Saints', labelAm: 'ቅዱሳን' },
        { id: 'our-church/dioceses', labelEn: 'Dioceses', labelAm: 'አህጉረ ስብከት' },
      ]
    },
    { 
      id: 'find-a-church', 
      labelEn: 'Find a Church', 
      labelAm: 'ቤተክርስቲያን ፈልግ',
      icon: Compass,
      dropdown: [
        { id: 'find-a-church', labelEn: 'Church Hub & Map', labelAm: 'የአብያተ ክርስቲያናት ማዕከል' },
        { id: 'find-a-church/services', labelEn: 'Upcoming Services', labelAm: 'መጪ አገልግሎቶች' },
        { id: 'find-a-church/events', labelEn: 'Events Near You', labelAm: 'በአቅራቢያ ያሉ ክስተቶች' }
      ]
    },
    { 
      id: 'give', 
      labelEn: 'Give', 
      labelAm: 'ምጽዋት',
      icon: Heart,
      dropdown: [
        { id: 'give', labelEn: 'Giving Hub', labelAm: 'ዋና ማዕከል' },
        { id: 'give/church', labelEn: 'Give to a Parish', labelAm: 'ለደብር መዋጮ' },
        { id: 'give/monastery', labelEn: 'Adopt a Monastery', labelAm: 'ገዳም ይደግፉ' },
        { id: 'give/campaigns', labelEn: 'Active Campaigns', labelAm: 'ልዩ ዘመቻዎች' },
        { id: 'give/general', labelEn: 'General Church Fund', labelAm: 'ማዕከላዊ ፈንድ' },
        { id: 'give/transparency', labelEn: 'Financial Transparency', labelAm: 'የፋይናንስ ግልጽነት' },
        { id: 'give/account', labelEn: 'Donor Portal', labelAm: 'የለጋሽ ፖርታል' },
      ]
    },
    { 
      id: 'academy', 
      labelEn: 'Academy', 
      labelAm: 'አካዳሚ',
      icon: GraduationCap,
      dropdown: [
        { id: 'academy', labelEn: 'Academy Hub', labelAm: 'ዋና ማዕከል' },
        { id: 'academy/children', labelEn: 'Children (5–12)', labelAm: 'ልጆች (5-12)' },
        { id: 'academy/youth', labelEn: 'Youth (13–18)', labelAm: 'ወጣቶች (13-18)' },
        { id: 'academy/gebi-gubaye', labelEn: 'Gebi Gubaye (18–25)', labelAm: 'ግቢ ጉባኤ' },
        { id: 'academy/adults', labelEn: 'Adults & Catechumens', labelAm: 'አዋቂዎች' },
        { id: 'academy/clergy', labelEn: 'Clergy & Scholars', labelAm: 'ካህናት' },
        { id: 'academy/certificates', labelEn: 'My Certificates', labelAm: 'የምስክር ወረቀቶች' },
        { id: 'academy/webinars', labelEn: 'Live Webinars', labelAm: 'የቀጥታ ስብከቶች' },
      ]
    },
    { 
      id: 'news', 
      labelEn: 'News', 
      labelAm: 'ዜና',
      icon: Newspaper,
      dropdown: [
        { id: 'news', labelEn: 'News Hub', labelAm: 'ዋና ማዕከል' },
        { id: 'news/announcements', labelEn: 'EOTC Announcements', labelAm: 'የቤተክርስቲያን ማስታወቂያዎች' },
        { id: 'news/pan-orthodox', labelEn: 'Pan-Orthodox News', labelAm: 'ዓለም አቀፍ ኦርቶዶክስ' },
        { id: 'news/magazine', labelEn: 'Sime Tsion Magazine', labelAm: 'ስምዐ ጽድቅ መጽሔት' },
        { id: 'news/newsletter', labelEn: 'Weekly Newsletter', labelAm: 'ሳምንታዊ ዜና መጽሔት' }
      ]
    },
  ];

  const langLabel =
    language === 'am' ? 'AM' :
    language === 'ge' ? 'GE' :
    language === 'ti' ? 'TI' : 'EN';

  const isTransparent = activeView === 'home' && !isScrolled && !mobileMenuOpen;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
        background: mobileMenuOpen 
          ? '#07241B' 
          : isTransparent 
            ? 'linear-gradient(to bottom, rgba(7,28,18,0.85) 0%, rgba(7,28,18,0.4) 60%, transparent 100%)' 
            : '#FFFFFF',
        backdropFilter: isTransparent && !mobileMenuOpen ? 'none' : 'blur(16px)',
        borderBottom: isTransparent && !mobileMenuOpen ? 'none' : '1px solid #E8E0D0',
        boxShadow: isTransparent && !mobileMenuOpen ? 'none' : '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-[72px] sm:h-[80px]">

          {/* ── LOGO ─────────────────────────────────────── */}
          <button
            onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 sm:gap-3 bg-transparent border-0 cursor-pointer shrink-0 text-left p-0"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
              <EOTCLogo size={50} />
            </div>
            <div className="leading-tight">
              <div className={`text-base sm:text-lg lg:text-xl font-black tracking-tight transition-colors duration-300 ${
                isTransparent && !mobileMenuOpen ? 'text-white' : mobileMenuOpen ? 'text-white' : 'text-[#1A2C1C]'
              }`}>
                EOTC
              </div>
              <div className={`text-[9px] sm:text-[10.5px] font-medium leading-tight transition-colors duration-300 hidden xs:block ${
                isTransparent && !mobileMenuOpen ? 'text-stone-300' : mobileMenuOpen ? 'text-stone-300' : 'text-stone-500'
              }`}>
                Ethiopian Orthodox<br />Tewahedo Church
              </div>
            </div>
          </button>

          {/* ── NAV LINKS (Desktop: lg screens and up) ───────────────────────── */}
          <nav className="hidden lg:flex items-stretch h-full mx-4 space-x-0.5 xl:space-x-1">
            {navItems.map(item => {
              const isActive =
                activeView === item.id ||
                (item.id !== 'home' && activeView.startsWith(item.id + '/'));
                
              if (item.dropdown) {
                return (
                  <div 
                    key={item.id} 
                    className="relative flex items-center h-full"
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => setActiveView(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 h-full border-b-2 text-xs xl:text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                        isActive 
                          ? 'border-[#C8A84B] text-[#C8A84B] font-bold' 
                          : isTransparent 
                            ? 'border-transparent text-white/90 hover:text-[#C8A84B]' 
                            : 'border-transparent text-stone-700 hover:text-[#C8A84B]'
                      }`}
                    >
                      <span>{language === 'en' ? item.labelEn : item.labelAm}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#C8A84B] transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.id && (
                      <div className="absolute top-full left-0 bg-[#0B251B] border border-[#C8A84B]/30 border-t-2 border-t-[#C8A84B] rounded-b-xl min-w-[230px] shadow-2xl py-2 z-50 animate-fadeIn">
                        {item.dropdown.map(sub => {
                          const isSubActive = activeView === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => { setActiveView(sub.id); setActiveDropdown(null); }}
                              className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between group cursor-pointer ${
                                isSubActive
                                  ? 'bg-[#C8A84B]/20 text-[#E5C158] font-bold'
                                  : 'text-stone-200 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <span>{language === 'en' ? sub.labelEn : sub.labelAm}</span>
                              <ChevronRight className="w-3 h-3 text-[#C8A84B] opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center px-3 py-2 h-full border-b-2 text-xs xl:text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'border-[#C8A84B] text-[#C8A84B] font-bold' 
                      : isTransparent 
                        ? 'border-transparent text-white/90 hover:text-[#C8A84B]' 
                        : 'border-transparent text-stone-700 hover:text-[#C8A84B]'
                  }`}
                >
                  {language === 'en' ? item.labelEn : item.labelAm}
                </button>
              );
            })}
          </nav>

          {/* ── RIGHT CONTROLS (Desktop & Mobile) ────────────────────────────── */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isTransparent && !mobileMenuOpen
                  ? 'text-white hover:bg-white/15'
                  : mobileMenuOpen
                    ? 'text-white hover:bg-white/15'
                    : 'text-stone-700 hover:text-[#855B09] hover:bg-[#FAF8F3]'
              }`}
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Language Selector (Desktop Dropdown) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 h-9 sm:h-10 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isTransparent && !mobileMenuOpen
                    ? 'border-white/30 text-white bg-white/10 hover:bg-white/20'
                    : mobileMenuOpen
                      ? 'border-white/30 text-white bg-white/10'
                      : 'border-[#E5E7EB] text-stone-700 hover:border-[#C8A84B] bg-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-[#C8A84B]" />
                <span>{langLabel}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-[#E5E7EB] rounded-xl shadow-xl overflow-hidden min-w-[170px] z-50 animate-fadeIn">
                  {[
                    { code: 'am', label: 'አማርኛ (Amharic)' },
                    { code: 'en', label: 'English' },
                    { code: 'ge', label: "ግዕዝ (Ge'ez)" },
                    { code: 'ti', label: 'ትግርኛ (Tigrinya)' },
                  ].map(item => (
                    <button
                      key={item.code}
                      onClick={() => { setLanguage(item.code as LanguageMode); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold border-b border-stone-100 last:border-0 transition-colors cursor-pointer ${
                        language === item.code ? 'bg-[#FFF8E7] text-[#855B09]' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Button (Hidden on small mobile screens to save space for hamburger) */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className={`hidden md:flex items-center gap-2 h-9 sm:h-10 px-4 sm:px-5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                isTransparent && !mobileMenuOpen
                  ? 'bg-[#C8A84B] text-[#0A1A0F] hover:bg-[#DEBC68] shadow-sm'
                  : 'bg-[#0B3B2B] text-white hover:bg-[#07241B] shadow-sm'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Login' : 'ግባ'}</span>
            </button>

            {/* Hamburger Button (Mobile / Tablet only: lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isTransparent && !mobileMenuOpen
                  ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                  : mobileMenuOpen
                    ? 'bg-white/20 text-[#E5C158]'
                    : 'bg-[#FAF8F3] text-[#0B3B2B] border border-[#E6DFD1] hover:bg-[#FFF8E7]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ── FULL-FEATURED MOBILE DRAWER OVERLAY ─────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[72px] sm:top-[80px] bottom-0 bg-[#071C12]/98 backdrop-blur-xl border-t border-white/10 z-50 flex flex-col justify-between overflow-y-auto animate-fadeIn text-white">
            
            {/* Top Quick Actions Bar (Search + Language Tabs) */}
            <div className="p-4 border-b border-white/10 space-y-3 bg-[#05150E]">
              {/* Mobile Search Button */}
              <button
                onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 text-xs text-stone-300 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#C8A84B]" />
                  <span>Search scripture, saints, parishes...</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-white/15 px-2 py-0.5 rounded text-[#C8A84B]">⌘K</span>
              </button>

              {/* 4 Language Pills */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
                {[
                  { code: 'am', label: 'አማርኛ' },
                  { code: 'en', label: 'English' },
                  { code: 'ge', label: 'ግዕዝ' },
                  { code: 'ti', label: 'ትግርኛ' },
                ].map(item => (
                  <button
                    key={item.code}
                    onClick={() => setLanguage(item.code as LanguageMode)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                      language === item.code
                        ? 'bg-[#C8A84B] text-[#0A1A0F] shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Nav Accordion List */}
            <div className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id || activeView.startsWith(item.id + '/');
                const isExpanded = mobileExpandedSection === item.id;

                if (item.dropdown) {
                  return (
                    <div key={item.id} className="rounded-2xl overflow-hidden border border-white/5 bg-white/5">
                      <button
                        onClick={() => setMobileExpandedSection(isExpanded ? null : item.id)}
                        className={`w-full flex items-center justify-between p-3.5 text-left text-sm font-bold transition-colors cursor-pointer ${
                          isActive ? 'text-[#E5C158]' : 'text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isActive ? 'bg-[#C8A84B]/20 text-[#C8A84B]' : 'bg-white/10 text-stone-300'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div>{language === 'en' ? item.labelEn : item.labelAm}</div>
                            <div className="text-[10px] text-stone-400 font-normal">
                              {language === 'en' ? item.labelAm : item.labelEn}
                            </div>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#C8A84B] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="p-2 space-y-1 bg-black/30 border-t border-white/10">
                          {item.dropdown.map(sub => {
                            const isSubActive = activeView === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setActiveView(sub.id);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                                  isSubActive
                                    ? 'bg-[#C8A84B] text-[#0A1A0F] font-bold'
                                    : 'text-stone-200 hover:bg-white/10'
                                }`}
                              >
                                <span>{language === 'en' ? sub.labelEn : sub.labelAm}</span>
                                <ChevronRight className={`w-3.5 h-3.5 ${isSubActive ? 'text-[#0A1A0F]' : 'text-[#C8A84B]'}`} />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left text-sm font-bold transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-[#C8A84B] text-[#0A1A0F] border-[#C8A84B] font-bold shadow-md'
                        : 'bg-white/5 text-white border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-[#0A1A0F]/20 text-[#0A1A0F]' : 'bg-white/10 text-stone-300'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{language === 'en' ? item.labelEn : item.labelAm}</div>
                        <div className={`text-[10px] font-normal ${isActive ? 'text-[#0A1A0F]/80' : 'text-stone-400'}`}>
                          {language === 'en' ? item.labelAm : item.labelEn}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                );
              })}
            </div>

            {/* Mobile Drawer Footer Actions */}
            <div className="p-4 border-t border-white/10 bg-[#05150E] space-y-3">
              <button
                onClick={() => { setIsAuthOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl bg-[#C8A84B] hover:bg-[#DEBC68] text-[#0A1A0F] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{language === 'en' ? 'Login to Parishioner Portal' : 'ወደ ምዕመናን ፖርታል ይግቡ'}</span>
              </button>
              
              <div className="text-center text-[10px] text-stone-400">
                © 2026 Ethiopian Orthodox Tewahedo Church Patriarchate
              </div>
            </div>

          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
