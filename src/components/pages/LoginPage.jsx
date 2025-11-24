import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, username: user } = await loginService(username, password);
      login(token, user);
      navigate("/productos");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password}
               onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
