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

      if (role === "ADMIN") {
        navigate("/productos");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
      <div>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "400px", display: "block" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "400px", display: "block" }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "400px",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <p style={{ marginTop: "15px" }}>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
