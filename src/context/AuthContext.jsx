import { createContext, useContext, useState, useEffect } from "react";
import {
  isAuthenticated,
  getUsername,
  getRole,
  getToken,
  logout as logoutService,
} from "../service/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setToken(getToken());
      setUsername(getUsername());
      setRole(getRole());
    }
  }, []);

  const login = (token, username, role) => {
    setToken(token);
    setUsername(username);
    setRole(role);
  };

  const logout = () => {
    logoutService();
    setToken(null);
    setUsername(null);
    setRole(null);
  };

  const isAdmin = role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ token, username, role, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
