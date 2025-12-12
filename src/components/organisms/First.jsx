import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function First() {
  const [showSocials, setShowSocials] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const goHomeAndScroll = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const section = document.querySelector(sectionId)
        if (section) section.scrollIntoView({ behavior: "smooth" })
      }, 500)
    } else {
      const section = document.querySelector(sectionId)
      if (section) section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <section id="first">
        <nav>
          <a onClick={() => goHomeAndScroll("#first")} style={{ cursor: "pointer" }}>Inicio</a>
          <a onClick={() => goHomeAndScroll("#second")} style={{ cursor: "pointer" }}>Nosotros</a>
          <a onClick={() => goHomeAndScroll("#third")} style={{ cursor: "pointer" }}>Recomendado</a>
          <a onClick={() => goHomeAndScroll("#blogs")} style={{ cursor: "pointer" }}>Blogs</a>
          <Link to="/productos">Productos</Link>
          {isAuthenticated && <Link to="/cart">Carrito</Link>}
        </nav>

       <nav className="social-menu">
  <div
    className="social-toggle"
    onMouseEnter={() => setShowSocials(true)}
    onMouseLeave={() => setShowSocials(false)}
    style={{ position: "relative", cursor: "pointer" }}
  >
    <span>🌐 Redes Sociales</span>

    <div
      className="social-dropdown"
      style={{
        position: "absolute",
        top: "30px",
        right: "0",
        background: "#fff",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        minWidth: "160px",
        opacity: showSocials ? 1 : 0,
        transform: showSocials ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        pointerEvents: showSocials ? "auto" : "none",
        zIndex: 99,
      }}
    >
      <a href="https://www.instagram.com" target="_blank" rel="noreferrer"> 📸 Instagram </a>
      <a href="https://www.facebook.com" target="_blank" rel="noreferrer"> 📘 Facebook </a>
      <a href="https://www.tiktok.com" target="_blank" rel="noreferrer"> 🎵 TikTok </a>
      <a href="https://wa.me/56962440331" target="_blank" rel="noreferrer"> 💬 WhatsApp </a>
    </div>
  </div>

  {!isAuthenticated && (
    <>
      <Link to="/login">Inicio Sesión</Link>
      <Link to="/register">Registrarse</Link>
    </>
  )}

  {isAuthenticated && (
    <>
      <Link to="/perfil">👤</Link>
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
      

      <section id="blogs" className="products-page">
        <h2 className="titulo-seccion" style={{ textAlign: "center" }}>Blogs y Recetas</h2>

        <div className="products-grid">
          <div className="product">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/KlL5UT_Gbcw"
              title="Receta de brownies caseros"
              allowFullScreen
            ></iframe>
            <p className="product-name">Brownies Caseros</p>
          </div>

          <div className="product">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/7ep34nmT-zw"
              title="Cheesecake paso a paso"
              allowFullScreen
            ></iframe>
            <p className="product-name">Cheesecake Cremoso</p>
          </div>

          <div className="product">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/8aulAPMCjbc"
              title="Galletas de avena y plátano "
              allowFullScreen
            ></iframe>
            <p className="product-name">Galletas de avena y plátano</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Pastelería Dulce Amor — Todos los derechos reservados</p>
      </footer>
    </>
  )
}
