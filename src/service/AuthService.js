import api from "../components/Api/AxiosConfig";

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  const { token, username: user, role } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("username", user);
  localStorage.setItem("role", role);
  localStorage.setItem("isLoggedIn", "true");

  return response.data;
};

export const register = async (username, password) => {
  const response = await api.post("/auth/register", { username, password });
  const { token, username: user, role } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("username", user);
  localStorage.setItem("role", role);
  localStorage.setItem("isLoggedIn", "true");

  return response.data;
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") != null;
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("isLoggedIn");
};
