/* ═══════════════════════════════════════════════════════════════
   EOTC — Mock Events Data for /find-a-church/events
═══════════════════════════════════════════════════════════════ */

export type EventType =
  | 'Feast Day'
  | 'Mahlet Vigil'
  | 'Youth Program'
  | 'Community Meal'
  | 'Sermon'
  | 'Retreat'
  | 'Tabot Procession'
  | 'Fundraiser'
  | 'Synaxis';

export type RecurrencePattern = 'once' | 'weekly' | 'monthly' | 'annual';

export interface EOTCEvent {
  id: string;
  slug: string;
  titleEn: string;
  titleAm: string;
  descriptionEn: string;
  descriptionAm: string;

  /* Host church */
  churchId: string;
  churchNameEnglish: string;
  churchNameAmharic: string;
  diocese: string;
  city: string;
  country: string;
  address: string;
  lat: number;
  lng: number;

  /* Dates & Time */
  gregorianDate: string;
  ethiopianDate: string;
  startTime: string;
  endTime: string;
  recurrence: RecurrencePattern;
  recurrenceLabel?: string; // e.g. "Every Sunday", "Every 29th of the month"

  /* Classification */
  eventType: EventType;
  isFree: boolean;
  ticketPrice?: string;      // e.g. "Free-will offering"
  isHybrid: boolean;
  streamingUrl?: string;

  /* RSVP */
  rsvpCount: number;
  capacity: number | null;   // null = unlimited

  /* Media */
  imageUrl: string;

  /* Calendar */
  gcalUrl: string;

  /* Contact */
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;

  /* Tags for filtering */
  dateCategory: 'today' | 'this_week' | 'this_month' | 'upcoming';
  featured?: boolean;
  distanceKm?: number | null;

  /* Schedule (multi-segment events) */
  schedule?: { time: string; item: string; itemAm: string }[];
}

export const EVENT_TYPES: EventType[] = [
  'Feast Day', 'Mahlet Vigil', 'Youth Program', 'Community Meal',
  'Sermon', 'Retreat', 'Tabot Procession', 'Fundraiser', 'Synaxis',
];

export const MOCK_EVENTS: EOTCEvent[] = [
  /* ── 1. Holy Trinity Cathedral — Filseta (Assumption) Feast ── */
  {
    id: 'ev1',
    slug: 'filseta-assumption-holy-trinity-2026',
    titleEn: 'Feast of the Assumption of St. Mary (Filseta)',
    titleAm: 'ፍልሰታ ለማርያም — ቅድስት ሥላሴ ካቴድራል',
    descriptionEn:
      'The holiest Marian feast in the Ethiopian Orthodox calendar. All-night Mahlet vigil with the Patriarchal Choir, Wudase Maryam chants, and solemn dawn Kidase. Thousands of pilgrims gather at Holy Trinity Patriarchal Cathedral.',
    descriptionAm:
      'የፍልሰታ ለማርያም ዓለም አቀፍ በዓል በቅድስት ሥላሴ ካቴድራል። ሌሊቱን ሙሉ ማኅሌት፣ ዋዜማ፣ ዝማሬ፣ እና የማለዳ ቅዳሴ ይከናወናል። ከሺዎች በላይ ምዕመናን ከሁሉም አቅጣጫ ይሰበሰባሉ።',
    churchId: 'c1',
    churchNameEnglish: 'Holy Trinity Cathedral (Patriarchate)',
    churchNameAmharic: 'መንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል',
    diocese: 'Addis Ababa Diocese',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    address: 'Arat Kilo, Addis Ababa',
    lat: 9.0268,
    lng: 38.7525,
    gregorianDate: 'Saturday, Aug 22, 2026',
    ethiopianDate: 'ነሐሴ ፲፮, ፳፻፲፰ ዓ.ም',
    startTime: '8:00 PM',
    endTime: '10:30 AM (next day)',
    recurrence: 'annual',
    recurrenceLabel: 'Annual Liturgical Feast (ነሐሴ ፲፮)',
    eventType: 'Mahlet Vigil',
    isFree: true,
    isHybrid: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    rsvpCount: 4823,
    capacity: null,
    imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Filseta+Holy+Trinity&dates=20260822T170000Z/20260823T073000Z&location=Arat+Kilo+Addis+Ababa',
    contactName: 'Cathedral Office',
    contactPhone: '+251 11 122 3344',
    contactEmail: 'info@holytrinity.et',
    dateCategory: 'this_week',
    featured: true,
    schedule: [
      { time: '8:00 PM', item: 'Opening Wudase Maryam', itemAm: 'ዋዜማ — ውዳሴ ማርያም' },
      { time: '9:30 PM', item: 'Patriarchal Choir Mahlet Vigil', itemAm: 'የፓትርያርካዊ ቀዳሽ ቡድን ማኅሌት' },
      { time: '2:00 AM', item: 'Zema — Digua Canticles (St. Yared)', itemAm: 'ያሬዳዊ ድጓ ዜማ' },
      { time: '5:30 AM', item: 'Dawn Processional — Tabot Carried Outside', itemAm: 'የታቦት ዕቅብ ወጣ ሐዊልት' },
      { time: '6:00 AM', item: 'Solemn Kidase (Divine Liturgy)', itemAm: 'ጸሎተ ቅዳሴ (ቅዳሴ ማርያም)' },
    ],
  },

  /* ── 2. Entoto St. Mary — Annual Timkat Procession ── */
  {
    id: 'ev2',
    slug: 'timkat-entoto-st-mary-2027',
    titleEn: 'Timkat (Epiphany) Eve Procession & Blessing of Water',
    titleAm: 'ጥምቀት — ደብረ ጽዮን ቅድስት ማርያም ቤተ ክርስቲያን፣ እንጦጦ',
    descriptionEn:
      'The annual Timkat (Theophany / Epiphany) celebration begins the evening before with a solemn Tabot procession from Entoto St. Mary Church down to a water-blessing site. Priests robed in full vestments, deacons with candles and incense.',
    descriptionAm:
      'ዓመታዊ የጥምቀት ዕለት ዋዜማ — ቅዱሳን ካህናት ታቦቱን ተሸክመው ከቤተ ክርስቲያን ወደ ውሃ ምንጭ ያስከትላሉ። ሕዝቡ ሻማ ይዞ ከሁሉም ቦታ ይሰበሰባል።',
    churchId: 'c2',
    churchNameEnglish: 'Debre Zion St. Mary Church – Entoto',
    churchNameAmharic: 'ደብረ ጽዮን ቅድስት ማርያም ቤተ ክርስቲያን — እንጦጦ',
    diocese: 'Addis Ababa Diocese',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    address: 'Entoto Hill, Addis Ababa',
    lat: 9.0710,
    lng: 38.7537,
    gregorianDate: 'Sunday, Jan 18, 2027',
    ethiopianDate: 'ጥር ፲, ፳፻፲፱ ዓ.ም',
    startTime: '5:00 PM',
    endTime: '8:00 PM',
    recurrence: 'annual',
    recurrenceLabel: 'Annual Epiphany (ጥር ፲፩)',
    eventType: 'Tabot Procession',
    isFree: true,
    isHybrid: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    rsvpCount: 12400,
    capacity: null,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Timkat+Entoto&dates=20270118T140000Z/20270118T170000Z&location=Entoto+Hill+Addis+Ababa',
    contactPhone: '+251 11 345 6789',
    dateCategory: 'upcoming',
    featured: true,
    schedule: [
      { time: '5:00 PM', item: 'Gathering & Opening Prayers', itemAm: 'ጸሎተ ምሽት' },
      { time: '5:45 PM', item: 'Tabot Procession Begins', itemAm: 'ሐዊልተ ታቦት ይጀምራል' },
      { time: '7:00 PM', item: 'Arrival at Water Site — Blessing', itemAm: 'የውሃ ቡራኬ' },
      { time: '7:30 PM', item: 'Mahlet Vigil Begins', itemAm: 'ማኅሌት ይጀምራል' },
    ],
  },

  /* ── 3. DC Medhane Alem — Youth Leadership Symposium ── */
  {
    id: 'ev3',
    slug: 'youth-symposium-dc-medhane-alem-2026',
    titleEn: 'EOTC Youth Leadership Symposium – Washington DC',
    titleAm: 'የወጣቶች አመራር ጉባኤ — ዋሽንግተን ዲሲ',
    descriptionEn:
      'A two-day symposium for Ethiopian Orthodox youth (ages 14–30) covering: Tewahedo theology, digital evangelism, youth mental health, and diaspora identity. Guest speakers include ordained clergy and scholars from Holy Trinity Seminary.',
    descriptionAm:
      'ለወጣቶች ሁለት ቀን ጉባኤ። ትምህርቶቹ፡ ተዋሕዶ ሃይማኖት፣ ዘመናዊ ስብከት፣ የወጣቶች ጤንነትና ዲያስፖራ ማንነት ያካትታሉ። ከቅዱስ ሥላሴ ሥነ መለኮት ኮሌጅ መምህራን ጋር።',
    churchId: 'c19',
    churchNameEnglish: 'Debre Selam Medhane Alem – Washington DC',
    churchNameAmharic: 'ደብረ ሰላም መድኃኔ ዓለም — ዋሽንግተን ዲሲ',
    diocese: 'North America Diocese',
    city: 'Washington DC',
    country: 'USA',
    address: '4401 16th St NW, Washington, DC 20011',
    lat: 38.9380,
    lng: -77.0367,
    gregorianDate: 'Saturday, Sep 5, 2026',
    ethiopianDate: 'ጳጉሜ ፩, ፳፻፲፰ ዓ.ም',
    startTime: '9:00 AM',
    endTime: '6:00 PM',
    recurrence: 'annual',
    recurrenceLabel: 'Annual September Youth Symposium',
    eventType: 'Youth Program',
    isFree: false,
    ticketPrice: '$15 per attendee (2-day pass)',
    isHybrid: true,
    streamingUrl: 'https://youtube.com/@EOTCDCMedhaneAlem',
    rsvpCount: 247,
    capacity: 400,
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=EOTC+Youth+Symposium+DC&dates=20260905T060000Z/20260905T150000Z&location=4401+16th+St+NW+Washington+DC',
    contactName: 'Youth Department',
    contactPhone: '+1 202 555 0147',
    contactEmail: 'youth@eotcdc.org',
    dateCategory: 'upcoming',
    featured: true,
    schedule: [
      { time: '9:00 AM', item: 'Registration & Morning Prayer', itemAm: 'ምዝገባ እና ዋዜማ' },
      { time: '10:00 AM', item: 'Keynote: Tewahedo Faith in the Digital Age', itemAm: 'ዋና ንግግር — ተዋሕዶ ዛሬ' },
      { time: '12:30 PM', item: 'Community Agapē Lunch', itemAm: 'የፍቅር ማዕድ' },
      { time: '2:00 PM', item: 'Workshop: Diaspora Identity & Heritage', itemAm: 'ወርክሾፕ — ዲያስፖራ ማንነት' },
      { time: '4:30 PM', item: 'Panel: Mental Health & Spiritual Life', itemAm: 'ፓነል — ጤንነትና ጸሎት' },
      { time: '6:00 PM', item: 'Evening Vespers & Closing Benediction', itemAm: 'ምሽት ጸሎትና ቡራኬ' },
    ],
  },

  /* ── 4. London St. Mary — Monthly Agape Community Meal ── */
  {
    id: 'ev4',
    slug: 'monthly-agape-london-st-mary-2026',
    titleEn: 'Monthly Agapē Community Meal & Fellowship',
    titleAm: 'ወርሃዊ የፍቅር ማዕድ — ለንደን ቅድስት ማርያም',
    descriptionEn:
      'A monthly community Agapē meal open to all Ethiopian Orthodox faithful and visitors. Traditional injera with vegetarian fasting dishes. Followed by a short scripture reflection and announcements.',
    descriptionAm:
      'ለሁሉም ምዕመናን ክፍት ወርሃዊ የፍቅር ማዕድ። ምግቡ ጾም ተኮር ሲሆን የኢትዮጵያ ቡና ይቀርባል። ከምግብ በኋላ አጭር ትምህርት ይሰጣል።',
    churchId: 'c23',
    churchNameEnglish: 'Debre Zion St. Mary – London',
    churchNameAmharic: 'ደብረ ጽዮን ቅድስት ማርያም — ለንደን',
    diocese: 'UK & Europe Diocese',
    city: 'London',
    country: 'United Kingdom',
    address: 'Battersea Park Rd, London SW11 4LP',
    lat: 51.4760,
    lng: -0.1550,
    gregorianDate: 'Sunday, Aug 23, 2026',
    ethiopianDate: 'ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም',
    startTime: '1:00 PM',
    endTime: '3:30 PM',
    recurrence: 'monthly',
    recurrenceLabel: 'Every last Sunday of the month',
    eventType: 'Community Meal',
    isFree: true,
    isHybrid: false,
    rsvpCount: 89,
    capacity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Monthly+Agape+London+EOTC&dates=20260823T100000Z/20260823T123000Z&location=Battersea+Park+Rd+London',
    contactName: 'Sister Tigist',
    contactPhone: '+44 20 7946 0958',
    contactEmail: 'fellowship@eotclondon.org',
    dateCategory: 'this_week',
    schedule: [
      { time: '1:00 PM', item: 'Arrival & Grace (Biruk Amlak)', itemAm: 'ምስጋናና ጸሎት' },
      { time: '1:15 PM', item: 'Community Lunch — Injera & Wot', itemAm: 'ጋራ ምግብ' },
      { time: '2:30 PM', item: 'Scripture Reflection & Community Announcements', itemAm: 'ቃለ እግዚአብሔርና ማስታወቂያ' },
      { time: '3:15 PM', item: 'Traditional Coffee Ceremony (Buna)', itemAm: 'ባህላዊ የቡና ሥነ ሥርዓት' },
    ],
  },

  /* ── 5. Stockholm — Spiritual Retreat Weekend ── */
  {
    id: 'ev5',
    slug: 'spiritual-retreat-stockholm-2026',
    titleEn: 'Annual Spiritual Retreat — Stockholm Parish',
    titleAm: 'ዓመታዊ መንፈሳዊ ዕረፍት — ስቶክሆልም ደብር',
    descriptionEn:
      'A 3-day residential spiritual retreat for adults. Theme: "Abide in Me — John 15:4." Guided fasting, group prayer, Kidase, nature walks, and one-on-one spiritual counsel with a visiting abbot from Debre Libanos Monastery.',
    descriptionAm:
      '3 ቀን ዕረፍተ ወንጌል — ጭብጥ: "ኑሩ በኔ" (ዮሐ. ፲፭:፬)። ጾምና ጸሎት፣ ቅዳሴ፣ ከደብረ ሊባኖስ ገዳም ከሚመጡ አቡነ ጋር የግል ምክር ይሰጣል።',
    churchId: 'c27',
    churchNameEnglish: 'EOTC Stockholm Parish – St. Gabriel',
    churchNameAmharic: 'ስቶክሆልም ቅዱስ ገብርኤል ቤተ ክርስቲያን',
    diocese: 'Scandinavia Diocese',
    city: 'Stockholm',
    country: 'Sweden',
    address: 'Järfälla, Stockholm, Sweden',
    lat: 59.3850,
    lng: 17.9250,
    gregorianDate: 'Friday, Sep 11, 2026',
    ethiopianDate: 'ጳጉሜ ፯, ፳፻፲፰ ዓ.ም',
    startTime: '4:00 PM',
    endTime: '2:00 PM (Sep 13)',
    recurrence: 'annual',
    recurrenceLabel: 'Annual September Retreat',
    eventType: 'Retreat',
    isFree: false,
    ticketPrice: 'SEK 350 (accommodation + meals included)',
    isHybrid: false,
    rsvpCount: 48,
    capacity: 60,
    imageUrl: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=EOTC+Retreat+Stockholm&dates=20260911T130000Z/20260913T110000Z&location=Jarfalla+Stockholm',
    contactName: 'Kesis Tadesse',
    contactPhone: '+46 8 555 0123',
    contactEmail: 'retreat@eotcstockholm.se',
    dateCategory: 'upcoming',
    schedule: [
      { time: 'Day 1 — 4 PM', item: 'Arrival, Registration, Opening Vespers', itemAm: 'ምምጣት እና ጸሎተ ምሽት' },
      { time: 'Day 2 — 5 AM', item: 'Morning Prayer (Selete Leit)', itemAm: 'ሰቀለቲ' },
      { time: 'Day 2 — 6 AM', item: 'Kidase (Divine Liturgy)', itemAm: 'ቅዳሴ' },
      { time: 'Day 2 — 10 AM', item: 'Patristic Teaching by Visiting Abbot', itemAm: 'ከቅዱስ አባት ትምህርት' },
      { time: 'Day 3 — 9 AM', item: 'Closing Liturgy & Agapē Farewell Meal', itemAm: 'ሰንበት ቅዳሴ እና ቡርካ' },
    ],
  },

  /* ── 6. St. Michael Bole — Monthly Feast (Recurrent) ── */
  {
    id: 'ev6',
    slug: 'st-michael-monthly-feast-bole-2026',
    titleEn: 'Monthly Feast of Archangel Michael – Bole',
    titleAm: 'ወርሃዊ የቅዱስ ሚካኤል በዓልና ንግሥ — ቦሌ',
    descriptionEn:
      'The monthly commemoration of Archangel Michael (12th of each Ethiopian month). Full solemn Kidase, procession, and blessing of oil. A favourite gathering for the faithful of Bole district.',
    descriptionAm:
      'ወርሃዊ የቅዱስ ሚካኤል ዕለት — የኢትዮጵያ ቀን አቆጣጠር ሁሉም ወር ፲፪ ቀን። ሙሉ ቅዳሴ፣ ዕቅብ፣ የቅዱስ ሚካኤል ዘይት ቡራኬ።',
    churchId: 'c3',
    churchNameEnglish: 'St. Michael Church – Bole',
    churchNameAmharic: 'ቅዱስ ሚካኤል ቤተ ክርስቲያን — ቦሌ',
    diocese: 'Addis Ababa Diocese',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    address: 'Bole Sub-City, Addis Ababa',
    lat: 8.9987,
    lng: 38.7967,
    gregorianDate: 'Wednesday, Aug 19, 2026',
    ethiopianDate: 'ነሐሴ ፲፫, ፳፻፲፰ ዓ.ም',
    startTime: '6:30 AM',
    endTime: '12:00 PM',
    recurrence: 'monthly',
    recurrenceLabel: 'Monthly (12th of every Ethiopian month)',
    eventType: 'Feast Day',
    isFree: true,
    isHybrid: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    rsvpCount: 1240,
    capacity: null,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=St+Michael+Feast+Bole&dates=20260819T033000Z/20260819T090000Z&location=Bole+Addis+Ababa',
    contactPhone: '+251 11 663 4455',
    dateCategory: 'today',
    featured: true,
  },

  /* ── 7. Toronto — EOTC Fundraiser Gala ── */
  {
    id: 'ev7',
    slug: 'fundraiser-gala-toronto-2026',
    titleEn: 'EOTC Toronto Fundraiser Gala — Church Expansion Campaign',
    titleAm: 'ቶሮንቶ ቤተ ክርስቲያን — የህንፃ ልማት ፈንድ ሰብሳቢ',
    descriptionEn:
      'Annual fundraising gala for the expansion and renovation of Toronto EOTC Parish Hall. Cultural programme, traditional Ethiopian dinner, liturgical music from the parish choir, and a fund drive with matching donations from sponsors.',
    descriptionAm:
      'ዓመታዊ የፈንድ ሰብሳቢ ምሽት — ለቶሮንቶ ቤተ ክርስቲያን ሕንፃ ማስፋፊያ። ባህላዊ ፕሮግራም፣ ያሬዳዊ ዝማሬ፣ ባህላዊ ምግብ።',
    churchId: 'c28',
    churchNameEnglish: 'EOTC Toronto St. Gabriel',
    churchNameAmharic: 'ቶሮንቶ ደብረ ሰላም ቅዱስ ገብርኤል',
    diocese: 'Canada Diocese',
    city: 'Toronto',
    country: 'Canada',
    address: '2736 Eglinton Ave E, Toronto, ON',
    lat: 43.7735,
    lng: -79.2580,
    gregorianDate: 'Saturday, Oct 3, 2026',
    ethiopianDate: 'መስከረም ፳፫, ፳፻፲፱ ዓ.ም',
    startTime: '6:00 PM',
    endTime: '11:00 PM',
    recurrence: 'annual',
    recurrenceLabel: 'Annual October Gala',
    eventType: 'Fundraiser',
    isFree: false,
    ticketPrice: 'CAD $80 per person (dinner included)',
    isHybrid: false,
    rsvpCount: 183,
    capacity: 250,
    imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=EOTC+Toronto+Gala&dates=20261003T150000Z/20261003T200000Z&location=2736+Eglinton+Ave+E+Toronto',
    contactName: 'Ato Dawit Alemu',
    contactPhone: '+1 416 555 0234',
    contactEmail: 'fundraiser@eotctoronto.ca',
    dateCategory: 'upcoming',
    schedule: [
      { time: '6:00 PM', item: 'Doors Open — Welcome Reception', itemAm: 'ሰላምታ' },
      { time: '6:45 PM', item: 'Opening Prayer & Liturgical Choir', itemAm: 'ጸሎትና ዝማሬ' },
      { time: '7:30 PM', item: 'Traditional Ethiopian Dinner', itemAm: 'ምግብ' },
      { time: '8:30 PM', item: 'Fund Drive & Sponsor Matching', itemAm: 'ፈንድ ሰብሳቢ' },
      { time: '9:30 PM', item: 'Cultural Programme & Dancing', itemAm: 'ባህላዊ ፕሮግራም' },
    ],
  },

  /* ── 8. Holy Trinity — Meskel Feast of the True Cross ── */
  {
    id: 'ev8',
    slug: 'meskel-true-cross-addis-2026',
    titleEn: 'Meskel — Finding of the True Cross (Demera Bonfire)',
    titleAm: 'ጥቅምት መስቀል — የደመራ ፕሮግራም በዓለ መስቀል',
    descriptionEn:
      'Meskel (Feast of the True Cross) is one of the most spectacular celebrations in the EOTC year. Huge Demera bonfire in Meskel Square, with thousands of clergy in procession, liturgical singing, and fireworks.',
    descriptionAm:
      'ጥቅምት ፲፯ — የደመራ ፕሮግራም በመስቀል አደባባይ። ካህናት ሁሉ በደመራው ዙሪያ ቆመው ያሬዳዊ ዜማ ያቀርባሉ።',
    churchId: 'c6',
    churchNameEnglish: 'St. George Cathedral – Piazza',
    churchNameAmharic: 'ቅዱስ ጊዮርጊስ ካቴድራል — ፒያሳ',
    diocese: 'Addis Ababa Diocese',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    address: 'Meskel Square, Addis Ababa',
    lat: 9.0151,
    lng: 38.7614,
    gregorianDate: 'Wednesday, Sep 26, 2026',
    ethiopianDate: 'ጥቅምት ፲፯, ፳፻፲፱ ዓ.ም',
    startTime: '3:00 PM',
    endTime: '9:00 PM',
    recurrence: 'annual',
    recurrenceLabel: 'Annual Meskel (መስከረም ፲፯)',
    eventType: 'Feast Day',
    isFree: true,
    isHybrid: true,
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    rsvpCount: 45000,
    capacity: null,
    imageUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meskel+Demera+Addis&dates=20260926T120000Z/20260926T180000Z&location=Meskel+Square+Addis+Ababa',
    dateCategory: 'upcoming',
    featured: true,
    schedule: [
      { time: '3:00 PM', item: 'Procession of Clergy from St. George Cathedral', itemAm: 'ሐዊልተ ካህናት' },
      { time: '5:00 PM', item: 'Synaxarium Reading & Prayers', itemAm: 'ስንክሳር እና ጸሎት' },
      { time: '6:00 PM', item: 'Lighting of the Demera Bonfire', itemAm: 'ደመራ ይበራ' },
      { time: '6:30 PM', item: 'Fireworks & Liturgical Singing', itemAm: 'ምስጋናና ዝማሬ' },
    ],
  },

  /* ── 9. Washington DC — Weekly Sunday Bible Study ── */
  {
    id: 'ev9',
    slug: 'sunday-bible-study-dc-2026',
    titleEn: 'Weekly Sunday Bible Study & Catechism',
    titleAm: 'ሳምንታዊ የመጽሐፍ ቅዱስ ጥናትና ትምህርተ ሃይማኖት — ዋሽንግተን ዲሲ',
    descriptionEn:
      'Every Sunday after the Divine Liturgy. Youth and adult Bible study groups covering the weekly lectionary, patristic commentary, and EOTC catechism. Open to converts and seekers.',
    descriptionAm:
      'ሁሉም እሑድ ቅዳሴ ካበቃ በኋላ። ለወጣቶችና ለጎልማሶች የሳምንቱን ምንባባት ያብራራሉ። ለአዳዲስ አማኞችም ክፍት ነው።',
    churchId: 'c19',
    churchNameEnglish: 'Debre Selam Medhane Alem – Washington DC',
    churchNameAmharic: 'ደብረ ሰላም መድኃኔ ዓለም — ዋሽንግተን ዲሲ',
    diocese: 'North America Diocese',
    city: 'Washington DC',
    country: 'USA',
    address: '4401 16th St NW, Washington, DC 20011',
    lat: 38.9380,
    lng: -77.0367,
    gregorianDate: 'Sunday, Aug 23, 2026',
    ethiopianDate: 'ነሐሴ ፲፯, ፳፻፲፰ ዓ.ም',
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    recurrence: 'weekly',
    recurrenceLabel: 'Weekly every Sunday',
    eventType: 'Sermon',
    isFree: true,
    isHybrid: true,
    streamingUrl: 'https://youtube.com/@EOTCDCMedhaneAlem',
    rsvpCount: 56,
    capacity: 120,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Weekly+Bible+Study+DC+EOTC&dates=20260823T100000Z/20260823T120000Z&location=4401+16th+St+NW+Washington+DC',
    contactName: 'Deacon Yonas Bekele',
    contactEmail: 'education@eotcdc.org',
    dateCategory: 'this_week',
  },

  /* ── 10. Frankfurt — Ethiopian New Year (Enkutatash) ── */
  {
    id: 'ev10',
    slug: 'enkutatash-frankfurt-2026',
    titleEn: 'Ethiopian New Year (Enkutatash) Celebration',
    titleAm: 'ዕንቁጣጣሽ — የኢትዮጵያ ዘመን አዲስ ዓመት — ፍራንክፈርት',
    descriptionEn:
      'Join the Frankfurt EOTC community for the Ethiopian New Year (Enkutatash / ዕንቁጣጣሽ) — Year 2019 E.C. celebration. Cultural music, children\'s singing, traditional food, and a blessing service.',
    descriptionAm:
      '፳፻፲፱ ዓ.ም ዋዜማ — ባህላዊ ዝማሬና ዘፈን፣ ሕፃናት ዕንቁጣጣሽ ዘፈን፣ ምግብ፣ ቡና አቀራረብ፣ ጸሎተ ቡራኬ።',
    churchId: 'c25',
    churchNameEnglish: 'Debre Sina St. George – Frankfurt',
    churchNameAmharic: 'ፍራንክፈርት ደብረ ሲና ቅዱስ ጊዮርጊስ',
    diocese: 'Germany Diocese',
    city: 'Frankfurt',
    country: 'Germany',
    address: 'Sachsenhausen, Frankfurt am Main',
    lat: 50.0969,
    lng: 8.6820,
    gregorianDate: 'Thursday, Sep 10, 2026',
    ethiopianDate: 'ጳጉሜ ፮, ፳፻፲፰ ዓ.ም',
    startTime: '5:00 PM',
    endTime: '10:00 PM',
    recurrence: 'annual',
    recurrenceLabel: 'Annual New Year (መስከረም ፩)',
    eventType: 'Community Meal',
    isFree: false,
    ticketPrice: '€10 per adult, children free',
    isHybrid: false,
    rsvpCount: 134,
    capacity: 200,
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80',
    gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ethiopian+New+Year+Frankfurt&dates=20260910T140000Z/20260910T190000Z&location=Sachsenhausen+Frankfurt',
    contactName: 'Weizero Miriam',
    contactEmail: 'events@eotcfrankfurt.de',
    dateCategory: 'upcoming',
  },
];
