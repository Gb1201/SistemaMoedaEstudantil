import { useState } from "react";
import { motion } from "framer-motion";
import { TransactionItem } from "../components/TransactionItem";
import { RewardCard } from "../components/TransactionItem";
import Modal from "../components/Modal";
import { mockTransactions, mockRewards } from "../data/mockData";

export function StudentTransactions({ currentUser }) {
  const [filter, setFilter] = useState("all");
  const myTx = mockTransactions.filter(tx => tx.studentId === currentUser.id);
  const filtered = filter === "all" ? myTx : myTx.filter(t => t.type === filter);

  const totals = {
    received: myTx.filter(t => t.type === "received").reduce((s, t) => s + t.amount, 0),
    spent: myTx.filter(t => t.type === "spent").reduce((s, t) => s + t.amount, 0),
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Extrato</h2>
        <p className="text-gray-400 text-sm mt-0.5">Histórico completo de movimentações</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Saldo atual", value: currentUser.balance, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Total recebido", value: `+${totals.received}`, color: "text-green-600", bg: "bg-green-50" },
          { label: "Total gasto", value: `-${totals.spent}`, color: "text-red-500", bg: "bg-red-50" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`${s.bg} rounded-2xl p-4 text-center border border-white shadow-sm`}>
            <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-gray-800 font-bold">Movimentações</h3>
          <div className="flex gap-2">
            {[["all", "Todos"], ["received", "Recebidos"], ["spent", "Gastos"]].map(([val, lbl]) => (
              <button key={val} onClick={() => setFilter(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === val ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filtered.map((tx, i) => <TransactionItem key={tx.id} tx={tx} index={i} />)}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
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
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Vantagens</h2>
        <p className="text-gray-400 text-sm mt-0.5">Troque suas moedas por benefícios reais</p>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
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
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${filter === cat ? "bg-blue-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-900"}`}>
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
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{redeemTarget.image}</span>
              <div>
                <p className="text-gray-800 font-bold text-sm">{redeemTarget.name}</p>
                <p className="text-gray-500 text-xs">{redeemTarget.company}</p>
                <p className="text-yellow-600 font-black text-lg mt-1">-{redeemTarget.cost} moedas</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-3">Saldo após resgate: <strong className="text-gray-700">{currentUser.balance - redeemTarget.cost} moedas</strong></p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function StudentProfile({ currentUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: currentUser.name, email: currentUser.email, course: currentUser.course, semester: currentUser.semester });

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Meu Perfil</h2>
        <p className="text-gray-400 text-sm mt-0.5">Gerencie suas informações pessoais</p>
      </motion.div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-900 to-blue-700 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl bg-yellow-400 border-4 border-white flex items-center justify-center text-blue-900 font-black text-2xl shadow-lg">
              {currentUser.avatar}
            </div>
          </div>
        </div>
        <div className="pt-14 px-6 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-800 font-bold text-xl">{currentUser.name}</h3>
              <p className="text-gray-400 text-sm">{currentUser.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">Aluno</span>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full">{currentUser.balance} moedas</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">RA: {currentUser.ra}</span>
              </div>
            </div>
            <button onClick={() => setEditing(!editing)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
              {editing ? "Cancelar" : "✏️ Editar"}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: "Curso", key: "course" },
              { label: "Semestre", key: "semester" },
              { label: "Nome completo", key: "name" },
              { label: "Email", key: "email" },
            ].map(field => (
              <div key={field.key}>
                <label className="text-gray-400 text-xs font-medium block mb-1">{field.label}</label>
                {editing ? (
                  <input value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm focus:outline-none focus:border-blue-900" />
                ) : (
                  <p className="text-gray-700 font-medium text-sm">{form[field.key]}</p>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setEditing(false)}
              className="mt-4 px-6 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors">
              Salvar alterações
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}