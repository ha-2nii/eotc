export interface PrayerSection {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  verses: {
    number: number;
    geez: string;
    amharic: string;
    english: string;
  }[];
}

export interface PrayerBook {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  subtitle: string;
  author: string;
  category: string;
  descriptionEn: string;
  descriptionAm: string;
  audioUrl?: string;
  audioDuration?: string;
  recitor?: string;
  sections: PrayerSection[];
}

export const PRAYER_BOOKS: PrayerBook[] = [
  {
    id: 'wudase-mariam',
    titleAmharic: 'ውዳሴ ማርያም (ዘሰባቱ ዕለታት)',
    titleEnglish: 'Wudase Mariam (Praise of Mary - 7 Days)',
    subtitle: 'Daily Praise to the Holy Theotokos composed by St. Ephrem the Syrian & Abba Giyorgis',
    author: 'Saint Ephrem the Syrian (ቅዱስ ኤፍሬም ሶርያዊ)',
    category: 'Daily Marian Praises',
    descriptionEn: 'The core daily prayer of the Ethiopian Orthodox Tewahedo Church, chanted for each day of the week in praise of the Incarnation and the Virgin Mary.',
    descriptionAm: 'በየዕለቱ የሚጸለይና የሚደገም፣ ስለ እመቤታችን ቅድስት ድንግል ማርያምና ስለ ጌታችን ሰው መሆን የሚያወሳ ጥንታዊ የጸሎት መጽሐፍ።',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    audioDuration: '14:20',
    recitor: 'Liqe Mezemeran Tewodros',
    sections: [
      {
        id: 'sunday',
        titleAmharic: 'ውዳሴ ማርያም ዘእሑድ (Sunday)',
        titleEnglish: 'Sunday Praise',
        verses: [
          {
            number: 1,
            geez: 'ፈቃደ ፡ ሠመረ ፡ ወአፍቀረ ፡ ደቂቀ ፡ ሰብእ ፡ እፎ ፡ ተሰብአ ፡ እምቅድስት ፡ ድንግል ።',
            amharic: 'የሰዎችን ልጆች ወደደ፥ ፈቃዱም ሆነ፤ ከቅድስት ድንግል እንዴት ሰው ሆነ?',
            english: 'He loved mankind and willed our salvation; how wondrously He was incarnate of the Holy Virgin!',
          },
          {
            number: 2,
            geez: 'ተፈሥሒ ፡ ኦ ፡ ምልእተ ፡ ጸጋ ፡ እግዚአብሔር ፡ ምስሌኪ ፡ ቡርክት ፡ አንቲ ፡ እምአንስቲ ።',
            amharic: 'ጸጋን የተሞላሽ ሆይ ደስ ይበልሽ፤ እግዚአብሔር ከአንቺ ጋር ነውና፤ ከሴቶች ተለይተሽ የተባረክሽ ነሽ።',
            english: 'Rejoice, O full of grace, the Lord is with thee! Blessed art thou among women, and blessed is the fruit of thy womb.',
          },
          {
            number: 3,
            geez: 'አክሊለ ፡ መመኪያነ ፡ ወመሠረተ ፡ ሕይወትነ ፡ ወመድኃኒተ ፡ ነፍስነ ፡ ድንግል ፡ ማርያም ።',
            amharic: 'የመመኪያችን ዘውድ፣ የሕይወታችን መሠረት፣ የነፍሳችን መድኃኒት ድንግል ማርያም ነሽ።',
            english: 'The crown of our boasting, the foundation of our life, and the salvation of our souls is the Virgin Mary.',
          },
          {
            number: 4,
            geez: 'ሰአሊ ፡ ለነ ፡ ቅድስት ፡ ኀበ ፡ እግዚአብሔር ፡ አምላክነ ፡ ከመ ፡ ይሥረይ ፡ ለነ ፡ ኃጣውኢነ ።',
            amharic: 'ኃጢአታችንን ይቅር ይለን ዘንድ ቅድስት ሆይ ወደ አምላካችን ወደ እግዚአብሔር ለምኚልን።',
            english: 'Pray for us, O Holy Lady, to the Lord our God, that He may forgive us our transgressions.',
          },
        ],
      },
      {
        id: 'monday',
        titleAmharic: 'ውዳሴ ማርያም ዘሰኑይ (Monday)',
        titleEnglish: 'Monday Praise',
        verses: [
          {
            number: 1,
            geez: 'ፈቀደ ፡ እግዚእ ፡ ያግዕዞ ፡ ለአዳም ፡ ኅዙነ ፡ ወትኩዘ ፡ ልብ ።',
            amharic: 'እግዚአብሔር ያዘነውንና ልቡ የተሰበረውን አዳምን ነፃ ያወጣው ዘንድ ወደደ።',
            english: 'The Lord willed to set free Adam, who was sorrowful and broken of heart.',
          },
          {
            number: 2,
            geez: 'ወአግብኦ ፡ ውስተ ፡ ቀዳሚ ፡ መካኑ ፡ በብዙኅ ፡ ሣህሉ ፡ ወምሕረቱ ።',
            amharic: 'በብዙ ይቅርታውና ምሕረቱ ወደ ቀደመው ቦታው መለሰው።',
            english: 'And in the abundance of His compassion and mercy, He restored him to his former dwelling.',
          },
        ],
      },
    ],
  },
  {
    id: 'seytat',
    titleAmharic: 'መጽሐፈ ሰዓታት (Seytat)',
    titleEnglish: 'Seytat — Morning & Evening Prayer (Horologion)',
    subtitle: 'Monastic Nocturnal Vigils & Canonical Liturgical Hours',
    author: 'Saint Abba Giyorgis of Gasicha & Ancient Fathers',
    category: 'Canonical Hours & Vigils',
    descriptionEn: 'The comprehensive Ethiopian Book of Hours, chanted during night vigils, matins, noon, and compline across all monasteries and cathedrals.',
    descriptionAm: 'በገዳማትና በካቴድራሎች በሌሊት፣ በማለዳና በሠርክ ሰዓታት የሚጸለይ የሰዓታት ጸሎት መጽሐፍ።',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    audioDuration: '28:45',
    recitor: 'Monastic Chant Choir of Debre Damo',
    sections: [
      {
        id: 'nocturn',
        titleAmharic: 'ጸሎተ ሌሊት (Night Vigil / Matins)',
        titleEnglish: 'Night Vigil Prayer',
        verses: [
          {
            number: 1,
            geez: 'ስብሐት ፡ ለአብ ፡ ወወልድ ፡ ወመንፈስ ፡ ቅዱስ ፡ ይእዜኒ ፡ ወዘልፈኒ ፡ ወለዓለመ ፡ ዓለም ፡ አሜን ።',
            amharic: 'ለአብ ለወልድ ለመንፈስ ቅዱስ ምስጋና ይሁን፥ ዛሬም ዘወትርም ለዘላለሙ አሜን።',
            english: 'Glory be to the Father, the Son, and the Holy Spirit, now and forever and unto ages of ages. Amen.',
          },
        ],
      },
    ],
  },
  {
    id: 'arganona-wudase',
    titleAmharic: 'አርጋኖነ ውዳሴ (Arganona Wudase)',
    titleEnglish: 'Arganona Wudase — Psalms of Praise to St. Mary',
    subtitle: 'Mystical 365 Chapters & Daily Distribution composed by Abba Giyorgis of Gasicha',
    author: 'Abba Giyorgis of Gasicha (አባ ጊዮርጊስ ዘጋሥጫ)',
    category: 'Mystical Marian Praises',
    descriptionEn: 'The Harp of Praise (Arganon), containing profound theological meditations and praises to the Virgin Mary structured for every day of the year.',
    descriptionAm: 'በ14ኛው መቶ ክፍለ ዘመን በታላቁ ሊቅ በአባ ጊዮርጊስ ዘጋሥጫ የተደረሰ፣ ጥልቅ የነገረ መለኮትና የፍቅር ምስጋና የያዘ ድንቅ መጽሐፍ።',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    audioDuration: '18:10',
    recitor: 'Mergheta Solomon & Clergy',
    sections: [
      {
        id: 'monday-arganon',
        titleAmharic: 'አርጋኖን ዘሰኑይ (Monday Praise)',
        titleEnglish: 'Monday Arganon',
        verses: [
          {
            number: 1,
            geez: 'መዝሙር ፡ ሐዲስ ፡ ዘአስተጋበኦ ፡ አባ ፡ ጊዮርጊስ ፡ ዘጋሥጫ ፡ ለመወድሰ ፡ እግዝእትነ ፡ ማርያም ።',
            amharic: 'አባ ጊዮርጊስ ዘጋሥጫ እመቤታችን ድንግል ማርያምን ለማመስገን ያዘጋጀው አዲስ መዝሙር።',
            english: 'A new canticle gathered by Abba Giyorgis of Gasicha to extol our Lady Mary, the Mother of God.',
          },
        ],
      },
    ],
  },
  {
    id: 'metshaf-tselot',
    titleAmharic: 'መጽሐፈ ጸሎት (Metshaf Tselot)',
    titleEnglish: 'Metshaf Tselot — General Daily Prayer Book',
    subtitle: 'Daily Devotions, The Nicene Creed, Psalm 50, and Penitential Prayers',
    author: 'Apostolic Tradition (ሥርዓተ ሐዋርያት)',
    category: 'General Daily Prayers',
    descriptionEn: 'The daily prayer book for every Orthodox Christian household, containing morning prayers, the Nicene Creed (ጸሎተ ሃይማኖት), Lord’s Prayer, and litanies.',
    descriptionAm: 'ለእያንዳንዱ ክርስቲያን የዘወትር ጸሎት፣ ጸሎተ ሃይማኖትን፣ አቡነ ዘበሰማያትንና የይቅርታ ምልጃዎችን የያዘ መጽሐፍ።',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    audioDuration: '12:00',
    recitor: 'Archpriest & Choir',
    sections: [
      {
        id: 'creed',
        titleAmharic: 'ጸሎተ ሃይማኖት (Nicene Creed)',
        titleEnglish: 'The Orthodox Creed',
        verses: [
          {
            number: 1,
            geez: 'ነአምን ፡ በአሐዱ ፡ አምላክ ፡ እግዚአብሔር ፡ አብ ፡ አኃዜ ፡ ኵሉ ፡ ገባሬ ፡ ሰማይ ፡ ወምድር ።',
            amharic: 'ሁሉን በፈጠረ በአንድ አምላክ በእግዚአብሔር አብ እናምናለን፤ ሰማይንና ምድርን በፈጠረ።',
            english: 'We believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.',
          },
        ],
      },
    ],
  },
  {
    id: 'selam',
    titleAmharic: 'ሰላመ ማርያም (Selam — Salutations of St. Mary)',
    titleEnglish: 'Selam — Salutations of St. Mary & Feast Melkea',
    subtitle: 'Hymns of Peaceful Greeting for Every Sacred Feast & Saintly Commemoration',
    author: 'Saint Yared & Liturgical Poets',
    category: 'Festal Salutations',
    descriptionEn: 'Poetic salutations (ሰላም) chanted for major Marian feasts: Aster’eyo, Tsigie, Lideta, Ba’ata, and Filseta.',
    descriptionAm: 'በዓመቱ ውስጥ በሚከበሩ በእመቤታችን በዓላት ወቅት የሚጸለይና የሚዘመር የሰላምታና የምስጋና ጸሎት።',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    audioDuration: '15:30',
    recitor: 'Liqe Mezemeran Choir',
    sections: [
      {
        id: 'filseta',
        titleAmharic: 'ሰላም ዘፍልሰታ (Feast of the Assumption)',
        titleEnglish: 'Salutation of Filseta',
        verses: [
          {
            number: 1,
            geez: 'ሰላም ፡ ለፍልሰተ ፡ ሥጋኪ ፡ ድንግል ፡ ማርያም ፡ ዘተነሥአ ፡ ውስተ ፡ ሰማይ ።',
            amharic: 'ወደ ሰማይ ለተነሣው ለሥጋሽ ፍልሰት ሰላምታ ይገባል ድንግል ማርያም ሆይ።',
            english: 'Peace be unto the bodily Assumption of thee into the heavens, O Virgin Mary.',
          },
        ],
      },
    ],
  },
  {
    id: 'ye-selot-metsihaf',
    titleAmharic: 'የጸሎት መጽሐፍ (Ye-Selot Metsihaf — Horologion)',
    titleEnglish: 'Ye-Selot Metsihaf — Canonical Book of Hours',
    subtitle: 'The Canonical Hours of Prayer: 3rd, 6th, 9th, and 12th Hours',
    author: 'Church Fathers (አበው ሊቃውንት)',
    category: 'Canonical Daytime Hours',
    descriptionEn: 'The traditional Ethiopian Horologion detailing prayers for the 3rd hour (Teret), 6th hour (Qetr), 9th hour (Nono), and Evening.',
    descriptionAm: 'በ፫ቱ፣ በ፮ቱ፣ በ፱ቱና በ፲፪ቱ ሰዓት የሚጸለዩ የዕለቱ ቀኖናዊ የጸሎት ሰዓታት።',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    audioDuration: '22:15',
    recitor: 'Abba Yohannes & Monks',
    sections: [
      {
        id: 'hour3',
        titleAmharic: 'ጸሎተ ሠለስት (Third Hour — 9:00 AM)',
        titleEnglish: 'Third Hour Prayer',
        verses: [
          {
            number: 1,
            geez: 'ኦ ፡ ጐሥዓ ፡ ልብየ ፡ ቃለ ፡ ሠናየ ፡ ወአነ ፡ እነግር ፡ ግብርየ ፡ ለንጉሥ ።',
            amharic: 'ልቤ መልካም ነገርን አወጣ፤ እኔ ሥራዬን ለንጉሥ እነግራለሁ።',
            english: 'My heart is inditing a good matter: I speak of the things which I have made touching the king.',
          },
        ],
      },
    ],
  },
];

export interface ChantVerse {
  id: string;
  number: number;
  role?: 'Priest' | 'Deacon' | 'People' | 'Cantor' | 'Choir';
  roleGeez?: string;
  geez: string;
  amharic: string;
  english: string;
  zemaNotation?: string;
  audioTimestampSecs?: number;
}

export interface ChantSection {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  titleGeez: string;
  description?: string;
  verses: ChantVerse[];
}

export interface ChantService {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  titleGeez: string;
  subtitle: string;
  category: string;
  audioUrl?: string;
  audioDuration?: string;
  sections: ChantSection[];
}

export const DIGITAL_CHANT_SERVICES: Record<string, ChantService> = {
  'sunday-qidase': {
    id: 'sunday-qidase',
    titleAmharic: 'ሥርዓተ ቅዳሴ (ቅዳሴ ሐዋርያት)',
    titleEnglish: 'Divine Liturgy of the Holy Apostles',
    titleGeez: 'ሥርዓተ ፡ ቅዳሴ ፡ ዘሐዋርያት',
    subtitle: 'Sunday Eucharistic Liturgy — Anaphora of the Apostles',
    category: 'Holy Liturgy (ቅዳሴ)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    audioDuration: '32:40',
    sections: [
      {
        id: 'prothesis',
        titleGeez: 'ሥርዓተ ፡ ንዋይ ፡ ወዝግጅት',
        titleAmharic: 'የዝግጅት ሥርዓት (Preparation / Prothesis)',
        titleEnglish: 'Preparatory Rite & Prothesis',
        description: 'Priestly vestment, offering of the Eucharistic bread (Kurban) and wine.',
        verses: [
          {
            id: 'p1',
            number: 1,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'አሐዱ ፡ አብ ፡ ቅዱስ ፡ አሐዱ ፡ ወልድ ፡ ቅዱስ ፡ አሐዱ ፡ ውእቱ ፡ መንፈስ ፡ ቅዱስ ።',
            amharic: 'አንዱ አብ ቅዱስ ነው፥ አንዱ ወልድ ቅዱስ ነው፥ አንዱ መንፈስ ቅዱስ ቅዱስ ነው።',
            english: 'One is the Holy Father, One is the Holy Son, One is the Holy Spirit.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'p2',
            number: 2,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'በአማን ፡ አብ ፡ ቅዱስ ፡ በአማን ፡ ወልድ ፡ ቅዱስ ፡ በአማን ፡ ውእቱ ፡ መንፈስ ፡ ቅዱስ ።',
            amharic: 'በእውነት አብ ቅዱስ ነው፥ በእውነት ወልድ ቅዱስ ነው፥ በእውነት መንፈስ ቅዱስ ቅዱስ ነው።',
            english: 'Truly the Father is Holy, truly the Son is Holy, truly the Holy Spirit is Holy.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'p3',
            number: 3,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'ስብሐት ፡ ለእግዚአብሔር ፡ አብ ፡ ወወልድ ፡ ወመንፈስ ፡ ቅዱስ ፡ ይእዜኒ ፡ ወዘልፈኒ ፡ ወለዓለመ ፡ ዓለም ፡ አሜን ።',
            amharic: 'ለእግዚአብሔር ለአብ ለወልድ ለመንፈስ ቅዱስ ምስጋና ይሁን፥ ዛሬም ዘወትርም ለዘላለሙ አሜን።',
            english: 'Glory be to God: Father, Son, and Holy Spirit, both now and ever, and world without end. Amen.',
            zemaNotation: 'አራራይ'
          },
          {
            id: 'p4',
            number: 4,
            role: 'Deacon',
            roleGeez: 'ዲያቆን',
            geez: 'ተንሥኡ ፡ ለጸሎት ፡ እግዚአብሔር ፡ ምስለ ፡ ኵልክሙ ።',
            amharic: 'ለጸሎት ተነሱ፤ እግዚአብሔር ከሁላችሁ ጋር ይሁን።',
            english: 'Stand up for prayer! The Lord be with you all.',
            zemaNotation: 'ግዕዝ'
          }
        ]
      },
      {
        id: 'liturgy-word',
        titleGeez: 'ምንባባት ፡ ወስብከተ ፡ ወንጌል',
        titleAmharic: 'የቃሉ ሥርዓት — ምንባባት ወወንጌል',
        titleEnglish: 'Liturgy of the Word & Gospel',
        description: 'Readings from the Epistles of Paul, Catholic Epistles, Acts, and the Holy Gospel chant.',
        verses: [
          {
            id: 'lw1',
            number: 1,
            role: 'Cantor',
            roleGeez: 'ደብተራ',
            geez: 'ሃሌ ሉያ ፡ ቁሙ ፡ ወአጽምዑ ፡ ቃለ ፡ ወንጌል ፡ ቅዱስ ፡ ዜናሁ ፡ ለእግዚእነ ፡ ወመድኃኒነ ፡ ኢየሱስ ፡ ክርስቶስ ።',
            amharic: 'ሃሌ ሉያ፤ ቁሙና የጌታችንና የመድኃኒታችን የኢየሱስ ክርስቶስን የቅዱስ ወንጌል ቃል አድምጡ።',
            english: 'Hallelujah! Stand up and hearken to the Holy Gospel, the good tidings of our Lord and Saviour Jesus Christ.',
            zemaNotation: 'አራራይ'
          },
          {
            id: 'lw2',
            number: 2,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'እግዚአብሔር ፡ ምስለ ፡ ኵልክሙ ፡ ይክሥት ፡ ለክሙ ፡ ኅቡአተ ፡ ቃሉ ።',
            amharic: 'እግዚአብሔር ከሁላችሁ ጋር ይሁን፤ የተሰወረውን የቃሉን ምሥጢር ይግለጥላችሁ።',
            english: 'The Lord be with you all; may He reveal unto you the hidden mysteries of His word.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'lw3',
            number: 3,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'ምስለ ፡ መንፈስከ ፡ ስብሐት ፡ ለከ ፡ ክርስቶስ ፡ እግዚእየ ፡ ወአምላኪየ ፡ በኵሉ ፡ ጊዜ ።',
            amharic: 'ከመንፈስህ ጋር፤ አቤቱ ጌታዬና አምላኬ ክርስቶስ ሆይ በሁሉ ጊዜ ለአንተ ምስጋና ይሁን።',
            english: 'And with thy spirit. Glory to Thee, O Christ, my Lord and my God, at all times.',
            zemaNotation: 'ግዕዝ'
          }
        ]
      },
      {
        id: 'anaphora',
        titleGeez: 'አኰቴተ ፡ ቍርባን ፡ ዘሐዋርያት',
        titleAmharic: 'አኰቴተ ቍርባን (The Holy Anaphora)',
        titleEnglish: 'The Holy Eucharistic Anaphora',
        description: 'The central Eucharistic prayer of thanksgiving, Sanctus, Words of Institution, and Epiclesis.',
        verses: [
          {
            id: 'an1',
            number: 1,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'እግዚአብሔር ፡ ምስለ ፡ ኵልክሙ ።',
            amharic: 'እግዚአብሔር ከሁላችሁ ጋር ይሁን።',
            english: 'The Lord be with you all.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'an2',
            number: 2,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'ምስለ ፡ መንፈስከ ።',
            amharic: 'ከመንፈስህ ጋር።',
            english: 'And with thy spirit.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'an3',
            number: 3,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'አእኵትዎ ፡ ለአምላክነ ።',
            amharic: 'አምላካችንን አመስግኑት።',
            english: 'Give ye thanks unto our God.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'an4',
            number: 4,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'ርቱዕ ፡ ወጽድቅ ፡ ድልው ፡ ውእቱ ።',
            amharic: 'እውነተኛና ቅን ነው፤ የሚገባም ነው።',
            english: 'It is meet and right so to do.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'an5',
            number: 5,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'አልዕሉ ፡ አልባቢክሙ ።',
            amharic: 'ልቦናችሁን ወደ ላይ ከፍ አድርጉ።',
            english: 'Lift up your hearts!',
            zemaNotation: 'አራራይ'
          },
          {
            id: 'an6',
            number: 6,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'ብነ ፡ ኀበ ፡ እግዚአብሔር ፡ አምላክነ ።',
            amharic: 'በአምላካችን በእግዚአብሔር ዘንድ አለን።',
            english: 'We have lifted them up unto the Lord our God.',
            zemaNotation: 'አራራይ'
          },
          {
            id: 'an7',
            number: 7,
            role: 'Choir',
            roleGeez: 'መዘምራን',
            geez: 'ቅዱስ ፡ ቅዱስ ፡ ቅዱስ ፡ እግዚአብሔር ፡ ጸባኦት ፡ ምሉዕ ፡ ሰማያት ፡ ወምድር ፡ ቅድሳተ ፡ ስብሐቲከ ።',
            amharic: 'ቅዱስ ቅዱስ ቅዱስ የሠራዊት ጌታ እግዚአብሔር፥ ሰማይና ምድር የክብርህ ቅድስና የተሞሉ ናቸው።',
            english: 'Holy, Holy, Holy, Lord God of Sabaoth; heaven and earth are full of the holiness of Thy glory.',
            zemaNotation: 'እዝል'
          }
        ]
      },
      {
        id: 'communion',
        titleGeez: 'ቅዱስ ፡ ቍርባን ፡ ወቡራኬ',
        titleAmharic: 'ሥርዓተ ቍርባን ወስንብት (Communion & Dismissal)',
        titleEnglish: 'Holy Communion & Benediction',
        description: 'Administration of the Holy Body and Blood of Christ and final apostolic blessing.',
        verses: [
          {
            id: 'c1',
            number: 1,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'ቅድሳት ፡ ለቅዱሳን ።',
            amharic: 'ቅድሳት ለቅዱሳን ሰዎች ነው።',
            english: 'Holy things for the holy.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'c2',
            number: 2,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'አሐዱ ፡ አብ ፡ ቅዱስ ፡ አሐዱ ፡ ወልድ ፡ ቅዱስ ፡ አሐዱ ፡ ውእቱ ፡ መንፈስ ፡ ቅዱስ ።',
            amharic: 'አንዱ አብ ቅዱስ ነው፥ አንዱ ወልድ ቅዱስ ነው፥ አንዱ መንፈስ ቅዱስ ቅዱስ ነው።',
            english: 'One is the Holy Father, One is the Holy Son, One is the Holy Spirit.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'c3',
            number: 3,
            role: 'Deacon',
            roleGeez: 'ዲያቆን',
            geez: 'እለ ፡ ውስተ ፡ ንስሐ ፡ ሀለውክሙ ፡ አዕትቱ ፡ ርእሰክሙ ።',
            amharic: 'በንስሐ ያላችሁ ራሳችሁን ዝቅ አድርጉ።',
            english: 'Ye who are in repentance, bow down your heads.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'c4',
            number: 4,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'እግዚአብሔር ፡ ይባርክ ፡ ለአግብርቲሁ ፡ በሰላም ፡ ወይዕቀብ ፡ ነፍሶሙ ፡ ወሥጋሆሙ ፡ ለዓለመ ፡ ዓለም ፡ አሜን ።',
            amharic: 'እግዚአብሔር አገልጋዮቹን በሰላም ይባርክ፥ ነፍሳቸውንና ሥጋቸውንም ይጠብቅ ለዘላለሙ አሜን።',
            english: 'The Lord bless His servants in peace and preserve their souls and bodies forever. Amen.',
            zemaNotation: 'አራራይ'
          }
        ]
      }
    ]
  },
  'wudase-mariam': {
    id: 'wudase-mariam',
    titleAmharic: 'ውዳሴ ማርያም (ዘሰባቱ ዕለታት)',
    titleEnglish: 'Wudase Mariam — Daily Praise of Mary',
    titleGeez: 'ውዳሴ ፡ ማርያም ፡ ዘሰባቱ ፡ ዕለታት',
    subtitle: '7-Day Canonical Night Vigil Chant of Saint Ephrem the Syrian',
    category: 'Marian Praises (ውዳሴ)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    audioDuration: '24:15',
    sections: [
      {
        id: 'w-sunday',
        titleGeez: 'ውዳሴ ፡ ማርያም ፡ ዘእሑድ',
        titleAmharic: 'ውዳሴ ማርያም ዘእሑድ (Sunday)',
        titleEnglish: 'Sunday Praise of St. Mary',
        description: 'The Creation, Divine Incarnation, and spiritual joy of the Virgin.',
        verses: [
          {
            id: 'ws1',
            number: 1,
            role: 'Cantor',
            roleGeez: 'ደብተራ',
            geez: 'ፈቃደ ፡ ሠመረ ፡ ወአፍቀረ ፡ ደቂቀ ፡ ሰብእ ፡ እፎ ፡ ተሰብአ ፡ እምቅድስት ፡ ድንግል ።',
            amharic: 'የሰዎችን ልጆች ወደደ፥ ፈቃዱም ሆነ፤ ከቅድስት ድንግል እንዴት ሰው ሆነ?',
            english: 'He loved mankind and willed our salvation; how wondrously He became Man from the Holy Virgin!',
            zemaNotation: 'እዝል'
          },
          {
            id: 'ws2',
            number: 2,
            role: 'Choir',
            roleGeez: 'መዘምራን',
            geez: 'ተፈሥሒ ፡ ኦ ፡ ምልእተ ፡ ጸጋ ፡ እግዚአብሔር ፡ ምስሌኪ ፡ ቡርክት ፡ አንቲ ፡ እምአንስቲ ።',
            amharic: 'ጸጋን የተሞላሽ ሆይ ደስ ይበልሽ፤ እግዚአብሔር ከአንቺ ጋር ነውና፤ ከሴቶች ተለይተሽ የተባረክሽ ነሽ።',
            english: 'Rejoice, O full of grace, the Lord is with thee! Blessed art thou among women.',
            zemaNotation: 'እዝል'
          },
          {
            id: 'ws3',
            number: 3,
            role: 'Cantor',
            roleGeez: 'ደብተራ',
            geez: 'አክሊለ ፡ መመኪያነ ፡ ወመሠረተ ፡ ሕይወትነ ፡ ወመድኃኒተ ፡ ነፍስነ ፡ ድንግል ፡ ማርያም ።',
            amharic: 'የመመኪያችን ዘውድ፣ የሕይወታችን መሠረት፣ የነፍሳችን መድኃኒት ድንግል ማርያም ነሽ።',
            english: 'The crown of our boasting, foundation of our life, and salvation of our souls is the Virgin Mary.',
            zemaNotation: 'እዝል'
          },
          {
            id: 'ws4',
            number: 4,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'ሰአሊ ፡ ለነ ፡ ቅድስት ፡ ኀበ ፡ እግዚአብሔር ፡ አምላክነ ፡ ከመ ፡ ይሥረይ ፡ ለነ ፡ ኃጣውኢነ ።',
            amharic: 'ኃጢአታችንን ይቅር ይለን ዘንድ ቅድስት ሆይ ወደ አምላካችን ወደ እግዚአብሔር ለምኚልን።',
            english: 'Pray for us, O Holy Mother of God, that the Lord may forgive us our sins.',
            zemaNotation: 'እዝል'
          }
        ]
      },
      {
        id: 'w-monday',
        titleGeez: 'ውዳሴ ፡ ማርያም ፡ ዘሰኑይ',
        titleAmharic: 'ውዳሴ ማርያም ዘሰኑይ (Monday)',
        titleEnglish: 'Monday Praise of St. Mary',
        description: 'Salvation of Adam and the revelation of celestial wisdom.',
        verses: [
          {
            id: 'wm1',
            number: 1,
            role: 'Cantor',
            roleGeez: 'ደብተራ',
            geez: 'ፈቀደ ፡ እግዚእ ፡ ያግዕዞ ፡ ለአዳም ፡ ኅዙነ ፡ ወትኩዘ ፡ ልብ ።',
            amharic: 'እግዚአብሔር ያዘነውንና ልቡ የተሰበረውን አዳምን ነፃ ያወጣው ዘንድ ወደደ።',
            english: 'The Lord willed to redeem Adam who was broken of heart and sorrowful.',
            zemaNotation: 'እዝል'
          },
          {
            id: 'wm2',
            number: 2,
            role: 'Choir',
            roleGeez: 'መዘምራን',
            geez: 'ወአግብኦ ፡ ውስተ ፡ ቀዳሚ ፡ መካኑ ፡ በብዙኅ ፡ ሣህሉ ፡ ወምሕረቱ ።',
            amharic: 'በብዙ ይቅርታውና ምሕረቱ ወደ ቀደመው ቦታው መለሰው።',
            english: 'And in His abundant compassion, He returned him to his primordial abode.',
            zemaNotation: 'እዝል'
          }
        ]
      }
    ]
  },
  'arganona': {
    id: 'arganona',
    titleAmharic: 'አርጋኖነ ውዳሴ (Arganona Wudase)',
    titleEnglish: 'Arganona Wudase — Harp of Praise',
    titleGeez: 'አርጋኖነ ፡ ውዳሴ ፡ ዘአባ ፡ ጊዮርጊስ ፡ ዘጋሥጫ',
    subtitle: 'Theological Mystical Praises by Saint Abba Giyorgis of Gasicha (14th C.)',
    category: 'Mystical Canticles (አርጋኖን)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    audioDuration: '18:10',
    sections: [
      {
        id: 'arg-proem',
        titleGeez: 'መቅድመ ፡ መጽሐፍ',
        titleAmharic: 'መቅድም (The Proem & Invocation)',
        titleEnglish: 'Proem & Mystic Invocation',
        description: 'Opening prayers of Saint Abba Giyorgis invoking the Holy Trinity and St. Mary.',
        verses: [
          {
            id: 'ar1',
            number: 1,
            role: 'Cantor',
            roleGeez: 'ደብተራ',
            geez: 'መዝሙር ፡ ሐዲስ ፡ ዘአስተጋበኦ ፡ አባ ፡ ጊዮርጊስ ፡ ዘጋሥጫ ፡ ለመወድሰ ፡ እግዝእትነ ፡ ማርያም ።',
            amharic: 'አባ ጊዮርጊስ ዘጋሥጫ እመቤታችን ድንግል ማርያምን ለማመስገን ያዘጋጀው አዲስ መዝሙር።',
            english: 'A new sacred canticle composed by Abba Giyorgis of Gasicha to magnify our Lady Mary.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'ar2',
            number: 2,
            role: 'Choir',
            roleGeez: 'መዘምራን',
            geez: 'ይዌድስዋ ፡ መላእክት ፡ ለማርያም ፡ በውስተ ፡ ውዳሴ ፡ ወይብሉ ፡ ቅድስት ፡ አንቲ ።',
            amharic: 'መላእክት ማርያምን በምስጋና ያመሰግኗታል፤ ቅድስት ነሽ እያሉም ይዘምራሉ።',
            english: 'Angels extol Mary in celestial melodies, chanting: Holy art thou, O Mother of God.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'ar3',
            number: 3,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'ኦ ፡ መድኃኒተ ፡ ዓለም ፡ ወተስፋሆሙ ፡ ለቅቡጻን ፡ ሰአሊ ፡ በእንቲአነ ።',
            amharic: 'የዓለም መዳኛና የተስፋ የቆረጡ ተስፋቸው ሆይ፥ ስለ እኛ ለምኚልን።',
            english: 'O refuge of the world and hope of the despairing, intercede on our behalf.',
            zemaNotation: 'አራራይ'
          }
        ]
      }
    ]
  },
  'seytat': {
    id: 'seytat',
    titleAmharic: 'መጽሐፈ ሰዓታት (Seytat)',
    titleEnglish: 'Seytat — Canonical Book of Hours',
    titleGeez: 'መጽሐፈ ፡ ሰዓታት ፡ ዘሌሊት ፡ ወዘመዓልት',
    subtitle: 'Monastic Nocturnal Vigils & Canonical Liturgical Hours',
    category: 'Canonical Hours (ሰዓታት)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    audioDuration: '28:45',
    sections: [
      {
        id: 'sey-night',
        titleGeez: 'ጸሎተ ፡ ሌሊት ፡ ወማኅሌት',
        titleAmharic: 'ጸሎተ ሌሊት (Night Vigil / Matins)',
        titleEnglish: 'Night Vigil Prayer',
        description: 'Monastic vigil hymns chanted from midnight until dawn in all monasteries.',
        verses: [
          {
            id: 'sey1',
            number: 1,
            role: 'Priest',
            roleGeez: 'ካህን',
            geez: 'ስብሐት ፡ ለአብ ፡ ወወልድ ፡ ወመንፈስ ፡ ቅዱስ ፡ ይእዜኒ ፡ ወዘልፈኒ ፡ ወለዓለመ ፡ ዓለም ፡ አሜን ።',
            amharic: 'ለአብ ለወልድ ለመንፈስ ቅዱስ ምስጋና ይሁን፥ ዛሬም ዘወትርም ለዘላለሙ አሜን።',
            english: 'Glory be to the Father, the Son, and the Holy Spirit, now and ever, world without end. Amen.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'sey2',
            number: 2,
            role: 'Deacon',
            roleGeez: 'ዲያቆን',
            geez: 'ተንሥኡ ፡ ለጸሎት ፡ እግዚአብሔር ፡ ምስለ ፡ ኵልክሙ ፡ ምስለ ፡ መንፈስከ ።',
            amharic: 'ለጸሎት ተነሱ፤ እግዚአብሔር ከሁላችሁ ጋር ይሁን፤ ከመንፈስህም ጋር።',
            english: 'Arise for prayer! The Lord be with you all, and with thy spirit.',
            zemaNotation: 'ግዕዝ'
          },
          {
            id: 'sey3',
            number: 3,
            role: 'Cantor',
            roleGeez: 'ደብተራ',
            geez: 'እግዚኦ ፡ መሐረነ ፡ ክርስቶስ ፡ በእንተ ፡ ማርያም ፡ መሐረነ ፡ ክርስቶስ ።',
            amharic: 'አቤቱ ክርስቶስ ሆይ ማረን፤ ስለ እናትህ ስለ ማርያም ብለህ ማረን።',
            english: 'Lord have mercy upon us, O Christ! For the sake of Mary, have mercy upon us, O Christ!',
            zemaNotation: 'እዝል'
          }
        ]
      }
    ]
  },
  'special-feasts': {
    id: 'special-feasts',
    titleAmharic: 'ማኅሌተ በዓላት (Special Feasts Chant)',
    titleEnglish: 'Feast Day Mahelet & Ziq Chants',
    titleGeez: 'ማኅሌተ ፡ በዓላት ፡ ወዚቅ',
    subtitle: 'Liturgical Chants for Meskel, Timkat, Hosanna, and Genna',
    category: 'Festal Chants (በዓላት)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    audioDuration: '21:30',
    sections: [
      {
        id: 'fest-meskel',
        titleGeez: 'ማኅሌት ፡ ዘመስቀል',
        titleAmharic: 'ማኅሌት ዘመስቀል (Feast of the Finding of the True Cross)',
        titleEnglish: 'Meskel Vigil Chant',
        description: 'Exultant chants celebrating the True Cross revealed to Empress Helena.',
        verses: [
          {
            id: 'fm1',
            number: 1,
            role: 'Cantor',
            roleGeez: 'ደብተራ',
            geez: 'መስቀል ፡ አብርሃ ፡ በከዋክብት ፡ አሠርገወ ፡ ሰማየ ፡ ኲሉ ፡ እምብርሃነ ፡ ፀሐይ ፡ ይበርህ ፡ መስቀል ።',
            amharic: 'መስቀል አበራ፤ በከዋክብት ሰማይን ሁሉ አስጌጠ፤ ከፀሐይ ብርሃን ይልቅ መስቀል ያበራል።',
            english: 'The Cross shone forth, adorning the whole firmament with stars; brighter than the sun shineth the Cross!',
            zemaNotation: 'አራራይ'
          },
          {
            id: 'fm2',
            number: 2,
            role: 'Choir',
            roleGeez: 'መዘምራን',
            geez: 'መስቀል ፡ ኃይልነ ፡ መስቀል ፡ ጽንዕነ ፡ መስቀል ፡ ቤዛነ ፡ መስቀል ፡ መድኃኒተ ፡ ነፍስነ ።',
            amharic: 'መስቀል ኃይላችን ነው፥ መስቀል ብርታታችን ነው፥ መስቀል ቤዛችን ነው፥ መስቀል የነፍሳችን መድኃኒት ነው።',
            english: 'The Cross is our power, the Cross is our fortress, the Cross is our redemption, the Cross is the salvation of our souls!',
            zemaNotation: 'አራራይ'
          },
          {
            id: 'fm3',
            number: 3,
            role: 'People',
            roleGeez: 'ሕዝብ',
            geez: 'አይሁድ ፡ ክሕዱ ፡ ወንሕነሰ ፡ አመነ ፡ እለ ፡ አመነ ፡ በኃይለ ፡ መስቀሉ ፡ ድኅነ ።',
            amharic: 'አይሁድ ካዱ፥ እኛ ግን አመንን፤ ያመንን እኛ በመስቀሉ ኃይል ዳንን።',
            english: 'The unbelievers denied, but we believed; and we who have believed are saved by the power of His Cross!',
            zemaNotation: 'ግዕዝ'
          }
        ]
      }
    ]
  }
};

// Also export MOCK_CHANTS legacy compatibility alias
export const MOCK_CHANTS: Record<string, any> = DIGITAL_CHANT_SERVICES;
