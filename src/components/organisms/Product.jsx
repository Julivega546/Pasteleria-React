export default function Product(props) {
  const { code, image, name, description, price } = props;
  const stars = Math.floor(Math.random() * 2) + 4;
  return (
    <div className="product">
      <div
        className="product-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="product-name">{name}</div>
      <div className="product-description">{description}</div>
      <div className="product-rating">
        {"⭐".repeat(stars)} {stars}.0
      </div>
      <div className="product-price">${price}</div>
      <button onClick={() => addToCart(props)}>Añadir al carro</button>
    </div>
  );
}

function addToCart(product) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

export const productList = [
  {
    code: "P001",
    image: "/imagen/brownies-sin-gluten.jpg",
    name: "Brownie sin gluten",
    description:
      "Delicioso brownie artesanal con cacao puro, apto para celíacos y dietas especiales.",
    price: "4.000",
  },
  {
    code: "P002",
    image: "/imagen/cheese-cake.jpg",
    name: "Cheesecake Sin Azúcar",
    description:
      "Suave y cremoso cheesecake, perfecto para disfrutar sin culpa.",
    price: "47.000",
  },
  {
    code: "P003",
    image: "/imagen/galletas-avena-veganas.jpg",
    name: "Galletas veganas",
    description:
      "Crujientes galletas de mantequilla con chips de chocolate.",
    price: "4.500",
  },
  {
    code: "P004",
    image: "/imagen/mousse-chocolate.jpg",
    name: "Mousse de chocolate",
    description:
      "Exquisito mousse de chocolate con capas de bizcocho y crocante.",
    price: "5.000",
  },
  {
    code: "P005",
    image: "/imagen/Torta-Fruta.jpg",
    name: "Torta de Fruta",
    description:
      "Bizcocho de vainilla con frutas frescas y crema chantilly.",
    price: "50.000",
  },
  {
    code: "P006",
    image: "/imagen/empanadas-manzana.jpg",
    name: "Empanadas de Manzana",
    description: "Masa hojaldrada rellena de manzana dulce.",
    price: "3.000",
  },
  {
    code: "P007",
    image: "/imagen/torta-vegana-chocolate-arandanos.jpg",
    name: "Torta Vegana de Chocolate",
    description:
      "Torta vegana de chocolate, rellena y decorada con arándanos.",
    price: "50.000",
  },
  {
    code: "P008",
    image: "/imagen/pan-sin-gluten.jpg",
    name: "Pan sin gluten",
    description: "Hecho con harina de arroz integral, suave y sabroso.",
    price: "3.500",
  },
  {
    code: "P009",
    image: "/imagen/tarta-de-santiago.jpg",
    name: "Tarta de Santiago",
    description:
      "Postre gallego de almendra, esponjoso y aromático.",
    price: "6.000",
  },
  {
    code: "P010",
    image: "/imagen/Torta-Sin-Azúcar-de-Naranja.webp",
    name: "Torta sin azúcar de Naranja",
    description:
      "Torta ligera endulzada naturalmente, ideal para opciones saludables.",
    price: "48.000",
  },
  {
    code: "P011",
    image: "/imagen/Tiramisu-clasico.jpg",
    name: "Tiramisú Clásico",
    description:
      "Postre italiano individual con capas de café, mascarpone y cacao.",
    price: "5.500",
  },
  {
    code: "P012",
    image: "/imagen/Torta-Cuadrada.png",
    name: "Torta Chocolate",
    description:
      "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.",
    price: "45.000",
  },
  {
    code: "P013",
    image: "/imagen/Torta-de-vainilla.jpg",
    name: "Torta de vainilla",
    description:
      "Bizcocho de vainilla con crema pastelera y glaseado.",
    price: "40.000",
  },
  {
    code: "P014",
    image: "/imagen/Torta-manjar.jpg",
    name: "Torta Manjar",
    description: "Torta tradicional chilena con manjar y nueces.",
    price: "42.000",
  },
  {
    code: "P015",
    image: "/imagen/Torta-especial.jpg",
    name: "Torta Especial de Cumpleaños",
    description: "Personalizable para ocasiones especiales.",
    price: "55.000",
  },
  {
    code: "P016",
    image: "/imagen/Torta-Boda.jpg",
    name: "Torta de Boda",
    description: "Elegante torta diseñada para bodas.",
    price: "60.000",
  },
];
