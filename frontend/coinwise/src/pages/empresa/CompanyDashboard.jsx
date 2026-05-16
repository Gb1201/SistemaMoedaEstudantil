// ── CompanyDashboard.jsx ──────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { vantagensApi } from "../../api/api";
import {
  F, fade, G,
  POLL_INTERVAL_MS,
  normalizeVantagem,
  PageHeader,
  CompanyCard,
  RewardRow,
  RedeemAreaChart,
  StatusPieChart,
  TopRewardsChart,
} from "./CompanyShared";

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

  // Re-busca ao voltar para a aba
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