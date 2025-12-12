import { Routes, Route } from "react-router-dom";
import First from "./components/organisms/First";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProductosPage from "./ProductosPage";
import Cart from "./components/pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<First />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/productos"
        element={
          <ProtectedRoute>
            <ProductosPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
