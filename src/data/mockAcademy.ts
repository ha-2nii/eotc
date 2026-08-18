/* ═══════════════════════════════════════════════════════════════
   EOTC — Comprehensive Mock Data for Tewahedo Academy
   Structured curriculum built on Mahibere Kidusan & Holy Synod standards
═══════════════════════════════════════════════════════════════ */

export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  titleEn: string;
  titleAm: string;
  duration: string;
  videoUrl: string;
  summaryEn: string;
  summaryAm: string;
  isLocked: boolean;
  quiz: LessonQuiz;
}

export interface Course {
  id: string;
  slug: string;
  trackId: 'children' | 'youth' | 'gebi-gubaye' | 'adults' | 'clergy';
  yearLevel?: 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4' | 'Graduate';
  titleEn: string;
  titleAm: string;
  categoryEn: string;
  categoryAm: string;
  instructor: string;
  instructorTitle: string;
  thumbnail: string;
  duration: string;
  totalLessons: number;
  completedLessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  descriptionEn: string;
  descriptionAm: string;
  syllabus: string[];
  lessons: Lesson[];
}

export interface Webinar {
  id: string;
  titleEn: string;
  titleAm: string;
  speaker: string;
  speakerTitle: string;
  dateGregorian: string;
  dateEthiopian: string;
  time: string;
  zoomUrl: string;
  category: string;
  registeredCount: number;
  image: string;
}

export interface UserCertificate {
  id: string;
  certificateNumber: string;
  courseTitleEn: string;
  courseTitleAm: string;
  trackName: string;
  recipientName: string;
  issueDate: string;
  issueDateAm: string;
  endorsedBy: string;
  grade: string;
}

/* ── 5 Main Academy Tracks ───────────────────────────────────── */
export const ACADEMY_TRACKS = [
  {
    id: 'children',
    slug: 'children',
    nameEnglish: 'Wetatoch (Children Ages 5–12)',
    nameAmharic: 'የሕፃናት ትምህርት (ዕድሜ ፭–፲፪)',
    ageRange: 'Ages 5–12',
    iconName: 'Baby',
    color: 'from-amber-500 to-orange-600',
    descriptionEn: 'Interactive 81-book Bible stories, lives of the saints, foundational prayers, Ge’ez Fidel songs, and holiday activities.',
    descriptionAm: 'የመጽሐፍ ቅዱስ ታሪኮች፣ የቅዱሳን ገድላት፣ መሠረታዊ ጸሎታት፣ የግዕዝ ፊደላት መማሪያና የበዓላት ዝማሬያት።',
    coursesCount: 6,
  },
  {
    id: 'youth',
    slug: 'youth',
    nameEnglish: 'Timhirotoch (Youth Ages 13–18)',
    nameAmharic: 'የወጣቶች ትምህርት (ዕድሜ ፲፫–፲፰)',
    ageRange: 'Ages 13–18',
    iconName: 'Sparkles',
    color: 'from-emerald-600 to-teal-700',
    descriptionEn: 'Dogmatic theology, 7 Sacraments, Tewahedo Christology, church history from Axum to present, and Christian ethics.',
    descriptionAm: 'ነገረ መለኮት፣ ሰባቱ ምስጢራተ ቤተ ክርስቲያን፣ የተዋሕዶ እምነት፣ የቤተ ክርስቲያን ታሪክና ክርስቲያናዊ ሥነ ምግባር።',
    coursesCount: 8,
  },
  {
    id: 'gebi-gubaye',
    slug: 'gebi-gubaye',
    nameEnglish: 'Gebi Gubaye (University Fellowship Ages 18–25)',
    nameAmharic: 'ግቢ ጉባኤ (የከፍተኛ ትምህርት ተማሪዎች)',
    ageRange: 'Ages 18–25',
    iconName: 'GraduationCap',
    color: 'from-blue-600 to-indigo-800',
    descriptionEn: 'Full 4-year Mahibere Kidusan university curriculum: Dogma, Scripture, Mariology, Qidase, Canon Law (Fetha Negest), and Apologetics.',
    descriptionAm: 'የማኅበረ ቅዱሳን የ፬ ዓመት የግቢ ጉባኤ ሥርዓተ ትምህርት — መሠረተ ሃይማኖት፣ የብሉይና ሐዲስ ኪዳን ጥናት፣ ፍትሐ ነገሥትና ቅዱሳት መጻሕፍት።',
    coursesCount: 16,
  },
  {
    id: 'adults',
    slug: 'adults',
    nameEnglish: 'Yemistir Lij (Adults & Catechumens Ages 26+)',
    nameAmharic: 'የምስጢር ልጅ (ለአዋቂዎችና አዳዲስ አማኞች)',
    ageRange: 'Ages 26+',
    iconName: 'BookOpen',
    color: 'from-purple-700 to-indigo-900',
    descriptionEn: 'Catechumen instruction, theology of icons, marriage preparation, Sunday school teacher certification, and lay leadership.',
    descriptionAm: 'የትምህርተ ሃይማኖት ጥልቀት፣ የቅዱሳት ሥዕላት ነገረ መለኮት፣ የጋብቻ ቅድመ ዝግጅትና የሰንበት ት/ቤት አስተማሪዎች ማሰልጠኛ።',
    coursesCount: 10,
  },
  {
    id: 'clergy',
    slug: 'clergy',
    nameEnglish: 'Clergy & Theological Professionals',
    nameAmharic: 'ለካህናትና ለሥነ መለኮት ምሁራን',
    ageRange: 'Ordained & Scholars',
    iconName: 'Award',
    color: 'from-[#800020] to-[#2C1D07]',
    descriptionEn: 'Advanced Ge’ez syntax & Zema modes, Patristics (Church Fathers), Homiletics, Parish Administration, and Interfaith Dialogue.',
    descriptionAm: 'የላቀ የግዕዝ ሰዋስውና የዜማ ስልቶች፣ የሊቃውንት ትርጓሜያት፣ ስብከት፣ የደብር አስተዳደርና ቀኖናዊ ሕጎች።',
    coursesCount: 7,
  },
];

/* ── Courses Database ────────────────────────────────────────── */
export const MOCK_COURSES: Course[] = [
  /* ── 1. CHILDREN TRACK ── */
  {
    id: 'child-101',
    slug: 'bible-stories-for-children',
    trackId: 'children',
    titleEn: '81-Book Bible Stories for Children',
    titleAm: 'የመጽሐፍ ቅዱስ ታሪኮች ለሕፃናት',
    categoryEn: 'Scripture & Stories',
    categoryAm: 'የመጽሐፍ ቅዱስ ታሪክ',
    instructor: 'Sister Selamawit Hailu',
    instructorTitle: 'Sunday School Curriculum Coordinator',
    thumbnail: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800',
    duration: '3h 15m',
    totalLessons: 4,
    completedLessons: 4,
    level: 'Beginner',
    descriptionEn: 'Beautiful illustrated stories from Genesis, Moses, David, the Nativity of Christ, and the Ethiopian Eunuch in Acts 8.',
    descriptionAm: 'ከኦሪት ዘፍጥረት ጀምሮ እስከ ጌታችን ልደትና የኢትዮጵያዊው ጃንደረባ ጥምቀት ድረስ የተዘጋጁ ማራኪ ታሪኮች ለሕፃናት።',
    syllabus: ['Creation & Noah’s Ark', 'Moses & The Red Sea', 'Nativity & Epiphany of Christ', 'The Ethiopian Eunuch'],
    lessons: [
      {
        id: 'cl-1',
        titleEn: 'God Creates the World (ሥነ ፍጥረት)',
        titleAm: 'እግዚአብሔር ዓለምን ፈጠረ (ሥነ ፍጥረት)',
        duration: '12m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'The six days of creation, angels, light, sea, and the holy Sabbath day.',
        summaryAm: 'ስድስቱ የፍጥረት ቀናት፣ መላእክት፣ ብርሃን፣ ባሕርና የተቀደሰው የሰንበት ዕለት።',
        isLocked: false,
        quiz: {
          question: 'On which day did God rest and bless the creation?',
          options: ['Day 1', 'Day 3', 'Day 7 (Sabbath / ሰንበት)', 'Day 5'],
          correctIndex: 2,
          explanation: 'God completed His creation on the 6th day and rested on the 7th day (Sabbath).',
        },
      },
      {
        id: 'cl-2',
        titleEn: 'Noah and the Ark of Safety (መርከበ ኖኅ)',
        titleAm: 'ኖኅና የድነት መርከብ',
        duration: '15m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'Noah’s obedience, the Ark, the rainbow covenant, and St. Mary as the Ark of the New Covenant.',
        summaryAm: 'የኖኅ ታዛዥነት፣ የቀስተ ደመና ቃል ኪዳን፣ እንዲሁም እመቤታችን የሐዲስ ኪዳን መርከብ መሆኗ።',
        isLocked: false,
        quiz: {
          question: 'What sign did God place in the sky as a covenant?',
          options: ['A Star', 'Rainbow (ቀስተ ደመና)', 'Lightning', 'A Cloud'],
          correctIndex: 1,
          explanation: 'The rainbow represents God’s eternal covenant of peace with mankind.',
        },
      },
      {
        id: 'cl-3',
        titleEn: 'The Birth of Our Lord Jesus (ልደተ ክርስቶስ)',
        titleAm: 'የጌታችን የመድኃኒታችን የኢየሱስ ክርስቶስ ልደት',
        duration: '18m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'The Nativity in Bethlehem cave, the shepherds, the Star, and the Three Wise Men.',
        summaryAm: 'በቤተ ልሔም ዋሻ የተፈጸመው የጌታችን ልደት፣ እረኞችና የሰብአ ሰገል ስጦታ።',
        isLocked: false,
        quiz: {
          question: 'In which town was Jesus born?',
          options: ['Nazareth', 'Bethlehem (ቤተ ልሔም)', 'Jerusalem', 'Axum'],
          correctIndex: 1,
          explanation: 'Christ was born in the town of Bethlehem of Judea as prophesied.',
        },
      },
      {
        id: 'cl-4',
        titleEn: 'The Ethiopian Eunuch & Deacon Philip (ጃንደረባው)',
        titleAm: 'ኢትዮጵያዊው ጃንደረባ ባኮስና ዲያቆን ፊልጶስ',
        duration: '14m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'Acts chapter 8: The Queen Candace finance minister who read Isaiah and accepted holy baptism.',
        summaryAm: 'የንግሥት ህንደኬ የገንዘብ ሚኒስትር የነበረው ጃንደረባ በዲያቆን ፊልጶስ እጅ የተጠመቀበት ታሪክ።',
        isLocked: false,
        quiz: {
          question: 'Which prophet was the Ethiopian Eunuch reading on his chariot?',
          options: ['Prophet Isaiah (ነቢዩ ኢሳይያስ)', 'Prophet Jonah', 'Prophet Daniel', 'King Solomon'],
          correctIndex: 0,
          explanation: 'He was reading from Isaiah 53 regarding the suffering Lamb of God.',
        },
      },
    ],
  },
  {
    id: 'child-102',
    slug: 'geez-fidel-songs',
    trackId: 'children',
    titleEn: 'Ge’ez Fidel & Alphabet Songs',
    titleAm: 'የግዕዝ ፊደላትና መሠረታዊ ጸሎታት',
    categoryEn: 'Sacred Language',
    categoryAm: 'ግዕዝ ቋንቋ',
    instructor: 'Yared Melake Selam',
    instructorTitle: 'Zema & Language Instructor',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    duration: '2h 30m',
    totalLessons: 3,
    completedLessons: 1,
    level: 'Beginner',
    descriptionEn: 'Fun interactive songs for children to master the 33 Ethiopian Fidel characters and the Lord’s Prayer in Ge’ez.',
    descriptionAm: 'ሕፃናት ፴፫ቱን የግዕዝ ፊደላትና "አቡነ ዘበሰማያት" ጸሎትን በዜማና በጨዋታ እንዲማሩ የተዘጋጀ።',
    syllabus: ['First 10 Fidels (ሀ–ቀ)', 'Fidels (በ–ፐ)', 'The Lord’s Prayer in Ge’ez (አቡነ ዘበሰማያት)'],
    lessons: [],
  },

  /* ── 2. YOUTH TRACK ── */
  {
    id: 'youth-201',
    slug: 'tewahedo-christology-101',
    trackId: 'youth',
    titleEn: 'Tewahedo Christology: The One Nature of Christ',
    titleAm: 'ነገረ ክርስቶስ ፡ የተዋሕዶ ትምህርተ ሃይማኖት',
    categoryEn: 'Dogmatic Theology',
    categoryAm: 'ነገረ መለኮት',
    instructor: 'Megabe Hadis Eshete Alemayehu',
    instructorTitle: 'Senior Theologian & Preacher',
    thumbnail: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800',
    duration: '4h 20m',
    totalLessons: 4,
    completedLessons: 2,
    level: 'Intermediate',
    descriptionEn: 'Understand the Mystery of Incarnation: One Incarnate Nature of God the Word without confusion, change, division, or separation.',
    descriptionAm: 'አምላክ ፍጹም ሰው እንደሆነ፣ ያለ መለወጥ፣ ያለ መደባለቅ፣ ያለ መለያየትና ያለ መከፈል አንድ ባሕርይ ሆኖ መዋሐዱን የሚያብራራ ጥልቅ ትምህርት።',
    syllabus: ['What is Tewahedo (ተዋሕዶ)?', 'The 4 Incorruptible Adverbs (ያለ መለወጥ፣ ያለ መደባለቅ...)', 'St. Cyril of Alexandria Formula', 'Refuting Ancient & Modern Heresies'],
    lessons: [
      {
        id: 'yl-1',
        titleEn: 'The Mystery of Tewahedo (ምስጢረ ተዋሕዶ)',
        titleAm: 'የተዋሕዶ ምስጢር ምንነትና ፍቺ',
        duration: '28m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'Etymology of Tewahedo: The hypostatic union of perfect Divinity and perfect Humanity in Jesus Christ.',
        summaryAm: 'ተዋሕዶ ማለት ሁለት ባሕርያት (መለኮትና ትስብእት) ያለ መለወጥና ያለ መለያየት አንድ መሆናቸው ነው።',
        isLocked: false,
        quiz: {
          question: 'What does the Cyrillic formula "Mia Physis Tou Theou Logou Sesarkomene" signify?',
          options: ['Two Separate Natures', 'One Incarnate Nature of God the Word (አንድ ባሕርይ)', 'Divinity Swallowed by Humanity', 'A Created God'],
          correctIndex: 1,
          explanation: 'It is the core Miaphysite foundation of Oriental Orthodoxy taught by St. Cyril.',
        },
      },
      {
        id: 'yl-2',
        titleEn: 'The Four Adverbs of Union (አራቱ የአስተዋሕዶ ሕጎች)',
        titleAm: 'ያለ መለወጥ፣ ያለ መደባለቅ፣ ያለ መለያየት፣ ያለ መከፈል',
        duration: '32m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'Exploring how Divinity and Humanity united without transmuting or dividing.',
        summaryAm: 'መለኮት ወደ ሥጋነት አልተለወጠም፣ ሥጋም ወደ መለኮትነት አልተደባለቀም።',
        isLocked: false,
        quiz: {
          question: 'Did divinity experience change (ውላጤ) in the Incarnation?',
          options: ['Yes, God changed into a man', 'No, Divinity is immutable (ያለ መለወጥ)', 'Yes, temporary change', 'Only in flesh'],
          correctIndex: 1,
          explanation: 'Divinity is unchangeable; God took real human flesh without His divine nature changing.',
        },
      },
      {
        id: 'yl-3',
        titleEn: 'The Seven Sacraments (ሰብዓቱ ምስጢራተ ቤተ ክርስቲያን)',
        titleAm: 'ሰባቱ የቤተ ክርስቲያን ምስጢራት',
        duration: '35m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'Baptism, Myron, Holy Communion (Qurban), Repentance, Priesthood, Matrimony, and Unction of the Sick.',
        summaryAm: 'ጥምቀት፣ ሜሮን፣ ቁርባን፣ ንስሐ፣ ክህነት፣ ተክሊልና ቀንዲል — የማይታየው ጸጋ በሚታይ ምልክት የሚሰጥባቸው።',
        isLocked: true,
        quiz: {
          question: 'Which of the 7 sacraments is essential for eternal salvation to enter God’s Kingdom?',
          options: ['Holy Baptism & Holy Communion', 'Only Matrimony', 'Only Priesthood', 'None'],
          correctIndex: 0,
          explanation: 'John 3:5 and John 6:53 declare Baptism and the Holy Eucharist essential for salvation.',
        },
      },
    ],
  },

  /* ── 3. GEBI GUBAYE (UNIVERSITY FELLOWSHIP 4-YEAR CURRICULUM) ── */
  {
    id: 'gebi-year1-foundations',
    slug: 'gebi-gubaye-year-1-foundations',
    trackId: 'gebi-gubaye',
    yearLevel: 'Year 1',
    titleEn: 'Gebi Gubaye Year 1: Foundations of Faith & Scripture',
    titleAm: 'ግቢ ጉባኤ ፩ኛ ዓመት ፡ መሠረተ ሃይማኖትና መጽሐፍ ቅዱስ',
    categoryEn: 'University Curriculum',
    categoryAm: 'የግቢ ጉባኤ ትምህርት',
    instructor: 'Mahibere Kidusan Academic Board',
    instructorTitle: 'EOTC Higher Education Committee',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    duration: '8h 45m',
    totalLessons: 6,
    completedLessons: 3,
    level: 'Intermediate',
    descriptionEn: 'The flagship Year 1 university curriculum by Mahibere Kidusan: Five Pillars of Mystery, Old Testament canon, Introduction to Ge’ez liturgy.',
    descriptionAm: 'በማኅበረ ቅዱሳን የተዘጋጀው አንደኛ ዓመት የግቢ ጉባኤ ትምህርት — አምስቱ አዕማደ ምስጢር፣ የብሉይ ኪዳን መጻሕፍትና የግዕዝ ቋንቋ።',
    syllabus: [
      'Pillars of Mystery: Trinity & Incarnation',
      'Pillars of Mystery: Baptism, Eucharist & Resurrection',
      'The 46 Books of the Old Testament',
      'Patristic Hermeneutics & Ethiopian Commentary (Andemta)',
      'Ge’ez Grammar & Basic Syntax',
      'Spiritual Life in Campus Environment',
    ],
    lessons: [
      {
        id: 'gyl-1',
        titleEn: 'The Five Pillars of Mystery Overview (አምስቱ አዕማደ ምስጢር)',
        titleAm: 'የአምስቱ አዕማደ ምስጢር አጠቃላይ መግቢያ',
        duration: '45m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: '1. Trinity, 2. Incarnation, 3. Baptism, 4. Eucharist (Qurban), 5. Resurrection of the Dead.',
        summaryAm: 'ሥላሴ፣ ሥጋዌ፣ ጥምቀት፣ ቁርባንና ትንሣኤ ሙታን — የክርስትና መሠረቶች።',
        isLocked: false,
        quiz: {
          question: 'Which of the following is NOT one of the 5 Pillars of Mystery in EOTC?',
          options: ['Mystery of the Trinity', 'Mystery of Incarnation', 'Mystery of Reincarnation', 'Mystery of the Eucharist'],
          correctIndex: 2,
          explanation: 'Reincarnation is contrary to Christian doctrine (Hebrews 9:27); Resurrection is the 5th pillar.',
        },
      },
      {
        id: 'gyl-2',
        titleEn: 'The 81-Book Ethiopian Canon (መጽሐፍ ቅዱስ ፹፩)',
        titleAm: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ፹፩ መጻሕፍት ቀኖና',
        duration: '50m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'The 46 Old Testament books (including Enoch, Jubilees, Wisdom, Sirach, Maccabees, Judith) and 35 New Testament books.',
        summaryAm: '፵፮ቱ የብሉይ ኪዳን (ሄኖክ፣ ኩፋሌ፣ መቃብያን...) እና ፴፭ቱ የሐዲስ ኪዳን መጻሕፍት ታሪክ።',
        isLocked: false,
        quiz: {
          question: 'How many total canonical books does the Ethiopian Orthodox Tewahedo Church preserve?',
          options: ['66 Books', '73 Books', '81 Books (፹፩ መጻሕፍት)', '90 Books'],
          correctIndex: 2,
          explanation: 'The EOTC preserves the broader 81-book Biblical canon recognized from antiquity.',
        },
      },
      {
        id: 'gyl-3',
        titleEn: 'Christian Fellowship in Campus Life (የግቢ ቆይታ)',
        titleAm: 'በዩኒቨርሲቲ ውስጥ የሚኖር ኦርቶዶክሳዊ ሕይወት',
        duration: '35m',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        summaryEn: 'Maintaining prayer, fasting, confession, and fellowship in university dorms.',
        summaryAm: 'በግቢ ጉባኤ በመሳተፍ፣ ጸሎትና ጾምን ጠብቆ በትምህርት የላቀ ውጤት ማምጣት።',
        isLocked: false,
        quiz: {
          question: 'What is the primary mission of Mahibere Kidusan Gebi Gubaye?',
          options: ['Political lobbying', 'Spiritual nurturing and preservation of youth in faith', 'Commercial business', 'Athletics'],
          correctIndex: 1,
          explanation: 'Gebi Gubaye nurtures higher education students in authentic Orthodox doctrine and worship.',
        },
      },
    ],
  },
  {
    id: 'gebi-year2-sacraments',
    slug: 'gebi-gubaye-year-2-sacraments',
    trackId: 'gebi-gubaye',
    yearLevel: 'Year 2',
    titleEn: 'Gebi Gubaye Year 2: Sacramental Life & Mariology',
    titleAm: 'ግቢ ጉባኤ ፪ኛ ዓመት ፡ ሥርዓተ አምልኮና ነገረ ማርያም',
    categoryEn: 'University Curriculum',
    categoryAm: 'የግቢ ጉባኤ ትምህርት',
    instructor: 'Dn. Dr. Mezgebu Kassa',
    instructorTitle: 'Mahibere Kidusan Head Theologian',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    duration: '9h 15m',
    totalLessons: 5,
    completedLessons: 0,
    level: 'Intermediate',
    descriptionEn: 'Theology of the 14 Anaphoras of the Divine Liturgy (Kidase), Fasting seasons, and deep patristic Mariology (Wudase Maryam).',
    descriptionAm: 'ዐሥራ አራቱ ቅዳሴያት፣ ያሬዳዊ የጸሎት ሥርዓት፣ የጾም ነገረ መለኮትና የእመቤታችን የድንግል ማርያም ክብር።',
    syllabus: ['The 14 Anaphoras (ቅዳሴያት)', 'Fasting Theology & 7 Canonical Fasts', 'Mariology: Mother of God (Theotokos)', 'Wudase & Anqetse Berhan Exegesis'],
    lessons: [],
  },
  {
    id: 'gebi-year3-history-canon',
    slug: 'gebi-gubaye-year-3-history-canon',
    trackId: 'gebi-gubaye',
    yearLevel: 'Year 3',
    titleEn: 'Gebi Gubaye Year 3: Church History & Fetha Negest',
    titleAm: 'ግቢ ጉባኤ ፫ኛ ዓመት ፡ የቤተ ክርስቲያን ታሪክና ፍትሐ ነገሥት',
    categoryEn: 'University Curriculum',
    categoryAm: 'የግቢ ጉባኤ ትምህርት',
    instructor: 'Dr. Lule Melaku',
    instructorTitle: 'Church Historian & Scholar',
    thumbnail: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?auto=format&fit=crop&q=80&w=800',
    duration: '10h 00m',
    totalLessons: 6,
    completedLessons: 0,
    level: 'Advanced',
    descriptionEn: 'Comprehensive historical survey: Nine Saints, Lalibela, Portuguese Jesuit controversies, Council of Chalcedon (451 AD), and Ethiopian Canon Law.',
    descriptionAm: 'ተስዓቱ ቅዱሳን፣ የዛጔ ሥርወ መንግሥት፣ የኬልቄዶን ጉባኤ ታሪክና የፍትሐ ነገሥት ቀኖናዊ ሕጎች።',
    syllabus: ['Axumite Christianity & Nine Saints', 'Medieval Monasticism & Lalibela', 'Council of Chalcedon (451 AD) Split', 'Fetha Negest (Law of Kings)'],
    lessons: [],
  },
  {
    id: 'gebi-year4-apologetics',
    slug: 'gebi-gubaye-year-4-apologetics',
    trackId: 'gebi-gubaye',
    yearLevel: 'Year 4',
    titleEn: 'Gebi Gubaye Year 4: Advanced Apologetics & Defense of Faith',
    titleAm: 'ግቢ ጉባኤ ፬ኛ ዓመት ፡ የሃይማኖት ጥበቃና ተሟጋችነት (Apologetics)',
    categoryEn: 'University Curriculum',
    categoryAm: 'የግቢ ጉባኤ ትምህርት',
    instructor: 'Dn. Henok Hailu',
    instructorTitle: 'Apologist & Author',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    duration: '11h 30m',
    totalLessons: 7,
    completedLessons: 0,
    level: 'Advanced',
    descriptionEn: 'Defending Orthodox traditions: Tabot, Holy Icons, Intercession of Saints, Fasting, and Answering modern secular and Protestant objections.',
    descriptionAm: 'ስለ ታቦት፣ ስለ ቅዱሳት ሥዕላት፣ ስለ ቅዱሳን አማላጅነት፣ ስለ ጾምና ስለ ተዋሕዶ እምነት የሚነሱ ጥያቄዎችን በቅዱሳት መጻሕፍት መመለስ።',
    syllabus: ['The Biblical Basis of the Tabot & Altar', 'Theology & Veneration of Holy Icons', 'Intercession of St. Mary & Saints (አማላጅነት)', 'Engaging Modern Secularism & Cults'],
    lessons: [],
  },

  /* ── 4. ADULT TRACK ── */
  {
    id: 'adult-301',
    slug: 'catechumen-course-orthodoxy',
    trackId: 'adults',
    titleEn: 'Catechumen Pathway: Journey to Holy Baptism & Confirmation',
    titleAm: 'የትምህርተ ሃይማኖት መግቢያ ፡ ለአዳዲስ አማኞች',
    categoryEn: 'Catechesis & Discipleship',
    categoryAm: 'የሃይማኖት ትምህርት',
    instructor: 'Kesis Melake Genet Berhanu',
    instructorTitle: 'Parish Administrator & Confessor',
    thumbnail: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800',
    duration: '6h 15m',
    totalLessons: 5,
    completedLessons: 0,
    level: 'Beginner',
    descriptionEn: 'The formal curriculum for seekers, converts, and returning believers preparing for Holy Baptism, Chrismation (Myron), and Eucharistic communion.',
    descriptionAm: 'ወደ ኦርቶዶክስ ተዋሕዶ እምነት ለሚገቡ አዳዲስ አማኞችና ወደ ቤተ ክርስቲያን ለሚመለሱ የተዘጋጀ የጥምቀትና የሜሮን ቅድመ ዝግጅት።',
    syllabus: ['Nicene Creed Exegesis', 'The 10 Commandments in Christian Life', 'The Holy Liturgy Explained Step-by-Step', 'Confession & Spiritual Fatherhood'],
    lessons: [],
  },

  /* ── 5. CLERGY & SCHOLARS TRACK ── */
  {
    id: 'clergy-401',
    slug: 'patristic-homiletics-zema',
    trackId: 'clergy',
    titleEn: 'Advanced Patristic Homiletics & Liturgical Exegesis',
    titleAm: 'የላቀ የስብከት ጥበብና የሊቃውንት ትርጓሜያት',
    categoryEn: 'Clergy Continuing Education',
    categoryAm: 'የካህናት ሥልጠና',
    instructor: 'His Grace Abune Gorgorios Memorial Institute',
    instructorTitle: 'Patriarchate Clergy Training College',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
    duration: '14h 00m',
    totalLessons: 8,
    completedLessons: 0,
    level: 'Master',
    descriptionEn: 'Mastering patristic homilies, contextual pastoral care, canon law implementation in modern parishes, and liturgical leadership.',
    descriptionAm: 'የአበው ስብከቶች፣ ዘመናዊ የደብር አስተዳደር፣ የምዕመናን አገልግሎትና የሃይማኖት ጥበቃ ለካህናትና ለዲያቆናት።',
    syllabus: ['Homiletics: Structure of an Orthodox Sermon', 'Pastoral Counseling & Confession Canon', 'Parish Financial & Legal Stewardship', 'Inter-Faith Pastoral Guidance'],
    lessons: [],
  },
];

/* ── Live Webinars & Q&A Schedule ────────────────────────────── */
export const MOCK_WEBINARS: Webinar[] = [
  {
    id: 'web-1',
    titleEn: 'Defending Oriental Orthodox Christology in 2026',
    titleAm: 'የተዋሕዶ ነገረ መለኮት በዘመናችን — የቀጥታ ጥያቄና መልስ',
    speaker: 'Dn. Dr. Mezgebu Kassa',
    speakerTitle: 'Mahibere Kidusan Head Theologian',
    dateGregorian: 'Friday, Aug 28, 2026',
    dateEthiopian: 'ነሐሴ ፳፪, ፳፻፲፰ ዓ.ም',
    time: '7:00 PM – 9:00 PM EAT',
    zoomUrl: 'https://zoom.us/j/eotc-theology-2026',
    category: 'Dogmatic Theology',
    registeredCount: 1420,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'web-2',
    titleEn: 'Raising Orthodox Children in the Western Diaspora',
    titleAm: 'ልጆችን በዲያስፖራ በሃይማኖትና በባህል ማሳደግ',
    speaker: 'Kesis Melake Genet Berhanu',
    speakerTitle: 'North America Diocese Youth Dean',
    dateGregorian: 'Sunday, Sep 06, 2026',
    dateEthiopian: 'ጳጉሜ ፩, ፳፻፲፰ ዓ.ም',
    time: '4:00 PM – 6:00 PM EST',
    zoomUrl: 'https://zoom.us/j/eotc-family-2026',
    category: 'Family & Christian Ethics',
    registeredCount: 980,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'web-3',
    titleEn: 'The Spiritual Secrets of the 14 Anaphoras of Kidase',
    titleAm: 'የዐሥራ አራቱ ቅዳሴያት ምሥጢርና ትርጓሜ',
    speaker: 'Megabe Hadis Eshete Alemayehu',
    speakerTitle: 'Senior Theologian & Preacher',
    dateGregorian: 'Saturday, Sep 19, 2026',
    dateEthiopian: 'መስከረም ፱, ፳፻፲፱ ዓ.ም',
    time: '8:00 PM – 10:00 PM EAT',
    zoomUrl: 'https://zoom.us/j/eotc-liturgy-2026',
    category: 'Liturgy & Zema',
    registeredCount: 2350,
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800',
  },
];

/* ── User Certificates for Enrolled Learners ─────────────────── */
export const MOCK_CERTIFICATES: UserCertificate[] = [
  {
    id: 'cert-1',
    certificateNumber: 'EOTC-MK-2026-08492',
    courseTitleEn: '81-Book Bible Stories for Children',
    courseTitleAm: 'የመጽሐፍ ቅዱስ ታሪኮች ለሕፃናት',
    trackName: 'Wetatoch (Children Ages 5–12)',
    recipientName: 'Yohannes Wolde Mariam',
    issueDate: 'August 14, 2026',
    issueDateAm: 'ነሐሴ ፰, ፳፻፲፰ ዓ.ም',
    endorsedBy: 'Holy Synod Sunday School Department & Mahibere Kidusan',
    grade: 'Distinction (100%)',
  },
  {
    id: 'cert-2',
    certificateNumber: 'EOTC-MK-2025-01934',
    courseTitleEn: 'Introduction to Tewahedo Dogma & Christology',
    courseTitleAm: 'መሠረተ ሃይማኖት ፡ የተዋሕዶ እምነት አስተምህሮ',
    trackName: 'Yemistir Lij (Adults Track)',
    recipientName: 'Yohannes Wolde Mariam',
    issueDate: 'December 20, 2025',
    issueDateAm: 'ታኅሣሥ ፲፩, ፳፻፲፰ ዓ.ም',
    endorsedBy: 'Holy Trinity Theological University & Mahibere Kidusan',
    grade: 'Honor Roll (96%)',
  },
];
