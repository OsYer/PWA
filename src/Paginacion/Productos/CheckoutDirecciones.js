import React, { useState, useEffect } from "react";
import { Card, Form } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocalStorage } from 'react-use';
import Header from "../../Esquema/Header";
import Footer from "../../Esquema/Footer";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../../api.js';
import './Checkout.css';

const CheckoutDirecciones = () => {
  const [user, setUser] = useLocalStorage('user');
  const [productos, setProductos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const location = useLocation();
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);


  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const direccionId = parseInt(event.target.value);
    setDireccionSeleccionada(direccionId);
  };
  const handleCardClick = (direccionId) => {
    setDireccionSeleccionada(direccionId);
  };

  const handleElegirComoPredeterminado = async () => {
    // console.log(location.pathname);
    try {
      const response = await fetch(`${baseURL}/direccion-envio-predeterminada`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ID_usuario: user.ID_usuario, ID_direccion: direccionSeleccionada })
      });

      if (!response.ok) {
        throw new Error('Error al establecer la dirección como predeterminada');
      }

      navigate('/checkout', {
        state: {
          subtotal: subtotal,
          descuentoAplicado,
          total: total,
          ID_usuario: user.ID_usuario
        }
      });
    } catch (error) {
      console.error('Error al establecer la dirección como predeterminada:', error.message);
    }
  };

  // Extraer los datos del estado
  const { subtotal, descuentoAplicado, total } = location.state;

  useEffect(() => {
    const fetchProductosPedidos = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        try {
          const response = await fetch(`${baseURL}/carrito-compras/${user.ID_usuario}`);
          if (response.ok) {
            const data = await response.json();
            setProductos(data);

          } else {
            console.error("Error al cargar los productos del carrito");
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      } else {

      }
    };

    const fetchDirecciones = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        try {
          const response = await fetch(`${baseURL}/direccion-envio-user/${user.ID_usuario}`);
          if (response.ok) {
            const data = await response.json();
            // console.log(data)
            setDirecciones(data);
            setDireccionSeleccionada(data[0].ID_direccion)
          } else {
            console.error("Error al cargar las direcciones guardadas");
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      }
    };

    fetchDirecciones();
    fetchProductosPedidos();
  }, []);

  const handleAgregarNuevaDireccion = async () => {
    // console.log(location.pathname);
    navigate('/agregar-direccion-envio', {
      state: {
        subtotal: subtotal,
        descuentoAplicado,
        total: total,
        pathEnvio: location.pathname
      }
    })
  };

  return (
    <>
      <Header />
      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <h4>Detalles de facturación</h4>

            <div class="row">

              <div class="col-lg-8 col-md-6">
                <div class="row">
                  <div>
                    <div class="checkout__order">
                      <h4>Mis direcciones</h4>
                      <div>
                        {direcciones.length === 0 ? (
                          <>
                            <ul>
                              <li> No existe ninguna dirección, agregue una
                                <Link to={"/agregar-direccion-envio"}> aquí</Link>
                              </li>
                            </ul>
                          </>
                        ) : (
                          <>
                            {direcciones.map((direccion) => (
                              <div key={direccion.ID_direccion} onClick={() => handleCardClick(direccion.ID_direccion)}>
                                <Card className="my-2 hover-card" >
                                  <Card.Body className="d-flex">
                                    <Form.Check
                                      type="radio"
                                      id={`direccion-${direccion.ID_direccion}`}
                                      name="direccion"
                                      value={direccion.ID_direccion}
                                      checked={direccionSeleccionada === direccion.ID_direccion}
                                      onChange={handleCheckboxChange}
                                      className="align-self-start"
                                    />
                                    <div className="ms-4">
                                      <Card.Title>C.P. {direccion.codigoPostal}</Card.Title>
                                      <Card.Text className="m-0">{direccion.direccion}</Card.Text>
                                      <Card.Text>{direccion.nombre} - {direccion.telefono}</Card.Text>
                                      <Link to={`/editar-direccion-envio/${direccion.ID_direccion}`} className="edit-link">
                                        Editar
                                      </Link>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </div>
                            ))}
                          </>
                        )}

                      </div>

                    </div>
                    <div className="mt-4">
                      <button type="submit" class="site-btn" onClick={() => handleElegirComoPredeterminado()} >Continuar</button>
                      <button type="submit" class="site-btn ms-4" onClick={() => handleAgregarNuevaDireccion()}>Agregar dirección</button>
                    </div>

                  </div>
                </div>

              </div>
              <div class="col-lg-4 col-md-6">
                <div class="checkout__order">
                  <h4>Su pedido</h4>
                  <div class="checkout__order__products">Productos <span>Total</span></div>
                  <ul>
                    {productos.map(producto => (
                      <li key={producto.ID_producto}> {producto.nombre.slice(0, 20)}... <span>${producto.precioFinal.toFixed(2)}</span></li>
                    ))}
                  </ul>
                  <div class="checkout__order__subtotal">Subtotal <span>${subtotal.toFixed(2)}</span></div>
                  {descuentoAplicado && <div class="checkout__order__total">Descuento aplicado (SPORT100): <span>-$100.00</span></div>}
                  <div class="checkout__order__total">Total <span>${total.toFixed(2)}</span></div>

                  <div class="checkout__input__checkbox">
                    <label for="payment">
                      Check Payment
                      <input type="checkbox" id="payment" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="checkout__input__checkbox">
                    <label for="paypal">
                      Paypal
                      <input type="checkbox" id="paypal" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <button type="submit" class="site-btn">REALIZAR PEDIDO</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckoutDirecciones;
