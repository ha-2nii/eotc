import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Church, 
  BookOpen, 
  Users, 
  Landmark, 
  Check, 
  X,
  Search,
  ShieldCheck,
  Award
} from 'lucide-react';
import type { DioceseListing } from '../../data/allDioceses';
import { useLanguage } from '../layout/LanguageContext';

interface DioceseDetailViewProps {
  diocese: DioceseListing;
  onBack: () => void;
}

export const DioceseDetailView: React.FC<DioceseDetailViewProps> = ({ diocese, onBack }) => {
  const { setActiveView } = useLanguage();
  const [contactSuccess, setContactSuccess] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBishopBioModal, setShowBishopBioModal] = useState(false);
  
  // Interactive Modals
  const [showChurchesModal, setShowChurchesModal] = useState(false);
  const [showMonasteriesModal, setShowMonasteriesModal] = useState(false);
  const [showCathedralModal, setShowCathedralModal] = useState(false);
  const [churchSearch, setChurchSearch] = useState('');

  // Check if bishop is the Patriarch (Addis Ababa diocese or Catholicos Patriarch title)
  const isPatriarchBishop = 
    diocese.id === 'addis-ababa' || 
    diocese.bishop.toLowerCase().includes('patriarch') ||
    diocese.bishop.toLowerCase().includes('abune mathias');

  const isNorthGondar = diocese.id === 'north-gondar';
  const isAddisAbaba = diocese.id === 'addis-ababa';
  const isAxum = diocese.id === 'axum' || diocese.nameEnglish.toLowerCase().includes('axum');

  // Navigation handlers for Biography & Pastoral Messages
  const handleViewBiography = () => {
    if (isPatriarchBishop) {
      setActiveView('our-church/patriarch');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('patriarch-bio')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      setShowBishopBioModal(true);
    }
  };

  // Dynamic Hero Image
  const heroImage = isAxum
    ? '/assets/images/axum_tsion.jpg'
    : isNorthGondar 
    ? '/assets/images/gondar_debre_birhan.jpg'
    : isAddisAbaba
    ? '/assets/images/holy_trinity_interior.jpg'
    : '/assets/images/our_church_hero_cathedral.jpg';

  const cathedralInterior = isAxum
    ? '/assets/images/axum_tsion.jpg'
    : isNorthGondar
    ? '/assets/images/gondar_debre_birhan.jpg'
    : isAddisAbaba
    ? '/assets/images/holy_trinity_interior.jpg'
    : '/assets/images/our_church_hero_cathedral.jpg';

  // Believers calculation estimate based on parishes
  const estimatedBelievers = isAxum
    ? '1.9K+'
    : isNorthGondar 
    ? '2.4M+' 
    : isAddisAbaba 
    ? '3.8M+' 
    : `${(diocese.parishesCount * 0.012).toFixed(1)}M+`;

  const priestsCount = isAxum ? 920 : (diocese.parishesCount * 6 + 80);
  const deaconsCount = isAxum ? 2968 : (diocese.parishesCount * 18 + 420);
  const sundaySchoolsCount = isAxum ? 119 : Math.round(diocese.parishesCount * 0.85);

  // Clean title for Diocese
  const dioceseNameClean = diocese.nameEnglish.replace('Diocese of ', '').replace('Archdiocese of ', '');
  const bishopNameClean = diocese.bishop
    .replace('His Holiness Catholicos Patriarch ', '')
    .replace('His Eminence Archbishop ', '')
    .replace('His Grace Bishop ', '');

  // Sample churches list tailored
  const churchesList = isAxum ? [
    { name: 'Cathedral of St. Mary of Zion', location: 'Axum', amharic: 'ርእሰ አድባራት ቅድስት ማርያም ጽዮን', established: '4th Century', type: 'Cathedral' },
    { name: 'St. Mary Church of Axum', location: 'Axum', amharic: 'ቅድስት ማርያም ቤተ ክርስቲያን', established: '4th Century', type: 'Parish' },
    { name: 'St. Gabriel Church', location: 'Adwa', amharic: 'ቅዱስ ገብርኤል ቤተ ክርስቲያን', established: '1896 AD', type: 'Parish' },
    { name: 'St. Michael Church', location: 'Wukro', amharic: 'ቅዱስ ሚካኤል ቤተ ክርስቲያን', established: '1920 AD', type: 'Parish' },
    { name: 'Holy Trinity Church', location: 'Mekelle', amharic: 'ቅድስት ሥላሴ ቤተ ክርስቲያን', established: '1940 AD', type: 'Parish' },
  ] : [
    { name: diocese.cathedral, location: diocese.seeCity, amharic: diocese.cathedralAmharic, established: diocese.established, type: 'Cathedral' },
    { name: `St. Mary Church of ${diocese.seeCity}`, location: isNorthGondar ? 'Debark' : `${diocese.seeCity} Central`, amharic: 'ቅድስት ማርያም ቤተ ክርስቲያን', established: '1935 AD', type: 'Parish' },
    { name: `St. Gabriel Church`, location: isNorthGondar ? 'Metema' : `${diocese.seeCity} West`, amharic: 'ቅዱስ ገብርኤል ቤተ ክርስቲያን', established: '1962 AD', type: 'Parish' },
    { name: `St. Michael Ancient Sanctuary`, location: isNorthGondar ? 'Dabat' : `${diocese.seeCity} North`, amharic: 'ቅዱስ ሚካኤል ጥንታዊ ደብር', established: '1892 AD', type: 'Historic Sanctuary' },
    { name: `Holy Trinity Church`, location: isNorthGondar ? 'Gondar' : `${diocese.seeCity} East`, amharic: 'ቅድስት ሥላሴ ቤተ ክርስቲያን', established: '1974 AD', type: 'Parish' },
  ];

  // Sample monasteries list tailored
  const monasteriesList = isAxum ? [
    { name: 'Debre Damo Monastery', location: 'Debre Damo', founded: '6th Century', monks: 120, abbot: 'Abba Aregawi' },
    { name: 'Wukro Cherkos Monastery', location: 'Wukro', founded: '4th Century', monks: 45, abbot: 'Abba Yohannes' },
    { name: 'Abune Yemata Guh Monastery', location: 'Gheralta', founded: '6th Century', monks: 32, abbot: 'Abba Yemata' },
    { name: 'Qolqa Monastery', location: 'Axum Region', founded: '14th Century', monks: 28, abbot: 'Abba Tekle' },
    { name: 'May Tsebri Monastery', location: 'May Tsebri', founded: '16th Century', monks: 36, abbot: 'Abba Gebre Krestos' },
  ] : [
    { name: isNorthGondar ? 'Debre Tabor Monastery' : 'Debre Libanos Branch Monastery', location: isNorthGondar ? 'Debre Tabor' : diocese.seeCity, founded: '14th Century', monks: 85, abbot: 'Abba Yohannes' },
    { name: isNorthGondar ? 'Wegera Monastery' : 'Debre Medhane Alem Monastery', location: isNorthGondar ? 'Dabat' : 'Highlands', founded: '15th Century', monks: 64, abbot: 'Abba Gebre Meskel' },
    { name: isNorthGondar ? 'Dengelat Monastery' : 'Abune Tekle Haymanot Monastery', location: isNorthGondar ? 'Gondar' : diocese.seeCity, founded: '16th Century', monks: 48, abbot: 'Abba Tekle' },
    { name: isNorthGondar ? 'Kuskuam Monastery' : 'Debre Tsion Monastery', location: isNorthGondar ? 'Metema' : 'Mountain Sanctuary', founded: '18th Century', monks: 52, abbot: 'Abba Estifanos' },
    { name: isNorthGondar ? 'Qusquam Sanctuary' : 'Debre Damo Hermitage', location: isNorthGondar ? 'Debark' : 'Valley See', founded: '1730 AD', monks: 40, abbot: 'Abba Meqarios' },
  ];

  // Territory zones tailored
  const territoryZones = isAxum ? [
    'Tigray Region',
    'Semenawi Keyih Bahri',
    'Central Zone',
    'Western Zone',
    'Eastern Zone',
    'Southern Zone'
  ] : [
    diocese.region,
    `${diocese.seeCity} Metropolitan`,
    diocese.administrativeZone,
    'Highland Deanery',
    'Western Deanery',
    'Eastern Deanery'
  ];

  const filteredChurches = churchesList.filter(c => 
    c.name.toLowerCase().includes(churchSearch.toLowerCase()) || 
    c.location.toLowerCase().includes(churchSearch.toLowerCase()) ||
    c.amharic.includes(churchSearch)
  );

  return (
    <div className="bg-[#FAF7F2] text-[#2C1D07] min-h-screen font-serif antialiased pb-20 selection:bg-[#EAE0D0] selection:text-[#0B3B2B]">

      {/* ═══════════════════════════════════════════════════════════════
          1. BREADCRUMBS BAR (Clean & Minimalist)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs font-sans text-[#8C7B65]">
          <button onClick={onBack} className="hover:text-[#855B09] transition-colors cursor-pointer">Home</button>
          <span>›</span>
          <button onClick={onBack} className="hover:text-[#855B09] transition-colors cursor-pointer">Dioceses</button>
          <span>›</span>
          <span className="text-[#855B09] font-medium truncate">{diocese.nameEnglish}</span>
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════════════════
          2. HERO SECTION & INTEGRATED SEAMLESS CATHEDRAL BLEND
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 pb-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Title, Geez, Description & Metrics */}
          <div className="lg:col-span-7 space-y-5 z-10">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#1C1814] tracking-tight leading-[1.1]">
                {diocese.nameEnglish}
              </h1>
              <div className="text-xl sm:text-2xl font-geez font-semibold text-[#855B09]">
                {diocese.nameAmharic}
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#5A4B35] font-sans leading-relaxed max-w-2xl">
              {diocese.description || `The ${diocese.nameEnglish} is one of the holiest and most historically significant archdioceses in the Ethiopian Orthodox Tewahedo Church. It is the spiritual center of the ancient Axumite civilization.`}
            </p>

            {/* ═══════════════════════════════════════════════════════════════
                3. CARD-FREE STATS ROW (Delicate hairline separators)
                ═══════════════════════════════════════════════════════════════ */}
            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-y-4 gap-x-2 sm:gap-x-4 border-t border-b border-[#E7DFD1] py-4 text-xs font-sans">
                
                {/* Churches */}
                <div className="flex items-center gap-2.5 pr-3 sm:pr-5 border-r border-[#E7DFD1] last:border-r-0">
                  <Church className="w-5 h-5 text-[#855B09] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-base sm:text-lg font-bold text-[#1C1814] font-serif leading-none">
                      {diocese.parishesCount}
                    </div>
                    <div className="text-[11px] text-[#7A6B56] mt-0.5">Churches</div>
                  </div>
                </div>

                {/* Monasteries */}
                <div className="flex items-center gap-2.5 pr-3 sm:pr-5 border-r border-[#E7DFD1] last:border-r-0">
                  <Landmark className="w-5 h-5 text-[#855B09] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-base sm:text-lg font-bold text-[#1C1814] font-serif leading-none">
                      {diocese.monasteriesCount}
                    </div>
                    <div className="text-[11px] text-[#7A6B56] mt-0.5">Monasteries</div>
                  </div>
                </div>

                {/* Priests */}
                <div className="flex items-center gap-2.5 pr-3 sm:pr-5 border-r border-[#E7DFD1] last:border-r-0">
                  <Users className="w-5 h-5 text-[#855B09] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-base sm:text-lg font-bold text-[#1C1814] font-serif leading-none">
                      {priestsCount.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[#7A6B56] mt-0.5">Priests</div>
                  </div>
                </div>

                {/* Deacons */}
                <div className="flex items-center gap-2.5 pr-3 sm:pr-5 border-r border-[#E7DFD1] last:border-r-0">
                  <Users className="w-5 h-5 text-[#855B09] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-base sm:text-lg font-bold text-[#1C1814] font-serif leading-none">
                      {deaconsCount.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[#7A6B56] mt-0.5">Deacons</div>
                  </div>
                </div>

                {/* Sunday Schools */}
                <div className="flex items-center gap-2.5 pr-3 sm:pr-5 border-r border-[#E7DFD1] last:border-r-0">
                  <BookOpen className="w-5 h-5 text-[#855B09] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-base sm:text-lg font-bold text-[#1C1814] font-serif leading-none">
                      {sundaySchoolsCount}
                    </div>
                    <div className="text-[11px] text-[#7A6B56] mt-0.5">Sunday Schools</div>
                  </div>
                </div>

                {/* Members / Believers */}
                <div className="flex items-center gap-2.5 pr-2">
                  <Users className="w-5 h-5 text-[#855B09] shrink-0" strokeWidth={1.5} />
                  <div>
                    <div className="text-base sm:text-lg font-bold text-[#1C1814] font-serif leading-none">
                      {estimatedBelievers}
                    </div>
                    <div className="text-[11px] text-[#7A6B56] mt-0.5">Members</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Seamless Cathedral Blend Hero Image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] h-[280px] sm:h-[340px] lg:h-[380px] overflow-hidden rounded-2xl">
              <img 
                src={heroImage} 
                alt={diocese.nameEnglish} 
                className="w-full h-full object-cover object-center shadow-xs"
              />
              {/* Soft Gradient Vapour Blends */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#FAF7F2]/10 to-[#FAF7F2]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent opacity-80" />
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          4. MAIN EDITORIAL CONTENT GRID (Free from cards)
          ═══════════════════════════════════════════════════════════════ */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: About the Diocese, Archbishop & Churches List
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* About the Diocese */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1814]">
                About the Diocese
              </h2>
              
              <div className="text-sm text-[#4A3B22] font-sans leading-relaxed space-y-3">
                <p>
                  The {diocese.nameEnglish} is one of the oldest sees in Christianity, established in {diocese.established}. It played a central role in the spread of Christianity in Ethiopia and the development of the nation's spiritual and cultural heritage. The archdiocese oversees churches, monasteries, and spiritual communities in the northern region.
                </p>
              </div>

              {/* Archbishop Section */}
              <div className="pt-6 space-y-3">
                <h3 className="text-base font-bold font-serif text-[#1C1814]">
                  Archbishop
                </h3>

                <div className="flex items-center gap-4">
                  {/* Portrait Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[#D5C9B3] shrink-0 bg-[#0B3B2B] shadow-2xs">
                    <img 
                      src="/assets/images/patriarch_hero.png" 
                      alt={diocese.bishop} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="font-bold text-base font-serif text-[#1C1814]">
                      {bishopNameClean}
                    </div>
                    <div className="text-xs text-[#7A6B56] font-sans">
                      Archbishop of {dioceseNameClean}
                    </div>
                    <button 
                      onClick={handleViewBiography}
                      className="text-xs text-[#855B09] hover:text-[#5B3E06] font-sans font-medium flex items-center gap-1 group transition-colors pt-0.5 cursor-pointer"
                    >
                      <span>View Biography</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                </div>

                {/* Inline Meta Chips */}
                <div className="flex flex-wrap items-center gap-6 text-xs font-sans text-[#7A6B56] pt-2">
                  <div className="flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-[#855B09]" strokeWidth={1.5} />
                    <span>Established</span>
                    <span className="font-medium text-[#1C1814]">{diocese.established}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#855B09]" strokeWidth={1.5} />
                    <span>Headquarters</span>
                    <span className="font-medium text-[#1C1814]">{diocese.seeCity}, {diocese.region.replace(' Region', '')}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Churches Section */}
            <section className="space-y-4 pt-4 border-t border-[#E7DFD1]">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1814]">
                Churches
              </h2>

              {/* Minimalist Church Table */}
              <div className="w-full text-xs font-sans">
                {/* Table Header */}
                <div className="flex items-center justify-between text-[#8C7B65] font-medium pb-2 border-b border-[#E7DFD1]">
                  <span>Church Name</span>
                  <span>Location</span>
                </div>

                {/* Church Rows */}
                <div className="divide-y divide-[#EFE7DA]">
                  {churchesList.map((church, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between group">
                      <div className="flex items-center gap-2.5 min-w-0 pr-4">
                        <Church className="w-4 h-4 text-[#855B09] shrink-0" strokeWidth={1.5} />
                        <span className="font-medium text-[#2C1D07] truncate group-hover:text-[#855B09] transition-colors">
                          {church.name}
                        </span>
                      </div>
                      <span className="text-[#7A6B56] shrink-0">{church.location}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View all churches link */}
              <div className="pt-2">
                <button 
                  onClick={() => setShowChurchesModal(true)}
                  className="text-xs text-[#855B09] hover:text-[#5B3E06] font-sans font-medium flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  <span>View all churches</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
            </section>

          </div>


          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: Territory Coverage, Major Monasteries & Cathedral
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Territory Coverage */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1814]">
                Territory Coverage
              </h2>

              {/* Territory Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs font-sans text-[#4A3B22]">
                {territoryZones.map((zone, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#855B09] shrink-0" strokeWidth={1.5} />
                    <span className="truncate">{zone}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Major Monasteries */}
            <section className="space-y-4 pt-4 border-t border-[#E7DFD1]">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1814]">
                Major Monasteries
              </h2>

              {/* 2-Column Monasteries Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs font-sans text-[#4A3B22]">
                {monasteriesList.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <Landmark className="w-4 h-4 text-[#855B09] shrink-0" strokeWidth={1.5} />
                    <span className="font-medium text-[#2C1D07] truncate group-hover:text-[#855B09] transition-colors">
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* View all monasteries link */}
              <div className="pt-2">
                <button 
                  onClick={() => setShowMonasteriesModal(true)}
                  className="text-xs text-[#855B09] hover:text-[#5B3E06] font-sans font-medium flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  <span>View all monasteries</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
            </section>

            {/* About the Cathedral */}
            <section className="space-y-4 pt-4 border-t border-[#E7DFD1]">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C1814]">
                About the Cathedral
              </h2>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Cathedral Thumbnail */}
                <div 
                  onClick={() => setShowCathedralModal(true)}
                  className="w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0 border border-[#E7DFD1] shadow-2xs group cursor-pointer relative"
                >
                  <img 
                    src={cathedralInterior} 
                    alt={diocese.cathedral} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Cathedral Details */}
                <div className="space-y-3 min-w-0">
                  <div>
                    <h3 className="font-bold text-base font-serif text-[#1C1814]">
                      {diocese.cathedral}
                    </h3>
                    <p className="text-xs text-[#5A4B35] font-sans leading-relaxed mt-1">
                      The {diocese.cathedral} is the mother church of the diocese and one of the most sacred places in Ethiopia. It houses many spiritual treasures and relics and is a major pilgrimage site for the faithful.
                    </p>
                  </div>

                  {/* Cathedral Metadata List */}
                  <div className="space-y-1.5 text-xs font-sans text-[#5A4B35] pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#855B09] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span><strong>Location:</strong> {diocese.seeCity}, {diocese.region.replace(' Region', '')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#855B09] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span><strong>Founded:</strong> {diocese.established}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#855B09] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span><strong>Feast Day:</strong> {isAxum ? 'November 30 (St. Mary of Zion)' : 'Seasonal Major Feast'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Award className="w-3.5 h-3.5 text-[#855B09] shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span><strong>Significance:</strong> Seat of the Archdiocese and spiritual center of Northern Ethiopia</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>


      {/* ═══════════════════════════════════════════════════════════════
          5. INTERACTIVE MODALS FOR FULL DIRECTORIES
          ═══════════════════════════════════════════════════════════════ */}

      {/* Modal 1: Complete Churches Directory */}
      {showChurchesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border-2 border-[#C8A84B] rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fadeIn">
            <div className="bg-[#0B3B2B] text-white p-6 flex items-center justify-between border-b border-[#C8A84B]/40">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5C158] font-mono font-bold">Ecclesiastical Parish Registry</span>
                <h3 className="text-xl font-bold font-serif">{diocese.nameEnglish} — Registered Parishes</h3>
              </div>
              <button onClick={() => setShowChurchesModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-[#E2D8C7] bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-[#855B09] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search parishes by name or district..."
                  value={churchSearch}
                  onChange={(e) => setChurchSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-[#D5C9B3] rounded-xl text-xs text-[#2C1D07] font-sans focus:outline-none focus:border-[#0B3B2B]"
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {filteredChurches.map((church, idx) => (
                <div key={idx} className="bg-white border border-[#E2D8C7] p-4 rounded-xl flex items-center justify-between shadow-2xs hover:border-[#855B09] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0B3B2B] font-serif">{church.name}</span>
                      <span className="text-[10px] bg-[#EAE2D2] text-[#6B5A40] font-semibold px-2 py-0.5 rounded-full">{church.type}</span>
                    </div>
                    <div className="text-xs font-geez text-[#855B09]">{church.amharic}</div>
                    <div className="text-[11px] text-[#6B5A40] flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-[#C8A84B]" />
                      <span>{church.location}</span>
                      <span className="mx-1.5">·</span>
                      <span>Est. {church.established}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#855B09] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E2D8C7]">
                    Active Parish
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Monasteries Directory */}
      {showMonasteriesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border-2 border-[#C8A84B] rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fadeIn">
            <div className="bg-[#0B3B2B] text-white p-6 flex items-center justify-between border-b border-[#C8A84B]/40">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5C158] font-mono font-bold">Monastic Heritage Sanctuary</span>
                <h3 className="text-xl font-bold font-serif">{diocese.nameEnglish} — Historic Monasteries</h3>
              </div>
              <button onClick={() => setShowMonasteriesModal(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {monasteriesList.map((m, idx) => (
                <div key={idx} className="bg-white border border-[#E2D8C7] p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-[#0B3B2B] font-serif">{m.name}</span>
                      <span className="text-[10px] bg-[#EAE2D2] text-[#855B09] font-bold px-2 py-0.5 rounded-full font-mono">Founded {m.founded}</span>
                    </div>
                    <p className="text-xs text-[#6B5A40] font-sans">
                      Preserved under the stewardship of Abbot {m.abbot}, hosting manuscript scriptoriums and sacred monastic brotherhoods.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-[#855B09] pt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {m.location}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {m.monks} Resident Monks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Cathedral Architecture & Liturgy Dossier */}
      {showCathedralModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border-2 border-[#C8A84B] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-fadeIn">
            <div className="relative aspect-16/9 overflow-hidden bg-[#07241B]">
              <img src={cathedralInterior} alt={diocese.cathedral} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07241B] via-transparent to-transparent" />
              <button onClick={() => setShowCathedralModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono text-[#E5C158] uppercase font-bold tracking-wider">Episcopal Cathedral Chancellery</span>
                <h3 className="text-2xl font-bold font-serif">{diocese.cathedral}</h3>
                <div className="text-sm font-geez text-[#E5C158]">{diocese.cathedralAmharic}</div>
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs font-sans text-[#4A3B22] leading-relaxed">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl border border-[#E2D8C7]">
                  <Calendar className="w-4 h-4 text-[#855B09] mx-auto mb-1" />
                  <div className="font-bold text-[#0B3B2B]">Est. {diocese.established}</div>
                  <div className="text-[10px] text-[#6B5A40]">Consecration</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E2D8C7]">
                  <Clock className="w-4 h-4 text-[#855B09] mx-auto mb-1" />
                  <div className="font-bold text-[#0B3B2B]">6:00 AM – 6:00 PM</div>
                  <div className="text-[10px] text-[#6B5A40]">Daily Liturgy</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E2D8C7]">
                  <MapPin className="w-4 h-4 text-[#855B09] mx-auto mb-1" />
                  <div className="font-bold text-[#0B3B2B]">{diocese.seeCity}</div>
                  <div className="text-[10px] text-[#6B5A40]">Principal See</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#0B3B2B] font-serif">Historical & Liturgical Architecture</h4>
                <p>
                  As the primary cathedral of the diocese, this sanctuary is home to world-renowned iconography, ancient processional liturgical crosses, and the episcopal throne of the presiding hierarch.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2D8C7] flex justify-end">
                <button onClick={() => setShowCathedralModal(false)} className="px-5 py-2 bg-[#0B3B2B] text-white rounded-xl font-bold cursor-pointer">
                  Close Cathedral Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Bishop Biography */}
      {showBishopBioModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#C8A84B] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between border-b border-[#E2D8C7] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#855B09] tracking-wider font-mono">Episcopal Biography</span>
                <h3 className="font-bold text-lg text-[#0B3B2B] font-serif">{diocese.bishop}</h3>
                <div className="text-xs font-geez text-[#855B09]">{diocese.bishopAmharic}</div>
              </div>
              <button onClick={() => setShowBishopBioModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#4A3B22] font-sans leading-relaxed">
              <p>
                Consecrated by the Holy Synod, {diocese.bishop} has shepherded the faithful across the {dioceseNameClean} jurisdiction with steadfast devotion to Orthodox dogma, apostolic tradition, and spiritual renewal.
              </p>
              <p>
                Under his leadership, the diocese has established dozens of new Sunday schools, revitalized historic monastic libraries, and advanced youth catechism in liturgical Geez and local languages.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E2D8C7] flex justify-end">
              <button
                onClick={() => setShowBishopBioModal(false)}
                className="px-5 py-2 bg-[#0B3B2B] text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                Close Biography
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#C8A84B] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E2D8C7] pb-3">
              <h3 className="font-bold text-base text-[#0B3B2B] font-serif">Contact {diocese.nameEnglish}</h3>
              <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-black cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactSuccess ? (
              <div className="p-4 bg-[#EAF5EF] border border-[#A7D7B9] rounded-xl text-center space-y-2">
                <Check className="w-8 h-8 text-[#0B3B2B] mx-auto" />
                <p className="text-sm font-bold text-[#0B3B2B]">Message Sent Successfully</p>
                <p className="text-xs text-[#4A3B22]">The diocesan chancery will review your inquiry.</p>
                <button
                  onClick={() => {
                    setContactSuccess(false);
                    setShowContactModal(false);
                  }}
                  className="mt-2 px-4 py-1.5 bg-[#0B3B2B] text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSuccess(true);
                }}
                className="space-y-3 text-xs font-sans"
              >
                <div>
                  <label className="font-bold text-[#2C1D07] block mb-1">Your Full Name</label>
                  <input required type="text" placeholder="Abebe Bikila" className="w-full px-3 py-2 border border-[#D5C9B3] rounded-lg focus:outline-none focus:border-[#0B3B2B]" />
                </div>
                <div>
                  <label className="font-bold text-[#2C1D07] block mb-1">Email / Phone</label>
                  <input required type="text" placeholder="email@example.com or +251 9..." className="w-full px-3 py-2 border border-[#D5C9B3] rounded-lg focus:outline-none focus:border-[#0B3B2B]" />
                </div>
                <div>
                  <label className="font-bold text-[#2C1D07] block mb-1">Subject / Inquiry</label>
                  <input required type="text" placeholder="Pastoral or administrative inquiry..." className="w-full px-3 py-2 border border-[#D5C9B3] rounded-lg focus:outline-none focus:border-[#0B3B2B]" />
                </div>
                <div>
                  <label className="font-bold text-[#2C1D07] block mb-1">Message</label>
                  <textarea rows={3} placeholder="Write your message here..." className="w-full px-3 py-2 border border-[#D5C9B3] rounded-lg focus:outline-none focus:border-[#0B3B2B]" />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 border border-[#D5C9B3] rounded-xl text-[#6B5A40] hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0B3B2B] hover:bg-[#07241B] text-white rounded-xl font-bold cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default DioceseDetailView;
