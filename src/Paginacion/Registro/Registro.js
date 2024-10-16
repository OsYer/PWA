import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Esquema/Header.js';
import Footer from '../../Esquema/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { baseURL } from '../../api.js';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [primerApellidoError, setPrimerApellidoError] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [segundoApellidoError, setSegundoApellidoError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [alerta, setAlerta] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [contrasenaError, setContrasenaError] = useState('');
  const [contrasenaFuerza, setContrasenaFuerza] = useState('');
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);
  const [validacionExitosa, setValidacionExitosa] = useState(false);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const navigate = useNavigate();
  const captcha = useRef(null);

  useEffect(() => {
    // Verificar si todas las validaciones son exitosas
    if (
      nombre.trim() !== '' &&
      primerApellido.trim() !== '' &&
      segundoApellido.trim() !== '' &&
      email.trim() !== '' &&
      contrasena !== '' &&
      confirmarContrasena !== '' &&
      nombreError === '' &&
      primerApellidoError === '' &&
      segundoApellidoError === '' &&
      emailError === '' &&
      contrasenaError.length === 0 &&
      contrasenaFuerza === 'Fuerte' &&
      passwordErrors.length === 0 &&
      validarCorreoElectronico(email) // Verificar si se aceptan los términos

    ) {
      setValidacionExitosa(true);
    } else {
      setValidacionExitosa(false);
    }
  }, [nombre, primerApellido, segundoApellido, email, contrasena, confirmarContrasena, nombreError, primerApellidoError, segundoApellidoError, emailError, contrasenaError, contrasenaFuerza, passwordErrors]);

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    setNombre(inputValue);
    if (primerApellidoError || segundoApellidoError) {
      validarApellido(primerApellido, "Apellido Paterno", setPrimerApellidoError);
      validarApellido(segundoApellido, "Apellido Materno", setSegundoApellidoError);
    } else {
      const validacionNombre = validarNombre(inputValue);
      if (validacionNombre) {
        setAlerta(null);
      }
    }
  };

  const handlePrimerApellidoChange = (e) => {
    const inputValue = e.target.value;
    setPrimerApellido(inputValue);
    const validacionApellido = validarApellido(inputValue, "Apellido Paterno", setPrimerApellidoError);
    if (validacionApellido) {
      setAlerta(null);
    }
  };

  const handleSegundoApellidoChange = (e) => {
    const inputValue = e.target.value;
    setSegundoApellido(inputValue);
    const validacionApellido = validarApellido(inputValue, "Apellido Materno", setSegundoApellidoError);
    if (validacionApellido) {
      setAlerta(null);
    }
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    if (!nombreError && !primerApellidoError && !segundoApellidoError) {
      if (!validarCorreoElectronico(inputValue)) {
        setEmailError('¡Ingrese una dirección de correo electrónico válida!');
      } else {
        setEmailError('');
      }
    }
  };

  const handleContrasenaChange = (e) => {
    const inputValue = e.target.value;
    setContrasena(inputValue);

    const errors = validarContrasena(inputValue, confirmarContrasena);
    setPasswordErrors(errors);

    const passwordErrorsFiltered = errors.filter(error => !error.includes('Las contraseñas no coinciden'));

    const fuerza = calcularFuerzaContrasena(passwordErrorsFiltered);
    setContrasenaFuerza(fuerza);

    if (passwordErrorsFiltered.length === 0) {
      setContrasenaError([]);
      if (fuerza === 'Fuerte') {
        setMostrarConfirmarContrasena(true);
      } else {
        setMostrarConfirmarContrasena(false);
      }
    } else {
      setContrasenaError(passwordErrorsFiltered);
      setMostrarConfirmarContrasena(false);
    }
  };


  const handleConfirmarContrasenaChange = (e) => {
    const inputValue = e.target.value;
    setConfirmarContrasena(inputValue);
    const errors = validarContrasena(contrasena, inputValue);
    setPasswordErrors(errors);
    setContrasenaError('');
  };


  const handleRegistro = async (event) => {
    event.preventDefault();
    if (!aceptarTerminos) {
      setAlerta('Por favor acepta los términos y condiciones.');
      return;
    }
    if (!validacionExitosa) {
      setAlerta('Por favor completa todos los campos correctamente.');
      return;
    }
    try {
      const response = await fetch(`${baseURL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          primerApellido,
          segundoApellido,
          correoElectronico: email,
          contrasena,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Exito",
          text: "Usuario registrado exitosamente",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        navigate('/login');
      } else {
        const errorData = await response.json();
        setAlerta(errorData.msg);
      }
    } catch (error) {
      setAlerta('Error al crear usuario. Por favor, intenta nuevamente.');
    }
  };

  const validarCorreoElectronico = (correo) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(correo).toLowerCase());
  };

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

    if (password !== confirmation) {
      errors.push("- Las contraseñas no coinciden.");
    }

    return errors;
  };
  const validarNombre = (value) => {
    if (!value.trim()) {
      setNombreError('¡Por favor, escriba su nombre!');
      return false;
    } else if (value.trim().length < 3) {
      setNombreError('¡El nombre debe tener al menos 3 caracteres!');
      return false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value.trim())) {
      setNombreError('¡El nombre solo puede contener letras y espacios!');
      return false;
    } else {
      setNombreError('');
      return true;
    }
  };

  const validarApellido = (value, apellido, setError) => {
    if (!value.trim()) {
      setError(`¡Por favor, escriba su ${apellido}!`);
      return false;
    } else if (value.trim().length < 3) {
      setError(`¡El ${apellido} debe tener al menos 3 caracteres!`);
      return false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value.trim())) {
      setError(`¡El ${apellido} solo puede contener letras y espacios!`);
      return false;
    } else {
      setError('');
      return true;
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
    <div>
      <Header />
      <div className="container">
  <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 d-flex flex-column align-items-center justify-content-center">
          <div className="card w-100 mb-3">
            <div className="card-body">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Crea una cuenta</h5>
                <p className="text-center small">Ingrese sus datos para crear una cuenta</p>
              </div>
              <form onSubmit={handleRegistro} className="row g-3 needs-validation" noValidate>
                <div className="col-md-6">
                  <label htmlFor="yourName" className="form-label">Nombre</label>
                  <input type="text" placeholder="Ingresa tu nombre" name="name" className={`form-control ${nombreError ? 'is-invalid' : ''}`} id="yourName" required value={nombre} onChange={handleNombreChange} />
                  {nombreError && <div className="invalid-feedback">{nombreError}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="yourApePat" className="form-label">Apellido Paterno</label>
                  <input type="text" placeholder='Ingresa tu apellido' name="ApePat" className={`form-control ${primerApellidoError ? 'is-invalid' : ''}`} id="ApePat" required value={primerApellido} onChange={handlePrimerApellidoChange} />
                  {primerApellidoError && <div className="invalid-feedback">{primerApellidoError}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="yourApeMat" className="form-label">Apellido Materno</label>
                  <input type="text" name="ApeMat" placeholder='Ingresa tu apellido' className={`form-control ${segundoApellidoError ? 'is-invalid' : ''}`} id="ApeMat" required value={segundoApellido} onChange={handleSegundoApellidoChange} />
                  {segundoApellidoError && <div className="invalid-feedback">{segundoApellidoError}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="yourEmail" className="form-label">Correo Electrónico</label>
                  <input type="email" name="email" placeholder="Ingresa tu correo" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="yourEmail" required value={email} onChange={handleEmailChange} />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="yourPassword" className="form-label">Contraseña</label>
                  <div className="input-group">
                    <input type={showPassword ? "text" : "password"} placeholder='Ingresa contraseña' name="password" className={`form-control ${passwordErrors.length > 0 ? 'is-invalid' : ''}`} id="yourPassword" required value={contrasena} onChange={handleContrasenaChange} />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {contrasenaError.length > 0 && (
                    <div className="invalid-feedback">
                      {contrasenaError.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="yourPasswordConfirm" className="form-label">Confirmar Contraseña</label>
                  <div className="input-group">
                    <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirma contraseña' name="PasswordConfirm" className={`form-control ${passwordErrors.length > 0 ? 'is-invalid' : ''}`} id="PasswordConfirm" required value={confirmarContrasena} onChange={handleConfirmarContrasenaChange} />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordErrors.map((error, index) => (
                    <div key={index} className="invalid-feedback">{error}</div>
                  ))}
                </div>
                <div className="col-12">
                  <ProgressBar now={contrasenaFuerza === 'Débil' ? 25 : contrasenaFuerza === 'Medio' ? 50 : contrasenaFuerza === 'Fuerte' ? 100 : 0} label={contrasenaFuerza} />
                </div>
                <div className="col-12 form-check">
                  <input className="form-check-input" type="checkbox" value={aceptarTerminos} id="aceptarTerminos" onChange={() => setAceptarTerminos(!aceptarTerminos)} required />
                  <label className="form-check-label" htmlFor="aceptarTerminos">Acepto los términos y condiciones</label>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit" disabled={!validacionExitosa || !aceptarTerminos}>Crear una cuenta</button>
                </div>
                {alerta && (
                  <div className="col-12 mt-2">
                    <div className="alert alert-danger" role="alert">
                      {alerta}
                    </div>
                  </div>
                )}
              </form>
              <div className="col-12">
                <p className="small mb-0">¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión </Link></p>
              </div>
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

export default Registro;
