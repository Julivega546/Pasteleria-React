import React from 'react'
import { HashLink } from 'react-router-hash-link'

export default function First() {
    return (
        <section id="first">
            <nav>
                <img src='logo.jpg' alt='logo'/>
                <HashLink smooth to='#first'>Inicio</HashLink>
                <HashLink smooth to='#second'>Nosotros</HashLink>
                <HashLink smooth to='#third'>Services</HashLink>
                <HashLink smooth to='#fourth'>Blogs</HashLink>
            </nav>
            <p>📞+56 9 6244 0331</p>
        </section>
    )
}