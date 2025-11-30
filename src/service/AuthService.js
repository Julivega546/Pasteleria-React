import api from "../components/Api/AxiosConfig";

const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const ROLE_KEY = "role";

export async function login(username, password) {
  const res = await api.post("/auth/login", { username, password });

  const { token, username: user, role } = res.data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, user);
  localStorage.setItem(ROLE_KEY, role);

  return { token, username: user, role };
}

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUsername() {
  return localStorage.getItem(USERNAME_KEY);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(ROLE_KEY);
}
