import { createContext, useContext, useState } from "react";

// Crear el contexto
export const cartContext = createContext();

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
  };
};

const CartContext = () => {
  return <div>CartContext</div>;
};

export default CartContext;
