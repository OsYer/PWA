import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import IconPassword from "../Login/assets/password-icon.svg";
import { baseURL, fetchData } from '../../api.js';
import Alert from '../Validaciones/Alerts/Alert.js';

const Recuperacion = () => {
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // Cierra la alerta después de 5 segundos (o ajusta según tu necesidad)
    setTimeout(() => setAlert(null), 5000);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleRecuperacion = async (event) => {
    event.preventDefault();

    try {
      if (!correo) {
        showAlert('danger', 'Por favor, ingresa tu correo electrónico.');
        return;
      }
      const response = await fetchData(`${baseURL}/users/email/${encodeURIComponent(correo)}`);
      const userData = await response.json();
      // console.log("userData", userData);

      if (response.ok) {
        navigate('/validacion', { state: userData });
      } else {
        let alertType = 'danger';
        let errorMessage = '';
        if (response.status === 400) {
          errorMessage = 'Solicitud incorrecta. Por favor proporcione correo electrónico y contraseña';
        }
        else if (response.status === 401) {
          errorMessage = 'Usuario no autorizado. Verifica tus credenciales.';
        } else if (response.status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else if (response.status === 500) {
          errorMessage = 'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.';
        } else {
          const errorData = await response.json();
          errorMessage = errorData.msg || 'Error desconocido';
        }
        showAlert(alertType, errorMessage);
        return;
      }
    } catch (error) {
      showAlert('danger', 'Error al procesar la solicitud. Por favor, intenta nuevamente.');
    }
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
                      <h5 class="card-title text-center pb-0 fs-4">Recuperar Contraseña</h5>
                      <p class="text-center small">Ingrese su correo electrónico para continuar</p>
                    </div>

                    <form onSubmit={handleRecuperacion} class="row g-3 needs-validation" >

                      <div class="col-12">
                        <label for="yourUsername" class="form-label">Correo electrónico:</label>
                        <div class="input-group has-validation">
                        
                          <input type="email" 
                            name="email" 
                            required 
                            class="form-control"
                            placeholder="Ingrese tu correo electrónico"
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)} />
                          <div class="invalid-feedback">Por favor, ingrese su correo electrónico.</div>
                        </div>
                      </div>

                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">Acceso</button>
                      </div>
                      {alert && alert.type === 'danger' && (
                        <Alert type="danger" message={alert.message} onClose={closeAlert} />
                      )}
                      <div class="col-12">
                        <p class="small mb-0">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                      </div>

                    </form>

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

export default Recuperacion;