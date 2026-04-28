import { motion } from "framer-motion";

export default function HomePage({ onGoLogin, onGoRegister }) {
  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)" }}>
      <div className="w-full flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center relative z-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xl shadow-lg">◈</div>
              <div>
                <p className="text-white font-bold text-xl">CoinWise</p>
                <p className="text-white/50 text-xs">Sistema de Moeda Estudantil</p>
              </div>
            </div>

            <h1 className="text-white font-black text-4xl lg:text-5xl leading-tight">
              Transforme mérito
              <span className="text-yellow-400"> em oportunidades reais.</span>
            </h1>
            <p className="text-white/60 mt-5 text-base lg:text-lg max-w-xl leading-relaxed">
              Uma plataforma para reconhecer o desempenho dos alunos com moedas digitais e conectar escolas a empresas parceiras.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["👨‍🎓 Alunos", "👨‍🏫 Professores", "🏢 Empresas"].map((item) => (
                <span key={item} className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
            <h2 className="text-gray-800 font-black text-2xl">Bem-vindo ao CoinWise</h2>
            <p className="text-gray-500 text-sm mt-1 mb-6">Escolha como deseja continuar na plataforma.</p>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGoLogin}
                className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-800 transition-all"
              >
                Entrar na minha conta
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGoRegister}
                className="w-full bg-yellow-400 text-blue-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-yellow-300 transition-all"
              >
                Criar uma nova conta
              </motion.button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { icon: "⚡", label: "Rápido" },
                { icon: "🔒", label: "Seguro" },
                { icon: "🎯", label: "Intuitivo" },
              ].map((feature) => (
                <div key={feature.label} className="text-center rounded-lg border border-gray-100 py-3 bg-gray-50">
                  <p className="text-lg">{feature.icon}</p>
                  <p className="text-gray-600 text-xs font-medium mt-1">{feature.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
