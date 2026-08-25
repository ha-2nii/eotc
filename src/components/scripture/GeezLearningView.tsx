import React, { useState } from 'react';
import {
  Volume2,
  Trophy,
  Sparkles,
  Flame,
  Check,
  Lock,
  ArrowRight,
  Headphones,
  Edit3,
  BookOpen,
  HelpCircle,
  Award,
  Users,
  Star,
  Sprout,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../layout/LanguageContext';
import {
  FIDEL_ALPHABET_DATA,
  SACRED_VOCABULARY,
  PRACTICE_QUIZZES,
} from '../../data/mockGeezLearning';
import type { FidelOrder } from '../../data/mockGeezLearning';

interface GeezLearningViewProps {
  userXp: number;
  onAddXp: (amount: number) => void;
  playAudioTone: (text: string) => void;
}

type LearningLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced';

interface LearningPathStep {
  num: string;
  titleEn: string;
  titleAm: string;
  descEn: string;
  descAm: string;
  progress: string;
  status: 'completed' | 'in-progress' | 'locked';
}

const LEARNING_PATH: LearningPathStep[] = [
  {
    num: '01',
    titleEn: 'Fidel Alphabet',
    titleAm: 'ፊደል',
    descEn: 'Learn the 7 orders and 231 characters',
    descAm: '፯ቱን የፊደል ክፍሎችና ፪፻፴፩ ፊደላትን ይማሩ',
    progress: '18/18',
    status: 'completed',
  },
  {
    num: '02',
    titleEn: 'Reading & Pronunciation',
    titleAm: 'ንባብ',
    descEn: 'Combine letters and pronounce correctly',
    descAm: 'ፊደላትን አቀናጅቶ በትክክል ማንበብ',
    progress: '12/18',
    status: 'in-progress',
  },
  {
    num: '03',
    titleEn: 'Vocabulary',
    titleAm: 'ቃላት',
    descEn: 'Build your sacred Ge’ez vocabulary',
    descAm: 'መሠረታዊ የግዕዝ ቃላትን ማወቅ',
    progress: '8/18',
    status: 'in-progress',
  },
  {
    num: '04',
    titleEn: 'Grammar',
    titleAm: 'ሰዋስው',
    descEn: 'Understand the language structure',
    descAm: 'የግዕዝ ሰዋስውና የግሥ እርባታ',
    progress: '0/15',
    status: 'locked',
  },
  {
    num: '05',
    titleEn: 'Reading Texts',
    titleAm: 'ንባበ ጽሑፍ',
    descEn: 'Read prayers, psalms and liturgical texts',
    descAm: 'ጸሎታት፣ መዝሙራትና የቅዳሴ ንባባት',
    progress: '0/20',
    status: 'locked',
  },
];

export const GeezLearningView: React.FC<GeezLearningViewProps> = ({
  userXp,
  onAddXp,
  playAudioTone,
}) => {
  const { language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel>('beginner');
  const [selectedFamilyIndex, setSelectedFamilyIndex] = useState<number>(0);
  const [selectedOrder, setSelectedOrder] = useState<FidelOrder | null>(null);
  const [activeModal, setActiveModal] = useState<'practice' | 'examples' | 'quiz' | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [practiceInput, setPracticeInput] = useState<string>('');

  const currentFamily = FIDEL_ALPHABET_DATA[selectedFamilyIndex] || FIDEL_ALPHABET_DATA[0];

  const handleOrderClick = (ord: FidelOrder) => {
    setSelectedOrder(ord);
    playAudioTone(ord.character);
  };

  const handleEarnXp = () => {
    onAddXp(50);
  };

  const handleQuizAnswer = (optIndex: number, correctIndex: number) => {
    if (quizAnswered) return;
    setQuizSelectedOption(optIndex);
    setQuizAnswered(true);
    if (optIndex === correctIndex) {
      onAddXp(25);
    }
  };

  return (
    <div className="animate-fadeIn" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ═══════════════════════════════════════════════════════════
          HERO & PROGRESS SECTION — Flat, seamless, card-free
      ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          background: '#FAF7F0',
          borderBottom: '1px solid #E6DFD1',
          padding: '24px clamp(16px, 3.5vw, 48px) 0',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Hero (7 cols) ── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tag Badge */}
            <div
              className="inline-flex items-center gap-2"
              style={{
                color: '#855B09',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ fontSize: 13 }}>◎</span>
              <span>
                {language === 'en'
                  ? 'ንባበ ትምህርት መድረክ • GEEZ LEARNING PORTAL'
                  : 'ትምህርተ ግዕዝ ወሰዋስው • የግዕዝ ትምህርት መድረክ'}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 900,
                color: '#1E1B18',
                lineHeight: 1.15,
                fontFamily: 'Georgia, "Times New Roman", serif',
                margin: 0,
              }}
            >
              {language === 'en'
                ? 'Master the Sacred Ge’ez Language'
                : 'የቅዱስ ቋንቋችን የግዕዝ ትምህርት'}
            </h1>

            {/* Subtitle Description */}
            <p
              style={{
                fontSize: 13,
                color: '#5A4F41',
                lineHeight: 1.65,
                maxWidth: 580,
                margin: 0,
              }}
            >
              {language === 'en'
                ? 'Explore the ancient liturgical tongue of the Ethiopian Orthodox Church: from the 7-order Fidel alphabet and sacred vocabulary to liturgical chanting and advanced seminary grammar.'
                : 'ስምንቱን የፊደል ቤቶች፣ ሰባቱን ድምፆች፣ ቅዱሳት ቃላትንና የሰዋስው ሥርዓትን በድምፅና በልምምድ ይማሩ።'}
            </p>

            {/* Level / Track Switcher Tabs */}
            <div className="flex items-center gap-6 pt-3 overflow-x-auto">
              {[
                { id: 'beginner' as LearningLevel, labelEn: 'Beginner', labelAm: 'ጀማሪ', icon: Users },
                { id: 'elementary' as LearningLevel, labelEn: 'Elementary', labelAm: 'መካከለኛ', icon: Award },
                { id: 'intermediate' as LearningLevel, labelEn: 'Intermediate', labelAm: 'ማዕከላዊ', icon: Sprout },
                { id: 'advanced' as LearningLevel, labelEn: 'Advanced', labelAm: 'ከፍተኛ', icon: Star },
              ].map((lvl) => {
                const Icon = lvl.icon;
                const isActive = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      paddingBottom: 10,
                      background: 'none',
                      border: 'none',
                      borderBottom: isActive ? '2.5px solid #855B09' : '2.5px solid transparent',
                      cursor: 'pointer',
                      color: isActive ? '#855B09' : '#8C7E6C',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: 12.5,
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Icon style={{ width: 14, height: 14, color: isActive ? '#855B09' : '#8C7E6C' }} />
                    <span>{lvl.labelAm}</span>
                    <span style={{ fontSize: 11, opacity: 0.85 }}>{lvl.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right Progress Tracker (5 cols) ── */}
          <div className="lg:col-span-5 space-y-3 pt-1">
            {/* Header with XP */}
            <div className="flex items-center justify-between">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#524636',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Award style={{ width: 14, height: 14, color: '#855B09' }} />
                <span>YOUR PROGRESS</span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#855B09',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Sparkles style={{ width: 13, height: 13, color: '#D97706' }} />
                <span>{userXp} XP</span>
              </div>
            </div>

            {/* Level Title & Subtitle */}
            <div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#1E1B18',
                  fontFamily: 'Georgia, serif',
                  margin: 0,
                }}
              >
                ደቀ መዝሙር (Disciple Level 2)
              </h3>
              <p style={{ fontSize: 11, color: '#7A6E5E', margin: '2px 0 0' }}>
                Overall Curriculum Mastery: 68%
              </p>
            </div>

            {/* Main Progress Bar */}
            <div
              style={{
                width: '100%',
                height: 6,
                background: '#E6DFD1',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '68%',
                  height: '100%',
                  background: '#1A2C1C',
                  borderRadius: 3,
                  transition: 'width 0.5s',
                }}
              />
            </div>

            {/* Metric Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 10.5,
                color: '#7A6E5E',
                fontWeight: 600,
              }}
            >
              <span>18 of 26 lessons complete</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#C2410C' }}>
                <Flame style={{ width: 12, height: 12 }} />
                <span>5-Day Streak</span>
              </span>
            </div>

            {/* Mini Progress Bars List */}
            <div className="space-y-1.5 pt-1 text-[11px]">
              {[
                { letter: 'A', name: 'ፊደል (Fidel Alphabet)', pct: '85%' },
                { letter: '📖', name: 'ቃላት (Sacred Vocabulary)', pct: '60%' },
                { letter: '📜', name: 'ንባበ ቅዱሳት (Liturgical Reading)', pct: '40%' },
                { letter: '🌿', name: 'ሰዋስው (Advanced Grammar)', pct: '20%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span style={{ width: 14, fontSize: 10, color: '#855B09', fontWeight: 800 }}>
                    {item.letter}
                  </span>
                  <span style={{ flex: 1, color: '#3D3020', fontWeight: 600 }}>
                    {item.name}
                  </span>
                  <div
                    style={{
                      width: 90,
                      height: 4,
                      background: '#E6DFD1',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: item.pct,
                        height: '100%',
                        background: '#1A2C1C',
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 10, color: '#7A6E5E', width: 28, textAlign: 'right', fontWeight: 700 }}>
                    {item.pct}
                  </span>
                </div>
              ))}
            </div>

            {/* Earn XP Button */}
            <div className="pt-2 pb-5">
              <button
                onClick={handleEarnXp}
                style={{
                  width: '100%',
                  background: '#1A2C1C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '9px 16px',
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'background 0.2s',
                  boxShadow: '0 2px 6px rgba(26,44,28,0.2)',
                }}
              >
                <Trophy style={{ width: 13, height: 13, color: '#C8A84B' }} />
                <span>Earn Daily Study XP (+50 XP)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LOWER CONTENT SECTION — 2 Columns (Learning Path & Fidel Grid)
      ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '290px 1fr',
          gap: 24,
          padding: '24px clamp(16px, 3.5vw, 48px) 48px',
          background: '#FAF7F0',
          alignItems: 'start',
        }}
        className="max-lg:flex max-lg:flex-col"
      >
        {/* ── LEFT COLUMN: YOUR LEARNING PATH (Timeline Stepper) ── */}
        <div className="space-y-4">
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#2C1D07',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <BookOpen style={{ width: 14, height: 14, color: '#855B09' }} />
            <span>{language === 'en' ? 'YOUR LEARNING PATH' : 'የመማሪያ ቅደም ተከተል'}</span>
          </div>

          {/* Timeline steps */}
          <div className="relative pl-6 space-y-5">
            {/* Vertical connector line */}
            <div
              style={{
                position: 'absolute',
                left: 11,
                top: 8,
                bottom: 8,
                width: 2,
                background: '#DDD5C4',
              }}
            />

            {LEARNING_PATH.map((step) => {
              const isCompleted = step.status === 'completed';
              const isInProgress = step.status === 'in-progress';
              const isLocked = step.status === 'locked';

              return (
                <div key={step.num} className="relative flex items-start gap-3 text-left">
                  {/* Step Node Marker */}
                  <div
                    style={{
                      position: 'absolute',
                      left: -24,
                      top: 1,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: isCompleted ? '#1A2C1C' : isInProgress ? '#fff' : '#EDE8DC',
                      border: isCompleted ? 'none' : isInProgress ? '2px solid #1A2C1C' : '2px solid #D5CBB8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCompleted ? '#fff' : '#1A2C1C',
                      fontSize: 10,
                      fontWeight: 800,
                      zIndex: 2,
                    }}
                  >
                    {isCompleted ? (
                      <Check style={{ width: 12, height: 12, strokeWidth: 3 }} />
                    ) : isInProgress ? (
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A2C1C' }} />
                    ) : (
                      <Lock style={{ width: 9, height: 9, color: '#9E9080' }} />
                    )}
                  </div>

                  {/* Step Content */}
                  <div style={{ flex: 1, minWidth: 0, paddingLeft: 4 }}>
                    <div className="flex items-baseline justify-between gap-1">
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#2C1D07' }}>
                        <span style={{ color: '#855B09', marginRight: 4 }}>{step.num}</span>
                        <span>{language === 'en' ? `${step.titleAm} — ${step.titleEn}` : step.titleAm}</span>
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: isCompleted ? '#059669' : '#7A6E5E',
                          fontFamily: 'monospace',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <span>{step.progress}</span>
                        {isCompleted && <CheckCircle2 style={{ width: 11, height: 11, color: '#059669' }} />}
                      </div>
                    </div>
                    <p style={{ fontSize: 10.5, color: '#7A6E5E', margin: '2px 0 0', lineHeight: 1.4 }}>
                      {language === 'en' ? step.descEn : step.descAm}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom link */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11.5,
              fontWeight: 800,
              color: '#855B09',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              paddingLeft: 4,
              paddingTop: 4,
            }}
          >
            <span>{language === 'en' ? 'View Full Curriculum' : 'ሙሉውን ሥርዓተ ትምህርት እይ'}</span>
            <ArrowRight style={{ width: 12, height: 12 }} />
          </button>
        </div>

        {/* ── RIGHT COLUMN: SEVEN PHONETIC ORDERS (Fidel Matrix & Actions) ── */}
        <div className="space-y-4">
          {/* Header */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#2C1D07',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {language === 'en'
              ? 'THE SEVEN PHONETIC ORDERS OF THE FIDEL (ሳብዓቱ የፊደል ክፍሎች)'
              : 'ሳብዓቱ የፊደል ክፍሎች — ስምንቱ የፊደል ቤቶች'}
          </div>

          {/* Consonant Family Picker Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {FIDEL_ALPHABET_DATA.map((fam, idx) => {
              const isActive = selectedFamilyIndex === idx;
              return (
                <button
                  key={fam.baseConsonant}
                  onClick={() => {
                    setSelectedFamilyIndex(idx);
                    setSelectedOrder(null);
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 11.5,
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s',
                    background: isActive ? '#1A2C1C' : '#EDE8DC',
                    color: isActive ? '#C8A84B' : '#423727',
                  }}
                >
                  <span>{fam.letterNameAmharic}</span>
                  <span style={{ opacity: 0.8, marginLeft: 4 }}>({fam.baseConsonant})</span>
                </button>
              );
            })}
          </div>

          {/* 7 Orders Interactive Grid (7 Clean Columns, No Outer Card) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 8,
            }}
            className="max-sm:grid-cols-4"
          >
            {currentFamily.orders.map((ord) => {
              const isSelected = selectedOrder?.order === ord.order;
              return (
                <div
                  key={ord.order}
                  onClick={() => handleOrderClick(ord)}
                  style={{
                    background: isSelected ? '#FAF3E0' : '#FAF8F3',
                    border: isSelected ? '1.5px solid #855B09' : '1px solid #E6DFD1',
                    borderRadius: 8,
                    padding: '12px 6px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#C8A84B';
                      e.currentTarget.style.background = '#FFFDF7';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#E6DFD1';
                      e.currentTarget.style.background = '#FAF8F3';
                    }
                  }}
                >
                  {/* Big Ge'ez Fidel character */}
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 900,
                      fontFamily: '"Geez Pro", Georgia, serif',
                      color: '#1A2C1C',
                      lineHeight: 1.1,
                      marginBottom: 4,
                    }}
                  >
                    {ord.character}
                  </div>

                  {/* Transliteration */}
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#2C1D07',
                    }}
                  >
                    {ord.transliteration}
                  </div>

                  {/* Vowel sound */}
                  <div
                    style={{
                      fontSize: 9.5,
                      color: '#8C7E6C',
                      marginBottom: 6,
                    }}
                  >
                    Vowel: /{ord.vowelSound}/
                  </div>

                  {/* Speaker audio icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#855B09',
                      paddingTop: 4,
                      borderTop: '1px solid #EDE8DC',
                    }}
                  >
                    <Volume2 style={{ width: 13, height: 13 }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Order Detail Popup Bar */}
          {selectedOrder && (
            <div
              style={{
                background: '#FFFDF7',
                border: '1px solid #C8A84B',
                borderRadius: 8,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 6,
                    background: '#1A2C1C',
                    color: '#C8A84B',
                    fontSize: 20,
                    fontWeight: 900,
                    fontFamily: 'serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedOrder.character}
                </div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: '#2C1D07' }}>
                    {selectedOrder.nameAmharic} • {selectedOrder.nameEnglish} ({selectedOrder.transliteration})
                  </div>
                  <div style={{ fontSize: 10.5, color: '#6B7280' }}>
                    Example Word: <span style={{ fontWeight: 800, color: '#1A2C1C' }}>{selectedOrder.exampleWordGeez}</span> ({selectedOrder.exampleWordMeaning})
                  </div>
                </div>
              </div>
              <button
                onClick={() => playAudioTone(selectedOrder.character)}
                style={{
                  background: '#855B09',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Volume2 style={{ width: 12, height: 12 }} />
                <span>Play Sound</span>
              </button>
            </div>
          )}

          {/* Bottom 4 Action Cards Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 10,
              paddingTop: 8,
            }}
            className="max-sm:grid-cols-2"
          >
            {[
              {
                id: 'listen',
                titleEn: 'Listen',
                titleAm: 'አዳምጥ',
                descEn: 'Hear authentic pronunciation',
                descAm: 'የፊደላቱን ትክክለኛ ድምፅ አዳምጡ',
                icon: Headphones,
                action: () => playAudioTone(currentFamily.orders[0].character),
              },
              {
                id: 'practice',
                titleEn: 'Practice',
                titleAm: 'ልምምድ',
                descEn: 'Write and trace the characters',
                descAm: 'ፊደላትን መጻፍና መለማመድ',
                icon: Edit3,
                action: () => setActiveModal('practice'),
              },
              {
                id: 'examples',
                titleEn: 'Examples',
                titleAm: 'ምሳሌዎች',
                descEn: 'See common words using this order',
                descAm: 'በዚህ ፊደል የሚጀምሩ ቃላትን እይ',
                icon: BookOpen,
                action: () => setActiveModal('examples'),
              },
              {
                id: 'quiz',
                titleEn: 'Quiz',
                titleAm: 'ፈተና',
                descEn: 'Test your knowledge',
                descAm: 'እውቀትዎን በፈተና ይፈትሹ',
                icon: HelpCircle,
                action: () => {
                  setCurrentQuizIndex(0);
                  setQuizSelectedOption(null);
                  setQuizAnswered(false);
                  setActiveModal('quiz');
                },
              },
            ].map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={act.action}
                  style={{
                    background: '#FAF8F3',
                    border: '1px solid #E6DFD1',
                    borderRadius: 8,
                    padding: '10px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C8A84B';
                    e.currentTarget.style.background = '#FFFDF7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E6DFD1';
                    e.currentTarget.style.background = '#FAF8F3';
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon style={{ width: 13, height: 13, color: '#855B09' }} />
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: '#2C1D07' }}>
                      {language === 'en' ? act.titleEn : act.titleAm}
                    </span>
                  </div>
                  <p style={{ fontSize: 9.5, color: '#7A6E5E', margin: 0, lineHeight: 1.35 }}>
                    {language === 'en' ? act.descEn : act.descAm}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Action Modals (Practice, Examples, Quiz) ── */}
      {activeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 16,
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 14,
              border: '1px solid #C8A84B',
              padding: '24px',
              maxWidth: 520,
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Practice Modal */}
            {activeModal === 'practice' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-3">
                  <h3 className="text-base font-bold text-[#2C1D07]">
                    Fidel Tracing & Writing Practice (የፊደል መጻፍ ልምምድ)
                  </h3>
                  <button onClick={() => setActiveModal(null)} className="text-sm font-bold text-[#9E9080]">✕</button>
                </div>
                <div className="text-center py-4 bg-[#FAF8F3] rounded-lg">
                  <span className="text-5xl font-black font-geez text-[#1A2C1C]">
                    {currentFamily.orders[0].character}
                  </span>
                  <p className="text-xs text-[#7A6E5E] mt-2">
                    Type or trace the Fidel character <span className="font-bold">"{currentFamily.orders[0].character}"</span> below:
                  </p>
                </div>
                <input
                  type="text"
                  value={practiceInput}
                  onChange={(e) => setPracticeInput(e.target.value)}
                  placeholder={`Type "${currentFamily.orders[0].character}" or "${currentFamily.orders[0].transliteration}"`}
                  className="w-full border border-[#D5C9B0] rounded-lg p-2.5 text-sm text-center font-geez text-lg outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      onAddXp(20);
                      setActiveModal(null);
                    }}
                    className="bg-[#1A2C1C] text-[#C8A84B] px-4 py-2 rounded-lg text-xs font-bold"
                  >
                    Submit Practice (+20 XP)
                  </button>
                </div>
              </div>
            )}

            {/* Examples Modal */}
            {activeModal === 'examples' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-3">
                  <h3 className="text-base font-bold text-[#2C1D07]">
                    Example Sacred Words (የቃላት ምሳሌዎች)
                  </h3>
                  <button onClick={() => setActiveModal(null)} className="text-sm font-bold text-[#9E9080]">✕</button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {currentFamily.orders.map((ord) => (
                    <div key={ord.order} className="flex items-center justify-between p-2.5 bg-[#FAF8F3] rounded-lg border border-[#E6DFD1]">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold font-geez text-[#855B09]">{ord.character}</span>
                        <div>
                          <p className="text-xs font-bold text-[#2C1D07] font-geez">{ord.exampleWordGeez}</p>
                          <p className="text-[10px] text-[#7A6E5E]">{ord.exampleWordMeaning}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => playAudioTone(ord.exampleWordGeez)}
                        className="p-1 text-[#855B09] hover:text-[#1A2C1C]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Modal */}
            {activeModal === 'quiz' && PRACTICE_QUIZZES.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E6DFD1] pb-3">
                  <h3 className="text-base font-bold text-[#2C1D07]">
                    Ge'ez Quiz: Question {currentQuizIndex + 1} of {PRACTICE_QUIZZES.length}
                  </h3>
                  <button onClick={() => setActiveModal(null)} className="text-sm font-bold text-[#9E9080]">✕</button>
                </div>
                <div className="text-center py-2 bg-[#FAF8F3] rounded-lg">
                  <span className="text-3xl font-black font-geez text-[#1A2C1C]">
                    {PRACTICE_QUIZZES[currentQuizIndex]?.geezPrompt}
                  </span>
                  <p className="text-xs text-[#2C1D07] font-bold mt-1">
                    {PRACTICE_QUIZZES[currentQuizIndex]?.question}
                  </p>
                </div>
                <div className="space-y-2">
                  {PRACTICE_QUIZZES[currentQuizIndex]?.options.map((opt, idx) => {
                    const isSelected = quizSelectedOption === idx;
                    const isCorrect = idx === PRACTICE_QUIZZES[currentQuizIndex]?.correctIndex;
                    let btnBg = '#FAF8F3';
                    let btnColor = '#2C1D07';
                    if (quizAnswered) {
                      if (isCorrect) {
                        btnBg = '#DCFCE7';
                        btnColor = '#15803D';
                      } else if (isSelected) {
                        btnBg = '#FEE2E2';
                        btnColor = '#B91C1C';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx, PRACTICE_QUIZZES[currentQuizIndex]?.correctIndex)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 14px',
                          borderRadius: 8,
                          background: btnBg,
                          color: btnColor,
                          border: isSelected ? '1.5px solid #1A2C1C' : '1px solid #E6DFD1',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: quizAnswered ? 'default' : 'pointer',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizAnswered && (
                  <div className="flex justify-end pt-2">
                    {currentQuizIndex < PRACTICE_QUIZZES.length - 1 ? (
                      <button
                        onClick={() => {
                          setCurrentQuizIndex((p) => p + 1);
                          setQuizSelectedOption(null);
                          setQuizAnswered(false);
                        }}
                        className="bg-[#1A2C1C] text-[#C8A84B] px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveModal(null)}
                        className="bg-[#059669] text-white px-4 py-2 rounded-lg text-xs font-bold"
                      >
                        Complete Quiz (+50 XP)
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
