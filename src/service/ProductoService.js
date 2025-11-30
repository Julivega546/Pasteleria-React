import api from "../components/Api/AxiosConfig";

class ProductoService {
  getAllProductos() {
    return api.get("/api/productos");
  }

  getProductoById(id) {
    return api.get(`/api/productos/${id}`);
  }

  createProducto(producto) {
    return api.post("/api/productos", producto);
  }

  updateProducto(id, producto) {
    return api.put(`/api/productos/${id}`, producto);
  }

  deleteProducto(id) {
    return api.delete(`/api/productos/${id}`);
  }
}

export default new ProductoService();
