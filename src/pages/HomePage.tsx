import React from 'react';
import { useLanguage } from '../components/layout/LanguageContext';
import { SacredHeritageExplorer } from '../components/home/SacredHeritageExplorer';
import {
  BookOpen, Calendar, Heart, ChevronRight,
  ArrowUpRight, Users, MapPin
} from 'lucide-react';

const LATEST_NEWS_SLIDES = [
  {
    id: 'news-1',
    category: 'HOLY SYNOD',
    titleEn: 'Holy Synod of the EOTC Issues Pastoral Decree on Peace & Unity',
    titleAm: 'የኢ.ኦ.ተ.ቤ/ክ ቅዱስ ሲኖዶስ ስለ ሰላምና አንድነት የአገልግሎት መግለጫ አወጣ',
    dateEth: 'ነሐሴ 5, 2018 ዓ.ም.',
    dateGreg: 'Aug 11, 2026',
    image: '/assets/images/news_synod_bishops.jpg',
  },
  {
    id: 'news-2',
    category: 'PAN-ORTHODOX',
    titleEn: 'Pan-Orthodox Summit Reaffirms Shared Faith & Sacraments',
    titleAm: 'የፓን-ኦርቶዶክስ ጉባኤ እምነትና ሥርዓተ ቅዱሳትን በጋራ እንደሚያፀና አረጋገጠ',
    dateEth: 'ነሐሴ 2, 2018 ዓ.ም.',
    dateGreg: 'Aug 8, 2026',
    image: '/assets/images/news_pan_orthodox.jpg',
  },
  {
    id: 'news-3',
    category: 'COMMUNITY & SOCIAL',
    titleEn: 'Saint Yared Sacred Music Heritage Conference Held in Addis Ababa',
    titleAm: 'የቅዱስ ያሬድ ቅዱስ የመዝሙር ቅርስ ጉባኤ በአዲስ አበባ ተካሄደ',
    dateEth: 'ሐምሌ 28, 2018 ዓ.ም.',
    dateGreg: 'Aug 4, 2026',
    image: '/assets/images/news_yared_conference.jpg',
  },
];

export const HomePageView: React.FC = () => {
  const { language, setActiveView } = useLanguage();
  const [scrollY, setScrollY] = React.useState<number>(0);

  // Parallax scroll listener (optimized with requestAnimationFrame)
  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: 'var(--parchment)', minHeight: '100vh', fontFamily: 'var(--font-sans)', width: '100%', overflowX: 'hidden' }}>

      {/* ─── 1. HERO ─────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#1a1208'
      }}>
        {/* Full-bleed background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/assets/images/hero_church.jpg"
            alt="Holy Trinity Cathedral"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          {/* Left warm gradient overlay for text legibility */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(15,10,3,0.88) 0%, rgba(15,10,3,0.72) 38%, rgba(15,10,3,0.30) 65%, rgba(15,10,3,0.08) 100%)'
          }} />
          {/* Subtle bottom shadow vignette */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
            background: 'linear-gradient(to top, rgba(15,10,3,0.50) 0%, transparent 100%)'
          }} />
        </div>

        {/* Main content row */}
        <div className="container" style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '40px', paddingTop: '130px', paddingBottom: '70px',
          paddingLeft: 'clamp(24px, 5vw, 72px)',
          paddingRight: 'clamp(24px, 5vw, 72px)',
          maxWidth: '1480px',
          margin: '0 auto',
          width: '100%',
          flexWrap: 'wrap',
          boxSizing: 'border-box'
        }}>

          {/* ── Left: Text block ── */}
          <div style={{ maxWidth: '560px', flex: '1 1 340px' }}>

            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <span style={{
                fontSize: '11px', fontWeight: 700, color: '#D4AF37',
                letterSpacing: '0.12em', textTransform: 'uppercase'
              }}>
                Ethiopian Orthodox Tewahedo Church
              </span>
              <div style={{ width: '36px', height: '2px', background: '#D4AF37', borderRadius: '2px', flexShrink: 0 }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 900,
              color: '#FFFFFF', lineHeight: 1.08, marginBottom: '0',
              letterSpacing: '-0.02em', fontFamily: 'var(--font-sans)'
            }}>
              {language === 'en' ? 'One Faith.' : 'አንድ እምነት።'}
            </h1>
            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 900,
              color: '#FFFFFF', lineHeight: 1.08, marginBottom: '0',
              letterSpacing: '-0.02em', fontFamily: 'var(--font-sans)'
            }}>
              {language === 'en' ? 'One Church.' : 'አንድ ቤተ ክርስቲያን።'}
            </h1>
            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 900,
              lineHeight: 1.08, marginBottom: '20px',
              letterSpacing: '-0.02em', fontFamily: 'var(--font-sans)'
            }}>
              <span style={{ color: '#FFFFFF' }}>{language === 'en' ? 'One Body in ' : 'አንድ አካል በ'}</span>
              <span style={{ color: '#D4AF37' }}>{language === 'en' ? 'Christ.' : 'ክርስቶስ።'}</span>
            </h1>

            {/* Divider */}
            <div style={{ width: '52px', height: '3px', background: '#D4AF37', borderRadius: '2px', marginBottom: '20px' }} />

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(14px, 1.6vw, 16px)', color: 'rgba(255,255,255,0.80)', lineHeight: 1.75,
              maxWidth: '460px', marginBottom: '32px', fontFamily: 'var(--font-body)'
            }}>
              {language === 'en'
                ? 'Explore Scripture, worship, churches, and timeless teachings that strengthen our faith and unite us in love.'
                : 'ቅዱሳት መጻሕፍትን፣ አምልኮን፣ አብያተ ክርስቲያናትን እና እምነትን ያጠናክሩ።'}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '0' }}>
              <button
                onClick={() => setActiveView('scripture')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#1a1208', color: '#FFFFFF',
                  border: '2px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px', padding: '12px 24px',
                  fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#2a1e0a'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4AF37'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a1208'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
              >
                <BookOpen style={{ width: '15px', height: '15px' }} />
                {language === 'en' ? 'Explore Scripture' : 'ቅዱሳት መጻሕፍት'}
              </button>
              <button
                onClick={() => setActiveView('find-a-church')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', color: '#FFFFFF',
                  border: '2px solid rgba(255,255,255,0.5)',
                  borderRadius: '10px', padding: '12px 24px',
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4AF37'; (e.currentTarget as HTMLButtonElement).style.color = '#D4AF37'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF'; }}
              >
                <MapPin style={{ width: '15px', height: '15px' }} />
                {language === 'en' ? 'Find a Church' : 'ቤተ ክርስቲያን ፈልግ'}
              </button>
            </div>
          </div>

          {/* ── Right: Today's Verse Card ── */}
          <div style={{ flex: '0 0 auto', width: '320px', maxWidth: '100%' }}>
            <div style={{
              background: 'rgba(15, 10, 3, 0.55)', backdropFilter: 'blur(16px)',
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.40)',
              border: '1px solid rgba(212, 175, 55, 0.30)'
            }}>
              {/* Card header */}
              <div style={{
                background: 'rgba(212, 175, 55, 0.14)', borderBottom: '1px solid rgba(212, 175, 55, 0.22)',
                padding: '11px 18px', display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <BookOpen style={{ width: '14px', height: '14px', color: '#D4AF37' }} />
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Today's Verse
                </span>
              </div>
              {/* Card body */}
              <div style={{ padding: '18px 18px 14px' }}>
                <p style={{
                  fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.92)', lineHeight: 1.75,
                  fontFamily: 'var(--font-body)', fontStyle: 'italic', marginBottom: '10px'
                }}>
                  "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
                </p>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#D4AF37', marginBottom: '12px' }}>— John 3:16</p>
                <button
                  onClick={() => setActiveView('scripture')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    background: 'none', border: 'none', color: '#D4AF37',
                    fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0,
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  Read full scripture <ChevronRight style={{ width: '13px', height: '13px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div style={{ width: '100%', background: 'var(--parchment)', position: 'relative', overflow: 'hidden' }}>

        {/* ── Parallax Sacred Cross Watermarks for Section 2 — one per column ── */}
        {[
          { left: '3%' },
          { left: '28%' },
          { left: '53%' },
          { left: '78%' },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '20px',
              left: pos.left,
              width: 'min(20vw, 200px)',
              height: '250px',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
              opacity: 0.07,
              transform: `translateY(${scrollY * 0.14}px)`,
              willChange: 'transform',
              transition: 'transform 0.08s linear',
            }}
          >
            <img
              src="/assets/images/eotc_cross_watermark_transparent.png"
              alt="EOTC Sacred Cross Watermark"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        ))}

        {/* ─── 2. FEATURES (Exact Reference Design) ───────────────────── */}
        <section style={{ width: '100%', padding: '64px 0 0', position: 'relative', zIndex: 1 }}>
          <div className="container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            maxWidth: '1480px',
            margin: '0 auto',
            paddingLeft: 'clamp(24px, 5vw, 72px)',
            paddingRight: 'clamp(24px, 5vw, 72px)',
          }}>
          {[
            {
              iconEl: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M5 8.5C7.5 7 11 7.2 14.5 9.5V26.5C11 24.2 7.5 24 5 25.5V8.5Z" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round"/>
                  <path d="M27 8.5C24.5 7 21 7.2 17.5 9.5V26.5C21 24.2 24.5 24 27 25.5V8.5Z" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round"/>
                  <path d="M8 12.5H12M8 16.5H12M8 20.5H11" stroke="#1A3A5C" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M20 12.5H24M20 16.5H24M21 20.5H24" stroke="#1A3A5C" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ),
              titleEn: 'Scripture & Library',
              titleAm: 'ቅዱሳት መጻሕፍት',
              descEn: "Read the 81-book canon in Ge'ez, Amharic, and English. Study, listen, and explore the Word.",
              descAm: 'የ፹፩ ቅዱሳት መጻሕፍት ያንብቡ፣ ያዳምጡ፣ ያጥኑ።',
              linkEn: 'Explore Scripture',
              linkAm: 'ቅዱሳት መጻሕፍት',
              route: 'scripture'
            },
            {
              iconEl: (
                <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#1A3A5C">
                    {/* Vertical shaft */}
                    <rect x="20.8" y="11" width="2.4" height="23" rx="0.5" />
                    
                    {/* Horizontal crossbar */}
                    <rect x="15" y="16.8" width="14" height="2.4" rx="0.5" />

                    {/* Center intersection ornaments */}
                    <polygon points="20.5,16.5 22,14.8 23.5,16.5" />
                    <polygon points="20.5,19.5 22,21.2 23.5,19.5" />
                    <polygon points="19,16.5 17.3,18 19,19.5" />
                    <polygon points="25,16.5 26.7,18 25,19.5" />

                    {/* Top Finial (pierced diamond + 3 points) */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M22 2.5L27 7.5L22 12.5L17 7.5L22 2.5ZM22 5.2L19.7 7.5L22 9.8L24.3 7.5L22 5.2Z" />
                    <polygon points="22,0.5 23.8,3.2 20.2,3.2" />
                    <polygon points="29.2,5.2 26.2,6.5 27.5,8.8" />
                    <polygon points="14.8,5.2 16.5,8.8 17.8,6.5" />

                    {/* Left Finial (pierced diamond + 3 points) */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.5 13L16.5 18L11.5 23L6.5 18L11.5 13ZM11.5 15.7L9.2 18L11.5 20.3L13.8 18L11.5 15.7Z" />
                    <polygon points="4.5,18 7.2,16.2 7.2,19.8" />
                    <polygon points="9.2,10.8 10.5,13.8 12.8,12.5" />
                    <polygon points="9.2,25.2 12.8,23.5 10.5,22.2" />

                    {/* Right Finial (pierced diamond + 3 points) */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M32.5 13L37.5 18L32.5 23L27.5 18L32.5 13ZM32.5 15.7L30.2 18L32.5 20.3L34.8 18L32.5 15.7Z" />
                    <polygon points="39.5,18 36.8,16.2 36.8,19.8" />
                    <polygon points="34.8,10.8 31.2,12.5 33.5,13.8" />
                    <polygon points="34.8,25.2 33.5,22.2 31.2,23.5" />

                    {/* Bottom Shaft side spurs & flared base */}
                    <polygon points="20.8,27.5 17,31 20.8,30" />
                    <polygon points="23.2,27.5 27,31 23.2,30" />
                    <polygon points="22,33.5 18.5,38 25.5,38" />
                  </g>
                </svg>
              ),
              titleEn: 'Worship & Calendar',
              titleAm: 'አምልኮ እና ቀን መቁጠሪያ',
              descEn: 'Track feast days, fasting periods, daily readings, and access zema and worship resources.',
              descAm: 'የበዓላት፣ ጾም ቀናት፣ ዕለታዊ ምንባቦች ይሙሉ።',
              linkEn: 'View Calendar',
              linkAm: 'ቀን መቁጠሪያ',
              route: 'worship'
            },
            {
              iconEl: (
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                  <path d="M16 3C10.477 3 6 7.477 6 13C6 20.5 16 29 16 29C16 29 26 20.5 26 13C26 7.477 21.523 3 16 3ZM16 16.5C14.067 16.5 12.5 14.933 12.5 13C12.5 11.067 14.067 9.5 16 9.5C17.933 9.5 19.5 11.067 19.5 13C19.5 14.933 17.933 16.5 16 16.5Z" fill="#1A3A5C"/>
                </svg>
              ),
              titleEn: 'Find a Church',
              titleAm: 'ቤተ ክርስቲያን ፈልግ',
              descEn: 'Locate parishes near you or around the world. View service times, events, and directions.',
              descAm: 'አቅራቢያዎ ወይም በዓለም ዙሪያ አብያተ ክርስቲያናትን ያግኙ።',
              linkEn: 'Find Churches',
              linkAm: 'ቤተ ክርስቲያናት',
              route: 'find-a-church'
            },
            {
              iconEl: (
                <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
                  <path d="M15 26.5C15 26.5 3 19 3 10C3 5.5 6.5 2 11 2C13.5 2 14.5 3.5 15 4.5C15.5 3.5 16.5 2 19 2C23.5 2 27 5.5 27 10C27 19 15 26.5 15 26.5Z" fill="#1A3A5C"/>
                </svg>
              ),
              titleEn: 'Give & Support',
              titleAm: 'ምጽዋት',
              descEn: 'Support specific churches, ministries, and campaigns securely, in your currency.',
              descAm: 'አብያተ ክርስቲያናትን፣ አህጉረ ስብከቶችን ይደግፉ።',
              linkEn: 'Give Now',
              linkAm: 'ምጽዋት',
              route: 'give'
            },
          ].map((item, i, arr) => (
            <div
              key={i}
              onClick={() => setActiveView(item.route)}
              style={{
                padding: '0 28px',
                borderRight: i < arr.length - 1 ? '1px solid #E5E5E5' : 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Soft circle icon */}
              <div style={{
                width: '76px', height: '76px',
                borderRadius: '50%',
                border: '1.5px solid #E8E2D5',
                background: '#FFF8E7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                {item.iconEl}
              </div>

              {/* Title in Serif Navy */}
              <h3 style={{
                fontSize: '21px', fontWeight: 700,
                color: '#1A3A5C',
                marginBottom: '10px', lineHeight: 1.2,
                fontFamily: "var(--font-serif)",
                letterSpacing: '-0.01em',
              }}>
                {language === 'en' ? item.titleEn : item.titleAm}
              </h3>

              {/* Gold centered underline */}
              <div style={{ width: '28px', height: '2px', background: '#C8A84B', borderRadius: '1px', marginBottom: '14px' }} />

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: '#555555',
                lineHeight: 1.6,
                marginBottom: '20px',
                fontFamily: 'var(--font-body)',
              }}>
                {language === 'en' ? item.descEn : item.descAm}
              </p>

              {/* Gold Link */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                color: '#c5a059', fontWeight: 600, fontSize: '13.5px',
                fontFamily: 'var(--font-sans)'
              }}>
                <span>{language === 'en' ? item.linkEn : item.linkAm}</span>
                <span style={{ fontSize: '15px' }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Learn & Discover More Banner (Compact Width & Balanced Gap) ── */}
        <div className="container" style={{
          paddingTop: '32px',
          paddingBottom: '40px',
          maxWidth: '1080px',
          margin: '0 auto',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}>
          <div style={{
            background: '#f4efe4',
            borderRadius: '18px',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(20px, 3.5vw, 44px)',
            flexWrap: 'wrap'
          }}>
            {/* Left: badge + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '0 1 360px' }}>
              <div style={{
                width: '60px', height: '60px', flexShrink: 0,
                background: '#163b28',
                borderRadius: '50%',
                border: '1.5px solid #c5a059',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4L2 10L14 16L26 10L14 4Z" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 12.5V19.5C6 19.5 9 23 14 23C19 23 22 19.5 22 19.5V12.5" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M26 10.5V19.5" stroke="#c5a059" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="26" cy="20.5" r="1.5" fill="#c5a059"/>
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#163b28', marginBottom: '4px', fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {language === 'en' ? 'Learn & Discover More' : 'ተማሩ እና ሌሎችን ያግኙ'}
                </h4>
                <p style={{ fontSize: '13px', color: '#656054', lineHeight: 1.55, fontFamily: 'var(--font-body)', maxWidth: '300px' }}>
                  {language === 'en'
                    ? 'Grow your faith with courses, read the latest news, and explore all that the EOTC has to offer.'
                    : 'ኮርሶችን ይዳስሱ፣ ዜናዎችን ያንብቡ፣ EOTC ሁሉ ያቀርቡት ያግኙ።'}
                </p>
              </div>
            </div>

            {/* Right: 3 quick links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
              {[
                {
                  iconEl: (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M4 6.5C6.5 5 9.5 5.2 13 7V22.5C9.5 20.7 6.5 20.5 4 22V6.5Z" stroke="#c5a059" strokeWidth="1.8" strokeLinejoin="round"/>
                      <path d="M24 6.5C21.5 5 18.5 5.2 15 7V22.5C18.5 20.7 21.5 20.5 24 22V6.5Z" stroke="#c5a059" strokeWidth="1.8" strokeLinejoin="round"/>
                      <line x1="14" y1="7" x2="14" y2="22.5" stroke="#c5a059" strokeWidth="1.8"/>
                    </svg>
                  ),
                  labelEn: 'Academy', subEn: 'Learn your faith', labelAm: 'አካዳሚ', subAm: 'ይማሩ', route: 'academy'
                },
                {
                  iconEl: (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <rect x="4" y="3" width="20" height="22" rx="3" stroke="#c5a059" strokeWidth="1.8"/>
                      <line x1="7.5" y1="7.5" x2="20.5" y2="7.5" stroke="#c5a059" strokeWidth="1.8" strokeLinecap="round"/>
                      <rect x="7.5" y="11" width="5" height="5" rx="1" stroke="#c5a059" strokeWidth="1.5"/>
                      <line x1="15.5" y1="12" x2="20.5" y2="12" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="15.5" y1="15" x2="20.5" y2="15" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="7.5" y1="19.5" x2="20.5" y2="19.5" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  labelEn: 'News & Updates', subEn: 'Stay informed', labelAm: 'ዜናዎች', subAm: 'ይከታተሉ', route: 'news'
                },
                {
                  iconEl: (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <line x1="14" y1="2" x2="14" y2="7" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="11.5" y1="4.5" x2="16.5" y2="4.5" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M9 12C9 8.5 11.2 7 14 7C16.8 7 19 8.5 19 12" stroke="#c5a059" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="7" y1="12" x2="21" y2="12" stroke="#c5a059" strokeWidth="1.8" strokeLinecap="round"/>
                      <rect x="5" y="12" width="18" height="13" rx="1" stroke="#c5a059" strokeWidth="1.8"/>
                      <path d="M7.5 25V18C7.5 16.9 8.4 16 9.5 16C10.6 16 11.5 16.9 11.5 18V25" stroke="#c5a059" strokeWidth="1.5"/>
                      <path d="M12 25V17C12 15.9 12.9 15 14 15C15.1 15 16 15.9 16 17V25" stroke="#c5a059" strokeWidth="1.5"/>
                      <path d="M16.5 25V18C16.5 16.9 17.4 16 18.5 16C19.6 16 20.5 16.9 20.5 18V25" stroke="#c5a059" strokeWidth="1.5"/>
                    </svg>
                  ),
                  labelEn: 'Our Church', subEn: 'About EOTC', labelAm: 'ቤተ ክርስቲያን', subAm: 'ስለ ቤተ ክርስቲያን', route: 'our-church'
                },
              ].map((ql, qi, qArr) => (
                <React.Fragment key={qi}>
                  <button
                    onClick={() => setActiveView(ql.route)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', padding: '0', flex: '0 0 auto'
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>{ql.iconEl}</div>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#163b28', marginBottom: '2px', fontFamily: 'var(--font-sans)' }}>
                        {language === 'en' ? ql.labelEn : ql.labelAm}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: '#c5a059', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                        <span>{language === 'en' ? ql.subEn : ql.subAm}</span>
                        <span>→</span>
                      </div>
                    </div>
                  </button>
                  {qi < qArr.length - 1 && (
                    <div style={{ width: '1px', height: '42px', background: 'rgba(44,29,7,0.12)', flexShrink: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      </div> {/* Close section 2 wrapper */}


      {/* ─── 3. SACRED HERITAGE EXPLORER (FEATURED DESTINATIONS) ───── */}
      <SacredHeritageExplorer />

      {/* ─── 4 & 5. SHARED PARALLAX CHURCH VIGIL WRAPPER (WHY EOTC DIGITAL + LATEST NEWS) ─── */}
      <div style={{
        position: 'relative',
        width: '100%',
        backgroundImage: 'url(/assets/images/eotc_vigil_background.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '80px 0 88px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          
          {/* ─── 4. WHY EOTC DIGITAL (SPLIT REFERENCE LAYOUT WITH BOLD TYPOGRAPHY & DIVIDERS) ─────── */}
          <div style={{ width: '100%', padding: '0 20px', marginBottom: '88px' }}>
            <section style={{
              width: '100%',
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 clamp(16px, 3vw, 48px)',
              position: 'relative',
            }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* ── LEFT COLUMN: Kicker, Big Bold Title, Paragraph, CTA Button ── */}
                <div className="lg:col-span-5 flex flex-col items-start text-left">
                  {/* Kicker with accent underline bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: '#FCD34D',
                      display: 'block',
                      marginBottom: '6px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                    }}>
                      {language === 'en' ? 'FEATURES' : 'ባሕርያት'}
                    </span>
                    <div style={{ width: '38px', height: '3px', background: '#D4AF37', borderRadius: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.6)' }} />
                  </div>

                  {/* Section Title */}
                  <h2 style={{
                    fontSize: 'clamp(36px, 4.2vw, 54px)',
                    fontWeight: 800,
                    lineHeight: 1.12,
                    marginBottom: '20px',
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 16px rgba(0, 0, 0, 0.95), 0 4px 30px rgba(0, 0, 0, 0.95)',
                  }}>
                    <span style={{ color: '#FFFFFF' }}>
                      {language === 'en' ? 'Why ' : 'ለምን '}
                    </span>
                    <span style={{ color: '#FCD34D', fontWeight: 800 }}>
                      {language === 'en' ? 'EOTC Digital?' : 'ኢኦተቤ ዲጂታል?'}
                    </span>
                  </h2>

                  {/* Paragraph */}
                  <p style={{
                    fontSize: '15.5px',
                    color: 'rgba(255, 255, 255, 0.92)',
                    lineHeight: 1.75,
                    marginBottom: '32px',
                    maxWidth: '460px',
                    fontFamily: 'var(--font-body)',
                    textShadow: '0 1px 8px rgba(0, 0, 0, 0.9), 0 2px 18px rgba(0, 0, 0, 0.95)',
                  }}>
                    {language === 'en'
                      ? 'A unified digital sanctuary for the Ethiopian Orthodox Tewahedo Church to grow in apostolic faith, worship, and service — together.'
                      : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በእምነት፣ በአምልኮ እና በአገልግሎት በጋራ የምታድግበት አንድ የተቀናጀ ዲጂታል መድረክ።'}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => setActiveView('our-church')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#D4AF37',
                      color: '#163b28',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '14px 32px',
                      fontSize: '14px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e3c25b';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#D4AF37';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                    }}
                  >
                    <span>{language === 'en' ? 'Explore Our Church' : 'ቤተ ክርስቲያናችንን ይወቁ'}</span>
                    <span style={{ fontSize: '16px', fontWeight: 900 }}>→</span>
                  </button>
                </div>

                {/* ── RIGHT SIDE: 2-COLUMN FEATURE GRID WITH DIVIDERS & NO CARDS ── */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-0 relative">
                  
                  {/* Column 1 */}
                  <div className="flex flex-col">
                    {/* Item 1: Rich Scripture */}
                    <div
                      onClick={() => setActiveView('scripture')}
                      className="group cursor-pointer transition-all duration-300"
                      style={{
                        padding: '24px 24px 28px 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '18px',
                      }}
                    >
                      {/* Circular Outline Icon */}
                      <div style={{
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(252, 211, 77, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                      }} className="group-hover:scale-105 group-hover:border-[#FCD34D]">
                        <BookOpen style={{ width: '22px', height: '22px', color: '#FCD34D' }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          marginBottom: '8px',
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                        }} className="group-hover:text-[#FCD34D] transition-colors">
                          {language === 'en' ? 'Rich Scripture' : 'ቅዱሳት መጻሕፍት'}
                        </h3>
                        <p style={{
                          fontSize: '13.5px',
                          color: 'rgba(255, 255, 255, 0.84)',
                          lineHeight: 1.6,
                          fontFamily: 'var(--font-body)',
                          textShadow: '0 1px 8px rgba(0, 0, 0, 0.9)',
                        }}>
                          {language === 'en' ? '81-book ancient biblical canon in parallel Ge’ez, Amharic & English' : 'የ፹፩ መጻሕፍት ቅዱሳት ቀኖና በግዕዝ፣ አማርኛና እንግሊዝኛ'}
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Liturgical Calendar */}
                    <div
                      onClick={() => setActiveView('worship')}
                      className="group cursor-pointer transition-all duration-300"
                      style={{
                        padding: '28px 24px 20px 0',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '18px',
                      }}
                    >
                      {/* Circular Outline Icon */}
                      <div style={{
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(252, 211, 77, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                      }} className="group-hover:scale-105 group-hover:border-[#FCD34D]">
                        <Calendar style={{ width: '22px', height: '22px', color: '#FCD34D' }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          marginBottom: '8px',
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                        }} className="group-hover:text-[#FCD34D] transition-colors">
                          {language === 'en' ? 'Liturgical Calendar' : 'የቤ.ክ. ቀን መቁጠሪያ'}
                        </h3>
                        <p style={{
                          fontSize: '13.5px',
                          color: 'rgba(255, 255, 255, 0.84)',
                          lineHeight: 1.6,
                          fontFamily: 'var(--font-body)',
                          textShadow: '0 1px 8px rgba(0, 0, 0, 0.9)',
                        }}>
                          {language === 'en' ? 'Real-time Ethiopian calendar, fasts, feasts, and daily readings' : 'የኢትዮጵያ ዘመን አቆጣጠር፣ አጽዋማትና በዓላት'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Column 2 (with vertical divider on desktop) */}
                  <div className="flex flex-col md:border-l md:border-white/20 md:pl-8">
                    {/* Item 3: Trusted Community */}
                    <div
                      onClick={() => setActiveView('our-church')}
                      className="group cursor-pointer transition-all duration-300"
                      style={{
                        padding: '24px 0 28px 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '18px',
                      }}
                    >
                      {/* Circular Outline Icon */}
                      <div style={{
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(252, 211, 77, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                      }} className="group-hover:scale-105 group-hover:border-[#FCD34D]">
                        <Users style={{ width: '22px', height: '22px', color: '#FCD34D' }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          marginBottom: '8px',
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                        }} className="group-hover:text-[#FCD34D] transition-colors">
                          {language === 'en' ? 'Trusted Community' : 'ታማኝ ማኅበረሰብ'}
                        </h3>
                        <p style={{
                          fontSize: '13.5px',
                          color: 'rgba(255, 255, 255, 0.84)',
                          lineHeight: 1.6,
                          fontFamily: 'var(--font-body)',
                          textShadow: '0 1px 8px rgba(0, 0, 0, 0.9)',
                        }}>
                          {language === 'en' ? 'Connect with dioceses, certified clergy, and global faithful' : 'ከሀገረ ስብከት፣ ካህናትና ምዕመናን ጋር ይገናኙ'}
                        </p>
                      </div>
                    </div>

                    {/* Item 4: Easy Giving */}
                    <div
                      onClick={() => setActiveView('give')}
                      className="group cursor-pointer transition-all duration-300"
                      style={{
                        padding: '28px 0 20px 0',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '18px',
                      }}
                    >
                      {/* Circular Outline Icon */}
                      <div style={{
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(252, 211, 77, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                      }} className="group-hover:scale-105 group-hover:border-[#FCD34D]">
                        <Heart style={{ width: '22px', height: '22px', color: '#FCD34D' }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          marginBottom: '8px',
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                        }} className="group-hover:text-[#FCD34D] transition-colors">
                          {language === 'en' ? 'Easy Giving' : 'ቀላል ምጽዋት'}
                        </h3>
                        <p style={{
                          fontSize: '13.5px',
                          color: 'rgba(255, 255, 255, 0.84)',
                          lineHeight: 1.6,
                          fontFamily: 'var(--font-body)',
                          textShadow: '0 1px 8px rgba(0, 0, 0, 0.9)',
                        }}>
                          {language === 'en' ? 'Direct verified contributions and tithing to sacred parishes' : 'ቀጥታ የተረጋገጠ የአሥራትና ምጽዋት አገልግሎት'}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>
          </div>

        </div>
      </div>


      {/* ─── 5. LATEST NEWS (STANDALONE SECTION WITH GOLDY-WHITE PARCHMENT BACKGROUND) ──── */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(180deg, #FAF8F3 0%, #F6F1E3 100%)',
        borderTop: '1px solid #E6DFD1',
        borderBottom: '1px solid #E6DFD1',
        padding: '84px 0 92px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* ── Parallax Sacred Cross Watermark for Last Section (Left side, moves slower than content) ── */}
        <div
          style={{
            position: 'absolute',
            top: '120px',
            left: 'clamp(10px, 5vw, 60px)',
            width: 'min(38vw, 320px)',
            height: '400px',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
            opacity: 0.09,
            transform: `translateY(${(scrollY - 3000) * 0.18}px)`,
            willChange: 'transform',
            transition: 'transform 0.08s linear',
          }}
        >
          <img
            src="/assets/images/eotc_cross_watermark_transparent.png"
            alt="EOTC Sacred Cross Watermark"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column (Heading + Orange Bar + Subtitle + Glowing View All CTA) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1A2C1C] tracking-tight leading-[1.05] font-sans m-0">
                  {language === 'en' ? (
                    <>
                      Latest <br />
                      <span className="text-[#EA580C]">News</span>
                    </>
                  ) : (
                    'አዳዲስ ዜናዎች'
                  )}
                </h2>
                {/* Orange Accent Bar */}
                <div style={{ width: '40px', height: '3.5px', background: '#EA580C', borderRadius: '2px', marginTop: '14px', marginBottom: '16px' }} />
                <p className="text-sm sm:text-[14.5px] text-[#4B5563] leading-relaxed max-w-sm font-sans m-0">
                  {language === 'en'
                    ? 'Stay updated with official EOTC patriarchal decrees, synod announcements, and global Orthodox news.'
                    : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ይፋዊ መግለጫዎችና ዜናዎች ይከታተሉ።'}
                </p>
              </div>

              {/* View All News CTA with Orange Pill Button */}
              <button
                onClick={() => setActiveView('news')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 24px 12px 14px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(234, 88, 12, 0.35)',
                  transition: 'all 0.25s ease',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '15px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(234, 88, 12, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(234, 88, 12, 0.35)';
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EA580C',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}>
                  <ArrowUpRight style={{ width: '20px', height: '20px', strokeWidth: 2.5 }} />
                </div>
                <span>
                  {language === 'en' ? 'View All News' : 'ሁሉንም ዜናዎች ይመልከቱ'}
                </span>
              </button>
            </div>

            {/* Right Column: Listed News Items (Clean listed format on Goldy-White) */}
            <div className="lg:col-span-8 flex flex-col">
              {LATEST_NEWS_SLIDES.map((item, index) => {
                const isLast = index === LATEST_NEWS_SLIDES.length - 1;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveView('news')}
                    className="group cursor-pointer transition-all duration-300"
                    style={{
                      paddingBottom: isLast ? '0' : '24px',
                      marginBottom: isLast ? '0' : '24px',
                      borderBottom: isLast ? 'none' : '1px solid #E6DFD1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {/* Left: Thumbnail image */}
                    <div style={{
                      width: 'clamp(140px, 30%, 200px)',
                      height: '124px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#EDE7DB',
                      border: '1px solid #E6DFD1',
                      boxShadow: '0 4px 14px rgba(44, 29, 7, 0.08)',
                    }}>
                      <img
                        src={item.image}
                        alt={item.titleEn}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                        className="group-hover:scale-105"
                      />
                    </div>

                    {/* Right: Content details */}
                    <div style={{ flex: '1 1 280px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {/* Category tag */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          display: 'inline-block',
                          background: '#FFF1E7',
                          color: '#D95B14',
                          border: '1px solid rgba(217, 91, 20, 0.3)',
                          fontSize: '10.5px',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                        }}>
                          {item.category}
                        </span>
                      </div>

                      {/* English Title */}
                      <h3
                        style={{
                          fontSize: 'clamp(16px, 1.6vw, 19px)',
                          fontWeight: 800,
                          color: '#1A2C1C',
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          lineHeight: 1.3,
                          margin: 0,
                        }}
                        className="group-hover:text-[#EA580C] transition-colors"
                      >
                        {item.titleEn}
                      </h3>

                      {/* Amharic Title */}
                      <p
                        style={{
                          fontSize: '13px',
                          color: '#4B5563',
                          lineHeight: 1.45,
                          fontFamily: 'var(--font-ethiopic), serif',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.titleAm}
                      </p>

                      {/* Bottom Row: Dates + Read More */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px',
                        paddingTop: '6px',
                      }}>
                        {/* Dates */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#6B7280', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar style={{ width: '13px', height: '13px', color: '#EA580C' }} />
                            <span>{item.dateEth}</span>
                          </div>
                          <span>•</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar style={{ width: '13px', height: '13px', color: '#EA580C' }} />
                            <span>{item.dateGreg}</span>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12.5px',
                            fontWeight: 700,
                            color: '#EA580C',
                          }}
                          className="group-hover:translate-x-1 transition-transform"
                        >
                          <span>{language === 'en' ? 'Read more' : 'ተጨማሪ አንብብ'}</span>
                          <span>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. NEWSLETTER STRIP ──────────────────────────────────────── */}
      <section style={{ background: '#1A2C1C', padding: '24px 40px' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>
              {language === 'en' ? 'Stay Connected with the EOTC' : 'ከቤተ ክርስቲያን ጋር ተገናኙ'}
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(250,248,243,0.7)', fontFamily: 'var(--font-body)' }}>
              Get the latest news, feast day reminders and updates straight to your inbox.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%', maxWidth: '420px' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '10px 16px', borderRadius: '8px',
                border: '1px solid rgba(200,168,75,0.3)',
                background: 'rgba(250,248,243,0.08)', color: '#FFFFFF', fontSize: '13px',
                outline: 'none', flex: 1, minWidth: '180px', fontFamily: 'var(--font-sans)'
              }}
            />
            <button style={{ background: 'var(--gold)', color: '#1A2C1C', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Responsive Breakpoints CSS */}
      <style>{`
        @media (max-width: 1200px) {
          .hero-bg-container {
            width: 100% !important;
          }
          .hero-container {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
          }
          .verse-card-floating {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            margin: 24px auto 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .stats-strip {
            position: relative !important;
            bottom: auto !important;
          }
        }

        @media (max-width: 640px) {
          .search-card-inputs {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .search-card-divider {
            display: none !important;
          }
          .search-card-button {
            width: 100% !important;
            justify-content: center !important;
          }
          .stats-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};


