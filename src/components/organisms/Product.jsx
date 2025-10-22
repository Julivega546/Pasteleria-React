

export default function Product() {
  const products = [
    {
      code: "P001",
      image: "/imagen/brownies-sin-gluten.jpg",
      name: "Brownie sin gluten",
      description: "Delicioso brownie artesanal con cacao puro, aptoz para celíacos y dietas especiales. ",
      price: 4000 ,
    },
    {
      code: "P002",
      image:"/imagen/cheese-cake.jpg",
      name: "Cheesecake Sin Azúcar",
      description: "Suave y cremoso cheesecake, perfecto para disfrutar sin culpa. ",
      price: 47000,
    },
    {
      code: "P003",
      image:"/imagen/galletas-avena-veganas.jpg",
      name: "Galletas veganas",
      description: "Crujientes galletas de mantequilla con chips de chocolate.",
      price: 4500,
    },
    {
      code:"P004",
      image:"/imagen/mousse-chocolate.jpg",
      name:"Mousse de chocolate",
      description:"Exquisito mousse de chocolate con capas de bizcocho y crocante.",
      price:5000,
    },
    {
      code:"P005",
      image:"/imagen/Torta-Fruta.jpg",
      name:"Torta de Fruta",
      description:"Bizcocho de vainilla con frutas frescas y crema chantilly.",
      price:50000,
    },
    {
      code:"P006",
      image:"/imagen/empanadas-manzana.jpg",
      name:"Empanadas de Mnazana",
      description:"Masa hojaldrada rellena de manzana dulce.",
      price:3000,
    },
    {
      code:"P007",
      image:"/imagen/torta-vegana-chocolate-arandanos.jpg",
      name:"Torta Vegana de Chocolate",
      description:"Torta vegana de chocolate, rellena y decorada con arándanos.",
      price:50000,
    },
    {
      code:"P008",
      image:"/imagen/pan-sin-gluten.jpg",
      name:"Pan sin gluten",
      description:"Hecho con harina de arroz integral, suave y sabroso.",
      price:"3500",
    },
    {
      code:"P009",
      image:"/imagen/tarta-de-santiago.jpg",
      name:"Tarta de Santiago",
      description:"Postre gallego de almendra, esponjoso y aromático.",
      price:"6000",
    },
    {
      code:"P010",
      image:"/imagen/Torta-Sin-Azúcar-de-Naranja.webp",
      name:"Torta sin azucar de Naranja",
      description:"Torta ligera endulzada naturalmente, ideal para opciones saludables.",
      price:"48000",
    },
    {
      code:"P011",
      image:"/imagen/Tiramisu-clasico.jpg",
      name:"Tiramisú Clasico",
      description:"Postre italiano individual con capas de café, mascarpone y cacao.",
      price:"5500",
    },
    {
      code:"P012",
      image:"/imagen/Torta-Cuadrada.png",
      name:"Torta Chocolate",
      description:"Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
      price:"45000",
    },
    {
      code:"P013",
      image:"/imagen/Torta-de-vainilla.jpg",
      name:"Torta de vainilla",
      description:"Bizcocho de vainilla con crema pastelera y glaseado.",
      price:"40000",
    },

    {
      code:"P014",
      image:"/imagen/Torta-manjar.jpg",
      name:"Torta Manjar",
      description:"Torta tradicional chilena con manjar y nueces.",
      price:"42000",
    },
    {
      code:"P015",
      image:"/imagen/Torta-especial.jpg",
      name:"Torta Especial de Cumpleaños",
      description:"Personalizable para ocasiones especiales.",
      price:"55000",
    },
    {
      code:"P016",
      image:"/imagen/Torta-Boda.jpg",
      name:"Torta de Boda",
      description:"Elegante torta diseñada para bodas.",
      price:"60000",
    },



  ];

  const addToCart = (product) => {
    const productsInCart = JSON.parse(localStorage.getItem("products")) || [];
    productsInCart.push(product);
    localStorage.setItem("products", JSON.stringify(productsInCart));
  };

  return (
    <section className="products">
      <h2>Nuestros Productos</h2>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.code} className="product">
            <img src={p.image} alt={p.name} className="product-image" />
            <div className="product-name">{p.name}</div>
            <div className="product-description">{p.description}</div>
            <div className="product-price">${p.price}</div>
            <button onClick={() => addToCart(p)}>Añadir al carro</button>
          </div>
        ))}
      </div>
    </section>
  );
}
