import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
export const CartContext = createContext();

// Crear el Proveedor (Provider) que gestionará el estado del carrito
export const CartProvider = ({ children }) => {
  // Definimos el estado del carrito aquí
  const [cart, setCart] = useState(() => {
    // 1. Intentamos obtener la cadena de texto guardada
    const savedCart = localStorage.getItem("cartItems");

    // 2. Si hay algo guardado (savedCart no es null):
    if (savedCart) {
      // Devolvemos el array de JavaScript que estaba guardado
      return JSON.parse(savedCart);
    }

    // 3. Si no hay nada, devolvemos el array vacío inicial
    return [];
  });
  useEffect(() => {
    // 1. Convertimos el array 'cart' a una cadena de texto JSON
    const cartString = JSON.stringify(cart);

    // 2. Guardamos esa cadena de texto en localStorage con la clave 'cartItems'
    localStorage.setItem("cartItems", cartString);
  }, [cart]);

  // ----------------------------------------------------
  // Lógica para añadir un producto (más robusta)
  // ----------------------------------------------------
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      // Buscamos si el producto ya existe en el carrito
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // Si existe, incrementamos su cantidad
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregamos un nuevo elemento al carrito
        return [...prevCart, { ...productToAdd, cantidad: 1 }];
      }
    });
    alert(`🛒 ¡${productToAdd.nombre} añadido al carrito!`);
  };

  // ----------------------------------------------------
  // Definir el "Valor" que se compartirá globalmente
  // ----------------------------------------------------
  const contextValue = {
    cart,
    // Exponemos la función con lógica robusta para que ProductCard la llame
    handleAddToCart,
    setCart, // (Mantener por si lo necesitamos directamente)
  };
  return (
    // El Provider envuelve a los hijos y les da acceso al contextValue
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

// Hook Personalizado (Opcional, pero muy recomendado)
// Esto hace que el consumo del contexto sea más limpio en los componentes
export const useCart = () => {
  return useContext(CartContext);
};
