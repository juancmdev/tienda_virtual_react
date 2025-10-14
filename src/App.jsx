import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AdminPage from "./pages/AdminPage";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
