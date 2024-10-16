import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import IconUsuario from "./assets/username-icon.svg";
import IconPassword from "./assets/password-icon.svg";
import IconGoogle from "./assets/google-icon.svg";
import IconFacebook from "./assets/facebook-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
// import './Login.css';


import Alert from '../Validaciones/Alerts/Alert.js';


import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

import { auth } from "./firebase.js";

const EstiloDeBoton = {
  border: '1px solid black',
  borderRadius: '10px',
};

const BotonSocial = ({ icono, texto, onClick }) => (
  <div className="btn d-flex gap-2 justify-content-center border mt-3 shadow-sm" style={EstiloDeBoton}>
    <img
      src={icono}
      alt="icono"
      style={{ height: '1.6rem', pointerEvents: 'none' }}
    />
    <button
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        color: 'black',
      }}
      onClick={onClick}
    >
      <span>{texto}</span>
    </button>
  </div>
);

const Login2 = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // Cierra la alerta después de 5 segundos (o ajusta según tu necesidad)
    setTimeout(() => setAlert(null), 5000);
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };
  const closeAlert = () => {
    setAlert(null);
  };

  const handleGoogle = async (event) => {
    const provider = new GoogleAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      // console.log(credentials.user)
      const data = credentials.user;
      // console.log(data)
      const user = { usuario: data.displayName, correo: data.email, id: data._id, tipo: data.typeUser, foto: data.photoURL };
      // console.log(user)
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/error', { state: user })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFacebook = async (event) => {
    const provider = new FacebookAuthProvider()
    try {
      const credentials = await signInWithPopup(auth, provider)
      // console.log(credentials.user)
      const data = credentials.user;
      // console.log(data)
      const user = { usuario: data.displayName, correo: data.email, id: data._id, tipo: data.typeUser, foto: data.photoURL };
      // console.log(user)
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/panel', { state: user })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    // Validación de campos vacíos
    event.preventDefault();
    try {
      if (!correo || !password) {
        showAlert('danger', 'Por favor, ingresa todos los campos.');
        return;
      }
      const response = await fetch('https://api-rest-sport.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: correo, password }),
      });
      // console.log(response)
      if (!response.ok) {
        let alertType = 'danger';
        let errorMessage = '';
        if (response.status === 400) {
          errorMessage = 'Solicitud incorrecta. Por favor proporcione correo electrónico y contraseña';
        }
        else if (response.status === 401) {
          errorMessage = 'Usuario no autorizado. Verifica tus credenciales.';
        } else if (response.status === 500) {
          errorMessage = 'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.';
        } else {
          const errorData = await response.json();
          errorMessage = errorData.msg || 'Error desconocido';
        }
        showAlert(alertType, errorMessage);
        return;
      }

      const userData = await response.json();
      // console.log(userData)

      sessionStorage.setItem('userData', JSON.stringify(userData));

      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/mfa', { state: userData });
    } catch (error) {
      // Manejar errores de red o conexión aquí...
      console.error('Error de red o conexión:', error.message);
      let alertType = 'danger';
      let errorMessage = 'Error de red o conexión. Por favor, verifica tu conexión a Internet.';
      showAlert(alertType, errorMessage);
    }
  };


  return (
    <div>
      <Header />
      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mt-4">
              <label htmlFor="username">Correo electrónico:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconUsuario}
                  alt="username-icon"
                  style={{ height: '1rem', pointerEvents: 'none' }}
                />
              </div>
              <input
                className="form-control bg-light"
                type="email"
                placeholder="Ingresa su correo"
                name="email"
                required maxLength="28"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
              />
            </div>
            <div className="form-group mt-1">
              <label htmlFor="password">Contraseña:</label>
            </div>
            <div className="input-group mt-1">
              <div className="input-group-text bg-info">
                <img
                  src={IconPassword}
                  alt="password-icon"
                  style={{ height: '1rem', pointerEvents: 'none' }}
                />
              </div>
              <input
                className="form-control bg-light"
                type={mostrarContrasena ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                name="password"
                required maxLength="28"
                // minLength="8"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <i
                className={`mt-2 ms-2 show-password-icon ${mostrarContrasena ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                onClick={toggleMostrarContrasena}
              />
            </div>

            <button type="submit" className="btn btn-info text-white w-100 my-4 fw-semibold shadow-sm">
              Ingresar
            </button>

            {/* Mostrar alerta de éxito */}
            {/* {alert && alert.type === 'success' && (
              <Alert type="success" message={alert.message} onClose={closeAlert} />
            )} */}

            {alert && alert.type === 'danger' && (
              <Alert type="danger" message={alert.message} onClose={closeAlert} />
            )}

            {/* {alert && alert.type === 'warning' && (
              <Alert type="warning" message={alert.message} onClose={closeAlert} />
            )} */}

          </form>

          <div className="additional-options">
            <p>¿Olvidaste tu contraseña?  <Link to="/recuperacion">Recuperar cuenta</Link></p>
            <p>¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link></p>
          </div>

          <div className="p-3">
            <div className="border-bottom text-center">
              {/* <span className="bg-white px-3">or</span> */}
            </div>
          </div>
          <div>
            <BotonSocial
              icono={IconGoogle}
              texto="Continuar con Google"
              onClick={handleGoogle}
            />
            <BotonSocial
              icono={IconFacebook}
              texto="Continuar con Facebook"
              onClick={handleFacebook}
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login2;