import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockUsers } from "../data/mockData";

const allUsers = [...mockUsers.students, ...mockUsers.teachers, ...mockUsers.companies];

const FONT = "'Sora', 'Nunito', sans-serif";

const inputStyle = {
  width: "100%",
  padding: "0.8rem 1rem",
  borderRadius: "0.875rem",
  border: "1.5px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
  fontFamily: FONT,
};

const labelStyle = {
  display: "block",
  color: "rgba(255,255,255,0.45)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
  fontFamily: FONT,
};

export default function LoginPage({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    const user = allUsers.find((u) => u.email === email);
    if (user && password === "123456") {
      onLogin(user);
    } else {
      setError("Email ou senha inválidos. Use a senha: 123456");
    }
    setLoading(false);
  };

  const quickLogin = (role) => {
    const map = {
      student: mockUsers.students[0],
      teacher: mockUsers.teachers[0],
      company: mockUsers.companies[0],
    };
    onLogin(map[role]);
  };

  const quickOptions = [
    { role: "student", label: "Aluno", icon: "👨‍🎓" },
    { role: "teacher", label: "Professor", icon: "👨‍🏫" },
    { role: "company", label: "Empresa", icon: "🏢" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        .login-input::placeholder { color: rgba(255,255,255,0.22); }
        .login-input:focus {
          border-color: rgba(250,204,21,0.55) !important;
          background: rgba(255,255,255,0.08) !important;
          box-shadow: 0 0 0 3px rgba(250,204,21,0.1) !important;
        }

        .quick-btn {
          transition: all 0.18s ease;
        }
        .quick-btn:hover {
          background: rgba(250,204,21,0.1) !important;
          border-color: rgba(250,204,21,0.4) !important;
          transform: translateY(-1px);
        }

        .submit-btn:not(:disabled):hover {
          box-shadow: 0 0 28px rgba(250,204,21,0.35) !important;
        }

        @media (max-width: 900px) {
          .left-panel { display: none !important; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

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
          position: "absolute", top: -120, left: -120,
          width: 500, height: 500,
          background: "rgba(250,204,21,0.05)",
          borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -100, right: -100,
          width: 450, height: 450,
          background: "rgba(59,130,246,0.07)",
          borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "40%",
          width: 300, height: 300,
          background: "rgba(250,204,21,0.03)",
          borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* ── Left panel ────────────────────────────────────── */}
        <div
          className="left-panel"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "3rem 3.5rem",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "0.875rem",
              background: "#facc15",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#1e3a5f", fontWeight: 900, fontSize: "1.2rem",
              boxShadow: "0 8px 20px rgba(250,204,21,0.25)",
            }}>◈</div>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>CoinWise</p>
              <p style={{ color: "rgba(250,204,21,0.5)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>
                Moeda Estudantil
              </p>
            </div>
          </div>

          {/* Main copy */}
          <div style={{ maxWidth: 400 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#facc15",
                marginBottom: "1.25rem",
              }}>
                <span style={{ display: "block", width: 20, height: 2, background: "#facc15", borderRadius: 2 }} />
                Bem-vindo de volta
              </span>

              <h2 style={{
                color: "white", fontWeight: 900,
                fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                margin: "0 0 1.25rem",
              }}>
                Reconheça o mérito
                <br />
                <span style={{
                  background: "linear-gradient(90deg, #facc15, #fde68a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  estudantil
                </span>{" "}
                de forma
                <br />
                inovadora.
              </h2>

              <p style={{
                color: "rgba(255,255,255,0.42)",
                fontSize: "0.95rem", lineHeight: 1.7,
              }}>
                Professores recompensam alunos com moedas digitais.
                Alunos trocam por vantagens reais em empresas parceiras.
              </p>
            </motion.div>

            {/* Role cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{ display: "flex", gap: "0.75rem", marginTop: "2.25rem" }}
            >
              {[
                { icon: "👨‍🎓", label: "Para Alunos", desc: "Ganhe e resgate" },
                { icon: "👨‍🏫", label: "Professores", desc: "Reconheça mérito" },
                { icon: "🏢", label: "Empresas", desc: "Ofereça vantagens" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "1rem",
                    padding: "0.875rem 0.75rem",
                  }}
                >
                  <p style={{ fontSize: "1.4rem", marginBottom: "0.35rem" }}>{item.icon}</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: 700, fontSize: "0.78rem", marginBottom: "0.2rem" }}>
                    {item.label}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Footer */}
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
            © 2025 CoinWise. Todos os direitos reservados.
          </p>
        </div>

        {/* ── Right panel — form ─────────────────────────────── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
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

            {/* Glass card */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                padding: "2.25rem 2rem",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: "0 28px 60px rgba(0,0,0,0.35)",
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: "1.75rem" }}>
                <h3 style={{
                  color: "white", fontWeight: 900,
                  fontSize: "1.5rem", letterSpacing: "-0.02em",
                  margin: "0 0 0.375rem",
                }}>
                  Entrar na plataforma
                </h3>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem" }}>
                  Acesse sua conta para continuar
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Email institucional</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@escola.edu.br"
                    className="login-input"
                    style={inputStyle}
                    required
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <label style={{ ...labelStyle, marginBottom: 0 }}>Senha</label>
                    <button
                      type="button"
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(250,204,21,0.6)", fontSize: "0.72rem",
                        fontFamily: FONT, fontWeight: 600,
                      }}
                      onMouseOver={(e) => (e.target.style.color = "#facc15")}
                      onMouseOut={(e) => (e.target.style.color = "rgba(250,204,21,0.6)")}
                    >
                      Esqueceu?
                    </button>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="login-input"
                    style={inputStyle}
                    required
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: "8px",
                        padding: "0.75rem 1rem",
                        borderRadius: "0.875rem",
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                      }}
                    >
                      <span style={{ color: "#f87171", fontSize: "0.85rem", flexShrink: 0, marginTop: 1 }}>⚠</span>
                      <p style={{ color: "rgba(248,113,113,0.9)", fontSize: "0.8rem", lineHeight: 1.5, fontFamily: FONT }}>
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="submit-btn"
                  style={{
                    width: "100%", marginTop: "0.25rem",
                    padding: "0.9rem",
                    borderRadius: "0.875rem", border: "none",
                    background: loading
                      ? "rgba(250,204,21,0.5)"
                      : "linear-gradient(135deg, #facc15, #f59e0b)",
                    color: "#1e3a5f", fontWeight: 800, fontSize: "0.95rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: FONT, letterSpacing: "0.01em",
                    boxShadow: "0 8px 24px rgba(250,204,21,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    transition: "box-shadow 0.2s",
                  }}
                >
                  {loading ? (
                    <>
                      <svg
                        style={{ animation: "spin 0.8s linear infinite", width: 16, height: 16 }}
                        viewBox="0 0 24 24" fill="none"
                      >
                        <circle opacity={0.25} cx="12" cy="12" r="10" stroke="#1e3a5f" strokeWidth="4" />
                        <path opacity={0.75} fill="#1e3a5f" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Entrando...
                    </>
                  ) : (
                    "Entrar →"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                margin: "1.5rem 0 1rem",
              }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", fontFamily: FONT, whiteSpace: "nowrap" }}>
                  acesso rápido
                </span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Quick login */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.625rem" }}>
                {quickOptions.map((q) => (
                  <button
                    key={q.role}
                    onClick={() => quickLogin(q.role)}
                    className="quick-btn"
                    style={{
                      padding: "0.75rem 0.5rem",
                      borderRadius: "0.875rem",
                      border: "1.5px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      cursor: "pointer", textAlign: "center",
                      fontFamily: FONT,
                    }}
                  >
                    <p style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{q.icon}</p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontWeight: 600 }}>
                      {q.label}
                    </p>
                  </button>
                ))}
              </div>

              {/* Register link */}
              <p style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.8rem",
                marginTop: "1.5rem",
                fontFamily: FONT,
              }}>
                Não tem conta?{" "}
                <button
                  onClick={onGoRegister}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "#facc15", fontWeight: 700, fontSize: "0.8rem",
                    fontFamily: FONT,
                  }}
                  onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}