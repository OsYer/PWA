import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../Esquema/Header';
import Footer from '../../../Esquema/Footer';
// import './AdmProductos.css';

const AdmProductos = () => {

  return (
    <div>
      <Header />
      <div className='content'>
        <div className='containerAdm'>
          <div className="pagetitle">
            <h1>Usuarios</h1>
          </div>

          <p>Registros</p>

          <section>
            <div className="row">

              <div className="card">
                <div className="card-body">

                  <div className="d-flex justify-content-between mb-0">
                    <h5 className="card-title">Registros de la tabla Usuarios</h5>

                    <p className="card-title">
                      <a className="btn btn-primary" asp-action="Crear">
                        Agregar
                      </a>
                    </p>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Correo</th>
                          <th scope="col">Rol</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <th scope="row">@usuario.IdUsuario</th>
                          <td>@usuario.Nombre</td>
                          <td>@usuario.Correo</td>
                          <td>@usuario.NombreRol</td>
                          <td className="d-flex justify-content-center">
                            <a className="btn btn-primary btn-sm me-2">
                              <i className="bi bi-pencil-fill text-dark"></i>
                            </a>
                            <a className="btn btn-danger btn-sm">
                              <i className="bi bi-trash-fill text-dark"></i>
                            </a>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default AdmProductos;
