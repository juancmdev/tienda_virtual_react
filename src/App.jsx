import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <Navbar />
      <ProductList />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
