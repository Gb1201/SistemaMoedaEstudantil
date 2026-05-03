import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockNotifications } from "../data/mockData";

export default function Navbar({ currentUser, onToggleSidebar, collapsed }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const unread = mockNotifications.filter(n => !n.read).length;

  const typeIcon = { received: "↓", reward: "🎁", spent: "↑" };
  const typeColor = { received: "text-green-600", reward: "text-yellow-600", spent: "text-red-500" };

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
        left: isMobile ? 0 : (collapsed ? 72 : 240),
        transition: "left 0.3s ease",
        backgroundColor: "rgba(10,20,40,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        
        {/* LEFT */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span className="text-xl">☰</span>
          </button>

          <div>
            <h1 className="text-white font-bold text-sm md:text-base leading-tight">
              Bem-vindo, {currentUser.name.split(" ")[0]}! 👋
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
          
          {/* 🔔 Notifications */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-xl transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <span className="text-lg md:text-xl">🔔</span>

              {unread > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {unread}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifs && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-72 md:w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
                  style={{ background: "linear-gradient(160deg, #0f172a 0%, #1a2f50 100%)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <p className="font-bold text-white text-sm">Notificações</p>

                    {unread > 0 && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {unread} novas
                      </span>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto" style={{ borderTop: "none" }}>
                    {mockNotifications.map(n => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`px-4 py-3 transition-colors cursor-pointer ${
                          !n.read ? "bg-white/5" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`text-base mt-0.5 ${typeColor[n.type]}`}>
                            {typeIcon[n.type]}
                          </span>

                          <div>
                            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem", lineHeight: 1.4 }}>{n.message}</p>
                            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{n.time}</p>
                          </div>

                          {!n.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto mt-1" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 👤 Avatar */}
          <div className="flex items-center gap-2 rounded-xl px-2 md:px-3 py-1.5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-yellow-400 font-bold text-xs">
              {currentUser.avatar}
            </div>

            <div className="hidden sm:block">
              <p className="text-white/80 font-semibold text-xs">
                {currentUser.name.split(" ")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}