import React, { useState } from "react";
import { Project } from "@/data/portfolioData";
import { ExternalLink } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="border-b border-white/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#c7ff40]">
              <span>// 02_SELECTED_WORK</span>
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Featured Systems & Applications
            </h2>
            <p className="mt-2 max-w-2xl text-slate-400">
              Architected for clean boundaries, testability, and real-world system requirements.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-all ${
                  selectedCategory === category
                    ? "border border-[#c7ff40] bg-[#c7ff40]/10 text-[#c7ff40] shadow-[0_0_12px_rgba(199,255,64,0.2)]"
                    : "border border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, idx) => {
            let stackList: string[] = [];
            if (Array.isArray(project.techStack)) {
              stackList = project.techStack;
            } else if (typeof project.techStack === "string") {
              try {
                stackList = JSON.parse(project.techStack);
              } catch {
                stackList = [project.techStack];
              }
            }

            return (
              <div
                key={project.id}
                className="group relative flex flex-col justify-between rounded-lg border border-white/10 bg-[#0c120f]/90 p-7 transition-all duration-300 hover:border-[#c7ff40]/60 hover:bg-[#101915] hover:shadow-[0_0_30px_rgba(199,255,64,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-slate-400 group-hover:border-[#c7ff40]/30 group-hover:text-[#c7ff40]">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-slate-600">
                      PROJECT_0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-white transition-colors group-hover:text-[#c7ff40]">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {stackList.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-white/5 bg-[#141e18] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-sm border border-cyan-400/40 bg-cyan-950/20 px-3 py-1 font-mono text-xs font-medium text-cyan-300 transition-colors hover:border-cyan-400 hover:text-cyan-200"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>LIVE PREVIEW</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
