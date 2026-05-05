import { motion } from "framer-motion";

// ── Shared Design Tokens ─────────────────────────────────────────────────────
const FONT = "'Sora', 'Nunito', sans-serif";

const glass = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "1.25rem",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function StudentDashboard({ currentUser, onNavigate }) {
  // Campos da API: nome, email, cpf, rg, ra, curso, instituicao, endereco
  // Fallbacks seguros para campos que podem não vir da API
  const firstName  = (currentUser.name || currentUser.nome || "Aluno").split(" ")[0];
  const ra         = currentUser.ra         || "—";
  const curso      = currentUser.curso      || currentUser.course || "—";
  const balance    = currentUser.balance    ?? 0;
  const instituicao = currentUser.instituicao || "—";

  const quickActions = [
    { icon: "🎁", label: "Resgatar vantagens", sub: "Catálogo de recompensas", page: "student-rewards" },
    { icon: "↕",  label: "Ver extrato",        sub: "Histórico completo",      page: "student-transactions" },
    { icon: "◉",  label: "Meu perfil",         sub: "Editar informações",      page: "student-profile" },
  ];

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: FONT,
      background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      minHeight: "100vh",
      padding: "1.5rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .qa-btn:hover { background: rgba(250,204,21,0.12) !important; border-color: rgba(250,204,21,0.35) !important; }
        .qa-btn:hover .qa-arrow { transform: translateX(4px); }
        .qa-arrow { transition: transform 0.2s; display: inline-block; }
        .view-all:hover { color: #facc15 !important; }
      `}</style>

      {/* ── Page header ── */}
      <motion.div {...fade(0)}>
        <p style={{ color: "rgba(250,204,21,0.7)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
          ◈ Visão geral
        </p>
        <h2 style={{ color: "white", fontWeight: 900, fontSize: "1.75rem", letterSpacing: "-0.02em", margin: 0 }}>
          Olá, {firstName} 👋
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
          RA: {ra} · {curso} · {instituicao}
        </p>
      </motion.div>

      {/* ── Bank Card ── */}
      <motion.div {...fade(0.08)} style={{ position: "relative" }}>
        <div style={{
          position: "relative", overflow: "hidden",
          borderRadius: "1.5rem",
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2744 40%, #0a1628 100%)",
          border: "1px solid rgba(250,204,21,0.2)",
          padding: "2rem",
          minHeight: 210,
          boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(250,204,21,0.07)", filter: "blur(1px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: 80, width: 140, height: 140, borderRadius: "50%", background: "rgba(59,130,246,0.08)", filter: "blur(1px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 20, right: 60, width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(250,204,21,0.12)", pointerEvents: "none" }} />

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
            <div>
              <p style={{ color: "rgba(250,204,21,0.6)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: FONT, margin: 0 }}>
                CoinClass
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", letterSpacing: "0.08em", fontFamily: FONT, marginTop: 2 }}>
                Moeda Estudantil
              </p>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: "0.875rem",
              background: "rgba(250,204,21,0.15)",
              border: "1px solid rgba(250,204,21,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.3rem",
            }}>◈</div>
          </div>

          {/* Balance */}
          <div style={{ marginTop: "1.5rem", position: "relative" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: FONT, marginBottom: "0.35rem" }}>
              Saldo disponível
            </p>
            <p style={{ color: "white", fontWeight: 900, fontSize: "clamp(2rem,5vw,2.75rem)", lineHeight: 1, letterSpacing: "-0.03em", fontFamily: FONT, margin: 0 }}>
              {balance.toLocaleString("pt-BR")}
            </p>
            <p style={{ color: "rgba(250,204,21,0.55)", fontSize: "0.82rem", fontWeight: 600, fontFamily: FONT, marginTop: "0.35rem" }}>
              moedas ◈
            </p>
          </div>

          {/* Bottom row — Nome · Curso · RA como número de cartão */}
          <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.62rem", letterSpacing: "0.08em", fontFamily: FONT, margin: 0 }}>TITULAR</p>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.88rem", fontWeight: 700, fontFamily: FONT, letterSpacing: "0.04em", marginTop: 2 }}>
                {(currentUser.name || currentUser.nome || "ALUNO").toUpperCase()}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", fontFamily: FONT, marginTop: 2 }}>{curso}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.62rem", letterSpacing: "0.08em", fontFamily: FONT, margin: 0 }}>RA</p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", fontWeight: 700, fontFamily: FONT, letterSpacing: "0.18em", marginTop: 2 }}>
                {ra.toString().replace(/(.{4})/g, "$1 ").trim()}
              </p>
            </div>
          </div>
        </div>
        {/* Card shadow */}
        <div style={{
          position: "absolute", bottom: -12, left: "5%", right: "5%",
          height: 20, borderRadius: "50%",
          background: "rgba(0,0,0,0.35)",
          filter: "blur(12px)",
          zIndex: -1,
        }} />
      </motion.div>

      {/* ── Quick actions ── */}
      <motion.div {...fade(0.18)} style={{ ...glass, padding: "1.25rem" }}>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
          Ações rápidas
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {quickActions.map(a => (
            <button
              key={a.page}
              className="qa-btn"
              onClick={() => onNavigate(a.page)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "0.75rem 1rem",
                borderRadius: "0.875rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.18s",
                fontFamily: FONT,
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "0.625rem", flexShrink: 0,
                background: "rgba(250,204,21,0.1)",
                border: "1px solid rgba(250,204,21,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem",
              }}>{a.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.82rem", margin: 0 }}>{a.label}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", margin: 0 }}>{a.sub}</p>
              </div>
              <span className="qa-arrow" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>→</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}