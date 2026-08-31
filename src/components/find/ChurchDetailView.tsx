import React, { useState } from 'react';
import type { Church } from '../../data/mockChurches';
import { useLanguage } from '../layout/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Radio,
  Navigation,
  Heart,
  Calendar,
  CheckCircle,
  ArrowRight,
  User,
  Cross,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  Users,
  Church as ChurchIcon,
  X,
  Share2,
  Check
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface ChurchDetailViewProps {
  church: Church;
  onBack: () => void;
}

// Custom Leaflet marker pin for detail view
const churchDetailIcon = new L.DivIcon({
  className: 'eotc-detail-marker',
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background: #0B3B2B;
      border: 2px solid #C8A84B;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #E5C158;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    ">
      †
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

export const ChurchDetailView: React.FC<ChurchDetailViewProps> = ({ church, onBack }) => {
  const { setActiveView } = useLanguage();
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery Photos (5 high-res canonical photos matching the design)
  const galleryPhotos = [
    {
      url: church.photoUrl || '/assets/images/find_hero_cathedral.jpg',
      captionEn: 'Cathedral Exterior Architecture',
      captionAm: 'የካቴድራሉ ውጫዊ ሕንፃ'
    },
    {
      url: '/assets/images/holy_trinity_interior.jpg',
      captionEn: 'Golden Altar & Iconostasis',
      captionAm: 'መንበረ ታቦትና ቅድስተ ቅዱሳን'
    },
    {
      url: '/assets/images/gondar_debre_birhan.jpg',
      captionEn: 'Ceiling Frescoes & Angel Murals',
      captionAm: 'የጣራው ያሬዳዊ የሥነ ሥዕል ምስሎች'
    },
    {
      url: '/assets/images/holy_synod_assembly.jpg',
      captionEn: 'Clergy & Patriarchal Procession',
      captionAm: 'የሊቃነ ጳጳሳትና የካህናት በዓለ ንግሥ'
    },
    {
      url: '/assets/images/crosses_sunset.jpg',
      captionEn: 'Traditional Hand Crosses & Regalia',
      captionAm: 'የእጅ መስቀልና ንዋያተ ቅድሳት'
    }
  ];

  // Default Clergy List if not present
  const clergyList = church.clergyList && church.clergyList.length > 0
    ? church.clergyList
    : [
        { name: 'Melake Selam Gebre Hiwot', nameAmharic: 'መልአከ ሰላም ገብረ ሕይወት', role: 'Head Priest', roleAmharic: 'ዋና አስተዳዳሪ' },
        { name: 'Kesis Gebre Maryam', nameAmharic: 'ቀሲስ ገብረ ማርያም', role: 'Chief Liturgist', roleAmharic: 'መሪጌታ' },
        { name: 'Eyasu Wolde Giorgis', nameAmharic: 'እያሱ ወልደ ጊዮርጊስ', role: 'Archdeacon', roleAmharic: 'ሊቀ ዲያቆናት' },
      ];

  // Liturgical Schedule
  const scheduleItems = church.fullServiceSchedule && church.fullServiceSchedule.length > 0
    ? church.fullServiceSchedule
    : [
        { title: 'Divine Liturgy (Kidase)', titleAmharic: 'የሰንበት ማለዳ ቅዳሴ', time: '6:00 AM – 10:30 AM', day: 'Sundays', language: "Ge'ez • Amharic" },
        { title: 'Evening Mahlet & Wazim', titleAmharic: 'ዋዜማና የሌሊት ማኅሌት', time: '8:00 PM – 11:30 PM', day: 'Saturdays', language: "Ge'ez" },
        { title: 'Fasting Liturgy', titleAmharic: 'የጾም ቅዳሴ (፱ኛው ሰዓት)', time: '1:00 PM – 3:30 PM', day: 'Wed & Fri', language: "Ge'ez • Amharic" },
        { title: 'Sunday School & Youth Choir', titleAmharic: 'የሰንበት ት/ቤት መርሐ ግብር', time: '11:00 AM – 1:00 PM', day: 'Sundays', language: 'Amharic • English' },
      ];

  // Upcoming Feasts
  const upcomingEvents = [
    { date: 'May 25, 2025', titleEn: 'Feast of St. Mary of Zion', titleAm: 'በዓለ ማርያም ጽዮን' },
    { date: 'Jun 01, 2025', titleEn: 'Youth Spiritual Conference', titleAm: 'የወጣቶች መንፈሳዊ ጉባኤ' },
    { date: 'Jun 15, 2025', titleEn: 'Annual Mahlet Program', titleAm: 'ዓመታዊ ማኅሌት መርሐ ግብር' },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2C1D07] min-h-screen font-serif antialiased pb-24 animate-fadeIn">

      {/* ═══════════════════════════════════════════════════════════════
          1. BREADCRUMBS & FULL-BLEED CHURCH HERO SECTION (1:1 with Design)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative text-white pt-24 pb-0 overflow-hidden bg-[#07241B]">
        
        {/* Full-Bleed Photo Banner with Dark Forest Green Gradient on Left */}
        <div className="absolute inset-0">
          <img
            src={church.photoUrl || '/assets/images/find_hero_cathedral.jpg'}
            alt={church.nameEnglish}
            className="w-full h-full object-cover object-right"
          />
          {/* Dark Forest Green Gradient fading from Left to Right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07241B] via-[#07241B]/90 via-45% to-[#07241B]/20" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#07241B] to-transparent" />
        </div>

        <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center gap-2 text-xs font-sans text-[#D1D5DB] pt-2 pb-6">
            <button
              onClick={onBack}
              className="hover:text-[#E5C158] transition-colors cursor-pointer"
            >
              Churches
            </button>
            <span className="text-[#855B09]">›</span>
            <span className="hover:text-white transition-colors">
              {church.diocese || 'Addis Ababa Diocese'}
            </span>
            <span className="text-[#855B09]">›</span>
            <span className="text-[#E5C158] font-semibold">{church.nameEnglish}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12">
            {/* Left Column: Ge'ez Name, English Name, Subtitle & Metadata Badges */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Traditional Amharic / Ge'ez Church Name */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-geez text-[#E5C158] tracking-tight leading-[1.15]">
                {church.nameAmharic}
              </h2>

              {/* English Church Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight leading-[1.08]">
                {church.nameEnglish}
              </h1>

              {/* Patron / Category Subtitle */}
              <p className="text-sm sm:text-base text-[#D1D5DB] font-sans font-medium">
                {church.tabotPatron ? `${church.tabotPatron} Church` : 'Patriarchate Church'}
              </p>

              {/* Metadata Badges (Founded, Active Status, City) */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-stone-200 pt-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>Founded 1941</span>
                </div>

                <div className="flex items-center gap-1.5 text-[#6EE7B7]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-stone-200">Active Parish</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>{church.city}, {church.country}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Empty so cathedral photo shines through */}
            <div className="lg:col-span-5 hidden lg:block" />
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════
            DARK FOREST GREEN ACTION STRIP (Live Stream | Directions | Contact | Donate)
            ═══════════════════════════════════════════════════════════════ */}
        <div className="bg-[#051F17] border-t border-white/10 text-white">
          <div className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 text-xs font-sans font-bold">
            
            {/* 1. Live Stream */}
            <a
              href={church.streamingUrl || 'https://youtube.com/@EOTCTvOfficial'}
              target="_blank"
              rel="noreferrer"
              className="py-4 px-4 flex items-center justify-center gap-2 text-stone-200 hover:text-[#E5C158] hover:bg-white/5 transition-colors text-center"
            >
              <Radio className="w-4 h-4 text-[#E5C158] shrink-0 animate-pulse" />
              <span className="tracking-wider uppercase text-[11px]">LIVE STREAM</span>
            </a>

            {/* 2. Directions */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${church.lat},${church.lng}`}
              target="_blank"
              rel="noreferrer"
              className="py-4 px-4 flex items-center justify-center gap-2 text-stone-200 hover:text-[#E5C158] hover:bg-white/5 transition-colors text-center"
            >
              <Navigation className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span className="tracking-wider uppercase text-[11px]">DIRECTIONS</span>
            </a>

            {/* 3. Contact */}
            <a
              href={`tel:${church.phone || '+251111234567'}`}
              className="py-4 px-4 flex items-center justify-center gap-2 text-stone-200 hover:text-[#E5C158] hover:bg-white/5 transition-colors text-center"
            >
              <Phone className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span className="tracking-wider uppercase text-[11px]">CONTACT</span>
            </a>

            {/* 4. Donate */}
            <button
              onClick={() => setActiveView('give')}
              className="py-4 px-4 flex items-center justify-center gap-2 text-stone-200 hover:text-[#E5C158] hover:bg-white/5 transition-colors text-center cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span className="tracking-wider uppercase text-[11px]">DONATE</span>
            </button>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          2. MAIN EDITORIAL CONTENT (Parchment #FAF7F2 Background)
          ═══════════════════════════════════════════════════════════════ */}
      <main className="max-w-[1580px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 space-y-12">

        {/* ── ROW 1: ABOUT THE CHURCH & PARISH CLERGY ──────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-10 border-b border-[#E7DFD1]">
          
          {/* Left: About the Church */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
                ABOUT THE CHURCH
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#4A3B22] font-sans leading-relaxed">
              {church.nameEnglish} is one of the most significant and historic churches of the Ethiopian Orthodox Tewahedo Church. It serves as the spiritual center for the faithful in {church.city} and continues to uphold the rich traditions of our Orthodox faith through worship, service, and community.
            </p>

            <p className="text-sm text-[#5A4B35] font-sans leading-relaxed">
              This cathedral has been a beacon of faith, prayer, and unity for generations, housing consecrated relics and maintaining daily apostolic Divine Liturgies.
            </p>

            <button
              onClick={() => setShowHistoryModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#855B09] hover:text-[#0B3B2B] pt-1 font-sans cursor-pointer group transition-colors"
            >
              <span>Read Full History</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right: Parish Clergy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
                PARISH CLERGY
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {clergyList.map((member, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  {/* Golden Circular Avatar Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#FFF8E7] border border-[#C8A84B] flex items-center justify-center text-[#855B09] shrink-0 shadow-2xs">
                    {idx === 0 ? (
                      <User className="w-5 h-5" />
                    ) : idx === 1 ? (
                      <Sparkles className="w-5 h-5" />
                    ) : (
                      <Cross className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-geez font-bold text-sm sm:text-base text-[#1C1814]">
                      {member.nameAmharic || member.name}
                    </h4>
                    <p className="text-xs text-[#7A6B56] font-sans font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>


        {/* ── ROW 2: LITURGICAL SCHEDULE & OUR SERVICES ─────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-10 border-b border-[#E7DFD1]">
          
          {/* Left: Liturgical Schedule */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
              LITURGICAL SCHEDULE
            </h3>

            <div className="divide-y divide-[#E7DFD1] text-xs sm:text-sm font-sans pt-1">
              {scheduleItems.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                  <div className="text-[#2C1D07] font-medium">{item.title}</div>
                  <div className="font-bold text-[#855B09] font-mono text-right">{item.time}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-[#7A6B56] font-sans pt-2">
              <span className="font-bold text-[#2C1D07]">Languages:</span> Ge'ez • Amharic • English
            </div>
          </div>

          {/* Right: Our Services (2-Column Grid) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
              OUR SERVICES
            </h3>

            <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs sm:text-sm font-sans text-[#2C1D07] pt-1">
              {[
                { name: 'Baptism', nameAm: 'ጥምቀት', icon: Sparkles },
                { name: 'Holy Communion', nameAm: 'ቅዱስ ቍርባን', icon: ChurchIcon },
                { name: 'Marriage', nameAm: 'ተክሊል', icon: Heart },
                { name: 'Sunday School', nameAm: 'ሰንበት ት/ቤት', icon: BookOpen },
                { name: 'Confession', nameAm: 'ንስሐ', icon: Cross },
                { name: 'Choir Ministry', nameAm: 'መዘምራን', icon: Award },
                { name: 'Funeral Service', nameAm: 'ፍትሐት', icon: Clock },
                { name: 'Community Support', nameAm: 'ማኅበራዊ አገልግሎት', icon: Users },
              ].map((serv, idx) => {
                const IconComp = serv.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4 text-[#855B09] shrink-0" />
                    <span className="font-medium text-[#2C1D07]">{serv.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </section>


        {/* ── ROW 3: CONTACT INFORMATION & LOCATION MAP VIEW ───────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-10 border-b border-[#E7DFD1]">
          
          {/* Left: Contact Information */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
              CONTACT INFORMATION
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm font-sans text-[#2C1D07]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#855B09] shrink-0 mt-0.5" />
                <span>{church.address}, {church.city}, {church.country}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#855B09] shrink-0" />
                <span>{church.phone || '+251 11 123 4567'}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#855B09] shrink-0" />
                <a href={`mailto:${church.email || 'contact@holytrinitycathedral.et'}`} className="hover:text-[#855B09] hover:underline">
                  {church.email || 'contact@holytrinitycathedral.et'}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#855B09] shrink-0" />
                <a href={church.website || 'https://eotc.org.et'} target="_blank" rel="noreferrer" className="text-[#855B09] hover:underline">
                  {church.website || 'https://eotc.org.et'}
                </a>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#D5C9B3] hover:border-[#855B09] text-xs font-bold font-sans text-[#855B09] shadow-2xs transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Parish Details'}</span>
            </button>
          </div>

          {/* Right: Embedded Interactive Map */}
          <div className="lg:col-span-7">
            <div className="h-[260px] sm:h-[290px] rounded-2xl overflow-hidden border border-[#D5C9B3] shadow-xs relative">
              <MapContainer
                center={[church.lat, church.lng]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[church.lat, church.lng]} icon={churchDetailIcon}>
                  <Popup>
                    <div className="p-1 font-serif text-center">
                      <div className="font-bold text-xs text-[#0B3B2B]">{church.nameEnglish}</div>
                      <div className="text-[10px] text-[#855B09] font-geez">{church.nameAmharic}</div>
                      <div className="text-[10px] text-stone-500">{church.address}</div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

        </section>


        {/* ── ROW 4: GALLERY ────────────────────────────────────────── */}
        <section className="space-y-4 pb-10 border-b border-[#E7DFD1]">
          <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
            GALLERY
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryImage(photo.url)}
                className="group relative h-40 rounded-xl overflow-hidden border border-[#D5C9B3] shadow-2xs cursor-pointer bg-white"
              >
                <img
                  src={photo.url}
                  alt={photo.captionEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-white text-[10px] font-sans font-medium line-clamp-1">
                    {photo.captionEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ── ROW 5: UPCOMING EVENTS & 4 KEY STATS BOX ─────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Upcoming Events */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-[0.2em] text-[#855B09] uppercase">
              UPCOMING EVENTS
            </h3>

            <div className="space-y-3 pt-1">
              {upcomingEvents.map((evt, idx) => (
                <div key={idx} className="flex items-start gap-4 py-2 border-b border-[#E7DFD1] last:border-0">
                  <div className="text-xs font-mono font-bold text-[#855B09] w-24 shrink-0 pt-0.5">
                    {evt.date}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#2C1D07]">
                      {evt.titleEn}
                    </h4>
                    <p className="text-xs text-[#855B09] font-geez">
                      {evt.titleAm}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 4 Key Metric Stat Cards in Soft Rounded Box (1:1 with Design) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#E7DFD1] rounded-3xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center shadow-xs">
              
              {/* Stat 1: Founded */}
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FFF8E7] text-[#855B09] mx-auto flex items-center justify-center">
                  <ChurchIcon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0B3B2B]">1941</div>
                <div className="text-[10px] sm:text-xs text-[#7A6B56] font-sans font-medium">Founded</div>
              </div>

              {/* Stat 2: Clergy Members */}
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FFF8E7] text-[#855B09] mx-auto flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0B3B2B]">12</div>
                <div className="text-[10px] sm:text-xs text-[#7A6B56] font-sans font-medium">Clergy Members</div>
              </div>

              {/* Stat 3: Services / Week */}
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FFF8E7] text-[#855B09] mx-auto flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0B3B2B]">28+</div>
                <div className="text-[10px] sm:text-xs text-[#7A6B56] font-sans font-medium">Services / Week</div>
              </div>

              {/* Stat 4: Faithful Community */}
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FFF8E7] text-[#855B09] mx-auto flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0B3B2B]">45K+</div>
                <div className="text-[10px] sm:text-xs text-[#7A6B56] font-sans font-medium">Faithful Community</div>
              </div>

            </div>
          </div>

        </section>

      </main>


      {/* ── MODAL 1: FULL HISTORY MODAL ───────────────────────────── */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border-2 border-[#C8A84B] rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fadeIn">
            <div className="bg-[#0B3B2B] text-white p-6 flex items-center justify-between border-b border-[#C8A84B]/40">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5C158] font-mono font-bold">Chronicle & Heritage</span>
                <h3 className="text-xl font-bold font-serif">{church.nameEnglish} History</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm font-sans text-[#4A3B22] leading-relaxed">
              <p>
                Founded under the reign of Emperor Haile Selassie I and consecrated by the Holy Synod of the Ethiopian Orthodox Tewahedo Church, {church.nameEnglish} has stood as a monumental sanctuary of prayer, royal commemoration, and national spiritual assembly.
              </p>
              <p>
                The cathedral's architecture incorporates grand neo-baroque domes harmonized with traditional Axumite motifs, featuring stained glass masterpieces by renowned Ethiopian master painter Maitre Afewerk Tekle.
              </p>
              <p>
                Throughout the decades, the cathedral has maintained unbroken Eucharistic cycles, served as the site of patriarchal enthronements, and housed generations of monastic clergy committed to Saint Yared's sacred liturgical chant.
              </p>
            </div>
          </div>
        </div>
      )}


      {/* ── MODAL 2: FULL-SIZE GALLERY VIEWER ──────────────────────── */}
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#E5C158] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedGalleryImage}
              alt="Full size view"
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default ChurchDetailView;
