import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONT = "'Sora', 'Nunito', sans-serif";

export default function Navbar({ currentUser, onToggleSidebar, collapsed }) {
  const [showNotifs, setShowNotifs]   = useState(false);
  const [isMobile,   setIsMobile]     = useState(false);
  const [scrolled,   setScrolled]     = useState(false);
  const notifRef = useRef(null);

  const firstName   = currentUser?.name?.split(" ")[0] || currentUser?.nome?.split(" ")[0] || "Usuário";
  const avatarLabel = (currentUser?.avatar || firstName[0] || "?").toUpperCase();

  // Initials color based on first letter
  const avatarColors = {
    A:"#1e40af", B:"#065f46", C:"#78350f", D:"#4c1d95", E:"#831843",
    F:"#1e3a8a", G:"#14532d", H:"#7c2d12", I:"#312e81", J:"#134e4a",
    K:"#7f1d1d", L:"#0c4a6e", M:"#3b0764", N:"#052e16", O:"#1c1917",
    P:"#164e63", Q:"#1a1a2e", R:"#4a044e", S:"#0f3460", T:"#16213e",
    default: "#1e3a5f",
  };
  const avatarBg = avatarColors[avatarLabel[0]] || avatarColors.default;

  useEffect(() => {
    const onResize  = () => setIsMobile(window.innerWidth < 768);
    const onScroll  = () => setScrolled(window.scrollY > 10);
    const onClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        .nav-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer; transition: all 0.18s; color: rgba(255,255,255,0.55);
          font-size: 1.1rem;
        }
        .nav-icon-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
        }
        .nav-icon-btn:active { transform: scale(0.95); }

        .notif-item:hover { background: rgba(255,255,255,0.04); }

        .avatar-ring {
          box-shadow: 0 0 0 2px rgba(250,204,21,0.3), 0 0 0 4px rgba(250,204,21,0.08);
          transition: box-shadow 0.2s;
        }
        .avatar-ring:hover {
          box-shadow: 0 0 0 2px rgba(250,204,21,0.55), 0 0 0 5px rgba(250,204,21,0.12);
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0, right: 0, zIndex: 30,
          left: isMobile ? 0 : (collapsed ? 72 : 248),
          transition: "left 0.25s ease, backdrop-filter 0.25s, background 0.25s",
          backgroundColor: scrolled
            ? "rgba(6,14,28,0.85)"
            : "rgba(6,14,28,0.5)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(255,255,255,0.04)",
          fontFamily: FONT,
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.25rem", height: 64,
        }}>

          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            {/* Hamburger */}
            <button className="nav-icon-btn" onClick={onToggleSidebar} aria-label="Menu">
              ☰
            </button>

            {/* Title area */}
            <div style={{ userSelect: "none" }}>
              <h1 style={{
                color: "white",
                fontWeight: 700,
                fontSize: isMobile ? "0.85rem" : "0.95rem",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                margin: 0,
              }}>
                Bem-vindo, <span style={{ color: "#facc15" }}>{firstName}</span>! 👋
              </h1>
              <p style={{
                color: "rgba(255,255,255,0.28)",
                fontSize: "0.65rem",
                marginTop: 2,
                letterSpacing: "0.02em",
                textTransform: "capitalize",
              }}>
                {today}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

            {/* 🔔 Notifications */}
            <div style={{ position: "relative" }} ref={notifRef}>
              <motion.button
                whileTap={{ scale: 0.93 }}
                className="nav-icon-btn"
                onClick={() => setShowNotifs(!showNotifs)}
                aria-label="Notificações"
                style={{
                  position: "relative",
                  background: showNotifs ? "rgba(255,255,255,0.1)" : undefined,
                  borderColor: showNotifs ? "rgba(255,255,255,0.18)" : undefined,
                }}
              >
                🔔
                {/* Badge */}
                <span style={{
                  position: "absolute",
                  top: 6, right: 6,
                  width: 7, height: 7,
                  borderRadius: "50%",
                  background: "#facc15",
                  boxShadow: "0 0 6px rgba(250,204,21,0.8)",
                  opacity: 0,  /* set to 1 when there are real notifications */
                }} />
              </motion.button>

              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0,   scale: 1 }}
                    exit  ={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: [0.22,1,0.36,1] }}
                    style={{
                      position: "absolute", right: 0, top: "calc(100% + 10px)",
                      width: 300,
                      borderRadius: "1.25rem",
                      overflow: "hidden",
                      zIndex: 50,
                      background: "linear-gradient(160deg, #0b1d38 0%, #060e1c 100%)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                    }}
                  >
                    {/* Header */}
                    <div style={{
                      padding: "0.9rem 1.1rem",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <p style={{ color: "white", fontWeight: 700, fontSize: "0.82rem", margin: 0 }}>
                        Notificações
                      </p>
                      <span style={{
                        background: "rgba(250,204,21,0.12)",
                        color: "rgba(250,204,21,0.7)",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        border: "1px solid rgba(250,204,21,0.2)",
                      }}>0 novas</span>
                    </div>

                    {/* Empty state */}
                    <div style={{ padding: "2rem 1.25rem", textAlign: "center" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "0.875rem",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.25rem", margin: "0 auto 0.75rem",
                      }}>🔕</div>
                      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.78rem", margin: 0 }}>
                        Nenhuma notificação por enquanto
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div style={{
              width: 1, height: 24,
              background: "rgba(255,255,255,0.08)",
              marginLeft: "0.25rem",
            }} />

            {/* 👤 Avatar */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "0.6rem",
              padding: "0.35rem 0.75rem 0.35rem 0.35rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "default",
            }}>
              <div
                className="avatar-ring"
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${avatarBg}, #0f2744)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#facc15",
                  fontWeight: 800, fontSize: "0.7rem",
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}
              >
                {avatarLabel}
              </div>
              {!isMobile && (
                <div>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.75rem", margin: 0, lineHeight: 1.2 }}>
                    {firstName}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.62rem", margin: 0, lineHeight: 1 }}>
                    Estudante
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}