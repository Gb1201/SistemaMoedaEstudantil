import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { mockRewards } from "../data/mockData";

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
            <p style={{ color: "rgba(52,211,153,0.65)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: F }}>CoinWise</p>
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
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.2rem",
      }}>{reward.image}</div>
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

// ═══════════════════════════════════════════════════════════════════════════════
// CompanyDashboard
// ═══════════════════════════════════════════════════════════════════════════════
export function CompanyDashboard({ currentUser, onNavigate }) {
  const myRewards = mockRewards.filter(r => r.companyId === currentUser.id);
  const totalRedeemed = myRewards.reduce((s, r) => s + r.totalRedeemed, 0);
  const active = myRewards.filter(r => r.available).length;

  const stats = [
    { label: "Vantagens ativas", value: active, color: "rgba(52,211,153,0.9)" },
    { label: "Total resgates", value: totalRedeemed, color: "#facc15" },
    { label: "Alunos impactados", value: totalRedeemed, color: "#60a5fa" },
    { label: "Avaliação média", value: "4.8★", color: "#a78bfa" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .val-btn:hover { color:rgba(255,255,255,.75)!important; }
      `}</style>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <PageHeader eyebrow="Empresa" title={`Olá, ${currentUser.name} 👋`} sub={currentUser.description || "Painel da empresa parceira"} />
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
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CreateRewardPage
// ═══════════════════════════════════════════════════════════════════════════════
export function CreateRewardPage({ currentUser }) {
  const [form, setForm] = useState({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);

  const categories = ["Alimentação", "Educação", "Cursos", "Brinde", "Serviços", "Entretenimento"];
  const emojis = ["🎁", "☕", "📚", "💻", "🍕", "🎮", "✏️", "🏷️", "🛍️", "🎓"];

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const canSubmit = form.name && form.cost && form.description;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSuccess(true);
    setForm({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "1.25rem" }} className="cr-grid">
        <style>{`.cr-grid{@media(max-width:760px){grid-template-columns:1fr!important}}`}</style>

        {/* Form */}
        <motion.div {...fade(0.08)} style={{ ...G.card, padding: "1.75rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Emoji picker */}
            <div>
              <label style={lStyle}>Ícone da vantagem</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {emojis.map(e => (
                  <button
                    type="button" key={e}
                    onClick={() => setForm(f => ({ ...f, image: e }))}
                    className={`emoji-btn${form.image === e ? " active" : ""}`}
                    style={{
                      width: 44, height: 44, borderRadius: "0.75rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1.5px solid rgba(255,255,255,0.1)",
                      fontSize: "1.3rem", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >{e}</button>
                ))}
              </div>
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
                }}
              >Publicar Vantagem →</motion.button>
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
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{form.image}</div>
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
// CompanyRewardsList
// ═══════════════════════════════════════════════════════════════════════════════
export function CompanyRewardsList({ currentUser, onNavigate }) {
  const myRewards = mockRewards.filter(r => r.companyId === currentUser.id);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? myRewards : myRewards.filter(r => r.available === (filter === "active"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .f-pill { cursor:pointer; transition:all .15s; }
        .f-pill:hover { border-color:rgba(255,255,255,.22)!important; color:rgba(255,255,255,.7)!important; }
        .f-pill.active { border-color:rgba(250,204,21,.45)!important; background:rgba(250,204,21,.1)!important; color:#facc15!important; }
        .rw-card:hover { border-color:rgba(255,255,255,.16)!important; background:rgba(255,255,255,.07)!important; transform:translateY(-2px); }
      `}</style>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <PageHeader eyebrow="Empresa" title="Minhas Vantagens" sub={`${myRewards.length} vantagens cadastradas`} />
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
          {filtered.map((reward, i) => (
            <motion.div
              key={reward.id}
              {...fade(i * 0.06)}
              className="rw-card"
              style={{
                ...G.card, padding: "1.25rem",
                transition: "all 0.2s",
                cursor: "default",
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "0.875rem",
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", marginBottom: "1rem",
              }}>{reward.image}</div>
              <p style={{ color: "white", fontWeight: 700, fontSize: "0.9rem", fontFamily: F, marginBottom: "0.25rem" }}>{reward.name}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", fontFamily: F, marginBottom: "0.875rem" }}>{reward.totalRedeemed} resgates</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ color: "#facc15", fontWeight: 800, fontSize: "1rem", fontFamily: F }}>{reward.cost} ◈</p>
                <span style={{
                  padding: "0.25rem 0.7rem", borderRadius: "2rem",
                  background: reward.available ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${reward.available ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`,
                  color: reward.available ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.3)",
                  fontSize: "0.68rem", fontWeight: 700,
                }}>
                  {reward.available ? "Ativo" : "Esgotado"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div {...fade(0.1)} style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.25)", fontFamily: F }}>
          <p style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🎁</p>
          <p style={{ fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.5)" }}>Nenhuma vantagem encontrada</p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.35rem" }}>Crie sua primeira vantagem para os alunos!</p>
        </motion.div>
      )}
    </div>
  );
}