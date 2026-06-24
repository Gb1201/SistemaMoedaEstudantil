import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'Sora', 'Nunito', sans-serif";

const NAV_ITEMS = {
  student: [
    { icon: <IconGrid />,    label: "Dashboard",  page: "student-dashboard"   },
    { icon: <IconSwap />,    label: "Extrato",    page: "student-transactions" },
    { icon: <IconGift />,    label: "Vantagens",  page: "student-rewards"      },
    { icon: <IconUser />,    label: "Perfil",     page: "student-profile"      },
  ],
  teacher: [
    { icon: <IconGrid />,    label: "Dashboard",    page: "teacher-dashboard"    },
    { icon: <IconCoin />,    label: "Enviar Moedas", page: "send-coins"          },
    { icon: <IconSwap />,    label: "Histórico",    page: "teacher-transactions" },
  ],
  company: [
    { icon: <IconGrid />,    label: "Dashboard",       page: "company-dashboard" },
    { icon: <IconPlus />,    label: "Nova Vantagem",   page: "create-reward"     },
    { icon: <IconList />,    label: "Minhas Vantagens", page: "company-rewards"  },
    { icon: <IconUser />,    label: "Perfil",          page: "company-profile"   },
  ],
};

const AVATAR_COLORS = {
  A:"#1e40af", B:"#065f46", C:"#78350f", D:"#4c1d95", E:"#831843",
  F:"#1e3a8a", G:"#14532d", H:"#7c2d12", I:"#312e81", J:"#134e4a",
  K:"#7f1d1d", L:"#0c4a6e", M:"#3b0764", N:"#052e16", O:"#1c1917",
  P:"#164e63", Q:"#1a1a2e", R:"#4a044e", S:"#0f3460", T:"#16213e",
  default: "#1e3a5f",
};

const ROLE_LABEL = { student: "Estudante", teacher: "Professor", company: "Empresa" };

// ─── Icons ───────────────────────────────────────────────────────────────────

function Icon({ children, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function IconGrid()  { return <Icon><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Icon>; }
function IconSwap()  { return <Icon><path d="M7 16V4m0 0L3 8m4-4l4 4"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/></Icon>; }
function IconGift()  { return <Icon><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5" rx="1"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></Icon>; }
function IconUser()  { return <Icon><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></Icon>; }
function IconCoin()  { return <Icon><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5c.5-1 1.5-1.5 2.5-1.5s2.5.8 2.5 2-1 1.8-2.5 2-2.5 1-2.5 2.3 1.2 2.2 2.5 2.2 2-.5 2.5-1.5"/><path d="M12 6v1m0 10v1"/></Icon>; }
function IconPlus()  { return <Icon><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>; }
function IconList()  { return <Icon><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>; }
function IconBell()  { return <Icon><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>; }
function IconLogout(){ return <Icon><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Icon>; }
function IconMenu()  { return <Icon><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></Icon>; }
function IconClose() { return <Icon><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>; }
function IconChevron({ up }) { return <Icon size={12}>{up ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}</Icon>; }

// ─── Sub-components ───────────────────────────────────────────────────────────

function Avatar({ label, bg, size = 28, fontSize = "0.68rem" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `linear-gradient(135deg, ${bg} 0%, #0f2744 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#facc15", fontWeight: 800, fontSize,
      boxShadow: "0 0 0 2px rgba(250,204,21,0.22)",
      fontFamily: FONT,
    }}>
      {label}
    </div>
  );
}

function NotificationPanel() {
  return (
    <motion.div
      key="notif-panel"
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute", right: 0, top: "calc(100% + 12px)",
        width: 300, borderRadius: "1.125rem", overflow: "hidden", zIndex: 50,
        background: "linear-gradient(160deg, #0d1f3c 0%, #07111f 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03) inset",
        fontFamily: FONT,
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.875rem 1.125rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, fontSize: "0.82rem" }}>
          Notificações
        </span>
        <span style={{
          background: "rgba(250,204,21,0.1)", color: "rgba(250,204,21,0.65)",
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em",
          padding: "2px 8px", borderRadius: "999px",
          border: "1px solid rgba(250,204,21,0.18)",
        }}>
          0 NOVAS
        </span>
      </div>

      {/* Empty state */}
      <div style={{ padding: "2.25rem 1.25rem", textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, borderRadius: "0.75rem",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 0.875rem", color: "rgba(255,255,255,0.18)",
        }}>
          <IconBell />
        </div>
        <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.78rem", margin: 0, lineHeight: 1.5 }}>
          Nenhuma notificação<br />por enquanto
        </p>
      </div>
    </motion.div>
  );
}

function UserMenu({ displayName, role, onLogout }) {
  return (
    <motion.div
      key="user-menu"
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute", right: 0, top: "calc(100% + 12px)",
        width: 210, borderRadius: "1.125rem", overflow: "hidden", zIndex: 50,
        background: "linear-gradient(160deg, #0d1f3c 0%, #07111f 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03) inset",
        padding: "0.375rem",
        fontFamily: FONT,
      }}
    >
      {/* Identity */}
      <div style={{
        padding: "0.625rem 0.875rem 0.75rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "0.25rem",
      }}>
        <p style={{ color: "rgba(255,255,255,0.88)", fontWeight: 700, fontSize: "0.82rem", margin: 0 }}>
          {displayName}
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", margin: "2px 0 0" }}>
          {ROLE_LABEL[role]}
        </p>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          display: "flex", alignItems: "center", gap: "0.6rem",
          width: "100%", padding: "0.55rem 0.875rem",
          background: "transparent", border: "none",
          color: "rgba(248,113,113,0.65)",
          fontFamily: FONT, fontSize: "0.8rem", fontWeight: 600,
          cursor: "pointer", borderRadius: "0.75rem",
          transition: "all 0.15s", textAlign: "left",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.08)"; e.currentTarget.style.color = "#fca5a5"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(248,113,113,0.65)"; }}
      >
        <IconLogout /> Sair da conta
      </button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Navbar({ currentUser, currentPage, onNavigate, onLogout }) {
  const [showNotifs,    setShowNotifs]    = useState(false);
  const [showUserMenu,  setShowUserMenu]  = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);

  const notifRef   = useRef(null);
  const userMenuRef = useRef(null);

  const role        = currentUser?.role;
  const items       = NAV_ITEMS[role] ?? [];
  const firstName   = currentUser?.name?.split(" ")[0] || currentUser?.nome?.split(" ")[0] || "Usuário";
  const displayName = currentUser?.name || currentUser?.nome || "Usuário";
  const avatarLabel = (currentUser?.avatar || firstName[0] || "?").toUpperCase();
  const avatarBg    = AVATAR_COLORS[avatarLabel[0]] ?? AVATAR_COLORS.default;

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", day: "numeric", month: "long",
  });

  useEffect(() => {
    const onResize  = () => setIsMobile(window.innerWidth < 900);
    const onScroll  = () => setScrolled(window.scrollY > 10);
    const onClickOutside = (e) => {
      if (notifRef.current    && !notifRef.current.contains(e.target))    setShowNotifs(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
    };

    onResize();
    window.addEventListener("resize",      onResize);
    window.addEventListener("scroll",      onScroll);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("resize",      onResize);
      window.removeEventListener("scroll",      onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const handleNav = (page) => {
    onNavigate(page);
    setShowMobileMenu(false);
  };

  const toggleNotifs = () => {
    setShowNotifs(v => !v);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(v => !v);
    setShowNotifs(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        .nav-link {
          position: relative;
          display: flex; align-items: center; gap: 6px;
          padding: 0.4rem 0.875rem;
          border-radius: 0.75rem;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255,255,255,0.4);
          font-family: ${FONT};
          font-weight: 600; font-size: 0.8rem;
          cursor: pointer; transition: color 0.15s, background 0.15s, border-color 0.15s;
          white-space: nowrap; letter-spacing: 0.01em;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: #facc15;
          background: rgba(250,204,21,0.1);
          border-color: rgba(250,204,21,0.2);
        }

        .icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 0.625rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer; transition: all 0.15s;
          color: rgba(255,255,255,0.4);
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.88);
        }
        .icon-btn:active { transform: scale(0.93); }
        .icon-btn.active {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.9);
        }

        .avatar-pill {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.25rem 0.625rem 0.25rem 0.25rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer; transition: all 0.15s;
        }
        .avatar-pill:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
        }

        .mobile-link {
          display: flex; align-items: center; gap: 0.75rem;
          width: 100%; padding: 0.65rem 0.875rem;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-family: ${FONT}; font-weight: 600; font-size: 0.82rem;
          cursor: pointer; border-radius: 0.75rem; transition: all 0.15s;
          text-align: left; letter-spacing: 0.01em;
        }
        .mobile-link:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.88);
        }
        .mobile-link.active {
          color: #facc15;
          background: rgba(250,204,21,0.09);
          border-color: rgba(250,204,21,0.2);
        }
      `}</style>

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        fontFamily: FONT,
        background: scrolled ? "rgba(5,12,24,0.94)" : "rgba(5,12,24,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.5rem", height: 60, maxWidth: 1400, margin: "0 auto",
          gap: "1.5rem",
        }}>

          {/* Logo */}
          <button
            onClick={() => onNavigate(`${role}-dashboard`)}
            style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              background: "none", border: "none", cursor: "pointer",
              padding: 0, flexShrink: 0,
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "0.625rem", flexShrink: 0,
              background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#0b1d38", fontWeight: 900, fontSize: "0.95rem",
              boxShadow: "0 4px 12px rgba(250,204,21,0.3)",
            }}>◈</div>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: "0.88rem", letterSpacing: "-0.01em", margin: 0, lineHeight: 1.1 }}>
                CoinClass
              </p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
                Moeda Estudantil
              </p>
            </div>
          </button>

          {/* Nav links — desktop */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }}>
              {items.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    className={`nav-link${isActive ? " active" : ""}`}
                    onClick={() => onNavigate(item.page)}
                  >
                    <span style={{ opacity: isActive ? 1 : 0.7, display: "flex", alignItems: "center" }}>
                      {item.icon}
                    </span>
                    {item.label}

                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position: "absolute", bottom: -1, left: "50%",
                          transform: "translateX(-50%)",
                          width: "36%", height: 2, borderRadius: 2,
                          background: "linear-gradient(90deg, #facc15, #f59e0b)",
                          boxShadow: "0 0 8px rgba(250,204,21,0.45)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>

            {/* Date — desktop */}
            {!isMobile && (
              <p style={{
                color: "rgba(255,255,255,0.2)", fontSize: "0.6rem",
                letterSpacing: "0.04em", textTransform: "capitalize",
                marginRight: "0.25rem", fontFamily: FONT,
              }}>
                {today}
              </p>
            )}

            {/* Notifications */}
            <div style={{ position: "relative" }} ref={notifRef}>
              <motion.button
                whileTap={{ scale: 0.92 }}
                className={`icon-btn${showNotifs ? " active" : ""}`}
                onClick={toggleNotifs}
                aria-label="Notificações"
              >
                <IconBell />
              </motion.button>

              <AnimatePresence>
                {showNotifs && <NotificationPanel />}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.07)", margin: "0 0.125rem" }} />

            {/* Avatar — desktop */}
            {!isMobile && (
              <div style={{ position: "relative" }} ref={userMenuRef}>
                <button
                  className="avatar-pill"
                  onClick={toggleUserMenu}
                  aria-label="Menu do usuário"
                >
                  <Avatar label={avatarLabel} bg={avatarBg} size={28} />
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.75rem", margin: 0, lineHeight: 1.2 }}>
                      {firstName}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.58rem", margin: 0, lineHeight: 1 }}>
                      {ROLE_LABEL[role]}
                    </p>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.2)", display: "flex", marginLeft: "0.1rem" }}>
                    <IconChevron up={showUserMenu} />
                  </span>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <UserMenu displayName={displayName} role={role} onLogout={onLogout} />
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Hamburger — mobile */}
            {isMobile && (
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="icon-btn"
                onClick={() => setShowMobileMenu(v => !v)}
                aria-label={showMobileMenu ? "Fechar menu" : "Abrir menu"}
              >
                {showMobileMenu ? <IconClose /> : <IconMenu />}
              </motion.button>
            )}
          </div>
        </div>

        {/* ── Mobile menu ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMobile && showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(5,12,24,0.98)",
              }}
            >
              <div style={{ padding: "0.75rem" }}>

                {/* User card */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "0.875rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: "0.5rem",
                }}>
                  <Avatar label={avatarLabel} bg={avatarBg} size={36} fontSize="0.8rem" />
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.88)", fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>
                      {displayName}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.68rem", margin: 0 }}>
                      {ROLE_LABEL[role]}
                    </p>
                  </div>
                </div>

                {/* Nav items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "0.5rem" }}>
                  {items.map((item) => {
                    const isActive = currentPage === item.page;
                    return (
                      <button
                        key={item.page}
                        className={`mobile-link${isActive ? " active" : ""}`}
                        onClick={() => handleNav(item.page)}
                      >
                        <span style={{ opacity: isActive ? 1 : 0.55, display: "flex" }}>
                          {item.icon}
                        </span>
                        {item.label}
                        {isActive && (
                          <div style={{
                            marginLeft: "auto", width: 5, height: 5, borderRadius: "50%",
                            background: "rgba(250,204,21,0.65)",
                            boxShadow: "0 0 6px rgba(250,204,21,0.4)",
                          }} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Logout */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.5rem" }}>
                  <button
                    className="mobile-link"
                    onClick={onLogout}
                    style={{ color: "rgba(248,113,113,0.55)" }}
                  >
                    <span style={{ display: "flex" }}><IconLogout /></span>
                    Sair da conta
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}