export interface LiturgicalTextLine {
  speaker?: 'priest' | 'deacon' | 'people' | 'cantors';
  speakerAm?: string;
  speakerEn?: string;
  geez: string;
  amharic: string;
  english: string;
  zemaMode?: 'geez' | 'ezil' | 'araray';
}

export interface LiturgicalItem {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  category: string;
  mode?: string;
  season?: string;
  descriptionEn: string;
  descriptionAm: string;
  lines: LiturgicalTextLine[];
  audioTrackId?: string;
  pdfUrl?: string;
}

export interface LiturgicalCategory {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  subtitle: string;
  descriptionEn: string;
  descriptionAm: string;
  iconName: string;
  itemCount: number;
  items: LiturgicalItem[];
}

export const EOTC_14_ANAPHORAS = [
  { id: 'anaphora-apostles', nameAm: 'ቅዳሴ ሐዋርያት', nameEn: 'Anaphora of the Apostles', author: 'Holy Apostles' },
  { id: 'anaphora-mary', nameAm: 'ቅዳሴ ማርያም (ዘአባ ሕርያቆስ)', nameEn: 'Anaphora of St. Mary', author: 'Abba Heryacos of Behnesa' },
  { id: 'anaphora-john-evangelist', nameAm: 'ቅዳሴ ዮሐንስ ወልደ ነጐድጓድ', nameEn: 'Anaphora of St. John the Evangelist', author: 'St. John the Theologian' },
  { id: 'anaphora-athanasius', nameAm: 'ቅዳሴ አትናቴዎስ', nameEn: 'Anaphora of St. Athanasius', author: 'St. Athanasius of Alexandria' },
  { id: 'anaphora-basil', nameAm: 'ቅዳሴ ባስልዮስ', nameEn: 'Anaphora of St. Basil the Great', author: 'St. Basil of Caesarea' },
  { id: 'anaphora-gregory-nazianzen', nameAm: 'ቅዳሴ ጎርጎርዮስ ዘነዚናንዙ', nameEn: 'Anaphora of St. Gregory of Nazianzus', author: 'St. Gregory the Theologian' },
  { id: 'anaphora-epiphanius', nameAm: 'ቅዳሴ ኤጲፋንዮስ', nameEn: 'Anaphora of St. Epiphanius', author: 'St. Epiphanius of Salamis' },
  { id: 'anaphora-john-chrysostom', nameAm: 'ቅዳሴ ዮሐንስ አፈወርቅ', nameEn: 'Anaphora of St. John Chrysostom', author: 'St. John Chrysostom' },
  { id: 'anaphora-cyril', nameAm: 'ቅዳሴ ቄርሎስ', nameEn: 'Anaphora of St. Cyril of Alexandria', author: 'St. Cyril the Pillar of Faith' },
  { id: 'anaphora-dioscorus', nameAm: 'ቅዳሴ ዲዮስቆሮስ', nameEn: 'Anaphora of St. Dioscorus', author: 'St. Dioscorus of Alexandria' },
  { id: 'anaphora-gregory-armenia', nameAm: 'ቅዳሴ ጎርጎርዮስ ዘአርመን', nameEn: 'Anaphora of St. Gregory the Illuminator', author: 'St. Gregory of Armenia' },
  { id: 'anaphora-james-sarug', nameAm: 'ቅዳሴ ያዕቆብ ዘሥሩግ', nameEn: 'Anaphora of St. James of Sarug', author: 'St. James of Sarug' },
  { id: 'anaphora-james-brother', nameAm: 'ቅዳሴ ያዕቆብ እኁሁ ለእግዚእ', nameEn: 'Anaphora of St. James the Brother of the Lord', author: 'St. James the Apostle' },
  { id: 'anaphora-318-fathers', nameAm: 'ቅዳሴ ሠለስቱ ምዕት (፫፻፲፰ቱ ርቱዐነ ሃይማኖት)', nameEn: 'Anaphora of the 318 Fathers of Nicaea', author: 'Holy Fathers of Nicaea' },
];

export const LITURGICAL_CATEGORIES: LiturgicalCategory[] = [
  {
    id: 'qidase',
    titleAmharic: 'ሥርዓተ ቅዳሴ (The Divine Liturgy & 14 Anaphoras)',
    titleEnglish: 'Qidase (Divine Liturgy — 14 Anaphoras)',
    subtitle: 'The Eucharistic Mystery & Complete Apostolic Anaphoras',
    descriptionEn: 'The Eucharistic core of Ethiopian worship featuring the standard pre-anaphora liturgy and all 14 canonical Anaphoras.',
    descriptionAm: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን የቅዳሴ ሥርዓትና አሥራ አራቱ ቅዳሴያት።',
    iconName: 'BookMarked',
    itemCount: 14,
    items: [
      {
        id: 'qidase-apostles',
        titleAmharic: 'ሥርዓተ ቅዳሴ ሐዋርያት',
        titleEnglish: 'Liturgy of the Holy Apostles',
        category: 'Qidase',
        mode: 'Ge’ez & Ezil',
        season: 'General Sundays',
        descriptionEn: 'The standard Sunday Eucharistic Anaphora handed down by the Holy Apostles.',
        descriptionAm: 'በአብዛኛው የሰንበት ቀናት የሚቀደስ የሐዋርያት መሠረታዊ የቅዳሴ ሥርዓት።',
        audioTrackId: 'zema-4',
        lines: [
          {
            speaker: 'priest',
            speakerAm: 'ካህን (Priest)',
            speakerEn: 'Priest',
            geez: 'አሐዱ ፡ አብ ፡ ቅዱስ ፡ አሐዱ ፡ ወልድ ፡ ቅዱስ ፡ አሐዱ ፡ ውእቱ ፡ መንፈስ ፡ ቅዱስ ።',
            amharic: 'አንዱ አብ ቅዱስ ነው፥ አንዱ ወልድ ቅዱስ ነው፥ አንዱ መንፈስ ቅዱስ ቅዱስ ነው።',
            english: 'One is the Holy Father, One is the Holy Son, One is the Holy Spirit.',
            zemaMode: 'geez',
          },
          {
            speaker: 'people',
            speakerAm: 'ሕዝብ (People)',
            speakerEn: 'People',
            geez: 'በአማን ፡ አብ ፡ ቅዱስ ፡ በአማን ፡ ወልድ ፡ ቅዱስ ፡ በአማን ፡ ውእቱ ፡ መንፈስ ፡ ቅዱስ ።',
            amharic: 'በእውነት አብ ቅዱስ ነው፥ በእውነት ወልድ ቅዱስ ነው፥ በእውነት መንፈስ ቅዱስ ቅዱስ ነው።',
            english: 'Truly the Father is Holy, truly the Son is Holy, truly the Holy Spirit is Holy.',
            zemaMode: 'ezil',
          },
          {
            speaker: 'deacon',
            speakerAm: 'ዲያቆን (Deacon)',
            speakerEn: 'Deacon',
            geez: 'ተንሥኡ ፡ ለጸሎት ። እግዚኦ ፡ ተሠሃለነ ። በሰላመ ፡ እግዚአብሔር ፡ አምላክነ ፡ ጸልዩ ።',
            amharic: 'ለጸሎት ተነሡ። አቤቱ ይቅር በለን። በአምላካችን በእግዚአብሔር ሰላም ጸልዩ።',
            english: 'Stand up for prayer! Lord have mercy upon us. Pray in the peace of the Lord our God.',
            zemaMode: 'geez',
          },
          {
            speaker: 'priest',
            speakerAm: 'ካህን (Priest)',
            speakerEn: 'Priest',
            geez: 'ሰላም ፡ ለኵልክሙ ። ምስለ ፡ መንፈስከ ። እግዚአብሔር ፡ ምስለ ፡ ኵልክሙ ።',
            amharic: 'ሰላም ለሁላችሁ ይሁን። ከመንፈስህ ጋር። እግዚአብሔር ከሁላችሁ ጋር ይሁን።',
            english: 'Peace be unto you all. And with thy spirit. The Lord be with you all.',
            zemaMode: 'araray',
          },
          {
            speaker: 'cantors',
            speakerAm: 'መዘምራን (Cantors)',
            speakerEn: 'Debteras',
            geez: 'ቅዱስ ፡ ቅዱስ ፡ ቅዱስ ፡ እግዚአብሔር ፡ ጸባኦት ፡ ፍጹም ፡ ምሉእ ፡ ሰማያተ ፡ ወምድረ ፡ ቅድሳተ ፡ ስብሐቲከ ።',
            amharic: 'ቅዱስ ቅዱስ ቅዱስ የሠራዊት ጌታ እግዚአብሔር የክብርህ ቅድስና በሰማይና በምድር ፍጹም ምሉዕ ነው።',
            english: 'Holy, Holy, Holy, Lord God of Hosts; heaven and earth are full of the holiness of Thy glory.',
            zemaMode: 'araray',
          },
        ],
      },
      {
        id: 'qidase-mary',
        titleAmharic: 'ቅዳሴ ማርያም (ዘአባ ሕርያቆስ)',
        titleEnglish: 'Anaphora of St. Mary (Abba Heryacos)',
        category: 'Qidase',
        mode: 'Ezil & Araray',
        season: 'Marian Feasts & Filseta',
        descriptionEn: 'The celebrated Marian Eucharistic liturgy composed by Abba Heryacos of Behnesa.',
        descriptionAm: 'በእመቤታችን በዓላት ወቅት በደመቀ ሁኔታ የሚቀደስ ድንቅ የነገረ መለኮትና የፍቅር ምስጋና።',
        audioTrackId: 'zema-3',
        lines: [
          {
            speaker: 'priest',
            speakerAm: 'ካህን (Priest)',
            speakerEn: 'Priest',
            geez: 'ጐሥዓ ፡ ልብየ ፡ ቃለ ፡ ሠናየ ፡ ወአነ ፡ እነግር ፡ ቅዳሴሃ ፡ ለማርያም ።',
            amharic: 'ልቤ መልካም ነገርን አወጣ፤ እኔ የማርያምን ቅዳሴዋን እናገራለሁ።',
            english: 'My heart overflows with a good theme; I will utter the praise of Mary.',
            zemaMode: 'ezil',
          },
          {
            speaker: 'people',
            speakerAm: 'ሕዝብ (People)',
            speakerEn: 'People',
            geez: 'ተፈሥሒ ፡ ኦ ፡ ማርያም ፡ እምነ ፡ ወእመ ፡ እግዚእነ ።',
            amharic: 'እናታችንና የጌታችን እናት ማርያም ሆይ፥ ደስ ይበልሽ።',
            english: 'Rejoice, O Mary, our Mother and the Mother of our Lord!',
            zemaMode: 'ezil',
          },
        ],
      },
    ],
  },
  {
    id: 'mahelet',
    titleAmharic: 'ማሕሌት (Liturgical Hymns for Feasts)',
    titleEnglish: 'Mahelet (Festal Chants & Canticles)',
    subtitle: 'All-Night Vigil Antiphons for the Great Dominical Feasts',
    descriptionEn: 'Chanted throughout the night prior to major feasts with sistra (Tsenatsil), drums (Kebero), and prayer sticks (Meqwamia).',
    descriptionAm: 'በታላላቅ የጌታችንና የእመቤታችን በዓላት በሌሊት በጸናጽልና በከበሮ የሚቀርብ የማሕሌት አገልግሎት።',
    iconName: 'Sparkles',
    itemCount: 8,
    items: [
      {
        id: 'mahelet-timkat',
        titleAmharic: 'ማሕሌተ ጥምቀት (Epiphany Vigil Hymn)',
        titleEnglish: 'Mahelet for Timkat (Epiphany)',
        category: 'Mahelet',
        mode: 'Araray & Ge’ez',
        season: 'January 19 (Terr 11)',
        descriptionEn: 'Triumphant all-night chants celebrating the Baptism of Christ at the Jordan River.',
        descriptionAm: 'በጥምቀት በዓል ዋዜማ በወንዞችና በባሕረ ጥምቀት የሚዘመር ደማቅ ያሬዳዊ ዝማሬ።',
        audioTrackId: 'zema-1',
        lines: [
          {
            speaker: 'cantors',
            speakerAm: 'መዘምራን (Cantors)',
            speakerEn: 'Debteras',
            geez: 'ዮሐንስ ፡ አጥመቆ ፡ ለኢየሱስ ፡ በፈለገ ፡ ዮርዳኖስ ። መንፈስ ፡ ቅዱስ ፡ ወረደ ፡ በአምሳለ ፡ ርግብ ።',
            amharic: 'ዮሐንስ ኢየሱስን በዮርዳኖስ ወንዝ አጠመቀው፤ መንፈስ ቅዱስም በርግብ አምሳል ወረደ።',
            english: 'John baptized Jesus in the River Jordan, and the Holy Spirit descended in the likeness of a dove.',
            zemaMode: 'araray',
          },
        ],
      },
      {
        id: 'mahelet-meskel',
        titleAmharic: 'ማሕሌተ መስቀል (Finding of the True Cross)',
        titleEnglish: 'Mahelet for Meskel',
        category: 'Mahelet',
        mode: 'Ezil',
        season: 'September 27 (Meskerem 17)',
        descriptionEn: 'Vigil hymns extolling the glory and power of the Holy Cross.',
        descriptionAm: 'በመስቀል ደመራ በዓል የሚዘመር ያሬዳዊ ምስጋና።',
        lines: [
          {
            speaker: 'cantors',
            speakerAm: 'መዘምራን (Cantors)',
            speakerEn: 'Debteras',
            geez: 'መስቀል ፡ ኃይልነ ፡ መስቀል ፡ ጽንዕነ ፡ መስቀል ፡ ቤዛነ ፡ መስቀል ፡ መድኃኒተ ፡ ነፍስነ ።',
            amharic: 'መስቀል ኃይላችን ነው፥ መስቀል ብርታታችን ነው፥ መስቀል ቤዛችን ነው፥ መስቀል የነፍሳችን መድኃኒት ነው።',
            english: 'The Cross is our power, the Cross is our fortress, the Cross is our ransom, the Cross is the salvation of our souls.',
            zemaMode: 'ezil',
          },
        ],
      },
    ],
  },
  {
    id: 'deggwa',
    titleAmharic: 'ድጓ (Saint Yared’s 3-Mode Hymnal System)',
    titleEnglish: 'Deggwa (The 3 Sacred Modes of Saint Yared)',
    subtitle: 'Ge’ez (ግዕዝ), Ezil (ዕዝል), and Araray (አራራይ) Modes',
    descriptionEn: 'The monumental Ethiopian musical anthology composed by Saint Yared in the 6th century AD, classified into three tonal modes representing the Holy Trinity.',
    descriptionAm: 'በ፮ኛው መቶ ክፍለ ዘመን በቅዱስ ያሬድ የተደረሱ የግዕዝ፣ የዕዝልና የአራራይ ዜማዎች መድበል።',
    iconName: 'Music',
    itemCount: 3,
    items: [
      {
        id: 'deggwa-geez',
        titleAmharic: 'የግዕዝ ዜማ (Ge’ez Mode — Majesty & Solemnity)',
        titleEnglish: 'Ge’ez Tone (Praise of the Father)',
        category: 'Deggwa',
        mode: 'Ge’ez Mode',
        season: 'Regular Days & Fasts',
        descriptionEn: 'The foundational sober, solemn chant mode symbolising God the Father.',
        descriptionAm: 'የአብ ምሳሌ የሆነ፣ ረጋ ያለና ጥልቅ መንፈሳዊ ግርማ ያለው የዜማ ስልት።',
        audioTrackId: 'zema-2',
        lines: [
          {
            speaker: 'cantors',
            speakerAm: 'መዘምራን (Cantors)',
            speakerEn: 'Cantors',
            geez: 'ሃሌ ፡ ሉያ ፡ ለአብ ፡ ሃሌ ፡ ሉያ ፡ ለወልድ ፡ ሃሌ ፡ ሉያ ፡ ለመንፈስ ፡ ቅዱስ ።',
            amharic: 'ለአብ ምስጋና ይሁን፥ ለወልድ ምስጋና ይሁን፥ ለመንፈስ ቅዱስ ምስጋና ይሁን።',
            english: 'Hallelujah to the Father, Hallelujah to the Son, Hallelujah to the Holy Spirit.',
            zemaMode: 'geez',
          },
        ],
      },
      {
        id: 'deggwa-ezil',
        titleAmharic: 'የዕዝል ዜማ (Ezil Mode — Tenderness & Love)',
        titleEnglish: 'Ezil Tone (Incarnation & Passion of the Son)',
        category: 'Deggwa',
        mode: 'Ezil Mode',
        season: 'Fasts, Passion Week & Marian Feasts',
        descriptionEn: 'The tender, plaintive chant mode symbolising the Son’s incarnation and redemption.',
        descriptionAm: 'የወልድ ምሳሌ የሆነ፣ የፍቅርና የሐዘን ዜማ ስልት።',
        audioTrackId: 'zema-3',
        lines: [
          {
            speaker: 'cantors',
            speakerAm: 'መዘምራን (Cantors)',
            speakerEn: 'Cantors',
            geez: 'በቀራንዮ ፡ ተሰቅለ ፡ በእንቲአነ ፡ ከመ ፡ ያድኅነነ ፡ እምሞት ።',
            amharic: 'ከሞት ያድነን ዘንድ ስለ እኛ በቀራንዮ ተሰቀለ።',
            english: 'On Golgotha He was crucified for our sake, that He might deliver us from eternal death.',
            zemaMode: 'ezil',
          },
        ],
      },
      {
        id: 'deggwa-araray',
        titleAmharic: 'የአራራይ ዜማ (Araray Mode — Joy & Resurrection)',
        titleEnglish: 'Araray Tone (Comfort & Fire of the Holy Spirit)',
        category: 'Deggwa',
        mode: 'Araray Mode',
        season: 'Feasts, Resurrection & Epiphany',
        descriptionEn: 'The joyful, soaring chant mode symbolising the Holy Spirit, joy, and the Resurrection.',
        descriptionAm: 'የመንፈስ ቅዱስ ምሳሌ የሆነ፣ የደስታና የትንሣኤ የዜማ ስልት።',
        audioTrackId: 'zema-1',
        lines: [
          {
            speaker: 'cantors',
            speakerAm: 'መዘምራን (Cantors)',
            speakerEn: 'Cantors',
            geez: 'ክርስቶስ ፡ ተንሥአ ፡ እምሙታን ፡ በዐቢይ ፡ ኃይል ፡ ወሥልጣን ።',
            amharic: 'ክርስቶስ በታላቅ ኃይልና ሥልጣን ከሙታን ተለይቶ ተነሣ።',
            english: 'Christ is risen from the dead with great power and authority!',
            zemaMode: 'araray',
          },
        ],
      },
    ],
  },
  {
    id: 'yebelat-minbabat',
    titleAmharic: 'የበዓላት ምንባባት (Seasonal Lectionary & Readings)',
    titleEnglish: 'Yebelat Minbabat (Festal Liturgical Readings)',
    subtitle: 'Apostolic Epistles, Catholic Epistles, Acts & Gospel Lections',
    descriptionEn: 'The seasonal liturgical readings designated for the 9 Major Feasts of the Lord and 33 Marian Feasts.',
    descriptionAm: 'በ፱ኙ የጌታችንና በ፴፫ቱ የእመቤታችን በዓላት ወቅት የሚነበቡ የቅዱሳት መጻሕፍት ምንባባት።',
    iconName: 'Calendar',
    itemCount: 12,
    items: [
      {
        id: 'minbab-fasika',
        titleAmharic: 'ምንባበ ፋሲካ (Holy Pascha Readings)',
        titleEnglish: 'Paschal Resurrection Reading',
        category: 'Yebelat Minbabat',
        mode: 'Araray Mode',
        season: 'Holy Pascha (ፋሲካ)',
        descriptionEn: 'The triumphant Gospel lection from St. John 20 announcing the Empty Tomb.',
        descriptionAm: 'በፋሲካ ሌሊት የሚነበብ የዮሐንስ ወንጌል ምዕራፍ ፳ ምንባብ።',
        lines: [
          {
            speaker: 'priest',
            speakerAm: 'ካህን (Priest)',
            speakerEn: 'Priest',
            geez: 'ወበሰንበት ፡ ቀዳሚት ፡ መጽአት ፡ ማርያም ፡ መግደላዊት ፡ ፍኖተ ፡ መቃብር ።',
            amharic: 'ከሳምንቱ በመጀመሪያው ቀን በማለዳ ገና ጨለማ ሳለ መግደላዊት ማርያም ወደ መቃብሩ መጣች።',
            english: 'The first day of the week cometh Mary Magdalene early, when it was yet dark, unto the sepulchre.',
            zemaMode: 'araray',
          },
        ],
      },
    ],
  },
  {
    id: 'qolo',
    titleAmharic: 'ቆሎ ወቅኔ (Ge’ez Liturgical Poetry & Qene)',
    titleEnglish: 'Qolo & Qene (Sacred Ge’ez Metrical Poetry)',
    subtitle: 'Wax and Gold (ሰምና ወርቅ) Theological Poetry of the Liturgical Fathers',
    descriptionEn: 'Traditional Ge’ez poetry composed extemporaneously by masters of Qene during the Divine Liturgy to expound deep theological mysteries.',
    descriptionAm: 'በሊቃውንተ ቤተ ክርስቲያን በቅዳሴና በማሕሌት ወቅት የሚቀኙ የሰምና ወርቅ ጥልቅ የነገረ መለኮት ግጥሞች።',
    iconName: 'FileText',
    itemCount: 6,
    items: [
      {
        id: 'qene-melkea',
        titleAmharic: 'ቅኔ ጉባኤ ቃና (Gubae Qana Qene)',
        titleEnglish: 'Gubae Qana Poetic Meter',
        category: 'Qolo & Qene',
        mode: 'Ge’ez & Ezil',
        season: 'All Seasons',
        descriptionEn: 'Two-line foundational Qene meter conveying double-layered spiritual wisdom.',
        descriptionAm: 'ሁለት ስንኞች ያሉት የመሠረታዊ ቅኔ ቤት።',
        lines: [
          {
            speaker: 'cantors',
            speakerAm: 'ሊቅ (Master)',
            speakerEn: 'Qene Master',
            geez: 'ኦ ፡ መድኃኔ ፡ ዓለም ፡ ክርስቶስ ፡ አምላክነ ፡ ዘተሰቀልከ ፡ በእንቲአነ ፡ ተዘከረነ ፡ በሣህልከ ።',
            amharic: 'ስለ እኛ የተሰቀልህ አምላካችን መድኃኔዓለም ክርስቶስ ሆይ፥ በይቅርታህ አስበን።',
            english: 'O Saviour of the world, Christ our God, Who wast crucified for our sake, remember us in Thy tender mercy.',
            zemaMode: 'geez',
          },
        ],
      },
    ],
  },
  {
    id: 'ye-zema-timhirt-bet',
    titleAmharic: 'የዜማ ትምህርት ቤት (Zema School & Notation System)',
    titleEnglish: 'Ye-Zema Timhirt Bet (Sacred Notation & Chanting School)',
    subtitle: 'Melekete Zema (Melodic Signs), Neumes, and Debtera Training Curriculum',
    descriptionEn: 'Resources and training guides for learning the traditional Ge’ez musical signs (ምልክት) invented by Saint Yared: Yezet, Difat, Chiret, Hidat, Qenat, and Rikrik.',
    descriptionAm: 'ቅዱስ ያሬድ የፈጠራቸውን የዜማ ምልክቶች (ይዘት፣ ድፋት፣ ጭረት፣ ሂደት፣ ቅናት፣ ርክርክ) የመማሪያ መመሪያ።',
    iconName: 'Languages',
    itemCount: 10,
    items: [
      {
        id: 'zema-notation-guide',
        titleAmharic: 'የያሬዳዊ ዜማ ምልክቶችና ስያሜያቸው',
        titleEnglish: 'The 8 Sacred Yaredic Notation Signs (Meleket)',
        category: 'Zema School',
        mode: 'Notation Primer',
        season: 'Educational',
        descriptionEn: 'Complete visual and phonetic guide to the eight fundamental musical signs of Ethiopian chant notation.',
        descriptionAm: 'ስምንቱ የዜማ ምልክቶች፦ ይዘት (Hold), ድፋት (Fall), ጭረት (Rise), ቅናት (Sharp), ርክርክ (Tremolo), ቁርጥ (Staccato), ድርስ (Legato), አንብር (Rest)።',
        lines: [
          {
            speaker: 'cantors',
            speakerAm: 'መምህር (Teacher)',
            speakerEn: 'Zema Teacher',
            geez: 'ይዘት ፡ ድፋት ፡ ጭረት ፡ ቅናት ፡ ርክርክ ፡ ቁርጥ ፡ ድርስ ፡ አንብር ።',
            amharic: 'እነዚህ ስምንቱ የያሬድ የዜማ ምልክቶች የድምፅን መውጣትና መውረድ ይቆጣጠራሉ።',
            english: 'These eight musical neumes dictate pitch inflection, vibrato, and dynamic duration in Ge’ez liturgical chant.',
            zemaMode: 'geez',
          },
        ],
      },
    ],
  },
];
