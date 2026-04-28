import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

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

export default function HomePage({ onGoLogin, onGoRegister }) {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}
    >
      {/* ───── NAVBAR ───── */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-lg shadow-lg">
              ◈
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">CoinWise</p>
              <p className="text-white/40 text-[10px] leading-none mt-0.5">Moeda Estudantil</p>
            </div>
          </div>

          {/* Nav links — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoLogin}
              className="hidden sm:block text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-all"
            >
              Entrar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoRegister}
              className="bg-yellow-400 text-blue-900 text-sm font-bold px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition-all"
            >
              Criar conta
            </motion.button>
          </div>
        </div>
      </header>

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-yellow-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 -right-32 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left: copy */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-400 text-xs font-semibold mb-6">
              🚀 Plataforma de Moeda Estudantil
            </span>

            <h1 className="text-white font-black text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight">
              Transforme mérito
              <br />
              <span className="text-yellow-400">em oportunidades</span>
              <br />
              reais.
            </h1>

            <p className="text-white/60 mt-6 text-base lg:text-lg leading-relaxed max-w-lg">
              Uma plataforma para reconhecer o desempenho dos alunos com moedas digitais e conectar
              escolas a empresas parceiras.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGoRegister}
                className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition-all text-sm"
              >
                Começar gratuitamente →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGoLogin}
                className="text-white/80 font-medium px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 transition-all text-sm"
              >
                Já tenho conta
              </motion.button>
            </div>

            {/* Social proof tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["👨‍🎓 Alunos", "👨‍🏫 Professores", "🏢 Empresas"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: dashboard mockup */}
          <motion.div {...fadeUp(0.15)} className="relative">
            <div className="relative rounded-2xl bg-white/5 border border-white/10 p-1 shadow-2xl backdrop-blur-sm">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
                <div className="ml-4 flex-1 bg-white/8 rounded-md px-3 py-1 text-white/30 text-xs">
                  app.coinwise.com/dashboard
                </div>
              </div>

              {/* Mock dashboard content */}
              <div className="p-5 space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Seu saldo", value: "1.240", unit: "moedas" },
                    { label: "Ganhos hoje", value: "+85", unit: "moedas" },
                    { label: "Ranking", value: "#3", unit: "da turma" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-white/8 border border-white/10 p-3 text-center"
                    >
                      <p className="text-yellow-400 font-black text-lg">{s.value}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">{s.unit}</p>
                      <p className="text-white/60 text-[10px] mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Activity list */}
                <div className="rounded-xl bg-white/5 border border-white/8 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-white/8">
                    <p className="text-white/70 text-xs font-semibold">Últimas transações</p>
                  </div>
                  {[
                    { desc: "Participação em aula", val: "+20", color: "text-green-400" },
                    { desc: "Entrega de projeto", val: "+50", color: "text-green-400" },
                    { desc: "Desconto Livraria XYZ", val: "-120", color: "text-red-400" },
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                          {t.val.startsWith("+") ? "⬆" : "⬇"}
                        </div>
                        <p className="text-white/70 text-xs">{t.desc}</p>
                      </div>
                      <p className={`text-xs font-bold ${t.color}`}>{t.val}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="rounded-xl bg-white/5 border border-white/8 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white/60 text-xs">Meta do mês</p>
                    <p className="text-yellow-400 text-xs font-bold">62%</p>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-yellow-400 w-[62%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2.5 shadow-2xl flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <div>
                <p className="text-gray-800 text-xs font-bold">Novo prêmio disponível!</p>
                <p className="text-gray-500 text-[10px]">Livraria ABC — 200 moedas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Benefícios
            </p>
            <h2 className="text-white font-black text-3xl lg:text-4xl">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-base">
              O CoinWise foi pensado para conectar o esforço dos alunos a recompensas concretas,
              tornando a educação mais motivadora para todos.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.07)}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-white/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-yellow-400/15 border border-yellow-400/20 flex items-center justify-center text-xl mb-4 group-hover:bg-yellow-400/25 transition-all">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="py-20 lg:py-24 border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Como funciona
            </p>
            <h2 className="text-white font-black text-3xl lg:text-4xl">
              Simples, rápido e eficiente
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

            {steps.map((s, i) => (
              <motion.div key={s.num} {...fadeUp(i * 0.1)} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/15 border-2 border-yellow-400/30 flex items-center justify-center mx-auto mb-5 relative z-10">
                  <span className="text-yellow-400 font-black text-xl">{s.num}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── DASHBOARD PREVIEW ───── */}
      <section className="py-20 lg:py-24 border-t border-white/8">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)}>
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Plataforma
            </p>
            <h2 className="text-white font-black text-3xl lg:text-4xl leading-tight">
              Um painel completo para cada perfil de usuário
            </h2>
            <p className="text-white/50 mt-4 text-base leading-relaxed">
              Alunos acompanham seu saldo e conquistas. Professores distribuem moedas com um clique.
              Gestores visualizam dados de toda a escola em tempo real.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Carteira digital para cada aluno",
                "Histórico completo de transações",
                "Relatórios de engajamento por turma",
                "Gestão de parceiros e benefícios",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="w-5 h-5 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-400 text-xs flex-shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGoRegister}
              className="mt-8 bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition-all text-sm"
            >
              Ver a plataforma →
            </motion.button>
          </motion.div>

          {/* Mock app preview */}
          <motion.div {...fadeUp(0.15)}>
            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl">
              {/* Header bar */}
              <div className="bg-white/8 px-5 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-xs">
                    ◈
                  </div>
                  <span className="text-white text-sm font-bold">CoinWise</span>
                </div>
                <div className="flex items-center gap-2">
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
                <div className="rounded-xl bg-gradient-to-r from-yellow-400/20 to-yellow-400/5 border border-yellow-400/20 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Saldo disponível</p>
                    <p className="text-white font-black text-3xl">1.240</p>
                    <p className="text-yellow-400 text-xs mt-0.5">CoinWise</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-yellow-400/20 border-2 border-yellow-400/30 flex items-center justify-center text-2xl">
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
                      className="rounded-xl bg-white/8 border border-white/10 p-3 text-center cursor-pointer hover:bg-white/12 transition-all"
                    >
                      <p className="text-lg">{a.icon}</p>
                      <p className="text-white/60 text-[10px] mt-1">{a.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent activity */}
                <div className="space-y-2">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                    Atividade recente
                  </p>
                  {[
                    { icon: "📝", title: "Entrega de projeto", sub: "Prof. João · há 2h", val: "+50" },
                    { icon: "🗣️", title: "Participação em aula", sub: "Prof. Maria · ontem", val: "+20" },
                    { icon: "🛍️", title: "Desconto Livraria XYZ", sub: "Parceiro · 3 dias atrás", val: "-120" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{item.title}</p>
                        <p className="text-white/40 text-[10px]">{item.sub}</p>
                      </div>
                      <p
                        className={`text-xs font-bold flex-shrink-0 ${
                          item.val.startsWith("+") ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {item.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── CTA FINAL ───── */}
      <section className="py-20 lg:py-24 border-t border-white/8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-3xl mx-auto mb-6 shadow-lg shadow-yellow-400/20">
              ◈
            </div>
            <h2 className="text-white font-black text-3xl lg:text-5xl leading-tight">
              Pronto para transformar
              <span className="text-yellow-400"> sua escola?</span>
            </h2>
            <p className="text-white/50 mt-4 text-base leading-relaxed">
              Junte-se a centenas de escolas que já usam o CoinWise para motivar alunos e criar uma
              cultura de mérito e reconhecimento.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGoRegister}
                className="bg-yellow-400 text-blue-900 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-all text-sm"
              >
                Criar conta gratuitamente →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onGoLogin}
                className="text-white/80 font-medium px-8 py-3.5 rounded-xl border border-white/20 hover:border-white/40 transition-all text-sm"
              >
                Já tenho conta
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-white/8 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-base shadow">
                  ◈
                </div>
                <span className="text-white font-bold">CoinWise</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Transformando mérito em oportunidades reais para alunos, professores e empresas.
              </p>
            </div>

            {/* Plataforma */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Plataforma</p>
              <ul className="space-y-2.5">
                {["Para Alunos", "Para Professores", "Para Empresas", "Preços"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Recursos</p>
              <ul className="space-y-2.5">
                {["Central de Ajuda", "Blog", "Documentação", "Novidades"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Contato</p>
              <ul className="space-y-2.5">
                {["contato@coinwise.com", "Fale Conosco", "Política de Privacidade", "Termos de Uso"].map(
                  (l) => (
                    <li key={l}>
                      <a href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">© 2024 CoinWise. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              {["Instagram", "LinkedIn", "Twitter"].map((s) => (
                <a key={s} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
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
