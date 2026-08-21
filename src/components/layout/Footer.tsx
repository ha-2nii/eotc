import React from 'react';
import { useLanguage } from './LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveView } = useLanguage();

  return (
    <footer className="bg-[#050b16] text-[#9ba6b8] pt-16 pb-14 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <img
                src="/assets/images/eotc_emblem.png"
                alt="EOTC Emblem"
                className="w-full h-full object-contain block"
                style={{ transform: 'scale(1.7)' }}
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን</h3>
              <p className="text-[#d4af37] text-xs uppercase tracking-widest">Ethiopian Orthodox Tewahedo Church</p>
            </div>
          </div>
          <p className="text-xs text-[#e6dfd1]/80 leading-relaxed max-w-md">
            {language === 'en'
              ? 'Founded in the 1st century by Saint Philip the Apostle and King Ezana in the 4th century. Preserving the 81-book Biblical Canon, Saint Yared’s sacred Zema, and Oriental Orthodox apostolic tradition.'
              : 'ከ፩ኛው ክፍለ ዘመን በሐዋርያው ቅዱስ ፊሊጶስና በ፬ኛው ክፍለ ዘመን በአብርሃ ወአፅብሐ የተቀደሰች፣ የ፹፩ መጻሕፍት ቅዱሳት ባለቤት፣ የቅዱስ ያሬድ ማኅሌትና ሃይማኖተ አበው መጠበቂያ።'}
          </p>
          <p className="text-xs italic text-[#f4e07b] leading-relaxed pt-2 mb-6">
            “እግዚአብሔር በጽዮን ይነግሣል፤ ለዓለምም ሁሉ ሰላምን ይሰጣል።” — መዝሙረ ዳዊት
          </p>
        </div>

        {/* Pillar Navigation Columns */}
        <div>
          <h4 className="text-[#d4af37] font-serif font-bold text-sm mb-3 uppercase tracking-wider">
            {language === 'en' ? 'Pillars' : 'አምዶች'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveView('scripture')} className="hover:text-white transition">Scripture Library (፹፩ መጻሕፍት)</button></li>
            <li><button onClick={() => setActiveView('worship')} className="hover:text-white transition">Worship Hub & Zema</button></li>
            <li><button onClick={() => setActiveView('find-a-church')} className="hover:text-white transition">Church Finder Map</button></li>
            <li><button onClick={() => setActiveView('give')} className="hover:text-white transition">Giving Portal (ምጽዋት)</button></li>
            <li><button onClick={() => setActiveView('academy')} className="hover:text-white transition">Tewahedo Academy</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#d4af37] font-serif font-bold text-sm mb-3 uppercase tracking-wider">
            {language === 'en' ? 'Sacred Services' : 'አገልግሎቶች'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setActiveView('worship/calendar')} className="hover:text-white transition">Liturgical Calendar</button></li>
            <li><button onClick={() => setActiveView('worship/chant-stand')} className="hover:text-white transition">Digital Chant Stand</button></li>
            <li><button onClick={() => setActiveView('our-church/patriarch')} className="hover:text-white transition">His Holiness Patriarch Bio</button></li>
            <li><button onClick={() => setActiveView('news')} className="hover:text-white transition">News & Pastoral Letters</button></li>
          </ul>
        </div>

        {/* Global Patriarchate Contact */}
        <div>
          <h4 className="text-[#d4af37] font-serif font-bold text-sm mb-3 uppercase tracking-wider">
            {language === 'en' ? 'Patriarchate HQ' : 'መንበረ ፓትርያርክ'}
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>Arat Kilo, Menbere Patriarchate, Addis Ababa, Ethiopia</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>+251 11 123 4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>info@eotc-patriarchate.org</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Strip with Clean Spacing & Divider */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#d4af37]/20 flex flex-col md:flex-row items-center justify-between text-xs text-[#9ba6b8]/75 gap-4"
        style={{ marginTop: '48px', paddingTop: '28px' }}
      >
        <p>© 2026 Ethiopian Orthodox Tewahedo Church Patriarchate. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="text-[#d4af37]">Amharic & Ge’ez Unicode Powered</span>
          <span>•</span>
          <span>Mahibere Kidusan Media Sync</span>
        </div>
      </div>
    </footer>
  );
};
