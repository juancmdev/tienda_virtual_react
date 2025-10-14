import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  // Este hook se ejecuta cada vez que el componente se monta
  useEffect(() => {
    // 1. Leer el token de localStorage
    const token = localStorage.getItem("authToken");

    // 2. Verificar si el token NO existe
    if (!token) {
      // 3. Si no hay token, redirigir
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]); // El array de dependencia asegura que se ejecute solo cuando navigate cambie

  // 3. Renderizado Condicional: Muestra 'Cargando...' hasta que el chequeo termine
  if (isLoading) {
    // Podríamos poner un spinner aquí, pero un div simple es suficiente por ahora
    return (
      <div className="text-center p-20 text-xl font-bold">
        Verificando sesión...
      </div>
    );
  }
  // 4. Si el código llega hasta aquí (el token existe), se renderizan los hijos
  return children;
};

export default ProtectedRoute;
