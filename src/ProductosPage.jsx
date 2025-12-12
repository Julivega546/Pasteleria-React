import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductoService from "./service/ProductoService";
import { useAuth } from "./context/AuthContext";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    image: "",
  });

  const navigate = useNavigate();
  const { logout, user: username, role, isAdmin } = useAuth();

  // ============================
  // 🟪 CARGAR PRODUCTOS
  // ============================
  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = () => {
    setLoading(true);
    ProductoService.getAllProductos()
      .then((res) => {
        console.log("📦 Productos recibidos:", res.data);
        setProductos(res.data);
        setError("");
      })
      .catch((err) => {
        console.error("❌ Error cargando productos:", err);
        setError("Error al cargar productos");
      })
      .finally(() => setLoading(false));
  };

  // ============================
  // 🟪 CARRITO — AGREGAR PRODUCTO
  // ============================
  const addToCart = (producto) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      image: producto.image,
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`🛒 ${producto.nombre} agregado al carrito`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await ProductoService.createProducto({
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        image: formData.image,
      });

      setFormData({ nombre: "", descripcion: "", precio: "", image: "" });
      setShowForm(false);
      loadProductos();
    } catch (err) {
      alert("Error al crear producto");
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await ProductoService.updateProducto(editingProducto.id, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        image: formData.image,
      });

      setFormData({ nombre: "", descripcion: "", precio: "", image: "" });
      setEditingProducto(null);
      loadProductos();
    } catch (err) {
      alert("Error al actualizar producto");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await ProductoService.deleteProducto(id);
      loadProductos();
    } catch (err) {
      alert("Error al eliminar");
      console.error(err);
    }
  };

  const startEdit = (producto) => {
    setEditingProducto(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      image: producto.image,
    });
  };

  const cancelEdit = () => {
    setEditingProducto(null);
    setShowForm(false);
    setFormData({ nombre: "", descripcion: "", precio: "", image: "" });
  };

  if (loading) return <p style={{ padding: "20px" }}>Cargando...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <h1>🛒 Productos</h1>

        <div>
          <span
            style={{
              padding: "5px 10px",
              marginRight: "10px",
              background: isAdmin ? "#28a745" : "#007bff",
              color: "white",
              borderRadius: "5px",
            }}
          >
            {role} - {username}
          </span>

          <button
            onClick={handleLogout}
            style={{
              background: "#dc3545",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>


      {error && <p style={{ color: "red" }}>{error}</p>}


      {isAdmin && !showForm && !editingProducto && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#28a745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
        >
          + Agregar Producto
        </button>
      )}
      {isAdmin && (showForm || editingProducto) && (
        <div
          style={{
            background: "#fff5f8",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>{editingProducto ? "Editar Producto" : "Nuevo Producto"}</h3>

          <form onSubmit={editingProducto ? handleUpdate : handleCreate}>
            <div style={{ marginBottom: "10px" }}>
              <label>Nombre:</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Descripción:</label>
              <input
                type="text"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Precio:</label>
              <input
                type="number"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>URL Imagen:</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="/imagen/brownies-sin-gluten.jpg"
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: "#ff7aa8",
                padding: "10px 20px",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              {editingProducto ? "Actualizar" : "Crear"}
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              style={{
                background: "#6c757d",
                padding: "10px 20px",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}


      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#ffe6eb" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Imagen</th>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Precio</th>
            <th style={thStyle}>Carrito</th>
            {isAdmin && <th style={thStyle}>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tdStyle}>{p.id}</td>

              <td style={tdStyle}>
                <img
                  src={p.image}
                  alt={p.nombre}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              </td>

              <td style={tdStyle}>{p.nombre}</td>
              <td style={tdStyle}>{p.descripcion}</td>
              <td style={tdStyle}>${p.precio.toLocaleString("es-CL")}</td>

              <td style={tdStyle}>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#FFC0CB",
                    color: "#5d4037",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🛒 Añadir
                </button>
              </td>

              {isAdmin && (
                <td style={tdStyle}>
                  <button onClick={() => startEdit(p)} style={btnYellow}>
                    ✏️ Editar
                  </button>

                  <button onClick={() => handleDelete(p.id)} style={btnRed}>
                    🗑️ Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "10px",
};

const btnYellow = {
  padding: "5px 10px",
  background: "#ffc107",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "5px",
};

const btnRed = {
  padding: "5px 10px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
