import { createContext, useContext, useState } from "react";

// Crear el contexto
export const CartContext = createContext();

// Crear el Proveedor (Provider) que gestionará el estado del carrito
export const CartProvider = ({ children }) => {
  // Definimos el estado del carrito aquí
  const [cart, setCart] = useState([]);

  // ----------------------------------------------------
  // Lógica para añadir un producto (más robusta)
  // ----------------------------------------------------
  const handleAddCart = (productToAdd) => {
    setCart((prevCart) => {
      // Buscamos si el producto ya existe en el carrito
      const existingItem = cart.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        // Si existe, incrementamos su cantidad
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregamos un nuevo elemento al carrito
        return [...prevCart, { ...productToAdd, quantity: 1 }];
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
    handleAddCart,
    setCart, // (Mantener por si lo necesitamos directamente)
  };
  return (
    // El Provider envuelve a los hijos y les da acceso al contextValue
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
};

// Hook Personalizado (Opcional, pero muy recomendado)
// Esto hace que el consumo del contexto sea más limpio en los componentes
export const useCart = () => {
  return useContext(CartContext);
};
