import React, { useState } from "react";
import { PortfolioData } from "@/data/portfolioData";
import { Check, Copy, Play, RefreshCw, Send, Terminal } from "lucide-react";
import { toast } from "sonner";

interface ApiSandboxSectionProps {
  data: PortfolioData;
}

export function ApiSandboxSection({ data }: ApiSandboxSectionProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<"profile" | "projects" | "skills" | "ping">("profile");
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(42);
  const [statusCode, setStatusCode] = useState(200);
  const [copied, setCopied] = useState(false);

  const getResponseData = () => {
    switch (selectedEndpoint) {
      case "profile":
        return {
          status: 200,
          timestamp: new Date().toISOString(),
          data: {
            developer: data.profile.displayName,
            handle: data.profile.handle,
            role: data.profile.role,
            location: data.profile.location,
            email: data.profile.email,
            github: data.profile.githubUrl,
            linkedin: data.profile.linkedinUrl,
            status: "AVAILABLE_FOR_OPPORTUNITIES",
          },
        };
      case "projects":
        return {
          status: 200,
          total: data.projects.length,
          data: data.projects.map((p) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            techStack: p.techStack,
            repoUrl: p.repoUrl,
          })),
        };
      case "skills":
        return {
          status: 200,
          total: data.skills.length,
          data: data.skills.map((s) => ({
            name: s.name,
            category: s.category,
            proficiency: `${s.proficiency}%`,
          })),
        };
      case "ping":
        return {
          status: 200,
          message: "PONG! Service online and responding.",
          serverTime: new Date().toISOString(),
          environment: "Java Full Stack Cloud / Production",
        };
    }
  };

  const [responseJson, setResponseJson] = useState<string>(
    JSON.stringify(getResponseData(), null, 2)
  );

  const handleExecute = (endpointKey: "profile" | "projects" | "skills" | "ping") => {
    setSelectedEndpoint(endpointKey);
    setLoading(true);
    const mockLatency = Math.floor(Math.random() * 35) + 25;

    setTimeout(() => {
      setLatency(mockLatency);
      setStatusCode(200);
      let res;
      switch (endpointKey) {
        case "profile":
          res = {
            status: 200,
            timestamp: new Date().toISOString(),
            data: {
              developer: data.profile.displayName,
              handle: data.profile.handle,
              role: data.profile.role,
              location: data.profile.location,
              email: data.profile.email,
              github: data.profile.githubUrl,
              linkedin: data.profile.linkedinUrl,
              status: "AVAILABLE_FOR_OPPORTUNITIES",
            },
          };
          break;
        case "projects":
          res = {
            status: 200,
            total: data.projects.length,
            data: data.projects.map((p) => ({
              id: p.id,
              title: p.title,
              category: p.category,
              techStack: p.techStack,
              repoUrl: p.repoUrl,
            })),
          };
          break;
        case "skills":
          res = {
            status: 200,
            total: data.skills.length,
            data: data.skills.map((s) => ({
              name: s.name,
              category: s.category,
              proficiency: `${s.proficiency}%`,
            })),
          };
          break;
        case "ping":
          res = {
            status: 200,
            message: "PONG! Service online and responding.",
            serverTime: new Date().toISOString(),
            environment: "Java Full Stack Cloud / Production",
          };
          break;
      }
      setResponseJson(JSON.stringify(res, null, 2));
      setLoading(false);
      toast.success(`Executed GET /api/v1/${endpointKey} (200 OK)`);
    }, 250);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(responseJson);
      setCopied(true);
      toast.success("JSON response copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy JSON.");
    }
  };

  return (
    <section id="api-sandbox" className="border-b border-white/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-mono text-xs text-[#c7ff40]">
          <span>// 05_REST_API_SANDBOX</span>
        </div>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Interactive REST API Explorer
        </h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Query live developer endpoints in real time to inspect structured JSON contracts, backend response schemas, and system status.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Endpoint selector sidebar */}
          <div className="space-y-3 lg:col-span-4">
            <div className="rounded-lg border border-white/10 bg-[#0c120f]/80 p-5">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#c7ff40]">
                AVAILABLE ENDPOINTS
              </div>
              <div className="mt-4 space-y-2 font-mono text-xs">
                <button
                  onClick={() => handleExecute("profile")}
                  className={`flex w-full items-center justify-between rounded-sm border p-2.5 text-left transition-all ${
                    selectedEndpoint === "profile"
                      ? "border-[#c7ff40] bg-[#c7ff40]/10 text-white"
                      : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">GET</span>
                    <span>/api/v1/profile</span>
                  </div>
                  <Play className="h-3 w-3 text-[#c7ff40]" />
                </button>

                <button
                  onClick={() => handleExecute("projects")}
                  className={`flex w-full items-center justify-between rounded-sm border p-2.5 text-left transition-all ${
                    selectedEndpoint === "projects"
                      ? "border-[#c7ff40] bg-[#c7ff40]/10 text-white"
                      : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">GET</span>
                    <span>/api/v1/projects</span>
                  </div>
                  <Play className="h-3 w-3 text-[#c7ff40]" />
                </button>

                <button
                  onClick={() => handleExecute("skills")}
                  className={`flex w-full items-center justify-between rounded-sm border p-2.5 text-left transition-all ${
                    selectedEndpoint === "skills"
                      ? "border-[#c7ff40] bg-[#c7ff40]/10 text-white"
                      : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">GET</span>
                    <span>/api/v1/skills</span>
                  </div>
                  <Play className="h-3 w-3 text-[#c7ff40]" />
                </button>

                <button
                  onClick={() => handleExecute("ping")}
                  className={`flex w-full items-center justify-between rounded-sm border p-2.5 text-left transition-all ${
                    selectedEndpoint === "ping"
                      ? "border-[#c7ff40] bg-[#c7ff40]/10 text-white"
                      : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-bold text-sky-400">POST</span>
                    <span>/api/v1/ping</span>
                  </div>
                  <Play className="h-3 w-3 text-[#c7ff40]" />
                </button>
              </div>
            </div>
          </div>

          {/* Response Console */}
          <div className="flex flex-col rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl lg:col-span-8 overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#0c120f]">
              <div className="flex items-center gap-3 font-mono text-xs">
                <Terminal className="h-4 w-4 text-[#c7ff40]" />
                <span className="text-white font-bold">
                  {selectedEndpoint === "ping" ? "POST" : "GET"} /api/v1/{selectedEndpoint}
                </span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  {statusCode} OK
                </span>
                {latency && <span className="text-slate-500 text-[10px]">{latency}ms</span>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1 rounded-sm border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-slate-300 hover:border-white/30 hover:text-white"
                >
                  {copied ? <Check className="h-3 w-3 text-[#c7ff40]" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
                <button
                  onClick={() => handleExecute(selectedEndpoint)}
                  className="flex items-center gap-1 rounded-sm border border-[#c7ff40]/30 bg-[#c7ff40]/10 px-2.5 py-1 font-mono text-[11px] font-bold text-[#c7ff40] hover:bg-[#c7ff40] hover:text-black"
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                  <span>RETRY</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 font-mono text-xs text-emerald-300/90 overflow-x-auto bg-[#070a08] max-h-96">
              <pre>{responseJson}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
