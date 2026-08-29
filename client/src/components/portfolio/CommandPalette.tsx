import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  Code2,
  Cpu,
  Database,
  Download,
  FileCode2,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
  Search,
  Server,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenMeeting: () => void;
  onOpenSql: () => void;
  onOpenArchitecture: () => void;
  onOpenIot: () => void;
  onOpenDsa: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onOpenMeeting,
  onOpenSql,
  onOpenArchitecture,
  onOpenIot,
  onOpenDsa,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  const navigateTo = (hash: string) => {
    onClose();
    window.location.hash = hash;
  };

  const commands: CommandItem[] = [
    {
      id: "resume-download",
      title: "Download Official Résumé (PDF)",
      category: "Quick Actions",
      icon: Download,
      action: () => {
        onClose();
        const link = document.createElement("a");
        link.href = "/Gokulakannan-Resume.pdf";
        link.download = "Gokulakannan-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      shortcut: "R",
    },
    {
      id: "schedule-interview",
      title: "Schedule Quick Interview / Call",
      category: "Quick Actions",
      icon: Calendar,
      action: () => {
        onClose();
        onOpenMeeting();
      },
    },
    {
      id: "tool-sql",
      title: "Launch Interactive SQL Query Simulator",
      category: "Developer Tools",
      icon: Database,
      action: () => {
        onClose();
        onOpenSql();
      },
    },
    {
      id: "tool-arch",
      title: "View Backend System Architecture Blueprint",
      category: "Developer Tools",
      icon: Server,
      action: () => {
        onClose();
        onOpenArchitecture();
      },
    },
    {
      id: "tool-iot",
      title: "Launch ESP32 & IoT Sensor Telemetry Simulator",
      category: "Developer Tools",
      icon: Cpu,
      action: () => {
        onClose();
        onOpenIot();
      },
    },
    {
      id: "tool-dsa",
      title: "Launch DSA Algorithm Visualizer",
      category: "Developer Tools",
      icon: Code2,
      action: () => {
        onClose();
        onOpenDsa();
      },
    },
    {
      id: "nav-journey",
      title: "01_JOURNEY — Transition from EEE to Java Full Stack",
      category: "Navigation",
      icon: Layers,
      action: () => navigateTo("journey"),
      shortcut: "J",
    },
    {
      id: "nav-work",
      title: "02_WORK — Projects & Engineering Systems",
      category: "Navigation",
      icon: FolderGit2,
      action: () => navigateTo("work"),
      shortcut: "W",
    },
    {
      id: "nav-skills",
      title: "03_SKILLS — Capability Matrix & Tech Stack",
      category: "Navigation",
      icon: Cpu,
      action: () => navigateTo("skills"),
      shortcut: "S",
    },
    {
      id: "nav-metrics",
      title: "04_METRICS — GitHub Activity & Problem Solving",
      category: "Navigation",
      icon: GraduationCap,
      action: () => navigateTo("metrics"),
    },
    {
      id: "nav-api",
      title: "05_REST_API — Interactive API Sandbox Explorer",
      category: "Navigation",
      icon: FileCode2,
      action: () => navigateTo("api-sandbox"),
    },
    {
      id: "nav-writing",
      title: "06_WRITING — Technical Observations & Notes",
      category: "Navigation",
      icon: BookOpen,
      action: () => navigateTo("writing"),
    },
    {
      id: "nav-contact",
      title: "07_CONNECT — Send Message & Direct Contacts",
      category: "Navigation",
      icon: Mail,
      action: () => navigateTo("contact"),
      shortcut: "C",
    },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-20 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl overflow-hidden">
        <div className="flex items-center border-b border-white/10 px-4 py-3">
          <Search className="h-4 w-4 text-slate-400 mr-2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, projects, tools, or sections... (Press ESC to exit)"
            className="w-full bg-transparent font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 font-mono text-xs">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No matching commands found.</div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex w-full items-center justify-between rounded-sm p-2.5 text-left text-slate-300 transition-colors hover:bg-[#c7ff40]/10 hover:text-[#c7ff40]"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#c7ff40]" />
                    <div>
                      <div className="font-bold text-white group-hover:text-[#c7ff40]">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500">{item.category}</div>
                    </div>
                  </div>

                  {item.shortcut && (
                    <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-4 py-2 font-mono text-[10px] text-slate-500">
          <span>Navigate with shortcuts: [J] [W] [S] [C] [R]</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
