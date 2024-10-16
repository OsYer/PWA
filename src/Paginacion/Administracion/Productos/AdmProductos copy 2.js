import React, { useState, useEffect } from 'react';
import Header from "../../../Esquema/Header.js";
import Footer from "../../../Esquema/Footer.js";
import { baseURL } from '../../../api.js';
import Sidebar from "../../../Esquema/Sidebar.js";
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import DOMPurify from 'dompurify';

const AdmProductos = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [existencias, setExistencias] = useState(0);
  const [ID_categoria, setIDCategoria] = useState('');
  const [ID_subcategoria, setIDSubcategoria] = useState('');
  const [ID_marca, setIDMarca] = useState('');

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    ID_producto: '',
    nombre: '',
    descripcion: '',
    precio: '',
    descuento: '',
    precioFinal: '',
    existencias: '',
    ID_categoria: '',
    ID_marca: '',
    ID_subcategoria: '',
  });


  const [selectedProduct, setSelectedProduct] = useState(null);

  const modalStyles = {
    modalTransparent: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const precioFinal = formData.precio - formData.descuento;
    console.log("precioFinal", formData)

    const url = `${baseURL}/products/${isEditing ? formData.ID_producto : ''}`;
    const method = isEditing ? 'PUT' : 'POST';
    const formDataWithPrecioFinal = { ...formData, precioFinal };
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithPrecioFinal),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      fetchProductos();
      setShowModal(false);
      Swal.fire('¡Completado!', `El producto ha sido ${isEditing ? 'actualizado' : 'agregado'} correctamente.`, 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Hubo un problema al procesar la solicitud.', 'error');
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

  const handleEdit = (producto) => {
    setFormData(producto);
    console.log("formData", formData)
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({
      ID_producto: '',
      nombre: '',
      descripcion: '',
      precio: '',
      descuento: '',
      precioFinal: '',
      existencias: '',
      ID_categoria: '',
      ID_marca: '',
      ID_subcategoria: '',
    });
    setShowModal(true);
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

  const precioFinal = formData.precio - formData.descuento;

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
                <button className="btn btn-primary" onClick={handleAddNew}>Agregar Nuevo</button>
              </div>
              <div className="table-responsive scrollbar">
                <table className="table table-hover table-striped overflow-hidden">
                  <thead>
                    <tr>
                      <th scope="col">Imagen</th>
                      <th scope="col">Producto</th>
                      <th scope="col">Descripción</th>
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
                        <td>{producto.descripcion.slice(0, 50)}...</td>
                        <td>{producto.precioFinal}</td>
                        <td>{producto.Marca}</td>
                        <td>{producto.Categoria}</td>
                        <td>{producto.Subcategoria}</td>
                        <td>
                          <button onClick={() => handleEdit(producto)} className="btn btn-primary mb-2">Editar</button>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} style={modalStyles.modalTransparent}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre del Producto</label>
              <textarea className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Precio</label>
              <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Descuento</label>
              <input type="number" className="form-control" name="descuento" value={formData.descuento} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Precio Final</label>
              <input type="number" className="form-control" value={precioFinal} disabled />
            </div>
            <div className="form-group">
              <label>Existencias</label>
              <input type="number" className="form-control" name="existencias" value={formData.existencias} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select className="form-control" name="ID_categoria" value={formData.ID_categoria} onChange={handleChange} required>
                <option value="">Seleccionar Categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria.ID_categoria} value={categoria.ID_categoria}>{categoria.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Marca</label>
              <select className="form-control" name="ID_marca" value={formData.ID_marca} onChange={handleChange} required>
                <option value="">Seleccionar Marca</option>
                {marcas.map(marca => (
                  <option key={marca.ID_marca} value={marca.ID_marca}>{marca.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Subcategoría</label>
              <select className="form-control" name="ID_subcategoria" value={formData.ID_subcategoria} onChange={handleChange} required>
                <option value="">Seleccionar Subcategorías</option>
                {subcategorias.map(subcategoria => (
                  <option key={subcategoria.ID_subcategoria} value={subcategoria.ID_subcategoria}>{subcategoria.nombre}</option>
                ))}
              </select>
            </div>
            <Button variant="primary" type="submit">{isEditing ? 'Guardar Cambios' : 'Agregar Producto'}</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default AdmProductos;
