import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [historial, setHistorial] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 AHORA FUNCIONA CON AMBOS
    let email =
      localStorage.getItem("currentUser") ||
      localStorage.getItem("username");

    if (!email) {
      navigate("/login");
      return;
    }

    // 🔥 Cargar usuarios
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.email === email);

    if (!found) {
      navigate("/login");
      return;
    }

    setUser(found);

    // 🔥 Historial
    const historialGuardado =
      JSON.parse(localStorage.getItem("historialCompras")) || [];

    const misCompras = historialGuardado.filter((c) => c.correo === email);
    setHistorial(misCompras);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("username");
    navigate("/login");
  };

  if (!user) return <p style={{ color: "white" }}>Cargando perfil...</p>;

  return (
    <section className="profile">
      <h2>👤 Perfil del Usuario</h2>

      <div className="profile-card">
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Contraseña:</strong> ********</p>
      </div>

      <h3>🧾 Historial de Compras</h3>

      {historial.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {historial.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.id}</td>
                <td>{compra.fecha}</td>
                <td>${compra.total.toLocaleString("es-CL")}</td>
                <td>{compra.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={handleLogout} className="btn-logout">
        Cerrar Sesión
      </button>
    </section>
  );
}
