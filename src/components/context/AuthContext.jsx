import { createContext, useContext, useState, useEffect } from "react";
import {isAuthenticated, getUsername,logout as logoutService,} from "../services/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [username, setUsername] = useState(getUsername());

  const login = (token, user) => {
    setIsAuth(true);
    setUsername(user);
  };

  const logout = () => {
    logoutService();
    setIsAuth(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
