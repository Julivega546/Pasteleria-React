import axios from "axios";
const AUTH_URL = "http://localhost:9090/auth";
export async function login(username, password) {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, {
      username,
      password,
    });
    const { token, username: user } = response.data;
    // Guardar en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("username", user);
    return { token, username: user };
  } catch (error) {
    console.error("Login falló:", error.response?.data || error.message);
    throw error;
  }
}
export async function register(username, password) {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registro falló:", error.response?.data || error.message);
    throw error;
  }
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
