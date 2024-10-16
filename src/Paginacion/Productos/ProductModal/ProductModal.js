import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

const ProductModal = ({ producto, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad del alert
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
      setIsLoggedIn(loggedIn);
    }
  }, [navigate]);

  const handlePaymentSuccess = (details, data) => {
    console.log('Pago completado con éxito', details);
    onClose();
  };

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={producto.imagenUrl} alt={`Producto ${producto.ID_producto}`} className="img-fluid" />
          <p><strong>Descripción:</strong></p>
          <p style={{ textAlign: 'justify' }}>{producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precioFinal}</p>
          <PayPalScriptProvider>
            <PayPalButtons
              style={{ layout: 'horizontal' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: producto.precioFinal
                    }
                  }]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  handlePaymentSuccess(details, data);
                });
              }}
            >
            </PayPalButtons>
          </PayPalScriptProvider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductModal;
