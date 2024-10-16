import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { FaHome } from "react-icons/fa";
import { Card, OverlayTrigger, Popover } from 'react-bootstrap';
import Header from "../../../Esquema/Header.js";
import Footer from "../../../Esquema/Footer.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Sidebar from "../../../Esquema/Sidebar.js";
import { baseURL } from '../../../api.js';
import Swal from 'sweetalert2';
import iconAddress from "../images/address-svgrepo-com.svg";

const MisDirecciones = () => {
  const [userImage, setUserImage] = useState(null);
  const [direcciones, setDirecciones] = useState([]);
  const [user, setUser] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direccionEliminar, setDirrecionEliminar] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const modalStyles = {
    modalTransparent: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)' // Fondo del modal transparente con opacidad
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDirecciones = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
        try {
          const response = await fetch(`${baseURL}/direccion-envio-user/${user.ID_usuario}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            setDirecciones(data);
          } else {
            console.error("Error al cargar las direcciones guardadas");
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      } else {

      }
    };

    fetchDirecciones();
  }, []);

  const handleEliminarDireccion = (ID_producto) => {
    setDirrecionEliminar(ID_producto);
    setIsModalOpen(true)
  };

  const confirmarEliminacion = async () => {
    if (direccionEliminar) {
      try {
        const response = await fetch(`${baseURL}/direccion-envio/${direccionEliminar}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setIsModalOpen(false);
          window.location.reload();
        } else {
          throw new Error(`Error al eliminar el producto: ${response.status}`);
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error.message);
        // Mostrar SweetAlert2 alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar la dirección. Por favor, inténtalo de nuevo más tarde.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  const handleElegirComoPredeterminado = async (ID_direccion) => {
    try {
      const response = await fetch(`${baseURL}/direccion-envio-predeterminada`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ID_usuario: user.ID_usuario, ID_direccion })
      });

      if (!response.ok) {
        throw new Error('Error al establecer la dirección como predeterminada');
      }

      // Mostrar SweetAlert2 alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Dirección predeterminada establecida!',
        text: 'La dirección se ha establecido como predeterminada correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      console.error('Error al establecer la dirección como predeterminada:', error.message);
      // Mostrar SweetAlert2 alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al establecer la dirección como predeterminada. Por favor, inténtalo de nuevo más tarde.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      });
    }
  };


  const cancelarEliminacion = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="main mt-4 p-3">
          <h4 className="text-center mb-4">Mis direcciones</h4>
          <section className="mb-4 custom-section">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/perfil')}>Regresar al perfil</button> {/* Botón de regreso */}
            <div className="card">
              <Link to={'/agregar-direccion-envio/'} className="btn btn-danger mt-1 mb-4 wd-50">
                Agregar una nueva direccion
              </Link>
              {direcciones.map((direccion) => (
                <>
                  <Card className="my-2 hover-card position-relative">
                    <Card.Body className="d-flex">
                      <FaHome size={20} />
                      <div className="ms-4">
                        <Card.Title>C.P. {direccion.codigoPostal}</Card.Title>
                        <Card.Text className="m-0">{direccion.direccion}</Card.Text>
                        <Card.Text className="m-0">{direccion.referencias}</Card.Text>
                        <Card.Text>{direccion.nombre} - {direccion.telefono}</Card.Text>
                        <Link to={`/editar-direccion-envio/${direccion.ID_direccion}`} className="edit-link">
                          Editar
                        </Link>
                      </div>
                    </Card.Body>
                    <div class="btn-group dropstart position-absolute top-1 end-0 me-3">
                      <div data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FiMoreVertical size={20} />
                      </div>
                      <div class="dropdown-menu">
                        <button class="dropdown-item" onClick={() => handleElegirComoPredeterminado(direccion.ID_direccion)}>
                          Elegir como predeterminado
                        </button>
                        <button class="dropdown-item" onClick={() => handleEliminarDireccion(direccion.ID_direccion)}>
                          Eliminar
                        </button>
                      </div>
                    </div>

                  </Card>
                </>

              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} style={modalStyles.modalTransparent}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta dirección de envío?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarEliminacion}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarEliminacion}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MisDirecciones;
