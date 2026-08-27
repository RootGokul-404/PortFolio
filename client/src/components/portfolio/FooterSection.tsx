import React from "react";
import { Monogram } from "@/assets/graphics";
import { Profile } from "@/data/portfolioData";
import { ArrowUp, Github, Instagram, Linkedin, Mail, ShieldCheck } from "lucide-react";

interface FooterSectionProps {
  profile: Profile;
}

export function FooterSection({ profile }: FooterSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 bg-[#050806] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Monogram className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-white">
                {profile.displayName} · {profile.handle}
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                Java Full Stack Developer & Systems Builder
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c7ff40]" />
            <span>LEARN · BUILD · EVOLVE</span>
          </div>

          <div className="flex items-center gap-4">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-[#c7ff40]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-[#c7ff40]"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {profile.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-[#c7ff40]"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="text-slate-400 transition-colors hover:text-[#c7ff40]"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 text-slate-400 transition-colors hover:border-[#c7ff40]/50 hover:text-[#c7ff40]"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center font-mono text-[10px] text-slate-400">
          DESIGNED WITH SIGNAL ARCHITECTURE · ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
