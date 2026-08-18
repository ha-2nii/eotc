import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../components/layout/LanguageContext';
import {
  MOCK_ANNOUNCEMENTS,
  MOCK_PAN_ORTHODOX_NEWS,
  MOCK_MAGAZINE_ISSUES,
  MOCK_NEWSLETTERS,
  type Announcement,
  type PanOrthodoxNewsItem,
  type MagazineIssue,
  type MagazineArticle,
  type NewsletterIssue,
} from '../data/mockNews';
import {
  Newspaper, Globe, BookOpen, Mail,
  CheckCircle, Search, Download,
  ArrowRight, Copy,
  Check, Sparkles,
  ShieldCheck, FileText,
  Send, Cross,
} from 'lucide-react';

export const NewsView: React.FC = () => {
  const { language, activeView } = useLanguage();

  /* ── Active Sub-section ── */
  type NewsSection = 'hub' | 'announcements' | 'pan-orthodox' | 'magazine' | 'newsletter';
  const [currentSection, setCurrentSection] = useState<NewsSection>('hub');

  /* ── Sync with activeView route ── */
  useEffect(() => {
    if (activeView === 'news') {
      setCurrentSection('hub');
    } else if (activeView === 'news/announcements' || activeView === 'news/eotc') {
      setCurrentSection('announcements');
    } else if (activeView === 'news/pan-orthodox' || activeView === 'news/orthodox') {
      setCurrentSection('pan-orthodox');
    } else if (activeView === 'news/magazine') {
      setCurrentSection('magazine');
    } else if (activeView === 'news/newsletter') {
      setCurrentSection('newsletter');
    }
  }, [activeView]);

  /* ── Modals & Selected Items ── */
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [selectedPanNews, setSelectedPanNews] = useState<PanOrthodoxNewsItem | null>(null);
  const [selectedMagazineIssue, setSelectedMagazineIssue] = useState<MagazineIssue>(MOCK_MAGAZINE_ISSUES[0]);
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);
  const [selectedNewsletter, setSelectedNewsletter] = useState<NewsletterIssue | null>(null);

  /* ── Filter States ── */
  const [announcementTypeFilter, setAnnouncementTypeFilter] = useState<string>('ALL');
  const [panTraditionFilter, setPanTraditionFilter] = useState<string>('ALL');
  const [magazineCategoryFilter, setMagazineCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  /* ── Newsletter Subscription Form ── */
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriberName, setSubscriberName] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  /* ── Filtered Announcements ── */
  const filteredAnnouncements = useMemo(() => {
    return MOCK_ANNOUNCEMENTS.filter((item) => {
      const matchType = announcementTypeFilter === 'ALL' || item.type === announcementTypeFilter;
      const matchQuery =
        item.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summaryEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.signatory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchQuery;
    });
  }, [announcementTypeFilter, searchQuery]);

  /* ── Filtered Pan-Orthodox News ── */
  const filteredPanNews = useMemo(() => {
    return MOCK_PAN_ORTHODOX_NEWS.filter((item) => {
      const matchTradition = panTraditionFilter === 'ALL' || item.churchTradition === panTraditionFilter;
      const matchQuery =
        item.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleAmharic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.patriarchate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summaryEnglish.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTradition && matchQuery;
    });
  }, [panTraditionFilter, searchQuery]);

  /* ── Filtered Magazine Articles ── */
  const filteredMagazineArticles = useMemo(() => {
    return selectedMagazineIssue.articles.filter((art) => {
      const matchCat = magazineCategoryFilter === 'ALL' || art.category === magazineCategoryFilter;
      const matchQuery =
        art.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.titleAm.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedMagazineIssue, magazineCategoryFilter, searchQuery]);

  /* ── Handle Newsletter Subscription ── */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail) return;
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C8A84B', '#800020', '#006B3C', '#FFD700'],
    });
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setSubscriberEmail('');
      setSubscriberName('');
    }, 4000);
  };

  /* ── Copy Share Link ── */
  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  /* ── Download PDF / Document Simulation ── */
  const handleDownloadDoc = (title: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fadeIn max-w-7xl">

      {/* ══ 1. HERO WITH NEWS SECTION TABS ══════════════════════════ */}
      <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5" />
              {language === 'am' ? 'ዜናና ይፋዊ መግለጫዎች' : 'EOTC NEWS & COMMUNICATIONS'}
            </span>
            <span className="bg-white/10 text-stone-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
              Patriarchal Press & Synod Secretariat
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
            {language === 'am' ? 'የቤተ ክርስቲያን ዜና፣ ማስታወቂያና መጽሔት' : 'Church News, Announcements & Media'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-stone-200 leading-relaxed max-w-3xl">
            {language === 'am'
              ? 'የቅዱስ ሲኖዶስ ውሳኔዎች፣ የብፁዕ ወቅዱስ ፓትርያርክ መልእክታት፣ የኦርቶዶክሳውያን ዓለም አቀፍ ዜናዎች፣ ይፋዊው ስምዐ ጽድቅ መጽሔትና ሳምንታዊው ዜና መጽሔት።'
              : 'Official patriarchal communiqués, Holy Synod decrees, sister Pan-Orthodox updates, digital magazine editions, and the weekly community digest.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          {[
            { id: 'hub' as const, labelEn: 'News Hub', labelAm: 'ዋና ማዕከል', icon: Newspaper },
            { id: 'announcements' as const, labelEn: 'EOTC Announcements', labelAm: 'የቤተ ክርስቲያን ማስታወቂያዎች', icon: ShieldCheck },
            { id: 'pan-orthodox' as const, labelEn: 'Pan-Orthodox News', labelAm: 'ዓለም አቀፍ ኦርቶዶክስ', icon: Globe },
            { id: 'magazine' as const, labelEn: 'Official Magazine', labelAm: 'ስምዐ ጽድቅ መጽሔት', icon: BookOpen },
            { id: 'newsletter' as const, labelEn: 'Weekly Newsletter', labelAm: 'ሳምንታዊ ዜና መጽሔት', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentSection(tab.id);
                  setSelectedAnnouncement(null);
                  setSelectedPanNews(null);
                  setSelectedArticle(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-md scale-105'
                    : 'bg-white/10 text-stone-200 hover:bg-white/20 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'am' ? tab.labelAm : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ══ 2. NEWS HUB (MAIN OVERVIEW) ════════════════════════════ */}
      {currentSection === 'hub' && (
        <div className="space-y-10 animate-fadeIn">
          {/* 4 Large Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'announcements' as const,
                titleEn: 'EOTC Announcements',
                titleAm: 'የቅዱስ ሲኖዶስ ውሳኔዎች',
                descEn: 'Patriarchal decrees, episcopal appointments, cathedral consecrations, and fasting calendars.',
                stat: `${MOCK_ANNOUNCEMENTS.length} Active Decrees`,
                icon: ShieldCheck,
              },
              {
                id: 'pan-orthodox' as const,
                titleEn: 'Pan-Orthodox News',
                titleAm: 'ዓለም አቀፍ ኦርቶዶክስ ዜና',
                descEn: 'Updates from Coptic, Syriac, Armenian, Malankara, Eritrean, and Eastern Orthodox sister sees.',
                stat: `${MOCK_PAN_ORTHODOX_NEWS.length} Sister Patriarchates`,
                icon: Globe,
              },
              {
                id: 'magazine' as const,
                titleEn: 'Official Magazine',
                titleAm: 'ስምዐ ጽድቅ መጽሔት',
                descEn: 'Digital editions of Sime Tsion with feature articles in theology, church history, and heritage.',
                stat: 'Volume 38 • Latest Edition',
                icon: BookOpen,
              },
              {
                id: 'newsletter' as const,
                titleEn: 'Weekly Newsletter',
                titleAm: 'ሳምንታዊ ዜና መጽሔት',
                descEn: 'Weekly email digest of top headlines, liturgical fasting guides, and spiritual reflections.',
                stat: 'Edition #184 This Week',
                icon: Mail,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setCurrentSection(card.id)}
                  className="bg-white p-6 rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] text-[#855B09] border border-[#E6DFD1] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="badge-gold text-[9px]">{card.stat}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                        {language === 'am' ? card.titleAm : card.titleEn}
                      </h3>
                      <p className="text-xs font-semibold text-[#855B09]">{language === 'am' ? card.titleEn : card.titleAm}</p>
                    </div>

                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {card.descEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                    <span>Read Section</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Breaking Pastoral Decree Spotlight */}
          <div className="bg-white rounded-3xl border border-[#E6DFD1] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center">
            <div className="p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#855B09]" />
                  OFFICIAL HOLY SYNOD DECREE
                </span>
                <span className="text-xs font-mono text-[#855B09] font-bold">
                  Ref: {MOCK_ANNOUNCEMENTS[0].officialRefNo}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">
                  {MOCK_ANNOUNCEMENTS[0].titleAmharic}
                </h3>
                <p className="text-sm text-[#855B09] font-bold">{MOCK_ANNOUNCEMENTS[0].titleEnglish}</p>
                <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                  {MOCK_ANNOUNCEMENTS[0].summaryEnglish}
                </p>
              </div>

              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] text-xs space-y-1">
                <div><strong>Issued By:</strong> {MOCK_ANNOUNCEMENTS[0].issuedBy}</div>
                <div><strong>Signatory:</strong> {MOCK_ANNOUNCEMENTS[0].signatory}</div>
                <div className="text-[#6B7280]">📅 {MOCK_ANNOUNCEMENTS[0].dateGregorian} ({MOCK_ANNOUNCEMENTS[0].dateEthiopian})</div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSelectedAnnouncement(MOCK_ANNOUNCEMENTS[0]);
                    setCurrentSection('announcements');
                  }}
                  className="btn-gold px-6 py-3 text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>Read Full Decree</span>
                </button>
                <button
                  onClick={() => setCurrentSection('announcements')}
                  className="px-6 py-3 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-[#2C1D07] text-xs font-bold"
                >
                  View All Announcements →
                </button>
              </div>
            </div>

            <div className="h-full min-h-[340px] relative overflow-hidden">
              <img
                src={MOCK_ANNOUNCEMENTS[0].image}
                alt={MOCK_ANNOUNCEMENTS[0].titleEnglish}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-geez">
                📍 መንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል ፣ አዲስ አበባ
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ 3. EOTC ANNOUNCEMENTS VIEW ══════════════════════════════ */}
      {currentSection === 'announcements' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Section Header */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">PATRIARCHAL & SYNOD CHANCELLERY</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ይፋዊ ማስታወቂያዎች' : 'Official EOTC Announcements & Pastoral Decrees'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Holy Synod plenerary resolutions, patriarchal pastoral letters from His Holiness Abune Mathias, episcopal appointments, and church consecrations.
              </p>
            </div>
          </div>

          {/* Type Filter Pills & Search */}
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-[#855B09] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search decrees, appointments, ref numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-[#E6DFD1] text-xs sm:text-sm focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
              {[
                'ALL',
                'Holy Synod Decree',
                'Pastoral Letter',
                'Episcopal Appointment',
                'Church Consecration',
                'Calendar Pronouncement',
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setAnnouncementTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    announcementTypeFilter === type
                      ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                      : 'bg-[#FAF8F3] text-[#6B7280] hover:text-[#2C1D07] border border-[#E6DFD1]'
                  }`}
                >
                  {type === 'ALL' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={ann.image}
                    alt={ann.titleEnglish}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="badge-gold text-[9px] uppercase font-bold shadow-md">
                      {ann.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <div className="text-[11px] text-[#C8A84B] font-mono">
                      Ref: {ann.officialRefNo} • {ann.dateGregorian}
                    </div>
                    <h3 className="text-lg font-bold font-geez leading-snug">{ann.titleAmharic}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#855B09]">{ann.titleEnglish}</p>
                    <p className="text-xs text-[#4A3B22] leading-relaxed line-clamp-3">
                      {ann.summaryEnglish}
                    </p>

                    <div className="bg-[#FAF8F3] p-3 rounded-2xl border border-[#E6DFD1] text-[11px] space-y-0.5 text-[#6B7280]">
                      <div><strong>Issued:</strong> {ann.issuedBy}</div>
                      <div><strong>Signatory:</strong> {ann.signatory}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex gap-3">
                    <button
                      onClick={() => setSelectedAnnouncement(ann)}
                      className="flex-1 btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Full Document</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ 4. PAN-ORTHODOX NEWS VIEW ═══════════════════════════════ */}
      {currentSection === 'pan-orthodox' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">GLOBAL ORTHODOX COMMUNION</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <Globe className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'ዓለም አቀፍ የኦርቶዶክስ አብያተ ክርስቲያናት ዜና' : 'Pan-Orthodox & Ecumenical News'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                News, joint declarations, and theological developments from Coptic, Syriac, Armenian, Malankara, Eritrean, and Eastern Orthodox sister patriarchates.
              </p>
            </div>
          </div>

          {/* Tradition Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-sm">
            {[
              'ALL',
              'Coptic Orthodox',
              'Syriac Orthodox',
              'Armenian Apostolic',
              'Malankara Orthodox',
              'Eritrean Orthodox',
              'Ecumenical & Inter-Orthodox',
            ].map((trad) => (
              <button
                key={trad}
                onClick={() => setPanTraditionFilter(trad)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  panTraditionFilter === trad
                    ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                    : 'bg-[#FAF8F3] text-[#6B7280] hover:text-[#2C1D07] border border-[#E6DFD1]'
                }`}
              >
                {trad === 'ALL' ? 'All Sister Sees' : trad}
              </button>
            ))}
          </div>

          {/* Pan-Orthodox News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPanNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.titleEnglish}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="badge-gold text-[9px] uppercase font-bold shadow-md">
                      {item.churchTradition}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <div className="text-[10px] text-stone-300">📍 {item.location}</div>
                    <h3 className="text-base font-bold font-geez leading-snug">{item.titleAmharic}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#855B09]">{item.titleEnglish}</p>
                    <p className="text-xs text-[#4A3B22] leading-relaxed line-clamp-3">
                      {item.summaryEnglish}
                    </p>
                    <div className="text-[11px] text-[#6B7280]">
                      <strong>Patriarchate:</strong> {item.patriarchate}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1]">
                    <button
                      onClick={() => setSelectedPanNews(item)}
                      className="w-full btn-gold py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Read Joint Article</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ 5. OFFICIAL MAGAZINE VIEW (SIME TSION / ስምዐ ጽድቅ) ═════ */}
      {currentSection === 'magazine' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">OFFICIAL PATRIARCHAL JOURNAL</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'ስምዐ ጽድቅ ይፋዊ መጽሔት' : 'Sime Tsion (Voice of Truth) Magazine'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Digital editions of the Ethiopian Orthodox Tewahedo Church official publication — theological treatises, church history, photo essays, and youth essays.
              </p>
            </div>

            {/* Issue Selector Dropdown */}
            <div className="flex items-center gap-2 bg-[#FAF8F3] p-2 rounded-2xl border border-[#E6DFD1] shrink-0">
              <span className="text-xs font-bold text-[#855B09]">Select Issue:</span>
              <select
                value={selectedMagazineIssue.id}
                onChange={(e) => {
                  const iss = MOCK_MAGAZINE_ISSUES.find((m) => m.id === e.target.value);
                  if (iss) setSelectedMagazineIssue(iss);
                }}
                className="bg-white border border-[#E6DFD1] rounded-xl px-3 py-1.5 text-xs font-bold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
              >
                {MOCK_MAGAZINE_ISSUES.map((iss) => (
                  <option key={iss.id} value={iss.id}>
                    {iss.issueNumber} ({iss.dateEthiopian} / {iss.dateGregorian})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Issue Spotlight Banner */}
          <div className="bg-gradient-to-br from-[#FFF8E7] to-white p-8 rounded-3xl border-2 border-[#C8A84B] shadow-md grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#C8A84B] aspect-[3/4] max-w-xs mx-auto lg:max-w-none">
              <img
                src={selectedMagazineIssue.coverImage}
                alt={selectedMagazineIssue.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[10px] font-bold text-[#C8A84B] uppercase">{selectedMagazineIssue.volume}</div>
                <h4 className="text-base font-bold font-geez">{selectedMagazineIssue.titleAm}</h4>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="badge-gold text-[9px] uppercase font-bold">{selectedMagazineIssue.issueNumber}</span>
                  <span className="text-xs text-[#855B09] font-mono">{selectedMagazineIssue.dateEthiopian}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez leading-tight">
                  {selectedMagazineIssue.titleAm}
                </h3>
                <p className="text-sm font-bold text-[#855B09]">{selectedMagazineIssue.titleEn}</p>
                <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                  {selectedMagazineIssue.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#E6DFD1] text-xs">
                <div>
                  <div className="font-bold text-[#2C1D07]">Theme</div>
                  <div className="text-[11px] text-[#6B7280]">{selectedMagazineIssue.theme}</div>
                </div>
                <div>
                  <div className="font-bold text-[#2C1D07]">Feature Articles</div>
                  <div className="text-[11px] text-[#6B7280]">{selectedMagazineIssue.articles.length} In-Depth Articles</div>
                </div>
                <div>
                  <div className="font-bold text-[#2C1D07]">Photo Essays</div>
                  <div className="text-[11px] text-[#6B7280]">{selectedMagazineIssue.photoEssayCount} Archival Photos</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => handleDownloadDoc(selectedMagazineIssue.titleEn, `Official Magazine: ${selectedMagazineIssue.titleEn}\n\n${selectedMagazineIssue.description}`)}
                  className="btn-gold px-5 py-2.5 text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Amharic Edition (PDF)</span>
                </button>
                <button
                  onClick={() => handleDownloadDoc(`${selectedMagazineIssue.titleEn}_English`, `Official Magazine (English): ${selectedMagazineIssue.titleEn}\n\n${selectedMagazineIssue.description}`)}
                  className="px-5 py-2.5 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-xs font-bold text-[#2C1D07]"
                >
                  English Digest (PDF)
                </button>
              </div>
            </div>
          </div>

          {/* Articles in this Issue */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-[#2C1D07] font-serif">Articles in this Edition</h3>
              {/* Category Filter */}
              <div className="flex gap-1">
                {['ALL', 'Theology', 'Cultural Heritage', 'Church History', 'Youth & Sunday School'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMagazineCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      magazineCategoryFilter === cat
                        ? 'bg-[#1A2C1C] text-[#C8A84B]'
                        : 'bg-[#FAF8F3] text-[#6B7280] hover:text-[#2C1D07]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMagazineArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="bg-white p-6 rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="badge-gold text-[9px]">{art.category}</span>
                      <span className="text-[11px] text-[#6B7280] font-mono">Page {art.pageNumber} • {art.readTime}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#2C1D07] font-geez hover:text-[#855B09] transition-colors">
                      {art.titleAm}
                    </h4>
                    <p className="text-xs text-[#855B09] font-semibold">{art.titleEn}</p>
                    <p className="text-xs text-[#4A3B22] leading-relaxed line-clamp-2">
                      {art.snippet}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex justify-between items-center text-xs text-[#6B7280]">
                    <span>By: {art.author}</span>
                    <span className="font-bold text-[#855B09] flex items-center gap-1">Read Article →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ 6. WEEKLY NEWSLETTER VIEW ══════════════════════════════ */}
      {currentSection === 'newsletter' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Email Sign-Up Form Card */}
          <div className="bg-gradient-to-br from-[#1A2C1C] via-[#2C1D07] to-[#1C1205] text-white p-8 md:p-12 rounded-3xl border-2 border-[#C8A84B] shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#C8A84B] text-[#1A2C1C] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                <Mail className="w-3.5 h-3.5" />
                <span>FREE WEEKLY FAITH DIGEST</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-geez leading-tight">
                {language === 'am' ? 'የሳምንታዊ ዜና መጽሔት ምዝገባ' : 'Subscribe to the Weekly EOTC Digest'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Receive weekly liturgical fasting guides, Holy Synod pronouncements, Pan-Orthodox highlights, and Sunday scripture commentaries directly in your inbox every Friday morning.
              </p>
            </div>

            {subSuccess ? (
              <div className="p-4 rounded-2xl bg-green-500/20 border border-green-400 text-green-200 text-xs font-bold flex items-center gap-2 max-w-xl animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <span>Thank you! You have successfully subscribed to the EOTC Weekly Digest. Check your email for confirmation.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={subscriberName}
                  onChange={(e) => setSubscriberName(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C8A84B]"
                />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#C8A84B]"
                />
                <button
                  type="submit"
                  className="btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe Free</span>
                </button>
              </form>
            )}
          </div>

          {/* Current Weekly Digest */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E6DFD1] pb-4">
              <div>
                <span className="badge-gold text-[9px] uppercase font-bold">CURRENT EDITION #{MOCK_NEWSLETTERS[0].editionNo}</span>
                <h3 className="text-xl font-black text-[#2C1D07] font-serif">{MOCK_NEWSLETTERS[0].title}</h3>
                <p className="text-xs text-[#855B09] font-mono">{MOCK_NEWSLETTERS[0].date} ({MOCK_NEWSLETTERS[0].dateEthiopian})</p>
              </div>
            </div>

            {/* Liturgical Reminder Box */}
            <div className="bg-[#FFF8E7] p-5 rounded-2xl border-2 border-[#C8A84B] space-y-2">
              <div className="flex items-center gap-2 text-[#855B09] font-bold text-xs uppercase tracking-wider">
                <Cross className="w-4 h-4" />
                <span>Liturgical Fasting & Feast Reminder (የዕለቱ ጾምና በዓል)</span>
              </div>
              <div className="text-sm font-bold text-[#2C1D07] font-geez">
                {MOCK_NEWSLETTERS[0].liturgicalReminder.feastOrFast}
              </div>
              <div className="text-xs text-[#855B09]">
                <strong>Rule:</strong> {MOCK_NEWSLETTERS[0].liturgicalReminder.fastType} • 📅 {MOCK_NEWSLETTERS[0].liturgicalReminder.date}
              </div>
              <div className="text-xs text-[#6B7280]">
                <strong>Weekly Lectionary:</strong> {MOCK_NEWSLETTERS[0].liturgicalReminder.scriptureReading}
              </div>
            </div>

            {/* Top Headlines List */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#855B09]">Top Headlines This Week</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_NEWSLETTERS[0].topHeadlines.map((head, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] text-xs font-semibold text-[#2C1D07] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FFF8E7] text-[#855B09] flex items-center justify-center font-mono text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{head}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#4A3B22] leading-relaxed bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1]">
              {MOCK_NEWSLETTERS[0].featuredArticleSnippet}
            </p>
          </div>

          {/* Past Newsletter Archive */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-[#2C1D07] font-serif">Past Newsletter Issues Archive</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_NEWSLETTERS.map((nl) => (
                <div
                  key={nl.id}
                  onClick={() => setSelectedNewsletter(nl)}
                  className="bg-white p-5 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-mono text-[#855B09]">
                      <span>Edition #{nl.editionNo}</span>
                      <span>{nl.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#2C1D07]">{nl.title}</h4>
                    <p className="text-xs text-[#6B7280] line-clamp-2">{nl.featuredArticleSnippet}</p>
                  </div>
                  <div className="pt-2 border-t border-[#E6DFD1] flex justify-between items-center text-xs font-bold text-[#855B09]">
                    <span>Read Digest</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ 7. ANNOUNCEMENT DETAIL MODAL ═══════════════════════════ */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedAnnouncement(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp">
            <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] p-6 text-white relative">
              <span className="badge-gold text-[9px] uppercase font-bold">{selectedAnnouncement.type}</span>
              <h3 className="text-xl font-bold font-geez text-white mt-1 leading-snug">{selectedAnnouncement.titleAmharic}</h3>
              <p className="text-xs text-[#C8A84B]">{selectedAnnouncement.titleEnglish}</p>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#4A3B22]">
              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div><strong>Ref Number:</strong> <span className="font-mono text-[#855B09]">{selectedAnnouncement.officialRefNo}</span></div>
                <div><strong>Date:</strong> {selectedAnnouncement.dateGregorian}</div>
                <div><strong>Signatory:</strong> {selectedAnnouncement.signatory}</div>
                <div><strong>Issued By:</strong> {selectedAnnouncement.issuedBy}</div>
              </div>

              {/* Full Content Paragraphs */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#855B09]">Official Decree Text (የአዋጁ ይፋዊ ጽሑፍ)</h4>
                <div className="space-y-3 bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1] font-geez leading-relaxed text-[#2C1D07]">
                  {selectedAnnouncement.fullContentAm.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <h4 className="font-bold text-xs uppercase tracking-wider text-[#855B09] pt-2">English Translation</h4>
                <div className="space-y-3 leading-relaxed text-[#4A3B22]">
                  {selectedAnnouncement.fullContentEn.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DFD1] flex gap-3">
                <button
                  onClick={() => handleDownloadDoc(selectedAnnouncement.titleEnglish, selectedAnnouncement.fullContentEn.join('\n\n'))}
                  className="btn-gold px-6 py-2.5 text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official Copy</span>
                </button>
                <button
                  onClick={() => handleCopyLink(window.location.href)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] text-xs font-bold text-[#855B09] flex items-center gap-1.5"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Document'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ 8. PAN-ORTHODOX NEWS MODAL ═════════════════════════════ */}
      {selectedPanNews && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPanNews(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp">
            <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] p-6 text-white relative">
              <span className="badge-gold text-[9px] uppercase font-bold">{selectedPanNews.churchTradition}</span>
              <h3 className="text-xl font-bold font-geez text-white mt-1 leading-snug">{selectedPanNews.titleAmharic}</h3>
              <p className="text-xs text-[#C8A84B]">{selectedPanNews.titleEnglish}</p>
              <button
                onClick={() => setSelectedPanNews(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#4A3B22]">
              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] text-xs space-y-1">
                <div><strong>Patriarchate / See:</strong> {selectedPanNews.patriarchate}</div>
                <div><strong>Location:</strong> {selectedPanNews.location}</div>
                <div><strong>Date:</strong> {selectedPanNews.dateGregorian}</div>
              </div>

              <div className="space-y-3 font-geez leading-relaxed text-[#2C1D07] bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1]">
                {selectedPanNews.fullContentAm.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="space-y-3 leading-relaxed text-[#4A3B22]">
                {selectedPanNews.fullContentEn.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E6DFD1]">
                <button
                  onClick={() => setSelectedPanNews(null)}
                  className="btn-gold px-6 py-2.5 text-xs font-bold"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ 9. MAGAZINE ARTICLE READER MODAL ═══════════════════════ */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedArticle(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp">
            <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] p-6 text-white relative">
              <span className="badge-gold text-[9px] uppercase font-bold">{selectedArticle.category} • {selectedMagazineIssue.titleAm}</span>
              <h3 className="text-xl font-bold font-geez text-white mt-1 leading-snug">{selectedArticle.titleAm}</h3>
              <p className="text-xs text-[#C8A84B]">{selectedArticle.titleEn}</p>
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#4A3B22]">
              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] text-xs flex justify-between items-center">
                <div>
                  <strong>Author:</strong> {selectedArticle.author} ({selectedArticle.authorTitle})
                </div>
                <div className="font-mono text-[#855B09]">
                  Page {selectedArticle.pageNumber} • {selectedArticle.readTime}
                </div>
              </div>

              <div className="space-y-4 text-[#2C1D07] leading-relaxed text-sm">
                <p className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#C8A84B] text-xs font-geez leading-relaxed">
                  {selectedArticle.snippet}
                </p>
                <p>
                  This feature article is published in the official print and digital edition of Sime Tsion (ስምዐ ጽድቅ) Volume 38. You can download the full digital issue with all high-resolution liturgical iconography and diagrams.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E6DFD1] flex gap-3">
                <button
                  onClick={() => handleDownloadDoc(selectedArticle.titleEn, selectedArticle.snippet)}
                  className="btn-gold px-6 py-2.5 text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Article (PDF)</span>
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] text-xs font-bold text-[#2C1D07]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ 10. NEWSLETTER ARCHIVE PREVIEW MODAL ════════════════════ */}
      {selectedNewsletter && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedNewsletter(null);
          }}
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 space-y-6 animate-scaleUp relative">
            <button
              onClick={() => setSelectedNewsletter(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF8F3] hover:bg-[#E6DFD1] text-[#2C1D07] flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div>
              <span className="badge-gold text-[9px] uppercase font-bold">EDITION #{selectedNewsletter.editionNo}</span>
              <h3 className="text-xl font-bold text-[#2C1D07] font-serif mt-1">{selectedNewsletter.title}</h3>
              <p className="text-xs text-[#855B09] font-mono">{selectedNewsletter.date} ({selectedNewsletter.dateEthiopian})</p>
            </div>

            <div className="space-y-3 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] text-xs">
              <div className="font-bold text-[#855B09] uppercase">Liturgical Fast & Feast Focus:</div>
              <div className="font-bold text-[#2C1D07] font-geez">{selectedNewsletter.liturgicalReminder.feastOrFast}</div>
              <div className="text-[11px] text-[#6B7280]">Scripture: {selectedNewsletter.liturgicalReminder.scriptureReading}</div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#855B09] uppercase tracking-wider text-[10px]">Headlines Included:</h4>
              <ul className="space-y-1.5 text-[#4A3B22]">
                {selectedNewsletter.topHeadlines.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A84B]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedNewsletter(null)}
              className="w-full btn-gold py-2.5 text-xs font-bold"
            >
              Close Digest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
