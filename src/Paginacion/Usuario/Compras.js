import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Esquema/Header.js';
import Footer from '../../Esquema/Footer.js';
import { useLocalStorage } from 'react-use';
import Sidebar from "../../Esquema/Sidebar.js";
import { baseURL } from '../../api.js';

const Compras = () => {
  const [detallesPorPedido, setDetallesPorPedido] = useState({});
  const [cargando, setCargando] = useState(true);

  const [user, setUser] = useLocalStorage('user');
  const navigate = useNavigate();

  useEffect(() => {
    const id = user.ID_usuario;
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/detalles-pedido-usuario/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las compras');
        }
        const data = await response.json();

        // Ordenar los detalles por fecha en orden descendente
        data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // Objeto para almacenar los detalles de pedido agrupados por ID_pedido
        const detallesAgrupados = {};

        // Iterar sobre los detalles de pedido
        data.forEach((detalle) => {
          const { ID_pedido, precioUnitario, cantidad } = detalle;

          const total = precioUnitario * cantidad;

          // Añadir el total al detalle
          const detalleConTotal = { ...detalle, total };

          // Si el ID_pedido aún no está en el objeto, crear una nueva entrada
          if (!detallesAgrupados[ID_pedido]) {
            detallesAgrupados[ID_pedido] = [];
          }
          // Agregar el detalle de pedido a la lista correspondiente al ID_pedido
          detallesAgrupados[ID_pedido].push(detalleConTotal);
        });

        console.log('Detalles agrupados:', detallesAgrupados);
        setDetallesPorPedido(detallesAgrupados);
        setCargando(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user.ID_usuario]);

  const handleDetailClick = (idPedido) => {
    navigate(`/detalle-compra/${idPedido}`);
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className='main mt-4 p-3'>
          <h4 className='text-center mb-4'>Mis compras</h4>
          <section className="mb-4 custom-section">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/perfil')}>Regresar al perfil</button> {/* Botón de regreso */}
            <p className=''>Mi registro de compras</p>
            <div className="row">
              <div className="card">

                {cargando ? (
                  <div>Cargando historial de compras...</div>
                ) : (
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-0">
                      <h5 className="card-title">Compras</h5>
                    </div>
                    {Object.keys(detallesPorPedido).sort((a, b) => {
                      // Ordenar las llaves de ID_pedido por la fecha del primer detalle en orden descendente
                      const fechaA = new Date(detallesPorPedido[a][0].fecha);
                      const fechaB = new Date(detallesPorPedido[b][0].fecha);
                      return fechaB - fechaA;
                    }).map((idPedido) => {
                      const detalles = detallesPorPedido[idPedido];
                      const fechaPedido = detalles.length > 0 ? new Date(detalles[0].fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

                      return (
                        <div key={idPedido} className="card mb-3">
                          <div className="card-header">
                            {fechaPedido}
                          </div>
                          <div className="card-body">
                            {detalles.map((detalle) => (
                              <div key={detalle.ID_detalle} className="row mb-3">
                                <div className="col-md-3">
                                  <img src={detalle.imagenUrl} alt={detalle.nombre} style={{ width: '100px', height: '100px' }} />
                                </div>
                                <div className="col-md-6">
                                  <h5 className="card-title">{detalle.nombre.slice(0, 50)}...</h5>
                                  <p className="card-text">Cantidad: {detalle.cantidad}</p>
                                  <p className="card-text">Total: ${detalle.total.toFixed(2)}</p>
                                </div>
                                <div className="col-md-3 text-end">
                                  <button className="btn btn-primary mb-2" onClick={() => handleDetailClick(idPedido)}>Ver Detalle</button>
                                  {/* <button className="btn btn-secondary">Botón 2</button> */}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Compras;
