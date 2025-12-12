import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { login as loginService } from "./service/AuthService";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { token, username: user, role } = await loginService(username, password);
      login(token, user, role);
      navigate("/");
    } catch {
      setError("Usuario o contraseña incorrectos");
    }
  };
  
  return (
  <section className="login">
    <h1>Iniciar Sesión</h1>

    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Iniciar Sesión</button>
    </form>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <p>
      ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
    </p>
  </section>
);
}