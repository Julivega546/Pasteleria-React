import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductoService from '../service/ProductoService';
const ProductoForm = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            ProductoService.getProductoById(id).then(response => {
                setNombre(response.data.Nombre);
                setDescripcion(response.data.Descripcion);
            });
        }
    }, [id]);
    const saveOrUpdateProducto = (e) => {
        e.preventDefault();
        const producto = { nombre, descripcion };
        if (id) {
            ProductoService.updateProducto(id, producto).then(() => {
                navigate('/');
            });
        } else {
            ProductoService.createProducto(producto).then(() => {
                navigate('/');
            });
        }
    };
    return (
        <div>
            <h2>{id ? 'Edit Producto' : 'Add Producto'}</h2>
            <form onSubmit={saveOrUpdateProducto}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};
export default ProductoForm;