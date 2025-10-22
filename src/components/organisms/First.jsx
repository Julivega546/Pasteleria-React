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
            <p>📞+56 9 6244 0331</p>

        </section>
    )
}