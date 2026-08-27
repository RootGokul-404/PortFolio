import React from "react";
import { CodeGlyph, DeveloperAvatar, HeroTopology } from "@/assets/graphics";
import { Profile } from "@/data/portfolioData";
import {
  ArrowDownRight,
  Braces,
  Code2,
  Cpu,
  Database,
  FileDown,
  GitBranch,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Server,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  profile: Profile;
  onOpenResume: () => void;
}

const techStack = [
  { label: "Java", icon: Braces },
  { label: "Spring Boot", icon: Server },
  { label: "REST APIs", icon: Code2 },
  { label: "MySQL", icon: Database },
  { label: "Embedded C / ESP32", icon: Cpu },
  { label: "Git & Linux", icon: GitBranch },
];

export function HeroSection({ profile, onOpenResume }: HeroSectionProps) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/5 pb-20 pt-12 lg:pb-28 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <HeroTopology className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/20 px-3.5 py-1 font-mono text-xs text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>OPEN FOR ROLES</span>
              </div>
              <span className="font-mono text-xs text-slate-400">// {profile.location} · Remote / Relocation</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Building scalable backend systems and robust distributed architectures.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Hi, I'm <strong className="text-white">{profile.displayName}</strong> (<span className="font-mono text-cyan-400">@{profile.handle}</span>). {profile.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group flex items-center gap-2 rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-5 py-3 font-mono text-xs font-bold text-black transition-all hover:bg-[#d6ff66] hover:shadow-[0_0_25px_rgba(199,255,64,0.35)]"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <button
                onClick={onOpenResume}
                className="group flex items-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-5 py-3 font-mono text-xs font-medium text-white transition-all hover:border-white/30 hover:bg-white/[0.08]"
              >
                <FileDown className="h-4 w-4 text-[#c7ff40]" />
                <span>RÉSUMÉ SPEC</span>
              </button>

              <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.02] text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.02] text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {profile.instagramUrl && (
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.02] text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.02] text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                  aria-label="Email Gokulakannan"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-white/5 pt-6">
              <div className="font-mono text-xs text-slate-400">CORE FOCUS STACK</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.label}
                    className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-[#0d1310] px-3 py-1 font-mono text-xs text-slate-300"
                  >
                    <tech.icon className="h-3.5 w-3.5 text-[#c7ff40]" />
                    <span>{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <DeveloperAvatar />
          </div>
        </div>
      </div>
    </section>
  );
}
