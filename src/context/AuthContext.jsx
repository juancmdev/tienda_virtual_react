import { useState } from "react";
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const contextValue = {
    //ESTADOS (Lo que los componentes necesitan LEER)
    isAuthenticated, // Para saber si mostrar /admin o /login
    token, // Para incluirlo en los headers de las peticiones protegidas
    user, // Para mostrar el nombre del admin, por ejemplo

    //SETTERS (Lo que los componentes necesitan CAMBIAR)
    setIsAuthenticated, // Lo necesitarás para la función de logout
    setToken, // Lo necesitarás en LoginPage para guardar el token devuelto
    setUser, // Lo necesitarás en LoginPage para guardar los datos del usuario
  };
  return (
    // El Provider envuelve a los hijos y les da acceso al contextValue
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook Personalizado para consumo
export const useAuth = () => {
  return useContext(AuthContext);
};
