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

      {/* ── Balance hero card ── */}
      <motion.div {...fade(0.08)}>
        <div style={{
          position: "relative", overflow: "hidden",
          borderRadius: "1.5rem",
          background: "linear-gradient(135deg, rgba(250,204,21,0.18) 0%, rgba(30,58,95,0.6) 60%, rgba(15,23,42,0.8) 100%)",
          border: "1px solid rgba(250,204,21,0.2)",
          padding: "1.75rem 2rem",
        }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "rgba(250,204,21,0.08)", borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", position: "relative" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Saldo disponível
              </p>
              <p style={{ color: "white", fontWeight: 900, fontSize: "clamp(2.5rem,6vw,3.5rem)", lineHeight: 1, letterSpacing: "-0.03em", margin: 0 }}>
                {balance.toLocaleString("pt-BR")}
              </p>
              <p style={{ color: "rgba(250,204,21,0.7)", fontSize: "0.9rem", fontWeight: 600, marginTop: "0.35rem" }}>CoinWise ◈</p>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, padding: "0.25rem 0.6rem", borderRadius: "2rem" }}>
              ◈ Moeda estudantil
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>use suas moedas para resgatar vantagens</span>
          </div>
        </div>
      </motion.div>

      {/* ── Main grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem" }}
        className="dashboard-grid">
        <style>{`
          @media (max-width: 900px) { .dashboard-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        {/* Left: info do aluno */}
        <motion.div {...fade(0.14)} style={{ ...glass, padding: "1.5rem" }}>
          <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: "0 0 1.25rem" }}>
            Dados da conta
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Nome",         value: currentUser.name || currentUser.nome },
              { label: "Email",        value: currentUser.email },
              { label: "RA",           value: ra },
              { label: "CPF",          value: currentUser.cpf },
              { label: "Curso",        value: curso },
              { label: "Instituição",  value: instituicao },
              { label: "Endereço",     value: currentUser.endereco },
            ].filter(f => f.value).map(f => (
              <div key={f.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0.6rem 0.875rem",
                borderRadius: "0.75rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", fontWeight: 600 }}>{f.label}</span>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", fontWeight: 600 }}>{f.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Balance card */}
          <motion.div {...fade(0.18)} style={{
            position: "relative", overflow: "hidden",
            borderRadius: "1.25rem",
            background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(30,58,95,0.7))",
            border: "1px solid rgba(250,204,21,0.25)",
            padding: "1.5rem",
          }}>
            <div style={{ position: "absolute", bottom: -30, right: -30, width: 120, height: 120, background: "rgba(250,204,21,0.08)", borderRadius: "50%", filter: "blur(30px)" }} />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Saldo em moedas
            </p>
            <p style={{ color: "white", fontWeight: 900, fontSize: "3rem", lineHeight: 1, letterSpacing: "-0.04em", margin: "0 0 0.25rem" }}>
              {balance.toLocaleString("pt-BR")}
            </p>
            <p style={{ color: "#facc15", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.5rem" }}>◈ CoinWise</p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "0.75rem 0" }} />
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", lineHeight: 1.5 }}>
              Use suas moedas para resgatar vantagens exclusivas
            </p>
          </motion.div>

          {/* Quick actions */}
          <motion.div {...fade(0.22)} style={{ ...glass, padding: "1.25rem" }}>
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
      </div>
    </div>
  );
}