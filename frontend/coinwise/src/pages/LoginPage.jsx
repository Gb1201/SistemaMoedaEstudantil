import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { alunosApi, empresasApi, professoresApi } from "../api/api";
import { mockUsers } from "../data/mockData";


/* ─── Login Coin 3D Components ──────────────────────────────── */
function LoginCoinEdge({ radius, thickness }) {
  const geo = useMemo(() => new THREE.TorusGeometry(radius, thickness * 0.5, 6, 80), [radius, thickness]);
  return (
    <mesh geometry={geo} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#d4a017" metalness={0.95} roughness={0.18} envMapIntensity={0} emissive="#b8860b" emissiveIntensity={0.55} />
    </mesh>
  );
}

function LoginCoinRing({ radius, yPos }) {
  return (
    <mesh position={[0, yPos, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 8, 96]} />
      <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.05} emissive="#ffaa00" emissiveIntensity={0.4} envMapIntensity={0} />
    </mesh>
  );
}

function LoginCoinEmblem() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const outerR = 0.82, innerR = 0.48, gapAngle = 0.72;
    const startAngle = gapAngle / 2;
    const endAngle = Math.PI * 2 - gapAngle / 2;
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const a = startAngle + (endAngle - startAngle) * (i / segments);
      if (i === 0) shape.moveTo(Math.cos(a) * outerR, Math.sin(a) * outerR);
      else shape.lineTo(Math.cos(a) * outerR, Math.sin(a) * outerR);
    }
    for (let i = segments; i >= 0; i--) {
      const a = startAngle + (endAngle - startAngle) * (i / segments);
      shape.lineTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.014, bevelSegments: 4, curveSegments: 48 });
  }, []);
  const mat = { color: "#fff8dc", metalness: 0.6, roughness: 0.06, emissive: "#ffe066", emissiveIntensity: 0.9, envMapIntensity: 0 };
  return (
    <>
      <mesh geometry={geo} position={[0, 0.178, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <meshStandardMaterial {...mat} />
      </mesh>
      <mesh geometry={geo} position={[0, -0.178, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[-1, 1, 1]}>
        <meshStandardMaterial {...mat} />
      </mesh>
    </>
  );
}

function LoginCoinMesh() {
  const spinRef = useRef();
  const glowRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (spinRef.current) spinRef.current.rotation.y = t * 0.55;
    if (glowRef.current) glowRef.current.intensity = 2.5 + Math.sin(t * 1.5) * 0.8;
  });
  const gold = useMemo(() => ({ color: "#d4a017", metalness: 0.98, roughness: 0.08, envMapIntensity: 0, emissive: "#b8860b", emissiveIntensity: 0.35 }), []);
  const face = useMemo(() => ({ color: "#c8940f", metalness: 0.99, roughness: 0.04, envMapIntensity: 0, emissive: "#ffd700", emissiveIntensity: 0.25 }), []);
  return (
    <group ref={spinRef}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow><cylinderGeometry args={[1.4, 1.4, 0.28, 128]} /><meshStandardMaterial {...gold} /></mesh>
        <mesh position={[0, 0.145, 0]}><cylinderGeometry args={[1.38, 1.4, 0.01, 128]} /><meshStandardMaterial {...face} /></mesh>
        <mesh position={[0, -0.145, 0]}><cylinderGeometry args={[1.38, 1.4, 0.01, 128]} /><meshStandardMaterial {...face} /></mesh>
        <mesh position={[0, 0.155, 0]}><cylinderGeometry args={[1.18, 1.18, 0.02, 128]} /><meshStandardMaterial color="#e6b800" metalness={1} roughness={0.03} envMapIntensity={0} emissive="#ffd700" emissiveIntensity={0.2} /></mesh>
        <mesh position={[0, -0.155, 0]}><cylinderGeometry args={[1.18, 1.18, 0.02, 128]} /><meshStandardMaterial color="#e6b800" metalness={1} roughness={0.03} envMapIntensity={0} emissive="#ffd700" emissiveIntensity={0.2} /></mesh>
        <LoginCoinRing radius={1.28} yPos={0.16} />
        <LoginCoinRing radius={1.02} yPos={0.165} />
        <LoginCoinRing radius={1.28} yPos={-0.16} />
        <LoginCoinRing radius={1.02} yPos={-0.165} />
        <LoginCoinEdge radius={1.4} thickness={0.28} />
        <LoginCoinEmblem />
        <pointLight ref={glowRef} color="#ffd700" intensity={3} distance={6} decay={2} />
      </group>
    </group>
  );
}

function LoginCoinScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }} style={{ position: "absolute", inset: 0 }}>
      <ambientLight intensity={0.9} color="#c8940f" />
      <directionalLight position={[4, 6, 3]} intensity={3.5} color="#ffe066" castShadow />
      <pointLight position={[-5, 3, 2]} color="#3b6ef5" intensity={8} distance={14} decay={2} />
      <pointLight position={[3, -2, -4]} color="#9b59b6" intensity={10} distance={16} decay={2} />
      <pointLight position={[-2, -3, -5]} color="#7e22ce" intensity={6} distance={12} decay={2} />
      <pointLight position={[0, 6, 1]} color="#60a5fa" intensity={5} distance={10} decay={2} />
      <Float speed={1.4} rotationIntensity={0} floatIntensity={0.6} floatingRange={[-0.15, 0.15]}>
        <LoginCoinMesh />
      </Float>
      <Sparkles count={80} scale={6} size={2} speed={0.4} opacity={0.6} color="#ffd700" noise={0.5} />
      <Sparkles count={40} scale={8} size={1.2} speed={0.2} opacity={0.3} color="#818cf8" noise={0.3} />
      <ContactShadows position={[0, -3.2, 0]} opacity={0.4} scale={10} blur={3} far={5} color="#1a0050" />
    </Canvas>
  );
}

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
  const [userType, setUserType] = useState("student"); // "student" | "teacher" | "company"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (userType === "teacher") {
        const raw = await professoresApi.login({ email, senha: password });
        onLogin({ 
          ...raw, 
          role: "teacher", 
          name: raw.nome,
          balance: raw.saldo 
        });
      } else if (userType === "company") {
        const raw = await empresasApi.login({ email, senha: password });
        onLogin({ ...raw, role: "company", name: raw.nome });
      } else {
        const raw = await alunosApi.login({ email, senha: password });
        onLogin({ ...raw, id: raw.id, role: "student", name: raw.nome, balance: raw.saldo});
      }
    } catch (err) {
      setError(err.message || "Email ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

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
            overflow: "hidden",
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
              <p style={{ color: "white", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>CoinClass</p>
              <p style={{ color: "rgba(250,204,21,0.5)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>
                Moeda Estudantil
              </p>
            </div>
          </div>

          {/* 3D Coin */}
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <LoginCoinScene />
            {/* Bloom overlay */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              mixBlendMode: "screen",
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,215,0,0.18) 0%, transparent 65%)",
            }} />
          </div>

          {/* Footer */}
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
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
              <span style={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>CoinClass</span>
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

              {/* Toggle tipo de usuário */}
              <div style={{
                display: "flex", gap: "0.5rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "0.875rem",
                padding: "0.3rem",
                marginBottom: "1rem",
              }}>
                {[
                  { value: "student",  label: "Aluno",     Icon: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
                  { value: "teacher", label: "Professor", Icon: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                  { value: "company", label: "Empresa",   Icon: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h1"/><path d="M14 9h1"/><path d="M9 13h1"/><path d="M14 13h1"/><path d="M9 17h6"/></svg> },
                ].map(({ value, label, Icon: BtnIcon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => { setUserType(value); setError(""); }}
                    style={{
                      flex: 1, padding: "0.55rem",
                      borderRadius: "0.625rem", border: "none",
                      background: userType === value
                        ? "linear-gradient(135deg, #facc15, #f59e0b)"
                        : "transparent",
                      color: userType === value ? "#1e3a5f" : "rgba(255,255,255,0.35)",
                      fontWeight: 700, fontSize: "0.82rem",
                      cursor: "pointer", fontFamily: FONT,
                      transition: "all 0.18s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                    }}
                  >
                    <BtnIcon width={13} height={13} style={{ flexShrink: 0 }} />
                    {label}
                  </button>
                ))}
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
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