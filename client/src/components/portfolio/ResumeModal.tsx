import React from "react";
import { PortfolioData } from "@/data/portfolioData";
import { Copy, Download, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export function ResumeModal({ isOpen, onClose, data }: ResumeModalProps) {
  if (!isOpen) return null;

  const { profile, projects, skills, details } = data;

  const generateMarkdownResume = () => {
    const projectSection = projects
      .map(
        (p) => `### ${p.title} (${p.category})
${p.summary}
- **Technologies:** ${Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack}
${p.repoUrl ? `- **Repository:** ${p.repoUrl}` : ""}
${p.liveUrl ? `- **Live Demo:** ${p.liveUrl}` : ""}`
      )
      .join("\n\n");

    const skillsSection = Array.from(new Set(skills.map((s) => s.category)))
      .map(
        (cat) =>
          `- **${cat}:** ${skills
            .filter((s) => s.category === cat)
            .map((s) => s.name)
            .join(", ")}`
      )
      .join("\n");

    return `# ${profile.displayName}
**${profile.role}**
- **Location:** ${profile.location}
- **Email:** ${profile.email}
- **GitHub:** ${profile.githubUrl || "https://github.com/RootGokul-404"}
- **LinkedIn:** ${profile.linkedinUrl || "https://www.linkedin.com/in/gokula-kannan-dev"}

---

## Executive Summary
${profile.about}

---

## Technical Proficiencies
${skillsSection}

---

## Featured Engineering Projects
${projectSection}

---

## Engineering Mindset & Pipeline
- **Transition:** Electrical & Electronics Engineering (EEE) graduate equipped with hardware circuit logic, transitioning to modern distributed Java/Spring Boot web backends.
- **Philosophy:** ${details.find((d) => d.label === "Philosophy")?.content || "Learn · Build · Evolve"}
`;
  };

  const handleDownload = () => {
    const text = generateMarkdownResume();
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Gokulakannan-RootGokul-404-Resume.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Résumé markdown file downloaded.");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdownResume());
      toast.success("Résumé markdown copied to clipboard.");
    } catch {
      toast.error("Failed to copy résumé text.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5 font-mono text-sm font-bold text-white">
            <FileText className="h-4 w-4 text-[#c7ff40]" />
            <span>RÉSUMÉ_SPECIFICATION_V1.md</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-[#c7ff40]/40 hover:text-[#c7ff40]"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>COPY</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-3 py-1.5 font-mono text-xs font-bold text-black hover:bg-[#d6ff66]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>DOWNLOAD MD</span>
            </button>

            <button
              onClick={onClose}
              className="ml-2 rounded-sm p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs leading-relaxed text-slate-300">
          <pre className="whitespace-pre-wrap font-mono">{generateMarkdownResume()}</pre>
        </div>
      </div>
    </div>
  );
}
