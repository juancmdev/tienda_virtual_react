import { formatCurrency } from "../utils/formatters";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({
  id,
  nombre,
  descripcion,
  urlImagen,
  precio,
  handleDelete, // Función para eliminar (solo en Admin)
  isAdmin, // Booleano para distinguir la vista
}) => {
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

      {/* 3. Botones Condicionales */}
      <div className="p-4 pt-0">
        {isAdmin ? (
          /* VISTA ADMINISTRADOR: Botones de Gestión (Editar y Eliminar) */
          <div className="flex justify-between space-x-2">
            {/* Botón de Editar (Azul) - Se usará en el siguiente paso */}
            <button
              className="flex-1 flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              // onClick={() => handleEdit(id)} // Implementaremos esto después
            >
              <FaEdit className="mr-1" /> Editar
            </button>

            {/* Botón de Eliminar (Rojo) */}
            <button
              onClick={() => handleDelete(id)}
              className="flex-1 flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash className="mr-1" /> Eliminar
            </button>
          </div>
        ) : (
          /* VISTA PÚBLICA: Botón de Compra */
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
            Agregar al Carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
