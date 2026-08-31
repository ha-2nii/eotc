import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../components/layout/LanguageContext';
import {
  MOCK_CAMPAIGNS,
  MOCK_MONASTERIES,
  GENERAL_FUND_PILLARS,
  TRANSPARENCY_STATS,
  MOCK_DONOR_PROFILE,
  MOCK_DONOR_HISTORY,
  MOCK_RECURRING_PLEDGES,
} from '../data/mockGive';
import { MOCK_CHURCHES } from '../data/mockChurches';
import {
  Heart, CheckCircle,
  Sparkles, Church as ChurchIcon, Landmark,
  ShieldCheck, FileText, ArrowRight, Download,
  Search, Target,
  Clock, Copy, Check,
  TrendingUp, BarChart3,
  RotateCcw, User,
  Building, BookOpen
} from 'lucide-react';

export const GivingView: React.FC = () => {
  const { language, activeView } = useLanguage();

  /* ── Active Giving Sub-section ── */
  type GiveSection = 'hub' | 'church' | 'monastery' | 'campaigns' | 'campaign_detail' | 'general' | 'transparency' | 'account';
  const [currentSection, setCurrentSection] = useState<GiveSection>('hub');
  const [selectedCampaignSlug, setSelectedCampaignSlug] = useState<string | null>(null);

  /* ── Sync with activeView route from Header or URLs ── */
  useEffect(() => {
    if (activeView === 'give' || activeView === 'give/donate') {
      setCurrentSection('hub');
    } else if (activeView === 'give/church') {
      setCurrentSection('church');
    } else if (activeView === 'give/monastery') {
      setCurrentSection('monastery');
    } else if (activeView === 'give/campaigns') {
      setCurrentSection('campaigns');
    } else if (activeView.startsWith('give/campaigns/')) {
      const slug = activeView.replace('give/campaigns/', '');
      setSelectedCampaignSlug(slug);
      setCurrentSection('campaign_detail');
    } else if (activeView === 'give/general') {
      setCurrentSection('general');
    } else if (activeView === 'give/transparency') {
      setCurrentSection('transparency');
    } else if (activeView === 'give/account' || activeView === 'give/my-giving') {
      setCurrentSection('account');
    }
  }, [activeView]);

  /* ── Donation Form Global State ── */
  const [selectedCurrency, setSelectedCurrency] = useState<'ETB' | 'USD' | 'EUR' | 'GBP'>('ETB');
  const [amountPreset, setAmountPreset] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'annual'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'card' | 'paypal'>('telebirr');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donationDesignation, setDonationDesignation] = useState('General Church Fund (የመንበረ ፓትርያርክ ማዕከላዊ ፈንድ)');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  /* ── Search & Filter states ── */
  const [campaignSearch, setCampaignSearch] = useState('');
  const [campaignCategory, setCampaignCategory] = useState<string>('ALL');
  const [churchSearch, setChurchSearch] = useState('');
  const [churchDioceseFilter, setChurchDioceseFilter] = useState('ALL');
  const [copiedLink, setCopiedLink] = useState(false);

  /* ── Campaign detail helper ── */
  const currentCampaign = useMemo(() => {
    if (!selectedCampaignSlug) return MOCK_CAMPAIGNS[0];
    return MOCK_CAMPAIGNS.find((c) => c.slug === selectedCampaignSlug) || MOCK_CAMPAIGNS[0];
  }, [selectedCampaignSlug]);

  /* ── Open Donation Modal Helper ── */
  const openDonationModal = (designationText: string, suggestedAmount?: number) => {
    setDonationDesignation(designationText);
    if (suggestedAmount) {
      setAmountPreset(suggestedAmount);
      setCustomAmount('');
    }
    setIsModalOpen(true);
  };

  /* ── Handle Donation Submission ── */
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amountPreset;
    const receiptNo = `EOTC-REC-${Math.floor(100000 + Math.random() * 900000)}`;

    setReceiptData({
      receiptNo,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: finalAmount,
      currency: selectedCurrency,
      designation: donationDesignation,
      donorName: isAnonymous ? 'Anonymous Faithful' : donorName || 'Devout Orthodox Believer',
      paymentMethod: paymentMethod.toUpperCase(),
      frequency,
    });

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#C8A84B', '#800020', '#006B3C', '#FFD700'],
    });

    setIsSuccessToast(true);
    setIsModalOpen(false);
  };

  /* ── Download Receipt Simulation ── */
  const handleDownloadReceipt = () => {
    if (!receiptData) return;
    const content = `=====================================================
ETHIOPIAN ORTHODOX TEWAHEDO CHURCH
HOLY SYNOD PATRIARCHATE OF ETHIOPIA
OFFICIAL DONATION RECEIPT & TAX ACKNOWLEDGMENT
=====================================================
Receipt Number: ${receiptData.receiptNo}
Date of Contribution: ${receiptData.date}
Donor Name: ${receiptData.donorName}
Designation: ${receiptData.designation}
Amount: ${receiptData.currency} ${receiptData.amount.toLocaleString()}
Contribution Frequency: ${receiptData.frequency}
Payment Channel: ${receiptData.paymentMethod}
Status: VERIFIED & AUDITED

"እግዚአብሔር በደስታ የሚሰጠውን ይወዳልና።" (፪ኛ ቆሮንቶስ ፱ ፡ ፯)
"For God loves a cheerful giver." (2 Corinthians 9:7)
=====================================================
This official receipt is eligible for charitable tax deduction.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${receiptData.receiptNo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ── Filtered Campaigns ── */
  const filteredCampaigns = useMemo(() => {
    return MOCK_CAMPAIGNS.filter((c) => {
      const matchCat = campaignCategory === 'ALL' || c.category === campaignCategory;
      const matchQuery =
        c.titleEnglish.toLowerCase().includes(campaignSearch.toLowerCase()) ||
        c.titleAmharic.toLowerCase().includes(campaignSearch.toLowerCase()) ||
        c.description.toLowerCase().includes(campaignSearch.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [campaignCategory, campaignSearch]);

  /* ── Filtered Churches for Giving ── */
  const filteredChurches = useMemo(() => {
    return MOCK_CHURCHES.filter((ch) => {
      const matchDiocese = churchDioceseFilter === 'ALL' || ch.diocese.includes(churchDioceseFilter);
      const matchQuery =
        ch.nameEnglish.toLowerCase().includes(churchSearch.toLowerCase()) ||
        ch.nameAmharic.toLowerCase().includes(churchSearch.toLowerCase()) ||
        ch.city.toLowerCase().includes(churchSearch.toLowerCase()) ||
        ch.tabotPatron.toLowerCase().includes(churchSearch.toLowerCase());
      return matchDiocese && matchQuery;
    });
  }, [churchDioceseFilter, churchSearch]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fadeIn max-w-7xl">

      {/* ══ 1. MAIN HERO WITH SCRIPTURAL QUOTE & NAVIGATION TABS ══ */}
      <section className="bg-gradient-to-br from-[#2C1D07] via-[#3D2200] to-[#1C1205] rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A84B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#C8A84B_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-current" />
              {language === 'am' ? 'ምጽዋትና መዋጮ' : 'EOTC GIVING & STEWARDSHIP'}
            </span>
            <span className="bg-white/10 text-stone-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
              100% Transparent • Audited by Holy Synod
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-geez leading-tight">
            {language === 'am' ? 'ለቤተ ክርስቲያን ስጡ — ምጽዋትና በረከት' : 'Give to the Holy Church'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-stone-200 leading-relaxed max-w-3xl font-geez">
            “እያንዳንዱ እንደ ወደደ በልቡ ይስጥ፥ እግዚአብሔር በደስታ የሚሰጠውን ይወዳልና።” — ፪ኛ ቆሮንቶስ ፱ ፡ ፯
          </p>
          <p className="text-xs sm:text-sm text-stone-300 italic">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." (2 Corinthians 9:7)
          </p>
        </div>
      </section>

      {/* ══ 2. SUCCESS RECEIPT BANNER ══ */}
      {isSuccessToast && receiptData && (
        <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] text-white p-6 rounded-3xl border-2 border-[#C8A84B] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-scaleUp">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C8A84B] text-[#1A2C1C] flex items-center justify-center font-bold shrink-0 shadow-lg">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#C8A84B]">
                CONTRIBUTION SUCCESSFUL • በረከቱ ይድረስዎ
              </div>
              <h3 className="text-xl font-bold text-white font-geez">
                Thank You, {receiptData.donorName}!
              </h3>
              <p className="text-xs text-stone-300">
                Receipt #{receiptData.receiptNo} • {receiptData.currency} {receiptData.amount.toLocaleString()} for {receiptData.designation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleDownloadReceipt}
              className="flex-1 md:flex-none btn-gold px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Receipt</span>
            </button>
            <button
              onClick={() => setIsSuccessToast(false)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ══ 3. SUB-VIEW SWITCHER ═══════════════════════════════════ */}

      {/* ───────────────────────────────────────────────────────────
          VIEW A: MAIN GIVING HUB (/give)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'hub' && (
        <div className="space-y-10 animate-fadeIn">
          {/* Quick Giving Designation 4 Large Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'campaigns' as const,
                titleEn: 'Active Campaigns',
                titleAm: 'ልዩ የልማት ዘመቻዎች',
                descEn: 'Lalibela restoration, manuscript digitization, and emergency famine relief.',
                icon: Target,
                stat: `${MOCK_CAMPAIGNS.length} Active Campaigns`,
                color: 'from-[#FFF8E7] to-white',
                border: '#C8A84B',
              },
              {
                id: 'monastery' as const,
                titleEn: 'Adopt a Monastery',
                titleAm: 'ገዳማትን ይደግፉ',
                descEn: 'Monthly sustenance for 42 ancient cliffside and wilderness hermits.',
                icon: Landmark,
                stat: '42 Historic Monasteries',
                color: 'from-white to-[#FAF8F3]',
                border: '#E6DFD1',
              },
              {
                id: 'church' as const,
                titleEn: 'Give to a Parish',
                titleAm: 'ለደብርዎ ዐሥራትና መዋጮ',
                descEn: 'Direct tithe (Asrat) and Sunday offerings to any registered local church.',
                icon: ChurchIcon,
                stat: `${MOCK_CHURCHES.length}+ Parishes Worldwide`,
                color: 'from-white to-[#FAF8F3]',
                border: '#E6DFD1',
              },
              {
                id: 'general' as const,
                titleEn: 'General Church Fund',
                titleAm: 'የመንበረ ፓትርያርክ ፈንድ',
                descEn: 'Holy Synod theological education, clergy pensions, and global missions.',
                icon: Building,
                stat: '5 Central Strategic Pillars',
                color: 'from-white to-[#FAF8F3]',
                border: '#E6DFD1',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setCurrentSection(card.id)}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer space-y-4 bg-gradient-to-br ${card.color} border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl group flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] text-[#855B09] border border-[#E6DFD1] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="badge-gold text-[9px]">{card.stat}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                        {language === 'am' ? card.titleAm : card.titleEn}
                      </h3>
                      <p className="text-xs font-medium text-[#855B09]">{language === 'am' ? card.titleEn : card.titleAm}</p>
                    </div>

                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {card.descEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between text-xs font-bold text-[#855B09]">
                    <span>Explore & Give</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Urgent Campaign Spotlight */}
          <div className="bg-white rounded-3xl border border-[#E6DFD1] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center">
            <div className="p-8 md:p-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-red-100 text-red-800 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-red-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-red-600" />
                  FEATURED URGENT CAMPAIGN
                </span>
                <span className="text-xs text-[#6B7280] font-mono">
                  ⏳ {MOCK_CAMPAIGNS[0].daysRemaining} Days Left
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-geez">
                  {MOCK_CAMPAIGNS[0].titleAmharic}
                </h3>
                <p className="text-sm text-[#855B09] font-bold">{MOCK_CAMPAIGNS[0].titleEnglish}</p>
                <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed">
                  {MOCK_CAMPAIGNS[0].description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#855B09] font-mono text-sm">
                    ETB {MOCK_CAMPAIGNS[0].raisedAmountETB.toLocaleString()} raised
                  </span>
                  <span className="text-[#6B7280]">
                    Target: ETB {MOCK_CAMPAIGNS[0].targetAmountETB.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#FAF8F3] h-3.5 rounded-full overflow-hidden border border-[#E6DFD1]">
                  <div
                    className="bg-gradient-to-r from-[#D4AF37] to-[#C8A84B] h-full rounded-full transition-all duration-1000"
                    style={{ width: `${Math.round((MOCK_CAMPAIGNS[0].raisedAmountETB / MOCK_CAMPAIGNS[0].targetAmountETB) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#6B7280]">
                  <span>{Math.round((MOCK_CAMPAIGNS[0].raisedAmountETB / MOCK_CAMPAIGNS[0].targetAmountETB) * 100)}% Funded</span>
                  <span>{MOCK_CAMPAIGNS[0].donorsCount.toLocaleString()} Devout Donors</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => openDonationModal(MOCK_CAMPAIGNS[0].titleEnglish, 2500)}
                  className="btn-gold px-6 py-3 text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Donate to This Campaign</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedCampaignSlug(MOCK_CAMPAIGNS[0].slug);
                    setCurrentSection('campaign_detail');
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-[#2C1D07] text-xs font-bold transition-all"
                >
                  View Full Project Details →
                </button>
              </div>
            </div>

            <div className="h-full min-h-[320px] relative overflow-hidden">
              <img
                src={MOCK_CAMPAIGNS[0].image}
                alt={MOCK_CAMPAIGNS[0].titleEnglish}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-geez">
                📍 {MOCK_CAMPAIGNS[0].organizer}
              </div>
            </div>
          </div>

          {/* Live Transparency & Impact Ticker */}
          <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E6DFD1] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="badge-gold text-[10px] uppercase font-bold">STEWARDSHIP IMPACT 2026</span>
                <h3 className="text-xl font-black text-[#2C1D07] font-serif">Audited Church Impact Overview</h3>
              </div>
              <button
                onClick={() => setCurrentSection('transparency')}
                className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1"
              >
                <span>View Full Financial Transparency Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Raised This Year', val: `ETB ${(TRANSPARENCY_STATS.totalRaisedYearETB / 1000000).toFixed(1)}M`, icon: TrendingUp },
                { label: 'Churches Subsidized', val: `${TRANSPARENCY_STATS.churchesSupported} Parishes`, icon: ChurchIcon },
                { label: 'Monasteries Sustained', val: `${TRANSPARENCY_STATS.monasteriesAdopted} Monasteries`, icon: Landmark },
                { label: 'Scholarships Granted', val: `${TRANSPARENCY_STATS.scholarshipsGranted} Students`, icon: BookOpen },
              ].map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-[#E6DFD1] space-y-2 text-center">
                    <Icon className="w-5 h-5 text-[#855B09] mx-auto" />
                    <div className="text-xl font-black text-[#2C1D07] font-mono">{st.val}</div>
                    <div className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{st.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW B: GIVE TO A SPECIFIC CHURCH (/give/church)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'church' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">PARISH STEWARDSHIP & TITHES</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <ChurchIcon className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'ለአጥቢያ ቤተ ክርስቲያንዎ መዋጮ ያድርጉ' : 'Give Directly to Your Local Parish'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Select your home parish or diaspora cathedral to remit monthly tithes (ዐሥራት), building donations, or Sunday school sponsorships.
              </p>
            </div>
          </div>

          {/* Search & Diocese Selector */}
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#855B09] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search parish by name, city, or Tabot patron..."
                value={churchSearch}
                onChange={(e) => setChurchSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E6DFD1] text-xs sm:text-sm focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3]"
              />
            </div>
            <select
              value={churchDioceseFilter}
              onChange={(e) => setChurchDioceseFilter(e.target.value)}
              className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
            >
              <option value="ALL">All Dioceses Worldwide (ሁሉም አህጉረ ስብከት)</option>
              <option value="Addis Ababa">Addis Ababa Diocese</option>
              <option value="Gondar">Gondar Diocese</option>
              <option value="Lalibela">Lalibela Diocese</option>
              <option value="Axum">Axum Diocese</option>
              <option value="North America">North America Diocese</option>
              <option value="UK & Europe">UK & Europe Diocese</option>
              <option value="Canada">Canada Diocese</option>
            </select>
          </div>

          {/* Church Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChurches.map((church) => (
              <div
                key={church.id}
                className="bg-white p-6 rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="badge-gold text-[9px]">{church.city}, {church.country}</span>
                    <span className="text-[10px] font-bold text-[#855B09] font-mono">{church.diocese}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#2C1D07] font-geez">{church.nameAmharic}</h3>
                    <p className="text-xs text-[#855B09] font-medium">{church.nameEnglish}</p>
                  </div>

                  <div className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E6DFD1] space-y-1 text-xs text-[#4A3B22]">
                    <div><strong>Patron:</strong> {church.tabotPatron}</div>
                    <div className="text-[11px] text-[#6B7280]"><strong>Address:</strong> {church.address}</div>
                    <div className="text-[11px] text-[#6B7280]"><strong>Phone:</strong> {church.phone}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E6DFD1] flex gap-2">
                  <button
                    onClick={() => openDonationModal(`${church.nameEnglish} (${church.nameAmharic})`, 1000)}
                    className="flex-1 btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Give to this Church</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW C: ADOPT A MONASTERY (/give/monastery)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'monastery' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">MONASTIC GUARDIANSHIP</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <Landmark className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'የገዳማውያን ጉዲፈቻና የድጋፍ መርሐ ግብር' : 'Adopt & Sponsor an Ancient Monastery'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Guarantee food, medical care, Altar incense, and parchment supplies for the ascetics of Ethiopia’s 1,600-year-old desert and cliff monasteries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_MONASTERIES.map((monastery) => {
              const pct = Math.min(100, Math.round((monastery.raisedMonthlyETB / monastery.monthlyTargetETB) * 100));
              return (
                <div
                  key={monastery.id}
                  className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={monastery.image}
                      alt={monastery.nameEnglish}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#C8A84B] text-[#1A2C1C] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                        {monastery.centuryFounded}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold font-geez">{monastery.nameAmharic}</h3>
                      <p className="text-xs text-stone-200">{monastery.nameEnglish} • {monastery.diocese}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <p className="text-xs text-[#4A3B22] leading-relaxed">
                        {monastery.needDescription}
                      </p>

                      {/* Urgent Needs Tags */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-bold text-[#855B09] uppercase tracking-wider">
                          Urgent Needs (የገዳሙ አስቸኳይ ፍላጎቶች):
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {monastery.urgentNeeds.map((need, idx) => (
                            <span key={idx} className="bg-[#FAF8F3] border border-[#E6DFD1] text-[#2C1D07] text-[10px] font-semibold px-2.5 py-0.5 rounded-lg">
                              • {need}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Monthly Progress */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-[#855B09] font-mono">
                            ETB {monastery.raisedMonthlyETB.toLocaleString()} / mo
                          </span>
                          <span className="text-[#6B7280]">
                            Target: ETB {monastery.monthlyTargetETB.toLocaleString()} / mo
                          </span>
                        </div>
                        <div className="w-full bg-[#FAF8F3] h-2.5 rounded-full overflow-hidden border border-[#E6DFD1]">
                          <div className="bg-[#C8A84B] h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="flex justify-between text-[11px] text-[#6B7280]">
                          <span>{pct}% Funded This Month</span>
                          <span>{monastery.currentSponsors} Monthly Sponsors</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E6DFD1] flex items-center gap-3">
                      <button
                        onClick={() => openDonationModal(`${monastery.nameEnglish} (${monastery.nameAmharic})`, 1500)}
                        className="flex-1 btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        <span>Sponsor this Monastery</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW D: ACTIVE CAMPAIGNS LIST (/give/campaigns)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'campaigns' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">SPECIAL CHURCH INITIATIVES</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <Target className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'ወቅታዊ የልማትና የበረከት ዘመቻዎች' : 'Active Church Campaigns & Relief Funds'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Holy Synod authorized crowdfunding initiatives for heritage preservation, rural wells, youth theological education, and humanitarian relief.
              </p>
            </div>
          </div>

          {/* Category Filter & Search Bar */}
          <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-[#855B09] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={campaignSearch}
                onChange={(e) => setCampaignSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-[#E6DFD1] text-xs sm:text-sm focus:outline-none focus:border-[#C8A84B] bg-[#FAF8F3]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
              {[
                'ALL',
                'Heritage Restoration',
                'Education & Archive',
                'Community Support',
                'Humanitarian Relief',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCampaignCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    campaignCategory === cat
                      ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                      : 'bg-[#FAF8F3] text-[#6B7280] hover:text-[#2C1D07] border border-[#E6DFD1]'
                  }`}
                >
                  {cat === 'ALL' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCampaigns.map((camp) => {
              const pct = Math.round((camp.raisedAmountETB / camp.targetAmountETB) * 100);
              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={camp.image}
                      alt={camp.titleEnglish}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="badge-gold text-[10px] uppercase font-bold shadow-md">
                        {camp.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[11px] text-[#C8A84B] font-mono mb-1">⏳ {camp.daysRemaining} days remaining</div>
                      <h3 className="text-xl font-bold font-geez">{camp.titleAmharic}</h3>
                      <p className="text-xs text-stone-200">{camp.titleEnglish}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-[#4A3B22] leading-relaxed">
                      {camp.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#855B09] font-mono">
                          ETB {camp.raisedAmountETB.toLocaleString()}
                        </span>
                        <span className="text-[#6B7280]">
                          Goal: ETB {camp.targetAmountETB.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-[#FAF8F3] h-3 rounded-full overflow-hidden border border-[#E6DFD1]">
                        <div className="bg-[#C8A84B] h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-[11px] text-[#6B7280]">
                        <span>{pct}% Funded</span>
                        <span>{camp.donorsCount.toLocaleString()} Donors</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E6DFD1] flex items-center gap-3">
                      <button
                        onClick={() => openDonationModal(camp.titleEnglish, 2000)}
                        className="flex-1 btn-gold py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        <span>Donate Now</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCampaignSlug(camp.slug);
                          setCurrentSection('campaign_detail');
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-[#2C1D07] text-xs font-bold"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW E: INDIVIDUAL CAMPAIGN PAGE (/give/campaigns/[slug])
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'campaign_detail' && currentCampaign && (
        <div className="space-y-8 animate-fadeIn">
          {/* Back button */}
          <button
            onClick={() => setCurrentSection('campaigns')}
            className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1.5"
          >
            ← Back to All Active Campaigns
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col (8 cols) - Story, Updates, Budget */}
            <div className="lg:col-span-8 space-y-8">
              {/* Campaign Banner Header */}
              <div className="bg-white rounded-3xl border border-[#E6DFD1] overflow-hidden shadow-sm">
                <div className="relative h-72 sm:h-96 w-full">
                  <img
                    src={currentCampaign.image}
                    alt={currentCampaign.titleEnglish}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="badge-gold text-xs font-bold uppercase shadow-lg">
                      {currentCampaign.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-geez">{currentCampaign.titleAmharic}</h2>
                    <p className="text-sm font-medium text-[#C8A84B]">{currentCampaign.titleEnglish}</p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#855B09]">Project Background & Spiritual Mandate</h4>
                    <p className="text-xs sm:text-sm text-[#2C1D07] font-geez leading-relaxed bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1]">
                      {currentCampaign.longDescriptionAm}
                    </p>
                    <p className="text-xs sm:text-sm text-[#4A3B22] leading-relaxed pt-2">
                      {currentCampaign.longDescriptionEn}
                    </p>
                  </div>

                  {/* Leadership Box */}
                  <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] text-xs space-y-1">
                    <div><strong>Supervising Authority:</strong> {currentCampaign.organizer}</div>
                    <div><strong>Episcopal Overseer:</strong> {currentCampaign.leadBishop}</div>
                  </div>
                </div>
              </div>

              {/* Budget Allocation Breakdown */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
                <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#855B09]" />
                  <span>Transparent Budget Allocation (የበጀት ክፍፍል ዝርዝር)</span>
                </h3>
                <div className="space-y-3">
                  {currentCampaign.budgetBreakdown.map((b, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#2C1D07]">{b.category}</span>
                        <span className="font-mono text-[#855B09]">ETB {b.amountETB.toLocaleString()} ({b.percentage}%)</span>
                      </div>
                      <div className="w-full bg-[#FAF8F3] h-2.5 rounded-full overflow-hidden border border-[#E6DFD1]">
                        <div className="bg-[#C8A84B] h-full rounded-full" style={{ width: `${b.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Bank Accounts */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
                <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#855B09]" />
                  <span>Direct Bank Wire & App Accounts (የባንክ ሒሳብ ቁጥሮች)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCampaign.bankAccounts.map((b, i) => (
                    <div key={i} className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#E6DFD1] space-y-1 text-xs">
                      <div className="font-bold text-[#855B09]">{b.bank}</div>
                      <div className="font-mono text-base font-black text-[#2C1D07]">{b.account}</div>
                      <div className="text-[11px] text-[#6B7280]">Branch: {b.branch}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Updates */}
              {currentCampaign.updates && currentCampaign.updates.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
                  <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#855B09]" />
                    <span>Field Progress Updates (የሥራ እንቅስቃሴ ሪፖርቶች)</span>
                  </h3>
                  <div className="space-y-4">
                    {currentCampaign.updates.map((up, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-1 text-xs">
                        <div className="flex justify-between items-center font-bold text-[#855B09]">
                          <span>{up.title}</span>
                          <span className="font-mono text-[10px] text-[#6B7280]">{up.date} ({up.ethiopianDate})</span>
                        </div>
                        <p className="text-[#4A3B22] leading-relaxed pt-1">{up.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col (4 cols) - Sticky Donation Card */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#C8A84B] shadow-xl space-y-6 lg:sticky lg:top-28">
              <div className="space-y-2">
                <span className="badge-gold text-[9px] uppercase font-bold">ONLINE GIVING GATEWAY</span>
                <div className="text-2xl font-black text-[#2C1D07] font-mono">
                  ETB {currentCampaign.raisedAmountETB.toLocaleString()}
                </div>
                <div className="text-xs text-[#6B7280]">
                  raised of ETB {currentCampaign.targetAmountETB.toLocaleString()} goal
                </div>
                <div className="w-full bg-[#FAF8F3] h-3 rounded-full overflow-hidden border border-[#E6DFD1]">
                  <div
                    className="bg-[#C8A84B] h-full rounded-full"
                    style={{ width: `${Math.round((currentCampaign.raisedAmountETB / currentCampaign.targetAmountETB) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-[#855B09] pt-1">
                  <span>{Math.round((currentCampaign.raisedAmountETB / currentCampaign.targetAmountETB) * 100)}% Funded</span>
                  <span>{currentCampaign.donorsCount.toLocaleString()} Donors</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DFD1] space-y-3">
                <button
                  onClick={() => openDonationModal(currentCampaign.titleEnglish, 2500)}
                  className="w-full btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Donate to This Fund</span>
                </button>

                <button
                  onClick={() => {
                    const url = `${window.location.origin}/give/campaigns/${currentCampaign.slug}`;
                    navigator.clipboard.writeText(url);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-xs font-bold text-[#855B09] flex items-center justify-center gap-2"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Campaign Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW F: GENERAL CHURCH FUND (/give/general)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'general' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">CENTRAL PATRIARCHATE STEWARDSHIP</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <Building className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'የመንበረ ፓትርያርክ ማዕከላዊ ፈንድ ምሰሶዎች' : 'General Church Fund — 5 Core Pillars'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Unrestricted central contributions distributed according to Holy Synod annual budget allocations across all global dioceses.
              </p>
            </div>
            <button
              onClick={() => openDonationModal('General Patriarchate Central Fund', 2000)}
              className="btn-gold px-6 py-3 text-xs font-bold flex items-center gap-2 shadow-sm shrink-0"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Give to General Fund</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GENERAL_FUND_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white p-6 rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="badge-gold text-[9px]">{pillar.percentageAllocation}% of Annual Budget</span>
                    <span className="font-mono text-xs font-bold text-[#855B09]">
                      ETB {(pillar.annualBudgetETB / 1000000).toFixed(0)}M
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#2C1D07] font-geez">{pillar.titleAm}</h3>
                    <p className="text-xs text-[#855B09] font-medium">{pillar.titleEn}</p>
                  </div>

                  <p className="text-xs text-[#4A3B22] leading-relaxed">
                    {pillar.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6DFD1]">
                  <button
                    onClick={() => openDonationModal(`Pillar: ${pillar.titleEn}`, 1500)}
                    className="w-full btn-gold py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Designate to this Pillar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW G: FINANCIAL TRANSPARENCY DASHBOARD (/give/transparency)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'transparency' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="badge-gold text-[10px] uppercase font-bold">FISCAL INTEGRITY & AUDIT OVERSIGHT</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-[#855B09]" />
                <span>{language === 'am' ? 'የፋይናንስ ግልጽነትና የኦዲት ሪፖርቶች' : 'Financial Transparency & Audited Reports'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                Every contribution is audited under the supervision of the Holy Synod Audit Commission and independent international accounting standards.
              </p>
            </div>
            <div className="bg-[#FFF8E7] px-4 py-2 rounded-2xl border border-[#E6DFD1] text-xs font-bold text-[#855B09] shrink-0">
              Audit Firm: {TRANSPARENCY_STATS.auditFirm}
            </div>
          </div>

          {/* Two Columns: Income Sources vs Expenditures */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Income Sources */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-5">
              <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#855B09]" />
                <span>Sources of Church Funds (የገቢ ምንጮች)</span>
              </h3>
              <div className="space-y-4">
                {TRANSPARENCY_STATS.incomeSources.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#2C1D07]">{item.source}</span>
                      <span className="font-mono text-[#855B09]">ETB {(item.amountETB / 1000000).toFixed(1)}M ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#FAF8F3] h-3 rounded-full overflow-hidden border border-[#E6DFD1]">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#C8A84B] h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expenditures */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-5">
              <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#855B09]" />
                <span>Expenditures & Fund Distribution (የወጪ ክፍፍል)</span>
              </h3>
              <div className="space-y-4">
                {TRANSPARENCY_STATS.expenditureBreakdown.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#2C1D07]">{item.sector}</span>
                      <span className="font-mono text-[#855B09]">ETB {(item.amountETB / 1000000).toFixed(1)}M ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#FAF8F3] h-3 rounded-full overflow-hidden border border-[#E6DFD1]">
                      <div className="bg-gradient-to-r from-[#800020] to-[#C8A84B] h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Downloadable Annual Audit PDF Reports */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
            <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#855B09]" />
              <span>Download Official Synod Audited Financial Statements</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRANSPARENCY_STATS.auditedReports.map((rep, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-[#2C1D07]">{rep.title}</div>
                    <div className="text-[11px] text-[#6B7280] font-mono">{rep.date} • {rep.size} ({rep.fileType})</div>
                  </div>
                  <button
                    onClick={handleDownloadReceipt}
                    className="p-2.5 rounded-xl bg-white border border-[#E6DFD1] hover:border-[#C8A84B] text-[#855B09] transition-all shrink-0"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW H: DONOR ACCOUNT PORTAL (/give/account)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'account' && (
        <div className="space-y-8 animate-fadeIn">
          {/* User Profile Bar */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-[#FFF8E7] text-[#855B09] border-2 border-[#C8A84B] flex items-center justify-center font-bold text-2xl font-geez shrink-0">
                ዮ
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="badge-gold text-[9px] uppercase font-bold">FAITHFUL MEMBER</span>
                  <span className="text-xs text-[#6B7280]">Member since {MOCK_DONOR_PROFILE.memberSince}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">
                  {MOCK_DONOR_PROFILE.name}
                </h2>
                <p className="text-xs text-[#855B09] font-medium">
                  Baptismal: {MOCK_DONOR_PROFILE.baptismalName} • {MOCK_DONOR_PROFILE.memberParish}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="bg-[#FAF8F3] px-4 py-3 rounded-2xl border border-[#E6DFD1] text-center">
                <div className="text-lg font-black text-[#855B09] font-mono">
                  ETB {MOCK_DONOR_PROFILE.totalLifetimeETB.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold text-[#6B7280] uppercase">Lifetime Giving</div>
              </div>
              <button
                onClick={() => openDonationModal('Parish Tithe / Asrat', 2000)}
                className="btn-gold px-5 py-3 text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Make a Donation</span>
              </button>
            </div>
          </div>

          {/* Active Recurring Pledges */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
            <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#855B09]" />
              <span>Active Recurring Pledges (የወርሃዊ መዋጮ ቃል ኪዳን)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_RECURRING_PLEDGES.map((plg) => (
                <div key={plg.id} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-2 text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-[#2C1D07]">{plg.designation}</span>
                    <span className="badge-gold text-[9px]">{plg.status}</span>
                  </div>
                  <div className="text-base font-black text-[#855B09] font-mono">
                    {plg.currency} {plg.amount.toLocaleString()} / {plg.frequency}
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Next Charge: {plg.nextBillingDate} • via {plg.paymentMethod}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donation History Table with Receipt Downloads */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#855B09]" />
                <span>Giving History & Tax Receipts (የልገሳ ታሪክ)</span>
              </h3>
              <button
                onClick={handleDownloadReceipt}
                className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Annual Statement</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E6DFD1] text-[#855B09] uppercase tracking-wider font-bold">
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Designation</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Method</th>
                    <th className="py-3 px-3">Receipt No.</th>
                    <th className="py-3 px-3 text-right">Tax Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DFD1]">
                  {MOCK_DONOR_HISTORY.map((txn) => (
                    <tr key={txn.id} className="hover:bg-[#FAF8F3] transition-colors">
                      <td className="py-3 px-3 font-mono text-[#6B7280]">{txn.date}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#2C1D07]">{txn.designation}</div>
                        <div className="text-[10px] text-[#855B09] font-geez">{txn.designationAm}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#855B09]">
                        {txn.currency} {txn.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-[#6B7280]">{txn.paymentMethod}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#6B7280]">{txn.receiptNumber}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={handleDownloadReceipt}
                          className="px-3 py-1 rounded-lg bg-white border border-[#E6DFD1] hover:border-[#C8A84B] text-[11px] font-bold text-[#855B09] inline-flex items-center gap-1 shadow-sm"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══ 4. UNIFIED PAYMENT MODAL / GATEWAY ═════════════════════ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#C8A84B] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1A2C1C] to-[#2C1D07] p-6 text-white relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="badge-gold text-[9px] uppercase font-bold">SECURE ONLINE GIVING</span>
                <span className="text-[10px] text-stone-300">256-Bit SSL Encrypted</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-geez leading-tight">
                {donationDesignation}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleDonateSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-[#4A3B22]">
              {/* Currency & Presets */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#855B09] uppercase tracking-wider text-[10px]">
                    Select Donation Amount
                  </label>
                  <div className="flex gap-1 bg-[#FAF8F3] p-1 rounded-lg border border-[#E6DFD1]">
                    {(['ETB', 'USD', 'EUR', 'GBP'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setSelectedCurrency(curr)}
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                          selectedCurrency === curr ? 'bg-[#C8A84B] text-[#1A2C1C]' : 'text-[#6B7280]'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 2500, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setAmountPreset(amt);
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        amountPreset === amt && !customAmount
                          ? 'bg-[#C8A84B] text-[#1A2C1C] border-[#C8A84B] ring-2 ring-[#C8A84B]/30'
                          : 'bg-[#FAF8F3] border-[#E6DFD1] text-[#2C1D07]'
                      }`}
                    >
                      {selectedCurrency} {amt}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder="Or enter custom amount..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#C8A84B]"
                />
              </div>

              {/* Giving Frequency */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#855B09] uppercase tracking-wider text-[10px]">Frequency</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'one-time', l: 'One-Time' },
                    { id: 'monthly', l: 'Monthly Tithe' },
                    { id: 'annual', l: 'Annual Pledge' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrequency(f.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                        frequency === f.id
                          ? 'bg-[#1A2C1C] text-[#C8A84B] border-[#1A2C1C]'
                          : 'bg-[#FAF8F3] border-[#E6DFD1] text-[#6B7280]'
                      }`}
                    >
                      {f.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#855B09] uppercase tracking-wider text-[10px]">Payment Gateway</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'telebirr', name: 'Telebirr', sub: 'Instant App/QR' },
                    { id: 'cbe', name: 'CBE Birr', sub: 'Direct Bank' },
                    { id: 'card', name: 'Card / Stripe', sub: 'Visa/Mastercard' },
                    { id: 'paypal', name: 'PayPal', sub: 'International' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === m.id
                          ? 'bg-[#FFF8E7] border-2 border-[#C8A84B] text-[#855B09]'
                          : 'bg-[#FAF8F3] border-[#E6DFD1] text-[#6B7280]'
                      }`}
                    >
                      <div className="font-bold text-xs">{m.name}</div>
                      <div className="text-[9px] opacity-75">{m.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Donor Details */}
              <div className="space-y-2 pt-2 border-t border-[#E6DFD1]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Full Name (or Baptismal Name)"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    disabled={isAnonymous}
                    className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C8A84B]"
                  />
                  <input
                    type="email"
                    placeholder="Email for Receipt"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                    className="bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C8A84B]"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-[#E6DFD1] text-[#855B09] focus:ring-[#C8A84B]"
                  />
                  <span className="text-[11px] text-[#6B7280]">Keep my contribution anonymous in public donor registers</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3 text-xs font-black flex items-center justify-center gap-2 shadow-lg"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>
                  Confirm Contribution of {selectedCurrency} {(customAmount ? parseFloat(customAmount) : amountPreset).toLocaleString()}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
