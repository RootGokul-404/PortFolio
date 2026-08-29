import React from "react";
import {
  Award,
  BookOpen,
  CheckCircle,
  Code,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  GitBranch,
  GitCommit,
  GitFork,
  Github,
  GraduationCap,
  Layers,
  Server,
  Star,
  Terminal,
  Trophy,
} from "lucide-react";

interface MetricsSectionProps {
  onOpenSql: () => void;
  onOpenArchitecture: () => void;
  onOpenIot: () => void;
  onOpenDsa: () => void;
}

export function MetricsSection({
  onOpenSql,
  onOpenArchitecture,
  onOpenIot,
  onOpenDsa,
}: MetricsSectionProps) {
  const certifications = [
    {
      title: "Java Full Stack Development",
      issuer: "Full Stack Specialization",
      date: "2025",
      skills: ["Java", "Spring Boot", "REST APIs", "MySQL"],
    },
    {
      title: "Embedded Systems & IoT Specialization",
      issuer: "Hardware & Microcontrollers",
      date: "2024",
      skills: ["ESP32", "Embedded C", "Sensors", "MQTT"],
    },
    {
      title: "Data Structures & Algorithms in Java",
      issuer: "Problem Solving & Core CS",
      date: "2025",
      skills: ["OOP", "Arrays & Strings", "Trees & Graphs", "Dynamic Programming"],
    },
  ];

  return (
    <section id="metrics" className="border-b border-white/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-mono text-xs text-[#c7ff40]">
          <span>// 04_DEVELOPER_TELEMETRY & CREDENTIALS</span>
        </div>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Engineering Metrics, Credentials & Interactive Sandboxes
        </h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Quantifiable engineering milestones, problem-solving benchmarks, and interactive system visualizers.
        </p>

        {/* Interactive Tool Launchpads */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={onOpenSql}
            className="group flex flex-col justify-between rounded-lg border border-white/10 bg-[#0c120f]/80 p-5 text-left transition-all duration-300 hover:border-[#c7ff40]/50 hover:bg-[#101814]"
          >
            <div>
              <div className="flex items-center justify-between text-[#c7ff40]">
                <Database className="h-5 w-5" />
                <span className="font-mono text-[10px] text-slate-500 group-hover:text-[#c7ff40]">LAUNCH</span>
              </div>
              <h3 className="mt-3 font-mono text-sm font-bold text-white group-hover:text-[#c7ff40]">
                SQL Query Console
              </h3>
              <p className="mt-1.5 text-xs text-slate-400">
                Execute live queries on project and capability tables.
              </p>
            </div>
          </button>

          <button
            onClick={onOpenArchitecture}
            className="group flex flex-col justify-between rounded-lg border border-white/10 bg-[#0c120f]/80 p-5 text-left transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#101814]"
          >
            <div>
              <div className="flex items-center justify-between text-cyan-400">
                <Server className="h-5 w-5" />
                <span className="font-mono text-[10px] text-slate-500 group-hover:text-cyan-400">LAUNCH</span>
              </div>
              <h3 className="mt-3 font-mono text-sm font-bold text-white group-hover:text-cyan-400">
                System Blueprint
              </h3>
              <p className="mt-1.5 text-xs text-slate-400">
                Inspect Spring Boot & API gateway layer topology.
              </p>
            </div>
          </button>

          <button
            onClick={onOpenIot}
            className="group flex flex-col justify-between rounded-lg border border-white/10 bg-[#0c120f]/80 p-5 text-left transition-all duration-300 hover:border-amber-400/50 hover:bg-[#101814]"
          >
            <div>
              <div className="flex items-center justify-between text-amber-400">
                <Cpu className="h-5 w-5" />
                <span className="font-mono text-[10px] text-slate-500 group-hover:text-amber-400">LAUNCH</span>
              </div>
              <h3 className="mt-3 font-mono text-sm font-bold text-white group-hover:text-amber-400">
                ESP32 Simulator
              </h3>
              <p className="mt-1.5 text-xs text-slate-400">
                Simulate soil moisture & temperature sensor thresholds.
              </p>
            </div>
          </button>

          <button
            onClick={onOpenDsa}
            className="group flex flex-col justify-between rounded-lg border border-white/10 bg-[#0c120f]/80 p-5 text-left transition-all duration-300 hover:border-purple-400/50 hover:bg-[#101814]"
          >
            <div>
              <div className="flex items-center justify-between text-purple-400">
                <Code2 className="h-5 w-5" />
                <span className="font-mono text-[10px] text-slate-500 group-hover:text-purple-400">LAUNCH</span>
              </div>
              <h3 className="mt-3 font-mono text-sm font-bold text-white group-hover:text-purple-400">
                DSA Visualizer
              </h3>
              <p className="mt-1.5 text-xs text-slate-400">
                Step through Binary Search & algorithmic complexity.
              </p>
            </div>
          </button>
        </div>

        {/* GitHub & Problem Solving Metrics */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* GitHub Activity Card */}
          <div className="rounded-lg border border-white/10 bg-[#0c120f]/80 p-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
                <Github className="h-4 w-4 text-[#c7ff40]" />
                <span>GITHUB_ACTIVITY_RADAR (@RootGokul-404)</span>
              </div>
              <a
                href="https://github.com/RootGokul-404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-[11px] text-[#c7ff40] hover:underline"
              >
                <span>VISIT GITHUB</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center font-mono">
              <div className="rounded-sm border border-white/5 bg-white/[0.02] p-3">
                <div className="text-xl font-bold text-white">6+</div>
                <div className="text-[10px] text-slate-500">PUBLIC REPOSITORIES</div>
              </div>
              <div className="rounded-sm border border-white/5 bg-white/[0.02] p-3">
                <div className="text-xl font-bold text-[#c7ff40]">100%</div>
                <div className="text-[10px] text-slate-500">OPEN SOURCE CODE</div>
              </div>
              <div className="rounded-sm border border-white/5 bg-white/[0.02] p-3">
                <div className="text-xl font-bold text-cyan-300">Java/C</div>
                <div className="text-[10px] text-slate-500">PRIMARY STACK</div>
              </div>
            </div>

            <div className="mt-6 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Top Languages Distribution:</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 flex">
                <div className="h-full bg-amber-400" style={{ width: "45%" }} title="Java 45%" />
                <div className="h-full bg-cyan-400" style={{ width: "30%" }} title="C / Embedded 30%" />
                <div className="h-full bg-emerald-400" style={{ width: "15%" }} title="TypeScript/JS 15%" />
                <div className="h-full bg-purple-400" style={{ width: "10%" }} title="SQL 10%" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                <span>🟨 Java 45%</span>
                <span>🟦 C / Embedded 30%</span>
                <span>🟩 TypeScript 15%</span>
                <span>🟪 SQL 10%</span>
              </div>
            </div>
          </div>

          {/* DSA & Problem Solving Card */}
          <div className="rounded-lg border border-white/10 bg-[#0c120f]/80 p-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold">
                <Trophy className="h-4 w-4 text-[#c7ff40]" />
                <span>PROBLEM_SOLVING_BENCHMARKS</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">JAVA DSA</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center font-mono">
              <div className="rounded-sm border border-emerald-500/20 bg-emerald-950/20 p-3">
                <div className="text-xl font-bold text-emerald-400">Fundamentals</div>
                <div className="text-[10px] text-slate-500">ARRAYS & STRINGS</div>
              </div>
              <div className="rounded-sm border border-amber-500/20 bg-amber-950/20 p-3">
                <div className="text-xl font-bold text-amber-400">Linear / Tree</div>
                <div className="text-[10px] text-slate-500">LINKED LISTS & TREES</div>
              </div>
              <div className="rounded-sm border border-rose-500/20 bg-rose-950/20 p-3">
                <div className="text-xl font-bold text-rose-400">O(log N)</div>
                <div className="text-[10px] text-slate-500">BINARY SEARCH / SORT</div>
              </div>
            </div>

            <div className="mt-6 space-y-2 font-mono text-xs">
              <div className="text-slate-400">Core Engineering Competencies:</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#c7ff40]" />
                  <span>Object-Oriented Design</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#c7ff40]" />
                  <span>Time & Space Complexity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#c7ff40]" />
                  <span>Database Schema Normalization</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#c7ff40]" />
                  <span>REST API Contract Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-12">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#c7ff40] mb-4">
            CERTIFICATIONS & ACADEMIC CREDENTIALS
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="rounded-lg border border-white/10 bg-[#0c120f]/60 p-5 font-mono text-xs"
              >
                <div className="flex items-center gap-2 text-white font-bold">
                  <Award className="h-4 w-4 text-[#c7ff40]" />
                  <span>{cert.title}</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  {cert.issuer} · {cert.date}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-sm border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[10px] text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
