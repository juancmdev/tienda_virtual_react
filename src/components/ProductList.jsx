import ProductCard from "./ProductCard";

const ProductList = () => {
  const productos = [
    {
      id: 1,
      nombre: "Producto 1",
      descripcion: "Descripción del Producto 1",
      urlImagen:
        "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
      precio: 19.99,
    },
    {
      id: 2,
      nombre: "Producto 2",
      descripcion: "Descripción del Producto 2",
      urlImagen:
        "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
      precio: 29.99,
    },
    {
      id: 3,
      nombre: "Producto 3",
      descripcion: "Descripción del Producto 3",
      urlImagen:
        "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
      precio: 5.99,
    },

    {
      id: 4,
      nombre: "Producto 4",
      descripcion: "Descripción del Producto 4",
      urlImagen:
        "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
      precio: 5.99,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Aplicamos Flexbox/Grid para el listado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          // Usamos la propiedad `key` con el id único del producto
          <ProductCard
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            urlImagen={producto.urlImagen}
            precio={producto.precio}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
