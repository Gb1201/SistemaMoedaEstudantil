// ── companyShared.js ──────────────────────────────────────────────────────────
// Design system, helpers e componentes internos compartilhados entre as
// páginas da área de Empresa (CompanyDashboard, CreateRewardPage, etc.)
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// ── Design tokens ─────────────────────────────────────────────────────────────
export const F = "'Sora','Nunito',sans-serif";

export const fade = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.52, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export const G = {
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "1.25rem",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  },
};

export const iStyle = {
  width: "100%", padding: "0.8rem 1rem",
  borderRadius: "0.875rem",
  border: "1.5px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "white", fontSize: "0.875rem",
  outline: "none", fontFamily: F,
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};

export const lStyle = {
  color: "rgba(255,255,255,0.38)", fontSize: "0.68rem",
  fontWeight: 700, letterSpacing: "0.12em",
  textTransform: "uppercase", display: "block",
  marginBottom: "0.5rem", fontFamily: F,
};

export const POLL_INTERVAL_MS = 30_000;

// ── Normaliza campos da API para o padrão interno do componente ───────────────
// A API retorna: { id, nome, custo, descricao, categoria, ativo, imagemUrl, ... }
// Os componentes esperam: { id, name, cost, description, category, available, image, totalRedeemed }
export function normalizeVantagem(v) {
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
export function PageHeader({ eyebrow, title, sub }) {
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
export function CompanyCard({ user }) {
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
export function RewardRow({ reward, index }) {
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
export function ChartTooltip({ active, payload, label, unit = "" }) {
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
export function RedeemAreaChart({ rewards }) {
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
export function TopRewardsChart({ rewards }) {
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
export function StatusPieChart({ rewards }) {
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