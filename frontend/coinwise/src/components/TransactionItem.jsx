import { motion } from "framer-motion";

export function TransactionItem({ tx, index = 0 }) {
  const isReceived = tx.type === "received";

  const typeConfig = {
    received: {
      icon: "↓",
      iconColor: "#4ade80",
      bg: "rgba(34,197,94,0.1)",
      border: "rgba(34,197,94,0.18)",
      glow: "rgba(34,197,94,0.15)",
      label: "Recebido",
      amountColor: "#4ade80",
      amountGlow: "rgba(74,222,128,0.25)",
      sign: "+",
    },
    spent: {
      icon: "↑",
      iconColor: "#f87171",
      bg: "rgba(239,68,68,0.1)",
      border: "rgba(239,68,68,0.18)",
      glow: "rgba(239,68,68,0.12)",
      label: "Resgatado",
      amountColor: "#f87171",
      amountGlow: "rgba(248,113,113,0.25)",
      sign: "−",
    },
    sent: {
      icon: "→",
      iconColor: "#60a5fa",
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.18)",
      glow: "rgba(59,130,246,0.12)",
      label: "Enviado",
      amountColor: "#60a5fa",
      amountGlow: "rgba(96,165,250,0.25)",
      sign: "−",
    },
  };

  const cfg = typeConfig[tx.type] || typeConfig.received;
  const date = new Date(tx.date);
  const formatted = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.045, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ x: 3 }}
      style={{
        display: "flex", alignItems: "center", gap: "0.9rem",
        padding: "0.9rem 1rem",
        borderRadius: "0.875rem",
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "box-shadow 0.2s, border-color 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)";
      }}
    >
      {/* Colored left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%", width: "2px",
        borderRadius: "0 2px 2px 0",
        background: `linear-gradient(180deg, transparent, ${cfg.iconColor}80, transparent)`,
      }} />

      {/* Icon */}
      <div style={{
        width: 42, height: 42, borderRadius: "0.75rem", flexShrink: 0,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 4px 14px ${cfg.glow}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: cfg.iconColor, fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>{cfg.icon}</span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
          <p style={{
            color: "rgba(255,255,255,0.88)", fontWeight: 700, fontSize: "0.8125rem",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            letterSpacing: "-0.01em",
          }}>
            {tx.from || tx.to || "Sistema"}
          </p>
          <span style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "0.15rem 0.5rem", borderRadius: "9999px",
            background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.iconColor,
          }}>
            {cfg.label}
          </span>
        </div>

        {tx.message && (
          <p style={{
            color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: "0.15rem",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {tx.message}
          </p>
        )}
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.7rem", marginTop: "0.2rem" }}>
          {formatted}
        </p>
      </div>

      {/* Amount */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{
          fontWeight: 900, fontSize: "1rem", color: cfg.amountColor,
          letterSpacing: "-0.02em",
          textShadow: `0 0 20px ${cfg.amountGlow}`,
        }}>
          {cfg.sign}{tx.amount}
        </p>
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.68rem", marginTop: "0.1rem" }}>moedas</p>
      </div>
    </motion.div>
  );
}

export function RewardCard({ reward, onRedeem, index = 0 }) {
  const canAfford = reward.canAfford !== false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={reward.available ? { y: -6 } : {}}
      style={{
        background: "linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.125rem",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
        opacity: reward.available ? 1 : 0.5,
        transition: "box-shadow 0.25s, opacity 0.25s",
        position: "relative",
      }}
      onMouseEnter={e => reward.available && (e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)")}
    >
      {/* Image area */}
      <div style={{
        height: "6.5rem", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #0f2347 0%, #162d55 50%, #0a1a35 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Background shimmer */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 70% 30%, rgba(250,204,21,0.08) 0%, transparent 60%)",
        }} />

        <motion.span
          animate={reward.available ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "3rem", position: "relative", zIndex: 1, filter: reward.available ? "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" : "grayscale(1)" }}
        >
          {reward.image}
        </motion.span>

        {!reward.available && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(5,10,20,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(2px)",
          }}>
            <span style={{
              color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              background: "rgba(0,0,0,0.5)", padding: "0.3rem 0.75rem", borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>
              Esgotado
            </span>
          </div>
        )}

        {/* Category badge */}
        <div style={{
          position: "absolute", top: "0.625rem", right: "0.625rem",
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "0.5rem", padding: "0.2rem 0.5rem",
        }}>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em" }}>
            {reward.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1rem 1.125rem 1.125rem" }}>
        <p style={{
          color: "rgba(255,255,255,0.92)", fontWeight: 700, fontSize: "0.875rem",
          lineHeight: 1.35, letterSpacing: "-0.01em",
        }}>
          {reward.name}
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginTop: "0.3rem", lineHeight: 1.45 }}>
          {reward.description}
        </p>
        {reward.company && (
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", marginTop: "0.2rem", fontWeight: 500 }}>
            {reward.company}
          </p>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0.875rem 0" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
            <span style={{ color: "#facc15", fontSize: "1rem", lineHeight: 1 }}>◈</span>
            <span style={{
              color: "white", fontWeight: 900, fontSize: "1.125rem",
              letterSpacing: "-0.02em", textShadow: "0 0 20px rgba(250,204,21,0.2)",
            }}>
              {reward.cost}
            </span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>moedas</span>
          </div>

          {reward.available && (
            <motion.button
              whileHover={canAfford ? { scale: 1.06 } : {}}
              whileTap={canAfford ? { scale: 0.95 } : {}}
              onClick={() => canAfford && onRedeem && onRedeem(reward)}
              style={canAfford ? {
                padding: "0.45rem 0.9rem",
                borderRadius: "0.625rem",
                fontSize: "0.75rem", fontWeight: 800,
                background: "linear-gradient(135deg, #facc15, #f59e0b)",
                color: "#0f2347",
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(250,204,21,0.35)",
                letterSpacing: "0.01em",
                transition: "box-shadow 0.2s",
              } : {
                padding: "0.45rem 0.9rem",
                borderRadius: "0.625rem",
                fontSize: "0.75rem", fontWeight: 700,
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "not-allowed",
              }}
            >
              {canAfford ? "Resgatar" : "Saldo insuf."}
            </motion.button>
          )}
        </div>

        {reward.totalRedeemed !== undefined && (
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.68rem", marginTop: "0.5rem" }}>
            {reward.totalRedeemed} resgates
          </p>
        )}
      </div>
    </motion.div>
  );
}