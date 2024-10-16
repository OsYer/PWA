import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import { baseURL } from '../../api.js';

const AgregarDireccionesEnvio = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pais, setPais] = useState("México");

  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("Huejutla de reyes");
  const [colonia, setColonia] = useState("");
  const [localidades, setLocalidades] = useState([]);
  const [estado, setEstado] = useState("Hidalgo");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [referencias, setReferencias] = useState("");
  const [predeterminado, setPredeterminado] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  // Función para validar el código postal
  const validarCodigoPostal = () => {
    // Sustituye 'TU_API_KEY' con tu propia clave de API
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${codigoPostal},+Mexico&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          // Aquí puedes manejar la respuesta, por ejemplo, extrayendo la ciudad y el estado
          console.log(data);
          const resultado = data.results[0];
          const direccionCompleta = resultado.formatted_address;
          const localidades = data.results[0]?.postcode_localities;
          if (localidades) {
            setLocalidades(localidades);
            // Opcionalmente, puedes seleccionar automáticamente la primera localidad
            setCiudad(localidades[0]);
          } else {
            // Si no hay localidades específicas, podrías manejarlo de otra manera
            alert("No se encontraron localidades para este código postal.");
          }
          alert(`Dirección encontrada: ${direccionCompleta}`);
          // Actualiza los estados de ciudad y país si es necesario
        } else {
          alert("Código postal no encontrado.");
        }
      })
      .catch(error => {
        console.error('Error al validar el código postal:', error);
        alert("Error al validar el código postal. Por favor, intenta nuevamente.");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${baseURL}/direccion-envio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ID_usuario: user.ID_usuario,
          nombre,
          apellidos,
          pais,
          direccion,
          ciudad,
          colonia,
          estado,
          codigoPostal,
          telefono,
          referencias,
          predeterminado
        })
      });

      if (response.ok) {
        alert("Dirección de envío guardada exitosamente.");
        // AGREGAR VALID,ACIÓN DEL PATH 
        handleRegresar();
      } else {
        alert("Error al guardar la dirección de envío.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la dirección de envío. Por favor, intenta nuevamente.");
    }
  };

  const handleRegresar = () => {
    if (location.state && location.state.pathEnvio) {
      const { pathEnvio, subtotal, descuentoAplicado, total } = location.state;

      if (pathEnvio === '/seleccionar-direccion-envio') {
        console.log(subtotal);
        navigate('/checkout', {
          state: {
            subtotal,
            descuentoAplicado,
            total
          }
        });
      } else {
        navigate('/mis-direcciones');
      }
    } else {
      // El valor de pathEnvio no está definido, redirigir a una página predeterminada
      navigate('/mis-direcciones');
    }
  };


  return (
    <>
      <Header />
      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <h4>Detalles de envio</h4>
            <form onSubmit={handleSubmit}>
              <div class="row">
                <div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Nombre<span>*</span></p>
                        <input className="text-dark" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Apellidos<span>*</span></p>
                        <input className="text-dark" type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__input">
                    <p>País<span>*</span></p>
                    <input className="text-dark" type="text" value={pais} onChange={(e) => setPais(e.target.value)} required />
                  </div>
                  <div class="checkout__input">
                    <p>Código postal<span>*</span></p>
                    <input className="text-dark" type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />
                    {/* <button type="button" onClick={validarCodigoPostal} className="site-btn mt-3">Validar Código Postal</button> */}
                  </div>
                  <div class="checkout__input">
                    <p>Estado<span>*</span></p>
                    <input className="text-dark" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} required />
                  </div>
                  <div class="checkout__input">
                    <p>Ciudad<span>*</span></p>
                    <input className="text-dark" type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required class="checkout__input__add" />
                  </div>
                  {/* <div class="checkout__input">
                    <p>Ciudad<span>*</span></p>
                    {localidades.length > 0 ? (
                      <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
                        {localidades.map((localidad, index) => (
                          <option key={index} value={localidad}>{localidad}</option>
                        ))}
                      </select>
                    ) : (
                      <input type="text" value={colonia} onChange={(e) => setColonia(e.target.value)} required />
                    )}
                  </div> */}
                  <div class="checkout__input">
                    <p>Colonia<span>*</span></p>
                    <input className="text-dark" type="text" value={colonia} onChange={(e) => setColonia(e.target.value)} required class="checkout__input__add" />
                  </div>
                  <div class="checkout__input">
                    <p>Dirección<span>*</span></p>
                    <input className="text-dark" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required class="checkout__input__add" />
                  </div>
                  <div class="checkout__input">
                    <p>Teléfono<span>*</span></p>
                    <input className="text-dark" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required class="checkout__input__add" />
                  </div>
                  <div class="checkout__input">
                    <p>Pedidos<span>*</span></p>
                    <input className="text-dark" type="text"
                      placeholder="Notas sobre su pedido, por ejemplo, notas especiales de entrega."
                      value={referencias} onChange={(e) => setReferencias(e.target.value)} required />
                  </div>
                  <button type="submit" class="site-btn">Guardar dirreción de envio</button>
                  <button onClick={() => handleRegresar()} class="site-btn ms-5">Regresar</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AgregarDireccionesEnvio;
