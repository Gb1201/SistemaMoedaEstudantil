import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alunosApi } from "../api/api";

// ── Modal de Feedback ────────────────────────────────────────────────────────

function FeedbackModal({ type, message, onClose }) {
  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={isSuccess ? undefined : onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10, 20, 40, 0.65)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.85, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#ffffff",
            borderRadius: "1.5rem",
            padding: "2.5rem 2rem",
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 32px 64px rgba(0,0,0,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 6,
              background: isSuccess
                ? "linear-gradient(90deg, #22c55e, #86efac)"
                : "linear-gradient(90deg, #ef4444, #fca5a5)",
              borderRadius: "1.5rem 1.5rem 0 0",
            }}
          />

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
            style={{
              width: 72, height: 72,
              borderRadius: "50%",
              background: isSuccess ? "#f0fdf4" : "#fef2f2",
              border: `2px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.25rem",
            }}
          >
            {isSuccess ? (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <motion.path
                  d="M7 16.5L13 22.5L25 10"
                  stroke="#22c55e" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
                />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <motion.path
                  d="M16 10V17M16 22V22.5"
                  stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                />
              </svg>
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.5rem" }}
          >
            {isSuccess ? "Cadastro realizado!" : "Ops, algo deu errado"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            style={{ fontSize: "0.875rem", color: "#64748b", margin: "0 0 1.75rem", lineHeight: 1.6 }}
          >
            {message}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onClose}
            style={{
              width: "100%", padding: "0.75rem",
              borderRadius: "0.875rem", border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: "0.9rem",
              background: isSuccess
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#ffffff", letterSpacing: "0.01em",
            }}
          >
            {isSuccess ? "Ir para o login" : "Tentar novamente"}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────

export default function RegisterPage({ onGoLogin }) {
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    ra: "", company: "", cnpj: "", cpf: "", rg: "",
    endereco: "", instituicao: "", curso: "",
  });

  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const formatCPF = (v) =>
    v.replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);

  const formatRG = (v) =>
    v.replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1})$/, "$1-$2")
      .slice(0, 12);

  const handleCPFChange = (e) => setForm((f) => ({ ...f, cpf: formatCPF(e.target.value) }));
  const handleRGChange  = (e) => setForm((f) => ({ ...f, rg:  formatRG(e.target.value)  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload =
      role === "student"
        ? {
            nome: form.name, email: form.email, senha: form.password,
            cpf: form.cpf, rg: form.rg, ra: form.ra,
            instituicao: form.instituicao, curso: form.curso,
            endereco: form.endereco, perfil: "aluno",
          }
        : {
            nome: form.name, email: form.email, senha: form.password,
            cnpj: form.cnpj, endereco: form.endereco, perfil: "empresa",
          };

    try {
      await alunosApi.criar(payload);
      setModal({
        type: "success",
        message: "Sua conta foi criada com sucesso. Clique abaixo para acessar o sistema.",
      });
    } catch (err) {
      setModal({
        type: "error",
        message: err.message || "Não foi possível concluir o cadastro. Verifique os dados e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    if (modal?.type === "success") onGoLogin();
    setModal(null);
  };

  const roleOptions = [
    { value: "student", label: "Aluno",            icon: "👨‍🎓", desc: "Ganhe e resgate moedas" },
    { value: "company", label: "Empresa Parceira", icon: "🏢",  desc: "Ofereça vantagens"      },
  ];

  return (
    <>
      {modal && (
        <FeedbackModal type={modal.type} message={modal.message} onClose={handleModalClose} />
      )}

      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">

          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xl">◈</div>
            <p className="text-white font-bold text-xl">CoinWise</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-gray-800 font-black text-2xl mb-1">Criar conta</h3>
            <p className="text-gray-500 text-sm mb-6">Junte-se ao sistema de moeda estudantil</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {roleOptions.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    role === r.value ? "border-blue-900 bg-blue-50" : "border-gray-100 hover:border-gray-200"
                  }`}
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
                <input type="email" value={form.email} onChange={handleChange("email")} required
                  placeholder={role === "student" ? "seu@escola.edu.br" : "contato@empresa.com"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
              </div>

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
                    <select value={form.instituicao} onChange={handleChange("instituicao")} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all appearance-none cursor-pointer">
                      <option value="" disabled>Selecione a instituição</option>
                      <option value="PUCMINAS">PUCMINAS</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm font-medium block mb-1.5">Curso</label>
                    <input value={form.curso} onChange={handleChange("curso")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all" />
                  </div>
                </>
              )}

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

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" disabled={loading}
                className="w-full bg-yellow-400 text-blue-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-yellow-300 transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4 text-blue-900" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {loading ? "Cadastrando..." : "Criar conta"}
              </motion.button>
            </form>

            <p className="text-center text-gray-400 text-xs mt-4">
              Já tem conta?{" "}
              <button onClick={onGoLogin} className="text-blue-900 font-semibold hover:underline">Entrar</button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}