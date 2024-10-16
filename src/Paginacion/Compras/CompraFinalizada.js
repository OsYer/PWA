import React, { useState, useEffect } from 'react';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import { useParams } from 'react-router-dom';
import { baseURL } from '../../api.js';
import ConfettiComponent from '../utilidades/ConfetiComponent.js';
import Spinner from '../utilidades/Spinner';
import "./CompraFinalizada.css"
import DOMPurify from 'dompurify';
import { FaPlus } from "react-icons/fa";

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const CompraFinalizada = () => {
  const [productos, setProductos] = useState([]);
  const [membresia, setMembresia] = useState([]);
  const { id, tipo } = useParams();
  const [comprado, setComprado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imagenes, setImagenes] = useState([]);

  const fetchValidarCompra = async (id) => {
    try {
      const response = await fetch(`${baseURL}/orden-pedido-existe/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.existeRegistro) {
          setComprado(true);
          fetchCompras(id);
        }
      } else {
        console.error("Error al cargar los productos del carrito");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const fetchValidarMembresia = async () => {
    // console.log("validarMembresia")
    try {
      const response = await fetch(`${baseURL}/membresia-usuario-existe/${id}`);

      if (response.ok) {
        const data = await response.json();
        if (data.existeRegistro) {
          setComprado(true);
          fetchMembresia();
        }
      } else {
        console.error("Error al cargar los productos del carrito");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };


  const fetchCompras = async (ID_pedido) => {
    try {
      const response = await fetch(`${baseURL}/detalles-pedido-items/${ID_pedido}`);
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
        setLoading(false);
        const urls = data.map(producto => producto.imagenUrl);
        setImagenes(urls);
      } else {
        console.error("Error al cargar los productos del carrito");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const fetchMembresia = async () => {
    try {
      const response = await fetch(`${baseURL}/membresia-usuario-existe-id-membresia/${id}`);
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        setMembresia(data);
        setLoading(false);
      } else {
        console.error("Error al cargar los productos del carrito");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    if (tipo == 1) {
      fetchValidarCompra(id)
    } else {
      fetchValidarMembresia()
    }
  }, []);

  return (
    <>
      <Header />
      {comprado && <ConfettiComponent />}
      <div className='container'>
        <div className='content-height'>

          <Spinner contentReady={!loading} />
          {!loading && (
            <div className="container">
              <div className="contenido">
                {tipo == 1 ? (
                  <>
                    <div className="imagen-container mt-5">
                      {imagenes.map((url, index) => (

                        <div key={index} className={`imagen-item ${index + 1 >= 3 ? "opacidad" : ""}`}>
                          <img src={DOMPurify.sanitize(url)} alt={`Imagen ${index + 1}`} />
                        </div>
                      ))}
                      {imagenes.length + 1 > 3 && <div className="icono-mas"><FaPlus size={40} /></div>}
                    </div>
                    <div className="empty-cart-message">
                      <h6>Gracias por tu compra</h6>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="centered-text">
                      {membresia.map((memb, index) => (
                        <div key={index}>
                          <div className="empty-cart-message">
                            <h6>Gracias por tu compra</h6>
                          </div>
                          <div className='my-2'>
                            <p>Nombre: {memb.nombre}</p>
                            <p>Fecha de Inicio: {moment(memb.fechaInicio).format('DD [de] MMMM [del] YYYY')}</p>
                            <p>Fecha de Vencimiento: {moment(memb.fechaVencimiento).format('DD [de] MMMM [del] YYYY')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CompraFinalizada;
