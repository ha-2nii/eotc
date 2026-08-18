import React, { useState, useMemo } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { MOCK_EVENTS, EVENT_TYPES } from '../../data/mockEvents';
import type { EOTCEvent, EventType } from '../../data/mockEvents';
import { MOCK_CHURCHES } from '../../data/mockChurches';
import type { Church } from '../../data/mockChurches';
import {
  Calendar, Clock, MapPin, Users, Tv,
  Search, Check, Copy,
  ChevronRight, X, Bookmark, Compass,
  RotateCw, Phone, Mail,
  CalendarPlus, Send
} from 'lucide-react';

/* ─── Haversine Distance Formula ─────────────────────────────── */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface EventsNearYouViewProps {
  userPos: [number, number] | null;
  onOpenChurchDetail?: (church: Church) => void;
}

export const EventsNearYouView: React.FC<EventsNearYouViewProps> = ({
  userPos,
  onOpenChurchDetail,
}) => {
  const { language } = useLanguage();

  /* ── Filter States ── */
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState<'ALL' | 'today' | 'this_week' | 'this_month' | 'upcoming'>('ALL');
  const [selectedEventType, setSelectedEventType] = useState<string>('ALL');
  const [selectedChurchId, setSelectedChurchId] = useState<string>('ALL');
  const [costFilter, setCostFilter] = useState<'ALL' | 'free' | 'paid'>('ALL');
  const [recurrenceFilter, setRecurrenceFilter] = useState<'ALL' | 'recurring' | 'once'>('ALL');

  /* ── Detail Modal & RSVP State ── */
  const [selectedEvent, setSelectedEvent] = useState<EOTCEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  /* ── User Bookmarked Events ── */
  const [savedEventIds, setSavedEventIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eotc_saved_events');
      return saved ? JSON.parse(saved) : ['ev1', 'ev3'];
    } catch {
      return ['ev1', 'ev3'];
    }
  });

  const toggleSaveEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedEventIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('eotc_saved_events', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  /* ── Sorted & Filtered Events Feed ── */
  const eventsWithDistance = useMemo(() => {
    return MOCK_EVENTS.map((ev) => {
      const dist = userPos ? Math.round(haversineKm(userPos[0], userPos[1], ev.lat, ev.lng) * 10) / 10 : null;
      return { ...ev, distanceKm: dist };
    }).sort((a, b) => {
      if (a.distanceKm !== null && b.distanceKm !== null) {
        return a.distanceKm - b.distanceKm;
      }
      return 0;
    });
  }, [userPos]);

  const filteredEvents = useMemo(() => {
    return eventsWithDistance.filter((ev) => {
      // Date filter
      if (selectedDateFilter !== 'ALL' && ev.dateCategory !== selectedDateFilter) return false;
      // Event type
      if (selectedEventType !== 'ALL' && ev.eventType !== selectedEventType) return false;
      // Church
      if (selectedChurchId !== 'ALL' && ev.churchId !== selectedChurchId) return false;
      // Cost
      if (costFilter === 'free' && !ev.isFree) return false;
      if (costFilter === 'paid' && ev.isFree) return false;
      // Recurrence
      if (recurrenceFilter === 'recurring' && ev.recurrence === 'once') return false;
      if (recurrenceFilter === 'once' && ev.recurrence !== 'once') return false;

      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matches =
          ev.titleEn.toLowerCase().includes(q) ||
          ev.titleAm.toLowerCase().includes(q) ||
          ev.churchNameEnglish.toLowerCase().includes(q) ||
          ev.churchNameAmharic.toLowerCase().includes(q) ||
          ev.city.toLowerCase().includes(q) ||
          ev.diocese.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [eventsWithDistance, selectedDateFilter, selectedEventType, selectedChurchId, costFilter, recurrenceFilter, searchTerm]);

  /* ── Handle RSVP Submission ── */
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;
    setRsvpConfirmed(true);
    setTimeout(() => {
      setRsvpConfirmed(false);
      setRsvpName('');
      setRsvpEmail('');
      setRsvpGuests('1');
    }, 3000);
  };

  /* ── Handle Social Share ── */
  const handleCopyShareLink = (event: EOTCEvent) => {
    const url = `${window.location.origin}/find-a-church/events/${event.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  /* ── Download .ics Calendar File ── */
  const downloadIcs = (ev: EOTCEvent) => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ethiopian Orthodox Tewahedo Church//Events//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${ev.titleEn} (${ev.titleAm})`,
      `DESCRIPTION:${ev.descriptionEn}\\n\\nHost: ${ev.churchNameEnglish}`,
      `LOCATION:${ev.address}, ${ev.city}, ${ev.country}`,
      'DTSTART:20260822T170000Z',
      'DTEND:20260823T073000Z',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${ev.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case 'Feast Day':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Mahlet Vigil':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Youth Program':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Community Meal':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Sermon':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Retreat':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Tabot Procession':
        return 'bg-[#FFF8E7] text-[#855B09] border-[#C8A84B]';
      case 'Fundraiser':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-900 border-stone-300';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ══ 1. BANNER & STATS ═════════════════════════════════════ */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge-gold text-[10px] uppercase font-bold tracking-wider">
              {language === 'am' ? 'የአብያተ ክርስቲያናት ሁነቶችና በዓላት' : 'PARISH EVENTS FEED'}
            </span>
            {userPos && (
              <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Compass className="w-3 h-3 text-green-600 animate-spin" />
                {language === 'am' ? 'በአካባቢ ርቀት የተደረደረ' : 'Sorted by GPS Proximity'}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
            <Users className="w-7 h-7 text-[#855B09]" />
            <span>{language === 'am' ? 'በአቅራቢያዎ የሚደረጉ ሁነቶችና ጉባኤያት' : 'Upcoming Parish Events & Gatherings'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-3xl">
            {language === 'am'
              ? 'ዓመታዊ የንግሥ በዓላት፣ የታቦት ማኅሌት፣ የወጣቶች ጉባኤ፣ የፍቅር ማዕድና መንፈሳዊ ዕረፍቶችን ይመልከቱ፤ በቦታው ይሳተፉ ወይም በኦንላይን ይከታተሉ።'
              : 'Discover annual patron feast days, all-night Mahlet vigils, youth symposiums, and community Agapē meals near your location.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
          <div className="bg-[#FAF8F3] px-4 py-2.5 rounded-2xl border border-[#E6DFD1] text-center">
            <div className="text-xl font-black text-[#855B09] font-mono">{filteredEvents.length}</div>
            <div className="text-[10px] font-bold text-[#6B7280] uppercase">Events Found</div>
          </div>
          <div className="bg-[#FAF8F3] px-4 py-2.5 rounded-2xl border border-[#E6DFD1] text-center">
            <div className="text-xl font-black text-[#1A2C1C] font-mono">{savedEventIds.length}</div>
            <div className="text-[10px] font-bold text-[#6B7280] uppercase">Saved</div>
          </div>
        </div>
      </section>

      {/* ══ 2. FILTER & SEARCH CONTROL PANEL ══════════════════════ */}
      <section className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#855B09] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'am' ? 'በሁነት ርዕስ፣ በደብር ወይም በከተማ ፈልግ...' : 'Search events by name, church, or city...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E6DFD1] text-xs sm:text-sm focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3] text-[#2C1D07]"
            />
          </div>

          {/* Quick Date Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F3] p-1.5 rounded-2xl border border-[#E6DFD1]">
            {[
              { id: 'ALL' as const, lEn: 'All Dates', lAm: 'ሁሉም' },
              { id: 'today' as const, lEn: 'Today', lAm: 'ዛሬ' },
              { id: 'this_week' as const, lEn: 'This Week', lAm: 'በዚህ ሳምንት' },
              { id: 'this_month' as const, lEn: 'This Month', lAm: 'በዚህ ወር' },
              { id: 'upcoming' as const, lEn: 'Upcoming', lAm: 'የሚመጡ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDateFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDateFilter === tab.id
                    ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#2C1D07]'
                }`}
              >
                {language === 'am' ? tab.lAm : tab.lEn}
              </button>
            ))}
          </div>
        </div>

        {/* Second Row: Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#E6DFD1]">
          {/* Event Type Filter */}
          <div>
            <label className="block text-[10px] font-bold text-[#855B09] uppercase tracking-wider mb-1">
              Event Category
            </label>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">All Categories (ሁሉም ዓይነቶች)</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Church Filter */}
          <div>
            <label className="block text-[10px] font-bold text-[#855B09] uppercase tracking-wider mb-1">
              Hosting Parish
            </label>
            <select
              value={selectedChurchId}
              onChange={(e) => setSelectedChurchId(e.target.value)}
              className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">All Churches (ሁሉም አብያተ ክርስቲያናት)</option>
              {MOCK_CHURCHES.slice(0, 15).map((c) => (
                <option key={c.id} value={c.id}>{c.nameEnglish} ({c.city})</option>
              ))}
            </select>
          </div>

          {/* Cost Filter */}
          <div>
            <label className="block text-[10px] font-bold text-[#855B09] uppercase tracking-wider mb-1">
              Admission / Cost
            </label>
            <select
              value={costFilter}
              onChange={(e) => setCostFilter(e.target.value as any)}
              className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">All Events (Free & Ticketed)</option>
              <option value="free">Free Admission Only (ነፃ)</option>
              <option value="paid">Fundraiser / Ticketed</option>
            </select>
          </div>

          {/* Recurrence Filter */}
          <div>
            <label className="block text-[10px] font-bold text-[#855B09] uppercase tracking-wider mb-1">
              Recurrence Type
            </label>
            <select
              value={recurrenceFilter}
              onChange={(e) => setRecurrenceFilter(e.target.value as any)}
              className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">All Schedules (ሁሉም)</option>
              <option value="recurring">Recurring (Weekly / Monthly Feasts)</option>
              <option value="once">Special One-Time Events</option>
            </select>
          </div>
        </div>
      </section>

      {/* ══ 3. EVENTS GRID FEED ═══════════════════════════════════ */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#E6DFD1] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF8E7] text-[#855B09] flex items-center justify-center mx-auto">
            <Calendar className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#2C1D07]">No Events Match Your Filters</h3>
          <p className="text-xs text-[#6B7280] max-w-md mx-auto">
            Try resetting your search query, selecting "All Dates", or switching to another category.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDateFilter('ALL');
              setSelectedEventType('ALL');
              setSelectedChurchId('ALL');
              setCostFilter('ALL');
              setRecurrenceFilter('ALL');
            }}
            className="btn-gold px-6 py-2.5 text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => {
            const isSaved = savedEventIds.includes(ev.id);
            const typeColor = getEventTypeColor(ev.eventType);

            return (
              <div
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
              >
                {/* Event Cover Photo & Top Badges */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={ev.imageUrl}
                    alt={ev.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase shadow-sm ${typeColor}`}>
                      {ev.eventType}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleSaveEvent(ev.id, e)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSaved ? 'bg-[#855B09] text-white' : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Bottom info on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[10px] font-bold text-[#C8A84B] uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.gregorianDate}</span>
                    </div>
                    <div className="text-[11px] text-stone-300 font-geez">
                      {ev.ethiopianDate}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Recurrence Pill */}
                    {ev.recurrence !== 'once' && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                        <RotateCw className="w-2.5 h-2.5" />
                        <span>{ev.recurrenceLabel || 'Recurring'}</span>
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors line-clamp-2">
                      {language === 'am' ? ev.titleAm : ev.titleEn}
                    </h3>
                    <p className="text-xs text-[#855B09] font-medium line-clamp-1">
                      {language === 'am' ? ev.titleEn : ev.titleAm}
                    </p>

                    {/* Church & City */}
                    <div className="bg-[#FAF8F3] p-3 rounded-2xl border border-[#E6DFD1] space-y-1.5 text-xs text-[#4A3B22]">
                      <div className="flex items-center gap-2 font-bold text-[#2C1D07]">
                        <MapPin className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                        <span className="truncate">{ev.churchNameEnglish}</span>
                      </div>
                      <div className="text-[11px] text-[#6B7280] flex items-center justify-between">
                        <span>{ev.city}, {ev.country}</span>
                        {ev.distanceKm !== null && (
                          <span className="font-mono font-bold text-[#855B09]">{ev.distanceKm} km away</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] pt-1 border-t border-[#E6DFD1]">
                        <Clock className="w-3 h-3 text-[#855B09] shrink-0" />
                        <span>{ev.startTime} – {ev.endTime}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed pt-1">
                      {language === 'am' ? ev.descriptionAm : ev.descriptionEn}
                    </p>
                  </div>

                  {/* Footer Meta & Actions */}
                  <div className="space-y-3 pt-3 border-t border-[#E6DFD1]">
                    {/* RSVP count and Live Stream badge */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#855B09] font-bold text-[11px]">
                        <Users className="w-3.5 h-3.5" />
                        <span>{ev.rsvpCount.toLocaleString()} Attending</span>
                        {ev.capacity && (
                          <span className="text-[#6B7280] font-normal">/ {ev.capacity}</span>
                        )}
                      </div>

                      {ev.isHybrid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                          <Tv className="w-3 h-3" /> Live Stream
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-stone-500">
                          {ev.isFree ? 'Free Admission' : ev.ticketPrice}
                        </span>
                      )}
                    </div>

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(ev);
                        }}
                        className="flex-1 btn-gold py-2 text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <span>RSVP / Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={ev.gcalUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Add to Google Calendar"
                        className="p-2 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-[#855B09] transition-all"
                      >
                        <CalendarPlus className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══ 4. EVENT DETAIL / RSVP MODAL ═════════════════════════ */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEvent(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp">
            {/* Header with Photo Banner */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center font-bold transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${getEventTypeColor(selectedEvent.eventType)}`}>
                    {selectedEvent.eventType}
                  </span>
                  <span className="text-[10px] text-stone-300 font-semibold">{selectedEvent.diocese}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-geez leading-tight">{selectedEvent.titleAm}</h3>
                <p className="text-xs font-medium text-[#C8A84B]">{selectedEvent.titleEn}</p>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#4A3B22]">
              {/* Date & Time Highlight Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] text-[#855B09] border border-[#E6DFD1] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2C1D07]">{selectedEvent.gregorianDate}</div>
                    <div className="text-[11px] text-[#855B09] font-geez">{selectedEvent.ethiopianDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8E7] text-[#855B09] border border-[#E6DFD1] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2C1D07]">{selectedEvent.startTime} – {selectedEvent.endTime}</div>
                    <div className="text-[11px] text-[#6B7280]">
                      {selectedEvent.recurrence !== 'once' ? (selectedEvent.recurrenceLabel || 'Recurring Event') : 'One-Time Event'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider">About This Event (ስለ ሁነቱ)</h4>
                <p className="text-xs text-[#2C1D07] font-geez leading-relaxed bg-[#FAF8F3] p-3.5 rounded-xl border border-[#E6DFD1]">
                  {selectedEvent.descriptionAm}
                </p>
                <p className="text-xs text-[#4A3B22] leading-relaxed">
                  {selectedEvent.descriptionEn}
                </p>
              </div>

              {/* Multi-Segment Schedule Timeline */}
              {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#855B09]" />
                    Event Agenda & Liturgical Schedule (የመርሐ ግብር ሰሌዳ)
                  </h4>
                  <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] divide-y divide-[#E6DFD1]">
                    {selectedEvent.schedule.map((item, idx) => (
                      <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
                        <div className="font-mono font-bold text-[#855B09] bg-white px-2.5 py-1 rounded-lg border border-[#E6DFD1] shrink-0">
                          {item.time}
                        </div>
                        <div className="flex-1 text-right sm:text-left">
                          <div className="font-bold text-[#2C1D07]">{item.item}</div>
                          <div className="text-[11px] text-[#855B09] font-geez">{item.itemAm}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location & Parish Host Information */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#2C1D07] text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#855B09]" />
                  Hosting Parish & Location Details
                </h4>
                <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] space-y-2 text-xs">
                  <div className="font-bold text-sm text-[#2C1D07] font-geez">{selectedEvent.churchNameAmharic}</div>
                  <div className="text-xs text-[#855B09] font-medium">{selectedEvent.churchNameEnglish}</div>
                  <div className="text-[#6B7280]">{selectedEvent.address}, {selectedEvent.city}, {selectedEvent.country}</div>

                  <div className="pt-2 border-t border-[#E6DFD1] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      {selectedEvent.contactPhone && (
                        <div className="flex items-center gap-1 text-[11px]">
                          <Phone className="w-3 h-3 text-[#855B09]" />
                          <span>{selectedEvent.contactPhone}</span>
                        </div>
                      )}
                      {selectedEvent.contactEmail && (
                        <div className="flex items-center gap-1 text-[11px]">
                          <Mail className="w-3 h-3 text-[#855B09]" />
                          <a href={`mailto:${selectedEvent.contactEmail}`} className="text-[#855B09] hover:underline font-semibold">
                            {selectedEvent.contactEmail}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {selectedEvent.distanceKm !== null && (
                        <div className="font-mono font-bold text-green-700 text-[11px]">
                          🚗 {selectedEvent.distanceKm} km
                        </div>
                      )}
                      {onOpenChurchDetail && (
                        <button
                          type="button"
                          onClick={() => {
                            const host = MOCK_CHURCHES.find((c) => c.id === selectedEvent.churchId);
                            if (host) {
                              setSelectedEvent(null);
                              onOpenChurchDetail(host);
                            }
                          }}
                          className="text-[11px] font-bold text-[#855B09] hover:underline flex items-center gap-0.5"
                        >
                          <span>View on Map →</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RSVP Form */}
              <div className="bg-gradient-to-br from-[#FAF8F3] to-[#FFF8E7] p-5 rounded-2xl border border-[#C8A84B] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#855B09]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#2C1D07]">
                      Reserve Your Spot / RSVP
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#855B09]">
                    {selectedEvent.isFree ? 'Free Admission' : selectedEvent.ticketPrice}
                  </span>
                </div>

                {rsvpConfirmed ? (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-300 text-green-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>RSVP Confirmed! A reminder and confirmation receipt has been generated.</span>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        className="bg-white border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C8A84B]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        className="bg-white border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C8A84B]"
                      />
                      <select
                        value={rsvpGuests}
                        onChange={(e) => setRsvpGuests(e.target.value)}
                        className="bg-white border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C8A84B]"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4+ Family Group</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full btn-gold py-2.5 text-xs font-bold shadow-sm">
                      Confirm RSVP for {selectedEvent.titleEn}
                    </button>
                  </form>
                )}
              </div>

              {/* Add to Calendar & Social Share Bar */}
              <div className="space-y-3 pt-2 border-t border-[#E6DFD1]">
                <div className="text-[11px] font-bold text-[#855B09] uppercase tracking-wider">
                  Sync to Calendar & Share
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={selectedEvent.gcalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-[#E6DFD1] hover:border-[#C8A84B] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => downloadIcs(selectedEvent)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-[#E6DFD1] hover:border-[#C8A84B] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#855B09]" />
                    <span>Apple / Outlook (.ics)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyShareLink(selectedEvent)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#E6DFD1] hover:border-[#C8A84B] font-bold text-xs flex items-center justify-center gap-1.5 text-[#855B09] shadow-sm"
                  >
                    {copiedShare ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedShare ? 'Link Copied!' : 'Copy Link'}</span>
                  </button>

                  {selectedEvent.isHybrid && selectedEvent.streamingUrl && (
                    <a
                      href={selectedEvent.streamingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm ml-auto"
                    >
                      <Tv className="w-3.5 h-3.5" />
                      <span>Watch Live Stream</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
