import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Alert from '../Validaciones/Alerts/Alert.js';
import { baseURL, fetchData } from '../../api.js';
import Header from '../../Esquema/Header.js';
import Footer from '../../Esquema/Footer';
import ProgressBar from 'react-bootstrap/ProgressBar';
import weakPasswords from './ListNegra.js';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const dataUser = location.state;

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmContrasena, setMostrarConfirmContrasena] = useState(false);
  const [alert, setAlert] = useState(null);
  const [contrasenaError, setContrasenaError] = useState([]);
  const [contrasenaFuerza, setContrasenaFuerza] = useState('');
  const [blacklisted, setBlacklisted] = useState(false);

  const validarContrasena = (password, confirmation) => {
    const mayusculas = /[A-Z]/;
    const minusculas = /[a-z]/;
    const numeros = /\d/;
    const caracteres = /[!@#$%^&*()\-_=+{};:,<.>]/;

    const errors = [];

    if (password.length < 8) {
      errors.push("- La contraseña debe tener al menos 8 caracteres.");
    }

    if (!mayusculas.test(password)) {
      errors.push("- La contraseña debe tener al menos una letra mayúscula.");
    }

    if (!minusculas.test(password)) {
      errors.push("- La contraseña debe tener al menos una letra minúscula.");
    }

    if (!numeros.test(password)) {
      errors.push("- La contraseña debe tener al menos un número.");
    }

    if (!caracteres.test(password)) {
      errors.push("- La contraseña debe tener al menos un carácter especial.");
    }
    return errors;
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const toggleMostrarConfirmContrasena = () => {
    setMostrarConfirmContrasena(!mostrarConfirmContrasena);
  };


  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const errors = validarContrasena(newPassword, confirmacion);
     setContrasenaError(errors);
     setContrasenaFuerza(calcularFuerzaContrasena(errors));
    // if (errors.length === 0) {
    //   // Si no hay errores de validación, verificar si la contraseña está en la lista negra
    //   verificarContraseñaEnListaNegra(newPassword);
    // } else {
    //   // Si hay errores de validación, establecer la contraseña como no está en la lista negra
    //   setBlacklisted(false);
    // }
  };

  const calcularFuerzaContrasena = (errors) => {
    if (errors.length === 0) {
      return 'Fuerte';
    } else if (errors.length <= 2) {
      return 'Medio';
    } else {
      return 'Débil';
    }
  };

  const verificarContraseñaEnListaNegra = (password) => {
    try {
      if (weakPasswords.includes(password)) {
        setBlacklisted(true);
      } else {
        setBlacklisted(false);
      }
    } catch (error) {
      console.error('Error al verificar contraseña en lista negra:', error);
    }
  };


  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      const data = location.state;
      // if (contrasenaError.length === 0 && !blacklisted) {
        const response = await fetchData(`${baseURL}/users/update-password/${data.ID_usuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contraseña: password,
          }),
        });

        if (!response.ok) {
          throw new Error('Fallo al actualizar');
        }


        

      // }
    } catch (error) {
      setAlert('Error al procesar la solicitud. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Restablecer Contraseña</h5>
                      <p className="text-center small">Ingresa tu nueva contraseña para continuar</p>
                    </div>
                    <form className="row g-3 needs-validation" onSubmit={handleResetPassword}>
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">Ingresa la nueva contraseña:</label>
                        <div className="input-group ">
                          <input
                            type={mostrarContrasena ? 'text' : 'password'}
                            className={`form-control ${contrasenaError.length > 0 || blacklisted ? 'is-invalid' : ''}`}
                            placeholder="Ingrese su contraseña"
                            required
                            maxLength="100"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <FaEyeSlash className="mt-2 ms-2 show-password-icon" onClick={toggleMostrarContrasena} />
                          <ProgressBar
                            now={contrasenaFuerza === 'Débil' ? 25 : contrasenaFuerza === 'Medio' ? 50 : contrasenaFuerza === 'Fuerte' ? 100 : 0}
                            label={contrasenaFuerza}
                            className="w-100 mt-2"
                          />
                          {contrasenaError.length > 0 && (
                            <div className="col-12">
                              <div className="alert alert-danger">
                                <ul>
                                  {contrasenaError.map((error, index) => (
                                    <li key={index}>{error}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                          {blacklisted && (
                            <div className="col-12">
                              <div className="alert alert-danger">
                                La contraseña ingresada está en la lista negra, ntenta con otra.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Confirma la nueva contraseña:</label>
                        <div className="input-group has-validation">
                          <input
                            type={mostrarConfirmContrasena ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Confirme su contraseña"
                            required
                            maxLength="100"
                            value={confirmacion}
                            onChange={(event) => setConfirmacion(event.target.value)}
                            className="form-control"
                          />
                          <FaEyeSlash className="mt-2 ms-2 show-password-icon" onClick={toggleMostrarConfirmContrasena} />
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit" >Acceso</button>
                      </div>
                      {alert && alert.type === 'danger' && (
                        <Alert type="danger" message={alert.message} onClose={() => setAlert(null)} />
                      )}
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

export default ResetPassword;
