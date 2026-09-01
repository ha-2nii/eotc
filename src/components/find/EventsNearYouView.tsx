import React, { useState, useMemo } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { MOCK_EVENTS, EVENT_TYPES } from '../../data/mockEvents';
import { MOCK_CHURCHES } from '../../data/mockChurches';
import type { Church } from '../../data/mockChurches';
import {
  Calendar, Clock, MapPin,
  Search, ChevronRight, Bookmark, Bell,
  ArrowLeft, Compass
} from 'lucide-react';

/* ─── Haversine Distance ─────────────────────────────────────── */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ─── Category badge colour ──────────────────────────────────── */
function categoryColor(type: string): string {
  switch (type) {
    case 'Feast Day':         return '#9B4F0A';
    case 'Tabot Procession':  return '#5B2D8E';
    case 'Mahlet Vigil':      return '#0A6B4F';
    case 'Youth Program':     return '#1A5276';
    case 'Community Meal':    return '#7D6608';
    case 'Retreat':           return '#4A235A';
    case 'Sermon':            return '#1B4F72';
    case 'Fundraiser':        return '#922B21';
    case 'Synaxis':           return '#1D6A4A';
    default:                  return '#5A4B35';
  }
}

interface EventsNearYouViewProps {
  userPos: [number, number] | null;
  onOpenChurchDetail?: (church: Church) => void;
  onBackToFinder?: () => void;
}

export const EventsNearYouView: React.FC<EventsNearYouViewProps> = ({
  userPos,
  onBackToFinder,
}) => {
  const { language } = useLanguage();

  /* ── Filter States ─────────────────────────────────────────── */
  const [searchTerm, setSearchTerm]           = useState('');
  const [timeFilter, setTimeFilter]           = useState<'ALL' | 'today' | 'this_week' | 'this_month' | 'upcoming'>('ALL');
  const [selectedEventType, setSelectedEventType] = useState('ALL');
  const [selectedChurchId, setSelectedChurchId]   = useState('ALL');
  const [selectedLanguage, setSelectedLanguage]   = useState('ALL');

  /* ── Bookmark / Bell States ──────────────────────────────── */
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['ev1', 'ev3']));
  const [reminderIds, setReminderIds]     = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleReminder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReminderIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Events with distance ──────────────────────────────────── */
  const eventsWithDistance = useMemo(() => {
    return MOCK_EVENTS.map(ev => {
      const dist = userPos
        ? Math.round(haversineKm(userPos[0], userPos[1], ev.lat, ev.lng) * 10) / 10
        : null;
      return { ...ev, distanceKm: dist };
    }).sort((a, b) => {
      if (a.distanceKm !== null && b.distanceKm !== null) return a.distanceKm - b.distanceKm;
      return 0;
    });
  }, [userPos]);

  /* ── Filtered Events ───────────────────────────────────────── */
  const filteredEvents = useMemo(() => {
    return eventsWithDistance.filter(ev => {
      if (timeFilter !== 'ALL' && ev.dateCategory !== timeFilter) return false;
      if (selectedEventType !== 'ALL' && ev.eventType !== selectedEventType) return false;
      if (selectedChurchId !== 'ALL' && ev.churchId !== selectedChurchId) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const hit =
          ev.titleEn.toLowerCase().includes(q) ||
          ev.titleAm.toLowerCase().includes(q) ||
          ev.churchNameEnglish.toLowerCase().includes(q) ||
          ev.city.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [eventsWithDistance, timeFilter, selectedEventType, selectedChurchId, searchTerm]);

  const thisMonthCount = eventsWithDistance.filter(e => e.dateCategory === 'this_month').length;
  const venueCount = new Set(eventsWithDistance.map(e => e.churchId)).size;

  const TIME_PILLS = [
    { id: 'ALL',        label: 'All Events' },
    { id: 'today',      label: 'Today' },
    { id: 'this_week',  label: 'This Week' },
    { id: 'this_month', label: 'This Month' },
    { id: 'upcoming',   label: 'Upcoming' },
  ] as const;

  /* ── Language display ─────────────────────────────────────── */
  const langLabel = (l: string) => language === 'am' ? l : l;

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">

      {/* ══ 1. HERO BANNER ══════════════════════════════════════════ */}
      <section className="relative text-white overflow-hidden" style={{ paddingTop: '88px' }}>
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/images/events_hero_candles.jpg)' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061D16]/90 via-[#061D16]/70 to-[#061D16]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF7F2]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 pt-10 pb-20">

          {/* Back breadcrumb */}
          <button
            onClick={() => onBackToFinder?.()}
            className="flex items-center gap-1.5 text-[#C8A84B] text-xs font-bold mb-6 hover:opacity-75 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Church Finder</span>
          </button>

          {/* Label */}
          <div className="flex items-center gap-2 text-[#C8A84B] font-mono text-[11px] uppercase tracking-[0.22em] font-bold mb-3">
            <span className="w-5 h-[1.5px] bg-[#C8A84B]" />
            <span>PARISH EVENTS &amp; GATHERINGS</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.07] mb-4">
            {language === 'am' ? 'ዐቢይ ሁነቶችና ዝግጅቶች' : 'Events Near You'}
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-[#D1D5DB] font-sans max-w-lg leading-relaxed">
            {language === 'am'
              ? 'ምዕመናን ወደ ቀረቤ ቤተ ክርስቲያን ሁነቶች ተቀላቀሉ — ፍልሰታ፣ ሰቆቃወ ድቁናት፣ ማኅበረሰብ ምግቦች ወዘተ።'
              : 'Discover feast days, Tabot processions, youth programs, community meals, and spiritual retreats happening at parishes near you.'}
          </p>

        </div>
      </section>


      {/* ══ 2. QUICK-ACTIONS BAR ════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 -mt-6 relative z-10">
        <div className="bg-white border border-[#E7DFD1] rounded-2xl shadow-sm p-4 flex flex-wrap items-center gap-4 sm:gap-0 sm:divide-x divide-[#E7DFD1]">

          {/* Enable Location */}
          <div className="flex items-center gap-3 px-5 flex-1 min-w-[160px]">
            <div className="w-9 h-9 rounded-xl bg-[#F0EBE1] border border-[#DDD3C0] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#855B09]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#1C1814] font-sans leading-tight">Enable Location</p>
              <p className="text-[10px] text-[#7A6B56]">Find events near you</p>
            </div>
          </div>

          {/* Select Your Church */}
          <div className="flex items-center gap-3 px-5 flex-1 min-w-[160px]">
            <div className="w-9 h-9 rounded-xl bg-[#F0EBE1] border border-[#DDD3C0] flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-[#855B09]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#1C1814] font-sans leading-tight">Select Your Church</p>
              <p className="text-[10px] text-[#7A6B56]">Choose a church to see events</p>
            </div>
          </div>

          {/* Full Liturgical Calendar */}
          <div className="flex items-center gap-3 px-5 flex-1 min-w-[160px]">
            <div className="w-9 h-9 rounded-xl bg-[#F0EBE1] border border-[#DDD3C0] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-[#855B09]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#1C1814] font-sans leading-tight">Full Liturgical Calendar</p>
              <p className="text-[10px] text-[#7A6B56]">View all church calendar</p>
            </div>
          </div>

          {/* Events This Month count */}
          <div className="flex items-center gap-3 px-5 flex-1 min-w-[100px]">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-[#0B3B2B] leading-none">{thisMonthCount || 10}</p>
              <p className="text-[9px] font-bold font-mono uppercase tracking-wider text-[#855B09] mt-0.5">EVENTS THIS MONTH</p>
            </div>
          </div>

          {/* Venues count */}
          <div className="flex items-center gap-3 px-5 flex-1 min-w-[80px]">
            <div className="text-center">
              <p className="text-2xl font-bold font-mono text-[#0B3B2B] leading-none">{venueCount || 2}</p>
              <p className="text-[9px] font-bold font-mono uppercase tracking-wider text-[#855B09] mt-0.5">VENUES</p>
            </div>
          </div>

        </div>
      </div>


      {/* ══ 3. MAIN CONTENT ═════════════════════════════════════════ */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-8 space-y-6">

        {/* ── Search + Time Pill Bar ───────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">

          {/* Search input */}
          <div className="relative w-full sm:w-72 lg:w-80">
            <Search className="w-4 h-4 text-[#855B09] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events by name, church, or city..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans placeholder:text-stone-400 focus:outline-none focus:border-[#0B3B2B] shadow-2xs"
            />
          </div>

          {/* Time pills */}
          <div className="flex items-center gap-1 bg-white border border-[#E7DFD1] rounded-xl p-1 shadow-2xs flex-wrap">
            {TIME_PILLS.map(pill => (
              <button
                key={pill.id}
                onClick={() => setTimeFilter(pill.id as typeof timeFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  timeFilter === pill.id
                    ? 'bg-[#0B3B2B] text-white'
                    : 'text-[#5A4B35] hover:text-[#0B3B2B]'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

        </div>

        {/* ── Dropdown Filter Row ──────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">

          {/* EVENT CATEGORY */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#855B09]">EVENT CATEGORY</label>
            <select
              value={selectedEventType}
              onChange={e => setSelectedEventType(e.target.value)}
              className="px-3 py-2 bg-white border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] shadow-2xs cursor-pointer"
            >
              <option value="ALL">All Categories (ሁሉም ዓይነቶች)</option>
              {EVENT_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* FESTIVAL NAME / CHURCH */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#855B09]">FESTIVAL NAME</label>
            <select
              value={selectedChurchId}
              onChange={e => setSelectedChurchId(e.target.value)}
              className="px-3 py-2 bg-white border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] shadow-2xs cursor-pointer"
            >
              <option value="ALL">All Churches (ሁሉም አብያተ ክርስቲያናት)</option>
              {MOCK_CHURCHES.map(c => (
                <option key={c.id} value={c.id}>{c.nameEnglish}</option>
              ))}
            </select>
          </div>

          {/* LANGUAGE */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#855B09]">LANGUAGE</label>
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 bg-white border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] shadow-2xs cursor-pointer"
            >
              <option value="ALL">All Languages (ሁሉም ቋንቋዎች)</option>
              <option value="amharic">Amharic (አማርኛ)</option>
              <option value="english">English</option>
              <option value="geez">Ge'ez (ግዕዝ)</option>
            </select>
          </div>

          {/* EVENT TYPE */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#855B09]">EVENT TYPE</label>
            <select
              className="px-3 py-2 bg-white border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B] shadow-2xs cursor-pointer"
            >
              <option>All Event Types (ሁሉም ዓይነቶች)</option>
            </select>
          </div>

        </div>


        {/* ── Table Section ────────────────────────────────────── */}
        <div>

          {/* Table Header Row */}
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold font-serif text-[#1C1814]">
              Upcoming Parish Events &amp; Gatherings
            </h2>
            <span className="text-xs font-mono text-[#7A6B56]">
              Showing {filteredEvents.length} of {MOCK_EVENTS.length} events
            </span>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid grid-cols-12 gap-3 text-[10px] font-mono uppercase font-bold text-[#855B09] tracking-wider pb-2 border-b border-[#E7DFD1] px-3">
            <div className="col-span-4">EVENT</div>
            <div className="col-span-3">VENUE</div>
            <div className="col-span-2">DATE &amp; TIME</div>
            <div className="col-span-1">LANGUAGE</div>
            <div className="col-span-2 text-right">ACTIONS</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#EFE7DA]">
            {filteredEvents.map(ev => {
              const isBookmarked = bookmarkedIds.has(ev.id);
              const hasReminder  = reminderIds.has(ev.id);
              const catCol       = categoryColor(ev.eventType);
              const lang         = langLabel(language === 'am' ? 'አማርኛ' : 'Amharic');

              return (
                <div
                  key={ev.id}
                  className="py-4 px-3 grid grid-cols-12 gap-3 items-center hover:bg-white/70 rounded-2xl transition-colors cursor-pointer group"
                >

                  {/* ── Col 1: Thumbnail + Title + Church (4 cols) ── */}
                  <div className="col-span-12 md:col-span-4 flex items-start gap-3 min-w-0">

                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#D5C9B3] shrink-0 bg-white shadow-2xs">
                      <img
                        src={ev.imageUrl}
                        alt={ev.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {/* golden cross badge */}
                      <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#0B3B2B] border border-[#C8A84B] flex items-center justify-center text-[#E5C158] text-[9px] font-serif">
                        †
                      </div>
                    </div>

                    {/* Text */}
                    <div className="min-w-0 space-y-0.5">
                      {/* category badge */}
                      <span
                        className="text-[8px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md border"
                        style={{
                          color: catCol,
                          borderColor: catCol + '55',
                          backgroundColor: catCol + '15',
                        }}
                      >
                        {ev.eventType}
                      </span>

                      {/* Ge'ez / Amharic title */}
                      <p className="text-[10px] text-[#7A6B56] font-sans leading-tight truncate">{ev.titleAm}</p>

                      {/* English title */}
                      <h3 className="font-bold text-xs sm:text-sm text-[#1C1814] group-hover:text-[#855B09] transition-colors leading-tight font-serif truncate">
                        {ev.titleEn}
                      </h3>

                      {/* Diocese */}
                      <p className="text-[10px] text-[#7A6B56] font-sans leading-tight truncate">{ev.diocese}</p>
                    </div>

                  </div>

                  {/* ── Col 2: Venue (3 cols) ── */}
                  <div className="col-span-6 md:col-span-3 space-y-1 text-xs font-sans min-w-0">
                    <div className="flex items-start gap-1 text-[#1C1814]">
                      <MapPin className="w-3 h-3 text-[#855B09] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1C1814] leading-tight truncate">{ev.churchNameEnglish}</p>
                        <p className="text-[11px] text-[#7A6B56]">{ev.city}, {ev.country}</p>
                      </div>
                    </div>
                  </div>

                  {/* ── Col 3: Date & Time (2 cols) ── */}
                  <div className="col-span-6 md:col-span-2 text-xs font-sans space-y-1">
                    <div className="flex items-center gap-1 font-semibold text-[#1C1814]">
                      <Calendar className="w-3 h-3 text-[#855B09] shrink-0" />
                      <span className="truncate">{ev.gregorianDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#5A4B35]">
                      <Clock className="w-3 h-3 text-[#855B09] shrink-0" />
                      <span>{ev.startTime} – {ev.endTime}</span>
                    </div>
                  </div>

                  {/* ── Col 4: Language (1 col) ── */}
                  <div className="col-span-6 md:col-span-1 text-[11px] text-[#5A4B35] font-sans space-y-0.5">
                    <p>{lang}</p>
                    {ev.isHybrid && <p className="text-[10px] text-[#0B3B2B] font-bold">English</p>}
                    <p className="text-[10px] text-[#7A6B56]">Ge'ez</p>
                  </div>

                  {/* ── Col 5: Actions (2 cols) ── */}
                  <div className="col-span-6 md:col-span-2 flex items-center justify-end gap-2">

                    {/* RSVP / Details link */}
                    <span className="text-xs font-bold text-[#855B09] hover:text-[#5B3E06] flex items-center gap-0.5 transition-colors whitespace-nowrap">
                      <span>RSVP / Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>

                    {/* Bookmark */}
                    <button
                      onClick={e => toggleBookmark(ev.id, e)}
                      title="Save event"
                      className="w-7 h-7 rounded-lg border border-[#D5C9B3] hover:border-[#855B09] flex items-center justify-center text-[#855B09] bg-white transition-colors cursor-pointer"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#855B09]' : ''}`} />
                    </button>

                    {/* Bell */}
                    <button
                      onClick={e => toggleReminder(ev.id, e)}
                      title="Set reminder"
                      className="w-7 h-7 rounded-lg border border-[#D5C9B3] hover:border-[#855B09] flex items-center justify-center text-[#855B09] bg-white transition-colors cursor-pointer"
                    >
                      <Bell className={`w-3.5 h-3.5 ${hasReminder ? 'fill-[#855B09]' : ''}`} />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>

          {/* ── View All button ──────────────────────────────── */}
          {filteredEvents.length < MOCK_EVENTS.length && (
            <div className="pt-6 flex justify-center">
              <button
                onClick={() => setTimeFilter('ALL')}
                className="flex items-center gap-2 text-sm font-bold text-[#855B09] hover:text-[#5B3E06] border border-[#C8A84B] rounded-xl px-6 py-2.5 hover:bg-[#FFF8E7] transition-colors cursor-pointer"
              >
                <span>View All Events</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </main>

    </div>
  );
};

export default EventsNearYouView;
