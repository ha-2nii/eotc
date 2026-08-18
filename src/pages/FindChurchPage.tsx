import React, { useState, useEffect, useCallback } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
  useMap, Circle, Polyline,
} from 'react-leaflet';
import L from 'leaflet';
import { useLanguage } from '../components/layout/LanguageContext';
import { MOCK_CHURCHES } from '../data/mockChurches';
import type { Church } from '../data/mockChurches';
import { ServicesScheduleView } from '../components/find/ServicesScheduleView';
import { EventsNearYouView } from '../components/find/EventsNearYouView';
import {
  MapPin, Search, Navigation, Tv, Heart,
  Phone, Mail, Globe, ChevronRight, X,
  Loader2, Locate, Cross, Clock, Users,
  Star, ArrowRight, AlertCircle,
} from 'lucide-react';

/* ── Fix Leaflet icon paths (Vite bundler breaks defaults) ──── */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ─── Icons ─────────────────────────────────────────────────── */
const makeIcon = (html: string, size: number) =>
  new L.DivIcon({ className: '', html, iconSize: [size, size], iconAnchor: [size / 2, size], popupAnchor: [0, -(size + 4)] });

const parishIcon = makeIcon(`
  <div style="width:34px;height:34px;border-radius:50%;
    background:linear-gradient(135deg,#D4AF37,#C8A84B);
    border:2px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;">
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'
      fill='none' stroke='#1A2C1C' stroke-width='3' stroke-linecap='round'>
      <line x1='12' y1='2' x2='12' y2='22'/><line x1='2' y1='12' x2='22' y2='12'/>
    </svg>
  </div>`, 34);

const missionIcon = makeIcon(`
  <div style="width:32px;height:32px;border-radius:50%;
    background:linear-gradient(135deg,#059669,#047857);
    border:2px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;">
    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'
      fill='none' stroke='white' stroke-width='3' stroke-linecap='round'>
      <line x1='12' y1='2' x2='12' y2='22'/><line x1='2' y1='12' x2='22' y2='12'/>
    </svg>
  </div>`, 32);

const fellowshipIcon = makeIcon(`
  <div style="width:30px;height:30px;border-radius:50%;
    background:linear-gradient(135deg,#7C3AED,#6D28D9);
    border:2px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;">
    <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'
      fill='none' stroke='white' stroke-width='3' stroke-linecap='round'>
      <line x1='12' y1='2' x2='12' y2='22'/><line x1='2' y1='12' x2='22' y2='12'/>
    </svg>
  </div>`, 30);

const nearestIcon = makeIcon(`
  <div style="position:relative;width:46px;height:46px;">
    <div style="position:absolute;inset:0;border-radius:50%;
      background:rgba(200,168,75,0.35);
      animation:eotc-ping 1.4s ease-out infinite;"></div>
    <div style="position:absolute;inset:3px;border-radius:50%;
      background:linear-gradient(135deg,#800020,#4A000D);
      border:3px solid #D4AF37;
      box-shadow:0 0 16px rgba(200,168,75,0.8);
      display:flex;align-items:center;justify-content:center;">
      <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'
        fill='none' stroke='#F5C744' stroke-width='3' stroke-linecap='round'>
        <line x1='12' y1='2' x2='12' y2='22'/><line x1='2' y1='12' x2='22' y2='12'/>
      </svg>
    </div>
  </div>`, 46);

const selectedIcon = makeIcon(`
  <div style="width:40px;height:40px;border-radius:50%;
    background:linear-gradient(135deg,#800020,#4A000D);
    border:3px solid #D4AF37;box-shadow:0 4px 14px rgba(200,168,75,0.6);
    display:flex;align-items:center;justify-content:center;">
    <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 24 24'
      fill='none' stroke='#F5C744' stroke-width='3' stroke-linecap='round'>
      <line x1='12' y1='2' x2='12' y2='22'/><line x1='2' y1='12' x2='22' y2='12'/>
    </svg>
  </div>`, 40);

const userIcon = makeIcon(`
  <div style="position:relative;width:22px;height:22px;">
    <div style="position:absolute;inset:0;border-radius:50%;
      background:rgba(37,99,235,0.3);
      animation:eotc-user-ping 2s ease-out infinite;"></div>
    <div style="position:absolute;inset:3px;border-radius:50%;
      background:#2563EB;border:2px solid #fff;
      box-shadow:0 2px 8px rgba(37,99,235,0.7);"></div>
  </div>`, 22);

/* ─── MapController — pans/zooms to show user + nearest ─────── */
interface MapControllerProps {
  userPos: [number, number] | null;
  nearestPos: [number, number] | null;
  singleFly: { pos: [number, number]; zoom: number } | null;
}
const MapController: React.FC<MapControllerProps> = ({ userPos, nearestPos, singleFly }) => {
  const map = useMap();

  useEffect(() => {
    if (userPos && nearestPos) {
      const bounds = L.latLngBounds([userPos, nearestPos]);
      map.fitBounds(bounds, { padding: [70, 70], maxZoom: 13, animate: true, duration: 1.5 });
    }
  }, [userPos, nearestPos, map]);

  useEffect(() => {
    if (singleFly) {
      map.flyTo(singleFly.pos, singleFly.zoom, { duration: 1.2 });
    }
  }, [singleFly, map]);

  return null;
};

/* ─── Haversine ─────────────────────────────────────────────── */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════════ */
const POPULAR_LOCATIONS = [
  { name: 'Addis Ababa', nameAm: 'አዲስ አበባ', lat: 9.0305, lng: 38.7628, zoom: 12 },
  { name: 'Washington DC', nameAm: 'ዋሽንግተን ዲሲ', lat: 38.9238, lng: -77.0225, zoom: 12 },
  { name: 'London', nameAm: 'ለንደን', lat: 51.4760, lng: -0.1550, zoom: 12 },
  { name: 'Toronto', nameAm: 'ቶሮንቶ', lat: 43.7735, lng: -79.2580, zoom: 12 },
  { name: 'Stockholm', nameAm: 'ስቶክሆልም', lat: 59.3850, lng: 17.9250, zoom: 12 },
  { name: 'Dubai', nameAm: 'ዱባይ', lat: 25.2048, lng: 55.2708, zoom: 12 },
];

export const FindChurchView: React.FC = () => {
  const { language, activeView, setActiveView } = useLanguage();
  const [activeSection, setActiveSection] = useState<'map' | 'services' | 'events'>(() => {
    if (activeView === 'find-a-church/services') return 'services';
    if (activeView === 'find-a-church/events') return 'events';
    return 'map';
  });

  /* ── Sync activeSection when route changes from header ── */
  useEffect(() => {
    if (activeView === 'find-a-church/services') {
      setActiveSection('services');
    } else if (activeView === 'find-a-church/events') {
      setActiveSection('events');
    } else if (activeView === 'find-a-church/map' || activeView === 'find-a-church') {
      setActiveSection('map');
    }
  }, [activeView]);

  /* ── filters ── */
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedDiocese, setSelectedDiocese] = useState('ALL');
  const [selectedTabot, setSelectedTabot] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [selectedChurchType, setSelectedChurchType] = useState('ALL');

  /* ── modal ── */
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  /* ── location ── */
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  /* ── sorted churches ── */
  const [churches, setChurches] = useState(MOCK_CHURCHES);
  const [nearestChurch, setNearestChurch] = useState<Church | null>(null);

  /* ── map controller triggers ── */
  const [fitBounds, setFitBounds] = useState<{ user: [number, number]; nearest: [number, number] } | null>(null);
  const [singleFly, setSingleFly] = useState<{ pos: [number, number]; zoom: number } | null>(null);

  /* ── Check permission on mount ── */
  useEffect(() => {
    if (!navigator.geolocation) return;
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') runGPS();
      });
    }
  }, []);

  /* ── GPS core ── */
  const runGPS = useCallback(() => {
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const uPos: [number, number] = [lat, lng];
        setUserPos(uPos);
        setLocating(false);

        // Recalculate distances, sort
        const sorted = [...MOCK_CHURCHES]
          .map((c) => ({ ...c, distanceKm: Math.round(haversineKm(lat, lng, c.lat, c.lng) * 10) / 10 }))
          .sort((a, b) => a.distanceKm - b.distanceKm);
        setChurches(sorted);
        setNearestChurch(sorted[0]);

        // Trigger fitBounds to show user + nearest on same view
        setFitBounds({ user: uPos, nearest: [sorted[0].lat, sorted[0].lng] });
        setSingleFly(null);
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocError('Location access was denied. Click "Allow" in your browser to see nearby churches.');
        } else {
          setLocError('Could not get your location. Please try again.');
        }
      },
      { timeout: 12000, enableHighAccuracy: true },
    );
  }, []);

  /* ── Manual trigger ── */
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocError('Your browser does not support geolocation.');
      return;
    }
    runGPS();
  };

  /* ── Filtered + sorted list ── */
  const filteredChurches = churches.filter((c) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      c.nameAmharic.toLowerCase().includes(q) || 
      c.nameEnglish.toLowerCase().includes(q) || 
      c.city.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q) ||
      c.tabotPatron.toLowerCase().includes(q);
    const matchesCountry = selectedCountry === 'ALL' || c.country === selectedCountry;
    const matchesDiocese = selectedDiocese === 'ALL' || c.diocese.includes(selectedDiocese);
    const matchesTabot = selectedTabot === 'ALL' || c.tabotPatron.includes(selectedTabot);
    const matchesLanguage = selectedLanguage === 'ALL' || c.languages.includes(selectedLanguage);
    const matchesType = selectedChurchType === 'ALL' || c.churchType === selectedChurchType;

    return matchesSearch && matchesCountry && matchesDiocese && matchesTabot && matchesLanguage && matchesType;
  });

  /* ── Select church ── */
  const openChurch = (church: Church) => {
    setSelectedChurch(church);
    setIsDetailOpen(true);
    setFitBounds(null);
    setSingleFly({ pos: [church.lat, church.lng], zoom: 14 });
  };

  /* ── Line: you → nearest ── */
  const routeLine: [[number, number], [number, number]] | null =
    userPos && nearestChurch ? [userPos, [nearestChurch.lat, nearestChurch.lng]] : null;

  const DEFAULT_CENTER: [number, number] = [9.145, 40.489];

  return (
    <>
      {/* Keyframes */}
      <style>{`
        @keyframes eotc-ping {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes eotc-user-ping {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 animate-fadeIn space-y-8 max-w-7xl">

        {/* ══ 1. HERO ══════════════════════════════════════════════ */}
        <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                {language === 'am' ? 'የቤተ ክርስቲያን መፈለጊያ' : 'PARISH LOCATOR & DIRECTORY'}
              </span>
              <span className="bg-white/10 text-stone-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-white/20">
                {churches.length}+ Worldwide Parishes & Monasteries
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
              {language === 'am' ? 'ቤተ ክርስቲያን ያግኙ' : 'Find Your Church'}
            </h1>
            <p className="text-sm md:text-base text-stone-200 leading-relaxed max-w-3xl">
              {language === 'am'
                ? 'በአቅራቢያዎ የሚገኘውን የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ያግኙ፣ የአገልግሎት ሰዓታትን ይመልከቱ፣ እንዲሁም በመጪ ሁነቶችና በዓላት ላይ ይሳተፉ።'
                : 'Locate the nearest Ethiopian Orthodox parish, view service times, and join upcoming events.'}
            </p>
          </div>
        </section>

        {/* ══ 2. THREE CATEGORY CARDS ══════════════════════════════ */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'map' as const,
              titleEn: 'Church Map',
              titleAm: 'የአብያተ ክርስቲያናት ካርታ',
              descEn: 'Interactive GPS map & global parish directory with driving routes.',
              descAm: 'በይነተገናኝ ካርታና ዓለም አቀፍ የአብያተ ክርስቲያናት ማውጫ ከአቅጣጫ ጋር።',
              icon: MapPin,
              color: 'from-[#FAF8F3] to-[#FFF8E7]',
              border: '#C8A84B',
            },
            {
              id: 'services' as const,
              titleEn: 'Upcoming Services',
              titleAm: 'የአገልግሎት ሰዓታት',
              descEn: 'Kidase (Divine Liturgy), Mahlet, Wazim & weekly schedules.',
              descAm: 'የቅዳሴ፣ የማሕሌት፣ የዋዜማና የሳምንታዊ አገልግሎቶች ሰዓታት።',
              icon: Clock,
              color: 'from-white to-[#FAF8F3]',
              border: '#E6DFD1',
            },
            {
              id: 'events' as const,
              titleEn: 'Events Near You',
              titleAm: 'ሁነቶችና በዓላት',
              descEn: 'Feast day celebrations, annual Tabot processions & youth gatherings.',
              descAm: 'ዓመታዊ የንግሥ በዓላት፣ የታቦት ማኅሌትና የወጣቶች ጉባኤያት።',
              icon: Users,
              color: 'from-white to-[#FAF8F3]',
              border: '#E6DFD1',
            },
          ].map((card) => {
            const Icon = card.icon;
            const isActive = activeSection === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setActiveSection(card.id)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer space-y-3 bg-gradient-to-br ${card.color} ${
                  isActive
                    ? 'border-[#C8A84B] shadow-lg ring-2 ring-[#C8A84B]/30 scale-[1.02]'
                    : 'border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isActive ? 'bg-[#C8A84B] text-[#1A2C1C]' : 'bg-[#FFF8E7] text-[#855B09] border border-[#E6DFD1]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isActive && (
                    <span className="badge-gold text-[9px]">ACTIVE VIEW</span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C1D07] font-serif">
                    {language === 'am' ? card.titleAm : card.titleEn}
                  </h3>
                  <div className="text-xs font-semibold text-[#855B09] font-geez">
                    {language === 'am' ? card.titleEn : card.titleAm}
                  </div>
                </div>
                <p className="text-xs text-[#4A3B22] leading-relaxed">
                  {language === 'am' ? card.descAm : card.descEn}
                </p>
              </div>
            );
          })}
        </section>

        {/* ══ 3. QUICK SEARCH BAR & POPULAR LOCATIONS ═══════════════ */}
        <section className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-5">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#855B09] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'am' ? 'በከተማ፣ በቤተ ክርስቲያን ስም ወይም በታቦት ፈልግ...' : 'Search by city, church name, or Tabot...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E6DFD1] text-xs sm:text-sm focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3] text-[#2C1D07]"
              />
            </div>

            {/* Locate Me Button */}
            <button
              onClick={handleLocateMe}
              disabled={locating}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
                locating
                  ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] text-[#C8A84B] border border-[#C8A84B] hover:shadow-md'
              }`}
            >
              {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Locate className="w-4 h-4" />}
              <span>
                {locating
                  ? (language === 'am' ? 'አካባቢን በማስላት ላይ...' : 'Detecting GPS Location...')
                  : (language === 'am' ? 'አካባቢዬን ተጠቀም' : 'Use My Location')}
              </span>
            </button>
          </div>

          {/* Popular Locations Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E6DFD1]">
            <span className="text-[11px] font-bold text-[#855B09] uppercase tracking-wider mr-1">
              {language === 'am' ? 'ታዋቂ ከተሞች:' : 'Popular Locations:'}
            </span>
            {POPULAR_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => {
                  setSearchTerm(loc.name);
                  setActiveSection('map');
                  setSingleFly({ pos: [loc.lat, loc.lng], zoom: loc.zoom });
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  searchTerm.toLowerCase() === loc.name.toLowerCase()
                    ? 'bg-[#855B09] text-white border-[#855B09] shadow-sm'
                    : 'bg-[#FAF8F3] text-[#4A3B22] border-[#E6DFD1] hover:border-[#C8A84B] hover:bg-[#FFF8E7]'
                }`}
              >
                {loc.name} <span className="text-[10px] opacity-70 font-geez">({loc.nameAm})</span>
              </button>
            ))}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-3 py-1.5 rounded-xl text-xs text-[#DC2626] font-semibold hover:bg-red-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Alert Rows */}
          {locating && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
              <span>{language === 'am' ? 'የGPS ቦታዎን በመጠየቅ ላይ... እባክዎ በአሳሽዎ ፈቃድ ይስጡ።' : 'Requesting your GPS position — please allow location access in the browser prompt...'}</span>
            </div>
          )}

          {locError && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{locError}</span>
              </div>
              <button onClick={() => setLocError(null)} className="text-red-700 hover:text-red-900 font-bold">
                ✕
              </button>
            </div>
          )}

          {userPos && nearestChurch && !locError && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] border border-[#C8A84B]/60 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <img src={nearestChurch.photoUrl} alt="" className="w-14 h-14 rounded-xl object-cover border-2 border-[#C8A84B]/60 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-green-400 bg-green-950/60 border border-green-500/40 px-2 py-0.5 rounded-full">
                      ★ {language === 'am' ? 'ቅርቡ ቤተ ክርስቲያን' : 'NEAREST PARISH'}
                    </span>
                    <span className="text-[11px] font-bold text-[#C8A84B] font-mono">
                      {nearestChurch.distanceKm} km away
                    </span>
                  </div>
                  <div className="font-bold text-sm sm:text-base text-white font-geez">
                    {nearestChurch.nameAmharic}
                  </div>
                  <div className="text-xs text-stone-300">
                    {nearestChurch.nameEnglish} • {nearestChurch.city}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => openChurch(nearestChurch)}
                  className="flex-1 md:flex-none btn-gold px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{language === 'am' ? 'ዝርዝር መረጃ' : 'View Details'}</span>
                </button>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userPos[0]},${userPos[1]}&destination=${nearestChurch.lat},${nearestChurch.lng}&travelmode=driving`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>{language === 'am' ? 'አቅጣጫ' : 'Directions'}</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* ══ 4. FILTER CONTROLS BAR (5-Factor Filter Panel) ══ */}
        <section className="bg-white p-5 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-3">
          <div className="text-[11px] font-bold text-[#855B09] uppercase tracking-wider">
            {language === 'am' ? 'ማጣሪያዎች (Filter Churches):' : 'Filter Churches & Fellowships:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* 1. Country */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              {[
                { v: 'ALL', l: language === 'am' ? 'ሁሉም አገሮች (All Countries)' : 'All Countries' },
                { v: 'Ethiopia', l: 'Ethiopia (ኢትዮጵያ)' },
                { v: 'USA', l: 'United States (አሜሪካ)' },
                { v: 'United Kingdom', l: 'United Kingdom (ዩናይትድ ኪንግደም)' },
                { v: 'Canada', l: 'Canada (ካናዳ)' },
                { v: 'Sweden', l: 'Sweden (ስዊድን)' },
                { v: 'Germany', l: 'Germany (ጀርመን)' },
                { v: 'Switzerland', l: 'Switzerland (ስዊዘርላንድ)' },
                { v: 'UAE', l: 'UAE (ዱባይ)' },
                { v: 'Kenya', l: 'Kenya (ኬንያ)' },
                { v: 'Australia', l: 'Australia (አውስትራሊያ)' },
              ].map((o) => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>

            {/* 2. Diocese */}
            <select
              value={selectedDiocese}
              onChange={(e) => setSelectedDiocese(e.target.value)}
              className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              {[
                { v: 'ALL', l: language === 'am' ? 'ሁሉም ሀገረ ስብከት (All Dioceses)' : 'All Dioceses' },
                { v: 'Addis Ababa', l: 'Addis Ababa Diocese' },
                { v: 'Gondar', l: 'Gondar Diocese' },
                { v: 'Lalibela', l: 'Lalibela Diocese' },
                { v: 'Axum', l: 'Axum Diocese' },
                { v: 'Bahir Dar', l: 'Bahir Dar Diocese' },
                { v: 'North America', l: 'North America Diocese' },
                { v: 'UK & Europe', l: 'UK & Europe Diocese' },
                { v: 'Canada', l: 'Canada Diocese' },
                { v: 'Australia', l: 'Australia Diocese' },
              ].map((o) => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>

            {/* 3. Tabot Patron */}
            <select
              value={selectedTabot}
              onChange={(e) => setSelectedTabot(e.target.value)}
              className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              {[
                { v: 'ALL', l: language === 'am' ? 'ሁሉም ታቦታት (All Patrons)' : 'All Patron Saints' },
                { v: 'St. Mary', l: 'St. Mary (ቅድስት ማርያም)' },
                { v: 'Holy Trinity', l: 'Holy Trinity (ቅድስት ሥላሴ)' },
                { v: 'St. Michael', l: 'St. Michael (ቅዱስ ሚካኤል)' },
                { v: 'St. Gabriel', l: 'St. Gabriel (ቅዱስ ገብርኤል)' },
                { v: 'St. George', l: 'St. George (ቅዱስ ጊዮርጊስ)' },
                { v: 'Tekle Haymanot', l: 'St. Tekle Haymanot' },
              ].map((o) => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>

            {/* 4. Language of Service */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              {[
                { v: 'ALL', l: language === 'am' ? 'ሁሉም ቋንቋዎች (All Languages)' : 'All Service Languages' },
                { v: "Ge'ez", l: "Ge'ez (ግዕዝ)" },
                { v: 'Amharic', l: 'Amharic (አማርኛ)' },
                { v: 'English', l: 'English (እንግሊዝኛ)' },
                { v: 'Tigrinya', l: 'Tigrinya (ትግርኛ)' },
                { v: 'French', l: 'French (ፈረንሳይኛ)' },
                { v: 'German', l: 'German (ጀርመንኛ)' },
                { v: 'Swedish', l: 'Swedish (ስዊድንኛ)' },
              ].map((o) => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>

            {/* 5. Church Type */}
            <select
              value={selectedChurchType}
              onChange={(e) => setSelectedChurchType(e.target.value)}
              className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              {[
                { v: 'ALL', l: language === 'am' ? 'ሁሉም ዓይነቶች (All Types)' : 'All Church Types' },
                { v: 'Parish', l: 'Full Parish (ደብር / ገዳም)' },
                { v: 'Mission', l: 'Mission Church (የተልእኮ ማዕከል)' },
                { v: 'Home Fellowship', l: 'Home Fellowship (የጸሎት ኅብረት)' },
              ].map((o) => (
                <option key={o.v} value={o.v}>{o.l}</option>
              ))}
            </select>
          </div>
        </section>

        {/* ══ 5. TAB VIEWS CONTENT ════════════════════════════════ */}

        {/* ── A. CHURCH MAP VIEW ── */}
        {activeSection === 'map' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Church Types Legend Bar */}
            <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#E6DFD1] flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center gap-2 font-bold text-[#855B09]">
                <MapPin className="w-4 h-4 text-[#855B09]" />
                <span>{language === 'am' ? 'የካርታ ምልክቶች መመሪያ (Map Legend):' : 'Church Types & Map Legend:'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#4A3B22]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C8A84B] border border-white shadow-sm inline-block" />
                  <span>{language === 'am' ? 'ደብር / ገዳም (Full Parish)' : 'Full Parish'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#059669] to-[#047857] border border-white shadow-sm inline-block" />
                  <span>{language === 'am' ? 'የተልእኮ ማዕከል (Mission Church)' : 'Mission Church'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] border border-white shadow-sm inline-block" />
                  <span>{language === 'am' ? 'የጸሎት ኅብረት (Home Fellowship)' : 'Home Fellowship'}</span>
                </div>
                {userPos && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#2563EB] border border-white inline-block" />
                    <span>{language === 'am' ? 'የእርስዎ ቦታ (You)' : 'Your Location'}</span>
                  </div>
                )}
                {nearestChurch && userPos && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#800020] border border-[#D4AF37] inline-block" />
                    <span>{language === 'am' ? 'ቅርቡ ቤተ ክርስቲያን (Nearest)' : 'Nearest Parish'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Map & List Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
              {/* Leaflet Map Card */}
              <div className="bg-white rounded-3xl border border-[#E6DFD1] overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8F3] border-b border-[#E6DFD1] text-xs font-bold text-[#855B09]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{filteredChurches.length} Registered Locations on Map</span>
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Interactive GPS & Pan Zoom Enabled
                  </div>
                </div>

                {/* Leaflet Map Container */}
                <div style={{ height: '560px' }}>
                  <MapContainer
                    center={DEFAULT_CENTER}
                    zoom={5}
                    style={{ height: '560px', width: '100%' }}
                    scrollWheelZoom
                    zoomControl
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapController
                      userPos={fitBounds ? fitBounds.user : null}
                      nearestPos={fitBounds ? fitBounds.nearest : null}
                      singleFly={singleFly}
                    />

                    {/* Dashed line: you → nearest */}
                    {routeLine && (
                      <Polyline
                        positions={routeLine}
                        pathOptions={{ color: '#C8A84B', weight: 2.5, dashArray: '9 7', opacity: 0.8 }}
                      />
                    )}

                    {/* User Location Marker */}
                    {userPos && (
                      <>
                        <Circle
                          center={userPos}
                          radius={1200}
                          pathOptions={{ color: '#2563EB', fillColor: '#2563EB', fillOpacity: 0.08, weight: 1, dashArray: '4 4' }}
                        />
                        <Marker position={userPos} icon={userIcon}>
                          <Popup>
                            <div style={{ fontFamily: 'sans-serif', padding: '4px 2px' }}>
                              <div style={{ fontWeight: 800, fontSize: '13px', marginBottom: '3px' }}>
                                📍 {language === 'am' ? 'የእርስዎ ቦታ' : 'Your Location'}
                              </div>
                              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px' }}>
                                {userPos[0].toFixed(5)}, {userPos[1].toFixed(5)}
                              </div>
                              {nearestChurch && (
                                <div style={{
                                  fontSize: '12px', fontWeight: 700, color: '#855B09',
                                  background: '#FFF8E7', padding: '6px 10px', borderRadius: '6px',
                                }}>
                                  Nearest: {nearestChurch.nameEnglish}<br />
                                  <span style={{ fontWeight: 400, color: '#6B7280' }}>{nearestChurch.distanceKm} km away</span>
                                </div>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      </>
                    )}

                    {/* Church Markers with Distinct Types */}
                    {filteredChurches.map((church) => {
                      const isNearest = nearestChurch?.id === church.id && !!userPos;
                      const isSelected = selectedChurch?.id === church.id;
                      const icon = isNearest 
                        ? nearestIcon 
                        : isSelected 
                        ? selectedIcon 
                        : church.churchType === 'Mission' 
                        ? missionIcon 
                        : church.churchType === 'Home Fellowship' 
                        ? fellowshipIcon 
                        : parishIcon;

                      return (
                        <Marker
                          key={church.id}
                          position={[church.lat, church.lng]}
                          icon={icon}
                          eventHandlers={{ click: () => openChurch(church) }}
                        >
                          <Popup>
                            <div style={{ fontFamily: 'sans-serif', minWidth: '190px' }}>
                              <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: church.churchType === 'Mission' ? '#059669' : church.churchType === 'Home Fellowship' ? '#7C3AED' : '#855B09', marginBottom: '2px' }}>
                                {church.churchType} • {church.city}
                              </div>
                              <div style={{ fontWeight: 800, fontSize: '14px', color: '#2C1D07', marginBottom: '2px' }}>
                                {church.nameAmharic}
                              </div>
                              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px' }}>
                                {church.nameEnglish}
                              </div>
                              <div style={{ fontSize: '11px', color: '#855B09', fontWeight: 600, marginBottom: '4px' }}>
                                ✦ {church.tabotPatron}
                              </div>
                              {userPos && (
                                <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', marginBottom: '6px' }}>
                                  🚗 {church.distanceKm} km from you
                                </div>
                              )}
                              <button
                                onClick={() => openChurch(church)}
                                style={{
                                  width: '100%', padding: '8px',
                                  background: 'linear-gradient(135deg,#D4AF37,#C8A84B)',
                                  color: '#1A2C1C', fontWeight: 700, fontSize: '12px',
                                  border: 'none', borderRadius: '6px', cursor: 'pointer',
                                }}
                              >
                                {language === 'am' ? 'ዝርዝር ይመልከቱ →' : 'Full Details →'}
                              </button>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>
              </div>

              {/* Church List Results Side Panel */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#6B7280] px-1 flex justify-between">
                  <span>{filteredChurches.length} Results</span>
                  <span>{userPos ? `Sorted by distance` : 'Filtered list'}</span>
                </div>

                <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
                  {filteredChurches.map((church) => {
                    const isNearest = nearestChurch?.id === church.id && !!userPos;
                    const isSelected = selectedChurch?.id === church.id;
                    const typeColor = 
                      church.churchType === 'Mission'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : church.churchType === 'Home Fellowship'
                        ? 'bg-purple-50 text-purple-800 border-purple-200'
                        : 'bg-[#FFF8E7] text-[#855B09] border-[#E6DFD1]';

                    return (
                      <div
                        key={church.id}
                        onClick={() => openChurch(church)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                          isNearest
                            ? 'bg-gradient-to-br from-[#FFF8E7] to-white border-2 border-[#C8A84B] shadow-md ring-1 ring-[#C8A84B]/40'
                            : isSelected
                            ? 'bg-white border-2 border-[#C8A84B] shadow-sm'
                            : 'bg-white border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${typeColor}`}>
                              {church.churchType}
                            </span>
                            <span className="badge-gold text-[9px]">{church.country}</span>
                            {isNearest && (
                              <span className="text-[9px] font-black text-green-700 bg-green-100 border border-green-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="w-2.5 h-2.5" /> NEAREST
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono font-bold text-[#855B09]">
                            {church.distanceKm} km
                          </span>
                        </div>

                        <div>
                          <div className="font-bold text-sm text-[#2C1D07] font-geez">
                            {church.nameAmharic}
                          </div>
                          <div className="text-xs text-[#6B7280]">
                            {church.nameEnglish} • {church.city}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#855B09] font-medium">
                          <Cross className="w-3 h-3 text-[#855B09] shrink-0" />
                          <span>{church.tabotPatron}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                          <MapPin className="w-3 h-3 text-[#6B7280] shrink-0" />
                          <span className="truncate">{church.address}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                          <Clock className="w-3 h-3 text-[#6B7280] shrink-0" />
                          <span>{church.serviceTime}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                          <Phone className="w-3 h-3 text-[#6B7280] shrink-0" />
                          <span>{church.phone}</span>
                        </div>

                        {church.hasLiveStream && (
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Live Stream Available
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── B. UPCOMING SERVICES VIEW ── */}
        {activeSection === 'services' && (
          <div className="animate-fadeIn">
            <ServicesScheduleView onSelectChurch={openChurch} />
          </div>
        )}

        {/* ── C. EVENTS NEAR YOU VIEW ── */}
        {activeSection === 'events' && (
          <div className="animate-fadeIn">
            <EventsNearYouView
              userPos={userPos}
              onOpenChurchDetail={openChurch}
            />
          </div>
        )}

        {/* ══ 6. CHURCH DETAIL PANEL / MODAL ════════════════════════ */}
        {selectedChurch && isDetailOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setIsDetailOpen(false); }}
          >
            <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] p-6 text-white relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-gold text-[9px] uppercase font-bold">{selectedChurch.churchType}</span>
                  <span className="text-[10px] text-stone-300 font-semibold">{selectedChurch.diocese}</span>
                </div>
                <h3 className="text-2xl font-black text-white font-geez leading-tight">{selectedChurch.nameAmharic}</h3>
                <p className="text-xs font-medium text-[#C8A84B]">{selectedChurch.nameEnglish}</p>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#4A3B22]">
                {/* Photo & Quick Info Bar */}
                <div className="relative rounded-2xl overflow-hidden border border-[#E6DFD1]">
                  <img src={selectedChurch.photoUrl} alt={selectedChurch.nameEnglish} className="w-full h-44 object-cover" />
                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5">
                    <Cross className="w-3.5 h-3.5 text-[#C8A84B]" />
                    <span>Patron: {selectedChurch.tabotPatron}</span>
                  </div>
                </div>

                {/* GPS Distance Bar if user located */}
                {userPos && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 font-bold flex items-center gap-2">
                    <Locate className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{selectedChurch.distanceKm} km from your current GPS position</span>
                  </div>
                )}

                {/* Clergy List */}
                {selectedChurch.clergyList && selectedChurch.clergyList.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#855B09]" />
                      Parish Clergy (አገልጋይ ካህናት)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedChurch.clergyList.map((c, idx) => (
                        <div key={idx} className="bg-[#FAF8F3] p-2.5 rounded-xl border border-[#E6DFD1] text-xs">
                          <div className="font-bold text-[#2C1D07] font-geez">{c.nameAmharic || c.name}</div>
                          <div className="text-[11px] text-[#855B09] font-medium">{c.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full Service Schedule Timetable */}
                {selectedChurch.fullServiceSchedule && selectedChurch.fullServiceSchedule.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#855B09]" />
                      Full Liturgical Timetable (የአገልግሎት ሰዓታት)
                    </h4>
                    <div className="bg-[#FAF8F3] rounded-2xl border border-[#E6DFD1] divide-y divide-[#E6DFD1]">
                      {selectedChurch.fullServiceSchedule.map((s, idx) => (
                        <div key={idx} className="p-3 flex items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="font-bold text-[#2C1D07]">{s.title} <span className="font-geez text-[#855B09]">({s.dayAmharic || s.day})</span></div>
                            <div className="text-[11px] text-[#6B7280]">Language: {s.language}</div>
                          </div>
                          <div className="font-mono font-bold text-[#855B09] bg-white px-2.5 py-1 rounded-lg border border-[#E6DFD1] shrink-0">
                            {s.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="space-y-2">
                  <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#855B09]" />
                    Chancellery & Parish Contact
                  </h4>
                  <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                      <span>{selectedChurch.address}, {selectedChurch.city}, {selectedChurch.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                      <span>{selectedChurch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                      <a href={`mailto:${selectedChurch.email}`} className="text-[#855B09] hover:underline font-semibold">{selectedChurch.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                      <a href={selectedChurch.website} target="_blank" rel="noreferrer" className="text-[#855B09] hover:underline font-semibold">{selectedChurch.website}</a>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedChurch.streamingUrl ? (
                    <a
                      href={selectedChurch.streamingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <Tv className="w-4 h-4" />
                      <span>Watch Live Stream</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        setIsDetailOpen(false);
                        setActiveView('worship');
                      }}
                      className="py-2.5 px-4 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <Tv className="w-4 h-4" />
                      <span>Worship & Livestreams</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsDetailOpen(false);
                      setActiveView('give');
                    }}
                    className="btn-gold py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Donate to this Church</span>
                  </button>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1${userPos ? `&origin=${userPos[0]},${userPos[1]}` : ''}&destination=${selectedChurch.lat},${selectedChurch.lng}&travelmode=driving`}
                    target="_blank"
                    rel="noreferrer"
                    className="sm:col-span-2 py-2.5 px-4 rounded-xl bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] font-bold text-xs flex items-center justify-center gap-2 text-[#2C1D07] shadow-sm transition-all"
                  >
                    <Navigation className="w-4 h-4 text-[#855B09]" />
                    <span>{userPos ? 'Get Turn-by-Turn Directions' : 'Open in Google Maps'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
