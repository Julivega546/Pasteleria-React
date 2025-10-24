import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [pedido, setPedido] = useState("");
  const [estado, setEstado] = useState("");
  const [compraRealizada, setCompraRealizada] = useState(false);
  const [pedidoID, setPedidoID] = useState("");

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

  const total = products.reduce((acc, p) => acc + Number(p.price.replace(/\./g, "")), 0);

  const handlePagar = () => {
    if (products.length === 0) {
      alert("Tu carrito está vacío ");
      return;
    }

    const id = "PED-" + Math.floor(100000 + Math.random() * 900000);
    const pedidoData = {
      id,
      productos: products,
      total,
      fecha: new Date().toLocaleString(),
      estado: "En preparación",
    };

    localStorage.setItem("pedidoActual", JSON.stringify(pedidoData));
    clearCart();
    setPedidoID(id);
    setCompraRealizada(true);
    setEstado("");
  };

  const consultarPedido = () => {
    const pedidoActual = JSON.parse(localStorage.getItem("pedidoActual"));
    if (!pedidoActual) {
      setEstado("No hay pedidos registrados ");
      return;
    }

    if (pedido === pedidoActual.id) {
      setEstado(`📦 Pedido ${pedido} - Estado: ${pedidoActual.estado}`);
    } else if (pedido.trim() === "") {
      setEstado("Por favor, ingresa un número de pedido ");
    } else {
      setEstado("Pedido no encontrado ");
    }
  };

  return (
    <section className="cart-container">
      <h2>🛒 Carrito de Compras</h2>

      {!compraRealizada ? (
        <>
          {products.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              <table className="cart-table">
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
                        <button
                          className="btn-clear"
                          onClick={() => removeProduct(p.code)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-summary">
                <h3>Total: ${total.toLocaleString("es-CL")}</h3>
                <div className="cart-actions">
                  <button className="btn-clear" onClick={clearCart}>
                    Vaciar carrito
                  </button>
                  <button className="btn-pagar" onClick={handlePagar}>
                    Pagar
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="compra-exitosa">
            <h3>🎉 Compra exitosa</h3>
            <p>Tu pedido <b>{pedidoID}</b> ha sido registrado correctamente.</p>
            <p>Pronto te enviaremos actualizaciones sobre su estado 📦.</p>

            <div className="seguimiento-carrito">
              <h3> Seguimiento de pedido</h3>
              <div className="seguimiento-inputs">
                <input
                  type="text"
                  placeholder="Ingresa tu número de pedido"
                  value={pedido}
                  onChange={(e) => setPedido(e.target.value)}
                />
                <button className="btn-cart" onClick={consultarPedido}>
                  Consultar
                </button>
              </div>
              {estado && <p className="seguimiento-estado">{estado}</p>}
            </div>

            <Link to="/productos" className="btn-volver">
              ⬅️ Volver a Productos
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
