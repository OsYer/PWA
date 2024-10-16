import React, { useState, useEffect } from 'react';
import Header from "../../../Esquema/Header.js";
import Footer from "../../../Esquema/Footer.js";
import { baseURL } from '../../../api.js';
import Sidebar from "../../../Esquema/Sidebar.js";

const AdmMembresiasClientes = () => {
  const [membresias, setMembresias] = useState([]);
  const [membresiasActivas, setMembresiasActivas] = useState([]);

  useEffect(() => {
    const fetchMembresias = async () => {
      try {
        const response = await fetch(`${baseURL}/membresia-usuario`);
        if (!response.ok) {
          throw new Error('Error al obtener las membresías');
        }
        const data = await response.json();
        setMembresias(data);
        const membresiasFiltradas = data.filter((membresia) => {
          const fechaInicio = new Date(membresia.fechaInicio);
          const fechaVencimiento = new Date(membresia.fechaVencimiento);
          return fechaInicio <= fechaVencimiento;
        });
        setMembresiasActivas(membresiasFiltradas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMembresias();
  }, []);

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className='container my-4'>

          <div className="card">
            <div class="table-responsive scrollbar">
              <table class="table table-hover table-striped overflow-hidden">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Membresía</th>
                    <th scope="col">Fecha de inicio</th>
                    <th scope="col">Fecha de vencimiento</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {membresias.map((membresia) => (
                    <tr key={membresia.ID_membresiaUsuario} class="align-middle">
                      <td class="text-nowrap">{membresia.usuario}</td>
                      <td class="text-nowrap">{membresia.correoElectronico}</td>
                      <td class="text-nowrap">{membresia.telefono}</td>
                      <td class="text-nowrap">{membresia.nombreMembresia}</td>
                      <td class="text-nowrap">{new Date(membresia.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      <td class="text-nowrap">{new Date(membresia.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      <td style={{
                        color: new Date() > new Date(membresia.fechaVencimiento) ? 'red' : 'green',
                        backgroundColor: new Date() > new Date(membresia.fechaVencimiento) ? 'lightcoral' : 'lightgreen'
                      }}>
                        {new Date() > new Date(membresia.fechaVencimiento) ? 'Vencido' : 'Activo'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <h2>Membresías de usuarios</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID Usuario</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {membresias.map((membresia) => (
                  <tr key={membresia.ID_membresiaUsuario}>
                    <td>{membresia.ID_membresiaUsuario}</td>
                    <td>{membresia.usuario}</td>
                    <td>{new Date(membresia.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td>{new Date(membresia.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td>{membresia.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Membresías Activas</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID Usuario</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {membresiasActivas.map((membresia) => (
                  <tr key={membresia.id}>
                    <td>{membresia.id}</td>
                    <td>{membresia.idUsuario}</td>
                    <td>{new Date(membresia.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td>{new Date(membresia.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                    <td>{membresia.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdmMembresiasClientes;
