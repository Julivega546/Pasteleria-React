import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductoService from './service/ProductoService';
const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        fetchProductos();
    }, []);
    const fetchProductos = () => {
        ProductoService.getAllProductos().then(response => {
            setProductos(response.data);
        }).catch(error => {
            console.log('Error fetching productos:', error);
        });
    };
    const deleteProducto = (id) => {
        ProductoService.deleteProducto(id).then(() => {
            fetchProductos();
        }).catch(error => {

        });
    };
    return (
        <div>
            <h2>Productos List</h2>
            <Link to="/add">Add New Producto</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>
                                <Link to={`/edit/${producto.id}`}>Edit</Link>
                                <button onClick={() => deleteProducto(producto.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ProductoList;