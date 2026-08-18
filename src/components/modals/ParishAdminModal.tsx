import React from 'react';
import { useLanguage } from '../layout/LanguageContext';
import { Users, Heart, Calendar, Tv } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MetricItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

const METRICS: MetricItem[] = [
  { icon: Users,    value: '1,240',       label: 'Registered Parishioners' },
  { icon: Heart,    value: '342,000 ETB', label: 'Monthly Tithes Collected' },
  { icon: Tv,       value: '4,800',       label: 'Live Stream Viewers' },
];

interface AdminAction {
  icon: React.ElementType;
  label: string;
}

const ADMIN_ACTIONS: AdminAction[] = [
  { icon: Calendar, label: 'Schedule Parish Qidase Liturgy' },
  { icon: Tv,       label: 'Launch Live Stream Broadcast' },
];

export const ParishAdminModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen } = useLanguage();

  return (
    <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
      <DialogContent className="bg-[#0e1b30] border-2 border-[#d4af37] text-white max-w-2xl rounded-2xl shadow-2xl p-6 gap-0">
        <DialogHeader className="border-b border-[#d4af37]/30 pb-3 mb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              <Badge className="bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/50 hover:bg-[#d4af37]/20 text-[9px] rounded-full px-2 mb-1">
                D2.8 PARISH ADMIN DASHBOARD
              </Badge>
              <DialogTitle className="text-xl font-bold font-serif text-[#f4e07b]">
                Parish Governance &amp; Stewardship Manager
              </DialogTitle>
              <p className="text-xs text-[#9ba6b8]">Holy Trinity Cathedral • Parish Admin Portal</p>
            </div>
          </div>
        </DialogHeader>

        {/* ── Metrics Grid ── */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs mb-4">
          {METRICS.map(({ icon: Icon, value, label }) => (
            <Card key={label} className="bg-[#070f1e] border-[#d4af37]/20 rounded-xl">
              <CardContent className="p-3 space-y-1 flex flex-col items-center">
                <Icon className="w-5 h-5 text-[#d4af37]" />
                <span className="text-lg font-mono font-black text-white">{value}</span>
                <p className="text-[10px] text-[#9ba6b8]">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Admin Actions ── */}
        <div className="space-y-2 text-xs mb-4">
          <span className="text-[#d4af37] font-bold uppercase tracking-wider text-[10px]">
            Parish Management Actions
          </span>
          <div className="grid grid-cols-2 gap-2">
            {ADMIN_ACTIONS.map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                className="p-3 h-auto bg-[#070f1e] hover:bg-[#162846] rounded-xl border-[#d4af37]/20 text-left font-bold text-white justify-start gap-2 hover:text-white hover:border-[#d4af37]/50"
              >
                <Icon className="w-4 h-4 text-[#d4af37] shrink-0" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => setIsAdminOpen(false)}
            className="btn-gold w-full justify-center text-xs py-2"
          >
            Close Admin Panel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
