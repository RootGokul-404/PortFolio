import React from "react";
import { Monogram } from "@/assets/graphics";
import { startLogin } from "@/const";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";

interface HeaderNavProps {
  displayName: string;
  handle: string;
}

export function HeaderNav({ displayName, handle }: HeaderNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080c0a]/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <Monogram className="h-9 w-9 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-tight text-white transition-colors group-hover:text-[#c7ff40]">
              {displayName}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-slate-400">
              @{handle}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#journey" className="font-mono text-xs text-slate-400 transition-colors hover:text-[#c7ff40]">
            [01_JOURNEY]
          </a>
          <a href="#work" className="font-mono text-xs text-slate-400 transition-colors hover:text-[#c7ff40]">
            [02_WORK]
          </a>
          <a href="#skills" className="font-mono text-xs text-slate-400 transition-colors hover:text-[#c7ff40]">
            [03_SKILLS]
          </a>
          <a href="#writing" className="font-mono text-xs text-slate-400 transition-colors hover:text-[#c7ff40]">
            [04_WRITING]
          </a>
          <a href="#contact" className="font-mono text-xs text-slate-400 transition-colors hover:text-[#c7ff40]">
            [05_CONNECT]
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => startLogin("/admin")}
            className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/[0.02] px-2.5 py-1.5 font-mono text-[11px] text-slate-400 transition-all hover:border-[#c7ff40]/40 hover:bg-[#c7ff40]/5 hover:text-[#c7ff40]"
            title="Owner access to submission portal and content management"
          >
            <Lock className="h-3 w-3" />
            <span className="hidden sm:inline">ADMIN</span>
          </button>

          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-3.5 py-1.5 font-mono text-xs font-semibold text-black transition-all hover:bg-[#d6ff66] hover:shadow-[0_0_20px_rgba(199,255,64,0.3)]"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
