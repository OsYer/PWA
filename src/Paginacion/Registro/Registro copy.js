import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Esquema/Header.js';
import Footer from '../../Esquema/Footer';
import Alert from '../Validaciones/Alerts/Alert.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Registro.css';
import ReCAPTCHA from 'react-google-recaptcha';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [alerta, setAlerta] = useState(null);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);
  const [mostrarCaptcha, setMostrarCaptcha] = useState(false); // Nuevo estado para controlar la visibilidad del ReCAPTCHA
  const navigate = useNavigate();
  const captcha = useRef(null);

  const onChange = async () => {
    try {
      const value = await captcha.current.getValue();
      //console.log('Captcha value:', value);
      // Aquí puedes realizar cualquier acción adicional con el valor del ReCAPTCHA, como enviarlo al servidor
    } catch (error) {
      console.error('Error al obtener el valor del ReCAPTCHA:', error);
    }
  };

  const handleRegistro = async (event) => {
    event.preventDefault();
  
    // Validación de campos vacíos
    if (
      nombre.trim() === '' ||
      primerApellido.trim() === '' ||
      segundoApellido.trim() === '' ||
      email.trim() === '' ||
      contrasena === '' ||
      confirmarContraseña === ''
    ) {
      setAlerta({ type: 'danger', message: 'Por favor completa todos los campos.' });
      return;
    }

    // Validación de que nombre, primer apellido y segundo apellido solo contengan texto
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(nombre) || !nameRegex.test(primerApellido) || !nameRegex.test(segundoApellido)) {
      setAlerta({ type: 'danger', message: 'Los campos de nombre, primer apellido y segundo apellido solo pueden contener letras.' });
      return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlerta({ type: 'danger', message: 'Por favor ingresa un correo electrónico válido.' });
      return;
    }

    // Validación de contraseña segura
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(contrasena)) {
      setAlerta({ type: 'danger', message: 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.' });
      return;
    }

    // Validación de contraseña y confirmación de contraseña
    if (contrasena !== confirmarContraseña) {
      setAlerta({ type: 'danger', message: 'Las contraseñas no coinciden.' });
      return;
    }
    setMostrarCaptcha(true);

    // Si todas las validaciones pasan, muestra el ReCAPTCHA
    ///Validar si el ReCAPTCHA ha sido completado
  // if (!captcha.current || !captcha.current.getValue()) {
  //   setAlerta({ type: 'danger', message: 'Por favor completa el ReCAPTCHA.' });
  //   return;
  // }

    try  {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          primerApellido,
          segundoApellido,
          correoElectronico: email, // Asegúrate de enviar el correo con el nombre esperado en el backend
          contrasena,
        }),
      });
  
      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        setAlerta({ type: 'danger', message: errorData.msg });
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setAlerta({ type: 'danger', message: 'Error al crear usuario. Por favor, intenta nuevamente.' });
    }
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <div className="login-container">
          <h3>Registro de Usuario</h3>
          <form onSubmit={handleRegistro}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                className="form-control bg-light"
                type="text"
                placeholder="Ingresa tu nombre"
                name="nombre"
                required
                minLength={3}
                maxLength={50}
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="primerApellido">Primer Apellido:</label>
              <input
                className="form-control bg-light"
                type="text"
                placeholder="Ingresa tu Primer Apellido"
                name="primerApellido"
                required
                minLength={3}
                maxLength={50}
                value={primerApellido}
                onChange={(event) => setPrimerApellido(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="segundoApellido">Segundo Apellido:</label>
              <input
                className="form-control bg-light"
                type="text"
                placeholder="Ingresa tu Segundo Apellido"
                name="segundoApellido"
                required
                minLength={3}
                maxLength={50}
                value={segundoApellido}
                onChange={(event) => setSegundoApellido(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="correoElectronico">Correo Electrónico:</label>
              <input
                className="form-control bg-light"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                required
                minLength={3}
                maxLength={50}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contraseña">Contraseña:</label>
              <div className="password-input-wrapper">
                <input
                  className="form-control bg-light"
                  type={mostrarContraseña ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  name="contrasena"
                  required
                  minLength={3}
                  maxLength={50}
                  value={contrasena}
                  onChange={(event) => setContrasena(event.target.value)}
                />
                <div
                  className="toggle-password-button"
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                >
                  {mostrarContraseña ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
              <div className="password-input-wrapper">
                <input
                  className="form-control bg-light"
                  type={mostrarConfirmarContraseña ? 'text' : 'password'}
                  placeholder="Confirma tu contraseña"
                  name="confirmarContraseña"
                  required
                  value={confirmarContraseña}
                  onChange={(event) => setConfirmarContraseña(event.target.value)}
                />
                <div
                  className="toggle-password-button"
                  onClick={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}
                >
                  {mostrarConfirmarContraseña ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            {/* {mostrarCaptcha && ( // Mostrar el ReCAPTCHA solo cuando esté listo
              <div className="recaptcha-container">
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LeAtlwpAAAAALkMtVMtJMxrLdhfOejGV7EtWl7Z"
                  onChange={onChange}
                />
              </div>
            )} */}
            {alerta && (
              <Alert type={alerta.type} message={alerta.message} onClose={() => setAlerta(null)} />
            )}
            <button
              type="submit"
              className="btn btn-info text-white w-100 my-4 fw-semibold shadow-sm"
            >
              Registrarse
            </button>
          </form>

          <div className="additional-options">
            <p>¿Olvidaste tu contraseña?  <Link to="/recuperacion">Recuperar cuenta</Link></p>
            <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registro;
