import { motion } from "framer-motion";

export function Card({ children, className = "", hover = true, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.005 } : {}}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`rounded-2xl ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </motion.div>
  );
}

export function BalanceCard({ balance, label = "Saldo de Moedas", subtitle, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative overflow-hidden rounded-2xl p-7"
      style={{
        background: "linear-gradient(140deg, #0a1628 0%, #0f2347 40%, #162d55 70%, #0a1628 100%)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 65%)" }} />
      <div className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 65%)" }} />

      {/* Decorative arc line */}
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none" style={{ opacity: 0.15 }}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="0" r="120" stroke="url(#grad)" strokeWidth="1" fill="none" />
          <circle cx="200" cy="0" r="80" stroke="url(#grad)" strokeWidth="0.5" fill="none" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</p>
            {subtitle && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "0.2rem" }}>{subtitle}</p>}
          </div>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              width: 44, height: 44, borderRadius: "0.875rem",
              background: "linear-gradient(135deg, rgba(250,204,21,0.25), rgba(250,204,21,0.08))",
              border: "1px solid rgba(250,204,21,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(250,204,21,0.1)",
            }}
          >
            <span style={{ color: "#facc15", fontSize: "1.25rem", lineHeight: 1 }}>◈</span>
          </motion.div>
        </div>

        <div className="flex items-end gap-3">
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.18, type: "spring", damping: 14 }}
            style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}
          >
            <span style={{
              color: "#facc15",
              fontSize: "3rem",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textShadow: "0 0 32px rgba(250,204,21,0.35)",
            }}>{balance}</span>
            <span style={{ color: "rgba(250,204,21,0.45)", fontSize: "1rem", fontWeight: 500 }}>moedas</span>
          </motion.div>
        </div>

        {trend !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center gap-2"
          >
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em",
              padding: "0.25rem 0.625rem", borderRadius: "9999px",
              ...(trend >= 0
                ? { background: "rgba(74,222,128,0.12)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }
                : { background: "rgba(248,113,113,0.12)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }),
            }}>
              {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)} este mês
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function StatCard({ icon, label, value, color = "blue", delay = 0 }) {
  const colorMap = {
    blue:   { bg: "rgba(59,130,246,0.12)",  text: "#60a5fa",  glow: "rgba(59,130,246,0.2)",  border: "rgba(59,130,246,0.18)" },
    green:  { bg: "rgba(34,197,94,0.12)",   text: "#4ade80",  glow: "rgba(34,197,94,0.2)",   border: "rgba(34,197,94,0.18)" },
    red:    { bg: "rgba(239,68,68,0.12)",   text: "#f87171",  glow: "rgba(239,68,68,0.2)",   border: "rgba(239,68,68,0.18)" },
    yellow: { bg: "rgba(250,204,21,0.12)",  text: "#facc15",  glow: "rgba(250,204,21,0.2)",  border: "rgba(250,204,21,0.18)" },
    purple: { bg: "rgba(168,85,247,0.12)",  text: "#c084fc",  glow: "rgba(168,85,247,0.2)",  border: "rgba(168,85,247,0.18)" },
    teal:   { bg: "rgba(20,184,166,0.12)",  text: "#2dd4bf",  glow: "rgba(20,184,166,0.2)",  border: "rgba(20,184,166,0.18)" },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        borderRadius: "1rem",
        padding: "1.25rem",
        background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(8px)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle color accent top line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: `linear-gradient(90deg, transparent, ${c.text}55, transparent)`,
      }} />

      <div style={{
        width: 42, height: 42, borderRadius: "0.75rem",
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: `0 4px 16px ${c.glow}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.125rem", marginBottom: "0.875rem",
      }}>
        <span style={{ color: c.text }}>{icon}</span>
      </div>

      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </p>
      <p style={{ color: "white", fontWeight: 800, fontSize: "1.3rem", marginTop: "0.2rem", letterSpacing: "-0.02em" }}>
        {value}
      </p>
    </motion.div>
  );
}