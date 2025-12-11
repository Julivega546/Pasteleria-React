import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function First() {
  const [showSocials, setShowSocials] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goHomeAndScroll = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const section = document.querySelector(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="first">
        <nav>
          <a onClick={() => goHomeAndScroll("#first")} style={{ cursor: "pointer" }}>Inicio</a>
          <a onClick={() => goHomeAndScroll("#second")} style={{ cursor: "pointer" }}>Nosotros</a>
          <a onClick={() => goHomeAndScroll("#third")} style={{ cursor: "pointer" }}>Recomendado</a>
          <a onClick={() => goHomeAndScroll("#fourth")} style={{ cursor: "pointer" }}>Blogs</a>
          <Link to="/productos">Productos</Link>
          {isAuthenticated && <Link to="/cart">Carrito</Link>}
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

          {!isAuthenticated && (
            <>
              <Link to="/login">Inicio Sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/perfil">Perfil 👤</Link>
              <button className="logout" onClick={handleLogout}>Cerrar Sesión</button>
            </>
          )}
        </nav>
      </section>

      <section id="second">
        <h2>Sobre Nosotros</h2>
        <p>
          Bienvenido a nuestra pastelería artesanal. Usamos ingredientes frescos y naturales
          para entregarte la mejor experiencia dulce.
        </p>
      </section>

      <section id="third">
        <div id="left_third">
          <div id="image_third"></div>
        </div>

        <div id="right_third">
          <p>La mejor experiencia dulce</p>
          <p>Nuestros productos recomendados</p>
          <p>Calidad y sabor que enamora <span>♥</span></p>
        </div>
      </section>

      <section id="fourth">
        <h2>Favoritos de los Clientes</h2>
        <div id="clients">
          <div className="client1"></div>
          <div className="client2"></div>
          <div className="client3"></div>
          <div className="client4"></div>
          <div className="client5"></div>
          <div className="client6"></div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Pastelería Dulce Amor — Todos los derechos reservados</p>
      </footer>
    </>
  );
}
