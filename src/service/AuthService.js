import axios from "axios";
const AUTH_URL = "http://localhost:9090/auth/login";

export async function login(username, password) {
  try {
    const response = await axios.post(AUTH_URL, { username, password });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Login falló:", error.response?.data || error.message);
    throw error;
  }
}
