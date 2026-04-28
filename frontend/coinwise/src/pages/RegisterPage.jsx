import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterPage({ onGoLogin }) {
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    ra: "",
    company: "",
    cnpj: "",
    cpf: "",
    rg: "",
    endereco: "",
    instituicao: "",
    curso: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatRG = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1})$/, "$1-$2")
      .slice(0, 12);
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setForm(f => ({ ...f, cpf: formatted }));
  };

  const handleRGChange = (e) => {
    const formatted = formatRG(e.target.value);
    setForm(f => ({ ...f, rg: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onGoLogin(); }, 2000);
  };

  const roleOptions = [
    { value: "student", label: "Aluno", icon: "👨‍🎓", desc: "Ganhe e resgate moedas" },
    { value: "company", label: "Empresa Parceira", icon: "🏢", desc: "Ofereça vantagens" },
  ];

  if (success) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-white font-bold text-2xl">Cadastro realizado!</p>
        <p className="text-white/60 mt-2">Redirecionando para o login...</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xl">◈</div>
          <p className="text-white font-bold text-xl">CoinWise</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-gray-800 font-black text-2xl mb-1">Criar conta</h3>
          <p className="text-gray-500 text-sm mb-6">Junte-se ao sistema de moeda estudantil</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {roleOptions.map(r => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${role === r.value ? "border-blue-900 bg-blue-50" : "border-gray-100 hover:border-gray-200"}`}
              >
                <p className="text-xl mb-1">{r.icon}</p>
                <p className={`font-bold text-sm ${role === r.value ? "text-blue-900" : "text-gray-700"}`}>{r.label}</p>
                <p className="text-gray-400 text-xs">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-gray-600 text-sm font-medium block mb-1.5">Nome completo</label>
              <input value={form.name} onChange={handleChange("name")} required placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium block mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={handleChange("email")} required placeholder={role === "student" ? "seu@escola.edu.br" : "contato@empresa.com"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
            </div>

            {/* Campos só para aluno */}
            {role === "student" && (
              <>
                <div>
                  <label className="text-gray-600 text-sm font-medium block mb-1.5">CPF</label>
                  <input value={form.cpf} onChange={handleCPFChange} placeholder="000.000.000-00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
                </div>

                <div>
                  <label className="text-gray-600 text-sm font-medium block mb-1.5">RG</label>
                  <input value={form.rg} onChange={handleRGChange} placeholder="00.000.000-0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
                </div>

                <div>
                  <label className="text-gray-600 text-sm font-medium block mb-1.5">Registro Acadêmico (RA)</label>
                  <input value={form.ra} onChange={handleChange("ra")} placeholder="Ex: 2024001"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
                </div>

                <div>
                  <label className="text-gray-600 text-sm font-medium block mb-1.5">Instituição de Ensino</label>
                  <input value={form.instituicao} onChange={handleChange("instituicao")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
                </div>

                <div>
                  <label className="text-gray-600 text-sm font-medium block mb-1.5">Curso</label>
                  <input value={form.curso} onChange={handleChange("curso")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
                </div>
              </>
            )}

            {/* Endereço (para ambos) */}
            <div>
              <label className="text-gray-600 text-sm font-medium block mb-1.5">Endereço</label>
              <input value={form.endereco} onChange={handleChange("endereco")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
            </div>

            {role === "company" && (
              <div>
                <label className="text-gray-600 text-sm font-medium block mb-1.5">CNPJ</label>
                <input value={form.cnpj} onChange={handleChange("cnpj")} placeholder="00.000.000/0001-00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-600 text-sm font-medium block mb-1.5">Senha</label>
                <input type="password" value={form.password} onChange={handleChange("password")} required placeholder="••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
              </div>
              <div>
                <label className="text-gray-600 text-sm font-medium block mb-1.5">Confirmar</label>
                <input type="password" value={form.confirm} onChange={handleChange("confirm")} required placeholder="••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
              className="w-full bg-yellow-400 text-blue-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-yellow-300 transition-all mt-2">
              Criar conta
            </motion.button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-4">
            Já tem conta?{" "}
            <button onClick={onGoLogin} className="text-blue-900 font-semibold hover:underline">Entrar</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}