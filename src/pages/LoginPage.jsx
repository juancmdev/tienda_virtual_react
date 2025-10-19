import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setToken, setIsAuthenticated, setUser } = useAuth();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault(); // Detener el envío del formulario

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ¿Qué objeto de estado se convierte a JSON y se envía en el body?
        body: JSON.stringify(login),
      });

      const data = await response.json();

      // ... lógica de respuesta
      if (!response.ok) {
        //Si no es OK, lanzamos un error con el mensaje que viene del Backend
        // (ej. 'Credenciales inválidas')
        throw new Error(data.mensaje || "Error desconocido al iniciar sesión.");
      } else {
        // Guardar el Token en localStorage. Usaremos 'authToken' como nombre de clave.
        localStorage.setItem("authToken", data.token); // data.token viene del Backend

        // (Opcional, pero útil) Guardar el email del usuario
        localStorage.setItem("userEmail", data.user.email);

        //Contexto: Guardar el token en el estado global
        setToken(data.token); // 👈 NUEVO

        //Contexto: Guardar la información del usuario en el estado global
        setUser(data.user); // 👈 NUEVO

        //Contexto: Marcar como autenticado
        setIsAuthenticated(true); // 👈 NUEVO

        //Redirigir al panel de administración
        navigate("/admin"); // Redirige a la ruta /admin

        alert("✅ Sesión iniciada correctamente.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-150px)]">
      <form
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
        // La función onSubmit la crearemos en el siguiente paso
        onSubmit={handleSubmitLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Acceso de Administrador
        </h2>

        {/* Campo de Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            // CONEXIÓN 1: Muestra el valor del estado
            value={login.email}
            // CONEXIÓN 2: Llama a la función al escribir
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            // CONEXIÓN 1: Muestra el valor del estado
            value={login.password}
            // CONEXIÓN 2: Llama a la función al escribir
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
