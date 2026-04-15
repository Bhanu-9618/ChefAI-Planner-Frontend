import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Mock user — replace with real API response later
const MOCK_USER = {
  id: 1,
  name: "Nipun Dev",
  email: "nipun@example.com",
  initials: "ND",
};

export function AuthProvider({ children }) {
  // Check sessionStorage so refresh doesn't log out during development
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem("chefai_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isLoggedIn = user !== null;

  // ── login ──────────────────────────────────────────────────────────────────
  // Replace the body of this function with your real API call later:
  //   const res = await api.post("/auth/login", { email, password });
  //   setUser(res.data.user);
  const login = (credentials) => {
    const loggedInUser = { ...MOCK_USER, email: credentials?.email || MOCK_USER.email };
    setUser(loggedInUser);
    sessionStorage.setItem("chefai_user", JSON.stringify(loggedInUser));
  };

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("chefai_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this everywhere instead of useContext(AuthContext)
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
