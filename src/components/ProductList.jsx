import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

// const productos = [
//   {
//     id: 1,
//     nombre: "Producto 1",
//     descripcion: "Descripción del Producto 1",
//     urlImagen:
//       "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
//     precio: 19.99,
//   },
//   {
//     id: 2,
//     nombre: "Producto 2",
//     descripcion: "Descripción del Producto 2",
//     urlImagen:
//       "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
//     precio: 29.99,
//   },
//   {
//     id: 3,
//     nombre: "Producto 3",
//     descripcion: "Descripción del Producto 3",
//     urlImagen:
//       "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
//     precio: 5.99,
//   },

//   {
//     id: 4,
//     nombre: "Producto 4",
//     descripcion: "Descripción del Producto 4",
//     urlImagen:
//       "https://http2.mlstatic.com/D_NQ_NP_2X_752793-MCO89741436545_082025-F.webp",
//     precio: 5.99,
//   },
// ];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Opcional: estado de carga

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/productos"); //fetch a la URL de productos
        const data = await response.json();
        if (response.ok) {
          setProducts(data); //Actualizo el estado de productos
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false); // Opcional: Terminamos la carga
      }
    };

    fetchProducts();
  }, []); // Dependencia: [] para que solo se ejecute al montar

  //Lógica de filtrado
  const productosFiltrados = products.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-20 text-xl">Cargando productos</div>; // Opcional: Muestra un mensaje de carga
  }

  if (products.length === 0 && !loading) {
    return <div className="text-center p-20 text-xl">No hay productos</div>;
  }

  return (
    <div className="container mx-auto p-8">
      {/*Barra de búsqueda */}
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar Productos..."
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      <h1 className="text-3xl font-bold mb-6 text-center">
        Nuestros Productos
      </h1>

      {/* Grid de productos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosFiltrados.map((producto) => (
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
