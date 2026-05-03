import { motion, AnimatePresence } from "framer-motion";

const navItems = {
  student: [
    { icon: "⊞", label: "Dashboard", page: "student-dashboard" },
    { icon: "↕", label: "Extrato", page: "student-transactions" },
    { icon: "🎁", label: "Vantagens", page: "student-rewards" },
    { icon: "◉", label: "Perfil", page: "student-profile" },
  ],
  teacher: [
    { icon: "⊞", label: "Dashboard", page: "teacher-dashboard" },
    { icon: "◈", label: "Enviar Moedas", page: "send-coins" },
    { icon: "↕", label: "Histórico", page: "teacher-transactions" },
  ],
  company: [
    { icon: "⊞", label: "Dashboard", page: "company-dashboard" },
    { icon: "+", label: "Nova Vantagem", page: "create-reward" },
    { icon: "≡", label: "Minhas Vantagens", page: "company-rewards" },
  ],
};

const roleLabels = { student: "Aluno", teacher: "Professor", company: "Empresa" };

const roleConfig = {
  student: {
    gradient: "from-[#0f172a] to-[#1e3a5f]",
    accent: "bg-yellow-400/15 text-yellow-300 border-yellow-400/20",
    badge: "bg-yellow-400/15 text-yellow-300",
  },
  teacher: {
    gradient: "from-[#0f172a] to-[#2d1f5e]",
    accent: "bg-yellow-400/15 text-yellow-300 border-yellow-400/20",
    badge: "bg-violet-500/25 text-violet-300",
  },
  company: {
    gradient: "from-[#0f172a] to-[#0d3530]",
    accent: "bg-yellow-400/15 text-yellow-300 border-yellow-400/20",
    badge: "bg-emerald-500/25 text-emerald-300",
  },
};

export default function Sidebar({ currentUser, currentPage, onNavigate, onLogout, collapsed, onToggle }) {
  const items = navItems[currentUser.role] || [];
  const config = roleConfig[currentUser.role];

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 248 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-full bg-gradient-to-b ${config.gradient} z-40 flex flex-col overflow-hidden`}
      style={{
        minWidth: collapsed ? 72 : 248,
        boxShadow: "4px 0 24px rgba(0,0,0,0.35)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Top: Logo + collapse toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/8">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-lg flex-shrink-0 shadow-lg shadow-yellow-400/20">
            ◈
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <p className="text-white font-bold text-base leading-tight tracking-tight">CoinWise</p>
                <p className="text-white/40 text-[10px] leading-none mt-0.5">Moeda Estudantil</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onToggle}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all flex-shrink-0"
        >
          <span className="text-xs">{collapsed ? "▶" : "◀"}</span>
        </button>
      </div>

      {/* User card */}
      <div className={`px-3 py-3 border-b border-white/8 ${collapsed ? "flex justify-center" : ""}`}>
        {collapsed ? (
          <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-sm shadow-md shadow-yellow-400/20">
            {currentUser.avatar}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5 border border-white/8"
            >
              <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-sm flex-shrink-0 shadow-md shadow-yellow-400/20">
                {currentUser.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-semibold text-sm truncate leading-tight">{currentUser.name}</p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${config.badge}`}>
                  {roleLabels[currentUser.role]}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {!collapsed && (
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
            Menu
          </p>
        )}
        {items.map((item, i) => {
          const isActive = currentPage === item.page;
          return (
            <motion.button
              key={item.page}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              whileHover={{ x: collapsed ? 0 : 3 }}
              onClick={() => onNavigate(item.page)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-yellow-400 text-blue-900 shadow-lg shadow-yellow-400/15"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <span className={`text-base flex-shrink-0 leading-none ${isActive ? "text-blue-900" : "text-white/50 group-hover:text-white"}`}>
                {item.icon}
              </span>

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {!collapsed && isActive && (
                <motion.div
                  layoutId="sidebarDot"
                  className="ml-auto w-1.5 h-1.5 bg-blue-900/60 rounded-full flex-shrink-0"
                />
              )}

              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-yellow-300 rounded-r-full"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom: logout */}
      <div className="px-3 pb-5 pt-3 border-t border-white/8">
        <motion.button
          whileHover={{ x: collapsed ? 0 : 3 }}
          onClick={onLogout}
          title={collapsed ? "Sair" : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:bg-red-500/15 hover:text-red-300 transition-all duration-200 group ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <span className="text-base flex-shrink-0 group-hover:text-red-300 transition-colors">⏎</span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium text-sm"
              >
                Sair
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
}