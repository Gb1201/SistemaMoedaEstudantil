import { motion } from "framer-motion";

export function TransactionItem({ tx, index = 0 }) {
  const isReceived = tx.type === "received";
  const isSpent = tx.type === "spent";

  const typeConfig = {
    received: { icon: "↓", color: "#4ade80", bgStyle: { background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }, label: "Recebido", amountColor: "#4ade80" },
    spent: { icon: "↑", color: "#f87171", bgStyle: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }, label: "Resgatado", amountColor: "#f87171" },
    sent: { icon: "→", color: "#60a5fa", bgStyle: { background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }, label: "Enviado", amountColor: "#60a5fa" },
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
      style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s" }}
    >
      <div style={{ width: 40, height: 40, borderRadius: "0.75rem", ...config.bgStyle, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ color: config.color, fontWeight: "bold", fontSize: "1.125rem" }}>{config.icon}</span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.875rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {tx.from || tx.to || "Sistema"}
          </p>
          <span style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "9999px", ...config.bgStyle, color: config.color, fontWeight: 500 }}>
            {config.label}
          </span>
        </div>
        {tx.message && (
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "0.125rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.message}</p>
        )}
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", marginTop: "0.125rem" }}>{formatted}</p>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontWeight: 900, fontSize: "1rem", color: config.amountColor }}>
          {isReceived ? "+" : "-"}{tx.amount}
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>moedas</p>
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
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", overflow: "hidden", transition: "all 0.2s", opacity: reward.available ? 1 : 0.6 }}
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
        <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.3 }}>{reward.name}</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.25rem", lineHeight: 1.4 }}>{reward.description}</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{reward.company}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5">
            <span style={{ color: "#facc15", fontSize: "1rem" }}>◈</span>
            <span style={{ color: "white", fontWeight: 900, fontSize: "1.125rem" }}>{reward.cost}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>moedas</span>
          </div>

          {reward.available && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRedeem && onRedeem(reward)}
              disabled={!canAfford}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
              style={canAfford
                ? { background: "#facc15", color: "#1e3a5f" }
                : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", cursor: "not-allowed" }
              }
            >
              {canAfford ? "Resgatar" : "Saldo insuf."}
            </motion.button>
          )}
        </div>

        {reward.totalRedeemed !== undefined && (
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", marginTop: "0.5rem" }}>{reward.totalRedeemed} resgates</p>
        )}
      </div>
    </motion.div>
  );
}