import React from "react";
import { ProfileDetail } from "@/data/portfolioData";
import { ArrowRight, Cpu, Layers, ShieldCheck, Sparkles, Terminal } from "lucide-react";

interface JourneySectionProps {
  details: ProfileDetail[];
  about: string;
}

const icons = [Cpu, Terminal, Layers, Sparkles];

export function JourneySection({ details, about }: JourneySectionProps) {
  const journeyItems = details.filter((d) => d.section === "journey");
  const quoteItems = details.filter((d) => d.section === "quote");

  return (
    <section id="journey" className="border-b border-white/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[#c7ff40]">
            <span>// 01_TRANSITION_PIPELINE</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From Hardware Circuitry to Distributed Systems
          </h2>
          <p className="max-w-3xl text-slate-400">
            {about}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journeyItems.map((item, index) => {
            const Icon = icons[index % icons.length] || Terminal;
            return (
              <div
                key={item.id}
                className="group relative rounded-lg border border-white/10 bg-[#0c120f]/80 p-6 transition-all duration-300 hover:border-[#c7ff40]/50 hover:bg-[#101814] hover:shadow-[0_0_25px_rgba(199,255,64,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#c7ff40]/30 bg-[#c7ff40]/10 text-[#c7ff40]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-500 group-hover:text-[#c7ff40]">
                    STEP_0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 font-mono text-sm font-bold uppercase tracking-wider text-white">
                  {item.label}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
                  {item.content}
                </p>

                {index < journeyItems.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#c7ff40]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {quoteItems.length > 0 && (
          <div className="mt-10 rounded-lg border border-[#c7ff40]/20 bg-[#0d1612]/60 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#c7ff40]" />
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-[#c7ff40]">
                  ENGINEERING MINDSET & CORE VALUES
                </div>
                <p className="mt-1.5 text-sm italic leading-relaxed text-slate-200">
                  "{quoteItems[0]?.content || "Technology evolves continuously. The best engineers adapt, learn fast, and build impactful solutions."}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
