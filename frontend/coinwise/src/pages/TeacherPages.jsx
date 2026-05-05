import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockTeacherTransactions } from "../data/mockData";
import { alunosApi } from "../api/api";

// ── Design System ─────────────────────────────────────────────────────────────
const F = "'Sora','Nunito',sans-serif";
const fade = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.52, delay: d, ease: [0.22, 1, 0.36, 1] },
});
const G = {
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "1.25rem",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  },
};

// ── Shared input style ────────────────────────────────────────────────────────
const iStyle = {
  width: "100%", padding: "0.8rem 1rem",
  borderRadius: "0.875rem",
  border: "1.5px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "white", fontSize: "0.875rem",
  outline: "none", fontFamily: F,
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};
const lStyle = {
  color: "rgba(255,255,255,0.38)", fontSize: "0.68rem",
  fontWeight: 700, letterSpacing: "0.12em",
  textTransform: "uppercase", display: "block",
  marginBottom: "0.5rem", fontFamily: F,
};

// ── Page Header ───────────────────────────────────────────────────────────────
function PageHeader({ eyebrow, title, sub }) {
  return (
    <motion.div {...fade(0)}>
      <p style={{ color: "rgba(250,204,21,0.7)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.3rem", fontFamily: F }}>
        ◈ {eyebrow}
      </p>
      <h2 style={{ color: "white", fontWeight: 900, fontSize: "1.75rem", letterSpacing: "-0.02em", margin: "0 0 0.25rem", fontFamily: F }}>{title}</h2>
      <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.85rem", fontFamily: F }}>{sub}</p>
    </motion.div>
  );
}

// ── Virtual Card ──────────────────────────────────────────────────────────────
function VirtualCard({ balance, name, subject, label = "SALDO DISPONÍVEL" }) {
  return (
    <motion.div {...fade(0.08)} style={{ position: "relative" }}>
      {/* Card body */}
      <div style={{
        position: "relative", overflow: "hidden",
        borderRadius: "1.5rem",
        background: "linear-gradient(135deg, #1e3a5f 0%, #0f2744 40%, #0a1628 100%)",
        border: "1px solid rgba(250,204,21,0.2)",
        padding: "2rem",
        minHeight: 200,
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(250,204,21,0.07)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", bottom: -30, left: 80, width: 140, height: 140, borderRadius: "50%", background: "rgba(59,130,246,0.08)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", top: 20, right: 60, width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(250,204,21,0.12)" }} />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <div>
            <p style={{ color: "rgba(250,204,21,0.6)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: F }}>
              CoinClass
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", letterSpacing: "0.08em", fontFamily: F, marginTop: 2 }}>
              {subject || "Plataforma Escolar"}
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
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.35rem" }}>
            {label}
          </p>
          <p style={{ color: "white", fontWeight: 900, fontSize: "clamp(2rem,5vw,2.75rem)", lineHeight: 1, letterSpacing: "-0.03em", fontFamily: F }}>
            {typeof balance === "number" ? balance.toLocaleString("pt-BR") : balance}
          </p>
          <p style={{ color: "rgba(250,204,21,0.55)", fontSize: "0.82rem", fontWeight: 600, fontFamily: F, marginTop: "0.35rem" }}>
            moedas ◈
          </p>
        </div>

        {/* Bottom row */}
        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.62rem", letterSpacing: "0.08em", fontFamily: F }}>TITULAR</p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", fontWeight: 700, fontFamily: F, letterSpacing: "0.04em" }}>
              {name?.toUpperCase() || "—"}
            </p>
          </div>
          {/* Chip decoration */}
          <div style={{
            width: 40, height: 30, borderRadius: "0.375rem",
            background: "linear-gradient(135deg, rgba(250,204,21,0.4), rgba(250,204,21,0.15))",
            border: "1px solid rgba(250,204,21,0.3)",
          }} />
        </div>
      </div>

      {/* Card reflection/shadow */}
      <div style={{
        position: "absolute", bottom: -12, left: "5%", right: "5%",
        height: 20, borderRadius: "50%",
        background: "rgba(0,0,0,0.35)",
        filter: "blur(12px)",
        zIndex: -1,
      }} />
    </motion.div>
  );
}

// ── Tx Row ────────────────────────────────────────────────────────────────────
function TxRow({ tx, to, index }) {
  return (
    <motion.div
      {...fade(index * 0.05)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "0.85rem 1rem",
        borderRadius: "0.875rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: F,
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: "0.625rem", flexShrink: 0,
        background: "rgba(250,204,21,0.1)",
        border: "1px solid rgba(250,204,21,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.9rem",
      }}>◈</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.82rem", fontWeight: 600, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {tx.message || "Envio de moedas"}
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>
          Para: {to || tx.to} · {tx.date || "Recentemente"}
        </p>
      </div>
      <p style={{ color: "#facc15", fontWeight: 800, fontSize: "0.875rem", flexShrink: 0 }}>
        +{tx.amount} ◈
      </p>
    </motion.div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({ icon, label, value, delay }) {
  return (
    <motion.div {...fade(delay)} style={{ ...G.card, padding: "1.25rem", textAlign: "center" }}>
      <p style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{icon}</p>
      <p style={{ color: "white", fontWeight: 900, fontSize: "1.6rem", letterSpacing: "-0.02em", lineHeight: 1, fontFamily: F }}>{value}</p>
      <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.7rem", marginTop: "0.35rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: F }}>{label}</p>
    </motion.div>
  );
}

// ── Student Card (carrossel) ──────────────────────────────────────────────────
function StudentCard({ aluno, index }) {
  const colors = [
    { bg: "rgba(250,204,21,0.08)", border: "rgba(250,204,21,0.22)", accent: "#facc15", badge: "rgba(250,204,21,0.15)" },
    { bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.22)", accent: "#60a5fa", badge: "rgba(96,165,250,0.15)" },
    { bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.22)", accent: "#34d399", badge: "rgba(52,211,153,0.15)" },
    { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.22)", accent: "#a78bfa", badge: "rgba(167,139,250,0.15)" },
    { bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.22)", accent: "#fb923c", badge: "rgba(251,146,60,0.15)" },
  ];
  const c = colors[index % colors.length];
  const initials = aluno.nome?.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() || "?";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${c.border}` }}
      style={{
        flexShrink: 0,
        width: 200,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: "1.25rem",
        padding: "1.25rem",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.25s",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Decorative blob */}
      <div style={{
        position: "absolute", top: -24, right: -24,
        width: 80, height: 80, borderRadius: "50%",
        background: c.accent, opacity: 0.07, filter: "blur(2px)",
        pointerEvents: "none",
      }} />

      {/* Avatar */}
      <div style={{
        width: 48, height: 48, borderRadius: "0.875rem",
        background: c.badge,
        border: `1.5px solid ${c.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: c.accent, fontWeight: 900, fontSize: "1rem",
        fontFamily: F, marginBottom: "1rem",
        position: "relative",
      }}>{initials}</div>

      {/* Nome */}
      <p style={{
        color: "rgba(255,255,255,0.9)", fontWeight: 700,
        fontSize: "0.85rem", fontFamily: F,
        marginBottom: "0.3rem", lineHeight: 1.3,
        overflow: "hidden", display: "-webkit-box",
        WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
      }}>{aluno.nome}</p>

      {/* Curso */}
      <p style={{
        color: "rgba(255,255,255,0.38)", fontSize: "0.7rem",
        fontFamily: F, marginBottom: "0.875rem",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>{aluno.curso}</p>

      {/* RA badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        padding: "0.3rem 0.625rem",
        borderRadius: "2rem",
        background: c.badge,
        border: `1px solid ${c.border}`,
      }}>
        <span style={{ color: c.accent, fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em", fontFamily: F }}>RA</span>
        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.7rem", fontWeight: 700, fontFamily: F }}>{aluno.ra}</span>
      </div>
    </motion.div>
  );
}

// ── Students Carousel ─────────────────────────────────────────────────────────
function StudentsCarousel() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    alunosApi.listar()
      .then(data => setAlunos(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message || "Erro ao carregar alunos"))
      .finally(() => setLoading(false));
  }, []);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => { el.removeEventListener("scroll", updateArrows); window.removeEventListener("resize", updateArrows); };
  }, [alunos]);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <motion.div {...fade(0.26)} style={{ ...G.card, padding: "1.5rem" }}>
      <style>{`
        .carousel-track { scrollbar-width:none; }
        .carousel-track::-webkit-scrollbar { display:none; }
        .arr-btn { transition: all 0.18s; }
        .arr-btn:hover { background:rgba(250,204,21,0.2)!important; border-color:rgba(250,204,21,0.4)!important; color:#facc15!important; }
        .arr-btn:disabled { opacity:0.2!important; cursor:not-allowed!important; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: 0, fontFamily: F }}>Alunos da turma</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 2, fontFamily: F }}>
            {loading ? "Carregando..." : error ? "Erro ao carregar" : `${alunos.length} aluno${alunos.length !== 1 ? "s" : ""} encontrado${alunos.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["←", "→"].map((arrow, i) => (
            <button
              key={arrow}
              onClick={() => scroll(i === 0 ? -1 : 1)}
              disabled={i === 0 ? !canLeft : !canRight}
              className="arr-btn"
              style={{
                width: 34, height: 34, borderRadius: "0.625rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer", fontFamily: F,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem",
              }}
            >{arrow}</button>
          ))}
        </div>
      </div>

      {/* Track */}
      {loading ? (
        <div style={{ display: "flex", gap: "1rem", overflow: "hidden" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              flexShrink: 0, width: 200, height: 160,
              borderRadius: "1.25rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              animation: "pulse 1.5s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }} />
          ))}
          <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "2rem 0", color: "rgba(255,255,255,0.3)", fontFamily: F }}>
          <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚠️</p>
          <p style={{ fontSize: "0.85rem" }}>{error}</p>
        </div>
      ) : alunos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem 0", color: "rgba(255,255,255,0.3)", fontFamily: F }}>
          <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👨‍🎓</p>
          <p style={{ fontSize: "0.85rem" }}>Nenhum aluno encontrado</p>
        </div>
      ) : (
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.5rem" }}
        >
          {alunos.map((aluno, i) => (
            <StudentCard key={aluno.ra || i} aluno={aluno} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TeacherDashboard
// ═══════════════════════════════════════════════════════════════════════════════
export function TeacherDashboard({ currentUser, onNavigate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem", width: "calc(100% + 3rem)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .teacher-input:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; }
        .t-btn:hover { background:rgba(250,204,21,.12)!important; border-color:rgba(250,204,21,.35)!important; }
        .t-btn:hover .arr { transform:translateX(4px); }
        .arr { transition:transform .2s; display:inline-block; }
        .val-btn:hover { color:rgba(255,255,255,.8)!important; }
      `}</style>

      <PageHeader eyebrow="Professor" title={`Olá, ${currentUser.name.split(" ")[0]} 👋`} sub={`${currentUser.subject || "Disciplina"} · ${mockTeacherTransactions.length} reconhecimentos feitos`} />

      {/* Virtual Card */}
      <VirtualCard balance={currentUser.balance} name={currentUser.name} subject={currentUser.subject} label="MOEDAS DISPONÍVEIS" />

      {/* Main grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* Recent sends */}
        <motion.div {...fade(0.18)} style={{ ...G.card, padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: 0, fontFamily: F }}>Últimos envios</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 2, fontFamily: F }}>Reconhecimentos recentes</p>
            </div>
            <button
              className="val-btn"
              onClick={() => onNavigate("teacher-transactions")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontWeight: 600, fontFamily: F, transition: "color 0.18s" }}
            >
              Ver tudo →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {mockTeacherTransactions.slice(0, 4).map((tx, i) => (
              <TxRow key={tx.id} tx={tx} to={tx.to} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Students Carousel — dados reais da API */}
        <StudentsCarousel />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SendCoinsPage
// ═══════════════════════════════════════════════════════════════════════════════
export function SendCoinsPage({ currentUser }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(true);
  const [errorAlunos, setErrorAlunos] = useState(null);

  useEffect(() => {
    alunosApi.listar()
      .then(data => setAlunos(Array.isArray(data) ? data : []))
      .catch(err => setErrorAlunos(err.message || "Erro ao carregar alunos"))
      .finally(() => setLoadingAlunos(false));
  }, []);

  const filtered = alunos.filter(s =>
    (s.nome || s.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.ra || "").includes(search)
  );

  const canSubmit = selectedStudent && amount && message;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setConfirmOpen(true);
  };

  const confirmSend = () => {
    setConfirmOpen(false);
    setSuccess(true);
    setSelectedStudent(null);
    setAmount("");
    setMessage("");
    setSearch("");
    setTimeout(() => setSuccess(false), 4000);
  };

  const steps = [
    { num: "01", label: "Aluno" },
    { num: "02", label: "Valor" },
    { num: "03", label: "Mensagem" },
  ];
  const activeStep = !selectedStudent ? 0 : !amount ? 1 : 2;

  return (
    <div style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem", width: "calc(100% + 3rem)" }}><div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 720, fontFamily: F }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .sc-input:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; outline:none; }
        .sc-input::placeholder { color:rgba(255,255,255,0.22); }
        .sc-textarea::placeholder { color:rgba(255,255,255,0.22); }
        .sc-textarea:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; outline:none; }
        .s-row:hover { background:rgba(255,255,255,.07)!important; border-color:rgba(255,255,255,.14)!important; }
        .s-row.selected { background:rgba(250,204,21,.08)!important; border-color:rgba(250,204,21,.4)!important; }
        .q-chip { cursor:pointer; transition:all .15s; }
        .q-chip:hover { background:rgba(250,204,21,.2)!important; border-color:rgba(250,204,21,.5)!important; color:#facc15!important; }
        .q-chip.active { background:rgba(250,204,21,.18)!important; border-color:rgba(250,204,21,.5)!important; color:#facc15!important; }
      `}</style>

      <PageHeader eyebrow="Professor" title="Enviar Moedas" sub="Reconheça o mérito e dedicação dos seus alunos" />

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "1rem 1.25rem",
              borderRadius: "1rem",
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.3)",
              fontFamily: F,
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>🎉</span>
            <div>
              <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Moedas enviadas com sucesso!</p>
              <p style={{ color: "rgba(74,222,128,.6)", fontSize: "0.78rem", margin: 0 }}>O aluno será notificado imediatamente.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress steps */}
      <motion.div {...fade(0.06)} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: "flex", alignItems: "center", gap: "8px", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: i < activeStep ? "rgba(34,197,94,0.9)" : i === activeStep ? "rgba(250,204,21,0.9)" : "rgba(255,255,255,0.08)",
              border: `2px solid ${i < activeStep ? "rgba(34,197,94,0.4)" : i === activeStep ? "rgba(250,204,21,0.4)" : "rgba(255,255,255,0.1)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}>
              {i < activeStep
                ? <span style={{ color: "white", fontSize: "0.8rem" }}>✓</span>
                : <span style={{ color: i === activeStep ? "#1e3a5f" : "rgba(255,255,255,0.3)", fontSize: "0.72rem", fontWeight: 800, fontFamily: F }}>{s.num}</span>
              }
            </div>
            <span style={{ color: i === activeStep ? "rgba(250,204,21,0.8)" : i < activeStep ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.25)", fontSize: "0.72rem", fontWeight: 700, fontFamily: F, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {s.label}
            </span>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: i < activeStep ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />}
          </div>
        ))}
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "1.25rem" }} className="sc-grid">
        <style>{`.sc-grid{@media(max-width:720px){grid-template-columns:1fr!important}}`}</style>

        {/* Form */}
        <motion.div {...fade(0.1)} style={{ ...G.card, padding: "1.75rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Step 1 – Student */}
            <div>
              <label style={lStyle}>01 — Selecionar aluno</label>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nome ou RA..."
                className="sc-input"
                style={{ ...iStyle, marginBottom: "0.625rem" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", maxHeight: 200, overflowY: "auto" }}>
                {loadingAlunos ? (
                  <div style={{ padding: "1rem", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", fontFamily: F }}>
                    Carregando alunos...
                  </div>
                ) : errorAlunos ? (
                  <div style={{ padding: "1rem", textAlign: "center", color: "#f87171", fontSize: "0.82rem", fontFamily: F }}>
                    ⚠️ {errorAlunos}
                  </div>
                ) : filtered.length === 0 ? (
                  <div style={{ padding: "1rem", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", fontFamily: F }}>
                    Nenhum aluno encontrado
                  </div>
                ) : filtered.map(s => {
                  const nome = s.nome || s.name || "";
                  const initials = nome.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() || "?";
                  const isSelected = selectedStudent?.ra === s.ra;
                  return (
                    <button
                      type="button" key={s.ra || s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={`s-row${isSelected ? " selected" : ""}`}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "0.65rem 0.875rem",
                        borderRadius: "0.75rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1.5px solid rgba(255,255,255,0.08)",
                        cursor: "pointer", textAlign: "left",
                        transition: "all 0.15s", fontFamily: F,
                      }}
                    >
                      <div style={{
                        width: 34, height: 34, borderRadius: "0.625rem", flexShrink: 0,
                        background: isSelected ? "rgba(250,204,21,0.2)" : "rgba(255,255,255,0.07)",
                        border: `1px solid ${isSelected ? "rgba(250,204,21,0.4)" : "rgba(255,255,255,0.1)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isSelected ? "#facc15" : "rgba(255,255,255,0.5)",
                        fontWeight: 800, fontSize: "0.8rem", fontFamily: F,
                      }}>{initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.82rem", margin: 0, fontFamily: F }}>{nome}</p>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontFamily: F }}>{s.curso || s.course} · RA: {s.ra}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 – Amount */}
            <div>
              <label style={lStyle}>02 — Quantidade de moedas</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#facc15", fontWeight: 900, fontSize: "1.1rem", pointerEvents: "none" }}>◈</span>
                <input
                  type="number" value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Quantidade" min="1" max={currentUser.balance}
                  className="sc-input"
                  style={{ ...iStyle, paddingLeft: "2.5rem" }}
                />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.625rem", flexWrap: "wrap" }}>
                {[10, 25, 50, 100, 200].map(v => (
                  <button
                    type="button" key={v}
                    onClick={() => setAmount(String(v))}
                    className={`q-chip${amount === String(v) ? " active" : ""}`}
                    style={{
                      padding: "0.35rem 0.875rem",
                      borderRadius: "2rem",
                      border: "1.5px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.78rem", fontWeight: 700, fontFamily: F,
                    }}
                  >{v}</button>
                ))}
              </div>
            </div>

            {/* Step 3 – Message */}
            <div>
              <label style={lStyle}>03 — Mensagem de reconhecimento</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Descreva o motivo do reconhecimento..."
                rows={4}
                className="sc-textarea"
                style={{
                  ...iStyle, resize: "none", lineHeight: 1.6,
                  padding: "0.875rem 1rem",
                }}
              />
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", fontFamily: F, marginTop: "0.25rem", textAlign: "right" }}>
                {message.length}/500
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.02, boxShadow: "0 0 28px rgba(250,204,21,0.35)" } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
              style={{
                padding: "0.9rem",
                borderRadius: "0.875rem", border: "none",
                background: canSubmit ? "linear-gradient(135deg, #facc15, #f59e0b)" : "rgba(255,255,255,0.08)",
                color: canSubmit ? "#1e3a5f" : "rgba(255,255,255,0.25)",
                fontWeight: 800, fontSize: "0.95rem",
                cursor: canSubmit ? "pointer" : "not-allowed",
                fontFamily: F, transition: "all 0.2s",
                boxShadow: canSubmit ? "0 8px 24px rgba(250,204,21,0.2)" : "none",
              }}
            >
              {canSubmit ? "Enviar Moedas →" : "Preencha todos os campos"}
            </motion.button>
          </form>
        </motion.div>

        {/* Preview sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Balance card small */}
          <motion.div {...fade(0.16)} style={{ ...G.card, padding: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.5rem" }}>Seu saldo</p>
            <p style={{ color: "white", fontWeight: 900, fontSize: "1.75rem", letterSpacing: "-0.02em", fontFamily: F, margin: 0 }}>{currentUser.balance}</p>
            <p style={{ color: "rgba(250,204,21,0.55)", fontSize: "0.78rem", fontFamily: F }}>moedas disponíveis</p>
            {amount && (
              <div style={{ marginTop: "0.875rem", paddingTop: "0.875rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontFamily: F, marginBottom: "0.25rem" }}>Após o envio</p>
                <p style={{ color: currentUser.balance - Number(amount) >= 0 ? "#4ade80" : "#f87171", fontWeight: 800, fontSize: "1.25rem", fontFamily: F }}>
                  {currentUser.balance - Number(amount)} ◈
                </p>
              </div>
            )}
          </motion.div>

          {/* Selected student preview */}
          <AnimatePresence>
            {selectedStudent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ ...G.card, padding: "1.25rem" }}
              >
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.875rem" }}>Aluno selecionado</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "0.75rem",
                    background: "rgba(250,204,21,0.15)",
                    border: "1px solid rgba(250,204,21,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#facc15", fontWeight: 800, fontFamily: F,
                  }}>{(selectedStudent.nome || selectedStudent.name || "").split(" ").map(p => p[0]).slice(0,2).join("").toUpperCase()}</div>
                  <div>
                    <p style={{ color: "white", fontWeight: 700, fontSize: "0.85rem", fontFamily: F, margin: 0 }}>{selectedStudent.nome || selectedStudent.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", fontFamily: F }}>RA: {selectedStudent.ra}</p>
                  </div>
                </div>
                {amount && (
                  <div style={{
                    marginTop: "0.875rem", padding: "0.75rem",
                    borderRadius: "0.75rem",
                    background: "rgba(250,204,21,0.08)",
                    border: "1px solid rgba(250,204,21,0.2)",
                    textAlign: "center",
                  }}>
                    <p style={{ color: "#facc15", fontWeight: 900, fontSize: "1.5rem", fontFamily: F, margin: 0 }}>+{amount}</p>
                    <p style={{ color: "rgba(250,204,21,0.55)", fontSize: "0.72rem", fontFamily: F }}>moedas para receber</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confirm modal overlay */}
      <AnimatePresence>
        {confirmOpen && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(10,20,40,0.75)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              zIndex: 50,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "linear-gradient(160deg, #0f172a 0%, #1a2f50 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                padding: "2rem",
                maxWidth: 400, width: "100%",
                boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                fontFamily: F,
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #facc15, #f59e0b)", borderRadius: "1.5rem 1.5rem 0 0" }} />

              <p style={{ color: "rgba(250,204,21,0.7)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Confirmar envio</p>
              <h3 style={{ color: "white", fontWeight: 900, fontSize: "1.25rem", margin: "0 0 1.5rem" }}>Tudo certo?</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.875rem 1rem", borderRadius: "0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "0.625rem", background: "rgba(250,204,21,0.15)", border: "1px solid rgba(250,204,21,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#facc15", fontWeight: 800, fontFamily: F }}>{(selectedStudent.nome || selectedStudent.name || "").split(" ").map(p => p[0]).slice(0,2).join("").toUpperCase()}</div>
                  <div>
                    <p style={{ color: "white", fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>Para: {selectedStudent.nome || selectedStudent.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem" }}>{selectedStudent.curso || selectedStudent.course}</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                  <div style={{ padding: "0.875rem", borderRadius: "0.875rem", background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.2)", textAlign: "center" }}>
                    <p style={{ color: "#facc15", fontWeight: 900, fontSize: "1.75rem", margin: 0 }}>{amount}</p>
                    <p style={{ color: "rgba(250,204,21,0.5)", fontSize: "0.7rem" }}>moedas</p>
                  </div>
                  <div style={{ padding: "0.875rem", borderRadius: "0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 900, fontSize: "1.75rem", margin: 0 }}>{currentUser.balance - Number(amount)}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>saldo restante</p>
                  </div>
                </div>
                <div style={{ padding: "0.875rem 1rem", borderRadius: "0.875rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", marginBottom: "0.3rem" }}>Mensagem</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", fontStyle: "italic" }}>"{message}"</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button onClick={() => setConfirmOpen(false)} style={{ flex: 1, padding: "0.8rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}>Cancelar</button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={confirmSend}
                  style={{ flex: 2, padding: "0.8rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #facc15, #f59e0b)", color: "#1e3a5f", fontWeight: 800, fontSize: "0.9rem", cursor: "pointer", fontFamily: F }}
                >Enviar agora →</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TeacherTransactions
// ═══════════════════════════════════════════════════════════════════════════════
export function TeacherTransactions({ currentUser }) {
  const totalSent = mockTeacherTransactions.reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem", width: "calc(100% + 3rem)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');`}</style>

      <PageHeader eyebrow="Professor" title="Histórico de Envios" sub="Todos os reconhecimentos que você realizou" />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
        {[
          { label: "Total enviado", value: totalSent, color: "#a78bfa", delay: 0.08 },
          { label: "Envios feitos", value: mockTeacherTransactions.length, color: "#60a5fa", delay: 0.12 },
          { label: "Saldo restante", value: currentUser.balance, color: "#facc15", delay: 0.16 },
        ].map(s => (
          <motion.div key={s.label} {...fade(s.delay)} style={{ ...G.card, padding: "1.25rem", textAlign: "center" }}>
            <p style={{ color: s.color, fontWeight: 900, fontSize: "1.75rem", letterSpacing: "-0.02em", fontFamily: F, lineHeight: 1 }}>{s.value}</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: F }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* List */}
      <motion.div {...fade(0.2)} style={{ ...G.card, padding: "1.5rem" }}>
        <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", fontFamily: F, marginBottom: "1.25rem" }}>Todos os envios</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {mockTeacherTransactions.map((tx, i) => (
            <TxRow key={tx.id} tx={tx} to={tx.to} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}