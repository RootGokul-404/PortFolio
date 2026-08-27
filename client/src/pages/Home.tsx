import React, { useState } from "react";
import { getLocalPortfolioData, PortfolioData } from "@/data/portfolioData";
import { HeaderNav } from "@/components/portfolio/HeaderNav";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { JourneySection } from "@/components/portfolio/JourneySection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ArticlesSection } from "@/components/portfolio/ArticlesSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { ResumeModal } from "@/components/portfolio/ResumeModal";
import { FooterSection } from "@/components/portfolio/FooterSection";

export default function Home() {
  const [data] = useState<PortfolioData>(() => getLocalPortfolioData());
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { profile, projects, skills, articles, details } = data;

  return (
    <div className="min-h-screen bg-[#080c0a] text-slate-100 selection:bg-[#c7ff40] selection:text-black">
      <HeaderNav displayName={profile.displayName} handle={profile.handle} />

      <main>
        <HeroSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <JourneySection
          details={details}
          about={profile.about}
        />

        <ProjectsSection
          projects={projects}
        />

        <SkillsSection
          skills={skills}
          details={details}
        />

        <ArticlesSection
          articles={articles}
        />

        <ContactSection
          profile={profile}
        />
      </main>

      <FooterSection profile={profile} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={data}
      />
    </div>
  );
}
