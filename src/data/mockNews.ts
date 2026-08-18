/* ═══════════════════════════════════════════════════════════════
   EOTC — Comprehensive Mock Data for News & Official Communications
═══════════════════════════════════════════════════════════════ */

export interface Article {
  id: string;
  slug: string;
  titleAmharic: string;
  titleEnglish: string;
  category: 'EOTC Official' | 'Pan-Oriental Orthodox' | 'Eastern Orthodox' | 'Community & Social';
  date: string;
  author: string;
  image: string;
  summaryAmharic: string;
  summaryEnglish: string;
  contentParagraphs: string[];
  tags: string[];
}

export interface Announcement {
  id: string;
  slug: string;
  type: 'Holy Synod Decree' | 'Pastoral Letter' | 'Episcopal Appointment' | 'Church Consecration' | 'Calendar Pronouncement' | 'Official Statement';
  titleAmharic: string;
  titleEnglish: string;
  dateGregorian: string;
  dateEthiopian: string;
  issuedBy: string;
  signatory: string;
  image: string;
  summaryAmharic: string;
  summaryEnglish: string;
  fullContentAm: string[];
  fullContentEn: string[];
  pdfDownloadUrl?: string;
  officialRefNo: string;
}

export interface PanOrthodoxNewsItem {
  id: string;
  slug: string;
  churchTradition: 'Coptic Orthodox' | 'Syriac Orthodox' | 'Armenian Apostolic' | 'Malankara Orthodox' | 'Eritrean Orthodox' | 'Ecumenical & Inter-Orthodox' | 'Eastern Orthodox';
  patriarchate: string;
  titleAmharic: string;
  titleEnglish: string;
  dateGregorian: string;
  location: string;
  image: string;
  summaryAmharic: string;
  summaryEnglish: string;
  fullContentEn: string[];
  fullContentAm: string[];
  jointDeclarationText?: string;
  wccRelated?: boolean;
}

export interface MagazineArticle {
  id: string;
  titleAm: string;
  titleEn: string;
  author: string;
  authorTitle: string;
  category: 'Theology' | 'Church History' | 'Saints & Monasticism' | 'Cultural Heritage' | 'Youth & Sunday School';
  pageNumber: number;
  snippet: string;
  readTime: string;
}

export interface MagazineIssue {
  id: string;
  issueNumber: string;
  volume: string;
  titleAm: string;
  titleEn: string;
  dateEthiopian: string;
  dateGregorian: string;
  coverImage: string;
  theme: string;
  description: string;
  pdfDownloadAmharicUrl: string;
  pdfDownloadEnglishUrl: string;
  articles: MagazineArticle[];
  photoEssayCount: number;
}

export interface NewsletterIssue {
  id: string;
  editionNo: number;
  title: string;
  date: string;
  dateEthiopian: string;
  topHeadlines: string[];
  liturgicalReminder: {
    feastOrFast: string;
    fastType: string;
    date: string;
    scriptureReading: string;
  };
  featuredArticleSnippet: string;
  readTime: string;
}

/* ── 1. EOTC Official Announcements ──────────────────────────── */
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    slug: 'holy-synod-peace-resolution-2026',
    type: 'Holy Synod Decree',
    officialRefNo: 'EOTC-SYNOD-2026/08-01',
    titleAmharic: 'የቅዱስ ሲኖዶስ ምልዓተ ጉባኤ የሰላም፣ የእርቅና የይቅርታ አዋጅ',
    titleEnglish: 'Holy Synod Plenary Session Pastoral Decree on Peace, Reconciliation & Forgiveness',
    dateGregorian: 'August 12, 2026',
    dateEthiopian: 'ነሐሴ ፮, ፳፻፲፰ ዓ.ም',
    issuedBy: 'Holy Synod of the Ethiopian Orthodox Tewahedo Church',
    signatory: 'His Holiness Abune Mathias I, Catholicos Patriarch of Ethiopia',
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=1000',
    summaryAmharic: 'ብፁዕ ወቅዱስ አቡነ ማትያስ ቀዳማዊ ፓትርያርክ ርእሰ ሊቃነ ጳጳሳት ዘኢትዮጵያ በመንበረ ፓትርያርክ የተካሄደውን የቅዱስ ሲኖዶስ ምልዓተ ጉባኤ ውሳኔ በይፋ አወጁ።',
    summaryEnglish: 'His Holiness Abune Mathias I together with all Archbishops of the Holy Synod has issued a comprehensive pastoral decree urging national reconciliation, prayer, and global diocesan unity.',
    fullContentAm: [
      'በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን። የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ቅዱስ ሲኖዶስ ከመንፈስ ቅዱስ መሪነት ጋር በመንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል አዳራሽ ባደረገው ዓመታዊ ምልዓተ ጉባኤ የሚከተሉትን ውሳኔዎች አሳልፏል።',
      '፩. ለመላው የሀገራችን ሕዝብ ሰላምና ፍቅር እንዲሰፍን፣ የተፈናቀሉ ምዕመናን ወደ ቀያቸው እንዲመለሱ፣ እና አብያተ ክርስቲያናት ሙሉ ጥበቃ እንዲደረግላቸው መንግሥትንና የሚመለከታቸውን አካላት አጥብቆ ያሳስባል።',
      '፪. በዓለም ዙሪያ የሚገኙ የዲያስፖራ አህጉረ ስብከት በአንድነት ሆነው የቤተ ክርስቲያናቸውን ሐዋርያዊ አገልግሎት እንዲያጠናክሩና የዲጂታል ሚዲያ ስብከተ ወንጌልን እንዲያሳድጉ ጥሪ ቀርቧል።',
      '፫. የካህናትና የገዳማውያን የጡረታና የጤና ዋስትና ፈንድ በይፋ እንዲቋቋም በሙሉ ድምፅ ተወስኗል።',
    ],
    fullContentEn: [
      'In the Name of the Father, the Son, and the Holy Spirit, One God. Amen. The Holy Synod of the Ethiopian Orthodox Tewahedo Church, assembled under the inspiration of the Holy Spirit at the Patriarchal Palace in Addis Ababa, has solemnly issued the following resolutions:',
      '1. A nationwide and global call for divine peace, national harmony, and the safe repatriation of all displaced persons, with firm guarantees for the sanctity of historic holy sites and monasteries.',
      '2. Strengthening global diaspora dioceses across North America, Europe, Australia, and the Middle East to unite under the canonical authority of the Mother Church and expand multilingual catechism for the youth.',
      '3. Official ratification of the Central Clergy Healthcare & Monastic Welfare Pension Fund under the supervision of the Patriarchate Treasury.',
    ],
    pdfDownloadUrl: '#',
  },
  {
    id: 'ann-2',
    slug: 'episcopal-appointments-diaspora-2026',
    type: 'Episcopal Appointment',
    officialRefNo: 'EOTC-SYNOD-2026/08-04',
    titleAmharic: 'የአዳዲስ ሊቃነ ጳጳሳት ሹመትና የአህጉረ ስብከት ምደባ',
    titleEnglish: 'Holy Synod Announces Episcopal Appointments & Diocese Assignments',
    dateGregorian: 'August 08, 2026',
    dateEthiopian: 'ነሐሴ ፪, ፳፻፲፰ ዓ.ም',
    issuedBy: 'Patriarchal Chancellery',
    signatory: 'His Grace Abune Melchizedek, General Secretary of the Holy Synod',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=1000',
    summaryAmharic: 'ቅዱስ ሲኖዶስ ለሰሜን አሜሪካ፣ አውሮፓና ለሀገር ውስጥ ክፍት ለነበሩ አህጉረ ስብከት አዳዲስ ሊቃነ ጳጳሳትን ሰይሟል።',
    summaryEnglish: 'The Holy Synod has canonically elevated and assigned senior monastic scholars as Archbishops for dioceses in North America, Western Europe, and regional Ethiopian archdioceses.',
    fullContentAm: [
      'ቅዱስ ሲኖዶስ በሕገ ቤተ ክርስቲያን መሠረት የረጅም ጊዜ መንፈሳዊ አገልግሎትና የአብነት ትምህርት ያላቸውን አባቶች መርጦ በሊቀ ጵጵስና ማዕረግ ሾሟል።',
      'በዚህም መሠረት ለዋሽንግተን ዲሲ፣ ለለንደንና ምዕራብ አውሮፓ፣ እንዲሁም ለደቡብ ጎንደር አህጉረ ስብከት አዳዲስ አባቶች ተመድበዋል።',
    ],
    fullContentEn: [
      'In accordance with ancient apostolic canons, the Holy Synod has elected and assigned venerable archimandrites and doctors of the Church to shepherd diaspora and domestic dioceses.',
      'New archbishops have been designated for Washington DC, the UK & Western Europe Diocese, and South Gondar, fostering renewed pastoral care and youth outreach.',
    ],
    pdfDownloadUrl: '#',
  },
  {
    id: 'ann-3',
    slug: 'consecration-dallas-debre-genet-cathedral',
    type: 'Church Consecration',
    officialRefNo: 'EOTC-CONS-2026/07-19',
    titleAmharic: 'የደላስ ደብረ ገነት ቅድስት ማርያም ካቴድራል ታላቅ ቅዳሴና ምረቃ',
    titleEnglish: 'Solemn Consecration & Opening of Debre Genet St. Mary Cathedral – Dallas, Texas',
    dateGregorian: 'July 26, 2026',
    dateEthiopian: 'ሐምሌ ፲፱, ፳፻፲፰ ዓ.ም',
    issuedBy: 'North America Archdiocese Chancellery',
    signatory: 'His Grace Abune Fanuel, Archbishop of Washington DC & Southern USA',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1000',
    summaryAmharic: 'በአሜሪካን ቴክሳስ ግዛት በ፲፭ ሚሊዮን ዶላር ወጪ የተገነባው ታላቁ ካቴድራል በብፁዓን አበው ሊቃነ ጳጳሳት እጅ ተቀደሰ።',
    summaryEnglish: 'A momentous milestone for the diaspora as the newly constructed 2,500-capacity Debre Genet St. Mary Cathedral was officially consecrated with traditional holy Myron chrismation.',
    fullContentAm: [
      'የደላስና አካባቢው ምዕመናን ላለፉት አምስት ዓመታት በከፍተኛ ጥረትና መስዋዕትነት ያነጹት ታላቅ ቤተ መቅደስ በብፁዓን ሊቃነ ጳጳሳት፣ በካህናትና በብዙ ሺሕ ምዕመናን ፊት ተመርቋል።',
      'ካቴድራሉ ዘመናዊ የሰንበት ት/ቤት ክፍሎችን፣ የሕፃናት ማቆያ፣ የቤተ መጻሕፍትና የማኅበረሰብ አዳራሽን ያካተተ ነው።',
    ],
    fullContentEn: [
      'Built through five years of devoted diaspora stewardship, the magnificent stone cathedral features traditional Axumite architectural elements, a 2,500-seat sanctuary, Sunday school academy halls, and a cultural manuscript archive.',
      'The consecration Liturgy was celebrated with the carrying of the holy Tabot around the sanctuary seven times amid joyful Digua chants.',
    ],
    pdfDownloadUrl: '#',
  },
  {
    id: 'ann-4',
    slug: 'annual-calendar-pronouncement-2019-ec',
    type: 'Calendar Pronouncement',
    officialRefNo: 'EOTC-CAL-2019/01',
    titleAmharic: 'የ፳፻፲፱ ዓመተ ምሕረት (2026/2027) የዐዋደ አጽዋማትና በዓላት ማወጃ',
    titleEnglish: 'Official Patriarchal Pronouncement of the Liturgical Feasts & Fasting Seasons for 2019 E.C.',
    dateGregorian: 'August 14, 2026',
    dateEthiopian: 'ነሐሴ ፰, ፳፻፲፰ ዓ.ም',
    issuedBy: 'Holy Synod Liturgical Calendar & Computus Commission (ባሕረ ሐሳብ)',
    signatory: 'His Holiness Abune Mathias I, Patriarch of Ethiopia',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000',
    summaryAmharic: 'የሊቃውንቱ ጉባኤ በባሕረ ሐሳብ ቀመር መሠረት የ፳፻፲፱ ዓ.ም የበዓላትና የአጽዋማት መውጫ ቀናትን ይፋ አደረገ።',
    summaryEnglish: 'The official canonical calculation (Bahre Hasab) determining the liturgical dates for the Great Lent (Hudadi), Holy Pascha (Fasika), and all movable feasts for the upcoming Ethiopian year 2019 E.C.',
    fullContentAm: [
      'የ፳፻፲፱ ዓመተ ምሕረት ወንጌላዊ ዮሐንስ ሲሆን፣ ዓመተ ምሕረቱ ፳፻፲፱ ነው።',
      '• መስከረም ፩ ቀን (አዲስ ዓመት / ርእሰ ዐውደ ዓመት) ፡ ሐሙስ',
      '• ጾመ ነነዌ ፡ የካቲት ፰ ቀን ፳፻፲፱ ዓ.ም',
      '• ዐቢይ ጾም ፡ የካቲት ፳፪ ቀን ፳፻፲፱ ዓ.ም',
      '• በዓለ ትንሣኤ (ፋሲካ) ፡ ሚያዝያ ፲፯ ቀን ፳፻፲፱ ዓ.ም',
    ],
    fullContentEn: [
      'The Evangelist for the year 2019 E.C. is St. John. The Holy Synod announces the canonical fasting and feast dates computed in accordance with the ancient Ethiopian astronomical Computus (Bahre Hasab):',
      '• Ethiopian New Year (Enkutatash): Thursday, Sept 11, 2026 (መስከረም ፩)',
      '• Fast of Nineveh: Monday, Feb 15, 2027 (የካቲት ፰)',
      '• Great Lent (Hudadi): Monday, March 1, 2027 (የካቲት ፳፪)',
      '• Feast of the Glorious Resurrection (Holy Pascha / Fasika): Sunday, April 25, 2027 (ሚያዝያ ፲፯)',
    ],
    pdfDownloadUrl: '#',
  },
];

/* ── 2. Pan-Orthodox News ────────────────────────────────────── */
export const MOCK_PAN_ORTHODOX_NEWS: PanOrthodoxNewsItem[] = [
  {
    id: 'pan-1',
    slug: 'coptic-orthodox-patriarch-alexandria-communique',
    churchTradition: 'Coptic Orthodox',
    patriarchate: 'Coptic Orthodox Patriarchate of Alexandria (Cairo, Egypt)',
    titleAmharic: 'የኮፕቲክ ኦርቶዶክስ ቤተ ክርስቲያን ፓትርያርክ ፖፕ ታዋድሮስ ዳግማዊ የወዳጅነት መልእክት',
    titleEnglish: 'Pope Tawadros II of Alexandria Sends Fraternal Message on St. Mary’s Assumption Fast',
    dateGregorian: 'August 10, 2026',
    location: 'St. Mark Patriarchal Cathedral, Cairo, Egypt',
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'የግብጽ ኮፕቲክ ቤተ ክርስቲያን መሪ ፖፕ ታዋድሮስ ለኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን የፍልሰታ ጾም የወንድማማችነት ሰላምታ ላኩ።',
    summaryEnglish: 'His Holiness Pope Tawadros II of Alexandria addressed a warm fraternal letter to His Holiness Abune Mathias, reaffirming historic millennial bonds between the See of St. Mark and the Church of Axum.',
    fullContentEn: [
      'His Holiness Pope Tawadros II, Pope of Alexandria and Patriarch of the See of St. Mark, conveyed prayerful greetings to the Ethiopian Orthodox Tewahedo Church on the occasion of the Holy Fast of the Assumption (Filseta).',
      'The message highlighted the unbroken historical, liturgical, and monastic ties that have linked the Egyptian Desert Fathers of Scetis and the Ethiopian ascetics of Debre Damo and Lake Tana since the 4th century.',
      'Pope Tawadros underscored the importance of unified Oriental Orthodox theological defense in international academic forums.',
    ],
    fullContentAm: [
      'ብፁዕ ወቅዱስ ፖፕ ታዋድሮስ ዳግማዊ የቅዱስ ማርቆስ ወንበር ፓትርያርክ ለመላው የኢትዮጵያ ኦርቶዶክስ ምዕመናን የፍልሰታ ለማርያም ጾም የሰላምና የበረከት መልእክት አስተላልፈዋል።',
      'ይህ መልእክት በሁለቱ ጥንታውያን አብያተ ክርስቲያናት መካከል ያለውን የሺሕ ዓመታት ታሪካዊ አንድነትና መንፈሳዊ ትስስር አጉልቶ አሳይቷል።',
    ],
  },
  {
    id: 'pan-2',
    slug: 'syriac-orthodox-antioch-theological-consultation',
    churchTradition: 'Syriac Orthodox',
    patriarchate: 'Syriac Orthodox Patriarchate of Antioch and All the East (Damascus, Syria)',
    titleAmharic: 'የሶርያ ኦርቶዶክስ ቤተ ክርስቲያን የነገረ መለኮት ሊቃውንት ጉባኤ በአንጾኪያ',
    titleEnglish: 'Syriac Orthodox Church Hosts International Consultation on Aramaic-Ge’ez Patristic Heritage',
    dateGregorian: 'August 04, 2026',
    location: 'St. Ephrem Theological Seminary, Ma’arat Sayyidnaya, Syria',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'በቅዱስ ኤፍሬም ሶርያዊና በቅዱስ ያሬድ ዜማ መካከል ስላለው ጥልቅ የነገረ መለኮት ዝምድና ጥናት ተካሄደ።',
    summaryEnglish: 'Patriarch Ignatius Aphrem II welcomed an academic delegation from Holy Trinity University of Ethiopia to discuss shared 5th-century hymnography and Antiochene-Axumite liturgical links.',
    fullContentEn: [
      'The Syriac Orthodox Patriarchate under His Holiness Moran Mor Ignatius Aphrem II hosted a week-long Patristic colloquium examining the parallel development of West Syriac Beth Gazo melodies and Ethiopian St. Yared Digua notation.',
      'Delegates called for an institutional exchange program between Syrian and Ethiopian monastic scribes to preserve ancient West Semitic parchment traditions.',
    ],
    fullContentAm: [
      'በሶርያ ኦርቶዶክስ ፓትርያርክ ኢግናቲዮስ አፍሬም ዳግማዊ አስተናጋጅነት በቅዱስ ኤፍሬም ዜማና በቅዱስ ያሬድ ድጓ መካከል ያለውን አንድነት የሚያጠና ዓለም አቀፍ የሊቃውንት ጉባኤ ተካሄደ።',
    ],
  },
  {
    id: 'pan-3',
    slug: 'malankara-orthodox-church-kerala-synod',
    churchTradition: 'Malankara Orthodox',
    patriarchate: 'Malankara Orthodox Syrian Church (Catholicate of the East, Kerala, India)',
    titleAmharic: 'የሕንድ ማላንካራ ኦርቶዶክስ ቤተ ክርስቲያን የቅዱስ ቶማስ ሐዋርያ ጉባኤ',
    titleEnglish: 'Malankara Orthodox Church of India Concludes Holy Episcopal Synod in Kottayam',
    dateGregorian: 'July 28, 2026',
    location: 'Catholicate Palace, Devalokam, Kottayam, Kerala, India',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'የሕንድ ማላንካራ ኦርቶዶክስ ቤተ ክርስቲያን ከኢትዮጵያ ኦርቶዶክስ ጋር በወጣቶች ትምህርት በጋራ ለመሥራት ወሰነች።',
    summaryEnglish: 'His Holiness Baselios Marthoma Mathews III presided over the Malankara Holy Synod, passing unanimous resolutions to collaborate with EOTC on global student fellowships.',
    fullContentEn: [
      'The Malankara Orthodox Syrian Church, established by the Holy Apostle St. Thomas in 52 AD in Kerala, India, resolved to launch a joint Oriental Orthodox youth exchange program with the Ethiopian Orthodox Church.',
      'The synod reiterated complete dogmatic harmony within the Oriental Orthodox communion.',
    ],
    fullContentAm: [
      'በሐዋርያው ቅዱስ ቶማስ በሕንድ የተመሠረተችው የማላንካራ ኦርቶዶክስ ቤተ ክርስቲያን ከኢትዮጵያ ጋር በወጣቶች ስብከተ ወንጌልና በመንፈሳዊ ትምህርት የጋራ ትስስር ለመፍጠር ወስናለች።',
    ],
  },
  {
    id: 'pan-4',
    slug: 'armenian-apostolic-etchmiadzin-holy-myron',
    churchTradition: 'Armenian Apostolic',
    patriarchate: 'Mother See of Holy Etchmiadzin (Yerevan, Armenia)',
    titleAmharic: 'የአርመንያ ሐዋርያዊት ቤተ ክርስቲያን የቅዱስ ሜሮን ቡራኬ ሥነ ሥርዓት',
    titleEnglish: 'Mother See of Holy Etchmiadzin Prepares for Holy Muron Blessing Ceremony',
    dateGregorian: 'July 20, 2026',
    location: 'Etchmiadzin Cathedral, Armenia',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'በካቶሊኮስ ካሬኪን ዳግማዊ መሪነት የሚካሄደውን የቅዱስ ሜሮን በዓል ለመታደም የኢትዮጵያ ልዑክ ተጋበዘ።',
    summaryEnglish: 'Supreme Patriarch and Catholicos of All Armenians Karekin II extended official invitations to Oriental Orthodox sister patriarchates for the historic Holy Muron blessing ceremony.',
    fullContentEn: [
      'The ancient Mother See of Holy Etchmiadzin, founded in 301 AD as the world’s first state Christian church, invited the Ethiopian Orthodox Tewahedo Church delegation to participate in the preparation of holy Muron (Chrism).',
    ],
    fullContentAm: [
      'በዓለም የመጀመሪያዋ ክርስቲያን ሀገር የሆነችው አርመንያ በኤችሚያዚን ካቴድራል ለምታከናውነው የቅዱስ ሜሮን ቡራኬ የኢትዮጵያ ኦርቶዶክስ ልዑካን ተጋብዘዋል።',
    ],
  },
  {
    id: 'pan-5',
    slug: 'eritrean-orthodox-tewahedo-church-fraternal-prayers',
    churchTradition: 'Eritrean Orthodox',
    patriarchate: 'Eritrean Orthodox Tewahedo Church Patriarchate (Asmara, Eritrea)',
    titleAmharic: 'የኤርትራ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ፡ የወንድማማችነት ጸሎትና አንድነት',
    titleEnglish: 'Eritrean Orthodox Tewahedo Church: Fraternal Prayers for Peace and Monastic Heritage',
    dateGregorian: 'July 15, 2026',
    location: 'Enda Mariam Patriarchal Cathedral, Asmara, Eritrea',
    image: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'የኢትዮጵያና የኤርትራ ኦርቶዶክስ አብያተ ክርስቲያናት ተመሳሳይ ቀኖና፣ ታሪክ፣ ዜማና ቋንቋ ያላቸው እህትማማች መሆናቸው ተገለጸ።',
    summaryEnglish: 'Clergy and monastic elders of the Eritrean Orthodox Tewahedo Church lifted unceasing prayers for peace and preservation of ancient Ge’ez monasteries across the Horn of Africa.',
    fullContentEn: [
      'Sharing the identical 81-book Biblical canon, St. Yared liturgical chant, Ge’ez liturgical heritage, and ancient monastic lineage from Debre Damo and Debre Bizen, faithful across both sister churches continue unceasing spiritual solidarity and prayers for harmony.',
    ],
    fullContentAm: [
      'ሁለቱ አብያተ ክርስቲያናት በአንድ ሃይማኖት፣ በአንድ ያሬዳዊ ዜማና በአንድ ቅዱስ ሲኖዶሳዊ ቀኖና የተሳሰሩ መሆናቸው ይታወቃል።',
    ],
  },
  {
    id: 'pan-6',
    slug: 'world-council-of-churches-wcc-geneva-summit',
    churchTradition: 'Ecumenical & Inter-Orthodox',
    patriarchate: 'World Council of Churches (Geneva, Switzerland)',
    titleAmharic: 'የዓለም አብያተ ክርስቲያናት ምክር ቤት (WCC) የሥነ መለኮት ጉባኤ በጄኔቫ',
    titleEnglish: 'World Council of Churches (WCC) Geneva Summit: Oriental & Eastern Orthodox Joint Statement',
    dateGregorian: 'June 30, 2026',
    location: 'Ecumenical Center, Geneva, Switzerland',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'የኦሬንታልና የኢስተርን ኦርቶዶክስ ሊቃውንት የጋራ የክርስቶሎጂ መግለጫ አጸደቁ።',
    summaryEnglish: 'The joint international commission for theological dialogue between the Oriental Orthodox and Eastern Orthodox Churches (including representatives from the Ecumenical Patriarchate, Greek, Russian, and Romanian Churches) reaffirmed shared Christological faith.',
    wccRelated: true,
    fullContentEn: [
      'Following extensive dialogue sessions in Geneva, the Joint Commission reaffirmed the landmark 1989/1990 Agreed Christological Statements, confirming that both Orthodox families profess the same authentic Apostolic faith despite historical linguistic formulations.',
    ],
    fullContentAm: [
      'በጄኔቫ በተካሄደው የጋራ የነገረ መለኮት ውይይት ሁለቱም የኦርቶዶክስ ቤተሰቦች ያሏቸው የሃይማኖት መሠረቶች አንድ መሆናቸው በድጋሚ ተረጋግጧል።',
    ],
  },
];

/* ── 3. Official Church Magazine (Sime Tsion / ስምዐ ጽድቅ) ──── */
export const MOCK_MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 'mag-2026-08',
    issueNumber: 'Issue 142',
    volume: 'Volume 38',
    titleAm: 'ስምዐ ጽድቅ — የነሐሴ ፳፻፲፰ ዓ.ም ልዩ እትም',
    titleEn: 'Sime Tsion (Voice of Truth) — August 2026 Special Filseta Edition',
    dateEthiopian: 'ነሐሴ ፳፻፲፰ ዓ.ም',
    dateGregorian: 'August 2026',
    coverImage: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800',
    theme: 'The Mystery of the Assumption & Monastic Preservation',
    description: 'Special annual Marian feast issue featuring deep exegesis of the Anaphora of St. Mary (Qidase Maryam), Lalibela conservation progress, and youth in digital evangelism.',
    pdfDownloadAmharicUrl: '#',
    pdfDownloadEnglishUrl: '#',
    photoEssayCount: 18,
    articles: [
      {
        id: 'art-1',
        titleAm: 'ነገረ ማርያም በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን አስተምህሮ',
        titleEn: 'Mariology in the Theology of the Ethiopian Orthodox Tewahedo Church',
        author: 'Megabe Hadis Eshete Alemayehu',
        authorTitle: 'Senior Liturgical Scholar',
        category: 'Theology',
        pageNumber: 4,
        snippet: 'An in-depth theological study on St. Mary as Theotokos (Yeweledet Amlak), the Ark of the Covenant, and the golden censer (Ma’itente Zewereq).',
        readTime: '8 min read',
      },
      {
        id: 'art-2',
        titleAm: 'የላሊበላ ውቅር አብያተ ክርስቲያናት የጥገና ሥራ የደረሰበት ደረጃ',
        titleEn: 'Engineering Report: Preserving Lalibela’s Rock-Hewn Monoliths',
        author: 'Eng. Fasil Giorghis & Lalibela Restoration Committee',
        authorTitle: 'Chief Heritage Architect',
        category: 'Cultural Heritage',
        pageNumber: 16,
        snippet: 'Comprehensive photo documentation of non-invasive laser cleaning, water diversion tunnels, and micro-seismic basalt testing.',
        readTime: '12 min read',
      },
      {
        id: 'art-3',
        titleAm: 'የዐሥራ አራቱ ቅዳሴያት ታሪካዊና መንፈሳዊ አመጣጥ',
        titleEn: 'The 14 Anaphoras of the Ethiopian Liturgy: A Historical Survey',
        author: 'Dn. Dr. Mezgebu Kassa',
        authorTitle: 'Patristics Professor, Holy Trinity University',
        category: 'Church History',
        pageNumber: 28,
        snippet: 'Analyzing the origins of the Anaphoras of St. Basil, St. John Chrysostom, St. Athanasius, St. Epiphanius, and Abba Gorgorios.',
        readTime: '15 min read',
      },
      {
        id: 'art-4',
        titleAm: 'ወጣቶችና ዘመናዊው የዲጂታል ስብከተ ወንጌል',
        titleEn: 'Youth in the Digital Age: Evangelism on Social Media',
        author: 'Mahibere Kidusan Youth Editorial Board',
        authorTitle: 'Youth Ministry',
        category: 'Youth & Sunday School',
        pageNumber: 42,
        snippet: 'How Ethiopian diaspora youth are translating Ge’ez hymns and patristic quotes into accessible multilingual videos.',
        readTime: '6 min read',
      },
    ],
  },
  {
    id: 'mag-2026-06',
    issueNumber: 'Issue 141',
    volume: 'Volume 38',
    titleAm: 'ስምዐ ጽድቅ — የሰኔ ፳፻፲፰ ዓ.ም እትም',
    titleEn: 'Sime Tsion — June 2026 Edition: Feast of the Holy Apostles',
    dateEthiopian: 'ሰኔ ፳፻፲፰ ዓ.ም',
    dateGregorian: 'June 2026',
    coverImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    theme: 'Apostolic Mission & The 81-Book Ethiopian Canon',
    description: 'Examining the Fast of the Apostles (Tsome Hawaryat), ancient Axumite epigraphy, and the history of Abune Selama Kesate Berhan.',
    pdfDownloadAmharicUrl: '#',
    pdfDownloadEnglishUrl: '#',
    photoEssayCount: 14,
    articles: [
      {
        id: 'art-5',
        titleAm: 'የሐዋርያት ጾምና የቤተ ክርስቲያን ሚሲዮናዊ ተልእኮ',
        titleEn: 'The Fast of the Apostles and the Global Missionary Calling',
        author: 'His Grace Abune Melchizedek',
        authorTitle: 'Archbishop & Synod General Secretary',
        category: 'Theology',
        pageNumber: 6,
        snippet: 'The scriptural basis of the Apostles’ Fast and its call for personal renewal and active witness.',
        readTime: '7 min read',
      },
    ],
  },
];

/* ── 4. Weekly Newsletter Digests ────────────────────────────── */
export const MOCK_NEWSLETTERS: NewsletterIssue[] = [
  {
    id: 'nl-2026-w33',
    editionNo: 184,
    title: 'EOTC Weekly Digest: Filseta Vigil, Synod Peace Decree & Pan-Orthodox Summit',
    date: 'August 14, 2026',
    dateEthiopian: 'ነሐሴ ፰, ፳፻፲፰ ዓ.ም',
    topHeadlines: [
      'Holy Synod Plenary Session Issues Pastoral Resolution on National Reconciliation',
      'Filseta (Fast of Assumption) Dawn Liturgy Timetable Announced for All Cathedrals',
      'Pope Tawadros II of Alexandria Sends Fraternal Greetings to Patriarch Abune Mathias',
      'New Debre Genet Cathedral Consecrated in Dallas, Texas with Holy Myron',
    ],
    liturgicalReminder: {
      feastOrFast: 'Holy Fast of the Assumption of St. Mary (ጾመ ፍልሰታ ለማርያም)',
      fastType: 'Strict Fast (በጾመ ፍልሰታ ቅዱስ ሥጋውንና ክቡር ደሙን መቀበል)',
      date: 'Nehase 1–16 (August 7–22, 2026)',
      scriptureReading: 'St. Luke 1:39–56 • 1 Corinthians 15:20–28',
    },
    featuredArticleSnippet:
      'As millions of Orthodox faithful enter the second week of the Assumption Fast, parishes across Ethiopia and the diaspora are holding all-night Mahlet vigils. Discover the spiritual significance of the Anaphora of St. Mary...',
    readTime: '4 min read',
  },
  {
    id: 'nl-2026-w32',
    editionNo: 183,
    title: 'EOTC Weekly Digest: Saint Yared Heritage Digitization & New Episcopal Appointments',
    date: 'August 07, 2026',
    dateEthiopian: 'ነሐሴ ፩, ፳፻፲፰ ዓ.ም',
    topHeadlines: [
      'Over 1,200 Ancient Ge’ez Parchment Volumes Digitized in Lake Tana Monasteries',
      'Holy Synod Announces Assignments for Archbishops in North America & Europe',
      'Syriac Orthodox Patriarchate Hosts Patristic Dialogue on Antiochene-Axumite Liturgical Links',
    ],
    liturgicalReminder: {
      feastOrFast: 'Commencement of Filseta Fast (መግቢያ ጾመ ፍልሰታ)',
      fastType: 'Canonical Fast of the Mother of God',
      date: 'Nehase 1 (August 7, 2026)',
      scriptureReading: 'Psalm 45:9–17 • Song of Solomon 2:1–14',
    },
    featuredArticleSnippet:
      'The Holy Synod has formally launched the nationwide digitization of master Debtera choral recordings to preserve 1,500-year-old liturgical chant notations for global open access.',
    readTime: '3 min read',
  },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'n-1',
    slug: 'holy-synod-announces-peace-resolution-2026',
    titleAmharic: 'ቅዱስ ሲኖዶስ የሰላምና የእርቅ ጥሪ ይፋ አደረገ',
    titleEnglish: 'Holy Synod of the EOTC Issues Pastoral Decree on Peace & Unity',
    category: 'EOTC Official',
    date: 'Nehase 5, 2018 E.C. (Aug 11, 2026)',
    author: 'EOTC Patriarchal Press Office',
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'ብፁዕ ወቅዱስ አቡነ ማትያስ እና የቅዱስ ሲኖዶስ አባላት ለመላው የኢትዮጵያ ሕዝብ የሰላም መልእክት አስተላለፉ።',
    summaryEnglish: 'His Holiness Abune Mathias together with the Holy Synod has issued a solemn patriarchal call for reconciliation, love, and community stewardship across all dioceses worldwide.',
    contentParagraphs: [
      'Under the chairmanship of His Holiness Abune Mathias, Catholicos Patriarch of Ethiopia, the Holy Synod assembled at the Patriarchate in Addis Ababa.',
      'The decree emphasizes the vital role of the Church in fostering spiritual healing, supporting vulnerable monastic communities, and accelerating youth religious education.',
      'Dioceses across North America, Europe, and Australia were called upon to align with the central digital initiative for global church registry and charitable mobilization.',
    ],
    tags: ['Holy Synod', 'Patriarch', 'Decree', 'Unity'],
  },
  {
    id: 'n-2',
    slug: 'oriental-orthodox-bishops-summit',
    titleAmharic: 'የአኦሬንታል ኦርቶዶክስ አብያተ ክርስቲያናት ዓለም አቀፍ ጉባኤ',
    titleEnglish: 'Pan-Oriental Orthodox Summit Reaffirms Shared Faith & Sacraments',
    category: 'Pan-Oriental Orthodox',
    date: 'Nehase 2, 2018 E.C. (Aug 8, 2026)',
    author: 'Oriental Orthodox Secretariat',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'የኢትዮጵያ፣ የኮፕቲክ፣ የሶርያ፣ የአርመንያና የኤርትራ ኦርቶዶክስ አብያተ ክርስቲያናት መሪዎች ተገናኙ።',
    summaryEnglish: 'Hierarchs of the Ethiopian, Coptic, Syriac, Armenian, Malankara, and Eritrean Orthodox Churches convened for joint theological consultation.',
    contentParagraphs: [
      'Delegates from the Oriental Orthodox family reaffirmed full sacramental communion and brotherhood rooted in the Council of Nicaea, Constantinople, and Ephesus.',
      'Special focus was given to joint youth academies and translation of ancient Patristic texts into digital formats.',
    ],
    tags: ['Pan-Oriental', 'Coptic', 'Syriac', 'Theology'],
  },
  {
    id: 'n-3',
    slug: 'saint-yared-music-heritage-conference',
    titleAmharic: 'የቅዱስ ያሬድ ዜማ ቅርስ ጉባኤ በመንበረ ፓትርያርክ ተካሄደ',
    titleEnglish: 'Saint Yared Sacred Music Heritage Conference Held in Addis Ababa',
    category: 'Community & Social',
    date: 'Hamle 28, 2018 E.C. (Aug 4, 2026)',
    author: 'Mahibere Kidusan Media',
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800',
    summaryAmharic: 'የቅዱስ ያሬድ ዜማ ሥርዓት በዓለም አቀፍ ደረጃ እንዲመዘገብ ጥናት ተቀረበ።',
    summaryEnglish: 'Scholars and traditional Debteras presented UNESCO documentation supporting Saint Yared’s 6th-century musical notation system.',
    contentParagraphs: [
      'Saint Yared developed three distinct liturgical modes (Ge’ez, Ezil, Araray) that remain unchanged after 1500 years of active liturgical chant.',
    ],
    tags: ['Zema', 'Saint Yared', 'Culture', 'Heritage'],
  },
];
