import { createContext, useContext, useState, useEffect } from "react";
import {
  isAuthenticated as isAuthService,
  getUsername,
  getRole,
  logout as logoutService,
} from "../service/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");

    if (savedToken && savedUsername && savedRole) {
      setUser(savedUsername);
      setRole(savedRole);
    }
  }, []);

  const login = (token, username, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", userRole);
    localStorage.setItem("isLoggedIn", "true");

    setUser(username);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isAdmin: role === "ADMIN",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}