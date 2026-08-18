import React, { useState } from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { User, Bookmark, Heart, Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen } = useLanguage();
  const [tab, setTab] = useState<'profile' | 'login' | 'register'>('profile');

  return (
    <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
      <DialogContent className="bg-[#0e1b30] border-2 border-[#d4af37] text-white max-w-md rounded-2xl shadow-2xl p-6 gap-0">
        <DialogHeader className="border-b border-[#d4af37]/30 pb-3 mb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold font-serif">
            <User className="w-5 h-5 text-[#d4af37]" />
            User Account <span className="font-geez text-sm text-[#d4af37]">(የተጠቃሚ መለያ)</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList className="w-full bg-[#070f1e] border border-[#d4af37]/20 rounded-xl p-1 h-auto mb-4">
            {(['profile', 'login', 'register'] as const).map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="flex-1 py-1.5 text-xs font-bold rounded-lg capitalize
                  text-[#9ba6b8]
                  data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#070f1e]
                  data-[state=active]:shadow-none"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Profile Tab ── */}
          <TabsContent value="profile" className="space-y-4 text-xs mt-0">
            <div className="p-3 bg-[#070f1e] rounded-xl border border-[#d4af37]/20 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#800020] border border-[#d4af37] flex items-center justify-center font-bold text-white text-lg shrink-0">
                SY
              </div>
              <div>
                <h4 className="font-bold text-white font-geez text-sm">Selamawit Yonas</h4>
                <p className="text-[#d4af37]">selamawit@eotc-member.org</p>
                <Badge className="mt-1 bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/50 hover:bg-[#d4af37]/20 text-[9px] rounded-full px-2">
                  Parish Servant
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[#d4af37] font-bold uppercase tracking-wider text-[10px]">
                Saved Scripture &amp; Activity
              </span>
              <div className="bg-[#070f1e] p-3 rounded-lg border border-[#d4af37]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white font-geez">
                    <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" /> John 1:1 Verse Saved
                  </span>
                  <span className="text-[10px] text-[#9ba6b8]">Yesterday</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white font-geez">
                    <Award className="w-3.5 h-3.5 text-[#d4af37]" /> Intro to Tewahedo Dogma
                  </span>
                  <span className="text-[10px] text-green-400 font-bold">50% Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white font-geez">
                    <Heart className="w-3.5 h-3.5 text-[#d4af37]" /> Lalibela Fund Donation
                  </span>
                  <span className="text-[10px] text-[#d4af37]">500 ETB</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsAuthOpen(false)}
              className="btn-gold w-full justify-center text-xs py-2"
            >
              Close Profile
            </Button>
          </TabsContent>

          {/* ── Login / Register Tabs ── */}
          {(['login', 'register'] as const).map((formTab) => (
            <TabsContent key={formTab} value={formTab} className="mt-0">
              <form
                onSubmit={(e) => { e.preventDefault(); setTab('profile'); }}
                className="space-y-3 text-xs"
              >
                <div className="space-y-1">
                  <Label htmlFor={`${formTab}-email`} className="text-[#d4af37] font-bold">
                    Email Address
                  </Label>
                  <Input
                    id={`${formTab}-email`}
                    type="email"
                    required
                    placeholder="user@example.com"
                    className="bg-[#070f1e] border-[#d4af37]/30 text-white placeholder:text-[#9ba6b8] focus-visible:ring-[#d4af37] focus-visible:border-[#d4af37]"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`${formTab}-password`} className="text-[#d4af37] font-bold">
                    Password
                  </Label>
                  <Input
                    id={`${formTab}-password`}
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-[#070f1e] border-[#d4af37]/30 text-white placeholder:text-[#9ba6b8] focus-visible:ring-[#d4af37] focus-visible:border-[#d4af37]"
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-gold w-full justify-center text-xs py-2 uppercase font-bold"
                >
                  {formTab === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
