import { motion } from "framer-motion";

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

const roleLabels = {
  student: "Aluno",
  teacher: "Professor",
  company: "Empresa",
};

const roleColors = {
  student: "from-blue-900 to-blue-800",
  teacher: "from-purple-900 to-purple-800",
  company: "from-teal-900 to-teal-800",
};

export default function Sidebar({ currentUser, currentPage, onNavigate, onLogout, collapsed, onToggle }) {
  const items = navItems[currentUser.role] || [];
  const roleColor = roleColors[currentUser.role];

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-full bg-gradient-to-b ${roleColor} z-40 flex flex-col shadow-2xl overflow-hidden`}
      style={{ minWidth: collapsed ? 72 : 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 font-black text-lg flex-shrink-0 shadow-lg">
          ◈
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <p className="text-white font-bold text-base leading-tight">CoinWise</p>
            <p className="text-white/50 text-xs">Moeda Estudantil</p>
          </motion.div>
        )}
      </div>

      {/* User info */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="px-4 py-4 border-b border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-blue-900 font-bold text-sm flex-shrink-0">
              {currentUser.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{currentUser.name}</p>
              <span className="text-xs bg-white/20 text-white/80 px-2 py-0.5 rounded-full">
                {roleLabels[currentUser.role]}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item, i) => {
          const isActive = currentPage === item.page;
          return (
            <motion.button
              key={item.page}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ x: 4 }}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-yellow-400 text-blue-900 shadow-lg shadow-yellow-400/20"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className={`text-lg flex-shrink-0 ${isActive ? "text-blue-900" : "text-white/60 group-hover:text-white"}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {!collapsed && isActive && (
                <motion.div layoutId="activeIndicator" className="ml-auto w-1.5 h-1.5 bg-blue-900 rounded-full" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <motion.button
          whileHover={{ x: 4 }}
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
        >
          <span className="text-lg flex-shrink-0">⏎</span>
          {!collapsed && <span className="font-medium text-sm">Sair</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}