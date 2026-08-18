/* ═══════════════════════════════════════════════════════════════
   EOTC — Comprehensive Mock Data for Giving & Stewardship
═══════════════════════════════════════════════════════════════ */

export interface CampaignUpdate {
  date: string;
  ethiopianDate: string;
  title: string;
  body: string;
}

export interface BudgetBreakdownItem {
  category: string;
  percentage: number;
  amountETB: number;
}

export interface Campaign {
  id: string;
  slug: string;
  titleAmharic: string;
  titleEnglish: string;
  targetAmountETB: number;
  raisedAmountETB: number;
  donorsCount: number;
  daysRemaining: number;
  category: 'Heritage Restoration' | 'Education & Archive' | 'Community Support' | 'Humanitarian Relief';
  image: string;
  description: string;
  longDescriptionEn: string;
  longDescriptionAm: string;
  organizer: string;
  leadBishop: string;
  updates: CampaignUpdate[];
  budgetBreakdown: BudgetBreakdownItem[];
  bankAccounts: { bank: string; account: string; branch: string }[];
}

export interface Monastery {
  id: string;
  slug: string;
  nameAmharic: string;
  nameEnglish: string;
  diocese: string;
  location: string;
  centuryFounded: string;
  monksCount: number;
  nunsCount?: number;
  monthlyTargetETB: number;
  raisedMonthlyETB: number;
  currentSponsors: number;
  image: string;
  needDescription: string;
  urgentNeeds: string[];
  historySummary: string;
  dailyRoutine: string;
}

export interface GeneralFundPillar {
  id: string;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;
  iconName: string;
  percentageAllocation: number;
  annualBudgetETB: number;
}

export interface DonorHistoryItem {
  id: string;
  date: string;
  designation: string;
  designationAm: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  receiptNumber: string;
  status: 'Completed' | 'Recurring Active' | 'Processing';
  taxDeductible: boolean;
}

export interface RecurringPledge {
  id: string;
  designation: string;
  amount: number;
  currency: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annually';
  nextBillingDate: string;
  paymentMethod: string;
  status: 'Active' | 'Paused';
}

/* ── Active Campaigns ────────────────────────────────────────── */
export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c-1',
    slug: 'lalibela-restoration-2026',
    titleAmharic: 'የላሊበላ አብያተ ክርስቲያናት ጥገናና እንክብካቤ',
    titleEnglish: 'Lalibela Rock-Hewn Churches Emergency Preservation Fund',
    targetAmountETB: 50000000,
    raisedAmountETB: 38450000,
    donorsCount: 5420,
    daysRemaining: 34,
    category: 'Heritage Restoration',
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=1000',
    description: 'Preserving the 12th-century UNESCO World Heritage rock-hewn holy churches of Saint Lalibela against weathering, geological micro-fractures, and rain erosion.',
    longDescriptionEn:
      'The eleven monolithic rock-hewn churches of Roha (Lalibela), carved in the 12th century under King Lalibela, are an irreplaceable treasure of the Ethiopian Orthodox Tewahedo Church and all humanity. This Holy Synod emergency fund finances non-invasive geological reinforcement, drainage diversion, restoration of centuries-old fresco pigments in Biete Mariam, and eco-friendly protective shelters designed in consultation with world heritage structural engineers.',
    longDescriptionAm:
      'በ፲፪ኛው መቶ ክፍለ ዘመን በቅዱስ ላሊበላ የታነጹት ዐሥራ አንዱ አብያተ ክርስቲያናት በዝናብና በከባቢ አየር ለውጥ ሳቢያ ጉዳት እንዳይደርስባቸው የሚደረግ የድንገተኛ ጥበቃ ፕሮጀክት። ይህ ፈንድ የዓለት ጥገና፣ የፍሳሽ ማስወገጃ፣ እንዲሁም የቤተ ማርያም ጥንታዊ ሥዕላት ዕድሳትን ያካትታል።',
    organizer: 'Holy Synod Heritage Protection Department & Lalibela Diocese',
    leadBishop: 'His Grace Abune Ermias, Archbishop of North Wollo & Lalibela',
    updates: [
      {
        date: 'Aug 10, 2026',
        ethiopianDate: 'ነሐሴ ፬, ፳፻፲፰ ዓ.ም',
        title: 'Completion of Phase 1 Drainage Network around Biete Medhane Alem',
        body: 'Subterranean water channels have been successfully reinforced, redirecting rainwater away from the foundation monoliths.',
      },
      {
        date: 'Jul 22, 2026',
        ethiopianDate: 'ሐምሌ ፲፭, ፳፻፲፰ ዓ.ም',
        title: 'Arrival of Specialized Laser Cleaning Equipment',
        body: 'Non-invasive conservation tools blessed by the Patriarchate have arrived in Lalibela for delicate basalt preservation.',
      },
    ],
    budgetBreakdown: [
      { category: 'Structural Rock Engineering & Drainage', percentage: 45, amountETB: 22500000 },
      { category: 'Fresco & Iconography Restoration', percentage: 25, amountETB: 12500000 },
      { category: 'Ecological Protective Shelters', percentage: 20, amountETB: 10000000 },
      { category: 'Local Clergy & Conservator Training', percentage: 10, amountETB: 5000000 },
    ],
    bankAccounts: [
      { bank: 'Commercial Bank of Ethiopia (CBE)', account: '100023458921', branch: 'Patriarchate Branch' },
      { bank: 'Bank of Abyssinia', account: '8849201948', branch: 'Lalibela Branch' },
      { bank: 'Awash Bank', account: '0132049281', branch: 'Main Branch' },
    ],
  },
  {
    id: 'c-2',
    slug: 'zema-heritage-digitization',
    titleAmharic: 'የቅዱስ ያሬድ ዜማና የብራና መጻሕፍት የዲጂታል ጥበቃ',
    titleEnglish: 'Saint Yared Manuscripts & Zema Audio Digitization Archive',
    targetAmountETB: 20000000,
    raisedAmountETB: 16800000,
    donorsCount: 2950,
    daysRemaining: 18,
    category: 'Education & Archive',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1000',
    description: 'Scanning ancient Ge’ez parchment manuscripts and recording veteran master Debteras in high-resolution audio for global open access.',
    longDescriptionEn:
      'The sacred musical notations (Seraye) and manuscript illuminations created by Saint Yared in the 6th century represent the world’s oldest living notation system. This initiative sends mobile digital conservation units to remote monasteries across Tigray, Gondar, Gojjam, and Wollo to scan endangered Ge’ez vellum folios and record master chanters (Merigetas) before their unwritten oral heritage is lost.',
    longDescriptionAm:
      'የቅዱስ ያሬድ ያሬዳዊ ዜማና በብራና የተጻፉ ጥንታዊ የቤተ ክርስቲያን መጻሕፍትን በዘመናዊ ቴክኖሎጂ ቀርፆ ለትውልድ ማስተላለፍ። በገዳማት የሚገኙ ብርቅዬ መጻሕፍት ዲጂታላይዝ ይደረጋሉ።',
    organizer: 'Holy Trinity Theological University & Zema Research Center',
    leadBishop: 'His Eminence Abune Mathias I, Patriarch of Ethiopia',
    updates: [
      {
        date: 'Aug 02, 2026',
        ethiopianDate: 'ሐምሌ ፳፮, ፳፻፲፰ ዓ.ም',
        title: 'Over 1,200 Parchment Volumes Digitized in Lake Tana Monasteries',
        body: 'High-definition 120-megapixel scans of 14th-century Senkesar and Digua completed at Daga Estifanos.',
      },
    ],
    budgetBreakdown: [
      { category: 'Mobile Scanner & Sensor Hardware', percentage: 40, amountETB: 8000000 },
      { category: 'Studio Audio Field Recordings', percentage: 30, amountETB: 6000000 },
      { category: 'Cloud Server Infrastructure & Open Web Portal', percentage: 20, amountETB: 4000000 },
      { category: 'Stipends for Monastic Scribes & Elders', percentage: 10, amountETB: 2000000 },
    ],
    bankAccounts: [
      { bank: 'Commercial Bank of Ethiopia (CBE)', account: '100055492102', branch: 'Holy Trinity Branch' },
      { bank: 'Telebirr SuperApp', account: '0911002244', branch: 'EOTC Treasury' },
    ],
  },
  {
    id: 'c-3',
    slug: 'rural-church-construction',
    titleAmharic: 'የገጠር አብያተ ክርስቲያናት ሕንፃ ማቋቋሚያና የንጹሕ ውኃ ፕሮጀክት',
    titleEnglish: 'Rural Village Church Building & Clean Well Water Project',
    targetAmountETB: 35000000,
    raisedAmountETB: 24900000,
    donorsCount: 4100,
    daysRemaining: 52,
    category: 'Community Support',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000',
    description: 'Building parish sanctuaries, solar power arrays, and clean water wells for underserved rural Orthodox communities across Ethiopia.',
    longDescriptionEn:
      'In dozens of remote dioceses, faithful Christians travel up to 20 kilometers on foot to attend Sunday Kidase. This initiative constructs durable stone and brick parish churches with solar lighting for evening services and drills clean deep-well water points that serve the entire surrounding community regardless of background.',
    longDescriptionAm:
      'በርቀት በሚገኙ የገጠር ቀበሌዎች የሚኖሩ ምዕመናን በአቅራቢያቸው ቤተ መቅደስ እንዲኖራቸውና የንጹሕ መጠጥ ውኃ ጉድጓዶች እንዲቆፈሩ የሚደረግ ሁለንተናዊ የልማት ፕሮጀክት።',
    organizer: 'EOTC Development & Inter-Church Aid Commission (DICAC)',
    leadBishop: 'His Grace Abune Samuel, Archbishop of Development & Aid',
    updates: [
      {
        date: 'Jul 30, 2026',
        ethiopianDate: 'ሐምሌ ፳፫, ፳፻፲፰ ዓ.ም',
        title: '8 Deep-Well Water Pumps Inaugurated in South Omo & Afar Dioceses',
        body: 'Clean water is now flowing to over 24,000 villagers alongside newly blessed parish chapel foundations.',
      },
    ],
    budgetBreakdown: [
      { category: 'Sanctuary Construction & Roofing', percentage: 50, amountETB: 17500000 },
      { category: 'Deep-Well Water Drilling & Solar Pumps', percentage: 35, amountETB: 12250000 },
      { category: 'Liturgical Vessels & Church Vestments', percentage: 15, amountETB: 5250000 },
    ],
    bankAccounts: [
      { bank: 'Commercial Bank of Ethiopia (CBE)', account: '100038920194', branch: 'DICAC Main Branch' },
      { bank: 'Dashen Bank', account: '5592019482', branch: 'Addis Ababa Branch' },
    ],
  },
  {
    id: 'c-4',
    slug: 'clergy-widows-orphans-relief',
    titleAmharic: 'የካህናትና የገዳማውያን ድጋፍና የጤና መድን ፈንድ',
    titleEnglish: 'Elderly Clergy Pension & Monastic Healthcare Fund',
    targetAmountETB: 25000000,
    raisedAmountETB: 19100000,
    donorsCount: 3820,
    daysRemaining: 40,
    category: 'Humanitarian Relief',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=1000',
    description: 'Providing monthly living stipends, emergency medical coverage, and eye care for retired priests, deacons, debteras, and monastic elders.',
    longDescriptionEn:
      'Thousands of dedicated priests, deacons, and choir masters who served the Church faithfully for fifty or sixty years in rural parsonages now face illness and poverty in their old age. This endowed pension fund guarantees dignified medical care, prescription medicine, cataract surgeries, and basic nutritional stipends.',
    longDescriptionAm:
      'ለአረጋውያን ካህናት፣ ዲያቆናትና መምህራነ ዜማ የሕክምና፣ የዓይን ቀዶ ሕክምናና የወርሃዊ የኑሮ ድጎማ የሚያቀርብ ቅዱስ ሲኖዶሳዊ የእርዳታ ፈንድ።',
    organizer: 'Holy Synod Clergy Welfare & Social Services Department',
    leadBishop: 'His Grace Abune Melchizedek, Archbishop of Synod Administration',
    updates: [
      {
        date: 'Aug 05, 2026',
        ethiopianDate: 'ሐምሌ ፳፱, ፳፻፲፰ ዓ.ም',
        title: '350 Free Cataract Surgeries Performed in Bahir Dar Diocese',
        body: 'Elderly church chanters regained their sight to read sacred liturgical manuscripts through donor generosity.',
      },
    ],
    budgetBreakdown: [
      { category: 'Direct Healthcare & Prescription Coverage', percentage: 55, amountETB: 13750000 },
      { category: 'Monthly Retirement Living Stipends', percentage: 35, amountETB: 8750000 },
      { category: 'Emergency Housing & Mobility Aids', percentage: 10, amountETB: 2500000 },
    ],
    bankAccounts: [
      { bank: 'Commercial Bank of Ethiopia (CBE)', account: '100099482012', branch: 'Synod Branch' },
    ],
  },
];

/* ── Monasteries to Adopt ────────────────────────────────────── */
export const MOCK_MONASTERIES: Monastery[] = [
  {
    id: 'm-1',
    slug: 'debre-damo',
    nameAmharic: 'ደብረ ዳሞ አቡነ አረጋዊ ገዳም',
    nameEnglish: 'Debre Damo Monastery (Abune Aregawi)',
    diocese: 'Axum Diocese, Tigray',
    location: 'Tigray Region, Northern Ethiopia',
    centuryFounded: '6th Century AD (c. 550 AD)',
    monksCount: 160,
    monthlyTargetETB: 150000,
    raisedMonthlyETB: 118000,
    currentSponsors: 245,
    image: 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800',
    needDescription: 'Providing essential wheat, incense, holy oil, solar batteries, and winter blankets for 160 ascetics living atop the precipitous 25-meter cliff accessible only by leather rope.',
    urgentNeeds: ['Grain & Legume Food Supplies', 'Olive Oil & Incense for Altar', 'Rainwater Cistern Sealing', 'Solar Power Battery Storage'],
    historySummary: 'Founded by Abune Aregawi, one of the Nine Saints who arrived in Axum from Syria. The monastery sits atop an inaccessible sheer mountain plateau.',
    dailyRoutine: '3:00 AM Nocturnal prayer (Mahelet), 6:00 AM Kidase, manual parchment making and terraced farming, 5:00 PM Vespers.',
  },
  {
    id: 'm-2',
    slug: 'waldiba-complex',
    nameAmharic: 'ዋልድባ አብርሃንታንት ገዳም',
    nameEnglish: 'Waldiba Monastic Complex',
    diocese: 'Gondar & Semien Diocese',
    location: 'Semien Mountains Wilderness, Amhara',
    centuryFounded: '4th Century AD',
    monksCount: 620,
    nunsCount: 180,
    monthlyTargetETB: 350000,
    raisedMonthlyETB: 285000,
    currentSponsors: 510,
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    needDescription: 'Supporting desert hermits dedicated to unceasing prayer for national unity and world peace in the deep forested wilderness of Waldiba.',
    urgentNeeds: ['Grain Mill Maintenance', 'Medicines for Malarial Care', 'Beekeeping & Wax Equipment', 'Parchment Skin Curing Salt'],
    historySummary: 'Considered the premier cradle of Ethiopian monastic asceticism, home to thousands of anchorites through sixteen centuries.',
    dailyRoutine: 'Continuous round-the-clock Psalter recitation (Dawit), silent contemplation, communal bread making, and hermitage fasting.',
  },
  {
    id: 'm-3',
    slug: 'debre-libanos',
    nameAmharic: 'ደብረ ሊባኖስ ገዳም (አቡነ ተክለ ሃይማኖት)',
    nameEnglish: 'Debre Libanos Monastery (Abune Tekle Haymanot)',
    diocese: 'North Shewa Diocese',
    location: 'North Shewa, Oromia Region',
    centuryFounded: '13th Century AD (1284 AD)',
    monksCount: 380,
    nunsCount: 120,
    monthlyTargetETB: 250000,
    raisedMonthlyETB: 215000,
    currentSponsors: 430,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=800',
    needDescription: 'Funding monastic education for 150 novice students (Deqiqe Tekle Haymanot), traditional medicine botanical garden, and pilgrims hostel.',
    urgentNeeds: ['Novice Student Food & Textbooks', 'Holy Cave Preservation', 'Botanical Herbal Nursery', 'Clean Drinking Water Pipeline'],
    historySummary: 'The historic patriarchal seat of the Echege of Debre Libanos, established by the great father St. Tekle Haymanot on the edge of the Jemma river gorge.',
    dailyRoutine: '4:00 AM Midnight hymnody, theological study in Ge’ez grammar and Qene poetry, caring for aged monks, communal dining.',
  },
  {
    id: 'm-4',
    slug: 'lake-tana-monasteries',
    nameAmharic: 'የጣና ሐይቅ ደሴታት ገዳማት (ደብረ ማርያም፣ ኡራ ኪዳነ ምሕረት)',
    nameEnglish: 'Lake Tana Island Monasteries (Ura Kidane Mihret & Daga Estifanos)',
    diocese: 'Bahir Dar Diocese, Amhara',
    location: 'Lake Tana Islands, Bahir Dar',
    centuryFounded: '14th Century AD',
    monksCount: 220,
    monthlyTargetETB: 180000,
    raisedMonthlyETB: 142000,
    currentSponsors: 310,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    needDescription: 'Boat transportation fuel between islands, restoration of circular mud-and-thatch straw sanctuaries, and manuscript moisture-proof vaults.',
    urgentNeeds: ['Solar-Powered Eco Boat Transportation', 'Dehumidifiers for Manuscript Safes', 'Roof Thatched Grass Replacements', 'Basic Food Supplies'],
    historySummary: 'Fabled island sanctuaries where the Ark of the Covenant was sheltered, containing the embalmed remains of medieval Ethiopian monarchs.',
    dailyRoutine: 'Morning Kidase on island waters, fishing, coffee bean harvesting, manuscript binding, and nighttime vigil prayer.',
  },
];

/* ── General Church Fund Pillars ─────────────────────────────── */
export const GENERAL_FUND_PILLARS: GeneralFundPillar[] = [
  {
    id: 'g-1',
    titleEn: 'Patriarchate & Holy Synod Administration',
    titleAm: 'የመንበረ ፓትርያርክና የቅዱስ ሲኖዶስ ማዕከላዊ አስተዳደር',
    descriptionEn: 'Supports overall governance, canon law tribunals, diocese management, and official representations across 65 global dioceses.',
    descriptionAm: 'የቤተ ክርስቲያኒቱን ዓለም አቀፍ አስተዳደር፣ የሕግና ቀኖና ሥራዎችን እንዲሁም አህጉረ ስብከትን የሚያስተዳድር ማዕከላዊ ፈንድ።',
    iconName: 'Landmark',
    percentageAllocation: 25,
    annualBudgetETB: 75000000,
  },
  {
    id: 'g-2',
    titleEn: 'Theological Seminaries & Scholar Training',
    titleAm: 'የመንፈሳዊ ኮሌጆችና የአብነት ትምህርት ቤቶች ድጋፍ',
    descriptionEn: 'Funding tuition, dormitories, and textbooks for thousands of students at Holy Trinity, St. Paul, and traditional Abnet schools.',
    descriptionAm: 'በቅዱስ ሥላሴ፣ በቅዱስ ጳውሎስና በገዳማት የአብነት ት/ቤቶች ለሚማሩ ደቀ መዛሙርት የትምህርትና የምግብ ወጪ የሚሸፍን ፈንድ።',
    iconName: 'GraduationCap',
    percentageAllocation: 25,
    annualBudgetETB: 75000000,
  },
  {
    id: 'g-3',
    titleEn: 'Clergy & Monastic Healthcare and Pension',
    titleAm: 'የካህናትና የገዳማውያን የጤና መድንና ጡረታ',
    descriptionEn: 'Guarantees medical insurance, emergency hospital assistance, and dignified retirement pensions for over 45,000 clergy members.',
    descriptionAm: 'ለመላው የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ካህናትና ገዳማውያን የሕክምና አገልግሎትና የጡረታ ዋስትና የሚሰጥ መሠረታዊ ፈንድ።',
    iconName: 'HeartHandshake',
    percentageAllocation: 20,
    annualBudgetETB: 60000000,
  },
  {
    id: 'g-4',
    titleEn: 'Global Evangelism & Diaspora Youth Missions',
    titleAm: 'ስብከተ ወንጌልና የዲያስፖራ ወጣቶች ተልእኮ',
    descriptionEn: 'Publishing multilingual catechism books, planting new mission centers in Africa, Asia, and the Americas, and digital ministry broadcast.',
    descriptionAm: 'ኦርቶዶክሳዊ ትምህርትን በዓለም ዙሪያ ለማዳረስ፣ መጻሕፍትን በየቋንቋው ለማሳተምና ወጣቶችን ወደ ሃይማኖት ለማቅረብ የተቋቋመ።',
    iconName: 'Globe',
    percentageAllocation: 15,
    annualBudgetETB: 45000000,
  },
  {
    id: 'g-5',
    titleEn: 'Emergency Famine, Flood & Disaster Relief',
    titleAm: 'የአደጋ መከላከልና የሰብአዊ እርዳታ ማዕከል (DICAC)',
    descriptionEn: 'Rapid response humanitarian food distribution, blankets, and housing reconstruction during natural and man-made emergencies.',
    descriptionAm: 'ድርቅ፣ ጎርፍና ሰው ሠራሽ አደጋዎች በሚከሰቱበት ወቅት ፈጣን የምግብና የሕክምና እርዳታ ለተጎዱ ወገኖች የሚያደርስ የሰብአዊ ፈንድ።',
    iconName: 'ShieldAlert',
    percentageAllocation: 15,
    annualBudgetETB: 45000000,
  },
];

/* ── Financial Transparency & Audited Reports ───────────────── */
export const TRANSPARENCY_STATS = {
  totalRaisedYearETB: 284500000,
  churchesSupported: 520,
  monasteriesAdopted: 42,
  scholarshipsGranted: 1850,
  emergencyAidRecipients: 145000,
  fiscalYear: '2025/2026 (፳፻፲፰ ዓ.ም)',
  auditFirm: 'Audit Services Corporation & Ernst & Young Global',
  auditReportUrl: '#',
  incomeSources: [
    { source: 'Parish Tithes & Sunday Collections (ዐሥራትና ምጽዋት)', percentage: 42, amountETB: 119490000 },
    { source: 'Diaspora Direct & Online Giving (የውጭ አገር ምዕመናን)', percentage: 28, amountETB: 79660000 },
    { source: 'Special Synod Campaigns & Endowments (ልዩ ዘመቻዎች)', percentage: 18, amountETB: 51210000 },
    { source: 'Monastic Agriculture & Book Enterprises (የልማት ገቢ)', percentage: 12, amountETB: 34140000 },
  ],
  expenditureBreakdown: [
    { sector: 'Parish & Monastery Direct Subsidies (አብያተ ክርስቲያናትና ገዳማት)', percentage: 38, amountETB: 108110000 },
    { sector: 'Theological Education & Seminars (ትምህርትና ኮሌጆች)', percentage: 22, amountETB: 62590000 },
    { sector: 'Clergy Healthcare, Welfare & Pensions (የካህናት ደህንነት)', percentage: 18, amountETB: 51210000 },
    { sector: 'Humanitarian & Disaster Relief (DICAC) (ሰብአዊ እርዳታ)', percentage: 14, amountETB: 39830000 },
    { sector: 'Administrative Audits, IT & Governance (አስተዳደራዊ ወጪ)', percentage: 8, amountETB: 22760000 },
  ],
  auditedReports: [
    { title: 'EOTC Comprehensive Annual Audit Report 2025/2026', size: '4.8 MB', date: 'July 2026', fileType: 'PDF' },
    { title: 'Lalibela World Heritage Restoration Financial Review', size: '2.1 MB', date: 'June 2026', fileType: 'PDF' },
    { title: 'DICAC Humanitarian Relief & Food Security Audit', size: '3.4 MB', date: 'May 2026', fileType: 'PDF' },
    { title: 'Global Dioceses Revenue & Remittance Compliance', size: '1.9 MB', date: 'March 2026', fileType: 'PDF' },
  ],
  oversightCouncil: [
    { name: 'His Grace Abune Abraham', title: 'Chairman of Holy Synod Audit Commission' },
    { name: 'Ato Berhanu Nega (CPA)', title: 'Lead Independent External Auditor' },
    { name: 'Dr. Woizero Aster Gebre', title: 'Legal & Fiscal Governance Advisor' },
  ],
};

/* ── Mock Logged-in Donor Account Data ──────────────────────── */
export const MOCK_DONOR_PROFILE = {
  name: 'Yohannes Wolde Mariam',
  baptismalName: 'Haile Sellassie (ኃይለ ሥላሴ)',
  email: 'yohannes.wm@gmail.com',
  phone: '+251 91 140 8822',
  memberParish: 'Holy Trinity Cathedral, Addis Ababa',
  memberSince: '2022',
  totalLifetimeETB: 48500,
  taxIdNumber: 'TIN-9948201',
  activePledgesCount: 2,
};

export const MOCK_DONOR_HISTORY: DonorHistoryItem[] = [
  {
    id: 'txn-101',
    date: 'Aug 14, 2026',
    designation: 'Lalibela Restoration Emergency Fund',
    designationAm: 'የላሊበላ አብያተ ክርስቲያናት ጥገና',
    amount: 5000,
    currency: 'ETB',
    paymentMethod: 'Telebirr',
    receiptNumber: 'REC-2026-0814-99',
    status: 'Completed',
    taxDeductible: true,
  },
  {
    id: 'txn-102',
    date: 'Aug 01, 2026',
    designation: 'Debre Damo Monastery Monthly Adoption',
    designationAm: 'ደብረ ዳሞ አቡነ አረጋዊ ገዳም ጉዲፈቻ',
    amount: 1500,
    currency: 'ETB',
    paymentMethod: 'CBE Birr',
    receiptNumber: 'REC-2026-0801-42',
    status: 'Recurring Active',
    taxDeductible: true,
  },
  {
    id: 'txn-103',
    date: 'Jul 15, 2026',
    designation: 'General Patriarchate Theological Fund',
    designationAm: 'የመንበረ ፓትርያርክ አጠቃላይ ፈንድ',
    amount: 2500,
    currency: 'ETB',
    paymentMethod: 'Visa Card (Ending 4012)',
    receiptNumber: 'REC-2026-0715-18',
    status: 'Completed',
    taxDeductible: true,
  },
  {
    id: 'txn-104',
    date: 'Jun 22, 2026',
    designation: 'Saint Yared Manuscripts Digitization',
    designationAm: 'የቅዱስ ያሬድ ዜማና ብራና ጥበቃ',
    amount: 3000,
    currency: 'ETB',
    paymentMethod: 'Telebirr',
    receiptNumber: 'REC-2026-0622-04',
    status: 'Completed',
    taxDeductible: true,
  },
];

export const MOCK_RECURRING_PLEDGES: RecurringPledge[] = [
  {
    id: 'plg-1',
    designation: 'Debre Damo Hermitage Monthly Sustenance',
    amount: 1500,
    currency: 'ETB',
    frequency: 'Monthly',
    nextBillingDate: 'Sept 01, 2026',
    paymentMethod: 'CBE Birr (Account *8822)',
    status: 'Active',
  },
  {
    id: 'plg-2',
    designation: 'Parish Tithe (Asrat) — Holy Trinity Cathedral',
    amount: 2000,
    currency: 'ETB',
    frequency: 'Monthly',
    nextBillingDate: 'Sept 05, 2026',
    paymentMethod: 'Telebirr Auto-Debit',
    status: 'Active',
  },
];
