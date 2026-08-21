import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bookmark,
  Share2,
  Search,
  ArrowRight,
  BookMarked,
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
  Highlighter,
  Edit3,
  Clock,
  Settings,
  Plus,
  X,
  Type,
} from 'lucide-react';

// Sacred Manuscripts for the 2-second Auto-Flipping Book animation
const SACRED_MANUSCRIPTS = [
  {
    titleEn: 'Garima Gospels — Gospel of St. John',
    titleAm: 'ወንጌል ዘዮሐንስ (ቀኖና ፹፩)',
    bookName: 'Wengel Yohannes',
    folio: 'Folio 12r',
    leftTitle: 'ወንጌል ዘዮሐንስ ሐዋርያ',
    leftText: 'በቀዳሚ ቃል ነበረ፡ ወውእቱ ቃል ኀበ እግዚአብሔር ነበረ፡ ወእግዚአብሔር ውእቱ ቃል፡ ውእቱ በቀዳሚ ኀበ እግዚአብሔር ነበረ።',
    leftVerse: 'ዮሐ ፩፥፩-፫',
    rightTitle: 'ብርሃነ ዓለም',
    rightText: 'ኩሉ በእዴሁ ኮነ፡ ወዘእንበሌሁሰ አልቦ ዘኮነ፡ ወኢምንትኒ ዘኮነ። ሕይወት ውእቱ ዘኮነ፡ ወሕይወት ውእቱ ብርሃኖሙ ለሰብእ።',
    rightVerse: 'ዮሐ ፩፥፬-፭',
    ribbonColor: '#D4AF37',
    badge: 'Garima Vellum',
  },
  {
    titleEn: 'Wudase Mariam — Monday Praises',
    titleAm: 'ውዳሴ ማርያም ዘሰኑይ',
    bookName: 'Wudase Mariam',
    folio: 'Folio 3b',
    leftTitle: 'ውዳሴሃ ለእግዝእትነ',
    leftText: 'ፈቀደ እግዚእ ያግዕዞ ለአዳም ምዱየ ወትኩዘ ልብ፡ ወይሚጦ ኀበ ዘቀዳሚ መንበሩ። ሰአሊ ለነ ቅድስት ድንግል ማርያም።',
    leftVerse: 'ዘሰኑይ',
    rightTitle: 'ምልዕተ ጸጋ',
    rightText: 'ተፈሥሒ ኦ ምልዕተ ጸጋ እግዚአብሔር ምስሌኪ፡ ጸልዪ በእንቲአነ ኀበ እግዚእነ ኢየሱስ ክርስቶስ ከመ ይሥረይ ለነ ኃጣውኢነ።',
    rightVerse: 'ውዳሴ ፩',
    ribbonColor: '#800020',
    badge: 'Praises of Mary',
  },
  {
    titleEn: 'Book of Enoch — Prophecy of Righteousness',
    titleAm: 'መጽሐፈ ሄኖክ ነቢይ',
    bookName: 'Metsihafe Henok',
    folio: 'Folio 1a',
    leftTitle: 'ቃለ በረከት ዘሄኖክ',
    leftText: 'ቃለ በረከት ዘሄኖክ ዘከመ ባረኮሙ ለኅሩያን ወለጻድቃን፡ እለ ሀለዉ ይኩኑ በዕለተ ጸበብ፡ ለአሰስሎ ኩሉ እኩያን።',
    leftVerse: 'ሄኖክ ፩፥፩',
    rightTitle: 'ራእየ ሰማያት',
    rightText: 'ወነሥአ ምሳሌሁ ወይቤ ሄኖክ ብእሲ ጻድቅ፡ ዘእምኀበ እግዚአብሔር አዕይንቲሁ ተከሥታ ወርእየ ራእየ ቅዱስ በሰማያት።',
    rightVerse: 'ሄኖክ ፩፥፪-፫',
    ribbonColor: '#1A2C1C',
    badge: 'Apocalyptic Canon',
  },
  {
    titleEn: 'Mezmur Dawit — Psalm 1',
    titleAm: 'መዝሙረ ዳዊት (መዝሙር ፩)',
    bookName: 'Mezmur Dawit',
    folio: 'Folio 1r',
    leftTitle: 'መዝሙር ዘዳዊት ፩',
    leftText: 'ብፁዕ ብእሲ ዘኢሖረ በምክረ ረሲዓን፡ ወዘኢቆመ ውስተ ፍኖተ ኃጥአን፡ ወዘኢነበረ ውስተ መንበረ መሳለቃን።',
    leftVerse: 'መዝ ፩፥፩',
    rightTitle: 'ሕገ እግዚአብሔር',
    rightText: 'ዳእሙ ውስተ ሕጉ ለእግዚአብሔር ፈቃዱ፡ ወዘሕጉ ያነብብ በመዓልት ወበሌሊት፡ ወይከውን ከመ ዕፅ እንተ ትክልት ኀበ ሙዛዘ ማይ።',
    rightVerse: 'መዝ ፩፥፪-፫',
    ribbonColor: '#B8860B',
    badge: 'Psalms of David',
  },
  {
    titleEn: 'Metsihafe Qidase — Liturgy of the Apostles',
    titleAm: 'መጽሐፈ ቅዳሴ ዘሐዋርያት',
    bookName: 'Metsihafe Qidase',
    folio: 'Folio 7a',
    leftTitle: 'ጸሎተ ቊርባን',
    leftText: 'እግዚአብሔር ምስለ ኩልክሙ። ምስለ መንፈስከ። አእኩትዎ ለአምላክነ። ርቱዕ ይደሉ። አልዕሉ አልባቢክሙ። ብነ ኀበ እግዚአብሔር።',
    leftVerse: 'ቅዳሴ ፲፬',
    rightTitle: 'ቅዱስ ቅዱስ ቅዱስ',
    rightText: 'ቅዱስ ቅዱስ ቅዱስ እግዚአብሔር ጸባኦት ፍጹም ምሉዕ ሰማያተ ወምድረ ቅድሳተ ስብሐቲከ፡ ስብሐት ለአብ ወወልድ ወመንፈስ ቅዱስ።',
    rightVerse: 'አቁራሪት',
    ribbonColor: '#EA580C',
    badge: '14 Anaphoras',
  },
];

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

  // Automated 3-second Single Page Flip State (1 page forward every 3s)
  const [activeManuscriptIndex, setActiveManuscriptIndex] = useState<number>(0);
  const [isBookPaused, setIsBookPaused] = useState<boolean>(false);

  const prevManuscriptIndex = (activeManuscriptIndex - 1 + SACRED_MANUSCRIPTS.length) % SACRED_MANUSCRIPTS.length;
  const currentManuscript = SACRED_MANUSCRIPTS[activeManuscriptIndex] || SACRED_MANUSCRIPTS[0];
  const prevManuscript = SACRED_MANUSCRIPTS[prevManuscriptIndex] || SACRED_MANUSCRIPTS[0];

  useEffect(() => {
    if (isBookPaused) return;
    const interval = setInterval(() => {
      setActiveManuscriptIndex((prev) => (prev + 1) % SACRED_MANUSCRIPTS.length);
    }, 3000); // exactly 1 page flip every 3 seconds
    return () => clearInterval(interval);
  }, [isBookPaused]);

  // Canon Search
  const [searchTerm, setSearchTerm] = useState('');

  // ── Modern Bible App States (Highlights, Notes, Bookmarks & Tools) ──
  const [bibleHighlights, setBibleHighlights] = useState<
    Array<{
      id: string;
      bookId: string;
      bookName: string;
      chapter: number;
      verseNum: number;
      color: 'yellow' | 'green' | 'blue' | 'purple';
      textSnippet: string;
    }>
  >([
    {
      id: 'hl-1',
      bookId: 'genesis',
      bookName: 'Genesis',
      chapter: 1,
      verseNum: 3,
      color: 'yellow',
      textSnippet: 'And God said, "Let there be light," and there was light.',
    },
    {
      id: 'hl-2',
      bookId: 'genesis',
      bookName: 'Genesis',
      chapter: 1,
      verseNum: 11,
      color: 'green',
      textSnippet: 'Then God said, "Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds." And it was so.',
    },
    {
      id: 'hl-3',
      bookId: 'john',
      bookName: 'John',
      chapter: 3,
      verseNum: 16,
      color: 'purple',
      textSnippet: 'For God so loved the world that he gave his one and only Son...',
    },
  ]);

  const [bibleNotes, setBibleNotes] = useState<
    Array<{
      id: string;
      title: string;
      bookId: string;
      bookName: string;
      chapter: number;
      verseRef: string;
      content: string;
      date: string;
    }>
  >([
    {
      id: 'note-1',
      title: 'The light',
      bookId: 'genesis',
      bookName: 'Genesis',
      chapter: 1,
      verseRef: 'Genesis 1:3',
      content: 'God spoke and created light. This shows His power...',
      date: 'May 20, 2025',
    },
    {
      id: 'note-2',
      title: 'Creation of plants',
      bookId: 'genesis',
      bookName: 'Genesis',
      chapter: 1,
      verseRef: 'Genesis 1:11-12',
      content: 'Plants were created on the third day. Everything...',
      date: 'May 18, 2025',
    },
  ]);

  const [bibleBookmarks, setBibleBookmarks] = useState<
    Array<{
      id: string;
      bookId: string;
      bookName: string;
      chapter: number;
      verseRef: string;
      textSnippet: string;
    }>
  >([
    {
      id: 'bm-1',
      bookId: 'genesis',
      bookName: 'Genesis',
      chapter: 1,
      verseRef: 'Genesis 1:1',
      textSnippet: 'In the beginning God created the heavens and the earth.',
    },
  ]);

  const [selectedVerseForMenu, setSelectedVerseForMenu] = useState<number | null>(null);
  const [activeStudyTool, setActiveStudyTool] = useState<'notes' | 'highlights' | 'bookmarks' | 'history'>('notes');
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState<boolean>(false);
  const [noteFormTitle, setNoteFormTitle] = useState('');
  const [noteFormContent, setNoteFormContent] = useState('');
  const [noteFormVerse, setNoteFormVerse] = useState<number>(1);
  const [readingTheme, setReadingTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);
  const [expandedSidebarBook, setExpandedSidebarBook] = useState<string>('genesis');
  const [bibleLanguageMode, setBibleLanguageMode] = useState<'current' | 'en' | 'am' | 'ge'>('current');

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







  return (
    <div className="w-full px-4 py-8 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#C8A84B]" />
          <span>{language === 'en' ? 'Verse copied to clipboard!' : 'ጥቅሱ ተቀድቷል!'}</span>
        </div>
      )}

      {/* ═══ CLEAN TOP PILL NAV BAR (Visible when exploring Sub-Pages) ═══════ */}
      {activeSection !== 'hub' && (
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#E6DFD1]/80">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            {[
              { id: 'hub' as ScriptureSubSection, labelEn: 'Scripture Hub', labelAm: 'ዋና መግቢያ', icon: Layers },
              { id: 'bible' as ScriptureSubSection, labelEn: 'Holy Bible (81 Books)', labelAm: 'መጽሐፍ ቅዱስ ፹፩', icon: BookOpen },
              { id: 'prayers' as ScriptureSubSection, labelEn: 'Prayer Books', labelAm: 'መጻሕፍተ ጸሎት', icon: Heart },
              { id: 'liturgy' as ScriptureSubSection, labelEn: 'Liturgical Texts', labelAm: 'ሥርዓተ ቅዳሴ', icon: BookMarked },
              { id: 'geez' as ScriptureSubSection, labelEn: "Ge'ez Learning", labelAm: 'ትምህርተ ግዕዝ', icon: Languages },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] shadow-xs'
                      : 'bg-white hover:bg-[#FFF8EA] text-[#3D3020] border border-[#E6DFD1]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8A84B]' : 'text-[#855B09]'}`} />
                  <span>{language === 'en' ? tab.labelEn : tab.labelAm}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setActiveSection('hub')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#855B09] bg-white hover:bg-[#FFF5DB] border border-[#E6DFD1] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Back to Scripture Hub' : 'ወደ ዋናው መግቢያ ተመለስ'}</span>
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: MAIN SCRIPTURE HUB (Default Landing Page)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'hub' && (
        <div className="space-y-12 animate-fadeIn">
          {/* ── 1. HERO SECTION (CARDLESS SEAMLESS DESIGN MATCHING REFERENCE) ─── */}
          <div className="relative pt-2 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Cross Ornament + Title + Description + Explore CTA + Options Tabs */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Golden Cross Ornament with Horizontal Accent Lines */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[1.5px] bg-[#D4AF37]" />
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#C8A84B]">
                    <path d="M12 2V22M2 12H22" stroke="#C8A84B" strokeWidth="2.2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="2.5" fill="#C8A84B" />
                  </svg>
                  <div className="w-10 h-[1.5px] bg-[#D4AF37]" />
                </div>

                {/* Main Heading */}
                <h1
                  className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1a1208] leading-[1.08] tracking-tight"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {language === 'en' ? (
                    <>
                      Holy Scripture & <br />
                      <span>Sacred Texts</span>
                    </>
                  ) : (
                    <>
                      ቅዱሳት መጻሕፍትና <br />
                      <span>የቤተ ክርስቲያን ድርሳናት</span>
                    </>
                  )}
                </h1>

                {/* Subtitle / Paragraph */}
                <p className="text-sm sm:text-[15.5px] text-[#4A3B22] leading-relaxed max-w-xl font-body">
                  {language === 'en'
                    ? 'Welcome to the complete digital sanctuary of the Ethiopian Orthodox Tewahedo Church. Explore our ancient 81-book biblical canon — preserving the Book of Enoch, Jubilees, and Meqabyan alongside 1,700 years of Ge’ez liturgical texts, daily prayers, and patristic commentaries.'
                    : 'እንኳን ወደ ኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ዲጂታል ቅዱሳት መጻሕፍት ማዕከል በደህና መጡ። የተሟላውን የ፹፩ መጽሐፍ ቅዱስ ቀኖና (መጽሐፈ ሄኖክን፣ ኩፋሌን፣ መቃብያንን ጨምሮ)፣ ሥርዓተ ቅዳሴያትንና የዘወትር ጸሎታትን በግዕዝ፣ በአማርኛና በእንግሊዝኛ ያግኙ።'}
                </p>

                {/* Explore Scripture CTA Button */}
                <div className="pt-1">
                  <button
                    onClick={() => setActiveSection('bible')}
                    className="inline-flex items-center gap-2.5 bg-[#163b28] hover:bg-[#0f281b] text-[#FAF8F3] font-bold px-7 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>{language === 'en' ? 'Explore Scripture' : 'ቅዱሳት መጻሕፍትን ያስሱ'}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>

                {/* Navigation Options Tabs (Leading to Other Pages/Sections) */}
                <div className="pt-3 border-t border-[#E6DFD1]/80">
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#B8860B] mb-2.5">
                    {language === 'en' ? 'Quick Navigation Options:' : 'የክፍል አማራጮች:'}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: 'hub' as ScriptureSubSection, labelEn: 'Scripture Hub', labelAm: 'ዋና መግቢያ', icon: Layers },
                      { id: 'bible' as ScriptureSubSection, labelEn: 'Holy Bible (81 Books)', labelAm: 'መጽሐፍ ቅዱስ ፹፩', icon: BookOpen },
                      { id: 'prayers' as ScriptureSubSection, labelEn: 'Prayer Books', labelAm: 'መጻሕፍተ ጸሎት', icon: Heart },
                      { id: 'liturgy' as ScriptureSubSection, labelEn: 'Liturgical Texts', labelAm: 'ሥርዓተ ቅዳሴ', icon: BookMarked },
                      { id: 'geez' as ScriptureSubSection, labelEn: "Ge'ez Learning", labelAm: 'ትምህርተ ግዕዝ', icon: Languages },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeSection === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveSection(tab.id)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] shadow-xs'
                              : 'bg-white hover:bg-[#FFF8EA] text-[#3D3020] border border-[#E6DFD1] shadow-2xs hover:border-[#C8A84B]'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8A84B]' : 'text-[#855B09]'}`} />
                          <span>{language === 'en' ? tab.labelEn : tab.labelAm}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Sacred Books Showcase Image (Framed cleanly without container card) */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="w-full relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl border border-[#E6DFD1] group">
                  <img
                    src="/assets/images/scripture_hero_books.jpg"
                    alt="EOTC Holy Scripture and Sacred Books (81-Book Bible, Wudase Mariam, Qidase)"
                    className="w-full h-auto object-cover block group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ── 2. FOUR PILLARS OF SACRED SCRIPTURE (SPLIT LAYOUT WITH LARGER FLIPPING BOOK ON LEFT) ─── */}
          <div className="space-y-10 pt-4 pb-2">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* ── LEFT COLUMN: Museum-Quality 3D Animated Manuscript with Motion Page Flip ── */}
              <div
                className="lg:col-span-6 flex flex-col items-center justify-center relative select-none"
                onMouseEnter={() => setIsBookPaused(true)}
                onMouseLeave={() => setIsBookPaused(false)}
              >
                {/* Ambient Breathing Light Rays & Backglow */}
                <motion.div
                  animate={{
                    opacity: [0.35, 0.65, 0.35],
                    scale: [0.98, 1.04, 0.98],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/25 via-[#FAF8F3]/30 to-transparent rounded-[60px] blur-3xl pointer-events-none -bottom-8"
                />

                {/* ── EXACT REPLICA OPEN BOOK (MATCHING REFERENCE IMAGE) ── */}
                <motion.div
                  animate={{ scale: [1, 1.012, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full max-w-[620px] relative select-none"
                  style={{ perspective: 2600 }}
                >
                  {/* Soft Realistic Ambient Floor Shadow */}
                  <div className="absolute -inset-x-6 -bottom-6 h-16 bg-black/45 rounded-[50%] blur-2xl pointer-events-none -z-30" />

                  {/* ── 1. HARDCOVER LEATHER BACKING (Deep Mahogany / Burgundy) ── */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-[#44130C] via-[#2F0B05] to-[#1C0502] p-2.5 sm:p-3.5 shadow-[0_24px_50px_rgba(15,3,1,0.55)] border border-[#521C12]">
                    
                    {/* Hanging Burgundy Satin Bookmark Ribbon extending from bottom spine */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-8 bg-gradient-to-b from-[#3D0A04] via-[#65140B] to-[#4D0D07] rounded-b-xs shadow-md z-30 pointer-events-none flex items-end justify-center">
                      {/* V-notched ribbon tail */}
                      <div className="w-0 h-0 border-x-[10px] sm:border-x-[12px] border-x-transparent border-b-[8px] border-b-[#1C0502] mb-0" />
                    </div>

                    {/* ── 2. STACKED PAGES BLOCK (Fore-edges & M-Curved Bottom Edges) ── */}
                    <div className="relative bg-[#E2D2B0] rounded-xl pt-2 px-4 sm:px-5 pb-5 sm:pb-6 shadow-[inset_0_4px_14px_rgba(0,0,0,0.22)] overflow-hidden">
                      
                      {/* Left Fore-edge Stacked Paper Lines (Fanning Outward) */}
                      <div
                        className="absolute top-1.5 bottom-5 left-0 w-4 sm:w-5 pointer-events-none opacity-90"
                        style={{
                          background: 'repeating-linear-gradient(to right, #FAF4E4 0px, #FAF4E4 1.5px, #BEA67C 2px, #967C52 3px)',
                          boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.25)',
                        }}
                      />

                      {/* Right Fore-edge Stacked Paper Lines (Fanning Outward) */}
                      <div
                        className="absolute top-1.5 bottom-5 right-0 w-4 sm:w-5 pointer-events-none opacity-90"
                        style={{
                          background: 'repeating-linear-gradient(to left, #FAF4E4 0px, #FAF4E4 1.5px, #BEA67C 2px, #967C52 3px)',
                          boxShadow: 'inset 2px 0 5px rgba(0,0,0,0.25)',
                        }}
                      />

                      {/* Bottom Edge Dual M-Arch Stacked Page Lines */}
                      <div
                        className="absolute bottom-0 inset-x-0 h-5 sm:h-6 pointer-events-none flex"
                        style={{
                          background: 'repeating-linear-gradient(to bottom, #FAF4E4 0px, #FAF4E4 1.5px, #C2AB83 2px, #9E8357 3px)',
                          boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.2)',
                        }}
                      >
                        <div className="w-1/2 h-full border-r border-[#543315] rounded-br-[18px] shadow-xs" />
                        <div className="w-1/2 h-full rounded-bl-[18px] shadow-xs" />
                      </div>

                      {/* ── 3. THE OPEN BOOK PARCHMENT SPREAD ── */}
                      <div
                        className="relative grid grid-cols-2 min-h-[335px] sm:min-h-[370px] md:min-h-[400px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] rounded-lg overflow-hidden"
                        style={{ perspective: 2400 }}
                      >
                        {/* Deep Central Spine Crease & Realistic Trough Shadow */}
                        <div
                          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 pointer-events-none z-40"
                          style={{
                            background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                          }}
                        />
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#3B1E0A] z-45 pointer-events-none" />

                        {/* ═══════════════════════════════════════════════════════
                            LEFT PAGE (Matching Reference Cylindrical Sheen & Lighting)
                        ═══════════════════════════════════════════════════════ */}
                        <div
                          className="p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(to right, #EDE2CC 0%, #FAF5EA 20%, #FFFDF9 42%, #F6EFE0 75%, #E5D6BD 92%, #CDB896 100%)',
                            boxShadow: 'inset 3px 0 6px rgba(0,0,0,0.05), inset 0 3px 6px rgba(255,255,255,0.4)',
                          }}
                        >
                          {/* Subtle Top & Bottom Page Curve Highlights */}
                          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/8 to-transparent pointer-events-none" />

                          <div className="relative z-10">
                            {/* Top Red Header */}
                            <div className="flex items-center justify-between gap-1 border-b border-[#C8A84B]/40 pb-1.5 mb-3">
                              <span className="text-xs sm:text-sm font-black text-[#800020] font-geez truncate">
                                {currentManuscript.leftTitle}
                              </span>
                              <span className="text-[10px] sm:text-[11px] font-mono text-[#855B09] font-bold shrink-0">
                                {currentManuscript.folio}
                              </span>
                            </div>

                            {/* Ge'ez Calligraphic Script Columns */}
                            <div className="space-y-2.5 pt-1">
                              <p className="text-xs sm:text-[13.5px] text-[#2C1D07] font-geez leading-relaxed tracking-tight">
                                <span className="text-[#800020] font-black text-sm sm:text-base">❖ </span>
                                {currentManuscript.leftText}
                              </p>
                            </div>
                          </div>

                          {/* Bottom Folio Mark */}
                          <div className="pt-2.5 border-t border-[#D5C29C]/70 flex items-center justify-between text-[10px] sm:text-xs text-[#855B09] font-bold relative z-10">
                            <span>{currentManuscript.leftVerse}</span>
                            <span className="text-[#800020]">+ ኢ/ኦ/ተ</span>
                          </div>

                          {/* Dynamic Sweep Shadow across left page during flip */}
                          <motion.div
                            key={`shadow-left-${activeManuscriptIndex}`}
                            className="absolute inset-y-0 right-0 bg-gradient-to-l from-black/50 via-black/25 to-transparent pointer-events-none z-20"
                            initial={{ opacity: 0, width: '10%' }}
                            animate={{
                              opacity: [0, 0.45, 0.6, 0.25, 0],
                              width: ['10%', '60%', '95%', '45%', '0%'],
                            }}
                            transition={{
                              duration: 0.95,
                              ease: [0.35, 0.05, 0.25, 1],
                            }}
                          />
                        </div>

                        {/* ═══════════════════════════════════════════════════════
                            RIGHT PAGE (Matching Reference Cylindrical Sheen & Lighting)
                        ═══════════════════════════════════════════════════════ */}
                        <div
                          className="p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(to right, #CDB896 0%, #E5D6BD 8%, #F6EFE0 25%, #FFFDF9 58%, #FAF5EA 80%, #EDE2CC 100%)',
                            boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.05), inset 0 3px 6px rgba(255,255,255,0.4)',
                          }}
                        >
                          {/* Subtle Top & Bottom Page Curve Highlights */}
                          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/8 to-transparent pointer-events-none" />

                          <div className="relative z-10">
                            {/* Top Red Header */}
                            <div className="flex items-center justify-between gap-1 border-b border-[#C8A84B]/40 pb-1.5 mb-3">
                              <span className="text-xs sm:text-sm font-black text-[#800020] font-geez truncate">
                                {currentManuscript.rightTitle}
                              </span>
                              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#855B09] bg-[#FAF3DE] px-2 py-0.5 rounded border border-[#E5D3A6] shadow-2xs">
                                {currentManuscript.badge}
                              </span>
                            </div>

                            {/* Double Column Calligraphy */}
                            <p className="text-xs sm:text-[13.5px] text-[#2C1D07] font-geez leading-relaxed tracking-tight">
                              <span className="text-[#800020] font-black text-sm sm:text-base">❖ </span>
                              {currentManuscript.rightText}
                            </p>
                          </div>

                          {/* Bottom Folio Mark */}
                          <div className="pt-2.5 border-t border-[#D5C29C]/70 flex items-center justify-between text-[10px] sm:text-xs text-[#855B09] font-bold relative z-10">
                            <span className="text-[#800020] underline decoration-double">፹፩ ቀኖና</span>
                            <span>{currentManuscript.rightVerse}</span>
                          </div>

                          {/* Lifting Shadow on Right Page as Turning Leaf Rises */}
                          <motion.div
                            key={`shadow-right-${activeManuscriptIndex}`}
                            className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent pointer-events-none z-20"
                            initial={{ opacity: 0.4 }}
                            animate={{ opacity: [0.4, 0.15, 0] }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>

                        {/* ═══════════════════════════════════════════════════════
                            3. UNIDIRECTIONAL 3D TURNING LEAF
                        ═══════════════════════════════════════════════════════ */}
                        <motion.div
                          key={activeManuscriptIndex}
                          className="absolute top-0 right-0 bottom-0 left-1/2 z-30 pointer-events-none"
                          style={{
                            transformOrigin: 'left center',
                            transformStyle: 'preserve-3d',
                          }}
                          initial={{
                            rotateY: 0,
                            rotateZ: 0,
                            skewY: 0,
                            scaleX: 1,
                          }}
                          animate={{
                            rotateY: [0, -40, -95, -150, -180],
                            rotateZ: [0, -2.5, -4, -1.5, 0],
                            skewY: [0, 3, -2, -3, 0],
                            scaleX: [1, 0.94, 0.92, 0.97, 1],
                          }}
                          transition={{
                            duration: 0.95,
                            ease: [0.32, 0.08, 0.22, 1],
                          }}
                        >
                          {/* ── FRONT FACE (Previous right page lifting & curling) ── */}
                          <div
                            className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
                            style={{
                              background: 'linear-gradient(to right, #CDB896 0%, #E5D6BD 8%, #F6EFE0 25%, #FFFDF9 58%, #FAF5EA 80%, #EDE2CC 100%)',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              boxShadow: '10px 14px 30px rgba(0,0,0,0.22)',
                            }}
                          >
                            <div className="relative z-10">
                              <div className="flex items-center justify-between gap-1 border-b border-[#C8A84B]/40 pb-1.5 mb-3">
                                <span className="text-xs sm:text-sm font-black text-[#800020] font-geez truncate">
                                  {prevManuscript.rightTitle}
                                </span>
                                <span className="text-[10px] sm:text-[11px] font-extrabold text-[#855B09] bg-[#FAF3DE] px-2 py-0.5 rounded border border-[#E5D3A6]">
                                  {prevManuscript.badge}
                                </span>
                              </div>

                              <p className="text-xs sm:text-[13.5px] text-[#2C1D07] font-geez leading-relaxed tracking-tight">
                                <span className="text-[#800020] font-black text-sm sm:text-base">❖ </span>
                                {prevManuscript.rightText}
                              </p>
                            </div>

                            <div className="pt-2.5 border-t border-[#D5C29C]/70 flex items-center justify-between text-[10px] sm:text-xs text-[#855B09] font-bold relative z-10">
                              <span className="text-[#800020] underline decoration-double">፹፩ ቀኖና</span>
                              <span>{prevManuscript.rightVerse}</span>
                            </div>

                            {/* Front Leaf Turn Gradient Shading */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-l from-black/45 via-transparent to-black/20 pointer-events-none"
                              animate={{ opacity: [0, 0.6, 0.2, 0] }}
                              transition={{ duration: 0.95 }}
                            />
                          </div>

                          {/* ── BACK FACE (Current left page landing on left side) ── */}
                          <div
                            className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
                            style={{
                              background: 'linear-gradient(to right, #EDE2CC 0%, #FAF5EA 20%, #FFFDF9 42%, #F6EFE0 75%, #E5D6BD 92%, #CDB896 100%)',
                              transform: 'rotateY(180deg)',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              boxShadow: '-10px 14px 30px rgba(0,0,0,0.22)',
                            }}
                          >
                            <div className="relative z-10">
                              <div className="flex items-center justify-between gap-1 border-b border-[#C8A84B]/40 pb-1.5 mb-3">
                                <span className="text-xs sm:text-sm font-black text-[#800020] font-geez truncate">
                                  {currentManuscript.leftTitle}
                                </span>
                                <span className="text-[10px] sm:text-[11px] font-mono text-[#855B09] font-bold shrink-0">
                                  {currentManuscript.folio}
                                </span>
                              </div>

                              <div className="space-y-2.5 pt-1">
                                <p className="text-xs sm:text-[13.5px] text-[#2C1D07] font-geez leading-relaxed tracking-tight">
                                  <span className="text-[#800020] font-black text-sm sm:text-base">❖ </span>
                                  {currentManuscript.leftText}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2.5 border-t border-[#D5C29C]/70 flex items-center justify-between text-[10px] sm:text-xs text-[#855B09] font-bold relative z-10">
                              <span>{currentManuscript.leftVerse}</span>
                              <span className="text-[#800020]">+ ኢ/ኦ/ተ</span>
                            </div>

                            {/* Back Leaf Landing Shadow Shading */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20 pointer-events-none"
                              animate={{ opacity: [0.7, 0.35, 0] }}
                              transition={{ duration: 0.95 }}
                            />
                          </div>
                        </motion.div>

                      </div>
                    </div>
                  </div>

                  {/* Subtle Flipping Indicator / Controls Below Book */}
                  <div className="mt-3.5 flex items-center justify-between px-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B8860B] animate-ping" />
                      <span className="text-xs font-bold text-[#855B09] font-geez">
                        {currentManuscript.titleAm}
                      </span>
                    </div>

                    {/* Page Indicator Dots */}
                    <div className="flex items-center gap-1.5">
                      {SACRED_MANUSCRIPTS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveManuscriptIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === activeManuscriptIndex
                              ? 'w-5 bg-[#B8860B]'
                              : 'w-2 bg-[#C5A880]/60 hover:bg-[#855B09]'
                          }`}
                          aria-label={`Go to manuscript page ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* ── RIGHT COLUMN: Header, Quote, 4 Pillar List Items (Matching Image 2) ── */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Header & Subtitle */}
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#B8860B]">
                    <span>☩</span>
                    <span>{language === 'en' ? 'SACRED LIBRARY GATEWAY' : 'የቅዱሳት መጻሕፍት ማዕከል'}</span>
                    <div className="w-8 h-[1.5px] bg-[#C8A84B]" />
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#2C1D07] leading-tight"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {language === 'en' ? 'Four Pillars of Sacred Scripture' : 'አራቱ የቅዱሳት መጻሕፍት ማዕዘናት'}
                  </h2>

                  {/* Gold Flourish Divider */}
                  <div className="flex items-center gap-2 py-0.5">
                    <div className="w-10 h-[1.5px] bg-[#D4AF37]" />
                    <span className="text-[#C8A84B] text-xs">⚜</span>
                    <div className="w-10 h-[1.5px] bg-[#D4AF37]" />
                  </div>

                  <p className="text-sm text-[#4A3B22] leading-relaxed font-body max-w-2xl">
                    {language === 'en'
                      ? 'Explore the timeless spiritual treasures of the Ethiopian Orthodox Tewahedo Church. Dive into the sacred texts, prayers, and traditions preserved for generations.'
                      : 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ዘመን ተሻጋሪ መንፈሳዊ ቅርሶችን ያስሱ። ለትውልድ የተጠበቁትን ቅዱሳት መጻሕፍት፣ ጸሎታትና ትውፊታትን በጥልቀት ይወቁ።'}
                  </p>
                </div>

                {/* Scripture Verse Quote Card */}
                <div className="bg-[#FAF8F3] border-l-4 border-[#C8A84B] p-3.5 sm:p-4 rounded-r-xl border-y border-r border-[#E6DFD1] shadow-2xs space-y-1">
                  <div className="text-lg text-[#C8A84B] font-serif leading-none">“</div>
                  <p className="text-xs sm:text-[13.5px] font-semibold text-[#2C1D07] italic font-serif leading-snug">
                    {language === 'en'
                      ? 'Your word is a lamp to my feet and a light to my path.'
                      : '«ሕግህ ለእግሬ መብራት ለመንገዴም ብርሃን ነው።»'}
                  </p>
                  <span className="text-[10.5px] font-extrabold text-[#855B09] uppercase tracking-wider block pt-0.5">
                    {language === 'en' ? 'Psalm 119:105 (መዝሙር 119:105)' : 'መዝሙር 119:105'}
                  </span>
                </div>

                {/* Four Pillar Interactive List Rows */}
                <div className="space-y-2.5 pt-1">
                  {[
                    {
                      id: 'bible' as ScriptureSubSection,
                      icon: BookOpen,
                      titleEn: 'Holy Bible (81-Book Canon)',
                      titleAm: 'መጽሐፍ ቅዱስ ፹፩ (ሙሉው ቀኖና)',
                      subEn: 'Complete Canon in Ge’ez, Amharic & English',
                      subAm: 'የተሟላው የ፹፩ መጻሕፍት ቀኖና በግዕዝ፣ አማርኛና እንግሊዝኛ',
                      borderAccent: '#C8A84B',
                    },
                    {
                      id: 'prayers' as ScriptureSubSection,
                      icon: Heart,
                      titleEn: 'Prayer Books',
                      titleAm: 'መጻሕፍተ ጸሎት',
                      subEn: 'Wudase Mariam • Mezmur • Agpeya',
                      subAm: 'ውዳሴ ማርያም • ሰዓታት • መዝሙረ ዳዊት',
                      borderAccent: '#800020',
                    },
                    {
                      id: 'liturgy' as ScriptureSubSection,
                      icon: BookMarked,
                      titleEn: 'Liturgical Texts & Patristics',
                      titleAm: 'ሥርዓተ ቅዳሴና መጻሕፍተ ሊቃውንት',
                      subEn: '14 Anaphoras • Synaxarium • Church Fathers',
                      subAm: '፲፬ቱ ቅዳሴያት • መጽሐፈ ስንክሳር • ሃይማኖተ አበው',
                      borderAccent: '#1A2C1C',
                    },
                    {
                      id: 'geez' as ScriptureSubSection,
                      icon: Languages,
                      titleEn: 'Ge’ez Language & Chant Learning',
                      titleAm: 'ትምህርተ ግዕዝ ወዜማ',
                      subEn: 'Alphabet • Grammar • Chant Notation',
                      subAm: 'ፊደል • ሰዋስው • የቅዱስ ያሬድ ዜማ ምልክቶች',
                      borderAccent: '#1E3A8A',
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'bible') {
                            openBookInReader(selectedBookId || 'genesis', selectedChapter);
                          } else {
                            setActiveSection(item.id);
                          }
                        }}
                        className="group cursor-pointer bg-white hover:bg-[#FAF8F3] p-3.5 sm:p-4 rounded-xl border border-[#E6DFD1] hover:border-[#C8A84B] shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 relative overflow-hidden"
                        style={{ borderLeftWidth: '4px', borderLeftColor: item.borderAccent }}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FAF8F3] group-hover:bg-[#FFF5DB] border border-[#E6DFD1] text-[#855B09] shrink-0 transition-colors">
                            <Icon className="w-4.5 h-4.5 text-[#855B09] group-hover:text-[#2C1D07]" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-[#2C1D07] font-serif group-hover:text-[#855B09] transition-colors truncate">
                              {language === 'en' ? item.titleEn : item.titleAm}
                            </h4>
                            <p className="text-xs text-[#6B7280] truncate">
                              {language === 'en' ? item.subEn : item.subAm}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[#C8A84B] group-hover:text-[#855B09] shrink-0 group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* ── BOTTOM STATS STRIP (Matching Image 2) ── */}
            <div className="pt-6 border-t border-[#E6DFD1] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1]/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-[#C8A84B]" />
                  <span className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">1,700+</span>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {language === 'en' ? 'Years of Tradition' : 'የዓመታት ጥንታዊ ታሪክ'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1]/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-[#C8A84B]" />
                  <span className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">81</span>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {language === 'en' ? 'Canonical Books' : 'የቀኖና መጻሕፍት'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1]/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <BookMarked className="w-4 h-4 text-[#C8A84B]" />
                  <span className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">14+</span>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {language === 'en' ? 'Divine Liturgies' : 'ሥርዓተ ቅዳሴያት'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-[#FAF8F3] border border-[#E6DFD1]/80 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#C8A84B]" />
                  <span className="text-xl sm:text-2xl font-black text-[#2C1D07] font-geez">
                    {language === 'en' ? 'Timeless' : 'ሕያው'}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#6B7280]">
                  {language === 'en' ? 'Spiritual Heritage' : 'መንፈሳዊ ቅርስ'}
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: FULL HOLY BIBLE APP WORKSPACE (MATCHING REFERENCE IMAGE)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'bible' && (
        <div className="w-full bg-[#FAF8F5] rounded-3xl border border-[#E8DFC8] shadow-sm overflow-hidden animate-fadeIn">
          
          {/* Main 3-Column Bible App Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[270px_1fr_320px] min-h-[860px]">
            
            {/* ═══════════════════════════════════════════════════════════════
                1. LEFT SIDEBAR: BIBLE NAVIGATION & 81 BOOKS INDEX
            ═══════════════════════════════════════════════════════════════ */}
            <aside className="bg-[#FAF7F2] border-r border-[#E6DFD1] flex flex-col justify-between h-full overflow-hidden">
              
              {/* Header Branding & Search */}
              <div className="p-4 border-b border-[#E6DFD1]/80 space-y-3.5 shrink-0 bg-[#FAF7F2]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF3DE] border border-[#E0D0A8] flex items-center justify-center text-[#855B09] font-black text-sm shadow-2xs">
                    ✝
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#2C1D07] font-serif leading-tight">
                      EOTC Bible
                    </h3>
                    <p className="text-[10.5px] text-[#855B09] font-medium font-serif">
                      Holy Scripture (፹፩ መጻሕፍት)
                    </p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search books, chapters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-[#E6DFD1] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#2C1D07] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C8A84B] shadow-2xs font-body"
                  />
                </div>
              </div>

              {/* Scrollable Books Accordion */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
                
                {/* ── OLD TESTAMENT ── */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-wider">
                    Old Testament
                  </div>
                  
                  {EOTC_81_BOOKS.filter((b) => b.testament === 'OT' && (searchTerm === '' || b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) || b.nameAmharic.includes(searchTerm))).map((book) => {
                    const isCurrent = currentBook.id === book.id;
                    const isExpanded = expandedSidebarBook === book.id;

                    return (
                      <div key={book.id} className="space-y-0.5">
                        <button
                          onClick={() => {
                            if (isCurrent) {
                              setExpandedSidebarBook(isExpanded ? '' : book.id);
                            } else {
                              openBookInReader(book.id, 1);
                              setExpandedSidebarBook(book.id);
                            }
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#FAF0D9] text-[#2C1D07] font-bold'
                              : 'text-[#4A3B22] hover:bg-[#F3ECE0]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-[#855B09]' : 'text-[#A8987E]'}`} />
                            <span className="truncate">{book.nameEnglish}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3 text-[#855B09] shrink-0" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-[#A8987E] shrink-0 opacity-60" />
                          )}
                        </button>

                        {/* Chapter Quick Selector Grid when Expanded */}
                        {isExpanded && (
                          <div className="pl-6 pr-2 py-1.5 grid grid-cols-5 gap-1 bg-[#F5EFE4]/60 rounded-md my-1">
                            {Array.from({ length: Math.min(book.chaptersCount, 25) }, (_, i) => i + 1).map((ch) => (
                              <button
                                key={ch}
                                onClick={() => {
                                  setSelectedBookId(book.id);
                                  setSelectedChapter(ch);
                                  setActiveVerseNum(1);
                                }}
                                className={`h-6 text-[11px] font-mono rounded flex items-center justify-center transition-all cursor-pointer ${
                                  isCurrent && selectedChapter === ch
                                    ? 'bg-[#C8A84B] text-[#1A2C1C] font-black shadow-2xs'
                                    : 'hover:bg-white text-[#4A3B22]'
                                }`}
                              >
                                {ch}
                              </button>
                            ))}
                            {book.chaptersCount > 25 && (
                              <span className="h-6 text-[10px] text-[#855B09] font-mono flex items-center justify-center col-span-5 font-bold">
                                + {book.chaptersCount - 25} more chapters
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ── NEW TESTAMENT ── */}
                <div className="space-y-1 pt-2 border-t border-[#E6DFD1]/60">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-wider">
                    New Testament
                  </div>
                  
                  {EOTC_81_BOOKS.filter((b) => b.testament === 'NT' && (searchTerm === '' || b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) || b.nameAmharic.includes(searchTerm))).map((book) => {
                    const isCurrent = currentBook.id === book.id;
                    const isExpanded = expandedSidebarBook === book.id;

                    return (
                      <div key={book.id} className="space-y-0.5">
                        <button
                          onClick={() => {
                            if (isCurrent) {
                              setExpandedSidebarBook(isExpanded ? '' : book.id);
                            } else {
                              openBookInReader(book.id, 1);
                              setExpandedSidebarBook(book.id);
                            }
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#FAF0D9] text-[#2C1D07] font-bold'
                              : 'text-[#4A3B22] hover:bg-[#F3ECE0]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-[#855B09]' : 'text-[#A8987E]'}`} />
                            <span className="truncate">{book.nameEnglish}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3 text-[#855B09] shrink-0" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-[#A8987E] shrink-0 opacity-60" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="pl-6 pr-2 py-1.5 grid grid-cols-5 gap-1 bg-[#F5EFE4]/60 rounded-md my-1">
                            {Array.from({ length: Math.min(book.chaptersCount, 25) }, (_, i) => i + 1).map((ch) => (
                              <button
                                key={ch}
                                onClick={() => {
                                  setSelectedBookId(book.id);
                                  setSelectedChapter(ch);
                                  setActiveVerseNum(1);
                                }}
                                className={`h-6 text-[11px] font-mono rounded flex items-center justify-center transition-all cursor-pointer ${
                                  isCurrent && selectedChapter === ch
                                    ? 'bg-[#C8A84B] text-[#1A2C1C] font-black shadow-2xs'
                                    : 'hover:bg-white text-[#4A3B22]'
                                }`}
                              >
                                {ch}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ── ETHIOPIC CANON & DEUTEROCANON ── */}
                <div className="space-y-1 pt-2 border-t border-[#E6DFD1]/60">
                  <div className="px-2 py-1 text-[10px] font-extrabold text-[#855B09] uppercase tracking-wider flex items-center gap-1">
                    <span>Ethiopic Canon (ልዩ ቀኖና)</span>
                  </div>
                  
                  {EOTC_81_BOOKS.filter((b) => (b.testament === 'EOTC_UNIQUE' || b.testament === 'DEUT') && (searchTerm === '' || b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) || b.nameAmharic.includes(searchTerm))).map((book) => {
                    const isCurrent = currentBook.id === book.id;
                    const isExpanded = expandedSidebarBook === book.id;

                    return (
                      <div key={book.id} className="space-y-0.5">
                        <button
                          onClick={() => {
                            if (isCurrent) {
                              setExpandedSidebarBook(isExpanded ? '' : book.id);
                            } else {
                              openBookInReader(book.id, 1);
                              setExpandedSidebarBook(book.id);
                            }
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#FAF0D9] text-[#2C1D07] font-bold'
                              : 'text-[#4A3B22] hover:bg-[#F3ECE0]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-[#855B09]' : 'text-[#A8987E]'}`} />
                            <span className="truncate">{book.nameEnglish}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3 text-[#855B09] shrink-0" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-[#A8987E] shrink-0 opacity-60" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="pl-6 pr-2 py-1.5 grid grid-cols-5 gap-1 bg-[#F5EFE4]/60 rounded-md my-1">
                            {Array.from({ length: Math.min(book.chaptersCount, 25) }, (_, i) => i + 1).map((ch) => (
                              <button
                                key={ch}
                                onClick={() => {
                                  setSelectedBookId(book.id);
                                  setSelectedChapter(ch);
                                  setActiveVerseNum(1);
                                }}
                                className={`h-6 text-[11px] font-mono rounded flex items-center justify-center transition-all cursor-pointer ${
                                  isCurrent && selectedChapter === ch
                                    ? 'bg-[#C8A84B] text-[#1A2C1C] font-black shadow-2xs'
                                    : 'hover:bg-white text-[#4A3B22]'
                                }`}
                              >
                                {ch}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Bottom Settings Link */}
              <div className="p-3 border-t border-[#E6DFD1] bg-[#FAF7F2] shrink-0">
                <button
                  onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#2C1D07] hover:bg-[#F3ECE0] rounded-lg transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings & Display</span>
                </button>
              </div>
            </aside>

            {/* ═══════════════════════════════════════════════════════════════
                2. CENTER COLUMN: MAIN BIBLE READING PROSE WORKSPACE
            ═══════════════════════════════════════════════════════════════ */}
            <main
              className={`flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar transition-colors ${
                readingTheme === 'sepia'
                  ? 'bg-[#FAF4E6]'
                  : readingTheme === 'dark'
                  ? 'bg-[#1C1917] text-[#EDE8DE]'
                  : 'bg-white'
              }`}
            >
              
              {/* Top Navigation & Tool Controls */}
              <div className="px-8 py-5 border-b border-[#E6DFD1]/60 flex items-center justify-between flex-wrap gap-4 shrink-0">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-xs text-[#855B09] font-medium">
                  <span className="font-serif font-bold text-[#4A3B22]">{currentBook.nameEnglish}</span>
                  <span className="text-[#B8A383]">›</span>
                  <span className="text-[#855B09] font-semibold">Chapter {selectedChapter}</span>
                </div>

                {/* Top Action Bar (Audio, Typography Aa, Reading Theme) */}
                <div className="flex items-center gap-2">
                  {/* Audio Reader Toggle */}
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    title={isPlayingAudio ? 'Pause Audio' : 'Listen to Chapter'}
                    className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-[#800020] text-white border-[#800020] shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#4A3B22] hover:bg-[#F0E8D8] border-[#E6DFD1]'
                    }`}
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span className="text-[11px] font-bold hidden sm:inline">
                      {isPlayingAudio ? 'Playing' : 'Audio'}
                    </span>
                  </button>

                  {/* Typography & Script Selector Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                      className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F0E8D8] border border-[#E6DFD1] text-[#4A3B22] text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                      title="Adjust Font Size & Language"
                    >
                      <Type className="w-4 h-4" />
                      <span className="text-[11px]">Aa</span>
                    </button>

                    {isFormatMenuOpen && (
                      <div className="absolute right-0 top-10 w-64 bg-white p-4 rounded-2xl border border-[#E6DFD1] shadow-xl z-50 space-y-3.5">
                        <div className="flex items-center justify-between text-xs font-bold text-[#855B09] border-b border-[#E6DFD1] pb-2">
                          <span>Reading Preferences</span>
                          <button onClick={() => setIsFormatMenuOpen(false)}>
                            <X className="w-3.5 h-3.5 text-[#9CA3AF]" />
                          </button>
                        </div>

                        {/* Font Size */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-[#6B7280]">Font Size</span>
                          <div className="grid grid-cols-3 gap-1 bg-[#FAF8F3] p-1 rounded-xl border border-[#E6DFD1]">
                            {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                              <button
                                key={sz}
                                onClick={() => setFontSize(sz)}
                                className={`py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                                  fontSize === sz
                                    ? 'bg-white text-[#855B09] shadow-2xs font-black'
                                    : 'text-[#9CA3AF]'
                                }`}
                              >
                                {sz === 'normal' ? 'Small' : sz === 'large' ? 'Medium' : 'Large'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Translation Script */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-[#6B7280]">Script / Translation</span>
                          <div className="grid grid-cols-3 gap-1 bg-[#FAF8F3] p-1 rounded-xl border border-[#E6DFD1]">
                            {[
                              { id: 'en' as const, label: 'English' },
                              { id: 'am' as const, label: 'አማርኛ' },
                              { id: 'ge' as const, label: 'ግዕዝ' },
                            ].map((langOpt) => (
                              <button
                                key={langOpt.id}
                                onClick={() => setBibleLanguageMode(langOpt.id)}
                                className={`py-1 text-xs font-bold rounded-lg transition-all ${
                                  bibleLanguageMode === langOpt.id
                                    ? 'bg-[#C8A84B] text-[#1A2C1C] font-black shadow-2xs'
                                    : 'text-[#4A3B22] hover:text-[#1A2C1C]'
                                }`}
                              >
                                {langOpt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reading Light / Theme Mode */}
                  <button
                    onClick={() => {
                      if (readingTheme === 'light') setReadingTheme('sepia');
                      else if (readingTheme === 'sepia') setReadingTheme('dark');
                      else setReadingTheme('light');
                    }}
                    title="Toggle Warm Light / Sepia / Dark Theme"
                    className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F0E8D8] border border-[#E6DFD1] text-[#4A3B22] text-xs shadow-2xs cursor-pointer"
                  >
                    {readingTheme === 'dark' ? (
                      <Moon className="w-4 h-4 text-amber-300" />
                    ) : (
                      <Sun className="w-4 h-4 text-[#C8A84B]" />
                    )}
                  </button>
                </div>
              </div>

              {/* ── BIBLE SCRIPTURE BODY (FLOWING CONTINUOUS PROSE) ── */}
              <div className="px-8 sm:px-14 md:px-20 py-8 max-w-4xl mx-auto w-full space-y-6">
                
                {/* Chapter Title & Sub-Heading */}
                <div className="space-y-1.5 pb-2">
                  <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#2C1D07] tracking-tight">
                    {currentBook.nameEnglish} {selectedChapter}
                  </h1>
                  <p className="text-sm font-serif text-[#786D5C] italic">
                    {selectedChapter === 1 && currentBook.id === 'genesis' ? 'The Beginning' : `${currentBook.nameAmharic} — ምዕራፍ ${selectedChapter}`}
                  </p>
                </div>

                {/* Flowing Prose Paragraphs with Superscript Verse Numbers */}
                <div
                  className={`space-y-4 font-serif leading-[1.85] select-text transition-all ${
                    fontSize === 'xlarge'
                      ? 'text-[19px]'
                      : fontSize === 'large'
                      ? 'text-[17px]'
                      : 'text-[15.5px]'
                  } ${readingTheme === 'dark' ? 'text-[#E5E0D5]' : 'text-[#2D2418]'}`}
                >
                  {verses.map((v) => {
                    const highlight = bibleHighlights.find(
                      (h) => h.bookId === currentBook.id && h.chapter === selectedChapter && h.verseNum === v.number
                    );
                    const isSelected = activeVerseNum === v.number || selectedVerseForMenu === v.number;
                    const hasNote = bibleNotes.some(
                      (n) => n.bookId === currentBook.id && n.chapter === selectedChapter && n.verseRef.includes(`${selectedChapter}:${v.number}`)
                    );
                    const isBookmarked = bibleBookmarks.some(
                      (bm) => bm.bookId === currentBook.id && bm.chapter === selectedChapter && bm.verseRef.includes(`${selectedChapter}:${v.number}`)
                    );

                    let highlightStyle = '';
                    if (highlight) {
                      if (highlight.color === 'yellow') highlightStyle = 'bg-[#FEF3C7] text-[#78350F] rounded-xs px-1 py-0.5';
                      if (highlight.color === 'green') highlightStyle = 'bg-[#DCFCE7] text-[#14532D] rounded-xs px-1.5 py-1 border-l-4 border-emerald-500 block shadow-2xs my-2';
                      if (highlight.color === 'blue') highlightStyle = 'bg-[#DBEAFE] text-[#1E3A8A] rounded-xs px-1 py-0.5';
                      if (highlight.color === 'purple') highlightStyle = 'bg-[#F3E8FF] text-[#581C87] rounded-xs px-1 py-0.5';
                    }

                    const verseContent =
                      bibleLanguageMode === 'en'
                        ? v.english
                        : bibleLanguageMode === 'ge'
                        ? v.geez
                        : bibleLanguageMode === 'am'
                        ? v.amharic
                        : getActiveVerseText(v);

                    return (
                      <div key={v.number} className="relative group/verse my-2.5 inline">
                        <span
                          onClick={() => {
                            setActiveVerseNum(v.number);
                            setSelectedVerseForMenu(selectedVerseForMenu === v.number ? null : v.number);
                          }}
                          className={`cursor-pointer transition-all duration-150 inline ${highlightStyle} ${
                            isSelected && !highlight
                              ? 'bg-[#FFF3D6] ring-1 ring-[#C8A84B] rounded-xs px-0.5'
                              : 'hover:bg-[#FAF3E0]/70 rounded-xs'
                          }`}
                        >
                          <sup className="font-sans font-bold text-[11px] text-[#855B09] mr-1.5 select-none opacity-85">
                            {v.number}
                          </sup>
                          <span>{verseContent}</span>
                          
                          {/* Note / Bookmark indicator icon */}
                          {hasNote && (
                            <span className="inline-block ml-1 text-[#855B09] text-[10px] font-mono">📝</span>
                          )}
                          {isBookmarked && (
                            <span className="inline-block ml-1 text-[#800020] text-[10px] font-mono">🔖</span>
                          )}
                        </span>
                        {' '}

                        {/* Interactive Floating Verse Action Popover when Clicked */}
                        {selectedVerseForMenu === v.number && (
                          <div className="absolute left-0 -top-12 z-40 bg-[#2C1D07] text-white px-3 py-1.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-sans animate-fadeIn">
                            <span className="text-[10px] text-[#C8A84B] font-bold font-mono pr-1 border-r border-white/20">
                              v.{v.number}
                            </span>
                            
                            {/* Color Swatches */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setBibleHighlights((prev) => [
                                    ...prev.filter((h) => !(h.bookId === currentBook.id && h.chapter === selectedChapter && h.verseNum === v.number)),
                                    {
                                      id: `hl-${Date.now()}`,
                                      bookId: currentBook.id,
                                      bookName: currentBook.nameEnglish,
                                      chapter: selectedChapter,
                                      verseNum: v.number,
                                      color: 'yellow',
                                      textSnippet: verseContent,
                                    },
                                  ]);
                                  setSelectedVerseForMenu(null);
                                }}
                                title="Yellow Highlight"
                                className="w-4 h-4 rounded-full bg-[#FDE047] border border-white/40 hover:scale-125 transition-transform"
                              />
                              <button
                                onClick={() => {
                                  setBibleHighlights((prev) => [
                                    ...prev.filter((h) => !(h.bookId === currentBook.id && h.chapter === selectedChapter && h.verseNum === v.number)),
                                    {
                                      id: `hl-${Date.now()}`,
                                      bookId: currentBook.id,
                                      bookName: currentBook.nameEnglish,
                                      chapter: selectedChapter,
                                      verseNum: v.number,
                                      color: 'green',
                                      textSnippet: verseContent,
                                    },
                                  ]);
                                  setSelectedVerseForMenu(null);
                                }}
                                title="Green Highlight"
                                className="w-4 h-4 rounded-full bg-[#86EFAC] border border-white/40 hover:scale-125 transition-transform"
                              />
                              <button
                                onClick={() => {
                                  setBibleHighlights((prev) => [
                                    ...prev.filter((h) => !(h.bookId === currentBook.id && h.chapter === selectedChapter && h.verseNum === v.number)),
                                    {
                                      id: `hl-${Date.now()}`,
                                      bookId: currentBook.id,
                                      bookName: currentBook.nameEnglish,
                                      chapter: selectedChapter,
                                      verseNum: v.number,
                                      color: 'purple',
                                      textSnippet: verseContent,
                                    },
                                  ]);
                                  setSelectedVerseForMenu(null);
                                }}
                                title="Purple Highlight"
                                className="w-4 h-4 rounded-full bg-[#D8B4FE] border border-white/40 hover:scale-125 transition-transform"
                              />
                              {highlight && (
                                <button
                                  onClick={() => {
                                    setBibleHighlights((prev) =>
                                      prev.filter((h) => !(h.bookId === currentBook.id && h.chapter === selectedChapter && h.verseNum === v.number))
                                    );
                                    setSelectedVerseForMenu(null);
                                  }}
                                  title="Clear Highlight"
                                  className="text-[10px] text-red-300 hover:text-red-100 pl-1"
                                >
                                  ✕
                                </button>
                              )}
                            </div>

                            <span className="w-[1px] h-3 bg-white/20" />

                            {/* Add Note Button */}
                            <button
                              onClick={() => {
                                setNoteFormTitle(`${currentBook.nameEnglish} ${selectedChapter}:${v.number}`);
                                setNoteFormVerse(v.number);
                                setNoteFormContent('');
                                setIsNoteEditorOpen(true);
                                setSelectedVerseForMenu(null);
                              }}
                              className="text-[11px] font-bold text-[#E5D2A6] hover:text-white flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Note</span>
                            </button>

                            {/* Bookmark Button */}
                            <button
                              onClick={() => {
                                const exists = bibleBookmarks.some(
                                  (bm) => bm.bookId === currentBook.id && bm.chapter === selectedChapter && bm.verseRef === `${currentBook.nameEnglish} ${selectedChapter}:${v.number}`
                                );
                                if (exists) {
                                  setBibleBookmarks((prev) =>
                                    prev.filter(
                                      (bm) => !(bm.bookId === currentBook.id && bm.chapter === selectedChapter && bm.verseRef === `${currentBook.nameEnglish} ${selectedChapter}:${v.number}`)
                                    )
                                  );
                                } else {
                                  setBibleBookmarks((prev) => [
                                    ...prev,
                                    {
                                      id: `bm-${Date.now()}`,
                                      bookId: currentBook.id,
                                      bookName: currentBook.nameEnglish,
                                      chapter: selectedChapter,
                                      verseRef: `${currentBook.nameEnglish} ${selectedChapter}:${v.number}`,
                                      textSnippet: verseContent,
                                    },
                                  ]);
                                }
                                setSelectedVerseForMenu(null);
                              }}
                              className="text-[11px] font-bold text-[#E5D2A6] hover:text-white flex items-center gap-1"
                            >
                              <Bookmark className="w-3 h-3" />
                            </button>

                            {/* Share / Copy */}
                            <button
                              onClick={() => {
                                handleShareVerse(v.number);
                                setSelectedVerseForMenu(null);
                              }}
                              className="text-[11px] font-bold text-[#E5D2A6] hover:text-white"
                            >
                              <Share2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* ── BOTTOM CHAPTER NAVIGATION BAR ── */}
              <div className="px-8 py-5 border-t border-[#E6DFD1]/60 flex items-center justify-center gap-8 shrink-0 bg-[#FAF8F5]/80">
                <button
                  onClick={() => {
                    setSelectedChapter(Math.max(1, selectedChapter - 1));
                    setActiveVerseNum(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={selectedChapter === 1}
                  className="w-9 h-9 rounded-full bg-white border border-[#E6DFD1] hover:bg-[#FAF3DE] text-[#855B09] flex items-center justify-center shadow-2xs disabled:opacity-30 transition-all cursor-pointer"
                  title="Previous Chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#4A3B22] bg-white border border-[#E6DFD1] px-4 py-1.5 rounded-full shadow-2xs">
                  <span>{currentBook.nameEnglish} {selectedChapter}</span>
                  <ChevronDown className="w-3 h-3 text-[#855B09]" />
                </div>

                <button
                  onClick={() => {
                    setSelectedChapter(Math.min(currentBook.chaptersCount, selectedChapter + 1));
                    setActiveVerseNum(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={selectedChapter === currentBook.chaptersCount}
                  className="w-9 h-9 rounded-full bg-white border border-[#E6DFD1] hover:bg-[#FAF3DE] text-[#855B09] flex items-center justify-center shadow-2xs disabled:opacity-30 transition-all cursor-pointer"
                  title="Next Chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </main>

            {/* ═══════════════════════════════════════════════════════════════
                3. RIGHT SIDEBAR: TOOLS, NOTES, HIGHLIGHTS & STUDY CENTER
            ═══════════════════════════════════════════════════════════════ */}
            <aside className="hidden xl:flex flex-col bg-[#FAF7F2] border-l border-[#E6DFD1] p-4.5 space-y-4 overflow-y-auto custom-scrollbar">
              
              {/* ── TOOLS HEADER BAR ── */}
              <div className="bg-white rounded-2xl border border-[#E6DFD1] p-3 shadow-2xs">
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-wider block mb-2 px-1">
                  Tools
                </span>

                <div className="grid grid-cols-4 gap-1 text-center">
                  {[
                    { id: 'notes' as const, label: 'Notes', icon: Edit3 },
                    { id: 'highlights' as const, label: 'Highlights', icon: Highlighter },
                    { id: 'bookmarks' as const, label: 'Bookmarks', icon: Bookmark },
                    { id: 'history' as const, label: 'History', icon: Clock },
                  ].map((tool) => {
                    const ToolIcon = tool.icon;
                    const isActive = activeStudyTool === tool.id;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveStudyTool(tool.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10.5px] font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#FAF0D9] text-[#855B09] shadow-2xs font-extrabold'
                            : 'text-[#6B7280] hover:text-[#2C1D07] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <ToolIcon className="w-3.5 h-3.5 mb-1" />
                        <span>{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── MY NOTES CARD ── */}
              <div className="bg-white rounded-2xl border border-[#E6DFD1] p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-wider">
                    My Notes
                  </span>
                  <button
                    onClick={() => {
                      setNoteFormTitle(`${currentBook.nameEnglish} ${selectedChapter}:${activeVerseNum || 1}`);
                      setNoteFormVerse(activeVerseNum || 1);
                      setNoteFormContent('');
                      setIsNoteEditorOpen(true);
                    }}
                    className="text-[11px] font-bold text-[#855B09] hover:text-[#523703] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New Note</span>
                  </button>
                </div>

                {/* Inline Note Creation Form */}
                {isNoteEditorOpen && (
                  <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6DFD1] space-y-2.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="Note Title"
                        value={noteFormTitle}
                        onChange={(e) => setNoteFormTitle(e.target.value)}
                        className="w-full bg-white border border-[#E6DFD1] rounded-lg px-2.5 py-1 text-xs font-bold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
                      />
                    </div>
                    <textarea
                      placeholder="Write your study notes, reflections, or cross-references here..."
                      rows={3}
                      value={noteFormContent}
                      onChange={(e) => setNoteFormContent(e.target.value)}
                      className="w-full bg-white border border-[#E6DFD1] rounded-lg p-2 text-xs text-[#2C1D07] focus:outline-none focus:border-[#C8A84B] font-body"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setIsNoteEditorOpen(false)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#6B7280] hover:bg-stone-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (noteFormTitle.trim() || noteFormContent.trim()) {
                            setBibleNotes((prev) => [
                              {
                                id: `note-${Date.now()}`,
                                title: noteFormTitle || 'Study Note',
                                bookId: currentBook.id,
                                bookName: currentBook.nameEnglish,
                                chapter: selectedChapter,
                                verseRef: `${currentBook.nameEnglish} ${selectedChapter}:${noteFormVerse}`,
                                content: noteFormContent,
                                date: 'Today',
                              },
                              ...prev,
                            ]);
                            setIsNoteEditorOpen(false);
                          }
                        }}
                        className="px-3 py-1 bg-[#1A2C1C] text-[#C8A84B] rounded-lg text-xs font-bold shadow-2xs"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Saved Notes */}
                <div className="space-y-2.5">
                  {bibleNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E6DFD1]/80 hover:border-[#C8A84B] transition-colors space-y-1 group relative"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-[#2C1D07] font-serif truncate">
                          {note.title}
                        </h4>
                        <span className="text-[10px] text-[#9CA3AF] font-mono">
                          {note.date}
                        </span>
                      </div>
                      
                      <div className="text-[10.5px] font-bold text-[#855B09] font-serif">
                        {note.verseRef}
                      </div>

                      <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed font-body">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>

                <button className="w-full text-center text-[11px] font-bold text-[#855B09] hover:underline pt-1 flex items-center justify-center gap-1">
                  <span>View all notes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* ── MY HIGHLIGHTS CARD ── */}
              <div className="bg-white rounded-2xl border border-[#E6DFD1] p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-wider">
                    My Highlights
                  </span>
                  <span className="text-[11px] font-bold text-[#855B09] cursor-pointer hover:underline">
                    View all
                  </span>
                </div>

                <div className="space-y-2.5">
                  {bibleHighlights.map((hl) => (
                    <div
                      key={hl.id}
                      onClick={() => {
                        setSelectedBookId(hl.bookId);
                        setSelectedChapter(hl.chapter);
                        setActiveVerseNum(hl.verseNum);
                      }}
                      className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E6DFD1]/70 hover:border-[#C8A84B] transition-colors cursor-pointer space-y-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            hl.color === 'yellow'
                              ? 'bg-amber-400'
                              : hl.color === 'green'
                              ? 'bg-emerald-500'
                              : hl.color === 'purple'
                              ? 'bg-purple-500'
                              : 'bg-blue-500'
                          }`}
                        />
                        <span className="text-xs font-bold text-[#2C1D07] font-serif">
                          {hl.bookName} {hl.chapter}:{hl.verseNum}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] line-clamp-2 italic font-serif">
                        "{hl.textSnippet}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── BOOKMARKS CARD ── */}
              <div className="bg-white rounded-2xl border border-[#E6DFD1] p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-wider">
                    Bookmarks
                  </span>
                  <span className="text-[11px] font-bold text-[#855B09] cursor-pointer hover:underline">
                    View all
                  </span>
                </div>

                <div className="space-y-2.5">
                  {bibleBookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      onClick={() => {
                        setSelectedBookId(bm.bookId);
                        setSelectedChapter(bm.chapter);
                      }}
                      className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E6DFD1]/70 hover:border-[#C8A84B] transition-colors cursor-pointer space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-[#800020]">
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold text-[#2C1D07] font-serif">
                          {bm.verseRef}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] line-clamp-2 font-serif italic">
                        "{bm.textSnippet}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </aside>

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
