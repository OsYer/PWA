import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Esquema/Header';
import Footer from '../../Esquema/Footer';
import { useLocalStorage } from 'react-use';
import { baseURL } from '../../api.js';
import Sidebar from "../../Esquema/Sidebar.js";

const HistorialMembresias = () => {
  const [membresias, setMembresias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage('user');

  useEffect(() => {
    const id = user.ID_usuario;
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/mi-historial-membresias/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el historial de membresías');
        }
        const data = await response.json();
        console.log(data);
        setMembresias(data);
        setCargando(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="main mt-4 p-3">
          <h4 className='text-center mb-4'>Mi registro de membresias</h4>

          <section className="custom-section">
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/perfil')}>Regresar al perfil</button> {/* Botón de regreso */}
            {/* <p className='text-center mb-4'>Mi registro de membresias</p> */}

            <div className="row">
              <div className="card mb-3">

                {cargando ? (
                  <div>Cargando productos...</div>
                ) : (
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-0">
                      <h5 className="card-title">Registros de la compra de membresías</h5>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo de membresía</th>
                            <th scope="col">Fecha de inicio</th>
                            <th scope="col">Fecha de vencimiento</th>
                            <th scope="col">Precio</th>
                            {/* <th scope="col">Operación</th> */}
                            {/* <th scope="col">Estatus</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {membresias.map(membresia => (
                            <tr key={membresia.ID_historialMembresia}>
                              <th scope="row">{membresia.ID_historialMembresia}</th>
                              <td>{membresia.nombre}</td>
                              <td>{new Date(membresia.fechaInicio).toLocaleDateString('es-ES')}</td>
                              <td>{new Date(membresia.fechaVencimiento).toLocaleDateString('es-ES')}</td>
                              <td>{membresia.precio}</td>
                              {/* <td>{membresia.operacion_id}</td> */}
                              {/* <td>{membresia.operacion_status}</td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HistorialMembresias;
