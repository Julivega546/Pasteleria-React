import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerService } from "./service/AuthService";
import { useAuth } from "./context/AuthContext";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password || !confirmPassword || !birthDate) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 18) {
      setError("Debes tener al menos 18 años para registrarte.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const { token, username: user, role } = await registerService(username, password);
      login(token, user, role);
      setSuccess("Registro exitoso.");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError("Error al registrarse.");
    }
  };

  return (
    <section className="login">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister} className="login-form">
        <input
          type="text"
          placeholder="Usuario o correo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Registrarme</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  );
}
