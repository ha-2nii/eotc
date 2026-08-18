import React from 'react';
import { useLanguage } from '../components/layout/LanguageContext';
import { MOCK_ARTICLES } from '../data/mockNews';
import { SacredHeritageExplorer } from '../components/home/SacredHeritageExplorer';
import {
  BookOpen, Calendar, Heart,
  ArrowRight, ChevronRight,
  Users, Clock, MapPin, ArrowUpRight
} from 'lucide-react';

export const HomePageView: React.FC = () => {
  const { language, setActiveView } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      titleEn: 'Scripture & Library',
      descEn: 'Read the 81-book canon in Ge\u2019ez, Amharic, and English, side by side.',
      linkEn: 'Browse scripture',
      route: 'scripture',
    },
    {
      icon: Calendar,
      titleEn: 'Worship & Calendar',
      descEn: 'Track feast days, fasting periods, and daily readings on the Ethiopian calendar.',
      linkEn: 'View calendar',
      route: 'worship/calendar',
    },
    {
      icon: MapPin,
      titleEn: 'Find a Church',
      descEn: 'Locate a parish near you, anywhere in the world, with service times and directions.',
      linkEn: 'Search churches',
      route: 'find-a-church',
    },
    {
      icon: Heart,
      titleEn: 'Give',
      descEn: 'Support a specific church, monastery, or campaign — securely, in your currency.',
      linkEn: 'Donate',
      route: 'give',
    },
  ];

  return (
    <div style={{ background: 'var(--parchment)', minHeight: '100vh', fontFamily: 'var(--font-sans)', width: '100%', overflowX: 'hidden' }}>

      {/* ─── 1. HERO (HomeFind Style) ───────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: '#0D1A0F'
      }}>
        {/* Background image */}
        <div className="hero-bg-container" style={{
          position: 'absolute', top: 0, right: 0,
          width: '65%', height: '100%', zIndex: 0
        }}>
          <img
            src="/assets/images/hero_church.jpg"
            alt="Holy Trinity Cathedral"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* gradient fade to left */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #0D1A0F 0%, #0D1A0F 15%, rgba(13,26,15,0.5) 50%, transparent 100%)'
          }} />
        </div>

        {/* dark tint over left side for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(13,26,15,0.5) 0%, rgba(13,26,15,0.2) 50%, transparent 100%)',
          zIndex: 1
        }} />

        {/* Main Hero Container */}
        <div className="container hero-container" style={{ position: 'relative', zIndex: 2, paddingTop: '100px', paddingBottom: '140px', flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="hero-content-col" style={{ maxWidth: '620px', width: '100%' }}>

            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Ethiopian Orthodox Tewahedo Church
              </span>
              <div style={{ flex: 1, height: '2px', background: 'var(--gold)', maxWidth: '48px', borderRadius: '2px' }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(32px, 6vw, 76px)', fontWeight: 900,
              color: '#FFFFFF', lineHeight: 1.1, marginBottom: '0',
              letterSpacing: '-0.03em'
            }}>
              {language === 'en' ? "Discover a faith" : 'እምነት ያግኙ'}
            </h1>
            <h1 style={{
              fontSize: 'clamp(32px, 6vw, 76px)', fontWeight: 900,
              lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.03em'
            }}>
              <span style={{ color: '#FFFFFF' }}>{language === 'en' ? "you'll " : ''}</span>
              <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>{language === 'en' ? 'love' : 'ይወዱታል'}</span>
              <span style={{ color: '#FFFFFF' }}>{language === 'en' ? ' to live.' : ''}</span>
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(250,248,243,0.85)', lineHeight: 1.7,
              maxWidth: '480px', marginBottom: '28px', fontFamily: 'var(--font-body)'
            }}>
              {language === 'en'
                ? 'Find churches, worship resources, Scripture, and connect with the global EOTC community — all in one place.'
                : 'አብያተ ክርስቲያናትን ያግኙ፣ ቅዱሳት መጻሕፍትን ያንብቡ፣ ከዓለም አቀፍ ማህበረሰብ ጋር ይገናኙ።'}
            </p>

            {/* ── Bible Verse Card ── */}
            <div style={{
              background: 'rgba(250,248,243,0.97)', backdropFilter: 'blur(16px)',
              borderRadius: '20px', overflow: 'hidden', marginBottom: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
              border: '1px solid rgba(200,168,75,0.2)',
              width: '460px', maxWidth: '100%'
            }}>
              {/* Header bar */}
              <div style={{ background: 'var(--gold-light)', borderBottom: '1px solid var(--border-light)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen style={{ width: '15px', height: '15px', color: 'var(--gold)' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Today's Verse
                </span>
              </div>
              {/* Body */}
              <div style={{ padding: '20px 20px 16px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-dark)', lineHeight: 1.7, fontFamily: 'var(--font-body)', fontStyle: 'italic', marginBottom: '12px' }}>
                  "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
                </p>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '14px' }}>— John 3:16</p>
                <button onClick={() => setActiveView('scripture')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', padding: 0 }}>
                  Read full scripture <ChevronRight style={{ width: '14px', height: '14px' }} />
                </button>
              </div>
            </div>

            {/* Features strip */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { icon: BookOpen, labelEn: 'Scripture Access', labelAm: 'ቅዱሳት መጻሕፍት' },
                { icon: Users, labelEn: 'Expert Clergy', labelAm: 'ካህናት' },
                { icon: Clock, labelEn: '24/7 Worship', labelAm: 'ቀን ለሌሊት' },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(200,168,75,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(200,168,75,0.3)' }}>
                      <Icon style={{ width: '14px', height: '14px', color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>{language === 'en' ? f.labelEn : f.labelAm}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


      </section>

      <div style={{ width: '100%', padding: '60px 20px 32px' }}>

      {/* ─── 2. FEATURES CARDS ──────────────────────────────────────── */}
      <section style={{ marginBottom: '80px', position: 'relative', width: '100%', padding: '0' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', width: '100%', margin: '0 0 48px 0', padding: '0 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold-light)', border: '1px solid rgba(200,168,75,0.3)', padding: '8px 20px', borderRadius: '30px', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {language === 'en' ? 'EOTC Digital Platform' : 'የኢትዮጵያ ኦርቶዶክስ ዲጂታል መድረክ'}
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: '12px', fontFamily: 'var(--font-geez)' }}>
            {language === 'en' ? 'Your Journey of Faith' : 'የእምነት ጉዞዎ'}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            {language === 'en'
              ? 'Discover the complete Orthodox experience through our interconnected digital services'
              : 'በኔ ሰባከ ዲጂታል አገልግሎቶች አማካኝነት ሙሉ የኦርቶዶክስ ልምድን ያውቁ'
            }
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', width: '100%', padding: '0 40px' }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const accentColors = [
              { border: '#FFA726', iconBg: 'linear-gradient(135deg, #FFB74D, #FFA726)', link: '#FFA726' },
              { border: '#66BB6A', iconBg: 'linear-gradient(135deg, #81C784, #66BB6A)', link: '#4CAF50' },
              { border: '#EC407A', iconBg: 'linear-gradient(135deg, #F06292, #EC407A)', link: '#EC407A' },
              { border: '#42A5F5', iconBg: 'linear-gradient(135deg, #64B5F6, #42A5F5)', link: '#2196F3' },
            ];
            const accent = accentColors[index];
            return (
              <div
                key={index}
                onClick={() => setActiveView(feature.route)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderTop: `3px solid ${accent.border}`,
                  borderRadius: '16px',
                  padding: '28px 24px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(44,29,7,0.06)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 16px 40px rgba(44,29,7,0.14)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'none';
                  el.style.boxShadow = '0 2px 12px rgba(44,29,7,0.06)';
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: accent.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  flexShrink: 0,
                }}>
                  <Icon style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)',
                    marginBottom: '8px', lineHeight: 1.3, fontFamily: 'var(--font-geez)',
                  }}>
                    {language === 'en' ? feature.titleEn : feature.titleEn}
                  </h3>
                  <p style={{
                    fontSize: '14px', color: 'var(--text-muted)',
                    lineHeight: 1.6, fontFamily: 'var(--font-body)',
                  }}>
                    {feature.descEn}
                  </p>
                </div>

                {/* Link */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: accent.link, fontWeight: 700, fontSize: '14px',
                  paddingTop: '8px', borderTop: '1px solid var(--border-light)',
                }}>
                  {feature.linkEn} <ArrowRight style={{ width: '15px', height: '15px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      </div> {/* Close padded div from Section 2 */}

      {/* ─── 3. SACRED HERITAGE EXPLORER (FULL SECTION) ─────────── */}
      <SacredHeritageExplorer />

      <div style={{ width: '100%', padding: '60px 20px 32px' }}>
        {/* ─── 4. WHY EOTC + PROMO CARD ────────────────────────────────── */}
        <section style={{ width: '100%', padding: '0 40px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'start', width: '100%' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 26px)', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
              {language === 'en' ? 'Why ' : 'ለምን '}
              <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontFamily: 'var(--font-body)' }}>EOTC Digital?</span>
            </h2>
            <div style={{ width: '48px', height: '3px', background: 'var(--gold)', borderRadius: '2px', marginBottom: '24px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { icon: BookOpen, titleEn: 'Rich Scripture', descEn: 'Access the Holy Bible, Prayer Books and Liturgical Texts in multiple languages.' },
                { icon: Users, titleEn: 'Trusted Community', descEn: 'Join millions of Orthodox faithful from around the world.' },
                { icon: Calendar, titleEn: 'Liturgical Calendar', descEn: 'Never miss a feast, fast or holy day with our full calendar.' },
                { icon: Heart, titleEn: 'Easy Giving', descEn: 'Support monasteries, campaigns and parishes with just a few clicks.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} style={{ display: 'flex', gap: '12px', background: 'var(--off-white)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ width: '34px', height: '34px', background: 'var(--gold-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon style={{ width: '16px', height: '16px', color: '#1A2C1C' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '3px' }}>{item.titleEn}</h4>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.descEn}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Promo Card */}
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: '300px', border: '1px solid var(--border-light)' }}>
            <img src="/assets/images/hero_church.jpg" alt="Worship" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,29,7,0.93) 0%, rgba(44,29,7,0.3) 60%, transparent 100%)' }} />
            <div style={{ position: 'relative', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '300px' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Begin Your Journey</div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3, marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                Your Spiritual<br />Home Awaits!
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(250,248,243,0.8)', marginBottom: '16px', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                Connect with ancient faith, timeless worship, and a living community.
              </p>
              <button onClick={() => setActiveView('our-church')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--gold)', color: '#1A2C1C', padding: '10px 18px', borderRadius: '30px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', width: 'fit-content' }}>
                Discover More <ArrowRight style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          </div>
          </div>
        </section>

        {/* ─── 5. LATEST NEWS (REFERENCE DESIGN MATCH) ────────────────── */}
        <section className="w-full my-12 sm:my-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column (Big Bold Title + Subtitle + Orange Gradient CTA Button) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight leading-[1.05] font-sans">
                  {language === 'en' ? (
                    <>
                      Latest<br />News
                    </>
                  ) : (
                    <>
                      አዳዲስ<br />ዜናዎች
                    </>
                  )}
                </h2>
                <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-sans mt-5 max-w-md">
                  {language === 'en'
                    ? 'Stay informed with official patriarchal decrees, feast day announcements, synodal communications, and spiritual teachings from the Holy Church.'
                    : 'ከመንበረ ፓትርያርክ የተሰጡ መግለጫዎች፣ ቅዱስ ሲኖዶስ ውሳኔዎች፣ የበዓላት ጥሪዎችና መንፈሳዊ ትምህርቶችን ይከታተሉ።'}
                </p>
              </div>

              {/* Glowing Circle CTA Button matching reference image */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveView('news')}
                  className="inline-flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#E28743] via-[#EE9B00] to-[#F4A261] shadow-lg shadow-[#E28743]/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#E28743]/50 shrink-0">
                    <ArrowUpRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <span className="text-base font-extrabold text-[#111111] group-hover:text-[#E28743] transition-colors font-sans">
                    {language === 'en' ? 'View All News' : 'ሁሉንም ዜናዎች ይመልከቱ'}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column (Vertical Stack of Light Rounded Cards) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {MOCK_ARTICLES.slice(0, 3).map((article) => (
                <div
                  key={article.id}
                  onClick={() => setActiveView('news')}
                  className="group relative bg-[#F4F4F6] hover:bg-[#ECECEE] border border-black/[0.04] rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Meta Category & Date */}
                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                      <span className="text-[#E28743]">{article.category}</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-400 font-medium">{article.date}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#111111] font-sans leading-snug tracking-tight group-hover:text-[#E28743] group-hover:underline underline-offset-4 decoration-2 transition-colors">
                      {language === 'en' ? article.titleEnglish : article.titleAmharic}
                    </h3>
                  </div>

                  {/* Top-Right Arrow Icon */}
                  <div className="shrink-0 pt-0.5">
                    <ArrowUpRight className="w-6 h-6 text-stone-400 group-hover:text-[#E28743] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>

      {/* ─── 6. NEWSLETTER STRIP ──────────────────────────────────────── */}
      <section style={{ background: '#1A2C1C', borderTop: '3px solid var(--gold)', padding: '24px 40px' }}>
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


