const ProductCard = ({ id, nombre, descripcion, urlImagen, precio }) => {
  // Ahora podemos usar nombre, precio, etc., directamente
  return (
    <div className="w-64 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      {/* 1. Imagen del Producto: w-full y object-cover */}
      <div className="h-40 overflow-hidden">
        {" "}
        {/* Contenedor para controlar la altura */}
        <img
          src={urlImagen}
          alt={nombre}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Cuerpo del Producto */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1 truncate">{nombre}</h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{descripcion}</p>
        <p className="text-2xl font-bold text-orange-600">
          ${precio.toFixed(2)}
        </p>
      </div>

      {/* 3. Botón de Compra: w-full */}
      <div className="p-4 pt-0">
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
