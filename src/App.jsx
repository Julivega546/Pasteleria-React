import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProductosPage from "./ProductosPage";
import ProductoList from "./ProductoList";
import ProductoForm from "./ProductoForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <h1>Producto Management System</h1>

      <Routes>
        
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
          path="/"
          element={
            <ProtectedRoute>
              <ProductoList />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <ProductoForm />
            </ProtectedRoute>
          }
        />

        
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <ProductoForm />
            </ProtectedRoute>
          }
        />

        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
