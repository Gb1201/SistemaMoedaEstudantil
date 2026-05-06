import { motion, AnimatePresence } from "framer-motion";

const FONT = "'Sora','Nunito',sans-serif";

const navItems = {
  student: [
    { icon: "⊞", label: "Dashboard",  page: "student-dashboard"   },
    { icon: "↕", label: "Extrato",    page: "student-transactions" },
    { icon: "🎁", label: "Vantagens", page: "student-rewards"      },
    { icon: "◉", label: "Perfil",     page: "student-profile"      },
  ],
  teacher: [
    { icon: "⊞", label: "Dashboard",    page: "teacher-dashboard"    },
    { icon: "◈", label: "Enviar Moedas", page: "send-coins"          },
    { icon: "↕", label: "Histórico",    page: "teacher-transactions" },
  ],
  company: [
    { icon: "⊞", label: "Dashboard",      page: "company-dashboard" },
    { icon: "+", label: "Nova Vantagem",   page: "create-reward"     },
    { icon: "≡", label: "Minhas Vantagens", page: "company-rewards"  },
    { icon: "◉", label: "Perfil",          page: "company-profile"   },
  ],
};

const roleLabels = { student: "Aluno", teacher: "Professor", company: "Empresa" };

const badgeColors = {
  student: { bg: "rgba(250,204,21,0.15)", color: "#facc15",  border: "rgba(250,204,21,0.25)" },
  teacher: { bg: "rgba(167,139,250,0.15)", color: "#c4b5fd", border: "rgba(167,139,250,0.25)" },
  company: { bg: "rgba(52,211,153,0.15)",  color: "#6ee7b7", border: "rgba(52,211,153,0.25)"  },
};

const sidebarBg = {
  student: "linear-gradient(180deg,#0b1d38 0%,#060e1c 100%)",
  teacher: "linear-gradient(180deg,#130f2e 0%,#060e1c 100%)",
  company: "linear-gradient(180deg,#07231e 0%,#060e1c 100%)",
};

const W_OPEN     = 232;
const W_COLLAPSED = 68;

export default function Sidebar({ currentUser, currentPage, onNavigate, onLogout, collapsed, onToggle }) {
  const role        = currentUser?.role;
  const items       = navItems[role]    ?? [];
  const badge       = badgeColors[role] ?? badgeColors.student;
  const bg          = sidebarBg[role]   ?? sidebarBg.student;

  const avatarLabel = (currentUser?.avatar || currentUser?.nome?.[0] || currentUser?.name?.[0] || "?").toUpperCase();
  const displayName = currentUser?.name  || currentUser?.nome  || "Usuário";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .sb-nav-btn { transition: all 0.18s cubic-bezier(0.22,1,0.36,1); }
        .sb-nav-btn:hover:not(.active) {
          background: rgba(255,255,255,0.07) !important;
          color: rgba(255,255,255,0.9) !important;
        }
        .sb-nav-btn:hover:not(.active) .nav-icon { color: rgba(255,255,255,0.85) !important; }
        .sb-logout:hover {
          background: rgba(248,113,113,0.1) !important;
          color: #fca5a5 !important;
        }
        .sb-toggle:hover { background: rgba(255,255,255,0.1) !important; }
      `}</style>

      <motion.aside
        animate={{ width: collapsed ? W_COLLAPSED : W_OPEN }}
        transition={{ duration: 0.25, ease: [0.22,1,0.36,1] }}
        style={{
          position   : "fixed",
          left: 0, top: 0,
          height     : "100%",
          background : bg,
          zIndex     : 40,
          display    : "flex",
          flexDirection: "column",
          overflow   : "hidden",
          fontFamily : FONT,
          boxShadow  : "4px 0 32px rgba(0,0,0,0.45)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          minWidth   : collapsed ? W_COLLAPSED : W_OPEN,
        }}
      >

        {/* ── Top: Logo + toggle ── */}
        <div style={{
          display      : "flex",
          alignItems   : "center",
          // When collapsed: center the logo. When open: space logo + toggle button.
          justifyContent: collapsed ? "center" : "space-between",
          padding      : "1.1rem 0.875rem",
          borderBottom : "1px solid rgba(255,255,255,0.06)",
          gap          : "0.75rem",
        }}>
          {/* Logo mark + wordmark */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.625rem", minWidth:0, overflow:"hidden" }}>
            <div style={{
              width:"36px", height:"36px", flexShrink:0,
              borderRadius:"0.875rem",
              background:"linear-gradient(135deg,#facc15 0%,#f59e0b 100%)",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#0b1d38", fontWeight:900, fontSize:"1.1rem",
              boxShadow:"0 4px 14px rgba(250,204,21,0.3)",
            }}>◈</div>

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  key="wordmark"
                  initial={{ opacity:0, x:-8 }}
                  animate={{ opacity:1, x:0 }}
                  exit   ={{ opacity:0, x:-8 }}
                  transition={{ duration:0.2 }}
                  style={{ minWidth:0, overflow:"hidden" }}
                >
                  <p style={{ color:"white", fontWeight:800, fontSize:"0.95rem", letterSpacing:"-0.01em", lineHeight:1.1, margin:0, whiteSpace:"nowrap" }}>
                    CoinClass
                  </p>
                  <p style={{ color:"rgba(255,255,255,0.3)", fontSize:"0.6rem", letterSpacing:"0.08em", marginTop:2, whiteSpace:"nowrap" }}>
                    Moeda Estudantil
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse toggle — only visible when open */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.button
                key="toggle-open"
                initial={{ opacity:0, scale:0.8 }}
                animate={{ opacity:1, scale:1 }}
                exit   ={{ opacity:0, scale:0.8 }}
                transition={{ duration:0.15 }}
                className="sb-toggle"
                onClick={onToggle}
                title="Recolher"
                style={{
                  width:"28px", height:"28px", flexShrink:0,
                  borderRadius:"0.5rem",
                  background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"rgba(255,255,255,0.35)",
                  cursor:"pointer", fontSize:"0.65rem",
                  transition:"all 0.18s",
                }}
              >◀</motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* When collapsed: show expand button below logo */}
        {collapsed && (
          <div style={{ display:"flex", justifyContent:"center", paddingTop:"0.5rem" }}>
            <button
              className="sb-toggle"
              onClick={onToggle}
              title="Expandir"
              style={{
                width:"28px", height:"28px",
                borderRadius:"0.5rem",
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.08)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"rgba(255,255,255,0.35)",
                cursor:"pointer", fontSize:"0.65rem",
                transition:"all 0.18s",
              }}
            >▶</button>
          </div>
        )}

        {/* ── User card ── */}
        <div style={{
          padding     : "0.75rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display     : "flex",
          justifyContent: collapsed ? "center" : "flex-start",
        }}>
          {collapsed ? (
            /* Collapsed: just avatar */
            <div style={{
              width:"40px", height:"40px",
              borderRadius:"0.875rem",
              background:"linear-gradient(135deg,#facc15,#f59e0b)",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#0b1d38", fontWeight:900, fontSize:"0.9rem",
              boxShadow:"0 4px 12px rgba(250,204,21,0.25)",
            }}>
              {avatarLabel}
            </div>
          ) : (
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              style={{
                display    : "flex",
                alignItems : "center",
                gap        : "0.625rem",
                width      : "100%",
                padding    : "0.6rem 0.75rem",
                borderRadius:"0.875rem",
                background :"rgba(255,255,255,0.05)",
                border     :"1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{
                width:"36px", height:"36px", flexShrink:0,
                borderRadius:"0.875rem",
                background:"linear-gradient(135deg,#facc15,#f59e0b)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#0b1d38", fontWeight:900, fontSize:"0.85rem",
                boxShadow:"0 4px 12px rgba(250,204,21,0.25)",
              }}>
                {avatarLabel}
              </div>
              <div style={{ minWidth:0, flex:1 }}>
                <p style={{
                  color:"rgba(255,255,255,0.88)", fontWeight:700,
                  fontSize:"0.82rem", letterSpacing:"-0.01em",
                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                  margin:0, lineHeight:1.2,
                }}>
                  {displayName}
                </p>
                <span style={{
                  display:"inline-block", marginTop:3,
                  background:badge.bg,
                  color:badge.color,
                  border:`1px solid ${badge.border}`,
                  fontSize:"0.58rem", fontWeight:700,
                  letterSpacing:"0.08em", textTransform:"uppercase",
                  padding:"2px 7px", borderRadius:"999px",
                }}>
                  {roleLabels[role] ?? role ?? "Usuário"}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Nav items ── */}
        <nav style={{
          flex:1, padding:"0.875rem 0.625rem",
          display:"flex", flexDirection:"column", gap:"0.25rem",
          overflowY:"auto", overflowX:"hidden",
        }}>
          {!collapsed && (
            <p style={{
              color:"rgba(255,255,255,0.2)", fontSize:"0.58rem",
              fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
              padding:"0 0.625rem", marginBottom:"0.5rem",
            }}>
              Menu
            </p>
          )}

          {items.map((item, i) => {
            const isActive = currentPage === item.page;
            return (
              <motion.button
                key={item.page}
                className={`sb-nav-btn${isActive ? " active" : ""}`}
                initial={{ opacity:0, x:-16 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay:0.04 + i*0.04, duration:0.3, ease:[0.22,1,0.36,1] }}
                onClick={() => onNavigate(item.page)}
                title={collapsed ? item.label : undefined}
                style={{
                  width      : "100%",
                  display    : "flex",
                  alignItems : "center",
                  gap        : "0.625rem",
                  justifyContent: collapsed ? "center" : "flex-start",
                  padding    : "0.625rem 0.75rem",
                  borderRadius:"0.875rem",
                  border     : isActive ? "1px solid rgba(250,204,21,0.25)" : "1px solid transparent",
                  background : isActive
                    ? "linear-gradient(135deg,rgba(250,204,21,0.18) 0%,rgba(250,204,21,0.08) 100%)"
                    : "transparent",
                  color      : isActive ? "#facc15" : "rgba(255,255,255,0.45)",
                  cursor     : "pointer",
                  textAlign  : "left",
                  fontFamily : FONT,
                  position   : "relative",
                }}
              >
                {/* Active left bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    style={{
                      position:"absolute", left:0, top:"50%",
                      transform:"translateY(-50%)",
                      width:3, height:18,
                      borderRadius:"0 3px 3px 0",
                      background:"linear-gradient(180deg,#facc15,#f59e0b)",
                      boxShadow:"0 0 8px rgba(250,204,21,0.5)",
                    }}
                  />
                )}

                <span className="nav-icon" style={{
                  fontSize : "1rem",
                  flexShrink:0,
                  color    : isActive ? "#facc15" : "rgba(255,255,255,0.35)",
                  lineHeight:1,
                }}>
                  {item.icon}
                </span>

                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      key="label"
                      initial={{ opacity:0 }}
                      animate={{ opacity:1 }}
                      exit   ={{ opacity:0 }}
                      transition={{ duration:0.15 }}
                      style={{ fontWeight:600, fontSize:"0.82rem", whiteSpace:"nowrap" }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active dot */}
                {!collapsed && isActive && (
                  <motion.div
                    layoutId="activeDot"
                    style={{
                      marginLeft:"auto", flexShrink:0,
                      width:6, height:6, borderRadius:"50%",
                      background:"rgba(250,204,21,0.6)",
                      boxShadow:"0 0 6px rgba(250,204,21,0.4)",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* ── Logout ── */}
        <div style={{
          padding     :"0.75rem 0.625rem 1.25rem",
          borderTop   :"1px solid rgba(255,255,255,0.06)",
        }}>
          <button
            className="sb-logout"
            onClick={onLogout}
            title={collapsed ? "Sair" : undefined}
            style={{
              width      :"100%",
              display    :"flex",
              alignItems :"center",
              gap        :"0.625rem",
              justifyContent: collapsed ? "center" : "flex-start",
              padding    :"0.625rem 0.75rem",
              borderRadius:"0.875rem",
              border     :"1px solid transparent",
              background :"transparent",
              color      :"rgba(255,255,255,0.3)",
              cursor     :"pointer",
              fontFamily :FONT,
              transition :"all 0.18s",
            }}
          >
            <span style={{ fontSize:"1rem", flexShrink:0 }}>⏎</span>
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  key="logout-label"
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  exit   ={{ opacity:0 }}
                  transition={{ duration:0.15 }}
                  style={{ fontWeight:600, fontSize:"0.82rem" }}
                >
                  Sair
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

      </motion.aside>
    </>
  );
}