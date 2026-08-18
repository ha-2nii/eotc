export type ChurchType = 'Parish' | 'Mission' | 'Home Fellowship';

export interface ClergyMember {
  name: string;
  nameAmharic?: string;
  role: string;
  roleAmharic?: string;
}

export interface ServiceScheduleItem {
  day: string;
  dayAmharic?: string;
  title: string;
  titleAmharic?: string;
  time: string;
  language: string;
}

export interface Church {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  tabotPatron: string;
  diocese: string;
  country: string;
  city: string;
  address: string;
  languages: string[];
  lat: number;
  lng: number;
  distanceKm: number;
  serviceTime: string;
  photoUrl: string;
  hasLiveStream: boolean;
  phone: string;
  email: string;
  website: string;
  churchType: ChurchType;
  clergyList: ClergyMember[];
  fullServiceSchedule: ServiceScheduleItem[];
  streamingUrl?: string;
  upcomingEvents: { name: string; date: string }[];
}

const IMG1 = 'https://images.unsplash.com/photo-1548625361-1858548972b2?auto=format&fit=crop&q=80&w=800';
const IMG2 = 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800';
const IMG3 = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800';

export const MOCK_CHURCHES: Church[] = [
  /* ── ADDIS ABABA ───────────────────────────────────────────── */
  {
    id: 'c1',
    nameAmharic: 'መንበረ ፓትርያርክ ቅድስት ሥላሴ ካቴድራል',
    nameEnglish: 'Holy Trinity Cathedral (Patriarchate)',
    tabotPatron: 'Holy Trinity (ቅድስት ሥላሴ)',
    diocese: 'Addis Ababa Diocese',
    country: 'Ethiopia', city: 'Addis Ababa',
    address: 'Arat Kilo, Addis Ababa',
    languages: ["Ge'ez", 'Amharic', 'English'],
    lat: 9.0305, lng: 38.7628, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:30 AM',
    photoUrl: IMG1, hasLiveStream: true,
    phone: '+251 11 123 4567', email: 'contact@holytrinitycathedral.et', website: 'https://eotc.org.et',
    churchType: 'Parish',
    clergyList: [
      { name: 'Abba Gebre Selassie', nameAmharic: 'መልአከ ሰላም አባ ገብረ ሥላሴ', role: 'Head Priest (መልአከ ሰላም)', roleAmharic: 'የካቴድራሉ አስተዳዳሪ' },
      { name: 'Kesis Yohannes Mengistu', nameAmharic: 'ቀሲስ ዮሐንስ መንግሥቱ', role: 'Chief Liturgist (ቀሲስ)', roleAmharic: 'የቅዳሴ መሪ' },
      { name: 'Archdeacon Daniel Tadesse', nameAmharic: 'ሊቀ ዲያቆን ዳንኤል ታደሰ', role: 'Archdeacon (ሊቀ ዲያቆናት)', roleAmharic: 'ሊቀ ዲያቆናት' }
    ],
    fullServiceSchedule: [
      { day: 'Sundays', dayAmharic: 'እሑድ', title: 'Divine Liturgy (Kidase)', titleAmharic: 'የማለዳ ቅዳሴ', time: '6:00 AM – 10:30 AM', language: "Ge'ez / Amharic / English" },
      { day: 'Saturdays', dayAmharic: 'ቅዳሜ', title: 'Evening Mahlet & Wazim', titleAmharic: 'ዋዜማና ማኅሌት', time: '8:00 PM – 11:30 PM', language: "Ge'ez" },
      { day: 'Wed & Fri', dayAmharic: 'ረቡዕና ዓርብ', title: 'Fasting Liturgy', titleAmharic: 'የጾም ቅዳሴ', time: '1:00 PM – 3:30 PM', language: "Ge'ez / Amharic" },
      { day: 'Sundays', dayAmharic: 'እሑድ', title: 'Sunday School & Youth Choir', titleAmharic: 'የሰንበት ትምህርት ቤት', time: '11:00 AM – 1:00 PM', language: 'Amharic / English' }
    ],
    streamingUrl: 'https://youtube.com/@EOTCTvOfficial',
    upcomingEvents: [{ name: 'Holy Trinity Feast', date: 'Hidar 7' }],
  },
  {
    id: 'c2',
    nameAmharic: 'ደብረ ጽዮን ቅድስት ማርያም ቤተ ክርስቲያን',
    nameEnglish: 'Debre Zion St. Mary Church – Entoto',
    tabotPatron: 'St. Mary (ቅድስት ማርያም)',
    diocese: 'Addis Ababa Diocese',
    country: 'Ethiopia', city: 'Addis Ababa',
    address: 'Entoto Hill, Addis Ababa',
    languages: ["Ge'ez", 'Amharic'],
    lat: 9.0824, lng: 38.7552, distanceKm: 0,
    serviceTime: 'Daily 6:00 AM – 9:00 AM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+251 11 234 5678', email: 'entoto@eotc.et', website: 'https://eotc.org.et',
    churchType: 'Parish',
    clergyList: [
      { name: 'Megabe Hadis Eshete', nameAmharic: 'መልአከ ብርሃን አባ እሸቴ', role: 'Abbot & Head Priest', roleAmharic: 'የገዳሙ አስተዳዳሪ' },
      { name: 'Kesis Haile Gabriel', nameAmharic: 'ቀሲስ ኃይለ ገብርኤል', role: 'Parish Priest', roleAmharic: 'የደብር ካህን' }
    ],
    fullServiceSchedule: [
      { day: 'Daily', dayAmharic: 'በየዕለቱ', title: 'Morning Liturgy', titleAmharic: 'የማለዳ ጸሎትና ቅዳሴ', time: '6:00 AM – 9:00 AM', language: "Ge'ez / Amharic" },
      { day: 'Sundays', dayAmharic: 'እሑድ', title: 'Solemn Divine Liturgy', titleAmharic: 'የእሑድ ቅዳሴ', time: '6:00 AM – 10:00 AM', language: "Ge'ez / Amharic" }
    ],
    upcomingEvents: [{ name: 'Entoto Maryam Feast', date: 'Nehase 16' }],
  },
  {
    id: 'c3',
    nameAmharic: 'ቅዱስ ሚካኤል ቤተ ክርስቲያን — ቦሌ',
    nameEnglish: 'St. Michael Church – Bole',
    tabotPatron: 'St. Michael (ቅዱስ ሚካኤል)',
    diocese: 'Addis Ababa Diocese',
    country: 'Ethiopia', city: 'Addis Ababa',
    address: 'Bole Sub-City, Addis Ababa',
    languages: ["Ge'ez", 'Amharic', 'English'],
    lat: 8.9940, lng: 38.8023, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 11:00 AM',
    photoUrl: IMG3, hasLiveStream: true,
    phone: '+251 11 345 6789', email: 'bole.michael@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [{ name: 'St. Michael Feast', date: 'Hidar 12' }],
  },
  {
    id: 'c4',
    nameAmharic: 'ቅዱስ ገብርኤል ቤተ ክርስቲያን — ቦሌ',
    nameEnglish: 'St. Gabriel Church – Bole',
    tabotPatron: 'St. Gabriel (ቅዱስ ገብርኤል)',
    diocese: 'Addis Ababa Diocese',
    country: 'Ethiopia', city: 'Addis Ababa',
    address: 'Bole Bulbula, Addis Ababa',
    languages: ["Ge'ez", 'Amharic'],
    lat: 8.9823, lng: 38.8134, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+251 11 456 7890', email: 'bole.gabriel@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [{ name: 'St. Gabriel Feast', date: 'Tahsas 19' }],
  },
  {
    id: 'c5',
    nameAmharic: 'ቅዱስ ዮሐንስ ቤተ ክርስቲያን — ካዛንቺስ',
    nameEnglish: 'St. John Church – Kazanchis',
    tabotPatron: 'St. John (ቅዱስ ዮሐንስ)',
    diocese: 'Addis Ababa Diocese',
    country: 'Ethiopia', city: 'Addis Ababa',
    address: 'Kazanchis, Addis Ababa',
    languages: ["Ge'ez", 'Amharic'],
    lat: 9.0145, lng: 38.7734, distanceKm: 0,
    serviceTime: 'Sundays 6:30 AM – 10:30 AM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+251 11 567 8901', email: 'kazanchis.john@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },
  {
    id: 'c6',
    nameAmharic: 'ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን — ፒያሳ',
    nameEnglish: 'St. George Cathedral – Piazza',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Addis Ababa Diocese',
    country: 'Ethiopia', city: 'Addis Ababa',
    address: 'Piazza, Addis Ababa',
    languages: ["Ge'ez", 'Amharic', 'English'],
    lat: 9.0350, lng: 38.7510, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 11:00 AM',
    photoUrl: IMG3, hasLiveStream: true,
    phone: '+251 11 678 9012', email: 'stgeorge@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [{ name: 'St. George Feast', date: 'Miyazya 23' }],
  },
  {
    id: 'c7',
    nameAmharic: 'ቅዱስ ተክለ ሃይማኖት ቤተ ክርስቲያን — አዲስ ከተማ',
    nameEnglish: 'St. Tekle Haymanot Church – Addis Ketema',
    tabotPatron: 'St. Tekle Haymanot (ቅዱስ ተክለ ሃይማኖት)',
    diocese: 'Addis Ababa Diocese',
    country: 'Ethiopia', city: 'Addis Ababa',
    address: 'Addis Ketema Sub-City, Addis Ababa',
    languages: ["Ge'ez", 'Amharic'],
    lat: 9.0469, lng: 38.7376, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+251 11 789 0123', email: 'teklehaimanot.aa@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },
  {
    id: 'c8',
    nameAmharic: 'ደብረ ዘይት ቅዱስ ሚካኤል ቤተ ክርስቲያን',
    nameEnglish: 'St. Michael Church – Debre Zeit (Bishoftu)',
    tabotPatron: 'St. Michael (ቅዱስ ሚካኤል)',
    diocese: 'East Shewa Diocese',
    country: 'Ethiopia', city: 'Bishoftu',
    address: 'Main Street, Bishoftu (Debre Zeit)',
    languages: ["Ge'ez", 'Amharic'],
    lat: 8.7506, lng: 38.9813, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+251 11 890 1234', email: 'bishoftu.michael@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },

  /* ── GONDAR ────────────────────────────────────────────────── */
  {
    id: 'c9',
    nameAmharic: 'ደብረ ብርሃን ሥላሴ ቤተ ክርስቲያን — ጎንደር',
    nameEnglish: 'Debre Birhan Selassie Church – Gondar',
    tabotPatron: 'Holy Trinity (ቅድስት ሥላሴ)',
    diocese: 'Gondar Diocese',
    country: 'Ethiopia', city: 'Gondar',
    address: 'Gondar City, Amhara Region',
    languages: ["Ge'ez", 'Amharic'],
    lat: 12.6090, lng: 37.4685, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG3, hasLiveStream: false,
    phone: '+251 58 111 2222', email: 'selassie.gondar@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [{ name: 'Timkat Celebration', date: 'Tir 11' }],
  },
  {
    id: 'c10',
    nameAmharic: 'ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን — ጎንደር',
    nameEnglish: 'St. George Church – Gondar',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Gondar Diocese',
    country: 'Ethiopia', city: 'Gondar',
    address: 'Azezo Area, Gondar',
    languages: ["Ge'ez", 'Amharic'],
    lat: 12.5240, lng: 37.4520, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+251 58 222 3333', email: 'george.gondar@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },

  /* ── LALIBELA ──────────────────────────────────────────────── */
  {
    id: 'c11',
    nameAmharic: 'ቤተ ጊዮርጊስ — ላሊበላ',
    nameEnglish: 'Bete Giyorgis Rock-Hewn Church – Lalibela',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Lalibela Diocese',
    country: 'Ethiopia', city: 'Lalibela',
    address: 'Lalibela, North Wollo, Amhara',
    languages: ["Ge'ez", 'Amharic'],
    lat: 12.0319, lng: 39.0467, distanceKm: 0,
    serviceTime: 'Daily 6:00 AM – 9:00 AM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+251 33 336 0001', email: 'lalibela@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [{ name: 'Lalibela Genna Christmas', date: 'Tahsas 29' }],
  },
  {
    id: 'c12',
    nameAmharic: 'ቤተ ማርያም — ላሊበላ',
    nameEnglish: 'Bete Maryam Rock-Hewn Church – Lalibela',
    tabotPatron: 'St. Mary (ቅድስት ማርያም)',
    diocese: 'Lalibela Diocese',
    country: 'Ethiopia', city: 'Lalibela',
    address: 'Northern Cluster, Lalibela',
    languages: ["Ge'ez", 'Amharic'],
    lat: 12.0314, lng: 39.0449, distanceKm: 0,
    serviceTime: 'Daily 6:00 AM – 9:00 AM',
    photoUrl: IMG3, hasLiveStream: false,
    phone: '+251 33 336 0002', email: 'bete.maryam@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },

  /* ── AXUM ──────────────────────────────────────────────────── */
  {
    id: 'c13',
    nameAmharic: 'ጽዮን ማርያም ቤተ ክርስቲያን — አክሱም',
    nameEnglish: 'St. Mary of Zion Cathedral – Axum',
    tabotPatron: 'St. Mary of Zion (ጽዮን ማርያም)',
    diocese: 'Axum Diocese',
    country: 'Ethiopia', city: 'Axum',
    address: 'Axum City, Tigray Region',
    languages: ["Ge'ez", 'Tigrinya', 'Amharic'],
    lat: 14.1213, lng: 38.7253, distanceKm: 0,
    serviceTime: 'Daily 5:30 AM – 9:00 AM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+251 34 775 0001', email: 'zion.axum@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [{ name: 'Hidar Zion Feast', date: 'Hidar 21' }],
  },

  /* ── BAHIR DAR ─────────────────────────────────────────────── */
  {
    id: 'c14',
    nameAmharic: 'ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን — ባሕር ዳር',
    nameEnglish: 'St. George Church – Bahir Dar',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Bahir Dar Diocese',
    country: 'Ethiopia', city: 'Bahir Dar',
    address: 'Bahir Dar City, Amhara Region',
    languages: ["Ge'ez", 'Amharic'],
    lat: 11.5936, lng: 37.3905, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+251 58 220 1111', email: 'stgeorge.bahirdar@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },
  {
    id: 'c15',
    nameAmharic: 'ደብረ ማርያም ቤተ ክርስቲያን — ጣና ሐይቅ',
    nameEnglish: 'Debre Maryam Island Monastery – Lake Tana',
    tabotPatron: 'St. Mary (ቅድስት ማርያም)',
    diocese: 'Bahir Dar Diocese',
    country: 'Ethiopia', city: 'Lake Tana',
    address: 'Kebran Gabriel Island, Lake Tana',
    languages: ["Ge'ez", 'Amharic'],
    lat: 11.8750, lng: 37.3560, distanceKm: 0,
    serviceTime: 'Daily 6:00 AM – 9:00 AM',
    photoUrl: IMG3, hasLiveStream: false,
    phone: '+251 58 220 2222', email: 'tana.maryam@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },

  /* ── HAWASSA ───────────────────────────────────────────────── */
  {
    id: 'c16',
    nameAmharic: 'ቅዱስ ሚካኤል ቤተ ክርስቲያን — ሐዋሳ',
    nameEnglish: 'St. Michael Church – Hawassa',
    tabotPatron: 'St. Michael (ቅዱስ ሚካኤል)',
    diocese: 'Sidama Diocese',
    country: 'Ethiopia', city: 'Hawassa',
    address: 'Hawassa City, Sidama Region',
    languages: ["Ge'ez", 'Amharic', 'Sidamic'],
    lat: 7.0621, lng: 38.4767, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+251 46 220 0001', email: 'michael.hawassa@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },

  /* ── MEKELLE ───────────────────────────────────────────────── */
  {
    id: 'c17',
    nameAmharic: 'ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን — መቐለ',
    nameEnglish: 'St. George Church – Mekelle',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Tigray Diocese',
    country: 'Ethiopia', city: 'Mekelle',
    address: 'Mekelle City, Tigray Region',
    languages: ["Ge'ez", 'Tigrinya'],
    lat: 13.4967, lng: 39.4753, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+251 34 440 0001', email: 'george.mekelle@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },

  /* ── DEBRE LIBANOS ─────────────────────────────────────────── */
  {
    id: 'c18',
    nameAmharic: 'ደብረ ሊባኖስ ገዳም',
    nameEnglish: 'Debre Libanos Monastery',
    tabotPatron: 'St. Tekle Haymanot (አቡነ ተክለ ሃይማኖት)',
    diocese: 'North Shewa Diocese',
    country: 'Ethiopia', city: 'Debre Libanos',
    address: 'Debre Libanos Gorge, North Shewa',
    languages: ["Ge'ez", 'Amharic'],
    lat: 9.7183, lng: 38.8475, distanceKm: 0,
    serviceTime: 'Daily 4:00 AM',
    photoUrl: IMG3, hasLiveStream: true,
    phone: '+251 11 987 6543', email: 'info@debrelibanos.org', website: 'https://debrelibanos.org',
    upcomingEvents: [{ name: 'St. Tekle Haymanot Feast', date: 'Nehase 24' }],
  },

  /* ── DIRE DAWA ─────────────────────────────────────────────── */
  {
    id: 'c19',
    nameAmharic: 'ቅዱስ ጊዮርጊስ ቤተ ክርስቲያን — ድሬዳዋ',
    nameEnglish: 'St. George Church – Dire Dawa',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Dire Dawa Diocese',
    country: 'Ethiopia', city: 'Dire Dawa',
    address: 'Dire Dawa City',
    languages: ["Ge'ez", 'Amharic', 'Somali'],
    lat: 9.6008, lng: 41.8661, distanceKm: 0,
    serviceTime: 'Sundays 6:00 AM – 10:00 AM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+251 25 111 0001', email: 'george.diredawa@eotc.et', website: 'https://eotc.org.et',
    upcomingEvents: [],
  },

  /* ── DIASPORA: USA ─────────────────────────────────────────── */
  {
    id: 'c20',
    nameAmharic: 'ዋሽንግተን ዲሲ ደብረ ሰላም ካቴድራል',
    nameEnglish: 'Debre Selam Cathedral – Washington DC',
    tabotPatron: 'St. Gabriel & Medhane Alem',
    diocese: 'North America Diocese',
    country: 'USA', city: 'Washington, D.C.',
    address: '2601 Georgia Ave NW, Washington, DC',
    languages: ['Amharic', 'English', "Ge'ez"],
    lat: 38.9238, lng: -77.0225, distanceKm: 0,
    serviceTime: 'Sundays 7:00 AM – 11:30 AM',
    photoUrl: IMG2, hasLiveStream: true,
    phone: '+1 (202) 555-0192', email: 'info@debreselamdc.org', website: 'https://debreselamdc.org',
    upcomingEvents: [{ name: 'St. Gabriel Feast', date: 'Tahsas 19' }],
  },
  {
    id: 'c21',
    nameAmharic: 'ሎስ አንጀለስ ቤተ ክርስቲያን',
    nameEnglish: 'EOTC Los Angeles Parish',
    tabotPatron: 'St. Mary (ቅድስት ማርያም)',
    diocese: 'North America Diocese',
    country: 'USA', city: 'Los Angeles',
    address: '1234 W Olympic Blvd, Los Angeles, CA',
    languages: ['Amharic', 'English'],
    lat: 34.0522, lng: -118.2437, distanceKm: 0,
    serviceTime: 'Sundays 8:00 AM – 12:00 PM',
    photoUrl: IMG3, hasLiveStream: false,
    phone: '+1 (213) 555-0100', email: 'info@eotcla.org', website: 'https://eotcla.org',
    upcomingEvents: [],
  },
  {
    id: 'c22',
    nameAmharic: 'ሲያትል ቤተ ክርስቲያን',
    nameEnglish: 'EOTC Seattle Parish',
    tabotPatron: 'St. Michael (ቅዱስ ሚካኤል)',
    diocese: 'North America Diocese',
    country: 'USA', city: 'Seattle',
    address: '5678 Rainier Ave S, Seattle, WA',
    languages: ['Amharic', 'English'],
    lat: 47.6062, lng: -122.3321, distanceKm: 0,
    serviceTime: 'Sundays 8:00 AM – 12:00 PM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+1 (206) 555-0200', email: 'info@eotcseattle.org', website: 'https://eotcseattle.org',
    upcomingEvents: [],
  },

  /* ── DIASPORA: EUROPE ──────────────────────────────────────── */
  {
    id: 'c23',
    nameAmharic: 'ለንደን ደብረ ጽዮን ቅድስት ማርያም',
    nameEnglish: 'Debre Zion St. Mary – London',
    tabotPatron: 'St. Mary (ቅድስት ማርያም)',
    diocese: 'UK & Europe Diocese',
    country: 'United Kingdom', city: 'London',
    address: 'Battersea Park Rd, London SW11',
    languages: ['Amharic', 'English', "Ge'ez"],
    lat: 51.476, lng: -0.155, distanceKm: 0,
    serviceTime: 'Sundays 6:30 AM – 11:00 AM',
    photoUrl: IMG2, hasLiveStream: true,
    phone: '+44 20 7123 4567', email: 'stmary@eotc-uk.org', website: 'https://eotc-uk.org',
    upcomingEvents: [{ name: 'Hidar Zion Procession', date: 'Hidar 21' }],
  },
  {
    id: 'c24',
    nameAmharic: 'ስቶክሆልም ቤተ ክርስቲያን',
    nameEnglish: 'EOTC Stockholm Parish',
    tabotPatron: 'Holy Trinity (ቅድስት ሥላሴ)',
    diocese: 'Sweden Diocese',
    country: 'Sweden', city: 'Stockholm',
    address: 'Rinkeby, Stockholm',
    languages: ['Amharic', 'Swedish', "Ge'ez"],
    lat: 59.3850, lng: 17.9250, distanceKm: 0,
    serviceTime: 'Sundays 9:00 AM – 1:00 PM',
    photoUrl: IMG3, hasLiveStream: false,
    phone: '+46 8 123 4567', email: 'stockholm@eotc-europe.org', website: 'https://eotc-europe.org',
    upcomingEvents: [],
  },
  {
    id: 'c25',
    nameAmharic: 'ፍራንክፈርት ቤተ ክርስቲያን',
    nameEnglish: 'EOTC Frankfurt Parish',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Germany Diocese',
    country: 'Germany', city: 'Frankfurt',
    address: 'Sachsenhausen, Frankfurt am Main',
    languages: ['Amharic', 'German', "Ge'ez"],
    lat: 50.1109, lng: 8.6821, distanceKm: 0,
    serviceTime: 'Sundays 9:00 AM – 1:00 PM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+49 69 123 4567', email: 'frankfurt@eotc-europe.org', website: 'https://eotc-europe.org',
    upcomingEvents: [],
  },

  /* ── DIASPORA: MIDDLE EAST / AFRICA ────────────────────────── */
  {
    id: 'c26',
    nameAmharic: 'ዱባይ ቤተ ክርስቲያን',
    nameEnglish: 'EOTC Dubai Parish',
    tabotPatron: 'St. Mary (ቅድስት ማርያም)',
    diocese: 'Middle East Diocese',
    country: 'UAE', city: 'Dubai',
    address: 'Deira, Dubai, UAE',
    languages: ['Amharic', 'English', "Ge'ez"],
    lat: 25.2048, lng: 55.2708, distanceKm: 0,
    serviceTime: 'Fridays 6:00 AM – 10:00 AM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+971 4 123 4567', email: 'dubai@eotc-me.org', website: 'https://eotc-me.org',
    upcomingEvents: [],
  },
  {
    id: 'c27',
    nameAmharic: 'ናይሮቢ ቤተ ክርስቲያን',
    nameEnglish: 'EOTC Nairobi Parish',
    tabotPatron: 'St. Michael (ቅዱስ ሚካኤል)',
    diocese: 'East Africa Diocese',
    country: 'Kenya', city: 'Nairobi',
    address: 'Eastleigh, Nairobi, Kenya',
    languages: ['Amharic', 'English', "Ge'ez"],
    lat: -1.2921, lng: 36.8219, distanceKm: 0,
    serviceTime: 'Sundays 7:00 AM – 11:00 AM',
    photoUrl: IMG3, hasLiveStream: false,
    phone: '+254 20 123 4567', email: 'nairobi@eotc-africa.org', website: 'https://eotc-africa.org',
    upcomingEvents: [],
  },

  /* ── CANADA / AUSTRALIA ────────────────────────────────────── */
  {
    id: 'c28',
    nameAmharic: 'ቶሮንቶ ደብረ ሰላም ቅዱስ ገብርኤል',
    nameEnglish: 'Debre Selam St. Gabriel Cathedral – Toronto',
    tabotPatron: 'St. Gabriel (ቅዱስ ገብርኤል)',
    diocese: 'Canada Diocese',
    country: 'Canada', city: 'Toronto',
    address: 'Scarborough, Toronto, ON',
    languages: ['Amharic', 'English', "Ge'ez"],
    lat: 43.7735, lng: -79.2580, distanceKm: 0,
    serviceTime: 'Sundays 8:00 AM – 12:00 PM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+1 (416) 555-0300', email: 'toronto@eotc-canada.org', website: 'https://eotc-canada.org',
    churchType: 'Parish',
    upcomingEvents: [],
  },
  {
    id: 'c29',
    nameAmharic: 'ሜልቦርን ደብረ ገነት ቅድስት ሥላሴ',
    nameEnglish: 'Debre Genet Holy Trinity – Melbourne',
    tabotPatron: 'Holy Trinity (ቅድስት ሥላሴ)',
    diocese: 'Australia Diocese',
    country: 'Australia', city: 'Melbourne',
    address: 'Footscray, Melbourne, VIC',
    languages: ['Amharic', 'English', "Ge'ez"],
    lat: -37.8136, lng: 144.9631, distanceKm: 0,
    serviceTime: 'Sundays 9:00 AM – 1:00 PM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+61 3 1234 5678', email: 'melbourne@eotc-australia.org', website: 'https://eotc-australia.org',
    churchType: 'Parish',
    upcomingEvents: [],
  },

  /* ── MISSIONS & HOME FELLOWSHIPS ───────────────────────────── */
  {
    id: 'c30',
    nameAmharic: 'የቅድስት ድንግል ማርያም የተልእኮ ማዕከል — ዳላስ',
    nameEnglish: 'St. Mary EOTC Mission Center – Dallas',
    tabotPatron: 'St. Mary (ቅድስት ማርያም)',
    diocese: 'North America Diocese',
    country: 'USA', city: 'Dallas',
    address: '1420 W Mockingbird Ln, Dallas, TX 75247',
    languages: ['English', 'Amharic', "Ge'ez"],
    lat: 32.8163, lng: -96.8687, distanceKm: 0,
    serviceTime: 'Sundays 8:30 AM – 11:30 AM',
    photoUrl: IMG3, hasLiveStream: true,
    phone: '+1 (214) 555-0188', email: 'dallas.mission@eotc-na.org', website: 'https://eotc-na.org',
    churchType: 'Mission',
    clergyList: [
      { name: 'Kesis Dawit Bekele', nameAmharic: 'ቀሲስ ዳዊት በቀለ', role: 'Mission Priest & Evangelist', roleAmharic: 'የተልእኮ ካህን' },
      { name: 'Deacon Samuel Alemu', nameAmharic: 'ዲያቆን ሳሙኤል ዓለሙ', role: 'Deacon & Youth Ministry Lead', roleAmharic: 'የወጣቶች መሪ' }
    ],
    fullServiceSchedule: [
      { day: 'Sundays', dayAmharic: 'እሑድ', title: 'English & Amharic Liturgy', titleAmharic: 'የእሑድ ቅዳሴ', time: '8:30 AM – 11:30 AM', language: 'English / Amharic' },
      { day: 'Thursdays', dayAmharic: 'ሐሙስ', title: 'Youth Scripture Study', titleAmharic: 'የመጽሐፍ ቅዱስ ጥናት', time: '7:00 PM – 8:30 PM', language: 'English' }
    ],
    streamingUrl: 'https://youtube.com/@EOTCDallasMission',
    upcomingEvents: [{ name: 'North Texas Tewahedo Youth Camp', date: 'Tahsas 15' }],
  },
  {
    id: 'c31',
    nameAmharic: 'ቅዱስ ሚካኤል የተልእኮ ማኅበር — ማንቸስተር',
    nameEnglish: 'St. Michael Mission Fellowship – Manchester',
    tabotPatron: 'St. Michael (ቅዱስ ሚካኤል)',
    diocese: 'UK & Europe Diocese',
    country: 'United Kingdom', city: 'Manchester',
    address: 'Oxford Rd, Manchester M13 9PL',
    languages: ['English', 'Amharic', "Ge'ez"],
    lat: 53.4668, lng: -2.2339, distanceKm: 0,
    serviceTime: 'Sundays 9:00 AM – 12:30 PM',
    photoUrl: IMG1, hasLiveStream: false,
    phone: '+44 161 555 0142', email: 'manchester@eotc-uk.org', website: 'https://eotc-uk.org',
    churchType: 'Mission',
    clergyList: [
      { name: 'Kesis Tewodros Assefa', nameAmharic: 'ቀሲስ ቴዎድሮስ አሰፋ', role: 'Visiting Mission Priest', roleAmharic: 'የተልእኮ ካህን' }
    ],
    fullServiceSchedule: [
      { day: 'Sundays', dayAmharic: 'እሑድ', title: 'Divine Liturgy & Fellowship', titleAmharic: 'ቅዳሴና መንፈሳዊ ጉባኤ', time: '9:00 AM – 12:30 PM', language: 'English / Amharic' }
    ],
    upcomingEvents: [{ name: 'Northern UK Orthodox Conference', date: 'Tir 20' }],
  },
  {
    id: 'c32',
    nameAmharic: 'ቅዱስ ጊዮርጊስ የጸሎት ኅብረት — ካልጋሪ',
    nameEnglish: 'St. George Prayer Fellowship – Calgary',
    tabotPatron: 'St. George (ቅዱስ ጊዮርጊስ)',
    diocese: 'Canada Diocese',
    country: 'Canada', city: 'Calgary',
    address: 'NE Calgary Community Center, Calgary, AB',
    languages: ['Amharic', 'English'],
    lat: 51.0447, lng: -114.0719, distanceKm: 0,
    serviceTime: 'Saturdays 5:00 PM – 8:00 PM',
    photoUrl: IMG2, hasLiveStream: false,
    phone: '+1 (403) 555-0199', email: 'calgary.fellowship@eotc-canada.org', website: 'https://eotc-canada.org',
    churchType: 'Home Fellowship',
    clergyList: [
      { name: 'Megabe Haymanot Berhanu', nameAmharic: 'መጋቤ ሃይማኖት ብርሃኑ', role: 'Fellowship Coordinator & Deacon', roleAmharic: 'የኅብረት አስተባባሪ' }
    ],
    fullServiceSchedule: [
      { day: 'Saturdays', dayAmharic: 'ቅዳሜ', title: 'Vesper Prayers & Wudase Maryam', titleAmharic: 'የምሽት ጸሎትና ውዳሴ ማርያም', time: '5:00 PM – 7:30 PM', language: 'Amharic / English' }
    ],
    upcomingEvents: [],
  },
  {
    id: 'c33',
    nameAmharic: 'ቅድስት ሥላሴ የጸሎት ማኅበር — ጄኔቫ',
    nameEnglish: 'Holy Trinity Fellowship – Geneva',
    tabotPatron: 'Holy Trinity (ቅድስት ሥላሴ)',
    diocese: 'UK & Europe Diocese',
    country: 'Switzerland', city: 'Geneva',
    address: 'Rue de Lausanne, 1202 Genève, Switzerland',
    languages: ['French', 'Amharic', 'English', "Ge'ez"],
    lat: 46.2167, lng: 6.1438, distanceKm: 0,
    serviceTime: 'Saturdays 4:30 PM – 7:30 PM',
    photoUrl: IMG3, hasLiveStream: false,
    phone: '+41 22 555 0177', email: 'geneva@eotc-europe.org', website: 'https://eotc-europe.org',
    churchType: 'Home Fellowship',
    clergyList: [
      { name: 'Kesis Ephrem Girma', nameAmharic: 'ቀሲስ ኤፍሬም ግርማ', role: 'Chaplain to UN & Diaspora', roleAmharic: 'አስተባባሪ ካህን' }
    ],
    fullServiceSchedule: [
      { day: 'Saturdays', dayAmharic: 'ቅዳሜ', title: 'French & Amharic Prayer Service', titleAmharic: 'የጸሎትና ትምህርት ሰዓት', time: '4:30 PM – 7:30 PM', language: 'French / Amharic' }
    ],
    upcomingEvents: [],
  }
].map((c): Church => ({
  ...c,
  churchType: (c.churchType || 'Parish') as ChurchType,
  clergyList: c.clergyList || [
    { name: 'Abba Melake Selam', nameAmharic: 'መልአከ ሰላም', role: 'Parish Priest (ቀሲስ)', roleAmharic: 'የደብር አስተዳዳሪ' },
    { name: 'Deacon Bereket', nameAmharic: 'ዲያቆን በረከት', role: 'Serving Deacon', roleAmharic: 'አገልጋይ ዲያቆን' }
  ],
  fullServiceSchedule: c.fullServiceSchedule || [
    { day: 'Sundays', dayAmharic: 'እሑድ', title: 'Divine Liturgy (Kidase)', titleAmharic: 'የማለዳ ቅዳሴ', time: c.serviceTime || '6:00 AM – 10:30 AM', language: c.languages.join(' / ') },
    { day: 'Wednesdays', dayAmharic: 'ረቡዕ', title: 'Fasting Service', titleAmharic: 'የረቡዕ ጸሎት', time: '1:00 PM – 3:00 PM', language: "Ge'ez / Amharic" }
  ],
  streamingUrl: c.streamingUrl || (c.hasLiveStream ? 'https://youtube.com/@EOTCTvOfficial' : undefined),
  upcomingEvents: c.upcomingEvents || []
}));
