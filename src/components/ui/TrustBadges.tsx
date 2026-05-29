"use client";

import { Shield, Clock, CreditCard, Star } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-center gap-2 py-2.5 bg-slate-900/80 border border-[#D4AF37]/20 rounded-xl">
        <Star className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />
        <span className="text-slate-300 text-sm">
          <span className="text-[#D4AF37] font-bold text-base">1,849</span>
          {" "}transfers completed
        </span>
        <Star className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
          <Shield className="h-5 w-5 text-[#D4AF37]" />
          <span className="text-[10px] text-slate-400 leading-tight">Licensed &amp; Insured</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
          <Clock className="h-5 w-5 text-[#D4AF37]" />
          <span className="text-[10px] text-slate-400 leading-tight">Available 24/7</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
          <CreditCard className="h-5 w-5 text-[#D4AF37]" />
          <span className="text-[10px] text-slate-400 leading-tight">Secure Payment</span>
        </div>
      </div>
    </div>
  );
}
