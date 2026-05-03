import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, onClose, onConfirm, title, description, confirmLabel = "Confirmar", confirmColor = "yellow", children }) {
  if (!open) return null;

  const confirmStyles = {
    yellow: "bg-yellow-400 text-blue-900 hover:bg-yellow-300",
    red: "bg-red-500 text-white hover:bg-red-600",
    green: "bg-green-500 text-white hover:bg-green-600",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" style={{ background: "linear-gradient(160deg, #0f172a 0%, #1a2f50 100%)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                  {description && <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", marginTop: "0.25rem" }}>{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            {children && (
              <div className="px-6 pb-4">{children}</div>
            )}

            {/* Actions */}
            {(onConfirm || onClose) && (
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", background: "transparent" }}
                >
                  Cancelar
                </button>
                {onConfirm && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onConfirm}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${confirmStyles[confirmColor]}`}
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

