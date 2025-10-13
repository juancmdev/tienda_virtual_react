import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="bg-gray-800 p-4 text-white">
        {/* Queremos poner el logo y la navegación aquí, uno junto al otro */}
        <div className="flex justify-between items-center">
          {/* Lado Izquierdo: El Logo/Título */}
          <div className="text-xl font-bold">Mi Tienda</div>

          {/* Lado Derecho: Los Enlaces de Navegación */}
          <nav>
            {/* Aquí irán los enlaces: Home, Productos, Carrito */}
            <ul className="flex gap-4">
              <li>
                <Link to="/" className="hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/productos"
                  className="hover:text-orange-400 transition"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="hover:text-orange-400 transition"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
