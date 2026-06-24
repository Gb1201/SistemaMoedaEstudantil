import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Trophy,
  Gift,
  ArrowUpDown,
  User,
  ChevronRight,
} from "lucide-react";
import { alunosApi } from "../../api/api";

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

// ── Podium Ranking ─────────────────────────────────────────────────────────────
function PodiumRanking({ currentUserId }) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    alunosApi.listar()
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = [...data]
            .sort((a, b) => (b.balance ?? b.saldo ?? 0) - (a.balance ?? a.saldo ?? 0))
            .slice(0, 3);
          setAlunos(sorted);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        setTimeout(() => setRevealed(true), 100);
      });
  }, [currentUserId]);

  // Reorder para pódio: 2º, 1º, 3º
  const podiumOrder = alunos.length === 3
    ? [alunos[1], alunos[0], alunos[2]]
    : alunos;

  const podiumConfig = [
    { place: 2, height: 80,  color: "#94a3b8", glow: "rgba(148,163,184,0.3)", medal: <Trophy size={18} strokeWidth={2.5} />, barDelay: 0.2 },
    { place: 1, height: 130, color: "#facc15", glow: "rgba(250,204,21,0.5)",  medal: <Trophy size={22} strokeWidth={2.5} />, barDelay: 0.0 },
    { place: 3, height: 55,  color: "#fb923c", glow: "rgba(251,146,60,0.3)",  medal: <Trophy size={16} strokeWidth={2.5} />, barDelay: 0.35 },
  ];

  const getInitials = (nome = "") =>
    nome.split(" ").map(p => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?";

  const isCurrentUser = (aluno) =>
    aluno?.id === currentUserId || aluno?.ra === currentUserId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.25rem",
        padding: "1.5rem 1.25rem 1.25rem",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", position: "relative" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.2rem", fontFamily: FONT, display: "flex", alignItems: "center", gap: "5px" }}>
              <Trophy size={11} strokeWidth={2.5} style={{ opacity: 0.7 }} /> Ranking
            </p>
          <p style={{ color: "white", fontWeight: 800, fontSize: "0.95rem", margin: 0, fontFamily: FONT }}>
            Top alunos
          </p>
        </div>
        <div style={{ background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: "2rem", padding: "0.25rem 0.75rem" }}>
          <p style={{ color: "rgba(250,204,21,0.8)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0, fontFamily: FONT }}>
            Por moedas ◈
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "1rem", height: 180, paddingBottom: "1rem" }}>
          {[80, 130, 55].map((h, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.06)", animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
              <div style={{ width: 88, borderRadius: "0.625rem 0.625rem 0 0", background: "rgba(255,255,255,0.04)", height: h, animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
            </div>
          ))}
          <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:.7}}`}</style>
        </div>
      ) : alunos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem 0", color: "rgba(255,255,255,0.25)", fontFamily: FONT, fontSize: "0.85rem" }}>
          Nenhum dado disponível ainda
        </div>
      ) : (
        <>
          {/* Pódio */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            {podiumOrder.map((aluno, idx) => {
              if (!aluno) return null;
              const cfg = podiumConfig[idx];
              const saldo = aluno.balance ?? aluno.saldo ?? 0;
              const isSelf = isCurrentUser(aluno);

              return (
                <div key={aluno.id || idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", flex: 1 }}>

                  {/* Medal */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={revealed ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18, delay: cfg.barDelay + 0.1 }}
                    style={{ color: cfg.color, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {cfg.medal}
                  </motion.div>

                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={revealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: cfg.barDelay + 0.15 }}
                    style={{ position: "relative" }}
                  >
                    <div style={{
                      width: cfg.place === 1 ? 52 : 44,
                      height: cfg.place === 1 ? 52 : 44,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${cfg.color}33, ${cfg.color}11)`,
                      border: `2.5px solid ${cfg.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: cfg.color,
                      fontWeight: 900,
                      fontSize: cfg.place === 1 ? "1rem" : "0.85rem",
                      fontFamily: FONT,
                      boxShadow: `0 0 16px ${cfg.glow}`,
                      position: "relative",
                    }}>
                      {getInitials(aluno.nome)}
                    </div>
                    {/* "Você" badge */}
                    {isSelf && (
                      <div style={{
                        position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                        background: "#facc15", color: "#0f172a",
                        fontSize: "0.48rem", fontWeight: 900, letterSpacing: "0.05em",
                        padding: "1px 5px", borderRadius: "999px",
                        whiteSpace: "nowrap", fontFamily: FONT,
                      }}>
                        VOCÊ
                      </div>
                    )}
                  </motion.div>

                  {/* Nome */}
                  <p style={{
                    color: isSelf ? "#facc15" : "rgba(255,255,255,0.7)",
                    fontSize: "0.68rem",
                    fontWeight: isSelf ? 800 : 600,
                    fontFamily: FONT,
                    textAlign: "center",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 90,
                  }}>
                    {aluno.nome?.split(" ")[0] || "—"}
                  </p>

                  {/* Barra do pódio */}
                  <div style={{ width: "100%", position: "relative" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={revealed ? { height: cfg.height } : { height: 0 }}
                      transition={{ duration: 0.7, delay: cfg.barDelay + 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: "100%",
                        borderRadius: "0.5rem 0.5rem 0 0",
                        background: isSelf
                          ? `linear-gradient(180deg, ${cfg.color} 0%, ${cfg.color}88 100%)`
                          : `linear-gradient(180deg, ${cfg.color}99 0%, ${cfg.color}44 100%)`,
                        boxShadow: isSelf ? `0 -4px 20px ${cfg.glow}` : "none",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingTop: "0.5rem",
                        overflow: "hidden",
                      }}
                    >
                      {/* Número da posição */}
                      <p style={{
                        color: cfg.place === 1 ? "#0f172a" : "rgba(255,255,255,0.6)",
                        fontWeight: 900,
                        fontSize: "0.75rem",
                        fontFamily: FONT,
                        margin: 0,
                      }}>
                        #{cfg.place}
                      </p>
                    </motion.div>
                  </div>

                  {/* Saldo */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: cfg.barDelay + 0.7 }}
                    style={{
                      color: cfg.color,
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      fontFamily: FONT,
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {saldo.toLocaleString("pt-BR")} ◈
                  </motion.p>
                </div>
              );
            })}
          </div>

          {/* Base do pódio */}
          <div style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", margin: "0 0 0.75rem" }} />

          {/* Posições 4+ (lista simples) */}
          {alunos.slice(3, 6).length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {alunos.slice(3, 6).map((aluno, i) => {
                const saldo = aluno.balance ?? aluno.saldo ?? 0;
                const isSelf = isCurrentUser(aluno);
                return (
                  <motion.div
                    key={aluno.id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.8 + i * 0.08 }}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.625rem",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.75rem",
                      background: isSelf ? "rgba(250,204,21,0.07)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isSelf ? "rgba(250,204,21,0.2)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <p style={{ color: "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: "0.68rem", fontFamily: FONT, width: 18, textAlign: "center", margin: 0 }}>#{i + 4}</p>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontWeight: 800, fontSize: "0.65rem", fontFamily: FONT, flexShrink: 0 }}>
                      {getInitials(aluno.nome)}
                    </div>
                    <p style={{ color: isSelf ? "#facc15" : "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.75rem", fontFamily: FONT, flex: 1, margin: 0 }}>
                      {aluno.nome?.split(" ")[0]} {isSelf && <span style={{ fontSize: "0.6rem", opacity: 0.7 }}>(você)</span>}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: "0.72rem", fontFamily: FONT, margin: 0 }}>{saldo.toLocaleString("pt-BR")} ◈</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function StudentDashboard({ currentUser, onNavigate }) {
  // Estado local para gerenciar os dados em tempo real do aluno logado
  const [currentStudentData, setCurrentStudentData] = useState(currentUser);

  useEffect(() => {
    // Busca a lista atualizada para pegar as moedas atuais e recalcular dinamicamente
    alunosApi.listar()
      .then(data => {
        if (Array.isArray(data)) {
          const userId = currentUser.id || currentUser.ra;
          const me = data.find(aluno => aluno.id === userId || aluno.ra === userId);
          if (me) {
            setCurrentStudentData(me);
          }
        }
      })
      .catch((err) => console.error("Erro ao atualizar saldo do dashboard", err));
  }, [currentUser]);

  const firstName   = (currentStudentData.name || currentStudentData.nome || "Aluno").split(" ")[0];
  const ra          = currentStudentData.ra          || "—";
  const curso       = currentStudentData.curso       || currentStudentData.course || "—";
  const balance     = currentStudentData.balance     ?? currentStudentData.saldo ?? 0;
  const instituicao = currentStudentData.instituicao || "—";

  const quickActions = [
    {
      icon: <Gift size={18} strokeWidth={2} />,
      label: "Resgatar vantagens",
      sub: "Catálogo de recompensas",
      page: "student-rewards",
      accent: "rgba(250,204,21,0.15)",
      accentBorder: "rgba(250,204,21,0.3)",
    },
    {
      icon: <ArrowUpDown size={18} strokeWidth={2} />,
      label: "Ver extrato",
      sub: "Histórico completo",
      page: "student-transactions",
      accent: "rgba(96,165,250,0.15)",
      accentBorder: "rgba(96,165,250,0.3)",
    },
    {
      icon: <User size={18} strokeWidth={2} />,
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
            Olá, {firstName}
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
                {(currentStudentData.name || currentStudentData.nome || "ALUNO").toUpperCase()}
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
                  opacity: 0.5,
                  display: "flex",
                  alignItems: "center",
                }}><ChevronRight size={16} strokeWidth={2} /></span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* ── Ranking ── */}
      <PodiumRanking currentUserId={currentUser?.id ?? currentUser?.ra} />

    </div>
  );
}