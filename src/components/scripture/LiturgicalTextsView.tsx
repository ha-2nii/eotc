import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Volume2,
  Calendar,
  Music,
  ArrowRight,
  ChevronRight,
  BookMarked,
  Play,
  Pause,
  Heart,
  Award,
  FileText,
  Languages,
  Sparkles,
  LayoutGrid,
  Cross,
  Church,
} from 'lucide-react';
import { useLanguage } from '../layout/LanguageContext';

interface LiturgicalTextsViewProps {
  onOpenItem: (categoryId: string, itemId: string) => void;
  onOpenPrayerBook?: (bookId: string, sectionIdx?: number) => void;
  onOpenBible?: (bookId: string, chapter?: number) => void;
  onSelectCategory?: (categoryId: string) => void;
}

const BROWSE_CATEGORIES = [
  {
    id: 'qidase',
    iconBg: '#FFF5DB',
    iconColor: '#855B09',
    icon: BookMarked,
    titleEn: 'Divine Liturgy (Kidase)',
    titleAm: 'ሥርዓተ ቅዳሴ (ኪዳሴ)',
    subEn: 'Common Order & 14 Anaphoras',
    subAm: 'ሥርዓተ ቅዳሴና ፲፬ቱ ቅዳሴያት',
    catId: 'qidase', itemId: 'qidase-apostles',
  },
  {
    id: 'anaphoras',
    iconBg: '#FDF2F2',
    iconColor: '#800020',
    icon: Award,
    titleEn: 'Anaphoras',
    titleAm: 'አሥራ አራቱ ቅዳሴያት',
    subEn: '14 Eucharistic Prayers',
    subAm: '፲፬ቱ ቀኖናውያን ቅዳሴያት',
    catId: 'qidase', itemId: 'qidase-apostles',
  },
  {
    id: 'deggwa',
    iconBg: '#F0FDF4',
    iconColor: '#1A2C1C',
    icon: Music,
    titleEn: 'Yaredic Hymnody',
    titleAm: 'ያሬዳዊ ዜማና ድጓ',
    subEn: 'Deggwa and other books',
    subAm: 'ድጓ፣ ጾመ ድጓ፣ ዝማሬና መዋሥዕት',
    catId: 'deggwa', itemId: 'deggwa-geez',
  },
  {
    id: 'prayers',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    icon: Heart,
    titleEn: 'Prayers',
    titleAm: 'የዘወትርና የልዩ ጸሎታት',
    subEn: 'Daily & Special Prayers',
    subAm: 'ውዳሴ ማርያም፣ ሰዓታት ወጸሎት',
    catId: 'qidase', itemId: 'qidase-apostles',
  },
  {
    id: 'readings',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    icon: BookOpen,
    titleEn: 'Readings',
    titleAm: 'ምንባባት ወመጻሕፍት',
    subEn: 'Holy Scripture & Lectionaries',
    subAm: 'ወንጌል፣ መልእክታትና ምንባባት',
    catId: 'yebelat-minbabat', itemId: 'minbab-fasika',
  },
  {
    id: 'sacramental',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    icon: FileText,
    titleEn: 'Sacramental Services',
    titleAm: 'ምሥጢራተ ቤተ ክርስቲያን',
    subEn: 'Baptism, Matrimony, etc.',
    subAm: 'ጥምቀት፣ ተክሊል፣ ሜሮን ወቀንዲል',
    catId: 'qidase', itemId: 'qidase-apostles',
  },
  {
    id: 'feasts',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    icon: Calendar,
    titleEn: 'Feasts & Seasons',
    titleAm: 'በዓላት ወአጽዋማት',
    subEn: 'Liturgical Calendar',
    subAm: 'የቤተ ክርስቲያን ዘመን አቆጣጠር',
    catId: 'yebelat-minbabat', itemId: 'minbab-fasika',
  },
];

const RECENT_ITEMS = [
  {
    id: 'rec-1',
    icon: Music,
    iconBg: '#F0FDF4',
    iconColor: '#059669',
    titleEn: 'Deggwa — Meskel',
    titleAm: 'ድጓ — መስቀል',
    cat1En: 'Yaredic Hymnody',
    cat2En: 'Deggwa',
    cat1Am: 'ያሬዳዊ ዜማ',
    cat2Am: 'ድጓ',
    catId: 'mahelet', itemId: 'mahelet-meskel',
  },
  {
    id: 'rec-2',
    icon: BookOpen,
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    titleEn: 'Psalm 50 (51)',
    titleAm: 'መዝሙረ ዳዊት ፶',
    cat1En: 'Readings',
    cat2En: 'Psalms',
    cat1Am: 'ምንባባት',
    cat2Am: 'መዝሙር',
    catId: 'yebelat-minbabat', itemId: 'minbab-fasika',
  },
  {
    id: 'rec-3',
    icon: Heart,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    titleEn: 'Morning Prayer',
    titleAm: 'የነግህ ጸሎት',
    cat1En: 'Prayers',
    cat2En: 'Daily Prayers',
    cat1Am: 'ጸሎት',
    cat2Am: 'የዘወትር ጸሎት',
    catId: 'qidase', itemId: 'qidase-apostles',
  },
];

const TODAY_RESOURCES = [
  {
    id: 'feast',
    icon: Award,
    iconColor: '#855B09',
    labelEn: "Today's Feast",
    labelAm: 'የዕለቱ በዓል',
    valueEn: 'Ethiopian New Year',
    valueAm: 'ርእሰ ዐውደ ዓመት (እንቁጣጣሽ)',
    catId: 'yebelat-minbabat', itemId: 'minbab-fasika',
  },
  {
    id: 'readings',
    icon: BookOpen,
    iconColor: '#2563EB',
    labelEn: 'Readings',
    labelAm: 'ምንባባት',
    valueEn: 'Genesis 1:1–5 | 1 Timothy 2:1–7',
    valueAm: 'ዘፍጥረት ፩ | ፩ ጢሞ ፪',
    catId: 'yebelat-minbabat', itemId: 'minbab-fasika',
  },
  {
    id: 'yaredic',
    icon: Music,
    iconColor: '#059669',
    labelEn: 'Yaredic Hymns',
    labelAm: 'ያሬዳዊ ዜማ',
    valueEn: "Deggwa (Ge'ez Mode)",
    valueAm: 'ድጓ (ግዕዝ ዜማ)',
    catId: 'deggwa', itemId: 'deggwa-geez',
  },
  {
    id: 'prayer',
    icon: Heart,
    iconColor: '#D97706',
    labelEn: "Today's Prayer",
    labelAm: 'የዕለቱ ጸሎት',
    valueEn: 'Thanksgiving Prayer',
    valueAm: 'ጸሎተ አኮቴት',
    catId: 'qidase', itemId: 'qidase-apostles',
  },
  {
    id: 'liturgy',
    icon: BookMarked,
    iconColor: '#800020',
    labelEn: 'Relevant Liturgy',
    labelAm: 'የሚቀደሰው ቅዳሴ',
    valueEn: 'Divine Liturgy — Common Order',
    valueAm: 'ሥርዓተ ቅዳሴ — ሐዋርያት',
    catId: 'qidase', itemId: 'qidase-apostles',
  },
];

export const LiturgicalTextsView: React.FC<LiturgicalTextsViewProps> = ({
  onOpenItem,
  onOpenPrayerBook,
  onOpenBible,
}) => {
  const { language, setActiveTrackId, activeTrackId } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Slide dots state for the featured carousel indicator
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveSlide((p) => (p + 1) % 4), 5000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenItem('qidase', 'qidase-apostles');
  };

  const isTodayPlaying = activeTrackId === 'zema-4';

  return (
    <div className="animate-fadeIn" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Flat, no card border, parchment background
          with the St Yared banner image on the right
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{
          background: '#F5EDD8',
          borderBottom: '1px solid #DDD0B0',
          marginBottom: 0,
        }}
      >
        {/* Background pattern dots very subtle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #C8A84B22 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12" style={{ minHeight: 240 }}>
          {/* ── Left Text Area (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-8 md:px-10 py-8 md:py-10 space-y-5 z-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 self-start"
              style={{ color: '#855B09', fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              <span style={{ fontSize: 14 }}>✠</span>
              <span>Digital Orthodox Library</span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(26px, 4vw, 44px)',
                fontWeight: 900,
                color: '#1E1B18',
                lineHeight: 1.15,
                fontFamily: 'Georgia, "Times New Roman", serif',
                margin: 0,
              }}
            >
              {language === 'en'
                ? 'Liturgical Texts, Anaphoras & Yaredic Deggwa'
                : 'ሥርዓተ ቅዳሴ፥ አሥራ አራቱ ቅዳሴያት ወያሬዳዊ ድጓ'}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: 13,
                color: '#5A4F41',
                lineHeight: 1.65,
                maxWidth: 560,
                margin: 0,
              }}
            >
              {language === 'en'
                ? "Explore the complete treasury of Ethiopian Orthodox worship: all 14 Eucharistic Anaphoras, festal Mahelet chants, Saint Yared's three-mode Deggwa system, and the sacred Zema school neume curriculum."
                : 'አሥራ አራቱ ቅዳሴያት፣ የበዓላት ማሕሌት፣ የቅዱስ ያሬድ ፫ቱ የዜማ ስልቶች (ግዕዝ፣ ዕዝል፣ አራራይ) እና የዜማ ትምህርት ቤት ምልክቶች።'}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ display: 'flex', maxWidth: 520 }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  background: '#fff',
                  border: '1.5px solid #D5C9B0',
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 14, color: '#9E9080' }}>
                  <Search style={{ width: 15, height: 15 }} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'Search by title, feast, hymn, or keyword...'
                      : 'በርእስ፣ በበዓል፣ ወይም በቃል ይፈልጉ...'
                  }
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    padding: '10px 12px',
                    fontSize: 13,
                    color: '#2C1D07',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#1A2C1C',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 22px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {language === 'en' ? 'Search' : 'ፈልግ'}
                </button>
              </div>
            </form>
          </div>

          {/* ── Right: St Yared Banner Image (5 cols) ── */}
          <div className="lg:col-span-5 relative hidden lg:block" style={{ minHeight: 240 }}>
            <img
              src="/assets/images/st_yared_hero_banner.jpg"
              alt="Saint Yared holding Deggwa and Begena"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
            {/* Subtle left-edge fade to blend with the parchment text area */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #F5EDD8 0%, transparent 22%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN 3-COLUMN LAYOUT
      ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr 260px',
          gap: 16,
          padding: '14px clamp(12px, 2.5vw, 36px) 36px',
          background: '#F7F3EB',
          alignItems: 'start',
        }}
        className="max-lg:flex max-lg:flex-col"
      >
        {/* ─────────────────────────────────────────────
            LEFT COLUMN: Browse by Category
        ───────────────────────────────────────────── */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #E6DFD1',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 14px',
              borderBottom: '1px solid #F0EBE1',
            }}
          >
            <BookMarked style={{ width: 14, height: 14, color: '#855B09', flexShrink: 0 }} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#2C1D07',
              }}
            >
              {language === 'en' ? 'Browse by Category' : 'በዘርፍ ያስሱ'}
            </span>
          </div>

          {/* Category list */}
          <div style={{ padding: '6px 0' }}>
            {BROWSE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onOpenItem(cat.catId, cat.itemId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '9px 14px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF8F3')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    {/* Icon bubble */}
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: cat.iconBg,
                        color: cat.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid #E8DFC8',
                      }}
                    >
                      <Icon style={{ width: 14, height: 14 }} />
                    </div>
                    {/* Text */}
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: '#2C1D07',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {language === 'en' ? cat.titleEn : cat.titleAm}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: '#8C7E6C',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {language === 'en' ? cat.subEn : cat.subAm}
                      </div>
                    </div>
                  </div>
                  <ChevronRight style={{ width: 13, height: 13, color: '#B3A694', flexShrink: 0 }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            CENTER COLUMN: Featured + Recently Added
        ───────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* --- Featured This Week --- */}
          <div>
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#2C1D07', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <span style={{ color: '#C8A84B', fontSize: 14 }}>✠</span>
                <span>{language === 'en' ? 'Featured This Week' : 'የዚህ ሳምንት ተመራጭ'}</span>
              </div>
              <button
                onClick={() => onOpenItem('qidase', 'qidase-apostles')}
                style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#855B09', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>{language === 'en' ? 'View All' : 'ሁሉንም እይ'}</span>
                <ArrowRight style={{ width: 11, height: 11 }} />
              </button>
            </div>

            {/* Featured card — dark overlay image card (the open manuscript photo) */}
            <div
              style={{
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #C8A84B44',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
              onClick={() => onOpenItem('qidase', 'qidase-apostles')}
            >
              {/* Background image */}
              <img
                src="/assets/images/liturgical_manuscript_featured.jpg"
                alt="Anaphora of the Apostles"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Dark gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)',
                }}
              />

              {/* Content overlay */}
              <div style={{ position: 'relative', zIndex: 2, padding: '20px 22px' }}>
                {/* Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'rgba(200,168,75,0.25)',
                    border: '1px solid #C8A84B',
                    color: '#FFD778',
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '2px 10px',
                    borderRadius: 4,
                    marginBottom: 8,
                  }}
                >
                  {language === 'en' ? 'ANAPHORAS' : 'ሥርዓተ ቅዳሴ'}
                </div>

                {/* Title */}
                <h3
                  style={{
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 800,
                    fontFamily: 'Georgia, serif',
                    margin: '0 0 2px',
                    lineHeight: 1.2,
                  }}
                >
                  {language === 'en' ? 'Anaphora of the Apostles' : 'ቅዳሴ ሐዋርያት'}
                </h3>
                <p
                  style={{ color: '#DDAE3B', fontSize: 12, fontWeight: 600, margin: '0 0 6px', fontFamily: 'inherit' }}
                >
                  የሐዋርያት ቅዳሴ
                </p>

                {/* Description */}
                <p
                  style={{
                    color: '#E0D8C8',
                    fontSize: 12,
                    lineHeight: 1.55,
                    margin: '0 0 14px',
                    maxWidth: 440,
                  }}
                >
                  {language === 'en'
                    ? 'The first and most used Anaphora in the Ethiopian Orthodox Church, containing the complete Eucharistic prayers of the Apostles.'
                    : 'በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ዘወትር በሰንበት የሚቀደስ የሐዋርያት ቅዳሴ።'}
                </p>

                {/* Bottom row: Explore Now + Slide dots */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    style={{
                      background: '#C8A84B',
                      color: '#1A2C1C',
                      border: 'none',
                      borderRadius: 20,
                      padding: '7px 18px',
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onClick={(e) => { e.stopPropagation(); onOpenItem('qidase', 'qidase-apostles'); }}
                  >
                    {language === 'en' ? 'Explore Now' : 'አሁን አንብብ'}
                    <ArrowRight style={{ width: 12, height: 12 }} />
                  </button>

                  {/* Slide indicator dots */}
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    {[0, 1, 2, 3].map((i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                        style={{
                          width: activeSlide === i ? 18 : 6,
                          height: 6,
                          borderRadius: 3,
                          background: activeSlide === i ? '#C8A84B' : 'rgba(255,255,255,0.4)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'width 0.3s, background 0.3s',
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Recently Added --- */}
          <div>
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 800, color: '#2C1D07', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <span style={{ fontSize: 14 }}>🔥</span>
                <span>{language === 'en' ? 'Recently Added' : 'በቅርብ የተጨመሩ'}</span>
              </div>
              <button
                onClick={() => onOpenItem('deggwa', 'deggwa-geez')}
                style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#855B09', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>{language === 'en' ? 'View All' : 'ሁሉንም እይ'}</span>
                <ArrowRight style={{ width: 11, height: 11 }} />
              </button>
            </div>

            {/* 3 mini cards side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {RECENT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onOpenItem(item.catId, item.itemId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      background: '#fff',
                      border: '1px solid #E6DFD1',
                      borderRadius: 10,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#C8A84B';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(200,168,75,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E6DFD1';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          background: item.iconBg,
                          color: item.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: '1px solid #E6DFD1',
                        }}
                      >
                        <Icon style={{ width: 13, height: 13 }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#2C1D07', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {language === 'en' ? item.titleEn : item.titleAm}
                        </div>
                        <div style={{ fontSize: 10, color: '#8C7E6C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {language === 'en'
                            ? `${item.cat1En} • ${item.cat2En}`
                            : `${item.cat1Am} • ${item.cat2Am}`}
                        </div>
                      </div>
                    </div>
                    <ChevronRight style={{ width: 12, height: 12, color: '#B3A694', flexShrink: 0, marginLeft: 4 }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            RIGHT COLUMN: Today's Liturgical Resources
        ───────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Today's Liturgical Resources Card */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #E6DFD1',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '12px 14px',
                borderBottom: '1px solid #F0EBE1',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#FFF5DB',
                  border: '1px solid #E6DFD1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#855B09',
                  flexShrink: 0,
                }}
              >
                <Calendar style={{ width: 15, height: 15 }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#2C1D07' }}>
                  {language === 'en' ? "Today's Liturgical Resources" : 'የዛሬው የቅዳሴና የጸሎት'}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#855B09', marginTop: 1 }}>
                  Meskerem 1, 2018 E.C. • ፩ መስከረም
                </div>
              </div>
            </div>

            {/* Resource list */}
            <div style={{ padding: '4px 0' }}>
              {TODAY_RESOURCES.map((res) => {
                const Icon = res.icon;
                return (
                  <button
                    key={res.id}
                    onClick={() => onOpenItem(res.catId, res.itemId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '9px 14px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF8F3')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                      <Icon style={{ width: 14, height: 14, color: res.iconColor, flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 10, color: '#7A6E5E' }}>
                          {language === 'en' ? res.labelEn : res.labelAm}
                        </div>
                        <div
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: '#2C1D07',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {language === 'en' ? res.valueEn : res.valueAm}
                        </div>
                      </div>
                    </div>
                    <ChevronRight style={{ width: 13, height: 13, color: '#B3A694', flexShrink: 0 }} />
                  </button>
                );
              })}

              {/* Zema Recordings — audio play button */}
              <button
                onClick={() => {
                  if (isTodayPlaying) {
                    setActiveTrackId(null);
                  } else {
                    setActiveTrackId('zema-4');
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 14px',
                  background: isTodayPlaying ? '#1A2C1C' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isTodayPlaying) e.currentTarget.style.background = '#FAF8F3';
                }}
                onMouseLeave={(e) => {
                  if (!isTodayPlaying) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: isTodayPlaying ? '#C8A84B' : '#1A2C1C',
                      color: isTodayPlaying ? '#1A2C1C' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isTodayPlaying
                      ? <Pause style={{ width: 10, height: 10 }} />
                      : <Play style={{ width: 10, height: 10, marginLeft: 1 }} />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: isTodayPlaying ? '#FFD778' : '#7A6E5E' }}>
                      {language === 'en' ? 'Zema Recordings' : 'የድምፅ ዜማ'}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: isTodayPlaying ? '#fff' : '#2C1D07',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isTodayPlaying
                        ? 'Now playing...'
                        : (language === 'en' ? "Listen to today's hymns" : 'የዛሬ ዜማ ያዳምጡ')}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  style={{ width: 13, height: 13, color: isTodayPlaying ? '#C8A84B' : '#B3A694', flexShrink: 0 }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
