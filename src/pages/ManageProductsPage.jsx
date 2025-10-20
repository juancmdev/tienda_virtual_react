import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const ManageProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); //Estado de carga
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();

  const { handleLogout } = useAuth();

  const onLogoutClick = () => {
    handleLogout(); // 1. Limpia el estado global y localStorage
    navigate("/login"); // 2. Redirige, usando el hook que SÍ es válido aquí
  };

  //Función DELETE (ruta está protegida con JWT)
  const handleDelete = async (productId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?"))
      return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Acción no autorizada. Por favor, inicia sesión de nuevo.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/productos/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        alert(`✅ Producto eliminado exitosamente!`);
        // Actualizar la UI: Eliminar el producto del estado
        setProducts((prevProducts) => {
          return prevProducts.filter((p) => p._id !== productId);
        });
      } else {
        const errorData = await response.json();
        alert(
          `❌ Error al eliminar producto: ${
            errorData.mensaje || "Respuesta de servidor no exitosa"
          }`
        );
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/productos"); //fetch a la URL de productos
        const data = await response.json();
        if (response.ok) {
          setProducts(data); //Actualizo el estado de productos
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false); // Opcional: Terminamos la carga
      }
    };

    fetchProducts();
  }, []); // Dependencia: [] para que solo se ejecute al montar

  //EDITAR PRODUCTOS
  const handleEdit = (productId) => {
    //Buscar el producto completo en el estado 'products'
    const productToEdit = products.find((p) => p._id === productId);
    if (productToEdit) {
      // Clonamos el objeto para evitar modificar el estado directamente
      setEditingProduct({ ...productToEdit });

      // Opcional: Desplazar la vista al formulario si está arriba
      document
        .getElementById("edit-form-anchor")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // -----------------------------------------------------------------
  // CRUD: UPDATE - Handler para capturar cambios en el formulario
  // -----------------------------------------------------------------
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado 'editingProduct' con los cambios
    setEditingProduct((prevProduct) => ({
      ...prevProduct,
      // Convertir precio a número si el campo es de precio
      // El || 0 asegura que si el input está vacío, el valor sea 0, no NaN
      [name]: name === "precio" ? parseFloat(value) || 0 : value,
    }));
  };

  // -----------------------------------------------------------------
  // CRUD: UPDATE - Handler para enviar la actualización
  // -----------------------------------------------------------------
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:5000/api/productos/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingProduct),
        }
      );

      if (response.ok) {
        alert(`✅ Producto ${editingProduct.nombre} actualizado exitosamente!`);
        //Actualizar la lista de productos en la UI (el corazón del Update)
        setProducts((prevProducts) => {
          return prevProducts.map(
            (p) => (p._id === editingProduct._id ? editingProduct : p) // Reemplazamos el antiguo por el nuevo
          );
        });

        // Ocultar el formulario
        setEditingProduct(null);
      } else {
        const errorData = await response.json();
        alert(
          `❌ Error al actualizar producto: ${errorData.mensaje} || 'Error desconocido'`
        );
      }
    } catch (error) {
      console.error("Error en PUT", error);
      alert("❌ Error al actualizar el producto.");
    }
  };

  //--------------------------------------------------------------------
  //Lógica de filtrado
  //---------------------------------------------------------------------
  const productosFiltrados = products.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-20 text-xl">Cargando productos</div>; // Opcional: Muestra un mensaje de carga
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="text-center p-20 text-xl">
        No hay productos para mostrar.
      </div>
    );
  }

  const handleCreateProduct = () => {
    navigate("/admin/crear");
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-end gap-3 items-center mb-6">
        {/* Botón para Crear Producto */}
        <button
          onClick={handleCreateProduct}
          className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline transition durration-150 cursor-pointer"
        >
          Crear producto
        </button>

        {/* Botón de Cerrar Sesión */}
        <button
          onClick={onLogoutClick}
          className="mb-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* ⚠️ Punto de anclaje para el scroll (opcional) */}
      <div id="edit-form-anchor"></div>

      {/* ⚠️ FORMULARIO DE EDICIÓN - Visible solo si hay un producto seleccionado */}
      {editingProduct && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-xl border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            Editando Producto: {editingProduct.nombre}
          </h2>

          {/*Al enviar, llama a handleUpdateSubmit */}
          <form onSubmit={handleUpdateSubmit}>
            {/* Campo Nombre */}
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                // 2. Value debe ser el valor actual del estado
                value={editingProduct.nombre}
                // 3. Al cambiar, llama a handleEditChange
                onChange={handleEditChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            {/* Campo Descripción */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={editingProduct.descripcion}
                onChange={handleEditChange}
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
                value={editingProduct.categoria}
                onChange={handleEditChange}
                className="cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                <option value="Ambientadores">Ambientadores</option>
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
                value={editingProduct.urlImagen}
                onChange={handleEditChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                placeholder="http://..."
              />
            </div>

            {/* Campo Precio */}
            <div className="mb-4">
              <label
                htmlFor="precio"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Precio
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={editingProduct.precio}
                onChange={handleEditChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            {/* Puedes añadir más campos (descripción, urlImagen, etc.) aquí */}

            {/* Botones de Acción */}
            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                // Al cancelar, simplemente oculta el formulario
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">
        Gestión de Productos
      </h1>

      {/*Barra de búsqueda */}
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar Productos..."
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Grid de productos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosFiltrados.map((producto) => (
          // Usamos la propiedad `key` con el id único del producto
          <ProductCard
            key={producto._id} // Usamos _id de MongoDB
            id={producto._id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            urlImagen={producto.urlImagen}
            precio={producto.precio}
            //FUNCIÓN DE ELIMINAR
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            //⚠️ INDICAR QUE ESTA ES LA VISTA DE ADMIN
            isAdmin={true} // Le decimos a ProductCard que es la vista pública
          />
        ))}
      </div>
    </div>
  );
};

export default ManageProductsPage;
