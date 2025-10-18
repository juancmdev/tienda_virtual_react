import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    urlImagen: "",
    precio: 0,
    categoría: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convertimos el precio a número si el campo es 'precio', sino lo dejamos como string.
    const newValue = name === "precio" ? parseFloat(value) || 0 : value;

    setNewProduct((prev) => ({
      ...prev,
      // Esta es la clave: [name] usa el valor de la variable 'name' como la clave del objeto.
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //Leer el token desde localStorage
      const token = localStorage.getItem("authToken");

      //¡Validación de seguridad
      if (!token) {
        alert("No estás autenticado. Por favor, inicia sesión de nuevo.");
        navigate("/login");
        return; //Detiene la función si no hay token
      }

      const response = await fetch("http://localhost:5000/api/productos", {
        // 1. Método HTTP: Es POST para CREAR un recurso
        method: "POST",

        // 2. Encabezados: Le decimos al Backend que el cuerpo es JSON
        headers: {
          "Content-Type": "application/json",
          //Adjuntar el token JWT al header de autorización
          Authorization: `Bearer ${token}`,
        },

        // 3. Cuerpo: Convertimos el objeto de React a una cadena JSON
        body: JSON.stringify(newProduct),
      });

      // Lógica para manejar la respuesta del servidor
      if (response.ok) {
        alert("✅ Producto agregado exitosamente!");
        // Opcional: Limpiar el formulario después de la inserción
        setNewProduct({
          nombre: "",
          descripcion: "",
          urlImagen: "",
          precio: 0,
        });
      } else {
        // Manejar errores como validación fallida (ej. falta el nombre)
        const errorData = await response.json();
        alert(
          `❌ Error al agregar producto: ${
            errorData.mensaje || "Respuesta de servidor no exitosa"
          }`
        );
      }
    } catch (error) {
      console.error("Error al enviar el producto:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">
        Panel de Administración
      </h1>

      {/* Botón de Cerrar Sesión */}
      <button
        onClick={handleLogout}
        className="mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 cursor-pointer"
      >
        Cerrar Sesión
      </button>

      <form
        className="bg-white p-6 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Campo Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={newProduct.nombre}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Ej. Teclado Mecánico Pro"
          />
        </div>

        {/* Campo Descripción */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={newProduct.descripcion}
            onChange={handleChange}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Descripción detallada del producto..."
          ></textarea>
        </div>

        {/* Campo Categoría */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Categoría
          </label>
          <select
            name="categoria"
            value={newProduct.categoria}
            onChange={handleChange}
            className="cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option value="computadoras">Computadoras</option>
            <option value="accesorios">Accesorios</option>
            <option value="monitores">Monitores</option>
            <option value="software">Software</option>
          </select>
        </div>

        {/* Campo URL Imagen */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            URL Imagen
          </label>
          <input
            type="text"
            name="urlImagen"
            value={newProduct.urlImagen}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="http://..."
          />
        </div>

        {/* Campo Precio */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Precio ($)
          </label>
          <input
            type="number"
            name="precio"
            value={newProduct.precio}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="0.00"
          />
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 cursor-pointer"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
