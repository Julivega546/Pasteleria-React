import React from 'react'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'   

export default function First() {
    return (
        <section id="first">
            <nav>
                <HashLink smooth to='#first'>Inicio</HashLink>
                <HashLink smooth to='#second'>Nosotros</HashLink>
                <HashLink smooth to='#third'>Recomendado</HashLink>
                <HashLink smooth to='#fourth'>Blogs</HashLink>
                 <Link to="/cart">Carrito</Link>
            </nav>
            <p>REDES SOCIALES</p>
            <nav>
                <HashLink smooth to='#login'>Inicio Sesion</HashLink>
                <HashLink smooth to='#perfil'>Perfil</HashLink>
            </nav>

        </section>
    )
}