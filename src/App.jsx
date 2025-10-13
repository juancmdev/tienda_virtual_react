import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AdminPage from "./pages/AdminPage";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
