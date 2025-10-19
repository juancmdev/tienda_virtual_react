import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AdminPage from "./pages/AdminPage";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageProductsPage from "./pages/ManageProductsPage";
import { CartProvider } from "./context/CartContext";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import PaymentConfirmationPage from "./pages/PaymentConfirmationPage";

function App() {
  //Estado global para el carrito de compras

  return (
    // ⚠️ Envolvemos todo en el Provider

    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* RUTAS PÚBLICAS */}
          <Route path="/productos" element={<ProductList />} />
          <Route path="/carrito" element={<ShoppingCartPage />} />
          <Route path="/contacto" element={<Contact />} />
          <Route
            path="/confirmacion-pago"
            element={<PaymentConfirmationPage />}
          />

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
    </CartProvider>
  );
}

export default App;
