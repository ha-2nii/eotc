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
import { ChurchDetailView } from '../components/find/ChurchDetailView';
import {
  MapPin, Search, ChevronRight, X,
  Loader2, Locate, Clock,
  AlertCircle,
  Compass, Calendar, CheckSquare, Square
} from 'lucide-react';

/* ── Fix Leaflet icon paths (Vite bundler breaks defaults) ───── */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* ── Custom EOTC Map Pins matching the Reference Design ─────── */
const makePinIcon = (bgColor: string, crossColor: string, size = 32) =>
  new L.DivIcon({
    className: '',
    html: `
      <div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        background:${bgColor};border:2px solid #ffffff;box-shadow:0 3px 10px rgba(0,0,0,0.35);
        display:flex;align-items:center;justify-content:center;position:relative;">
        <span style="transform:rotate(45deg);color:${crossColor};font-size:${size * 0.45}px;font-weight:bold;line-height:1;margin-bottom:2px;font-family:serif;">
          †
        </span>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -(size + 4)],
  });

const greenChurchPin = makePinIcon('#0B3B2B', '#FFFFFF', 32);

const userIcon = new L.DivIcon({
  className: '',
  html: `
    <div style="position:relative;width:22px;height:22px;">
      <div style="position:absolute;inset:0;border-radius:50%;background:rgba(37,99,235,0.3);animation:eotc-user-ping 2s ease-out infinite;"></div>
      <div style="position:absolute;inset:3px;border-radius:50%;background:#2563EB;border:2px solid #fff;box-shadow:0 2px 8px rgba(37,99,235,0.7);"></div>
    </div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

/* ── MapController — pans/zooms to show user + nearest or flyTo ──── */
interface MapControllerProps {
  userPos: [number, number] | null;
  nearestPos: [number, number] | null;
  singleFly: { pos: [number, number]; zoom: number } | null;
  zoomLevel: number;
}
const MapController: React.FC<MapControllerProps> = ({ userPos, nearestPos, singleFly, zoomLevel }) => {
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

  useEffect(() => {
    if (zoomLevel) {
      map.setZoom(zoomLevel);
    }
  }, [zoomLevel, map]);

  return null;
};

/* ── Haversine Distance Calculator ──────────────────────────── */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const POPULAR_LOCATIONS = [
  { name: 'Addis Ababa', nameAm: 'አዲስ አበባ', lat: 9.0305, lng: 38.7628, zoom: 12 },
  { name: 'Washington DC', nameAm: 'ዋሽንግተን ዲሲ', lat: 38.9238, lng: -77.0225, zoom: 12 },
  { name: 'London', nameAm: 'ለንደን', lat: 51.4760, lng: -0.1550, zoom: 12 },
  { name: 'Toronto', nameAm: 'ቶሮንቶ', lat: 43.7735, lng: -79.2580, zoom: 12 },
  { name: 'Stockholm', nameAm: 'ስቶክሆልም', lat: 59.3850, lng: 17.9250, zoom: 12 },
  { name: 'Dubai', nameAm: 'ዱባይ', lat: 25.2048, lng: 55.2708, zoom: 12 },
];

export const FindChurchView: React.FC = () => {
  const { activeView, setActiveView } = useLanguage();
  const [activeSection, setActiveSection] = useState<'map' | 'services' | 'events'>(() => {
    if (activeView === 'find-a-church/services') return 'services';
    if (activeView === 'find-a-church/events') return 'events';
    return 'map';
  });

  /* helper: navigate to a sub-section and sync global activeView */
  const navigateTo = (section: 'map' | 'services' | 'events') => {
    setActiveSection(section);
    if (section === 'map') setActiveView('find-a-church');
    else if (section === 'services') setActiveView('find-a-church/services');
    else if (section === 'events') setActiveView('find-a-church/events');
  };

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

  /* ── Filter & Search States ── */
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'nearest' | 'name' | 'active'>('nearest');
  const [showAllChurchesFilter, setShowAllChurchesFilter] = useState(true);

  /* ── Modal & Detail Drawer ── */
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [showAllChurchesModal, setShowAllChurchesModal] = useState(false);

  /* ── Geolocation States ── */
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  /* ── Sorted Churches ── */
  const [churches, setChurches] = useState(MOCK_CHURCHES);
  const [nearestChurch, setNearestChurch] = useState<Church | null>(null);

  /* ── Map Triggers ── */
  const [fitBounds, setFitBounds] = useState<{ user: [number, number]; nearest: [number, number] } | null>(null);
  const [singleFly, setSingleFly] = useState<{ pos: [number, number]; zoom: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(12);

  /* ── Auto Check Permission on Mount ── */
  useEffect(() => {
    if (!navigator.geolocation) return;
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') runGPS();
      });
    }
  }, []);

  /* ── Run GPS Core ── */
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

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocError('Your browser does not support geolocation.');
      return;
    }
    runGPS();
  };

  /* ── Filtered and Sorted Church List ── */
  const filteredChurches = churches.filter((c) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      c.nameAmharic.toLowerCase().includes(q) || 
      c.nameEnglish.toLowerCase().includes(q) || 
      c.city.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q) ||
      c.tabotPatron.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    if (sortBy === 'name') return a.nameEnglish.localeCompare(b.nameEnglish);
    return a.distanceKm - b.distanceKm;
  });

  const openChurch = (church: Church) => {
    setSelectedChurch(church);
    setFitBounds(null);
    setSingleFly({ pos: [church.lat, church.lng], zoom: 14 });
  };

  const routeLine: [[number, number], [number, number]] | null =
    userPos && nearestChurch ? [userPos, [nearestChurch.lat, nearestChurch.lng]] : null;

  const DEFAULT_CENTER: [number, number] = [9.0305, 38.7628]; // Addis Ababa coordinates

  /* ── If a church is selected, show the 1:1 ChurchDetailView full page ── */
  if (selectedChurch) {
    return (
      <ChurchDetailView
        church={selectedChurch}
        onBack={() => setSelectedChurch(null)}
      />
    );
  }

  return (
    <div className="bg-[#FAF7F2] text-[#2C1D07] min-h-screen font-serif antialiased pb-20">
      
      {/* Keyframes */}
      <style>{`
        @keyframes eotc-user-ping {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          UPCOMING SERVICES — FULL STANDALONE PAGE
          ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'services' && (
        <>
          {/* Services Page Hero */}
          <section className="relative text-white pt-[120px] pb-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#0B3B2B]" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(200,168,75,0.5) 1px, transparent 0)', backgroundSize: '22px 22px' }} />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
            <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 pb-10">
              <button
                onClick={() => navigateTo('map')}
                className="flex items-center gap-1.5 text-[#C8A84B] text-xs font-sans font-bold mb-6 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                <span>Back to Church Finder</span>
              </button>
              <div className="flex items-center gap-2 text-[#C8A84B] font-mono text-xs uppercase tracking-[0.22em] font-bold mb-3">
                <span className="w-6 h-[1.5px] bg-[#C8A84B]" />
                <span>LITURGICAL SCHEDULE · GLOBAL PARISHES</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.08]">
                Upcoming Services
              </h1>
              <p className="text-sm text-[#D1D5DB] font-sans mt-3 max-w-xl">
                Discover scheduled Divine Liturgies, all-night Mahlet vigils, and parish gatherings happening at EOTC churches worldwide.
              </p>
            </div>
          </section>
          <main className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-8">
            <ServicesScheduleView onSelectChurch={openChurch} />
          </main>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          EVENTS NEAR YOU — FULL STANDALONE PAGE
          ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'events' && (
        <>
          <section className="relative text-white pt-[120px] pb-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#1C1814]" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(200,168,75,0.5) 1px, transparent 0)', backgroundSize: '22px 22px' }} />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
            <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 pb-10">
              <button
                onClick={() => navigateTo('map')}
                className="flex items-center gap-1.5 text-[#C8A84B] text-xs font-sans font-bold mb-6 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                <span>Back to Church Finder</span>
              </button>
              <div className="flex items-center gap-2 text-[#C8A84B] font-mono text-xs uppercase tracking-[0.22em] font-bold mb-3">
                <span className="w-6 h-[1.5px] bg-[#C8A84B]" />
                <span>PARISH EVENTS & GATHERINGS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.08]">
                Events Near You
              </h1>
              <p className="text-sm text-[#D1D5DB] font-sans mt-3 max-w-xl">
                Browse feast days, Tabot processions, youth programs, community meals, and spiritual retreats happening at parishes near you.
              </p>
            </div>
          </section>
          <main className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-8">
            <EventsNearYouView userPos={userPos} onOpenChurchDetail={openChurch} />
          </main>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CHURCH HUB MAP — shown only when activeSection === 'map'
          ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'map' && (
        <>
          {/* Full-Bleed Aerial City Hero Section */}
          <section className="relative text-white pt-[120px] pb-0 overflow-hidden">
            {/* Full-Bleed Aerial City Background Photo */}
            <div className="absolute inset-0">
              <img
                src="/assets/images/find_hero_city_aerial.jpg"
                alt="Aerial city view with church locations"
                className="w-full h-full object-cover object-center"
              />
              {/* Heavy dark gradient on left for text legibility, fades to semi-transparent on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071C12]/95 via-[#071C12]/80 to-[#071C12]/25" />
              {/* Bottom dark fade into content */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07241B] to-transparent" />
            </div>

            <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-14">
                
                {/* Left Column: Title, Cross, Search Bar, Location & Popular Cities */}
                <div className="lg:col-span-6 space-y-5">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 text-[#C8A84B] font-mono text-xs uppercase tracking-[0.22em] font-bold">
                    <span className="w-6 h-[1.5px] bg-[#C8A84B]" />
                    <span>PARISH LOCATOR & DIRECTORY · {churches.length}+ WORLDWIDE</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-[1.08]">
                    Find Your Church
                  </h1>

                  {/* Delicate Cross Divider */}
                  <div className="flex items-center gap-3 pt-0.5 text-[#C8A84B]">
                    <span className="w-10 h-[1px] bg-[#C8A84B]/40" />
                    <span className="text-sm font-serif font-bold">†</span>
                    <span className="w-10 h-[1px] bg-[#C8A84B]/40" />
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-[#D1D5DB] font-sans leading-relaxed max-w-lg">
                    Locate the nearest Ethiopian Orthodox parish anywhere in the world, view service times, and join upcoming events.
                  </p>

                  {/* Search & Location Action Row */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-xl">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by city, church name, or Tabot..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-stone-400 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#C8A84B] focus:bg-black/50 transition-all"
                      />
                      {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Golden Use My Location Button */}
                    <button
                      onClick={handleLocateMe}
                      disabled={locating}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#DEBC68] hover:bg-[#CFAC55] text-[#181105] transition-all shadow-md shrink-0 cursor-pointer font-sans"
                    >
                      {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Compass className="w-4 h-4 text-[#181105]" />}
                      <span>{locating ? 'Locating...' : 'Use My Location'}</span>
                    </button>
                  </div>

                  {/* Popular Cities Quick Link Row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-sans text-[#A3B3AC] pt-1">
                    <span className="font-bold text-[#E5C158] uppercase tracking-wider text-[11px]">POPULAR:</span>
                    {POPULAR_LOCATIONS.map((loc, idx) => (
                      <React.Fragment key={loc.name}>
                        <button
                          onClick={() => {
                            setSearchTerm(loc.name);
                            navigateTo('map');
                            setSingleFly({ pos: [loc.lat, loc.lng], zoom: loc.zoom });
                          }}
                          className="hover:text-[#E5C158] transition-colors cursor-pointer"
                        >
                          {loc.name}
                        </button>
                        {idx < POPULAR_LOCATIONS.length - 1 && (
                          <span className="text-[#3A5C4F] select-none">|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                </div>

                {/* Right Column: Empty — aerial city photo shows through naturally */}
                <div className="lg:col-span-6 hidden lg:block" />

              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  INTEGRATED TABS BAR AT HERO BASE (Church Map | Services | Events)
                  ═══════════════════════════════════════════════════════════════ */}
              <div className="flex items-center overflow-x-auto border-t border-white/10 text-xs font-sans whitespace-nowrap">
                <button
                  onClick={() => navigateTo('map')}
                  className="flex items-center gap-2 py-4 px-6 font-bold transition-all relative cursor-pointer text-[#E5C158]"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Church Map</span>
                  <span className="absolute bottom-0 left-6 right-6 h-[2.5px] bg-[#E5C158]" />
                </button>

                <span className="h-4 w-[1px] bg-white/15" />

                <button
                  onClick={() => navigateTo('services')}
                  className="flex items-center gap-2 py-4 px-6 font-bold transition-all relative cursor-pointer text-stone-300 hover:text-white"
                >
                  <Clock className="w-4 h-4" />
                  <span>Services</span>
                </button>

                <span className="h-4 w-[1px] bg-white/15" />

                <button
                  onClick={() => navigateTo('events')}
                  className="flex items-center gap-2 py-4 px-6 font-bold transition-all relative cursor-pointer text-stone-300 hover:text-white"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Events</span>
                </button>
              </div>

            </div>
          </section>


      {/* ═══════════════════════════════════════════════════════════════
          2. MAIN CONTENT AREA (Split Layout: List & Map)
          ═══════════════════════════════════════════════════════════════ */}
      <main className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-8">
        
        {/* Status Error Alerts */}
        {locError && (
          <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-sans">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{locError}</span>
            </div>
            <button onClick={() => setLocError(null)} className="text-red-700 hover:text-red-900 font-bold ml-3 cursor-pointer">✕</button>
          </div>
        )}

        {/* ─── SECTION A: CHURCH MAP SPLIT VIEW ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* ─────────────────────────────────────────────────────────
                LEFT COLUMN: Church List
                ───────────────────────────────────────────────────────── */}
            <div className="lg:col-span-5 space-y-4">
              {/* Header row: Title + Sort Dropdown */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD1]">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1C1814]">
                  Nearby Churches <span className="text-sm font-sans font-normal text-[#855B09]">({filteredChurches.length})</span>
                </h2>

                <div className="flex items-center gap-1.5 text-xs font-sans text-[#7A6B56]">
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent font-semibold text-[#1C1814] focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="nearest">Nearest</option>
                    <option value="name">Name (A–Z)</option>
                  </select>
                </div>
              </div>

              {/* Churches Rows List */}
              <div className="divide-y divide-[#EFE7DA] text-xs font-sans">
                {filteredChurches.slice(0, 7).map((church) => {
                  return (
                    <div
                      key={church.id}
                      onClick={() => openChurch(church)}
                      className="py-3.5 flex items-center justify-between group cursor-pointer transition-colors hover:bg-white/50 -mx-2 px-2 rounded-lg"
                    >
                      {/* Left icon & church name/city */}
                      <div className="flex items-start gap-3 min-w-0 pr-3">
                        <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C8A84B]/60 flex items-center justify-center text-[#855B09] font-geez text-xs font-bold shadow-2xs shrink-0 group-hover:bg-[#0B3B2B] group-hover:text-[#E5C158] transition-colors mt-0.5">
                          †
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-sm text-[#1C1814] group-hover:text-[#855B09] transition-colors truncate font-serif">
                            {church.nameEnglish}
                          </h3>
                          <div className="text-xs font-geez text-[#855B09] font-medium truncate">
                            {church.nameAmharic}
                          </div>
                          <div className="text-[11px] text-[#7A6B56] flex items-center gap-1 mt-0.5 truncate font-mono">
                            <MapPin className="w-3 h-3 text-[#855B09] shrink-0" />
                            <span>{church.address}, {church.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right metadata badge: Tabot / Distance */}
                      <div className="text-right shrink-0 flex flex-col items-end gap-1">
                        <span className="text-[10px] font-mono font-semibold text-[#855B09] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E2D8C7]">
                          {church.tabotPatron.split('(')[0].trim()}
                        </span>
                        {userPos && (
                          <span className="text-[10px] text-[#7A6B56] font-mono">
                            {church.distanceKm} km
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-[#855B09] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Churches Link */}
              <div className="pt-2">
                <button
                  onClick={() => setShowAllChurchesModal(true)}
                  className="text-xs text-[#855B09] hover:text-[#5B3E06] font-medium font-sans flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  <span>View All Churches</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────
                RIGHT COLUMN: Interactive Map View with Custom Markers
                ───────────────────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[540px] sm:h-[580px] rounded-2xl overflow-hidden border border-[#E2D8C7] shadow-xs">
                
                <MapContainer 
                  center={DEFAULT_CENTER} 
                  zoom={mapZoom} 
                  style={{ height: '100%', width: '100%' }} 
                  scrollWheelZoom 
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapController
                    userPos={fitBounds ? fitBounds.user : null}
                    nearestPos={fitBounds ? fitBounds.nearest : null}
                    singleFly={singleFly}
                    zoomLevel={mapZoom}
                  />

                  {/* Route Line if User Location Enabled */}
                  {routeLine && (
                    <Polyline 
                      positions={routeLine} 
                      pathOptions={{ color: '#C8A84B', weight: 2.5, dashArray: '8 6', opacity: 0.8 }} 
                    />
                  )}

                  {/* User Location Marker */}
                  {userPos && (
                    <>
                      <Circle center={userPos} radius={1500} pathOptions={{ color: '#2563EB', fillColor: '#2563EB', fillOpacity: 0.08, weight: 1, dashArray: '4 4' }} />
                      <Marker position={userPos} icon={userIcon}>
                        <Popup>
                          <div className="font-sans text-xs">
                            <strong>Your Location</strong>
                          </div>
                        </Popup>
                      </Marker>
                    </>
                  )}

                  {/* Church Markers */}
                  {showAllChurchesFilter && filteredChurches.map((church) => {
                    return (
                      <Marker
                        key={church.id}
                        position={[church.lat, church.lng]}
                        icon={greenChurchPin}
                        eventHandlers={{
                          click: () => {
                            setSelectedChurch(church);
                          }
                        }}
                      >
                        <Popup>
                          <div className="font-sans p-1 min-w-[200px] space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#855B09]">
                              {church.churchType}
                            </span>
                            <h4 className="font-bold text-sm text-[#0B3B2B] leading-tight">
                              {church.nameEnglish}
                            </h4>
                            <div className="text-xs font-geez text-[#855B09]">
                              {church.nameAmharic}
                            </div>
                            <div className="text-[11px] text-[#6B7280]">
                              {church.address}, {church.city}
                            </div>
                            <div className="pt-2">
                              <button
                                onClick={() => openChurch(church)}
                                className="w-full py-1.5 bg-[#0B3B2B] text-white rounded-lg text-xs font-bold"
                              >
                                View Full Details →
                              </button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>

                {/* Map Floating Controls Top-Right (Zoom + / - and Locate) */}
                <div className="absolute top-4 right-4 z-[400] flex flex-col gap-1.5">
                  <div className="bg-white rounded-xl shadow-md border border-[#E2D8C7] overflow-hidden flex flex-col">
                    <button
                      onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                      className="w-8 h-8 flex items-center justify-center text-[#2C1D07] hover:bg-[#FAF7F2] font-bold text-sm border-b border-[#E2D8C7] cursor-pointer"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setMapZoom(prev => Math.max(prev - 1, 3))}
                      className="w-8 h-8 flex items-center justify-center text-[#2C1D07] hover:bg-[#FAF7F2] font-bold text-sm cursor-pointer"
                      title="Zoom Out"
                    >
                      –
                    </button>
                  </div>

                  <button
                    onClick={handleLocateMe}
                    className="w-8 h-8 rounded-xl bg-white shadow-md border border-[#E2D8C7] flex items-center justify-center text-[#0B3B2B] hover:bg-[#FAF7F2] cursor-pointer"
                    title="Center on my location"
                  >
                    <Locate className="w-4 h-4" />
                  </button>
                </div>

                {/* Map Floating Legend Bottom-Right (1:1 with Design) */}
                <div className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur-xs border border-[#E2D8C7] rounded-xl p-3 shadow-md text-xs font-sans space-y-2">
                  <button
                    onClick={() => setShowAllChurchesFilter(!showAllChurchesFilter)}
                    className="flex items-center gap-2 text-[#2C1D07] font-semibold hover:text-[#0B3B2B] cursor-pointer"
                  >
                    {showAllChurchesFilter ? (
                      <CheckSquare className="w-4 h-4 text-[#0B3B2B]" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400" />
                    )}
                    <span>Show All Churches</span>
                  </button>

                  <div className="flex items-center gap-2 text-[#2C1D07]">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0B3B2B] flex items-center justify-center text-white text-[9px] font-bold">
                      †
                    </span>
                    <span>EOTC Churches</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#2C1D07]">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#C8A84B] flex items-center justify-center text-[#1A1208] text-[9px] font-bold">
                      †
                    </span>
                    <span>Selected Church</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </main>
      </>
    )}


      {/* All Churches Directory Modal remains unchanged */}
      {showAllChurchesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border-2 border-[#C8A84B] rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fadeIn">
            <div className="bg-[#0B3B2B] text-white p-6 flex items-center justify-between border-b border-[#C8A84B]/40">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5C158] font-mono font-bold">EOTC Global Directory</span>
                <h3 className="text-xl font-bold font-serif">All Registered Parishes & Monasteries</h3>
              </div>
              <button onClick={() => setShowAllChurchesModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {churches.map((church, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setShowAllChurchesModal(false);
                    openChurch(church);
                  }}
                  className="bg-white border border-[#E2D8C7] p-4 rounded-xl flex items-center justify-between shadow-2xs hover:border-[#855B09] transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0B3B2B] font-serif">{church.nameEnglish}</span>
                      <span className="text-[10px] bg-[#EAE2D2] text-[#6B5A40] font-semibold px-2 py-0.5 rounded-full">{church.churchType}</span>
                    </div>
                    <div className="text-xs font-geez text-[#855B09]">{church.nameAmharic}</div>
                    <div className="text-[11px] text-[#6B5A40] flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-[#C8A84B]" />
                      <span>{church.address}, {church.city}, {church.country}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#855B09] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E2D8C7]">
                    {church.tabotPatron}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FindChurchView;
