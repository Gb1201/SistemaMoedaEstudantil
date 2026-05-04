import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alunosApi, empresasApi } from "../api/api";

/* ─── Shared styles ─────────────────────────────────────────── */
const FONT = "'Sora', 'Nunito', sans-serif";

const inputClass = `
  w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none
  bg-white/[0.05] border-white/15 text-white placeholder-white/30
  focus:border-yellow-400/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-yellow-400/15
`.trim();

const labelClass = "text-white/55 text-xs font-semibold uppercase tracking-wider block mb-2";

/* ─── Feedback Modal ─────────────────────────────────────────── */
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
          background: "rgba(10, 20, 40, 0.75)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.88, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "linear-gradient(160deg, #0f172a 0%, #1a2f50 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1.75rem",
            padding: "2.5rem 2rem",
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            position: "relative",
            overflow: "hidden",
            fontFamily: FONT,
          }}
        >
          {/* Top accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 4,
              background: isSuccess
                ? "linear-gradient(90deg, #22c55e, #86efac)"
                : "linear-gradient(90deg, #ef4444, #fca5a5)",
              borderRadius: "1.75rem 1.75rem 0 0",
            }}
          />

          {/* Glow blob */}
          <div
            style={{
              position: "absolute",
              top: -60, left: "50%", transform: "translateX(-50%)",
              width: 200, height: 200,
              borderRadius: "50%",
              background: isSuccess
                ? "rgba(34,197,94,0.08)"
                : "rgba(239,68,68,0.08)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 20, delay: 0.1 }}
            style={{
              width: 72, height: 72,
              borderRadius: "1.25rem",
              background: isSuccess
                ? "rgba(34,197,94,0.15)"
                : "rgba(239,68,68,0.15)",
              border: `1.5px solid ${isSuccess ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0.5rem auto 1.5rem",
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
                  transition={{ duration: 0.45, delay: 0.2 }}
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            style={{
              fontSize: "1.25rem", fontWeight: 800,
              color: "#ffffff", margin: "0 0 0.5rem",
            }}
          >
            {isSuccess ? "Cadastro realizado!" : "Ops, algo deu errado"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            style={{
              fontSize: "0.875rem", color: "rgba(255,255,255,0.5)",
              margin: "0 0 2rem", lineHeight: 1.65,
            }}
          >
            {message}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: isSuccess ? "0 0 20px rgba(34,197,94,0.3)" : "0 0 20px rgba(239,68,68,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            style={{
              width: "100%", padding: "0.8rem",
              borderRadius: "0.875rem", border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: "0.9rem",
              background: isSuccess
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#ffffff", letterSpacing: "0.01em",
              fontFamily: FONT,
            }}
          >
            {isSuccess ? "Ir para o login →" : "Tentar novamente"}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Field Components ───────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div>
      <label className={labelClass} style={{ fontFamily: FONT }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className={inputClass}
      style={{ fontFamily: FONT }}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className={inputClass + " cursor-pointer appearance-none"}
      style={{ fontFamily: FONT }}
    >
      {children}
    </select>
  );
}

/* ─── Progress Steps ─────────────────────────────────────────── */
function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", flex: i < total - 1 ? 1 : "none" }}>
          <div
            style={{
              width: 28, height: 28,
              borderRadius: "50%",
              background: i < current
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : i === current
                ? "linear-gradient(135deg, #facc15, #f59e0b)"
                : "rgba(255,255,255,0.08)",
              border: i === current
                ? "2px solid rgba(250,204,21,0.5)"
                : i < current
                ? "2px solid rgba(34,197,94,0.5)"
                : "2px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.3s",
            }}
          >
            {i < current ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span style={{
                fontSize: "10px", fontWeight: 800,
                color: i === current ? "#1e3a5f" : "rgba(255,255,255,0.3)",
                fontFamily: FONT,
              }}>
                {i + 1}
              </span>
            )}
          </div>
          {i < total - 1 && (
            <div style={{
              flex: 1, height: 2, borderRadius: 2,
              background: i < current
                ? "linear-gradient(90deg, rgba(34,197,94,0.5), rgba(34,197,94,0.2))"
                : "rgba(255,255,255,0.08)",
              transition: "background 0.4s",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function RegisterPage({ onGoLogin }) {
  const [role, setRole] = useState("student");
  const [step, setStep] = useState(0); // 0 = tipo + básico, 1 = dados específicos, 2 = senha
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    ra: "", cnpj: "", cpf: "", rg: "",
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
  const handleRGChange  = (e) => setForm((f) => ({ ...f, rg: formatRG(e.target.value) }));

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
      await (role === "student" ? alunosApi.criar(payload) : empresasApi.criar(payload));
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

  const totalSteps = 3;

  // Step labels
  const stepLabels = ["Perfil", "Dados", "Senha"];

  // Step content
  const steps = [
    /* Step 0 — Role + basic info */
    <motion.div
      key="step0"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Role selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label className={labelClass} style={{ fontFamily: FONT }}>Você é...</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {[
            { value: "student", label: "Aluno", icon: "👨‍🎓", desc: "Ganhe e resgate moedas" },
            { value: "company", label: "Empresa Parceira", icon: "🏢", desc: "Ofereça vantagens" },
          ].map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value)}
              style={{
                padding: "1rem",
                borderRadius: "1rem",
                border: `2px solid ${role === r.value ? "rgba(250,204,21,0.6)" : "rgba(255,255,255,0.1)"}`,
                background: role === r.value ? "rgba(250,204,21,0.1)" : "rgba(255,255,255,0.04)",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: FONT,
              }}
            >
              <p style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{r.icon}</p>
              <p style={{
                fontWeight: 700, fontSize: "0.85rem",
                color: role === r.value ? "#facc15" : "rgba(255,255,255,0.8)",
                marginBottom: "0.2rem",
              }}>
                {r.label}
              </p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>{r.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <Field label="Nome completo">
        <Input
          value={form.name}
          onChange={handleChange("name")}
          required
          placeholder="Seu nome completo"
        />
      </Field>

      <div style={{ marginTop: "1rem" }}>
        <Field label="Email">
          <Input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            required
            placeholder={role === "student" ? "seu@escola.edu.br" : "contato@empresa.com"}
          />
        </Field>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setStep(1)}
        disabled={!form.name || !form.email}
        style={{
          width: "100%", marginTop: "1.5rem",
          padding: "0.875rem",
          borderRadius: "0.875rem", border: "none",
          background: "linear-gradient(135deg, #facc15, #f59e0b)",
          color: "#1e3a5f", fontWeight: 800, fontSize: "0.9rem",
          cursor: form.name && form.email ? "pointer" : "not-allowed",
          opacity: form.name && form.email ? 1 : 0.45,
          fontFamily: FONT, letterSpacing: "0.01em",
          boxShadow: "0 8px 24px rgba(250,204,21,0.2)",
        }}
      >
        Continuar →
      </motion.button>
    </motion.div>,

    /* Step 1 — Role-specific fields */
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {role === "student" ? (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Field label="CPF">
              <Input value={form.cpf} onChange={handleCPFChange} placeholder="000.000.000-00" />
            </Field>
            <Field label="RG">
              <Input value={form.rg} onChange={handleRGChange} placeholder="00.000.000-0" />
            </Field>
          </div>
          <Field label="Registro Acadêmico (RA)">
            <Input value={form.ra} onChange={handleChange("ra")} placeholder="Ex: 2024001" />
          </Field>
          <Field label="Instituição de Ensino">
            <Select value={form.instituicao} onChange={handleChange("instituicao")} required>
              <option value="" disabled style={{ background: "#0f172a" }}>Selecione a instituição</option>
              <option value="PUCMINAS" style={{ background: "#0f172a" }}>PUCMINAS</option>
            </Select>
          </Field>
          <Field label="Curso">
            <Input value={form.curso} onChange={handleChange("curso")} placeholder="Ex: Ciência da Computação" />
          </Field>
          <Field label="Endereço">
            <Input value={form.endereco} onChange={handleChange("endereco")} placeholder="Sua cidade / UF" />
          </Field>
        </>
      ) : (
        <>
          <Field label="CNPJ">
            <Input value={form.cnpj} onChange={handleChange("cnpj")} placeholder="00.000.000/0001-00" />
          </Field>
          <Field label="Endereço da empresa">
            <Input value={form.endereco} onChange={handleChange("endereco")} placeholder="Endereço completo" />
          </Field>
        </>
      )}

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        <button
          type="button"
          onClick={() => setStep(0)}
          style={{
            flex: 1, padding: "0.875rem",
            borderRadius: "0.875rem",
            border: "1.5px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 600, fontSize: "0.875rem",
            cursor: "pointer", fontFamily: FONT,
            transition: "all 0.2s",
          }}
        >
          ← Voltar
        </button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          style={{
            flex: 2, padding: "0.875rem",
            borderRadius: "0.875rem", border: "none",
            background: "linear-gradient(135deg, #facc15, #f59e0b)",
            color: "#1e3a5f", fontWeight: 800, fontSize: "0.9rem",
            cursor: "pointer", fontFamily: FONT,
            boxShadow: "0 8px 24px rgba(250,204,21,0.2)",
          }}
        >
          Continuar →
        </motion.button>
      </div>
    </motion.div>,

    /* Step 2 — Password */
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Field label="Senha">
          <Input
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </Field>
        <Field label="Confirmar senha">
          <Input
            type="password"
            value={form.confirm}
            onChange={handleChange("confirm")}
            required
            placeholder="Repita a senha"
          />
        </Field>

        {/* Password match indicator */}
        {form.confirm.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "0.75rem", fontFamily: FONT,
              color: form.password === form.confirm
                ? "rgba(34,197,94,0.9)"
                : "rgba(239,68,68,0.8)",
            }}
          >
            <span>{form.password === form.confirm ? "✓" : "✗"}</span>
            <span>{form.password === form.confirm ? "Senhas coincidem" : "Senhas não coincidem"}</span>
          </motion.div>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button
          type="button"
          onClick={() => setStep(1)}
          style={{
            flex: 1, padding: "0.875rem",
            borderRadius: "0.875rem",
            border: "1.5px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 600, fontSize: "0.875rem",
            cursor: "pointer", fontFamily: FONT,
          }}
        >
          ← Voltar
        </button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(250,204,21,0.35)" }}
          whileTap={{ scale: 0.98 }}
          disabled={loading || !form.password || form.password !== form.confirm}
          style={{
            flex: 2, padding: "0.875rem",
            borderRadius: "0.875rem", border: "none",
            background: "linear-gradient(135deg, #facc15, #f59e0b)",
            color: "#1e3a5f", fontWeight: 800, fontSize: "0.9rem",
            cursor: loading || !form.password || form.password !== form.confirm
              ? "not-allowed" : "pointer",
            opacity: loading || !form.password || form.password !== form.confirm ? 0.5 : 1,
            fontFamily: FONT,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            boxShadow: "0 8px 24px rgba(250,204,21,0.2)",
          }}
        >
          {loading && (
            <svg
              style={{ animation: "spin 0.8s linear infinite", width: 16, height: 16 }}
              viewBox="0 0 24 24" fill="none"
            >
              <circle opacity={0.25} cx="12" cy="12" r="10" stroke="#1e3a5f" strokeWidth="4" />
              <path opacity={0.75} fill="#1e3a5f" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
          {loading ? "Cadastrando..." : "Criar minha conta ✓"}
        </motion.button>
      </div>
    </motion.div>,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }

        input::placeholder, select::placeholder { color: rgba(255,255,255,0.28); }
        select option { background: #0f172a; color: white; }

        input:focus, select:focus {
          border-color: rgba(250,204,21,0.5) !important;
          box-shadow: 0 0 0 3px rgba(250,204,21,0.1) !important;
        }

        .back-btn:hover {
          border-color: rgba(255,255,255,0.3) !important;
          color: rgba(255,255,255,0.9) !important;
        }
      `}</style>

      {modal && (
        <FeedbackModal type={modal.type} message={modal.message} onClose={handleModalClose} />
      )}

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #0f172a 100%)",
          fontFamily: FONT,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient orbs */}
        <div style={{
          position: "absolute", top: -100, left: -100,
          width: 500, height: 500,
          background: "rgba(250,204,21,0.05)",
          borderRadius: "50%", filter: "blur(80px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -80, right: -80,
          width: 400, height: 400,
          background: "rgba(59,130,246,0.07)",
          borderRadius: "50%", filter: "blur(60px)",
          pointerEvents: "none",
        }} />

        {/* Left panel — visible on larger screens */}
        <div
          style={{
            flex: 1,
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem",
            position: "relative",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
          className="left-panel"
        >
          <style>{`
            @media (min-width: 900px) {
              .left-panel { display: flex !important; }
              .register-wrapper { max-width: 480px !important; }
            }
          `}</style>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4rem" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "0.875rem",
              background: "#facc15",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#1e3a5f", fontWeight: 900, fontSize: "1.25rem",
              boxShadow: "0 8px 20px rgba(250,204,21,0.25)",
            }}>
              ◈
            </div>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>CoinWise</p>
              <p style={{ color: "rgba(250,204,21,0.55)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>
                Moeda Estudantil
              </p>
            </div>
          </div>

          <h1 style={{
            color: "white", fontWeight: 900,
            fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
            lineHeight: 1.1, letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
          }}>
            Junte-se a
            <br />
            <span style={{
              background: "linear-gradient(90deg, #facc15, #fde68a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              milhares de alunos
            </span>
            <br />
            motivados.
          </h1>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 340 }}>
            Cadastre-se e comece a acumular moedas pelo seu esforço, participação e notas.
            Troque por benefícios reais com empresas parceiras.
          </p>

          {/* Feature chips */}
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { icon: "🏆", text: "Reconhecimento por mérito" },
              { icon: "🛍️", text: "Catálogo de recompensas reais" },
              { icon: "📊", text: "Acompanhe seu progresso" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "0.625rem",
                  background: "rgba(250,204,21,0.1)",
                  border: "1px solid rgba(250,204,21,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem",
                }}>
                  {item.icon}
                </div>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div
          className="register-wrapper"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
            maxWidth: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", maxWidth: 420 }}
          >
            {/* Mobile logo */}
            <div
              className="mobile-logo"
              style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "2rem" }}
            >
              <style>{`
                @media (min-width: 900px) { .mobile-logo { display: none !important; } }
              `}</style>
              <div style={{
                width: 36, height: 36, borderRadius: "0.75rem",
                background: "#facc15",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#1e3a5f", fontWeight: 900, fontSize: "1.1rem",
              }}>◈</div>
              <span style={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>CoinWise</span>
            </div>

            {/* Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                padding: "2rem",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: "1.75rem" }}>
                <h2 style={{
                  color: "white", fontWeight: 900,
                  fontSize: "1.5rem", letterSpacing: "-0.02em",
                  margin: "0 0 0.375rem",
                }}>
                  Criar conta
                </h2>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem" }}>
                  {step === 0 && "Escolha seu perfil e informe seus dados básicos"}
                  {step === 1 && "Complete seu cadastro com as informações necessárias"}
                  {step === 2 && "Defina uma senha segura para sua conta"}
                </p>
              </div>

              {/* Step indicator */}
              <StepIndicator current={step} total={totalSteps} />

              {/* Step labels */}
              <div style={{
                display: "flex", gap: "0", marginBottom: "1.5rem",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "0.75rem",
                padding: "0.25rem",
              }}>
                {stepLabels.map((label, i) => (
                  <div
                    key={label}
                    style={{
                      flex: 1, textAlign: "center",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      background: i === step ? "rgba(250,204,21,0.15)" : "transparent",
                      border: i === step ? "1px solid rgba(250,204,21,0.25)" : "1px solid transparent",
                      transition: "all 0.25s",
                    }}
                  >
                    <span style={{
                      fontSize: "0.72rem", fontWeight: 700,
                      color: i === step
                        ? "#facc15"
                        : i < step
                        ? "rgba(34,197,94,0.7)"
                        : "rgba(255,255,255,0.25)",
                      fontFamily: FONT,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {steps[step]}
                </AnimatePresence>
              </form>

              {/* Footer */}
              <p style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.8rem",
                marginTop: "1.5rem",
                fontFamily: FONT,
              }}>
                Já tem conta?{" "}
                <button
                  onClick={onGoLogin}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "#facc15", fontWeight: 700, fontSize: "0.8rem",
                    fontFamily: FONT, textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  Entrar
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}