import api from "../components/Api/AxiosConfig";

class ProductoService {

  // ✔ Obtener todos los productos
  getAllProductos() {
    return api.get("/productos");
  }

  // ✔ Obtener producto por ID
  getProductoById(id) {
    return api.get(`/productos/${id}`);
  }

  // ✔ Crear producto
  createProducto(producto) {
    return api.post("/productos", producto);
  }

  // ✔ Actualizar producto por ID
  updateProducto(id, producto) {
    return api.put(`/productos/${id}`, producto);
  }

  // ✔ Eliminar producto por ID
  deleteProducto(id) {
    return api.delete(`/productos/${id}`);
  }
}

export default new ProductoService();
