import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../components/layout/LanguageContext';
import {
  MOCK_CAMPAIGNS,
  MOCK_MONASTERIES,
  GENERAL_FUND_PILLARS,
  TRANSPARENCY_STATS,
  MOCK_DONOR_HISTORY,
} from '../data/mockGive';
import { MOCK_CHURCHES } from '../data/mockChurches';
import {
  Heart, CheckCircle,
  Sparkles, Church as ChurchIcon, Landmark,
  ShieldCheck, FileText, ArrowRight, Download,
  Search, Target,
  Clock, Copy, Check,
  TrendingUp, BarChart3,
  Building, BookOpen,
  Mail, Phone, MapPin, Calendar,
  Info, Coins, Settings,
  MessageSquare
} from 'lucide-react';

export const GivingView: React.FC = () => {
  const { language, activeView } = useLanguage();

  /* ── Active Giving Sub-section ── */
  type GiveSection = 'hub' | 'causes' | 'campaign_detail' | 'account';
  const [currentSection, setCurrentSection] = useState<GiveSection>('hub');
  const [selectedCampaignSlug, setSelectedCampaignSlug] = useState<string | null>(null);
  const [donorTab, setDonorTab] = useState<'overview' | 'my_giving' | 'pledges' | 'campaigns' | 'impact' | 'documents' | 'settings'>('overview');
  const [causesTab, setCausesTab] = useState<'campaigns' | 'monasteries' | 'parishes' | 'general'>('campaigns');

  /* ── Sync with activeView route from Header or URLs ── */
  useEffect(() => {
    if (activeView === 'give/account' || activeView === 'give/my-giving') {
      setCurrentSection('account');
    } else if (activeView.startsWith('give/campaigns/')) {
      const slug = activeView.replace('give/campaigns/', '');
      setSelectedCampaignSlug(slug);
      setCurrentSection('campaign_detail');
    } else if (activeView === 'give/causes' || activeView === 'give/campaigns' || activeView === 'give/monasteries' || activeView === 'give/parishes' || activeView === 'give/general') {
      if (activeView === 'give/monasteries') setCausesTab('monasteries');
      else if (activeView === 'give/parishes') setCausesTab('parishes');
      else if (activeView === 'give/general') setCausesTab('general');
      else setCausesTab('campaigns');
      setCurrentSection('causes');
    } else {
      setCurrentSection('hub');
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
    <div className="w-full animate-fadeIn">
      {/* ══ 1. COMPACT HERO WITH CENTERED DESIGN ══ */}
      {currentSection === 'hub' && (
        <section className="relative w-full py-20 sm:py-24 md:py-28 min-h-[460px] md:min-h-[500px] flex flex-col justify-center items-center text-center overflow-hidden bg-[#120B04] text-white px-4 sm:px-6 lg:px-8">
          {/* Full-bleed Cathedral Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/images/give_hero_cathedral.jpg"
              alt="Church of Our Lady Mary of Zion in Axum"
              className="w-full h-full object-cover object-center scale-100"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#120B04]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center space-y-5 pt-8 pb-4">
            {/* Prominent Centered Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-normal sm:tracking-wide leading-tight font-geez drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
              {language === 'am' ? (
                <>
                  የበረከትና <span className="text-[#F3CE65]">የምጽዋት</span> ማዕከል
                </>
              ) : language === 'ti' ? (
                <>
                  ናይ በረኸትን <span className="text-[#F3CE65]">ምጽዋትን</span> ማእከል
                </>
              ) : language === 'ge' ? (
                <>
                  ምጽዋተ <span className="text-[#F3CE65]">ቤተ ክርስቲያን</span> ቅድስት
                </>
              ) : (
                <>
                  GIVE TO THE <span className="text-[#F3CE65]">HOLY CHURCH</span>
                </>
              )}
            </h1>

            {/* Centered Subtitle & Scripture Quote (According to user language choice) */}
            <div className="space-y-1.5 max-w-3xl">
              <p className="text-base sm:text-xl md:text-2xl text-stone-100 font-medium leading-relaxed drop-shadow-md font-geez">
                {language === 'am' && "“እያንዳንዱ እንደ ወደደ በልቡ ይስጥ፥ እግዚአብሔር በደስታ የሚሰጠውን ይወዳልና።”"}
                {language === 'ti' && "“ነፍሲ ወከፍ ከምቲ ብልቡ ዝሓሰቦ ይሃብ፡ ኣምላኽ ብሓጎስ ዝህብ እዩ ዝፈቱ እሞ ብጓሂ ወይ ብግዲ ኣይኹን።”"}
                {language === 'ge' && "“ለለአሐዱ በከመ ሐለየ በልቡ ይሀብ፤ እስመ እግዚአብሔር የኀሥሥ ዘይሁብ በፍሥሓ።”"}
                {language === 'en' && "\"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.\""}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-[#F3CE65] font-semibold italic drop-shadow">
                {language === 'am' && "— ፪ኛ ቆሮንቶስ ፱ ፡ ፯"}
                {language === 'ti' && "— ፪ይ ቆሮንቶስ ፱ ፡ ፯"}
                {language === 'ge' && "— ፪ኛ ቆሮንቶስ ፱ ፡ ፯"}
                {language === 'en' && "— 2 Corinthians 9:7"}
              </p>
            </div>

            {/* Action Buttons: Centered Pill Style */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentSection('causes');
                  setCausesTab('campaigns');
                }}
                className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3CE65] to-[#C8A84B] hover:from-[#F3CE65] hover:to-[#D4AF37] text-[#1A2C1C] text-sm sm:text-base font-extrabold shadow-2xl hover:shadow-[0_0_35px_rgba(243,206,101,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer tracking-wide flex items-center gap-2.5"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>
                  {language === 'am' ? 'አሁኑኑ ይስጡ (Give Now)' :
                   language === 'ti' ? 'ሕጂ ሃቡ (Give Now)' :
                   language === 'ge' ? 'ሀቡ ይእዜ (Give Now)' :
                   'Give Now'}
                </span>
              </button>

              <button
                onClick={() => {
                  setCurrentSection('causes');
                  setCausesTab('campaigns');
                }}
                className="px-8 py-3.5 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/30 hover:border-[#F3CE65] text-sm sm:text-base font-bold backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>
                  {language === 'am' ? 'ዘመቻዎችን ይመልከቱ' :
                   language === 'ti' ? 'ዘመቻታት ርኣዩ' :
                   language === 'ge' ? 'ዘመቻታት ርኣዩ' :
                   'Explore Campaigns'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ══ 2. SUCCESS RECEIPT BANNER ══ */}
      {isSuccessToast && receiptData && (
        <div className="container mx-auto px-4 pt-6 max-w-7xl">
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
                className="flex-1 md:flex-none btn-gold px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Tax Receipt</span>
              </button>
              <button
                onClick={() => setIsSuccessToast(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ 3. GIVING HUB (FEATURED URGENT CAMPAIGN & AUDITED CHURCH IMPACT OVERVIEW) ══ */}
      {currentSection === 'hub' && (
        <div className="container mx-auto px-4 py-10 space-y-10 max-w-7xl animate-fadeIn">
          {/* Quick Giving Designation 4 Large Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'campaigns',
                titleEn: 'Active Campaigns',
                titleAm: 'ልዩ የልማት ዘመቻዎች',
                descEn: 'Lalibela restoration, manuscript digitization, and emergency famine relief.',
                icon: Target,
                stat: `${MOCK_CAMPAIGNS.length} Active Campaigns`,
                color: 'from-[#FFF8E7] to-white',
                border: '#C8A84B',
              },
              {
                id: 'monasteries',
                titleEn: 'Adopt a Monastery',
                titleAm: 'ገዳማትን ይደግፉ',
                descEn: 'Monthly sustenance for 42 ancient cliffside and wilderness hermits.',
                icon: Landmark,
                stat: '42 Historic Monasteries',
                color: 'from-white to-[#FAF8F3]',
                border: '#E6DFD1',
              },
              {
                id: 'parishes',
                titleEn: 'Give to a Parish',
                titleAm: 'ለደብርዎ ዐሥራትና መዋጮ',
                descEn: 'Direct tithe (Asrat) and Sunday offerings to any registered local church.',
                icon: ChurchIcon,
                stat: `${MOCK_CHURCHES.length}+ Parishes Worldwide`,
                color: 'from-white to-[#FAF8F3]',
                border: '#E6DFD1',
              },
              {
                id: 'general',
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
                  onClick={() => {
                    setCurrentSection('causes');
                    setCausesTab(card.id as any);
                  }}
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
                  className="btn-gold px-6 py-3 text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Donate to This Campaign</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedCampaignSlug(MOCK_CAMPAIGNS[0].slug);
                    setCurrentSection('campaign_detail');
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-[#2C1D07] text-xs font-bold transition-all cursor-pointer"
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

          {/* Audited Church Impact Overview & Live Transparency Ticker */}
          <div className="bg-[#FAF8F3] p-8 rounded-3xl border border-[#E6DFD1] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="badge-gold text-[10px] uppercase font-bold">STEWARDSHIP IMPACT 2026</span>
                <h3 className="text-xl font-black text-[#2C1D07] font-serif">Audited Church Impact Overview</h3>
              </div>
              <div className="bg-[#FFF8E7] px-4 py-2 rounded-2xl border border-[#E6DFD1] text-xs font-bold text-[#855B09] shrink-0">
                Audit Firm: {TRANSPARENCY_STATS.auditFirm}
              </div>
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

          {/* ── Financial Transparency & Audited Reports ──────────────────── */}
          <div id="give-transparency" className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="badge-gold text-[10px] uppercase font-bold">FISCAL INTEGRITY & AUDIT OVERSIGHT</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-serif flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-[#855B09]" />
                  <span>{language === 'am' ? 'የፋይናንስ ግልጽነትና የኦዲት ሪፖርቶች' : 'Financial Transparency & Audited Reports'}</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280]">Every contribution is audited under the supervision of the Holy Synod Audit Commission.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    <button onClick={handleDownloadReceipt}
                      className="p-2.5 rounded-xl bg-white border border-[#E6DFD1] hover:border-[#C8A84B] text-[#855B09] transition-all shrink-0 cursor-pointer" title="Download Report">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW C: CAUSES & GIVING DIRECTORY (/give/causes)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'causes' && (
        <div className="animate-fadeIn w-full flex pt-[72px] sm:pt-[80px] min-h-screen bg-[#FBF9F4] m-0 p-0">
          {/* ══ COMPACT DARK FOREST GREEN SIDEBAR ══ */}
          <aside
            className="w-[220px] shrink-0 flex flex-col sticky top-[72px] sm:top-[80px] overflow-y-auto border-r border-white/10 z-20 left-0"
            style={{ height: 'calc(100vh - 80px)', background: 'linear-gradient(180deg, #1A2C1C 0%, #0F1A10 100%)' }}
          >
            {/* Back Link */}
            <button
              onClick={() => setCurrentSection('hub')}
              className="mx-3 mt-4 mb-1.5 flex items-center gap-1.5 text-[11px] text-[#C8A84B] hover:text-[#E5C368] font-semibold transition-colors cursor-pointer"
            >
              <ArrowRight className="w-3 h-3 rotate-180 shrink-0" />
              <span>Back to Giving Hub</span>
            </button>

            {/* Causes Nav */}
            <nav className="px-2 pt-3 space-y-0.5">
              <div className="px-2 pb-1 text-[8.5px] font-black uppercase tracking-widest text-white/35">
                Causes & Initiatives
              </div>
              {([
                { id: 'campaigns',   labelEn: 'Active Campaigns',    icon: Target,     count: `${MOCK_CAMPAIGNS.length}` },
                { id: 'monasteries', labelEn: 'Adopt a Monastery',   icon: Landmark,   count: `${MOCK_MONASTERIES.length}` },
                { id: 'parishes',    labelEn: 'Give to a Parish',    icon: ChurchIcon, count: `${MOCK_CHURCHES.length}+` },
                { id: 'general',     labelEn: 'General Church Fund', icon: Building,   count: '5 Pillars' },
              ] as const).map((tab) => {
                const Icon = tab.icon;
                const isActive = causesTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCausesTab(tab.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11.5px] font-semibold transition-all cursor-pointer text-left group ${
                      isActive ? 'bg-[#C8A84B] text-[#1A2C1C] font-bold shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#1A2C1C]' : 'text-white/50 group-hover:text-white'}`} />
                      <span className="truncate">{tab.labelEn}</span>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono shrink-0 ml-1 ${
                      isActive ? 'bg-black/20 text-[#1A2C1C] font-bold' : 'bg-white/10 text-white/60'
                    }`}>{tab.count}</span>
                  </button>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="mx-3 my-2.5 border-t border-white/10" />

            {/* Secondary Links */}
            <nav className="px-2 space-y-0.5">
              {([
                { label: 'My Giving',             icon: Heart,         tab: 'my_giving'  },
                { label: 'Pledges & Commitments', icon: ShieldCheck,   tab: 'pledges'    },
                { label: 'Giving History',         icon: Clock,         tab: 'my_giving'  },
                { label: 'Documents & Receipts',  icon: FileText,      tab: 'documents'  },
                { label: 'Support & Help',         icon: MessageSquare, tab: 'overview'   },
                { label: 'Settings',              icon: Settings,      tab: 'settings'   },
              ] as const).map(({ label, icon: Icon, tab }) => (
                <button
                  key={label}
                  onClick={() => { setCurrentSection('account'); setDonorTab(tab as any); }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all cursor-pointer text-left"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 text-white/40" />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </nav>

            <div className="flex-1 min-h-3" />

            {/* Need Assistance Card */}
            <div className="mx-2.5 mb-2.5 rounded-xl border border-[#C8A84B]/25 bg-[#C8A84B]/10 p-3 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#C8A84B]/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-2.5 h-2.5 text-[#C8A84B]" />
                </div>
                <h4 className="text-[10.5px] font-black text-white">Need Assistance?</h4>
              </div>
              <p className="text-[9px] text-white/50 leading-relaxed">Our stewardship team is here to help you.</p>
              <button
                onClick={() => alert('EOTC Donor Desk: info@eotc-stewardship.org')}
                className="w-full py-1.5 px-2.5 rounded-lg bg-[#C8A84B] hover:bg-[#D4AF37] text-[#1A2C1C] text-[9.5px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
              >
                <span>Contact Secretariat</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Church Silhouette Watermark */}
            <div className="pb-2 px-3 opacity-[0.08] pointer-events-none select-none flex justify-center">
              <svg viewBox="0 0 160 80" className="w-full max-w-[120px]" fill="white">
                <rect x="72" y="0" width="3" height="10" rx="1.5"/>
                <rect x="65" y="8" width="17" height="2" rx="1"/>
                <rect x="62" y="10" width="23" height="24" rx="3"/>
                <rect x="69" y="34" width="9" height="44" rx="1.5"/>
                <rect x="14" y="26" width="2" height="7" rx="1"/>
                <rect x="10" y="32" width="9" height="14" rx="2"/>
                <rect x="13" y="46" width="5" height="32" rx="1"/>
                <rect x="130" y="26" width="2" height="7" rx="1"/>
                <rect x="126" y="32" width="9" height="14" rx="2"/>
                <rect x="129" y="46" width="5" height="32" rx="1"/>
                <rect x="0" y="76" width="160" height="4" rx="2"/>
              </svg>
            </div>
          </aside>

          {/* ══ MAIN CONTENT ══ */}
          <div className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 space-y-7 bg-[#FBF9F4]">

            {/* Top Hub Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E6DFD1]">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#2C1D07] font-serif">
                  {language === 'am' ? 'የበረከትና የልገሳ ማዕከል' : 'Welcome to Giving Hub'}
                </h1>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  {language === 'am' ? 'የቅድስት ቤተ ክርስቲያንን ተልዕኮ ይደግፉ፤ ዘላለማዊ በረከት ያግኙ።' : 'Support the mission of the Holy Church and make an eternal impact.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#855B09] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search campaigns, causes..."
                    value={campaignSearch}
                    onChange={(e) => setCampaignSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-[#E6DFD1] text-xs focus:outline-none focus:border-[#C8A84B] bg-white shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* ── Active Campaigns Tab ── */}
            {causesTab === 'campaigns' && (
              <div id="give-campaigns" className="space-y-6 animate-fadeIn">
                {/* Section Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-[#855B09] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#855B09]" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-[#2C1D07] font-serif">
                        {language === 'am' ? 'ወቅታዊ የልማትና የበረከት ዘመቻዎች' : 'Active Church Campaigns & Relief Funds'}
                      </h2>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        Holy Synod authorized crowdfunding initiatives for heritage preservation, rural wells, youth theological education, and humanitarian relief.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#4A3B22] font-semibold self-end sm:self-auto shrink-0 cursor-pointer">
                    <span className="text-[#6B7280]">Sort by:</span>
                    <span className="text-[#855B09] font-bold">Recently Added ▾</span>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['ALL', 'Heritage Restoration', 'Education & Archive', 'Community Support', 'Humanitarian Relief'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCampaignCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        campaignCategory === cat
                          ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                          : 'bg-white text-[#6B7280] hover:text-[#2C1D07] border border-[#E6DFD1]'
                      }`}
                    >
                      {cat === 'ALL' ? 'All Categories' : cat}
                    </button>
                  ))}
                </div>

                {/* Full-width Horizontal Campaign Cards */}
                <div className="space-y-4">
                  {filteredCampaigns.map((camp) => {
                    const pct = Math.round((camp.raisedAmountETB / camp.targetAmountETB) * 100);
                    return (
                      <div
                        key={camp.id}
                        className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all p-4 sm:p-5 flex flex-col lg:flex-row gap-5 items-stretch justify-between group"
                      >
                        {/* Left: Campaign Image */}
                        <div className="relative w-full lg:w-72 xl:w-80 h-48 lg:h-auto min-h-[180px] rounded-xl overflow-hidden shrink-0">
                          <img
                            src={camp.image}
                            alt={camp.titleEnglish}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="bg-[#FAF8F3]/90 text-[#855B09] text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-[#E6DFD1]">
                              {camp.category}
                            </span>
                          </div>
                        </div>

                        {/* Center: Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5 py-1">
                          <div className="space-y-1.5">
                            <div className="text-[11px] font-bold text-[#855B09] font-geez">{camp.titleAmharic}</div>
                            <h3 className="text-base sm:text-lg font-bold text-[#2C1D07] font-serif leading-snug">
                              {camp.titleEnglish}
                            </h3>
                            <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                              {camp.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-[11px] text-[#6B7280] font-medium pt-1">
                            <span className="flex items-center gap-1 font-mono">⏳ {camp.daysRemaining} days remaining</span>
                            <span className="flex items-center gap-1">👥 {camp.donorsCount.toLocaleString()} Devout Donors</span>
                          </div>
                        </div>

                        {/* Right: Funding & Action Column */}
                        <div className="w-full lg:w-64 xl:w-72 shrink-0 flex flex-col justify-between space-y-3 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E6DFD1] lg:pl-5">
                          <div className="space-y-1.5">
                            <div className="text-base font-bold text-[#2C1D07] font-mono">
                              ETB {camp.raisedAmountETB.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-[#6B7280]">
                              raised of ETB {camp.targetAmountETB.toLocaleString()} goal
                            </div>
                            <div className="w-full bg-[#FAF8F3] h-2 rounded-full overflow-hidden border border-[#E6DFD1] mt-1.5">
                              <div
                                className="bg-[#C8A84B] h-full rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="text-[10px] text-[#855B09] font-bold font-mono">
                              {pct}% Funded
                            </div>
                          </div>

                          <div className="space-y-2 pt-1">
                            <button
                              onClick={() => openDonationModal(camp.titleEnglish, 2000)}
                              className="w-full py-2.5 rounded-xl bg-[#C8A84B] hover:bg-[#D4AF37] text-[#1A2C1C] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                              <span>Donate Now</span>
                            </button>
                            <button
                              onClick={() => { setSelectedCampaignSlug(camp.slug); setCurrentSection('campaign_detail'); }}
                              className="w-full py-2 rounded-xl border border-[#E6DFD1] hover:border-[#C8A84B] text-[#4A3B22] hover:text-[#855B09] bg-white text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                            >
                              <span>View Details</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Adopt a Monastery Tab ── */}
            {causesTab === 'monasteries' && (
              <div id="give-monastery" className="space-y-6 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#855B09] flex items-center justify-center shrink-0 mt-0.5">
                    <Landmark className="w-4 h-4 text-[#855B09]" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#2C1D07] font-serif">
                      {language === 'am' ? 'የገዳማውያን ጉዲፈቻና የድጋፍ መርሐ ግብር' : 'Adopt & Sponsor an Ancient Monastery'}
                    </h2>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Guarantee food, medical care, and altar supplies for Ethiopia's 1,600-year-old desert monasteries.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {MOCK_MONASTERIES.map((monastery) => {
                    const pct = Math.min(100, Math.round((monastery.raisedMonthlyETB / monastery.monthlyTargetETB) * 100));
                    return (
                      <div
                        key={monastery.id}
                        className="bg-white rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all p-4 sm:p-5 flex flex-col lg:flex-row gap-5 items-stretch justify-between group"
                      >
                        <div className="relative w-full lg:w-72 xl:w-80 h-48 lg:h-auto min-h-[180px] rounded-xl overflow-hidden shrink-0">
                          <img src={monastery.image} alt={monastery.nameEnglish} className="w-full h-full object-cover" />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="bg-[#C8A84B] text-[#1A2C1C] text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                              {monastery.centuryFounded}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5 py-1">
                          <div className="space-y-1.5">
                            <div className="text-[11px] font-bold text-[#855B09] font-geez">{monastery.nameAmharic}</div>
                            <h3 className="text-base sm:text-lg font-bold text-[#2C1D07] font-serif leading-snug">
                              {monastery.nameEnglish} • <span className="text-xs text-[#6B7280] font-sans font-normal">{monastery.diocese}</span>
                            </h3>
                            <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                              {monastery.needDescription}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {monastery.urgentNeeds.map((need, idx) => (
                                <span key={idx} className="bg-[#FAF8F3] border border-[#E6DFD1] text-[#2C1D07] text-[9px] font-semibold px-2 py-0.5 rounded-lg">
                                  • {need}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="w-full lg:w-64 xl:w-72 shrink-0 flex flex-col justify-between space-y-3 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E6DFD1] lg:pl-5">
                          <div className="space-y-1.5">
                            <div className="text-base font-bold text-[#2C1D07] font-mono">
                              ETB {monastery.raisedMonthlyETB.toLocaleString()} / mo
                            </div>
                            <div className="text-[11px] text-[#6B7280]">
                              Target: ETB {monastery.monthlyTargetETB.toLocaleString()} / mo
                            </div>
                            <div className="w-full bg-[#FAF8F3] h-2 rounded-full overflow-hidden border border-[#E6DFD1] mt-1.5">
                              <div className="bg-[#C8A84B] h-full rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="flex justify-between text-[10px] text-[#855B09] font-bold">
                              <span>{pct}% Funded</span>
                              <span className="text-[#6B7280] font-normal">{monastery.currentSponsors} Sponsors</span>
                            </div>
                          </div>

                          <button
                            onClick={() => openDonationModal(`${monastery.nameEnglish} (${monastery.nameAmharic})`, 1500)}
                            className="w-full py-2.5 rounded-xl bg-[#C8A84B] hover:bg-[#D4AF37] text-[#1A2C1C] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>Sponsor this Monastery</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Give to a Parish Tab ── */}
            {causesTab === 'parishes' && (
              <div id="give-parish" className="space-y-6 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#855B09] flex items-center justify-center shrink-0 mt-0.5">
                    <ChurchIcon className="w-4 h-4 text-[#855B09]" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#2C1D07] font-serif">
                      {language === 'am' ? 'ለአጥቢያ ቤተ ክርስቲያንዎ መዋጮ ያድርጉ' : 'Give Directly to Your Local Parish'}
                    </h2>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Select your home parish to remit monthly tithes (ዐሥራት), building donations, or Sunday school sponsorships.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#855B09] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search parish by name or city..."
                      value={churchSearch}
                      onChange={(e) => setChurchSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E6DFD1] text-xs focus:outline-none focus:border-[#C8A84B] bg-white"
                    />
                  </div>
                  <select
                    value={churchDioceseFilter}
                    onChange={(e) => setChurchDioceseFilter(e.target.value)}
                    className="bg-white border border-[#E6DFD1] rounded-xl px-4 py-2.5 text-xs font-semibold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
                  >
                    <option value="ALL">All Dioceses Worldwide</option>
                    <option value="Addis Ababa">Addis Ababa Diocese</option>
                    <option value="Gondar">Gondar Diocese</option>
                    <option value="Lalibela">Lalibela Diocese</option>
                    <option value="Axum">Axum Diocese</option>
                    <option value="North America">North America Diocese</option>
                    <option value="UK & Europe">UK & Europe Diocese</option>
                    <option value="Canada">Canada Diocese</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredChurches.map((church) => (
                    <div
                      key={church.id}
                      className="bg-white p-5 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="badge-gold text-[9px]">{church.city}, {church.country}</span>
                          <span className="text-[9px] font-bold text-[#855B09] font-mono">{church.diocese}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#2C1D07] font-geez">{church.nameAmharic}</h3>
                          <p className="text-[10px] text-[#855B09] font-medium">{church.nameEnglish}</p>
                        </div>
                        <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6DFD1] space-y-0.5 text-[10px] text-[#4A3B22]">
                          <div><strong>Patron:</strong> {church.tabotPatron}</div>
                          <div className="text-[#6B7280]"><strong>Address:</strong> {church.address}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => openDonationModal(`${church.nameEnglish} (${church.nameAmharic})`, 1000)}
                        className="w-full btn-gold py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Give to this Church</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── General Church Fund Tab ── */}
            {causesTab === 'general' && (
              <div id="give-general" className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-[#855B09] flex items-center justify-center shrink-0 mt-0.5">
                      <Building className="w-4 h-4 text-[#855B09]" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-[#2C1D07] font-serif">
                        {language === 'am' ? 'የመንበረ ፓትርያርክ ማዕከላዊ ፈንድ ምሰሶዎች' : 'General Church Fund — 5 Core Pillars'}
                      </h2>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        Unrestricted central contributions distributed according to Holy Synod annual budget allocations.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => openDonationModal('General Patriarchate Central Fund', 2000)}
                    className="btn-gold px-5 py-2.5 text-xs font-bold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer self-start sm:self-auto"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Give to General Fund</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {GENERAL_FUND_PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="bg-white p-5 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="badge-gold text-[9px]">{pillar.percentageAllocation}% Allocation</span>
                          <span className="font-mono text-[10px] font-bold text-[#855B09]">ETB {(pillar.annualBudgetETB / 1000000).toFixed(0)}M</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#2C1D07] font-geez">{pillar.titleAm}</h3>
                          <p className="text-[10px] text-[#855B09] font-medium">{pillar.titleEn}</p>
                        </div>
                        <p className="text-[11px] text-[#4A3B22] leading-relaxed">{pillar.descriptionEn}</p>
                      </div>
                      <button
                        onClick={() => openDonationModal(`Pillar: ${pillar.titleEn}`, 1500)}
                        className="w-full btn-gold py-2 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <span>Designate to this Pillar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────
          VIEW E: INDIVIDUAL CAMPAIGN PAGE (/give/campaigns/[slug])
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'campaign_detail' && currentCampaign && (
        <div className="container mx-auto px-4 pt-28 pb-16 space-y-8 animate-fadeIn max-w-7xl">
          {/* Back button */}
          <button
            onClick={() => setCurrentSection('hub')}
            className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            ← Back to Giving Hub
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
                  className="w-full btn-gold py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
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
                  className="w-full py-2.5 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1] hover:border-[#C8A84B] text-xs font-bold text-[#855B09] flex items-center justify-center gap-2 cursor-pointer"
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
          VIEW H: DONOR ACCOUNT PORTAL (/give/account)
      ─────────────────────────────────────────────────────────── */}
      {currentSection === 'account' && (
        <div className="container mx-auto px-4 pt-28 pb-16 space-y-6 animate-fadeIn max-w-7xl">
          {/* Top Return Button */}
          <div className="flex items-center justify-between pb-2 border-b border-[#E6DFD1]">
            <button
              onClick={() => setCurrentSection('hub')}
              className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              ← Back to Giving Hub
            </button>
            <span className="badge-gold text-[10px] uppercase font-bold tracking-wider">
              EOTC Official Faithful Portal
            </span>
          </div>

          {/* ══ FULL-WIDTH MAIN CONTENT ══ */}
          <main className="w-full space-y-6">
              {/* 1. Profile Overview Card */}
              <div className="bg-white rounded-2xl border border-[#E6DFD1] p-6 sm:p-7 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-[#2C1D07] font-serif">Profile Overview</h3>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {/* Left: Avatar & Personal Info */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden shrink-0 border-2 border-[#E6DFD1] shadow-sm relative">
                      <img
                        src="/assets/images/holy_trinity_interior.jpg"
                        alt="Profile avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-[#2C1D07] font-serif">
                          Yohannes Wolde Mariam
                        </h2>
                        <span className="bg-[#FFF8E7] text-[#855B09] border border-[#E6DFD1] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          Faithful Member
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#6B7280]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#C8A84B] font-bold">†</span>
                          <span>Baptized: Haile Sellassie (ኃይለ ሥላሴ)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                          <span>Holy Trinity Cathedral, Addis Ababa</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                          <span>yohannes.mariam@email.com</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#855B09] shrink-0" />
                          <span>+251 91 123 4567</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Lifetime Giving & Donate Button */}
                  <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#E6DFD1]">
                    <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                      <span>Lifetime Giving</span>
                      <Info className="w-3.5 h-3.5 text-[#855B09]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#2C1D07] font-sans">
                      ETB 48,500
                    </div>
                    <div className="text-[11px] text-[#6B7280]">
                      Since Jun 12, 2023
                    </div>
                    <button
                      onClick={() => openDonationModal('General Church Fund', 2000)}
                      className="mt-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C8A84B] hover:from-[#C8A84B] hover:to-[#D4AF37] text-[#1A2C1C] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Make a Donation</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. 5-Metrics Stat Strip */}
              <div className="bg-white rounded-2xl border border-[#E6DFD1] p-5 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E6DFD1] gap-4 sm:gap-0">
                {[
                  { label: 'Given This Year', val: 'ETB 12,500', icon: Coins },
                  { label: 'Total Donations', val: '8', icon: Heart },
                  { label: 'Active Pledges', val: '2', icon: Calendar },
                  { label: 'Causes Supported', val: '3', icon: ChurchIcon },
                  { label: 'Tax Statement Available', val: '1', icon: FileText },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className={`flex items-center gap-3 ${i > 0 ? 'sm:pl-5' : ''} ${i < 4 ? 'sm:pr-5' : ''} pt-2 sm:pt-0`}>
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] text-[#855B09] border border-[#E6DFD1] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-base font-black text-[#2C1D07] font-sans">{stat.val}</div>
                        <div className="text-[10px] font-medium text-[#6B7280] leading-tight">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3. Two-Column Middle Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Card: Recent Giving Activity */}
                <div className="bg-white rounded-2xl border border-[#E6DFD1] p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#2C1D07] font-serif">Recent Giving Activity</h3>
                      <button
                        onClick={() => setDonorTab('my_giving')}
                        className="text-xs font-bold text-[#855B09] hover:underline cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {[
                        {
                          date: 'Aug 14, 2026',
                          title: 'Lalibela Rock-Hewn Churches Emergency Fund',
                          desc: 'Preserving UNESCO heritage churches',
                          amount: 'ETB 5,000',
                          method: 'Telebirr',
                          img: '/assets/images/lalibela_sunset.jpg',
                        },
                        {
                          date: 'Aug 01, 2026',
                          title: 'Debre Damo Monastery Monthly Adoption',
                          desc: 'Supporting ancient monastic life',
                          amount: 'ETB 1,500',
                          method: 'CBE Birr',
                          img: '/assets/images/debre_damo.jpg',
                        },
                        {
                          date: 'Jul 15, 2026',
                          title: 'General Patriarchate Theological Fund',
                          desc: 'Investing in clergy & theological education',
                          amount: 'ETB 2,500',
                          method: 'Visa **** 4012',
                          img: '/assets/images/hero_church.jpg',
                        },
                        {
                          date: 'Jun 22, 2026',
                          title: 'Saint Yared Manuscripts Digitization',
                          desc: 'Preserving our sacred manuscripts',
                          amount: 'ETB 3,000',
                          method: 'Telebirr',
                          img: '/assets/images/liturgical_manuscript_featured.jpg',
                        },
                      ].map((act, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[#FAF8F3] transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#E6DFD1]">
                              <img src={act.img} alt={act.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-[10px] text-[#6B7280] font-mono">{act.date}</div>
                              <h4 className="text-xs font-bold text-[#2C1D07] truncate">{act.title}</h4>
                              <p className="text-[11px] text-[#6B7280] truncate">{act.desc}</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-xs font-black text-[#2C1D07] font-sans">{act.amount}</div>
                            <span className="text-[9px] font-bold text-[#6B7280] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E6DFD1]">
                              {act.method}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] text-center">
                    <button
                      onClick={() => setDonorTab('my_giving')}
                      className="text-xs font-bold text-[#855B09] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Full Giving History</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Card: Active Monthly Commitments */}
                <div className="bg-white rounded-2xl border border-[#E6DFD1] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#2C1D07] font-serif">Active Monthly Commitments</h3>
                    <button
                      onClick={() => setDonorTab('pledges')}
                      className="text-xs font-bold text-[#855B09] hover:underline cursor-pointer"
                    >
                      Manage All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: 'Debre Damo Hermitage',
                        sub: 'Monthly Sustenance',
                        amount: 'ETB 1,500',
                        cadence: '/ Monthly',
                        next: 'Sept 01, 2026',
                        img: '/assets/images/debre_damo.jpg',
                      },
                      {
                        title: 'Parish Tithe (Asrat) – Holy Trinity Cathedral',
                        sub: '',
                        amount: 'ETB 2,000',
                        cadence: '/ Monthly',
                        next: 'Sept 05, 2026',
                        img: '/assets/images/hero_church.jpg',
                      },
                    ].map((com, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-[#E6DFD1] bg-[#FAF8F3]/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#E6DFD1]">
                            <img src={com.img} alt={com.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs font-bold text-[#2C1D07] truncate">{com.title}</h4>
                            {com.sub && <p className="text-[11px] text-[#6B7280]">{com.sub}</p>}
                            <div className="text-xs font-black text-[#855B09]">
                              {com.amount} <span className="text-[10px] font-normal text-[#6B7280]">{com.cadence}</span>
                            </div>
                            <div className="text-[10px] text-[#6B7280]">
                              Next Donation: {com.next}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            Active
                          </span>
                          <button
                            onClick={() => alert(`Managing pledge for ${com.title}`)}
                            className="px-3 py-1 rounded-lg border border-[#E6DFD1] bg-white hover:bg-[#FFF8E7] hover:border-[#C8A84B] text-[11px] font-bold text-[#4A3B22] cursor-pointer"
                          >
                            Manage
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Bottom Card: Causes You Support */}
              <div className="bg-white rounded-2xl border border-[#E6DFD1] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#2C1D07] font-serif">Causes You Support</h3>
                  <button
                    onClick={() => setDonorTab('campaigns')}
                    className="text-xs font-bold text-[#855B09] hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Lalibela Preservation Project',
                      raised: 'Raised: ETB 38,450,000',
                      goal: 'Goal: ETB 50,000,000',
                      pct: 77,
                      img: '/assets/images/lalibela_monastery.png',
                      slug: 'lalibela-restoration-2026',
                    },
                    {
                      title: 'Theological Education Fund',
                      raised: 'Raised: ETB 17,820,000',
                      goal: 'Goal: ETB 30,000,000',
                      pct: 59,
                      img: '/assets/images/news_youth_conference.png',
                      slug: 'zema-heritage-digitization',
                    },
                  ].map((cau, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-[#E6DFD1] bg-white hover:border-[#C8A84B] transition-all flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E6DFD1]">
                        <img src={cau.img} alt={cau.title} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <h4 className="text-xs font-bold text-[#2C1D07] truncate">{cau.title}</h4>
                        
                        <div className="space-y-1">
                          <div className="w-full bg-[#FAF8F3] h-2 rounded-full overflow-hidden border border-[#E6DFD1]">
                            <div className="bg-gradient-to-r from-[#D4AF37] to-[#C8A84B] h-full rounded-full" style={{ width: `${cau.pct}%` }} />
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-[#6B7280]">
                            <span>{cau.raised}</span>
                            <span className="font-bold text-[#855B09]">{cau.pct}%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-[#6B7280]">{cau.goal}</span>
                          <button
                            onClick={() => {
                              setSelectedCampaignSlug(cau.slug);
                              setCurrentSection('campaign_detail');
                            }}
                            className="px-2.5 py-1 rounded-lg border border-[#E6DFD1] bg-[#FAF8F3] hover:bg-[#FFF8E7] hover:border-[#C8A84B] text-[10px] font-bold text-[#855B09] cursor-pointer"
                          >
                            View Progress
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents & Receipts History Table (when documents tab or my_giving tab is active) */}
              {(donorTab === 'documents' || donorTab === 'my_giving') && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6DFD1] shadow-sm space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-[#2C1D07] font-serif flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#855B09]" />
                      <span>Giving History & Tax Receipts (የልገሳ ታሪክ)</span>
                    </h3>
                    <button
                      onClick={handleDownloadReceipt}
                      className="text-xs font-bold text-[#855B09] hover:underline flex items-center gap-1 cursor-pointer"
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
                                className="px-3 py-1 rounded-lg bg-white border border-[#E6DFD1] hover:border-[#C8A84B] text-[11px] font-bold text-[#855B09] inline-flex items-center gap-1 shadow-sm cursor-pointer"
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
              )}
            </main>
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
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold cursor-pointer"
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
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold cursor-pointer ${
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
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
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
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
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
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
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
                className="w-full btn-gold py-3 text-xs font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer"
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
