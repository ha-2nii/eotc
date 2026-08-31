import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { MOCK_CHURCHES } from '../../data/mockChurches';
import type { Church } from '../../data/mockChurches';
import {
  Clock, Calendar, MapPin, Tv, Bell,
  Search, Filter, ChevronRight, Check, X,
  Compass, Star, BookOpen, AlertCircle,
  Bookmark, Sparkles
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────── */
export type ServiceType = 'Qidase' | 'Mahelet' | 'Special Liturgy' | 'Sermon' | 'Sunday School';

export interface ScheduledService {
  id: string;
  churchId: string;
  churchNameAmharic: string;
  churchNameEnglish: string;
  city: string;
  country: string;
  diocese: string;
  serviceType: ServiceType;
  titleEn: string;
  titleAm: string;
  gregorianDate: string; // e.g. "Sunday, Aug 23, 2026"
  ethiopianDate: string; // e.g. "ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም"
  time: string; // e.g. "6:00 AM – 10:30 AM"
  languages: string[];
  celebrantPriest?: string;
  hasLiveStream: boolean;
  streamingUrl?: string;
  isSpecialFeast?: boolean;
  feastName?: string;
  address: string;
  dateCategory: 'today' | 'this_week' | 'this_month';
  descriptionEn?: string;
  descriptionAm?: string;
}

/* ─── Mock Services Data ─────────────────────────────────────── */
export const MOCK_SCHEDULED_SERVICES: ScheduledService[] = [
  {
    id: 's1',
    churchId: 'c1',
    churchNameAmharic: 'መንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል',
    churchNameEnglish: 'Holy Trinity Cathedral (Patriarchate)',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    diocese: 'Addis Ababa Diocese',
    serviceType: 'Qidase',
    titleEn: 'Sunday Solemn Divine Liturgy (Kidase)',
    titleAm: 'የእሑድ ማለዳ የበዓል ቅዳሴ',
    gregorianDate: 'Sunday, Aug 23, 2026',
    ethiopianDate: 'ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም',
    time: '6:00 AM – 10:30 AM',
    languages: ["Ge'ez", 'Amharic', 'English'],
    celebrantPriest: 'Melake Selam Abba Gebre Selassie',
    hasLiveStream: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    isSpecialFeast: false,
    address: 'Arat Kilo, Addis Ababa',
    dateCategory: 'this_week',
    descriptionEn: 'Full Eucharistic Liturgy of St. Basil with Patriarchal choir antiphons and homily.',
    descriptionAm: 'የቅዱስ ባስልዮስ ቅዳሴ ከካቴድራሉ መዘምራን ያሬዳዊ ዜማና ቃለ ምዕዳን ጋር።',
  },
  {
    id: 's2',
    churchId: 'c2',
    churchNameAmharic: 'ደብረ ጽዮን ቅድስት ማርያም ቤተ ክርስቲያን — እንጦጦ',
    churchNameEnglish: 'Debre Zion St. Mary Church – Entoto',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    diocese: 'Addis Ababa Diocese',
    serviceType: 'Mahelet',
    titleEn: 'All-Night Feast Vigil & Mahlet (Filseta)',
    titleAm: 'የአስተርእዮ ማርያምና የፍልሰታ ዋዜማና ማኅሌት',
    gregorianDate: 'Saturday, Aug 22, 2026',
    ethiopianDate: 'ነሐሴ ፲፮, ፳፻፲፰ ዓ.ም',
    time: '8:00 PM – 4:00 AM',
    languages: ["Ge'ez", 'Amharic'],
    celebrantPriest: 'Megabe Hadis Eshete',
    hasLiveStream: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    isSpecialFeast: true,
    feastName: 'Feast of the Assumption (ፍልሰታ)',
    address: 'Entoto Hill, Addis Ababa',
    dateCategory: 'this_week',
    descriptionEn: 'Solemn nocturnal St. Yared Digua canticles, Wudase Maryam chants, and morning dawn Kidase.',
    descriptionAm: 'ያሬዳዊ የድጓ ማኅሌት፣ የዋዜማ ዝማሬና የማለዳ አስተርእዮ ቅዳሴ።',
  },
  {
    id: 's3',
    churchId: 'c3',
    churchNameAmharic: 'ቅዱስ ሚካኤል ቤተ ክርስቲያን — ቦሌ',
    churchNameEnglish: 'St. Michael Church – Bole',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    diocese: 'Addis Ababa Diocese',
    serviceType: 'Special Liturgy',
    titleEn: 'Monthly Commemoration of Archangel Michael',
    titleAm: 'የቅዱስ ሚካኤል ወርሃዊ በዓልና ጸሎተ ቅዳሴ',
    gregorianDate: 'Wednesday, Aug 19, 2026',
    ethiopianDate: 'ነሐሴ ፲፫, ፳፻፲፰ ዓ.ም',
    time: '6:30 AM – 11:00 AM',
    languages: ["Ge'ez", 'Amharic'],
    celebrantPriest: 'Kesis Daniel Alemayehu',
    hasLiveStream: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    isSpecialFeast: true,
    feastName: 'Archangel Michael (ቅዱስ ሚካኤል)',
    address: 'Bole Sub-City, Addis Ababa',
    dateCategory: 'today',
    descriptionEn: 'Procession of the Tabot with deacons and Sunday School spiritual hymns.',
    descriptionAm: 'የታቦተ ሕጉ በዓለ ንግሥ ከሰንበት ት/ቤት ዝማሬና ጸሎተ ምህላ ጋር።',
  },
  {
    id: 's4',
    churchId: 'c19',
    churchNameAmharic: 'ደብረ ሰላም መድኃኔ ዓለም — ዋሽንግተን ዲሲ',
    churchNameEnglish: 'Debre Selam Medhane Alem – Washington DC',
    city: 'Washington DC',
    country: 'USA',
    diocese: 'North America Diocese',
    serviceType: 'Qidase',
    titleEn: 'Dual-Language Sunday Liturgy (English & Amharic)',
    titleAm: 'የእሑድ የሁለት ቋንቋዎች ቅዳሴ (እንግሊዝኛና አማርኛ)',
    gregorianDate: 'Sunday, Aug 23, 2026',
    ethiopianDate: 'ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም',
    time: '8:00 AM – 12:30 PM',
    languages: ['English', 'Amharic', "Ge'ez"],
    celebrantPriest: 'Kesis Melake Genet Berhanu',
    hasLiveStream: true,
    streamingUrl: 'https://youtube.com/@EOTCDCMedhaneAlem',
    isSpecialFeast: false,
    address: '4401 16th St NW, Washington, DC 20011',
    dateCategory: 'this_week',
    descriptionEn: 'Includes youth sermon in English, Divine Liturgy with projected translations, and community Agapē lunch.',
    descriptionAm: 'ለወጣቶች በእንግሊዝኛ የሚሰጥ ትምህርት፣ ቅዳሴ ከተተረጎመ ስክሪን ጋርና የፍቅር ማዕድ።',
  },
  {
    id: 's5',
    churchId: 'c23',
    churchNameAmharic: 'ደብረ ጽዮን ቅድስት ማርያም — ለንደን',
    churchNameEnglish: 'Debre Zion St. Mary – London',
    city: 'London',
    country: 'United Kingdom',
    diocese: 'UK & Europe Diocese',
    serviceType: 'Sermon',
    titleEn: 'Patristic Gospel Seminar & Youth Bible Study',
    titleAm: 'የአበው ትምህርትና የወጣቶች የመጽሐፍ ቅዱስ ጥናት',
    gregorianDate: 'Friday, Aug 21, 2026',
    ethiopianDate: 'ነሐሴ ፲፭, ፳፻፲፰ ዓ.ም',
    time: '6:30 PM – 8:30 PM',
    languages: ['English', 'Amharic'],
    celebrantPriest: 'Deacon Samuel Tesfaye',
    hasLiveStream: false,
    address: 'Battersea Park Rd, London SW11 4LP',
    dateCategory: 'this_week',
    descriptionEn: 'In-depth exposition on Tewahedo Christology and the Life of the Desert Fathers.',
    descriptionAm: 'ስለ ተዋሕዶ የነገረ መለኮት ትምህርትና ስለ ገዳማውያን አባቶች ሕይወት የሚሰጥ ትምህርት።',
  },
  {
    id: 's6',
    churchId: 'c6',
    churchNameAmharic: 'ቅዱስ ጊዮርጊስ ካቴድራል — ፒያሳ',
    churchNameEnglish: 'St. George Cathedral – Piazza',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    diocese: 'Addis Ababa Diocese',
    serviceType: 'Sunday School',
    titleEn: 'Cathedral Sunday School Youth Choir & Chants',
    titleAm: 'የሰንበት ትምህርት ቤት መዘምራን ዝማሬና መንፈሳዊ ጉባኤ',
    gregorianDate: 'Sunday, Aug 23, 2026',
    ethiopianDate: 'ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም',
    time: '11:00 AM – 1:30 PM',
    languages: ['Amharic', "Ge'ez"],
    hasLiveStream: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    address: 'Piazza, Addis Ababa',
    dateCategory: 'this_week',
    descriptionEn: 'Spiritual drama, sacred poetry (Qene), choral hymns, and catechism for children and teens.',
    descriptionAm: 'መንፈሳዊ ድራማ፣ ቅኔ፣ ያሬዳዊ ዝማሬና የሕፃናት የሃይማኖት ትምህርት።',
  },
  {
    id: 's7',
    churchId: 'c30',
    churchNameAmharic: 'የቅድስት ድንግል ማርያም የተልእኮ ማዕከል — ዳላስ',
    churchNameEnglish: 'St. Mary Mission Center – Dallas',
    city: 'Dallas',
    country: 'USA',
    diocese: 'North America Diocese',
    serviceType: 'Qidase',
    titleEn: 'Mission Divine Liturgy & English Catechism',
    titleAm: 'የተልእኮ ቅዳሴና የእንግሊዝኛ ኦርቶዶክሳዊ ትምህርት',
    gregorianDate: 'Sunday, Aug 30, 2026',
    ethiopianDate: 'ነሐሴ ፳፬, ፳፻፲፰ ዓ.ም',
    time: '8:30 AM – 12:00 PM',
    languages: ['English', 'Amharic'],
    celebrantPriest: 'Kesis Dawit Bekele',
    hasLiveStream: true,
    streamingUrl: 'https://youtube.com/@EOTCDallasMission',
    address: '1420 W Mockingbird Ln, Dallas, TX 75247',
    dateCategory: 'this_month',
    descriptionEn: 'Bilingual liturgical service structured for converts and 2nd-generation youth.',
    descriptionAm: 'ለወጣቶችና አዳዲስ አማኞች የተዘጋጀ ባለ ሁለት ቋንቋ ቅዳሴ።',
  },
  {
    id: 's8',
    churchId: 'c25',
    churchNameAmharic: 'ፍራንክፈርት ደብረ ሲና ቅዱስ ጊዮርጊስ',
    churchNameEnglish: 'Debre Sina St. George – Frankfurt',
    city: 'Frankfurt',
    country: 'Germany',
    diocese: 'Germany Diocese',
    serviceType: 'Qidase',
    titleEn: 'Sunday Liturgy in German & Ge’ez',
    titleAm: 'የእሑድ ቅዳሴ በጀርመንኛና ግዕዝ ቋንቋ',
    gregorianDate: 'Sunday, Aug 23, 2026',
    ethiopianDate: 'ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም',
    time: '9:00 AM – 1:00 PM',
    languages: ['German', 'Amharic', "Ge'ez"],
    celebrantPriest: 'Kesis Yohannes Müller',
    hasLiveStream: false,
    address: 'Sachsenhausen, Frankfurt am Main',
    dateCategory: 'this_week',
    descriptionEn: 'Serving the Ethiopian and European faithful with translated Eucharistic liturgy.',
    descriptionAm: 'በጀርመን ለሚኖሩ ምዕመናን የሚቀርብ ቅዳሴና መንፈሳዊ ትምህርት።',
  }
];

export const ServicesScheduleView: React.FC<{
  onSelectChurch: (church: Church) => void;
}> = ({ onSelectChurch }) => {
  const { language, setActiveView } = useLanguage();

  /* ── Location / Church prompt state ── */
  const [locationMode, setLocationMode] = useState<'near_me' | 'select_church' | 'favorites'>('near_me');
  const [selectedChurchFilter, setSelectedChurchFilter] = useState<string>('ALL');
  const [favoriteChurchIds, setFavoriteChurchIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eotc_fav_churches');
      return saved ? JSON.parse(saved) : ['c1', 'c19'];
    } catch {
      return ['c1', 'c19'];
    }
  });

  /* ── Filters ── */
  const [dateFilter, setDateFilter] = useState<'ALL' | 'today' | 'this_week' | 'this_month'>('ALL');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('ALL');
  const [languageFilter, setLanguageFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  /* ── Reminder Modal state ── */
  const [reminderService, setReminderService] = useState<ScheduledService | null>(null);
  const [reminderChannel, setReminderChannel] = useState<'email' | 'sms' | 'push'>('email');
  const [reminderContact, setReminderContact] = useState('');
  const [reminderAdvance, setReminderAdvance] = useState<'15min' | '1hour' | '1day'>('1hour');
  const [reminderSuccess, setReminderSuccess] = useState(false);

  /* ── Countdown to Next Sunday Liturgy (6:00 AM) ── */
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (churchId: string) => {
    setFavoriteChurchIds((prev) => {
      const next = prev.includes(churchId) ? prev.filter((id) => id !== churchId) : [...prev, churchId];
      try {
        localStorage.setItem('eotc_fav_churches', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  /* ── Filtered Services ── */
  const filteredServices = useMemo(() => {
    return MOCK_SCHEDULED_SERVICES.filter((s) => {
      // Date filter
      if (dateFilter !== 'ALL' && s.dateCategory !== dateFilter) return false;
      // Service type
      if (serviceTypeFilter !== 'ALL' && s.serviceType !== serviceTypeFilter) return false;
      // Language
      if (languageFilter !== 'ALL' && !s.languages.includes(languageFilter)) return false;
      // Location / Church prompt filter
      if (locationMode === 'favorites' && !favoriteChurchIds.includes(s.churchId)) return false;
      if (locationMode === 'select_church' && selectedChurchFilter !== 'ALL' && s.churchId !== selectedChurchFilter) return false;
      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matches =
          s.titleEn.toLowerCase().includes(q) ||
          s.titleAm.toLowerCase().includes(q) ||
          s.churchNameEnglish.toLowerCase().includes(q) ||
          s.churchNameAmharic.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          (s.feastName && s.feastName.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [dateFilter, serviceTypeFilter, languageFilter, locationMode, selectedChurchFilter, favoriteChurchIds, searchTerm]);

  /* ── Service Type Badges Helper ── */
  const getServiceTypeBadge = (type: ServiceType) => {
    switch (type) {
      case 'Qidase':
        return { bg: 'bg-[#FFF8E7] text-[#855B09] border-[#C8A84B]', label: 'ቅዳሴ (Qidase)' };
      case 'Mahelet':
        return { bg: 'bg-indigo-50 text-indigo-800 border-indigo-200', label: 'ማኅሌት (Mahelet)' };
      case 'Special Liturgy':
        return { bg: 'bg-amber-50 text-amber-900 border-amber-300', label: 'የበዓል ቅዳሴ (Special Liturgy)' };
      case 'Sermon':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', label: 'ትምህርተ ወንጌል (Sermon)' };
      case 'Sunday School':
        return { bg: 'bg-purple-50 text-purple-800 border-purple-200', label: 'ሰንበት ት/ቤት (Sunday School)' };
    }
  };

  const handleSetReminder = (e: React.FormEvent) => {
    e.preventDefault();
    setReminderSuccess(true);
    setTimeout(() => {
      setReminderSuccess(false);
      setReminderService(null);
      setReminderContact('');
    }, 2200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ══ 1. LOCATION PROMPT & CHURCH SELECTOR BAR ══════════════ */}
      <section className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="badge-gold text-[10px] uppercase font-bold tracking-wider">
              {language === 'am' ? 'የአካባቢ መምረጫ' : 'PARISH DISCOVERY MODE'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#2C1D07] font-serif">
              {language === 'am' ? 'አገልግሎቶችን በአካባቢዎ ወይም በደብርዎ ይመልከቱ' : 'Find Services Near You or By Church'}
            </h2>
          </div>

          {/* Mode Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setLocationMode('near_me')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                locationMode === 'near_me'
                  ? 'bg-[#1A2C1C] text-[#C8A84B] border-[#C8A84B] shadow-sm'
                  : 'bg-[#FAF8F3] text-[#4A3B22] border-[#E6DFD1] hover:border-[#C8A84B]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#C8A84B]" />
              <span>{language === 'am' ? 'በአቅራቢያዬ ያሉ አገልግሎቶች' : 'Services Near Me (GPS)'}</span>
            </button>

            <button
              onClick={() => setLocationMode('select_church')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                locationMode === 'select_church'
                  ? 'bg-[#1A2C1C] text-[#C8A84B] border-[#C8A84B] shadow-sm'
                  : 'bg-[#FAF8F3] text-[#4A3B22] border-[#E6DFD1] hover:border-[#C8A84B]'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#C8A84B]" />
              <span>{language === 'am' ? 'ቤተ ክርስቲያን ይምረጡ' : 'Select Your Church'}</span>
            </button>

            <button
              onClick={() => setLocationMode('favorites')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                locationMode === 'favorites'
                  ? 'bg-[#1A2C1C] text-[#C8A84B] border-[#C8A84B] shadow-sm'
                  : 'bg-[#FAF8F3] text-[#4A3B22] border-[#E6DFD1] hover:border-[#C8A84B]'
              }`}
            >
              <Star className="w-4 h-4 text-[#C8A84B]" />
              <span>{language === 'am' ? 'የተመረጡ አብያተ ክርስቲያናት' : `Saved Churches (${favoriteChurchIds.length})`}</span>
            </button>
          </div>
        </div>

        {/* Church Dropdown when select_church is active */}
        {locationMode === 'select_church' && (
          <div className="pt-3 border-t border-[#E6DFD1] flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-bold text-[#855B09] shrink-0">
              {language === 'am' ? 'የደብር ስም ይምረጡ:' : 'Choose Specific Parish:'}
            </span>
            <select
              value={selectedChurchFilter}
              onChange={(e) => setSelectedChurchFilter(e.target.value)}
              className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-4 py-2.5 text-xs font-bold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">
                {language === 'am' ? 'ሁሉም አብያተ ክርስቲያናት (All Parishes)' : 'All Registered Parishes'}
              </option>
              {MOCK_CHURCHES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameEnglish} ({c.nameAmharic}) — {c.city}, {c.country}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>

      {/* ══ 2. "WHAT'S HAPPENING THIS SUNDAY" CURATED HIGHLIGHT ══════ */}
      <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                ✦ {language === 'am' ? 'የሚመጣው እሑድ ልዩ ማዕከል' : "WHAT'S HAPPENING THIS SUNDAY"}
              </span>
              <span className="bg-white/10 text-stone-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                Aug 23, 2026 • ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም
              </span>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#C8A84B]/40">
              <Clock className="w-4 h-4 text-[#C8A84B]" />
              <div className="text-xs font-mono font-bold text-[#C8A84B] flex items-center gap-1.5">
                <span>{timeLeft.days}d</span>:
                <span>{timeLeft.hours}h</span>:
                <span>{timeLeft.minutes}m</span>:
                <span>{timeLeft.seconds}s</span>
                <span className="text-[10px] text-stone-300 font-sans ml-1">until Dawn Liturgy</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-geez leading-tight">
                {language === 'am'
                  ? 'የእሑድ ማለዳ ቅዳሴና የሰንበተ ክርስቲያን ምስጋና'
                  : 'Sunday Divine Liturgy & Eucharistic Celebration'}
              </h3>
              <p className="text-sm text-stone-200 leading-relaxed">
                {language === 'am'
                  ? 'በሁሉም አብያተ ክርስቲያናት የማለዳ ቅዳሴ ከጧቱ 6:00 ጀምሮ ይካሄዳል፤ በቅዱስ ባስልዮስና በቅዱስ ዲዮስቆሮስ ቅዳሴ አምላካዊ ምሥጢር ይፈጸማል።'
                  : 'Parishes worldwide commence Morning Divine Liturgy at 6:00 AM. Join the faithful for the Anaphora of St. Basil, St. Yared Digua choral hymns, and pastoral sermons.'}
              </p>

              {/* Sunday Scriptural Readings Box */}
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-[#C8A84B]/30 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#C8A84B] font-bold uppercase tracking-wider text-[10px]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Sunday Liturgical Lectionary Readings (የዕለቱ ምንባባት)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300 text-[11px]">
                  <div>• <strong>Epistle:</strong> 1 Corinthians 15:1–28</div>
                  <div>• <strong>Catholic Epistle:</strong> 1 Peter 2:1–10</div>
                  <div>• <strong>Acts of Apostles:</strong> Acts 20:7–12</div>
                  <div>• <strong>Holy Gospel:</strong> St. John 6:35–58</div>
                </div>
              </div>
            </div>

            {/* Sunday Quick Actions */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-4 text-xs">
              <div className="text-[#C8A84B] font-bold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8A84B]" />
                <span>Join Sunday Services</span>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">
                Locate your nearest parish with GPS or connect with live streaming services from Holy Trinity Patriarchal Cathedral.
              </p>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    const feat = MOCK_SCHEDULED_SERVICES[0];
                    setReminderService(feat);
                  }}
                  className="w-full btn-gold py-2.5 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Remind Me for This Sunday</span>
                </button>
                <button
                  onClick={() => setActiveView('resources')}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
                >
                  <Tv className="w-4 h-4 text-[#C8A84B]" />
                  <span>Watch Live Broadcasts</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. MULTI-FILTER BAR ═══════════════════════════════════ */}
      <section className="bg-white p-5 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#855B09] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'am' ? 'በአገልግሎት ስም፣ በደብር ወይም በበዓል ፈልግ...' : 'Search by service name, parish, feast, or city...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E6DFD1] text-xs font-medium focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3] text-[#2C1D07]"
            />
          </div>

          {/* Quick Date Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'ALL', lEn: 'All Upcoming', lAm: 'ሁሉም' },
              { id: 'today', lEn: 'Today', lAm: 'ዛሬ' },
              { id: 'this_week', lEn: 'This Week', lAm: 'በዚህ ሳምንት' },
              { id: 'this_month', lEn: 'This Month', lAm: 'በዚህ ወር' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDateFilter(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                  dateFilter === tab.id
                    ? 'bg-[#855B09] text-white border-[#855B09] shadow-sm'
                    : 'bg-[#FAF8F3] text-[#4A3B22] border-[#E6DFD1] hover:border-[#C8A84B]'
                }`}
              >
                {language === 'am' ? tab.lAm : tab.lEn}
              </button>
            ))}
          </div>
        </div>

        {/* 2 Dropdowns: Service Type & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E6DFD1]">
          {/* Service Type */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#855B09] shrink-0">
              <Filter className="w-3.5 h-3.5 inline mr-1" />
              {language === 'am' ? 'የአገልግሎት ዓይነት:' : 'Service Type:'}
            </span>
            <select
              value={serviceTypeFilter}
              onChange={(e) => setServiceTypeFilter(e.target.value)}
              className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">All Service Types (ሁሉም)</option>
              <option value="Qidase">Qidase — Divine Liturgy (ቅዳሴ)</option>
              <option value="Mahelet">Mahelet — All-Night Vigil (ማኅሌት)</option>
              <option value="Special Liturgy">Special Feast Liturgy (የበዓል ቅዳሴ)</option>
              <option value="Sermon">Sermon & Gospel Teaching (ትምህርተ ወንጌል)</option>
              <option value="Sunday School">Sunday School & Youth Choir (ሰንበት ት/ቤት)</option>
            </select>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#855B09] shrink-0">
              {language === 'am' ? 'ቋንቋ:' : 'Language:'}
            </span>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">All Languages (ሁሉም ቋንቋዎች)</option>
              <option value="Ge'ez">Ge'ez (ግዕዝ)</option>
              <option value="Amharic">Amharic (አማርኛ)</option>
              <option value="English">English (እንግሊዝኛ)</option>
              <option value="Tigrinya">Tigrinya (ትግርኛ)</option>
              <option value="German">German (ጀርመንኛ)</option>
            </select>
          </div>
        </div>
      </section>

      {/* ══ 4. SERVICE SCHEDULE LIST ══════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-bold text-[#6B7280]">
            Showing {filteredServices.length} Scheduled Services
          </div>
          <div className="text-xs font-bold text-[#855B09]">
            {language === 'am' ? 'በቀንና በሰዓት የተደረደሩ' : 'Sorted Chronologically'}
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#E6DFD1] text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-[#855B09] mx-auto opacity-70" />
            <h4 className="text-lg font-bold text-[#2C1D07]">No services match your filters</h4>
            <p className="text-xs text-[#6B7280]">Try resetting your search query, date filter, or service type selector.</p>
            <button
              onClick={() => {
                setDateFilter('ALL');
                setServiceTypeFilter('ALL');
                setLanguageFilter('ALL');
                setSearchTerm('');
              }}
              className="btn-gold px-4 py-2 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => {
              const badge = getServiceTypeBadge(service.serviceType);
              const isFav = favoriteChurchIds.includes(service.churchId);

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Top Badges & Actions */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFavorite(service.churchId)}
                          title={isFav ? 'Remove from saved' : 'Save this church'}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isFav
                              ? 'bg-amber-50 text-amber-600 border-amber-300'
                              : 'bg-[#FAF8F3] text-stone-400 border-[#E6DFD1] hover:text-[#855B09]'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-500' : ''}`} />
                        </button>

                        {service.hasLiveStream && (
                          <span className="text-[9px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Live Stream
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Service Titles */}
                    <div>
                      <h3 className="text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors leading-snug">
                        {service.titleAm}
                      </h3>
                      <p className="text-xs font-semibold text-[#855B09]">{service.titleEn}</p>
                    </div>

                    {/* Church Info */}
                    <div className="text-xs text-[#4A3B22] space-y-1">
                      <div className="font-bold text-[#2C1D07] font-geez flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                        <span>{service.churchNameAmharic}</span>
                      </div>
                      <div className="text-[11px] text-[#6B7280] pl-5">
                        {service.churchNameEnglish} • {service.city}, {service.country}
                      </div>
                    </div>

                    {/* Date & Time Highlight Box */}
                    <div className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E6DFD1] space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-[#2C1D07] font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#855B09]" />
                          <span>{service.gregorianDate}</span>
                        </div>
                        <span className="font-geez font-bold text-[#855B09] text-[11px]">
                          {service.ethiopianDate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <div className="flex items-center gap-2 text-[#4A3B22] font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#855B09]" />
                          <span>{service.time}</span>
                        </div>
                        <div className="text-stone-500 font-medium">
                          <strong>Languages:</strong> {service.languages.join(' / ')}
                        </div>
                      </div>

                      {service.celebrantPriest && (
                        <div className="text-[10px] text-stone-500 pt-1 border-t border-[#E6DFD1]/60">
                          <strong>Celebrant:</strong> {service.celebrantPriest}
                        </div>
                      )}
                    </div>

                    {service.descriptionEn && (
                      <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                        {language === 'am' ? service.descriptionAm : service.descriptionEn}
                      </p>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-[#E6DFD1] flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => setReminderService(service)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FFF8E7] border border-[#E6DFD1] hover:border-[#C8A84B] text-xs font-bold text-[#855B09] flex items-center gap-1.5 transition-colors"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{language === 'am' ? 'አስታውሰኝ (Remind Me)' : 'Remind Me'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {service.streamingUrl && (
                        <a
                          href={service.streamingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <Tv className="w-3.5 h-3.5" />
                          <span>Stream</span>
                        </a>
                      )}

                      <button
                        onClick={() => {
                          const target = MOCK_CHURCHES.find((c) => c.id === service.churchId) || MOCK_CHURCHES[0];
                          onSelectChurch(target);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#1A2C1C] text-[#C8A84B] hover:bg-[#2C1D07] text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        <span>Parish Info</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ══ 5. RECURRING SERVICES WEEKLY MATRIX ═══════════════════ */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="badge-gold text-[10px] uppercase font-bold tracking-wider">
            {language === 'am' ? 'ሳምንታዊ ቋሚ አገልግሎቶች' : 'STANDARD WEEKLY LITURGIES'}
          </span>
          <h3 className="text-2xl font-black text-[#2C1D07] font-serif">
            {language === 'am' ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቋሚ ሳምንታዊ የአገልግሎት መርሐ ግብር' : 'Weekly Recurring Liturgical Timetable'}
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            The standard liturgical cycle observed across all Ethiopian Orthodox Tewahedo parishes worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              dayEn: 'Wednesdays & Fridays',
              dayAm: 'ረቡዕና ዓርብ (ጾመ ድኅነት)',
              titleEn: 'Fasting Divine Liturgy',
              titleAm: 'የጾም ቅዳሴና ጸሎት',
              time: '1:00 PM – 3:30 PM',
              descEn: 'Conducted in the 9th hour during official fasting periods.',
              icon: BookOpen,
            },
            {
              dayEn: 'Saturdays (Eve)',
              dayAm: 'ቅዳሜ ምሽት (ዋዜማ)',
              titleEn: 'Nocturnal Mahlet & Wazim',
              titleAm: 'ዋዜማና የቅዳሜ ማኅሌት',
              time: '7:30 PM – 11:30 PM',
              descEn: 'St. Yared chants with prayer sticks (Meqwamia) and sistrum (Tsenatsil).',
              icon: Clock,
            },
            {
              dayEn: 'Sundays (Morning)',
              dayAm: 'እሑድ ማለዳ',
              titleEn: 'Solemn Kidase (Divine Liturgy)',
              titleAm: 'የሰንበተ ክርስቲያን ቅዳሴ',
              time: '6:00 AM – 10:30 AM',
              descEn: 'The central Eucharistic gathering with full clergy and communion.',
              icon: Sparkles,
            },
            {
              dayEn: 'Sundays (Afternoon)',
              dayAm: 'እሑድ ከሰዓት',
              titleEn: 'Sunday School & Gospel Preaching',
              titleAm: 'የሰንበት ት/ቤትና የወጣቶች ጉባኤ',
              time: '11:00 AM – 1:30 PM',
              descEn: 'Youth choir, spiritual songs, patristic teaching, and Agapē meal.',
              icon: Clock,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#855B09] uppercase tracking-wider">{item.dayEn}</span>
                    <Icon className="w-4 h-4 text-[#855B09]" />
                  </div>
                  <div className="font-bold text-sm text-[#2C1D07] font-geez">{item.dayAm}</div>
                  <h4 className="font-bold text-sm text-[#855B09]">{item.titleEn}</h4>
                  <div className="text-xs font-mono font-bold text-[#2C1D07] bg-white px-2.5 py-1 rounded-lg border border-[#E6DFD1] inline-block">
                    {item.time}
                  </div>
                </div>
                <p className="text-[11px] text-[#6B7280] leading-relaxed pt-2 border-t border-[#E6DFD1]">
                  {item.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ 6. REMINDER MODAL ═════════════════════════════════════ */}
      {reminderService && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setReminderService(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-md w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden animate-scaleUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] p-6 text-white relative">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-[#C8A84B]" />
                <span className="text-[10px] font-bold text-[#C8A84B] uppercase tracking-wider">
                  {language === 'am' ? 'የአገልግሎት ማስታወሻ' : 'LITURGY REMINDER'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-geez leading-snug">{reminderService.titleAm}</h3>
              <p className="text-xs text-stone-300">{reminderService.titleEn}</p>
              <button
                onClick={() => setReminderService(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5 text-xs sm:text-sm text-[#4A3B22]">
              {reminderSuccess ? (
                <div className="py-8 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#2C1D07]">Reminder Successfully Set!</h4>
                  <p className="text-xs text-[#6B7280]">
                    You will receive an alert {reminderAdvance} before {reminderService.titleEn}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSetReminder} className="space-y-4">
                  {/* Service Details Snippet */}
                  <div className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E6DFD1] space-y-1.5 text-xs">
                    <div className="font-bold text-[#2C1D07]">{reminderService.churchNameEnglish}</div>
                    <div className="text-stone-600">
                      📅 {reminderService.gregorianDate} ({reminderService.ethiopianDate})
                    </div>
                    <div className="text-stone-600 font-mono">⏰ {reminderService.time}</div>
                  </div>

                  {/* Notification Channel */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2C1D07]">Notification Method:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'email', label: 'Email' },
                        { id: 'sms', label: 'SMS Text' },
                        { id: 'push', label: 'Browser Push' },
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setReminderChannel(ch.id as any)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            reminderChannel === ch.id
                              ? 'bg-[#1A2C1C] text-[#C8A84B] border-[#C8A84B]'
                              : 'bg-[#FAF8F3] text-[#4A3B22] border-[#E6DFD1]'
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Input */}
                  {reminderChannel !== 'push' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#2C1D07]">
                        {reminderChannel === 'email' ? 'Email Address:' : 'Phone Number (SMS):'}
                      </label>
                      <input
                        type={reminderChannel === 'email' ? 'email' : 'tel'}
                        required
                        placeholder={reminderChannel === 'email' ? 'you@example.com' : '+1 (555) 000-0000'}
                        value={reminderContact}
                        onChange={(e) => setReminderContact(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD1] text-xs focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3]"
                      />
                    </div>
                  )}

                  {/* Advance Timing */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2C1D07]">Remind Me in Advance:</label>
                    <select
                      value={reminderAdvance}
                      onChange={(e) => setReminderAdvance(e.target.value as any)}
                      className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
                    >
                      <option value="15min">15 minutes before</option>
                      <option value="1hour">1 hour before</option>
                      <option value="1day">1 day before</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="w-full btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span>Confirm & Schedule Reminder</span>
                  </button>

                  {/* Calendar Sync row */}
                  <div className="pt-2 border-t border-[#E6DFD1] flex items-center justify-between text-[11px] text-[#855B09]">
                    <span className="font-semibold">Add to Calendar:</span>
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                          reminderService.titleEn
                        )}&dates=20260823T060000Z/20260823T103000Z&details=${encodeURIComponent(
                          reminderService.churchNameEnglish
                        )}&location=${encodeURIComponent(reminderService.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline font-bold"
                      >
                        Google Calendar
                      </a>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => {
                          const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${reminderService.titleEn}\nLOCATION:${reminderService.address}\nDESCRIPTION:${reminderService.churchNameEnglish}\nEND:VEVENT\nEND:VCALENDAR`;
                          const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.setAttribute('download', 'service.ics');
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="hover:underline font-bold text-[#855B09]"
                      >
                        Download .iCal
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
