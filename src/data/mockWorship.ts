export interface CanonicalFast {
  id: string;
  nameAmharic: string;
  nameEnglish: string;
  durationDays: number;
  season: string;
  descriptionEn: string;
  descriptionAm: string;
  scriptureReference: string;
  dietaryRules: string;
}

export interface SermonItem {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  preacher: string;
  role: string;
  date: string;
  duration: string;
  category: 'Theology' | 'Feast of Tabor' | 'Mariology' | 'Spiritual Life' | 'Church History' | 'Youth & Family';
  feastDay?: string;
  scriptureTheme: string;
  summary: string;
  audioTrackId?: string;
  audioUrl?: string;
  videoUrl?: string;
  mediaType: 'audio' | 'video';
  isFeatured?: boolean;
  transcriptAm?: string;
  transcriptEn?: string;
}

export const TODAY_LITURGY = {
  ethiopianDate: 'ነሐሴ ፮ ቀን ፳፻፲፰ ዓ.ም',
  gregorianDate: 'Wednesday, August 12, 2026',
  feastNameAmharic: 'ደብረ ታቦር (ቡሄ) • በዓለ ደብረ ታቦር',
  feastNameEnglish: 'Feast of the Transfiguration (Debre Tabor / Buhe)',
  saintOfDayAmharic: 'ቅዱስ እግዚአብሔር አብ / ቅዱስ ኢየሱስ / አባ ጊዮርጊስ ዘጋሥጫ',
  saintOfDayEnglish: 'Debre Tabor & Abba Giyorgis of Gasicha',
  isFast: true,
  fastNameAmharic: 'ፆመ ፍልሰታ (Filseta Fast)',
  fastStatusText: 'Strict Fasting until 3:00 PM (9:00 local time) • Vegan diet without dairy or eggs',
  readings: {
    psalm: {
      titleAmharic: 'መዝሙረ ዳዊት',
      verseAmharic: 'መዝሙር ፹፱ ፡ ፲፪',
      verseEnglish: 'Psalm 89:12',
      textGeez: 'ታቦር ፡ ወአርሞንኤም ፡ በስመ ፡ ዚአከ ፡ ይትፌሥሑ ።',
      textAmharic: 'ታቦርና አርሞንዔም በስምህ ደስ ይላቸዋል።',
      textEnglish: 'Tabor and Hermon shall rejoice in thy name.',
    },
    epistle: {
      titleAmharic: 'መልእክተ ጴጥሮስ',
      verseAmharic: '፪ኛ ጴጥሮስ ፩ ፡ ፲፮ - ፲፰',
      verseEnglish: '2 Peter 1:16-18',
      textGeez: 'እስመ ፡ አርአየነ ፡ ክብሮ ፡ በደብረ ፡ መቅደሱ ።',
      textAmharic: 'በተቀደሰው ተራራ ከእርሱ ጋር ሳለን ይህን ድምፅ ከሰማይ ሲወርድ ሰማን።',
      textEnglish: 'For he received from God the Father honour and glory, when there came such a voice to him from the excellent glory.',
    },
    gospel: {
      titleAmharic: 'ወንጌለ ማቴዎስ',
      verseAmharic: 'ማቴዎስ ፲፯ ፡ ፩ - ፱',
      verseEnglish: 'Matthew 17:1-9',
      textGeez: 'ወተወለጠ ፡ ራእዩ ፡ በቅድሜሆሙ ፡ ወአብርሃ ፡ ገጹ ፡ ከመ ፡ ፀሐይ ።',
      textAmharic: 'በፊታቸውም ተለወጠ፤ ፊቱም እንደ ፀሐይ በራ፤ ልብሱም እንደ ብርሃን ነጭ ሆነ።',
      textEnglish: 'And was transfigured before them: and his face did shine as the sun, and his raiment was white as the light.',
    },
  },
};

export const CANONICAL_FASTS: CanonicalFast[] = [
  {
    id: 'abiy-tsom',
    nameAmharic: 'ዐቢይ ጾም (The Great Lent)',
    nameEnglish: 'The Great Holy Lent (Hudadi)',
    durationDays: 55,
    season: 'Spring (Yekatit / Megabit / Miazia)',
    descriptionEn: 'The most sacred 55-day fast observed before Holy Pascha (Easter), commemorating Christ’s 40-day wilderness fast, the Fast of Heraclius, and Passion Week (ሰሙነ ሕማማት).',
    descriptionAm: 'ጌታችን መድኃኒታችን ኢየሱስ ክርስቶስ በገዳመ ቆሮንቶስ የጾመውን አርባ ቀንና አርባ ሌሊት የምናስብበት ታላቁ ጾም።',
    scriptureReference: 'ማቴዎስ ፬ ፡ ፩ - ፪ (Matthew 4:1-2)',
    dietaryRules: 'Strict vegan diet; complete abstinence from food and water until 3:00 PM daily. No meat, dairy, eggs, or animal products.',
  },
  {
    id: 'filseta',
    nameAmharic: 'ፆመ ፍልሰታ (Fast of the Dormition)',
    nameEnglish: 'Fast of the Holy Assumption (Filseta)',
    durationDays: 16,
    season: 'Nehase 1 - Nehase 16 (August 7 - 22)',
    descriptionEn: 'Commemorates the apostles seeking and witnessing the bodily assumption of the Theotokos, Saint Mary, into heaven with daily Divine Liturgies and vigil prayers.',
    descriptionAm: 'እመቤታችን ቅድስት ድንግል ማርያም ያረፈችበትንና ሥጋዋ ወደ ሰማይ ያረገበትን ዕርገተ ሥጋዋን የምናስብበት ጾም።',
    scriptureReference: 'መዝሙር ፵፭ ፡ ፱ (Psalm 45:9)',
    dietaryRules: 'Complete abstinence until 3:00 PM; vegan food only. Traditional Mulmul bread shared on the 16th day.',
  },
  {
    id: 'tsome-nebiyat',
    nameAmharic: 'ፆመ ነቢያት (Advent / Fast of the Prophets)',
    nameEnglish: 'Fast of the Prophets (Christmas Fast)',
    durationDays: 44,
    season: 'Hidar 15 - Tahsas 28 (Nov 24 - Jan 6)',
    descriptionEn: 'Prepares the faithful for the Nativity of Christ (Genna), commemorating the long expectation and prophecies of the Old Testament prophets.',
    descriptionAm: 'ነቢያት ስለ ክርስቶስ መወለድ የተነበዩትንና የናፈቁትን በማሰብ ለጌታችን ልደት የምንዘጋጅበት ጾም።',
    scriptureReference: 'ኢሳይያስ ፯ ፡ ፲፬ (Isaiah 7:14)',
    dietaryRules: 'Vegan fast; abstinence until 1:00 PM daily.',
  },
  {
    id: 'tsome-hawaryat',
    nameAmharic: 'ፆመ ሐዋርያት (Fast of the Apostles)',
    nameEnglish: 'Fast of the Holy Apostles (Sene Tsom)',
    durationDays: 30,
    season: 'Following Pentecost until Sene 5 (July 12)',
    descriptionEn: 'Observed by the Holy Apostles before going forth to preach the Gospel across the world after receiving the Holy Spirit at Pentecost.',
    descriptionAm: 'ቅዱሳን ሐዋርያት መንፈስ ቅዱስን ከተቀበሉ በኋላ ለስብከተ ወንጌል ከመውጣታቸው በፊት የጾሙት ጾም።',
    scriptureReference: 'የሐዋርያት ሥራ ፲፫ ፡ ፫ (Acts 13:3)',
    dietaryRules: 'Vegan fasting until 1:00 PM; fish permitted on non-strict days in some traditions.',
  },
  {
    id: 'tsome-dihnet',
    nameAmharic: 'ፆመ ድኅነት (Wednesday & Friday Fasts)',
    nameEnglish: 'Fast of Salvation (Wednesday & Friday)',
    durationDays: 104,
    season: 'Year-round (Except 50 days of Pentecost)',
    descriptionEn: 'Wednesday fast commemorates the consultation of the Sanhedrin to crucify Christ; Friday commemorates Christ’s Holy Crucifixion on Golgotha.',
    descriptionAm: 'ረቡዕ የጌታችን ምክረ ሞት የተመከረበት፣ ዓርብ ደግሞ በመስቀል ላይ የዋለበት የድኅነት ቀን መታሰቢያ።',
    scriptureReference: 'ማቴዎስ ፳፮ ፡ ፫ - ፬ (Matthew 26:3-4)',
    dietaryRules: 'Abstinence until 3:00 PM; vegan food only.',
  },
  {
    id: 'tsome-nineveh',
    nameAmharic: 'ፆመ ነነዌ (Fast of Nineveh)',
    nameEnglish: 'The Fast of Nineveh',
    durationDays: 3,
    season: 'Two weeks before the Great Lent (Monday - Wednesday)',
    descriptionEn: 'Commemorates the 3-day repentance and fasting of the city of Nineveh at the preaching of the Prophet Jonah.',
    descriptionAm: 'የነነዌ ሰዎች በነቢዩ ዮናስ ስብከት ንስሐ ገብተው ከጥፋት የዳኑበት የሦስት ቀናት ታላቅ የንስሐ ጾም።',
    scriptureReference: 'ዮናስ ፫ ፡ ፭ - ፲ (Jonah 3:5-10)',
    dietaryRules: 'Strict 3-day fasting with high spiritual vigilance.',
  },
  {
    id: 'tsome-gahad',
    nameAmharic: 'ፆመ ጋሃድ (Gahad Fast of Epiphany & Nativity)',
    nameEnglish: 'Gahad Vigil Fast (Eves of Epiphany & Nativity)',
    durationDays: 2,
    season: 'Eve of Genna & Timkat',
    descriptionEn: 'Vigil fast observed on the eve of Christmas (Genna) and Timkat (Epiphany) when these feasts fall on Wednesday or Friday.',
    descriptionAm: 'ለጌታችን ልደትና ጥምቀት በዓል ዋዜማ የሚጾም የዝግጅት ጾም።',
    scriptureReference: 'ማቴዎስ ፫ ፡ ፩ - ፮ (Matthew 3:1-6)',
    dietaryRules: 'Full day vegan abstinence until vigil liturgy.',
  },
];

export const MOCK_SERMONS: SermonItem[] = [
  {
    id: 'sermon-1',
    titleAmharic: 'ምሥጢረ ተዋሕዶና የድኅነት መንገድ — ቃለ አበው',
    titleEnglish: 'The Mystery of Tewahedo & The Path of Salvation',
    preacher: 'ብፁዕ ወቅዱስ አቡነ ማትያስ (His Holiness Patriarch Abune Mathias)',
    role: 'Patriarch of Ethiopia, Archbishop of Axum & Echege of the See of St. Tekle Haymanot',
    date: 'August 14, 2026',
    duration: '42:15',
    category: 'Theology',
    feastDay: 'ደብረ ታቦር (Transfiguration)',
    scriptureTheme: 'ዮሐንስ ፩ ፡ ፲፬ (John 1:14)',
    summary: 'An inspiring patriarchal Apostolic teaching on the mystery of the Incarnation (ተዋሕዶ), the unconfused union of Divinity and Humanity, and maintaining unbroken unity in Christian love.',
    audioTrackId: 'zema-1',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    mediaType: 'audio',
    isFeatured: true,
    transcriptAm: 'በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን። የተወደዳችሁ የመንፈስ ቅዱስ ልጆቻችን፤ የክርስቶስ ቤተሰቦች፤ በዛሬው ዕለት የጌታችንና የመድኃኒታችን የኢየሱስ ክርስቶስን የደብረ ታቦር በዓል ስናስብ፥ እርሱ ለደቀ መዛሙርቱ ክብሩንና መለኮታዊ ብርሃኑን የገለጠበትን ታላቅ ምሥጢር እናስተውላለን...',
    transcriptEn: 'In the name of the Father, the Son, and the Holy Spirit, One God. Amen. Beloved spiritual children and families of Christ: As we celebrate the Transfiguration of our Lord Jesus Christ on Mount Tabor, we contemplate the profound revelation of His uncreated divine glory...',
  },
  {
    id: 'sermon-2',
    titleAmharic: 'የደብረ ታቦር ብርሃንና የመንፈሳዊ ዕድገት ሚስጥር',
    titleEnglish: 'The Light of Mount Tabor & Spiritual Transfiguration',
    preacher: 'መጋቤ ሐዲስ እሸቱ ዓለማየሁ (Megabe Hadis Eshetu Alemayehu)',
    role: 'Distinguished Scholar, Preacher & Author',
    date: 'August 12, 2026',
    duration: '35:40',
    category: 'Feast of Tabor',
    feastDay: 'ደብረ ታቦር (Mount Tabor)',
    scriptureTheme: 'ማቴዎስ ፲፯ ፡ ፩ - ፱ (Matthew 17:1-9)',
    summary: 'A moving reflection on leaving behind worldly distractions to ascend Mount Tabor in prayer, fasting, and encountering the transforming grace of Christ.',
    audioTrackId: 'zema-2',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    isFeatured: false,
    transcriptAm: 'ደብረ ታቦር ማለት የተራራው ስም ብቻ ሳይሆን የልባችን ከፍታ ነው። ጌታችን ሦስቱን ደቀ መዛሙርት ወደ ተራራው ይዞ የወጣው ከዓለም ሁካታና ጭንቀት ርቀው በጸሎት ከእርሱ ጋር እንዲተባበሩ ነው።...',
    transcriptEn: 'Mount Tabor is not merely a geographic mountain; it is the elevation of our hearts. Our Lord took Peter, James, and John up the high mountain so that, secluded from worldly chaos, they might commune in prayer...',
  },
  {
    id: 'sermon-3',
    titleAmharic: 'የቅድስት ድንግል ማርያም ፍልሰታና ምልጃዋ በሕይወታችን',
    titleEnglish: 'The Holy Assumption of St. Mary & Her Motherly Intercession',
    preacher: 'ሊቀ ማእምራን ፋንታሁን ሙጬ (Liqe Ma’emran Fantahun Muche)',
    role: 'Dean of Holy Trinity Theological College',
    date: 'August 9, 2026',
    duration: '48:10',
    category: 'Mariology',
    feastDay: 'ፆመ ፍልሰታ (Filseta)',
    scriptureTheme: 'ሉቃስ ፩ ፡ ፵፰ (Luke 1:48)',
    summary: 'Patristic and theological exposition on the Holy Assumption (ፍልሰታ) of the Mother of God, her covenant of mercy, and her maternal protection over the Church.',
    audioTrackId: 'zema-3',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    mediaType: 'audio',
    isFeatured: false,
    transcriptAm: 'እመቤታችን ቅድስት ድንግል ማርያም የድኅነታችን ምክንያት፣ የሕይወታችን መሠረት ናት። ሐዋርያት የሥጋዋን ዕርገት ያዩ ዘንድ ጾመው እንደጸለዩ፥ እኛም በጾመ ፍልሰታ ምልጃዋን እንማጸናለን...',
    transcriptEn: 'Our Lady the Holy Virgin Mary is the vessel of our salvation. Just as the Holy Apostles fasted and prayed to witness her bodily translation into heaven, so we also seek her maternal prayers...',
  },
  {
    id: 'sermon-4',
    titleAmharic: 'የጾምና የጸሎት ኃይል በኦርቶዶክሳዊ አኗኗር',
    titleEnglish: 'The Power of Fasting, Vigil, and True Almsgiving',
    preacher: 'መምህር ዘበነ ለማ (Memhir Zebene Lemma)',
    role: 'Renowned Orthodox Evangelist & Educator',
    date: 'July 28, 2026',
    duration: '38:55',
    category: 'Spiritual Life',
    feastDay: 'ፆመ ሐዋርያት (Apostles Fast)',
    scriptureTheme: 'ማቴዎስ ፮ ፡ ፲፮ - ፲፰ (Matthew 6:16-18)',
    summary: 'Practical spiritual guidance on harnessing the true Orthodox discipline of fasting with genuine humility, repentance, love for brethren, and charity towards the poor.',
    audioTrackId: 'zema-4',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    isFeatured: false,
    transcriptAm: 'ጾም ሆድን ማስራብ ብቻ አይደለም፤ ጾም ዓይንን፣ ጆሮን፣ አእምሮንና ምላስን ከክፉ ነገር ሁሉ መከልከል ነው። ከምጽዋት ጋር የተጣመረ ጾም ደግሞ ወደ እግዚአብሔር ዙፋን ፈጥኖ ይደርሳል...',
    transcriptEn: 'Fasting is not merely abstaining from bodily nourishment; it is retraining the eyes, ears, mind, and tongue from all falsehood. A fast coupled with almsgiving rises swiftly to the throne of God...',
  },
  {
    id: 'sermon-5',
    titleAmharic: 'የቅዱስ ያሬድ መንፈሳዊ ቅርስና የኢትዮጵያ ዜማ ምሥጢር',
    titleEnglish: 'The Spiritual Heritage of Saint Yared & Sacred Zema',
    preacher: 'ሊቀ ኅሩያን ቀሲስ ደረጀ (Liqe Hiruyan Qes Dereje)',
    role: 'Liturgical Scholar & Head Priest of St. Mary Cathedral',
    date: 'July 15, 2026',
    duration: '52:20',
    category: 'Church History',
    feastDay: 'ግንቦት ፲፩ (St. Yared Feast)',
    scriptureTheme: 'መዝሙር ፻፶ ፡ ፩ - ፮ (Psalm 150:1-6)',
    summary: 'The divine revelation of the 3-mode liturgical chant system to Saint Yared in the 6th century and its enduring theological symbolism in church worship.',
    audioTrackId: 'zema-1',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    mediaType: 'audio',
    isFeatured: false,
    transcriptAm: 'ቅዱስ ያሬድ በ6ኛው መቶ ክፍለ ዘመን በሰማያዊ መላእክት ዝማሬ ተመስጦ ያመጣው ዜማ፥ ዛሬ ድረስ ቤተ ክርስቲያናችንን የሚያደምቅ ሕያው የእግዚአብሔር ስጦታ ነው...',
    transcriptEn: 'The sacred chant received by Saint Yared in the 6th century, inspired by the heavenly praises of the Seraphim, remains the living breath of Orthodox liturgy today...',
  },
  {
    id: 'sermon-6',
    titleAmharic: 'የወጣቶች መንፈሳዊ ሕይወት በዘመነ ዲጂታል',
    titleEnglish: 'Youth & Family Faith in the Digital Age',
    preacher: 'ዲያቆን ሄኖክ ኃይሌ (Deacon Henok Haile)',
    role: 'Orthodox Youth Teacher & Author',
    date: 'June 30, 2026',
    duration: '45:00',
    category: 'Youth & Family',
    scriptureTheme: 'መክብብ ፲፪ ፡ ፩ (Ecclesiastes 12:1)',
    summary: 'How Christian youth and families can navigate modern technological culture while anchoring themselves firmly in Holy Scripture, confession, and the sacramental life.',
    audioTrackId: 'zema-2',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    isFeatured: false,
    transcriptAm: 'በወጣትነትህ ፈጣሪህን አስብ። የቴክኖሎጂና የማኅበራዊ ሚዲያ ዓለም በረከትም ፈተናም ሊሆን ይችላል፤ ዋናው ነገር ልባችን የት እንደተተከለ ማወቅ ነው...',
    transcriptEn: 'Remember now thy Creator in the days of thy youth. Technology and modern media can serve as a blessing or a snare; what matters is where our hearts are anchored...',
  }
];
