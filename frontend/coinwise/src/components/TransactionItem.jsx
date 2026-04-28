import { motion } from "framer-motion";

export function TransactionItem({ tx, index = 0 }) {
  const isReceived = tx.type === "received";
  const isSpent = tx.type === "spent";

  const typeConfig = {
    received: { icon: "↓", color: "text-green-500", bg: "bg-green-50", border: "border-green-100", label: "Recebido", amountColor: "text-green-600" },
    spent: { icon: "↑", color: "text-red-500", bg: "bg-red-50", border: "border-red-100", label: "Resgatado", amountColor: "text-red-500" },
    sent: { icon: "→", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100", label: "Enviado", amountColor: "text-blue-600" },
  };

  const config = typeConfig[tx.type] || typeConfig.received;
  const date = new Date(tx.date);
  const formatted = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 2 }}
      className={`flex items-center gap-4 p-4 rounded-xl border ${config.border} ${config.bg}/30 hover:${config.bg} transition-all duration-200`}
    >
      <div className={`w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}>
        <span className={`${config.color} font-bold text-lg`}>{config.icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-gray-700 font-semibold text-sm truncate">
            {tx.from || tx.to || "Sistema"}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium border ${config.border}`}>
            {config.label}
          </span>
        </div>
        {tx.message && (
          <p className="text-gray-400 text-xs mt-0.5 truncate">{tx.message}</p>
        )}
        <p className="text-gray-300 text-xs mt-0.5">{formatted}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`font-black text-base ${config.amountColor}`}>
          {isReceived ? "+" : "-"}{tx.amount}
        </p>
        <p className="text-gray-400 text-xs">moedas</p>
      </div>
    </motion.div>
  );
}

export function RewardCard({ reward, onRedeem, index = 0 }) {
  const canAfford = reward.canAfford !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      className={`bg-white rounded-2xl border ${reward.available ? "border-gray-100" : "border-gray-100 opacity-60"} shadow-sm overflow-hidden transition-all duration-200`}
    >
      {/* Image area */}
      <div className="h-24 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center relative">
        <span className="text-5xl">{reward.image}</span>
        {!reward.available && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <span className="text-white text-xs font-bold bg-gray-900/80 px-3 py-1 rounded-full">Esgotado</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-0.5">
          <span className="text-white text-xs font-medium">{reward.category}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-800 font-bold text-sm leading-tight">{reward.name}</p>
        <p className="text-gray-500 text-xs mt-1 leading-snug line-clamp-2">{reward.description}</p>
        <p className="text-gray-400 text-xs mt-1">{reward.company}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-base">◈</span>
            <span className="text-gray-800 font-black text-lg">{reward.cost}</span>
            <span className="text-gray-400 text-xs">moedas</span>
          </div>

          {reward.available && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRedeem && onRedeem(reward)}
              disabled={!canAfford}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                canAfford
                  ? "bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-sm shadow-yellow-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {canAfford ? "Resgatar" : "Saldo insuf."}
            </motion.button>
          )}
        </div>

        {reward.totalRedeemed !== undefined && (
          <p className="text-gray-300 text-xs mt-2">{reward.totalRedeemed} resgates</p>
        )}
      </div>
    </motion.div>
  );
}