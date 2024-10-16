import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import { useLocalStorage } from 'react-use';
import { baseURL } from '../../api.js';
import Sidebar from "../../Esquema/Sidebar.js";
import paypal from '../assest/paypal_checkout.png';
import { FaCheck } from "react-icons/fa";
const DetalleCompra = () => {
  const [user, setUser] = useLocalStorage('user');
  const { ID_pedido } = useParams();
  const navigate = useNavigate();
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("para", ID_pedido)
    const fetchDetallesPedido = async () => {
      try {
        const response = await fetch(`${baseURL}/orden-pedido-detalle-pedido/${ID_pedido}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del pedido');
        }
        const data = await response.json();
        console.log(data)
        const detalles = Array.isArray(data) ? data : [data];
        setDetallesPedido(detalles);
        setCargando(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetallesPedido();
  }, [ID_pedido]);

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="container my-4">
          <button className="btn btn-secondary mb-3" onClick={() => navigate('/mis-compras')}>Regresar a Mis Compras</button> {/* Botón de regreso */}
          <div className="card mb-3">
            <div className="card-body position-relative">
              <h5>Detalles del pedido: #{ID_pedido}</h5>
              {detallesPedido.length > 0 && (
                <>
                  <p className="fs-10">
                    {new Date(detallesPedido[0].fecha).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </p>
                  <div>
                    <strong className="me-2">Estatus: </strong>
                    <div className="badge text-bg-success">
                      {detallesPedido[0].operacion_status}
                      <FaCheck className='ms-1'/>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                  <h5 className="mb-3 fs-9">Dirección de Envio</h5>
                  <h6 className="mb-2">{detallesPedido[0]?.nombre} {detallesPedido[0]?.apellidos}</h6>
                  <p className="mb-1 fs-10">{detallesPedido[0]?.colonia}<br />{detallesPedido[0]?.ciudad}, {detallesPedido[0]?.estado} {detallesPedido[0]?.codigoPostal}</p>
                  <p className="mb-0 fs-10"> <strong>Teléfono: </strong><a href={`tel:${detallesPedido[0]?.telefono}`}>{detallesPedido[0]?.telefono}</a></p>
                </div>
                <div className="col-md-6 col-lg-4">
                  <h5 className="mb-3 fs-9">Método de pago</h5>
                  <div className="d-flex"><img className="me-3" src={paypal} width="55" height="45" alt="PayPal" />
                    <div className="flex-1">
                      <h6 className="mb-0">{detallesPedido[0]?.nombre} {detallesPedido[0]?.apellidos}</h6>
                      <p className="mb-0 fs-10">**** **** **** 9809</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              {cargando ? (
                <div>Cargando detalles del pedido...</div>
              ) : (
                <div className="table-responsive fs-10">
                  <table className="table table-striped border-bottom">
                    <thead className="bg-200">
                      <tr>
                        <th className="text-900 border-0">Productos</th>
                        <th className="text-900 border-0 text-center">Cantidad</th>
                        <th className="text-900 border-0 text-end">Precio Unitario</th>
                        <th className="text-900 border-0 text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detallesPedido.map(detalle => (
                        <tr key={detalle.ID_detalle} className="border-200">
                          <td className="align-middle">
                            <h6 className="mb-0 text-nowrap">{detalle.producto.slice(0, 50)}...</h6>
                            <p className="mb-0">{detalle.descripcion}</p>
                          </td>
                          <td className="align-middle text-center">{detalle.cantidad}</td>
                          <td className="align-middle text-end">${detalle.precioUnitario.toFixed(2)}</td>
                          <td className="align-middle text-end">${(detalle.precioUnitario * detalle.cantidad).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetalleCompra;
