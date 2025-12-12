import api from "../components/Api/AxiosConfig";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ✅ Ahora apunta a "/api/productos" como en tu backend
const getAllProductos = () => {
  return api.get("/api/productos");
};

const createProducto = (producto) => {
  return api.post("/api/productos", producto, {
    headers: getAuthHeaders(),
  });
};

const updateProducto = (id, producto) => {
  return api.put(`/api/productos/${id}`, producto, {
    headers: getAuthHeaders(),
  });
};

const deleteProducto = (id) => {
  return api.delete(`/api/productos/${id}`, {
    headers: getAuthHeaders(),
  });
};

export default {
  getAllProductos,
  createProducto,
  updateProducto,
  deleteProducto,
};
