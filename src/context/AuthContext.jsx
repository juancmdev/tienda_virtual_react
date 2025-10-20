import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Lógica de persistencia de sesión
  useEffect(() => {
    //Intentar obtener el token de localStorage
    const savedToken = localStorage.getItem("authToken");

    if (savedToken) {
      //Si hay token, restaurar el estado de autenticación
      setToken(savedToken);
      setIsAuthenticated(true);

      //(Opcional, pero recomendado) Intentar obtener la info del usuario
      // Nota: Si solo guardaste el email, lo puedes usar. Si guardaste el JSON del usuario,
      // tendrías que hacer JSON.parse(localStorage.getItem('user'));
      const savedUser = localStorage.getItem("userEmail");
      if (savedUser) {
        // Asumimos que guardaste el email. Lo guardamos en el estado 'user'
        // como un objeto simple para que no sea null.
        setUser({ email: savedUser });
      }
    }
  }, []); // 👈 Array vacío para que solo se ejecute al montar

  //-----------------------------------------------------------------
  //Función para cerrar seción
  //-----------------------------------------------------------------
  const handleLogout = () => {
    console.log("LOGOUT: Ejecutando limpieza de persistencia...");

    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue = {
    //ESTADOS (Lo que los componentes necesitan LEER)
    isAuthenticated, // Para saber si mostrar /admin o /login
    token, // Para incluirlo en los headers de las peticiones protegidas
    user, // Para mostrar el nombre del admin, por ejemplo

    //SETTERS (Lo que los componentes necesitan CAMBIAR)
    setIsAuthenticated, // Lo necesitarás para la función de logout
    setToken, // Lo necesitarás en LoginPage para guardar el token devuelto
    setUser, // Lo necesitarás en LoginPage para guardar los datos del usuario
    handleLogout, // Lo necesitarás en Layout para cerrar sesión
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
