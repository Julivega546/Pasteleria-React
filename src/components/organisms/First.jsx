import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from 'react-router-dom';

export default function First() {
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
        <HashLink smooth to="#fourth">Blogs</HashLink>
        {isLoggedIn && <Link to="/cart">Carrito</Link>}
      </nav>

      <p>REDES SOCIALES</p>

      <nav>
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
