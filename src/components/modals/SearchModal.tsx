import React, { useState } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { Search, BookOpen, Calendar, MapPin, Newspaper, ChevronRight } from 'lucide-react';
import { MOCK_ARTICLES } from '../../data/mockNews';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { language, setActiveView } = useLanguage();
  const [query, setQuery] = useState('');

  const quickLinks = [
    { title: language === 'en' ? 'Find Nearby Parish'      : 'የቅርብ ርቀት ቤተክርስቲያን',        view: 'find-a-church',    icon: MapPin },
    { title: language === 'en' ? 'Liturgical Calendar'     : 'የቤተክርስቲያን የቀን መቁጠሪያ',     view: 'resources/calendar', icon: Calendar },
    { title: language === 'en' ? '81 Bible Canon'          : '81 ቅዱሳት መጻሕፍት',            view: 'scripture',        icon: BookOpen },
    { title: language === 'en' ? 'Patriarchate News'       : 'የቤተክርስቲያን ዜናዎች',           view: 'news',             icon: Newspaper },
  ];

  const filteredArticles = MOCK_ARTICLES.filter(
    (a) =>
      a.titleAmharic.includes(query) ||
      a.titleEnglish.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        className="bg-[#0e1b30] border-2 border-[#d4af37] text-white max-w-2xl rounded-2xl shadow-2xl p-0 gap-0
          top-[15%] translate-y-0 data-[state=open]:animate-fadeIn"
      >
        {/* ── Search bar ── */}
        <div className="p-4 bg-[#070f1e] border-b border-[#d4af37]/30 flex items-center gap-3 rounded-t-2xl">
          <Search className="w-5 h-5 text-[#d4af37] shrink-0" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Search books, events, churches, teachings...'
                : 'መጻሕፍት፣ ክስተቶች፣ አብያተ ክርስቲያናት፣ ትምህርቶች ይፈልጉ...'
            }
            className="flex-1 bg-transparent border-none shadow-none text-sm text-white placeholder:text-gray-400 focus-visible:ring-0 h-auto p-0"
          />
        </div>

        {/* ── Content area ── */}
        <ScrollArea className="max-h-[65vh]">
          <div className="p-6 space-y-6">
            {query.trim() === '' ? (
              /* Quick links */
              <div>
                <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Suggested Portals' : 'ፈጣን መዳረሻዎች'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickLinks.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={idx}
                        variant="outline"
                        onClick={() => { setActiveView(item.view); onClose(); }}
                        className="flex items-center justify-between p-3 h-auto rounded-xl bg-[#162846] border-[#d4af37]/30 hover:border-[#d4af37] hover:bg-[#1a3258] text-left text-white hover:text-white"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-[#d4af37]" />
                          <span className="text-xs font-semibold">{item.title}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Search results */
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                  {language === 'en' ? `Results for "${query}"` : `ለ "${query}" የተገኙ ውጤቶች`}
                </h4>
                <div className="space-y-2">
                  {filteredArticles.length === 0 ? (
                    <p className="text-sm text-[#9ba6b8] text-center py-4">
                      {language === 'en' ? 'No results found.' : 'ምንም ውጤት አልተገኘም።'}
                    </p>
                  ) : (
                    filteredArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => { setActiveView('news'); onClose(); }}
                        className="p-3 bg-[#162846] rounded-xl border border-[#d4af37]/20 hover:border-[#d4af37] cursor-pointer transition-colors"
                      >
                        <Badge className="bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/50 hover:bg-[#d4af37]/20 text-[10px] rounded-full px-2 mb-1">
                          {art.category}
                        </Badge>
                        <h5 className="text-sm font-bold text-white font-geez mt-1">{art.titleAmharic}</h5>
                        <p className="text-xs text-gray-300 line-clamp-1">{art.summaryEnglish}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
