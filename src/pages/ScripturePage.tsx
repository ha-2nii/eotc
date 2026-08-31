import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../components/layout/LanguageContext';
import { EOTC_81_BOOKS, MOCK_PARALLEL_VERSES } from '../data/mockScripture';
import type { Verse } from '../data/mockScripture';
import { PRAYER_BOOKS } from '../data/mockChants';
import type { PrayerBook } from '../data/mockChants';
import { LITURGICAL_CATEGORIES } from '../data/mockLiturgy';
import type { LiturgicalCategory, LiturgicalItem } from '../data/mockLiturgy';
import { LiturgicalTextsView } from '../components/scripture/LiturgicalTextsView';
import { GeezLearningView } from '../components/scripture/GeezLearningView';
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
  Search,
  ArrowRight,
  BookMarked,
  Layers,
  CheckCircle,
  Shield,
  Sun,
  Moon,
  Sparkles,
  Download,
  Printer,
  Highlighter,
  Edit3,
  Clock,
  Settings,
  Plus,
  X,
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
  const [expandedTestament, setExpandedTestament] = useState<'OT' | 'NT' | 'ETHIOPIC' | null>('OT');
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
  const [prayerTheme, setPrayerTheme] = useState<'parchment' | 'dark' | 'clean'>('parchment');
  const [prayerFontSize, setPrayerFontSize] = useState<'normal' | 'large' | 'elderly'>('normal');
  const [prayerCategoryTab, setPrayerCategoryTab] = useState<string>('all');
  const [isPrayerAccordionOpen, setIsPrayerAccordionOpen] = useState<boolean>(true);

  // Liturgy States
  const [liturgyViewMode, setLiturgyViewMode] = useState<'categories' | 'reader'>('categories');
  const [selectedLiturgyCategoryId, setSelectedLiturgyCategoryId] = useState<string>('qidase');
  const [selectedLiturgyItemId, setSelectedLiturgyItemId] = useState<string>('qidase-apostles');
  const [liturgyLangMode, setLiturgyLangMode] = useState<'geez-only' | 'parallel' | 'single'>('parallel');
  const [liturgyFontSize, setLiturgyFontSize] = useState<'normal' | 'large' | 'cantor'>('normal');
  const [downloadToast, setDownloadToast] = useState<boolean>(false);
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeView]);

  // Current Bible book & verses
  const currentBook = EOTC_81_BOOKS.find((b) => b.id === selectedBookId) || EOTC_81_BOOKS[0];
  const verseKey = `${currentBook.id}-${selectedChapter}` in MOCK_PARALLEL_VERSES ? `${currentBook.id}-${selectedChapter}` : 'john-1';
  const verses = MOCK_PARALLEL_VERSES[verseKey] || MOCK_PARALLEL_VERSES['john-1'];

  // Jump to specific book & chapter in Bible Reader
  const openBookInReader = (bookId: string, chapter: number = 1) => {
    const targetBook = EOTC_81_BOOKS.find((b) => b.id === bookId);
    if (targetBook) {
      if (targetBook.testament === 'OT') setExpandedTestament('OT');
      else if (targetBook.testament === 'NT') setExpandedTestament('NT');
      else setExpandedTestament('ETHIOPIC');
    }
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

  // Copy share verse link handler
  const handleShareVerse = (verseNum: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${currentBook.nameEnglish} ${selectedChapter}:${verseNum}`);
    }
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };







  return (
    <div
      className={`w-full mx-auto animate-fadeIn ${
        activeSection === 'bible' ? 'max-w-[1560px] space-y-4' : (activeSection === 'liturgy' || activeSection === 'geez') ? '' : 'max-w-[1480px] space-y-8'
      }`}
      style={{
        paddingLeft: activeSection === 'bible' ? 'clamp(8px, 1.2vw, 20px)' : (activeSection === 'liturgy' || activeSection === 'geez') ? '0' : 'clamp(24px, 5vw, 72px)',
        paddingRight: activeSection === 'bible' ? 'clamp(8px, 1.2vw, 20px)' : (activeSection === 'liturgy' || activeSection === 'geez') ? '0' : 'clamp(24px, 5vw, 72px)',
        paddingTop: activeSection === 'bible' ? '12px' : (activeSection === 'liturgy' || activeSection === 'geez') ? '0' : '24px',
        paddingBottom: activeSection === 'bible' ? '24px' : (activeSection === 'liturgy' || activeSection === 'geez') ? '0' : '64px',
      }}
    >
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#C8A84B]" />
          <span>{language === 'en' ? 'Verse copied to clipboard!' : 'ጥቅሱ ተቀድቷል!'}</span>
        </div>
      )}



      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: MAIN SCRIPTURE HUB (Default Landing Page)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'hub' && (
        <div className="relative space-y-12 animate-fadeIn overflow-hidden">
          {/* Sacred Ethiopian Cross Watermark Background (Parchment manuscript effect on Left for Section 1) */}
          <div
            className="absolute -top-6 left-0 lg:-left-10 pointer-events-none select-none z-0 flex items-center justify-center opacity-[0.08] transition-opacity"
            style={{
              width: 'min(90vw, 680px)',
              height: '880px',
            }}
          >
            <img
              src="/assets/images/eotc_cross_watermark_transparent.png"
              alt="EOTC Sacred Cross Watermark"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ── 1. HERO SECTION (CARDLESS SEAMLESS DESIGN MATCHING REFERENCE) ─── */}
          <div className="relative pt-2 pb-6 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Cross Ornament + Title + Description + Explore CTA + Options Tabs */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Golden Cross Ornament with Horizontal Accent Lines */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[1.5px] bg-[#D4AF37]" />
                  <img
                    src="/assets/images/eotc_cross_watermark_transparent.png"
                    alt="EOTC Cross"
                    className="w-6 h-6 object-contain"
                  />
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
          <div className="relative space-y-10 pt-4 pb-2">
            {/* Section 2 Sacred Ethiopian Cross Watermark on the Right Side */}
            <div
              className="absolute -top-12 -right-4 lg:-right-10 pointer-events-none select-none z-0 flex items-center justify-center opacity-[0.08] transition-opacity"
              style={{
                width: 'min(90vw, 660px)',
                height: '860px',
              }}
            >
              <img
                src="/assets/images/eotc_cross_watermark_transparent.png"
                alt="EOTC Sacred Cross Watermark"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
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

                    },
                    {
                      id: 'prayers' as ScriptureSubSection,
                      icon: Heart,
                      titleEn: 'Prayer Books',
                      titleAm: 'መጻሕፍተ ጸሎት',
                      subEn: 'Wudase Mariam • Mezmur • Agpeya',
                      subAm: 'ውዳሴ ማርያም • ሰዓታት • መዝሙረ ዳዊት',

                    },
                    {
                      id: 'liturgy' as ScriptureSubSection,
                      icon: BookMarked,
                      titleEn: 'Liturgical Texts & Patristics',
                      titleAm: 'ሥርዓተ ቅዳሴና መጻሕፍተ ሊቃውንት',
                      subEn: '14 Anaphoras • Synaxarium • Church Fathers',
                      subAm: '፲፬ቱ ቅዳሴያት • መጽሐፈ ስንክሳር • ሃይማኖተ አበው',

                    },
                    {
                      id: 'geez' as ScriptureSubSection,
                      icon: Languages,
                      titleEn: 'Ge’ez Language & Chant Learning',
                      titleAm: 'ትምህርተ ግዕዝ ወዜማ',
                      subEn: 'Alphabet • Grammar • Chant Notation',
                      subAm: 'ፊደል • ሰዋስው • የቅዱስ ያሬድ ዜማ ምልክቶች',

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
                        SECTION 2: FULL HOLY BIBLE APP WORKSPACE (MATCHING EXACT REFERENCE DESIGN)
                    ═══════════════════════════════════════════════════════════════ */}
                    {activeSection === 'bible' && (
                      <div className="w-full bg-[#FAF8F5] rounded-3xl border border-[#ECE5D8] overflow-hidden animate-fadeIn">
                        
                        {/* Main 3-Column Bible App Layout — fixed height so each column scrolls independently */}
                        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[250px_1fr_310px]" style={{ height: '860px', overflow: 'hidden' }}>
                          
                          {/* ═══════════════════════════════════════════════════════════════
                              1. LEFT SIDEBAR: CLEAN STREAMLINED 81-BOOK CANON INDEX
                          ═══════════════════════════════════════════════════════════════ */}
                          <aside className="bg-[#FAF8F5] border-r border-[#EFEBE4] flex flex-col h-full overflow-hidden">
                            
                            {/* Header Branding & Search Bar matching Reference */}
                            <div className="p-4 pb-3 space-y-3 shrink-0">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                                  <img
                                    src="/assets/images/eotc_cross_watermark_transparent.png"
                                    alt="EOTC"
                                    className="w-6 h-6 object-contain"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-sm font-serif font-black text-[#1A1208] leading-tight">
                                    EOTC Bible
                                  </h3>
                                  <p className="text-[10px] text-[#8C8275] font-serif">
                                    Holy Scripture
                                  </p>
                                </div>
                              </div>

                              {/* Clean Search Bar */}
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Search books or chapters..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                  className="w-full bg-[#F5F1E9] border border-[#E8E1D5] rounded-xl pl-3 pr-8 py-1.5 text-xs text-[#2C1D07] placeholder-[#A0988A] focus:outline-none focus:border-[#C8A84B] font-body transition-colors"
                                />
                                <Search className="w-3.5 h-3.5 text-[#A0988A] absolute right-3 top-2.5 pointer-events-none" />
                              </div>
                            </div>

                            {/* Categorized Clean Book List (No bulky cards) */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain px-3 py-1 space-y-4">
                              
                              {/* ── OLD TESTAMENT ── */}
                              <div className="space-y-1">
                                <button
                                  onClick={() => setExpandedTestament(expandedTestament === 'OT' ? null : 'OT')}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10.5px] font-serif font-black uppercase tracking-wider transition-colors cursor-pointer ${
                                    expandedTestament === 'OT' ? 'bg-[#FAF0D9]/70 text-[#855B09]' : 'text-[#8C8275] hover:text-[#1A1208] hover:bg-[#F2ECE0]/50'
                                  }`}
                                >
                                  <span>{language === 'en' ? 'Old Testament (46)' : 'ብሉይ ኪዳን (፵፮)'}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform ${
                                      expandedTestament === 'OT' || searchTerm !== '' ? 'rotate-180 text-[#855B09]' : 'text-[#A0988A]'
                                    }`}
                                  />
                                </button>

                                {(expandedTestament === 'OT' || searchTerm !== '') && (
                                  <div className="space-y-0.5 animate-fadeIn pl-1">
                                    {EOTC_81_BOOKS.filter(
                                      (b) =>
                                        b.testament === 'OT' &&
                                        (searchTerm === '' ||
                                          b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                          b.nameAmharic.includes(searchTerm) ||
                                          b.nameGeez.includes(searchTerm))
                                    ).map((book) => {
                                      const isCurrent = currentBook.id === book.id;
                                      return (
                                        <button
                                          key={book.id}
                                          onClick={() => openBookInReader(book.id, 1)}
                                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                                            isCurrent
                                              ? 'border-l-2 border-[#B8860B] text-[#B8860B] font-bold bg-[#FAF0D9]/60 pl-2 font-serif'
                                              : 'text-[#4A4033] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60 font-serif'
                                          }`}
                                        >
                                          <span className="truncate">{book.nameEnglish}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* ── NEW TESTAMENT ── */}
                              <div className="space-y-1">
                                <button
                                  onClick={() => setExpandedTestament(expandedTestament === 'NT' ? null : 'NT')}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10.5px] font-serif font-black uppercase tracking-wider transition-colors cursor-pointer ${
                                    expandedTestament === 'NT' ? 'bg-[#FAF0D9]/70 text-[#855B09]' : 'text-[#8C8275] hover:text-[#1A1208] hover:bg-[#F2ECE0]/50'
                                  }`}
                                >
                                  <span>{language === 'en' ? 'New Testament (27)' : 'ሐዲስ ኪዳን (፳፯)'}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform ${
                                      expandedTestament === 'NT' || searchTerm !== '' ? 'rotate-180 text-[#855B09]' : 'text-[#A0988A]'
                                    }`}
                                  />
                                </button>

                                {(expandedTestament === 'NT' || searchTerm !== '') && (
                                  <div className="space-y-0.5 animate-fadeIn pl-1">
                                    {EOTC_81_BOOKS.filter(
                                      (b) =>
                                        b.testament === 'NT' &&
                                        (searchTerm === '' ||
                                          b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                          b.nameAmharic.includes(searchTerm) ||
                                          b.nameGeez.includes(searchTerm))
                                    ).map((book) => {
                                      const isCurrent = currentBook.id === book.id;
                                      return (
                                        <button
                                          key={book.id}
                                          onClick={() => openBookInReader(book.id, 1)}
                                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                                            isCurrent
                                              ? 'border-l-2 border-[#B8860B] text-[#B8860B] font-bold bg-[#FAF0D9]/60 pl-2 font-serif'
                                              : 'text-[#4A4033] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60 font-serif'
                                          }`}
                                        >
                                          <span className="truncate">{book.nameEnglish}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* ── ETHIOPIC CANON ── */}
                              <div className="space-y-1">
                                <button
                                  onClick={() => setExpandedTestament(expandedTestament === 'ETHIOPIC' ? null : 'ETHIOPIC')}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10.5px] font-serif font-black uppercase tracking-wider transition-colors cursor-pointer ${
                                    expandedTestament === 'ETHIOPIC' ? 'bg-[#FAF0D9]/70 text-[#855B09]' : 'text-[#8C8275] hover:text-[#1A1208] hover:bg-[#F2ECE0]/50'
                                  }`}
                                >
                                  <span>{language === 'en' ? 'Ethiopic Canon (16)' : 'ልዩ ቀኖና ወአዋልድ (፲፮)'}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform ${
                                      expandedTestament === 'ETHIOPIC' || searchTerm !== '' ? 'rotate-180 text-[#855B09]' : 'text-[#A0988A]'
                                    }`}
                                  />
                                </button>

                                {(expandedTestament === 'ETHIOPIC' || searchTerm !== '') && (
                                  <div className="space-y-0.5 animate-fadeIn pl-1">
                                    {EOTC_81_BOOKS.filter(
                                      (b) =>
                                        (b.testament === 'EOTC_UNIQUE' || b.testament === 'DEUT') &&
                                        (searchTerm === '' ||
                                          b.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                          b.nameAmharic.includes(searchTerm) ||
                                          b.nameGeez.includes(searchTerm))
                                    ).map((book) => {
                                      const isCurrent = currentBook.id === book.id;
                                      return (
                                        <button
                                          key={book.id}
                                          onClick={() => openBookInReader(book.id, 1)}
                                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                                            isCurrent
                                              ? 'border-l-2 border-[#B8860B] text-[#B8860B] font-bold bg-[#FAF0D9]/60 pl-2 font-serif'
                                              : 'text-[#4A4033] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60 font-serif'
                                          }`}
                                        >
                                          <span className="truncate">{book.nameEnglish}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                            </div>

                            {/* Bottom Settings Link */}
                            <div className="p-3.5 border-t border-[#EFEBE4] bg-[#FAF8F5] shrink-0">
                              <button
                                onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                                className="flex items-center gap-2 text-xs font-serif text-[#6B6152] hover:text-[#1A1208] transition-colors cursor-pointer"
                              >
                                <Settings className="w-3.5 h-3.5 text-[#8C8275]" />
                                <span>Settings</span>
                              </button>
                            </div>
                          </aside>

                          {/* ═══════════════════════════════════════════════════════════════
                              2. CENTER COLUMN: CLEAN MINIMALIST BIBLE READING WORKSPACE
                          ═══════════════════════════════════════════════════════════════ */}
                          <main
                            className={`flex-1 flex flex-col overflow-y-auto custom-scrollbar overscroll-contain transition-colors h-full ${
                              readingTheme === 'sepia'
                                ? 'bg-[#FAF4E6]'
                                : readingTheme === 'dark'
                                ? 'bg-[#1C1917] text-[#EDE8DE]'
                                : 'bg-[#FAF8F5]'
                            }`}
                          >
                            
                            {/* Top Navigation & Minimalist Action Buttons */}
                            <div className="px-8 sm:px-12 py-5 flex items-center justify-between flex-wrap gap-4 shrink-0">
                              
                              {/* Clean Breadcrumbs */}
                              <div className="flex items-center gap-1.5 text-xs text-[#8C8275] font-serif">
                                <span className="font-semibold text-[#4A4033]">{currentBook.nameEnglish}</span>
                                <span className="text-[#B8A383]">›</span>
                                <span className="text-[#8C8275]">Chapter {selectedChapter}</span>
                              </div>

                              {/* Minimalist Action Buttons matching Reference Image */}
                              <div className="flex items-center gap-2">
                                {/* Audio Speaker Button */}
                                <button
                                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                                  title={isPlayingAudio ? 'Pause Audio' : 'Listen to Chapter'}
                                  className={`w-9 h-9 rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${
                                    isPlayingAudio
                                      ? 'bg-[#800020] text-white border-[#800020] shadow-2xs'
                                      : 'bg-white text-[#4A4033] hover:bg-[#F5EFE4] border-[#E8E1D5]'
                                  }`}
                                >
                                  {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#4A4033]" />}
                                </button>

                                {/* Typography Aa Button */}
                                <div className="relative">
                                  <button
                                    onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
                                    className="w-9 h-9 rounded-xl bg-white hover:bg-[#F5EFE4] border border-[#E8E1D5] text-[#4A4033] text-xs font-serif font-bold flex items-center justify-center shadow-2xs cursor-pointer"
                                    title="Typography & Reading Preferences"
                                  >
                                    <span>AA</span>
                                  </button>

                                  {isFormatMenuOpen && (
                                    <div className="absolute right-0 top-11 w-64 bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-xl z-50 space-y-3.5 animate-fadeIn">
                                      <div className="flex items-center justify-between text-xs font-bold text-[#855B09] border-b border-[#E8E1D5] pb-2">
                                        <span>Reading Preferences</span>
                                        <button onClick={() => setIsFormatMenuOpen(false)}>
                                          <X className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                        </button>
                                      </div>

                                      {/* Font Size */}
                                      <div className="space-y-1.5">
                                        <span className="text-[11px] font-bold text-[#6B7280]">Font Size</span>
                                        <div className="grid grid-cols-3 gap-1 bg-[#FAF8F3] p-1 rounded-xl border border-[#E8E1D5]">
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
                                        <span className="text-[11px] font-bold text-[#6B7280]">Translation</span>
                                        <div className="grid grid-cols-3 gap-1 bg-[#FAF8F3] p-1 rounded-xl border border-[#E8E1D5]">
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
                                                  : 'text-[#4A3B22] hover:text-[#1A1208]'
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

                                {/* Sun / Theme Button */}
                                <button
                                  onClick={() => {
                                    if (readingTheme === 'light') setReadingTheme('sepia');
                                    else if (readingTheme === 'sepia') setReadingTheme('dark');
                                    else setReadingTheme('light');
                                  }}
                                  title="Toggle Theme"
                                  className="w-9 h-9 rounded-xl bg-white hover:bg-[#F5EFE4] border border-[#E8E1D5] text-[#4A4033] flex items-center justify-center shadow-2xs cursor-pointer"
                                >
                                  {readingTheme === 'dark' ? (
                                    <Moon className="w-4 h-4 text-amber-300" />
                                  ) : (
                                    <Sun className="w-4 h-4 text-[#8C8275]" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* ── BIBLE SCRIPTURE BODY (MATCHING EXACT REFERENCE TYPOGRAPHY) ── */}
                            <div className="flex-1 px-8 sm:px-14 md:px-20 pt-2 pb-8 max-w-3xl mx-auto w-full space-y-6 flex flex-col justify-between">
                              
                              <div className="space-y-6">
                                {/* Chapter Heading & Italic Subtitle */}
                                <div className="space-y-1 pb-1">
                                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1208] tracking-tight">
                                    {currentBook.nameEnglish} {selectedChapter}
                                  </h1>
                                  <p className="text-sm font-serif text-[#8C8275] italic">
                                    {selectedChapter === 1 && currentBook.id === 'genesis'
                                      ? 'The Beginning'
                                      : `${currentBook.nameAmharic} — ምዕራፍ ${selectedChapter}`}
                                  </p>
                                </div>

                                {/* Clean List of Verses */}
                                <div
                                  className={`space-y-3 font-serif leading-[1.85] select-text transition-all ${
                                    fontSize === 'xlarge'
                                      ? 'text-[18px]'
                                      : fontSize === 'large'
                                      ? 'text-[16.5px]'
                                      : 'text-[15.5px]'
                                  } ${readingTheme === 'dark' ? 'text-[#E5E0D5]' : 'text-[#2C241B]'}`}
                                >
                                  {verses.map((v) => {
                                    const isSelected = activeVerseNum === v.number;
                                    const verseContent =
                                      bibleLanguageMode === 'en'
                                        ? v.english
                                        : bibleLanguageMode === 'ge'
                                        ? v.geez
                                        : bibleLanguageMode === 'am'
                                        ? v.amharic
                                        : getActiveVerseText(v);

                                    return (
                                      <div
                                        key={v.number}
                                        onClick={() => {
                                          setActiveVerseNum(v.number);
                                          setSelectedVerseForMenu(selectedVerseForMenu === v.number ? null : v.number);
                                        }}
                                        className={`flex items-start gap-4 p-2 rounded-xl transition-all cursor-pointer ${
                                          isSelected
                                            ? 'bg-[#FDF3DE] border border-[#F3E5C8]'
                                            : 'hover:bg-[#F5EFE4]/60'
                                        }`}
                                      >
                                        {/* Verse Number Column */}
                                        <span className="text-xs font-serif font-bold text-[#8C8275] pt-0.5 w-5 shrink-0 text-right select-none opacity-80">
                                          {v.number}
                                        </span>

                                        {/* Verse Text + Bookmark Icon when Selected */}
                                        <div className="flex-1 flex items-start justify-between gap-3">
                                          <p className="text-[15px] sm:text-[15.5px] font-serif leading-[1.8] text-[#2C241B]">
                                            {verseContent}
                                          </p>

                                          {/* Golden Bookmark Ribbon Icon on Active Verse */}
                                          {isSelected && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setBibleBookmarks((prev) => {
                                                  const exists = prev.some(
                                                    (bm) => bm.bookId === currentBook.id && bm.chapter === selectedChapter && bm.verseRef.includes(`${selectedChapter}:${v.number}`)
                                                  );
                                                  if (exists) {
                                                    return prev.filter(
                                                      (bm) => !(bm.bookId === currentBook.id && bm.chapter === selectedChapter && bm.verseRef.includes(`${selectedChapter}:${v.number}`))
                                                    );
                                                  } else {
                                                    return [
                                                      ...prev,
                                                      {
                                                        id: `bm-${Date.now()}`,
                                                        bookId: currentBook.id,
                                                        bookName: currentBook.nameEnglish,
                                                        chapter: selectedChapter,
                                                        verseRef: `${currentBook.nameEnglish} ${selectedChapter}:${v.number}`,
                                                        textSnippet: verseContent.substring(0, 65) + '...',
                                                      },
                                                    ];
                                                  }
                                                });
                                                handleShareVerse(v.number);
                                              }}
                                              className="text-[#B8860B] hover:scale-110 transition-transform shrink-0 pt-1 cursor-pointer"
                                              title="Bookmark Verse"
                                            >
                                              <Bookmark className="w-4 h-4 fill-current" />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Floating Chapter Navigation Pill matching Reference */}
                              <div className="pt-6 pb-2 flex items-center justify-center">
                                <div className="inline-flex items-center gap-3 bg-white border border-[#E8E1D5] px-4 py-1.5 rounded-full text-xs font-bold text-[#4A4033] shadow-2xs">
                                  <button
                                    onClick={() => {
                                      if (selectedChapter > 1) {
                                        openBookInReader(currentBook.id, selectedChapter - 1);
                                      }
                                    }}
                                    disabled={selectedChapter === 1}
                                    className="hover:text-[#B8860B] disabled:opacity-30 cursor-pointer"
                                  >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                  </button>
                                  
                                  <span className="font-serif font-bold flex items-center gap-1 cursor-pointer">
                                    <span>{currentBook.nameEnglish} {selectedChapter}</span>
                                    <ChevronDown className="w-3 h-3 text-[#8C8275]" />
                                  </span>

                                  <button
                                    onClick={() => {
                                      if (selectedChapter < currentBook.chaptersCount) {
                                        openBookInReader(currentBook.id, selectedChapter + 1);
                                      }
                                    }}
                                    disabled={selectedChapter === currentBook.chaptersCount}
                                    className="hover:text-[#B8860B] disabled:opacity-30 cursor-pointer"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                            </div>
                          </main>

                          {/* ═══════════════════════════════════════════════════════════════
                              3. RIGHT SIDEBAR: CLEAN TOOLS & NOTES PANEL MATCHING REFERENCE
                          ═══════════════════════════════════════════════════════════════ */}
                          <aside className="hidden xl:flex flex-col bg-[#FAF8F5] border-l border-[#EFEBE4] p-4.5 space-y-4 overflow-y-auto custom-scrollbar overscroll-contain h-full">
                            
                            {/* ── TOOLS HEADER BAR ── */}
                            <div className="space-y-2">
                              <span className="text-[10px] font-black text-[#9C9488] uppercase tracking-wider block px-1">
                                TOOLS
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
                        className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10.5px] font-serif transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#FAF0D9] text-[#855B09] font-bold shadow-2xs'
                            : 'text-[#8C8275] hover:text-[#2C1D07] hover:bg-[#F2ECE0]/60'
                        }`}
                      >
                        <ToolIcon className="w-3.5 h-3.5 mb-1" />
                        <span>{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── NOTES PANEL (MATCHING EXACT REFERENCE IMAGE) ── */}
              {activeStudyTool === 'notes' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-black text-[#9C9488] uppercase tracking-wider">
                      NOTES
                    </span>
                    <button
                      onClick={() => {
                        setNoteFormTitle(`${currentBook.nameEnglish} ${selectedChapter}:${activeVerseNum || 1}`);
                        setNoteFormVerse(activeVerseNum || 1);
                        setNoteFormContent('');
                        setIsNoteEditorOpen(true);
                      }}
                      className="text-[11px] font-serif font-bold text-[#855B09] hover:text-[#523703] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>New Note</span>
                    </button>
                  </div>

                  {/* Inline Note Creation Form */}
                  {isNoteEditorOpen && (
                    <div className="bg-white p-3 rounded-2xl border border-[#E8E1D5] space-y-2.5 animate-fadeIn shadow-2xs">
                      <input
                        type="text"
                        placeholder="Note Title"
                        value={noteFormTitle}
                        onChange={(e) => setNoteFormTitle(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E8E1D5] rounded-lg px-2.5 py-1 text-xs font-bold text-[#2C1D07] focus:outline-none focus:border-[#C8A84B]"
                      />
                      <textarea
                        placeholder="Write your study notes here..."
                        rows={3}
                        value={noteFormContent}
                        onChange={(e) => setNoteFormContent(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E8E1D5] rounded-lg p-2 text-xs text-[#2C1D07] focus:outline-none focus:border-[#C8A84B] font-serif"
                      />
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => setIsNoteEditorOpen(false)}
                          className="px-2.5 py-1 rounded-lg text-xs font-serif font-bold text-[#6B7280] hover:bg-stone-200"
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
                          className="px-3 py-1 bg-[#1A2C1C] text-[#C8A84B] rounded-lg text-xs font-bold shadow-2xs cursor-pointer"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Empty State Card matching Reference Image */}
                  {bibleNotes.length === 0 && !isNoteEditorOpen ? (
                    <div className="bg-[#FAF8F5] border border-[#ECE5D8] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#C5B396]">
                        <svg
                          width="44"
                          height="44"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#C5B396"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-[#3D3328]">
                        No notes yet
                      </h4>
                      <p className="text-xs text-[#8C8275] max-w-[180px] leading-relaxed font-serif">
                        Take a note on your favorite verses.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {bibleNotes.map((note) => (
                        <div
                          key={note.id}
                          className="p-3 bg-white rounded-xl border border-[#E8E1D5] hover:border-[#C8A84B] transition-colors space-y-1 shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-[#2C1D07] font-serif truncate">
                              {note.title}
                            </h4>
                            <span className="text-[10px] text-[#9CA3AF] font-mono">
                              {note.date}
                            </span>
                          </div>
                          <div className="text-[10.5px] font-bold text-[#855B09] font-serif">
                            {note.verseRef}
                          </div>
                          <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed font-serif">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── HIGHLIGHTS PANEL ── */}
              {activeStudyTool === 'highlights' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-black text-[#9C9488] uppercase tracking-wider">
                      HIGHLIGHTS
                    </span>
                  </div>

                  {bibleHighlights.length === 0 ? (
                    <div className="bg-[#FAF8F5] border border-[#ECE5D8] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
                      <Highlighter className="w-10 h-10 text-[#C5B396]" />
                      <h4 className="text-sm font-serif font-bold text-[#3D3328]">
                        No highlights yet
                      </h4>
                      <p className="text-xs text-[#8C8275] max-w-[180px] leading-relaxed font-serif">
                        Click on verses to highlight them.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {bibleHighlights.map((hl) => (
                        <div
                          key={hl.id}
                          onClick={() => {
                            setSelectedBookId(hl.bookId);
                            setSelectedChapter(hl.chapter);
                            setActiveVerseNum(hl.verseNum);
                          }}
                          className="p-2.5 bg-white rounded-xl border border-[#E8E1D5] hover:border-[#C8A84B] transition-colors cursor-pointer space-y-1 shadow-2xs group relative"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400" />
                              <span className="text-xs font-bold text-[#2C1D07] font-serif">
                                {hl.bookName} {hl.chapter}:{hl.verseNum}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBibleHighlights((prev) => prev.filter((item) => item.id !== hl.id));
                              }}
                              className="text-[#9CA3AF] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove highlight"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#6B7280] line-clamp-2 italic font-serif">
                            "{hl.textSnippet}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── BOOKMARKS PANEL ── */}
              {activeStudyTool === 'bookmarks' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-black text-[#9C9488] uppercase tracking-wider">
                      BOOKMARKS
                    </span>
                  </div>

                  {bibleBookmarks.length === 0 ? (
                    <div className="bg-[#FAF8F5] border border-[#ECE5D8] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
                      <Bookmark className="w-10 h-10 text-[#C5B396]" />
                      <h4 className="text-sm font-serif font-bold text-[#3D3328]">
                        No bookmarks yet
                      </h4>
                      <p className="text-xs text-[#8C8275] max-w-[180px] leading-relaxed font-serif">
                        Bookmark your favorite chapters and verses.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {bibleBookmarks.map((bm) => (
                        <div
                          key={bm.id}
                          onClick={() => {
                            setSelectedBookId(bm.bookId);
                            setSelectedChapter(bm.chapter);
                          }}
                          className="p-2.5 bg-white rounded-xl border border-[#E8E1D5] hover:border-[#C8A84B] transition-colors cursor-pointer space-y-1 shadow-2xs"
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
                  )}
                </div>
              )}

              {/* ── HISTORY PANEL ── */}
              {activeStudyTool === 'history' && (
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-black text-[#9C9488] uppercase tracking-wider block px-1">
                    READING HISTORY
                  </span>
                  <div className="space-y-2">
                    {[
                      { ref: `${currentBook.nameEnglish} ${selectedChapter}`, time: 'Just now' },
                      { ref: 'Genesis 1', time: 'Yesterday' },
                      { ref: 'Psalm 23', time: '2 days ago' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#E8E1D5] shadow-2xs">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#855B09]" />
                          <span className="text-xs font-bold text-[#2C1D07] font-serif">{item.ref}</span>
                        </div>
                        <span className="text-[10px] text-[#9CA3AF] font-mono">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </aside>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: PRAYER BOOKS (መጻሕፍተ ጸሎት) — CLEAN CARDLESS LIST DESIGN
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'prayers' && (
        <div className="space-y-8 animate-fadeIn">
          {/* ─────────────────────────────────────────────────────────────
              VIEW A: PRAYER BOOKS DIRECTORY LIST (MATCHING REFERENCE DESIGN)
          ───────────────────────────────────────────────────────────── */}
          {prayerViewMode === 'grid' && (
            <div className="space-y-6 animate-fadeIn max-w-5xl">
              
              {/* Header Title & Subtitle */}
              <div className="space-y-3 pb-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A2C1C] font-serif tracking-tight">
                  {language === 'en' ? 'Books of Prayer & Horologion' : 'መጻሕፍት ጸሎት ሰዓታት መጽሐፍት'}
                </h1>
                <div className="w-16 h-1 bg-[#855B09] rounded-full"></div>
                <p className="text-sm sm:text-[15px] text-[#4A4033] font-serif leading-relaxed max-w-3xl">
                  {language === 'en'
                    ? 'Daily praises of St. Mary, canonical hours of the saints, and sacred liturgical prayer collections of the Ethiopian Orthodox Church.'
                    : 'በየቀኑ የማርያም መዝሙሮች፣ የቅዱሳን ሰዓታት እና ሌሎች መንፈሳዊ መጻሕፍትን በቤተክርስቲያን ስብስብ።'}
                </p>
              </div>

              {/* Clean Underline Category Tabs Filter */}
              <div className="flex items-center gap-6 sm:gap-8 border-b border-[#E6DFD1] overflow-x-auto custom-scrollbar pt-2 text-sm font-serif">
                {[
                  { id: 'all', labelAm: 'ሁሉም', labelEn: 'All' },
                  { id: 'wudase', labelAm: 'ውዳሴ ማርያም', labelEn: 'Wudase Maryam' },
                  { id: 'daily', labelAm: 'የዕለት ጸሎታት', labelEn: 'Daily Horologion' },
                  { id: 'festal', labelAm: 'የበዓላት ጸሎታት', labelEn: 'Festal Salutations' },
                  { id: 'other', labelAm: 'ሌሎች መጻሕፍተ ጸሎት', labelEn: 'Other Sacred Books' },
                ].map((tab) => {
                  const isActive = prayerCategoryTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setPrayerCategoryTab(tab.id)}
                      className={`pb-3 text-sm font-bold whitespace-nowrap transition-all cursor-pointer relative ${
                        isActive
                          ? 'text-[#1A2C1C]'
                          : 'text-[#8C8275] hover:text-[#1A1208]'
                      }`}
                    >
                      <span>{language === 'en' ? tab.labelEn : tab.labelAm}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activePrayerUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1A2C1C] rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Clean Flat List Rows (No Cards) */}
              <div className="divide-y divide-[#EFEAE1]">
                {PRAYER_BOOKS.filter((pb) => {
                  if (prayerCategoryTab === 'all') return true;
                  if (prayerCategoryTab === 'wudase') return pb.id === 'wudase-mariam';
                  if (prayerCategoryTab === 'daily') return pb.id === 'seytat' || pb.id === 'ye-selot-metsihaf';
                  if (prayerCategoryTab === 'festal') return pb.id === 'selam';
                  if (prayerCategoryTab === 'other') return pb.id === 'arganona-wudase' || pb.id === 'metshaf-tselot' || pb.id === 'tsome-deggwa';
                  return true;
                }).map((pBook) => {
                  // Select icon
                  let BookIcon = Heart;
                  if (pBook.id === 'seytat' || pBook.id === 'ye-selot-metsihaf') BookIcon = Shield;
                  else if (pBook.id === 'arganona-wudase' || pBook.id === 'tsome-deggwa') BookIcon = Layers;
                  else if (pBook.id === 'metshaf-tselot') BookIcon = BookOpen;
                  else if (pBook.id === 'selam') BookIcon = Sun;

                  return (
                    <div
                      key={pBook.id}
                      onClick={() => openPrayerBook(pBook.id, 0)}
                      className="py-4 sm:py-5 px-2 hover:bg-[#FAF8F3]/80 transition-colors cursor-pointer flex items-center justify-between gap-4 group"
                    >
                      {/* Left: Round icon + Title + Subtitle */}
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FAF4E6] border border-[#E8DFC8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-[#855B09]">
                          <BookIcon className="w-5 h-5" />
                        </div>

                        <div className="space-y-0.5 min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-[#1A1208] font-serif group-hover:text-[#855B09] transition-colors truncate">
                            {language === 'en' ? pBook.titleEnglish : pBook.titleAmharic}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-[#786D5C] font-serif truncate max-w-xl">
                            {language === 'en' ? pBook.descriptionEn : pBook.descriptionAm}
                          </p>
                        </div>
                      </div>

                      {/* Right: Reading time + Arrow */}
                      <div className="flex items-center gap-5 sm:gap-8 shrink-0">
                        <span className="text-xs sm:text-[13px] text-[#8C8275] font-serif whitespace-nowrap hidden sm:inline">
                          {language === 'en'
                            ? `Reading Time: ${pBook.audioDuration || '15:00'}`
                            : `የማንበብ ጊዜ: ${pBook.audioDuration || '15:00'}`}
                        </span>
                        <div className="text-[#1A2C1C] group-hover:text-[#855B09] group-hover:translate-x-1.5 transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW B: PRAYER BOOK READER WORKSPACE (4-LEVEL HIERARCHY TREE)
          ───────────────────────────────────────────────────────────── */}
          {prayerViewMode === 'reader' && (
            <div className="w-full bg-[#FAF8F5] rounded-3xl border border-[#ECE5D8] overflow-hidden animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr]" style={{ height: '860px', overflow: 'hidden' }}>
                
                {/* ═══════════════════════════════════════════════════════════════
                    1. LEFT SIDEBAR: COMPLETE 4-LEVEL PRAYER LIBRARY TREE
                ═══════════════════════════════════════════════════════════════ */}
                <aside className="flex flex-col bg-[#FAF8F5] border-r border-[#EFEBE4] p-4.5 space-y-4 overflow-y-auto custom-scrollbar overscroll-contain h-full select-none justify-between">
                  <div className="space-y-4">
                    {/* Back to Library Link */}
                    <button
                      onClick={() => setPrayerViewMode('grid')}
                      className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#855B09] hover:text-[#2C1D07] transition-colors py-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{language === 'en' ? 'Back to Prayer Library' : 'ወደ ጸሎት መጻሕፍት'}</span>
                    </button>

                    {/* Active Prayer Collection Title Badge */}
                    <div className="bg-[#FAF0D9] text-[#855B09] font-bold p-3 rounded-xl border border-[#EEDBBA] flex items-center gap-2.5 text-xs font-serif shadow-2xs">
                      <BookOpen className="w-4 h-4 text-[#855B09]" />
                      <span className="truncate">{language === 'en' ? currentPrayerBook.titleEnglish : currentPrayerBook.titleAmharic}</span>
                    </div>

                    {/* ── 4-LEVEL HIERARCHICAL ACCORDION TREE ── */}
                    <div className="space-y-2.5 pt-1">
                      
                      {/* ──────────────── COLLECTION 1: ውዳሴ ማርያም ──────────────── */}
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            if (selectedPrayerBookId !== 'wudase-mariam') {
                              openPrayerBook('wudase-mariam', 0);
                            }
                            setIsPrayerAccordionOpen(!isPrayerAccordionOpen);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                            selectedPrayerBookId === 'wudase-mariam'
                              ? 'bg-[#FAF0D9]/70 font-bold text-[#1A1208]'
                              : 'hover:bg-[#F2ECE0]/60 text-[#4A4033]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Heart className="w-3.5 h-3.5 text-[#855B09]" />
                            <span className="text-xs font-bold font-serif">
                              {language === 'en' ? 'ውዳሴ ማርያም (Wudase Maryam)' : 'ውዳሴ ማርያም'}
                            </span>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 text-[#8C8275] transition-transform duration-200 ${isPrayerAccordionOpen && selectedPrayerBookId === 'wudase-mariam' ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Wudase Maryam Sub-Sections */}
                        {isPrayerAccordionOpen && selectedPrayerBookId === 'wudase-mariam' && (
                          <div className="pl-3 space-y-1 pt-1 border-l-2 border-[#E8DFC8] ml-3 animate-fadeIn">
                            
                            {/* Sub-Group: የዕለቱ ውዳሴ (7 Days) */}
                            <div className="space-y-1">
                              <span className="text-[11px] font-bold text-[#8C8275] uppercase tracking-wider block px-2.5 py-1">
                                {language === 'en' ? 'Daily Praises (7 Days)' : 'የዕለቱ ውዳሴ'}
                              </span>
                              
                              {[
                                { idx: 0, am: 'ሰኞ', en: 'Monday' },
                                { idx: 1, am: 'ማክሰኞ', en: 'Tuesday' },
                                { idx: 2, am: 'ረቡዕ', en: 'Wednesday' },
                                { idx: 3, am: 'ሐሙስ', en: 'Thursday' },
                                { idx: 4, am: 'ዓርብ', en: 'Friday' },
                                { idx: 5, am: 'ቅዳሜ', en: 'Saturday' },
                                { idx: 6, am: 'እሁድ', en: 'Sunday' },
                              ].map((day) => {
                                const isSelected = selectedSectionIdx === day.idx;
                                return (
                                  <button
                                    key={day.idx}
                                    onClick={() => setSelectedSectionIdx(day.idx)}
                                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#FAF0D9] text-[#855B09] font-black shadow-2xs'
                                        : 'text-[#6B5E4F] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60'
                                    }`}
                                  >
                                    <span>{language === 'en' ? day.en : day.am}</span>
                                    <ChevronRight className={`w-3 h-3 ${isSelected ? 'text-[#855B09]' : 'text-[#C5BCAD]'}`} />
                                  </button>
                                );
                              })}
                            </div>

                            {/* Marian Companion Prayers */}
                            <div className="pt-2 space-y-1">
                              {[
                                { idx: 7, am: 'የዘወትር ጸሎት', en: 'Yezewotir Tselot' },
                                { idx: 8, am: 'አንቀጸ ብርሃን', en: 'Anqetse Berhan' },
                                { idx: 9, am: 'የውዳሴዋ መልእክት', en: 'Yewudasewa Mele\'kt' },
                                { idx: 10, am: 'መልክአ ማርያም', en: 'Melkea Maryam' },
                                { idx: 11, am: 'መልክአ ኢየሱስ', en: 'Melkea Iyesus' },
                              ].map((item) => {
                                const isSelected = selectedSectionIdx === item.idx;
                                return (
                                  <button
                                    key={item.idx}
                                    onClick={() => setSelectedSectionIdx(item.idx)}
                                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#FAF0D9] text-[#855B09] font-black shadow-2xs'
                                        : 'text-[#4A4033] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60'
                                    }`}
                                  >
                                    <span>{language === 'en' ? item.en : item.am}</span>
                                    <ChevronRight className={`w-3 h-3 ${isSelected ? 'text-[#855B09]' : 'text-[#C5BCAD]'}`} />
                                  </button>
                                );
                              })}
                            </div>

                          </div>
                        )}
                      </div>

                      {/* ──────────────── COLLECTION 2: የዕለት ጸሎታት ──────────────── */}
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            if (selectedPrayerBookId !== 'seytat') {
                              openPrayerBook('seytat', 0);
                            }
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                            selectedPrayerBookId === 'seytat'
                              ? 'bg-[#FAF0D9]/70 font-bold text-[#1A1208]'
                              : 'hover:bg-[#F2ECE0]/60 text-[#4A4033]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Shield className="w-3.5 h-3.5 text-[#855B09]" />
                            <span className="text-xs font-bold font-serif">
                              {language === 'en' ? 'የዕለት ጸሎታት (Daily Horologion)' : 'የዕለት ጸሎታት'}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8C8275]" />
                        </button>

                        {/* Seytat Sub-Sections */}
                        {selectedPrayerBookId === 'seytat' && (
                          <div className="pl-3 space-y-1 pt-1 border-l-2 border-[#E8DFC8] ml-3 animate-fadeIn">
                            {[
                              { idx: 0, am: 'ጸሎተ ነግህ (Morning)', en: 'Morning Matins' },
                              { idx: 1, am: 'ጸሎተ ሠርክ (Evening)', en: 'Evening Vespers' },
                              { idx: 2, am: 'ጸሎተ ሌሊት (Night Vigil)', en: 'Night Vigil' },
                            ].map((sec) => {
                              const isSelected = selectedSectionIdx === sec.idx;
                              return (
                                <button
                                  key={sec.idx}
                                  onClick={() => setSelectedSectionIdx(sec.idx)}
                                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#FAF0D9] text-[#855B09] font-black shadow-2xs'
                                      : 'text-[#6B5E4F] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60'
                                  }`}
                                >
                                  <span>{language === 'en' ? sec.en : sec.am}</span>
                                  <ChevronRight className={`w-3 h-3 ${isSelected ? 'text-[#855B09]' : 'text-[#C5BCAD]'}`} />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* ──────────────── COLLECTION 3: የበዓላት ጸሎታት ──────────────── */}
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            if (selectedPrayerBookId !== 'selam') {
                              openPrayerBook('selam', 0);
                            }
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                            selectedPrayerBookId === 'selam'
                              ? 'bg-[#FAF0D9]/70 font-bold text-[#1A1208]'
                              : 'hover:bg-[#F2ECE0]/60 text-[#4A4033]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Sun className="w-3.5 h-3.5 text-[#855B09]" />
                            <span className="text-xs font-bold font-serif">
                              {language === 'en' ? 'የበዓላት ጸሎታት (Festal Salutations)' : 'የበዓላት ጸሎታት'}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8C8275]" />
                        </button>

                        {/* Selam Sub-Sections */}
                        {selectedPrayerBookId === 'selam' && (
                          <div className="pl-3 space-y-1 pt-1 border-l-2 border-[#E8DFC8] ml-3 animate-fadeIn">
                            {[
                              { idx: 0, am: 'ሰላመ ማርያም ዘፍልሰታ', en: 'Salutation of Filseta' },
                              { idx: 1, am: 'ሰላመ ልደታ', en: 'Salutation of Nativity' },
                              { idx: 2, am: 'ሰላመ አስተርእዮ', en: 'Salutation of Astereyo' },
                            ].map((sec) => {
                              const isSelected = selectedSectionIdx === sec.idx;
                              return (
                                <button
                                  key={sec.idx}
                                  onClick={() => setSelectedSectionIdx(sec.idx)}
                                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#FAF0D9] text-[#855B09] font-black shadow-2xs'
                                      : 'text-[#6B5E4F] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60'
                                  }`}
                                >
                                  <span>{language === 'en' ? sec.en : sec.am}</span>
                                  <ChevronRight className={`w-3 h-3 ${isSelected ? 'text-[#855B09]' : 'text-[#C5BCAD]'}`} />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* ──────────────── COLLECTION 4: ሌሎች መጻሕፍተ ጸሎት ──────────────── */}
                      <div className="space-y-1">
                        <div className="px-2.5 py-1.5">
                          <span className="text-[11px] font-bold text-[#8C8275] uppercase tracking-wider block">
                            {language === 'en' ? 'Other Sacred Books' : 'ሌሎች መጻሕፍተ ጸሎት'}
                          </span>
                        </div>

                        {[
                          { id: 'arganona-wudase', am: 'አርጋኖነ ውዳሴ', en: 'Arganona Wudase' },
                          { id: 'metshaf-tselot', am: 'መጽሐፈ ጸሎት', en: 'Metshaf Tselot' },
                          { id: 'tsome-deggwa', am: 'መጽሐፈ ጾም', en: 'Tsome Deggwa' },
                        ].map((b) => {
                          const isCurrent = selectedPrayerBookId === b.id;
                          return (
                            <button
                              key={b.id}
                              onClick={() => openPrayerBook(b.id, 0)}
                              className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-serif transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-[#FAF0D9] text-[#855B09] font-black shadow-2xs'
                                  : 'text-[#4A4033] hover:text-[#1A1208] hover:bg-[#F2ECE0]/60'
                              }`}
                            >
                              <span>{language === 'en' ? b.en : b.am}</span>
                              <ChevronRight className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#855B09]' : 'text-[#A3998C]'}`} />
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  </div>

                  {/* Bottom Settings Link */}
                  <div className="pt-3 border-t border-[#E8E1D5] flex items-center gap-2 text-xs font-serif font-bold text-[#8C8275] hover:text-[#2C1D07] cursor-pointer transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>{language === 'en' ? 'Settings' : 'ቅንብሮች'}</span>
                  </div>
                </aside>

                {/* ═══════════════════════════════════════════════════════════════
                    2. CENTER MAIN READING PANE (Cardless Verses & Multi-Tier Breadcrumbs)
                ═══════════════════════════════════════════════════════════════ */}
                <main className="flex-1 bg-white p-6 sm:p-10 md:p-12 overflow-y-auto custom-scrollbar overscroll-contain flex flex-col justify-between h-full">
                  <div className="space-y-6 max-w-3xl">
                    
                    {/* Top Breadcrumb & Control Action Buttons */}
                    <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#F2ECE0]">
                      
                      {/* Multi-Tier Breadcrumbs: Prayer Library → Collection → Book/Section → Reading */}
                      <div className="flex items-center gap-1.5 text-xs font-serif text-[#8C8275] truncate">
                        <span className="hover:text-[#1A1208] cursor-pointer" onClick={() => setPrayerViewMode('grid')}>
                          {language === 'en' ? 'Prayer Library' : 'የጸሎት መጻሕፍት'}
                        </span>
                        <ChevronRight className="w-3 h-3 text-[#C5BCAD] shrink-0" />
                        <span className="text-[#855B09] font-bold">
                          {selectedPrayerBookId === 'wudase-mariam'
                            ? 'ውዳሴ ማርያም'
                            : selectedPrayerBookId === 'seytat'
                            ? 'የዕለት ጸሎታት'
                            : selectedPrayerBookId === 'selam'
                            ? 'የበዓላት ጸሎታት'
                            : currentPrayerBook.titleAmharic}
                        </span>
                        {selectedPrayerBookId === 'wudase-mariam' && selectedSectionIdx <= 6 && (
                          <>
                            <ChevronRight className="w-3 h-3 text-[#C5BCAD] shrink-0" />
                            <span className="text-[#6B5E4F]">{language === 'en' ? 'Daily Praises' : 'የዕለቱ ውዳሴ'}</span>
                          </>
                        )}
                        <ChevronRight className="w-3 h-3 text-[#C5BCAD] shrink-0" />
                        <span className="text-[#855B09] font-black">{currentPrayerSection?.titleAmharic || ''}</span>
                      </div>

                      {/* Header Control Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Audio / Recitation */}
                        <button
                          onClick={() => {
                            if (currentPrayerBook.audioUrl) {
                              setIsPlayingAudio(!isPlayingAudio);
                            }
                          }}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isPlayingAudio
                              ? 'bg-[#855B09] text-white border-[#855B09] shadow-2xs'
                              : 'bg-[#FAF8F5] text-[#4A4033] border-[#E8E1D5] hover:bg-[#F2ECE0]'
                          }`}
                          title="Audio Recitation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        {/* Font size / typography */}
                        <button
                          onClick={() => {
                            setPrayerFontSize(
                              prayerFontSize === 'normal' ? 'large' : prayerFontSize === 'large' ? 'elderly' : 'normal'
                            );
                          }}
                          className="px-2.5 py-1.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-[#F2ECE0] text-xs font-serif font-black text-[#4A4033] cursor-pointer transition-all"
                          title="Font Size (Aa)"
                        >
                          Aa
                        </button>

                        {/* Theme Toggle */}
                        <button
                          onClick={() => {
                            setPrayerTheme(prayerTheme === 'parchment' ? 'dark' : 'parchment');
                          }}
                          className="p-2 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-[#F2ECE0] text-[#4A4033] cursor-pointer transition-all"
                          title="Toggle Light/Dark Theme"
                        >
                          <Sun className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Section Title & Subtitle */}
                    <div className="space-y-1 pt-2">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1208] font-serif">
                        {currentPrayerSection?.titleAmharic || 'ውዳሴ ማርያም'}
                      </h1>
                      <p className="text-xs sm:text-sm font-serif italic text-[#8C8275]">
                        {selectedPrayerBookId === 'wudase-mariam' && selectedSectionIdx <= 6
                          ? (language === 'en' ? 'Daily Praise of St. Mary' : 'የዘወትር ውዳሴ')
                          : currentPrayerSection?.titleEnglish || ''}
                      </p>
                    </div>

                    {/* Verses Plain Numbered List */}
                    <div className="space-y-5 pt-4">
                      {currentPrayerSection?.verses.map((v) => (
                        <div key={v.number} className="flex items-start gap-4 sm:gap-6 group">
                          {/* Verse Number Column */}
                          <span className="text-sm sm:text-base font-serif font-bold text-[#855B09] pt-0.5 w-5 shrink-0 text-right select-none opacity-90">
                            {v.number}
                          </span>

                          {/* Verse Text Content */}
                          <div className="flex-1 space-y-1">
                            <p
                              className={`font-serif text-[#1A1208] leading-[1.85] ${
                                prayerFontSize === 'elderly'
                                  ? 'text-xl sm:text-2xl font-bold'
                                  : prayerFontSize === 'large'
                                  ? 'text-lg sm:text-xl'
                                  : 'text-[15.5px] sm:text-base font-medium'
                              }`}
                            >
                              {v.amharic}
                            </p>
                            {language !== 'am' && v.english && (
                              <p className="text-xs sm:text-sm text-[#8C8275] font-serif leading-relaxed italic">
                                "{v.english}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Floating Bottom Section Switcher Pill */}
                  <div className="pt-10 pb-2 flex items-center justify-center">
                    <div className="inline-flex items-center gap-3 bg-white border border-[#E8E1D5] px-5 py-2 rounded-full text-xs font-bold text-[#4A4033] shadow-2xs">
                      <button
                        onClick={() => setSelectedSectionIdx(Math.max(0, selectedSectionIdx - 1))}
                        disabled={selectedSectionIdx === 0}
                        className="hover:text-[#B8860B] disabled:opacity-30 cursor-pointer p-0.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="font-serif font-bold flex items-center gap-1.5 cursor-pointer px-1">
                        <span>{currentPrayerSection?.titleAmharic || ''}</span>
                        <ChevronDown className="w-3 h-3 text-[#8C8275]" />
                      </span>

                      <button
                        onClick={() =>
                          setSelectedSectionIdx(
                            Math.min(currentPrayerBook.sections.length - 1, selectedSectionIdx + 1)
                          )
                        }
                        disabled={selectedSectionIdx === currentPrayerBook.sections.length - 1}
                        className="hover:text-[#B8860B] disabled:opacity-30 cursor-pointer p-0.5"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </main>

              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: LITURGICAL TEXTS & PATRISTICS (ሥርዓተ ቅዳሴ)
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'liturgy' && (
        <div className="animate-fadeIn">
          {/* Download / Print Toast Notification */}
          {downloadToast && (
            <div className="fixed bottom-8 right-8 z-50 bg-[#1A2C1C] text-[#C8A84B] border border-[#C8A84B] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-slideUp">
              <Printer className="w-4 h-4 animate-pulse" />
              <span>{language === 'en' ? 'Preparing printable Liturgical text...' : 'የቅዳሴ ጽሑፉን በማዘጋጀት ላይ...'}</span>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW A: LITURGICAL SERVICE DIRECTORY & SACRED MANUSCRIPT HUB
          ───────────────────────────────────────────────────────────── */}
          {liturgyViewMode === 'categories' && (
            <LiturgicalTextsView
              onOpenItem={(catId, itemId) => openLiturgyItem(catId, itemId)}
              onOpenPrayerBook={(bookId, secIdx) => openPrayerBook(bookId, secIdx)}
              onOpenBible={(bookId, chap) => openBookInReader(bookId, chap)}
              onSelectCategory={(catId) => setSelectedLiturgyCategoryId(catId)}
            />
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW B: DEBTERA & CANTOR LITURGICAL TEXT DISPLAY
              (Large Ge'ez, Dialogue Attributions, Audio & PDF Export)
          ───────────────────────────────────────────────────────────── */}
          {liturgyViewMode === 'reader' && (
            <div className="space-y-6 animate-fadeIn" style={{ padding: '24px clamp(16px, 4vw, 56px) 64px' }}>
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
          SECTION 5: GE'EZ LEARNING PORTAL (ትምህርተ ግዕዝ) — Card-Free Flat
      ═══════════════════════════════════════════════════════════════ */}
      {activeSection === 'geez' && (
        <GeezLearningView
          userXp={userXp}
          onAddXp={(amount) => setUserXp((prev) => prev + amount)}
          playAudioTone={playGeezAudioTone}
        />
      )}
    </div>
  );
};
