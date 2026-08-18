export interface CalendarDay {
  ethiopianDate: string; // e.g. "ነሐሴ ፮"
  gregorianDate: string; // e.g. "Aug 12, 2026"
  isFeast: boolean;
  isMajorFeast: boolean;
  isFast: boolean;
  fastName?: string;
  feastNameAmharic?: string;
  feastNameEnglish?: string;
  saintOfDayAmharic: string;
  saintOfDayEnglish: string;
  psalmReading: string;
  epistleReading: string;
  gospelReading: string;
  fastingGuidance: string;
  saintBioText: string;
}

export const MOCK_CALENDAR_EVENTS: Record<string, CalendarDay> = {
  '2026-08-12': {
    ethiopianDate: 'ነሐሴ ፮ (Nehase 6)',
    gregorianDate: 'August 12, 2026',
    isFeast: true,
    isMajorFeast: true,
    isFast: true,
    fastName: 'ፆመ ፍልሰታ (Filseta Fast - Dormition Fast)',
    feastNameAmharic: 'ደብረ ታቦር / ኢየሱስ (Transfiguration / Feast of Jesus)',
    feastNameEnglish: 'Debre Tabor (Feast of Transfiguration)',
    saintOfDayAmharic: 'ቅዱስ እግዚአብሔር አብ / ቅዱስ ኢየሱስ / አባ ጊዮርጊስ ዘጋሥጫ',
    saintOfDayEnglish: 'Debre Tabor & Abba Giyorgis of Gasicha',
    psalmReading: 'መዝሙር ፹፱ ፡ ፲፪ (Psalm 89:12)',
    epistleReading: '፪ኛ ጴጥሮስ ፩ ፡ ፲፮ - ፲፰ (2 Peter 1:16-18)',
    gospelReading: 'ማቴዎስ ፲፯ ፡ ፩ - ፱ (Matthew 17:1-9)',
    fastingGuidance: 'Strict vegan fast until 3:00 PM (9:00 local Ethiopic time). No meat, dairy, or eggs.',
    saintBioText: 'Debre Tabor (Mount Tabor) commemorates the divine Transfiguration of Our Lord Jesus Christ in glory before Apostles Peter, James, and John, revealed alongside Moses and Elijah.',
  },
  '2026-08-13': {
    ethiopianDate: 'ነሐሴ ፯ (Nehase 7)',
    gregorianDate: 'August 13, 2026',
    isFeast: false,
    isMajorFeast: false,
    isFast: true,
    fastName: 'ፆመ ፍልሰታ (Filseta Fast)',
    saintOfDayAmharic: 'አባ ፬ቱ እንስሳ (Four Living Creatures)',
    saintOfDayEnglish: 'The Four Living Heavenly Creatures',
    psalmReading: 'መዝሙር ፻፫ ፡ ፳ (Psalm 103:20)',
    epistleReading: 'ዕብራውያን ፩ ፡ ፩ - ፲፬ (Hebrews 1:1-14)',
    gospelReading: 'ዮሐንስ ፩ ፡ ፵፯ - ፭፩ (John 1:47-51)',
    fastingGuidance: 'Filseta fast continues with water and prayer until 3:00 PM.',
    saintBioText: 'Commemoration of the Heavenly Beings who carry the divine throne of God, praised in Ezekiel and Revelation.',
  },
  '2026-08-16': {
    ethiopianDate: 'ነሐሴ ፲ (Nehase 10)',
    gregorianDate: 'August 16, 2026',
    isFeast: true,
    isMajorFeast: true,
    isFast: true,
    fastName: 'ፆመ ፍልሰታ',
    feastNameAmharic: 'ቅድስት ማርያም (Feast of St. Mary - Filseta)',
    feastNameEnglish: 'Feast of the Assumption/Assumption of St. Mary',
    saintOfDayAmharic: 'እመቤታችን ቅድስት ድንግል ማርያም',
    saintOfDayEnglish: 'Holy Virgin Mary (Filseta)',
    psalmReading: 'መዝሙር ፵፭ ፡ ፱ (Psalm 45:9)',
    epistleReading: 'ገላትያ ፫ ፡ ፳፫ - ፳፱ (Galatians 3:23-29)',
    gospelReading: 'ሉቃስ ፩ ፡ ፴፱ - ፭፮ (Luke 1:39-56)',
    fastingGuidance: 'Feast day liturgy; traditional bread (Mulmul) given to children.',
    saintBioText: 'Filseta commemorates the bodily assumption of the Holy Virgin Mary into heaven, celebrated with 16 days of intense fasting and liturgy.',
  },
  '2026-09-11': {
    ethiopianDate: 'መስከረም ፩ (Meskerem 1)',
    gregorianDate: 'September 11, 2026',
    isFeast: true,
    isMajorFeast: true,
    isFast: false,
    feastNameAmharic: 'እንቁጣጣሽ / ቅዱስ ዮሐንስ (Enkutatash / Ethiopian New Year)',
    feastNameEnglish: 'Enkutatash (Ethiopian New Year 2019 E.C.)',
    saintOfDayAmharic: 'ቅዱስ ዮሐንስ መጥምቅ (St. John the Baptist)',
    saintOfDayEnglish: 'Saint John the Baptist',
    psalmReading: 'መዝሙር ፷፭ ፡ ፲፩ (Psalm 65:11)',
    epistleReading: 'ዕብራውያን ፲፩ ፡ ፴፪ - ፵ (Hebrews 11:32-40)',
    gospelReading: 'ዮሐንስ ፩ ፡ ፲፱ - ፳፰ (John 1:19-28)',
    fastingGuidance: 'Non-fasting joy day! Traditional yellow Adey Abeba flowers & songs.',
    saintBioText: 'Enkutatash marks the end of the rainy season and the return of the Queen of Sheba to Jerusalem with jewels.',
  },
  '2026-09-27': {
    ethiopianDate: 'መስከረም ፲፯ (Meskerem 17)',
    gregorianDate: 'September 27, 2026',
    isFeast: true,
    isMajorFeast: true,
    isFast: false,
    feastNameAmharic: 'መስቀል (Meskel - Finding of True Cross)',
    feastNameEnglish: 'Meskel (Finding of the True Cross)',
    saintOfDayAmharic: 'ንሥር እሌኒ / ቅዱስ መስቀል (Empress Helena & True Cross)',
    saintOfDayEnglish: 'Empress Helena & The Holy Cross',
    psalmReading: 'መዝሙር ፷፯ ፡ ፩ (Psalm 67:1)',
    epistleReading: '፩ኛ ቆሮንቶስ ፩ ፡ ፲፰ - ፳፭ (1 Corinthians 1:18-25)',
    gospelReading: 'ማቴዎስ ፳፬ ፡ ፳፫ - ፴፩ (Matthew 24:23-31)',
    fastingGuidance: 'Demera bonfire lighting eve & grand feast.',
    saintBioText: 'Meskel commemorates Empress Helena discovering the True Cross of Christ in Jerusalem in 326 AD using smoke from incense.',
  }
};

export const UPCOMING_FEASTS = [
  { id: 1, nameAmharic: 'ደብረ ታቦር', nameEnglish: 'Debre Tabor (Transfiguration)', dateEth: 'ነሐሴ ፮', dateGreg: 'Aug 12, 2026', daysLeft: 0, category: 'Major Lord’s Feast' },
  { id: 2, nameAmharic: 'ዕርገተ ማርያም (ፍልሰታ)', nameEnglish: 'Assumption of St. Mary', dateEth: 'ነሐሴ ፲፮', dateGreg: 'Aug 22, 2026', daysLeft: 10, category: 'Major Marian Feast' },
  { id: 3, nameAmharic: 'እንቁጣጣሽ (አዲስ ዓመት)', nameEnglish: 'Enkutatash (Ethiopian New Year 2019 E.C.)', dateEth: 'መስከረም ፩', dateGreg: 'Sep 11, 2026', daysLeft: 30, category: 'National Liturgical Feast' },
  { id: 4, nameAmharic: 'መስቀል', nameEnglish: 'Meskel (Finding of the True Cross)', dateEth: 'መስከረም ፲፯', dateGreg: 'Sep 27, 2026', daysLeft: 46, category: 'Major Feast' },
  { id: 5, nameAmharic: 'ህዳር ጽዮን', nameEnglish: 'Hidar Zion (St. Mary of Zion)', dateEth: 'ህዳር ፳፩', dateGreg: 'Nov 30, 2026', daysLeft: 110, category: 'Patronal Feast' },
];
