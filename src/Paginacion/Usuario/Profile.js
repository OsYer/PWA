import React, { useState, useEffect } from 'react';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import { useLocalStorage } from 'react-use';
import { baseURL } from '../../api.js';
import backgroundImage from './images/beelzebuh_icon.png';
import Swal from 'sweetalert2';
import Sidebar from "../../Esquema/Sidebar.js";
import Alert from '../Validaciones/Alerts/Alert.js';
import { FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
const Profile = () => {
  const [user, setUser] = useLocalStorage('user');
  const [isLoggedInOAuth, setIsLoggedInOAuth] = useLocalStorage('isLoggedInOAuth');

  const [usuario, setUsuario] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [alert, setAlert] = useState(null);
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmContrasena, setMostrarConfirmContrasena] = useState(false);
  const [contrasenaFuerza, setContrasenaFuerza] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const id = user.ID_usuario;
        const responseUsuario = await fetch(`${baseURL}/users/${id}`);

        if (!responseUsuario.ok) {
          throw new Error('Error al obtener la información del usuario');
        }

        const usuario = await responseUsuario.json();
        setUsuario(usuario);
        setNombre(usuario.nombre);
        setPrimerApellido(usuario.primerApellido);
        setSegundoApellido(usuario.segundoApellido);
        setCorreoElectronico(usuario.correoElectronico);
        setTelefono(usuario.telefono);
        setFechaNacimiento(usuario.fechaNacimiento);
        setGenero(usuario.genero);

        if (usuario) {

          const responseUbicacion = await fetch(`${baseURL}/direccion-envio-user/${id}`);

          if (!responseUbicacion.ok) {
            throw new Error('Error al obtener la información del usuario');
          }
          const datosUbicacion = await responseUbicacion.json();
          const ubicacionPredeterminada = datosUbicacion.find(item => item.predeterminado === true);

          if (ubicacionPredeterminada) {
            setUbicacion(ubicacionPredeterminada);
          }
          // console.log(usuario);
          // console.log(ubicacion);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsuario();
  }, [user.ID_usuario]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jwtToken');
    try {
      const id = user.ID_usuario;
      const response = await fetch(`${baseURL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          primerApellido,
          segundoApellido,
          telefono,
          genero,
          fechaNacimiento
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información del usuario');
      }
      console.log('¡Información del usuario actualizada con éxito!');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const toggleMostrarConfirmContrasena = () => {
    setMostrarConfirmContrasena(!mostrarConfirmContrasena);
  };

  const formatISODate = (isoDate) => {
    if (!isoDate) return ''; // Si isoDate es null, retorna una cadena vacía
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [contrasenaError, setContrasenaError] = useState([]);

  const validarContrasena = (newPassword) => {
    const mayusculas = /[A-Z]/;
    const minusculas = /[a-z]/;
    const numeros = /\d/;
    const caracteres = /[!@#$%^&*()\-_=+{};:,<.>]/;

    const errors = [];

    if (newPassword.length < 8) {
      errors.push("- La contraseña debe tener al menos 8 caracteres.");
    }

    if (!mayusculas.test(newPassword)) {
      errors.push("- La contraseña debe tener al menos una letra mayúscula.");
    }

    if (!minusculas.test(newPassword)) {
      errors.push("- La contraseña debe tener al menos una letra minúscula.");
    }

    if (!numeros.test(newPassword)) {
      errors.push("- La contraseña debe tener al menos un número.");
    }

    if (!caracteres.test(newPassword)) {
      errors.push("- La contraseña debe tener al menos un carácter especial.");
    }
    return errors;
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (newPassword !== confirmPassword) {
      setAlert('Las contraseñas no coinciden');
      return;
    }

    try {
      const validateResponse = await fetch(`${baseURL}/users/validate-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          correo: correoElectronico,
          passwordToValidate: oldPassword,
        }),
      });

      if (!validateResponse.ok) {
        throw new Error('Error al validar la contraseña anterior');
      }

      const isPasswordValid = await validateResponse.json();
      if (isPasswordValid) {
        try {

          const errors = validarContrasena(newPassword);
          setContrasenaError(errors);
          setContrasenaFuerza(calcularFuerzaContrasena(errors));
          console.log(contrasenaFuerza)
          if (contrasenaError.length === 0) {
            const response = await fetch(`${baseURL}/users/update-password/${user.ID_usuario}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contraseña: newPassword,
              }),
            });

            if (!response.ok) {
              throw new Error('Fallo al actualizar');
            }
            Swal.fire({
              title: "Actualizado",
              text: "Recuperación terminada",
              icon: "success",
              confirmButtonText: "Cerrar",
            });
          }
        } catch (error) {
          setAlert('Error al procesar la solicitud. Por favor, intenta nuevamente.');
        }
      } else {
        setAlert('La contraseña anterior es incorrecta');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="container my-4">
        <button className="btn btn-secondary mb-3" onClick={() => navigate('/perfil')}>Regresar al perfil</button>
          <div className="card mb-3">
            <div className="card-header position-relative min-vh-25 mb-7">
              <div className="bg-holder rounded-3 rounded-bottom-0" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
              <div className="avatar avatar-5xl avatar-profile">
                <img className="rounded-circle img-thumbnail shadow-sm" src={backgroundImage} width="200" alt="" />
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8">
                  <h4 className="mb-1"> {usuario?.nombre} {usuario?.primerApellido} {usuario?.segundoApellido} <span data-bs-toggle="tooltip" data-bs-placement="right" title="Verified"><small className="fa fa-check-circle text-primary" data-fa-transform="shrink-4 down-2"></small></span>
                  </h4>
                  <h5 className="fs-9 fw-normal">{usuario?.rol}</h5>
                  <p className="text-500">{ubicacion?.direccion}</p>
                  <p className="text-500">{usuario?.correoElectronico}</p>
                  <div className="border-bottom border-dashed my-4 d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-0">
            <div className={`col-lg-${isLoggedInOAuth ? '12' : '8'} pe-lg-2`}>
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="mb-0">Configuración de perfil</h5>
                </div>
                <div className="card-body bg-body-tertiary">
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-lg-12">
                      <label className="form-label" htmlFor="first-name">Nombre</label>
                      <input className="form-control" id="first-name" type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label" htmlFor="last-name">Primer apellido</label>
                      <input className="form-control" id="last-name" type="text" value={primerApellido} onChange={(event) => setPrimerApellido(event.target.value)} required />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label" htmlFor="last-name">Segundo apellido</label>
                      <input className="form-control" id="last-name" type="text" value={segundoApellido} onChange={(event) => setSegundoApellido(event.target.value)} required />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label" htmlFor="telefono">Teléfono</label>
                      <input className="form-control" id="telefono" type="text" minLength={10} maxLength={10} value={telefono} onChange={(event) => setTelefono(event.target.value)} required />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label" htmlFor="fecha-nacimiento">Fecha de nacimiento</label>
                      <input className="form-control" id="fecha-nacimiento" type="date" required value={formatISODate(fechaNacimiento)} onChange={(event) => setFechaNacimiento(event.target.value)} />
                    </div>
                    <div className="col-lg-6">
                      <label className="form-label" htmlFor="genero">Género</label>
                      <select className="form-select" id="genero" required value={genero} onChange={(event) => setGenero(event.target.value)}>
                        <option value="">Seleccionar género</option>
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                      </select>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <button className="btn btn-primary" type="submit">Actualizar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {!isLoggedInOAuth && (
              <div className="col-lg-4 ps-lg-2">
                <div className="sticky-sidebar">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="mb-0">Cambiar la contraseña</h5>
                    </div>
                    <div className="card-body bg-body-tertiary">
                      <form onSubmit={handleSubmitPassword}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="old-password">Contraseña anterior</label>
                          <input className="form-control" id="old-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="new-password">Nueva contraseña</label>
                          <input className="form-control" id="new-password" type={mostrarContrasena ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                          <FaEyeSlash className="mt-2 ms-2 show-password-icon" onClick={toggleMostrarContrasena} />
                          <ProgressBar
                            now={contrasenaFuerza === 'Débil' ? 25 : contrasenaFuerza === 'Medio' ? 50 : contrasenaFuerza === 'Fuerte' ? 100 : 0}
                            label={contrasenaFuerza}
                            className="w-100 mt-2"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="confirm-password">Confirmar Contraseña</label>
                          <input className="form-control" id="confirm-password" type={mostrarConfirmContrasena ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                          <FaEyeSlash className="mt-2 ms-2 show-password-icon" onClick={toggleMostrarConfirmContrasena} />
                        </div>
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
                        {alert && alert.type === 'danger' && (
                          <Alert type="danger" message={alert.message} onClose={() => setAlert(null)} />
                        )}
                        <button className="btn btn-primary d-block w-100" type="submit">Actualizar contraseña</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;