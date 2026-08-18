export interface PatriarchLineage {
  number: number;
  nameAmharic: string;
  nameEnglish: string;
  reignPeriod: string;
  eraCategory: 'Ancient Apostolic Era' | 'Middle Ages' | 'Modern Patriarchs';
  keyContributions: string;
  photoUrl?: string;
}

export interface PatriarchMinistryMilestone {
  year: string;
  yearAmharic: string;
  title: string;
  titleAmharic: string;
  description: string;
}

export interface PatriarchPastoralPriority {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  iconName: string;
  description: string;
}

export interface PatriarchTeachingMessage {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  category: 'Pastoral Encyclical' | 'Feast Sermon' | 'Peace & Unity' | 'Youth & Education';
  date: string;
  ethiopianDate: string;
  occasion: string;
  summary: string;
  fullText: string;
}

export const PATRIARCH_LINEAGE: PatriarchLineage[] = [
  {
    number: 1,
    nameAmharic: 'አባ ሰላማ ከሣቴ ብርሃን (ቅዱስ ፍሬምናጦስ)',
    nameEnglish: 'St. Frumentius (Abba Salama Kesate Birhan)',
    reignPeriod: 'c. 330 – 360 AD',
    eraCategory: 'Ancient Apostolic Era',
    keyContributions: 'Consecrated first Bishop of Aksum by St. Athanasius of Alexandria; baptized King Ezana and established Christianity as the imperial state faith.',
  },
  {
    number: 2,
    nameAmharic: 'አባ ሚናስ ቀዳማዊ',
    nameEnglish: 'Abba Minas I',
    reignPeriod: 'c. 360 – 380 AD',
    eraCategory: 'Ancient Apostolic Era',
    keyContributions: 'Expanded early church dioceses, trained indigenous clergy, and advanced early Ge’ez scriptural translations.',
  },
  {
    number: 9,
    nameAmharic: 'ተስዓቱ ቅዱሳን (ዘጠኙ ቅዱሳን)',
    nameEnglish: 'The Nine Saints (Roman Monastic Fathers)',
    reignPeriod: 'c. 480 – 520 AD',
    eraCategory: 'Ancient Apostolic Era',
    keyContributions: 'Founded iconic clifftop monasteries (Debre Damo, Abba Garima), established cenobitic monastic rules, and translated the 81-book Bible into Ge’ez.',
  },
  {
    number: 13,
    nameAmharic: 'አቡነ ተክለ ሃይማኖት (እጨጌ ዘመንበረ ተክለ ሃይማኖት)',
    nameEnglish: 'Saint Tekle Haymanot (Ichege)',
    reignPeriod: '1215 – 1313 AD',
    eraCategory: 'Middle Ages',
    keyContributions: 'Founded Debre Libanos Monastery, evangelized central/southern Ethiopia, and established the sacred patriarchal See of Saint Tekle Haymanot.',
  },
  {
    number: 98,
    nameAmharic: 'አቡነ ሰላማ ሣልሳዊ',
    nameEnglish: 'Abuna Salama III',
    reignPeriod: '1841 – 1867 AD',
    eraCategory: 'Middle Ages',
    keyContributions: 'Episcopal shepherd during the era of Emperor Tewodros II; staunch defender of Orthodox Tewahedo Christology and national unity.',
  },
  {
    number: 99,
    nameAmharic: 'አቡነ ማቴዎስ ፲ኛ',
    nameEnglish: 'Abuna Matewos X',
    reignPeriod: '1889 – 1926 AD',
    eraCategory: 'Middle Ages',
    keyContributions: 'Metropolitan of Ethiopia during the Battle of Adwa (1896); blessed the imperial troops and consecrated numerous historic cathedrals.',
  },
  {
    number: 100,
    nameAmharic: 'አቡነ ባስልዮስ (ቀዳማዊ ፓትርያርክ)',
    nameEnglish: 'Abune Basilios (1st Patriarch of Ethiopia)',
    reignPeriod: '1959 – 1970 AD',
    eraCategory: 'Modern Patriarchs',
    keyContributions: 'First native Ethiopian-born Patriarch elevated after autocephaly agreement with Coptic Pope Cyril VI, ending 1,600 years of Egyptian episcopal reliance.',
  },
  {
    number: 101,
    nameAmharic: 'አቡነ ቴዎፍሎስ (፪ኛው ፓትርያርክ — ሰማዕት)',
    nameEnglish: 'Abune Theophilos (2nd Patriarch — Holy Martyr)',
    reignPeriod: '1971 – 1976 AD',
    eraCategory: 'Modern Patriarchs',
    keyContributions: 'Visionary modernizer who instituted the Holy Synod charter, established theological colleges and youth Sunday school movements; martyred for his faith in 1979.',
  },
  {
    number: 102,
    nameAmharic: 'አቡነ ተክለ ሃይማኖት (፫ኛው ፓትርያርክ)',
    nameEnglish: 'Abune Tekle Haymanot (3rd Patriarch)',
    reignPeriod: '1976 – 1988 AD',
    eraCategory: 'Modern Patriarchs',
    keyContributions: 'Humble monastic ascetic who led the Church through severe political trials and drought emergencies, championing rural evangelism.',
  },
  {
    number: 103,
    nameAmharic: 'አቡነ መርቆሬዎስ (፬ኛው ፓትርያርክ)',
    nameEnglish: 'Abune Merkorios (4th Patriarch)',
    reignPeriod: '1988 – 2022 AD',
    eraCategory: 'Modern Patriarchs',
    keyContributions: 'Co-patriarch alongside Abune Mathias following the historic 2018 Holy Synod reunification that healed 27 years of administrative schism.',
  },
  {
    number: 104,
    nameAmharic: 'አቡነ ጳውሎስ (፭ኛው ፓትርያርክ)',
    nameEnglish: 'Abune Paulos (5th Patriarch)',
    reignPeriod: '1992 – 2012 AD',
    eraCategory: 'Modern Patriarchs',
    keyContributions: 'Scholarly leader who served as President of the World Council of Churches, built the Patriarchal Palace and St. Paul Hospital, and repatriated looted national artifacts.',
  },
  {
    number: 105,
    nameAmharic: 'ብፁዕ ወቅዱስ አቡነ ማትያስ (፮ኛው ፓትርያርክና ፻፲፩ኛው ሊቀ ጳጳሳት)',
    nameEnglish: 'His Holiness Abune Mathias (6th Catholicos Patriarch)',
    reignPeriod: '2013 – Present',
    eraCategory: 'Modern Patriarchs',
    keyContributions: '6th Patriarch of Ethiopia; champion of synodal reconciliation, digital scriptural preservation, monastic development, and pastoral care for global youth.',
  },
];

export const PATRIARCH_BIO = {
  nameAmharic: 'ብፁዕ ወቅዱስ አቡነ ማትያስ ቀዳማዊ',
  nameEnglish: 'His Holiness Abune Mathias I',
  titleAmharic: 'ፓትርያርክ ርእሰ ሊቃነ ጳጳሳት ዘኢትዮጵያ ሊቀ ጳጳስ ዘአክሱም ወእጨጌ ዘመንበረ ተክለ ሃይማኖት',
  titleEnglish: 'Catholicos Patriarch of Ethiopia, Archbishop of Axum and Ichege of the See of Saint Tekle Haymanot',
  birthName: 'Teklemariam Asrat',
  birthDate: '1941 E.C. (1948 GC)',
  birthPlace: 'Seza, Agame, Tigray, Ethiopia',
  enthronementDate: 'Megabit 24, 2005 E.C. (March 3, 2013 GC)',
  enthronementLocation: 'Holy Trinity Cathedral (መንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል), Addis Ababa',
  photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl2_I3VebPvCG9eO2dQNAiUPUT3z6RUfKIIVoPdT1a6HT4KXDNgFZYU7iGAIHeIEk0oys5AP7OZ8JHab9h1kW_blmMQzOjGFm41zE4XKhJlw&s=10',
  heroBannerUrl: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=1600',
  summary: 'His Holiness Abune Mathias was born Teklemariam Asrat in 1941 E.C. in Tigray. Ordained as a deacon at a young age at Chohé Monastery, he dedicated his entire youth to ascetic monasticism, Ge’ez poetry (Qine), and biblical exegesis. He served as the Archbishop of Jerusalem and Archbishop of North America before his election in 2013 as the 6th Patriarch of the Ethiopian Orthodox Tewahedo Church.',
  lifeStory: `His Holiness was born in Seza, in the historic Agame district. At an early age, he entered the renowned monastery of Debre Chohé (ደብረ ጮሔ), where he completed traditional church education in Saint Yared’s sacred hymnody (Zema), Ge'ez grammar, and ecclesiastical philosophy. 
  
  In 1971 E.C., he was consecrated as Bishop of Jerusalem by His Holiness Abune Tekle Haymanot, serving the ancient Ethiopian monastic brotherhood in the Holy Land (including Deir Es-Sultan at the Church of the Holy Sepulchre). Later, he was appointed Archbishop of North America, where he established scores of new parishes, consecrated churches across the United States and Canada, and fostered youth ministry programs.
  
  On February 28, 2013 (የካቲት ፳፩ ቀን ፪ሺ፭ ዓ.ም.), following the passing of Patriarch Abune Paulos, the Holy Synod and the General Electoral Assembly of the Ethiopian Orthodox Tewahedo Church elected Abune Mathias as the 6th Patriarch and 111th Archbishop of Axum with an overwhelming majority. He was formally enthroned on March 3, 2013 at Holy Trinity Cathedral in Addis Ababa with the presence of sister Oriental Orthodox Patriarchs.`,
  
  ministryMilestones: [
    {
      year: '1965 GC',
      yearAmharic: '፲፱፻፶፯ ዓ.ም.',
      title: 'Monastic Tonsure & Ordination',
      titleAmharic: 'ምንኩስናና ቅስና መቀበል',
      description: 'Took monastic vows at Chohé Monastery and was ordained as an Orthodox priest after mastering church liturgy.',
    },
    {
      year: '1978 GC',
      yearAmharic: '፲፱፻፸ ዓ.ም.',
      title: 'Consecration as Bishop of Jerusalem',
      titleAmharic: 'የኢየሩሳሌም ጳጳስ ሆነው መሾም',
      description: 'Consecrated Bishop of Jerusalem, stewarding the historic rights of the Ethiopian Church at the Holy Sepulchre.',
    },
    {
      year: '1992 GC',
      yearAmharic: '፲፱፻፹፬ ዓ.ም.',
      title: 'Archbishop of North America',
      titleAmharic: 'የሰሜን አሜሪካ ሊቀ ጳጳስ',
      description: 'Led explosive pastoral expansion across the United States and Canada, establishing over 60 new diocesan parishes.',
    },
    {
      year: '2013 GC',
      yearAmharic: '፪ሺ፭ ዓ.ም.',
      title: 'Patriarchal Election & Enthronement',
      titleAmharic: 'የፓትርያርክነት ምርጫና ሢመት',
      description: 'Elected unanimously as the 6th Patriarch of Ethiopia and 111th successor to Saint Frumentius on the See of Axum.',
    },
    {
      year: '2018 GC',
      yearAmharic: '፪ሺ፲ ዓ.ም.',
      title: 'Historic Synod Reconciliation',
      titleAmharic: 'የቅዱስ ሲኖዶስ ታሪካዊ ዕርቅ',
      description: 'Reunified the Holy Synod in Washington D.C. and Addis Ababa, welcoming home exiled fathers and ending 27 years of division.',
    },
  ] as PatriarchMinistryMilestone[],

  pastoralPriorities: [
    {
      id: 'p1',
      titleAmharic: 'የወጣቶችና ሰንበት ትምህርት ቤቶች መጠናከር',
      titleEnglish: 'Youth Catechesis & Sunday Schools',
      iconName: 'Users',
      description: 'Anchoring new generations in the 81-book canon, Orthodox dogmatic theology, and multilingual diaspora education.',
    },
    {
      id: 'p2',
      titleAmharic: 'ሰላምና ብሔራዊ ዕርቅ',
      titleEnglish: 'Peace, Reconciliation & Unity',
      iconName: 'ShieldCheck',
      description: 'Active apostolic mediation for peace, inter-community harmony, and safeguarding innocent lives across all dioceses.',
    },
    {
      id: 'p3',
      titleAmharic: 'የገዳማትና የብራና ቅርስ ጥበቃ',
      titleEnglish: 'Monastic Heritage & Digital Preservation',
      iconName: 'BookOpen',
      description: 'Modern archival digitization of ancient Ge’ez manuscripts and safeguarding historic rural monasteries.',
    },
    {
      id: 'p4',
      titleAmharic: 'ዓለም አቀፍ ሐዋርያዊ አገልግሎት',
      titleEnglish: 'Global Apostolic Mission & Evangelism',
      iconName: 'Globe',
      description: 'Expanding pastoral coverage to faithful across Europe, the Americas, Middle East, Australia, and the Caribbean.',
    },
  ] as PatriarchPastoralPriority[],

  latestPastoralLetter: {
    refNumber: 'EOTC/PAT/2026/08',
    title: 'Patronal Pastoral Decree on Filseta Fasting, National Peace & Youth Outreach',
    titleAmharic: 'የጾመ ፍልሰታ ቃለ ምዕዳን፡ ስለ ሰላም፣ ስለ ፍቅርና ስለ ወጣቶች መንፈሳዊ ጥንካሬ',
    date: 'August 10, 2026',
    ethiopianDate: 'ነሐሴ ፬ ቀን ፪ሺ፲፰ ዓ.ም.',
    readTime: '4 min read',
    excerpt: 'To all venerable archbishops, bishops, priests, deacons, monastics, and faithful children of the Holy Ethiopian Orthodox Tewahedo Church throughout Ethiopia and the global diaspora: Grace, peace, and love from God our Lord Jesus Christ.',
    fullText: `በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን።
    
በሀገር ውስጥና በውጭ ሀገር የምትገኙ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ሊቃነ ጳጳሳት፣ ኤጲስ ቆጶሳት፣ ካህናት፣ ዲያቆናት፣ መነኮሳትና ምእመናን በሙሉ፤

እግዚአብሔር አምላካችን በቸርነቱ ጠብቆ ለከበረው ለጾመ ፍልሰተ ድንግል ማርያም በሰላም ስላደረሰን ስሙ የተመሰገነ ይሁን። 

፩. ስለ ጾም እና ጸሎት አስፈላጊነት፡
ይህ የተቀደሰ የጾም ወራት የእመቤታችን የቅድስት ድንግል ማርያምን ትንሣኤና ዕርገት የምናስብበት፣ ራሳችንን በንስሐ የምናነጻበት እና ለሀገራችን ሰላም አጥብቀን የምንማጸንበት ወቅት ነው። እያንዳንዱ ምእመን በጾም፣ በጸሎት፣ በምጽዋትና በመተሳሰብ እንዲተጋ አባታዊ ጥሪያችንን እናስተላልፋለን።

፪. ስለ ሀገራዊ ሰላምና አንድነት፡
ሰላም የእግዚአብሔር ስጦታ ነው። ሰላም በሌለበት መንፈሳዊና ማኅበራዊ ሕይወት ሊለመልም አይችልም። በመሆኑም ሁሉም ወገን ከጥላቻ፣ ከመለያየትና ከግጭት ርቆ ፍቅርንና አንድነትን እንዲያጸና እናሳስባለን። የቤተ ክርስቲያናችን ልጆች የሰላም መልእክተኞች ሁኑ።

፫. ለወጣቱ ትውልድ የቀረበ አባታዊ ጥሪ፡
በዩኒቨርሲቲዎችና በውጭ ሀገራት የምትገኙ ወጣቶች ቤተ ክርስቲያን ተስፋ የምታደርግባችሁ የነገዋ ዓምዶች ናችሁ። ዘመኑ በፈጠረው የዲጂታል ቴክኖሎጂ ተጠቅማችሁ የእግዚአብሔርን ቃል እንድታስተምሩ፣ ታሪክና ባህላችሁን እንድትጠብቁ፣ ከተሳሳተ የሐሰት ወሬና መከፋፈል እንድትጠበቁ አደራ እንላለን።

የእመቤታችን የቅድስት ድንግል ማርያም አማላጅነት፣ የቅዱሳን ሁሉ ጸሎትና በረከት ከሁላችን ጋር ይሁን። አሜን።

ብፁዕ ወቅዱስ አቡነ ማትያስ ቀዳማዊ
ፓትርያርክ ርእሰ ሊቃነ ጳጳሳት ዘኢትዮጵያ ሊቀ ጳጳስ ዘአክሱም ወእጨጌ ዘመንበረ ተክለ ሃይማኖት`,
  },
};

export const PATRIARCH_TEACHINGS: PatriarchTeachingMessage[] = [
  {
    id: 't1',
    titleAmharic: 'የመስቀል ደመራ በዓል ቃለ ምዕዳን',
    titleEnglish: 'Feast of the Holy Cross (Meskel Demera) Address',
    category: 'Feast Sermon',
    date: 'September 27, 2025',
    ethiopianDate: 'መስከረም ፲፯ ቀን ፪ሺ፲፰ ዓ.ም.',
    occasion: 'Meskel Square Patriarchal Blessing, Addis Ababa',
    summary: 'His Holiness elucidates the victory of the True Cross over darkness and calls upon the nation to reconcile and shine with Christian charity.',
    fullText: 'The Holy Cross is not merely an emblem of history, but the living weapon of divine reconciliation and victory over death. As Queen Helena unearthed the Cross with incense and faith, let us unearth love, peace, and brotherhood across our communities.',
  },
  {
    id: 't2',
    titleAmharic: 'ስለ ቤተ ክርስቲያን አንድነትና ቅዱስ ሲኖዶስ ውሳኔዎች',
    titleEnglish: 'Encyclical on Church Unity & Canonical Synod Integrity',
    category: 'Pastoral Encyclical',
    date: 'May 15, 2025',
    ethiopianDate: 'ግንቦት ፯ ቀን ፪ሺ፲፯ ዓ.ም.',
    occasion: 'Patriarchate Plenary Assembly, Menbere Synod',
    summary: 'A direct message reiterating the unalterable canonical order of the Ethiopian Orthodox Tewahedo Church and rejecting uncanonical regional fractures.',
    fullText: 'The Holy Ethiopian Orthodox Church is one and undivided from Axum to Moyale, from Washington to Jerusalem. No geopolitical circumstance shall divide the sacred body of Christ or compromise our 1,700-year canonical heritage.',
  },
  {
    id: 't3',
    titleAmharic: 'ስለ ወጣቶች ተሳትፎና የዲጂታል ዘመን ስብከተ ወንጌል',
    titleEnglish: 'Keynote on Youth Evangelism in the Digital Age',
    category: 'Youth & Education',
    date: 'January 10, 2026',
    ethiopianDate: 'ጥር ፪ ቀን ፪ሺ፲፰ ዓ.ም.',
    occasion: 'Annual Mahbere Kidusan Youth Theological Symposium',
    summary: 'A passionate charge to Orthodox youth in university campuses to master Ge’ez scholarship, defend faith online, and embody humility.',
    fullText: 'We call upon all Sunday School scholars and university youth to employ contemporary communication channels to illuminate the world with the ancient wisdom of St. Yared, the St. Paul epistles, and the virtues of our monastic fathers.',
  },
  {
    id: 't4',
    titleAmharic: 'የትንሣኤ በዓል ቃለ ቡራኬ (ፋሲካ)',
    titleEnglish: 'Holy Pascha (Fasika Resurrection) Patriarchal Proclamation',
    category: 'Feast Sermon',
    date: 'May 4, 2025',
    ethiopianDate: 'ሚያዝያ ፳፮ ቀን ፪ሺ፲፯ ዓ.ም.',
    occasion: 'Easter Vigil, Holy Trinity Cathedral',
    summary: 'Proclaiming Christ’s triumph over death and encouraging all who suffer from sorrow, exile, and poverty with resurrection hope.',
    fullText: 'Kristos Tensi’a Em Mutan — Christ is Risen from the dead! By His death He trampled death. Let everyone who walks in darkness embrace the unquenchable light of the Risen Lord.',
  },
  {
    id: 't5',
    titleAmharic: 'ለዓለም አቀፍ ኦርቶዶክስ ጉባኤ የተላለፈ መልእክት',
    titleEnglish: 'Message to the Standing Conference of Oriental Orthodox Churches',
    category: 'Peace & Unity',
    date: 'November 20, 2025',
    ethiopianDate: 'ኅዳር ፲፩ ቀን ፪ሺ፲፰ ዓ.ም.',
    occasion: 'Cairo Ecumenical Patriarchal Assembly',
    summary: 'Reflecting on shared Alexandrian-Antiochene-Ethiopian Christology and collective pastoral response to humanitarian crises.',
    fullText: 'As sister Oriental Orthodox Churches preserving Saint Cyril’s confession of the One Incarnate Nature of God the Word, we stand united in defense of persecuted Christians and global peace.',
  },
];
