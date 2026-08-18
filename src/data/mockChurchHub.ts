export interface FeaturedParish {
  name: string;
  nameAmharic: string;
  city: string;
  established: string;
}

export interface DiocesanNewsItem {
  id: string;
  dioceseId: string;
  dioceseName: string;
  title: string;
  titleAmharic: string;
  date: string;
  category: 'Ordination' | 'Pastoral Visit' | 'Sanctuary Consecration' | 'Youth Conference' | 'Charity Outreach';
  summary: string;
  fullStory: string;
}

export interface DioceseInfo {
  id: string;
  slug: string;
  nameAmharic: string;
  nameEnglish: string;
  seeCity: string;
  archbishopAmharic: string;
  archbishopEnglish: string;
  cathedral: string;
  cathedralAmharic: string;
  consecrationYear: string;
  parishesCount: number;
  monasteriesCount: number;
  region: 'Ethiopia' | 'Diaspora' | 'Historical See';
  subRegion?: 'North America' | 'Europe' | 'Australia & Oceania' | 'Middle East' | 'Caribbean & Latin America' | 'Ethiopia';
  description: string;
  historySummary: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    website?: string;
  };
  featuredParishes: FeaturedParish[];
  recentNews?: {
    title: string;
    date: string;
    category: string;
    summary: string;
  }[];
}

export interface SynodMember {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  titleAmharic: string;
  titleEnglish: string;
  dioceseAmharic: string;
  dioceseEnglish: string;
  region: 'Ethiopia' | 'Diaspora' | 'Holy Land & Foreign' | 'Patriarchate Administration';
  roleAmharic: string;
  roleEnglish: string;
  consecrationYear: string;
  photoUrl: string;
}

export interface SynodDecision {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  sessionName: string;
  sessionNameAmharic: string;
  date: string;
  ethiopianDate: string;
  category: 'Canonical & Dogma' | 'Peace & Unity' | 'Diocesan Governance' | 'Monastic Heritage';
  documentRef: string;
  summary: string;
  keyResolutions: string[];
}

export interface SynodScheduleSession {
  id: string;
  sessionTitle: string;
  sessionTitleAmharic: string;
  sessionType: 'Plenary Assembly' | 'Standing Synod' | 'Theological Commission';
  dates: string;
  ethiopianDates: string;
  venue: string;
  venueAmharic: string;
  status: 'Upcoming' | 'In Session' | 'Concluded';
  agendaHighlights: string[];
}

export interface HistoricalSynodDocument {
  id: string;
  title: string;
  titleAmharic: string;
  year: string;
  ethiopianYear: string;
  category: 'Autocephaly' | 'Synod Constitution' | 'Reconciliation' | 'Canon Law';
  summary: string;
  significance: string;
  pages: number;
}

export interface SynodCommittee {
  titleAmharic: string;
  titleEnglish: string;
  head: string;
  description: string;
  duties: string[];
}

export interface HistoricalFigure {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  era: string;
  role: string;
  roleAmharic: string;
  century: string;
  biography: string;
  keyContributions: string;
  iconUrl: string;
}

export interface ChurchHistoryMilestone {
  era: string;
  eraAmharic: string;
  period: string;
  title: string;
  titleAmharic: string;
  description: string;
  keyFigures: string[];
  significance: string;
}

export interface SaintProfile {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  category: 'Apostles' | 'Martyrs' | 'Monks & Ascetics' | 'Church Fathers' | 'Ethiopian Saints' | 'Theotokos (St. Mary)';
  title: string;
  feastDay: string;
  ethiopianMonth: string;
  ethiopianDay: number;
  gregorianDate: string;
  century: string;
  iconUrl: string;
  monasteryOrOrigin: string;
  shortBio: string;
  contributions: string;
  miracles: string[];
  prayersAndHymns: {
    title: string;
    geezText: string;
    amharicText: string;
    englishTranslation: string;
  };
}

export interface PillarOfMystery {
  number: number;
  titleAmharic: string;
  titleEnglish: string;
  geezTerm: string;
  summary: string;
  scriptureRef: string;
}

export const QUICK_STATS = [
  { labelEn: 'Founded', labelAm: 'የተመሠረተችበት', value: '4th Century AD', subtextEn: '330 AD State Faith / Apostolic 34 AD', iconName: 'Clock' },
  { labelEn: 'Faithful Worldwide', labelAm: 'ምእመናን በዓለም ዙሪያ', value: '60M+', subtextEn: 'Largest Oriental Orthodox Church', iconName: 'Users' },
  { labelEn: 'Parishes & Monasteries', labelAm: 'አብያተ ክርስቲያናትና ገዳማት', value: '700+ Global', subtextEn: 'Thousands of historic sanctuaries', iconName: 'Church' },
  { labelEn: 'Dioceses & Archdioceses', labelAm: 'አህጉረ ስብከት', value: '14+ Jurisdictions', subtextEn: 'Domestic & international episcopal sees', iconName: 'MapPin' },
];

export const PILLARS_OF_MYSTERY: PillarOfMystery[] = [
  {
    number: 1,
    titleAmharic: 'ምሥጢረ ሥላሴ',
    titleEnglish: 'Mystery of the Holy Trinity',
    geezTerm: 'ሥላሴ በአንድነትና በሦስትነት',
    summary: 'Belief in one God in three distinct Persons (Hypostases): Father, Son, and Holy Spirit — co-equal, co-eternal, of one divine essence (Ousia).',
    scriptureRef: 'Matthew 28:19, 1 John 5:7',
  },
  {
    number: 2,
    titleAmharic: 'ምሥጢረ ሥጋዌ',
    titleEnglish: 'Mystery of the Incarnation',
    geezTerm: 'ተዋሕዶ (One Incarnate Nature)',
    summary: 'God the Word took flesh from the Holy Virgin Mary and became perfect Man without separation, confusion, change, or division (Tewahedo).',
    scriptureRef: 'John 1:14, Colossians 2:9',
  },
  {
    number: 3,
    titleAmharic: 'ምሥጢረ ጥምቀት',
    titleEnglish: 'Mystery of Holy Baptism',
    geezTerm: 'ልደት ዳግመኛ በውኃና በመንፈስ',
    summary: 'Rebirth through water and Holy Spirit for remission of sins and adoption as children of God (administered at 40 days for boys, 80 for girls).',
    scriptureRef: 'John 3:5, Romans 6:3-4',
  },
  {
    number: 4,
    titleAmharic: 'ምሥጢረ ቁርባን',
    titleEnglish: 'Mystery of Holy Communion (Eucharist)',
    geezTerm: 'ሥጋ ወደሙ',
    summary: 'The true Holy Body and precious Blood of Our Lord Jesus Christ offered for the sanctification and eternal salvation of the faithful.',
    scriptureRef: 'John 6:53-56, 1 Cor 11:23-26',
  },
  {
    number: 5,
    titleAmharic: 'ምሥጢረ ትንሣኤ ሙታን',
    titleEnglish: 'Mystery of the Resurrection of the Dead',
    geezTerm: 'ትንሣኤ ሙታን ወሕይወት ዘለዓለም',
    summary: 'The bodily resurrection of all souls at the Second Coming of Our Lord Jesus Christ for righteous eternal judgment.',
    scriptureRef: '1 Corinthians 15:52, Revelation 20:12',
  },
];

export const MOCK_DIOCESES: DioceseInfo[] = [
  {
    id: 'addis-ababa',
    slug: 'addis-ababa',
    nameAmharic: 'የአዲስ አበባ ሀገረ ስብከት',
    nameEnglish: 'Archdiocese of Addis Ababa',
    seeCity: 'Addis Ababa',
    archbishopAmharic: 'ብፁዕ ወቅዱስ አቡነ ማትያስ (ፓትርያርክ ርእሰ ሊቃነ ጳጳሳት)',
    archbishopEnglish: 'His Holiness Catholicos Patriarch Abune Mathias',
    cathedral: 'Holy Trinity Cathedral (ቅድስት ሥላሴ ካቴድራል)',
    cathedralAmharic: 'መንበረ ጸባዖት ቅድስት ሥላሴ ካቴድራል',
    consecrationYear: '2013 (Patriarchal Enthronement)',
    parishesCount: 180,
    monasteriesCount: 24,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'The supreme patriarchal seat and metropolitan center of the Ethiopian Orthodox Church, hosting Holy Trinity Cathedral and the General Patriarchate Secretariat.',
    historySummary: 'Established as the primary metropolitan seat of Ethiopia following the foundation of Addis Ababa in the late 19th century by Emperor Menelik II and Empress Taytu.',
    contactInfo: {
      phone: '+251 11 155 2412',
      email: 'chancellery@eotc-patriarchate.org',
      address: 'Patriarchate Compound, Arat Kilo, P.O. Box 1283, Addis Ababa',
      website: 'https://eotc-patriarchate.org'
    },
    featuredParishes: [
      { name: 'Holy Trinity Cathedral', nameAmharic: 'ቅድስት ሥላሴ ካቴድራል', city: 'Arat Kilo, Addis Ababa', established: '1942 AD' },
      { name: 'St. Mary of Tsion Cathedral', nameAmharic: 'ማርያም ጽዮን ካቴድራል', city: 'Sidist Kilo, Addis Ababa', established: '1955 AD' },
      { name: 'St. George Cathedral (Arada)', nameAmharic: 'አራዳ ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን', city: 'Piazza, Addis Ababa', established: '1896 AD' },
      { name: 'Debre Libanos Patriarchate Monastery', nameAmharic: 'የመንበረ ፓትርያርክ ገዳም', city: 'Arat Kilo', established: '1960 AD' }
    ]
  },
  {
    id: 'axum',
    slug: 'axum-tsion',
    nameAmharic: 'የአክሱም ጽዮን ሀገረ ስብከት',
    nameEnglish: 'Ancient See of Axum Tsion',
    seeCity: 'Axum, Tigray',
    archbishopAmharic: 'ብፁዕ አቡነ መቃርዮስ',
    archbishopEnglish: 'His Eminence Archbishop Abune Meqarios',
    cathedral: 'Church of Our Lady Mary of Zion (ርእሰ አድባራት ቅድስት ማርያም ጽዮን)',
    cathedralAmharic: 'ርእሰ አድባራት ወገዳማት አክሱም ጽዮን',
    consecrationYear: '2005 AD',
    parishesCount: 140,
    monasteriesCount: 38,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'The ancient spiritual cradle of Ethiopian Christianity and permanent sanctuary of the Ark of the Covenant (ታቦተ ጽዮን) brought to Axum in biblical times.',
    historySummary: 'The first metropolitan see of Africa founded by Saint Frumentius (Abba Salama) in 330 AD under King Ezana.',
    contactInfo: {
      phone: '+251 34 775 1102',
      email: 'axum.tsion@eotc.org',
      address: 'Axum Tsion Compound, Axum, Tigray, Ethiopia',
    },
    featuredParishes: [
      { name: 'Ancient Church of St. Mary of Tsion', nameAmharic: 'ጥንታዊቷ የአክሱም ጽዮን ቤተ ክርስቲያን', city: 'Axum', established: '4th Century AD' },
      { name: 'Chapel of the Tablet (Tabot of Zion)', nameAmharic: 'የታቦተ ጽዮን ማደሪያ', city: 'Axum Sanctuary', established: '1965 AD' },
      { name: 'Abba Pentelewon Monastery', nameAmharic: 'አባ ጰንጠሌዎን ገዳም', city: 'Axum Cliffs', established: '5th Century AD' },
      { name: 'Abba Garima Monastery', nameAmharic: 'አባ ገሪማ ገዳም (የዓለም ጥንታዊው ወንጌል)', city: 'Adwa / Axum', established: '494 AD' }
    ]
  },
  {
    id: 'shewa-debre-libanos',
    slug: 'debre-libanos-shewa',
    nameAmharic: 'የሰሜንና ደቡብ ሸዋ (ደብረ ሊባኖስ) ሀገረ ስብከት',
    nameEnglish: 'Diocese of Shewa & See of Debre Libanos',
    seeCity: 'Debre Libanos',
    archbishopAmharic: 'ብፁዕ አቡነ ቄርሎስ',
    archbishopEnglish: 'His Grace Archbishop Abune Qerlos',
    cathedral: 'Debre Libanos Great Monastery (ደብረ ሊባኖስ አንድነት ገዳም)',
    cathedralAmharic: 'ደብረ አሥራት ደብረ ሊባኖስ ካቴድራል',
    consecrationYear: '2012 AD',
    parishesCount: 220,
    monasteriesCount: 45,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'Supreme historic monastic seat of the Ichege of Debre Libanos, established by Saint Tekle Haymanot in the 13th century.',
    historySummary: 'Founded in 1284 AD by Saint Tekle Haymanot, Debre Libanos served for centuries as the highest monastic authority and spiritual fortress of the realm.',
    contactInfo: {
      phone: '+251 11 890 3211',
      email: 'debrelibanos@eotc.org',
      address: 'Debre Libanos Monastery Compound, North Shewa, Ethiopia'
    },
    featuredParishes: [
      { name: 'Debre Libanos Cave & Sanctuary', nameAmharic: 'የአቡነ ተክለ ሃይማኖት ዋሻና ገዳም', city: 'Debre Libanos', established: '1284 AD' },
      { name: 'Debre Berhan Selassie (Shewa)', nameAmharic: 'ደብረ ብርሃን ሥላሴ', city: 'Debre Berhan', established: '15th Century' },
      { name: 'Fitche St. Michael', nameAmharic: 'ፍቼ ቅዱስ ሚካኤል', city: 'Fitche', established: '1888 AD' }
    ]
  },
  {
    id: 'gondar',
    slug: 'gondar-tana',
    nameAmharic: 'የጎንደር ሀገረ ስብከት',
    nameEnglish: 'Archdiocese of Gondar & Lake Tana',
    seeCity: 'Gondar',
    archbishopAmharic: 'ብፁዕ አቡነ ሳሙኤል',
    archbishopEnglish: 'His Eminence Archbishop Abune Samuel',
    cathedral: 'Debre Berhan Selassie Church (ደብረ ብርሃን ሥላሴ ጎንደር)',
    cathedralAmharic: 'ደብረ ብርሃን ሥላሴ ካቴድራል',
    consecrationYear: '2008 AD',
    parishesCount: 310,
    monasteriesCount: 65,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'Imperial ecclesiastical heartland famous for Debre Berhan Selassie murals and sacred island monasteries across Lake Tana.',
    historySummary: 'Elevated as the imperial religious capital under Emperor Fasilides in 1632, housing 44 churches and master scribal schools.',
    contactInfo: {
      phone: '+251 58 111 2040',
      email: 'gondar.diocese@eotc.org',
      address: 'Gondar Chancellery, Gondar, Amhara, Ethiopia'
    },
    featuredParishes: [
      { name: 'Debre Berhan Selassie (Murals of 100 Angel Faces)', nameAmharic: 'ደብረ ብርሃን ሥላሴ', city: 'Gondar', established: '1690 AD' },
      { name: 'Daga Estifanos Monastery', nameAmharic: 'ዳጋ እስጢፋኖስ (የነገሥታት መካነ መቃብር)', city: 'Lake Tana Island', established: '13th Century' },
      { name: 'Ura Kidane Mehret Monastery', nameAmharic: 'ኡራ ኪዳነ ምሕረት ገዳም', city: 'Zege Peninsula', established: '14th Century' }
    ]
  },
  {
    id: 'wollo-lalibela',
    slug: 'lalibela-wollo',
    nameAmharic: 'የሰሜን ወሎ (ሮሃ ላሊበላ) ሀገረ ስብከት',
    nameEnglish: 'Diocese of North Wollo & Lalibela',
    seeCity: 'Lalibela / Woldiya',
    archbishopAmharic: 'ብፁዕ አቡነ ፊልጶስ',
    archbishopEnglish: 'His Grace Archbishop Abune Philipos',
    cathedral: 'Bete Medhane Alem (ቤተ መድኃኔ ዓለም — World’s Largest Monolithic Church)',
    cathedralAmharic: 'ቤተ መድኃኔ ዓለም ላሊበላ',
    consecrationYear: '2014 AD',
    parishesCount: 195,
    monasteriesCount: 52,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'Home of the 12th-century UNESCO rock-hewn monolithic churches built by King Saint Lalibela as an African New Jerusalem.',
    historySummary: 'Constructed between 1181 and 1221 AD during the Zagwe Dynasty, carving 11 monolithic sanctuaries out of living volcanic rock.',
    contactInfo: {
      phone: '+251 33 336 0012',
      email: 'lalibela.diocese@eotc.org',
      address: 'Roha Lalibela Sanctuary, North Wollo, Ethiopia'
    },
    featuredParishes: [
      { name: 'Bete Giyorgis (Church of St. George Cross)', nameAmharic: 'ቤተ ጊዮርጊስ ላሊበላ', city: 'Lalibela', established: '12th Century' },
      { name: 'Bete Medhane Alem', nameAmharic: 'ቤተ መድኃኔ ዓለም', city: 'Lalibela', established: '12th Century' },
      { name: 'Asheten Maryam Monastery', nameAmharic: 'አሸተን ማርያም ገዳም', city: 'Mount Asheten', established: '13th Century' }
    ]
  },
  {
    id: 'gojjam',
    slug: 'gojjam-debre-markos',
    nameAmharic: 'የምሥራቅና ምዕራብ ጎጃም ሀገረ ስብከት',
    nameEnglish: 'Archdiocese of East & West Gojjam',
    seeCity: 'Debre Markos',
    archbishopAmharic: 'ብፁዕ አቡነ ዲዮስቆሮስ',
    archbishopEnglish: 'His Eminence Archbishop Abune Dioscoros',
    cathedral: 'Debre Markos St. Mark Cathedral (ደብረ ማርቆስ ቅዱስ ማርቆስ)',
    cathedralAmharic: 'ደብረ ማርቆስ ካቴድራል',
    consecrationYear: '2006 AD',
    parishesCount: 260,
    monasteriesCount: 40,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'Renowned center of traditional Zema, Aquaquam schools, and monastic ascetics along the Blue Nile gorge.',
    historySummary: 'The historic heart of traditional Ge’ez liturgical schools, preserving the musical traditions of Saint Yared for generations.',
    contactInfo: {
      phone: '+251 58 771 1420',
      email: 'gojjam.diocese@eotc.org',
      address: 'Debre Markos Chancellery, Gojjam, Ethiopia'
    },
    featuredParishes: [
      { name: 'Debre Markos St. Mark Cathedral', nameAmharic: 'ቅዱስ ማርቆስ ካቴድራል', city: 'Debre Markos', established: '1869 AD' },
      { name: 'Mertule Maryam Monastery', nameAmharic: 'መርጡለ ማርያም ገዳም', city: 'East Gojjam', established: '4th Century AD' },
      { name: 'Debre Elias St. Elias', nameAmharic: 'ደብረ ኤልያስ', city: 'Debre Elias', established: '15th Century' }
    ]
  },
  {
    id: 'hararge',
    slug: 'hararge-kulubi',
    nameAmharic: 'የሐረርጌና ድሬዳዋ ሀገረ ስብከት',
    nameEnglish: 'Diocese of Hararge & Dire Dawa',
    seeCity: 'Harar',
    archbishopAmharic: 'ብፁዕ አቡነ ገብርኤል',
    archbishopEnglish: 'His Grace Archbishop Abune Gabriel',
    cathedral: 'Kulubi Saint Gabriel Pilgrimage Sanctuary (ቁልቢ ቅዱስ ገብርኤል)',
    cathedralAmharic: 'ደብረ ኃይል ቁልቢ ቅዱስ ገብርኤል',
    consecrationYear: '2010 AD',
    parishesCount: 85,
    monasteriesCount: 12,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'Eastern ecclesiastical bastion with St. Gabriel of Kulubi pilgrimage sanctuary drawing millions of pilgrims biannually.',
    historySummary: 'Established to minister across eastern Ethiopia, featuring the historic Kulubi sanctuary constructed under Ras Makonnen.',
    contactInfo: {
      phone: '+251 25 666 4010',
      email: 'harar.diocese@eotc.org',
      address: 'Harar Chancellery, Harar, Ethiopia'
    },
    featuredParishes: [
      { name: 'Kulubi St. Gabriel Pilgrimage Sanctuary', nameAmharic: 'ቁልቢ ቅዱስ ገብርኤል ገዳም', city: 'Kulubi, Hararge', established: '1892 AD' },
      { name: 'Harar Holy Trinity Cathedral', nameAmharic: 'የሐረር ቅድስት ሥላሴ ካቴድራል', city: 'Harar Jugol', established: '1887 AD' },
      { name: 'Dire Dawa St. Michael Cathedral', nameAmharic: 'ድሬዳዋ ቅዱስ ሚካኤል ካቴድራል', city: 'Dire Dawa', established: '1904 AD' }
    ]
  },
  {
    id: 'sidama-south',
    slug: 'sidama-hawassa',
    nameAmharic: 'የሲዳማና ደቡብ ኢትዮጵያ ሀገረ ስብከት',
    nameEnglish: 'Diocese of Sidama & Southern Nations',
    seeCity: 'Hawassa',
    archbishopAmharic: 'ብፁዕ አቡነ ዮሴፍ',
    archbishopEnglish: 'His Grace Archbishop Abune Yosef',
    cathedral: 'Hawassa Saint Gabriel Cathedral (ሐዋሳ ቅዱስ ገብርኤል ካቴድራል)',
    cathedralAmharic: 'ሐዋሳ ቅዱስ ገብርኤል ካቴድራል',
    consecrationYear: '2016 AD',
    parishesCount: 150,
    monasteriesCount: 18,
    region: 'Ethiopia',
    subRegion: 'Ethiopia',
    description: 'Vibrant rapidly growing diocese fostering multilingual liturgy and Sunday school youth catechism in southern Ethiopia.',
    historySummary: 'Expanded missionary outreach establishing over a hundred new parishes and theological seminaries in Hawassa, Dilla, and Arba Minch.',
    contactInfo: {
      phone: '+251 46 220 1823',
      email: 'sidama.diocese@eotc.org',
      address: 'Hawassa Chancellery, Hawassa, Sidama, Ethiopia'
    },
    featuredParishes: [
      { name: 'Hawassa St. Gabriel Cathedral', nameAmharic: 'ሐዋሳ ቅዱስ ገብርኤል ካቴድራል', city: 'Hawassa', established: '1962 AD' },
      { name: 'Debre Tsion St. Mary (Dilla)', nameAmharic: 'ዲላ ደብረ ጽዮን ማርያም', city: 'Dilla', established: '1954 AD' }
    ]
  },
  {
    id: 'north-america-east',
    slug: 'usa-east-canada',
    nameAmharic: 'የሰሜን አሜሪካ ምሥራቅ ክፍለ አህጉረ ስብከት',
    nameEnglish: 'Archdiocese of Eastern United States & Canada',
    seeCity: 'Washington, D.C.',
    archbishopAmharic: 'ብፁዕ አቡነ ፋኑኤል',
    archbishopEnglish: 'His Eminence Archbishop Abune Fanuel',
    cathedral: 'Debre Selam Kidist Mariam Cathedral (ደብረ ሰላም ቅድስት ማርያም ካቴድራል)',
    cathedralAmharic: 'ደብረ ሰላም ቅድስት ማርያም ካቴድራል (ዋሽንግተን ዲሲ)',
    consecrationYear: '2007 AD',
    parishesCount: 95,
    monasteriesCount: 5,
    region: 'Diaspora',
    subRegion: 'North America',
    description: 'The largest diaspora archdiocese preserving ancient Ge’ez rite and fostering English-language youth ministries across eastern North America.',
    historySummary: 'Established in the late 20th century to shepherd the rapidly expanding Ethiopian Orthodox diaspora in Washington D.C., New York, Atlanta, Boston, and Toronto.',
    contactInfo: {
      phone: '+1 (202) 555-0199',
      email: 'chancellery@eotcdiaspora-east.org',
      address: '1350 Buchanan St NW, Washington, DC 20011, USA',
      website: 'https://eotcdiaspora-east.org'
    },
    featuredParishes: [
      { name: 'Debre Selam Kidist Mariam Cathedral', nameAmharic: 'ደብረ ሰላም ቅድስት ማርያም ካቴድራል', city: 'Washington, DC', established: '1987 AD' },
      { name: 'Debre Bisrat St. Gabriel Church', nameAmharic: 'ደብረ ብሥራት ቅዱስ ገብርኤል', city: 'Silver Spring, MD', established: '1995 AD' },
      { name: 'Debre Genet St. Michael Cathedral', nameAmharic: 'ደብረ ገነት ቅዱስ ሚካኤል', city: 'Toronto, Canada', established: '1991 AD' },
      { name: 'Debre Medhanit Medhane Alem Church', nameAmharic: 'ደብረ መድኃኒት መድኃኔ ዓለም', city: 'Atlanta, GA', established: '1998 AD' }
    ]
  },
  {
    id: 'north-america-west',
    slug: 'usa-west',
    nameAmharic: 'የሰሜን አሜሪካ ምዕራብ ክፍለ አህጉረ ስብከት',
    nameEnglish: 'Archdiocese of Western United States',
    seeCity: 'Los Angeles / Oakland',
    archbishopAmharic: 'ብፁዕ አቡነ ጴጥሮስ',
    archbishopEnglish: 'His Grace Archbishop Abune Petros',
    cathedral: 'Debre Mewi Kidus Gabriel Cathedral (ደብረ መዊዕ ቅዱስ ገብርኤል ካቴድራል)',
    cathedralAmharic: 'ደብረ መዊዕ ቅዱስ ገብርኤል ካቴድራል',
    consecrationYear: '2011 AD',
    parishesCount: 65,
    monasteriesCount: 3,
    region: 'Diaspora',
    subRegion: 'North America',
    description: 'Serving hundreds of thousands of faithful across California, Washington, Nevada, Arizona, and Western Pacific states.',
    historySummary: 'Governs thriving diaspora parishes and youth education centers across the American West Coast.',
    contactInfo: {
      phone: '+1 (323) 555-0144',
      email: 'westdiocese@eotcdiaspora.org',
      address: 'Los Angeles / Oakland, California, USA',
      website: 'https://eotcwestusa.org'
    },
    featuredParishes: [
      { name: 'Debre Mewi Kidus Gabriel Cathedral', nameAmharic: 'ደብረ መዊዕ ቅዱስ ገብርኤል', city: 'Los Angeles, CA', established: '1993 AD' },
      { name: 'Debre Haile Kidus Gabriel', nameAmharic: 'ደብረ ኃይል ቅዱስ ገብርኤል', city: 'Seattle, WA', established: '1996 AD' },
      { name: 'Debre Genet St. Mary Church', nameAmharic: 'ደብረ ገነት ቅድስት ማርያም', city: 'Oakland, CA', established: '1989 AD' }
    ]
  },
  {
    id: 'europe-uk',
    slug: 'europe-uk',
    nameAmharic: 'የእንግሊዝና ምዕራብ አውሮፓ ሀገረ ስብከት',
    nameEnglish: 'Diocese of UK & Western Europe',
    seeCity: 'London, United Kingdom',
    archbishopAmharic: 'ብፁዕ አቡነ እንጦንስ',
    archbishopEnglish: 'His Grace Archbishop Abune Antonios',
    cathedral: 'St. Mary of Debre Tsion Cathedral (ለንደን ደብረ ጽዮን ቅድስት ማርያም ካቴድራል)',
    cathedralAmharic: 'ደብረ ጽዮን ቅድስት ማርያም ካቴድራል (ለንደን)',
    consecrationYear: '2009 AD',
    parishesCount: 45,
    monasteriesCount: 2,
    region: 'Diaspora',
    subRegion: 'Europe',
    description: 'Coordinating parishes in London, Manchester, Paris, Frankfurt, Rome, Geneva, and across Western Europe.',
    historySummary: 'Established to care for European diaspora communities, providing spiritual services in Ge’ez, Amharic, English, and French.',
    contactInfo: {
      phone: '+44 20 7555 0188',
      email: 'chancellery@eotc-europe.org',
      address: 'Debre Tsion Cathedral, London, UK',
      website: 'https://eotc-europe.org'
    },
    featuredParishes: [
      { name: 'St. Mary of Debre Tsion Cathedral', nameAmharic: 'ደብረ ጽዮን ቅድስት ማርያም', city: 'London, UK', established: '1982 AD' },
      { name: 'Debre Genet Kidist Mariam', nameAmharic: 'ደብረ ገነት ቅድስት ማርያም', city: 'Paris, France', established: '1999 AD' },
      { name: 'Debre Bisrat St. Gabriel', nameAmharic: 'ደብረ ብሥራት ቅዱስ ገብርኤል', city: 'Frankfurt, Germany', established: '2003 AD' }
    ]
  },
  {
    id: 'jerusalem-see',
    slug: 'jerusalem-holy-land',
    nameAmharic: 'የኢየሩሳሌም ገዳማትና የቅድስት ሀገር ሀገረ ስብከት',
    nameEnglish: 'Archdiocese of Jerusalem & Holy Land Monasteries',
    seeCity: 'Old City, Jerusalem',
    archbishopAmharic: 'ብፁዕ አቡነ ዕንባቆም',
    archbishopEnglish: 'His Eminence Archbishop Abune Enbakom',
    cathedral: 'Deir Es-Sultan Monastery atop the Church of the Holy Sepulchre (ዴር ሡልጣን ገዳም)',
    cathedralAmharic: 'ዴር ሡልጣን ገዳም ወመንበረ ጵጵስና',
    consecrationYear: '2004 AD',
    parishesCount: 12,
    monasteriesCount: 8,
    region: 'Historical See',
    subRegion: 'Middle East',
    description: 'Ancient millennium-old presence including the historic Deir Es-Sultan Monastery atop the Holy Sepulchre and Jordan River sanctuaries.',
    historySummary: 'Documented presence in Jerusalem since Queen of Sheba and King Solomon, and continuous monastic holding on the roof of the Holy Sepulchre since the 4th century.',
    contactInfo: {
      phone: '+972 2 628 2841',
      email: 'jerusalem.monasteries@eotc.org',
      address: 'Deir Es-Sultan Compound, Old City, Jerusalem'
    },
    featuredParishes: [
      { name: 'Deir Es-Sultan Monastery (Roof of Holy Sepulchre)', nameAmharic: 'ዴር ሡልጣን አንድነት ገዳም', city: 'Old City, Jerusalem', established: '4th Century AD' },
      { name: 'Debre Genet St. Mary Monastery', nameAmharic: 'ደብረ ገነት ቅድስት ማርያም ገዳም', city: 'West Jerusalem', established: '1888 AD' },
      { name: 'Jordan River Baptism Sanctuary', nameAmharic: 'የዮርዳኖስ ወንዝ ጥምቀት መካን', city: 'Jordan River / Qasr al-Yahud', established: 'Historic' }
    ]
  },
  {
    id: 'australia-oceania',
    slug: 'australia-new-zealand',
    nameAmharic: 'የአውስትራሊያና ኒውዚላንድ ሀገረ ስብከት',
    nameEnglish: 'Diocese of Australia & Oceania',
    seeCity: 'Melbourne / Sydney',
    archbishopAmharic: 'ብፁዕ አቡነ ዳንኤል',
    archbishopEnglish: 'His Grace Archbishop Abune Daniel',
    cathedral: 'Debre Selam Kidist Mariam Cathedral (ደብረ ሰላም ቅድስት ማርያም ሜልቦርን)',
    cathedralAmharic: 'ደብረ ሰላም ቅድስት ማርያም ካቴድራል (ሜልቦርን)',
    consecrationYear: '2015 AD',
    parishesCount: 28,
    monasteriesCount: 1,
    region: 'Diaspora',
    subRegion: 'Australia & Oceania',
    description: 'Overseeing vibrant parish communities across Melbourne, Sydney, Brisbane, Perth, and Auckland.',
    historySummary: 'Formed in the early 2000s to organize flourishing communities across Australia and New Zealand.',
    contactInfo: {
      phone: '+61 3 9555 0133',
      email: 'oceania@eotcdiaspora.org',
      address: 'Melbourne, Victoria, Australia',
      website: 'https://eotcaustralia.org'
    },
    featuredParishes: [
      { name: 'Debre Selam Kidist Mariam Cathedral', nameAmharic: 'ደብረ ሰላም ቅድስት ማርያም', city: 'Melbourne, VIC', established: '1996 AD' },
      { name: 'Debre Bisrat St. Gabriel', nameAmharic: 'ደብረ ብሥራት ቅዱስ ገብርኤል', city: 'Sydney, NSW', established: '2001 AD' },
      { name: 'St. Michael Church (Auckland)', nameAmharic: 'ቅዱስ ሚካኤል ቤተ ክርስቲያን', city: 'Auckland, NZ', established: '2008 AD' }
    ]
  },
  {
    id: 'caribbean-latin-america',
    slug: 'caribbean-latin-america',
    nameAmharic: 'የካሪቢያንና ላቲን አሜሪካ ሀገረ ስብከት',
    nameEnglish: 'Archdiocese of the Caribbean & Latin America',
    seeCity: 'Kingston, Jamaica / Port of Spain',
    archbishopAmharic: 'ብፁዕ አቡነ ማርቆስ',
    archbishopEnglish: 'His Grace Archbishop Abune Markos',
    cathedral: 'Holy Trinity Cathedral (Kingston, Jamaica)',
    cathedralAmharic: 'ቅድስት ሥላሴ ካቴድራል (ኪንግስተን ጃማይካ)',
    consecrationYear: '2018 AD',
    parishesCount: 35,
    monasteriesCount: 2,
    region: 'Diaspora',
    subRegion: 'Caribbean & Latin America',
    description: 'Established following the historic missionary visit of Emperor Haile Selassie I in 1966, serving Orthodox communities across Jamaica, Trinidad, Guyana, and Latin America.',
    historySummary: 'Founded following the imperial visit of 1966, establishing indigenous English-speaking Orthodox parish communities across the Caribbean basin.',
    contactInfo: {
      phone: '+1 (876) 555-0177',
      email: 'caribbean.diocese@eotc.org',
      address: 'Maxfield Ave, Kingston, Jamaica'
    },
    featuredParishes: [
      { name: 'Holy Trinity Cathedral', nameAmharic: 'ቅድስት ሥላሴ ካቴድራል', city: 'Kingston, Jamaica', established: '1970 AD' },
      { name: 'St. Gabriel Church', nameAmharic: 'ቅዱስ ገብርኤል', city: 'Port of Spain, Trinidad', established: '1974 AD' },
      { name: 'St. Mary Church (Guyana)', nameAmharic: 'ቅድስት ማርያም', city: 'Georgetown, Guyana', established: '1978 AD' }
    ]
  },
];

export const MOCK_DIOCESAN_NEWS: DiocesanNewsItem[] = [
  {
    id: 'dnews-1',
    dioceseId: 'addis-ababa',
    dioceseName: 'Archdiocese of Addis Ababa',
    title: 'Patriarchal Ordination of 45 New Priests and Deacons',
    titleAmharic: 'በመንበረ ፓትርያርክ ፵፭ አዳዲስ ካህናትና ዲያቆናት ተቀደሱ',
    date: 'August 12, 2026',
    category: 'Ordination',
    summary: 'His Holiness Abune Mathias presided over the sacred ordination of forty-five theological college graduates at Holy Trinity Cathedral.',
    fullStory: 'During the divine liturgy at Holy Trinity Cathedral, His Holiness Abune Mathias anointed forty-five new priests and deacons from Holy Trinity Theological University, charging them to serve in rural and urban parishes across the nation.'
  },
  {
    id: 'dnews-2',
    dioceseId: 'north-america-east',
    dioceseName: 'Archdiocese of Eastern USA & Canada',
    title: 'Annual North American Youth Catechism Conference in Washington D.C.',
    titleAmharic: 'የሰሜን አሜሪካ የወጣቶች መንፈሳዊ ጉባኤ በዋሽንግተን ተካሄደ',
    date: 'July 28, 2026',
    category: 'Youth Conference',
    summary: 'Over 1,200 youth gathered for three days of spiritual seminars, Zema workshops, and Ge’ez liturgy in Washington D.C.',
    fullStory: 'Under the presidency of Archbishop Abune Fanuel, the Eastern Archdiocese concluded its 18th annual youth conference focusing on preserving Orthodox Tewahedo dogma and identity in modern society.'
  },
  {
    id: 'dnews-3',
    dioceseId: 'wollo-lalibela',
    dioceseName: 'Diocese of North Wollo & Lalibela',
    title: 'Preservation and Roofing Project Ratified for Lalibela Monoliths',
    titleAmharic: 'የላሊበላ ፍልፍል አብያተ ክርስቲያናት ጥበቃ ፕሮጀክት ጸደቀ',
    date: 'August 5, 2026',
    category: 'Sanctuary Consecration',
    summary: 'Ecclesiastical restoration board ratifies eco-shelters preserving the basalt rock structures of Bete Medhane Alem and Bete Giyorgis.',
    fullStory: 'In collaboration with UNESCO and local heritage elders, the Holy Synod and Diocese of North Wollo inaugurated advanced non-invasive protective monitoring systems for the 11 rock-hewn wonders.'
  },
  {
    id: 'dnews-4',
    dioceseId: 'europe-uk',
    dioceseName: 'Diocese of UK & Western Europe',
    title: 'Archbishop Abune Antonios Conducts Pastoral Visit to Paris and Frankfurt',
    titleAmharic: 'ብፁዕ አቡነ እንጦንስ በፓሪስና በፍራንክፈርት ሐዋርያዊ ጉብኝት አደረጉ',
    date: 'July 15, 2026',
    category: 'Pastoral Visit',
    summary: 'Conducted Eucharistic liturgies and consecrated a new community center for the faithful in central Europe.',
    fullStory: 'His Grace Archbishop Abune Antonios administered the Holy Mysteries to hundreds of diaspora parishioners and presided over parish council installations across France and Germany.'
  },
];


export const MOCK_HISTORY_TIMELINE: ChurchHistoryMilestone[] = [
  {
    era: 'Apostolic Era',
    eraAmharic: 'የሐዋርያት ዘመን',
    period: 'c. 34 AD',
    title: 'Baptism of the Ethiopian Eunuch',
    titleAmharic: 'የኢትዮጵያዊው ጃንደረባ ጥምቀት',
    description: 'Saint Philip the Evangelist baptizes the royal treasurer of Queen Candace (Acts 8:26-39), marking Africa’s first recorded entry into Christianity.',
    keyFigures: ['Saint Philip the Evangelist', 'Eunuch Bachos (Simeon)', 'Queen Candace'],
    significance: 'Brought the Gospel of Christ to Ethiopia before the Council of Nicaea and established earliest Christian apostolic roots in Africa.',
  },
  {
    era: 'Aksumite Golden Age',
    eraAmharic: 'ዘመነ አክሱም',
    period: '330 AD',
    title: 'Frumentius (Abune Selama) Brings Christianity to Axum',
    titleAmharic: 'ክርስትና የመንግሥት ሃይማኖት መሆኑና አባ ሰላማ ከሣቴ ብርሃን',
    description: 'Saint Frumentius (Abba Salama Kesate Birhan) converts King Ezana of Aksum. St. Athanasius of Alexandria consecrates Frumentius as first Bishop of Axum and all Ethiopia.',
    keyFigures: ['Saint Frumentius (Abba Salama)', 'King Ezana', 'St. Athanasius the Apostolic'],
    significance: 'Ethiopia becomes one of the earliest official Christian sovereign nations in world history and mints the Cross on its gold coinage.',
  },
  {
    era: 'Monastic Foundations',
    eraAmharic: 'ዘመነ ተስዓቱ ቅዱሳን',
    period: '480 – 520 AD',
    title: 'Arrival of the Nine Saints (Tisatu Kidusan)',
    titleAmharic: 'የዘጠኙ ቅዱሳን መምጣትና የገዳማዊ ሕይወት መስፋፋት',
    description: 'Nine ascetic fathers fleeing Byzantine Chalcedonian persecution arrive in Aksum, establishing premier monasteries (Debre Damo, Abba Garima) and translating the 81-book Bible into Ge’ez.',
    keyFigures: ['Abba Aregawi', 'Abba Pentelewon', 'Abba Garima', 'Abba Afse'],
    significance: 'Established enduring monastic discipline, indigenous manuscript illumination, and the full translation of the Biblical Canon.',
  },
  {
    era: 'Sacred Liturgical Music',
    eraAmharic: 'ዘመነ ቅዱስ ያሬድ',
    period: '505 – 571 AD',
    title: 'Saint Yared & Liturgical Zema Revelation',
    titleAmharic: 'የቅዱስ ያሬድ ዜማ መገለጥ',
    description: 'Saint Yared receives the heavenly 3 melodic modes (Ge’ez, Ezel, Araray) through the Holy Spirit and creates the entire liturgical musical system of the Church.',
    keyFigures: ['Saint Yared', 'Emperor Gebre Meskel'],
    significance: 'Endowed the Ethiopian Church with an unparalleled indigenous musical notation and liturgical poetry system still chanted daily.',
  },
  {
    era: 'Zagwe Dynasty & Medieval Period',
    eraAmharic: 'ዘመነ ዛግዌና ፍልፍል አብያተ ክርስቲያናት',
    period: '1181 – 1221 AD',
    title: 'King Saint Lalibela & The Rock-Hewn Basalt Churches',
    titleAmharic: 'ቅዱስ ላሊበላና የሮሃ ፍልፍል አብያተ ክርስቲያናት',
    description: 'King Saint Lalibela sculpts 11 monolithic churches out of solid volcanic basalt in Roha as a New Jerusalem during Crusader conflicts in the Holy Land.',
    keyFigures: ['King Saint Lalibela', 'Queen Masqal Kibra', 'Angel Gabriel'],
    significance: 'A masterwork of engineering, prayer, and faith declared a UNESCO World Heritage site and perennial spiritual refuge.',
  },
  {
    era: 'Monastic Renaissance',
    eraAmharic: 'ዘመነ ተክለ ሃይማኖት',
    period: '1215 – 1313 AD',
    title: 'Saint Tekle Haymanot & Monastic Revival',
    titleAmharic: 'አቡነ ተክለ ሃይማኖትና የደብረ ሊባኖስ ገዳም',
    description: 'Saint Tekle Haymanot founds Debre Libanos Monastery, evangelizes central and southern Ethiopia, and establishes the office of the Ichege.',
    keyFigures: ['Saint Tekle Haymanot', 'Saint Iyasus Mo’a', 'Saint Ewostatewos'],
    significance: 'Unified theological education and preserved monastic spirituality throughout centuries of regional geopolitical transformation.',
  },
  {
    era: '16th Century Defense of Faith',
    eraAmharic: 'የ፲፮ኛው መቶ ክፍለ ዘመን የተዋሕዶ ተጋድሎ',
    period: '1529 – 1632 AD',
    title: 'Portuguese Contact & Resistance to Roman Catholic Influence',
    titleAmharic: 'የፖርቱጋል ካቶሊኮች መምጣትና የተዋሕዶ ሃይማኖት ጽናት',
    description: 'Following the devastating Gragn Ahmed wars, Portuguese Jesuit missionaries under Alfonso Mendez sought to convert Ethiopia to Roman Catholicism. Emperor Susenyos briefly accepted Roman Catholicism, triggering nationwide revolt until Emperor Fasilides expelled the Jesuits in 1632 and restored Orthodox Tewahedo as the sole faith.',
    keyFigures: ['Emperor Fasilides', 'Emperor Susenyos', 'Abba Afonso Mendez (Expelled)', 'Abune Simon'],
    significance: 'Preserved the pristine Cyril-Alexandrian Miaphysite Tewahedo Christology and national sovereignty against European colonial religious assimilation.',
  },
  {
    era: '20th Century Autocephaly & Reforms',
    eraAmharic: 'የ፳ኛው መቶ ክፍለ ዘመን ራስ ገዝነት',
    period: '1959 – 1972 AD',
    title: 'Modern Patriarchate, Autocephaly & Church Reforms',
    titleAmharic: 'የኢትዮጵያ ፓትርያርክ መሾምና ዘመናዊ መንፈሳዊ ተሐድሶ',
    description: 'Agreement with the Coptic Church elevates Abune Basilios as 1st Ethiopian-born Patriarch. Martyr Patriarch Abune Theophilos enacts the Kale Awadi charter, expands Sunday school youth education, and builds theological colleges.',
    keyFigures: ['Abune Basilios', 'Abune Theophilos (Martyr)', 'Emperor Haile Selassie I', 'Pope Cyril VI'],
    significance: 'Granted full ecclesiastical autocephaly and sovereign Holy Synod governance to the Ethiopian Orthodox Tewahedo Church.',
  },
  {
    era: 'Present Day Global Era',
    eraAmharic: 'የአሁኑ ዘመን — ዓለም አቀፍ ስብከተ ወንጌል',
    period: '2013 – Present',
    title: 'Global Diaspora Expansion & Digital Ministry',
    titleAmharic: 'ዓለም አቀፍ አህጉረ ስብከትና የዲጂታል ዘመን ስብከተ ወንጌል',
    description: 'Historic 2018 Synod reunification, establishment of 14 global archdioceses in the Americas, Europe, and Australia, digitization of ancient Ge’ez manuscripts, and multilingual youth catechism.',
    keyFigures: ['His Holiness Abune Mathias I', 'Abune Merkorios', 'The Global Holy Synod'],
    significance: 'Flourishing international communion reaching 60+ million faithful through traditional liturgy, digital archives, and diaspora sanctuaries.',
  },
];

export const MOCK_SAINTS: SaintProfile[] = [
  {
    id: 'theotokos-kidane-mehret',
    nameAmharic: 'እመቤታችን ቅድስት ድንግል ማርያም (ኪዳነ ምሕረት)',
    nameEnglish: 'Holy Virgin Mary (Covenant of Mercy - Kidane Mehret)',
    category: 'Theotokos (St. Mary)',
    title: 'The Mother of God & Queen of Heaven and Earth',
    feastDay: 'Yekatit 16 (ኪዳነ ምሕረት)',
    ethiopianMonth: 'Yekatit',
    ethiopianDay: 16,
    gregorianDate: 'February 23',
    century: '1st Century (Theotokos)',
    iconUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Nazareth, Galilee / Mount Golgotha',
    shortBio: 'The Holy Mother of God who received the divine promise and everlasting Covenant of Mercy (ኪዳነ ምሕረት) from her Beloved Son Jesus Christ on Mount Golgotha, promising salvation and mercy to whoever commemorates her name or performs acts of charity in her honor.',
    contributions: 'Intercessor for all humanity; spiritual fountainhead of the Ethiopian Orthodox Tewahedo Church devotion and Marian hymnody (Waddase Maryam & Anaphora of Mary).',
    miracles: [
      'The Covenant given on Golgotha guaranteeing mercy to those who call upon her name.',
      'Miraculous rescue of Belay the Cannibal through a cup of water given in her name.',
      'Sustaining the desert ascetics and monks throughout millenniums of Ethiopian monastic history.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለኪ (Waddase Maryam / Praise of Mary)',
      geezText: 'ሰላም ለኪ ኦ ማርያም ድንግል፡ ምልዕተ ጸጋ እግዚአብሔር ምስሌኪ፡ ቡርክት አንቲ እምአንስት ወቡሩክ ፍሬ ከርሥኪ።',
      amharicText: 'ጸጋን የተመላሽ ሆይ ደስ ይበልሽ፡ እግዚአብሔር ከአንቺ ጋር ነውና፤ ከአንስታት መካከል ተለይተሽ የተባረክሽ ነሽ፡ የማሕፀንሽም ፍሬ የተባረከ ነው።',
      englishTranslation: 'Rejoice, O full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.'
    }
  },
  {
    id: 'theotokos-filseta',
    nameAmharic: 'እመቤታችን ቅድስት ድንግል ማርያም (ፍልሰታ)',
    nameEnglish: 'Holy Virgin Mary (Assumption / Filseta)',
    category: 'Theotokos (St. Mary)',
    title: 'Dormition, Resurrection & Glorious Bodily Assumption',
    feastDay: 'Nehase 16 (ፍልሰታ ለማርያም)',
    ethiopianMonth: 'Nehase',
    ethiopianDay: 16,
    gregorianDate: 'August 22',
    century: '1st Century (Theotokos)',
    iconUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Gethsemane, Jerusalem / Heavenly Zion',
    shortBio: 'Commemorating the 16-day fast of the Apostles culminating in the bodily Assumption (ፍልሰተ ሥጋሃ) of the Holy Theotokos into heavenly paradise in the presence of the Holy Apostles.',
    contributions: 'Inspires the nation’s beloved annual 16-day Fast of Filseta (ጾመ ፍልሰታ) observed with daily holy liturgies across all Ethiopian churches.',
    miracles: [
      'The Apostle Thomas catching the sacred Megnaze (heavenly sash) during her glorious ascent.',
      'Healing of all infirmities during the annual Filseta dawn liturgies.',
      'Angelic translation of her holy body to the Tree of Life in Paradise.'
    ],
    prayersAndHymns: {
      title: 'ማኅሌተ ጽጌ (Hymn of the Flower)',
      geezText: 'ተፈሥሒ ማርያም ድንግልተ ሥጋ ወሕሊና፡ ዘተወከፍኪ ቃልነ እምኀበ መልአክ በድንግልና።',
      amharicText: 'በሥጋም በሕሊናም ድንግል የሆንሽ ማርያም ሆይ፡ የመልአኩን ቃል በንጽሕና የተቀበልሽ ሆይ ደስ ይበልሽ።',
      englishTranslation: 'Rejoice, O Virgin Mary, pure in flesh and mind, who received the archangel’s greeting in immaculate virginity.'
    }
  },
  {
    id: 'st-george',
    nameAmharic: 'ቅዱስ ጊዮርጊስ ሊቀ ሰማዕታት',
    nameEnglish: 'Saint George the Great Martyr (Lique Sema’etat)',
    category: 'Martyrs',
    title: 'Prince of Martyrs & Champion of the Orthodox Faith',
    feastDay: 'Miyazya 23 & Hidar 7',
    ethiopianMonth: 'Miyazya',
    ethiopianDay: 23,
    gregorianDate: 'May 1',
    century: '3rd – 4th Century (c. 303 AD)',
    iconUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Lydda (Lod), Palestine / Cappadocia',
    shortBio: 'Valiant Roman military commander who openly proclaimed Christ before Emperor Diocletian and seventy pagan rulers. Endured seven years of horrific torments, was resurrected three times by Christ, and converted countless thousands before his glorious martyrdom.',
    contributions: 'Supreme patron saint and protector of Ethiopia, famously depicted on the imperial seal and at the Battle of Adwa.',
    miracles: [
      'Slaying the venomous dragon and rescuing the royal maiden of Beirut (Birutawit).',
      'Resurrected 3 times from torture by the power of our Lord Jesus Christ.',
      'Healing the blind, the crippled, and driving out demonic oppression across centuries.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለጊዮርጊስ (Salam to Saint George)',
      geezText: 'ሰላም ለከ ኦ ጊዮርጊስ ፀሐየ ጽድቅ ወብርሃነ ዓለም፡ ሰማዕት ኃያል ዘሞአ አጋንንተ ወነገሥተ ዓላውያን።',
      amharicText: 'የጽድቅ ፀሐይና የዓለም ብርሃን የሆንህ፡ አጋንንትንና ከሓድያን ነገሥታትን ድል የነሣህ ኃያሉ ሰማዕት ጊዮርጊስ ሆይ ሰላም ላንተ ይሁን።',
      englishTranslation: 'Peace be unto thee, O George, sun of righteousness and light of the world, mighty martyr who vanquished demons and tyrants.'
    }
  },
  {
    id: 'st-tekle-haymanot',
    nameAmharic: 'አቡነ ተክለ ሃይማኖት',
    nameEnglish: 'Saint Tekle Haymanot (Plant of Faith)',
    category: 'Monks & Ascetics',
    title: 'Apostle of Shewa, Father of Monasticism & First Ichege',
    feastDay: 'Nehase 24 & Tahesas 24',
    ethiopianMonth: 'Nehase',
    ethiopianDay: 24,
    gregorianDate: 'August 30',
    century: '13th Century (1215 – 1313 AD)',
    iconUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Zorare, Shewa / Debre Libanos Monastery',
    shortBio: 'The great light of Ethiopian monasticism who spent 29 years praying standing on one leg in his cell until his foot severed, receiving six wings of seraphim from our Lord. Founded Debre Libanos Monastery and evangelized central and southern Ethiopia.',
    contributions: 'Established the office of the Ichege of Debre Libanos and unified monastic theological schools.',
    miracles: [
      'Received six wings of spiritual light to soar in celestial prayer.',
      'Holy spring (Tsebel) at Debre Libanos curing chronic diseases worldwide.',
      'Converting pagans in Damot and bringing the ruler Motolomi to Christian baptism.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለተክለ ሃይማኖት (Hymn of Saint Tekle Haymanot)',
      geezText: 'ሰላም ለተክለ ሃይማኖት ተክለ ገነት ዘሐመልማለ ጽድቅ፡ ዘአዕረገ ጸሎተ ቅድመ መንበረ ስብሐት።',
      amharicText: 'የጽድቅ ልምላሜ ለሆነው ለገነት ተክል ተክለ ሃይማኖት ሰላምታ ይገባል፤ በክብር ዙፋን ፊት ጸሎቱን ያሳረገ።',
      englishTranslation: 'Peace be unto Tekle Haymanot, plant of Paradise blooming with righteousness, who offered his ceaseless prayer before the Throne of Glory.'
    }
  },
  {
    id: 'st-philip-apostle',
    nameAmharic: 'ቅዱስ ፊልጶስ ሐዋርያ (ወንጌላዊ)',
    nameEnglish: 'Saint Philip the Apostle & Evangelist',
    category: 'Apostles',
    title: 'Apostle of Christ & Evangelizer of the Ethiopian Eunuch',
    feastDay: 'Hidar 18 (ሕዳር ፲፰)',
    ethiopianMonth: 'Hidar',
    ethiopianDay: 18,
    gregorianDate: 'November 27',
    century: '1st Century (Apostolic Era)',
    iconUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Bethsaida, Galilee / Hierapolis, Phrygia',
    shortBio: 'One of the Twelve Apostles chosen by Jesus Christ. Guided by the Holy Spirit to the desert road from Jerusalem to Gaza, he explained the prophecy of Isaiah to the royal treasurer of Queen Candace and baptized him, planting the seed of Christianity in Ethiopia (Acts 8:26-39).',
    contributions: 'Brought Africa its earliest recorded apostolic baptism and translated the Gospel across Phrygia and Greece.',
    miracles: [
      'Supernaturally transported by the Spirit of the Lord from Gaza to Azotus.',
      'Healing serpent bites and demonic possessions in Hierapolis.',
      'Baptizing the Ethiopian royal official and opening Africa to the light of the Gospel.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለፊልጶስ (Salam to Saint Philip)',
      geezText: 'ሰላም ለፊልጶስ ዘሰበከ ወንጌለ በኢየሩሳሌም ወበአፍሪቃ፡ ዘአጥመቀ ጃንደረባሁ ለህንደኬ ንግሥት።',
      amharicText: 'በኢየሩሳሌምና በአፍሪቃ ወንጌልን ለሰበከ፡ የንግሥት ህንደኬን ጃንደረባ ላጠመቀ ለፊልጶስ ሰላምታ ይሁን።',
      englishTranslation: 'Peace be unto Philip who preached the Gospel in Jerusalem and Africa, and baptized the royal treasurer of Queen Candace.'
    }
  },
  {
    id: 'st-frumentius',
    nameAmharic: 'አባ ሰላማ ከሣቴ ብርሃን (ቅዱስ ፍሬምናጦስ)',
    nameEnglish: 'Saint Frumentius (Abba Salama Kesate Birhan)',
    category: 'Church Fathers',
    title: 'First Bishop of Aksum, Illuminator & Apostle of Ethiopia',
    feastDay: 'Hamle 26 & Hidar 18',
    ethiopianMonth: 'Hamle',
    ethiopianDay: 26,
    gregorianDate: 'August 2',
    century: '4th Century (c. 330 AD)',
    iconUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Tyre, Phoenicia / Aksum, Ethiopia',
    shortBio: 'Consecrated as first bishop of Ethiopia by Saint Athanasius of Alexandria. Baptized King Ezana, translated the earliest scriptures to Ge’ez, and illuminated Ethiopia with the light of Christ (Kesate Birhan).',
    contributions: 'Founded the formal clergy, diocese system, and episcopal succession in the Kingdom of Aksum.',
    miracles: [
      'Preserved safely from Red Sea shipwreck to fulfill his apostolic destiny.',
      'Dispelling pagan polytheism in Aksum through powerful spiritual illumination.',
      'Consecrating the earliest indigenous priests and translating biblical portions into Ge’ez.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለአባ ሰላማ (Salam to Abba Salama)',
      geezText: 'ሰላም ለአባ ሰላማ ከሣቴ ብርሃን ዘአብርሃ ለኢትዮጵያ፡ ዘአጥመቆ ለኢዛና ንጉሥ በስመ ሥላሴ።',
      amharicText: 'ኢትዮጵያን ላበራ ለብርሃን ገላጭ ለአባ ሰላማ ሰላምታ ይሁን፤ ንጉሥ ኢዛናን በሥላሴ ስም ያጠመቀ።',
      englishTranslation: 'Peace be unto Abba Salama, Illuminator of Ethiopia, who baptized King Ezana in the Name of the Holy Trinity.'
    }
  },
  {
    id: 'st-yared',
    nameAmharic: 'ቅዱስ ያሬድ ማኅሌታይ',
    nameEnglish: 'Saint Yared the Melodist',
    category: 'Ethiopian Saints',
    title: 'Father of Ethiopian Sacred Liturgical Music & Chants',
    feastDay: 'Ginbot 11 (ግንቦት ፲፩)',
    ethiopianMonth: 'Ginbot',
    ethiopianDay: 11,
    gregorianDate: 'May 19',
    century: '6th Century (505 – 571 AD)',
    iconUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Aksum & Semien Mountains',
    shortBio: 'Enlightened by the Holy Spirit through the songs of three heavenly birds, St. Yared created the 3 musical modes (Ge’ez, Ezel, Araray), the Diggwa hymnody, and sacred musical notations (Seraye), transforming church worship forever.',
    contributions: 'Composed the Diggwa, Tsome Diggwa, Me’eraf, Zimare, and Mewasiet liturgical books.',
    miracles: [
      'Chanted in heavenly ecstasy before King Gebre Meskel so profoundly that the king pierced Yared’s foot with his royal spear unnoticed.',
      'Ascended to the Semien Mountains into the celestial company without bodily death.',
      'Endowed with divine musical wisdom without prior human musical training.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለያሬድ (Salam to Saint Yared)',
      geezText: 'ሰላም ለያሬድ ማኅሌታይ ዘሰማየ ዜማ መላእክት፡ ዘአስተጋብአ ድጓ ወዘመረ በልሳነ መንፈስ ቅዱስ።',
      amharicText: 'የመላእክትን ዜማ ለሰማው ለማኅሌታይ ያሬድ ሰላምታ ይሁን፤ ድጓን ለሰበሰበና በመንፈስ ቅዱስ አንደበት ለዘመረ።',
      englishTranslation: 'Peace be unto Yared the Melodist who heard the heavenly songs of the angels, collected the Diggwa, and chanted with the tongue of the Holy Spirit.'
    }
  },
  {
    id: 'st-gebre-menfes-kidus',
    nameAmharic: 'አቡነ ገብረ መንፈስ ቅዱስ (ጻድቁ አቦ)',
    nameEnglish: 'Saint Gebre Menfes Kidus (Abo)',
    category: 'Monks & Ascetics',
    title: 'Great Desert Father & Protector of Wild Creatures',
    feastDay: 'Megabit 5 & Tikimt 5',
    ethiopianMonth: 'Megabit',
    ethiopianDay: 5,
    gregorianDate: 'March 14',
    century: 'Ancient Desert Father',
    iconUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Nihisa, Egypt / Mount Zequala, Shewa',
    shortBio: 'Lived for centuries in absolute ascetic solitude on Mount Zequala among sixty lions and sixty leopards. Prayed standing in the volcanic crater lake for forty days until receiving a divine covenant for the salvation of souls.',
    contributions: 'Established the sacred holy spring (Tsebel) and monastic sanctuary atop the crater of Mount Zequala.',
    miracles: [
      'Wild lions and leopards served and guarded him peacefully like gentle sheep.',
      'Plunged his eyes into the holy spring of Zequala in deep penance until God restored them.',
      'Guaranteed divine mercy to all pilgrims visiting his mountain shrine on Mount Zequala.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለገብረ መንፈስ ቅዱስ (Salam to Abo)',
      geezText: 'ሰላም ለገብረ መንፈስ ቅዱስ ባሕታዊ ዘደብረ ዝቋላ፡ ዘተጋደለ በጾም ወበጸሎት ምስለ አናብስት ወነምርት።',
      amharicText: 'በደብረ ዝቋላ ከአንበሶችና ከነብሮች ጋር በጾምና በጸሎት ለተጋደለው ለባሕታዊው ገብረ መንፈስ ቅዱስ ሰላምታ ይሁን።',
      englishTranslation: 'Peace be unto Gebre Menfes Kidus, hermit of Mount Zequala, who contended in fasting and prayer among lions and leopards.'
    }
  },
  {
    id: 'abba-aregawi',
    nameAmharic: 'አባ አረጋዊ (ዘሚካኤል)',
    nameEnglish: 'Abba Aregawi (Za-Mikael)',
    category: 'Monks & Ascetics',
    title: 'Leader of the Nine Saints & Founder of Debre Damo',
    feastDay: 'Tikimt 14 (ጥቅምት ፲፬)',
    ethiopianMonth: 'Tikimt',
    ethiopianDay: 14,
    gregorianDate: 'October 24',
    century: '5th Century (c. 480 AD)',
    iconUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Rome / Debre Damo, Tigray',
    shortBio: 'Ascended the sheer vertical cliff of Debre Damo by divine assistance (a serpent sent by the Holy Spirit) and founded Ethiopia’s most celebrated clifftop monastery, accessible only by climbing a leather rope.',
    contributions: 'Standardized communal cenobitic monasticism in northern Ethiopia and translated early biblical codices.',
    miracles: [
      'Ascended the 50-meter vertical cliff of Debre Damo atop a celestial serpent.',
      'Holy spring gushed from solid cliff rock upon his prayer.',
      'Passed into divine glory without his physical relics being seen by human eyes.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለአረጋዊ (Salam to Abba Aregawi)',
      geezText: 'ሰላም ለአረጋዊ ዘደብረ ዳሞ፡ ዘዓርገ ውስተ ደብር በገመደ ተመን በኃይለ መንፈስ ቅዱስ።',
      amharicText: 'በመንፈስ ቅዱስ ኃይል በእባብ ገመድ ወደ ተራራው ለወጣው ለደብረ ዳሞው አረጋዊ ሰላምታ ይሁን።',
      englishTranslation: 'Peace be unto Aregawi of Debre Damo, who scaled the mountain on a serpent’s cord by the power of the Holy Spirit.'
    }
  },
  {
    id: 'st-lalibela',
    nameAmharic: 'ቅዱስ ላሊበላ (ገብረ መስቀል)',
    nameEnglish: 'King Saint Lalibela (Gebre Meskel)',
    category: 'Ethiopian Saints',
    title: 'Righteous King & Builder of the New Jerusalem',
    feastDay: 'Sene 12 (ሰኔ ፲፪)',
    ethiopianMonth: 'Sene',
    ethiopianDay: 12,
    gregorianDate: 'June 19',
    century: '12th – 13th Century (1181 – 1221 AD)',
    iconUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
    monasteryOrOrigin: 'Roha (Lalibela), Wollo',
    shortBio: 'Righteous monarch of the Zagwe dynasty who lived an austere ascetic life and carved 11 monolithic churches out of solid volcanic rock assisted by holy angels in Roha.',
    contributions: 'Built the monolithic rock-hewn wonders of Lalibela, establishing a perennial African New Jerusalem.',
    miracles: [
      'Holy angels labored beside stonemasons day and night to sculpt monolithic churches.',
      'Surviving fatal poison administered by adversaries without physical harm.',
      'Carried to the third heaven to behold the heavenly Jerusalem before building Roha.'
    ],
    prayersAndHymns: {
      title: 'ሰላም ለላሊበላ (Salam to Saint Lalibela)',
      geezText: 'ሰላም ለላሊበላ ንጉሠ ኢትዮጵያ ጻድቅ፡ ዘሐነጸ አብያተ ክርስቲያናት በአእባነ ኰኵሕ።',
      amharicText: 'ከአንድ አለት ድንጋይ አብያተ ክርስቲያናትን ላነጸ ለጻድቁ የኢትዮጵያ ንጉሥ ለላሊበላ ሰላምታ ይሁን።',
      englishTranslation: 'Peace be unto Lalibela, righteous King of Ethiopia, who fashioned churches from living volcanic rock.'
    }
  },
];

export const MOCK_SYNOD_MEMBERS: SynodMember[] = [
  {
    id: 'sm-mathias',
    nameAmharic: 'ብፁዕ ወቅዱስ አቡነ ማትያስ ቀዳማዊ',
    nameEnglish: 'His Holiness Abune Mathias I',
    titleAmharic: 'ፓትርያርክ ርእሰ ሊቃነ ጳጳሳት ዘኢትዮጵያ',
    titleEnglish: 'Catholicos Patriarch & Synod President',
    dioceseAmharic: 'መንበረ ፓትርያርክና የአክሱም ጽዮን ሀገረ ስብከት',
    dioceseEnglish: 'Patriarchate & Holy See of Axum Tsion',
    region: 'Patriarchate Administration',
    roleAmharic: 'የቅዱስ ሲኖዶስ ፕሬዚዳንት',
    roleEnglish: 'President of the Holy Synod',
    consecrationYear: '1978 (Patriarch since 2013)',
    photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2_I3VebPvCG9eO2dQNAiUPUT3z6RUfKIIVoPdT1a6HT4KXDNgFZYU7iGAIHeIEk0oys5AP7OZ8JHab9h1kW_blmMQzOjGFm41zE4XKhJlw&s=10',
  },
  {
    id: 'sm-abraham',
    nameAmharic: 'ብፁዕ አቡነ አብርሃም',
    nameEnglish: 'His Eminence Archbishop Abune Abraham',
    titleAmharic: 'የጠቅላይ ቤተ ክህነት ዋና ሥራ አስኪያጅና የባሕር ዳር ሊቀ ጳጳስ',
    titleEnglish: 'General Manager of Patriarchate & Archbishop of Bahir Dar',
    dioceseAmharic: 'የባሕር ዳርና አካባቢው ሀገረ ስብከት',
    dioceseEnglish: 'Archdiocese of Bahir Dar & Lake Tana',
    region: 'Patriarchate Administration',
    roleAmharic: 'የጠቅላይ ቤተ ክህነት ዋና ሥራ አስኪያጅ',
    roleEnglish: 'Chief Executive Administrator',
    consecrationYear: '2007 GC',
    photoUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'sm-petros',
    nameAmharic: 'ብፁዕ አቡነ ጴጥሮስ (ዶ/ር)',
    nameEnglish: 'His Eminence Archbishop Dr. Abune Petros',
    titleAmharic: 'የቅዱስ ሲኖዶስ ዋና ጸሐፊና የኒው ዮርክ ሊቀ ጳጳስ',
    titleEnglish: 'General Secretary of Holy Synod & Archbishop of New York',
    dioceseAmharic: 'የኒው ዮርክና አካባቢው ሀገረ ስብከት',
    dioceseEnglish: 'Diocese of New York & North East USA',
    region: 'Patriarchate Administration',
    roleAmharic: 'የቅዱስ ሲኖዶስ ዋና ጸሐፊ',
    roleEnglish: 'General Secretary of the Holy Synod',
    consecrationYear: '2010 GC',
    photoUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'sm-fanuel',
    nameAmharic: 'ብፁዕ አቡነ ፋኑኤል',
    nameEnglish: 'His Eminence Archbishop Abune Fanuel',
    titleAmharic: 'የዋሽንግተን ዲሲና ምሥራቅ አሜሪካ ሊቀ ጳጳስ',
    titleEnglish: 'Archbishop of Washington D.C. & Eastern USA',
    dioceseAmharic: 'የዋሽንግተን ዲሲና አካባቢው አህጉረ ስብከት',
    dioceseEnglish: 'Archdiocese of Washington D.C. & Virginia',
    region: 'Diaspora',
    roleAmharic: 'የውጭ ግንኙነት ኮሚሽን አባል',
    roleEnglish: 'Standing Commission on Foreign Relations',
    consecrationYear: '2005 GC',
    photoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'sm-samuel',
    nameAmharic: 'ብፁዕ አቡነ ሳሙኤል',
    nameEnglish: 'His Grace Archbishop Abune Samuel',
    titleAmharic: 'የልማትና ክርስቲያናዊ ተራድኦ ኮሚሽን ሊቀ ጳጳስ',
    titleEnglish: 'Archbishop & Head of Development and Inter-Church Aid Commission (DICAC)',
    dioceseAmharic: 'የጎንደር ማዕከላዊ ሀገረ ስብከት',
    dioceseEnglish: 'Archdiocese of Central Gondar',
    region: 'Ethiopia',
    roleAmharic: 'የልማት ኮሚሽን የበላይ ኃላፊ',
    roleEnglish: 'President of EOTC-DICAC',
    consecrationYear: '1998 GC',
    photoUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'sm-antonios',
    nameAmharic: 'ብፁዕ አቡነ እንጦንስ',
    nameEnglish: 'His Grace Archbishop Abune Antonios',
    titleAmharic: 'የእንግሊዝና ምዕራብ አውሮፓ ሊቀ ጳጳስ',
    titleEnglish: 'Archbishop of UK & Western Europe',
    dioceseAmharic: 'የእንግሊዝና አውሮፓ ሀገረ ስብከት',
    dioceseEnglish: 'Diocese of Great Britain, France & Germany',
    region: 'Diaspora',
    roleAmharic: 'የስብከተ ወንጌል ኮሚሽን አባል',
    roleEnglish: 'Diaspora Evangelism Council',
    consecrationYear: '2015 GC',
    photoUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'sm-enbakom',
    nameAmharic: 'ብፁዕ አቡነ ዕንባቆም',
    nameEnglish: 'His Eminence Archbishop Abune Enbakom',
    titleAmharic: 'የኢየሩሳሌም ገዳማትና የቅድስት ሀገር ሊቀ ጳጳስ',
    titleEnglish: 'Archbishop of Jerusalem & Holy Land Monasteries',
    dioceseAmharic: 'የኢየሩሳሌም ሀገረ ስብከትና የዴር ሡልጣን ገዳም',
    dioceseEnglish: 'Archdiocese of Jerusalem & Holy Land',
    region: 'Holy Land & Foreign',
    roleAmharic: 'የቅድስት ሀገር ገዳማት ጠባቂ',
    roleEnglish: 'Guardian of Holy Sepulchre Deir Es-Sultan',
    consecrationYear: '2008 GC',
    photoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'sm-markos',
    nameAmharic: 'ብፁዕ አቡነ ማርቆስ',
    nameEnglish: 'His Grace Archbishop Abune Markos',
    titleAmharic: 'የካሪቢያንና ላቲን አሜሪካ ሊቀ ጳጳስ',
    titleEnglish: 'Archbishop of the Caribbean & Latin America',
    dioceseAmharic: 'የካሪቢያን ሀገረ ስብከት (ጃማይካ/ትሪኒዳድ)',
    dioceseEnglish: 'Archdiocese of Kingston, Jamaica & Caribbean',
    region: 'Diaspora',
    roleAmharic: 'የዓለም አቀፍ ስብከተ ወንጌል ኃላፊ',
    roleEnglish: 'Caribbean Mission Director',
    consecrationYear: '2017 GC',
    photoUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
  },
];

export const MOCK_SYNOD_DECISIONS: SynodDecision[] = [
  {
    id: 'dec-1',
    titleAmharic: 'የጥቅምት ፪ሺ፲፰ ዓ.ም. የቅዱስ ሲኖዶስ ምልዓተ ጉባኤ ውሳኔዎችና መግለጫ',
    titleEnglish: 'Tikimt 2018 E.C. Plenary Holy Synod Resolutions & Communiqué',
    sessionName: 'Biannual Autumn Plenary Session',
    sessionNameAmharic: 'የጥቅምት ምልዓተ ጉባኤ',
    date: 'October 24, 2025',
    ethiopianDate: 'ጥቅምት ፲፬ ቀን ፪ሺ፲፰ ዓ.ም.',
    category: 'Canonical & Dogma',
    documentRef: 'SYNOD/DEC/2025/10',
    summary: 'The Holy Synod concluded its 10-day plenary session addressing the preservation of the 81-book canonical dogma, national peace dialogue, famine relief for affected monasteries, and new episcopal assignments.',
    keyResolutions: [
      'Unanimously reaffirmed the spiritual unity and territorial integrity of the Ethiopian Orthodox Tewahedo Church globally.',
      'Allocated 150 Million ETB for the reconstruction and emergency sustenance of ancient monasteries affected by drought and conflicts.',
      'Approved the new unified multilingual Sunday School catechism curriculum for youth in domestic and diaspora dioceses.',
      'Established a specialized digital archives commission to catalog ancient Ge’ez manuscripts with international preservation standards.',
    ],
  },
  {
    id: 'dec-2',
    titleAmharic: 'የግንቦት ፪ሺ፲፯ ዓ.ም. የቅዱስ ሲኖዶስ ይፋዊ ውሳኔዎች',
    titleEnglish: 'Ginbot 2017 E.C. Spring Plenary Holy Synod Decrees',
    sessionName: 'Biannual Spring Plenary Session',
    sessionNameAmharic: 'የግንቦት ምልዓተ ጉባኤ',
    date: 'May 28, 2025',
    ethiopianDate: 'ግንቦት ፳ ቀን ፪ሺ፲፯ ዓ.ም.',
    category: 'Diocesan Governance',
    documentRef: 'SYNOD/DEC/2025/05',
    summary: 'Focused on church administrative modernization, establishing transparent parish financial bylaws, and expanding pastoral care in Europe and Asia.',
    keyResolutions: [
      'Enacted the standardized National Parish Accounting & Transparency By-law across all 14 domestic archdioceses.',
      'Consecrated three scholar monk-fathers to serve emerging parish missions in Europe, Australia, and East Africa.',
      'Issued a solemn episcopal appeal for cessation of hostilities and the unconditional protection of holy pilgrimage sanctuaries.',
    ],
  },
  {
    id: 'dec-3',
    titleAmharic: 'የቋሚ ቅዱስ ሲኖዶስ አስቸኳይ መግለጫ ስለ ቅርሶች ጥበቃ',
    titleEnglish: 'Standing Holy Synod Executive Decree on Heritage Safeguarding',
    sessionName: 'Standing Synod Executive Session',
    sessionNameAmharic: 'የቋሚ ሲኖዶስ አስቸኳይ ስብሰባ',
    date: 'January 15, 2026',
    ethiopianDate: 'ጥር ፯ ቀን ፪ሺ፲፰ ዓ.ም.',
    category: 'Monastic Heritage',
    documentRef: 'SYNOD/DEC/2026/01',
    summary: 'Urgent directives issued to all diocesan chancelleries regarding fire prevention, security measures, and climate preservation of UNESCO rock-hewn and cave churches.',
    keyResolutions: [
      'Mandated modern non-damaging fire suppression systems for all ancient wooden and thatch monastery compounds.',
      'Formed local heritage vigilance committees comprising clergy, youth Sunday school scholars, and civil guardians.',
    ],
  },
];

export const MOCK_SYNOD_SCHEDULE: SynodScheduleSession[] = [
  {
    id: 'sch-1',
    sessionTitle: '2019 E.C. Autumn Plenary Assembly (የጥቅምት ምልዓተ ጉባኤ)',
    sessionTitleAmharic: 'የ፪ሺ፲፱ ዓ.ም. የጥቅምት ምልዓተ ጉባኤ',
    sessionType: 'Plenary Assembly',
    dates: 'October 14 – 25, 2026 (Tikimt 4 – 15, 2019 E.C.)',
    ethiopianDates: 'ጥቅምት ፬ – ፲፭ ቀን ፪ሺ፲፱ ዓ.ም.',
    venue: 'Menbere Synod Plenary Hall, Patriarchate Headquarters, Addis Ababa',
    venueAmharic: 'መንበረ ሲኖዶስ አዳራሽ፣ መንበረ ፓትርያርክ፣ አዲስ አበባ',
    status: 'Upcoming',
    agendaHighlights: [
      'Annual review of general patriarchate performance and financial audits',
      'Theological commission reports on canon translation projects',
      'Diocesan appointments and foreign mission pastoral evaluations',
      'National peace and humanitarian assistance strategy for 2019 E.C.',
    ],
  },
  {
    id: 'sch-2',
    sessionTitle: 'Standing Synod Weekly Executive Assembly (የቋሚ ሲኖዶስ ሳምንታዊ ስብሰባ)',
    sessionTitleAmharic: 'የቋሚ ሲኖዶስ ሳምንታዊ ጉባኤ',
    sessionType: 'Standing Synod',
    dates: 'Every Tuesday morning (ዘወትር ማክሰኞ)',
    ethiopianDates: 'ዘወትር ማክሰኞ ጠዋት',
    venue: 'Patriarchal Executive Chambers, Addis Ababa',
    venueAmharic: 'የፓትርያርክ ልዩ ጽሕፈት ቤት፣ አዲስ አበባ',
    status: 'In Session',
    agendaHighlights: [
      'Routine executive administration of dioceses and chancellery affairs',
      'Review of urgent parish petitions and ecclesiastical disciplinary appeals',
      'Inter-church relations and government liaison matters',
    ],
  },
  {
    id: 'sch-3',
    sessionTitle: 'Special Theological & Liturgical Commission (የሥርዓተ አምልኮ ኮሚሽን)',
    sessionTitleAmharic: 'የሥርዓተ ቤተ ክርስቲያንና ዜማ ልዩ ኮሚሽን',
    sessionType: 'Theological Commission',
    dates: 'December 5 – 8, 2026 (Hidar 26 – 29, 2019 E.C.)',
    ethiopianDates: 'ኅዳር ፳፮ – ፳፱ ቀን ፪ሺ፲፱ ዓ.ም.',
    venue: 'Holy Trinity Theological University Hall, Addis Ababa',
    venueAmharic: 'ቅድስት ሥላሴ መንፈሳዊ ዩኒቨርሲቲ አዳራሽ',
    status: 'Upcoming',
    agendaHighlights: [
      'Standardization of English & Oromo liturgical text translations with Ge’ez originals',
      'Preservation guidelines for St. Yared’s authentic Aquaquam rhythms',
    ],
  },
];

export const MOCK_HISTORICAL_SYNOD_DOCS: HistoricalSynodDocument[] = [
  {
    id: 'hdoc-1',
    title: 'The Historic Autocephaly Protocol with Alexandria (1959)',
    titleAmharic: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ራስ ገዝነት ታሪካዊ ስምምነት',
    year: '1959 AD',
    ethiopianYear: '፲፱፻፶፩ ዓ.ም.',
    category: 'Autocephaly',
    summary: 'The milestone agreement signed between Pope Cyril VI of Alexandria and Emperor Haile Selassie I / Patriarch Abune Basilios, elevating the Ethiopian Church to an independent Patriarchate with sovereign canonical authority.',
    significance: 'Ended 16 centuries of Egyptian metropolitan consecration, granting the Holy Synod power to elect and consecrate its own Catholicos Patriarch and bishops.',
    pages: 42,
  },
  {
    id: 'hdoc-2',
    title: 'The Holy Synod Constitution & Canonical Charter (1972)',
    titleAmharic: 'የቅዱስ ሲኖዶስ ቃለ ዓዋዲና የመተዳደሪያ ደንብ',
    year: '1972 AD',
    ethiopianYear: '፲፱፻፷፬ ዓ.ም.',
    category: 'Synod Constitution',
    summary: 'Formulated under Martyr Patriarch Abune Theophilos, establishing the statutory structure of the General Patriarchate, parish administrative councils, and the democratic election of synodal officers.',
    significance: 'Modernized the administrative apparatus of the Church while preserving ancient apostolic Fetha Negest canon law.',
    pages: 88,
  },
  {
    id: 'hdoc-3',
    title: 'The Washington D.C. Holy Synod Reconciliation Declaration (2018)',
    titleAmharic: 'የቅዱስ ሲኖዶስ ታሪካዊ የዕርቅና አንድነት ስምምነት',
    year: '2018 AD',
    ethiopianYear: '፪ሺ፲ ዓ.ም.',
    category: 'Reconciliation',
    summary: 'The historic covenant uniting the domestic Holy Synod in Addis Ababa and the exiled Synod in North America under the joint patriarchal fellowship of Abune Mathias and Abune Merkorios.',
    significance: 'Healed a 27-year administrative rift, restoring complete sacramental and institutional communion worldwide.',
    pages: 26,
  },
  {
    id: 'hdoc-4',
    title: 'Synodal Codification of the 81-Book Biblical Canon (1993)',
    titleAmharic: 'የሰማንያ አሐዱ (፹፩) መጻሕፍት ቀኖና ውሳኔ',
    year: '1993 AD',
    ethiopianYear: '፲፱፻፹፭ ዓ.ም.',
    category: 'Canon Law',
    summary: 'Definitive episcopal affirmation affirming the canonical authenticity of the 46 Old Testament books (including Enoch, Jubilees, Wisdom, Meqabyan) and 35 New Testament books.',
    significance: 'Preserved the unique scriptural heritage of the Ethiopian Church against foreign textual redactions.',
    pages: 64,
  },
];

export const MOCK_HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: 'hf-frumentius',
    nameAmharic: 'አባ ሰላማ ከሣቴ ብርሃን (ቅዱስ ፍሬምናጦስ)',
    nameEnglish: 'Saint Frumentius (Abba Salama Kesate Birhan)',
    era: 'Aksumite Golden Age',
    role: 'First Bishop of Aksum & Apostle of Ethiopia',
    roleAmharic: 'ቀዳማዊ ጳጳስ ዘአክሱም',
    century: '4th Century (c. 330 AD)',
    biography: 'Shipwrecked in the Red Sea as a youth, Frumentius served in the royal court of Aksum, tutored Prince Ezana, and was consecrated as the first Bishop of Ethiopia by Saint Athanasius of Alexandria in 330 AD.',
    keyContributions: 'Baptized King Ezana, formalized Christianity as the imperial faith, and translated early scriptures into Ge’ez.',
    iconUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hf-ezana',
    nameAmharic: 'ንጉሥ ኢዛና (አብርሃ)',
    nameEnglish: 'King Ezana the Great',
    era: 'Aksumite Golden Age',
    role: 'First Christian Monarch of Ethiopia',
    roleAmharic: 'ቀዳማዊ ክርስቲያን ንጉሠ ነገሥት',
    century: '4th Century (c. 320 – 360 AD)',
    biography: 'Ruler of the powerful Aksumite Empire who officially converted to Christianity in 330 AD, carving stone stelae thanking "The Lord of Heaven and Earth" and striking the Holy Cross upon gold, silver, and bronze currency.',
    keyContributions: 'Proclaimed Christianity as state religion and minted the first coins in history bearing the Christian Cross.',
    iconUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hf-nine-saints',
    nameAmharic: 'ዘጠኙ ቅዱሳን (ተስዓቱ ቅዱሳን)',
    nameEnglish: 'The Nine Saints (Roman Monastic Fathers)',
    era: 'Monastic Foundations',
    role: 'Founders of Ethiopian Monasticism & Translators',
    roleAmharic: 'የገዳማዊ ሕይወት መሥራቾች',
    century: '5th – 6th Century (c. 480 AD)',
    biography: 'Nine holy ascetics from Syria, Constantinople, and Rome who sought refuge in Aksum. Led by Abba Aregawi, they established clifftop monasteries and translated the Holy Scriptures into classical Ge’ez.',
    keyContributions: 'Founded Debre Damo and Abba Garima monasteries, translated the 81-book Canon, and anchored monasticism in Ethiopia.',
    iconUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hf-yared',
    nameAmharic: 'ቅዱስ ያሬድ ማኅሌታይ',
    nameEnglish: 'Saint Yared the Melodist',
    era: 'Sacred Liturgical Music',
    role: 'Composer of Ethiopian Sacred Liturgical Music',
    roleAmharic: 'የኢትዮጵያ ዜማ አባትና ደራሲ',
    century: '6th Century (505 – 571 AD)',
    biography: 'Enlightened by the Holy Spirit through the songs of three heavenly birds, Saint Yared created the 3 sacred melodic modes (Ge’ez, Ezel, Araray), the Me’eraf, and the Diggwa hymnody system.',
    keyContributions: 'Invented the indigenous notation symbols (Seraye) and composed the entire liturgical hymnody of the Church.',
    iconUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hf-lalibela',
    nameAmharic: 'ንጉሥ ቅዱስ ላሊበላ',
    nameEnglish: 'King Saint Lalibela',
    era: 'Zagwe Dynasty & Medieval Period',
    role: 'Righteous King & Builder of Rock-Hewn Churches',
    roleAmharic: 'ጻድቅ ንጉሥና የሮሃ ፍልፍል አብያተ ክርስቲያናት አንጻሪ',
    century: '12th – 13th Century (1181 – 1221 AD)',
    biography: 'Ascetic monarch of the Zagwe dynasty who received a divine vision to carve 11 monolithic churches out of solid volcanic rock in Roha (Lalibela), creating an African New Jerusalem.',
    keyContributions: 'Created the UNESCO World Heritage monolithic rock churches of Lalibela, establishing a perennial pilgrimage center.',
    iconUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hf-tekle-haymanot',
    nameAmharic: 'አቡነ ተክለ ሃይማኖት',
    nameEnglish: 'Saint Tekle Haymanot',
    era: 'Monastic Renaissance',
    role: 'Apostle of Shewa & Founder of Debre Libanos',
    roleAmharic: 'የሸዋ ሐዋርያና የደብረ ሊባኖስ መሥራች',
    century: '13th Century (1215 – 1313 AD)',
    biography: 'Great spiritual master who revitalized central and southern Ethiopian Christianity, founded Debre Libanos Monastery, and served as the supreme spiritual father of the realm.',
    keyContributions: 'Established the office of the Ichege, evangelized central/southern Ethiopia, and unified monastic theological schools.',
    iconUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hf-fasilides',
    nameAmharic: 'ዐፄ ፋሲለደስ (ፋሲል)',
    nameEnglish: 'Emperor Fasilides the Defender',
    era: '16th Century Defense of Faith',
    role: 'Restorer of Orthodox Tewahedo Faith in Gondar',
    roleAmharic: 'የኦርቶዶክስ ተዋሕዶ ሃይማኖት ጠባቂ',
    century: '17th Century (1632 – 1667 AD)',
    biography: 'Following years of civil turmoil caused by Jesuit attempts to force Roman Catholicism, Emperor Fasilides ascended the throne in 1632, expelled the Jesuit mission, and restored the Orthodox Tewahedo faith as the sole national religion, founding the imperial city of Gondar.',
    keyContributions: 'Defended indigenous Cyrillian Miaphysite Christology and established Gondar with dozens of historic churches.',
    iconUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'hf-basilios',
    nameAmharic: 'ብፁዕ ወቅዱስ አቡነ ባስልዮስ',
    nameEnglish: 'Abune Basilios (1st Ethiopian Patriarch)',
    era: '20th Century Autocephaly & Reforms',
    role: 'First Native Catholicos Patriarch of Ethiopia',
    roleAmharic: 'ቀዳማዊ ኢትዮጵያዊ ፓትርያርክ',
    century: '20th Century (1891 – 1970 AD)',
    biography: 'Ascended the patriarchal throne in 1959 following the historic autocephaly covenant signed with Coptic Pope Cyril VI, becoming the first native Ethiopian-born Patriarch in church history.',
    keyContributions: 'Secured full ecclesiastical autocephaly and sovereign Holy Synod governance after 1,600 years.',
    iconUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
  },
];


