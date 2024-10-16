import React, { useState, useEffect } from 'react';
import Header from "../../../Esquema/Header.js";
import Footer from "../../../Esquema/Footer.js";
import { baseURL } from '../../../api.js';
import Sidebar from "../../../Esquema/Sidebar.js";
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

import DOMPurify from 'dompurify';

const AdmProductos = () => {
  const [productos, setProductos] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchSubcategorias();
    fetchMarca();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${baseURL}/list-products-imagenPrincipal-admin`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      console.log(productos)
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${baseURL}/categorias-productos`);
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      // console.log(data)
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubcategorias = async () => {
    try {
      const response = await fetch(`${baseURL}/subcategorias`);
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      // console.log(data)
      setSubcategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMarca = async () => {
    try {
      const response = await fetch(`${baseURL}/marcas`);
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      // console.log(data)
      setMarcas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const producto = productos.find(p => p.ID_producto === id);
    if (!producto) {
      Swal.fire('Error', 'El producto no fue encontrado.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar la membresía "${producto.nombre}". ¡No podrás revertir esto!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Eliminando producto con ID:", id);
        fetch(`${baseURL}/products/${id}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar el producto');
            }
            // No intentar analizar JSON si la respuesta es exitosa y no tiene contenido
            Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
            fetchProductos();
          })
          .catch(error => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          });
      }
    });
  };

  const classStyles = {
    contentHeight: {
      minHeight: '450px'
    }
  };

  function esURLSegura(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  }


  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className='container my-4'>
          <div className={classStyles.contentHeight}>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Productos</h5>
                <button className="btn btn-primary" onClick={() => navigate("/AgregarProducto")}>Agregar Nuevo</button>
              </div>
              <div className="table-responsive scrollbar">
                <table className="table table-hover table-striped overflow-hidden">
                  <thead>
                    <tr>
                      <th scope="col">Imagen</th>
                      <th scope="col">Producto</th>
                      {/* <th scope="col">Descripción</th> */}
                      <th scope="col">Precio</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Subcategoria</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.ID_producto}>
                        {esURLSegura(producto.imagenUrl) ? (
                          <img src={DOMPurify.sanitize(producto.imagenUrl)} alt={producto.nombre} style={{ width: '81px', height: '90px' }} />
                        ) : (
                          <img src="imagen_por_defecto.jpg" alt="Imagen por defecto" style={{ width: '81px', height: '90px' }} />
                        )}
                        <td>{producto.nombre}</td>
                        {/* <td>{producto.descripcion.slice(0, 50)}...</td> */}
                        <td>{producto.precioFinal}</td>
                        <td>{producto.Marca}</td>
                        <td>{producto.Categoria}</td>
                        <td>{producto.Subcategoria}</td>
                        <td>
                          <button onClick={() => navigate(`/EditarProducto/${producto.ID_producto}`)} className="btn btn-primary mb-2">Editar</button>
                          <button onClick={() => handleDelete(producto.ID_producto)} className="btn btn-danger">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdmProductos;
