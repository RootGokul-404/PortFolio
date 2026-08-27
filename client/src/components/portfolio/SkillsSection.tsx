import React from "react";
import { ProfileDetail, Skill } from "@/data/portfolioData";
import { Check, Target } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
  details: ProfileDetail[];
}

export function SkillsSection({ skills, details }: SkillsSectionProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const futureTargets = details.filter((d) => d.section === "future");

  return (
    <section id="skills" className="border-b border-white/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-mono text-xs text-[#c7ff40]">
          <span>// 03_CAPABILITY_MATRIX</span>
        </div>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Technical Stack & Engineering Disciplines
        </h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Core proficiencies spanning low-level hardware registers, Java backend microservices, and database design.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            return (
              <div
                key={category}
                className="rounded-lg border border-white/10 bg-[#0c120f]/80 p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#101814]"
              >
                <div className="border-b border-white/5 pb-3 font-mono text-xs font-bold uppercase tracking-widest text-[#c7ff40]">
                  {category}
                </div>

                <div className="mt-5 space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="text-slate-400">{skill.proficiency}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#c7ff40]"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {futureTargets.length > 0 && (
          <div className="mt-12 rounded-lg border border-white/10 bg-[#0a0f0d] p-6">
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400">
              <Target className="h-4 w-4" />
              <span className="font-bold uppercase tracking-wider">Active Growth Milestones & Future Targets</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {futureTargets.map((target) => (
                <div
                  key={target.id}
                  className="flex items-center gap-2 rounded-sm border border-white/5 bg-white/[0.02] p-3 font-mono text-xs text-slate-300"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#c7ff40]" />
                  <span>{target.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
