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
  historicalBackgroundEn: string;
  historicalBackgroundAm: string;
  spiritualThemesEn: string[];
  spiritualThemesAm: string[];
  liturgicalPracticesEn: string;
  liturgicalPracticesAm: string;
  canonicalOrigin: string;
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
    descriptionEn: 'The supreme 55-day fast observed before Holy Pascha (Fasika / Easter). It commemorates Christ’s 40-day wilderness fast, the Fast of Heraclius (1 week), and the solemn Passion Week (Semune Himamat / ሰሙነ ሕማማት).',
    descriptionAm: 'ጌታችን መድኃኒታችን ኢየሱስ ክርስቶስ በገዳመ ቆሮንቶስ የጾመውን አርባ ቀንና አርባ ሌሊት፣ የሕርቃልን ጾምና ሕማማትን የምናስብበት ከሁሉ የበላይ የሆነው ታላቁ ጾም።',
    scriptureReference: 'ማቴዎስ ፬ ፡ ፩ - ፪ (Matthew 4:1-2)',
    dietaryRules: 'Strict vegan diet; complete abstinence from food and liquid until 3:00 PM (9th hour) or after the Eucharistic Liturgy. Strict prohibition of meat, poultry, fish, eggs, dairy, cheese, milk, and animal fats.',
    historicalBackgroundEn: 'Canonically structured into eight weeks, each illuminated by St. Yared’s Tsome Deggwa hymnody: Zewerede, Qidist, Mikurab, Metsagwe, Debre Zeyt, Gebir Her, Niqodimos, and Hosanna, culminating in Passion Week.',
    historicalBackgroundAm: 'በስምንቱ የጾም ሳምንታት የተከፈለ ሲሆን እያንዳንዱ ሳምንት በቅዱስ ያሬድ ጾመ ድጓ ስያሜ የተሰጠው ነው፦ ዘወረደ፣ ቅድስት፣ ምኩራብ፣ መጻጕዕ፣ ደብረ ዘይት፣ ገብር ኄር፣ ኒቆዲሞስ፣ ሆሣዕና እና ሰሙነ ሕማማት።',
    spiritualThemesEn: [
      'Victory over demonic temptation in the wilderness',
      'Daily metanias (spiritual prostrations / ስግደት) & tears of repentance',
      'Intense meditation on the Passion and Crucifixion of Christ',
      'Reconciliation, forgiveness, and generous almsgiving (ምጽዋት)'
    ],
    spiritualThemesAm: [
      'የዲያብሎስን ፈተና በጾምና በጸሎት ድል መንሳት',
      'የዕለት ተዕለት የንስሐ ስግደትና ዕንባ',
      'የጌታችንን የማዳን ሕማማትና የመስቀል ሞት ማሰብ',
      'ይቅር ባይነት፣ ፍቅርና ለድሆች ምጽዋት መስጠት'
    ],
    liturgicalPracticesEn: 'Daily Divine Liturgies held in the late afternoon (3:00 PM). During Passion Week (Himamat), the altar is draped in black, regular liturgies give way to continuous hourly prayer offices (Sa’atat), and kissing of the Holy Cross is withheld until Good Friday (Siklet).',
    liturgicalPracticesAm: 'ቅዳሴ ከሰዓት በኋላ በ፱ ሰዓት ይከናወናል። በሰሙነ ሕማማት መጋረጃዎች በጥቁር ይለወጣሉ፤ ጸሎተ ሰዓታትና ስግደት ያለማቋረጥ ይደረጋል፤ እስከ ስቅለት ድረስ መስቀል አይሳለምም።',
    canonicalOrigin: 'Council of Nicaea (325 AD), Fetha Negest Article 15 & Canons of the Apostles'
  },
  {
    id: 'filseta',
    nameAmharic: 'ፆመ ፍልሰታ (Fast of the Dormition)',
    nameEnglish: 'Fast of the Holy Assumption (Filseta)',
    durationDays: 16,
    season: 'Nehase 1 - Nehase 16 (August 7 - 22)',
    descriptionEn: 'Commemorates the holy Apostles fasting to witness the bodily assumption (Ergete Segawa) of the Mother of God (Theotokos), Holy Virgin Mary, into heavenly glory with choirs of angels.',
    descriptionAm: 'ቅዱሳን ሐዋርያት የእመቤታችን የቅድስት ድንግል ማርያምን ዕረፍትና ዕርገተ ሥጋ ለማየት የጾሙትን ጾም በማሰብ በየዓመቱ በታላቅ ተመስጦ የሚጾም ጾም።',
    scriptureReference: 'መዝሙር ፵፭ ፡ ፱ (Psalm 45:9)',
    dietaryRules: 'Complete abstinence until 3:00 PM daily; 100% plant-based vegan diet. On the 16th day, blessed festive unleavened bread (Mulmul / ሙልሙል) is traditionally shared with children.',
    historicalBackgroundEn: 'St. John the Evangelist and the Apostles witnessed the miraculous translation of St. Mary’s body to Paradise. When St. Thomas arrived later and saw her ascending, the Apostles fasted for 16 days in August until Christ revealed her resurrection and bodily ascent to them.',
    historicalBackgroundAm: 'ሐዋርያው ቶማስ በደመና ተጭኖ ሲመጣ እመቤታችን ስታርግ አይቶ ሰበኗን ተቀበለ፤ ለሌሎቹ ሐዋርያት በነገራቸው ጊዜ እርሷን ለማየት ነሐሴ ፩ ቀን ጾም ጀምረው በ፲፮ኛው ቀን ጌታችን ሥጋዋን ሰጥቷቸው በክብር ቀብረዋታል።',
    spiritualThemesEn: [
      'Veneration of the Theotokos as the Ark of the Covenant',
      'Daily participation in holy midnight Vigils (Mahlet) and Qidase',
      'Purity of body, heart, and spirit through intercessory prayer',
      'Special children and youth retreats across monasteries'
    ],
    spiritualThemesAm: [
      'እመቤታችንን እንደ ታቦተ ጽዮን ማክበርና ማመስገን',
      'በየሌሊቱ በማሕሌትና በቀን በቅዳሴ መሳተፍ',
      'በእመቤታችን አማላጅነት መንፈሳዊ ንጽሕናን ማግኘት',
      'ሕፃናትና ወጣቶች በገዳማትና በአብነት ትምህርት ቤቶች መሳተፍ'
    ],
    liturgicalPracticesEn: 'Daily chanting of the Anaphora of Saint Mary (Qidase Mariam) and the Hymns of St. Ephrem (Wudase Mariam). Many faithful spend the entire 16 days in holy monasteries and parish compounds.',
    liturgicalPracticesAm: 'በየቀኑ ቅዳሴ ማርያምና ውዳሴ ማርያም ይደገማል። ምእመናን በገዳማትና በደብራት በመሰባሰብ ፲፮ቱን ቀናት በሙሉ በጸሎት ያሳልፋሉ።',
    canonicalOrigin: 'Apostolic Tradition, Didascalia Chapter 29 & Fetha Negest Article 15'
  },
  {
    id: 'tsome-nebiyat',
    nameAmharic: 'ፆመ ነቢያት (Advent / Fast of the Prophets)',
    nameEnglish: 'Fast of the Prophets (Christmas Fast)',
    durationDays: 44,
    season: 'Hidar 15 - Tahsas 28 (Nov 24 - Jan 6)',
    descriptionEn: 'Prepares the hearts of believers for the Nativity of Christ (Genna / ልደት). It honors the intense faith, longing, and prophecies of the Old Testament prophets who foretold the Incarnation of God.',
    descriptionAm: 'ለጌታችን ለመድኃኒታችን ለኢየሱስ ክርስቶስ የልደት በዓል ልቦናችንን የምናዘጋጅበት፤ ነቢያት ስለ መሲሑ መምጣት የተነበዩትንና የናፈቁትን የምናስብበት ጾም።',
    scriptureReference: 'ኢሳይያስ ፯ ፡ ፲፬ (Isaiah 7:14)',
    dietaryRules: 'Vegan plant-based fasting; abstinence from food and drink until 1:00 PM or 3:00 PM depending on pastoral counsel.',
    historicalBackgroundEn: 'Includes the Fast of Moses (40 days on Mount Sinai receiving the Ten Commandments), plus 3 days commemorating the miraculous moving of Mount Mokattam during the patriarchate of St. Abraham, and the Eve of Nativity (Gahad).',
    historicalBackgroundAm: 'የሙሴን ፵ ቀን ጾም፣ በግብፅ የተደረገውን የደብረ ሙቀጥም ተአምር ፫ ቀን ጾምና የገና ዋዜማ ጋሃድን ያጠቃለለ ፵፬ ቀናት የሚጾም ጾም ነው።',
    spiritualThemesEn: [
      'Messianic hope and fulfillment of Old Testament covenants',
      'Humility in receiving Emmanuel: "God with Us"',
      'Spiritual illumination and dispelling spiritual darkness',
      'Charity towards the poor and preparation for the Holy Feast of Nativity'
    ],
    spiritualThemesAm: [
      'የብሉይ ኪዳን ተስፋ መፈጸምና የልዑል እግዚአብሔር ሰው መሆን',
      'አማኑኤልን በትሕትና ልብ ለመቀበል መዘጋጀት',
      'የመንፈስ ጨለማን በወንጌል ብርሃን ማስወገድ',
      'ለተቸገሩት ወገኖች በረከትን ማካፈል'
    ],
    liturgicalPracticesEn: 'Chanting of prophetic texts from Isaiah, Micah, and Davidic Psalms during morning prayers. The liturgy highlights the mystery of the Incarnation (ሥጋዌ).',
    liturgicalPracticesAm: 'በማሕሌቱና በቅዳሴው የነቢያት ትንቢት (የኢሳይያስ፣ የሚክያስ፣ የዳዊት መዝሙር) በስፋት ይነበባል፤ የምሥጢረ ሥጋዌ ትምህርት ይሰበካል።',
    canonicalOrigin: 'Canons of the Holy Synod & Fetha Negest Article 15'
  },
  {
    id: 'tsome-hawaryat',
    nameAmharic: 'ፆመ ሐዋርያት (Fast of the Apostles)',
    nameEnglish: 'Fast of the Holy Apostles (Sene Tsom)',
    durationDays: 30,
    season: 'Following Pentecost until Sene 5 (July 12)',
    descriptionEn: 'Commemorates the Holy Apostles who, having received the Holy Spirit at Pentecost, fasted before venturing forth to proclaim the Holy Gospel to all nations.',
    descriptionAm: 'ቅዱሳን ሐዋርያት በበዓለ ኀምሳ መንፈስ ቅዱስን ከተቀበሉ በኋላ ለዓለም አቀፍ ስብከተ ወንጌል ከመሰማራታቸው በፊት ጾመው ጸልየው ጸጋን ያበዙበት ጾም።',
    scriptureReference: 'የሐዋርያት ሥራ ፲፫ ፡ ፫ (Acts 13:3)',
    dietaryRules: 'Vegan fasting until 1:00 PM. Complete prohibition of animal flesh, poultry, dairy, and eggs.',
    historicalBackgroundEn: 'The duration varies from 10 to 40 days depending on the date of Easter (Fasika). It begins on the Monday immediately following Pentecost (Paraclete) and concludes on Sene 5 (July 12) on the martyrdom feast of St. Peter and St. Paul.',
    historicalBackgroundAm: 'እንደ ፋሲካ በዓል መውደቂያ ከ፲ እስከ ፵ ቀናት ሊረዝም ወይም ሊያጥር ይችላል። ከበዓለ ኀምሳ ሰኞ ጀምሮ እስከ ሐምሌ ፭ (የቅዱስ ጴጥሮስና ቅዱስ ጳውሎስ ሰማዕትነት) ድረስ ይጾማል።',
    spiritualThemesEn: [
      'Empowerment by the Holy Spirit for spiritual warfare and evangelism',
      'Prayer for bishops, priests, deacons, missionaries, and church teachers',
      'Steadfast apostolic faith in preserving Orthodox doctrine',
      'Spiritual stewardship and spreading Christian love'
    ],
    spiritualThemesAm: [
      'በመንፈስ ቅዱስ ኃይል መታጠቅና የወንጌል መልእክተኛ መሆን',
      'ለፓትርያርኩ፣ ለኤጲስ ቆጶሳት፣ ለካህናትና ለዲያቆናት መጸለይ',
      'የቀናችውን የኦርቶዶክስ ተዋሕዶ ሃይማኖት መጠበቅና ማስተማር',
      'የወንድማማችነት ፍቅርን ማጠናከር'
    ],
    liturgicalPracticesEn: 'Readings from the Book of Acts and the Pauline Epistles. Liturgical petitions for the peace of the Church and preservation of the Apostolic succession.',
    liturgicalPracticesAm: 'የሐዋርያት ሥራና መልእክታት በስፋት ይነበባሉ፤ ስለ ቤተ ክርስቲያን ሰላምና ስለ ሐዋርያዊ አንድነት ጸሎት ይደረጋል።',
    canonicalOrigin: 'Canons of the Apostles (Canons of Clement) & Didascalia Chapter 29'
  },
  {
    id: 'tsome-dihnet',
    nameAmharic: 'ፆመ ድኅነት (Wednesday & Friday Fasts)',
    nameEnglish: 'Fast of Salvation (Wednesday & Friday)',
    durationDays: 104,
    season: 'Year-round (Except 50 days of Pentecost)',
    descriptionEn: 'The continuous weekly pillar of Christian discipline. Wednesday commemorates the consultation of Judas and the Sanhedrin to betray and crucify Christ; Friday commemorates Christ’s Holy Crucifixion and death on Golgotha.',
    descriptionAm: 'በዓመት ሙሉ ረቡዕና ዓርብ የሚጾም የድኅነት ጾም ነው። ረቡዕ የጌታችን ምክረ ሞት የተመከረበት፣ ዓርብ ደግሞ በመስቀል ላይ የዋለበት የድኅነት ቀን መታሰቢያ ነው።',
    scriptureReference: 'ማቴዎስ ፳፮ ፡ ፫ - ፬ (Matthew 26:3-4)',
    dietaryRules: 'Abstinence until 3:00 PM (9:00 local time); strictly vegan food. No fasting during the 50 glorious days between Easter and Pentecost (Filsata/Kidan).',
    historicalBackgroundEn: 'Instituted directly by the Holy Apostles as documented in the Didache (c. 1st Century) and upheld by every Ecumenical Council as obligatory for every baptized Christian over seven years of age.',
    historicalBackgroundAm: 'በቀኖና ሐዋርያት (ዲዲስቅልያና ፍትሐ ነገሥት) የተደነገገ ሲሆን ከ፯ ዓመት በላይ የሆነ እያንዳንዱ ኦርቶዶክሳዊ ክርስቲያን የጌታውን መከራ በማሰብ በየሳምንቱ እንዲጾመው ግዴታ የተደረገ ነው።',
    spiritualThemesEn: [
      'Unbroken weekly commemoration of Christ’s redeeming sacrifice',
      'Crucifying the passions of the flesh and mortifying sin',
      'Vigilance against betrayal, hypocrisy, and spiritual complacency',
      'Gratitude for the eternal redemption accomplished on the Cross'
    ],
    spiritualThemesAm: [
      'የጌታችንን የማዳን ሥራ በየሳምንቱ ያለማቋረጥ ማሰብ',
      'የሥጋን ፈቃድ መግታትና ራስን ለቅድስና ማስገዛት',
      'ከይሁዳ ክህደትና ከግብዝነት ራስን መጠበቅ',
      'በመስቀሉ ለተገኘው የዘላለም ሕይወት ምስጋና ማቅረብ'
    ],
    liturgicalPracticesEn: 'Qidase begins after midday (12:00 PM or 1:00 PM) and concludes at 3:00 PM. The faithful participate with prayers for the forgiveness of sins.',
    liturgicalPracticesAm: 'ቅዳሴው በቀትር ሰዓት ተጀምሮ በ፱ ሰዓት ይጠናቀቃል፤ ምእመናን ንስሐ በመግባት ቅዱስ ቁርባን ይቀበላሉ።',
    canonicalOrigin: 'Didache Chapter 8, Apostolic Canons 69 & Fetha Negest Article 15'
  },
  {
    id: 'tsome-nineveh',
    nameAmharic: 'ፆመ ነነዌ (Fast of Nineveh)',
    nameEnglish: 'The Fast of Nineveh',
    durationDays: 3,
    season: 'Two weeks before the Great Lent (Monday - Wednesday)',
    descriptionEn: 'A profound 3-day solemn fast of repentance commemorating the conversion and deliverance of the ancient city of Nineveh at the preaching of Prophet Jonah.',
    descriptionAm: 'የነነዌ ሰዎች በነቢዩ ዮናስ ስብከት ንስሐ ገብተው፣ ማቅ ለብሰውና አመድ ነስንሰው ከታላቅ መቅሠፍት የዳኑበትን በማሰብ የሚጾም የሦስት ቀናት ታላቅ የንስሐ ጾም።',
    scriptureReference: 'ዮናስ ፫ ፡ ፭ - ፲ (Jonah 3:5-10)',
    dietaryRules: 'Strict complete abstinence until late afternoon; 100% vegan food only. Many devout faithful fast without food or water throughout the three days.',
    historicalBackgroundEn: 'Prophet Jonah spent 3 days in the belly of the great sea creature, foreshadowing Christ’s 3 days in the tomb. The King and 120,000 citizens of Nineveh fasted with all their animals, moving God to turn away His wrath.',
    historicalBackgroundAm: 'ነቢዩ ዮናስ በዓሣ አንበሪ ሆድ ውስጥ ሦስት ቀንና ሦስት ሌሊት መቆየቱ የክርስቶስ የሦስት ቀን መቃብር ምሳሌ ሲሆን የነነዌ ሰዎች ከእንስሳቱ ጋር ጾመው መሐሪውን አምላክ አስደስተዋል።',
    spiritualThemesEn: [
      'Power of genuine repentance (Niseha) to turn away judgment',
      'God’s boundless mercy that encompasses all peoples and nations',
      'Spiritual threshold and preparation for the upcoming Great Lent',
      'Overcoming spiritual pride and embracing humility before God'
    ],
    spiritualThemesAm: [
      'እውነተኛ ንስሐ መቅሠፍትን እንደሚያርቅና ምሕረትን እንደሚያመጣ ማመን',
      'የእግዚአብሔር ቸርነት ለፍጥረቱ ሁሉ የበዛ መሆኑን ማወቅ',
      'ወደ ታላቁ ዐቢይ ጾም ለመግባት እንደ መግቢያ በር ማገልገል',
      'ትዕቢትን አስወግዶ ራስን ዝቅ ማድረግ'
    ],
    liturgicalPracticesEn: 'Continuous chanting of Jonah’s prayer and penitential hymns of St. Yared. Liturgy with elevated prayers for world peace and divine reconciliation.',
    liturgicalPracticesAm: 'የነቢዩ ዮናስ ጸሎትና የማዕበል ምሳሌ የሆኑት የያሬድ የጾም ዜማዎች ይዘመራሉ፤ ስለ ሀገርና ስለ ዓለም ሰላም ልዩ ጸሎት ይደረጋል።',
    canonicalOrigin: 'Universal Canonical Tradition & Fetha Negest Article 15'
  },
  {
    id: 'tsome-gahad',
    nameAmharic: 'ፆመ ጋሃድ (Gahad Fast of Epiphany & Nativity)',
    nameEnglish: 'Gahad Vigil Fast (Eves of Epiphany & Nativity)',
    durationDays: 2,
    season: 'Eve of Genna (Tahsas 28) & Eve of Timkat (Tir 10)',
    descriptionEn: 'Vigil fast observed on the eve of Christmas (Genna) and Epiphany (Timkat) when these great Dominical Feasts fall on a fasting day (Wednesday or Friday).',
    descriptionAm: 'የገና (የልደት) ወይም የጥምቀት በዓል ረቡዕ ወይም ዓርብ ሲውል በዋዜማው የሚጾም የዝግጅትና የትጋት ጾም ነው።',
    scriptureReference: 'ማቴዎስ ፫ ፡ ፩ - ፮ (Matthew 3:1-6)',
    dietaryRules: 'Full-day vegan abstinence until the conclusion of the Midnight Eucharistic Liturgy.',
    historicalBackgroundEn: 'Because Christians feast with meat and dairy on Christmas Day and Epiphany regardless of the day of the week, the canonical fast of Wednesday/Friday is observed on the eve (Gahad / ጋሃድ) to maintain canonical balance.',
    historicalBackgroundAm: 'በዓለ ልደትና በዓለ ጥምቀት ረቡዕ ወይም ዓርብ ቢውሉ በበዓሉ ቀን የፈሲካ ምግብ ስለሚበላ፣ የረቡዕና የዓርብ የጾም ዕዳ እንዳይቀር ዋዜማው (ጋሃድ) ይጾማል።',
    spiritualThemesEn: [
      'Vigilance and prayerful readiness for the mystery of Holy Theophany',
      'Preserving canonical order while rejoicing in the Lord’s Feasts',
      'Preparation for receiving the Holy Mystery of the Eucharist at midnight'
    ],
    spiritualThemesAm: [
      'ለታላቁ የበዓለ ጥምቀትና የልደት ምሥጢር በንጽሕና መዘጋጀት',
      'የቀኖና ሥርዓትን ጠብቆ በጌታ በዓላት በደስታ መሳተፍ',
      'በእኩለ ሌሊት ቅዳሴ ቅዱስ ሥጋውንና ክቡር ደሙን ለመቀበል መዘጋጀት'
    ],
    liturgicalPracticesEn: 'Solemn Eve Liturgy leading directly into the nocturnal Vigil celebration with traditional burning of the bonfire (Chibo) and baptismal blessing of the waters (Ketera / Michete).',
    liturgicalPracticesAm: 'የዋዜማ ጸሎት ተደርጎ ወደ ማደሪያው (ከተራ) የሚደረግ ጉዞና የጥምቀት ውኃ ቡራኬ ይከናወናል።',
    canonicalOrigin: 'Council of Nicaea & Fetha Negest Article 15'
  },
];

export interface SermonItem {
  id: string;
  titleAmharic: string;
  titleEnglish: string;
  preacher: string;
  role: string;
  date: string;
  duration: string;
  category: 'Theology' | 'Feast of Tabor' | 'Mariology' | 'Spiritual Life' | 'Church History' | 'Youth & Family' | 'Feasts' | 'Gospel' | 'Faith' | 'Prayer' | 'Family' | 'Youth' | 'Church Life';
  feastDay?: string;
  scriptureTheme: string;
  summary: string;
  audioTrackId?: string;
  audioUrl?: string;
  videoUrl?: string;
  youtubeId?: string;
  thumbnailUrl: string;
  views?: string;
  ethiopianDate?: string;
  gregorianDate?: string;
  mediaType: 'audio' | 'video';
  isFeatured?: boolean;
  transcriptAm?: string;
  transcriptEn?: string;
}

export const MOCK_SERMONS: SermonItem[] = [
  {
    id: 'sermon-featured',
    titleAmharic: 'አእምሮን የሚያስጨንቅ እምነት — በእምነት መጽናት',
    titleEnglish: 'Faith That Endures',
    preacher: 'Abba Yared',
    role: 'Monastic Scholar & Preacher',
    date: 'August 11, 2026',
    ethiopianDate: 'Nehasé 5, 2018 E.C.',
    gregorianDate: 'August 11, 2026',
    duration: '38:45',
    category: 'Faith',
    scriptureTheme: 'Matthew 14:22–33',
    summary: 'A reflection on how we can remain faithful to Christ in times of trial, doubt, and uncertainty, drawing courage from Saint Peter walking upon the stormy sea.',
    audioTrackId: 'zema-1',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/assets/images/sermon_hero_priest.jpg',
    views: '84.2K views',
    mediaType: 'video',
    isFeatured: true,
    transcriptAm: 'በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን። የተወደዳችሁ የክርስቶስ ቤተሰቦች፤ በዛሬው ወንጌል ጌታችን ኢየሱስ ክርስቶስ በማዕበል ውስጥ ሳሉ ወደ ደቀ መዛሙርቱ በባሕር ላይ እየተራመደ መምጣቱን እንመለከታለን። እምነት ማለት ማዕበሉን ማየት ሳይሆን ክርስቶስን ማየት ነው...',
    transcriptEn: 'In the name of the Father, the Son, and the Holy Spirit, One God. Amen. Beloved in Christ: In today’s Holy Gospel, we witness our Lord Jesus Christ walking across the turbulent waters toward His disciples in the fourth watch of the night. True faith is not focusing on the storm, but fixing our spiritual gaze upon Christ...',
  },
  {
    id: 'sermon-latest-1',
    titleAmharic: 'የጸሎት ኃይል',
    titleEnglish: 'The Power of Prayer',
    preacher: 'Abba Daniel',
    role: 'Cathedral Preacher & Hermit',
    date: 'August 8, 2026',
    ethiopianDate: 'Nehasé 2, 2018 E.C.',
    gregorianDate: '8 Aug, 2026',
    duration: '32:18',
    category: 'Prayer',
    scriptureTheme: '1 Thessalonians 5:17',
    summary: 'Deepening our personal communion with the Holy Trinity through unceasing prayer, night vigil (Mahlet), and spiritual prostrations.',
    audioTrackId: 'zema-2',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'L_LUpnjgPso',
    thumbnailUrl: '/assets/images/sermon_prayer_candle.jpg',
    views: '42.1K views',
    mediaType: 'video',
    transcriptAm: 'ያለ ማቋረጥ ጸልዩ። ጸሎት የነፍስ እስትንፋስ ናት፤ ከእግዚአብሔር ጋር የምንነጋገርበት ቅዱስ ድልድይ ነው።...',
    transcriptEn: 'Pray without ceasing. Prayer is the very breath of the soul, an unshakeable bridge uniting the believer with God...',
  },
  {
    id: 'sermon-latest-2',
    titleAmharic: 'የንስሐ ትርጉም',
    titleEnglish: 'The Meaning of Repentance',
    preacher: 'Abba Thomas',
    role: 'Spiritual Father & Instructor',
    date: 'August 4, 2026',
    ethiopianDate: 'Hamle 28, 2018 E.C.',
    gregorianDate: '4 Aug, 2026',
    duration: '34:12',
    category: 'Spiritual Life',
    scriptureTheme: 'Luke 15:11–32',
    summary: 'The grace of true Metanoia (ንስሐ) and the boundless joy of the Father embracing the returning Prodigal Son with robes of salvation.',
    audioTrackId: 'zema-3',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnailUrl: '/assets/images/liturgical_manuscript_featured.jpg',
    views: '38.9K views',
    mediaType: 'video',
    transcriptAm: 'ንስሐ ማለት ወደ አባታችን ቤት መመለስ ነው። ጌታችን በምሕረቱ ሁልጊዜ እጆቹን ዘርግቶ ይጠብቀናል።...',
    transcriptEn: 'Repentance is returning to our Father’s house. Our Lord always stands with open arms waiting to welcome the penitent soul...',
  },
  {
    id: 'sermon-latest-3',
    titleAmharic: 'ክርስቶስ የእኛ እረኛ',
    titleEnglish: 'Christ Our True Shepherd',
    preacher: 'Abba Matthias',
    role: 'Theologian & Patriarchal Vicar',
    date: 'July 19, 2026',
    ethiopianDate: 'Sene 12, 2018 E.C.',
    gregorianDate: '19 Jul, 2026',
    duration: '41:30',
    category: 'Gospel',
    scriptureTheme: 'John 10:11–18',
    summary: 'The Good Shepherd who lays down His life for the sheep, defending the flock from wolves and gathering the lost into eternal pastures.',
    audioTrackId: 'zema-4',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: '3JZ_D3ELwOQ',
    thumbnailUrl: '/assets/images/sermon_shepherd_icon.jpg',
    views: '56.3K views',
    mediaType: 'video',
    transcriptAm: 'መልካም እረኛ እኔ ነኝ፤ መልካም እረኛ ነፍሱን ስለ በጎቹ ያኖራል። ክርስቶስ እያንዳንዳችንን በስማችን ያውቀናል።...',
    transcriptEn: 'I am the good shepherd: the good shepherd giveth his life for the sheep. Christ knows each of us by our name...',
  },
  {
    id: 'sermon-latest-4',
    titleAmharic: 'ቅዱስ ሕይወትን መኖር',
    titleEnglish: 'Living a Holy Life',
    preacher: 'Abba Solomon',
    role: 'Monastery Abbot & Spiritual Director',
    date: 'July 12, 2026',
    ethiopianDate: 'Sene 5, 2018 E.C.',
    gregorianDate: '12 Jul, 2026',
    duration: '26:05',
    category: 'Faith',
    scriptureTheme: '1 Peter 1:15–16',
    summary: 'Consecrating every hour of daily life in righteousness, purity of heart, and spiritual vigilance in an ever-changing modern world.',
    audioTrackId: 'zema-1',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'RgKAFK5djSk',
    thumbnailUrl: '/assets/images/sermon_candelabra.jpg',
    views: '31.7K views',
    mediaType: 'video',
    transcriptAm: 'እኔ ቅዱስ ነኝና እናንተም ቅዱሳን ሁኑ። ቅድስና በገዳም ብቻ ሳይሆን በእያንዳንዱ ክርስቲያን የዕለት ተዕለት ኑሮ ውስጥ የሚገለጥ ነው።...',
    transcriptEn: 'Be ye holy; for I am holy. Holiness is not confined to the cloister; it shines in every action, word, and thought of the faithful Christian...',
  },
  {
    id: 'sermon-latest-5',
    titleAmharic: 'በብርሃን መጓዝ',
    titleEnglish: 'Walk in the Light',
    preacher: 'Abba Yared',
    role: 'Monastic Scholar & Preacher',
    date: 'July 6, 2026',
    ethiopianDate: 'Nehasé 28, 2018 E.C.',
    gregorianDate: '6 Jul, 2026',
    duration: '28:50',
    category: 'Theology',
    scriptureTheme: '1 John 1:5–7',
    summary: 'Walking in the uncreated Light of Christ, dispelling falsehood, and keeping the radiant communion of the Holy Apostles.',
    audioTrackId: 'zema-2',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'OPf0YbXqDm0',
    thumbnailUrl: '/assets/images/manuscript_hero.jpg',
    views: '29.4K views',
    mediaType: 'video',
    transcriptAm: 'እግዚአብሔር ብርሃን ነው ጨለማም በእርሱ ዘንድ ከቶ የለም። በብርሃን ስንመላለስ ከእርሱ ጋር ኅብረት አለን...',
    transcriptEn: 'God is light, and in him is no darkness at all. If we walk in the light, we have fellowship with one another...',
  },
  {
    id: 'sermon-popular-1',
    titleAmharic: 'ምሥጢረ ተዋሕዶና የድኅነት መንገድ — ቃለ አበው',
    titleEnglish: 'The Mystery of Tewahedo & The Path of Salvation',
    preacher: 'ብፁዕ ወቅዱስ አቡነ ማትያስ (His Holiness Patriarch Abune Mathias)',
    role: 'Patriarch of Ethiopia, Archbishop of Axum & Echege of the See of St. Tekle Haymanot',
    date: 'August 14, 2026',
    ethiopianDate: 'Nehasé 8, 2018 E.C.',
    gregorianDate: 'August 14, 2026',
    duration: '42:15',
    category: 'Theology',
    feastDay: 'ደብረ ታቦር (Transfiguration)',
    scriptureTheme: 'John 1:14',
    summary: 'An inspiring patriarchal Apostolic teaching on the mystery of the Incarnation (ተዋሕዶ), the unconfused union of Divinity and Humanity, and maintaining unbroken unity in Christian love.',
    audioTrackId: 'zema-1',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: '9bZkp7q19f0',
    thumbnailUrl: '/assets/images/patriarch_hero.png',
    views: '78.5K views',
    mediaType: 'video',
    transcriptAm: 'በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን። የተወደዳችሁ የመንፈስ ቅዱስ ልጆቻችን፤ የክርስቶስ ቤተሰቦች፤ በዛሬው ዕለት የጌታችንን የማዳን ምሥጢር እናስተውላለን...',
    transcriptEn: 'In the name of the Father, the Son, and the Holy Spirit, One God. Amen. Beloved spiritual children and families of Christ: Today we contemplate the holy mystery of divine redemption...',
  },
  {
    id: 'sermon-popular-2',
    titleAmharic: 'የደብረ ታቦር ብርሃንና የመንፈሳዊ ዕድገት ሚስጥር',
    titleEnglish: 'The Light of Mount Tabor & Spiritual Transfiguration',
    preacher: 'መጋቤ ሐዲስ እሸቱ ዓለማየሁ (Megabe Hadis Eshetu Alemayehu)',
    role: 'Distinguished Scholar, Preacher & Author',
    date: 'August 12, 2026',
    ethiopianDate: 'Nehasé 6, 2018 E.C.',
    gregorianDate: 'August 12, 2026',
    duration: '35:40',
    category: 'Feasts',
    feastDay: 'ደብረ ታቦር (Mount Tabor)',
    scriptureTheme: 'Matthew 17:1-9',
    summary: 'A moving reflection on leaving behind worldly distractions to ascend Mount Tabor in prayer, fasting, and encountering the transforming grace of Christ.',
    audioTrackId: 'zema-2',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'fJ9rUzIMcZQ',
    thumbnailUrl: '/assets/images/why_eotc_banner.jpg',
    views: '64.3K views',
    mediaType: 'video',
    transcriptAm: 'ደብረ ታቦር ማለት የተራራው ስም ብቻ ሳይሆን የልባችን ከፍታ ነው። ጌታችን ሦስቱን ደቀ መዛሙርት ወደ ተራራው ይዞ የወጣው ከዓለም ሁካታና ጭንቀት ርቀው በጸሎት ከእርሱ ጋር እንዲተባበሩ ነው።...',
    transcriptEn: 'Mount Tabor is not merely a geographic mountain; it is the elevation of our hearts. Our Lord took Peter, James, and John up the high mountain...',
  },
  {
    id: 'sermon-popular-3',
    titleAmharic: 'የቅድስት ድንግል ማርያም ፍልሰታና ምልጃዋ በሕይወታችን',
    titleEnglish: 'The Holy Assumption of St. Mary & Her Motherly Intercession',
    preacher: 'ሊቀ ማእምራን ፋንታሁን ሙጬ (Liqe Ma’emran Fantahun Muche)',
    role: 'Dean of Holy Trinity Theological College',
    date: 'August 9, 2026',
    ethiopianDate: 'Nehasé 3, 2018 E.C.',
    gregorianDate: 'August 9, 2026',
    duration: '48:10',
    category: 'Feasts',
    feastDay: 'ፆመ ፍልሰታ (Filseta)',
    scriptureTheme: 'Luke 1:48',
    summary: 'Patristic and theological exposition on the Holy Assumption (ፍልሰታ) of the Mother of God, her covenant of mercy, and her maternal protection over the Church.',
    audioTrackId: 'zema-3',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_91854e7d44.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'JGwWNGJdvx8',
    thumbnailUrl: '/assets/images/st_mary_icon.png',
    views: '58.2K views',
    mediaType: 'video',
    transcriptAm: 'እመቤታችን ቅድስት ድንግል ማርያም የድኅነታችን ምክንያት፣ የሕይወታችን መሠረት ናት...',
    transcriptEn: 'Our Lady the Holy Virgin Mary is the vessel of our salvation and holy intercessor for all believers...',
  },
  {
    id: 'sermon-popular-4',
    titleAmharic: 'የጾምና የጸሎት ኃይል በኦርቶዶክሳዊ አኗኗር',
    titleEnglish: 'The Power of Fasting, Vigil, and True Almsgiving',
    preacher: 'መምህር ዘበነ ለማ (Memhir Zebene Lemma)',
    role: 'Renowned Orthodox Evangelist & Educator',
    date: 'July 28, 2026',
    ethiopianDate: 'Hamle 21, 2018 E.C.',
    gregorianDate: 'July 28, 2026',
    duration: '38:55',
    category: 'Spiritual Life',
    feastDay: 'ፆመ ሐዋርያት (Apostles Fast)',
    scriptureTheme: 'Matthew 6:16-18',
    summary: 'Practical spiritual guidance on harnessing the true Orthodox discipline of fasting with genuine humility, repentance, love for brethren, and charity towards the poor.',
    audioTrackId: 'zema-4',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'M7lc1UVf-VE',
    thumbnailUrl: '/assets/images/debre_damo.jpg',
    views: '51.9K views',
    mediaType: 'video',
    transcriptAm: 'ጾም ሆድን ማስራብ ብቻ አይደለም፤ ጾም ዓይንን፣ ጆሮን፣ አእምሮንና ምላስን ከክፉ ነገር ሁሉ መከልከል ነው።...',
    transcriptEn: 'Fasting is not merely abstaining from bodily nourishment; it is retraining the eyes, ears, mind, and tongue...',
  },
  {
    id: 'sermon-popular-5',
    titleAmharic: 'የወጣቶች መንፈሳዊ ሕይወት በዘመነ ዲጂታል',
    titleEnglish: 'Youth & Family Faith in the Digital Age',
    preacher: 'ዲያቆን ሄኖክ ኃይሌ (Deacon Henok Haile)',
    role: 'Orthodox Youth Teacher & Author',
    date: 'June 30, 2026',
    ethiopianDate: 'Sene 23, 2018 E.C.',
    gregorianDate: 'June 30, 2026',
    duration: '45:00',
    category: 'Youth',
    scriptureTheme: 'Ecclesiastes 12:1',
    summary: 'How Christian youth and families can navigate modern technological culture while anchoring themselves firmly in Holy Scripture, confession, and the sacramental life.',
    audioTrackId: 'zema-2',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8b72e50.mp3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    youtubeId: 'e-ORhEE9VVg',
    thumbnailUrl: '/assets/images/news_youth_conference.png',
    views: '49.6K views',
    mediaType: 'video',
    transcriptAm: 'በወጣትነትህ ፈጣሪህን አስብ። የቴክኖሎጂና የማኅበራዊ ሚዲያ ዓለም በረከትም ፈተናም ሊሆን ይችላል...',
    transcriptEn: 'Remember now thy Creator in the days of thy youth. Technology and modern media can serve as a blessing...',
  }
];
