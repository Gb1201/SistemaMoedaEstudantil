import { useState } from "react";
import { motion } from "framer-motion";
import { StatCard } from "../components/Card";
import { RewardCard } from "../components/TransactionItem";
import Modal from "../components/Modal";
import { mockRewards } from "../data/mockData";

export function CompanyDashboard({ currentUser, onNavigate }) {
  const myRewards = mockRewards.filter(r => r.companyId === currentUser.id);
  const totalRedeemed = myRewards.reduce((s, r) => s + r.totalRedeemed, 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Dashboard da Empresa</h2>
        <p className="text-gray-400 text-sm mt-0.5">{currentUser.description}</p>
      </motion.div>

      {/* Company header card */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-700 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 right-12 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-xl">{currentUser.avatar}</div>
              <div>
                <p className="text-white font-black text-xl">{currentUser.name}</p>
                <span className="bg-white/20 text-white/80 text-xs px-2 py-0.5 rounded-full">{currentUser.category}</span>
              </div>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("create-reward")}
            className="bg-yellow-400 text-teal-900 font-bold px-5 py-2.5 rounded-xl shadow-lg hover:bg-yellow-300 transition-all text-sm">
            + Nova Vantagem
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎁" label="Vantagens ativas" value={myRewards.filter(r => r.available).length} color="teal" delay={0.1} />
        <StatCard icon="◈" label="Total de resgates" value={totalRedeemed} color="yellow" delay={0.15} />
        <StatCard icon="👨‍🎓" label="Alunos impactados" value={totalRedeemed} color="blue" delay={0.2} />
        <StatCard icon="⭐" label="Avaliação média" value="4.8" color="green" delay={0.25} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 font-bold">Minhas vantagens</h3>
          <button onClick={() => onNavigate("company-rewards")} className="text-teal-700 text-sm font-semibold hover:underline">Ver todas →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {myRewards.map((r, i) => (
            <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <span className="text-2xl">{r.image}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 font-medium text-sm truncate">{r.name}</p>
                <p className="text-gray-400 text-xs">{r.totalRedeemed} resgates · {r.cost} moedas</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.available ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                {r.available ? "Ativo" : "Esgotado"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CreateRewardPage({ currentUser }) {
  const [form, setForm] = useState({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);

  const categories = ["Alimentação", "Educação", "Cursos", "Brinde", "Serviços", "Entretenimento"];
  const emojis = ["🎁", "☕", "📚", "💻", "🍕", "🎮", "✏️", "🏷️", "🛍️", "🎓"];

  const handleChange = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-gray-800 font-black text-2xl">Nova Vantagem</h2>
        <p className="text-gray-400 text-sm mt-0.5">Crie uma vantagem para os alunos resgatarem</p>
      </motion.div>

      {success && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <p className="text-green-700 font-bold">Vantagem criada com sucesso! Alunos já podem ver e resgatar.</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-600 text-sm font-bold block mb-2">Nome da vantagem *</label>
              <input value={form.name} onChange={handleChange("name")} required placeholder="Ex: Combo Lanche + Café"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 transition-all" />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-bold block mb-2">Custo em moedas *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 font-black">◈</span>
                <input type="number" value={form.cost} onChange={handleChange("cost")} required min="1" placeholder="Ex: 50"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 transition-all" />
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm font-bold block mb-2">Categoria</label>
              <select value={form.category} onChange={handleChange("category")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 transition-all">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-gray-600 text-sm font-bold block mb-2">Ícone</label>
              <div className="flex flex-wrap gap-2">
                {emojis.map(e => (
                  <button type="button" key={e} onClick={() => setForm(f => ({ ...f, image: e }))}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all border-2 ${form.image === e ? "border-teal-700 bg-teal-50" : "border-gray-100 hover:border-gray-200 bg-gray-50"}`}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm font-bold block mb-2">Descrição *</label>
              <textarea value={form.description} onChange={handleChange("description")} required
                placeholder="Descreva os detalhes da vantagem, condições de uso, validade..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 transition-all resize-none" />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setPreview(true)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                Pré-visualizar
              </button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                className="flex-1 bg-teal-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-teal-800 transition-all shadow-lg">
                Publicar Vantagem
              </motion.button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
            <p className="text-teal-800 font-bold text-sm mb-2">💡 Dicas para uma boa vantagem</p>
            <ul className="space-y-1.5 text-teal-700 text-xs">
              {["Defina um custo justo e atrativo", "Seja claro sobre o que está incluído", "Adicione condições de uso se necessário", "Vantagens únicas geram mais interesse"].map(t => (
                <li key={t} className="flex items-start gap-1.5">
                  <span className="text-teal-500 mt-0.5">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-gray-600 font-bold text-sm mb-2">📊 Estatísticas da plataforma</p>
            <div className="space-y-2">
              {[["Resgates hoje", "12"], ["Alunos ativos", "248"], ["Moedas circulando", "5.430"]].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <p className="text-gray-500 text-xs">{l}</p>
                  <p className="text-gray-700 font-bold text-xs">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal open={preview} onClose={() => setPreview(false)} title="Pré-visualização" confirmLabel="Fechar" onConfirm={() => setPreview(false)} confirmColor="blue">
        {form.name && (
          <RewardCard reward={{ ...form, company: currentUser.name, available: true, totalRedeemed: 0, canAfford: true, cost: Number(form.cost) || 0 }} />
        )}
      </Modal>
    </div>
  );
}

export function CompanyRewardsList({ currentUser, onNavigate }) {
  const myRewards = mockRewards.filter(r => r.companyId === currentUser.id);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-800 font-black text-2xl">Minhas Vantagens</h2>
          <p className="text-gray-400 text-sm mt-0.5">{myRewards.length} vantagens cadastradas</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => onNavigate("create-reward")}
          className="bg-teal-700 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-teal-800 transition-all shadow-lg">
          + Nova vantagem
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myRewards.map((reward, i) => (
          <RewardCard key={reward.id} reward={{ ...reward, canAfford: true }} index={i} />
        ))}
      </div>

      {myRewards.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-6xl mb-4">🎁</p>
          <p className="font-bold text-gray-600 text-lg">Nenhuma vantagem ainda</p>
          <p className="text-sm mt-1">Crie sua primeira vantagem para os alunos!</p>
        </div>
      )}
    </div>
  );
}