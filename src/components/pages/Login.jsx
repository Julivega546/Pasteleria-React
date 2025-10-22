import React, { useState } from "react";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("milSabores_users")) || {};
    const user = users[email.toLowerCase()];

    if (!user) {
      setMessage("❌ Usuario no encontrado");
      return;
    }

    if (pass !== user.pass) {
      setMessage("❌ Contraseña incorrecta");
      return;
    }

    // Guarda sesión
    sessionStorage.setItem(
      "milSabores_session",
      JSON.stringify({ user: user.name, email: user.email })
    );

    setMessage(`🎉 Bienvenido/a ${user.name}`);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <section className="auth-container">
      <div className="auth-card">
        <h2>🍰 Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button type="submit" className="btn-auth">
            Ingresar
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-alt">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </section>
  );
}
