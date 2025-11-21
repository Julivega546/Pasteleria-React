export default function BooksPage() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    login("alumno", "123456").then(() => {
      ProductoService.getAllProductos().then((res) =>setProductos(res.data));
    });
  }, []);
  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((b) => (
          <li key={b.id}>
            {b.nombre} - {b.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}
