export interface FidelOrder {
  order: number;
  nameAmharic: string;
  nameEnglish: string;
  vowelSound: string;
  character: string;
  transliteration: string;
  exampleWordGeez: string;
  exampleWordMeaning: string;
}

export interface FidelFamily {
  letterNameAmharic: string;
  letterNameEnglish: string;
  baseConsonant: string;
  orders: FidelOrder[];
}

export interface VocabularyWord {
  id: string;
  geezWord: string;
  transliteration: string;
  meaningAmharic: string;
  meaningEnglish: string;
  root: string;
  category: string;
  audioTrackId?: string;
}

export interface GrammarRule {
  titleAmharic: string;
  titleEnglish: string;
  explanationEn: string;
  explanationAm: string;
  examples: {
    geez: string;
    amharic: string;
    english: string;
    note?: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  geezPrompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GeezTrack {
  id: 'fidel' | 'basic' | 'liturgical' | 'grammar';
  titleAmharic: string;
  titleEnglish: string;
  level: string;
  levelBadge: string;
  duration: string;
  descriptionEn: string;
  descriptionAm: string;
  totalLessons: number;
  iconName: string;
}

export const GEEZ_TRACKS: GeezTrack[] = [
  {
    id: 'fidel',
    titleAmharic: 'ፊደል (The Ge’ez Abugida Alphabet)',
    titleEnglish: 'Track 1: Fidel & The 7 Vowel Orders',
    level: 'Beginner',
    levelBadge: 'ጀማሪ',
    duration: '2 Weeks',
    descriptionEn: 'Master the 26 consonant families across all seven phonetic orders (ግዕዝ፣ ካዕብ፣ ሣልስ፣ ራብዕ፣ ኃምስ፣ ሳድስ፣ ሳብዕ) with authentic audio pronunciation.',
    descriptionAm: 'ስምንቱን የፊደል ቤቶችና ሰባቱን የድምፅ ክፍሎች በድምፅና በምሳሌዎች ይማሩ።',
    totalLessons: 26,
    iconName: 'Languages',
  },
  {
    id: 'basic',
    titleAmharic: 'መሠረታዊ ቃላት (Sacred Words & Terms)',
    titleEnglish: 'Track 2: Basic Liturgical Vocabulary',
    level: 'Elementary',
    levelBadge: 'መካከለኛ',
    duration: '3 Weeks',
    descriptionEn: 'Learn over 100 high-frequency sacred terms, theological names, and core vocabulary used throughout the Bible and prayer books.',
    descriptionAm: 'በመጽሐፍ ቅዱስና በጸሎት መጻሕፍት ውስጥ በተደጋጋሚ የሚገኙ መሠረታዊ የግዕዝ ቃላት ትርጉም።',
    totalLessons: 20,
    iconName: 'BookOpen',
  },
  {
    id: 'liturgical',
    titleAmharic: 'የቅዳሴ ንባብ (Liturgical Read-Along)',
    titleEnglish: 'Track 3: Liturgical Reading & Chants',
    level: 'Intermediate',
    levelBadge: 'ከፍተኛ',
    duration: '4 Weeks',
    descriptionEn: 'Read along word-by-word with the Lord’s Prayer (አቡነ ዘበሰማያት), Nicene Creed, and Eucharistic Anaphoras with synchronized audio chanting.',
    descriptionAm: 'የዘወትር ጸሎትን፣ ጸሎተ ሃይማኖትንና የቅዳሴ ዜማዎችን በቀጥታ እየተከታተሉ የማንበብ ልምምድ።',
    totalLessons: 15,
    iconName: 'BookMarked',
  },
  {
    id: 'grammar',
    titleAmharic: 'ሰዋስወ ግዕዝ (Grammar & Verb Conjugation)',
    titleEnglish: 'Track 4: Advanced Ge’ez Grammar',
    level: 'Advanced / Seminary',
    levelBadge: 'ሊቃውንት',
    duration: '8 Weeks',
    descriptionEn: 'Designed for clergy and students: tri-consonantal verbal roots (ቀተለ), noun states, direct objects, prefixes, and theological translation rules.',
    descriptionAm: 'ለዲያቆናትና ለሴሚናሪ ተማሪዎች የተዘጋጀ የግዕዝ ሰዋሰው፣ የዘመን አገባብና የግሥ እርባታ ትምህርት።',
    totalLessons: 30,
    iconName: 'Sparkles',
  },
];

export const FIDEL_ALPHABET_DATA: FidelFamily[] = [
  {
    letterNameAmharic: 'ሆይ (Hoi)',
    letterNameEnglish: 'H (Hoi)',
    baseConsonant: 'H',
    orders: [
      { order: 1, nameAmharic: 'ግዕዝ (1st)', nameEnglish: 'Ge’ez', vowelSound: 'ä', character: 'ሀ', transliteration: 'Hä', exampleWordGeez: 'ሀገር', exampleWordMeaning: 'Country / City' },
      { order: 2, nameAmharic: 'ካዕብ (2nd)', nameEnglish: 'Ka’eb', vowelSound: 'u', character: 'ሁ', transliteration: 'Hu', exampleWordGeez: 'ሁከት', exampleWordMeaning: 'Turmoil' },
      { order: 3, nameAmharic: 'ሣልስ (3rd)', nameEnglish: 'Sales', vowelSound: 'i', character: 'ሂ', transliteration: 'Hi', exampleWordGeez: 'ሂደት', exampleWordMeaning: 'Process' },
      { order: 4, nameAmharic: 'ራብዕ (4th)', nameEnglish: 'Rabe', vowelSound: 'a', character: 'ሃ', transliteration: 'Haa', exampleWordGeez: 'ሃይማኖት', exampleWordMeaning: 'Faith' },
      { order: 5, nameAmharic: 'ኃምስ (5th)', nameEnglish: 'Hames', vowelSound: 'e', character: 'ሄ', transliteration: 'Hee', exampleWordGeez: 'ሄኖክ', exampleWordMeaning: 'Enoch' },
      { order: 6, nameAmharic: 'ሳድስ (6th)', nameEnglish: 'Sades', vowelSound: 'ə', character: 'ህ', transliteration: 'H', exampleWordGeez: 'ሕይወት', exampleWordMeaning: 'Life' },
      { order: 7, nameAmharic: 'ሳብዕ (7th)', nameEnglish: 'Sabe', vowelSound: 'o', character: 'ሆ', transliteration: 'Ho', exampleWordGeez: 'ሆሣዕና', exampleWordMeaning: 'Hosanna' },
    ],
  },
  {
    letterNameAmharic: 'ላዊ (Lawi)',
    letterNameEnglish: 'L (Lawi)',
    baseConsonant: 'L',
    orders: [
      { order: 1, nameAmharic: 'ግዕዝ (1st)', nameEnglish: 'Ge’ez', vowelSound: 'ä', character: 'ለ', transliteration: 'Lä', exampleWordGeez: 'ለሊት', exampleWordMeaning: 'Night' },
      { order: 2, nameAmharic: 'ካዕብ (2nd)', nameEnglish: 'Ka’eb', vowelSound: 'u', character: 'ሉ', transliteration: 'Lu', exampleWordGeez: 'ሉቃስ', exampleWordMeaning: 'Luke' },
      { order: 3, nameAmharic: 'ሣልስ (3rd)', nameEnglish: 'Sales', vowelSound: 'i', character: 'ሊ', transliteration: 'Li', exampleWordGeez: 'ሊቅ', exampleWordMeaning: 'Scholar' },
      { order: 4, nameAmharic: 'ራብዕ (4th)', nameEnglish: 'Rabe', vowelSound: 'a', character: 'ላ', transliteration: 'Laa', exampleWordGeez: 'ላዕላይ', exampleWordMeaning: 'Upper / Heavenly' },
      { order: 5, nameAmharic: 'ኃምስ (5th)', nameEnglish: 'Hames', vowelSound: 'e', character: 'ሌ', transliteration: 'Lee', exampleWordGeez: 'ሌዊ', exampleWordMeaning: 'Levi' },
      { order: 6, nameAmharic: 'ሳድስ (6th)', nameEnglish: 'Sades', vowelSound: 'ə', character: 'ል', transliteration: 'L', exampleWordGeez: 'ልብ', exampleWordMeaning: 'Heart' },
      { order: 7, nameAmharic: 'ሳብዕ (7th)', nameEnglish: 'Sabe', vowelSound: 'o', character: 'ሎ', transliteration: 'Lo', exampleWordGeez: 'ሎሚ', exampleWordMeaning: 'Today' },
    ],
  },
  {
    letterNameAmharic: 'ማይ (May)',
    letterNameEnglish: 'M (May)',
    baseConsonant: 'M',
    orders: [
      { order: 1, nameAmharic: 'ግዕዝ (1st)', nameEnglish: 'Ge’ez', vowelSound: 'ä', character: 'መ', transliteration: 'Mä', exampleWordGeez: 'መቅደስ', exampleWordMeaning: 'Sanctuary' },
      { order: 2, nameAmharic: 'ካዕብ (2nd)', nameEnglish: 'Ka’eb', vowelSound: 'u', character: 'ሙ', transliteration: 'Mu', exampleWordGeez: 'ሙሴ', exampleWordMeaning: 'Moses' },
      { order: 3, nameAmharic: 'ሣልስ (3rd)', nameEnglish: 'Sales', vowelSound: 'i', character: 'ሚ', transliteration: 'Mi', exampleWordGeez: 'ሚካኤል', exampleWordMeaning: 'Michael' },
      { order: 4, nameAmharic: 'ራብዕ (4th)', nameEnglish: 'Rabe', vowelSound: 'a', character: 'ማ', transliteration: 'Maa', exampleWordGeez: 'ማርያም', exampleWordMeaning: 'Mary' },
      { order: 5, nameAmharic: 'ኃምስ (5th)', nameEnglish: 'Hames', vowelSound: 'e', character: 'ሜ', transliteration: 'Mee', exampleWordGeez: 'ሜሮን', exampleWordMeaning: 'Chrism Oil' },
      { order: 6, nameAmharic: 'ሳድስ (6th)', nameEnglish: 'Sades', vowelSound: 'ə', character: 'ም', transliteration: 'M', exampleWordGeez: 'ምሥጢር', exampleWordMeaning: 'Mystery' },
      { order: 7, nameAmharic: 'ሳብዕ (7th)', nameEnglish: 'Sabe', vowelSound: 'o', character: 'ሞ', transliteration: 'Mo', exampleWordGeez: 'ሞገስ', exampleWordMeaning: 'Grace' },
    ],
  },
  {
    letterNameAmharic: 'ሠውት (Sawt)',
    letterNameEnglish: 'S (Sawt)',
    baseConsonant: 'S',
    orders: [
      { order: 1, nameAmharic: 'ግዕዝ (1st)', nameEnglish: 'Ge’ez', vowelSound: 'ä', character: 'ሠ', transliteration: 'Sä', exampleWordGeez: 'ሠራዊት', exampleWordMeaning: 'Hosts' },
      { order: 2, nameAmharic: 'ካዕብ (2nd)', nameEnglish: 'Ka’eb', vowelSound: 'u', character: 'ሡ', transliteration: 'Su', exampleWordGeez: 'ሡራፌል', exampleWordMeaning: 'Seraphim' },
      { order: 3, nameAmharic: 'ሣልስ (3rd)', nameEnglish: 'Sales', vowelSound: 'i', character: 'ሢ', transliteration: 'Si', exampleWordGeez: 'ሢመት', exampleWordMeaning: 'Ordination' },
      { order: 4, nameAmharic: 'ራብዕ (4th)', nameEnglish: 'Rabe', vowelSound: 'a', character: 'ሣ', transliteration: 'Saa', exampleWordGeez: 'ሣህል', exampleWordMeaning: 'Mercy' },
      { order: 5, nameAmharic: 'ኃምስ (5th)', nameEnglish: 'Hames', vowelSound: 'e', character: 'ሤ', transliteration: 'See', exampleWordGeez: 'ሤመ', exampleWordMeaning: 'He Appointed' },
      { order: 6, nameAmharic: 'ሳድስ (6th)', nameEnglish: 'Sades', vowelSound: 'ə', character: 'ሥ', transliteration: 'S', exampleWordGeez: 'ሥላሴ', exampleWordMeaning: 'Trinity' },
      { order: 7, nameAmharic: 'ሳብዕ (7th)', nameEnglish: 'Sabe', vowelSound: 'o', character: 'ሦ', transliteration: 'So', exampleWordGeez: 'ሦስት', exampleWordMeaning: 'Three' },
    ],
  },
];

export const SACRED_VOCABULARY: VocabularyWord[] = [
  {
    id: 'v1',
    geezWord: 'እግዚአብሔር',
    transliteration: '’Əgzi’abḥēr',
    meaningAmharic: 'የዓለም ጌታ፣ አምላክ',
    meaningEnglish: 'The Lord of the Universe (God Almighty)',
    root: 'እግዚእ (Lord) + ብሔር (Earth/Universe)',
    category: 'Theology',
  },
  {
    id: 'v2',
    geezWord: 'ተዋሕዶ',
    transliteration: 'Täwaḥədo',
    meaningAmharic: 'አንድ መሆን፣ መዋሃድ',
    meaningEnglish: 'Unified / United (The Union of Divine & Human Natures in Christ)',
    root: 'ወሐደ (To be One)',
    category: 'Christology',
  },
  {
    id: 'v3',
    geezWord: 'ስብሐት',
    transliteration: 'Səbḥat',
    meaningAmharic: 'ምስጋና፣ ክብር',
    meaningEnglish: 'Glory, Praise, Thanksgiving',
    root: 'ሰብሐ (To Praise)',
    category: 'Liturgy',
  },
  {
    id: 'v4',
    geezWord: 'ሥላሴ',
    transliteration: 'Śəllasē',
    meaningAmharic: 'አንድነትና ሦስትነት (አብ፣ ወልድ፣ መንፈስ ቅዱስ)',
    meaningEnglish: 'The Holy Trinity (Father, Son, and Holy Spirit)',
    root: 'ሠለሰ (To be Threefold)',
    category: 'Theology',
  },
  {
    id: 'v5',
    geezWord: 'ቅዳሴ',
    transliteration: 'Qəddasē',
    meaningAmharic: 'ማመስገን፣ መቀደስ (የቁርባን አገልግሎት)',
    meaningEnglish: 'Sanctification / Divine Liturgy (Eucharistic Service)',
    root: 'ቀደሰ (To make Holy)',
    category: 'Liturgy',
  },
  {
    id: 'v6',
    geezWord: 'መንክርት',
    transliteration: 'Mänkərt',
    meaningAmharic: 'ድንቅ፣ ተአምር',
    meaningEnglish: 'Wonder, Marvel, Miracle',
    root: 'ነከረ (To be Marvelous)',
    category: 'General',
  },
];

export const GRAMMAR_LESSONS: GrammarRule[] = [
  {
    titleAmharic: 'ግሥ ቀተለ (Basic 3-Consonant Verb Root: Qätälä)',
    titleEnglish: 'The Tri-Consonantal Root Paradigm: Qätälä (He Killed/Conquered)',
    explanationEn: 'Almost all Ge’ez verbs are derived from a 3-consonant root. The standard citation form is the 3rd person singular past tense (ቀተለ = He killed).',
    explanationAm: 'የግዕዝ ግሶች መሠረት ባለ ሦስት ሆሄያት ቀዳማይ አንቀጽ (ቀተለ) ነው።',
    examples: [
      { geez: 'ቀተለ (Qätälä)', amharic: 'ገደለ / አሸነፈ', english: 'He killed / conquered' },
      { geez: 'ቀተለት (Qätälät)', amharic: 'ገደለች', english: 'She killed' },
      { geez: 'ቀተልከ (Qätälkä)', amharic: 'ገደልህ (አንተ)', english: 'You (masc.) killed' },
      { geez: 'ቀተልኩ (Qätälku)', amharic: 'ገደልኩ (እኔ)', english: 'I killed' },
      { geez: 'ቀተሉ (Qätälu)', amharic: 'ገደሉ (እነሱ)', english: 'They killed' },
    ],
  },
  {
    titleAmharic: 'ዐቃፊ ስም (The Accusative & Construct State -ä)',
    titleEnglish: 'The Construct State and Direct Object Suffix (-ä)',
    explanationEn: 'In Ge’ez, adding the suffix "-ä" (ራብዕ/ግዕዝ ድምፅ) turns a noun into a direct object (accusative) or joins it to the following noun in possession (e.g. ቤተ ክርስቲያን = House of Christ).',
    explanationAm: 'በግዕዝ ስም ተሳቢ ሲሆን ወይም ከሌላ ስም ጋር ሲጣመር የ "-ä" ድምፅ ይቀበላል (ምሳሌ፦ ቤተ ክርስቲያን፣ ወልደ እግዚአብሔር)።',
    examples: [
      { geez: 'ቤት (Bēt) → ቤተ ክርስቲያን (Bētä Krəstiyan)', amharic: 'ቤት → የክርስቲያን ቤት (ቤተ ክርስቲያን)', english: 'House → House of Christian (Church)' },
      { geez: 'ወልድ (Wäld) → ወልደ እግዚአብሔር (Wäldä ’Əgzi’abḥēr)', amharic: 'ልጅ → የእግዚአብሔር ልጅ', english: 'Son → Son of God' },
    ],
  },
];

export const PRACTICE_QUIZZES: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the correct English meaning of the Ge’ez word "ተዋሕዶ" (Täwaḥədo)?',
    geezPrompt: 'ተዋሕዶ',
    options: ['Trinity', 'Unified / Union', 'Holy Scripture', 'Sanctuary'],
    correctIndex: 1,
    explanation: 'ተዋሕዶ (Täwaḥədo) means Unified/United, expressing the Orthodox dogma of the inseparable union of the Divine and Human natures in Jesus Christ.',
  },
  {
    id: 'q2',
    question: 'Which order of the Ge’ez vowel system does the character "ማ" (Maa) belong to?',
    geezPrompt: 'ማ',
    options: ['ግዕዝ (1st)', 'ካዕብ (2nd)', 'ራብዕ (4th)', 'ሳብዕ (7th)'],
    correctIndex: 2,
    explanation: '"ማ" is the 4th order (ራብዕ - Rabe) with the long vowel sound "aa".',
  },
  {
    id: 'q3',
    question: 'What does the term "ስብሐት ለአብ" (Səbḥat lä-’Ab) translate to?',
    geezPrompt: 'ስብሐት ፡ ለአብ',
    options: ['Glory to the Father', 'Lord have mercy', 'Holy Spirit', 'Peace be with you'],
    correctIndex: 0,
    explanation: 'ስብሐት (Glory/Praise) + ለአብ (to the Father).',
  },
];
