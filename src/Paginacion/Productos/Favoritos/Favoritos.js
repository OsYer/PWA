import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../../Esquema/Header.js";
import Footer from "../../../Esquema/Footer";
import { baseURL } from '../../../api.js';
import './Favoritos.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Favoritos = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.ID_usuario);
      fetchFavoritos(user.ID_usuario);
    }
  }, []);

  const fetchFavoritos = async (userId) => {
    try {
      const response = await fetch(`${baseURL}/favoritos-productos/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setFavoritos(data);
      } else {
        toast.error('Error al eliminar el producto de favoritos.');
        console.error('Error al cargar los productos favoritos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const removeFromFavorites = async (idFavorito) => {
    try {
      const deleteResponse = await fetch(`${baseURL}/favorito/${idFavorito}`, {
        method: 'DELETE'
      });

      if (deleteResponse.ok) {
        setFavoritos(favoritos.filter(favorito => favorito.ID_favorito !== idFavorito));
        toast.success('Eliminaste el producto de Mis favoritos.');
      } else {
        console.error('Error al eliminar el producto de favoritos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="favorites-container container">
        <h5 className="favorites-title">Favoritos</h5>
        <div className="card favorites-card">
          <div className="card-body p-0">
            <div className="row gx-0 mx-0 bg-200 text-900 fs-10 fw-semi-bold header-row">
              <div className="col-9 col-md-8 py-2 px-3">Nombre</div>
              <div className="col-3 col-md-4 px-3 text-end">Precio</div>
            </div>
            {favoritos.length === 0 ? (
              <div className="row gx-0 mx-0 align-items-center border-bottom border-200 product-row">
                <div className="col-12 py-3 px-3 text-center">
                  <p>No tienes productos favoritos</p>
                </div>
              </div>
            ) : (
              favoritos.map((producto, index) => (
                <div key={index} className="row gx-0 mx-0 align-items-center border-bottom border-200 product-row">
                  <div className="col-8 py-3 px-3">
                    <div className="d-flex align-items-center">
                      <a href={`/product-details/${producto.ID_producto}`}>
                        <img className="img-fluid rounded-1 me-3 d-none d-md-block" src={producto.imagenUrl} alt={producto.nombre} width="60" />
                      </a>
                      <div className="flex-1 ms-4">
                        <h5 className="fs-9">
                          <Link className="text-900 no-underline" to={`/product-details/${producto.ID_producto}`}>
                            {producto.nombre}
                          </Link>
                        </h5>
                        <div className="fs-11 fs-md--1 mt-2">
                          <a className="text-danger no-underline" href="#!"
                            style={{ textDecoration: 'none' }}
                            onClick={(event) => { event.preventDefault(); removeFromFavorites(producto.ID_favorito); }}>Eliminar</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 py-3 px-3 text-end text-600">${producto.precioFinal}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Favoritos;
