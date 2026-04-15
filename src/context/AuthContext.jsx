import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("chefai_token"));
  const [user, setUser] = useState(null);
  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("chefai_token");
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          ...decoded,
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

  const login = async (credentials) => {
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
