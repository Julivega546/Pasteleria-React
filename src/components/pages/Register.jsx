import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !birthDate) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    const monthDiff = new Date().getMonth() - new Date(birthDate).getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < new Date(birthDate).getDate())) {
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

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      setError("Este correo ya está registrado.");
      return;
    }

    const newUser = { email, password, birthDate };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
    setError("");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <section className="login">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
