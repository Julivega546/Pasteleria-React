import React, { useState } from "react";
import "../App.css";

export default function Filtros({ onFilter }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [precio, setPrecio] = useState("todos");

  const handleFilter = () => {
    onFilter({ busqueda, categoria, precio });
  };

  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="🔍 Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyUp={handleFilter}
      />

      <select
        value={categoria}
        onChange={(e) => {
          setCategoria(e.target.value);
          handleFilter();
        }}
      >
        <option value="todas">Todas las categorías</option>
        <option value="torta">Tortas</option>
        <option value="postre">Postres</option>
        <option value="vegano">Veganos</option>
        <option value="sin-gluten">Sin Gluten</option>
      </select>

      <select
        value={precio}
        onChange={(e) => {
          setPrecio(e.target.value);
          handleFilter();
        }}
      >
        <option value="todos">Todos los precios</option>
        <option value="bajo">Menos de $5.000</option>
        <option value="medio">$5.000 - $20.000</option>
        <option value="alto">Más de $20.000</option>
      </select>

      <button className="btn-cart" onClick={handleFilter}>
        Filtrar
      </button>
    </div>
  );
}
