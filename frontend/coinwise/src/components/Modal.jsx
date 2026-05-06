import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
  confirmColor = "yellow",
  children,
}) {
  if (!open) return null;

  const confirmVariants = {
    yellow: {
      background: "linear-gradient(135deg, #facc15, #f59e0b)",
      color: "#0f172a",
      shadow: "0 4px 20px rgba(250,204,21,0.35)",
      hoverShadow: "0 6px 28px rgba(250,204,21,0.5)",
    },
    red: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      color: "#fff",
      shadow: "0 4px 20px rgba(239,68,68,0.35)",
      hoverShadow: "0 6px 28px rgba(239,68,68,0.5)",
    },
    green: {
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      color: "#fff",
      shadow: "0 4px 20px rgba(34,197,94,0.35)",
      hoverShadow: "0 6px 28px rgba(34,197,94,0.5)",
    },
    blue: {
      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
      color: "#fff",
      shadow: "0 4px 20px rgba(59,130,246,0.35)",
      hoverShadow: "0 6px 28px rgba(59,130,246,0.5)",
    },
  };

  const cs = confirmVariants[confirmColor] || confirmVariants.yellow;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          onClick={onClose}
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 320, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden relative"
            style={{
              borderRadius: "1.375rem",
              background: "linear-gradient(160deg, #0e1f3d 0%, #0a1628 60%, #091420 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {/* Subtle top accent line */}
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
            }} />

            {/* Background glow */}
            <div style={{
              position: "absolute", top: -60, right: -60, width: 200, height: 200,
              background: "radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            {/* Header */}
            <div style={{ padding: "1.625rem 1.625rem 1.125rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    color: "rgba(255,255,255,0.95)",
                    fontWeight: 800,
                    fontSize: "1.0625rem",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}>
                    {title}
                  </h3>
                  {description && (
                    <p style={{
                      color: "rgba(255,255,255,0.38)",
                      fontSize: "0.8125rem",
                      marginTop: "0.375rem",
                      lineHeight: 1.55,
                    }}>
                      {description}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  onClick={onClose}
                  style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {/* Divider */}
            {children && (
              <div style={{ height: "1px", margin: "0 1.625rem", background: "rgba(255,255,255,0.06)" }} />
            )}

            {/* Content */}
            {children && (
              <div style={{ padding: "1.25rem 1.625rem" }}>
                {children}
              </div>
            )}

            {/* Divider before actions */}
            {(onConfirm || onClose) && (
              <div style={{ height: "1px", margin: "0 1.625rem", background: "rgba(255,255,255,0.06)" }} />
            )}

            {/* Actions */}
            {(onConfirm || onClose) && (
              <div style={{ padding: "1.25rem 1.625rem 1.625rem", display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1, padding: "0.6875rem 1rem",
                    borderRadius: "0.875rem",
                    fontWeight: 600, fontSize: "0.8125rem",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                    background: "rgba(255,255,255,0.04)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                  }}
                >
                  Cancelar
                </button>

                {onConfirm && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onConfirm}
                    style={{
                      flex: 1, padding: "0.6875rem 1rem",
                      borderRadius: "0.875rem",
                      fontWeight: 800, fontSize: "0.8125rem",
                      background: cs.background,
                      color: cs.color,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: cs.shadow,
                      letterSpacing: "0.01em",
                      transition: "box-shadow 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = cs.hoverShadow; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = cs.shadow; }}
                  >
                    {confirmLabel}
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

