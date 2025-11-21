import axios from "axios";

const BASE_URL = "http://localhost:9090/api/productos";

api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
config.headers.Authorization = `Bearer ${token}`;
return config;
})

class ProductoService {
getAllProductos() {
return api.get('/productos');
}
getProductoById(id) {
return api.get(`/productos/${id}`);
}
createProducto(producto) {
return api.post('/productos', producto);
}
updateProducto(id, producto) {
return api.put(`/productos/${id}`, producto);
}
deleteProducto(id) {
return api.delete(`/productos/${id}`);
}
}
export default new ProductoService();