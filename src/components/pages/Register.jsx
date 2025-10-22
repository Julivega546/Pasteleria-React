import React, { useState } from "react";
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
    pass2: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, pass, pass2 } = form;

    if (!name || !email || !pass) {
      setMessage("⚠️ Todos los campos son obligatorios");
      return;
    }

    if (pass !== pass2) {
      setMessage("❌ Las contraseñas no coinciden");
      return;
    }

    const users = JSON.parse(localStorage.getItem("milSabores_users")) || {};

    if (users[email.toLowerCase()]) {
      setMessage("⚠️ Este correo ya está registrado");
      return;
    }

    users[email.toLowerCase()] = { name, email, pass };
    localStorage.setItem("milSabores_users", JSON.stringify(users));

    setMessage("✅ Registro exitoso. Redirigiendo...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <section className="auth-container">
      <div className="auth-card">
        <h2>🧁 Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="name"
            placeholder="Nombre completo"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Contraseña"
            value={form.pass}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="pass2"
            placeholder="Repetir contraseña"
            value={form.pass2}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-auth">
            Registrar
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-alt">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </section>
  );
}
