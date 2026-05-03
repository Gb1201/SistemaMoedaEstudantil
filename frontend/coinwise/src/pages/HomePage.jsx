import { motion } from "framer-motion";

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

/* ─── Data ──────────────────────────────────────────────────── */
const features = [
  {
    icon: "🏆",
    title: "Reconhecimento Meritocrático",
    desc: "Professores recompensam alunos com moedas digitais por desempenho, participação e comportamento positivo.",
  },
  {
    icon: "🏢",
    title: "Rede de Empresas Parceiras",
    desc: "Alunos trocam moedas acumuladas por benefícios reais oferecidos por empresas parceiras da plataforma.",
  },
  {
    icon: "📊",
    title: "Dados em Tempo Real",
    desc: "Acompanhe o progresso individual e coletivo com dashboards completos para professores e gestores.",
  },
  {
    icon: "🔒",
    title: "Seguro e Confiável",
    desc: "Plataforma com autenticação robusta e dados protegidos, focada no ambiente escolar.",
  },
  {
    icon: "📱",
    title: "Acesso em Qualquer Lugar",
    desc: "Interface responsiva para alunos, professores e empresas acessarem de qualquer dispositivo.",
  },
  {
    icon: "⚡",
    title: "Configuração Rápida",
    desc: "Escola configurada em minutos. Comece a distribuir moedas no mesmo dia do cadastro.",
  },
];

const steps = [
  {
    num: "01",
    title: "Escola se cadastra",
    desc: "A instituição cria sua conta e configura as regras da moeda estudantil.",
  },
  {
    num: "02",
    title: "Professores recompensam",
    desc: "Educadores distribuem CoinWise aos alunos por mérito, participação e atitudes positivas.",
  },
  {
    num: "03",
    title: "Alunos acumulam",
    desc: "Cada estudante tem uma carteira digital onde gerencia seu saldo e histórico de ganhos.",
  },
  {
    num: "04",
    title: "Empresas oferecem benefícios",
    desc: "Parceiros disponibilizam descontos e prêmios exclusivos para quem acumulou moedas.",
  },
];

const navLinks = ["Para Alunos", "Para Professores", "Para Empresas", "Como Funciona"];

const stats = [
  { value: "12k+", label: "Alunos ativos" },
  { value: "340+", label: "Escolas parceiras" },
  { value: "180+", label: "Empresas na rede" },
];

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
          CoinWise
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

/* ─── Dashboard Mockup ──────────────────────────────────────── */
function DashboardMockup() {
  return (
    <div className="relative">
      <div className="rounded-2xl bg-white/[0.06] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
            <div className="w-3 h-3 rounded-full bg-green-400/50" />
          </div>
          <div className="ml-3 flex-1 bg-white/8 rounded-md px-3 py-1 text-white/25 text-xs font-mono">
            app.coinwise.com/dashboard
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Saldo", value: "1.240", unit: "moedas" },
              { label: "Hoje", value: "+85", unit: "ganhos" },
              { label: "Ranking", value: "#3", unit: "da turma" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/[0.06] border border-white/10 p-3 text-center"
              >
                <p className="text-yellow-400 font-black text-lg leading-none">{s.value}</p>
                <p className="text-white/35 text-[10px] mt-1">{s.unit}</p>
                <p className="text-white/55 text-[10px] mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Transactions */}
          <div className="rounded-xl bg-white/[0.04] border border-white/8 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/8">
              <p className="text-white/60 text-xs font-semibold tracking-wider uppercase">
                Últimas transações
              </p>
            </div>
            {[
              { desc: "Participação em aula", val: "+20", color: "text-emerald-400" },
              { desc: "Entrega de projeto", val: "+50", color: "text-emerald-400" },
              { desc: "Desconto Livraria XYZ", val: "-120", color: "text-rose-400" },
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                      t.val.startsWith("+") ? "bg-emerald-400/15" : "bg-rose-400/15"
                    }`}
                  >
                    {t.val.startsWith("+") ? "▲" : "▼"}
                  </div>
                  <p className="text-white/65 text-xs">{t.desc}</p>
                </div>
                <p className={`text-xs font-bold ${t.color}`}>{t.val}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
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

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 border border-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-sm flex-shrink-0">
          ✓
        </div>
        <div>
          <p className="text-gray-800 text-xs font-bold leading-tight">Novo prêmio disponível!</p>
          <p className="text-gray-400 text-[10px] mt-0.5">Livraria ABC — 200 moedas</p>
        </div>
      </motion.div>

      {/* Floating ranking badge */}
      <motion.div
        initial={{ opacity: 0, x: 12, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="absolute -top-5 -right-5 bg-yellow-400 rounded-2xl px-4 py-2.5 shadow-xl shadow-yellow-400/30 flex items-center gap-2"
      >
        <span className="text-base">🏆</span>
        <div>
          <p className="text-blue-900 text-[10px] font-semibold leading-none">Top da turma</p>
          <p className="text-blue-900/70 text-[10px] mt-0.5">#3 este mês</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── App Preview (Platform section) ───────────────────────── */
function AppPreview() {
  return (
    <div className="rounded-2xl bg-white/[0.06] border border-white/10 overflow-hidden shadow-2xl">
      <div className="bg-white/[0.05] px-5 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xs">
            ◈
          </div>
          <span className="text-white text-sm font-bold">CoinWise</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-xs">
            👤
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-none">Ana Silva</p>
            <p className="text-white/40 text-[10px]">Aluna · 3º Ano</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Balance card */}
        <div className="rounded-xl bg-gradient-to-br from-yellow-400/20 via-yellow-400/10 to-transparent border border-yellow-400/20 p-4 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs mb-1 font-medium">Saldo disponível</p>
            <p className="text-white font-black text-3xl leading-none">1.240</p>
            <p className="text-yellow-400 text-xs mt-1.5 font-semibold tracking-wide">CoinWise</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-2xl">
            🏆
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "📤", label: "Transferir" },
            { icon: "🛍️", label: "Loja" },
            { icon: "📈", label: "Histórico" },
          ].map((a) => (
            <div
              key={a.label}
              className="rounded-xl bg-white/[0.06] border border-white/10 p-3 text-center cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <p className="text-lg">{a.icon}</p>
              <p className="text-white/55 text-[10px] mt-1.5 font-medium">{a.label}</p>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="space-y-2">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest px-1">
            Atividade recente
          </p>
          {[
            { icon: "📝", title: "Entrega de projeto", sub: "Prof. João · há 2h", val: "+50" },
            { icon: "🗣️", title: "Participação em aula", sub: "Prof. Maria · ontem", val: "+20" },
            { icon: "🛍️", title: "Desconto Livraria XYZ", sub: "Parceiro · 3 dias atrás", val: "-120" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/8 hover:bg-white/[0.07] transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
                <p className="text-white/35 text-[10px] mt-0.5">{item.sub}</p>
              </div>
              <p
                className={`text-xs font-bold flex-shrink-0 ${
                  item.val.startsWith("+") ? "text-emerald-400" : "text-rose-400"
                }`}
              >
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
      {/* Google Fonts import via style tag */}
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
      <header className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-xl bg-black/15">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/55 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 rounded-full group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <OutlineButton
              onClick={onGoLogin}
              className="hidden sm:block text-sm px-4 py-2"
            >
              Entrar
            </OutlineButton>
            <PrimaryButton
              onClick={onGoRegister}
              className="text-sm px-4 py-2"
            >
              Criar conta
            </PrimaryButton>
          </div>
        </div>
      </header>

      {/* ═══ HERO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-yellow-400/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 -right-40 w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div
          className="hero-grid max-w-6xl mx-auto px-6 py-20 lg:py-28 relative z-10"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}
        >
          {/* Left: copy */}
          <motion.div {...fadeUp(0)}>
            <span className="section-label">🚀 Plataforma de Moeda Estudantil</span>

            <h1
              className="text-white font-black leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
            >
              Transforme mérito
              <br />
              <span
                className="text-yellow-400"
                style={{
                  background: "linear-gradient(90deg, #facc15, #fde68a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                em oportunidades
              </span>
              <br />
              reais.
            </h1>

            <p
              className="text-white/55 mt-6 leading-relaxed max-w-lg"
              style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)" }}
            >
              Uma plataforma para reconhecer o desempenho dos alunos com moedas digitais e
              conectar escolas a empresas parceiras.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton
                onClick={onGoRegister}
                className="text-sm px-6 py-3"
              >
                Começar gratuitamente →
              </PrimaryButton>
              <OutlineButton
                onClick={onGoLogin}
                className="text-sm px-6 py-3"
              >
                Já tenho conta
              </OutlineButton>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-6 pt-8 border-t border-white/8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-white font-black text-2xl leading-none">{s.value}</p>
                  <p className="text-white/40 text-xs mt-1 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: dashboard mockup */}
          <motion.div {...fadeUp(0.18)} className="relative">
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="section-label" style={{ justifyContent: "center" }}>
              Benefícios
            </span>
            <h2
              className="text-white font-black leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)" }}
            >
              Tudo que você precisa
              <br />
              <span className="text-white/50">em um só lugar</span>
            </h2>
            <p className="text-white/45 mt-4 max-w-xl mx-auto leading-relaxed" style={{ fontSize: "1rem" }}>
              O CoinWise foi pensado para conectar o esforço dos alunos a recompensas concretas,
              tornando a educação mais motivadora para todos.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.07)}
                className="feature-card rounded-2xl bg-white/[0.05] border border-white/10 p-6 hover:bg-white/[0.08] hover:border-white/18 transition-all group cursor-default"
              >
                <div
                  className="feature-icon w-12 h-12 rounded-2xl bg-yellow-400/12 border border-yellow-400/20 flex items-center justify-center text-2xl mb-5"
                >
                  {f.icon}
                </div>
                <h3
                  className="text-white font-bold mb-2 leading-snug"
                  style={{ fontSize: "0.95rem" }}
                >
                  {f.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═════════════════════════════════════ */}
      <section className="py-20 lg:py-24 border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="section-label" style={{ justifyContent: "center" }}>
              Como funciona
            </span>
            <h2
              className="text-white font-black"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)" }}
            >
              Simples, rápido e eficiente
            </h2>
          </motion.div>

          <div
            className="steps-grid relative"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}
          >
            {/* Connector line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-yellow-400/25 to-transparent" />

            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                {...fadeUp(i * 0.1)}
                className="relative text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-400/12 border-2 border-yellow-400/25 flex items-center justify-center mx-auto mb-5 relative z-10 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition-all">
                  <span className="text-yellow-400 font-black text-xl">{s.num}</span>
                </div>
                <h3
                  className="text-white font-bold mb-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  {s.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLATFORM PREVIEW ════════════════════════════════ */}
      <section className="py-20 lg:py-24 border-t border-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="platform-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}
          >
            <motion.div {...fadeUp(0)}>
              <span className="section-label">Plataforma</span>
              <h2
                className="text-white font-black leading-tight mb-4"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
              >
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
                    <span className="w-5 h-5 rounded-full bg-yellow-400/15 border border-yellow-400/35 flex items-center justify-center text-yellow-400 text-[10px] flex-shrink-0 font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <PrimaryButton
                onClick={onGoRegister}
                className="text-sm px-6 py-3"
              >
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
            {/* Decorative icon */}
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-2xl mx-auto mb-6 shadow-2xl shadow-yellow-400/25">
              ◈
            </div>

            <h2
              className="text-white font-black leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              Pronto para transformar
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #facc15, #fde68a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                sua escola?
              </span>
            </h2>

            <p className="text-white/45 text-base leading-relaxed max-w-xl mx-auto">
              Junte-se a centenas de escolas que já usam o CoinWise para motivar alunos e criar
              uma cultura de mérito e reconhecimento.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <PrimaryButton
                onClick={onGoRegister}
                className="text-sm px-8 py-3.5"
              >
                Criar conta gratuitamente →
              </PrimaryButton>
              <OutlineButton
                onClick={onGoLogin}
                className="text-sm px-8 py-3.5"
              >
                Já tenho conta
              </OutlineButton>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              {["✓ Grátis para começar", "✓ Sem cartão de crédito", "✓ Suporte em português"].map(
                (item) => (
                  <span key={item} className="text-white/35 text-xs font-medium">
                    {item}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer className="border-t border-white/6 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="footer-grid mb-12"
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem" }}
          >
            {/* Brand */}
            <div>
              <Logo />
              <p className="text-white/35 text-sm leading-relaxed mt-4 max-w-xs">
                Transformando mérito em oportunidades reais para alunos, professores e empresas.
              </p>
              {/* Social */}
              <div className="flex items-center gap-3 mt-5">
                {["in", "tw", "ig"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all text-xs font-bold"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Plataforma",
                links: ["Para Alunos", "Para Professores", "Para Empresas", "Preços"],
              },
              {
                title: "Recursos",
                links: ["Central de Ajuda", "Blog", "Documentação", "Novidades"],
              },
              {
                title: "Contato",
                links: ["contato@coinwise.com", "Fale Conosco", "Privacidade", "Termos de Uso"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white font-semibold text-sm mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-white/35 hover:text-white/70 text-sm transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">© 2024 CoinWise. Todos os direitos reservados.</p>
            <div className="flex items-center gap-5">
              {["Instagram", "LinkedIn", "Twitter"].map((s) => (
                <a key={s} href="#" className="text-white/25 hover:text-white/55 text-xs transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
