import axios from "axios";

const AUTH_URL = "http://localhost:9090/auth";

export async function login(username, password) {
  const res = await axios.post(`${AUTH_URL}/login`, { username, password });

  const { token, username: user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("username", user);

  return { token, username: user };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function getUsername() {
  return localStorage.getItem("username");
}
