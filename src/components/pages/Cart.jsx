import { useState, useEffect } from "react";

export default function Cart() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const removeProduct = (code) => {
    const updated = products.filter((p) => p.code !== code);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.removeItem("products");
    setProducts([]);
  };

  return (
    <>
      <p>
        🛒 <span className="items">{products.length}</span>
      </p>

      {products.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table border="1" cellPadding="8" style={{ margin: "auto" }}>
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>IMAGEN</th>
                <th>NOMBRE</th>
                <th>DESCRIPCIÓN</th>
                <th>PRECIO</th>
                <th>ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.code}>
                  <td>{p.code}</td>
                  <td>
                    <img src={p.image} alt={p.name} width="80" />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>${p.price}</td>
                  <td>
                    <button onClick={() => removeProduct(p.code)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <button onClick={clearCart}>Vaciar carrito</button>
        </>
      )}
    </>
  );
}
