import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/layout/LanguageContext';
import { EOTC_81_BOOKS, MOCK_PARALLEL_VERSES } from '../data/mockScripture';
import type { Verse } from '../data/mockScripture';
import { PRAYER_BOOKS } from '../data/mockChants';
import type { PrayerBook } from '../data/mockChants';
import { LITURGICAL_CATEGORIES, EOTC_14_ANAPHORAS } from '../data/mockLiturgy';
import type { LiturgicalCategory, LiturgicalItem } from '../data/mockLiturgy';
import {
  GEEZ_TRACKS,
  FIDEL_ALPHABET_DATA,
  SACRED_VOCABULARY,
  GRAMMAR_LESSONS,
  PRACTICE_QUIZZES,
} from '../data/mockGeezLearning';
import type { FidelOrder } from '../data/mockGeezLearning';
import {
  BookOpen,
  Heart,
  Languages,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  Info,
  Search,
  ArrowRight,
  Clock,
  BookMarked,
  Play,
  Calendar,
  Layers,
  CheckCircle,
  Shield,
  Sun,
  Moon,
  Sparkles,
  FileText,
  Download,
  Printer,
  Music,
  Award,
  Check,
  RotateCcw,
  HelpCircle,
  Trophy,
} from 'lucide-react';

type ScriptureSubSection = 'hub' | 'bible' | 'prayers' | 'liturgy' | 'geez';
export const ScriptureView: React.FC = () => {
  const {
    language,
    activeView,
    selectedBookId,
    setSelectedBookId,
    selectedChapter,
    setSelectedChapter,
    setActiveTrackId,
  } = useLanguage();

  // Sub-section tab state
  const [activeSection, setActiveSection] = useState<ScriptureSubSection>('hub');

  // Canon Filter & Search
  const [activeCanonTab, setActiveCanonTab] = useState<'ALL' | 'OT' | 'NT' | 'DEUT' | 'EOTC_UNIQUE'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Reader States
  const [activeVerseNum, setActiveVerseNum] = useState<number | null>(1);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedToast, setCopiedToast] = useState(false);

  // Get verse text strictly from the global navigation bar language
  const getActiveVerseText = (v: Verse) => {
    if (language === 'en') return v.english;
    if (language === 'ge') return v.geez;
    return v.amharic; // default for 'am' and 'ti'
  };

  // Prayer Books States
  const [prayerViewMode, setPrayerViewMode] = useState<'grid' | 'reader'>('grid');
  const [selectedPrayerBookId, setSelectedPrayerBookId] = useState<string>('wudase-mariam');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number>(0);
  const [elderlyMode, setElderlyMode] = useState<boolean>(false);
  const [prayerTheme, setPrayerTheme] = useState<'parchment' | 'dark' | 'clean'>('parchment');
  const [prayerFontSize, setPrayerFontSize] = useState<'normal' | 'large' | 'elderly'>('normal');

  // Liturgy States
  const [liturgyViewMode, setLiturgyViewMode] = useState<'categories' | 'reader'>('categories');
  const [selectedLiturgyCategoryId, setSelectedLiturgyCategoryId] = useState<string>('qidase');
  const [selectedLiturgyItemId, setSelectedLiturgyItemId] = useState<string>('qidase-apostles');
  const [liturgyLangMode, setLiturgyLangMode] = useState<'geez-only' | 'parallel' | 'single'>('parallel');
  const [liturgyFontSize, setLiturgyFontSize] = useState<'normal' | 'large' | 'cantor'>('normal');
  const [downloadToast, setDownloadToast] = useState<boolean>(false);

  // Ge'ez Learning States
  const [activeGeezTrack, setActiveGeezTrack] = useState<'fidel' | 'basic' | 'liturgical' | 'grammar'>('fidel');
  const [selectedFidelFamilyIndex, setSelectedFidelFamilyIndex] = useState<number>(0);
  const [selectedFidelOrder, setSelectedFidelOrder] = useState<FidelOrder | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['lesson-fidel-1', 'lesson-vocab-1']);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<string, boolean>>({});
  const [userXp, setUserXp] = useState<number>(450);

  // Synchronize route if clicked from header dropdown or internal links
  useEffect(() => {
    if (activeView === 'scripture/bible') {
      setActiveSection('bible');
    } else if (
      activeView === 'scripture/prayer' ||
      activeView === 'scripture/prayers' ||
      activeView === 'scripture/prayer-books'
    ) {
      setActiveSection('prayers');
      setPrayerViewMode('grid');
    } else if (
      activeView === 'scripture/liturgy' ||
      activeView === 'scripture/liturgical-texts'
    ) {
      setActiveSection('liturgy');
      setLiturgyViewMode('categories');
    } else if (
      activeView === 'scripture/geez' ||
      activeView === 'scripture/geez-learning'
    ) {
      setActiveSection('geez');
    } else if (activeView === 'scripture') {
      setActiveSection('hub');
    }
  }, [activeView]);

  // Current Bible book & verses
  const currentBook = EOTC_81_BOOKS.find((b) => b.id === selectedBookId) || EOTC_81_BOOKS[0];
  const verseKey = `${currentBook.id}-${selectedChapter}` in MOCK_PARALLEL_VERSES ? `${currentBook.id}-${selectedChapter}` : 'john-1';
  const verses = MOCK_PARALLEL_VERSES[verseKey] || MOCK_PARALLEL_VERSES['john-1'];

  // Filtered books for Canon grid
  const filteredBooks = EOTC_81_BOOKS.filter((b) => {
    const matchesTab = activeCanonTab === 'ALL' || b.testament === activeCanonTab;
    const matchesSearch =
      b.nameAmharic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.nameGeez.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Jump to specific book & chapter in Bible Reader
  const openBookInReader = (bookId: string, chapter: number = 1) => {
    setSelectedBookId(bookId);
    setSelectedChapter(chapter);
    setActiveVerseNum(1);
    setActiveSection('bible');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Prayer Book in Reader Mode
  const openPrayerBook = (bookId: string, sectionIdx: number = 0) => {
    setSelectedPrayerBookId(bookId);
    setSelectedSectionIdx(sectionIdx);
    setPrayerViewMode('reader');
    setActiveSection('prayers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPrayerBook: PrayerBook =
    PRAYER_BOOKS.find((p) => p.id === selectedPrayerBookId) || PRAYER_BOOKS[0];
  const currentPrayerSection =
    currentPrayerBook.sections[selectedSectionIdx] || currentPrayerBook.sections[0];

  // Open Liturgy Item in Reader Mode
  const openLiturgyItem = (categoryId: string, itemId: string) => {
    setSelectedLiturgyCategoryId(categoryId);
    setSelectedLiturgyItemId(itemId);
    setLiturgyViewMode('reader');
    setActiveSection('liturgy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLiturgyCategory: LiturgicalCategory =
    LITURGICAL_CATEGORIES.find((c) => c.id === selectedLiturgyCategoryId) || LITURGICAL_CATEGORIES[0];
  const currentLiturgyItem: LiturgicalItem =
    currentLiturgyCategory.items.find((it) => it.id === selectedLiturgyItemId) || currentLiturgyCategory.items[0];

  const handlePrintOrPdf = () => {
    setDownloadToast(true);
    setTimeout(() => {
      setDownloadToast(false);
      window.print();
    }, 1200);
  };

  // Ge'ez Audio Pronunciation Simulation
  const playGeezAudioTone = (_text: string) => {
    setActiveTrackId('zema-1');
  };

  // Quiz Option Selector & XP Handler
  const handleSelectQuizOption = (qId: string, optIdx: number, correctIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setQuizFeedback((prev) => ({ ...prev, [qId]: isCorrect }));
    if (isCorrect && !quizFeedback[qId]) {
      setUserXp((prev) => prev + 50);
    }
  };

  // Toggle Lesson Completion
  const handleToggleLessonComplete = (lessonId: string) => {
    if (completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => prev.filter((id) => id !== lessonId));
    } else {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      setUserXp((prev) => prev + 25);
    }
  };

  // Copy share verse link handler
  const handleShareVerse = (verseNum: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${currentBook.nameEnglish} ${selectedChapter}:${verseNum}`);
    }
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // 4 Category Cards Data for the Gateway
  const categoryCards = [
    {
      id: 'bible' as ScriptureSubSection,
      titleEn: 'Holy Bible (81-Book Canon)',
      titleAm: 'መጽሐፍ ቅዱስ ፹፩',
      badgeEn: 'Full Biblical Canon',
      badgeAm: 'ሙሉ የ፹፩ መጻሕፍት ቀኖና',
      descEn: 'Read the complete 81-book canon with parallel Ge’ez, Amharic, and English text side by side.',
      descAm: 'የተሟላውን የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ፹፩ መጻሕፍት በግዕዝ፣ በአማርኛና በእንግሊዝኛ ጎን ለጎን ያንብቡ።',
      icon: BookOpen,
      iconBg: 'linear-gradient(135deg, #D4AF37, #AA7C11)',
      borderAccent: '#C8A84B',
      stats: '81 Books • 3 Languages • Parallel View',
    },
    {
      id: 'prayers' as ScriptureSubSection,
      titleEn: 'Prayer Books (Metsehafe Tselot)',
      titleAm: 'መጻሕፍተ ጸሎት',
      badgeEn: 'Daily Vigils & Praises',
      badgeAm: 'የዘወትር ጸሎትና ውዳሴ',
      descEn: 'Access the 7-day Praises of St. Mary (ውዳሴ ማርያም), Hourly Vigils (ሰዓታት), and Psalms of David (ዳዊት).',
      descAm: 'የሰባቱ ዕለታት ውዳሴ ማርያም፣ የሰዓታት ጸሎት፣ ዳዊትና መልክአ ማርያም/ሚካኤል የጸሎት መጻሕፍት።',
      icon: Heart,
      iconBg: 'linear-gradient(135deg, #800020, #4A000D)',
      borderAccent: '#800020',
      stats: 'Wudase Mariam • Seatat • Arganon',
    },
    {
      id: 'liturgy' as ScriptureSubSection,
      titleEn: 'Liturgical Texts & Patristics',
      titleAm: 'ሥርዓተ ቅዳሴና መጻሕፍተ ሊቃውንት',
      badgeEn: '14 Anaphoras & Fathers',
      badgeAm: 'አሥራ አራቱ ቅዳሴያትና አበው',
      descEn: 'Explore the 14 Eucharistic Liturgies, Faith of the Fathers (ሃይማኖተ አበው), and the Synaxarium (ስንክሳር).',
      descAm: 'የአሥራ አራቱ ቅዳሴያት ሥርዓት፣ ሃይማኖተ አበው፣ መጽሐፈ ስንክሳርና የቤተ ክርስቲያን ሊቃውንት ትምህርት።',
      icon: BookMarked,
      iconBg: 'linear-gradient(135deg, #1A2C1C, #0F1A10)',
      borderAccent: '#1A2C1C',
      stats: '14 Anaphoras • Synaxarium • Digua',
    },
    {
      id: 'geez' as ScriptureSubSection,
      titleEn: 'Ge’ez Language & Chant Learning',
      titleAm: 'ትምህርተ ግዕዝ ወዜማ',
      badgeEn: 'Sacred Alphabet & Grammar',
      badgeAm: 'ፊደል፣ ሰዋስውና ያሬዳዊ ዜማ',
      descEn: 'Master ancient Ge’ez syllables, sacred vocabulary, liturgical chant notation, and grammar essentials.',
      descAm: 'የግዕዝ ፊደላት፣ መሠረታዊ ሰዋስው፣ ቅዱሳት ቃላትና የቅዱስ ያሬድ የዜማ ምልክቶች ትምህርት።',
      icon: Languages,
      iconBg: 'linear-gradient(135deg, #1E3A8A, #172554)',
      borderAccent: '#1E3A8A',
      stats: 'Fidel Primer • Liturgical Vocab • Chant Signs',
    },
  ];

  // Daily Lectionary Readings (Preview Data)
  const dailyLectionary = {
    dateEthiopian: 'ነሐሴ ፰ (Nahase 8)',
    seasonEn: 'Feast of the Transfiguration / Debre Tabor Season',
    seasonAm: 'በዓለ ደብረ ታቦር',
    readings: [
      {
        typeEn: 'The Psalm',
        typeAm: 'መዝሙረ ዳዊት',
        reference: 'Psalm 132:8–9 (መዝሙር ፻፴፩:፰-፱)',
        geez: 'ተንሥእ ፡ እግዚኦ ፡ ውስተ ፡ ዕረፍትከ ፡ አንተ ፡ ወታቦተ ፡ መቅደስከ ። ካህናትከ ፡ ይልበሱ ፡ ጽድቀ ።',
        translation: 'Arise, O Lord, into Thy rest; Thou, and the ark of Thy sanctuary. Let Thy priests be clothed with righteousness.',
        bookId: 'psalms',
        chapter: 1,
      },
      {
        typeEn: 'Pauline Epistle',
        typeAm: 'መልእክተ ጳውሎስ',
        reference: 'Romans 8:14–17 (ወደ ሮሜ ፰:፲፬-፲፯)',
        geez: 'እለሰ ፡ በመንፈሰ ፡ እግዚአብሔር ፡ ይትመርሑ ፡ እሉ ፡ እሙንቱ ፡ ውሉደ ፡ እግዚአብሔር ።',
        translation: 'For as many as are led by the Spirit of God, they are the sons of God and joint-heirs with Christ.',
        bookId: 'romans',
        chapter: 1,
      },
      {
        typeEn: 'The Holy Gospel',
        typeAm: 'ወንጌል ቅዱስ',
        reference: 'Gospel of John 1:1–5 (ወንጌል ዘዮሐንስ ፩:፩-፭)',
        geez: 'በቀዳሚ ፡ ሀሎ ፡ ቃል ፡ ወውእቱ ፡ ቃል ፡ ኀበ ፡ እግዚአብሔር ፡ ሀሎ ፡ ወእግዚአብሔር ፡ ውእቱ ፡ ቃል ።',
        translation: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
        bookId: 'john',
        chapter: 1,
      },
    ],
  };

  // Recently Added / Featured items
  const featuredContent = [
    {
      type: 'zema',
      titleEn: 'Halleluya Yitbarek Igziabhier',
      titleAm: 'ሃሌ ሉያ ፡ ይትባረክ ፡ እግዚአብሔር',
      mode: "Ge'ez Liturgical Mode (ቅዱስ ያሬድ)",
      cantor: 'Yaredic Chant Masters (የቅዱስ ያሬድ መዘምራን)',
      duration: '04:15',
      trackId: 'zema-1',
      tag: 'Newly Uploaded Chant',
    },
    {
      type: 'prayer',
      titleEn: 'Wudase Mariam — Praise of St. Mary',
      titleAm: 'ውዳሴ ማርያም (ዘእሑድ)',
      mode: 'Vigil Prayer & Hymn',
      cantor: 'Canonical Ethiopian Text',
      duration: '7 Days Available',
      prayerId: 'wudase-mariam',
      tag: 'Recently Translated Prayer',
    },
    {
      type: 'geez',
      titleEn: 'Sacred Liturgical Vocabulary',
      titleAm: 'መሠረታዊ የግዕዝ ቃላት ለቅዳሴ',
      mode: 'Grammar & Audio Primer',
      cantor: 'EOTC Theological Academy',
      duration: '40 Core Words',
      tag: 'Featured Ge’ez Lesson',
    },
  ];

  return (
    <div className="w-full px-4 py-8 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#C8A84B]" />
          <span>{language === 'en' ? 'Verse copied to clipboard!' : 'ጥቅሱ ተቀድቷል!'}</span>
        </div>
      )}

      {/* ═══ TOP SUB-NAV BAR (Tabs between Hub & 4 Sub-Sections) ═══════ */}
      <div className="bg-white p-3 rounded-2xl border border-[#E6DFD1] shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {[
            { id: 'hub' as ScriptureSubSection, labelEn: 'Scripture Hub', labelAm: 'ዋና መግቢያ', icon: Layers },
            { id: 'bible' as ScriptureSubSection, labelEn: 'Holy Bible (81 Books)', labelAm: 'መጽሐፍ ቅዱስ ፹፩', icon: BookOpen },
            { id: 'prayers' as ScriptureSubSection, labelEn: 'Prayer Books', labelAm: 'መጻሕፍተ ጸሎት', icon: Heart },
            { id: 'liturgy' as ScriptureSubSection, labelEn: 'Liturgical Texts', labelAm: 'ሥርዓተ ቅዳሴ', icon: BookMarked },
            { id: 'geez' as ScriptureSubSection, labelEn: 'Ge’ez Learning', labelAm: 'ትምህርተ ግዕዝ', icon: Languages },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#2C1D07] hover:bg-[#FAF8F3]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8A84B]' : 'text-[#855B09]'}`} />
                <span>{language === 'en' ? tab.labelEn : tab.labelAm}</span>
              </button>
            );
          })}
        </div>

        {activeSection !== 'hub' && (
          <button
            onClick={() => setActiveSection('hub')}
            className="text-xs font-bold text-[#855B09] hover:text-[#2C1D07] flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F3] hover:bg-[#FFF5DB] rounded-lg border border-[#E6DFD1] transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            {language === 'en' ? 'Back to Scripture Hub' : 'ወደ ዋናው መግቢያ ተመለስ'}
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: MAIN SCRIPTURE HUB (Default Landing Page)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'hub' && (
        <div className="space-y-10 animate-fadeIn">
          {/* ── 1. HERO SECTION ─────────────────────────────────────── */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-[0_8px_32px_rgba(44,29,7,0.06)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FFF5DB] via-[#FAF8F3] to-transparent rounded-full blur-3xl opacity-80 -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-[#FFF8E7] to-transparent rounded-full blur-2xl opacity-60 pointer-events-none" />

            <div className="max-w-4xl space-y-5 relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFF5DB] border border-[#C8A84B] px-4 py-1.5 rounded-full text-xs text-[#855B09] font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#855B09]" />
                <span>{language === 'en' ? 'EOTC Sacred Canon & Liturgical Tradition' : 'የኢ/ኦ/ተ/ቤተ ክርስቲያን ቅዱሳት መጻሕፍት'}</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2C1D07] font-geez leading-tight">
                {language === 'en' ? 'Holy Scripture & Sacred Texts' : 'ቅዱሳት መጻሕፍት ወሥርዓተ ቤተ ክርስቲያን'}
              </h1>

              <p className="text-base md:text-lg text-[#4A3B22] leading-relaxed max-w-3xl font-body">
                {language === 'en'
                  ? 'Welcome to the complete digital sanctuary of the Ethiopian Orthodox Tewahedo Church. Explore our ancient 81-book biblical canon — uniquely preserving the Book of Enoch, Jubilees, and Meqabyan — alongside 1,700 years of Ge’ez liturgical texts, daily prayers, and patristic commentaries.'
                  : 'እንኳን ወደ ኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ዲጂታል ቅዱሳት መጻሕፍት ማዕከል በደህና መጡ። የተሟላውን የ፹፩ መጽሐፍ ቅዱስ ቀኖና (መጽሐፈ ሄኖክን፣ ኩፋሌን፣ መቃብያንን ጨምሮ)፣ ሥርዓተ ቅዳሴያትንና የዘወትር ጸሎታትን በግዕዝ፣ በአማርኛና በእንግሊዝኛ ያግኙ።'}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {[
                  { lEn: '81 Canonical Books', lAm: '፹፩ የሕግ መጻሕፍት' },
                  { lEn: '14 Holy Anaphoras (ቅዳሴያት)', lAm: '፲፬ቱ ቅዳሴያት' },
                  { lEn: 'Parallel Ge’ez · Amharic · English', lAm: 'ግዕዝ · አማርኛ · እንግሊዝኛ' },
                  { lEn: 'Daily Liturgical Lectionary', lAm: 'የዕለቱ ምንባባት' },
                ].map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-[#FAF8F3] border border-[#E6DFD1] text-[#855B09] px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#C8A84B]" />
                    {language === 'en' ? chip.lEn : chip.lAm}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setActiveSection('bible')}
                  className="bg-[#1A2C1C] hover:bg-[#0D1A0F] text-[#C8A84B] font-bold px-6 py-3.5 rounded-xl text-sm border border-[#C8A84B] flex items-center gap-2.5 shadow-md transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{language === 'en' ? 'Open 81-Book Bible Directory' : 'መጽሐፍ ቅዱስ ፹፩ ማውጫ'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveSection('prayers')}
                  className="bg-white hover:bg-[#FAF8F3] text-[#2C1D07] font-bold px-5 py-3.5 rounded-xl text-sm border border-[#E6DFD1] flex items-center gap-2 shadow-sm transition-all"
                >
                  <Heart className="w-4 h-4 text-[#800020]" />
                  <span>{language === 'en' ? 'Explore Daily Prayer Books' : 'የዘወትር ጸሎታትን ተመልከት'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── 2. FOUR CATEGORY CARDS (Main Gateway) ───────────────── */}
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-extrabold text-[#C8A84B] uppercase tracking-widest block mb-1">
                  {language === 'en' ? 'Sacred Library Gateway' : 'የቅዱሳት መጻሕፍት ክፍሎች'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                  {language === 'en' ? 'Four Pillars of Sacred Scripture' : 'አራቱ የቅዱሳት መጻሕፍት ማዕዘናት'}
                </h2>
              </div>
              <p className="text-sm text-[#6B7280]">
                {language === 'en' ? 'Click any card to enter the reading experience' : 'የሚፈልጉትን ክፍል ይምረጡ'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryCards.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setActiveSection(cat.id)}
                    style={{
                      borderTop: `4px solid ${cat.borderAccent}`,
                    }}
                    className="bg-white p-7 rounded-2xl border border-[#E6DFD1] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div
                          style={{ background: cat.iconBg }}
                          className="w-13 h-13 rounded-xl flex items-center justify-center text-white shadow-md p-3 group-hover:scale-110 transition-transform duration-300"
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FAF8F3] text-[#855B09] border border-[#E6DFD1]">
                          {language === 'en' ? cat.badgeEn : cat.badgeAm}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors leading-snug">
                          {language === 'en' ? cat.titleEn : cat.titleAm}
                        </h3>
                        <p className="text-xs font-semibold text-[#855B09] mt-0.5 font-geez">
                          {language === 'en' ? cat.titleAm : cat.titleEn}
                        </p>
                      </div>

                      <p className="text-sm text-[#6B7280] leading-relaxed font-body">
                        {language === 'en' ? cat.descEn : cat.descAm}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#E6DFD1]/80 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#855B09] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {language === 'en' ? 'Open Portal' : 'ክፈት'} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[11px] text-[#9CA3AF] font-mono">{cat.stats.split('•')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 3. DAILY READING PREVIEW (Lectionary) ─────────────────── */}
          <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF6ED] p-8 md:p-10 rounded-3xl border-2 border-[#C8A84B]/40 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFF5DB] rounded-full blur-3xl opacity-70 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6DFD1] pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#855B09] uppercase tracking-wider mb-1">
                    <Calendar className="w-4 h-4 text-[#C8A84B]" />
                    <span>{language === 'en' ? 'Daily Liturgical Lectionary' : 'የዕለቱ ሥርዓተ ምንባብ'}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                    {language === 'en' ? "Today's Sacred Readings" : 'የዕለቱ ቅዱሳት ምንባባት'}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#FFF5DB] border border-[#C8A84B] px-4 py-2 rounded-xl text-right">
                    <span className="text-xs font-bold text-[#855B09] block font-geez">{dailyLectionary.dateEthiopian}</span>
                    <span className="text-[11px] text-[#6B7280] block">{dailyLectionary.seasonEn}</span>
                  </div>

                  <button
                    onClick={() => openBookInReader('john', 1)}
                    className="bg-[#1A2C1C] hover:bg-[#0D1A0F] text-[#C8A84B] px-5 py-2.5 rounded-xl text-xs font-bold border border-[#C8A84B] flex items-center gap-2 shadow-sm transition-all whitespace-nowrap"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Read Now in Bible Reader' : 'አሁን አንብብ'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {dailyLectionary.readings.map((reading, i) => (
                  <div
                    key={i}
                    onClick={() => openBookInReader(reading.bookId, reading.chapter)}
                    className="bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#855B09] uppercase tracking-wider bg-[#FFF5DB] px-3 py-1 rounded-md border border-[#E6DFD1]">
                        {language === 'en' ? reading.typeEn : reading.typeAm}
                      </span>
                      <span className="text-xs font-mono text-[#9CA3AF] group-hover:text-[#855B09] transition-colors flex items-center gap-1">
                        {language === 'en' ? 'Read' : 'አንብብ'} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors">
                      {reading.reference}
                    </h4>

                    <div className="p-3.5 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1]/60">
                      <p className="text-sm text-[#4A3B22] font-geez leading-relaxed font-bold">
                        "{reading.geez}"
                      </p>
                    </div>

                    <p className="text-xs text-[#6B7280] leading-relaxed italic font-body">
                      "{reading.translation}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 4. RECENTLY ADDED / FEATURED TEXTS & CHANTS ───────────── */}
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-extrabold text-[#C8A84B] uppercase tracking-widest block mb-1">
                  {language === 'en' ? 'Liturgical Spotlight' : 'አዳዲስና ተለይተው የቀረቡ'}
                </span>
                <h3 className="text-2xl font-black text-[#2C1D07] font-geez">
                  {language === 'en' ? 'Featured Sacred Chants & Lessons' : 'ተለይተው የቀረቡ ዜማዎችና ትምህርቶች'}
                </h3>
              </div>
              <p className="text-sm text-[#6B7280]">
                {language === 'en' ? 'Authentic chants, prayers, and lessons' : 'ያሬዳዊ ዜማዎችና የግዕዝ ቃላት'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredContent.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40">
                        {item.tag}
                      </span>
                      <span className="text-xs text-[#9CA3AF] flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> {item.duration}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#2C1D07] font-geez leading-snug">
                        {item.titleAm}
                      </h4>
                      <p className="text-xs text-[#855B09] font-medium mt-0.5">
                        {item.titleEn}
                      </p>
                    </div>

                    <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1] text-xs space-y-1">
                      <p className="text-[#4A3B22] font-semibold">{item.mode}</p>
                      <p className="text-[#6B7280]">{item.cantor}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E6DFD1] flex items-center justify-between">
                    {item.type === 'zema' && (
                      <button
                        onClick={() => setActiveTrackId(item.trackId || 'zema-1')}
                        className="bg-[#800020] hover:bg-[#5C0017] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Play Liturgical Chant' : 'ዜማውን አጫውት'}</span>
                      </button>
                    )}

                    {item.type === 'prayer' && (
                      <button
                        onClick={() => setActiveSection('prayers')}
                        className="bg-[#1A2C1C] hover:bg-[#0D1A0F] text-[#C8A84B] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-[#C8A84B] transition-all"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Read Full Prayer' : 'ጸሎቱን አንብብ'}</span>
                      </button>
                    )}

                    {item.type === 'geez' && (
                      <button
                        onClick={() => setActiveSection('geez')}
                        className="bg-[#1E3A8A] hover:bg-[#172554] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                      >
                        <Languages className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Open Ge’ez Primer' : 'ትምህርቱን ጀምር'}</span>
                      </button>
                    )}

                    <span className="text-xs text-[#6B7280] font-mono">EOTC Canon</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: HOLY BIBLE SUB-PAGE (/scripture/bible)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'bible' && (
        <div className="space-y-8 animate-fadeIn">
          {/* 1. CANON INTRO SECTION */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm relative overflow-hidden space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-[#FFF5DB] border border-[#C8A84B] px-3.5 py-1 rounded-full text-xs text-[#855B09] font-bold uppercase tracking-wider">
                      <Shield className="w-3.5 h-3.5 text-[#C8A84B]" />
                      <span>{language === 'en' ? 'The Apostolic 81-Book Canon' : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ፹፩ መጻሕፍት ቀኖና'}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-[#2C1D07] font-geez">
                      {language === 'en' ? 'Holy Bible — The Complete 81 Books' : 'መጽሐፍ ቅዱስ ፹፩ (ሙሉው ቀኖና)'}
                    </h2>

                    <p className="text-sm md:text-base text-[#4A3B22] leading-relaxed font-body">
                      {language === 'en'
                        ? 'The Ethiopian Orthodox Tewahedo Church uniquely holds the broader 81-book biblical canon, which has remained unbroken since antiquity. Unlike Western traditions which reduced scripture to 66 books, the Ge’ez tradition preserved sacred apocalyptic, historical, and apostolic texts that were lost elsewhere.'
                        : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ከጥንት ጀምሮ ፹፩ የሕግ መጻሕፍትን በብሉይና በሐዲስ ጠብቃ የያዘች አንጋፋ ቤተ ክርስቲያን ናት። በምዕራባውያን የተተዉትን እንደ መጽሐፈ ሄኖክ፣ ኩፋሌ፣ መቃብያንና ዲድስቅልያ የመሳሰሉትን ታላላቅ መጻሕፍት በግዕዝ ቋንቋ ሙሉ ለሙሉ ጠብቃ አቆይታለች።'}
                    </p>
                  </div>

                  {/* Quick Comparison Box */}
                  <div className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E6DFD1] w-full lg:w-80 shrink-0 space-y-3 shadow-inner">
                    <h4 className="text-xs font-extrabold text-[#855B09] uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#C8A84B]" />
                      <span>Biblical Canon Comparison</span>
                    </h4>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#C8A84B]/40 font-bold text-[#1A2C1C]">
                        <span>EOTC Canon (ኢ/ኦ/ተ):</span>
                        <span className="text-[#855B09] font-mono text-sm">81 Books</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 border border-[#E6DFD1] text-[#6B7280]">
                        <span>Catholic Canon:</span>
                        <span className="font-mono">73 Books</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/70 border border-[#E6DFD1] text-[#6B7280]">
                        <span>Protestant Canon:</span>
                        <span className="font-mono">66 Books</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Canon Category Breakdown Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#E6DFD1]">
                  {[
                    { count: '46', nameEn: 'Old Testament Books', nameAm: 'የብሉይ ኪዳን መጻሕፍት', desc: 'Torah, History, Prophets, Psalms' },
                    { count: '27', nameEn: 'New Testament Canonical', nameAm: 'የሐዲስ ኪዳን መጻሕፍት', desc: 'Gospels, Acts, Epistles, Revelation' },
                    { count: '6', nameEn: 'Deuterocanonical', nameAm: 'አዋልድ መጻሕፍት', desc: 'Tobit, Judith, Wisdom, Sirach, Baruch' },
                    { count: '10', nameEn: 'Ethiopic Unique Canon', nameAm: 'የኢትዮጵያ ልዩ ቀኖና', desc: 'Enoch, Jubilees, Meqabyan, Sinodos' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E6DFD1] space-y-1">
                      <span className="text-2xl font-black text-[#855B09] font-mono">{stat.count}</span>
                      <p className="text-xs font-bold text-[#2C1D07] font-geez">{language === 'en' ? stat.nameEn : stat.nameAm}</p>
                      <p className="text-[11px] text-[#6B7280]">{stat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. VIEW MODE TOGGLE (App Navigator vs 3D Bookstore Covers) */}
              {/* ─────────────────────────────────────────────────────────────
                  UNIFIED 2-COLUMN BIBLE: LEFT BOOKS LIST + RIGHT SCRIPTURE TEXT
              ───────────────────────────────────────────────────────────── */}
              <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start animate-fadeIn">
                {/* LEFT SIDE PANEL: SCROLLABLE LIST OF ALL 81 BOOKS */}
                <div className="bg-white rounded-3xl border border-[#E6DFD1] shadow-sm overflow-hidden flex flex-col h-[780px] lg:sticky lg:top-24">
                  {/* Search & Testament Filter Header */}
                  <div className="p-4 bg-[#FAF8F3] border-b border-[#E6DFD1] space-y-3 shrink-0">
                    <div className="relative">
                      <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder={language === 'en' ? 'Search 81 canonical books...' : '፹፩ዱን መጻሕፍት ይፈልጉ...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-[#E6DFD1] rounded-xl pl-10 pr-4 py-2 text-xs text-[#2C1D07] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C8A84B] shadow-inner"
                      />
                    </div>

                    {/* Testament Filter Tabs */}
                    <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1">
                      {[
                        { id: 'ALL', labelAm: 'ሁሉም (፹፩)', labelEn: 'All (81)' },
                        { id: 'OT', labelAm: 'ብሉይ (፵፮)', labelEn: 'OT (46)' },
                        { id: 'NT', labelAm: 'ሐዲስ (፳፯)', labelEn: 'NT (27)' },
                        { id: 'EOTC_UNIQUE', labelAm: 'ልዩ ቀኖና (፲)', labelEn: 'Ethiopic (10)' },
                        { id: 'DEUT', labelAm: 'አዋልድ (፮)', labelEn: 'Deut (6)' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveCanonTab(t.id as any)}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg whitespace-nowrap transition-all ${
                            activeCanonTab === t.id
                              ? 'bg-[#C8A84B] text-[#1A2C1C] font-black shadow-sm'
                              : 'bg-white text-[#6B7280] hover:text-[#2C1D07] border border-[#E6DFD1]'
                          }`}
                        >
                          {language === 'en' ? t.labelEn : t.labelAm}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable Books Index */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-[#E6DFD1]/60">
                    {filteredBooks.map((book) => {
                      const isSelected = currentBook.id === book.id;
                      const isEOTC = book.testament === 'EOTC_UNIQUE';
                      return (
                        <button
                          key={book.id}
                          onClick={() => {
                            setSelectedBookId(book.id);
                            setSelectedChapter(1);
                            setActiveVerseNum(1);
                          }}
                          className={`w-full text-left p-3.5 flex items-center justify-between gap-3 transition-all ${
                            isSelected
                              ? 'bg-[#FFF8E7] text-[#1A2C1C] border-l-4 border-l-[#C8A84B] shadow-inner'
                              : 'hover:bg-[#FAF8F3] text-[#4A3B22]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-7 h-7 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? 'bg-[#C8A84B] text-[#1A2C1C] border-[#C8A84B]'
                                  : 'bg-[#FAF8F3] text-[#855B09] border-[#E6DFD1]'
                              }`}
                            >
                              {book.number}
                            </span>

                            <div className="min-w-0">
                              <h4
                                className={`text-sm font-bold font-geez truncate ${
                                  isSelected ? 'text-[#1A2C1C]' : 'text-[#2C1D07]'
                                }`}
                              >
                                {book.nameAmharic}
                              </h4>
                              <p className="text-[11px] text-[#855B09] truncate font-medium">
                                {book.nameEnglish}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                isEOTC
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-stone-100 text-stone-600'
                              }`}
                            >
                              {book.chaptersCount} Ch
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                isSelected ? 'text-[#855B09] translate-x-1' : 'text-stone-300'
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT SIDE PANEL: SCRIPTURE TEXT READER FOR THE SELECTED BOOK */}
                <div className="space-y-6">
                  {/* Selected Book & Chapter Header Controls */}
                  <div className="bg-white p-5 md:p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {/* Book & Chapter Details */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]">
                            {currentBook.category}
                          </span>
                          <span className="text-xs text-[#6B7280]">
                            Book #{currentBook.number} of 81 • {currentBook.testament === 'EOTC_UNIQUE' ? 'Ethiopic Unique' : currentBook.testament}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                          {language === 'en'
                            ? `${currentBook.nameEnglish} — Chapter ${selectedChapter}`
                            : `${currentBook.nameAmharic} — ምዕራፍ ${selectedChapter}`}
                        </h2>
                      </div>

                      {/* Actions & Format Controls */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Audio Player Trigger */}
                        <button
                          onClick={() => setActiveTrackId('zema-4')}
                          className="bg-[#800020] hover:bg-[#5C0017] text-white py-2 px-4 text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{language === 'en' ? 'Listen Yaredic Audio' : 'ያሬዳዊ ዜማ አዳምጥ'}</span>
                        </button>

                        {/* Font Size Adjuster */}
                        <div className="flex items-center gap-1 bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl p-1">
                          {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setFontSize(sz)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                                fontSize === sz ? 'bg-white text-[#855B09] shadow-sm' : 'text-[#9CA3AF]'
                              }`}
                            >
                              {sz === 'normal' ? 'A' : sz === 'large' ? 'A+' : 'A++'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Chapter Quick Bar Picker */}
                    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-2 border-t border-[#E6DFD1]">
                      <span className="text-xs font-bold text-[#855B09] whitespace-nowrap shrink-0 pr-2">
                        {language === 'en' ? 'Chapters' : 'ምዕራፎች'} ({currentBook.chaptersCount}):
                      </span>
                      {Array.from({ length: currentBook.chaptersCount }, (_, i) => i + 1).map((chNum) => (
                        <button
                          key={chNum}
                          onClick={() => {
                            setSelectedChapter(chNum);
                            setActiveVerseNum(1);
                          }}
                          className={`min-w-8 h-8 px-2 rounded-lg text-xs font-bold transition-all shrink-0 ${
                            selectedChapter === chNum
                              ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm font-black'
                              : 'bg-[#FAF8F3] text-[#4A3B22] hover:bg-[#FFF5DB] border border-[#E6DFD1]'
                          }`}
                        >
                          {chNum}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── UNIFIED FULL CHAPTER BIBLE TEXT (Continuous Stream with Verse Numbers) ── */}
                  <div className="bg-white p-6 sm:p-10 md:p-14 rounded-3xl border border-[#E6DFD1] shadow-md space-y-6">
                    {/* Chapter Title Banner */}
                    <div className="text-center pb-6 border-b border-[#E6DFD1] space-y-1.5">
                      <h2 className="text-3xl sm:text-4xl font-black text-[#2C1D07] font-geez tracking-tight">
                        {language === 'en' ? currentBook.nameEnglish : currentBook.nameAmharic}
                      </h2>
                      <p className="text-sm md:text-base font-bold text-[#855B09] font-geez">
                        {language === 'en' ? `Chapter ${selectedChapter}` : `ምዕራፍ ${selectedChapter}`}
                      </p>
                      {currentBook.nameGeez && (
                        <p className="text-xs text-[#9CA3AF] font-geez">
                          {currentBook.nameGeez}
                        </p>
                      )}
                    </div>

                    {/* Unified Full Chapter Scripture Body */}
                    <div className="space-y-4 pt-2">
                      {verses.map((v) => {
                        const isSelected = activeVerseNum === v.number;
                        return (
                          <div
                            key={v.number}
                            onClick={() => setActiveVerseNum(v.number)}
                            className={`group/v flex items-start gap-3.5 py-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FFF8E7] text-[#1A2C1C] ring-1 ring-[#C8A84B]'
                                : 'hover:bg-[#FAF8F3]'
                            }`}
                          >
                            {/* Clean Subtle Verse Number */}
                            <span className="font-mono text-xs font-bold text-[#855B09] w-6 pt-1 text-right shrink-0 select-none opacity-80 group-hover/v:opacity-100 group-hover/v:text-[#2C1D07]">
                              {v.number}
                            </span>

                            {/* Verse Text Stream */}
                            <div className="flex-1 min-w-0">
                              <p
                                className={`leading-relaxed tracking-wide ${
                                  language === 'en'
                                    ? `text-[#2C1D07] font-serif ${
                                        fontSize === 'xlarge' ? 'text-xl' : fontSize === 'large' ? 'text-lg' : 'text-base'
                                      }`
                                    : `text-[#2C1D07] font-geez ${
                                        fontSize === 'xlarge' ? 'text-2xl leading-loose' : fontSize === 'large' ? 'text-xl leading-loose' : 'text-lg leading-loose'
                                      }`
                                }`}
                              >
                                {getActiveVerseText(v)}
                              </p>
                            </div>

                            {/* Quick Actions (Floating on Hover/Select) */}
                            <div className="flex items-center gap-1 shrink-0 pt-1 opacity-0 group-hover/v:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShareVerse(v.number);
                                }}
                                title="Copy / Share Verse"
                                className="p-1.5 text-[#9CA3AF] hover:text-[#855B09] rounded-lg hover:bg-white transition-colors"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                title="Bookmark Verse"
                                className="p-1.5 text-[#9CA3AF] hover:text-[#800020] rounded-lg hover:bg-white transition-colors"
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reader Navigation Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#E6DFD1] bg-white p-5 rounded-2xl shadow-sm">
                    <button
                      onClick={() => {
                        setSelectedChapter(Math.max(1, selectedChapter - 1));
                        setActiveVerseNum(1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={selectedChapter === 1}
                      className="px-5 py-2.5 bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] rounded-xl text-xs font-bold text-[#2C1D07] disabled:opacity-40 flex items-center gap-2 shadow-sm transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{language === 'en' ? 'Previous Chapter' : 'የቀደመው ምዕራፍ'}</span>
                    </button>

                    <span className="text-sm text-[#855B09] font-bold bg-[#FFF5DB] px-5 py-2 rounded-full border border-[#C8A84B] font-mono">
                      {language === 'en' ? `Chapter ${selectedChapter} of ${currentBook.chaptersCount}` : `ምዕራፍ ${selectedChapter} ከ ${currentBook.chaptersCount}`}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedChapter(Math.min(currentBook.chaptersCount, selectedChapter + 1));
                        setActiveVerseNum(1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={selectedChapter === currentBook.chaptersCount}
                      className="px-5 py-2.5 bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] rounded-xl text-xs font-bold text-[#2C1D07] disabled:opacity-40 flex items-center gap-2 shadow-sm transition-all"
                    >
                      <span>{language === 'en' ? 'Next Chapter' : 'የሚቀጥለው ምዕራፍ'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: PRAYER BOOKS (መጻሕፍተ ጸሎት)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'prayers' && (
        <div className="space-y-8 animate-fadeIn">
          {/* ─────────────────────────────────────────────────────────────
              VIEW A: PRAYER BOOKS DIRECTORY GRID
          ───────────────────────────────────────────────────────────── */}
          {prayerViewMode === 'grid' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Header Banner */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FFF5DB] to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10 space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-[#FFF5DB] border border-[#800020]/40 px-3.5 py-1 rounded-full text-xs text-[#800020] font-bold uppercase tracking-wider">
                    <Heart className="w-3.5 h-3.5 text-[#800020]" />
                    <span>መጻሕፍተ ጸሎት ወውዳሴ • Sacred Prayer Books</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black text-[#2C1D07] font-geez leading-tight">
                    {language === 'en' ? 'Prayer Books & Canonical Vigils' : 'መጻሕፍተ ጸሎት፥ ሰዓታት ወአርጋኖን'}
                  </h2>

                  <p className="text-sm md:text-base text-[#4A3B22] leading-relaxed">
                    {language === 'en'
                      ? 'The spiritual treasury of the Ethiopian Orthodox Tewahedo Church: daily Marian praises (Wudase Mariam), the Harp of Praise (Arganon), hourly vigils (Seytat), and traditional Horologion prayers.'
                      : 'በየዕለቱ የሚጸለዩ የውዳሴ ማርያም፣ የአርጋኖን፣ የመጽሐፈ ሰዓታትና የዘወትር የጸሎት መጻሕፍት ስብስብ።'}
                  </p>
                </div>
              </div>

              {/* Grid of the 6 Prayer Books */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PRAYER_BOOKS.map((pBook) => (
                  <div
                    key={pBook.id}
                    onClick={() => openPrayerBook(pBook.id, 0)}
                    className="bg-white p-6 rounded-3xl border border-[#E6DFD1] hover:border-[#800020] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40">
                          {pBook.category}
                        </span>
                        {pBook.audioDuration && (
                          <span className="text-[11px] font-mono text-[#800020] bg-rose-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <Volume2 className="w-3 h-3" />
                            {pBook.audioDuration}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#2C1D07] font-geez group-hover:text-[#800020] transition-colors">
                          {pBook.titleAmharic}
                        </h3>
                        <p className="text-xs text-[#855B09] font-medium">
                          {pBook.titleEnglish} • {pBook.author}
                        </p>
                      </div>

                      <p className="text-xs text-[#6B7280] line-clamp-3 leading-relaxed">
                        {language === 'en' ? pBook.descriptionEn : pBook.descriptionAm}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E6DFD1]/60 flex items-center justify-between mt-4">
                      <span className="text-xs text-[#6B7280]">
                        {pBook.sections.length} {language === 'en' ? 'Sections' : 'ክፍሎች'}
                      </span>
                      <span className="text-xs font-bold text-[#800020] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {language === 'en' ? 'Open Book' : 'ጸሎት ጀምር'} &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW B: PRAYER BOOK READER VIEW
              (Ge'ez / Amharic / English, Large-Text Elderly Mode & Audio)
          ───────────────────────────────────────────────────────────── */}
          {prayerViewMode === 'reader' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Sticky Controls Header */}
              <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Back button & Title */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setPrayerViewMode('grid')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#855B09] hover:text-[#2C1D07] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{language === 'en' ? 'Back to Prayer Books List' : 'ወደ ጸሎት መጻሕፍት ዝርዝር ተመለስ'}</span>
                    </button>

                    <h2 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                      {currentPrayerBook.titleAmharic}
                    </h2>
                    <p className="text-xs text-[#6B7280]">
                      {currentPrayerBook.titleEnglish} • {currentPrayerBook.author}
                    </p>
                  </div>

                  {/* Format & Elderly Controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Audio Recitation Trigger */}
                    {currentPrayerBook.audioUrl && (
                      <button
                        onClick={() => setActiveTrackId('zema-3')}
                        className="bg-[#800020] hover:bg-[#5C0017] text-white py-2 px-4 text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{language === 'en' ? 'Listen Recitation' : 'ዜማውን አዳምጥ'}</span>
                      </button>
                    )}

                    {/* Elderly Large-Text Toggle */}
                    <button
                      onClick={() => {
                        setElderlyMode(!elderlyMode);
                        setPrayerFontSize(elderlyMode ? 'normal' : 'elderly');
                      }}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl border flex items-center gap-2 transition-all ${
                        elderlyMode
                          ? 'bg-[#855B09] text-white border-[#855B09] shadow-md ring-2 ring-[#FFF5DB]'
                          : 'bg-[#FAF8F3] text-[#4A3B22] border-[#E6DFD1] hover:border-[#C8A84B]'
                      }`}
                      title="Large-Text Mode for Elderly Users"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C8A84B]" />
                      <span>{language === 'en' ? 'Senior Large-Text' : 'የአረጋውያን ትልቅ ፊደል'}</span>
                    </button>

                    {/* Font Size Adjuster */}
                    <div className="flex items-center gap-1 bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl p-1">
                      {(['normal', 'large', 'elderly'] as const).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setPrayerFontSize(sz)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                            prayerFontSize === sz ? 'bg-white text-[#855B09] shadow-sm' : 'text-[#9CA3AF]'
                          }`}
                        >
                          {sz === 'normal' ? 'A' : sz === 'large' ? 'A+' : 'A++'}
                        </button>
                      ))}
                    </div>

                    {/* Theme Selector (Parchment, Dark Vigil, Clean) */}
                    <div className="flex items-center gap-1 bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl p-1">
                      <button
                        onClick={() => setPrayerTheme('parchment')}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                          prayerTheme === 'parchment' ? 'bg-[#FFF5DB] text-[#855B09] shadow-sm' : 'text-[#9CA3AF]'
                        }`}
                        title="Parchment Theme"
                      >
                        <Sun className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setPrayerTheme('dark')}
                        className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                          prayerTheme === 'dark' ? 'bg-[#0D1F30] text-[#C8A84B] shadow-sm' : 'text-[#9CA3AF]'
                        }`}
                        title="Night Vigil Theme"
                      >
                        <Moon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section Quick Selector Tabs */}
                {currentPrayerBook.sections.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-3 border-t border-[#E6DFD1]">
                    <span className="text-xs font-bold text-[#855B09] whitespace-nowrap shrink-0 pr-2">
                      {language === 'en' ? 'Sections:' : 'ክፍሎች:'}
                    </span>
                    {currentPrayerBook.sections.map((sec, idx) => (
                      <button
                        key={sec.id}
                        onClick={() => setSelectedSectionIdx(idx)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                          selectedSectionIdx === idx
                            ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm font-black'
                            : 'bg-[#FAF8F3] text-[#4A3B22] hover:bg-[#FFF5DB] border border-[#E6DFD1]'
                        }`}
                      >
                        {sec.titleAmharic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Devotional Prayer Verses Body */}
              <div
                className={`p-6 md:p-12 rounded-3xl border shadow-sm space-y-6 max-w-4xl mx-auto transition-all ${
                  prayerTheme === 'dark'
                    ? 'bg-[#0D1F30] border-[#1A3A5C] text-white'
                    : prayerTheme === 'parchment'
                    ? 'bg-[#FFFDF9] border-[#E6DFD1]'
                    : 'bg-white border-[#E6DFD1]'
                }`}
              >
                {/* Section Header */}
                <div className="text-center pb-6 border-b border-[#E6DFD1]/80 space-y-2">
                  <span className="text-xs font-mono text-[#855B09] font-bold uppercase tracking-widest">
                    {currentPrayerBook.category}
                  </span>
                  <h3
                    className={`font-black font-geez ${
                      prayerTheme === 'dark' ? 'text-[#C8A84B]' : 'text-[#2C1D07]'
                    } ${prayerFontSize === 'elderly' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}
                  >
                    {currentPrayerSection.titleAmharic}
                  </h3>
                  <p className="text-xs text-[#855B09] font-medium">
                    {currentPrayerSection.titleEnglish}
                  </p>
                </div>

                {/* Verses */}
                <div className="space-y-4 pt-2">
                  {currentPrayerSection.verses.map((v) => (
                    <div
                      key={v.number}
                      className={`p-5 rounded-2xl border transition-all flex gap-4 items-start ${
                        prayerTheme === 'dark'
                          ? 'bg-[#13283E] border-[#1A3A5C]'
                          : 'bg-white border-[#E6DFD1]/80 shadow-sm'
                      } ${elderlyMode ? 'border-l-4 border-l-[#C8A84B] p-6' : ''}`}
                    >
                      {/* Number Pill */}
                      <span className="w-8 h-8 rounded-full bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B] text-xs font-black flex items-center justify-center shrink-0 font-mono shadow-sm">
                        {v.number}
                      </span>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        {/* Ge'ez Line */}
                        <p
                          className={`font-geez font-bold ${
                            prayerTheme === 'dark' ? 'text-[#F5E6C8]' : 'text-[#2C1D07]'
                          } ${
                            prayerFontSize === 'elderly'
                              ? 'text-2xl md:text-3xl leading-[2.2]'
                              : prayerFontSize === 'large'
                              ? 'text-xl leading-relaxed'
                              : 'text-lg leading-relaxed'
                          }`}
                        >
                          {v.geez}
                        </p>

                        {/* Amharic Line */}
                        <p
                          className={`font-geez ${
                            prayerTheme === 'dark' ? 'text-[#C8A84B]' : 'text-[#855B09]'
                          } ${
                            prayerFontSize === 'elderly'
                              ? 'text-xl md:text-2xl leading-[2.0]'
                              : prayerFontSize === 'large'
                              ? 'text-base leading-relaxed'
                              : 'text-sm leading-relaxed'
                          }`}
                        >
                          {v.amharic}
                        </p>

                        {/* English Translation Line */}
                        <p
                          className={`italic font-body ${
                            prayerTheme === 'dark' ? 'text-[#94A3B8]' : 'text-[#6B7280]'
                          } ${
                            prayerFontSize === 'elderly'
                              ? 'text-base leading-relaxed'
                              : 'text-xs leading-relaxed'
                          }`}
                        >
                          "{v.english}"
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0 opacity-70 hover:opacity-100 pt-1">
                        <button
                          onClick={() => {
                            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                              navigator.clipboard.writeText(`${currentPrayerBook.titleEnglish} - ${v.number}: ${v.amharic}`);
                            }
                            setCopiedToast(true);
                            setTimeout(() => setCopiedToast(false), 2500);
                          }}
                          title="Copy Verse"
                          className="p-1.5 text-[#9CA3AF] hover:text-[#C8A84B] rounded-lg"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          title="Bookmark Verse"
                          className="p-1.5 text-[#9CA3AF] hover:text-[#800020] rounded-lg"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reader Navigation Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-[#E6DFD1] bg-white p-5 rounded-2xl shadow-sm">
                <button
                  onClick={() => {
                    setSelectedSectionIdx(Math.max(0, selectedSectionIdx - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={selectedSectionIdx === 0}
                  className="px-5 py-2.5 bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] rounded-xl text-xs font-bold text-[#2C1D07] disabled:opacity-40 flex items-center gap-2 shadow-sm transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'en' ? 'Previous Section' : 'የቀደመው ክፍል'}</span>
                </button>

                <span className="text-sm text-[#855B09] font-bold bg-[#FFF5DB] px-5 py-2 rounded-full border border-[#C8A84B] font-mono">
                  {selectedSectionIdx + 1} of {currentPrayerBook.sections.length}
                </span>

                <button
                  onClick={() => {
                    setSelectedSectionIdx(
                      Math.min(currentPrayerBook.sections.length - 1, selectedSectionIdx + 1)
                    );
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={selectedSectionIdx === currentPrayerBook.sections.length - 1}
                  className="px-5 py-2.5 bg-white border border-[#E6DFD1] hover:bg-[#FAF8F3] rounded-xl text-xs font-bold text-[#2C1D07] disabled:opacity-40 flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>{language === 'en' ? 'Next Section' : 'የሚቀጥለው ክፍል'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: LITURGICAL TEXTS & PATRISTICS (ሥርዓተ ቅዳሴ)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'liturgy' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Download / Print Toast Notification */}
          {downloadToast && (
            <div className="fixed bottom-8 right-8 z-50 bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-slideUp">
              <Printer className="w-4 h-4 animate-pulse" />
              <span>{language === 'en' ? 'Preparing printable Liturgical text...' : 'የቅዳሴ ጽሑፉን በማዘጋጀት ላይ...'}</span>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW A: LITURGICAL SERVICE CATEGORIES DIRECTORY
          ───────────────────────────────────────────────────────────── */}
          {liturgyViewMode === 'categories' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Header Banner */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E8F0FE] to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10 space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-[#FFF5DB] border border-[#1A2C1C]/40 px-3.5 py-1 rounded-full text-xs text-[#1A2C1C] font-bold uppercase tracking-wider">
                    <BookMarked className="w-3.5 h-3.5 text-[#C8A84B]" />
                    <span>ሥርዓተ ቅዳሴ ወመጻሕፍተ ሊቃውንት • Sacred Liturgical Texts</span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-black text-[#2C1D07] font-geez leading-tight">
                    {language === 'en'
                      ? 'Liturgical Texts, Anaphoras & Yaredic Deggwa'
                      : 'ሥርዓተ ቅዳሴ፥ ማሕሌት፥ ድጓ ወቆሎ'}
                  </h2>

                  <p className="text-sm md:text-base text-[#4A3B22] leading-relaxed">
                    {language === 'en'
                      ? 'Explore the complete treasury of Ethiopian Orthodox worship: all 14 Eucharistic Anaphoras, festal Mahelet chants, Saint Yared’s three-mode Deggwa system, and the sacred Zema school neume curriculum.'
                      : 'አሥራ አራቱ ቅዳሴያት፣ የበዓላት ማሕሌት፣ የቅዱስ ያሬድ ፫ቱ የዜማ ስልቶች (ግዕዝ፣ ዕዝል፣ አራራይ) እና የዜማ ትምህርት ቤት ምልክቶች።'}
                  </p>
                </div>
              </div>

              {/* 6 Liturgical Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LITURGICAL_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]/40 flex items-center justify-center font-bold">
                          {cat.id === 'qidase' && <BookMarked className="w-5 h-5" />}
                          {cat.id === 'mahelet' && <Sparkles className="w-5 h-5" />}
                          {cat.id === 'deggwa' && <Music className="w-5 h-5" />}
                          {cat.id === 'yebelat-minbabat' && <Calendar className="w-5 h-5" />}
                          {cat.id === 'qolo' && <FileText className="w-5 h-5" />}
                          {cat.id === 'ye-zema-timhirt-bet' && <Languages className="w-5 h-5" />}
                        </div>

                        <span className="text-xs font-mono font-bold text-[#855B09] bg-[#FAF8F3] px-2.5 py-1 rounded-full border border-[#E6DFD1]">
                          {cat.itemCount} {cat.itemCount === 1 ? 'Resource' : 'Texts / Anaphoras'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#2C1D07] font-geez group-hover:text-[#855B09] transition-colors leading-snug">
                          {cat.titleAmharic}
                        </h3>
                        <p className="text-xs font-semibold text-[#855B09] mt-0.5">
                          {cat.titleEnglish}
                        </p>
                      </div>

                      <p className="text-xs text-[#4A3B22] leading-relaxed line-clamp-3">
                        {language === 'en' ? cat.descriptionEn : cat.descriptionAm}
                      </p>
                    </div>

                    {/* Quick Items / Action */}
                    <div className="pt-4 border-t border-[#E6DFD1]/70 space-y-3">
                      {cat.id === 'qidase' ? (
                        <div className="space-y-2">
                          <p className="text-[11px] font-bold text-[#855B09] uppercase tracking-wider">
                            14 Anaphoras (ቅዳሴያት):
                          </p>
                          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar">
                            {EOTC_14_ANAPHORAS.slice(0, 5).map((ana) => (
                              <button
                                key={ana.id}
                                onClick={() => openLiturgyItem('qidase', 'qidase-apostles')}
                                className="text-[10px] font-geez font-bold bg-[#FAF8F3] hover:bg-[#FFF5DB] text-[#2C1D07] px-2 py-1 rounded-md border border-[#E6DFD1] transition-colors"
                              >
                                {ana.nameAm}
                              </button>
                            ))}
                            <span className="text-[10px] text-[#9CA3AF] self-center pl-1">+9 more</span>
                          </div>
                        </div>
                      ) : null}

                      <button
                        onClick={() => openLiturgyItem(cat.id, cat.items[0]?.id || 'qidase-apostles')}
                        className="w-full bg-[#1A2C1C] hover:bg-[#0D1A0F] text-[#C8A84B] hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-[#C8A84B] flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Open Liturgical Reader' : 'ሥርዓተ ጽሑፉን አንብብ'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW B: DEBTERA & CANTOR LITURGICAL TEXT DISPLAY
              (Large Ge'ez, Dialogue Attributions, Audio & PDF Export)
          ───────────────────────────────────────────────────────────── */}
          {liturgyViewMode === 'reader' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Sticky Controls Header */}
              <div className="bg-white p-6 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Back button & Title */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setLiturgyViewMode('categories')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#855B09] hover:text-[#2C1D07] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{language === 'en' ? 'Back to Liturgical Categories' : 'ወደ ሥርዓተ ቅዳሴ ዝርዝር ተመለስ'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FFF5DB] text-[#855B09] border border-[#C8A84B]">
                        {currentLiturgyItem.category}
                      </span>
                      {currentLiturgyItem.mode && (
                        <span className="text-xs text-[#800020] font-mono bg-[#800020]/10 px-2 py-0.5 rounded-full">
                          Mode: {currentLiturgyItem.mode}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                      {currentLiturgyItem.titleAmharic}
                    </h2>
                    <p className="text-xs text-[#6B7280]">
                      {currentLiturgyItem.titleEnglish} • {currentLiturgyItem.season}
                    </p>
                  </div>

                  {/* Actions & Debtera Stage Controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Audio Chant Trigger */}
                    {currentLiturgyItem.audioTrackId && (
                      <button
                        onClick={() => setActiveTrackId(currentLiturgyItem.audioTrackId || 'zema-4')}
                        className="bg-[#800020] hover:bg-[#5C0017] text-white py-2 px-4 text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{language === 'en' ? 'Play Liturgical Chant' : 'ዜማውን አጫውት'}</span>
                      </button>
                    )}

                    {/* Language Mode Toggle */}
                    <div className="flex items-center bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl p-1">
                      <button
                        onClick={() => setLiturgyLangMode('geez-only')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          liturgyLangMode === 'geez-only'
                            ? 'bg-[#1A2C1C] text-[#C8A84B] shadow-sm'
                            : 'text-[#6B7280] hover:text-[#2C1D07]'
                        }`}
                      >
                        Ge’ez Only (ግዕዝ)
                      </button>
                      <button
                        onClick={() => setLiturgyLangMode('parallel')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          liturgyLangMode === 'parallel'
                            ? 'bg-[#FFF5DB] text-[#855B09] shadow-sm border border-[#C8A84B]'
                            : 'text-[#6B7280] hover:text-[#2C1D07]'
                        }`}
                      >
                        Parallel (ትርጓሜ)
                      </button>
                    </div>

                    {/* Font Size Adjuster (Debtera / Cantor Stage 28px) */}
                    <div className="flex items-center gap-1 bg-[#FAF8F3] border border-[#E6DFD1] rounded-xl p-1">
                      {(['normal', 'large', 'cantor'] as const).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setLiturgyFontSize(sz)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                            liturgyFontSize === sz ? 'bg-white text-[#855B09] shadow-sm font-black' : 'text-[#9CA3AF]'
                          }`}
                        >
                          {sz === 'normal' ? 'A' : sz === 'large' ? 'A+' : 'Debtera 28px'}
                        </button>
                      ))}
                    </div>

                    {/* PDF / Print Download Action */}
                    <button
                      onClick={handlePrintOrPdf}
                      className="bg-white hover:bg-[#FAF8F3] border border-[#E6DFD1] text-[#2C1D07] py-2 px-3.5 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                      title="Print or Export PDF for Liturgical Service"
                    >
                      <Download className="w-3.5 h-3.5 text-[#855B09]" />
                      <span>PDF / Print</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Items Switcher within Category */}
                {currentLiturgyCategory.items.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-3 border-t border-[#E6DFD1]">
                    <span className="text-xs font-bold text-[#855B09] whitespace-nowrap shrink-0 pr-2">
                      {currentLiturgyCategory.titleAmharic}:
                    </span>
                    {currentLiturgyCategory.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedLiturgyItemId(item.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                          selectedLiturgyItemId === item.id
                            ? 'bg-[#C8A84B] text-[#1A2C1C] shadow-sm font-black'
                            : 'bg-[#FAF8F3] text-[#4A3B22] hover:bg-[#FFF5DB] border border-[#E6DFD1]'
                        }`}
                      >
                        {item.titleAmharic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Liturgical Dialogue Lines (Debtera & Congregation Flow) */}
              <div className="bg-white p-6 md:p-12 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6 max-w-4xl mx-auto">
                <div className="text-center pb-6 border-b border-[#E6DFD1]/80 space-y-1">
                  <span className="text-xs font-mono text-[#855B09] font-bold uppercase tracking-widest">
                    {currentLiturgyCategory.titleAmharic}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                    {currentLiturgyItem.titleAmharic}
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    {currentLiturgyItem.descriptionEn}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {currentLiturgyItem.lines.map((line, idx) => {
                    const isPriest = line.speaker === 'priest';
                    const isDeacon = line.speaker === 'deacon';
                    const isPeople = line.speaker === 'people';

                    return (
                      <div
                        key={idx}
                        className={`p-6 rounded-2xl border transition-all space-y-3 ${
                          isPriest
                            ? 'bg-[#FFFDF9] border-[#C8A84B]/60'
                            : isDeacon
                            ? 'bg-[#F0FDF4] border-[#86EFAC]'
                            : isPeople
                            ? 'bg-[#FAF8F3] border-[#E6DFD1]'
                            : 'bg-[#FDF2F8] border-[#F472B6]'
                        }`}
                      >
                        {/* Speaker & Mode Badge */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-geez ${
                              isPriest
                                ? 'bg-[#800020] text-white'
                                : isDeacon
                                ? 'bg-[#15803D] text-white'
                                : isPeople
                                ? 'bg-[#1A2C1C] text-[#C8A84B]'
                                : 'bg-[#9D174D] text-white'
                            }`}
                          >
                            {line.speakerAm || 'ካህን / ዲያቆን'}
                          </span>

                          {line.zemaMode && (
                            <span className="text-[10px] font-mono text-[#855B09] bg-[#FFF5DB] px-2 py-0.5 rounded-md border border-[#C8A84B]/30">
                              ስልት: {line.zemaMode.toUpperCase()}
                            </span>
                          )}
                        </div>

                        {/* Large Ge'ez Text (Debtera / Cantor Stage) */}
                        <p
                          className={`font-geez font-bold text-[#2C1D07] ${
                            liturgyFontSize === 'cantor'
                              ? 'text-2xl md:text-3xl leading-[2.3]'
                              : liturgyFontSize === 'large'
                              ? 'text-xl leading-[2.0]'
                              : 'text-lg leading-relaxed'
                          }`}
                        >
                          {line.geez}
                        </p>

                        {/* Amharic & English Translations (if not geez-only) */}
                        {liturgyLangMode !== 'geez-only' && (
                          <div className="pt-3 border-t border-[#E6DFD1]/60 space-y-1.5">
                            <p className="text-sm font-geez font-semibold text-[#855B09]">
                              {line.amharic}
                            </p>
                            <p className="text-xs text-[#6B7280] italic font-body">
                              "{line.english}"
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: GE'EZ LEARNING & PRIMER (ትምህርተ ግዕዝ)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'geez' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner & User Progress Tracker Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Header Hero */}
            <div className="lg:col-span-8 bg-white p-8 md:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#EFF6FF] to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4"></div>

              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#EFF6FF] border border-[#3B82F6]/40 px-3.5 py-1 rounded-full text-xs text-[#1D4ED8] font-bold uppercase tracking-wider">
                  <Languages className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>ትምህርተ ግዕዝ ወሰዋስው • Ge’ez Learning Portal</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-[#2C1D07] font-geez leading-tight">
                  {language === 'en' ? 'Master the Sacred Ge’ez Language' : 'የቅዱስ ቋንቋችን የግዕዝ ትምህርት'}
                </h2>

                <p className="text-sm md:text-base text-[#4A3B22] leading-relaxed">
                  {language === 'en'
                    ? 'Explore the ancient liturgical tongue of Ethiopian Orthodoxy: from the 7-order Fidel alphabet and sacred biblical vocabulary to liturgical chanting and advanced seminary grammar.'
                    : 'ስምንቱን የፊደል ቤቶች፣ ሰባቱን ድምፆች፣ ቅዱሳት ቃላትንና የሰዋስው ሥርዓትን በድምፅና በልምምድ ይማሩ።'}
                </p>
              </div>

              {/* Quick Navigation Tabs for Tracks */}
              <div className="relative z-10 flex flex-wrap items-center gap-2 pt-2">
                {GEEZ_TRACKS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveGeezTrack(t.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                      activeGeezTrack === t.id
                        ? 'bg-[#1E3A8A] text-white shadow-md'
                        : 'bg-[#FAF8F3] text-[#4A3B22] border border-[#E6DFD1] hover:border-[#3B82F6]'
                    }`}
                  >
                    <span className="font-geez">{t.titleAmharic.split(' ')[0]}</span>
                    <span className="opacity-80 text-[10px]">({t.level})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Student Progress & Mastery Tracker */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] p-6 md:p-8 rounded-3xl text-white shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden border border-[#3B82F6]/30">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#3B82F6]/30 text-[#93C5FD] border border-[#3B82F6]/50 flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-[#93C5FD]" />
                    <span>Progress Tracker</span>
                  </span>

                  <span className="text-xs font-mono font-bold text-[#FDE047] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{userXp} XP</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-geez text-[#F8FAFC]">
                    ደቀ መዝሙር (Disciple Level 2)
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Overall Curriculum Mastery: 68%
                  </p>
                </div>

                {/* Main Progress Bar */}
                <div className="space-y-1.5">
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] h-full rounded-full w-[68%] transition-all duration-500"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
                    <span>18 of 26 Lessons Complete</span>
                    <span>🔥 5-Day Streak</span>
                  </div>
                </div>

                {/* Track mini-progress list */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center justify-between text-[#E2E8F0]">
                    <span>Fidel Alphabet (ፊደል)</span>
                    <span className="font-mono text-[#93C5FD] font-bold">85%</span>
                  </div>
                  <div className="flex items-center justify-between text-[#E2E8F0]">
                    <span>Sacred Vocab (ቃላት)</span>
                    <span className="font-mono text-[#93C5FD] font-bold">60%</span>
                  </div>
                  <div className="flex items-center justify-between text-[#E2E8F0]">
                    <span>Liturgical Reading (ቅዳሴ)</span>
                    <span className="font-mono text-[#93C5FD] font-bold">40%</span>
                  </div>
                  <div className="flex items-center justify-between text-[#E2E8F0]">
                    <span>Advanced Grammar (ሰዋሰው)</span>
                    <span className="font-mono text-[#93C5FD] font-bold">20%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setUserXp((prev) => prev + 50)}
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Trophy className="w-4 h-4 text-[#FDE047]" />
                <span>Earn Daily Study XP (+50 XP)</span>
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              INTERACTIVE TRACK 1: FIDEL ALPHABET MATRIX & PRONUNCIATION
          ───────────────────────────────────────────────────────────── */}
          {activeGeezTrack === 'fidel' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6DFD1] pb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-[#2C1D07] font-geez">
                      The Seven Phonetic Orders of the Fidel (ሳብዓዊ የፊደል ክፍሎች)
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      Click on any Ge’ez letter to listen to its authentic vocal pronunciation and see example sacred words.
                    </p>
                  </div>

                  {/* Consonant Family Picker */}
                  <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
                    {FIDEL_ALPHABET_DATA.map((fam, idx) => (
                      <button
                        key={fam.baseConsonant}
                        onClick={() => {
                          setSelectedFidelFamilyIndex(idx);
                          setSelectedFidelOrder(null);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                          selectedFidelFamilyIndex === idx
                            ? 'bg-[#1E3A8A] text-white shadow-sm'
                            : 'bg-[#FAF8F3] text-[#4A3B22] border border-[#E6DFD1] hover:bg-[#EFF6FF]'
                        }`}
                      >
                        {fam.letterNameAmharic} ({fam.baseConsonant})
                      </button>
                    ))}
                  </div>
                </div>

                {/* 7 Orders Interactive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center">
                  {FIDEL_ALPHABET_DATA[selectedFidelFamilyIndex].orders.map((ord) => {
                    const isSelected = selectedFidelOrder?.order === ord.order;
                    return (
                      <div
                        key={ord.order}
                        onClick={() => {
                          setSelectedFidelOrder(ord);
                          playGeezAudioTone(ord.character);
                        }}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 group ${
                          isSelected
                            ? 'bg-[#EFF6FF] border-[#1D4ED8] shadow-md ring-2 ring-[#BFDBFE]'
                            : 'bg-[#FAF8F3] hover:bg-[#FFF5DB] border-[#E6DFD1] hover:border-[#C8A84B]'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-[#855B09] uppercase block">
                          {ord.nameAmharic}
                        </span>

                        <span className="text-4xl font-black text-[#1E3A8A] font-geez block group-hover:scale-110 transition-transform">
                          {ord.character}
                        </span>

                        <div className="space-y-0.5">
                          <span className="text-xs font-mono font-bold text-[#2C1D07] block">
                            [{ord.transliteration}]
                          </span>
                          <span className="text-[10px] text-[#6B7280] block">
                            Vowel: /{ord.vowelSound}/
                          </span>
                        </div>

                        <div className="pt-2 border-t border-[#E6DFD1]/60 flex items-center justify-center gap-1 text-[10px] text-[#1D4ED8] font-bold">
                          <Volume2 className="w-3 h-3" />
                          <span>Listen</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Letter Popup Detail */}
                {selectedFidelOrder && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#EFF6FF] to-[#FAF8F3] border border-[#3B82F6]/40 flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
                    <div className="flex items-center gap-4">
                      <span className="w-16 h-16 rounded-2xl bg-[#1E3A8A] text-white text-3xl font-black font-geez flex items-center justify-center shadow-md">
                        {selectedFidelOrder.character}
                      </span>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
                          Order #{selectedFidelOrder.order} • {selectedFidelOrder.nameAmharic} ({selectedFidelOrder.nameEnglish})
                        </span>
                        <h4 className="text-lg font-bold text-[#2C1D07]">
                          Example Word: <span className="font-geez font-black text-[#1E3A8A]">{selectedFidelOrder.exampleWordGeez}</span> ({selectedFidelOrder.exampleWordMeaning})
                        </h4>
                        <p className="text-xs text-[#6B7280]">
                          Phonetic Pronunciation: <span className="font-mono font-bold text-[#855B09]">/{selectedFidelOrder.transliteration}/</span> with vowel <span className="font-mono">/{selectedFidelOrder.vowelSound}/</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleLessonComplete(`fidel-${selectedFidelOrder.character}`)}
                      className="bg-[#1E3A8A] hover:bg-[#172554] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Check className="w-4 h-4" />
                      <span>{completedLessonIds.includes(`fidel-${selectedFidelOrder.character}`) ? 'Learned ✓' : 'Mark as Learned (+25 XP)'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              INTERACTIVE TRACK 2: SACRED VOCABULARY FLASHCARDS
          ───────────────────────────────────────────────────────────── */}
          {activeGeezTrack === 'basic' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#2C1D07] font-geez">
                    Sacred Liturgical Vocabulary & Theological Roots
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Core theological terms used in the Holy Scriptures, Divine Liturgy, and Marian Praises.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SACRED_VOCABULARY.map((word) => (
                  <div
                    key={word.id}
                    className="bg-white rounded-3xl border border-[#E6DFD1] hover:border-[#3B82F6] shadow-sm hover:shadow-lg p-6 flex flex-col justify-between space-y-4 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                          {word.category}
                        </span>

                        <button
                          onClick={() => playGeezAudioTone(word.geezWord)}
                          className="p-1.5 bg-[#FAF8F3] hover:bg-[#EFF6FF] rounded-lg text-[#1D4ED8] transition-colors"
                          title="Listen to Pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="text-3xl font-black text-[#1E3A8A] font-geez leading-tight">
                        {word.geezWord}
                      </h4>
                      <p className="text-xs font-mono font-bold text-[#855B09]">
                        [{word.transliteration}]
                      </p>

                      <div className="p-3.5 bg-[#FAF8F3] rounded-2xl border border-[#E6DFD1] space-y-1.5">
                        <p className="text-sm font-bold text-[#2C1D07] font-geez">
                          {word.meaningAmharic}
                        </p>
                        <p className="text-xs text-[#4A3B22] italic font-body">
                          {word.meaningEnglish}
                        </p>
                      </div>

                      <p className="text-[11px] text-[#6B7280]">
                        <span className="font-semibold text-[#855B09]">Root:</span> {word.root}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleLessonComplete(word.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                        completedLessonIds.includes(word.id)
                          ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]'
                          : 'bg-white text-[#1E3A8A] border-[#E6DFD1] hover:bg-[#EFF6FF]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{completedLessonIds.includes(word.id) ? 'Mastered ✓' : 'Mark Learned (+25 XP)'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              INTERACTIVE TRACK 3: LITURGICAL READ-ALONG
          ───────────────────────────────────────────────────────────── */}
          {activeGeezTrack === 'liturgical' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6 max-w-4xl mx-auto">
                <div className="text-center pb-6 border-b border-[#E6DFD1] space-y-1">
                  <span className="text-xs font-mono text-[#1D4ED8] font-bold uppercase tracking-widest">
                    Read-Along Exercise • ልምምደ ንባብ
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-[#2C1D07] font-geez">
                    ጸሎተ ሃይማኖት (The Nicene Creed in Ge’ez)
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    Listen to the liturgical recitation while practicing continuous Ge’ez sacred reading.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      num: 1,
                      geez: 'ነአምን ፡ በአሐዱ ፡ አምላክ ፡ እግዚአብሔር ፡ አብ ፡ አኃዜ ፡ ኵሉ ፡ ገባሬ ፡ ሰማይ ፡ ወምድር ፡ ዘያስተርኢ ፡ ወዘኢያስተርኢ ።',
                      am: 'ሁሉን በፈጠረ በአንድ አምላክ በእግዚአብሔር አብ እናምናለን፤ ሰማይንና ምድርን የሚታየውንና የማይታየውን በፈጠረ።',
                      en: 'We believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.',
                    },
                    {
                      num: 2,
                      geez: 'ወበአሐዱ ፡ እግዚእ ፡ ኢየሱስ ፡ ክርስቶስ ፡ ወልደ ፡ አብ ፡ ዋሕድ ፡ ዘህልው ፡ ምስሌሁ ፡ እምቅድመ ፡ ይትፈጠር ፡ ዓለም ።',
                      am: 'ዓለም ሳይፈጠር ከእርሱ ጋር በነበረ በአንድ ጌታ በኢየሱስ ክርስቶስም እናምናለን፤ የአብ አንድያ ልጅ በሆነ።',
                      en: 'And in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all worlds.',
                    },
                  ].map((row) => (
                    <div key={row.num} className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-3">
                      <span className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-xs font-bold flex items-center justify-center">
                        {row.num}
                      </span>
                      <p className="text-xl md:text-2xl font-black text-[#2C1D07] font-geez leading-loose">
                        {row.geez}
                      </p>
                      <div className="pt-2 border-t border-[#E6DFD1]/60 space-y-1">
                        <p className="text-sm font-geez font-medium text-[#855B09]">{row.am}</p>
                        <p className="text-xs text-[#6B7280] italic">"{row.en}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              INTERACTIVE TRACK 4: ADVANCED GRAMMAR
          ───────────────────────────────────────────────────────────── */}
          {activeGeezTrack === 'grammar' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GRAMMAR_LESSONS.map((gram, i) => (
                  <div key={i} className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FAF8F3] text-[#855B09] border border-[#E6DFD1]">
                        Rule #{i + 1}
                      </span>
                      <h4 className="text-xl font-bold text-[#2C1D07] font-geez mt-2 leading-snug">
                        {gram.titleAmharic}
                      </h4>
                      <p className="text-xs font-semibold text-[#1E3A8A]">
                        {gram.titleEnglish}
                      </p>
                    </div>

                    <p className="text-xs text-[#4A3B22] leading-relaxed">
                      {language === 'en' ? gram.explanationEn : gram.explanationAm}
                    </p>

                    <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#E6DFD1] space-y-2">
                      <p className="text-xs font-bold text-[#855B09] uppercase tracking-wider">
                        Examples & Conjugations:
                      </p>
                      <div className="space-y-2 text-xs">
                        {gram.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#E6DFD1]/50 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-geez font-black text-[#1E3A8A] text-sm">{ex.geez}</span>
                            <span className="text-[#6B7280] italic">{ex.english}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              PRACTICE EXERCISES & QUIZ CHALLENGE
          ───────────────────────────────────────────────────────────── */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E6DFD1] shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6DFD1] pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#855B09]">
                  <HelpCircle className="w-4 h-4 text-[#855B09]" />
                  <span>Interactive Exercises • የዕውቀት መፈተኛ</span>
                </div>
                <h3 className="text-2xl font-black text-[#2C1D07] font-geez">
                  Test Your Ge’ez Knowledge & Earn XP
                </h3>
              </div>

              <button
                onClick={() => {
                  setQuizAnswers({});
                  setQuizFeedback({});
                }}
                className="text-xs text-[#6B7280] hover:text-[#2C1D07] flex items-center gap-1 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Quiz</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRACTICE_QUIZZES.map((q) => {
                const selectedOpt = quizAnswers[q.id];
                const hasAnswered = selectedOpt !== undefined;
                const isCorrect = quizFeedback[q.id];

                return (
                  <div
                    key={q.id}
                    className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E6DFD1] space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="w-12 h-12 rounded-2xl bg-white border border-[#E6DFD1] text-2xl font-black font-geez text-[#1E3A8A] flex items-center justify-center shadow-sm">
                        {q.geezPrompt}
                      </span>

                      <p className="text-sm font-bold text-[#2C1D07] leading-snug">
                        {q.question}
                      </p>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          let btnStyle = 'bg-white border-[#E6DFD1] text-[#4A3B22] hover:border-[#3B82F6]';
                          if (hasAnswered) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-[#ECFDF5] border-[#059669] text-[#065F46] font-bold';
                            } else if (optIdx === selectedOpt && !isCorrect) {
                              btnStyle = 'bg-[#FEF2F2] border-[#DC2626] text-[#991B1B] font-bold';
                            } else {
                              btnStyle = 'bg-white border-[#E6DFD1] opacity-50 text-[#9CA3AF]';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(q.id, optIdx, q.correctIndex)}
                              disabled={hasAnswered}
                              className={`w-full text-left p-3 rounded-xl text-xs border transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {hasAnswered && (
                      <div className={`p-3 rounded-xl text-xs space-y-1 animate-fadeIn ${
                        isCorrect ? 'bg-[#ECFDF5] text-[#065F46]' : 'bg-[#FEF2F2] text-[#991B1B]'
                      }`}>
                        <p className="font-bold">
                          {isCorrect ? '✓ Correct! (+50 XP Earned)' : '✕ Incorrect'}
                        </p>
                        <p className="text-[11px] leading-relaxed text-[#4A3B22]">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
