import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, Cross, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ── Types ─────────────────────────────────────────────── */
export interface ECardIcon {
  id: string;
  title: string;
  url: string;
}

export interface MesaleECardProps {
  icons?: ECardIcon[];
  presetMessages?: string[];
}

/* ── Defaults ───────────────────────────────────────────── */
const DEFAULT_ICONS: ECardIcon[] = [
  { id: 'icon1', title: 'ቅድስት ማርያም (St. Mary)',    url: '/assets/images/st_mary_icon.png' },
  { id: 'icon2', title: 'ላሊበላ ገዳም (Lalibela)',       url: '/assets/images/lalibela_monastery.png' },
  { id: 'icon3', title: 'ብፁዕ ፓትርያርክ (Patriarch)',   url: '/assets/images/patriarch_hero.png' },
];

const DEFAULT_MESSAGES: string[] = [
  'መልካም የደብረ ታቦር በዓል ይሁንሎት! (Happy Debre Tabor Feast!)',
  'በዓለ ፍልሰታ ለማርያም በሰላም አደረሳችሁ! (Happy Feast of St. Mary Filseta!)',
  'መልካም አዲስ ዓመት ፪ሺ፲፱ ዓ.ም. (Happy Ethiopian New Year 2019 E.C.!)',
  'የመስቀል በዓል በሰላምና በፍቅር ያድርሰን! (Blessed Meskel Feast!)',
];

/* ── Component ──────────────────────────────────────────── */
export const MesaleECard: React.FC<MesaleECardProps> = ({
  icons = DEFAULT_ICONS,
  presetMessages = DEFAULT_MESSAGES,
}) => {
  const [selectedIcon, setSelectedIcon] = useState<ECardIcon>(icons[0]);
  const [senderName, setSenderName]     = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage]           = useState(presetMessages[0]);
  const [isCopied, setIsCopied]         = useState(false);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#800020', '#006B3C', '#FFD700'],
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-[#091528] to-[#070f1e] border-y border-[#d4af37]/30">
      <div className="container mx-auto px-4">
        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge className="inline-flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37] text-[#f4e07b] rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3 hover:bg-[#d4af37]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ምሳሌ ኢ-ካርድ (Mesale E-Card)</span>
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">
            Send Ethiopian Orthodox Feast Greetings
          </h2>
          <p className="text-sm text-[#9ba6b8] mt-2">
            Share blessings with family and friends worldwide with sacred Ethiopian icon art and Ge'ez blessings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ── Form Controls ── */}
          <div className="lg:col-span-5 bg-[#0e1b30] p-6 rounded-xl border border-[#d4af37]/30 space-y-4 shadow-xl">

            {/* Icon Selector */}
            <div>
              <Label className="text-xs font-bold text-[#d4af37] mb-2 uppercase block">
                1. Select Ethiopian Icon Art
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {icons.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all h-20 ${
                      selectedIcon.id === icon.id
                        ? 'border-[#d4af37] ring-2 ring-[#d4af37]/50 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={icon.url} alt={icon.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1 text-[9px] text-white text-center font-bold">
                      {icon.title.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <div className="space-y-1">
              <Label htmlFor="recipient-name" className="text-xs font-bold text-[#d4af37]">
                Recipient Name <span className="font-geez">(የተቀባይ ስም)</span>
              </Label>
              <Input
                id="recipient-name"
                type="text"
                placeholder="e.g. Yonas & Selam"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="bg-[#070f1e] border-[#d4af37]/30 text-white placeholder:text-[#9ba6b8] focus-visible:ring-[#d4af37] focus-visible:border-[#d4af37] text-xs"
              />
            </div>

            {/* Sender */}
            <div className="space-y-1">
              <Label htmlFor="sender-name" className="text-xs font-bold text-[#d4af37]">
                Your Name <span className="font-geez">(የላኪ ስም)</span>
              </Label>
              <Input
                id="sender-name"
                type="text"
                placeholder="e.g. Meron"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="bg-[#070f1e] border-[#d4af37]/30 text-white placeholder:text-[#9ba6b8] focus-visible:ring-[#d4af37] focus-visible:border-[#d4af37] text-xs"
              />
            </div>

            {/* Message Select */}
            <div className="space-y-1">
              <Label className="text-xs font-bold text-[#d4af37]">Feast Greeting Message</Label>
              <Select value={message} onValueChange={setMessage}>
                <SelectTrigger className="bg-[#070f1e] border-[#d4af37]/30 text-white focus:ring-[#d4af37] text-xs h-auto py-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0e1b30] border-[#d4af37]/30 text-white">
                  {presetMessages.map((msg, i) => (
                    <SelectItem
                      key={i}
                      value={msg}
                      className="text-xs text-white focus:bg-[#d4af37]/20 focus:text-[#f4e07b] font-geez"
                    >
                      {msg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              onClick={triggerCelebration}
              className="btn-gold w-full justify-center py-3 text-xs uppercase tracking-wider"
            >
              {isCopied ? (
                <><Check className="w-4 h-4" /> E-Card Generated &amp; Ready!</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Generate &amp; Share Feast E-Card</>
              )}
            </Button>
          </div>

          {/* ── Live Preview ── */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md bg-gradient-to-b from-[#800020] via-[#4a000d] to-[#070f1e] p-6 rounded-2xl border-4 border-[#d4af37] shadow-2xl relative overflow-hidden text-center text-white">
              <div className="absolute top-2 left-2 text-[#d4af37] opacity-60">
                <Cross className="w-6 h-6" />
              </div>
              <div className="absolute top-2 right-2 text-[#d4af37] opacity-60">
                <Cross className="w-6 h-6" />
              </div>

              <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-[#d4af37] overflow-hidden shadow-2xl my-3">
                <img src={selectedIcon.url} alt="EOTC Icon" className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2 my-4">
                <span className="text-[10px] text-[#f4e07b] uppercase tracking-widest bg-[#070f1e]/80 px-3 py-1 rounded-full border border-[#d4af37]/40">
                  {selectedIcon.title}
                </span>
                <h3 className="text-xl font-bold font-geez text-[#f4e07b] leading-tight">
                  {recipientName ? `ለ${recipientName}` : 'ለወዳጅ ዘመድ'}
                </h3>
                <p className="text-sm font-semibold text-white/90 px-4 py-2 bg-[#0e1b30]/60 rounded-xl border border-[#d4af37]/20 font-geez">
                  "{message}"
                </p>
                <p className="text-xs text-[#d4af37] font-medium pt-2">
                  {senderName ? `ከ ${senderName}` : 'ከእርስዎ'} • Ethiopian Orthodox Tewahedo Church
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/30 flex items-center justify-center gap-3">
                <Button
                  onClick={triggerCelebration}
                  className="flex items-center gap-1.5 bg-[#d4af37] text-[#070f1e] px-4 py-2 h-auto rounded-lg font-bold text-xs hover:bg-[#f4e07b] transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Greeting</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
