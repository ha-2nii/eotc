export interface MezmurItem {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  singer: string;
  singerAmharic: string;
  category: 'Feast' | 'Mariology' | 'Repentance' | 'Meskel' | 'Lent' | 'Saints';
  categoryAmharic: string;
  duration: string;
  durationSecs: number;
  audioUrl: string;
  albumArt?: string;
  lyricsAmharic: string[];
  lyricsEnglish?: string[];
  featured?: boolean;
}

export const MOCK_MEZMURS: MezmurItem[] = [
  {
    id: 'mezmur-1',
    titleAmharic: 'እምነቴ ነሽ ድንግል',
    titleEnglish: 'Emenete Nesh Dingel (You Are My Faith, O Virgin)',
    singer: 'Liqe Mezemeran Tewodros Yosef',
    singerAmharic: 'ሊቀ መዘምራን ቴዎድሮስ ዮሴፍ',
    category: 'Mariology',
    categoryAmharic: 'የእመቤታችን',
    duration: '06:15',
    durationSecs: 375,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    featured: true,
    lyricsAmharic: [
      'እምነቴ ነሽ ድንግል ተስፋዬ ነሽ እናቴ',
      'በምልጃሽ ጸንታለች እስከ ዛሬ ሕይወቴ',
      'ጽዮን ክብሬ ነሽ የነፍሴ መድኃኒት',
      'በአማላጅነትሽ አድነሽኛል ከሞት',
    ],
    lyricsEnglish: [
      'You are my faith, O Virgin, you are my hope, my mother',
      'By your intercession my life has stood firm until today',
      'Zion is my glory, the healer of my soul',
      'By your advocacy you delivered me from death',
    ],
  },
  {
    id: 'mezmur-2',
    titleAmharic: 'በመስቀሉ ሰላም አደረገ',
    titleEnglish: 'BeMeskelu Selam Aderege (He Made Peace by His Cross)',
    singer: 'Zemari Yilma Hailu',
    singerAmharic: 'ዘማሪ ይልማ ኃይሉ',
    category: 'Meskel',
    categoryAmharic: 'የመስቀል',
    duration: '05:40',
    durationSecs: 340,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    featured: true,
    lyricsAmharic: [
      'በመስቀሉ ሰላም አደረገ',
      'የጠላት ምርኮ ተሰበረ',
      'መስቀል ኃይላችን መስቀል ቤዛችን',
      'የአጋንንት ድል መንሻ ጋሻችን',
    ],
    lyricsEnglish: [
      'He made peace through His Cross',
      'The enemy’s captivity was shattered',
      'The Cross is our strength, the Cross is our redemption',
      'Our shield to overcome the powers of darkness',
    ],
  },
  {
    id: 'mezmur-3',
    titleAmharic: 'አምላኬ ሆይ ማረኝ',
    titleEnglish: 'Amlake Hoy Maregn (Lord, Have Mercy on Me)',
    singer: 'Zemarit Zerfe Kebede',
    singerAmharic: 'ዘማሪት ዘርፌ ከበደ',
    category: 'Repentance',
    categoryAmharic: 'የንስሐ',
    duration: '07:10',
    durationSecs: 430,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    featured: false,
    lyricsAmharic: [
      'አምላኬ ሆይ ማረኝ እንደ ቸርነትህ',
      'እንደ ምሕረትህም ብዛት በደሌን ደምስስ',
      'ከልቤ ንስሐ እገባለሁ ዛሬ',
      'አድነኝ ፈጣሪ የኃጢአት እስረኛ እንዳይሆን ቀኔ',
    ],
    lyricsEnglish: [
      'Have mercy upon me, O God, according to Thy lovingkindness',
      'Blot out my transgressions according to the multitude of Thy mercies',
      'I repent with all my heart today',
      'Save me, O Creator, that my days may not be bound in sin',
    ],
  },
  {
    id: 'mezmur-4',
    titleAmharic: 'ደብረ ታቦር ተራራው አበራ',
    titleEnglish: 'Debre Tabor Teraraw Abera (Mount Tabor Shone with Light)',
    singer: 'Mahbere Qidusan Choir',
    singerAmharic: 'የማኅበረ ቅዱሳን መዘምራን',
    category: 'Feast',
    categoryAmharic: 'የበዓላት',
    duration: '04:55',
    durationSecs: 295,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    featured: true,
    lyricsAmharic: [
      'ደብረ ታቦር ተራራው አበራ',
      'ክብሩን ገለጠ ጌታችን በሥራ',
      'ሙሴና ኤልያስ አብረውት ቆሙ',
      'ሰማያዊውን ክብር በዓይናቸው አዩ',
    ],
    lyricsEnglish: [
      'Mount Tabor shone with divine light',
      'Our Lord revealed His glory in wondrous majesty',
      'Moses and Elijah stood with Him',
      'They beheld celestial glory with their own eyes',
    ],
  },
  {
    id: 'mezmur-5',
    titleAmharic: 'ቅዱስ ሚካኤል የሰላም መልአክ',
    titleEnglish: 'Qiddus Mikael YeSelam Melak (Saint Michael, Angel of Peace)',
    singer: 'Dn. Lulseged Getachew',
    singerAmharic: 'ዲ/ን ሉልሰገድ ጌታቸው',
    category: 'Saints',
    categoryAmharic: 'የቅዱሳን',
    duration: '05:25',
    durationSecs: 325,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    featured: false,
    lyricsAmharic: [
      'ቅዱስ ሚካኤል የሰላም መልአክ',
      'ከክፉ ጠብቀን በብርቱ ክንፍህ',
      'የእግዚአብሔር ባለሟል የሕዝብ ጠባቂ',
      'ምልጃህ ይድረሰን በምሕረት ተራዳቂ',
    ],
    lyricsEnglish: [
      'Holy Michael, Angel of Peace',
      'Protect us from evil beneath thy strong wings',
      'Favored servant of God and guardian of the faithful',
      'May thy intercession reach us with mercy',
    ],
  },
  {
    id: 'mezmur-6',
    titleAmharic: 'በጾም በጸሎት ፊትህን እንፈልጋለን',
    titleEnglish: 'BeTsom BeTselot (In Fasting and Prayer We Seek Thy Face)',
    singer: 'St. Mary Cathedral Choir',
    singerAmharic: 'የደብረ ሰላም ቅድስት ማርያም መዘምራን',
    category: 'Lent',
    categoryAmharic: 'የጾም',
    duration: '06:45',
    durationSecs: 405,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    featured: false,
    lyricsAmharic: [
      'በጾም በጸሎት ፊትህን እንፈልጋለን',
      'አምላካችን ሆይ ጸሎታችንን ስማን',
      'የልብን ሐዘን ተመልከት ዛሬ',
      'ሰላምህን ስጠን ለሀገራችን ምሕረት አውርድልን',
    ],
    lyricsEnglish: [
      'In fasting and prayer we seek Thy holy face',
      'O our God, hear our humble prayer',
      'Look upon the contrition of our hearts today',
      'Grant Thy peace and pour out Thy mercy upon our nation',
    ],
  },
];
