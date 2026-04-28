import { motion } from "framer-motion";

export function Card({ children, className = "", hover = true, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, shadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function BalanceCard({ balance, label = "Saldo de Moedas", subtitle, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-yellow-400/10 rounded-full" />
      <div className="absolute -bottom-10 -right-4 w-32 h-32 bg-yellow-400/5 rounded-full" />
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/5 rounded-full" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/60 text-sm font-medium">{label}</p>
            {subtitle && <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>}
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center">
            <span className="text-yellow-400 text-lg">◈</span>
          </div>
        </div>

        <div className="flex items-end gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <span className="text-yellow-400 text-4xl font-black tracking-tight">{balance}</span>
            <span className="text-yellow-400/60 text-lg font-medium ml-2">moedas</span>
          </motion.div>
        </div>

        {trend !== undefined && (
          <div className="mt-3 flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)} este mês
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function StatCard({ icon, label, value, color = "blue", delay = 0 }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    purple: "bg-purple-50 text-purple-600",
    teal: "bg-teal-50 text-teal-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center text-lg mb-3`}>
        {icon}
      </div>
      <p className="text-gray-400 text-xs font-medium">{label}</p>
      <p className="text-gray-800 font-bold text-xl mt-0.5">{value}</p>
    </motion.div>
  );
}