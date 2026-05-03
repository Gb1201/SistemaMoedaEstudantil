import { motion } from "framer-motion";
import { mockTransactions } from "../data/mockData";

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

// ── Inline TransactionRow ────────────────────────────────────────────────────
function TxRow({ tx, index }) {
  const isIn = tx.type === "received";
  return (
    <motion.div
      {...fade(index * 0.06)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "0.75rem 1rem",
        borderRadius: "0.875rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: FONT,
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: "0.625rem", flexShrink: 0,
        background: isIn ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
        border: `1px solid ${isIn ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.85rem", color: isIn ? "#4ade80" : "#f87171",
      }}>
        {isIn ? "▲" : "▼"}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", fontWeight: 600, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {tx.description || tx.message || "Transação"}
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>
          {tx.from || tx.company || "Sistema"} · {tx.date || "Recentemente"}
        </p>
      </div>
      <p style={{
        fontWeight: 800, fontSize: "0.875rem", flexShrink: 0,
        color: isIn ? "#4ade80" : "#f87171",
      }}>
        {isIn ? "+" : "-"}{tx.amount} ◈
      </p>
    </motion.div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function StudentDashboard({ currentUser, onNavigate }) {
  const myTx = mockTransactions.filter(tx => tx.studentId === currentUser.id).slice(0, 5);
  const received = myTx.filter(t => t.type === "received").reduce((s, t) => s + t.amount, 0);
  const spent    = myTx.filter(t => t.type === "spent").reduce((s, t) => s + t.amount, 0);

  const quickActions = [
    { icon: "🎁", label: "Resgatar vantagens", sub: "Catálogo de recompensas", page: "student-rewards" },
    { icon: "↕", label: "Ver extrato", sub: "Histórico completo", page: "student-transactions" },
    { icon: "◉", label: "Meu perfil", sub: "Editar informações", page: "student-profile" },
  ];

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: FONT,
      background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      minHeight: "100vh",
      padding: "1.5rem",
      margin: "-1.5rem",
      width: "calc(100% + 3rem)",
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
          Olá, {currentUser.name.split(" ")[0]} 👋
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
          RA: {currentUser.ra} · {currentUser.course}
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
          {/* Ambient glow */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "rgba(250,204,21,0.08)", borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", position: "relative" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Saldo disponível
              </p>
              <p style={{ color: "white", fontWeight: 900, fontSize: "clamp(2.5rem,6vw,3.5rem)", lineHeight: 1, letterSpacing: "-0.03em", margin: 0 }}>
                {currentUser.balance.toLocaleString("pt-BR")}
              </p>
              <p style={{ color: "rgba(250,204,21,0.7)", fontSize: "0.9rem", fontWeight: 600, marginTop: "0.35rem" }}>CoinWise ◈</p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { label: "Recebido", value: `+${received}`, color: "#4ade80" },
                { label: "Gasto", value: `-${spent}`, color: "#f87171" },
                { label: "Resgates", value: "2", color: "#facc15" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.875rem",
                  padding: "0.75rem 1rem",
                  textAlign: "center",
                  minWidth: 72,
                }}>
                  <p style={{ color: s.color, fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trend */}
          <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", fontSize: "0.72rem", fontWeight: 700, padding: "0.25rem 0.6rem", borderRadius: "2rem" }}>
              ▲ +175 esse mês
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>em relação ao mês anterior</span>
          </div>
        </div>
      </motion.div>

      {/* ── Main grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem" }}
        className="dashboard-grid">
        <style>{`
          @media (max-width: 900px) { .dashboard-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        {/* Left: transactions */}
        <motion.div {...fade(0.14)} style={{ ...glass, padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: 0 }}>Transações recentes</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 2 }}>{myTx.length} movimentações</p>
            </div>
            <button
              className="view-all"
              onClick={() => onNavigate("student-transactions")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontWeight: 600, fontFamily: FONT, transition: "color 0.2s" }}
            >
              Ver tudo →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {myTx.length > 0 ? myTx.map((tx, i) => (
              <TxRow key={tx.id} tx={tx} index={i} />
            )) : (
              <div style={{ textAlign: "center", padding: "3rem 0", color: "rgba(255,255,255,0.25)" }}>
                <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📭</p>
                <p style={{ fontSize: "0.85rem" }}>Nenhuma transação ainda</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Ranking card */}
          <motion.div {...fade(0.18)} style={{
            position: "relative", overflow: "hidden",
            borderRadius: "1.25rem",
            background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(30,58,95,0.7))",
            border: "1px solid rgba(250,204,21,0.25)",
            padding: "1.5rem",
          }}>
            <div style={{ position: "absolute", bottom: -30, right: -30, width: 120, height: 120, background: "rgba(250,204,21,0.08)", borderRadius: "50%", filter: "blur(30px)" }} />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Ranking da turma</p>
            <p style={{ color: "white", fontWeight: 900, fontSize: "3rem", lineHeight: 1, letterSpacing: "-0.04em", margin: "0 0 0.25rem" }}>#3</p>
            <p style={{ color: "#facc15", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.5rem" }}>🏆 Top da turma!</p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "0.75rem 0" }} />
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", lineHeight: 1.5 }}>
              Você está entre os melhores do semestre
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