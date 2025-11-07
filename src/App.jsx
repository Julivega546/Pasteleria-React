import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';
function App() {
return (
<Router>
<div>
<h1>producto Management System</h1>
<Routes>
<Route path="/" element={<ProductoList />} />
<Route path="/add" element={<ProductoForm />} />
<Route path="/edit/:id" element={<ProductoForm />} />
</Routes>
</div>
</Router>
);
}
export default App;