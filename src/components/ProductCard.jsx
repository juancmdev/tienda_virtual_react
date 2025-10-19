import { formatCurrency } from "../utils/formatters";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({
  id,
  nombre,
  descripcion,
  urlImagen,
  precio,
  handleDelete, // Función para eliminar (solo en Admin)
  handleEdit, // Función para editar (solo en Admin)
  isAdmin, // Booleano para distinguir la vista
}) => {
  // ----------------------------------------------------
  // USAMOS EL HOOK PERSONALIZADO useCart
  // ----------------------------------------------------
  const { handleAddToCart } = useCart();

  const handleProductClick = () => {
    // Creamos el objeto con los datos esenciales del producto
    const productToAdd = {
      id,
      nombre,
      precio,
      // (puedes añadir otros campos como urlImagen si los necesitas para la vista del carrito)
    };

    // Llamamos a la función del contexto. La lógica de incremento/añadir está en CartContext.
    handleAddToCart(productToAdd);
  };

  // Ahora podemos usar nombre, precio, etc., directamente
  return (
    <div className="w-64 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      {/*Imagen del Producto*/}
      <div className="h-40 overflow-hidden">
        <img
          src={urlImagen}
          alt={nombre}
          className="w-full h-full object-cover"
        />
      </div>
      {/*Cuerpo del Producto */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1 truncate">{nombre}</h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{descripcion}</p>
        <p className="text-2xl font-bold text-orange-600">
          {formatCurrency(precio)}
        </p>
      </div>

      {/*Botones Condicionales */}
      {/* VISTA ADMINISTRADOR: Botones de Gestión (Editar y Eliminar) */}
      <div className="p-4 pt-0">
        {isAdmin ? (
          <div className="flex justify-between space-x-2">
            {/* Botón de Editar (Azul) - Se usará en el siguiente paso */}
            <button
              className="flex-1 flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              onClick={() => handleEdit(id)}
            >
              <FaEdit className="mr-1" /> Editar
            </button>

            {/* Botón de Eliminar (Rojo) */}
            <button
              onClick={() => handleDelete(id)}
              className="flex-1 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              <FaTrash className="mr-1" /> Eliminar
            </button>
          </div>
        ) : (
          /* VISTA PÚBLICA: Botón de Compra */
          <button
            onClick={handleProductClick}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
          >
            Agregar al Carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
