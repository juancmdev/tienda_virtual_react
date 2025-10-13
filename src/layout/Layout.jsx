import { Outlet } from "react-router-dom"; // <--- ¡Importamos Outlet!
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        {/* Por ahora, solo texto temporal */}
        <Navbar />
      </header>

      <main className="flex-grow container mx-auto p-4">
        {/* ¡Aquí se renderizará el contenido de la ruta anidada! */}
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
