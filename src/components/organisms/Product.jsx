

export default function Product() {
  const products = [
    {
      code: "P001",
      image: "/imagen/brownies-sin-gluten.jpg",
      name: "Brownie de Chocolate",
      description: "Delicioso brownie artesanal con cacao puro.",
      price: 4500,
    },
    {
      code: "P002",
      image:"/imagen/cheese-cake.jpg",
      name: "Cheesecake de Frutilla",
      description: "",
      price: 5500,
    },
    {
      code: "P003",
      name: "Galletas Caseras",
      description: "Crujientes galletas de mantequilla con chips de chocolate.",
      price: 3500,
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
