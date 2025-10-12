const Navbar = () => {
  return (
    <>
      <header className="bg-gray-800 p-4 text-white">
        {/* Queremos poner el logo y la navegación aquí, uno junto al otro */}
        <div className="flex justify-between items-center">
          {/* Lado Izquierdo: El Logo/Título */}
          <div className="text-xl font-bold">Mi Tienda</div>

          {/* Lado Derecho: Los Enlaces de Navegación */}
          <nav>{/* Aquí irán los enlaces: Home, Productos, Carrito */}</nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
