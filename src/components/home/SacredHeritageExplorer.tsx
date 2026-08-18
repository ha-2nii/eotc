import React, { useState } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import {
  Church,
  Search,
  Heart,
  Bookmark,
  ChevronRight,
  MapPin,
  Send,
  Camera,
  Sun,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface SanctuaryHeritage {
  id: string;
  nameEn: string;
  nameAm: string;
  regionEn: string;
  regionAm: string;
  country: string;
  flag: string;
  categoryEn: string;
  categoryAm: string;
  descriptionEn: string;
  descriptionAm: string;
  weatherOrAltitudeEn: string;
  weatherOrAltitudeAm: string;
  image: string;
  specificSiteEn: string;
  specificSiteAm: string;
  addressEn: string;
  addressAm: string;
  rightActionType: 'bookmark' | 'camera' | 'heritage' | 'parish';
}

const SANCTUARIES: SanctuaryHeritage[] = [
  {
    id: 'lalibela',
    nameEn: 'Lalibela',
    nameAm: 'ላሊበላ',
    regionEn: 'Lasta, Wollo',
    regionAm: 'ላስታ፣ ወሎ',
    country: 'Ethiopia',
    flag: '🇪🇹',
    categoryEn: 'UNESCO World Heritage',
    categoryAm: 'የዓለም ቅርስ ገዳም',
    descriptionEn:
      'Home to the iconic 12th-century monolithic rock-hewn cross churches carved from solid volcanic rock, an ancient holy wonder of living Christian devotion and architectural marvel.',
    descriptionAm:
      'በ12ኛው መቶ ክፍለ ዘመን በቅዱስ ላሊበላ ከአንድ ወጥ አለት የተቀረጹ አስደናቂ ፲፩ አብያተ ክርስቲያናት የሚገኙበት ቅዱስ ስፍራ።',
    weatherOrAltitudeEn: '2,630m Alt • High Plateau',
    weatherOrAltitudeAm: '፪ሺ፮፻፴ ሜትር ከፍታ • ጸሐያማ',
    image: '/assets/images/lalibela_monastery.png',
    specificSiteEn: 'Bete Giyorgis (St. George)',
    specificSiteAm: 'ቤተ ጊዮርጊስ (ቅዱስ ጊዮርጊስ)',
    addressEn: 'Rohas Sacred Monolithic Complex, Lalibela',
    addressAm: 'ሮሃ ቅዱስ የአለት ሕንፃዎች ውስብስብ፣ ላሊበላ',
    rightActionType: 'bookmark',
  },
  {
    id: 'trinity',
    nameEn: 'Addis Ababa',
    nameAm: 'አዲስ አበባ',
    regionEn: 'Arat Kilo, Shewa',
    regionAm: 'አራት ኪሎ፣ ሸዋ',
    country: 'Ethiopia',
    flag: '🇪🇹',
    categoryEn: 'Patriarchal Cathedral',
    categoryAm: 'መንበረ ፓትርያርክ ካቴድራል',
    descriptionEn:
      'The sacred supreme seat of the Ethiopian Orthodox Tewahedo Church Patriarchate, celebrated for its imperial architecture, majestic stained glass, and historic spiritual legacy.',
    descriptionAm:
      'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ መንበረ ፓትርያርክ ማዕከል፣ በታላቅ ታሪካዊና መንፈሳዊ ቅርሱ እንዲሁም ልዩ የሕንፃ ጥበቡ የሚታወቀው ታላቁ ካቴድራል',
    weatherOrAltitudeEn: '2,355m Alt • Holy See',
    weatherOrAltitudeAm: '፪ሺ፫፻፶፭ ሜትር ከፍታ • መንበረ ጸባዖት',
    image: '/assets/images/hero_church.jpg',
    specificSiteEn: 'Holy Trinity Cathedral',
    specificSiteAm: 'መንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል',
    addressEn: 'Arat Kilo, Addis Ababa Diocese',
    addressAm: 'አራት ኪሎ፣ አዲስ አበባ ሀገረ ስብከት',
    rightActionType: 'heritage',
  },
  {
    id: 'axum',
    nameEn: 'Axum Tsion',
    nameAm: 'አክሱም ጽዮን',
    regionEn: 'Axum, Tigray',
    regionAm: 'አክሱም፣ ትግራይ',
    country: 'Ethiopia',
    flag: '🇪🇹',
    categoryEn: 'Ark of the Covenant Seat',
    categoryAm: 'የታቦተ ጽዮን ማደሪያ',
    descriptionEn:
      'The holiest mother sanctuary of Ethiopian Christianity founded in the 4th century by King Ezana, permanent sanctuary of the sacred Tabote Tsion (Ark of the Covenant).',
    descriptionAm:
      'በ4ኛው መቶ ክፍለ ዘመን የተመሠረተችው የኢትዮጵያ አብያተ ክርስቲያናት እናትና የታቦተ ጽዮን ዘላለማዊ ማደሪያ ቅድስት ሥፍራ።',
    weatherOrAltitudeEn: '2,131m Alt • Ancient Holy City',
    weatherOrAltitudeAm: '፪ሺ፩፻፴፩ ሜትር • ጥንታዊቷ ቅድስት ከተማ',
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=1200',
    specificSiteEn: 'St. Mary of Tsion Cathedral',
    specificSiteAm: 'ርእሰ አድባራት ቅድስት ማርያም ጽዮን',
    addressEn: 'Axum Sacred Precincts, Tigray',
    addressAm: 'አክሱም ቅዱስ ቅጥር ግቢ፣ ትግራይ',
    rightActionType: 'camera',
  },
  {
    id: 'debre-damo',
    nameEn: 'Debre Damo',
    nameAm: 'ደብረ ዳሞ',
    regionEn: 'Adigrat, Tigray',
    regionAm: 'ዓዲግራት፣ ትግራይ',
    country: 'Ethiopia',
    flag: '🇪🇹',
    categoryEn: '6th-Century Clifftop Monastery',
    categoryAm: 'የ፮ኛው መቶ ክፍለ ዘመን ገዳም',
    descriptionEn:
      'Founded in the 6th century by Abuna Aregawi of the Nine Saints atop a sheer perpendicular mesa cliff, accessible exclusively via a 15-meter climbing leather rope.',
    descriptionAm:
      'በ6ኛው መቶ ክፍለ ዘመን በተሰዓቱ ቅዱሳን አንዱ በሆኑት በአቡነ አረጋዊ የተመሠረተና በ15 ሜትር የቆዳ ገመድ ብቻ የሚወጣበት ታላቅ ገዳም።',
    weatherOrAltitudeEn: '2,211m Alt • Cliff Sanctuary',
    weatherOrAltitudeAm: '፪ሺ፪፻፲፩ ሜትር • የአምባ ገዳም',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
    specificSiteEn: 'Abuna Aregawi Sanctuary',
    specificSiteAm: 'ገዳመ አቡነ አረጋዊ',
    addressEn: 'Debre Damo Mountain Peak, Tigray',
    addressAm: 'ደብረ ዳሞ አምባ፣ ትግራይ',
    rightActionType: 'parish',
  },
  {
    id: 'lake-tana',
    nameEn: 'Lake Tana Isles',
    nameAm: 'ጣና ደሴታት',
    regionEn: 'Bahir Dar, Gojjam',
    regionAm: 'ባሕር ዳር፣ ጎጃም',
    country: 'Ethiopia',
    flag: '🇪🇹',
    categoryEn: '14th-Century Island Monastery',
    categoryAm: 'የደሴት ገዳማት ማዕከል',
    descriptionEn:
      'Famous for ancient island monasteries nestled in tranquil tropical waters, preserving sacred royal crowns, ancient illustrated Ge’ez manuscripts, and vibrant murals.',
    descriptionAm:
      'በጣና ሐይቅ ደሴቶች ላይ የሚገኙ ጥንታውያን ገዳማት፣ የነገሥታት አክሊላትና ያሸበረቁ ጥንታዊ የግዕዝ ብራናዎችን ያቀፉ ቅዱሳት ስፍራዎች።',
    weatherOrAltitudeEn: '1,788m Alt • Sacred Lake Haven',
    weatherOrAltitudeAm: '፩ሺ፯፻፹፰ ሜትር • የሐይቅ ገዳማት',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1200',
    specificSiteEn: 'Ura Kidane Mehret Monastery',
    specificSiteAm: 'ኡራ ኪዳነ ምሕረት ገዳም',
    addressEn: 'Zege Peninsula, Lake Tana, Bahir Dar',
    addressAm: 'ዝጌ ባሕረ ገብ፣ ጣና ሐይቅ፣ ባሕር ዳር',
    rightActionType: 'camera',
  },
];

export const SacredHeritageExplorer: React.FC = () => {
  const { language, setActiveView } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(SANCTUARIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['lalibela', 'axum']);

  const currentSanctuary = SANCTUARIES.find((s) => s.id === selectedId) || SANCTUARIES[0];

  const filteredSanctuaries = SANCTUARIES.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.nameEn.toLowerCase().includes(q) ||
      s.nameAm.includes(q) ||
      s.regionEn.toLowerCase().includes(q) ||
      s.specificSiteEn.toLowerCase().includes(q) ||
      s.categoryEn.toLowerCase().includes(q)
    );
  });

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#0c0d12] via-[#14151a] to-[#0c0d12] text-white py-14 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 relative overflow-hidden border-y border-white/10 shadow-2xl">
      {/* Subtle Ambient Gold / Amber Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C8A84B]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-[#c27852]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1700px] mx-auto space-y-8 lg:space-y-10 relative z-10">
        {/* ── Section Header Row ───────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          {/* Title & Eyebrow */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-[#C8A84B] font-extrabold text-xs uppercase tracking-widest bg-[#C8A84B]/10 px-3.5 py-1.5 rounded-full border border-[#C8A84B]/30">
              <Church className="w-4 h-4 text-[#C8A84B]" />
              <span>{language === 'en' ? 'Sacred Heritage Explorer' : 'የኢትዮጵያ ቅዱሳት መካናት ጉብኝት'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-geez tracking-tight">
              {language === 'en' ? 'Featured Historical Churches' : 'ታዋቂና ታሪካዊ አብያተ ክርስቲያናት'}
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-serif max-w-3xl">
              {language === 'en'
                ? 'Explore the holy seats and monolithic sanctuaries of the ancient Orthodox tradition'
                : 'የጥንታዊቷን ኦርቶዶክሳዊት ቤተ ክርስቲያን ታሪካዊ መንበሮችና ቅዱሳት መካናትን ይጎብኙ'}
            </p>
          </div>

          {/* Search Bar & Browse All Parishes CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="relative min-w-[280px] sm:min-w-[360px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                type="text"
                placeholder={
                  language === 'en'
                    ? 'Search sanctuaries, rock churches...'
                    : 'አብያተ ክርስቲያናት፣ ገዳማትን ይፈልጉ...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white/[0.08] hover:bg-white/[0.12] focus:bg-white/[0.15] border-white/15 focus-visible:border-[#C8A84B] rounded-full text-xs sm:text-sm text-white placeholder:text-stone-400 transition-colors shadow-inner"
              />
            </div>

            <Button
              onClick={() => setActiveView('find-a-church')}
              className="bg-gradient-to-r from-[#C8A84B] to-[#9E7F1E] hover:from-[#FFD700] hover:to-[#C8A84B] text-[#070F1E] font-bold text-xs sm:text-sm rounded-full px-6 py-2.5 shadow-lg transition-all"
            >
              <span>{language === 'en' ? 'Browse All Parishes' : 'ሁሉንም አብያተ ክርስቲያናት ይመልከቱ'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* ── Main Section Grid Layout (Hero 7 Cols, List 5 Cols) ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* ── Left Big Featured Hero Card (7 Cols) ───────────── */}
          <div className="lg:col-span-7 relative flex flex-col justify-between rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] shadow-2xl border border-white/15 group">
            
            {/* Background High-Res Image with Smooth Zoom */}
            <img
              src={currentSanctuary.image}
              alt={currentSanctuary.nameEn}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent pointer-events-none" />

            {/* Top Details Over Image */}
            <div className="relative z-10 p-5 sm:p-7 space-y-3">
              {/* Category Badge */}
              <Badge className="bg-black/55 backdrop-blur-md border border-white/20 text-[#f4e07b] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#C8A84B]" />
                {language === 'en' ? currentSanctuary.categoryEn : currentSanctuary.categoryAm}
              </Badge>

              {/* Title & Region */}
              <div>
                <h1 className="text-3xl sm:text-5xl font-black font-geez tracking-tight text-white drop-shadow-lg leading-none">
                  {language === 'en' ? currentSanctuary.nameEn : currentSanctuary.nameAm}
                </h1>
                <div className="flex items-center gap-2 text-stone-200 text-sm sm:text-base font-semibold mt-2 drop-shadow">
                  <span>
                    {language === 'en' ? currentSanctuary.regionEn : currentSanctuary.regionAm}, {currentSanctuary.country}
                  </span>
                  <span>{currentSanctuary.flag}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-serif max-w-lg drop-shadow line-clamp-3 sm:line-clamp-4">
                {language === 'en' ? currentSanctuary.descriptionEn : currentSanctuary.descriptionAm}
              </p>

              {/* Altitude / Weather Badge */}
              <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/15 px-3 py-1 rounded-xl text-stone-200 text-xs font-medium">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {language === 'en' ? currentSanctuary.weatherOrAltitudeEn : currentSanctuary.weatherOrAltitudeAm}
                </span>
              </div>
            </div>

            {/* Bottom Floating Frosted Glass Action Card Overlay */}
            <div className="relative z-10 p-3 sm:p-5 m-3 sm:m-4 bg-[#14151a]/85 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl flex items-center justify-between gap-3 shadow-2xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#c27852]/20 border border-[#c27852]/40 flex items-center justify-center text-[#f4e07b] shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8A84B]" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white font-geez truncate">
                    {language === 'en' ? currentSanctuary.specificSiteEn : currentSanctuary.specificSiteAm}
                  </h4>
                  <p className="text-[11px] text-stone-400 truncate">
                    {language === 'en' ? currentSanctuary.addressEn : currentSanctuary.addressAm}
                  </p>
                </div>
              </div>

              {/* Action Buttons in Overlay */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => toggleFavorite(currentSanctuary.id, e)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-all active:scale-95"
                  title="Favorite"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites.includes(currentSanctuary.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>

                <Button
                  onClick={() => setActiveView('find-a-church')}
                  className="bg-gradient-to-r from-[#c27852] to-[#995532] hover:from-[#d1845c] hover:to-[#aa603b] text-white font-bold text-xs h-9 sm:h-10 px-4 sm:px-5 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <span>{language === 'en' ? 'Explore' : 'ጎብኝ'}</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* ── Right Side Sanctuary List (5 Cols) ─────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            
            {/* List Header */}
            <div className="flex items-center justify-between pb-1 px-1">
              <h3 className="text-sm sm:text-base font-bold font-serif text-white tracking-wide flex items-center gap-2">
                <span>{language === 'en' ? 'Must-Visit Sanctuaries' : 'ተመራጭ ቅዱሳት መካናት'}</span>
                <span className="text-xs text-stone-400 font-mono">({filteredSanctuaries.length})</span>
              </h3>

              <button
                onClick={() => setActiveView('find-a-church')}
                className="flex items-center gap-1 bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-stone-200 hover:text-white transition-all"
              >
                <span>{language === 'en' ? 'View all' : 'ሁሉንም'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C8A84B]" />
              </button>
            </div>

            {/* Scrollable list of compact cards */}
            <div className="space-y-2.5 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
              {filteredSanctuaries.map((sanctuary) => {
                const isSelected = sanctuary.id === currentSanctuary.id;
                const isSaved = favorites.includes(sanctuary.id);

                return (
                  <div
                    key={sanctuary.id}
                    onClick={() => setSelectedId(sanctuary.id)}
                    className={`group/item flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'bg-white/[0.12] border-[#C8A84B]/60 shadow-lg scale-[1.01]'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Thumbnail + Title + Location */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-white/15 shadow-md">
                        <img
                          src={sanctuary.image}
                          alt={sanctuary.nameEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#C8A84B]/20 border-2 border-[#C8A84B] rounded-xl pointer-events-none" />
                        )}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <h4
                          className={`text-xs sm:text-sm font-bold font-geez truncate transition-colors ${
                            isSelected ? 'text-[#f4e07b]' : 'text-white group-hover/item:text-[#f4e07b]'
                          }`}
                        >
                          {language === 'en' ? sanctuary.specificSiteEn : sanctuary.specificSiteAm}
                        </h4>
                        <p className="text-[11px] text-stone-400 truncate">
                          {language === 'en' ? sanctuary.categoryEn : sanctuary.categoryAm}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-stone-400">
                          <MapPin className="w-3 h-3 text-[#C8A84B]" />
                          <span className="truncate">
                            {language === 'en' ? sanctuary.regionEn : sanctuary.regionAm}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Badge */}
                    <div className="pl-2 shrink-0">
                      <button
                        onClick={(e) => toggleFavorite(sanctuary.id, e)}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                          isSaved
                            ? 'bg-[#c27852]/25 border-[#c27852]/60 text-[#f4e07b]'
                            : 'bg-white/[0.05] hover:bg-white/[0.12] border-white/10 text-stone-400 hover:text-white'
                        }`}
                        title="Save Sanctuary"
                      >
                        {sanctuary.rightActionType === 'camera' ? (
                          <Camera className="w-4 h-4" />
                        ) : sanctuary.rightActionType === 'heritage' ? (
                          <Church className="w-4 h-4" />
                        ) : (
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom quick discovery hint */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 px-1 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {language === 'en' ? 'Interactive Parish Guide' : 'ቀጥታ የቅዱሳት መካናት መሪ'}
              </span>
              <button
                onClick={() => setActiveView('find-a-church')}
                className="text-[#C8A84B] hover:underline font-semibold"
              >
                {language === 'en' ? 'Open Full Map 🗺️' : 'ካርታውን ይመልከቱ 🗺️'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
