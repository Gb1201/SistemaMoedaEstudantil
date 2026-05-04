import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import StudentDashboard from "./pages/StudentDashboard";
import { StudentTransactions, StudentRewards, StudentProfile } from "./pages/StudentPages";

import { TeacherDashboard, SendCoinsPage, TeacherTransactions } from "./pages/TeacherPages";

import { CompanyDashboard, CreateRewardPage, CompanyRewardsList } from "./pages/CompanyPages";

const defaultPageByRole = {
  student: "student-dashboard",
  teacher: "teacher-dashboard",
  company: "company-dashboard",
};

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

const STORAGE_KEYS = {
  currentUser: "coinwise.currentUser",
  currentPage: "coinwise.currentPage",
};

const routeToAuthView = {
  "/home": "home",
  "/login": "login",
  "/register": "register",
};

const authViewToRoute = {
  home: "/home",
  login: "/login",
  register: "/register",
};

const VALID_ROLES = ["student", "teacher", "company"];

// Lê do localStorage e valida — descarta se o usuário salvo estiver incompleto/corrompido
const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.currentUser);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Garante que o objeto tem role válido antes de aceitar
    if (!parsed || !VALID_ROLES.includes(parsed.role)) {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    return null;
  }
};

const getStoredValue = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  const value = localStorage.getItem(key);
  if (value === null) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export default function App() {
  const [authView, setAuthView] = useState(() => routeToAuthView[window.location.pathname] || "home");
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [currentPage, setCurrentPage] = useState(() => getStoredValue(STORAGE_KEYS.currentPage, null));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const syncAuthViewFromUrl = () => {
      setAuthView(routeToAuthView[window.location.pathname] || "home");
    };
    window.addEventListener("popstate", syncAuthViewFromUrl);
    return () => window.removeEventListener("popstate", syncAuthViewFromUrl);
  }, []);

  useEffect(() => {
    if (currentUser) return;
    const route = authViewToRoute[authView] || "/home";
    if (window.location.pathname !== route) {
      window.history.pushState({}, "", route);
    }
  }, [authView, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
      return;
    }
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (currentPage) {
      localStorage.setItem(STORAGE_KEYS.currentPage, JSON.stringify(currentPage));
      return;
    }
    localStorage.removeItem(STORAGE_KEYS.currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (currentUser && !currentPage) {
      setCurrentPage(defaultPageByRole[currentUser.role]);
    }
  }, [currentPage, currentUser]);

  const handleLogin = (user) => {
    // Proteção extra: nunca aceita um usuário sem role válido
    if (!user || !VALID_ROLES.includes(user.role)) {
      console.error("handleLogin recebeu usuário inválido:", user);
      return;
    }
    setCurrentUser(user);
    setCurrentPage(defaultPageByRole[user.role]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(null);
    setAuthView("home");
  };

  const navigate = (page) => setCurrentPage(page);

  const renderPage = () => {
    const props = { currentUser, onNavigate: navigate };
    switch (currentPage) {
      case "student-dashboard":     return <StudentDashboard {...props} />;
      case "student-transactions":  return <StudentTransactions {...props} />;
      case "student-rewards":       return <StudentRewards {...props} />;
      case "student-profile":       return <StudentProfile {...props} />;
      case "teacher-dashboard":     return <TeacherDashboard {...props} />;
      case "send-coins":            return <SendCoinsPage {...props} />;
      case "teacher-transactions":  return <TeacherTransactions {...props} />;
      case "company-dashboard":     return <CompanyDashboard {...props} />;
      case "create-reward":         return <CreateRewardPage {...props} />;
      case "company-rewards":       return <CompanyRewardsList {...props} />;
      default: return null;
    }
  };

  if (!currentUser) {
    return (
      <AnimatePresence mode="wait">
        {authView === "home" ? (
          <motion.div key="home" {...pageTransition}>
            <HomePage
              onGoLogin={() => setAuthView("login")}
              onGoRegister={() => setAuthView("register")}
            />
          </motion.div>
        ) : authView === "login" ? (
          <motion.div key="login" {...pageTransition}>
            <LoginPage
              onLogin={handleLogin}
              onGoRegister={() => setAuthView("register")}
            />
          </motion.div>
        ) : (
          <motion.div key="register" {...pageTransition}>
            <RegisterPage onGoLogin={() => setAuthView("login")} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  // No mobile a sidebar fica sobreposta (overlay), não empurra o conteúdo
  const isMobile = windowWidth < 768;
  const sidebarWidth = isMobile ? 0 : (sidebarCollapsed ? 72 : 220);

  return (
    <div className="min-h-screen font-sans" style={{ background: "#0f172a" }}>
      <Sidebar
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={navigate}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
      />
      <Navbar
        currentUser={currentUser}
        onToggleSidebar={() => setSidebarCollapsed(c => !c)}
        collapsed={sidebarCollapsed}
      />
      <main
        className="pt-16 min-h-screen transition-all duration-300"
        style={{ marginLeft: sidebarWidth, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} {...pageTransition}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}