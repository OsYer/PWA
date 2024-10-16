import React, { useState, useEffect } from 'react';
import Header from "../../../Esquema/Header.js";
import Footer from "../../../Esquema/Footer.js";
import { baseURL } from '../../../api.js';
import Sidebar from "../../../Esquema/Sidebar.js";
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AdmTiposMembresias = () => {
  const [membresias, setMembresias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Agregamos un estado para saber si estamos editando
  const [formData, setFormData] = useState({ ID_tipoMembresia: '', nombre: '', costo: '', ID_UnicoMembresia: '' });

  const modalStyles = {
    modalTransparent: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fondo del modal transparente con opacidad
    }
  };

  useEffect(() => {
    fetchMembresias();
  }, []);

  const fetchMembresias = async () => {
    try {
      const response = await fetch(`${baseURL}/membershipTypes`);
      if (!response.ok) {
        throw new Error('Error al obtener las membresías');
      }
      const data = await response.json();
      setMembresias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const membresia = membresias.find(m => m.ID_tipoMembresia === id);
    if (!membresia) {
      Swal.fire('Error', 'Membresía no encontrada.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar la membresía "${membresia.nombre}". ¡No podrás revertir esto!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Eliminando membresía con ID:", id);
        fetch(`${baseURL}/membershipTypes/${id}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar la membresía');
            }
            // No intentar analizar JSON si la respuesta es exitosa y no tiene contenido
            Swal.fire('Eliminado!', 'La membresía ha sido eliminada.', 'success');
            fetchMembresias(); // Actualizar la lista de membresías
          })
          .catch(error => {
            console.error('Error al eliminar la membresía:', error);
            Swal.fire('Error', 'No se pudo eliminar la membresía.', 'error');
          });
      }
    });
  };

  const handleEdit = (membresia) => {
    setFormData(membresia);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async () => {
    const url = `${baseURL}/membershipTypes/${isEditing ? formData.ID_tipoMembresia : ''}`;
    const method = isEditing ? 'PUT' : 'POST';
    const actionWord = isEditing ? 'actualizada' : 'creada';  // Palabra para indicar la acción en el mensaje

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      fetchMembresias();  // Recargar la lista de membresías
      setShowModal(false);  // Cerrar el modal
      Swal.fire('¡Completado!', `La membresía ha sido ${actionWord} correctamente.`, 'success');  // Mensaje personalizado
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Hubo un problema al procesar la solicitud.', 'error');
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({ ID_tipoMembresia: '', nombre: '', costo: '', ID_UnicoMembresia: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ ID_tipoMembresia: '', nombre: '', costo: '', ID_UnicoMembresia: '' });
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className='container my-4'>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Tipos de Membresías</h5>
              <button className="btn btn-primary" onClick={handleAddNew}>Agregar Nuevo</button>
            </div>
            <div className="table-responsive scrollbar">
              <table className="table table-hover table-striped overflow-hidden">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Costo</th>
                    <th scope="col">ID único membresía</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {membresias.map((membresia) => (
                    <tr key={membresia.ID_tipoMembresia}>
                      <td>{membresia.nombre}</td>
                      <td>{membresia.costo}</td>
                      <td>{membresia.ID_UnicoMembresia}</td>
                      <td>
                        <button onClick={() => handleEdit(membresia)} className="btn btn-primary">Editar</button>
                        <button onClick={() => handleDelete(membresia.ID_tipoMembresia)} className="btn btn-danger ms-2">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para la edición y adición */}
      <Modal show={showModal} onHide={handleCloseModal} style={modalStyles.modalTransparent}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Membresía' : 'Agregar Nueva Membresía'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Costo</label>
              <input type="text" className="form-control" name="costo" value={formData.costo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>ID Único Membresía</label>
              <input type="text" className="form-control" name="ID_UnicoMembresia" value={formData.ID_UnicoMembresia} onChange={handleChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          <Button variant="primary" onClick={handleSaveChanges}>{isEditing ? 'Guardar Cambios' : 'Agregar'}</Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default AdmTiposMembresias;
