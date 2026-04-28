import { useState } from "react";
import { motion } from "framer-motion";
import { BalanceCard, StatCard } from "../components/Card";
import { TransactionItem } from "../components/TransactionItem";
import Modal from "../components/Modal";
import { mockUsers, mockTeacherTransactions } from "../data/mockData";

export function TeacherDashboard({ currentUser, onNavigate }) {
  const totalSent = mockTeacherTransactions.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Dashboard do Professor</h2>
        <p className="text-gray-400 text-sm mt-0.5">Gerencie o reconhecimento dos seus alunos</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <BalanceCard balance={currentUser.balance} label="Moedas disponíveis" subtitle={currentUser.subject} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <StatCard icon="◈" label="Total distribuído" value={totalSent} color="purple" delay={0.1} />
          <StatCard icon="👨‍🎓" label="Alunos premiados" value={mockTeacherTransactions.length} color="blue" delay={0.15} />
          <StatCard icon="📊" label="Média por envio" value={Math.round(totalSent / mockTeacherTransactions.length)} color="teal" delay={0.2} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 font-bold">Últimos envios</h3>
              <button onClick={() => onNavigate("teacher-transactions")} className="text-blue-900 text-sm font-semibold hover:underline">Ver tudo →</button>
            </div>
            <div className="space-y-2">
              {mockTeacherTransactions.slice(0, 3).map((tx, i) => (
                <TransactionItem key={tx.id} tx={{ ...tx, type: "sent", from: "Você", message: tx.message }} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("send-coins")}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 font-bold py-4 rounded-2xl shadow-lg shadow-yellow-200 flex items-center justify-center gap-2 text-base">
            <span className="text-2xl">◈</span>
            Enviar Moedas
          </motion.button>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-800 font-bold mb-3 text-sm">Seus alunos</h3>
            <div className="space-y-2">
              {mockUsers.students.slice(0, 4).map(s => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">{s.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 text-xs font-medium truncate">{s.name}</p>
                    <p className="text-gray-400 text-xs">{s.course}</p>
                  </div>
                  <span className="text-yellow-600 font-bold text-xs">{s.balance} ◈</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SendCoinsPage({ currentUser }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const filtered = mockUsers.students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.ra.includes(search)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent || !amount || !message) return;
    setConfirmOpen(true);
  };

  const confirmSend = () => {
    setConfirmOpen(false);
    setSuccess(true);
    setSelectedStudent(null);
    setAmount("");
    setMessage("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Enviar Moedas</h2>
        <p className="text-gray-400 text-sm mt-0.5">Reconheça o mérito de seus alunos</p>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-green-700 font-bold">Moedas enviadas com sucesso!</p>
            <p className="text-green-600 text-sm">O aluno será notificado.</p>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {/* Teacher balance */}
        <div className="bg-blue-900/5 border border-blue-900/10 rounded-xl p-3 mb-6 flex items-center justify-between">
          <p className="text-gray-600 text-sm">Seu saldo disponível:</p>
          <p className="text-blue-900 font-black text-lg">{currentUser.balance} <span className="text-sm text-blue-900/60">moedas</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Search student */}
          <div>
            <label className="text-gray-600 text-sm font-bold block mb-2">1. Selecionar aluno *</label>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou RA..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all mb-2" />

            <div className="space-y-1 max-h-48 overflow-y-auto">
              {filtered.map(s => (
                <motion.button type="button" key={s.id} whileHover={{ x: 2 }}
                  onClick={() => setSelectedStudent(s)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedStudent?.id === s.id ? "border-blue-900 bg-blue-50" : "border-gray-100 hover:bg-gray-50"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${selectedStudent?.id === s.id ? "bg-blue-900 text-white" : "bg-blue-100 text-blue-700"}`}>{s.avatar}</div>
                  <div className="min-w-0">
                    <p className="text-gray-700 font-medium text-sm">{s.name}</p>
                    <p className="text-gray-400 text-xs">{s.course} · RA: {s.ra}</p>
                  </div>
                  <div className="ml-auto flex-shrink-0 text-right">
                    <p className="text-yellow-600 font-bold text-xs">{s.balance} ◈</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-gray-600 text-sm font-bold block mb-2">2. Quantidade de moedas *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 font-black text-lg">◈</span>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="Ex: 50" min="1" max={currentUser.balance}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
            </div>
            <div className="flex gap-2 mt-2">
              {[10, 25, 50, 100].map(v => (
                <button type="button" key={v} onClick={() => setAmount(String(v))}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${amount === String(v) ? "bg-yellow-400 text-blue-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-gray-600 text-sm font-bold block mb-2">3. Mensagem de reconhecimento *</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} required
              placeholder="Descreva o motivo do reconhecimento (ex: Excelente participação na aula, melhor projeto da turma...)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all resize-none" />
            <p className="text-gray-400 text-xs mt-1">{message.length}/500 caracteres</p>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
            disabled={!selectedStudent || !amount || !message}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg">
            Enviar Moedas →
          </motion.button>
        </form>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={confirmSend}
        title="Confirmar envio" confirmLabel="Enviar agora" confirmColor="yellow">
        {selectedStudent && (
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">Para</p>
              <p className="text-gray-800 font-bold">{selectedStudent.name}</p>
              <p className="text-gray-400 text-xs">{selectedStudent.course}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-50 rounded-xl p-3 text-center border border-yellow-100">
                <p className="text-yellow-600 font-black text-2xl">{amount}</p>
                <p className="text-yellow-600/70 text-xs">moedas</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                <p className="text-blue-700 font-black text-2xl">{currentUser.balance - Number(amount)}</p>
                <p className="text-blue-600/70 text-xs">saldo restante</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Mensagem</p>
              <p className="text-gray-700 text-sm italic">"{message}"</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function TeacherTransactions({ currentUser }) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Histórico de Envios</h2>
        <p className="text-gray-400 text-sm mt-0.5">Todos os reconhecimentos que você fez</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total enviado", value: mockTeacherTransactions.reduce((s, t) => s + t.amount, 0), color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Envios realizados", value: mockTeacherTransactions.length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Saldo restante", value: currentUser.balance, color: "text-yellow-600", bg: "bg-yellow-50" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`${s.bg} rounded-2xl p-4 text-center border border-white shadow-sm`}>
            <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-gray-800 font-bold mb-4">Todos os envios</h3>
        <div className="space-y-2">
          {mockTeacherTransactions.map((tx, i) => (
            <TransactionItem key={tx.id} tx={{ ...tx, type: "sent", from: "Você → " + tx.to, message: tx.message }} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}