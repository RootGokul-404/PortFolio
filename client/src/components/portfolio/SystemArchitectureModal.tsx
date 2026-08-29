import React from "react";
import { ArrowDown, Cpu, Database, Layers, Network, Server, ShieldCheck, X } from "lucide-react";

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SystemArchitectureModal({ isOpen, onClose }: SystemArchitectureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0c120f]">
          <div className="flex items-center gap-2.5 font-mono text-sm font-bold text-white">
            <Server className="h-4 w-4 text-[#c7ff40]" />
            <span>BACKEND_SYSTEM_ARCHITECTURE_BLUEPRINT.svg</span>
          </div>

          <button onClick={onClose} className="rounded-sm p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs text-slate-300 space-y-6">
          <div className="text-slate-400">
            Architectural schematic representing full-stack request pipelines, Spring Boot / REST API boundaries, and database persistence layers.
          </div>

          {/* Architecture Nodes */}
          <div className="space-y-4">
            {/* Layer 1: Client & Presentation */}
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-[#c7ff40] font-bold">
                <span className="flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  <span>LAYER 01: CLIENT & TELEMETRY INGESTION</span>
                </span>
                <span className="text-[10px] text-slate-500">HTTP / HTTPS / REST / MQTT</span>
              </div>
              <p className="mt-2 text-slate-400">
                React 19 SPA, Mobile Web clients, and IoT Edge nodes (ESP32 microcontrollers) transmitting structured telemetry packets over encrypted JSON payloads.
              </p>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-5 w-5 text-[#c7ff40] animate-bounce" />
            </div>

            {/* Layer 2: API Gateway & Security */}
            <div className="rounded-lg border border-cyan-400/30 bg-cyan-950/10 p-4">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>LAYER 02: API GATEWAY & SECURITY FILTER CHAIN</span>
                </span>
                <span className="text-[10px] text-slate-500">JWT / CORS / Rate Limiting</span>
              </div>
              <p className="mt-2 text-slate-300">
                Spring Security & Express middleware enforcing JWT token authentication, CORS policies, spam detection heuristics, and request payload validation.
              </p>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-5 w-5 text-cyan-300" />
            </div>

            {/* Layer 3: Application Services & Business Logic */}
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-white font-bold">
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#c7ff40]" />
                  <span>LAYER 03: SERVICE LAYER & DOMAIN LOGIC</span>
                </span>
                <span className="text-[10px] text-slate-500">Java / Spring Boot / Core Logic</span>
              </div>
              <p className="mt-2 text-slate-400">
                Stateless REST controllers and domain services handling business orchestration, email dispatch notifications (Resend API), and background cron jobs.
              </p>
            </div>

            <div className="flex justify-center">
              <ArrowDown className="h-5 w-5 text-[#c7ff40]" />
            </div>

            {/* Layer 4: Persistence & Storage */}
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-4">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span>LAYER 04: PERSISTENCE & DATA STORAGE</span>
                </span>
                <span className="text-[10px] text-slate-500">MySQL 8.0 / Drizzle ORM / S3 Proxy</span>
              </div>
              <p className="mt-2 text-slate-300">
                Normalized relational schemas (users, projects, skills, articles, contact submissions) with connection pooling, migrations, and object storage proxies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
