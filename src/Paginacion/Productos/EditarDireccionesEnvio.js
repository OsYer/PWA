import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import { baseURL } from '../../api.js';

const EditarDireccionesEnvio = () => {
  const { ID_direccion } = useParams();
  const [direccionActualizar, setDirrecionActualizar] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pais, setPais] = useState("");

  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [colonia, setColonia] = useState("");
  const [estado, setEstado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [telefono, setTelefono] = useState("");
  const [referencias, setReferencias] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDireccion = async () => {
      try {
        const response = await fetch(`${baseURL}/direccion-envio/${ID_direccion}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setDirrecionActualizar(data);
          setNombre(data.nombre);
          setApellidos(data.apellidos);
          setPais(data.pais);
          setCodigoPostal(data.codigoPostal);
          setEstado(data.estado);
          setCiudad(data.ciudad);
          setColonia(data.colonia);
          setDireccion(data.direccion);
          setTelefono(data.telefono)
          setReferencias(data.referencias)
        } else {
          console.error("Error al cargar las direcciones guardadas");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }

    };

    fetchDireccion();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await fetch(`${baseURL}/direccion-envio/${ID_direccion}`, {
        method: "PUT",
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
          referencias
        })
      });

      if (response.ok) {
        alert("Dirección de envío guardada exitosamente.");
        window.location.reload();
      } else {
        alert("Error al guardar la dirección de envío.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar la dirección de envío. Por favor, intenta nuevamente.");
    }
  };

  return (
    <>
      <Header />
      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <h4>Detalles de envio {ID_direccion}</h4>
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
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Teléfono<span>*</span></p>
                        <input className="text-dark" type="number" value={telefono} onChange={(e) => setTelefono(e.target.value)} 
                        required />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__input">
                    <p>Pedidos<span>*</span></p>
                    <input className="text-dark" type="text"
                      placeholder="Notas sobre su pedido, por ejemplo, notas especiales de entrega."
                      value={referencias} onChange={(e) => setReferencias(e.target.value)} required />
                  </div>
                  <button type="submit" class="site-btn">Guardar dirreción de envio</button>
                  <Link to={"/mis-direcciones"} type="submit" class="site-btn ms-5">Regresar</Link>
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

export default EditarDireccionesEnvio;
