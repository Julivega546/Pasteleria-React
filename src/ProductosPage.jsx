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
    precio: ""
  });

  const navigate = useNavigate();
  const { logout, username, role, isAdmin } = useAuth();

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = () => {
    setLoading(true);
    ProductoService.getAllProductos()
      .then((res) => setProductos(res.data))
      .catch((err) => {
        setError("Error al cargar productos");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔒 SOLO ADMIN: Crear producto
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await ProductoService.createProducto(formData);
      resetForm();
      loadProductos();
    } catch (err) {
      alert("Error al crear producto");
      console.error(err);
    }
  };

  // 🔒 SOLO ADMIN: Editar producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await ProductoService.updateProducto(editingProducto.id, formData);
      resetForm();
      loadProductos();
    } catch (err) {
      alert("Error al actualizar producto");
      console.error(err);
    }
  };

  // 🔒 SOLO ADMIN: Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await ProductoService.deleteProducto(id);
      loadProductos();
    } catch (err) {
      alert("Error al eliminar producto");
      console.error(err);
    }
  };

  const startEdit = (producto) => {
    setEditingProducto(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
    });
  };

  const resetForm = () => {
    setEditingProducto(null);
    setShowForm(false);
    setFormData({ nombre: "", descripcion: "", precio: "" });
  };

  if (loading) return <div style={{ padding: "20px" }}>Cargando...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <h1>🛒 Productos</h1>
        <div>
          <span
            style={{
              marginRight: "15px",
              padding: "5px 10px",
              backgroundColor: isAdmin ? "#28a745" : "#007bff",
              color: "white",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {role} - {username}
          </span>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔒 SOLO ADMIN: Botón agregar */}
      {isAdmin && !showForm && !editingProducto && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ➕ Agregar Producto
        </button>
      )}

      {/* 🔒 Formulario ADMIN */}
      {isAdmin && (showForm || editingProducto) && (
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3>{editingProducto ? "✏️ Editar Producto" : "➕ Nuevo Producto"}</h3>

          <form onSubmit={editingProducto ? handleUpdate : handleCreate}>
            {/* Nombre */}
            <div style={{ marginBottom: "15px" }}>
              <label>Nombre:</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            {/* Descripcion */}
            <div style={{ marginBottom: "15px" }}>
              <label>Descripción:</label>
              <input
                type="text"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            {/* Precio */}
            <div style={{ marginBottom: "15px" }}>
              <label>Precio:</label>
              <input
                type="number"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {editingProducto ? "Actualizar" : "Crear"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Lista de productos */}
      <div>
        {productos.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  ID
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Nombre
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Descripción
                </th>
                <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>
                  Precio
                </th>
                {isAdmin && (
                  <th
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      borderBottom: "2px solid #ddd",
                    }}
                  >
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{p.id}</td>
                  <td style={{ padding: "10px" }}>
                    <strong>{p.nombre}</strong>
                  </td>
                  <td style={{ padding: "10px" }}>{p.descripcion}</td>
                  <td style={{ padding: "10px" }}>${p.precio}</td>

                  {isAdmin && (
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <button
                        onClick={() => startEdit(p)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#ffc107",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#dc3545",
                          border: "none",
                          color: "white",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
