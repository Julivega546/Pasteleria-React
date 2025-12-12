import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [pedido, setPedido] = useState("");
  const [estado, setEstado] = useState("");
  const [compraRealizada, setCompraRealizada] = useState(false);
  const [pedidoID, setPedidoID] = useState("");

 
  const [showPago, setShowPago] = useState(false);
  const [metodo, setMetodo] = useState("");
  const [correo, setCorreo] = useState(localStorage.getItem("username") || "");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [errorPago, setErrorPago] = useState("");

  let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
historial.push(pedidoID);
localStorage.setItem("historialCompras", JSON.stringify(historial));

  

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(stored);
  }, []);

  const removeProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setProducts([]);
  };

  const total = products.reduce((acc, p) => acc + Number(p.precio), 0);

  // 🟪 AHORA SOLO ABRE EL FORMULARIO DE PAGO
  const handlePagar = () => {
    if (products.length === 0) {
      alert("Tu carrito está vacío ");
      return;
    }
    setShowPago(true);
  };

  // 🟪 CONFIRMAR PAGO (NUEVO)
  const confirmarPago = () => {
    setErrorPago("");

    if (!nombre || !direccion || !metodo) {
      setErrorPago("❌ Debes completar todos los campos obligatorios.");
      return;
    }

    if (metodo === "tarjeta" && tarjeta.length < 8) {
      setErrorPago("❌ Ingresa un número de tarjeta válido.");
      return;
    }

    const id = "PED-" + Math.floor(100000 + Math.random() * 900000);
    const pedidoData = {
      id,
      productos: products,
      total,
      fecha: new Date().toLocaleString(),
      estado: "En preparación",
      metodo,
      correo,
      nombre,
      direccion,
    };

    localStorage.setItem("pedidoActual", JSON.stringify(pedidoData));
    clearCart();

    setPedidoID(id);
    setCompraRealizada(true);
    setShowPago(false);
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

      {/* 🟪 FORMULARIO DE MÉTODO DE PAGO */}
      {/* 🟪 FORMULARIO DE MÉTODO DE PAGO — MODAL EMERGENTE */}
{showPago && (
  <div className="modal-overlay">
    <div className="modal-content">

      <h3>💳 Método de Pago</h3>

      <label>Correo:</label>
      <input
        type="email"
        value={correo}
        readOnly
        className="input-disabled"
      />

      <label>Nombre Completo:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <label>Dirección de Entrega:</label>
      <input
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />

      <label>Método de Pago:</label>
      <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
        <option value="">Selecciona un método</option>
        <option value="tarjeta">Tarjeta de Débito/Crédito</option>
        <option value="transferencia">Transferencia Bancaria</option>
        <option value="efectivo">Efectivo</option>
      </select>

      {metodo === "tarjeta" && (
        <>
          <label>Número de Tarjeta:</label>
          <input
            type="text"
            placeholder="**** **** **** ****"
            value={tarjeta}
            onChange={(e) => setTarjeta(e.target.value)}
          />
        </>
      )}

      {errorPago && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorPago}</p>
      )}

      <div className="modal-buttons">
        <button className="btn-pagar" onClick={confirmarPago}>
          Confirmar Pago
        </button>

        <button className="btn-clear" onClick={() => setShowPago(false)}>
          Cancelar
        </button>
      </div>

    </div>
  </div>
)}


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
                          onClick={() => removeProduct(p.id)}
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
            <p>
              Tu pedido <b>{pedidoID}</b> ha sido registrado correctamente.
            </p>
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
