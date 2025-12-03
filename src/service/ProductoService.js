import api from "../components/Api/AxiosConfig";

class ProductoService {
  getAllProductos() {
    return api.get("/productos");
  }

  getProductoById(id) {
    return api.get(`/productos/${id}`);
  }

  createProducto(producto) {
    return api.post("/productos", producto);
  }

  updateProducto(id, producto) {
    return api.put(`/productos/${id}`, producto);
  }

  deleteProducto(id) {
    return api.delete(`/productos/${id}`);
  }
}

export default new ProductoService();
