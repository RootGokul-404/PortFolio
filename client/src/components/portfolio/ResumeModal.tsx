import React from "react";
import { PortfolioData } from "@/data/portfolioData";
import { Copy, Download, FileText, Printer, X } from "lucide-react";
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

## Professional Summary
${profile.about}

---

## Technical Proficiencies
${skillsSection}

---

## Featured Engineering & Mini Projects
${projectSection}

---

## Education & Pipeline
- **Degree:** Bachelor of Engineering (B.E.) — Electrical & Electronics Engineering
- **Transition:** Hardware circuit logic into modern Java full stack web applications and database architectures.
- **Philosophy:** ${details.find((d) => d.label === "Philosophy")?.content || "Learn · Build · Evolve"}
`;
  };

  // Download Markdown file
  const handleDownloadMarkdown = () => {
    const text = generateMarkdownResume();
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Gokulakannan-Resume.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Résumé Markdown file downloaded.");
  };

  // Download HTML/Printable Resume
  const handleDownloadHtml = () => {
    const link = document.createElement("a");
    link.href = "/resume.html";
    link.download = "Gokulakannan-Resume.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Résumé HTML document downloaded.");
  };

  // Open printable version
  const handlePrintResume = () => {
    window.open("/resume.html", "_blank");
  };

  // Copy text to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdownResume());
      toast.success("Résumé copied to clipboard.");
    } catch {
      toast.error("Failed to copy résumé text.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2.5 font-mono text-sm font-bold text-white">
            <FileText className="h-4 w-4 text-[#c7ff40]" />
            <span>GOKULAKANNAN_RESUME.md</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrintResume}
              className="flex items-center gap-1.5 rounded-sm border border-cyan-400/40 bg-cyan-950/20 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-300 hover:border-cyan-400 hover:text-cyan-200"
              title="Open print dialog to save as PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="flex items-center gap-1.5 rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-3 py-1.5 font-mono text-xs font-bold text-black hover:bg-[#d6ff66]"
              title="Download HTML Resume"
            >
              <Download className="h-3.5 w-3.5" />
              <span>DOWNLOAD RESUME</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-[#c7ff40]/40 hover:text-[#c7ff40]"
              title="Download raw Markdown"
            >
              <Download className="h-3.5 w-3.5" />
              <span>MD</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-[#c7ff40]/40 hover:text-[#c7ff40]"
              title="Copy to clipboard"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>COPY</span>
            </button>

            <button
              onClick={onClose}
              className="ml-1 rounded-sm p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
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
