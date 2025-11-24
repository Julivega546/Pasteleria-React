import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductosPage from "../pages/ProductosPage";

import ProductoList from "../components/ProductoList";
import ProductoForm from "../components/ProductoForm";

import ProtectedRoute from "../routes/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <h1>Producto Management System</h1>

          <Routes>

            {/* 🔹 LOGIN */}
            <Route path="/login" element={<LoginPage />} />

            {/* 🔹 REGISTRO */}
            <Route path="/register" element={<RegisterPage />} />

            {/* 🔹 PRODUCTOS (Vista principal protegida) */}
            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <ProductosPage />
                </ProtectedRoute>
              }
            />

            {/* 🔹 LISTA DE PRODUCTOS CRUD */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ProductoList />
                </ProtectedRoute>
              }
            />

            {/* 🔹 AGREGAR PRODUCTO */}
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <ProductoForm />
                </ProtectedRoute>
              }
            />

            {/* 🔹 EDITAR PRODUCTO */}
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <ProductoForm />
                </ProtectedRoute>
              }
            />

            {/* 🔹 Redirigir rutas no existentes */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
