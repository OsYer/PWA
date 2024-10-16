import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../../Esquema/Header.js';
import Footer from '../../../Esquema/Footer.js';
import Swal from 'sweetalert2';
import { baseURL } from '../../../api.js';

import { GoHeartFill } from "react-icons/go";

import { Tabs, Tab } from 'react-bootstrap';
import './ProductDetails.css';

import Spinner from '../../utilidades/Spinner';

import Review from './Review.js';
import ReviewForm from './ReviewForm.js';
import ProductRating from './ProductRating.js';
import ImagenesProductos from './ImagenesProductos.js';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [idUsuario, setIdUsuario] = useState("");

  const [IdFavorito, setIdFavorito] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Definir la función de solicitud fetch
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${baseURL}/products-with-imagens/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setMaxQuantity(data[0].existencias);
          setLoading(false);

        } else {
          console.error('Error al cargar los datos del producto');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };
    fetchProduct();
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      setIdUsuario(user.ID_usuario);
      checkIfFavorite(user.ID_usuario, id);
    }
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  const addToCart = async () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await fetch(`${baseURL}/carrito-compras-existe-prod/${user.ID_usuario}/${product[0].ID_producto}`);
        if (response.ok) {
          const data = await response.json();
          // console.log(data.ID_carrito)
          if (data.existeRegistro) {
            const response = await fetch(`${baseURL}/carrito-compras/${data.ID_carrito}`);
            if (!response.ok) {
              throw new Error('Error al obtener los elementos del carrito');
            }
            const datos = await response.json();
            // console.log("datos", datos)
            const cantidad = quantity + datos.cantidad;
            if (cantidad > maxQuantity) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "¡La cantidad de productos seleccionados accede el maximo en stock!",
                footer: '<a href="/carrito">Ir al carrito</L>'
              });
            } else {
              updateItemQuantity(data.ID_carrito, cantidad);
            }
          } else {
            try {
              const response = await fetch(`${baseURL}/carrito-compras`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  ID_usuario: user.ID_usuario,
                  ID_producto: product[0].ID_producto,
                  cantidad: quantity
                })
              });
              if (response.ok) {
                Swal.fire({
                  title: "Producto agregado al carrito",
                  icon: "success",
                  showDenyButton: true,
                  // showCancelButton: true,
                  confirmButtonText: "Ver carrito",
                  denyButtonText: "Seguir comprando",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/carrito";
                  } else if (result.isDenied) {
                    window.location.href = "/tienda";
                  }
                });
              } else {
                console.error('Error al agregar el producto al carrito');
              }
            } catch (error) {
              console.error('Error de red:', error);
            }
          }
        } else {
          throw new Error('Error al verificar la existencia del producto en el carrito');
        }
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }

    } else {
      navigate('/login');
    }
  };

  const updateItemQuantity = async (ID_carrito, cantidad) => {
    try {
      const response = await fetch(`${baseURL}/carrito-compras/${ID_carrito}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cantidad })
      });
      if (response.ok) {
        Swal.fire({
          title: "Producto agregado al carrito",
          icon: "success",
          showDenyButton: true,
          confirmButtonText: "Ver carrito",
          denyButtonText: "Seguir comprando",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/carrito";
          } else if (result.isDenied) {
          }
        });
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };


  const formatDescription = (description) => {
    const lines = description.split('•');
    return (
      <div>
        <p>{lines[0]}</p>
        <ul>
          {lines.slice(1).map((line, index) => (
            <li key={index}>{line.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };


  const checkIfFavorite = async (userId, productId) => {
    try {
      const response = await fetch(`${baseURL}/favoritos/${userId}/${productId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setIdFavorito(data.ID_favorito)
        setIsFavorite(data.isFavorito);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  const addToFavorites = async () => {
    if (idUsuario) {
      try {
        if (isFavorite) {
          const deleteResponse = await fetch(`${baseURL}/favorito/${IdFavorito}`, {
            method: 'DELETE'
          });

          if (deleteResponse.ok) {
            setIsFavorite(false);
            // Swal.fire({
            //   title: "Producto eliminado de favoritos",
            //   icon: "success",
            // });
          } else {
            console.error('Error al eliminar el producto de favoritos');
          }
        } else {
          const addResponse = await fetch(`${baseURL}/favoritos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ID_usuario: idUsuario,
              ID_producto: parseInt(id, 10),
            })
          });

          if (addResponse.ok) {
            setIsFavorite(true);
            // Swal.fire({
            //   title: "Producto agregado a favoritos",
            //   icon: "success",
            //   showDenyButton: true,
            //   confirmButtonText: "Ver favoritos",
            //   denyButtonText: "Seguir comprando",
            // }).then((result) => {
            //   if (result.isConfirmed) {
            //     window.location.href = "/favoritos";
            //   } else if (result.isDenied) {
            //     window.location.href = "/tienda";
            //   }
            // });
          } else {
            console.error('Error al agregar el producto a favoritos');
          }
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "No has iniciado sesión",
        text: "Por favor, inicia sesión para agregar productos a tus favoritos.",
        footer: '<a href="/login">Iniciar sesión</a>'
      });
    }
  };




  return (
    <>
      <Header />
      <section className="product-details spad">
        <div className="container">
          {loading && (
            <div className="spinner-container">
              <Spinner contentReady={!loading} />
            </div>
          )}
          {!loading && (
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="product__details__pic">
                  <ImagenesProductos productId={parseInt(id, 10)} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                  <h3>{product && product.length > 0 ? product[0].nombre : "Nombre del Producto"}</h3>
                  <div className="product__details__rating">
                    <ProductRating productId={parseInt(id, 10)} />
                  </div>
                  {product && product.length > 0 && product[0].existencias > 0 ? (
                    <>
                      <div className="product__details__price mb-0">${product[0].precio}</div>
                      <p>IVA incluido</p>
                      <div className="product__details__quantity">
                        <div className="quantity">
                          <div className="pro-qty">
                            <input type="number" value={quantity} min="1" max={maxQuantity} onChange={handleQuantityChange} />
                          </div>
                        </div>
                      </div>
                      <button className="primary-btn" onClick={addToCart} style={{ border: 'none' }}>
                        AGREGAR AL CARRITO
                      </button>
                    </>
                  ) : (
                    <p>El producto no está disponible por falta de stock</p>
                  )}
                  <a className="heart-icon" onClick={addToFavorites}>
                    <GoHeartFill size={18} style={{ color: isFavorite ? 'red' : 'gray' }} />
                  </a>
                  <ul>
                    <li><b>Disponibilidad</b> <span> ({product && product.length > 0 ? product[0].existencias : "NULL"}) En stock</span></li>
                    <li><b>Envío</b> <span>Mismo día de compra. <samp>Envío gratis unicamente en Huejutla</samp></span></li>
                    {/* <li><b>Peso</b> <span>0.5 kg</span></li> */}
                  </ul>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="product__details__tab">
                  <Tabs defaultActiveKey="descripcion" id="product-details-tabs" className="no-border-tabs">
                    <Tab eventKey="descripcion" title="Descripción">
                      <div className="tab-content-custom">
                        <h6>Información del producto</h6>
                        <p>{product && product.length > 0 ? formatDescription(product[0].descripcion) : "Descripción del Producto"}</p>
                      </div>
                    </Tab>
                    <Tab eventKey="resenas" title="Reseñas">
                      <div className="tab-content-custom">
                        <h6>Reseñas del producto</h6>
                      </div>
                      <div class="row mt-3">
                        <Review productId={parseInt(id, 10)} />
                        <ReviewForm productId={parseInt(id, 10)} userId={idUsuario} />
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
