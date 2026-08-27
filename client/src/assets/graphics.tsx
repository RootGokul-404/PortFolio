import React from "react";

export function Monogram({ className = "h-9 w-9" }: { className?: string }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-full border border-cyan-400/50 bg-[#090d0b] shadow-[0_0_12px_rgba(6,182,212,0.3)] ${className}`}>
      {!imageError ? (
        <img
          src="/profile-rootgokul.png"
          alt="RootGokul-404"
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-mono text-xs font-bold text-[#c7ff40]">GK</span>
      )}
    </div>
  );
}

export function HeroTopology({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#c7ff40" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c7ff40" stopOpacity="0" />
        </radialGradient>
        <pattern id="circuitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          <circle cx="0" cy="0" r="1" fill="rgba(199, 255, 64, 0.2)" />
        </pattern>
        <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c7ff40" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#circuitGrid)" />

      <g stroke="url(#traceGrad)" strokeWidth="1.5" strokeDasharray="4 4">
        <path d="M100 120 L350 120 L420 190 L750 190 L820 260 L950 260" />
        <path d="M200 450 L400 450 L480 370 L650 370 L720 300 L900 300" />
        <path d="M50 300 L220 300 L300 220 L580 220 L640 160 L850 160" />
      </g>

      <g stroke="rgba(199, 255, 64, 0.25)" strokeWidth="1">
        <polyline points="300,50 350,100 600,100 650,150 900,150" />
        <polyline points="150,520 250,420 500,420 580,500 800,500" />
        <polyline points="450,20 550,120 700,120" />
      </g>

      <circle cx="350" cy="120" r="14" fill="url(#nodeGlow)" />
      <circle cx="350" cy="120" r="3" fill="#c7ff40" />

      <circle cx="750" cy="190" r="16" fill="url(#nodeGlow)" />
      <circle cx="750" cy="190" r="3.5" fill="#c7ff40" />

      <circle cx="480" cy="370" r="12" fill="url(#nodeGlow)" />
      <circle cx="480" cy="370" r="2.5" fill="#c7ff40" />

      <circle cx="720" cy="300" r="15" fill="url(#nodeGlow)" />
      <circle cx="720" cy="300" r="3" fill="#c7ff40" />

      <text x="365" y="115" fill="#64748b" fontFamily="monospace" fontSize="9" letterSpacing="0.15em">SYS_BUS.01 [JAVA_RT]</text>
      <text x="765" y="185" fill="#64748b" fontFamily="monospace" fontSize="9" letterSpacing="0.15em">SPRING_BOOT_DAEMON:8080</text>
      <text x="495" y="365" fill="#64748b" fontFamily="monospace" fontSize="9" letterSpacing="0.15em">REST_API // CLUSTER_OK</text>
      <text x="735" y="295" fill="#64748b" fontFamily="monospace" fontSize="9" letterSpacing="0.15em">MYSQL:POOL_CONNECTED</text>
    </svg>
  );
}

export function SystemsArt({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sysArtGrad" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c7ff40" stopOpacity="0.6" />
          <stop offset="0.5" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="280" height="180" rx="4" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <path d="M30 40 H270 M30 70 H270 M30 100 H270 M30 130 H270 M30 160 H270" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <path d="M40 30 V170 M90 30 V170 M140 30 V170 M190 30 V170 M240 30 V170" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <path d="M40 140 Q90 60 140 110 T240 50" stroke="url(#sysArtGrad)" strokeWidth="2" fill="none" />
      <circle cx="140" cy="110" r="4" fill="#c7ff40" />
      <circle cx="240" cy="50" r="4" fill="#38bdf8" />
    </svg>
  );
}

export function CodeGlyph({ className = "w-44 h-44" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-lg border border-white/10 bg-[#0c100e] p-5 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,255,64,0.08)_0,transparent_70%)]" />
      <div className="w-full font-mono text-[11px] leading-5 text-slate-400">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-[10px] text-slate-500">
          <span>SYSTEM_ENGINE.java</span>
          <span className="text-[#c7ff40]">● LIVE</span>
        </div>
        <span className="text-[#c7ff40]">&gt;</span> class SystemsEngine &#123;<br />
        &nbsp;&nbsp;<span className="text-sky-400">Spring</span>.boot();<br />
        &nbsp;&nbsp;<span className="text-emerald-400">REST</span>.serve();<br />
        &nbsp;&nbsp;<span className="text-amber-400">MySQL</span>.query();<br />
        &nbsp;&nbsp;return <span className="text-[#c7ff40]">SCALE_OK</span>;<br />
        &#125;
      </div>
    </div>
  );
}

export function DeveloperAvatar({ className = "w-full" }: { className?: string }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={`group relative flex flex-col items-center justify-center ${className}`}>
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-[#c7ff40]/10 to-transparent blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative w-full max-w-[380px] sm:max-w-[420px] overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#070b09] p-3 shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.3)]">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black">
          {!imageError ? (
            <img
              src="/profile-rootgokul.png"
              alt="RootGokul-404 - Gokulakannan"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-4xl font-bold text-[#c7ff40]">
              ROOTGOKUL-404
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between px-2 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c7ff40] animate-ping" />
            <span className="text-slate-300">NODE_STATUS</span>
          </div>
          <span className="font-semibold text-cyan-400">ACTIVE // ONLINE</span>
        </div>
      </div>
    </div>
  );
}
