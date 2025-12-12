import api from "../components/Api/AxiosConfig";
import { productList } from "../productList";

// Inserta los productos solo si la base está vacía
export async function cargarProductosIniciales() {
  try {
    const existentes = await api.get("/api/productos");

    if (existentes.data.length > 0) {
      console.log("➡ Productos ya existen. No se agregaron.");
      return;
    }

    console.log("⏳ Insertando productos iniciales...");

    for (const p of productList) {
      await api.post("/api/productos", {
        nombre: p.name,
        descripcion: p.description,
        precio: Number(p.price.replace(".", "")),
        imagen: p.image,
        codigo: p.code,
      });
    }

    console.log("✅ Productos agregados correctamente.");
  } catch (error) {
    console.error("❌ Error al cargar productos iniciales:", error);
  }
}
