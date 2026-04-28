import { useState } from "react";
import { motion } from "framer-motion";
import { mockUsers } from "../data/mockData";

const allUsers = [...mockUsers.students, ...mockUsers.teachers, ...mockUsers.companies];

export default function LoginPage({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 800));
    const user = allUsers.find(u => u.email === email);
    if (user && password === "123456") {
      onLogin(user);
    } else {
      setError("Email ou senha inválidos. Use a senha: 123456");
    }
    setLoading(false);
  };

  const quickLogin = (role) => {
    const map = { student: mockUsers.students[0], teacher: mockUsers.teachers[0], company: mockUsers.companies[0] };
    onLogin(map[role]);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-400/5 rounded-full" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-yellow-400/5 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xl shadow-lg">
              ◈
            </div>
            <div>
              <p className="text-white font-bold text-xl">CoinWise</p>
              <p className="text-white/50 text-xs">Sistema de Moeda Estudantil</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white font-black text-4xl leading-tight"
          >
            Reconheça o mérito<br />
            <span className="text-yellow-400">estudantil</span> de forma<br />
            inovadora.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/50 text-base leading-relaxed max-w-md"
          >
            Professores recompensam alunos com moedas digitais. Alunos trocam por vantagens reais em empresas parceiras.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            {[
              { icon: "👨‍🎓", label: "Para Alunos", desc: "Ganhe e resgate" },
              { icon: "👨‍🏫", label: "Professores", desc: "Reconheça mérito" },
              { icon: "🏢", label: "Empresas", desc: "Ofereça vantagens" },
            ].map((item, i) => (
              <div key={i} className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-2xl mb-1">{item.icon}</p>
                <p className="text-white font-semibold text-xs">{item.label}</p>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 text-white/30 text-xs">
          © 2025 CoinWise. Todos os direitos reservados.
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xl">◈</div>
            <p className="text-white font-bold text-xl">CoinWise</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <h3 className="text-gray-800 font-black text-2xl">Entrar na plataforma</h3>
              <p className="text-gray-500 text-sm mt-1">Acesse sua conta para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium block mb-1.5">Email institucional</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@escola.edu.br"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium block mb-1.5">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg border border-red-100"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-800 transition-all disabled:opacity-70"
              >
                {loading ? "Entrando..." : "Entrar"}
              </motion.button>
            </form>

            <div className="mt-6">
              <p className="text-center text-gray-400 text-xs mb-3">— ou acesse rapidamente —</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: "student", label: "Aluno", icon: "👨‍🎓", color: "border-blue-200 hover:bg-blue-50 hover:border-blue-400" },
                  { role: "teacher", label: "Professor", icon: "👨‍🏫", color: "border-purple-200 hover:bg-purple-50 hover:border-purple-400" },
                  { role: "company", label: "Empresa", icon: "🏢", color: "border-teal-200 hover:bg-teal-50 hover:border-teal-400" },
                ].map(q => (
                  <button
                    key={q.role}
                    onClick={() => quickLogin(q.role)}
                    className={`border-2 ${q.color} rounded-xl p-2.5 text-center transition-all`}
                  >
                    <p className="text-xl">{q.icon}</p>
                    <p className="text-gray-600 text-xs font-medium mt-0.5">{q.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6">
              Não tem conta?{" "}
              <button onClick={onGoRegister} className="text-blue-900 font-semibold hover:underline">
                Cadastre-se
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}