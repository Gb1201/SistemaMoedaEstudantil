import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransactionItem } from "../components/TransactionItem";
import { RewardCard } from "../components/TransactionItem";
import Modal from "../components/Modal";
import { mockTransactions, mockRewards } from "../data/mockData";
import { alunosApi } from "../api/api";

// ── Shared tokens ─────────────────────────────────────────────────────────────
const FONT  = "'Sora','Nunito',sans-serif";
const BG    = "linear-gradient(160deg,#060e1c 0%,#0b1d38 45%,#07121f 100%)";
const GLASS = {
  background   : "rgba(255,255,255,0.04)",
  border       : "1px solid rgba(255,255,255,0.08)",
  borderRadius : "1.25rem",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
};

const pageWrap = {
  background : BG,
  minHeight  : "100vh",
  padding    : "1.75rem 1.5rem",
  margin     : "-1.5rem",
  width      : "calc(100% + 3rem)",
  fontFamily : FONT,
};

const fade = (delay = 0) => ({
  initial    : { opacity: 0, y: 16 },
  animate    : { opacity: 1, y: 0  },
  transition : { duration: 0.5, delay, ease: [0.22,1,0.36,1] },
});

// Dot accent used in page headings
function PageDot() {
  return (
    <span style={{
      display     : "inline-block",
      width       : 6, height: 6,
      borderRadius: "50%",
      background  : "rgba(250,204,21,0.8)",
      boxShadow   : "0 0 6px rgba(250,204,21,0.6)",
      marginRight : 8,
      verticalAlign: "middle",
    }} />
  );
}

// ── StudentTransactions ───────────────────────────────────────────────────────
export function StudentTransactions({ currentUser }) {
  const [filter, setFilter] = useState("all");
  const myTx    = mockTransactions.filter(tx => tx.studentId === currentUser.id);
  const filtered = filter === "all" ? myTx : myTx.filter(t => t.type === filter);

  const totals = {
    received: myTx.filter(t => t.type === "received").reduce((s,t) => s + t.amount, 0),
    spent   : myTx.filter(t => t.type === "spent"   ).reduce((s,t) => s + t.amount, 0),
  };

  const stats = [
    { label: "Saldo atual",    value: currentUser.balance ?? 0, sign: "",   color: "#facc15", bg: "rgba(250,204,21,0.08)",  border: "rgba(250,204,21,0.18)" },
    { label: "Total recebido", value: totals.received,          sign: "+",  color: "#4ade80", bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.18)" },
    { label: "Total gasto",    value: totals.spent,             sign: "−",  color: "#f87171", bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.18)" },
  ];

  const filterBtns = [["all","Todos"],["received","Recebidos"],["spent","Gastos"]];

  return (
    <div style={pageWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .filter-btn { transition: all 0.18s; }
        .filter-btn:hover { border-color: rgba(250,204,21,0.4) !important; color: rgba(255,255,255,0.85) !important; }
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>

        {/* Header */}
        <motion.div {...fade(0)}>
          <p style={{ color:"rgba(250,204,21,0.6)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.35rem" }}>
            <PageDot />Movimentações
          </p>
          <h2 style={{ color:"white", fontWeight:900, fontSize:"1.9rem", letterSpacing:"-0.03em", margin:0 }}>Extrato</h2>
          <p style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.8rem", marginTop:"0.3rem" }}>
            Histórico completo de movimentações
          </p>
        </motion.div>

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.875rem" }}>
          {stats.map((s,i) => (
            <motion.div key={i} {...fade(0.08 + i*0.07)} style={{
              background   : s.bg,
              border       : `1px solid ${s.border}`,
              borderRadius : "1.1rem",
              padding      : "1rem 0.875rem",
              textAlign    : "center",
            }}>
              <p style={{ color:s.color, fontWeight:900, fontSize:"1.5rem", letterSpacing:"-0.03em", margin:0, lineHeight:1 }}>
                {s.sign}{s.value.toLocaleString("pt-BR")}
              </p>
              <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.65rem", marginTop:"0.4rem", fontWeight:600, letterSpacing:"0.05em" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transactions panel */}
        <motion.div {...fade(0.22)} style={{ ...GLASS, padding:"1.5rem" }}>
          {/* Top bar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.1rem", flexWrap:"wrap", gap:"0.75rem" }}>
            <h3 style={{ color:"rgba(255,255,255,0.75)", fontWeight:700, fontSize:"0.85rem", margin:0 }}>
              Transações
            </h3>
            <div style={{ display:"flex", gap:"0.4rem" }}>
              {filterBtns.map(([val,lbl]) => (
                <button
                  key={val}
                  className="filter-btn"
                  onClick={() => setFilter(val)}
                  style={{
                    padding     : "0.35rem 0.875rem",
                    borderRadius: "0.6rem",
                    fontSize    : "0.72rem",
                    fontWeight  : 700,
                    cursor      : "pointer",
                    fontFamily  : FONT,
                    transition  : "all 0.18s",
                    background  : filter === val ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.04)",
                    border      : filter === val ? "1px solid rgba(250,204,21,0.4)"  : "1px solid rgba(255,255,255,0.08)",
                    color       : filter === val ? "#facc15" : "rgba(255,255,255,0.38)",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
            {filtered.length > 0
              ? filtered.map((tx,i) => <TransactionItem key={tx.id} tx={tx} index={i} />)
              : (
                <div style={{ textAlign:"center", padding:"3rem 0" }}>
                  <p style={{ fontSize:"2.5rem", marginBottom:"0.75rem" }}>📭</p>
                  <p style={{ color:"rgba(255,255,255,0.22)", fontSize:"0.82rem" }}>Nenhuma transação encontrada</p>
                </div>
              )
            }
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// ── StudentRewards ────────────────────────────────────────────────────────────
export function StudentRewards({ currentUser }) {
  const [redeemTarget, setRedeemTarget] = useState(null);
  const [success,      setSuccess]      = useState(null);
  const [filter,       setFilter]       = useState("all");

  const categories = ["all", ...new Set(mockRewards.map(r => r.category))];
  const filtered   = filter === "all" ? mockRewards : mockRewards.filter(r => r.category === filter);

  const confirmRedeem = () => {
    setSuccess(redeemTarget.name);
    setRedeemTarget(null);
    setTimeout(() => setSuccess(null), 3500);
  };

  return (
    <div style={pageWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .cat-btn { transition: all 0.18s; }
        .cat-btn:hover { border-color: rgba(250,204,21,0.4) !important; color: rgba(255,255,255,0.85) !important; }
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>

        {/* Header */}
        <motion.div {...fade(0)}>
          <p style={{ color:"rgba(250,204,21,0.6)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.35rem" }}>
            <PageDot />Catálogo
          </p>
          <h2 style={{ color:"white", fontWeight:900, fontSize:"1.9rem", letterSpacing:"-0.03em", margin:0 }}>Vantagens</h2>
          <p style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.8rem", marginTop:"0.3rem" }}>
            Troque suas moedas por benefícios reais
          </p>
        </motion.div>

        {/* Success toast */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity:0, y:-10, scale:0.97 }}
              animate={{ opacity:1, y:0,   scale:1 }}
              exit   ={{ opacity:0, y:-6,  scale:0.97 }}
              style={{
                background   : "rgba(74,222,128,0.08)",
                border       : "1px solid rgba(74,222,128,0.25)",
                borderRadius : "1rem",
                padding      : "1rem 1.25rem",
                display      : "flex", alignItems:"center", gap:"0.875rem",
              }}
            >
              <span style={{ fontSize:"1.5rem" }}>🎉</span>
              <div>
                <p style={{ color:"#4ade80", fontWeight:700, fontSize:"0.85rem", margin:0 }}>Resgate confirmado!</p>
                <p style={{ color:"rgba(74,222,128,0.6)", fontSize:"0.75rem", marginTop:2 }}>{success} foi resgatado com sucesso.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Balance card */}
        <motion.div {...fade(0.1)} style={{
          position    : "relative",
          overflow    : "hidden",
          borderRadius: "1.5rem",
          background  : "linear-gradient(135deg,#112240 0%,#0a1a2e 60%,#06101e 100%)",
          border      : "1px solid rgba(250,204,21,0.18)",
          padding     : "1.5rem",
          boxShadow   : "0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}>
          {/* Bg glow */}
          <div style={{ position:"absolute", top:-60, right:-40, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(250,204,21,0.09) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative" }}>
            <div>
              <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.5rem" }}>
                Seu saldo disponível
              </p>
              <div style={{ display:"flex", alignItems:"baseline", gap:"0.5rem" }}>
                <p style={{
                  color        : "#facc15",
                  fontWeight   : 900,
                  fontSize     : "2.5rem",
                  letterSpacing: "-0.04em",
                  lineHeight   : 1,
                  margin       : 0,
                  textShadow   : "0 0 40px rgba(250,204,21,0.35)",
                }}>
                  {(currentUser.balance ?? 0).toLocaleString("pt-BR")}
                </p>
                <span style={{ color:"rgba(250,204,21,0.4)", fontSize:"0.9rem", fontWeight:600 }}>moedas ◈</span>
              </div>
            </div>
            <div style={{
              width:"56px", height:"56px", borderRadius:"1.1rem",
              background:"rgba(250,204,21,0.12)",
              border:"1px solid rgba(250,204,21,0.25)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1.75rem",
              boxShadow:"0 4px 20px rgba(250,204,21,0.15)",
            }}>◈</div>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div {...fade(0.16)} style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              className="cat-btn"
              onClick={() => setFilter(cat)}
              style={{
                padding     : "0.38rem 0.9rem",
                borderRadius: "999px",
                fontSize    : "0.72rem",
                fontWeight  : 700,
                cursor      : "pointer",
                fontFamily  : FONT,
                textTransform:"capitalize",
                background  : filter === cat ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.04)",
                border      : filter === cat ? "1px solid rgba(250,204,21,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color       : filter === cat ? "#facc15" : "rgba(255,255,255,0.38)",
              }}
            >
              {cat === "all" ? "Todos" : cat}
            </button>
          ))}
        </motion.div>

        {/* Rewards grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"0.875rem" }}>
          {filtered.map((reward, i) => (
            <RewardCard
              key={reward.id}
              reward={{ ...reward, canAfford: currentUser.balance >= reward.cost }}
              onRedeem={setRedeemTarget}
              index={i}
            />
          ))}
        </div>

        {/* Confirm Modal */}
        <Modal
          open={!!redeemTarget}
          onClose={() => setRedeemTarget(null)}
          onConfirm={confirmRedeem}
          title="Confirmar resgate"
          confirmLabel="Resgatar agora"
          confirmColor="yellow"
        >
          {redeemTarget && (
            <div style={{
              background   : "rgba(255,255,255,0.05)",
              border       : "1px solid rgba(255,255,255,0.09)",
              borderRadius : "1rem",
              padding      : "1.1rem",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.875rem" }}>
                <span style={{ fontSize:"2.25rem" }}>{redeemTarget.image}</span>
                <div>
                  <p style={{ color:"rgba(255,255,255,0.88)", fontWeight:700, fontSize:"0.88rem", margin:0 }}>{redeemTarget.name}</p>
                  <p style={{ color:"rgba(255,255,255,0.32)", fontSize:"0.72rem", marginTop:2 }}>{redeemTarget.company}</p>
                  <p style={{ color:"#facc15", fontWeight:900, fontSize:"1.1rem", marginTop:"0.4rem" }}>
                    −{redeemTarget.cost} moedas
                  </p>
                </div>
              </div>
              <div style={{
                marginTop   : "0.875rem",
                paddingTop  : "0.75rem",
                borderTop   : "1px solid rgba(255,255,255,0.07)",
                display     : "flex", justifyContent:"space-between",
              }}>
                <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.72rem" }}>Saldo após resgate</span>
                <span style={{ color:"rgba(255,255,255,0.75)", fontWeight:700, fontSize:"0.78rem" }}>
                  {currentUser.balance - redeemTarget.cost} moedas
                </span>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
}

// ── StudentProfile ────────────────────────────────────────────────────────────
export function StudentProfile({ currentUser }) {
  const [editing,     setEditing]     = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [saveError,   setSaveError]   = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [form, setForm] = useState({
    nome       : currentUser.nome        || currentUser.name        || "",
    email      : currentUser.email                                  || "",
    senha      : "",
    endereco   : currentUser.endereco    || currentUser.address     || "",
    curso      : currentUser.curso       || currentUser.course      || "",
    cpf        : currentUser.cpf                                    || "",
    rg         : currentUser.rg                                     || "",
    ra         : currentUser.ra                                     || "",
    instituicao: currentUser.instituicao || currentUser.institution || "",
  });

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const payload = { ...form };
      if (!payload.senha) delete payload.senha;
      await alunosApi.atualizar(currentUser.id, payload);
      setSaveSuccess(true);
      setEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  };

  const initials = form.nome
    .split(" ").map(p => p[0]).filter(Boolean).slice(0,2).join("").toUpperCase() || "?";

  const inputStyle = {
    width:"100%", padding:"0.65rem 0.9rem",
    borderRadius:"0.875rem",
    border:"1.5px solid rgba(255,255,255,0.1)",
    background:"rgba(255,255,255,0.05)",
    color:"white", fontSize:"0.82rem",
    fontFamily:FONT, outline:"none",
    transition:"border-color 0.2s, background 0.2s, box-shadow 0.2s",
    boxSizing:"border-box",
  };

  const fields = [
    { label:"Nome completo", key:"nome",        type:"text",     col:2 },
    { label:"Email",         key:"email",       type:"email",    col:2 },
    { label:"Nova senha",    key:"senha",       type:"password", col:2, placeholder:"Deixe em branco para não alterar" },
    { label:"Curso",         key:"curso",       type:"text",     col:1 },
    { label:"Instituição",   key:"instituicao", type:"text",     col:1 },
    { label:"RA",            key:"ra",          type:"text",     col:1 },
    { label:"CPF",           key:"cpf",         type:"text",     col:1 },
    { label:"RG",            key:"rg",          type:"text",     col:1 },
    { label:"Endereço",      key:"endereco",    type:"text",     col:2 },
  ];

  return (
    <div style={pageWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .prof-input:focus {
          border-color: rgba(250,204,21,0.5) !important;
          background: rgba(255,255,255,0.08) !important;
          box-shadow: 0 0 0 3px rgba(250,204,21,0.08) !important;
        }
        .prof-input::placeholder { color: rgba(255,255,255,0.2); }
        .edit-btn:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.2) !important; color: rgba(255,255,255,0.85) !important; }
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", maxWidth:680 }}>

        {/* Header */}
        <motion.div {...fade(0)}>
          <p style={{ color:"rgba(250,204,21,0.6)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.35rem" }}>
            <PageDot />Conta
          </p>
          <h2 style={{ color:"white", fontWeight:900, fontSize:"1.9rem", letterSpacing:"-0.03em", margin:0 }}>Meu Perfil</h2>
          <p style={{ color:"rgba(255,255,255,0.28)", fontSize:"0.8rem", marginTop:"0.3rem" }}>
            Gerencie suas informações pessoais
          </p>
        </motion.div>

        {/* Alerts */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              key="ok"
              initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
              style={{ background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.22)", borderRadius:"1rem", padding:"0.9rem 1.1rem", display:"flex", alignItems:"center", gap:"0.75rem" }}
            >
              <span>✅</span>
              <p style={{ color:"#4ade80", fontWeight:700, fontSize:"0.82rem", margin:0, fontFamily:FONT }}>Perfil atualizado com sucesso!</p>
            </motion.div>
          )}
          {saveError && (
            <motion.div
              key="err"
              initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
              style={{ background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.22)", borderRadius:"1rem", padding:"0.9rem 1.1rem", display:"flex", alignItems:"center", gap:"0.75rem" }}
            >
              <span>⚠️</span>
              <p style={{ color:"#f87171", fontWeight:700, fontSize:"0.82rem", margin:0, fontFamily:FONT }}>{saveError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile card */}
        <motion.div {...fade(0.12)} style={{ ...GLASS, overflow:"hidden" }}>

          {/* Cover banner */}
          <div style={{
            height    : 100,
            position  : "relative",
            background: "linear-gradient(130deg,rgba(250,204,21,0.12) 0%,rgba(17,34,64,0.85) 55%,rgba(6,14,28,0.95) 100%)",
            overflow  : "hidden",
          }}>
            {/* Subtle grid overlay */}
            <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.07 }} xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="pg" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#pg)" />
            </svg>

            {/* Avatar */}
            <div style={{ position:"absolute", bottom:-22, left:"1.5rem" }}>
              <div style={{
                width       : 72, height:72,
                borderRadius: "1.25rem",
                background  : "linear-gradient(135deg,#facc15 0%,#f59e0b 100%)",
                display     : "flex", alignItems:"center", justifyContent:"center",
                color       : "#0b1d38",
                fontWeight  : 900, fontSize:"1.5rem",
                fontFamily  : FONT,
                border      : "3px solid rgba(6,14,28,0.9)",
                boxShadow   : "0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(250,204,21,0.3)",
              }}>
                {initials}
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ paddingTop:"2.25rem", padding:"2.25rem 1.5rem 1.75rem" }}>

            {/* Name row */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"1rem" }}>
              <div>
                <h3 style={{ color:"white", fontWeight:800, fontSize:"1.2rem", margin:0, letterSpacing:"-0.02em" }}>
                  {form.nome || "—"}
                </h3>
                <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.78rem", marginTop:3 }}>{form.email}</p>

                {/* Badges */}
                <div style={{ display:"flex", gap:"0.4rem", marginTop:"0.75rem", flexWrap:"wrap" }}>
                  {[
                    { label:"Aluno",                  bg:"rgba(96,165,250,0.12)", border:"rgba(96,165,250,0.25)", color:"#93c5fd" },
                    { label:`${currentUser.balance ?? 0} moedas`, bg:"rgba(250,204,21,0.1)", border:"rgba(250,204,21,0.25)", color:"#facc15" },
                    ...(form.ra ? [{ label:`RA ${form.ra}`, bg:"rgba(74,222,128,0.08)", border:"rgba(74,222,128,0.2)", color:"#86efac" }] : []),
                  ].map(b => (
                    <span key={b.label} style={{
                      background  : b.bg,
                      border      : `1px solid ${b.border}`,
                      color       : b.color,
                      fontSize    : "0.68rem",
                      fontWeight  : 700,
                      padding     : "0.25rem 0.65rem",
                      borderRadius: "999px",
                      fontFamily  : FONT,
                    }}>{b.label}</span>
                  ))}
                </div>
              </div>

              {/* Edit toggle */}
              <button
                className="edit-btn"
                onClick={() => { setEditing(!editing); setSaveError(null); }}
                style={{
                  padding     : "0.5rem 1rem",
                  borderRadius: "0.75rem",
                  background  : "rgba(255,255,255,0.05)",
                  border      : "1px solid rgba(255,255,255,0.1)",
                  color       : "rgba(255,255,255,0.5)",
                  fontSize    : "0.78rem",
                  fontWeight  : 600,
                  cursor      : "pointer",
                  fontFamily  : FONT,
                  whiteSpace  : "nowrap",
                  transition  : "all 0.18s",
                  flexShrink  : 0,
                }}
              >
                {editing ? "Cancelar" : "✏️ Editar"}
              </button>
            </div>

            {/* Divider */}
            <div style={{ height:1, background:"rgba(255,255,255,0.06)", margin:"1.5rem 0" }} />

            {/* Fields */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.1rem" }}>
              {fields.map(field => (
                <div key={field.key} style={{ gridColumn: field.col === 2 ? "1 / -1" : "auto" }}>
                  <label style={{
                    display      : "block",
                    color        : "rgba(255,255,255,0.32)",
                    fontSize     : "0.62rem",
                    fontWeight   : 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom : "0.45rem",
                    fontFamily   : FONT,
                  }}>
                    {field.label}
                  </label>

                  {editing ? (
                    <input
                      type={field.type}
                      value={form[field.key]}
                      placeholder={field.placeholder || ""}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className="prof-input"
                      style={inputStyle}
                    />
                  ) : (
                    <p style={{
                      color     : field.key === "senha" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.78)",
                      fontWeight: 600,
                      fontSize  : "0.85rem",
                      fontFamily: FONT,
                      margin    : 0,
                    }}>
                      {field.key === "senha"
                        ? "••••••••"
                        : (form[field.key] ||
                          <span style={{ color:"rgba(255,255,255,0.18)", fontStyle:"italic", fontWeight:400 }}>
                            Não informado
                          </span>)
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Save button */}
            <AnimatePresence>
              {editing && (
                <motion.div
                  initial={{ opacity:0, y:6 }}
                  animate={{ opacity:1, y:0 }}
                  exit   ={{ opacity:0, y:4 }}
                  style={{ marginTop:"1.75rem", display:"flex", gap:"0.75rem", alignItems:"center" }}
                >
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      padding     : "0.75rem 2rem",
                      borderRadius: "0.875rem",
                      border      : "none",
                      background  : saving
                        ? "rgba(255,255,255,0.08)"
                        : "linear-gradient(135deg,#facc15 0%,#f59e0b 100%)",
                      color       : saving ? "rgba(255,255,255,0.3)" : "#0b1d38",
                      fontWeight  : 800,
                      fontSize    : "0.88rem",
                      cursor      : saving ? "not-allowed" : "pointer",
                      fontFamily  : FONT,
                      transition  : "all 0.2s",
                      boxShadow   : saving ? "none" : "0 4px 20px rgba(250,204,21,0.3)",
                    }}
                  >
                    {saving ? "Salvando…" : "Salvar alterações →"}
                  </button>
                  {saving && (
                    <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.75rem", fontFamily:FONT, margin:0 }}>
                      Aguarde…
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}