import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import ProductosPage from "./ProductosPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/productos" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/productos"
        element={
          <ProtectedRoute>
            <ProductosPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
