import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import IconUsuario from "./assets/username-icon.svg";
import IconPassword from "./assets/password-icon.svg";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { auth } from "./firebase.js";
import Alert from '../Validaciones/Alerts/Alert.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import './Login.css';
import { baseURL } from '../../api.js';

const Login3 = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [alert, setAlert] = useState(null);
  const [redirectToMFA, setRedirectToMFA] = useState(false);
  const [mostrarDiv, setMostrarDiv] = useState(true);
  
  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (!correo || !password) {
        showAlert('danger', 'Por favor, ingresa todos los campos.');
        return;
      }
      const response = await fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correoElectronico: correo, contraseña: password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        showAlert('danger', errorData.msg);
        return;
      }

      const userData = await response.json();

      const dataUser = { correoElectronico: userData.correoElectronico, ID_usuario: userData.ID_usuario };

      localStorage.setItem('isLoggedInTemp', true);
      localStorage.setItem('isLoggedUserTemp', dataUser);

      console.log("debe redigir", dataUser)   
      window.location.href = '/mfa';
    } catch (error) {
      console.error('Error de red o conexión:', error.message);
      let alertType = 'danger';
      let errorMessage = 'Error de red o conexión. Por favor, verifica tu conexión a Internet.';
      showAlert(alertType, errorMessage);
    }
  };


  return (
    <>
      <Header className="pt-0" />
      {mostrarDiv ? (
      <div className="container">
        <button onClick={() => setMostrarDiv(!mostrarDiv)}>Mostrar/ocultar div</button>
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-0">
          <div className="container mt-0 mb-0">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-0">
                  <div className="card-body">
                    <div className="pt-0 pb-0">
                      <h5 className="card-title text-center pb-0 fs-4">Iniciar sesión</h5>
                      <p className="text-center small">Ingrese su nombre de usuario y contraseña para iniciar sesión</p>
                    </div>
                    <form onSubmit={handleLogin} className="row g-3 needs-validation">
                      <div className="col-12">
                        <label className="form-label">Correo electrónico:</label>
                        <div className="input-group has-validation">
                          <input
                            className="form-control bg-light"
                            type="email"
                            placeholder="Ingresa su correo"
                            name="email"
                            value={correo}
                            onChange={(event) => setCorreo(event.target.value)} />
                          <div className="invalid-feedback">Por favor, ingrese su nombre de usuario.</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Contraseña:</label>
                        <div className="password-input-wrapper input-group has-validation">
                          <input
                            className="form-control bg-light"
                            type={mostrarContrasena ? 'text' : 'password'}
                            placeholder="Ingrese su contraseña"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                          />
                          <span className="btn btn-outline-secondary" onClick={toggleMostrarContrasena}>
                            {mostrarContrasena ? <FaEyeSlash /> : <FaEye />} {/* Usa los iconos FaEye y FaEyeSlash */}
                          </span>
                          <div className="invalid-feedback">¡Por favor, introduzca su contraseña!</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100" >Acceso</button>
                      </div>
                      {alert && alert.type === 'danger' && (
                        <Alert type="danger" message={alert.message} onClose={closeAlert} />
                      )}
                    </form>
                    <div className="my-3">
                      <div className="col-12">
                        <p className="small mb-0">
                          <i className="fas fa-user-plus me-1"></i> ¿No tienes cuenta? <Link to="/registro" className="link-primary">Crea una cuenta</Link>
                        </p>
                      </div>
                      <div className="col-12 mt-2">
                        <p className="small mb-0">
                          <i className="fas fa-lock me-1"></i> ¿Contraseña Olvidada? <Link to="/recuperacion" className="link-primary">Recupera tu cuenta</Link>
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      ) : (
        <div>
        <p>Hola</p>
      </div>
    )}
      <Footer className="pt-0" />
    </>
  );
};

export default Login3;
