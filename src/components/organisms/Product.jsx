import React, { useState } from "react";

export default function Product() {
  const productsList = [
    {
      code: "P001",
      image: "/imagen/brownies-sin-gluten.jpg",
      name: "Brownie sin gluten",
      description: "Delicioso brownie artesanal con cacao puro, apto para celíacos y dietas especiales.",
      price: 4000,
      category: "sin-gluten",
    },
    {
      code: "P002",
      image: "/imagen/cheese-cake.jpg",
      name: "Cheesecake Sin Azúcar",
      description: "Suave y cremoso cheesecake, perfecto para disfrutar sin culpa.",
      price: 47000,
      category: "postre",
    },
    {
      code: "P003",
      image: "/imagen/galletas-avena-veganas.jpg",
      name: "Galletas veganas",
      description: "Crujientes galletas de mantequilla con chips de chocolate.",
      price: 4500,
      category: "vegano",
    },
    {
      code: "P004",
      image: "/imagen/mousse-chocolate.jpg",
      name: "Mousse de chocolate",
      description: "Exquisito mousse de chocolate con capas de bizcocho y crocante.",
      price: 5000,
      category: "postre",
    },
    {
      code: "P005",
      image: "/imagen/Torta-Fruta.jpg",
      name: "Torta de Fruta",
      description: "Bizcocho de vainilla con frutas frescas y crema chantilly.",
      price: 50000,
      category: "torta",
    },
    {
      code: "P006",
      image: "/imagen/empanadas-manzana.jpg",
      name: "Empanadas de Manzana",
      description: "Masa hojaldrada rellena de manzana dulce.",
      price: 3000,
      category: "postre",
    },
    {
      code: "P007",
      image: "/imagen/torta-vegana-chocolate-arandanos.jpg",
      name: "Torta Vegana de Chocolate",
      description: "Torta vegana de chocolate, rellena y decorada con arándanos.",
      price: 50000,
      category: "vegano",
    },
    {
      code: "P008",
      image: "/imagen/pan-sin-gluten.jpg",
      name: "Pan sin gluten",
      description: "Hecho con harina de arroz integral, suave y sabroso.",
      price: 3500,
      category: "sin-gluten",
    },
    {
      code: "P009",
      image: "/imagen/tarta-de-santiago.jpg",
      name: "Tarta de Santiago",
      description: "Postre gallego de almendra, esponjoso y aromático.",
      price: 6000,
      category: "postre",
    },
    {
      code: "P010",
      image: "/imagen/Torta-Sin-Azúcar-de-Naranja.webp",
      name: "Torta sin azúcar de Naranja",
      description: "Torta ligera endulzada naturalmente, ideal para opciones saludables.",
      price: 48000,
      category: "torta",
    },
    {
      code: "P011",
      image: "/imagen/Tiramisu-clasico.jpg",
      name: "Tiramisú Clásico",
      description: "Postre italiano individual con capas de café, mascarpone y cacao.",
      price: 5500,
      category: "postre",
    },
    {
      code: "P012",
      image: "/imagen/Torta-Cuadrada.png",
      name: "Torta Chocolate",
      description: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
      price: 45000,
      category: "torta",
    },
    {
      code: "P013",
      image: "/imagen/Torta-de-vainilla.jpg",
      name: "Torta de vainilla",
      description: "Bizcocho de vainilla con crema pastelera y glaseado.",
      price: 40000,
      category: "torta",
    },
    {
      code: "P014",
      image: "/imagen/Torta-manjar.jpg",
      name: "Torta Manjar",
      description: "Torta tradicional chilena con manjar y nueces.",
      price: 42000,
      category: "torta",
    },
    {
      code: "P015",
      image: "/imagen/Torta-especial.jpg",
      name: "Torta Especial de Cumpleaños",
      description: "Personalizable para ocasiones especiales.",
      price: 55000,
      category: "torta",
    },
    {
      code: "P016",
      image: "/imagen/Torta-Boda.jpg",
      name: "Torta de Boda",
      description: "Elegante torta diseñada para bodas.",
      price: 60000,
      category: "torta",
    },
  ];

  const [filteredProducts, setFilteredProducts] = useState(productsList);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [precio, setPrecio] = useState("todos");

  const addToCart = (product) => {
    const productsInCart = JSON.parse(localStorage.getItem("products")) || [];
    productsInCart.push(product);
    localStorage.setItem("products", JSON.stringify(productsInCart));
  };

  const filtrarProductos = () => {
    let filtrados = productsList;

    if (busqueda.trim() !== "") {
      filtrados = filtrados.filter((p) =>
        p.name.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (categoria !== "todas") {
      filtrados = filtrados.filter((p) => p.category === categoria);
    }

    if (precio === "bajo") {
      filtrados = filtrados.filter((p) => p.price < 5000);
    } else if (precio === "medio") {
      filtrados = filtrados.filter((p) => p.price >= 5000 && p.price <= 20000);
    } else if (precio === "alto") {
      filtrados = filtrados.filter((p) => p.price > 20000);
    }

    setFilteredProducts(filtrados);
  };

  return (
    <section className="products">
      <h2 className="titulo-seccion">Nuestros Productos</h2>

      <div className="filtros">
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            filtrarProductos();
          }}
        />

        <select
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            filtrarProductos();
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
            filtrarProductos();
          }}
        >
          <option value="todos">Todos los precios</option>
          <option value="bajo">Menos de $5.000</option>
          <option value="medio">$5.000 - $20.000</option>
          <option value="alto">Más de $20.000</option>
        </select>

        <button className="btn-cart" onClick={filtrarProductos}>
          Filtrar
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map((p) => (
          <div key={p.code} className="product">
            <img src={p.image} alt={p.name} className="product-image" />
            <div className="product-name">{p.name}</div>
            <div className="product-description">{p.description}</div>
            <div className="product-price">${p.price}</div>
            <button className="btn-cart" onClick={() => addToCart(p)}>
              Añadir al carro
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
