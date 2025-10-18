import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AdminPage from "./pages/AdminPage";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageProductsPage from "./pages/ManageProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* RUTAS PÚBLICAS */}
        <Route path="/productos" element={<ProductList />} />
        <Route path="contacto" element={<Contact />} />

        {/* RUTAS DE AUTENTICACIÓN (Fuera del Layout si lo necesitas) */}
        <Route path="/login" element={<LoginPage />} />

        {/* ÁREA PROTEGIDA DEL ADMINISTRADOR */}

        {/* 1. RUTA PRINCIPAL ADMIN: Lista de Gestión (R, U, D) */}
        {/* El administrador aterriza aquí para ver la lista de productos */}
        <Route index element={<Home />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <ManageProductsPage />
            </ProtectedRoute>
          }
        />

        {/* 2. SUBRUTA ADMIN: Formulario de Creación (C) */}
        {/* Si el administrador quiere crear un nuevo producto */}
        <Route
          path="admin/crear"
          element={
            <ProtectedRoute>
              <AdminPage /> {/* Tu formulario de creación original */}
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
