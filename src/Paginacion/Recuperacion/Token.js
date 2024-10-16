
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import IconTime from "../Login/assets/time-cronometer-svgrepo-com.svg";
import Alert from '../Validaciones/Alerts/Alert.js';
import { baseURL } from '../../api.js';

const Token = () => {
  const [method, setMethod] = useState('1');
  const [tokenUser, setTokenUser] = useState('1');
  const [alert, setAlert] = useState(null);
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false); // Nuevo estado para mostrar el botón de reenviar código
  const [elapsedTime, setElapsedTime] = useState(0); // Nuevo estado para controlar el tiempo transcurrido
  const navigate = useNavigate();
  const location = useLocation();
  const dataUser = location.state;

  const handleMFA = async (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    
    try {
      const response = await fetch(`${baseURL}/sendMethod`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: method,
          email: dataUser.correoElectronico
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setAlert({ type: 'danger', message: data.msg });
        return new Error('Error al enviar el código de verificación');
      } else {
        setAlert({ type: 'success', message: 'Correo enviado con su código' });
      }

      if (method === '2') {
        // Navegar a la página del formulario para la pregunta secreta
        navigate('/pregunta', { state: dataUser });
      } else {
        setShowTokenForm(true);
      }
    } catch (error) {
      setAlert({ type: 'danger', message: error.msg });
    }
  };

  const handleTokenSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = event.target.elements.token.value;
      const response = await fetch(`${baseURL}/validateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: dataUser.ID_usuario,
          token: token,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg);
      }

      navigate('/resetPassword', { state: dataUser });
    } catch (error) {
      setAlert({ type: 'danger', message: error.message });
    }
  };

  const handleResendCode = () => {
    setElapsedTime(0);
    handleMFA();
  };

  useEffect(() => {
    // Actualizar el tiempo transcurrido cada segundo
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);
    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (elapsedTime > 30) {
      setShowResendButton(true);
    }
  }, [elapsedTime]);

  const closeAlert = () => {
    setAlert(null);
  };


  return (
    <div>
      <Header />
      <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="card mb-3">

                  <div class="card-body">

                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Verifica tu identidad</h5>
                      <p class="text-center small"></p>
                    </div>
                    {!showTokenForm ? (
                      <form onSubmit={handleMFA} class="row g-3 needs-validation">

                        <div class="col-12">
                          <label class="form-label">Método de autentificación:</label>
                          <div class="input-group has-validation">
                            <select
                              id="method"
                              className="form-select"
                              value={method}
                              onChange={(e) => setMethod(e.target.value)}
                              aria-label="Default select example"
                            >
                              <option value="1">Correo electrónico</option>
                              <option value="2">Pregunta secreta</option>
                            </select>
                          </div>
                        </div>
                        <p className='my-3'>Envíe un código de verificación a {dataUser.correoElectronico}</p>


                        <div class="col-12">
                          <button class="btn btn-primary w-100" type="submit">Enviar</button>
                        </div>

                      </form>
                    ) : (
                      <form onSubmit={handleTokenSubmit} class="row g-3 needs-validation">

                        <div class="col-12">
                          <label for="yourUsername" class="form-label">Método de autentificación:</label>
                          <div class="input-group has-validation">
                            <input type="number" name="token" class="form-control" placeholder="Ingrese el código"
                             />
                          </div>
                        </div>
                        <p className='my-3'>Envíe un código de verificación a {dataUser.correoElectronico}</p>


                        <div class="col-12">
                          <button class="btn btn-primary w-100" type="submit">Enviar código</button>
                        </div>

                        {showResendButton && (
                          <button
                            type="button"
                            className="btn btn-secondary text-white w-100 mt-3 mb-3 fw-semibold shadow-sm"
                            onClick={handleResendCode}
                          >
                            Reenviar código
                          </button>
                        )}
                      </form>
                    )}
                    {alert && alert.type === 'success' && (
                      <Alert type="success" message={alert.message} onClose={closeAlert} />
                    )}
                    {alert && alert.type === 'danger' && (
                      <Alert type="danger" message={alert.message} onClose={closeAlert} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Token;
