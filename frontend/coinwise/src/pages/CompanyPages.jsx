import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import Modal from "../components/Modal";
import { empresasApi, vantagensApi } from "../api/api";

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

// ── Normaliza campos da API para o padrão interno do componente ───────────────
// A API retorna: { id, nome, custo, descricao, categoria, ativo, imagemUrl, ... }
// Os componentes esperam: { id, name, cost, description, category, available, image, totalRedeemed }
function normalizeVantagem(v) {
  return {
    ...v,
    name:          v.name          ?? v.nome        ?? "",
    cost:          v.cost          ?? v.custo        ?? 0,
    description:   v.description   ?? v.descricao    ?? "",
    category:      v.category      ?? v.categoria    ?? "",
    available:     v.available     ?? v.ativo        ?? true,
    image:         v.image         ?? v.imagemUrl    ?? "🎁",
    totalRedeemed: v.totalRedeemed ?? v.resgates     ?? 0,
  };
}

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

// ── Virtual Company Card ──────────────────────────────────────────────────────
function CompanyCard({ user }) {
  return (
    <motion.div {...fade(0.08)} style={{ position: "relative" }}>
      <div style={{
        position: "relative", overflow: "hidden",
        borderRadius: "1.5rem",
        background: "linear-gradient(135deg, #0d2d1f 0%, #0a1f16 40%, #061410 100%)",
        border: "1px solid rgba(52,211,153,0.2)",
        padding: "2rem",
        minHeight: 200,
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(52,211,153,0.07)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", bottom: -30, left: 100, width: 150, height: 150, borderRadius: "50%", background: "rgba(250,204,21,0.05)", filter: "blur(1px)" }} />
        <div style={{ position: "absolute", top: 30, right: 80, width: 70, height: 70, borderRadius: "50%", border: "1px solid rgba(52,211,153,0.12)" }} />

        {/* Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
          <div>
            <p style={{ color: "rgba(52,211,153,0.65)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: F }}>CoinClass</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", letterSpacing: "0.06em", fontFamily: F, marginTop: 2 }}>Empresa Parceira</p>
          </div>
          <div style={{
            padding: "0.35rem 0.75rem",
            borderRadius: "2rem",
            background: "rgba(52,211,153,0.12)",
            border: "1px solid rgba(52,211,153,0.3)",
          }}>
            <span style={{ color: "rgba(52,211,153,0.9)", fontSize: "0.72rem", fontWeight: 700, fontFamily: F }}>{user.category || "Parceiro"}</span>
          </div>
        </div>

        {/* Avatar + name */}
        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "14px", position: "relative" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "1rem",
            background: "rgba(52,211,153,0.12)",
            border: "1px solid rgba(52,211,153,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.6rem",
          }}>{user.avatar}</div>
          <div>
            <p style={{ color: "white", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.01em", fontFamily: F, margin: 0 }}>{user.name}</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", fontFamily: F, marginTop: 2 }}>{user.description || "Empresa parceira da plataforma"}</p>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.62rem", letterSpacing: "0.08em", fontFamily: F }}>TITULAR</p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", fontWeight: 700, fontFamily: F, letterSpacing: "0.04em" }}>{user.name?.toUpperCase()}</p>
          </div>
          <div style={{
            width: 40, height: 30, borderRadius: "0.375rem",
            background: "linear-gradient(135deg, rgba(52,211,153,0.35), rgba(52,211,153,0.1))",
            border: "1px solid rgba(52,211,153,0.3)",
          }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: -12, left: "5%", right: "5%", height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.35)", filter: "blur(12px)", zIndex: -1 }} />
    </motion.div>
  );
}

// ── Reward list item ──────────────────────────────────────────────────────────
function RewardRow({ reward, index }) {
  const imgSrc = reward.imagemBase64
    ? `data:${reward.imagemTipo || "image/png"};base64,${reward.imagemBase64}`
    : null;

  return (
    <motion.div
      {...fade(index * 0.05)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "0.875rem 1rem",
        borderRadius: "0.875rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: F,
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: "0.75rem", flexShrink: 0,
        background: "rgba(52,211,153,0.1)",
        border: "1px solid rgba(52,211,153,0.2)",
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.2rem",
      }}>
        {imgSrc
          ? <img src={imgSrc} alt={reward.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : "🎁"
        }
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.82rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{reward.name}</p>
        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.7rem" }}>{reward.totalRedeemed} resgates · {reward.cost} ◈</p>
      </div>
      <span style={{
        padding: "0.25rem 0.7rem",
        borderRadius: "2rem",
        background: reward.available ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${reward.available ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
        color: reward.available ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.3)",
        fontSize: "0.68rem", fontWeight: 700, flexShrink: 0,
      }}>
        {reward.available ? "Ativo" : "Esgotado"}
      </span>
    </motion.div>
  );
}

// ── Chart Tooltip ─────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, unit = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(6,20,16,0.97)",
      border: "1px solid rgba(52,211,153,0.25)",
      borderRadius: "0.75rem",
      padding: "0.75rem 1rem",
      fontFamily: F,
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      {label && <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.375rem" }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "rgba(52,211,153,0.9)", fontWeight: 800, fontSize: "1rem", margin: 0 }}>
          {p.value}{unit && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", fontWeight: 500 }}> {unit}</span>}
        </p>
      ))}
    </div>
  );
}

// ── Chart: Resgates por semana (área) ─────────────────────────────────────────
function RedeemAreaChart({ rewards }) {
  // Distribui resgates ficticiamente pelas últimas 6 semanas
  const total = rewards.reduce((s, r) => s + r.totalRedeemed, 0);
  const base = Math.floor(total / 6);
  const weeks = Array.from({ length: 6 }, (_, i) => ({
    semana: `S${i + 1}`,
    resgates: base + Math.round((Math.sin(i * 1.2) * base * 0.4)),
  }));

  return (
    <motion.div {...fade(0.24)} style={{ ...G.card, padding: "1.5rem" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: 0, fontFamily: F }}>Resgates semanais</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 2, fontFamily: F }}>Evolução dos resgates nas últimas semanas</p>
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <AreaChart data={weeks} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="semana" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11, fontFamily: F }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11, fontFamily: F }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit="resgates" />} cursor={{ stroke: "rgba(52,211,153,0.2)", strokeWidth: 1 }} />
          <Area type="monotone" dataKey="resgates" stroke="rgba(52,211,153,0.85)" strokeWidth={2.5} fill="url(#greenGrad)"
            dot={{ fill: "rgba(52,211,153,0.9)", r: 4, strokeWidth: 0 }}
            activeDot={{ fill: "#34d399", r: 6, stroke: "rgba(52,211,153,0.3)", strokeWidth: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ── Chart: Top vantagens (barras horizontais) ─────────────────────────────────
function TopRewardsChart({ rewards }) {
  const data = [...rewards]
    .sort((a, b) => b.totalRedeemed - a.totalRedeemed)
    .slice(0, 5)
    .map(r => ({ nome: r.name.length > 14 ? r.name.slice(0, 13) + "…" : r.name, resgates: r.totalRedeemed }));

  const COLORS = ["rgba(52,211,153,0.9)", "#facc15", "#60a5fa", "#a78bfa", "#fb923c"];

  return (
    <motion.div {...fade(0.28)} style={{ ...G.card, padding: "1.5rem" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: 0, fontFamily: F }}>Top vantagens</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 2, fontFamily: F }}>Mais resgatadas pelos alunos</p>
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }} barCategoryGap="22%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11, fontFamily: F }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="nome" width={90} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: F }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip unit="resgates" />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="resgates" radius={[0, 6, 6, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// ── Chart: Pizza ativo vs esgotado ────────────────────────────────────────────
function StatusPieChart({ rewards }) {
  const active = rewards.filter(r => r.available).length;
  const inactive = rewards.length - active;
  const data = [
    { name: "Ativas", value: active },
    { name: "Esgotadas", value: inactive },
  ];
  const COLORS = ["rgba(52,211,153,0.9)", "rgba(255,255,255,0.12)"];

  return (
    <motion.div {...fade(0.26)} style={{ ...G.card, padding: "1.5rem", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "1rem" }}>
        <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: 0, fontFamily: F }}>Status das vantagens</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 2, fontFamily: F }}>{active} de {rewards.length} ativas</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <ResponsiveContainer width={110} height={110}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={33} outerRadius={50} paddingAngle={3} dataKey="value" strokeWidth={0}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip content={<ChartTooltip unit="vantagens" />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS[i], flexShrink: 0 }} />
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem", fontFamily: F, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{d.name}</p>
                <p style={{ color: "white", fontWeight: 800, fontSize: "0.95rem", fontFamily: F, margin: 0 }}>{d.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CompanyDashboard
// ═══════════════════════════════════════════════════════════════════════════════
const POLL_INTERVAL_MS = 30_000; // atualiza automaticamente a cada 30 segundos

export function CompanyDashboard({ currentUser, onNavigate }) {
  const [myRewards,   setMyRewards]   = useState([]);
  const [refreshing,  setRefreshing]  = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // ── Carrega / re-carrega as vantagens da empresa ──────────────────────────
  const fetchRewards = async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const data = await vantagensApi.listarPorEmpresa(currentUser.id);
      setMyRewards((data ?? []).map(normalizeVantagem));
      setLastUpdated(new Date());
    } catch {
      /* silencia erros de polling para não interromper a UX */
    } finally {
      if (!silent) setRefreshing(false);
    }
  };

  // Carga inicial + polling automático
  useEffect(() => {
    fetchRewards(false);
    const interval = setInterval(() => fetchRewards(true), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [currentUser.id]);

  // Re-busca ao voltar para a aba (usuário acabou de resgatar em outra aba)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchRewards(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [currentUser.id]);

  const totalRedeemed = myRewards.reduce((s, r) => s + (r.totalRedeemed ?? 0), 0);
  const active = myRewards.filter(r => r.available).length;

  const stats = [
    { label: "Vantagens ativas", value: active,        color: "rgba(52,211,153,0.9)" },
    { label: "Total resgates",   value: totalRedeemed, color: "#facc15" },
    { label: "Alunos impactados",value: totalRedeemed, color: "#60a5fa" },
    { label: "Avaliação média",  value: "4.8★",        color: "#a78bfa" },
  ];

  const lastUpdatedStr = lastUpdated
    ? lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.75rem 1.25rem 3rem", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .val-btn:hover { color:rgba(255,255,255,.75)!important; }
        .refresh-btn { transition: all .2s; }
        .refresh-btn:hover { background:rgba(52,211,153,0.12)!important; border-color:rgba(52,211,153,0.35)!important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <PageHeader eyebrow="Empresa" title={`Olá, ${currentUser.name} 👋`} sub={currentUser.description || "Painel da empresa parceira"} />
          {/* Indicador de atualização */}
          {lastUpdatedStr && (
            <p style={{ color: "rgba(52,211,153,0.45)", fontSize: "0.65rem", fontFamily: F, marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "rgba(52,211,153,0.6)", boxShadow: "0 0 6px rgba(52,211,153,0.5)", flexShrink: 0 }} />
              Atualizado às {lastUpdatedStr} · próximo em 30s
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* Botão de refresh manual */}
          <motion.button
            className="refresh-btn"
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchRewards(false)}
            disabled={refreshing}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "0.875rem",
              border: "1.5px solid rgba(52,211,153,0.25)",
              background: "rgba(52,211,153,0.06)",
              color: "rgba(52,211,153,0.8)",
              fontWeight: 700, fontSize: "0.8rem",
              cursor: refreshing ? "not-allowed" : "pointer",
              fontFamily: F,
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <svg
              style={{ width: 14, height: 14, animation: refreshing ? "spin 0.8s linear infinite" : "none" }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            {refreshing ? "Atualizando…" : "Atualizar"}
          </motion.button>

          <motion.button
            {...fade(0.08)}
            whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(250,204,21,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("create-reward")}
            style={{
              padding: "0.7rem 1.25rem",
              borderRadius: "0.875rem", border: "none",
              background: "linear-gradient(135deg, #facc15, #f59e0b)",
              color: "#1e3a5f", fontWeight: 800, fontSize: "0.875rem",
              cursor: "pointer", fontFamily: F,
              boxShadow: "0 8px 20px rgba(250,204,21,0.2)",
            }}
          >+ Nova Vantagem</motion.button>
        </div>
      </div>

      {/* Card + Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="co-top">
        <style>{`.co-top{@media(max-width:760px){grid-template-columns:1fr!important}}`}</style>
        <CompanyCard user={currentUser} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "1rem" }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fade(0.1 + i * 0.04)} style={{ ...G.card, padding: "1.25rem", textAlign: "center" }}>
              <p style={{ color: s.color, fontWeight: 900, fontSize: "1.6rem", letterSpacing: "-0.02em", fontFamily: F, lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: F }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rewards list */}
      <motion.div {...fade(0.22)} style={{ ...G.card, padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <p style={{ color: "white", fontWeight: 800, fontSize: "1rem", margin: 0, fontFamily: F }}>Minhas vantagens</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: 2, fontFamily: F }}>{myRewards.length} cadastradas</p>
          </div>
          <button
            className="val-btn"
            onClick={() => onNavigate("company-rewards")}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontWeight: 600, fontFamily: F, transition: "color 0.18s" }}
          >Ver todas →</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {myRewards.map((r, i) => <RewardRow key={r.id} reward={r} index={i} />)}
          {myRewards.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "rgba(255,255,255,0.25)", fontFamily: F }}>
              <p style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎁</p>
              <p style={{ fontSize: "0.85rem" }}>Nenhuma vantagem cadastrada ainda</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <RedeemAreaChart rewards={myRewards} />
        <StatusPieChart rewards={myRewards.length ? myRewards : [{ available: true }, { available: false }]} />
      </div>
      <TopRewardsChart rewards={myRewards} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CreateRewardPage
// ═══════════════════════════════════════════════════════════════════════════════
export function CreateRewardPage({ currentUser }) {
  const [form, setForm] = useState({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemPreviewUrl, setImagemPreviewUrl] = useState(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = ["Alimentação", "Educação", "Cursos", "Brinde", "Serviços", "Entretenimento"];
  const emojis = ["🎁", "☕", "📚", "💻", "🍕", "🎮", "✏️", "🏷️", "🛍️", "🎓"];

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const canSubmit = form.name && form.cost && form.description && !submitting;

  const handleImagemChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagemFile(file);
    setImagemPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await vantagensApi.criar({
        empresaId: currentUser.id,
        nome: form.name,
        custo: Number(form.cost),
        categoria: form.category,
        descricao: form.description,
        imagem: imagemFile ?? undefined,
      });
      setSuccess(true);
      setForm({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
      setImagemFile(null);
      setImagemPreviewUrl(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || "Erro ao publicar vantagem.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.75rem 1.25rem 3rem", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .cr-input:focus, .cr-select:focus, .cr-ta:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; outline:none; }
        .cr-input::placeholder, .cr-ta::placeholder { color:rgba(255,255,255,0.22); }
        .emoji-btn { transition:all .15s; cursor:pointer; }
        .emoji-btn:hover { border-color:rgba(255,255,255,.25)!important; background:rgba(255,255,255,.08)!important; }
        .emoji-btn.active { border-color:rgba(250,204,21,.5)!important; background:rgba(250,204,21,.12)!important; }
        .cat-pill { cursor:pointer; transition:all .15s; }
        .cat-pill:hover { border-color:rgba(255,255,255,.22)!important; color:rgba(255,255,255,.75)!important; }
        .cat-pill.active { border-color:rgba(250,204,21,.45)!important; background:rgba(250,204,21,.1)!important; color:#facc15!important; }
        .tip-item::before { content:"✓"; color:rgba(52,211,153,0.7); margin-right:6px; }
      `}</style>

      <PageHeader eyebrow="Empresa" title="Nova Vantagem" sub="Crie um benefício para os alunos resgatarem" />

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
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)",
              fontFamily: F,
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>🎉</span>
            <div>
              <p style={{ color: "rgba(52,211,153,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Vantagem publicada!</p>
              <p style={{ color: "rgba(52,211,153,0.55)", fontSize: "0.78rem", margin: 0 }}>Alunos já podem ver e resgatar.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "1rem 1.25rem",
              borderRadius: "1rem",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              fontFamily: F,
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>
              <p style={{ color: "rgba(239,68,68,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Erro ao publicar</p>
              <p style={{ color: "rgba(239,68,68,0.6)", fontSize: "0.78rem", margin: 0 }}>{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "1.25rem" }} className="cr-grid">
        <style>{`.cr-grid{@media(max-width:760px){grid-template-columns:1fr!important}}`}</style>

        {/* Form */}
        <motion.div {...fade(0.08)} style={{ ...G.card, padding: "1.75rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Image upload */}
            <div>
              <label style={lStyle}>Imagem da vantagem</label>
              <label
                htmlFor="imagem-upload"
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "0.625rem", padding: "1.5rem",
                  borderRadius: "0.875rem",
                  border: `1.5px dashed ${imagemPreviewUrl ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.15)"}`,
                  background: imagemPreviewUrl ? "rgba(52,211,153,0.05)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer", transition: "all 0.2s",
                  overflow: "hidden",
                }}
              >
                {imagemPreviewUrl ? (
                  <img src={imagemPreviewUrl} alt="Preview" style={{ maxHeight: 140, maxWidth: "100%", borderRadius: "0.625rem", objectFit: "cover" }} />
                ) : (
                  <>
                    <span style={{ fontSize: "2rem" }}>🖼️</span>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: F, margin: 0, textAlign: "center" }}>
                      Clique para escolher uma imagem<br />
                      <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.72rem" }}>PNG, JPG, WEBP · max 5 MB</span>
                    </p>
                  </>
                )}
              </label>
              <input
                id="imagem-upload"
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
                style={{ display: "none" }}
              />
              {imagemPreviewUrl && (
                <button
                  type="button"
                  onClick={() => { setImagemFile(null); setImagemPreviewUrl(null); }}
                  style={{
                    marginTop: "0.5rem", background: "none", border: "none",
                    color: "rgba(239,68,68,0.65)", fontSize: "0.75rem",
                    cursor: "pointer", fontFamily: F, padding: 0,
                  }}
                >✕ Remover imagem</button>
              )}
            </div>

            {/* Name */}
            <div>
              <label style={lStyle}>Nome da vantagem *</label>
              <input value={form.name} onChange={set("name")} required
                placeholder="Ex: Combo Lanche + Café"
                className="cr-input" style={iStyle} />
            </div>

            {/* Cost */}
            <div>
              <label style={lStyle}>Custo em moedas *</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#facc15", fontWeight: 900, fontSize: "1.1rem", pointerEvents: "none" }}>◈</span>
                <input type="number" value={form.cost} onChange={set("cost")} required min="1"
                  placeholder="Ex: 50"
                  className="cr-input" style={{ ...iStyle, paddingLeft: "2.5rem" }} />
              </div>
            </div>

            {/* Category */}
            <div>
              <label style={lStyle}>Categoria</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {categories.map(c => (
                  <button
                    type="button" key={c}
                    onClick={() => setForm(f => ({ ...f, category: c }))}
                    className={`cat-pill${form.category === c ? " active" : ""}`}
                    style={{
                      padding: "0.4rem 0.875rem",
                      borderRadius: "2rem",
                      border: "1.5px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.78rem", fontWeight: 600, fontFamily: F,
                    }}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={lStyle}>Descrição *</label>
              <textarea value={form.description} onChange={set("description")} required
                placeholder="Descreva a vantagem, condições de uso, validade..."
                rows={4}
                className="cr-ta"
                style={{ ...iStyle, resize: "none", lineHeight: 1.6, padding: "0.875rem 1rem" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setPreview(true)}
                style={{
                  flex: 1, padding: "0.875rem",
                  borderRadius: "0.875rem",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 600, fontSize: "0.875rem",
                  cursor: "pointer", fontFamily: F,
                }}
              >Pré-visualizar</button>
              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.02, boxShadow: "0 0 24px rgba(52,211,153,0.2)" } : {}}
                whileTap={canSubmit ? { scale: 0.98 } : {}}
                style={{
                  flex: 2, padding: "0.875rem",
                  borderRadius: "0.875rem", border: "none",
                  background: canSubmit ? "linear-gradient(135deg, rgba(52,211,153,0.9), rgba(16,185,129,0.9))" : "rgba(255,255,255,0.08)",
                  color: canSubmit ? "white" : "rgba(255,255,255,0.25)",
                  fontWeight: 800, fontSize: "0.9rem",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  fontFamily: F, transition: "all 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                {submitting ? (
                  <>
                    <svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
                      <circle opacity={0.25} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path opacity={0.75} fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Publicando...
                  </>
                ) : "Publicar Vantagem →"}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Preview card */}
          <motion.div {...fade(0.14)} style={{ ...G.card, padding: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.875rem" }}>Prévia</p>
            <div style={{
              padding: "1.25rem",
              borderRadius: "1rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                {imagemPreviewUrl
                  ? <img src={imagemPreviewUrl} alt="Preview" style={{ width: 48, height: 48, borderRadius: "0.75rem", objectFit: "cover" }} />
                  : "🖼️"
                }
              </div>
              <p style={{ color: form.name ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)", fontWeight: 700, fontSize: "0.9rem", fontFamily: F, marginBottom: "0.25rem" }}>
                {form.name || "Nome da vantagem"}
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", fontFamily: F, marginBottom: "0.875rem" }}>{currentUser.name}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ color: "#facc15", fontWeight: 800, fontSize: "1rem", fontFamily: F }}>{form.cost || "—"} ◈</p>
                <span style={{
                  padding: "0.3rem 0.75rem", borderRadius: "2rem",
                  background: "rgba(52,211,153,0.12)",
                  border: "1px solid rgba(52,211,153,0.25)",
                  color: "rgba(52,211,153,0.85)", fontSize: "0.7rem", fontWeight: 700,
                }}>Ativo</span>
              </div>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div {...fade(0.18)} style={{ ...G.card, padding: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.875rem" }}>💡 Dicas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Defina um custo atrativo", "Seja claro sobre o que inclui", "Adicione condições de uso", "Vantagens únicas geram mais interesse"].map(t => (
                <p key={t} className="tip-item" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", fontFamily: F, margin: 0 }}>{t}</p>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div {...fade(0.22)} style={{ ...G.card, padding: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.875rem" }}>📊 Plataforma hoje</p>
            {[["Resgates hoje", "12"], ["Alunos ativos", "248"], ["Moedas circulando", "5.430"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.78rem", fontFamily: F, margin: 0 }}>{l}</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontWeight: 700, fontSize: "0.78rem", fontFamily: F, margin: 0 }}>{v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && form.name && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(10,20,40,0.8)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "linear-gradient(160deg, #0f172a 0%, #1a2f50 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                padding: "2rem", maxWidth: 360, width: "100%",
                fontFamily: F,
              }}
            >
              <p style={{ color: "rgba(250,204,21,0.65)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1rem" }}>Pré-visualização</p>
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem", padding: "1.25rem",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.875rem" }}>{form.image}</div>
                <p style={{ color: "white", fontWeight: 700, fontSize: "1rem", margin: "0 0 0.25rem" }}>{form.name}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{currentUser.name}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1rem" }}>{form.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ color: "#facc15", fontWeight: 900, fontSize: "1.25rem", margin: 0 }}>{form.cost || "—"} ◈</p>
                  <button style={{ padding: "0.45rem 1rem", borderRadius: "2rem", border: "none", background: "rgba(52,211,153,0.9)", color: "white", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", fontFamily: F }}>Resgatar</button>
                </div>
              </div>
              <button
                onClick={() => setPreview(false)}
                style={{ width: "100%", marginTop: "1rem", padding: "0.8rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.5)", fontWeight: 600, cursor: "pointer", fontFamily: F }}
              >Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CompanyProfilePage
// ═══════════════════════════════════════════════════════════════════════════════
export function CompanyProfilePage({ currentUser, onUpdateUser, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [form, setForm] = useState({
    nome: currentUser.name || "",
    email: currentUser.email || "",
    cnpj: currentUser.cnpj || "",
    endereco: currentUser.endereco || "",
    senha: "",
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const hasChanges =
    form.nome !== (currentUser.name || "") ||
    form.email !== (currentUser.email || "") ||
    form.cnpj !== (currentUser.cnpj || "") ||
    form.endereco !== (currentUser.endereco || "") ||
    form.senha !== "";

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        cnpj: form.cnpj,
        endereco: form.endereco,
        ...(form.senha ? { senha: form.senha } : {}),
      };
      await empresasApi.atualizar(currentUser.id, payload);
      onUpdateUser?.({ ...currentUser, name: form.nome, email: form.email, cnpj: form.cnpj, endereco: form.endereco });
      setSuccess(true);
      setEditing(false);
      setForm(f => ({ ...f, senha: "" }));
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      alert(err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      nome: currentUser.name || "",
      email: currentUser.email || "",
      cnpj: currentUser.cnpj || "",
      endereco: currentUser.endereco || "",
      senha: "",
    });
    setEditing(false);
  };

  const handleDelete = async () => {
    console.log("currentUser:", currentUser);
    setDeleting(true);
    try {
      await empresasApi.deletar(currentUser.id);
      onLogout?.();
    } catch (err) {
      alert(err.message || "Erro ao deletar a conta.");
      setDeleting(false);
    }
  };

  const fields = [
    { key: "nome",     label: "Nome da empresa",  placeholder: "Nome da empresa",      type: "text",     required: true },
    { key: "email",    label: "E-mail",            placeholder: "contato@empresa.com",  type: "email",    required: true },
    { key: "cnpj",     label: "CNPJ",              placeholder: "00.000.000/0001-00",   type: "text",     required: false },
    { key: "endereco", label: "Endereço",          placeholder: "Rua, número, cidade",  type: "text",     required: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.75rem 1.25rem 3rem", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .pf-input:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; outline:none; }
        .pf-input::placeholder { color:rgba(255,255,255,0.22); }
        .pf-input:disabled { opacity:0.45; cursor:not-allowed; }
        .edit-btn:hover { border-color:rgba(250,204,21,.5)!important; color:#facc15!important; }
        .eye-btn:hover { color:rgba(255,255,255,.7)!important; }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <PageHeader eyebrow="Empresa" title="Perfil da Empresa" sub="Gerencie as informações da sua conta" />
        {!editing && (
          <motion.button
            {...fade(0.06)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setEditing(true)}
            className="edit-btn"
            style={{
              padding: "0.7rem 1.25rem", borderRadius: "0.875rem",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "transparent", color: "rgba(255,255,255,0.55)",
              fontWeight: 700, fontSize: "0.875rem",
              cursor: "pointer", fontFamily: F, transition: "all 0.18s",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >✏️ Editar perfil</motion.button>
        )}
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "1rem 1.25rem", borderRadius: "1rem",
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)", fontFamily: F,
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>✅</span>
            <div>
              <p style={{ color: "rgba(52,211,153,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Perfil atualizado!</p>
              <p style={{ color: "rgba(52,211,153,0.55)", fontSize: "0.78rem", margin: 0 }}>Suas informações foram salvas com sucesso.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div {...fade(0.08)} style={{ ...G.card, padding: "1.75rem", maxWidth: 560 }}>
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Campos principais */}
          {fields.map(({ key, label, placeholder, type, required }) => (
            <div key={key}>
              <label style={lStyle}>{label}{required ? " *" : ""}</label>
              <input
                type={type}
                value={form[key]}
                onChange={set(key)}
                required={required}
                disabled={!editing}
                placeholder={placeholder}
                className="pf-input"
                style={iStyle}
              />
            </div>
          ))}

          {/* Senha */}
          <div>
            <label style={lStyle}>Nova senha</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={form.senha}
                onChange={set("senha")}
                disabled={!editing}
                placeholder={editing ? "Deixe em branco para não alterar" : "••••••••"}
                className="pf-input"
                style={{ ...iStyle, paddingRight: "3rem" }}
              />
              {editing && (
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="eye-btn"
                  style={{
                    position: "absolute", right: "0.875rem", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    color: "rgba(255,255,255,0.35)", cursor: "pointer",
                    fontSize: "1rem", transition: "color 0.18s",
                  }}
                >{showPassword ? "🙈" : "👁️"}</button>
              )}
            </div>
          </div>

          {/* Botões */}
          <AnimatePresence>
            {editing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    flex: 1, padding: "0.875rem", borderRadius: "0.875rem",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    background: "transparent", color: "rgba(255,255,255,0.5)",
                    fontWeight: 600, fontSize: "0.875rem",
                    cursor: "pointer", fontFamily: F,
                  }}
                >Cancelar</button>
                <motion.button
                  type="submit"
                  disabled={saving || !hasChanges}
                  whileHover={hasChanges && !saving ? { scale: 1.02, boxShadow: "0 0 24px rgba(250,204,21,0.25)" } : {}}
                  whileTap={hasChanges && !saving ? { scale: 0.98 } : {}}
                  style={{
                    flex: 2, padding: "0.875rem",
                    borderRadius: "0.875rem", border: "none",
                    background: hasChanges && !saving
                      ? "linear-gradient(135deg, #facc15, #f59e0b)"
                      : "rgba(255,255,255,0.08)",
                    color: hasChanges && !saving ? "#1e3a5f" : "rgba(255,255,255,0.25)",
                    fontWeight: 800, fontSize: "0.9rem",
                    cursor: hasChanges && !saving ? "pointer" : "not-allowed",
                    fontFamily: F, transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  {saving ? (
                    <>
                      <svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
                        <circle opacity={0.25} cx="12" cy="12" r="10" stroke="#1e3a5f" strokeWidth="4" />
                        <path opacity={0.75} fill="#1e3a5f" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Salvando...
                    </>
                  ) : "Salvar alterações →"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* Danger Zone */}
      <motion.div {...fade(0.18)} style={{
        ...G.card,
        padding: "1.5rem",
        maxWidth: 560,
        border: "1px solid rgba(239,68,68,0.2)",
        background: "rgba(239,68,68,0.04)",
      }}>
        <p style={{ color: "rgba(239,68,68,0.75)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.5rem" }}>
          ⚠ Zona de perigo
        </p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", fontFamily: F, marginBottom: "1.25rem", lineHeight: 1.6 }}>
          Ao deletar sua conta, todos os dados da empresa, vantagens cadastradas e histórico serão permanentemente removidos. Essa ação não pode ser desfeita.
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(239,68,68,0.2)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setShowDeleteModal(true); setDeleteConfirm(""); }}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.875rem",
            border: "1.5px solid rgba(239,68,68,0.4)",
            background: "rgba(239,68,68,0.08)",
            color: "rgba(239,68,68,0.85)",
            fontWeight: 700, fontSize: "0.875rem",
            cursor: "pointer", fontFamily: F,
            transition: "all 0.18s",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          🗑️ Deletar conta
        </motion.button>
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !deleting && setShowDeleteModal(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(6,12,26,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              zIndex: 100,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "linear-gradient(160deg, #1a0a0a 0%, #2a1010 100%)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "1.5rem",
                padding: "2rem",
                maxWidth: 420, width: "100%",
                fontFamily: F,
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "1rem",
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem", margin: "0 auto 1rem",
                }}>🗑️</div>
                <p style={{ color: "white", fontWeight: 900, fontSize: "1.2rem", margin: "0 0 0.5rem", fontFamily: F }}>Deletar conta</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontFamily: F, lineHeight: 1.6 }}>
                  Essa ação é <strong style={{ color: "rgba(239,68,68,0.8)" }}>irreversível</strong>. Para confirmar, digite o nome da empresa abaixo.
                </p>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ ...lStyle, marginBottom: "0.5rem" }}>
                  Digite <span style={{ color: "rgba(239,68,68,0.75)", fontStyle: "italic" }}>{currentUser.name}</span> para confirmar
                </label>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={e => setDeleteConfirm(e.target.value)}
                  placeholder={currentUser.name}
                  disabled={deleting}
                  style={{
                    ...iStyle,
                    borderColor: deleteConfirm === currentUser.name
                      ? "rgba(239,68,68,0.5)"
                      : "rgba(255,255,255,0.1)",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  style={{
                    flex: 1, padding: "0.875rem",
                    borderRadius: "0.875rem",
                    border: "1.5px solid rgba(255,255,255,0.12)",
                    background: "transparent",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 600, fontSize: "0.875rem",
                    cursor: "pointer", fontFamily: F,
                  }}
                >Cancelar</button>
                <motion.button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting || deleteConfirm !== currentUser.name}
                  whileHover={deleteConfirm === currentUser.name && !deleting ? { scale: 1.02, boxShadow: "0 0 24px rgba(239,68,68,0.3)" } : {}}
                  whileTap={deleteConfirm === currentUser.name && !deleting ? { scale: 0.97 } : {}}
                  style={{
                    flex: 2, padding: "0.875rem",
                    borderRadius: "0.875rem", border: "none",
                    background: deleteConfirm === currentUser.name && !deleting
                      ? "linear-gradient(135deg, #ef4444, #dc2626)"
                      : "rgba(239,68,68,0.12)",
                    color: deleteConfirm === currentUser.name && !deleting
                      ? "white"
                      : "rgba(239,68,68,0.35)",
                    fontWeight: 800, fontSize: "0.9rem",
                    cursor: deleteConfirm === currentUser.name && !deleting ? "pointer" : "not-allowed",
                    fontFamily: F, transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  {deleting ? (
                    <>
                      <svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
                        <circle opacity={0.25} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                        <path opacity={0.75} fill="white" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Deletando...
                    </>
                  ) : "Deletar permanentemente"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CompanyRewardsList
// ═══════════════════════════════════════════════════════════════════════════════
export function CompanyRewardsList({ currentUser, onNavigate }) {
  const [myRewards,   setMyRewards]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [error,       setError]       = useState(null);
  const [filter,      setFilter]      = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRewards = async (silent = false) => {
    if (!silent) { setLoading(myRewards.length === 0); setRefreshing(myRewards.length > 0); }
    try {
      const data = await vantagensApi.listarPorEmpresa(currentUser.id);
      setMyRewards((data ?? []).map(normalizeVantagem));
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      if (!silent) setError(err.message || "Erro ao carregar vantagens.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRewards(false);
    const interval = setInterval(() => fetchRewards(true), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [currentUser.id]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchRewards(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [currentUser.id]);

  const filtered = filter === "all" ? myRewards : myRewards.filter(r => r.available === (filter === "active"));

  const lastUpdatedStr = lastUpdated
    ? lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : null;

  // ── Edit modal state ────────────────────────────────────────────────────────
  const [editTarget,  setEditTarget]  = useState(null);
  const [editForm,    setEditForm]    = useState({});
  const [editImagem,  setEditImagem]  = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [saving,      setSaving]      = useState(false);
  const [saveError,   setSaveError]   = useState(null);

  // ── Delete modal state ──────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting,     setDeleting]     = useState(false);
  const [deleteError,  setDeleteError]  = useState(null);

  const CATS = ["Alimentação", "Educação", "Cursos", "Brinde", "Serviços", "Entretenimento"];

  const openEdit = (reward) => {
    setEditTarget(reward);
    setEditForm({
      nome:      reward.name        ?? "",
      custo:     String(reward.cost ?? ""),
      categoria: reward.category    ?? "",
      descricao: reward.description ?? "",
    });
    setEditImagem(null);
    setEditPreview(null);
    setSaveError(null);
  };

  const handleEditImagem = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImagem(file);
    setEditPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await vantagensApi.atualizar(editTarget.id, {
        nome:      editForm.nome      || undefined,
        custo:     editForm.custo     ? Number(editForm.custo) : undefined,
        categoria: editForm.categoria || undefined,
        descricao: editForm.descricao || undefined,
        imagem:    editImagem         || undefined,
      });
      setEditTarget(null);
      fetchRewards(false);
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await vantagensApi.desativar(deleteTarget.id);
      setDeleteTarget(null);
      fetchRewards(false);
    } catch (err) {
      setDeleteError(err.message || "Erro ao deletar.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.75rem 1.25rem 3rem", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .f-pill { cursor:pointer; transition:all .15s; }
        .f-pill:hover { border-color:rgba(255,255,255,.22)!important; color:rgba(255,255,255,.7)!important; }
        .f-pill.active { border-color:rgba(250,204,21,.45)!important; background:rgba(250,204,21,.1)!important; color:#facc15!important; }
        .rw-card:hover { border-color:rgba(255,255,255,.16)!important; background:rgba(255,255,255,.07)!important; transform:translateY(-2px); }
        .refresh-btn { transition: all .2s; }
        .refresh-btn:hover { background:rgba(52,211,153,0.12)!important; border-color:rgba(52,211,153,0.35)!important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <PageHeader eyebrow="Empresa" title="Minhas Vantagens" sub={loading ? "Carregando..." : `${myRewards.length} vantagens cadastradas`} />
          {lastUpdatedStr && (
            <p style={{ color: "rgba(52,211,153,0.45)", fontSize: "0.65rem", fontFamily: F, marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "rgba(52,211,153,0.6)", boxShadow: "0 0 6px rgba(52,211,153,0.5)", flexShrink: 0 }} />
              Atualizado às {lastUpdatedStr} · próximo em 30s
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
          <motion.button
            className="refresh-btn"
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchRewards(false)}
            disabled={refreshing || loading}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "0.875rem",
              border: "1.5px solid rgba(52,211,153,0.25)",
              background: "rgba(52,211,153,0.06)",
              color: "rgba(52,211,153,0.8)",
              fontWeight: 700, fontSize: "0.8rem",
              cursor: (refreshing || loading) ? "not-allowed" : "pointer",
              fontFamily: F,
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <svg
              style={{ width: 14, height: 14, animation: (refreshing || loading) ? "spin 0.8s linear infinite" : "none" }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            {refreshing ? "Atualizando…" : "Atualizar"}
          </motion.button>
          <motion.button
            {...fade(0.06)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("create-reward")}
            style={{
              padding: "0.7rem 1.25rem",
              borderRadius: "0.875rem", border: "none",
              background: "linear-gradient(135deg, #facc15, #f59e0b)",
              color: "#1e3a5f", fontWeight: 800, fontSize: "0.875rem",
              cursor: "pointer", fontFamily: F,
              boxShadow: "0 8px 20px rgba(250,204,21,0.2)",
            }}
          >+ Nova vantagem</motion.button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <motion.div {...fade(0.08)} style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.35)", fontFamily: F }}>
          <svg style={{ animation: "spin 0.9s linear infinite", width: 32, height: 32, margin: "0 auto 1rem", display: "block" }} viewBox="0 0 24 24" fill="none">
            <circle opacity={0.25} cx="12" cy="12" r="10" stroke="rgba(250,204,21,0.6)" strokeWidth="3" />
            <path opacity={0.85} fill="rgba(250,204,21,0.8)" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p style={{ fontSize: "0.875rem" }}>Carregando vantagens...</p>
        </motion.div>
      )}

      {/* Error state */}
      {!loading && error && (
        <motion.div {...fade(0.08)} style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "1rem 1.25rem", borderRadius: "1rem",
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)", fontFamily: F,
        }}>
          <span style={{ fontSize: "1.5rem" }}>⚠️</span>
          <div>
            <p style={{ color: "rgba(239,68,68,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Erro ao carregar</p>
            <p style={{ color: "rgba(239,68,68,0.6)", fontSize: "0.78rem", margin: 0 }}>{error}</p>
          </div>
        </motion.div>
      )}

      {/* Content */}
      {!loading && !error && (<>
      {/* Filter pills */}
      <motion.div {...fade(0.08)} style={{ display: "flex", gap: "0.5rem" }}>
        {[["all", "Todas"], ["active", "Ativas"], ["inactive", "Esgotadas"]].map(([val, lbl]) => (
          <button key={val} onClick={() => setFilter(val)}
            className={`f-pill${filter === val ? " active" : ""}`}
            style={{
              padding: "0.45rem 1rem", borderRadius: "2rem",
              border: "1.5px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.38)",
              fontSize: "0.78rem", fontWeight: 700, fontFamily: F,
            }}>{lbl}</button>
        ))}
      </motion.div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
            {filtered.map((reward, i) => {
              const imgSrc = reward.imagemBase64
                ? `data:${reward.imagemTipo || "image/png"};base64,${reward.imagemBase64}`
                : null;
              return (
                <motion.div
                  key={reward.id}
                  {...fade(i * 0.06)}
                  className="rw-card"
                  style={{
                    ...G.card,
                    overflow: "hidden",
                    transition: "all 0.2s",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "column",
                    opacity: reward.available ? 1 : 0.65,
                  }}
                >
                  {/* Banner de imagem */}
                  <div style={{
                    width: "100%", height: 140, flexShrink: 0,
                    position: "relative", overflow: "hidden",
                    background: "rgba(52,211,153,0.05)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    {imgSrc ? (
                      <img src={imgSrc} alt={reward.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.75rem", opacity: 0.35 }}>🎁</div>
                    )}
                    {/* Badge categoria */}
                    <span style={{
                      position: "absolute", top: 8, left: 8,
                      background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(8px)", borderRadius: "999px",
                      padding: "0.18rem 0.55rem", color: "rgba(255,255,255,0.6)",
                      fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em",
                      textTransform: "uppercase", fontFamily: F,
                    }}>{reward.category}</span>
                    {/* Badge status */}
                    <span style={{
                      position: "absolute", top: 8, right: 8,
                      padding: "0.2rem 0.6rem", borderRadius: "999px",
                      background: reward.available ? "rgba(52,211,153,0.18)" : "rgba(255,255,255,0.08)",
                      border: `1px solid ${reward.available ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.15)"}`,
                      color: reward.available ? "rgba(52,211,153,0.95)" : "rgba(255,255,255,0.35)",
                      fontSize: "0.58rem", fontWeight: 700, fontFamily: F, backdropFilter: "blur(8px)",
                    }}>{reward.available ? "Ativo" : "Esgotado"}</span>
                  </div>

                  {/* Conteúdo */}
                  <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
                    <p style={{ color: "rgba(255,255,255,0.88)", fontWeight: 700, fontSize: "0.88rem", fontFamily: F, margin: 0, lineHeight: 1.3 }}>{reward.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.7rem", fontFamily: F, margin: 0 }}>
                      {reward.totalRedeemed} {reward.totalRedeemed === 1 ? "resgate" : "resgates"}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                        <span style={{ color: "#facc15", fontWeight: 900, fontSize: "1.1rem", lineHeight: 1 }}>{reward.cost}</span>
                        <span style={{ color: "rgba(250,204,21,0.4)", fontSize: "0.65rem", fontWeight: 600 }}>moedas</span>
                      </div>
                    </div>

                    {/* Ações */}
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      <button
                        className="act-btn edit-btn"
                        onClick={() => openEdit(reward)}
                        style={{
                          flex: 1, padding: "0.5rem",
                          borderRadius: "0.6rem",
                          border: "1.5px solid rgba(250,204,21,0.25)",
                          background: "rgba(250,204,21,0.06)",
                          color: "rgba(250,204,21,0.8)",
                          fontSize: "0.72rem", fontWeight: 700,
                          cursor: "pointer", fontFamily: F,
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Editar
                      </button>
                      <button
                        className="act-btn del-btn"
                        onClick={() => { setDeleteTarget(reward); setDeleteError(null); }}
                        style={{
                          flex: 1, padding: "0.5rem",
                          borderRadius: "0.6rem",
                          border: "1.5px solid rgba(239,68,68,0.25)",
                          background: "rgba(239,68,68,0.06)",
                          color: "rgba(239,68,68,0.75)",
                          fontSize: "0.72rem", fontWeight: 700,
                          cursor: "pointer", fontFamily: F,
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                        Deletar
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <RedeemAreaChart rewards={myRewards} />
            <TopRewardsChart rewards={myRewards} />
          </div>
        </>
      ) : (
        <motion.div {...fade(0.1)} style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.25)", fontFamily: F }}>
          <p style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🎁</p>
          <p style={{ fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.5)" }}>Nenhuma vantagem encontrada</p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.35rem" }}>Crie sua primeira vantagem para os alunos!</p>
        </motion.div>
      )}
      </>)}

      {/* ── Modal de Edição ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {editTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !saving && setEditTarget(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(6,12,26,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.25rem", overflowY: "auto" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "linear-gradient(160deg,#0d1f3c 0%,#07121f 100%)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: "1.5rem", padding: "1.75rem", maxWidth: 480, width: "100%", fontFamily: F, boxShadow: "0 32px 80px rgba(0,0,0,0.7)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <div>
                <p style={{ color: "rgba(250,204,21,0.7)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.35rem" }}>Editar vantagem</p>
                <p style={{ color: "white", fontWeight: 900, fontSize: "1.15rem", margin: 0 }}>{editTarget.name}</p>
              </div>

              {/* Upload de imagem */}
              <div>
                <label style={lStyle}>Imagem</label>
                <label htmlFor="edit-img" style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "0.5rem", padding: "1rem", borderRadius: "0.875rem", cursor: "pointer",
                  border: `1.5px dashed ${editPreview ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.15)"}`,
                  background: editPreview ? "rgba(52,211,153,0.04)" : "rgba(255,255,255,0.03)",
                  overflow: "hidden", transition: "all 0.2s",
                }}>
                  {editPreview ? (
                    <img src={editPreview} alt="preview" style={{ maxHeight: 110, maxWidth: "100%", borderRadius: "0.5rem", objectFit: "cover" }} />
                  ) : editTarget.imagemBase64 ? (
                    <img src={`data:${editTarget.imagemTipo || "image/png"};base64,${editTarget.imagemBase64}`} alt="atual" style={{ maxHeight: 110, maxWidth: "100%", borderRadius: "0.5rem", objectFit: "cover", opacity: 0.7 }} />
                  ) : (
                    <>
                      <span style={{ fontSize: "1.75rem" }}>🖼️</span>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", margin: 0, textAlign: "center" }}>Clique para trocar a imagem</p>
                    </>
                  )}
                </label>
                <input id="edit-img" type="file" accept="image/*" onChange={handleEditImagem} style={{ display: "none" }} />
                {editPreview && (
                  <button type="button" onClick={() => { setEditImagem(null); setEditPreview(null); }}
                    style={{ marginTop: "0.4rem", background: "none", border: "none", color: "rgba(239,68,68,0.6)", fontSize: "0.72rem", cursor: "pointer", fontFamily: F, padding: 0 }}>
                    ✕ Remover nova imagem
                  </button>
                )}
              </div>

              {/* Nome */}
              <div>
                <label style={lStyle}>Nome da vantagem</label>
                <input className="cr-input" style={iStyle} value={editForm.nome}
                  onChange={e => setEditForm(f => ({ ...f, nome: e.target.value }))}
                  placeholder="Nome da vantagem" />
              </div>

              {/* Custo */}
              <div>
                <label style={lStyle}>Custo em moedas</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#facc15", fontWeight: 900, fontSize: "1rem", pointerEvents: "none" }}>◈</span>
                  <input type="number" min="1" className="cr-input"
                    style={{ ...iStyle, paddingLeft: "2.5rem" }}
                    value={editForm.custo}
                    onChange={e => setEditForm(f => ({ ...f, custo: e.target.value }))} />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label style={lStyle}>Categoria</label>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {CATS.map(c => (
                    <button type="button" key={c}
                      onClick={() => setEditForm(f => ({ ...f, categoria: c }))}
                      style={{
                        padding: "0.35rem 0.8rem", borderRadius: "2rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: F,
                        background: editForm.categoria === c ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.04)",
                        border: editForm.categoria === c ? "1.5px solid rgba(250,204,21,0.45)" : "1.5px solid rgba(255,255,255,0.1)",
                        color: editForm.categoria === c ? "#facc15" : "rgba(255,255,255,0.38)",
                        transition: "all 0.15s",
                      }}>{c}</button>
                  ))}
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label style={lStyle}>Descrição</label>
                <textarea className="cr-ta" rows={3}
                  style={{ ...iStyle, resize: "none", lineHeight: 1.6, padding: "0.875rem 1rem" }}
                  value={editForm.descricao}
                  onChange={e => setEditForm(f => ({ ...f, descricao: e.target.value }))}
                  placeholder="Descreva a vantagem..." />
              </div>

              {saveError && (
                <p style={{ color: "rgba(239,68,68,0.85)", fontSize: "0.78rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.875rem", margin: 0 }}>{saveError}</p>
              )}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setEditTarget(null)} disabled={saving}
                  style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}>
                  Cancelar
                </button>
                <motion.button onClick={handleSave} disabled={saving}
                  whileHover={!saving ? { scale: 1.02 } : {}} whileTap={!saving ? { scale: 0.97 } : {}}
                  style={{ flex: 2, padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: saving ? "rgba(250,204,21,0.12)" : "linear-gradient(135deg,#facc15,#f59e0b)", color: saving ? "rgba(255,255,255,0.3)" : "#0b1d38", fontWeight: 800, fontSize: "0.9rem", cursor: saving ? "not-allowed" : "pointer", fontFamily: F, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {saving ? (
                    <><svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none"><circle opacity={0.25} cx="12" cy="12" r="10" stroke="#0b1d38" strokeWidth="4"/><path opacity={0.75} fill="#0b1d38" d="M4 12a8 8 0 018-8v8z"/></svg>Salvando…</>
                  ) : "Salvar alterações →"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal de Exclusão ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !deleting && setDeleteTarget(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(6,12,26,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "linear-gradient(160deg,#1a0a0a 0%,#2a1010 100%)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "1.5rem", padding: "2rem", maxWidth: 400, width: "100%", fontFamily: F, boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: "1rem", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", margin: "0 auto 1rem" }}>🗑️</div>
                <p style={{ color: "white", fontWeight: 900, fontSize: "1.15rem", margin: "0 0 0.5rem" }}>Deletar vantagem?</p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                  <strong style={{ color: "rgba(255,255,255,0.7)" }}>"{deleteTarget.name}"</strong> será desativada e deixará de aparecer para os alunos. Os resgates já realizados são preservados.
                </p>
              </div>

              {deleteError && (
                <p style={{ color: "rgba(239,68,68,0.85)", fontSize: "0.78rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.875rem", marginBottom: "1rem" }}>{deleteError}</p>
              )}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setDeleteTarget(null)} disabled={deleting}
                  style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}>
                  Cancelar
                </button>
                <motion.button onClick={handleDelete} disabled={deleting}
                  whileHover={!deleting ? { scale: 1.02, boxShadow: "0 0 24px rgba(239,68,68,0.25)" } : {}}
                  whileTap={!deleting ? { scale: 0.97 } : {}}
                  style={{ flex: 2, padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: deleting ? "rgba(239,68,68,0.12)" : "linear-gradient(135deg,#ef4444,#dc2626)", color: deleting ? "rgba(255,255,255,0.3)" : "white", fontWeight: 800, fontSize: "0.9rem", cursor: deleting ? "not-allowed" : "pointer", fontFamily: F, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {deleting ? (
                    <><svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none"><circle opacity={0.25} cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path opacity={0.75} fill="white" d="M4 12a8 8 0 018-8v8z"/></svg>Deletando…</>
                  ) : "Deletar permanentemente"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}