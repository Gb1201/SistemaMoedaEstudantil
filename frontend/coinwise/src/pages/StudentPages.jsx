import { useState } from "react";
import { motion } from "framer-motion";
import { TransactionItem } from "../components/TransactionItem";
import { RewardCard } from "../components/TransactionItem";
import Modal from "../components/Modal";
import { mockTransactions, mockRewards } from "../data/mockData";
import { alunosApi } from "../api/api";

export function StudentTransactions({ currentUser }) {
  const [filter, setFilter] = useState("all");
  const myTx = mockTransactions.filter(tx => tx.studentId === currentUser.id);
  const filtered = filter === "all" ? myTx : myTx.filter(t => t.type === filter);

  const totals = {
    received: myTx.filter(t => t.type === "received").reduce((s, t) => s + t.amount, 0),
    spent: myTx.filter(t => t.type === "spent").reduce((s, t) => s + t.amount, 0),
  };

  return (
    <div className="space-y-6" style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem", width: "calc(100% + 3rem)" }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-white font-black text-2xl">Extrato</h2>
        <p className="text-white/40 text-sm mt-0.5">Histórico completo de movimentações</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Saldo atual", value: currentUser.balance, color: "text-yellow-400", bg: "bg-yellow-400/10" },
          { label: "Total recebido", value: `+${totals.received}`, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Total gasto", value: `-${totals.spent}`, color: "text-red-400", bg: "bg-red-500/10" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`${s.bg} rounded-2xl p-4 text-center border border-white shadow-sm`}>
            <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-white/40 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(14px)" }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-white font-bold">Movimentações</h3>
          <div className="flex gap-2">
            {[["all", "Todos"], ["received", "Recebidos"], ["spent", "Gastos"]].map(([val, lbl]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === val ? "bg-blue-900 text-white" : "bg-white/8 text-white/50 hover:bg-white/12"}`}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filtered.map((tx, i) => <TransactionItem key={tx.id} tx={tx} index={i} />)}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-white/30">
              <p className="text-4xl mb-2">📭</p>
              <p className="text-sm">Nenhuma transação encontrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function StudentRewards({ currentUser }) {
  const [redeemTarget, setRedeemTarget] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(mockRewards.map(r => r.category))];
  const filtered = filter === "all" ? mockRewards : mockRewards.filter(r => r.category === filter);

  const handleRedeem = (reward) => {
    setRedeemTarget(reward);
  };

  const confirmRedeem = () => {
    setSuccess(redeemTarget.name);
    setRedeemTarget(null);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="space-y-6" style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem", width: "calc(100% + 3rem)" }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-white font-black text-2xl">Vantagens</h2>
        <p className="text-white/40 text-sm mt-0.5">Troque suas moedas por benefícios reais</p>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-green-700 font-bold text-sm">Resgate confirmado!</p>
            <p className="text-green-600 text-xs">{success} foi resgatado com sucesso.</p>
          </div>
        </motion.div>
      )}

      {/* Balance badge */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-xs">Seu saldo disponível</p>
          <p className="text-yellow-400 font-black text-3xl">{currentUser.balance} <span className="text-lg text-yellow-400/60">moedas</span></p>
        </div>
        <span className="text-4xl">◈</span>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${filter === cat ? "bg-blue-900 text-white" : "bg-white/5 text-white/50 border border-white/10 hover:border-yellow-400/50"}`}>
            {cat === "all" ? "Todos" : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((reward, i) => (
          <RewardCard key={reward.id} reward={{ ...reward, canAfford: currentUser.balance >= reward.cost }}
            onRedeem={handleRedeem} index={i} />
        ))}
      </div>

      <Modal
        open={!!redeemTarget}
        onClose={() => setRedeemTarget(null)}
        onConfirm={confirmRedeem}
        title="Confirmar resgate"
        confirmLabel="Resgatar agora"
        confirmColor="yellow"
      >
        {redeemTarget && (
          <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{redeemTarget.image}</span>
              <div>
                <p className="text-white font-bold text-sm">{redeemTarget.name}</p>
                <p className="text-white/40 text-xs">{redeemTarget.company}</p>
                <p className="text-yellow-600 font-black text-lg mt-1">-{redeemTarget.cost} moedas</p>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-3">Saldo após resgate: <strong className="text-white/80">{currentUser.balance - redeemTarget.cost} moedas</strong></p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function StudentProfile({ currentUser }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [form, setForm] = useState({
    nome:        currentUser.nome        || currentUser.name        || "",
    email:       currentUser.email                                  || "",
    senha:       "",
    endereco:    currentUser.endereco    || currentUser.address     || "",
    curso:       currentUser.curso       || currentUser.course      || "",
    cpf:         currentUser.cpf                                    || "",
    rg:          currentUser.rg                                     || "",
    ra:          currentUser.ra                                     || "",
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

  const F = "'Sora','Nunito',sans-serif";
  const inputStyle = {
    width: "100%", padding: "0.65rem 0.875rem",
    borderRadius: "0.75rem",
    border: "1.5px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "white", fontSize: "0.82rem",
    fontFamily: F, outline: "none",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  };

  const initials = form.nome
    .split(" ").map(p => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?";

  const fields = [
    { label: "Nome completo", key: "nome",        type: "text",     col: 2 },
    { label: "Email",         key: "email",       type: "email",    col: 2 },
    { label: "Nova senha",    key: "senha",       type: "password", col: 2, placeholder: "Deixe em branco para não alterar" },
    { label: "Curso",         key: "curso",       type: "text",     col: 1 },
    { label: "Instituição",   key: "instituicao", type: "text",     col: 1 },
    { label: "RA",            key: "ra",          type: "text",     col: 1 },
    { label: "CPF",           key: "cpf",         type: "text",     col: 1 },
    { label: "RG",            key: "rg",          type: "text",     col: 1 },
    { label: "Endereço",      key: "endereco",    type: "text",     col: 2 },
  ];

  return (
    <div style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.5rem", margin: "-1.5rem", width: "calc(100% + 3rem)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        .prof-input:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; }
        .prof-input::placeholder { color:rgba(255,255,255,0.22); }
      `}</style>
      <div className="space-y-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-white font-black text-2xl">Meu Perfil</h2>
          <p className="text-white/40 text-sm mt-0.5">Gerencie suas informações pessoais</p>
        </motion.div>

        {saveSuccess && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}>
            <span className="text-xl">✅</span>
            <p style={{ color: "#4ade80", fontWeight: 600, fontSize: "0.875rem", fontFamily: F, margin: 0 }}>Perfil atualizado com sucesso!</p>
          </motion.div>
        )}
        {saveError && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)" }}>
            <span className="text-xl">⚠️</span>
            <p style={{ color: "#f87171", fontWeight: 600, fontSize: "0.875rem", fontFamily: F, margin: 0 }}>{saveError}</p>
          </motion.div>
        )}

        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {/* Cover */}
          <div className="h-24 relative" style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.15) 0%, rgba(30,58,95,0.8) 60%, rgba(15,23,42,0.9) 100%)" }}>
            <div className="absolute -bottom-10 left-6">
              <div className="w-20 h-20 rounded-2xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-2xl shadow-lg"
                style={{ border: "4px solid rgba(15,23,42,0.8)", fontFamily: F }}>
                {initials}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="pt-14 px-6 pb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold text-xl" style={{ fontFamily: F }}>{form.nome || "—"}</h3>
                <p className="text-white/40 text-sm">{form.email}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">Aluno</span>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full">{currentUser.balance} moedas</span>
                  {form.ra && <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">RA: {form.ra}</span>}
                </div>
              </div>
              <button
                onClick={() => { setEditing(!editing); setSaveError(null); }}
                className="px-4 py-2 rounded-xl border border-white/15 text-white/60 text-sm font-medium hover:bg-white/8 transition-colors"
                style={{ fontFamily: F }}>
                {editing ? "Cancelar" : "✏️ Editar"}
              </button>
            </div>

            {/* Fields grid */}
            <div className="mt-6" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {fields.map(field => (
                <div key={field.key} style={{ gridColumn: field.col === 2 ? "1 / -1" : "auto" }}>
                  <label style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem", fontFamily: F }}>
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
                    <p style={{ color: field.key === "senha" ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.85rem", fontFamily: F, margin: 0 }}>
                      {field.key === "senha"
                        ? "••••••••"
                        : form[field.key] || <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic", fontWeight: 400 }}>Não informado</span>}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Save button */}
            {editing && (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={handleSave}
                disabled={saving}
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem 2rem",
                  borderRadius: "0.875rem", border: "none",
                  background: saving ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #facc15, #f59e0b)",
                  color: saving ? "rgba(255,255,255,0.3)" : "#1e3a5f",
                  fontWeight: 800, fontSize: "0.9rem",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontFamily: F, transition: "all 0.2s",
                }}>
                {saving ? "Salvando..." : "Salvar alterações →"}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}