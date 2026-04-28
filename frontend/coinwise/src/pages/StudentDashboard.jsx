import { motion } from "framer-motion";
import { BalanceCard, StatCard } from "../components/Card";
import { TransactionItem } from "../components/TransactionItem";
import { mockTransactions } from "../data/mockData";

export default function StudentDashboard({ currentUser, onNavigate }) {
  const myTx = mockTransactions.filter(tx => tx.studentId === currentUser.id).slice(0, 4);
  const received = myTx.filter(t => t.type === "received").reduce((s, t) => s + t.amount, 0);
  const spent = myTx.filter(t => t.type === "spent").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Dashboard</h2>
        <p className="text-gray-400 text-sm mt-0.5">Visão geral da sua conta</p>
      </motion.div>

      {/* Balance + stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <BalanceCard balance={currentUser.balance} subtitle={`RA: ${currentUser.ra}`} trend={+175} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <StatCard icon="↓" label="Recebido (mês)" value={`+${received}`} color="green" delay={0.1} />
          <StatCard icon="↑" label="Gasto (mês)" value={`-${spent}`} color="red" delay={0.15} />
          <StatCard icon="🎁" label="Resgates" value="2" color="yellow" delay={0.2} />
        </div>
      </div>

      {/* Recent transactions + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800 font-bold">Transações recentes</h3>
              <button onClick={() => onNavigate("student-transactions")}
                className="text-blue-900 text-sm font-semibold hover:underline">Ver tudo →</button>
            </div>
            <div className="space-y-2">
              {myTx.length > 0 ? myTx.map((tx, i) => (
                <TransactionItem key={tx.id} tx={tx} index={i} />
              )) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-4xl mb-2">📭</p>
                  <p className="text-sm">Nenhuma transação ainda</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-800 font-bold mb-3">Ações rápidas</h3>
            <div className="space-y-2">
              {[
                { icon: "🎁", label: "Resgatar vantagens", page: "student-rewards", color: "bg-yellow-50 text-yellow-700 border-yellow-100 hover:bg-yellow-100" },
                { icon: "↕", label: "Ver extrato completo", page: "student-transactions", color: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100" },
                { icon: "◉", label: "Editar perfil", page: "student-profile", color: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100" },
              ].map(a => (
                <motion.button key={a.page} whileHover={{ x: 3 }} onClick={() => onNavigate(a.page)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border ${a.color} transition-all text-sm font-medium`}>
                  <span>{a.icon}</span>{a.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Ranking */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full" />
            <p className="text-white/60 text-xs font-medium mb-1">Seu ranking</p>
            <p className="text-white font-black text-3xl">#3</p>
            <p className="text-yellow-400 text-sm font-medium">Top da turma! 🏆</p>
            <p className="text-white/50 text-xs mt-2">Você está entre os melhores alunos do semestre</p>
          </div>
        </div>
      </div>
    </div>
  );
}