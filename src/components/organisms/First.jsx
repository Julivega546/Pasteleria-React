import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from 'react-router-dom';

export default function First() {
  const [showSocials, setShowSocials] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <section id="first">
      <nav>
        <HashLink smooth to="#first">Inicio</HashLink>
        <HashLink smooth to="#second">Nosotros</HashLink>
        <HashLink smooth to="#third">Recomendado</HashLink>
        <HashLink smooth to="#blogs">Blogs</HashLink>
        <Link to="/productos">Productos</Link>
        {isLoggedIn && <Link to="/cart">Carrito</Link>}
      </nav>

      <nav className="social-menu">
        <div
          className="social-toggle"
          onMouseEnter={() => setShowSocials(true)}
          onMouseLeave={() => setShowSocials(false)}
        >
          <span>🌸 Redes Sociales</span>
          {showSocials && (
            <div className="social-dropdown">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">📸 Instagram</a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">📘 Facebook</a>
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">🎵 TikTok</a>
              <a href="https://wa.me/56962440331" target="_blank" rel="noreferrer">💬 WhatsApp</a>
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <>
            <Link to="/login">Inicio Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/perfil">Perfil</Link>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        )}
      </nav>
    </section>
  );
}
