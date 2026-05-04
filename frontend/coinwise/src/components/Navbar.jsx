import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ currentUser, onToggleSidebar, collapsed }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const firstName = currentUser?.name?.split(" ")[0] || currentUser?.nome?.split(" ")[0] || "Usuário";
  const avatarLabel = currentUser?.avatar || firstName[0] || "?";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className="fixed top-0 right-0 z-30 backdrop-blur-md shadow-sm"
      style={{
        left: isMobile ? 0 : (collapsed ? 72 : 248),
        transition: "left 0.25s ease",
        backgroundColor: "rgba(10,20,40,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-16">

        {/* LEFT */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span className="text-xl">☰</span>
          </button>

          <div>
            <h1 className="text-white font-bold text-sm md:text-base leading-tight">
              Bem-vindo, {firstName}! 👋
            </h1>
            <p className="text-white/40 text-[10px] md:text-xs">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* 🔔 Notifications — sem mock, só o sino por enquanto */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-xl transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <span className="text-lg md:text-xl">🔔</span>
            </motion.button>

            <AnimatePresence>
              {showNotifs && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-72 md:w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
                  style={{
                    background: "linear-gradient(160deg, #0f172a 0%, #1a2f50 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="px-4 py-3 flex items-center justify-between"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p className="font-bold text-white text-sm">Notificações</p>
                  </div>
                  <div className="px-4 py-8 text-center">
                    <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔕</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
                      Nenhuma notificação
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 👤 Avatar */}
          <div
            className="flex items-center gap-2 rounded-xl px-2 md:px-3 py-1.5"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-yellow-400 font-bold text-xs">
              {avatarLabel}
            </div>
            <div className="hidden sm:block">
              <p className="text-white/80 font-semibold text-xs">{firstName}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}