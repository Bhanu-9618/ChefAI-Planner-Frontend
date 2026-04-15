import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("chefai_token"));
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("chefai_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("chefai_token");
    sessionStorage.removeItem("chefai_user");
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser((prevUser) => ({
          ...prevUser,
          ...decoded,
        }));
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
    setUser(response);
    sessionStorage.setItem("chefai_token", receivedToken);
    sessionStorage.setItem("chefai_user", JSON.stringify(response));
    return true;
  };

  const setTokenFromResponse = (token, userData = null) => {
    setToken(token);
    if (userData) {
      setUser(userData);
      sessionStorage.setItem("chefai_user", JSON.stringify(userData));
    }
    sessionStorage.setItem("chefai_token", token);
  };


  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout, setTokenFromResponse }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
