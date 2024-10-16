import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import { useLocalStorage } from 'react-use';
import { baseURL } from '../../api.js';
import Sidebar from "../../Esquema/Sidebar.js";

const Membresia = () => {
  const [membresiaData, setMembresiaData] = useState(null);
  const [tipoMembresiaData, settipoMembresiaData] = useState(null);

  const [user, setUser] = useLocalStorage('user');
  const navigate = useNavigate();
  const [membresiaVencida, setMembresiaVencida] = useState(false);

  useEffect(() => {
    const fetchMembresia = async () => {

      try {
        const id = user.ID_usuario;
        const response = await fetch(`${baseURL}/membresia-usuario/${id}`);
        // console.log("resp", response)
        if (!response.ok) {
          throw new Error('Error al obtener la información del usuario');
        }

        const datosMembresiaUsuario = await response.json();
        // console.log("datosMembresiaUsuario", datosMembresiaUsuario)
        if (datosMembresiaUsuario.length > 0) {
          const datosMembresia = datosMembresiaUsuario[0];
          const id = datosMembresia.ID_tipoMembresia;
          // console.log("datosMembresia[0]", datosMembresia)
          try {
            const response = await fetch(`${baseURL}/membershipTypes/${id}`);
            if (!response.ok) {
              throw new Error('Error al obtener el tipo de membresía');
            }
            const membershipType = await response.json();
            // console.log("membershipType", membershipType)
            settipoMembresiaData(membershipType);
            setMembresiaData(datosMembresia);

            const fechaVencimiento = new Date(datosMembresia.fechaVencimiento);
            const fechaActual = new Date();
            if (fechaVencimiento < fechaActual) {
              setMembresiaVencida(true);
            }

          } catch (error) {
            console.error(error);
          }
        } else {
          setMembresiaData(null);
        }
      } catch (error) {
        console.error(error);
        setMembresiaData(null);
      }
    };
    fetchMembresia();
  }, []);



  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        {membresiaData ? (
          <>
            <div className='main'>
              <section className="product-details spad">

                <div className="container">

                  <div className="row">
                    
                    <div className="col-lg-6 col-md-6">
                  <button className="btn btn-secondary mb-3" onClick={() => navigate('/perfil')}>Regresar al perfil</button>

                      <div className="product__details__pic">
                        <div className="product__details__pic__item">
                          {membresiaData && membresiaData.imagenUrl && (
                            <img className="product__details__pic__item--large" src={membresiaData.imagenUrl} alt={membresiaData.imagenUrl} style={{ width: '540px', height: '560px' }} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="product__details__text">
                        <h3>{user.correo}</h3>
                        {membresiaVencida && (
                          <div className="alert alert-danger">
                            <strong>Membresía vencida:</strong> Por favor renueva tu membresía.
                          </div>
                        )}
                        <ul>
                          <li><b>Membresía</b><span> {tipoMembresiaData.nombre} </span></li>
                          <li><b>Costo</b><span> $ {tipoMembresiaData.costo} MXN</span></li>
                          <li>
                            <b>Fecha de inicio</b> <span>{new Date(membresiaData.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </li>
                          <li>
                            <b>Fecha vencimiento</b> <span><samp>{new Date(membresiaData.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</samp></span>
                          </li>
                          <li><b>Compartir en</b>
                            <div className="share">
                              <a href="#"><i className="fa fa-facebook"></i></a>
                              <a href="#"><i className="fa fa-twitter"></i></a>
                              <a href="#"><i className="fa fa-instagram"></i></a>
                              <a href="#"><i className="fa fa-pinterest"></i></a>
                            </div>
                          </li>
                        </ul>
                        <button className="primary-btn" onClick={() => navigate("/historialMembresias")} style={{ border: 'none' }}>
                          HISTORIAL DE MEMBRESÍAS COMPRADAS
                        </button>
                        <br /><br />
                        {/* <button className="primary-btn" onClick={() => navigate("/perfil")} style={{ border: 'none' }}>
                        REGRESAR AL PERFIL
                      </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>No cuenta con una membresía activa</p>
          </div>
        )}
      </div>
      <Footer />
    </>

  );
};

export default Membresia;
