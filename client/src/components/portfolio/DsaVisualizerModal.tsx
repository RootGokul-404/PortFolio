import React, { useState } from "react";
import { Code2, Play, RefreshCw, X } from "lucide-react";

interface DsaVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DsaVisualizerModal({ isOpen, onClose }: DsaVisualizerModalProps) {
  const array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const [target, setTarget] = useState(23);
  const [low, setLow] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const runBinarySearch = async () => {
    setIsRunning(true);
    setFoundIndex(null);
    const newLogs: string[] = [`Starting Binary Search in Java for target: ${target}`];
    setLogs([...newLogs]);

    let l = 0;
    let r = array.length - 1;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      setLow(l);
      setHigh(r);
      setMid(m);

      newLogs.push(`Step: low=${l} [${array[l]}], high=${r} [${array[r]}], mid=${m} [${array[m]}]`);
      setLogs([...newLogs]);
      await new Promise((res) => setTimeout(res, 600));

      if (array[m] === target) {
        setFoundIndex(m);
        newLogs.push(`✅ Found target ${target} at index ${m} in O(log N) time!`);
        setLogs([...newLogs]);
        setIsRunning(false);
        return;
      }

      if (array[m] < target) {
        newLogs.push(`array[${m}] (${array[m]}) < ${target} -> Search right half (low = ${m + 1})`);
        l = m + 1;
      } else {
        newLogs.push(`array[${m}] (${array[m]}) > ${target} -> Search left half (high = ${m - 1})`);
        r = m - 1;
      }
      setLogs([...newLogs]);
      await new Promise((res) => setTimeout(res, 600));
    }

    newLogs.push(`❌ Target ${target} not found in array.`);
    setLogs([...newLogs]);
    setIsRunning(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg border border-white/10 bg-[#090d0b] shadow-2xl overflow-hidden font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0c120f]">
          <div className="flex items-center gap-2.5 text-sm font-bold text-white">
            <Code2 className="h-4 w-4 text-[#c7ff40]" />
            <span>JAVA_DSA_VISUALIZER (BINARY SEARCH ALGORITHM)</span>
          </div>

          <button onClick={onClose} className="rounded-sm p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Array visualization */}
          <div>
            <div className="text-slate-400 mb-2">SORTED ARRAY:</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {array.map((val, idx) => {
                const isMid = idx === mid;
                const isLow = idx === low;
                const isHigh = idx === high;
                const isFound = idx === foundIndex;

                let border = "border-white/10 bg-white/[0.02]";
                let text = "text-white";

                if (isFound) {
                  border = "border-[#c7ff40] bg-[#c7ff40]/20 shadow-[0_0_15px_rgba(199,255,64,0.4)]";
                  text = "text-[#c7ff40] font-bold";
                } else if (isMid) {
                  border = "border-cyan-400 bg-cyan-950/40";
                  text = "text-cyan-300 font-bold";
                } else if (isLow || isHigh) {
                  border = "border-amber-400/40 bg-amber-950/20";
                }

                return (
                  <div key={idx} className={`rounded-sm border ${border} p-3 text-center transition-all`}>
                    <div className="text-[10px] text-slate-500">[{idx}]</div>
                    <div className={`text-sm ${text}`}>{val}</div>
                    {isFound && <div className="text-[9px] text-[#c7ff40] font-bold">MATCH</div>}
                    {isMid && !isFound && <div className="text-[9px] text-cyan-300">MID</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#0c120f] p-4">
            <div className="flex items-center gap-3">
              <span className="text-slate-300">TARGET VALUE:</span>
              <select
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                disabled={isRunning}
                className="rounded-sm border border-white/10 bg-[#090d0b] px-3 py-1.5 text-white focus:border-[#c7ff40] focus:outline-none"
              >
                {array.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={runBinarySearch}
              disabled={isRunning}
              className="flex items-center gap-1.5 rounded-sm border border-[#c7ff40] bg-[#c7ff40] px-4 py-2 font-bold text-black hover:bg-[#d6ff66] disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5" />
              <span>{isRunning ? "STEPPING..." : "RUN VISUALIZER"}</span>
            </button>
          </div>

          {/* Step Execution Logs */}
          <div className="rounded border border-white/10 bg-[#050806] p-3 text-[11px] space-y-1 text-slate-300 max-h-48 overflow-y-auto">
            <div className="text-slate-500 font-bold border-b border-white/5 pb-1">
              EXECUTION TRACE (Time Complexity: O(log N) | Space: O(1))
            </div>
            {logs.length === 0 ? (
              <div className="text-slate-600">Click 'RUN VISUALIZER' to step through execution.</div>
            ) : (
              logs.map((line, idx) => <div key={idx}>{line}</div>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
