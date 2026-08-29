import React, { useState } from "react";
import { ArrowUp, Calendar, Check, Copy, MessageSquare, Phone, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface QuickConnectBarProps {
  onOpenMeeting: () => void;
  email: string;
}

export function QuickConnectBar({ onOpenMeeting, email }: QuickConnectBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard: " + email);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy email");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#090d0b]/90 p-1.5 shadow-2xl backdrop-blur-md">
        <button
          onClick={onOpenMeeting}
          className="flex items-center gap-1.5 rounded-full border border-[#c7ff40]/30 bg-[#c7ff40]/10 px-3 py-1.5 font-mono text-[11px] font-bold text-[#c7ff40] transition-all hover:bg-[#c7ff40] hover:text-black"
          title="Schedule an Interview"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">BOOK CALL</span>
        </button>

        <a
          href="https://wa.me/919999999999?text=Hi%20Gokulakannan,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect."
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 transition-colors hover:border-emerald-400 hover:bg-emerald-500 hover:text-black"
          title="Direct WhatsApp Connect"
        >
          <Phone className="h-3.5 w-3.5" />
        </a>

        <button
          onClick={handleCopyEmail}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          title="Copy Email Address"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[#c7ff40]" /> : <Copy className="h-3.5 w-3.5" />}
        </button>

        <button
          onClick={scrollToTop}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          title="Scroll to top"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
