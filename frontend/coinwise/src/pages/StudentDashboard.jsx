import { motion } from "framer-motion";

const FONT = "'Sora', 'Nunito', sans-serif";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const stagger = (i) => ({
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.45, delay: 0.28 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
});

export default function StudentDashboard({ currentUser, onNavigate }) {
  const firstName   = (currentUser.name || currentUser.nome || "Aluno").split(" ")[0];
  const ra          = currentUser.ra         || "—";
  const curso       = currentUser.curso      || currentUser.course || "—";
  const balance     = currentUser.balance    ?? 0;
  const instituicao = currentUser.instituicao || "—";

  const quickActions = [
    {
      icon: "🎁",
      label: "Resgatar vantagens",
      sub: "Catálogo de recompensas",
      page: "student-rewards",
      accent: "rgba(250,204,21,0.15)",
      accentBorder: "rgba(250,204,21,0.3)",
    },
    {
      icon: "↕",
      label: "Ver extrato",
      sub: "Histórico completo",
      page: "student-transactions",
      accent: "rgba(96,165,250,0.15)",
      accentBorder: "rgba(96,165,250,0.3)",
    },
    {
      icon: "◉",
      label: "Meu perfil",
      sub: "Editar informações",
      page: "student-profile",
      accent: "rgba(52,211,153,0.15)",
      accentBorder: "rgba(52,211,153,0.3)",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        fontFamily: FONT,
        background: "linear-gradient(160deg, #060e1c 0%, #0b1d38 45%, #07121f 100%)",
        minHeight: "100vh",
        padding: "1.75rem 1.5rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

        .qa-btn { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
        .qa-btn:hover { transform: translateX(4px); }
        .qa-btn:hover .qa-bg { background: rgba(255,255,255,0.07) !important; border-color: rgba(255,255,255,0.14) !important; }
        .qa-btn:hover .qa-arrow { opacity: 1 !important; transform: translateX(3px); }
        .qa-arrow { transition: transform 0.2s, opacity 0.2s; }

        .balance-glow {
          text-shadow: 0 0 40px rgba(250,204,21,0.35), 0 0 80px rgba(250,204,21,0.12);
        }

        .card-shimmer::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 0; bottom: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%);
          animation: shimmer 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shimmer {
          0%   { left: -100%; }
          60%  { left: 100%;  }
          100% { left: 100%;  }
        }

        @keyframes pulse-ring {
          0%   { transform: scale(0.95); opacity: 0.6; }
          70%  { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(1.08); opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 2.5s ease-out infinite;
        }
      `}</style>

      {/* ── Header ── */}
      <motion.div {...fade(0)} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{
            color: "rgba(250,204,21,0.6)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <span style={{
              display: "inline-block",
              width: 6, height: 6,
              borderRadius: "50%",
              background: "rgba(250,204,21,0.8)",
              boxShadow: "0 0 6px rgba(250,204,21,0.6)",
            }} />
            Visão geral
          </p>
          <h2 style={{
            color: "white",
            fontWeight: 900,
            fontSize: "2rem",
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.1,
          }}>
            Olá, {firstName} 👋
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.28)",
            fontSize: "0.78rem",
            marginTop: "0.4rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <span style={{ color: "rgba(250,204,21,0.45)", fontWeight: 600 }}>RA</span>
            {ra}
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            {curso}
          </p>
        </div>

        {/* Instituição badge */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0.75rem",
          padding: "0.45rem 0.85rem",
          maxWidth: 120,
          textAlign: "center",
        }}>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Instituição</p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.7rem", fontWeight: 700, marginTop: 2, margin: "2px 0 0" }}>{instituicao}</p>
        </div>
      </motion.div>

      {/* ── Bank Card ── */}
      <motion.div {...fade(0.1)} style={{ position: "relative" }}>
        <div
          className="card-shimmer"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "1.75rem",
            background: "linear-gradient(135deg, #112240 0%, #0a1a2e 55%, #06101e 100%)",
            border: "1px solid rgba(250,204,21,0.18)",
            padding: "1.75rem",
            minHeight: 220,
            boxShadow:
              "0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
          }}
        >
          {/* Decorative mesh */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: "inherit",
          }}>
            {/* Large soft circle top-right */}
            <div style={{ position: "absolute", top: -80, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)" }} />
            {/* Smaller circle bottom-left */}
            <div style={{ position: "absolute", bottom: -50, left: 40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
            {/* Grid lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <p style={{ color: "rgba(250,204,21,0.75)", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", margin: 0 }}>
                CoinClass
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.1em", marginTop: 3 }}>
                Moeda Estudantil
              </p>
            </div>

            {/* Logo icon with pulse */}
            <div style={{ position: "relative" }}>
              <div className="pulse-ring" style={{
                position: "absolute", inset: -4, borderRadius: "1rem",
                border: "1px solid rgba(250,204,21,0.25)",
              }} />
              <div style={{
                width: 46, height: 46, borderRadius: "1rem",
                background: "linear-gradient(135deg, rgba(250,204,21,0.2) 0%, rgba(250,204,21,0.06) 100%)",
                border: "1px solid rgba(250,204,21,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.25rem",
                boxShadow: "0 4px 16px rgba(250,204,21,0.15)",
              }}>◈</div>
            </div>
          </div>

          {/* Balance */}
          <div style={{ marginTop: "1.5rem", position: "relative" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Saldo disponível
            </p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
              <p className="balance-glow" style={{
                color: "#facc15",
                fontWeight: 900,
                fontSize: "clamp(2.2rem,5vw,3rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                margin: 0,
              }}>
                {balance.toLocaleString("pt-BR")}
              </p>
              <span style={{ color: "rgba(250,204,21,0.45)", fontSize: "0.85rem", fontWeight: 600 }}>◈</span>
            </div>
            {/* Progress bar visual — decorative */}
            <div style={{ marginTop: "0.75rem", height: 3, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden", maxWidth: 160 }}>
              <div style={{ width: "60%", height: "100%", borderRadius: 2, background: "linear-gradient(90deg, rgba(250,204,21,0.7), rgba(250,204,21,0.3))" }} />
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>Titular</p>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", marginTop: 3 }}>
                {(currentUser.name || currentUser.nome || "ALUNO").toUpperCase()}
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", marginTop: 2 }}>{curso}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>RA</p>
              <p style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.88rem",
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: "0.22em",
                marginTop: 3,
              }}>
                {ra.toString().replace(/(.{4})/g, "$1 ").trim()}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom shadow */}
        <div style={{
          position: "absolute", bottom: -16, left: "8%", right: "8%",
          height: 24, borderRadius: "50%",
          background: "rgba(0,0,0,0.45)",
          filter: "blur(16px)",
          zIndex: -1,
        }} />
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div {...fade(0.2)}>
        <p style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
          paddingLeft: "0.25rem",
        }}>
          Ações rápidas
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {quickActions.map((a, i) => (
            <motion.button
              key={a.page}
              className="qa-btn"
              {...stagger(i)}
              onClick={() => onNavigate(a.page)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "0",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: FONT,
                width: "100%",
              }}
            >
              {/* Card bg — separate element so hover styles apply cleanly */}
              <div className="qa-bg" style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "0.875rem 1rem",
                borderRadius: "1.1rem",
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.07)",
                width: "100%",
                transition: "all 0.2s",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "0.75rem", flexShrink: 0,
                  background: a.accent,
                  border: `1px solid ${a.accentBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.05rem",
                }}>{a.icon}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600, fontSize: "0.83rem", margin: 0 }}>{a.label}</p>
                  <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.7rem", margin: "1px 0 0" }}>{a.sub}</p>
                </div>

                <span className="qa-arrow" style={{
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "0.85rem",
                  opacity: 0.5,
                }}>→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}