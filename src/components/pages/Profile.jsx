import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentEmail = localStorage.getItem("currentUser");

    if (!loggedIn || !currentEmail) {
      navigate("/login");
      return;
    }

    const currentUser = users.find((u) => u.email === currentEmail);
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <section className="profile">
      <h2>Perfil del Usuario</h2>
      <div className="profile-card">
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Contraseña:</strong> ********</p>
      </div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </section>
  );
}
