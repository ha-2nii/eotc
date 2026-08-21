import React, { useState, useEffect } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import {
  Heart,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Church,
  Calendar,
  Mountain,
} from 'lucide-react';

export interface SanctuaryHeritage {
  id: string;
  nameEn: string;
  nameAm: string;
  regionEn: string;
  regionAm: string;
  country: string;
  categoryEn: string;
  categoryAm: string;
  descriptionEn: string;
  descriptionAm: string;
  altitudeEn: string;
  altitudeAm: string;
  altitudeSubEn: string;
  altitudeSubAm: string;
  image: string;
  specificSiteEn: string;
  specificSiteAm: string;
  addressEn: string;
  addressAm: string;
  foundedEn: string;
  foundedAm: string;
  foundedSubEn: string;
  foundedSubAm: string;
  featureEn: string;
  featureAm: string;
  featureSubEn: string;
  featureSubAm: string;
  rating: number;
  subtitleEn: string;
  subtitleAm: string;
}

const SANCTUARIES: SanctuaryHeritage[] = [
  {
    id: 'lalibela',
    nameEn: 'Lalibela',
    nameAm: 'ላሊበላ',
    regionEn: 'Lasta, Wollo, Ethiopia',
    regionAm: 'ላስታ፣ ወሎ፣ ኢትዮጵያ',
    country: 'Ethiopia',
    categoryEn: 'UNESCO World Heritage',
    categoryAm: 'የዓለም ቅርስ',
    descriptionEn: 'Home to the iconic 12th-century rock-hewn churches carved from solid volcanic rock, an ancient wonder of faith and devotion.',
    descriptionAm: 'በ12ኛው መቶ ክፍለ ዘመን ከአንድ ወጥ አለት የተቀረጹ ፲፩ አብያተ ክርስቲያናት ያሉበት ቅዱስ ስፍራ።',
    altitudeEn: '2,630m Altitude',
    altitudeAm: '፪ሺ፮፻፴ ሜትር ከፍታ',
    altitudeSubEn: 'Highland plateau',
    altitudeSubAm: 'ከፍተኛ ቦታ',
    image: '/assets/images/lalibela_sunset.jpg',
    specificSiteEn: 'Bete Giyorgis (St. George)',
    specificSiteAm: 'ቤተ ጊዮርጊስ (ቅዱስ ጊዮርጊስ)',
    addressEn: 'Lasta, Wollo',
    addressAm: 'ላስታ፣ ወሎ',
    foundedEn: '12th Century',
    foundedAm: '12ኛ ክፍለ ዘመን',
    foundedSubEn: 'Ancient heritage site',
    foundedSubAm: 'ጥንታዊ ቅርስ',
    featureEn: '11 Monolithic Churches',
    featureAm: '፲፩ አብያተ ክርስቲያናት',
    featureSubEn: 'Carved from solid rock',
    featureSubAm: 'ከአለት የተቀረጹ',
    rating: 4.9,
    subtitleEn: 'From Wollo, Ethiopia',
    subtitleAm: 'ላስታ፣ ወሎ',
  },
  {
    id: 'trinity',
    nameEn: 'Holy Trinity',
    nameAm: 'ቅድስት ሥላሴ',
    regionEn: 'Arat Kilo, Addis Ababa',
    regionAm: 'አራት ኪሎ፣ አዲስ አበባ',
    country: 'Ethiopia',
    categoryEn: 'Patriarchal Cathedral',
    categoryAm: 'መንበረ ፓትርያርክ ካቴድራል',
    descriptionEn: 'The sacred seat of the EOTC Patriarchate, revered for its majestic imperial architecture, historic stained glass artistry, and rich spiritual heritage as the heart of Orthodox worship.',
    descriptionAm: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን መንበረ ፓትርያርክ ካቴድራል፤ በንጉሠ ነገሥት ዘመን የተገነባ፣ በታላላቅ ባለቀለም መስታወቶች የተዋበና ታሪካዊ ቅርሶችን የያዘ ቅዱስ ስፍራ ነው።',
    altitudeEn: '2,355m Altitude',
    altitudeAm: '፪ሺ፫፻፶፭ ሜትር ከፍታ',
    altitudeSubEn: 'Central Highlands',
    altitudeSubAm: 'መካከለኛ ከፍታ',
    image: '/assets/images/hero_church.jpg',
    specificSiteEn: 'Holy Trinity Cathedral',
    specificSiteAm: 'ቅድስት ሥላሴ ካቴድራል',
    addressEn: 'Arat Kilo, Shewa',
    addressAm: 'አራት ኪሎ፣ ሸዋ',
    foundedEn: '1941 A.D.',
    foundedAm: '1933 ዓ.ም.',
    foundedSubEn: 'Imperial Cathedral',
    foundedSubAm: 'የንጉሠ ነገሥት ካቴድራል',
    featureEn: 'Patriarchal Seat',
    featureAm: 'መንበረ ፓትርያርክ',
    featureSubEn: 'Imperial Mausoleum',
    featureSubAm: 'የታሪክ ማረፊያ',
    rating: 4.8,
    subtitleEn: 'Addis Ababa, Ethiopia',
    subtitleAm: 'አዲስ አበባ፣ ኢትዮጵያ',
  },
  {
    id: 'axum',
    nameEn: 'Axum Tsion',
    nameAm: 'አክሱም ጽዮን',
    regionEn: 'Axum, Tigray, Ethiopia',
    regionAm: 'አክሱም፣ ትግራይ፣ ኢትዮጵያ',
    country: 'Ethiopia',
    categoryEn: 'Ark of the Covenant Seat',
    categoryAm: 'የታቦተ ጽዮን ማደሪያ',
    descriptionEn: 'The holiest sanctuary of Ethiopian Christianity, globally celebrated as the sacred home of the Ark of the Covenant and the ancient cradle of the nation’s apostolic faith and liturgical traditions.',
    descriptionAm: 'የኢትዮጵያ ክርስትና ዋነኛና ቅዱስ ማዕከል፤ ታቦተ ጽዮን በክብር የምታድርበት፣ የቀደምት ነገሥታት ታሪክና የጥንታዊ ሥልጣኔ ቅርስ የተጠበቀበት የሐዋርያዊ እምነት ምንጭ።',
    altitudeEn: '2,131m Altitude',
    altitudeAm: '፪ሺ፩፻፴፩ ሜትር ከፍታ',
    altitudeSubEn: 'Historic Kingdom',
    altitudeSubAm: 'ጥንታዊ መንግሥት',
    image: '/assets/images/axum_tsion.jpg',
    specificSiteEn: 'St. Mary of Tsion Cathedral',
    specificSiteAm: 'ርእሰ አድባራት ቅድስት ማርያም ጽዮን',
    addressEn: 'Axum, Tigray',
    addressAm: 'አክሱም፣ ትግራይ',
    foundedEn: '4th Century',
    foundedAm: '4ኛ ክፍለ ዘመን',
    foundedSubEn: 'Ezana Dynasty',
    foundedSubAm: 'የኢዛና ዘመን',
    featureEn: 'Ark of Covenant',
    featureAm: 'ጽላተ ኪዳን ማደሪያ',
    featureSubEn: 'Oldest Sanctuary',
    featureSubAm: 'ቀዳሚ መቅደስ',
    rating: 4.9,
    subtitleEn: 'Axum, Tigray',
    subtitleAm: 'አክሱም፣ ትግራይ',
  },
  {
    id: 'debre-damo',
    nameEn: 'Debre Damo',
    nameAm: 'ደብረ ዳሞ',
    regionEn: 'Adigrat, Tigray, Ethiopia',
    regionAm: 'ዓዲግራት፣ ትግራይ፣ ኢትዮጵያ',
    country: 'Ethiopia',
    categoryEn: '6th-Century Clifftop Sanctuary',
    categoryAm: 'የ፮ኛው መቶ ክፍለ ዘመን ገዳም',
    descriptionEn: 'Founded by Abuna Aregawi atop an imposing mountain mesa in the 6th century, famous for its ancient stone monastery accessible only by climbing a 15-meter traditional leather rope.',
    descriptionAm: 'በ፮ኛው መቶ ክፍለ ዘመን በአቡነ አረጋዊ የተመሠረተ ጥንታዊ የአምባ ላይ ገዳም፤ በ15 ሜትር ባህላዊ የማዕበል ገመድ ብቻ ወደ ላይ የሚወጣበት ድንቅ ታሪካዊና መንፈሳዊ ማረፊያ።',
    altitudeEn: '2,211m Altitude',
    altitudeAm: '፪ሺ፪፻፲፩ ሜትር ከፍታ',
    altitudeSubEn: 'Sheer Mountain Mesa',
    altitudeSubAm: 'የአምባ ከፍታ',
    image: '/assets/images/debre_damo.jpg',
    specificSiteEn: 'Abuna Aregawi Monastery',
    specificSiteAm: 'ገዳመ አቡነ አረጋዊ',
    addressEn: 'Adigrat, Tigray',
    addressAm: 'ዓዲግራት፣ ትግራይ',
    foundedEn: '6th Century',
    foundedAm: '6ኛ ክፍለ ዘመን',
    foundedSubEn: 'Nine Saints Era',
    foundedSubAm: 'የተሰዓቱ ቅዱሳን ዘመን',
    featureEn: 'Clifftop Monastery',
    featureAm: 'የአምባ ገዳም',
    featureSubEn: 'Accessible by rope',
    featureSubAm: 'በማዕበል ገመድ',
    rating: 4.8,
    subtitleEn: 'Adigrat, Tigray',
    subtitleAm: 'ዓዲግራት፣ ትግራይ',
  },
  {
    id: 'lake-tana',
    nameEn: 'Lake Tana Monasteries',
    nameAm: 'የጣና ሐይቅ ገዳማት',
    regionEn: 'Bahir Dar, Gojjam, Ethiopia',
    regionAm: 'ባሕር ዳር፣ ጎጃም፣ ኢትዮጵያ',
    country: 'Ethiopia',
    categoryEn: '14th-Century Island Sanctuary',
    categoryAm: 'የደሴት ገዳማት ማዕከል',
    descriptionEn: 'Ancient circular island monasteries nested on the peaceful waters of Lake Tana, preserving priceless imperial crowns, holy Ge\'ez manuscripts, and vibrant centuries-old religious frescoes.',
    descriptionAm: 'በጣና ሐይቅ ደሴቶች ላይ የተመሠረቱ ጥንታዊ ክብ ቅርጽ አብያተ ክርስቲያናት፤ የነገሥታት አክሊላትን፣ ጥንታዊ የብራና መጻሕፍትንና የቅዱሳን ሥዕላትን በክብር የያዙ ገዳማት።',
    altitudeEn: '1,788m Altitude',
    altitudeAm: '፩ሺ፯፻፹፰ ሜትር ከፍታ',
    altitudeSubEn: 'Island Peninsula',
    altitudeSubAm: 'የደሴት ከፍታ',
    image: '/assets/images/lake_tana.jpg',
    specificSiteEn: 'Ura Kidane Mehret',
    specificSiteAm: 'ኡራ ኪዳነ ምሕረት',
    addressEn: 'Bahir Dar, Gojjam',
    addressAm: 'ባሕር ዳር፣ ጎጃም',
    foundedEn: '14th Century',
    foundedAm: '14ኛ ክፍለ ዘመን',
    foundedSubEn: 'Solomonic Era',
    foundedSubAm: 'የሰሎሞናዊ ዘመን',
    featureEn: 'Island Monasteries',
    featureAm: 'የደሴት ገዳማት',
    featureSubEn: 'Historic Manuscripts',
    featureSubAm: 'ጥንታዊ ብራናዎች',
    rating: 4.9,
    subtitleEn: 'Bahir Dar, Gojjam',
    subtitleAm: 'ባሕር ዳር፣ ጎጃም',
  },
];

export const SacredHeritageExplorer: React.FC = () => {
  const { language, setActiveView } = useLanguage();
  const [favorites, setFavorites] = useState<string[]>(['lalibela', 'axum']);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  // Scroll-triggered fade-in via IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate the huge sanctuary showcase card every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SANCTUARIES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentHero = SANCTUARIES[activeIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SANCTUARIES.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % SANCTUARIES.length);
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        background: 'var(--parchment, #FDFBF7)',
        padding: '0 0 64px',
        fontFamily: 'var(--font-sans)',
        overflowX: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* ── Smooth curved wave divider from section 2 ── */}
      <div style={{ width: '100%', lineHeight: 0, marginBottom: '8px', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '56px' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C240,56 480,0 720,32 C960,56 1200,0 1440,24 L1440,0 L0,0 Z"
            fill="var(--parchment, #FDFBF7)"
          />
        </svg>
      </div>

      <div className="container" style={{
        maxWidth: '1480px',
        margin: '0 auto',
        paddingLeft: 'clamp(20px, 4vw, 64px)',
        paddingRight: 'clamp(20px, 4vw, 64px)',
      }}>


        {/* ─── TOP HERO DESTINATION (ENLARGED FULL ROTATING SHOWCASE) ─── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: 'relative',
            minHeight: 'clamp(560px, 65vh, 720px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.5s ease',
          }}
        >
          {/* Background Image on Right with Smooth Cross-Fade Stack */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            borderRadius: '28px',
            overflow: 'hidden',
          }}>
            {SANCTUARIES.map((sanctuary, idx) => (
              <img
                key={sanctuary.id}
                src={sanctuary.image}
                alt={sanctuary.nameEn}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'right center',
                  opacity: idx === activeIndex ? 1 : 0,
                  transform: idx === activeIndex ? 'scale(1)' : 'scale(1.04)',
                  transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ))}
            {/* Smooth gradient overlay from left (parchment) to right (revealing picture) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #FDFBF7 0%, #FDFBF7 35%, rgba(253,251,247,0.92) 48%, rgba(253,251,247,0.40) 65%, rgba(253,251,247,0.02) 82%, rgba(253,251,247,0) 100%)',
            }} />
          </div>

          {/* Top/Left Content Area with Fade Animation */}
          <div
            key={`content-${currentHero.id}`}
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '24px 0 16px',
              maxWidth: '680px',
              animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Category Text (Clean typography with Gold Cross/Church icon) */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              fontWeight: 800,
              color: '#B8860B',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '16px',
            }}>
              <Church style={{ width: '16px', height: '16px', color: '#B8860B' }} />
              <span>{language === 'en' ? currentHero.categoryEn : currentHero.categoryAm}</span>
            </div>

            {/* Title (Enlarged and bold) */}
            <h2 style={{
              fontSize: 'clamp(44px, 5.5vw, 76px)',
              fontWeight: 800,
              color: '#1a1208',
              lineHeight: 1.04,
              marginBottom: '12px',
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: '-0.02em',
            }}>
              {language === 'en' ? currentHero.nameEn : currentHero.nameAm}
            </h2>

            {/* Region / Subtitle in warm gold */}
            <div style={{
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              fontWeight: 700,
              color: '#B8860B',
              marginBottom: '20px',
              letterSpacing: '0.01em',
            }}>
              {language === 'en' ? currentHero.regionEn : currentHero.regionAm}
            </div>

            {/* Description (Spacious and readable) */}
            <p style={{
              fontSize: '16px',
              color: '#554e42',
              lineHeight: 1.7,
              maxWidth: '520px',
              marginBottom: '32px',
              fontFamily: 'var(--font-body)',
            }}>
              {language === 'en' ? currentHero.descriptionEn : currentHero.descriptionAm}
            </p>

            {/* Action Buttons (Enlarged) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveView('find-a-church')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#19241b',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '16px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: '0 8px 22px rgba(25, 36, 27, 0.28)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#253828';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(25, 36, 27, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#19241b';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(25, 36, 27, 0.28)';
                }}
              >
                <MapPin style={{ width: '17px', height: '17px', color: '#D4AF37' }} />
                <span>
                  {language === 'en' ? `Explore ${currentHero.nameEn}` : `${currentHero.nameAm} ጎብኝ`}
                </span>
                <ChevronRight style={{ width: '16px', height: '16px' }} />
              </button>

              <button
                onClick={(e) => toggleFavorite(currentHero.id, e)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(44, 29, 7, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                title="Save Sanctuary"
              >
                <Heart
                  style={{
                    width: '20px',
                    height: '20px',
                    color: favorites.includes(currentHero.id) ? '#e11d48' : '#6b6550',
                    fill: favorites.includes(currentHero.id) ? '#e11d48' : 'none',
                    transition: 'fill 0.2s, color 0.2s',
                  }}
                />
              </button>

              {/* Slide Navigation Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '12px' }}>
                <button
                  onClick={handlePrev}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(44, 29, 7, 0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  aria-label="Previous destination"
                >
                  <ChevronLeft style={{ width: '18px', height: '18px', color: '#1a1208' }} />
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(44, 29, 7, 0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  aria-label="Next destination"
                >
                  <ChevronRight style={{ width: '18px', height: '18px', color: '#1a1208' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Stats Row & Slide Indicator Dots */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            margin: '40px 0 12px',
            maxWidth: '960px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '28px',
              alignItems: 'center',
            }}>
              {/* Stat 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(212, 163, 56, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Church style={{ width: '22px', height: '22px', color: '#B8860B' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1a1208', lineHeight: 1.25 }}>
                    {language === 'en' ? currentHero.featureEn : currentHero.featureAm}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7a7263', marginTop: '3px' }}>
                    {language === 'en' ? currentHero.featureSubEn : currentHero.featureSubAm}
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(212, 163, 56, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Mountain style={{ width: '22px', height: '22px', color: '#B8860B' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1a1208', lineHeight: 1.25 }}>
                    {language === 'en' ? currentHero.altitudeEn : currentHero.altitudeAm}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7a7263', marginTop: '3px' }}>
                    {language === 'en' ? currentHero.altitudeSubEn : currentHero.altitudeSubAm}
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(212, 163, 56, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Calendar style={{ width: '22px', height: '22px', color: '#B8860B' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1a1208', lineHeight: 1.25 }}>
                    {language === 'en' ? currentHero.foundedEn : currentHero.foundedAm}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#7a7263', marginTop: '3px' }}>
                    {language === 'en' ? currentHero.foundedSubEn : currentHero.foundedSubAm}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Dots Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              {SANCTUARIES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    width: idx === activeIndex ? '32px' : '9px',
                    height: '9px',
                    borderRadius: '5px',
                    background: idx === activeIndex ? '#B8860B' : 'rgba(44, 29, 7, 0.18)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                  aria-label={`Go to sanctuary ${s.nameEn}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
