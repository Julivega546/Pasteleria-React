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
          <a onClick={() => goHomeAndScroll("#first")}>Cursos</a>
          <a onClick={() => goHomeAndScroll("#second")}>Asignaturas</a>
          <a onClick={() => goHomeAndScroll("#third")}>Notas</a>
          <a onClick={() => goHomeAndScroll("#blogs")}>Anotaciones</a>
          <Link to="/productos">Asistencia</Link>
        </nav>

        <nav className="social-menu">
          <div
            className="social-toggle"
            onMouseEnter={() => setShowSocials(true)}
            onMouseLeave={() => setShowSocials(false)}
          >
            🌐 Redes Sociales

            <div className={`dropdown ${showSocials ? "show" : ""}`}>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">TikTok</a>
              <a href="#">WhatsApp</a>
            </div>
          </div>

          {!isAuthenticated ? (
            <>
              <Link to="/login">Inicio Sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/perfil">👤</Link>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </>
          )}
        </nav>
      </section>

   
      <section id="second">
        <h2>Colegio O’Higgins</h2>
        <p>
          Estamos orientados a familias de esfuerzo que aspiran a una mejor educación 
          para sus hijos, permitiéndoles aumentar sus posibilidades de éxito en la vida.
        </p>
      </section>

     
      <section id="third">
        <div id="left_third">
          <div id="image_third"></div>
        </div>

        <div id="right_third">
          <p>Formando estudiantes para el futuro</p>
          <p>Educación de calidad</p>
          <p>Compromiso y excelencia académica</p>
        </div>
      </section>

  
      <section id="fourth">
        <h2>Noticias</h2>
        <div id="clients">
          <div className="client1"></div>
          <div className="client2"></div>
          <div className="client3"></div>
          <div className="client4"></div>
        </div>
      </section>

     
      <section id="blogs" className="products-page">
        <h2 className="titulo-seccion">Comunicados</h2>

        <div className="products-grid">
          <div className="product">
            <p className="product-name">Inicio de clases 2026</p>
          </div>

          <div className="product">
            <p className="product-name">Proceso de matrículas</p>
          </div>

          <div className="product">
            <p className="product-name">Actividades escolares</p>
          </div>
        </div>
      </section>

      
      <footer className="footer">
        <p>© 2025 Colegio O’Higgins</p>
      </footer>
    </>
  )
}