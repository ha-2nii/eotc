export interface Book {
  id: string;
  number: number;
  nameAmharic: string;
  nameEnglish: string;
  nameGeez: string;
  testament: 'OT' | 'NT' | 'DEUT' | 'EOTC_UNIQUE';
  chaptersCount: number;
  category: string;
  description: string;
}

export interface Verse {
  number: number;
  geez: string;
  amharic: string;
  english: string;
}

export const EOTC_81_BOOKS: Book[] = [
  /* ── 1. OLD TESTAMENT CANONICAL BOOKS (ብሉይ ኪዳን) ─────────────── */
  { id: 'genesis', number: 1, nameAmharic: 'ኦሪት ዘፍጥረት', nameEnglish: 'Genesis', nameGeez: 'ዘፍጥረት', testament: 'OT', chaptersCount: 50, category: 'Torah (ሕግ)', description: 'Creation, the patriarchs, and covenant beginnings.' },
  { id: 'exodus', number: 2, nameAmharic: 'ኦሪት ዘጸአት', nameEnglish: 'Exodus', nameGeez: 'ዘጸአት', testament: 'OT', chaptersCount: 40, category: 'Torah (ሕግ)', description: 'Liberation from Egypt, the Paschal Lamb, and Law at Sinai.' },
  { id: 'leviticus', number: 3, nameAmharic: 'ኦሪት ዘሌዋውያን', nameEnglish: 'Leviticus', nameGeez: 'ዘሌዋውያን', testament: 'OT', chaptersCount: 27, category: 'Torah (ሕግ)', description: 'Priestly holiness, tabernacle sacrifices, and holy feasts.' },
  { id: 'numbers', number: 4, nameAmharic: 'ኦሪት ዘኍልቍ', nameEnglish: 'Numbers', nameGeez: 'ዘኍልቍ', testament: 'OT', chaptersCount: 36, category: 'Torah (ሕግ)', description: 'Wilderness wandering and divine census of the tribes.' },
  { id: 'deuteronomy', number: 5, nameAmharic: 'ኦሪት ዘዳግም', nameEnglish: 'Deuteronomy', nameGeez: 'ዘዳግም', testament: 'OT', chaptersCount: 34, category: 'Torah (ሕግ)', description: 'Recapitulation of the Divine Law before entering the Promised Land.' },
  { id: 'joshua', number: 6, nameAmharic: 'መጽሐፈ ኢያሱ', nameEnglish: 'Joshua', nameGeez: 'ኢያሱ', testament: 'OT', chaptersCount: 24, category: 'Historical (ታሪክ)', description: 'Conquest and tribal inheritance of Canaan.' },
  { id: 'judges', number: 7, nameAmharic: 'መጽሐፈ መሳፍንት', nameEnglish: 'Judges', nameGeez: 'መሳፍንት', testament: 'OT', chaptersCount: 21, category: 'Historical (ታሪክ)', description: 'The era of tribal deliverers and repentance.' },
  { id: 'ruth', number: 8, nameAmharic: 'መጽሐፈ ሩት', nameEnglish: 'Ruth', nameGeez: 'ሩት', testament: 'OT', chaptersCount: 4, category: 'Historical (ታሪክ)', description: 'Devotion, redemption, and the lineage of King David and Christ.' },
  { id: 'samuel1', number: 9, nameAmharic: 'መጽሐፈ ሳሙኤል ቀዳማዊ', nameEnglish: '1 Samuel', nameGeez: 'ሳሙኤል ፩', testament: 'OT', chaptersCount: 31, category: 'Historical (ታሪክ)', description: 'Prophet Samuel, King Saul, and the anointing of David.' },
  { id: 'samuel2', number: 10, nameAmharic: 'መጽሐፈ ሳሙኤል ካልዕ', nameEnglish: '2 Samuel', nameGeez: 'ሳሙኤል ፪', testament: 'OT', chaptersCount: 24, category: 'Historical (ታሪክ)', description: 'Reign of King David over all Israel and Jerusalem.' },
  { id: 'kings1', number: 11, nameAmharic: 'መጽሐፈ ነገሥት ቀዳማዊ', nameEnglish: '1 Kings', nameGeez: 'ነገሥት ፩', testament: 'OT', chaptersCount: 22, category: 'Historical (ታሪክ)', description: 'Solomon’s Temple and the divided monarchies.' },
  { id: 'kings2', number: 12, nameAmharic: 'መጽሐፈ ነገሥት ካልዕ', nameEnglish: '2 Kings', nameGeez: 'ነገሥት ፪', testament: 'OT', chaptersCount: 25, category: 'Historical (ታሪክ)', description: 'Prophet Elijah & Elisha, decline, and Babylonian exile.' },
  { id: 'chronicles1', number: 13, nameAmharic: 'መጽሐፈ ዜና መዋዕል ቀዳማዊ', nameEnglish: '1 Chronicles', nameGeez: 'ዜና መዋዕል ፩', testament: 'OT', chaptersCount: 29, category: 'Historical (ታሪክ)', description: 'Genealogies and David’s temple worship preparations.' },
  { id: 'chronicles2', number: 14, nameAmharic: 'መጽሐፈ ዜና መዋዕል ካልዕ', nameEnglish: '2 Chronicles', nameGeez: 'ዜና መዋዕል ፪', testament: 'OT', chaptersCount: 36, category: 'Historical (ታሪክ)', description: 'The Davidic dynasty, temple dedication, and renewal.' },
  { id: 'ezra_nehemiah', number: 15, nameAmharic: 'መጽሐፈ ዕዝራ ወነህምያ', nameEnglish: 'Ezra & Nehemiah', nameGeez: 'ዕዝራ ወነህምያ', testament: 'OT', chaptersCount: 23, category: 'Historical (ታሪክ)', description: 'Return from exile and reconstruction of Jerusalem’s walls.' },
  { id: 'esther', number: 16, nameAmharic: 'መጽሐፈ አስቴር', nameEnglish: 'Esther', nameGeez: 'አስቴር', testament: 'OT', chaptersCount: 10, category: 'Historical (ታሪክ)', description: 'Queen Esther’s courage and deliverance in Persia.' },
  { id: 'job', number: 17, nameAmharic: 'መጽሐፈ ኢዮብ', nameEnglish: 'Job', nameGeez: 'ኢዮብ', testament: 'OT', chaptersCount: 42, category: 'Poetic & Wisdom (ጥበብ)', description: 'Endurance in righteous suffering and divine sovereignty.' },
  { id: 'psalms', number: 18, nameAmharic: 'መዝሙረ ዳዊት', nameEnglish: 'Psalms (151 Dawit)', nameGeez: 'መዝሙረ ዳዊት', testament: 'OT', chaptersCount: 151, category: 'Poetic & Worship (መዝሙር)', description: '151 Holy Psalms of King David, central to EOTC daily prayers.' },
  { id: 'proverbs', number: 19, nameAmharic: 'መጽሐፈ ምሳሌ', nameEnglish: 'Proverbs', nameGeez: 'ምሳሌ', testament: 'OT', chaptersCount: 31, category: 'Wisdom (ጥበብ)', description: 'Wisdom of Solomon for holy and virtuous living.' },
  { id: 'ecclesiastes', number: 20, nameAmharic: 'መጽሐፈ መክብብ', nameEnglish: 'Ecclesiastes', nameGeez: 'መክብብ', testament: 'OT', chaptersCount: 12, category: 'Wisdom (ጥበብ)', description: 'Vanity of worldly pursuits and fearing the Lord.' },
  { id: 'song_of_songs', number: 21, nameAmharic: 'መኃልየ መኃልይ ዘሰሎሞን', nameEnglish: 'Song of Songs', nameGeez: 'መኃልየ መኃልይ', testament: 'OT', chaptersCount: 8, category: 'Wisdom (ጥበብ)', description: 'Allegory of divine love between Christ and His Holy Church.' },
  { id: 'isaiah', number: 22, nameAmharic: 'ትንቢተ ኢሳይያስ', nameEnglish: 'Isaiah', nameGeez: 'ኢሳይያስ', testament: 'OT', chaptersCount: 66, category: 'Major Prophets (ነቢያት)', description: 'The Evangelical Prophet foretelling the Virgin Birth and Passion.' },
  { id: 'jeremiah', number: 23, nameAmharic: 'ትንቢተ ኤርምያስ', nameEnglish: 'Jeremiah & Lamentations', nameGeez: 'ኤርምያስ', testament: 'OT', chaptersCount: 52, category: 'Major Prophets (ነቢያት)', description: 'The Weeping Prophet and prophecy of the New Covenant.' },
  { id: 'ezekiel', number: 24, nameAmharic: 'ትንቢተ ሕዝቅኤል', nameEnglish: 'Ezekiel', nameGeez: 'ሕዝቅኤል', testament: 'OT', chaptersCount: 48, category: 'Major Prophets (ነቢያት)', description: 'Vision of the Chariot throne, Valley of Dry Bones, and Temple.' },
  { id: 'daniel', number: 25, nameAmharic: 'ትንቢተ ዳንኤል', nameEnglish: 'Daniel', nameGeez: 'ዳንኤል', testament: 'OT', chaptersCount: 14, category: 'Major Prophets (ነቢያት)', description: 'Prophetic visions of the Messianic Kingdom and Ancient of Days.' },
  { id: 'minor_prophets', number: 26, nameAmharic: 'ዐሥራ ሁለቱ ደቂቀ ነቢያት', nameEnglish: 'Twelve Minor Prophets (Hosea–Malachi)', nameGeez: 'ደቂቀ ነቢያት', testament: 'OT', chaptersCount: 67, category: 'Minor Prophets (ደቂቀ ነቢያት)', description: 'Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi.' },

  /* ── 2. DEUTEROCANONICAL BOOKS (አዋልድ መጻሕፍት) ───────────────── */
  { id: 'tobit', number: 27, nameAmharic: 'መጽሐፈ ጦቢት', nameEnglish: 'Tobit', nameGeez: 'ጦቢት', testament: 'DEUT', chaptersCount: 14, category: 'Deuterocanon (አዋልድ)', description: 'Righteousness, almsgiving, and archangel Raphael’s guidance.' },
  { id: 'judith', number: 28, nameAmharic: 'መጽሐፈ ዮዲት', nameEnglish: 'Judith', nameGeez: 'ዮዲት', testament: 'DEUT', chaptersCount: 16, category: 'Deuterocanon (አዋልድ)', description: 'Heroic deliverance of Israel through holy prayer and courage.' },
  { id: 'wisdom_solomon', number: 29, nameAmharic: 'ጥበበ ሰሎሞን', nameEnglish: 'Wisdom of Solomon', nameGeez: 'ጥበበ ሰሎሞን', testament: 'DEUT', chaptersCount: 19, category: 'Deuterocanon (አዋልድ)', description: 'Divine Wisdom, immortality of the soul, and justice.' },
  { id: 'sirach', number: 30, nameAmharic: 'መጽሐፈ ሲራክ', nameEnglish: 'Sirach (Ecclesiasticus)', nameGeez: 'ሲራክ', testament: 'DEUT', chaptersCount: 51, category: 'Deuterocanon (አዋልድ)', description: 'Wisdom of Jesus ben Sira on virtuous living and holy fear of God.' },
  { id: 'baruch', number: 31, nameAmharic: 'መጽሐፈ ባሮክ', nameEnglish: 'Baruch & Letter of Jeremiah', nameGeez: 'ባሮክ', testament: 'DEUT', chaptersCount: 6, category: 'Deuterocanon (አዋልድ)', description: 'Exile penitence, prophetic consolation, and wisdom.' },
  { id: 'susanna_bel', number: 32, nameAmharic: 'ተረፈ ዳንኤል (ሶስና ወቤል)', nameEnglish: 'Additions to Daniel (Susanna & Bel)', nameGeez: 'ተረፈ ዳንኤል', testament: 'DEUT', chaptersCount: 3, category: 'Deuterocanon (አዋልድ)', description: 'Chastity of Susanna and Daniel unmasking pagan idols.' },

  /* ── 3. EOTC-UNIQUE CANONICAL BOOKS (የኢትዮጵያ ልዩ ቀኖና) ────────── */
  { id: 'enoch', number: 33, nameAmharic: 'መጽሐፈ ሄኖክ (1 Enoch)', nameEnglish: 'Book of Enoch', nameGeez: 'ሄኖክ', testament: 'EOTC_UNIQUE', chaptersCount: 108, category: 'Ethiopic Unique Canon (ልዩ ቀኖና)', description: 'Preserved completely only in Ge’ez; apocalyptic visions of Patriarch Enoch and the Son of Man.' },
  { id: 'jubilees', number: 34, nameAmharic: 'መጽሐፈ ኩፋሌ', nameEnglish: 'Book of Jubilees', nameGeez: 'ኩፋሌ', testament: 'EOTC_UNIQUE', chaptersCount: 50, category: 'Ethiopic Unique Canon (ልዩ ቀኖና)', description: 'Sacred history from Creation to Sinai divided into 49-year Jubilee cycles.' },
  { id: 'meqabyan1', number: 35, nameAmharic: 'መጽሐፈ መቃብያን ቀዳማዊ', nameEnglish: '1 Meqabyan (Ethiopic Maccabees)', nameGeez: 'መቃብያን ፩', testament: 'EOTC_UNIQUE', chaptersCount: 36, category: 'Ethiopic Unique Canon (ልዩ ቀኖና)', description: 'Distinct Ethiopic martyr hero Meqabis and religious steadfastness under Moabite king Tsirutsaydan.' },
  { id: 'meqabyan2', number: 36, nameAmharic: 'መጽሐፈ መቃብያን ካልዕ', nameEnglish: '2 Meqabyan', nameGeez: 'መቃብያን ፪', testament: 'EOTC_UNIQUE', chaptersCount: 14, category: 'Ethiopic Unique Canon (ልዩ ቀኖና)', description: 'Second Ethiopic Maccabees on faith and eternal reward.' },
  { id: 'meqabyan3', number: 37, nameAmharic: 'መጽሐፈ መቃብያን ሣልስ', nameEnglish: '3 Meqabyan', nameGeez: 'መቃብያን ፫', testament: 'EOTC_UNIQUE', chaptersCount: 20, category: 'Ethiopic Unique Canon (ልዩ ቀኖና)', description: 'Third Ethiopic Maccabees detailing the righteous life of Adam and the Patriarchs.' },
  { id: 'ezra_sutuel', number: 38, nameAmharic: 'ዕዝራ ሱቱኤል (4 Ezra)', nameEnglish: 'Ezra Sutuel', nameGeez: 'ዕዝራ ሱቱኤል', testament: 'EOTC_UNIQUE', chaptersCount: 16, category: 'Ethiopic Unique Canon (ልዩ ቀኖና)', description: 'Ezra’s apocalyptic revelations and mystical visions of the Heavenly Zion.' },
  { id: 'josephas', number: 39, nameAmharic: 'መጽሐፈ ዮሴፍ ወልደ ኮርዮን', nameEnglish: 'Book of Josephas (Josippon)', nameGeez: 'ዮሴፍ ወልደ ኮርዮን', testament: 'EOTC_UNIQUE', chaptersCount: 8, category: 'Ethiopic Unique Canon (ልዩ ቀኖና)', description: 'Ancient historical chronicle of the Second Temple period and Jerusalem.' },
  { id: 'sinodos', number: 40, nameAmharic: 'መጽሐፈ ሲኖዶስ', nameEnglish: 'Sinodos (Apostolic Canons)', nameGeez: 'ሲኖዶስ', testament: 'EOTC_UNIQUE', chaptersCount: 4, category: 'Church Order (ሥርዓተ ቤተ ክርስቲያን)', description: 'Apostolic collection of ecclesiastical ordinances and canons preserved in Ge’ez.' },
  { id: 'clement', number: 41, nameAmharic: 'መጽሐፈ ቀሌምንጦስ (Qelementos)', nameEnglish: 'Book of Clement', nameGeez: 'ቀሌምንጦስ', testament: 'EOTC_UNIQUE', chaptersCount: 7, category: 'Church Order (ሥርዓተ ቤተ ክርስቲያን)', description: 'Mystical revelations given to Saint Clement of Rome by Saint Peter the Apostle.' },
  { id: 'didaskalia', number: 42, nameAmharic: 'መጽሐፈ ዲድስቅልያ', nameEnglish: 'Ethiopic Didaskalia', nameGeez: 'ዲድስቅልያ', testament: 'EOTC_UNIQUE', chaptersCount: 43, category: 'Church Order (ሥርዓተ ቤተ ክርስቲያን)', description: 'Apostolic teachings on church governance, holy mysteries, deaconate, and pastoral care.' },

  /* ── 4. NEW TESTAMENT CANONICAL BOOKS (ሐዲስ ኪዳን) ─────────────── */
  { id: 'matthew', number: 43, nameAmharic: 'ወንጌል ዘማቴዎስ', nameEnglish: 'Gospel of Matthew', nameGeez: 'ወንጌል ዘማቴዎስ', testament: 'NT', chaptersCount: 28, category: 'Holy Gospel (ወንጌል)', description: 'The Gospel of the Kingdom of Heaven and fulfilment of prophecy.' },
  { id: 'mark', number: 44, nameAmharic: 'ወንጌል ዘማርቆስ', nameEnglish: 'Gospel of Mark', nameGeez: 'ወንጌል ዘማርቆስ', testament: 'NT', chaptersCount: 16, category: 'Holy Gospel (ወንጌል)', description: 'The Gospel of the Servant-King by St. Mark, apostle of Africa.' },
  { id: 'luke', number: 45, nameAmharic: 'ወንጌል ዘሉቃስ', nameEnglish: 'Gospel of Luke', nameGeez: 'ወንጌል ዘሉቃስ', testament: 'NT', chaptersCount: 24, category: 'Holy Gospel (ወንጌል)', description: 'The Gospel of the Compassionate Savior and divine physician.' },
  { id: 'john', number: 46, nameAmharic: 'ወንጌል ዘዮሐንስ', nameEnglish: 'Gospel of John', nameGeez: 'ወንጌል ዘዮሐንስ', testament: 'NT', chaptersCount: 21, category: 'Holy Gospel (ወንጌል)', description: 'The Theological Gospel of the Incarnate Word of God.' },
  { id: 'acts', number: 47, nameAmharic: 'ግብረ ሐዋርያት', nameEnglish: 'Acts of the Apostles', nameGeez: 'ግብረ ሐዋርያት', testament: 'NT', chaptersCount: 28, category: 'Apostolic History (ታሪክ)', description: 'Pentecost and church growth, including baptism of the Ethiopian Eunuch (Acts 8).' },
  { id: 'romans', number: 48, nameAmharic: 'መልእክተ ጳውሎስ ወደ ሮሜ', nameEnglish: 'Romans', nameGeez: 'ወደ ሮሜ', testament: 'NT', chaptersCount: 16, category: 'Pauline Epistles (መልእክታት)', description: 'Justification by faith, grace, and Christian righteousness.' },
  { id: 'corinthians1', number: 49, nameAmharic: 'ቀዳማዊ ቆሮንቶስ', nameEnglish: '1 Corinthians', nameGeez: 'ቆሮንቶስ ፩', testament: 'NT', chaptersCount: 16, category: 'Pauline Epistles (መልእክታት)', description: 'Unity in Christ, Spiritual Gifts, and the Hymn of Love (1 Cor 13).' },
  { id: 'corinthians2', number: 50, nameAmharic: 'ካልዕ ቆሮንቶስ', nameEnglish: '2 Corinthians', nameGeez: 'ቆሮንቶስ ፪', testament: 'NT', chaptersCount: 13, category: 'Pauline Epistles (መልእክታት)', description: 'Apostolic ministry, comfort in affliction, and reconciliation.' },
  { id: 'galatians', number: 51, nameAmharic: 'ወደ ገላትያ', nameEnglish: 'Galatians', nameGeez: 'ወደ ገላትያ', testament: 'NT', chaptersCount: 6, category: 'Pauline Epistles (መልእክታት)', description: 'Freedom in Christ and the fruit of the Holy Spirit.' },
  { id: 'ephesians', number: 52, nameAmharic: 'ወደ ኤፌሶን', nameEnglish: 'Ephesians', nameGeez: 'ወደ ኤፌሶን', testament: 'NT', chaptersCount: 6, category: 'Pauline Epistles (መልእክታት)', description: 'The Church as the Body of Christ and the Armor of God.' },
  { id: 'philippians', number: 53, nameAmharic: 'ወደ ፊልጵስዩስ', nameEnglish: 'Philippians', nameGeez: 'ወደ ፊልጵስዩስ', testament: 'NT', chaptersCount: 4, category: 'Pauline Epistles (መልእክታት)', description: 'Rejoicing in the Lord and the humility of Christ (Kenosis).' },
  { id: 'colossians', number: 54, nameAmharic: 'ወደ ቆላስይስ', nameEnglish: 'Colossians', nameGeez: 'ወደ ቆላስይስ', testament: 'NT', chaptersCount: 4, category: 'Pauline Epistles (መልእክታት)', description: 'The preeminence and supreme deity of Jesus Christ.' },
  { id: 'thessalonians1', number: 55, nameAmharic: 'ቀዳማዊ ተሰሎንቄ', nameEnglish: '1 Thessalonians', nameGeez: 'ተሰሎንቄ ፩', testament: 'NT', chaptersCount: 5, category: 'Pauline Epistles (መልእክታት)', description: 'Living in holy expectation of Christ’s Second Coming (Parousia).' },
  { id: 'thessalonians2', number: 56, nameAmharic: 'ካልዕ ተሰሎንቄ', nameEnglish: '2 Thessalonians', nameGeez: 'ተሰሎንቄ ፪', testament: 'NT', chaptersCount: 3, category: 'Pauline Epistles (መልእክታት)', description: 'Steadfastness in trial and resisting the mystery of lawlessness.' },
  { id: 'timothy1', number: 57, nameAmharic: 'ቀዳማዊ ጢሞቴዎስ', nameEnglish: '1 Timothy', nameGeez: 'ጢሞቴዎስ ፩', testament: 'NT', chaptersCount: 6, category: 'Pastoral Epistles (መልእክታት)', description: 'Pastoral leadership, doctrine, and order in God’s household.' },
  { id: 'timothy2', number: 58, nameAmharic: 'ካልዕ ጢሞቴዎስ', nameEnglish: '2 Timothy', nameGeez: 'ጢሞቴዎስ ፪', testament: 'NT', chaptersCount: 4, category: 'Pastoral Epistles (መልእክታት)', description: 'Faithfulness, finishing the race, and inspired Scripture.' },
  { id: 'titus', number: 59, nameAmharic: 'ወደ ቲቶ', nameEnglish: 'Titus', nameGeez: 'ወደ ቲቶ', testament: 'NT', chaptersCount: 3, category: 'Pastoral Epistles (መልእክታት)', description: 'Church ordinations and teaching sound doctrine.' },
  { id: 'philemon', number: 60, nameAmharic: 'ወደ ፊልሞና', nameEnglish: 'Philemon', nameGeez: 'ወደ ፊልሞና', testament: 'NT', chaptersCount: 1, category: 'Pauline Epistles (መልእክታት)', description: 'Christian brotherhood, forgiveness, and mercy.' },
  { id: 'hebrews', number: 61, nameAmharic: 'ወደ ዕብራውያን', nameEnglish: 'Hebrews', nameGeez: 'ወደ ዕብራውያን', testament: 'NT', chaptersCount: 13, category: 'General Epistles (መልእክታት)', description: 'Christ our Eternal High Priest in the order of Melchizedek.' },
  { id: 'james', number: 62, nameAmharic: 'መልእክተ ያዕቆብ', nameEnglish: 'James', nameGeez: 'ያዕቆብ', testament: 'NT', chaptersCount: 5, category: 'Catholic Epistles (ሐዋርያት)', description: 'Faith made alive through good works, prayer, and humility.' },
  { id: 'peter1', number: 63, nameAmharic: 'ቀዳማዊ ጴጥሮስ', nameEnglish: '1 Peter', nameGeez: 'ጴጥሮስ ፩', testament: 'NT', chaptersCount: 5, category: 'Catholic Epistles (ሐዋርያት)', description: 'Living hope, holy priesthood, and suffering for Christ.' },
  { id: 'peter2', number: 64, nameAmharic: 'ካልዕ ጴጥሮስ', nameEnglish: '2 Peter', nameGeez: 'ጴጥሮስ ፪', testament: 'NT', chaptersCount: 3, category: 'Catholic Epistles (ሐዋርያት)', description: 'Partakers of the divine nature and guarding against false teachers.' },
  { id: 'john1', number: 65, nameAmharic: 'ቀዳማዊ ዮሐንስ', nameEnglish: '1 John', nameGeez: 'ዮሐንስ ፩', testament: 'NT', chaptersCount: 5, category: 'Catholic Epistles (ሐዋርያት)', description: 'God is Light, God is Love, and assurance of eternal life.' },
  { id: 'john2', number: 66, nameAmharic: 'ካልዕ ዮሐንስ', nameEnglish: '2 John', nameGeez: 'ዮሐንስ ፪', testament: 'NT', chaptersCount: 1, category: 'Catholic Epistles (ሐዋርያት)', description: 'Walking in truth and holy commandment.' },
  { id: 'john3', number: 67, nameAmharic: 'ሣልስ ዮሐንስ', nameEnglish: '3 John', nameGeez: 'ዮሐንስ ፫', testament: 'NT', chaptersCount: 1, category: 'Catholic Epistles (ሐዋርያት)', description: 'Hospitality to fellow laborers for the truth.' },
  { id: 'jude', number: 68, nameAmharic: 'መልእክተ ይሁዳ', nameEnglish: 'Jude', nameGeez: 'ይሁዳ', testament: 'NT', chaptersCount: 1, category: 'Catholic Epistles (ሐዋርያት)', description: 'Contending earnestly for the faith and citing the Book of Enoch.' },
  { id: 'revelation', number: 69, nameAmharic: 'ራእየ ዮሐንስ (Apocalypse)', nameEnglish: 'Revelation', nameGeez: 'ራእየ ዮሐንስ', testament: 'NT', chaptersCount: 22, category: 'Prophecy (ራእይ)', description: 'The triumphant Lamb of God, Heavenly Liturgy, and the New Jerusalem.' },
];

export const MOCK_PARALLEL_VERSES: Record<string, Verse[]> = {
  'john-1': [
    {
      number: 1,
      geez: 'በቀዳሚ ፡ ሀሎ ፡ ቃል ፡ ወውእቱ ፡ ቃል ፡ ኀበ ፡ እግዚአብሔር ፡ ሀሎ ፡ ወእግዚአብሔር ፡ ውእቱ ፡ ቃል ።',
      amharic: 'በመጀመሪያው ቃል ነበረ፥ ቃልም በእግዚአብሔር ዘንድ ነበረ፥ ቃልም እግዚአብሔር ነበረ።',
      english: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    },
    {
      number: 2,
      geez: 'ዝ ፡ ውእቱ ፡ ዘሀሎ ፡ በቀዳሚ ፡ ኀበ ፡ እግዚአብሔር ።',
      amharic: 'ይህ በመጀመሪያው በእግዚአብሔር ዘንድ ነበረ።',
      english: 'The same was in the beginning with God.',
    },
    {
      number: 3,
      geez: 'ኵሉ ፡ ቦቱ ፡ ኮነ ፡ ወዘእንበሌሁስ ፡ አልቦ ፡ ዘኮነ ፡ ወኢምንትኒ ፡ ዘኮነ ።',
      amharic: 'ሁሉ በእርሱ ሆነ፥ ከሆነውም ሁሉ ያለ እርሱ ምንም የሆነ የለም።',
      english: 'All things were made by him; and without him was not any thing made that was made.',
    },
    {
      number: 4,
      geez: 'ወቦቱ ፡ ሕይወት ፡ ሀሎ ፡ ወሕይወትስ ፡ ብርሃኖሙ ፡ ለሰብእ ።',
      amharic: 'በእርሱ ሕይወት ነበረች፥ ሕይወትም የሰው ብርሃን ነበረች።',
      english: 'In him was life; and the life was the light of men.',
    },
    {
      number: 5,
      geez: 'ወብርሃንሰ ፡ በጽልመት ፡ ያበራህ ፡ ወጽልመትኒ ፡ ኢረከቦ ።',
      amharic: 'ብርሃንም በጨለማ ይበራል፥ ጨለማውም አላሸነፈውም።',
      english: 'And the light shineth in darkness; and the darkness comprehended it not.',
    },
  ],
  'psalms-1': [
    {
      number: 1,
      geez: 'ብፁዕ ፡ ብእሲ ፡ ዘኢሖረ ፡ በምክረ ፡ ረሲዓን ፡ ወዘኢቆመ ፡ ውስተ ፡ ፍኖተ ፡ ኃጣእያን ።',
      amharic: 'ምስጉን ነው በበደለኞች ምክር ያልሄደ፥ በኃጢአተኞችም መንገድ ያልቆመ።',
      english: 'Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners.',
    },
    {
      number: 2,
      geez: 'ዘእንበለ ፡ ሕገ ፡ እግዚአብሔር ፡ ሥምረቱ ፡ ወዘሕጎ ፡ ያነብብ ፡ መዓልተ ፡ ወሌሊተ ።',
      amharic: 'ነገር ግን በእግዚአብሔር ሕግ ደስ ይለዋል፥ ሕጉንም በቀንና በሌሊት ያሰበዋል።',
      english: 'But his delight is in the law of the LORD; and in his law doth he meditate day and night.',
    },
    {
      number: 3,
      geez: 'ወይከውን ፡ ከመ ፡ ዕፅ ፡ እንተ ፡ ትክልት ፡ ኀበ ፡ ሙሐዘ ፡ ማይ ።',
      amharic: 'እርሱም በፈሳሽ ውኃ ዳር እንደ ተተከለች፥ ፍሬዋን በየጊዜዋ እንደምትሰጥ ዛፍ ይሆናል።',
      english: 'And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season.',
    },
  ],
  'enoch-1': [
    {
      number: 1,
      geez: 'ቃለ ፡ በረከቱ ፡ ለሄኖክ ፡ ዘከመ ፡ ባረከ ፡ ኅሩያነ ፡ ወጻድቃነ ፡ እለ ፡ ሀለው ፡ ይኩኑ ፡ በዕለተ ፡ ምንዳቤ ።',
      amharic: 'በመከራ ቀን ለሚኖሩት ለተመረጡትና ለጻድቃን የሰጠው የሄኖክ የብርከት ቃል ይህ ነው።',
      english: 'The words of the blessing of Enoch, wherewith he blessed the elect and righteous, who will be living in the day of tribulation.',
    },
    {
      number: 2,
      geez: 'ወተነበየ ፡ ሄኖክ ፡ ብእሲ ፡ ጻድቅ ፡ ዘእምኀበ ፡ እግዚአብሔር ፡ አዕይንቲሁ ፡ ክሡታት ፡ ዘርእየ ፡ ራእየ ፡ ቅዱስ ።',
      amharic: 'ጻድቁ ሰው ሄኖክ ተነበየ፤ ዓይኖቹ በእግዚአብሔር የተከፈቱለት፥ የሰማይ ቅዱስ ራእይ ያየ።',
      english: 'And Enoch, a righteous man whose eyes were opened by God, spoke and took up his parable and said: I saw the vision of the Holy One in the heavens.',
    },
  ],
  'genesis-1': [
    {
      number: 1,
      geez: 'በቀዳሚ ፡ ገብረ ፡ እግዚአብሔር ፡ ሰማየ ፡ ወምድረ ።',
      amharic: 'በመጀመሪያ እግዚአብሔር ሰማይንና ምድርን ፈጠረ።',
      english: 'In the beginning God created the heavens and the earth.',
    },
    {
      number: 2,
      geez: 'ወምድርሰ ፡ ኢታስተርኢ ፡ ወኢኮነት ፡ ድልውተ ፡ ወጽልመት ፡ መልዕልተ ፡ ቀላይ ፡ ወመንፈሰ ፡ እግዚአብሔር ፡ ይጼልል ፡ መልዕልተ ፡ ማይ ።',
      amharic: 'ምድርም ባዶ ነበረች፥ አንዳችም አልነበረባትም፤ ጨለማም በጥልቁ ላይ ነበረ፤ የእግዚአብሔርም መንፈስ በውኃ ላይ ሰፍፎ ነበር።',
      english: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
    },
    {
      number: 3,
      geez: 'ወይቤ ፡ እግዚአብሔር ፡ ለይኩን ፡ ብርሃን ፡ ወኮነ ፡ ብርሃን ።',
      amharic: 'እግዚአብሔርም፦ «ብርሃን ይሁን» አለ፤ ብርሃንም ሆነ።',
      english: 'And God said, "Let there be light," and there was light.',
    },
    {
      number: 4,
      geez: 'ወርእየ ፡ እግዚአብሔር ፡ ብርሃነ ፡ ከመ ፡ ሠናይ ፡ ወፈልጠ ፡ እግዚአብሔር ፡ ማዕከለ ፡ ብርሃን ፡ ወማዕከለ ፡ ጽልመት ።',
      amharic: 'እግዚአብሔርም ብርሃኑ መልካም እንደ ሆነ አየ፤ እግዚአብሔርም ብርሃኑንና ጨለማውን ለየ።',
      english: 'God saw that the light was good, and he separated the light from the darkness.',
    },
    {
      number: 5,
      geez: 'ወሰመዮ ፡ እግዚአብሔር ፡ ለብርሃን ፡ ዕለተ ፡ ወለጽልመት ፡ ሰመዮ ፡ ሌሊተ ፡ ወኮነ ፡ ምሴት ፡ ወኮነ ፡ ጽባሕ ፡ ዕለት ፡ አሐቲ ።',
      amharic: 'እግዚአብሔርም ብርሃኑን «ቀን» ብሎ ጠራው፥ ጨለማውንም «ሌሊት» አለው። ማታም ሆነ ጧትም ሆነ፥ አንደኛ ቀን።',
      english: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.',
    },
    {
      number: 6,
      geez: 'ወይቤ ፡ እግዚአብሔር ፡ ለይኩን ፡ ጠፈር ፡ ማዕከለ ፡ ማያት ፡ ወለይከውን ፡ ፈላጤ ፡ ማዕከለ ፡ ማይ ፡ ወማይ ።',
      amharic: 'እግዚአብሔርም፦ «በውኃዎች መካከል ጠፈር ይሁን፥ በውኃና በውኃ መካከልም ይክፈል» አለ።',
      english: 'And God said, "Let there be a vault between the waters to separate water from water."',
    },
    {
      number: 7,
      geez: 'ወገብረ ፡ እግዚአብሔር ፡ ጠፈረ ፡ ወፈልጠ ፡ እግዚአብሔር ፡ ማዕከለ ፡ ማይ ፡ ዘታሕተ ፡ ጠፈር ፡ ወማዕከለ ፡ ማይ ፡ ዘመልዕልተ ፡ ጠፈር ፡ ወኮነ ፡ ከማሁ ።',
      amharic: 'እግዚአብሔርም ጠፈርን አደረገ፥ ከጠፈር በታች ያለውንና ከጠፈር በላይ ያለውን ውኃ ለየ፤ እንዲሁም ሆነ።',
      english: 'So God made the vault and separated the water under the vault from the water above it. And it was so.',
    },
    {
      number: 8,
      geez: 'ወሰመዮ ፡ እግዚአብሔር ፡ ለጠፈር ፡ ሰማየ ፡ ወኮነ ፡ ምሴት ፡ ወኮነ ፡ ጽባሕ ፡ ካልዕ ፡ ዕለት ።',
      amharic: 'እግዚአብሔርም ጠፈርን «ሰማይ» ብሎ ጠራው። ማታም ሆነ ጧትም ሆነ፥ ሁለተኛ ቀን።',
      english: 'God called the vault "sky." And there was evening, and there was morning—the second day.',
    },
    {
      number: 9,
      geez: 'ወይቤ ፡ እግዚአብሔር ፡ ይትጋባእ ፡ ማይ ፡ ዘታሕተ ፡ ሰማይ ፡ ውስተ ፡ አሐዱ ፡ መካን ፡ ወትስተርኢ ፡ የብስ ፡ ወኮነ ፡ ከማሁ ።',
      amharic: 'እግዚአብሔርም፦ «ከሰማይ በታች ያለው ውኃ ወደ አንድ ስፍራ ይሰብሰብ፥ የብሱም ይገለጥ» አለ፤ እንዲሁም ሆነ።',
      english: 'And God said, "Let the water under the sky be gathered to one place, and let dry ground appear." And it was so.',
    },
    {
      number: 10,
      geez: 'ወሰመዮ ፡ እግዚአብሔር ፡ ለየብስ ፡ ምድረ ፡ ወለማኅበረ ፡ ማያት ፡ ሰመዮ ፡ ባሕረ ፡ ወርእየ ፡ እግዚአብሔር ፡ ከመ ፡ ሠናይ ።',
      amharic: 'እግዚአብሔርም የብሱን «ምድር» ብሎ ጠራው፥ የውኃውንም መከማቻ «ባሕር» አለው፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።',
      english: 'God called the dry ground "land," and the gathered waters he called "seas." And God saw that it was good.',
    },
    {
      number: 11,
      geez: 'ወይቤ ፡ እግዚአብሔር ፡ ታብቍል ፡ ምድር ፡ ሣዕረ ፡ ሐመልማል ፡ ዘይዘርእ ፡ ዘርአ ፡ ወዕፀ ፡ ፍሬ ፡ ዘይገብር ፡ ፍሬ ፡ በዘመዱ ፡ ወኮነ ፡ ከማሁ ።',
      amharic: 'እግዚአብሔርም፦ «ምድር ዘሩ በውስጡ ያለውን ፍሬ የሚያፈራውን ዛፍ በምድር ላይ እንደ ወገኑ ታብቅል» አለ፤ እንዲሁም ሆነ።',
      english: 'Then God said, "Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds." And it was so.',
    },
    {
      number: 12,
      geez: 'ወአውፅአት ፡ ምድር ፡ ሣዕረ ፡ ሐመልማል ፡ ዘይዘርእ ፡ ዘርአ ፡ በዘመዱ ፡ ወዕፀ ፡ ዘይገብር ፡ ፍሬ ፡ ወርእየ ፡ እግዚአብሔር ፡ ከመ ፡ ሠናይ ።',
      amharic: 'ምድርም ዘሩ እንደ ወገኑ ያለውን ሣርና ቡቃያ፥ ፍሬውንም እንደ ወገኑ የሚያፈራውን ዛፍ አወጣች፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።',
      english: 'The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good.',
    },
    {
      number: 13,
      geez: 'ወኮነ ፡ ምሴት ፡ ወኮነ ፡ ጽባሕ ፡ ሣልስ ፡ ዕለት ።',
      amharic: 'ማታም ሆነ ጧትም ሆነ፥ ሦስተኛ ቀን።',
      english: 'And there was evening, and there was morning—the third day.',
    },
    {
      number: 14,
      geez: 'ወይቤ ፡ እግዚአብሔር ፡ ለይኩኑ ፡ ብርሃናት ፡ ውስተ ፡ ጠፈረ ፡ ሰማይ ፡ ከመ ፡ ያብርሁ ፡ ዲበ ፡ ምድር ፡ ወይኩኑ ፡ ለትእምርት ፡ ወለዘመን ፡ ወለዕለታት ፡ ወለዓመታት ።',
      amharic: 'እግዚአብሔርም፦ «ቀኑንና ሌሊቱን ይለዩ ዘንድ በሰማይ ጠፈር ብርሃናት ይሁኑ፤ ለምልክቶች ለዘመናት ለዕለታት ለዓመታትም ይሁኑ፤',
      english: 'And God said, "Let there be lights in the vault of the sky to separate the day from the night, and let them serve as signs to mark sacred times, and days and years,',
    },
    {
      number: 15,
      geez: 'ወይኩኑ ፡ ለመብራህት ፡ ውስተ ፡ ጠፈረ ፡ ሰማይ ፡ ከመ ፡ ያብርሁ ፡ ዲበ ፡ ምድር ፡ ወኮነ ፡ ከማሁ ።',
      amharic: 'በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር ብርሃናት ይሁኑ» አለ፤ እንዲሁም ሆነ።',
      english: 'and let them be lights in the vault of the sky to give light on the earth." And it was so.',
    },
    {
      number: 16,
      geez: 'ወገብረ ፡ እግዚአብሔር ፡ ክልኤተ ፡ ብርሃናተ ፡ ዓበይተ ፡ ብርሃነ ፡ ዐቢየ ፡ ለመልዕልተ ፡ ዕለት ፡ ወብርሃነ ፡ ንዑሰ ፡ ለመልዕልተ ፡ ሌሊት ፡ ወከዋክብተኒ ።',
      amharic: 'እግዚአብሔርም ሁለት ታላላቆች ብርሃናትን አደረገ፤ ትልቁ ብርሃን ቀንን እንዲገዛ፥ ትንሹም ብርሃን ሌሊትን እንዲገዛ፤ ከዋክብትንም ደግሞ አደረገ።',
      english: 'God made two great lights—the greater light to govern the day and the lesser light to govern the night. He also made the stars.',
    },
    {
      number: 17,
      geez: 'ወወደዮሙ ፡ እግዚአብሔር ፡ ውስተ ፡ ጠፈረ ፡ ሰማይ ፡ ከመ ፡ ያብርሁ ፡ ዲበ ፡ ምድር ።',
      amharic: 'እግዚአብሔርም በምድር ላይ ያበሩ ዘንድ በሰማይ ጠፈር አኖራቸው፤',
      english: 'God set them in the vault of the sky to give light on the earth,',
    },
    {
      number: 18,
      geez: 'ወከመ ፡ ይግዝኡ ፡ ዕለተ ፡ ወሌሊተ ፡ ወይፍልጡ ፡ ማዕከለ ፡ ብርሃን ፡ ወጽልመት ፡ ወርእየ ፡ እግዚአብሔር ፡ ከመ ፡ ሠናይ ።',
      amharic: 'ቀኑንና ሌሊቱንም እንዲገዙ፥ ብርሃኑንና ጨለማውንም እንዲለዩ፤ እግዚአብሔርም ያ መልካም እንደ ሆነ አየ።',
      english: 'to govern the day and the night, and to separate light from darkness. And God saw that it was good.',
    },
    {
      number: 19,
      geez: 'ወኮነ ፡ ምሴት ፡ ወኮነ ፡ ጽባሕ ፡ ራብዕ ፡ ዕለት ።',
      amharic: 'ማታም ሆነ ጧትም ሆነ፥ አራተኛ ቀን።',
      english: 'And there was evening, and there was morning—the fourth day.',
    },
  ],
  'romans-1': [
    {
      number: 1,
      geez: 'ጳውሎስ ፡ ገብሩ ፡ ለኢየሱስ ፡ ክርስቶስ ፡ ኅሩይ ፡ ሐዋርያ ፡ ዘተፈልጠ ፡ ለስብከተ ፡ ወንጌሉ ፡ ለእግዚአብሔር ።',
      amharic: 'የኢየሱስ ክርስቶስ ባሪያ ሐዋርያ ሊሆን የተጠራ ለእግዚአብሔር ወንጌል የተለየ ጳውሎስ።',
      english: 'Paul, a servant of Jesus Christ, called to be an apostle, separated unto the gospel of God.',
    },
  ],
};
