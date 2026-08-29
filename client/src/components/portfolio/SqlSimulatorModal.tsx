import React, { useState } from "react";
import { PortfolioData } from "@/data/portfolioData";
import { Database, Play, RotateCcw, Table as TableIcon, X } from "lucide-react";
import { toast } from "sonner";

interface SqlSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export function SqlSimulatorModal({ isOpen, onClose, data }: SqlSimulatorModalProps) {
  const [query, setQuery] = useState("SELECT id, title, category, techStack FROM projects WHERE featured = 1;");
  const [results, setResults] = useState<any[]>(
    data.projects
      .filter((p) => p.featured)
      .map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack,
      }))
  );

  if (!isOpen) return null;

  const handleRunQuery = () => {
    const q = query.trim().toLowerCase();

    if (q.includes("from skills")) {
      if (q.includes("order by proficiency desc") || q.includes("proficiency")) {
        const sorted = [...data.skills].sort((a, b) => b.proficiency - a.proficiency);
        setResults(
          sorted.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            proficiency: `${s.proficiency}%`,
          }))
        );
      } else {
        setResults(
          data.skills.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            proficiency: `${s.proficiency}%`,
          }))
        );
      }
      toast.success(`Executed: ${data.skills.length} rows returned.`);
    } else if (q.includes("from projects")) {
      if (q.includes("where category = 'iot systems'") || q.includes("iot")) {
        const filtered = data.projects.filter((p) => p.category.toLowerCase().includes("iot"));
        setResults(
          filtered.map((p) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack,
          }))
        );
        toast.success(`Executed: ${filtered.length} rows returned.`);
      } else {
        setResults(
          data.projects.map((p) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack,
          }))
        );
        toast.success(`Executed: ${data.projects.length} rows returned.`);
      }
    } else {
      setResults([
        {
          schema_version: "v3.2",
          engine: "MySQL 8.0 / Drizzle ORM",
          database: "rootgokul_portfolio_db",
          status: "ONLINE",
          active_tables: "projects, skills, details, articles",
        },
      ]);
      toast.success("Query executed successfully.");
    }
  };

  const sampleQueries = [
    {
      label: "Featured Projects",
      sql: "SELECT id, title, category, techStack FROM projects WHERE featured = 1;",
    },
    {
      label: "Top Skills by Proficiency",
      sql: "SELECT name, category, proficiency FROM skills ORDER BY proficiency DESC;",
    },
    {
      label: "IoT & Embedded Projects",
      sql: "SELECT title, techStack FROM projects WHERE category = 'IoT Systems';",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0c120f]">
          <div className="flex items-center gap-2.5 font-mono text-sm font-bold text-white">
            <Database className="h-4 w-4 text-[#c7ff40]" />
            <span>INTERACTIVE_SQL_SIMULATOR.sql</span>
          </div>

          <button onClick={onClose} className="rounded-sm p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 font-mono text-xs">
          {/* Quick query buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-[11px]">PRESETS:</span>
            {sampleQueries.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setQuery(item.sql);
                }}
                className="rounded-sm border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300 hover:border-[#c7ff40]/50 hover:text-[#c7ff40]"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* SQL Editor */}
          <div className="rounded border border-white/10 bg-[#060907] p-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[11px] text-slate-500">
              <span>SQL QUERY INPUT</span>
              <span className="text-[#c7ff40]">DIALECT: MySQL / Drizzle</span>
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              className="mt-2 w-full bg-transparent text-emerald-300 focus:outline-none"
            />
            <div className="flex justify-end pt-2">
              <button
                onClick={handleRunQuery}
                className="flex items-center gap-1.5 rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-4 py-1.5 font-bold text-black hover:bg-[#d6ff66]"
              >
                <Play className="h-3.5 w-3.5" />
                <span>EXECUTE SQL</span>
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="rounded border border-white/10 bg-[#060907] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-white/[0.02] text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-400">
                <TableIcon className="h-3.5 w-3.5 text-[#c7ff40]" />
                <span>QUERY RESULT ({results.length} ROWS)</span>
              </div>
            </div>

            <div className="max-h-56 overflow-auto">
              {results.length === 0 ? (
                <div className="p-4 text-center text-slate-500">0 rows returned.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/[0.02] text-slate-400">
                    <tr>
                      {Object.keys(results[0]).map((col) => (
                        <th key={col} className="p-2.5 font-semibold uppercase tracking-wider text-[10px]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {results.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02]">
                        {Object.values(row).map((val: any, cIdx) => (
                          <td key={cIdx} className="p-2.5">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
