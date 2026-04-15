import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("chefai_token"));
  const [user, setUser] = useState(null);
  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("chefai_token");
  };

  // Decode token whenever it changes
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser({
          ...decoded,
          // Handle standard asp.net claims mapping if necessary later
          // name: decoded.name || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        });
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const isLoggedIn = token !== null;

  // ── login ──────────────────────────────────────────────────────────────────
  const login = async (credentials) => {
    // Calls our API Layer
    const response = await authService.login(credentials);
    const receivedToken = response.token;

    setToken(receivedToken);
    sessionStorage.setItem("chefai_token", receivedToken);
    return true;
  };


  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
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
