import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockNotifications } from "../data/mockData";

export default function Navbar({ currentUser, onToggleSidebar, collapsed }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = mockNotifications.filter(n => !n.read).length;

  const typeIcon = { received: "↓", reward: "🎁", spent: "↑" };
  const typeColor = { received: "text-green-600", reward: "text-yellow-600", spent: "text-red-500" };

  return (
    <header className="fixed top-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
      style={{ left: collapsed ? 72 : 240, transition: "left 0.3s ease" }}>
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          >
            <span className="text-xl">☰</span>
          </button>
          <div>
            <h1 className="text-gray-800 font-bold text-base leading-tight">Bem-vindo, {currentUser.name.split(" ")[0]}! 👋</h1>
            <p className="text-gray-400 text-xs">
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl text-gray-600">🔔</span>
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
                  className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <p className="font-bold text-gray-800 text-sm">Notificações</p>
                    {unread > 0 && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {unread} novas
                      </span>
                    )}
                  </div>
                  <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                    {mockNotifications.map(n => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? "bg-blue-50/50" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`text-base mt-0.5 ${typeColor[n.type]}`}>{typeIcon[n.type]}</span>
                          <div>
                            <p className="text-gray-700 text-xs leading-snug">{n.message}</p>
                            <p className="text-gray-400 text-xs mt-1">{n.time}</p>
                          </div>
                          {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto mt-1 flex-shrink-0" />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-yellow-400 font-bold text-xs">
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block">
              <p className="text-gray-700 font-semibold text-xs leading-tight">{currentUser.name.split(" ")[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}