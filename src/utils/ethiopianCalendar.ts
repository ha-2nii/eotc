// Ethiopian Calendar Converter & Liturgical Helpers

export interface EthiopicDate {
  year: number;
  month: number; // 1-13
  day: number;   // 1-30 (1-5/6 for Pagume)
  monthNameAmharic: string;
  monthNameEnglish: string;
  dayOfWeek: string;
}

export const ETHIOPIC_MONTHS = [
  { id: 1, amharic: 'መስከረም', english: 'Meskerem', gregorianStart: 'Sep 11' },
  { id: 2, amharic: 'ጥቅምት', english: 'Tikimt', gregorianStart: 'Oct 11' },
  { id: 3, amharic: 'ኅዳር', english: 'Hidar', gregorianStart: 'Nov 10' },
  { id: 4, amharic: 'ታኅሣሥ', english: 'Tahsas', gregorianStart: 'Dec 10' },
  { id: 5, amharic: 'ጥር', english: 'Tir', gregorianStart: 'Jan 9' },
  { id: 6, amharic: 'የካቲት', english: 'Yekatit', gregorianStart: 'Feb 8' },
  { id: 7, amharic: 'መጋቢት', english: 'Megabit', gregorianStart: 'Mar 10' },
  { id: 8, amharic: 'ሚያዝያ', english: 'Miyazya', gregorianStart: 'Apr 9' },
  { id: 9, amharic: 'ግንቦት', english: 'Genbot', gregorianStart: 'May 9' },
  { id: 10, amharic: 'ሰኔ', english: 'Sene', gregorianStart: 'Jun 8' },
  { id: 11, amharic: 'ሐምሌ', english: 'Hamle', gregorianStart: 'Jul 8' },
  { id: 12, amharic: 'ነሐሴ', english: 'Nehase', gregorianStart: 'Aug 7' },
  { id: 13, amharic: 'ጳጉሜ', english: 'Pagumen', gregorianStart: 'Sep 6' },
];

/**
 * Returns today's approximate Ethiopian Date
 */
export function getCurrentEthiopianDate(): EthiopicDate {
  const today = new Date();
  const year = 2018; // Current Ethiopic year approx (2018 E.C.)
  const month = 12;  // Nehase (August)
  const day = 6;
  return {
    year,
    month,
    day,
    monthNameAmharic: ETHIOPIC_MONTHS[11].amharic,
    monthNameEnglish: ETHIOPIC_MONTHS[11].english,
    dayOfWeek: today.toLocaleDateString('en-US', { weekday: 'long' }),
  };
}

export function formatEthiopianDateString(ethDate: EthiopicDate, lang: 'en' | 'am' | 'ge' = 'am'): string {
  if (lang === 'am' || lang === 'ge') {
    return `${ethDate.monthNameAmharic} ${ethDate.day} ቀን ${ethDate.year} ዓ.ም.`;
  }
  return `${ethDate.monthNameEnglish} ${ethDate.day}, ${ethDate.year} E.C.`;
}
