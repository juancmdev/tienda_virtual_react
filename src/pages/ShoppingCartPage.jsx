import { useCart } from "../context/CartContext"; // Hook para acceder al estado
// ⚠️  Función para dar formato al dinero
import { formatCurrency } from "../utils/formatters";

const ShoppingCartPage = () => {
  //Acceder al estado y funciones del Contexto
  const {
    cart,
    updateQuantity,
    // Agregaremos más funciones aquí pronto (ej. removeFromCart, updateQuantity)
  } = useCart();

  // 2. Lógica para calcular el total
  // Aquí es donde multiplicarás (precio * cantidad) por cada item y sumarás
  const totalCalculado = cart.reduce((acc, item) => {
    return acc + item.precio * item.cantidad;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">
          Tu Carrito de Compras
        </h1>
        <p className="text-xl text-gray-600">
          Tu carrito está vacío. ¡Añade algunos productos! 🛍️
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-600">
        Tu Carrito de Compras
      </h1>

      {/* A. SECCIÓN DE ARTÍCULOS */}
      <div className="md:grid md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2">
          {/* ⚠️ Aquí mapearás el array 'cart' y mostrarás los detalles de cada producto */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 items-center border-b py-4"
            >
              <span className="col-span-3 font-semibold mr-1">
                {item.nombre}
              </span>

              {/* Cantidad */}
              <div className="flex items-center space-x-4 mr-2">
                <label
                  htmlFor={`quantity-${item.id}`}
                  className="text-gray-600"
                >
                  Cantidad:
                </label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.cantidad} // Muestra el estado actual
                  onChange={(e) => {
                    // Llama a la función del contexto.
                    // Usamos parseInt() para asegurarnos de que el valor es un número entero
                    updateQuantity(item.id, parseInt(e.target.value));
                  }}
                  className="w-16 p-1 border border-gray-300 rounded text-center"
                />
              </div>

              <span className="font-bold">
                {formatCurrency(item.precio * item.cantidad)}
              </span>
            </div>
          ))}
        </div>

        {/* B. SECCIÓN DE RESUMEN (TOTAL) */}
        <div className="md:col-span-1 bg-gray-100 p-6 rounded-lg shadow-md mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Resumen de la Compra</h2>
          {/* ⚠️ Aquí irá el cálculo del Subtotal y Total */}
          <div className="flex justify-between border-t pt-4 font-bold text-xl">
            <span>Total:</span>
            {/* {formatCurrency(totalCalculado)} */}
            <span>{formatCurrency(totalCalculado)}</span>
          </div>

          <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
