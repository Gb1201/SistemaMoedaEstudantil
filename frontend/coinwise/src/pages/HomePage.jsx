import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sparkles,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

/* ─── Animation helpers ─────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay },
});

/* ─── Icon components ───────────────────────────────────────── */
const Icon = {
  Trophy: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
      <path d="M8 21h8"/><path d="M12 17v4"/><path d="M6 9a6 6 0 0 0 12 0V3H6z"/>
    </svg>
  ),
  Building: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h1"/><path d="M14 9h1"/>
      <path d="M9 13h1"/><path d="M14 13h1"/><path d="M9 17h6"/>
    </svg>
  ),
  BarChart: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Lock: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Monitor: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Zap: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  GraduationCap: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Teacher: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  User: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Send: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  ShoppingBag: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  TrendingUp: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  FileText: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  MessageSquare: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Rocket: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Star: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Bell: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
};

/* ─── Data ──────────────────────────────────────────────────── */
const features = [
  {
    icon: Icon.Trophy,
    title: "Reconhecimento Meritocrático",
    desc: "Professores recompensam alunos com moedas digitais por desempenho, participação e comportamento positivo.",
  },
  {
    icon: Icon.Building,
    title: "Rede de Empresas Parceiras",
    desc: "Alunos trocam moedas acumuladas por benefícios reais oferecidos por empresas parceiras da plataforma.",
  },
  {
    icon: Icon.BarChart,
    title: "Dados em Tempo Real",
    desc: "Acompanhe o progresso individual e coletivo com dashboards completos para professores e gestores.",
  },
  {
    icon: Icon.Lock,
    title: "Seguro e Confiável",
    desc: "Plataforma com autenticação robusta e dados protegidos, focada no ambiente escolar.",
  },
  {
    icon: Icon.Monitor,
    title: "Acesso em Qualquer Lugar",
    desc: "Interface responsiva para alunos, professores e empresas acessarem de qualquer dispositivo.",
  },
  {
    icon: Icon.Zap,
    title: "Configuração Rápida",
    desc: "Escola configurada em minutos. Comece a distribuir moedas no mesmo dia do cadastro.",
  },
];

const steps = [
  { num: "01", title: "Alunos se cadastram", desc: "Os Alunos criam sua conta e acessam o perfil" },
  { num: "02", title: "Professores recompensam", desc: "Educadores distribuem CoinClass aos alunos por mérito, participação e atitudes positivas." },
  { num: "03", title: "Alunos acumulam", desc: "Cada estudante tem uma carteira digital onde gerencia seu saldo e histórico de ganhos." },
  { num: "04", title: "Empresas oferecem benefícios", desc: "Parceiros disponibilizam descontos e prêmios exclusivos para quem acumulou moedas." },
];

const profiles = [
  {
    id: "alunos",
    emoji: Icon.GraduationCap,
    tag: "Para Alunos",
    title: "Seu esforço vale mais do que uma nota.",
    slogan: "Ganhe, gerencie e aproveite suas moedas.",
    desc: "Com o CoinClass, cada participação em aula, entrega de projeto ou atitude positiva vira moeda real. Acumule créditos, acompanhe sua evolução e troque por benefícios exclusivos de empresas parceiras.",
    highlights: ["Carteira digital própria", "Histórico de ganhos e resgates", "Dashboard Interativo"],
    color: "from-yellow-400/20 to-yellow-400/5",
    border: "border-yellow-400/25",
    accent: "text-yellow-400",
    accentBg: "bg-yellow-400/15",
  },
  {
    id: "professores",
    emoji: Icon.Teacher,
    tag: "Para Professores",
    title: "Reconheça quem se dedica, de verdade.",
    slogan: "Motivar ficou muito mais fácil.",
    desc: "Distribua moedas com poucos cliques e veja o engajamento da sua turma crescer. O CoinClass transforma o reconhecimento em ferramenta pedagógica, ajudando você a criar uma cultura de esforço e valorização.",
    highlights: ["Distribuição de moedas por aluno", "Relatórios de Transações em tempo real", "Histórico completo de recompensas"],
    color: "from-blue-400/20 to-blue-400/5",
    border: "border-blue-400/25",
    accent: "text-blue-300",
    accentBg: "bg-blue-400/15",
  },
  {
    id: "empresas",
    emoji: Icon.Building,
    tag: "Para Empresas",
    title: "Conecte sua marca ao futuro.",
    slogan: "Visibilidade real para quem importa.",
    desc: "Cadastre sua empresa, ofereça descontos e prêmios exclusivos e alcance estudantes engajados de todo o país. Uma parceria que gera valor para os dois lados, e constrói relacionamentos duradouros com o público jovem.",
    highlights: ["Vitrine de benefícios para milhares de alunos", "Cadastro simples e sem burocracia"],
    color: "from-emerald-400/20 to-emerald-400/5",
    border: "border-emerald-400/25",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-400/15",
  },
];

const navLinks = [
  { label: "Para Alunos", href: "#alunos" },
  { label: "Para Professores", href: "#professores" },
  { label: "Para Empresas", href: "#empresas" },
  { label: "Como Funciona", href: "#como-funciona" },
];

const stats = [
  { value: "12k+", label: "Alunos ativos" },
  { value: "340+", label: "Escolas parceiras" },
  { value: "180+", label: "Empresas na rede" },
];

/* ─── 3D Coin Components ────────────────────────────────────── */

/** Procedural knurled edge ring around the coin */
function CoinEdge({ radius, thickness }) {
  const segments = 80;
  const geometry = useMemo(() => {
    const geo = new THREE.TorusGeometry(radius, thickness * 0.5, 6, segments);
    return geo;
  }, [radius, thickness]);

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        color="#d4a017"
        metalness={0.95}
        roughness={0.18}
        envMapIntensity={0}
        emissive="#b8860b"
        emissiveIntensity={0.55}
      />
    </mesh>
  );
}

/** Decorative concentric ring on coin face */
function CoinRing({ radius, yPos }) {
  return (
    <mesh position={[0, yPos, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 8, 96]} />
      <meshStandardMaterial
        color="#ffd700"
        metalness={1}
        roughness={0.05}
        emissive="#ffaa00"
        emissiveIntensity={0.4}
        envMapIntensity={0}
      />
    </mesh>
  );
}

/** Procedural letter "C" extruded on both faces of the coin */
function CoinEmblem() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const outerR = 0.82;
    const innerR = 0.48;
    const gapAngle = 0.72;
    const startAngle = gapAngle / 2;
    const endAngle = Math.PI * 2 - gapAngle / 2;
    const segments = 80;

    for (let i = 0; i <= segments; i++) {
      const a = startAngle + (endAngle - startAngle) * (i / segments);
      const x = Math.cos(a) * outerR;
      const y = Math.sin(a) * outerR;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    for (let i = segments; i >= 0; i--) {
      const a = startAngle + (endAngle - startAngle) * (i / segments);
      const x = Math.cos(a) * innerR;
      const y = Math.sin(a) * innerR;
      shape.lineTo(x, y);
    }
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.07,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.014,
      bevelSegments: 4,
      curveSegments: 48,
    });
  }, []);

  const material = {
    color: "#fff8dc",
    metalness: 0.6,
    roughness: 0.06,
    emissive: "#ffe066",
    emissiveIntensity: 0.9,
    envMapIntensity: 0,
  };

  return (
    <>
      {/* Front face (Y+) */}
      <mesh geometry={geo} position={[0, 0.178, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <meshStandardMaterial {...material} />
      </mesh>
      {/* Back face (Y-) — mirrored so C reads correctly from both sides */}
      <mesh geometry={geo} position={[0, -0.178, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[-1, 1, 1]}>
        <meshStandardMaterial {...material} />
      </mesh>
    </>
  );
}

/** The main Coinz 3D coin */
function CoinzMesh() {
  const spinRef = useRef();  // handles Y-axis spin
  const glowRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (spinRef.current) {
      // Spin 360° continuously on Y — coin faces camera, edge sweeps side to side
      spinRef.current.rotation.y = t * 0.55;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 2.5 + Math.sin(t * 1.5) * 0.8;
    }
  });

  const goldMaterial = useMemo(() => ({
    color: "#d4a017",
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 0,
    emissive: "#b8860b",
    emissiveIntensity: 0.35,
  }), []);

  const faceMaterial = useMemo(() => ({
    color: "#c8940f",
    metalness: 0.99,
    roughness: 0.04,
    envMapIntensity: 0,
    emissive: "#ffd700",
    emissiveIntensity: 0.25,
  }), []);

  return (
    <group ref={spinRef}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Main coin body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.4, 1.4, 0.28, 128, 1, false]} />
          <meshStandardMaterial {...goldMaterial} />
        </mesh>

        {/* Top face */}
        <mesh position={[0, 0.145, 0]}>
          <cylinderGeometry args={[1.38, 1.4, 0.01, 128]} />
          <meshStandardMaterial {...faceMaterial} />
        </mesh>

        {/* Bottom face */}
        <mesh position={[0, -0.145, 0]}>
          <cylinderGeometry args={[1.38, 1.4, 0.01, 128]} />
          <meshStandardMaterial {...faceMaterial} />
        </mesh>

        {/* Inner elevated platform on face */}
        <mesh position={[0, 0.155, 0]}>
          <cylinderGeometry args={[1.18, 1.18, 0.02, 128]} />
          <meshStandardMaterial
            color="#e6b800"
            metalness={1}
            roughness={0.03}
            envMapIntensity={0}
            emissive="#ffd700"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Inner elevated platform on back */}
        <mesh position={[0, -0.155, 0]}>
          <cylinderGeometry args={[1.18, 1.18, 0.02, 128]} />
          <meshStandardMaterial
            color="#e6b800"
            metalness={1}
            roughness={0.03}
            envMapIntensity={0}
            emissive="#ffd700"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Decorative rings */}
        <CoinRing radius={1.28} yPos={0.16} />
        <CoinRing radius={1.02} yPos={0.165} />
        <CoinRing radius={1.28} yPos={-0.16} />
        <CoinRing radius={1.02} yPos={-0.165} />

        {/* Edge knurl */}
        <CoinEdge radius={1.4} thickness={0.28} />

        {/* Star emblem on top face (Y+ face = front after rotation) */}
        <CoinEmblem />

        {/* Glow */}
        <pointLight
          ref={glowRef}
          color="#ffd700"
          intensity={3}
          distance={6}
          decay={2}
        />
      </group>
    </group>
  );
}

/** Animated camera rig for cinematic feel */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Very subtle drift — just enough to feel alive
    state.camera.position.x = Math.sin(t * 0.1) * 0.3;
    state.camera.position.y = Math.cos(t * 0.08) * 0.15;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Full 3D scene */
function CoinzScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <CameraRig />

      {/* Lighting */}
      <ambientLight intensity={0.9} color="#c8940f" />

      {/* Key light — warm gold */}
      <directionalLight
        position={[4, 6, 3]}
        intensity={3.5}
        color="#ffe066"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill light — blue neon */}
      <pointLight position={[-5, 3, 2]} color="#3b6ef5" intensity={8} distance={14} decay={2} />

      {/* Rim light — purple */}
      <pointLight position={[3, -2, -4]} color="#9b59b6" intensity={10} distance={16} decay={2} />

      {/* Back purple wash */}
      <pointLight position={[-2, -3, -5]} color="#7e22ce" intensity={6} distance={12} decay={2} />

      {/* Top accent */}
      <pointLight position={[0, 6, 1]} color="#60a5fa" intensity={5} distance={10} decay={2} />

      {/* Coin with Float */}
      <Float
        speed={1.4}
        rotationIntensity={0}
        floatIntensity={0.6}
        floatingRange={[-0.15, 0.15]}
      >
        <CoinzMesh />
      </Float>

      {/* Golden sparkles orbiting the coin */}
      <Sparkles
        count={120}
        scale={7}
        size={2.5}
        speed={0.4}
        opacity={0.7}
        color="#ffd700"
        noise={0.5}
      />

      {/* Blue-purple secondary sparkles */}
      <Sparkles
        count={60}
        scale={9}
        size={1.5}
        speed={0.2}
        opacity={0.4}
        color="#818cf8"
        noise={0.3}
      />

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -3.2, 0]}
        opacity={0.5}
        scale={10}
        blur={3}
        far={5}
        color="#1a0050"
      />

      {/* Environment for reflections removed */}

      {/* Orbit controls — user can drag to inspect */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.08}
        enableDamping
      />

    </Canvas>
  );
}

/* ─── Sub-components ────────────────────────────────────────── */

function Logo({ size = "md" }) {
  const isLg = size === "lg";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black shadow-lg shadow-yellow-400/20 ${
          isLg ? "w-11 h-11 text-xl" : "w-8 h-8 text-base"
        }`}
      >
        ◈
      </div>
      <div>
        <p
          className={`text-white font-extrabold leading-none tracking-tight ${
            isLg ? "text-xl" : "text-base"
          }`}
          style={{ fontFamily: "'Sora', 'Nunito', sans-serif" }}
        >
          CoinClass
        </p>
        <p className="text-yellow-400/60 text-[10px] leading-none mt-0.5 font-medium tracking-widest uppercase">
          Moeda Estudantil
        </p>
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(250,204,21,0.35)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`bg-yellow-400 text-blue-900 font-bold rounded-xl shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-all ${className}`}
    >
      {children}
    </motion.button>
  );
}

function OutlineButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`text-white/80 font-medium rounded-xl border border-white/20 hover:border-white/40 hover:text-white transition-all ${className}`}
    >
      {children}
    </motion.button>
  );
}

/* ─── Coinz Hero Section ────────────────────────────────────── */
function CoinzHero({ onGoRegister, onGoLogin }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>

      {/* Dark space background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(59,110,245,0.13) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 75% 55%, rgba(30,58,95,0.30) 0%, transparent 55%), linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #0f172a 100%)" }} />

      {/* Subtle star field */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[...Array(60)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 5 === 0 ? 2 : 1,
            height: i % 5 === 0 ? 2 : 1,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            top: `${Math.sin(i * 137.5) * 50 + 50}%`,
            left: `${Math.cos(i * 137.5) * 50 + 50}%`,
            opacity: 0.3 + (i % 4) * 0.15,
          }} />
        ))}
      </div>

      {/* Right-side coin glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "8%",
        transform: "translateY(-50%)",
        width: 560,
        height: 560,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,215,0,0.18) 0%, rgba(59,110,245,0.10) 40%, transparent 70%)",
        filter: "blur(50px)",
        zIndex: 1,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "50%",
        right: "10%",
        transform: "translateY(-50%)",
        width: 380,
        height: 380,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(155,89,182,0.16) 0%, transparent 70%)",
        filter: "blur(35px)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Bottom fade to page */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(15,23,42,0.65) 0%, transparent 15%, transparent 80%, rgba(15,23,42,0.98) 100%)", pointerEvents: "none" }} />

      {/* ── Two-column layout ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          minHeight: "100vh",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 3rem",
          gap: "2rem",
        }}
        className="hero-two-col"
      >
        {/* ── LEFT: Text content ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "5rem", paddingBottom: "5rem" }}>
          {/* Badge */}
          <motion.div {...fadeIn(0.2)}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(250,204,21,0.12)",
                border: "1px solid rgba(250,204,21,0.3)",
                borderRadius: 999,
                padding: "6px 16px",
                marginBottom: 28,
                backdropFilter: "blur(10px)",
              }}
            >
              <span style={{ fontSize: 13, color: "#facc15", fontWeight: 700, letterSpacing: "0.08em" }}>
                ✦ COINZ — MOEDA ESTUDANTIL DIGITAL
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            {...fadeUp(0.3)}
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              marginBottom: 22,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            Transforme mérito
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #facc15 0%, #fde68a 50%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              em oportunidades
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #facc15 0%, #fde68a 50%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              reais.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.45)}
            style={{
              color: "rgba(255,255,255,0.52)",
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              maxWidth: 460,
              lineHeight: 1.75,
              marginBottom: 40,
            }}
          >
            Uma plataforma para reconhecer o desempenho dos alunos com moedas digitais e
            conectar escolas a empresas parceiras.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.55)}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <PrimaryButton onClick={onGoRegister} className="text-sm px-7 py-3.5">
              Começar gratuitamente →
            </PrimaryButton>
            <OutlineButton onClick={onGoLogin} className="text-sm px-7 py-3.5">
              Já tenho conta
            </OutlineButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.7)}
            style={{
              display: "flex",
              gap: 36,
              marginTop: 52,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              flexWrap: "wrap",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: "1.55rem", lineHeight: 1 }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.75rem", marginTop: 5, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Coin ── */}
        <motion.div
          {...fadeIn(0.4)}
          style={{
            position: "relative",
            height: "100vh",
            maxHeight: 680,
            minHeight: 480,
          }}
        >
          <CoinzScene />

          {/* Bloom overlay centered on coin */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              mixBlendMode: "screen",
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,215,0,0.20) 0%, transparent 65%)",
            }}
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          pointerEvents: "none",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.15em", fontWeight: 600 }}>
          SCROLL
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 28,
            background: "linear-gradient(to bottom, rgba(250,204,21,0.6), transparent)",
          }}
        />
      </motion.div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-two-col {
            grid-template-columns: 1fr !important;
            padding: 0 1.5rem !important;
            text-align: center;
          }
          .hero-two-col > div:first-child {
            align-items: center !important;
            padding-top: 8rem !important;
            padding-bottom: 1rem !important;
          }
          .hero-two-col > div:last-child {
            height: 340px !important;
            min-height: 340px !important;
            max-height: 340px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Dashboard Mockup ──────────────────────────────────────── */
function DashboardMockup() {
  return (
    <div className="relative">
      <div className="rounded-2xl bg-white/[0.06] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
            <div className="w-3 h-3 rounded-full bg-green-400/50" />
          </div>
          <div className="ml-3 flex-1 bg-white/8 rounded-md px-3 py-1 text-white/25 text-xs font-mono">
            app.coinclass.com/dashboard
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Saldo", value: "1.240", unit: "moedas" },
              { label: "Hoje", value: "+85", unit: "ganhos" },
              { label: "Ranking", value: "#3", unit: "da turma" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.06] border border-white/10 p-3 text-center">
                <p className="text-yellow-400 font-black text-lg leading-none">{s.value}</p>
                <p className="text-white/35 text-[10px] mt-1">{s.unit}</p>
                <p className="text-white/55 text-[10px] mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white/[0.04] border border-white/8 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/8">
              <p className="text-white/60 text-xs font-semibold tracking-wider uppercase">Últimas transações</p>
            </div>
            {[
              { desc: "Participação em aula", val: "+20", color: "text-emerald-400" },
              { desc: "Entrega de projeto", val: "+50", color: "text-emerald-400" },
              { desc: "Desconto Livraria XYZ", val: "-120", color: "text-rose-400" },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${t.val.startsWith("+") ? "bg-emerald-400/15" : "bg-rose-400/15"}`}>
                    {t.val.startsWith("+") ? "▲" : "▼"}
                  </div>
                  <p className="text-white/65 text-xs">{t.desc}</p>
                </div>
                <p className={`text-xs font-bold ${t.color}`}>{t.val}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white/[0.04] border border-white/8 p-4">
            <div className="flex justify-between items-center mb-2.5">
              <p className="text-white/55 text-xs font-medium">Meta do mês</p>
              <p className="text-yellow-400 text-xs font-bold">62%</p>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "62%" }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300"
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 border border-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <p className="text-gray-800 text-xs font-bold leading-tight">Novo prêmio disponível!</p>
          <p className="text-gray-400 text-[10px] mt-0.5">Livraria ABC — 200 moedas</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 12, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="absolute -top-5 -right-5 bg-yellow-400 rounded-2xl px-4 py-2.5 shadow-xl shadow-yellow-400/30 flex items-center gap-2"
      >
        <Icon.Trophy width={16} height={16} style={{ color: "#1e3a5f", flexShrink: 0 }} />
        <div>
          <p className="text-blue-900 text-[10px] font-semibold leading-none">Top da turma</p>
          <p className="text-blue-900/70 text-[10px] mt-0.5">#3 este mês</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── App Preview ───────────────────────────────────────────── */
function AppPreview() {
  return (
    <div className="rounded-2xl bg-white/[0.06] border border-white/10 overflow-hidden shadow-2xl">
      <div className="bg-white/[0.05] px-5 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xs">◈</div>
          <span className="text-white text-sm font-bold">CoinClass</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <Icon.User width={14} height={14} style={{ color: "rgba(255,255,255,0.7)" }} />
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-none">Ana Silva</p>
            <p className="text-white/40 text-[10px]">Aluna · 3º Ano</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="rounded-xl bg-gradient-to-br from-yellow-400/20 via-yellow-400/10 to-transparent border border-yellow-400/20 p-4 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs mb-1 font-medium">Saldo disponível</p>
            <p className="text-white font-black text-3xl leading-none">1.240</p>
            <p className="text-yellow-400 text-xs mt-1.5 font-semibold tracking-wide">CoinWise</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center">
            <Icon.Trophy width={26} height={26} style={{ color: "rgba(250,204,21,0.9)" }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Icon.Send, label: "Transferir" },
            { icon: Icon.ShoppingBag, label: "Loja" },
            { icon: Icon.TrendingUp, label: "Histórico" },
          ].map((a) => (
            <div key={a.label} className="rounded-xl bg-white/[0.06] border border-white/10 p-3 text-center cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all">
              <div className="flex justify-center mb-1.5">
                <a.icon width={18} height={18} style={{ color: "rgba(255,255,255,0.6)" }} />
              </div>
              <p className="text-white/55 text-[10px] font-medium">{a.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest px-1">Atividade recente</p>
          {[
            { icon: Icon.FileText, title: "Entrega de projeto", sub: "Prof. João · há 2h", val: "+50" },
            { icon: Icon.MessageSquare, title: "Participação em aula", sub: "Prof. Maria · ontem", val: "+20" },
            { icon: Icon.ShoppingBag, title: "Desconto Livraria XYZ", sub: "Parceiro · 3 dias atrás", val: "-120" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-white/[0.07] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <item.icon width={14} height={14} style={{ color: "rgba(255,255,255,0.6)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
                <p className="text-white/35 text-[10px] mt-0.5">{item.sub}</p>
              </div>
              <p className={`text-xs font-bold flex-shrink-0 ${item.val.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>
                {item.val}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function HomePage({ onGoLogin, onGoRegister }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #0f172a 100%)",
        fontFamily: "'Sora', 'Nunito', 'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #facc15;
          margin-bottom: 12px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 20px;
          height: 2px;
          background: #facc15;
          border-radius: 2px;
        }

        .feature-card:hover .feature-icon {
          background: rgba(250,204,21,0.22);
          border-color: rgba(250,204,21,0.4);
          transform: scale(1.08);
        }
        .feature-icon {
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }

        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .platform-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══ NAVBAR ═══════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-xl"
        style={{ background: "rgba(15,23,42,0.75)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-white/55 hover:text-white text-sm font-medium transition-colors relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 rounded-full group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <OutlineButton onClick={onGoLogin} className="hidden sm:block text-sm px-4 py-2">
              Entrar
            </OutlineButton>
            <PrimaryButton onClick={onGoRegister} className="text-sm px-4 py-2">
              Criar conta
            </PrimaryButton>
          </div>
        </div>
      </header>

      {/* ═══ COINZ 3D HERO ════════════════════════════════════ */}
      <CoinzHero onGoRegister={onGoRegister} onGoLogin={onGoLogin} />

      {/* ═══ FEATURES ═════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="section-label" style={{ justifyContent: "center" }}>Benefícios</span>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)" }}>
              Tudo que você precisa
              <br />
              <span className="text-white/50">em um só lugar</span>
            </h2>
            <p className="text-white/45 mt-4 max-w-xl mx-auto leading-relaxed" style={{ fontSize: "1rem" }}>
              O CoinClass foi pensado para conectar o esforço dos alunos a recompensas concretas,
              tornando a educação mais motivadora para todos.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.07)}
                className="feature-card rounded-2xl bg-white/[0.05] border border-white/10 p-6 hover:bg-white/[0.08] hover:border-white/18 transition-all group cursor-default"
              >
                <div className="feature-icon w-12 h-12 rounded-2xl bg-yellow-400/12 border border-yellow-400/20 flex items-center justify-center mb-5">
                  <f.icon width={22} height={22} style={{ color: "rgba(250,204,21,0.85)" }} />
                </div>
                <h3 className="text-white font-bold mb-2 leading-snug" style={{ fontSize: "0.95rem" }}>{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROFILES ═════════════════════════════════════════ */}
      <section id="perfis" className="py-20 lg:py-24 border-t border-white/6" style={{ scrollMarginTop: "72px" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="section-label" style={{ justifyContent: "center" }}>Para cada perfil</span>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)" }}>
              Um ecossistema feito
              <br />
              <span className="text-white/50">para todos vocês</span>
            </h2>
            <p className="text-white/45 mt-4 max-w-xl mx-auto leading-relaxed" style={{ fontSize: "1rem" }}>
              O CoinClass conecta alunos, professores e empresas em uma só plataforma, cada um
              com seu espaço, suas ferramentas e seus benefícios.
            </p>
          </motion.div>

          <div className="space-y-6">
            {profiles.map((p, i) => (
              <motion.div
                key={p.id}
                id={p.id}
                style={{ scrollMarginTop: "72px" }}
                {...fadeUp(i * 0.1)}
                className={`rounded-2xl bg-gradient-to-br ${p.color} border ${p.border} p-7 hover:border-opacity-50 transition-all`}
              >
                <div
                  style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "1.5rem", alignItems: "center" }}
                  className="profile-row"
                >
                  <div className="flex flex-col items-center gap-2 text-center" style={{ minWidth: "80px" }}>
                    <div className={`w-14 h-14 rounded-2xl ${p.accentBg} flex items-center justify-center border ${p.border}`}>
                      <p.emoji width={28} height={28} className={p.accent} style={{ strokeWidth: 1.75 }} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${p.accent} whitespace-nowrap`}>{p.tag}</span>
                  </div>

                  <div>
                    <h3 className="text-white font-black leading-snug mb-1" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)" }}>{p.title}</h3>
                    <p className={`text-xs font-semibold mb-3 ${p.accent}`}>{p.slogan}</p>
                    <p className="text-white/55 text-sm leading-relaxed max-w-2xl">{p.desc}</p>
                  </div>

                  <div className="hidden lg:flex flex-col gap-2" style={{ minWidth: "240px" }}>
                    {p.highlights.map((h) => h && (
                      <div key={h} className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-full ${p.accentBg} border ${p.border} flex items-center justify-center ${p.accent} text-[10px] flex-shrink-0 font-bold`}>✓</span>
                        <span className="text-white/60 text-xs">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:hidden mt-4 flex flex-wrap gap-2">
                  {p.highlights.map((h) => h && (
                    <div key={h} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full ${p.accentBg} border ${p.border} flex items-center justify-center ${p.accent} text-[9px] flex-shrink-0 font-bold`}>✓</span>
                      <span className="text-white/55 text-xs">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═════════════════════════════════════ */}
      <section id="como-funciona" className="py-20 lg:py-24 border-t border-white/6" style={{ scrollMarginTop: "72px" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="section-label" style={{ justifyContent: "center" }}>Como funciona</span>
            <h2 className="text-white font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)" }}>
              Simples, rápido e eficiente
            </h2>
          </motion.div>

          <div className="steps-grid relative" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent" />
            {steps.map((s, i) => (
              <motion.div key={s.num} {...fadeUp(i * 0.1)} className="relative text-center group">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400/12 border-2 border-yellow-400/25 flex items-center justify-center mx-auto mb-5 relative z-10 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition-all">
                  <span className="text-yellow-400 font-black text-xl">{s.num}</span>
                </div>
                <h3 className="text-white font-bold mb-2" style={{ fontSize: "0.9rem" }}>{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLATFORM PREVIEW ════════════════════════════════ */}
      <section className="py-20 lg:py-24 border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="platform-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <motion.div {...fadeUp(0)}>
              <span className="section-label">Plataforma</span>
              <h2 className="text-white font-black leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
                Um painel completo
                <br />
                <span className="text-white/50">para cada perfil</span>
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-6">
                Alunos acompanham seu saldo e conquistas. Professores distribuem moedas com um
                clique. Gestores visualizam dados de toda a escola em tempo real.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Carteira digital para cada aluno",
                  "Histórico completo de transações",
                  "Relatórios de engajamento por turma",
                  "Gestão de parceiros e benefícios",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/65 text-sm">
                    <span className="w-5 h-5 rounded-full bg-yellow-400/15 border border-yellow-400/35 flex items-center justify-center text-yellow-400 text-[10px] flex-shrink-0 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <PrimaryButton onClick={onGoRegister} className="text-sm px-6 py-3">
                Ver a plataforma →
              </PrimaryButton>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <AppPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 border-t border-white/6">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-2xl mx-auto mb-6 shadow-2xl shadow-yellow-400/25">
              ◈
            </div>

            <h2 className="text-white font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Pronto para transformar
              <br />
              <span style={{ background: "linear-gradient(90deg, #facc15, #fde68a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                sua escola?
              </span>
            </h2>

            <p className="text-white/45 text-base leading-relaxed max-w-xl mx-auto">
              Junte-se a centenas de escolas que já usam o CoinClass para motivar alunos e criar
              uma cultura de mérito e reconhecimento.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <PrimaryButton onClick={onGoRegister} className="text-sm px-8 py-3.5">
                Criar conta gratuitamente →
              </PrimaryButton>
              <OutlineButton onClick={onGoLogin} className="text-sm px-8 py-3.5">
                Já tenho conta
              </OutlineButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              {["✓ Grátis para começar", "✓ Sem cartão de crédito", "✓ Suporte em português"].map((item) => (
                <span key={item} className="text-white/35 text-xs font-medium">{item}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer className="border-t border-white/6 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="footer-grid mb-12" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem" }}>
            <div>
              <Logo />
              <p className="text-white/35 text-sm leading-relaxed mt-4 max-w-xs">
                Transformando mérito em oportunidades reais para alunos, professores e empresas.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {["in", "tw", "ig"].map((s) => (
                  <a key={s} href="#" className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all text-xs font-bold">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Plataforma", links: ["Para Alunos", "Para Professores", "Para Empresas", "Preços"] },
              { title: "Recursos", links: ["Central de Ajuda", "Blog", "Documentação", "Novidades"] },
              { title: "Contato", links: ["contato@coinclass.com", "Fale Conosco", "Privacidade", "Termos de Uso"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white font-semibold text-sm mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-white/35 hover:text-white/70 text-sm transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">© 2026 CoinClass. Todos os direitos reservados.</p>
            <div className="flex items-center gap-5">
              {["Instagram", "LinkedIn", "Twitter"].map((s) => (
                <a key={s} href="#" className="text-white/25 hover:text-white/55 text-xs transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}