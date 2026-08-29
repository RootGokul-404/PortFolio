import React, { useEffect, useState } from "react";
import { getLocalPortfolioData, PortfolioData } from "@/data/portfolioData";
import { HeaderNav } from "@/components/portfolio/HeaderNav";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { JourneySection } from "@/components/portfolio/JourneySection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { MetricsSection } from "@/components/portfolio/MetricsSection";
import { ApiSandboxSection } from "@/components/portfolio/ApiSandboxSection";
import { ArticlesSection } from "@/components/portfolio/ArticlesSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { ResumeModal } from "@/components/portfolio/ResumeModal";
import { FooterSection } from "@/components/portfolio/FooterSection";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { QuickConnectBar } from "@/components/portfolio/QuickConnectBar";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { MeetingModal } from "@/components/portfolio/MeetingModal";
import { SqlSimulatorModal } from "@/components/portfolio/SqlSimulatorModal";
import { SystemArchitectureModal } from "@/components/portfolio/SystemArchitectureModal";
import { IotSimulatorModal } from "@/components/portfolio/IotSimulatorModal";
import { DsaVisualizerModal } from "@/components/portfolio/DsaVisualizerModal";

export default function Home() {
  const [data] = useState<PortfolioData>(() => getLocalPortfolioData());
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isSqlOpen, setIsSqlOpen] = useState(false);
  const [isArchOpen, setIsArchOpen] = useState(false);
  const [isIotOpen, setIsIotOpen] = useState(false);
  const [isDsaOpen, setIsDsaOpen] = useState(false);

  const { profile, projects, skills, articles, details } = data;

  // Global Keyboard Shortcuts (Cmd+K, J, W, S, C, R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsResumeOpen(false);
        setIsMeetingOpen(false);
        setIsSqlOpen(false);
        setIsArchOpen(false);
        setIsIotOpen(false);
        setIsDsaOpen(false);
      } else if (e.key.toLowerCase() === "j") {
        window.location.hash = "journey";
      } else if (e.key.toLowerCase() === "w") {
        window.location.hash = "work";
      } else if (e.key.toLowerCase() === "s") {
        window.location.hash = "skills";
      } else if (e.key.toLowerCase() === "c") {
        window.location.hash = "contact";
      } else if (e.key.toLowerCase() === "r") {
        setIsResumeOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#080c0a] text-slate-100 selection:bg-[#c7ff40] selection:text-black">
      <ScrollProgress />

      <HeaderNav
        displayName={profile.displayName}
        handle={profile.handle}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main id="top">
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

        <MetricsSection
          onOpenSql={() => setIsSqlOpen(true)}
          onOpenArchitecture={() => setIsArchOpen(true)}
          onOpenIot={() => setIsIotOpen(true)}
          onOpenDsa={() => setIsDsaOpen(true)}
        />

        <ApiSandboxSection
          data={data}
        />

        <ArticlesSection
          articles={articles}
        />

        <ContactSection
          profile={profile}
        />
      </main>

      <FooterSection profile={profile} />

      <QuickConnectBar
        onOpenMeeting={() => setIsMeetingOpen(true)}
        email={profile.email}
      />

      {/* Modals & Dialogs */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={data}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenMeeting={() => setIsMeetingOpen(true)}
        onOpenSql={() => setIsSqlOpen(true)}
        onOpenArchitecture={() => setIsArchOpen(true)}
        onOpenIot={() => setIsIotOpen(true)}
        onOpenDsa={() => setIsDsaOpen(true)}
      />

      <MeetingModal
        isOpen={isMeetingOpen}
        onClose={() => setIsMeetingOpen(false)}
        developerEmail={profile.email}
      />

      <SqlSimulatorModal
        isOpen={isSqlOpen}
        onClose={() => setIsSqlOpen(false)}
        data={data}
      />

      <SystemArchitectureModal
        isOpen={isArchOpen}
        onClose={() => setIsArchOpen(false)}
      />

      <IotSimulatorModal
        isOpen={isIotOpen}
        onClose={() => setIsIotOpen(false)}
      />

      <DsaVisualizerModal
        isOpen={isDsaOpen}
        onClose={() => setIsDsaOpen(false)}
      />
    </div>
  );
}
