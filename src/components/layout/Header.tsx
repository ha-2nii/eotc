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
        transform: 'scale(1.7)',
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the hero section height dynamically so header stays transparent until reaching the 2nd section
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

  const navItems = [
    { id: 'home',          labelEn: 'Home',           labelAm: 'መነሻ' },
    { 
      id: 'scripture',     
      labelEn: 'Scripture',      
      labelAm: 'መጽሐፍ ቅዱስ',
      dropdown: [
        { id: 'scripture/bible', labelEn: 'Holy Bible', labelAm: 'መጽሐፍ ቅዱስ' },
        { id: 'scripture/prayer', labelEn: 'Prayer Books', labelAm: 'የጸሎት መጻሕፍት' },
        { id: 'scripture/liturgy', labelEn: 'Liturgical Texts', labelAm: 'የቅዳሴ መጻሕፍት' },
        { id: 'scripture/geez', labelEn: "Ge'ez Learning", labelAm: 'ግዕዝ ትምህርት' },
      ]
    },
    { 
      id: 'worship',
      labelEn: 'Worship',
      labelAm: 'አምልኮ',
      dropdown: [
        { id: 'worship/zema', labelEn: 'Zema & Chant', labelAm: 'ዜማ እና ዝማሬ' },
        { id: 'worship/stand', labelEn: 'Digital Chant Stand', labelAm: 'የዜማ መቆሚያ' },
        { id: 'worship/calendar', labelEn: 'Liturgical Calendar', labelAm: 'የአብነት የቀን መቁጠሪያ' },
        { id: 'worship/fasting', labelEn: 'Fasting Guide', labelAm: 'የጾም መመሪያ' },
        { id: 'worship/sermons', labelEn: 'Sermons', labelAm: 'ስብከቶች' },
      ]
    },
    { 
      id: 'our-church',
      labelEn: 'Our Church',
      labelAm: 'ቤተ ክርስቲያን',
      dropdown: [
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
      dropdown: [
        { id: 'find-a-church/map', labelEn: 'Church Map', labelAm: 'የቤተክርስቲያን ካርታ' },
        { id: 'find-a-church/services', labelEn: 'Upcoming Services', labelAm: 'መጪ አገልግሎቶች' },
        { id: 'find-a-church/events', labelEn: 'Events Near You', labelAm: 'በአቅራቢያ ያሉ ክስተቶች' }
      ]
    },
    { 
      id: 'give', 
      labelEn: 'Give', 
      labelAm: 'ምጽዋት',
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

  const isTransparent = activeView === 'home' && !isScrolled;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: isTransparent
          ? 'linear-gradient(to bottom, rgba(13,26,15,0.7) 0%, transparent 100%)'
          : '#FFFFFF',
        backdropFilter: isTransparent ? 'none' : 'blur(12px)',
        borderBottom: isTransparent ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E8E0D0',
        boxShadow: isTransparent ? 'none' : '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          height: '80px', gap: '0', padding: '0 2rem',
        }}>

          {/* ── LOGO ─────────────────────────────────────── */}
          <button
            onClick={() => setActiveView('home')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'none', border: 'none', cursor: 'pointer',
              flexShrink: 0, marginRight: '32px',
            }}
          >
            <div style={{ width: '64px', height: '64px', flexShrink: 0 }}>
              <EOTCLogo size={64} />
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
              <div style={{
                fontSize: '20px', fontWeight: 900,
                color: isTransparent ? '#FFFFFF' : '#1A2C1C', letterSpacing: '-0.02em',
                fontFamily: 'var(--font-sans)', transition: 'color 0.3s'
              }}>EOTC</div>
              <div style={{
                fontSize: '10px', color: isTransparent ? 'rgba(255,255,255,0.7)' : '#4B5563',
                fontWeight: 500, lineHeight: 1.4, transition: 'color 0.3s'
              }}>Ethiopian Orthodox<br />Tewahedo Church</div>
            </div>
          </button>

          {/* ── NAV LINKS (desktop) ───────────────────────── */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex', alignItems: 'stretch',
              flex: 1, height: '100%',
            }}
          >
            {navItems.map(item => {
              const isActive =
                activeView === item.id ||
                (item.id !== 'home' && activeView.startsWith(item.id + '/'));
                
              if (item.dropdown) {
                return (
                  <div 
                    key={item.id} 
                    style={{ position: 'relative', display: 'flex' }}
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => setActiveView(item.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '0 13px', background: 'none', border: 'none',
                        borderBottom: isActive ? '2px solid #C8A84B' : '2px solid transparent',
                        color: isActive ? '#C8A84B' : (isTransparent ? '#FFFFFF' : '#374151'),
                        fontWeight: isActive ? 700 : 500, fontSize: '13px',
                        cursor: 'pointer', transition: 'color 0.3s, border-color 0.15s',
                        whiteSpace: 'nowrap',
                        fontFamily: language === 'en' ? 'var(--font-sans)' : 'var(--font-geez)',
                      }}
                    >
                      {language === 'en' ? item.labelEn : item.labelAm}
                      <ChevronDown style={{ width: '14px', height: '14px', color: '#C8A84B' }} />
                    </button>
                    {activeDropdown === item.id && (
                      <div style={{
                        position: 'absolute', top: '100%', left: 0,
                        background: '#1D3043', borderRadius: '0 0 6px 6px',
                        minWidth: '220px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                        padding: '8px 0', zIndex: 100, border: '1px solid rgba(255,255,255,0.05)',
                        borderTop: '2px solid #C8A84B'
                      }}>
                        {item.dropdown.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => { setActiveView(sub.id); setActiveDropdown(null); }}
                            style={{
                              display: 'block', width: '100%', textAlign: 'left',
                              padding: '12px 20px', background: 'none', border: 'none',
                              color: '#FFFFFF', fontSize: '14px', fontWeight: 500,
                              cursor: 'pointer',
                              borderBottom: '1px solid rgba(255,255,255,0.05)'
                            }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2B455D'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                          >
                            {language === 'en' ? sub.labelEn : sub.labelAm}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '0 13px',
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #C8A84B' : '2px solid transparent',
                    color: isActive ? '#C8A84B' : (isTransparent ? '#FFFFFF' : '#374151'),
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'color 0.3s, border-color 0.15s',
                    whiteSpace: 'nowrap',
                    fontFamily: language === 'en' ? 'var(--font-sans)' : 'var(--font-geez)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#C8A84B';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = isTransparent ? '#FFFFFF' : '#374151';
                  }}
                >
                  {language === 'en' ? item.labelEn : item.labelAm}
                </button>
              );
            })}
          </nav>

          {/* ── RIGHT CONTROLS ────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', flexShrink: 0 }}>
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: 'none', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: isTransparent ? '#FFFFFF' : '#6B7280',
                transition: 'color 0.3s, background 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#C8A84B';
                (e.currentTarget as HTMLElement).style.background = isTransparent ? 'rgba(255,255,255,0.1)' : '#FFF8E7';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = isTransparent ? '#FFFFFF' : '#6B7280';
                (e.currentTarget as HTMLElement).style.background = 'none';
              }}
            >
              <Search style={{ width: '18px', height: '18px' }} />
            </button>

            {/* Language */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  height: '36px', padding: '0 10px',
                  background: isTransparent ? 'rgba(255,255,255,0.1)' : 'none',
                  border: isTransparent ? '1px solid rgba(255,255,255,0.25)' : '1px solid #E5E7EB',
                  borderRadius: '8px', color: isTransparent ? '#FFFFFF' : '#374151',
                  cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                  transition: 'border-color 0.15s, color 0.3s, background 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#C8A84B'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = isTransparent ? 'rgba(255,255,255,0.25)' : '#E5E7EB'}
              >
                <Globe style={{ width: '14px', height: '14px', color: isTransparent ? 'rgba(255,255,255,0.8)' : '#6B7280' }} />
                <span>{langLabel}</span>
                <ChevronDown style={{ width: '12px', height: '12px', color: isTransparent ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }} />
              </button>

              {langDropdownOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 4px)',
                  background: '#fff', border: '1px solid #E5E7EB',
                  borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  overflow: 'hidden', minWidth: '160px', zIndex: 99,
                }} className="animate-fadeIn">
                  {[
                    { code: 'am', label: 'አማርኛ (Amharic)' },
                    { code: 'en', label: 'English' },
                    { code: 'ge', label: "ግዕዝ (Ge'ez)" },
                    { code: 'ti', label: 'ትግርኛ (Tigrinya)' },
                  ].map(item => (
                    <button
                      key={item.code}
                      onClick={() => { setLanguage(item.code as LanguageMode); setLangDropdownOpen(false); }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 14px', fontSize: '13px', fontWeight: 500,
                        background: language === item.code ? '#FFF8E7' : 'transparent',
                        color: language === item.code ? '#C8A84B' : '#374151',
                        border: 'none', cursor: 'pointer',
                        borderBottom: '1px solid #F3F4F6',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => {
                        if (language !== item.code)
                          (e.currentTarget as HTMLElement).style.background = '#F9FAFB';
                      }}
                      onMouseLeave={e => {
                        if (language !== item.code)
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >{item.label}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Login button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                height: '36px', padding: '0 18px',
                background: isTransparent ? 'rgba(255,255,255,0.12)' : '#1A2C1C',
                color: '#FFFFFF',
                border: isTransparent ? '1px solid rgba(255,255,255,0.35)' : 'none',
                borderRadius: isTransparent ? '20px' : '8px',
                fontWeight: 700, fontSize: '13px', cursor: 'pointer',
                backdropFilter: isTransparent ? 'blur(8px)' : 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                if (isTransparent) {
                  (e.currentTarget as HTMLElement).style.background = '#C8A84B';
                  (e.currentTarget as HTMLElement).style.color = '#1A2C1C';
                  (e.currentTarget as HTMLElement).style.borderColor = '#C8A84B';
                } else {
                  (e.currentTarget as HTMLElement).style.background = '#2D4A2D';
                }
              }}
              onMouseLeave={e => {
                if (isTransparent) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)';
                } else {
                  (e.currentTarget as HTMLElement).style.background = '#1A2C1C';
                }
              }}
            >
              <LogIn style={{ width: '14px', height: '14px' }} />
              {language === 'en' ? 'Login' : 'ግባ'}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                width: '36px', height: '36px', borderRadius: '8px',
                background: '#F3F4F6', border: 'none',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#374151',
              }}
            >
              {mobileMenuOpen
                ? <X style={{ width: '20px', height: '20px' }} />
                : <Menu style={{ width: '20px', height: '20px' }} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ─────────────────────────────────── */}
        {mobileMenuOpen && (
          <div style={{
            background: '#FFFFFF',
            borderTop: '1px solid #F3F4F6',
            padding: '12px 16px 16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }} className="animate-fadeIn">
            {navItems.map(item => {
              const isActive = activeView === item.id || activeView.startsWith(item.id + '/');
              return (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => {
                      if (item.dropdown) {
                        setActiveDropdown(activeDropdown === item.id ? null : item.id);
                      } else {
                        setActiveView(item.id); setMobileMenuOpen(false);
                      }
                    }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', borderRadius: '8px', marginBottom: '2px',
                      background: isActive && !item.dropdown ? '#FFF8E7' : 'transparent',
                      color: isActive ? '#C8A84B' : '#374151',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '14px', border: 'none', cursor: 'pointer',
                      fontFamily: language === 'en' ? 'var(--font-sans)' : 'var(--font-geez)',
                    }}
                  >
                    {language === 'en' ? item.labelEn : item.labelAm}
                    {item.dropdown && <ChevronDown style={{ width: '16px', height: '16px', transform: activeDropdown === item.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />}
                  </button>
                  {item.dropdown && activeDropdown === item.id && (
                    <div style={{ paddingLeft: '16px', marginBottom: '8px' }}>
                      {item.dropdown.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => { setActiveView(sub.id); setMobileMenuOpen(false); }}
                          style={{
                            width: '100%', display: 'block', textAlign: 'left',
                            padding: '10px 14px', borderRadius: '8px',
                            background: activeView === sub.id ? '#F9FAFB' : 'transparent',
                            color: activeView === sub.id ? '#C8A84B' : '#6B7280',
                            fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer'
                          }}
                        >
                          {language === 'en' ? sub.labelEn : sub.labelAm}
                        </button>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            <button
              onClick={() => { setIsAuthOpen(true); setMobileMenuOpen(false); }}
              style={{
                width: '100%', marginTop: '8px',
                padding: '10px', borderRadius: '8px',
                background: '#1A2C1C', color: '#FFF',
                fontWeight: 700, fontSize: '14px',
                border: 'none', cursor: 'pointer',
              }}
            >
              Login / Register
            </button>
          </div>
        )}
      </header>

      {/* Responsive rules */}
      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 768px) {
          .container {
            padding: 0 1rem !important;
          }
        }
      `}</style>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
