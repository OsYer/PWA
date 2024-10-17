import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Esquema/Header';
import Footer from '../../Esquema/Footer';
import { baseURL } from '../../api.js';
import Spinner from '../utilidades/Spinner';
import './Productos.css';
import SearchBar from '../SearchBar.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductItem({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async (event) => {
    event.preventDefault();
    setIsFavorite(!isFavorite); // Simulación de toggle de favoritos
    toast.success(
      isFavorite ? 'Producto eliminado de favoritos.' : 'Producto agregado a favoritos.'
    );
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="product__item">
        <div className="product__item__pic">
          <img src={product.imagenUrl} alt={product.nombre} loading="lazy" />
          <ul className="product__item__pic__hover">
            <li>
              <a href="#" onClick={toggleFavorite}>
                <i className="fa fa-heart" style={{ color: isFavorite ? 'red' : 'black' }}></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-share-alt"></i>
              </a>
            </li>
          </ul>
        </div>
        <Link to={`/product-details/${product.ID_producto}`} className="product__item__text">
          <h6>{product.nombre}</h6>
          <h5>${product.precioFinal}</h5>
        </Link>
      </div>
    </div>
  );
}

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const productsPerPage = 9; // Número de productos por página

  useEffect(() => {
    fetchProducts(); // Cargar productos iniciales
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight && hasMore
    ) {
      fetchProducts();
    }
  }, [hasMore]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/listar-productos-imagen-principal?page=${currentPage}&limit=${productsPerPage}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setProducts((prev) => [...prev, ...data]);
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false); // No hay más productos por cargar
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={(query) => console.log('Buscando:', query)} />
      <ToastContainer />
      <section className="product spad">
        <div className="container">
          <div className="row">
            {products.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>
          {loading && (
            <div className="spinner-container">
              <Spinner contentReady={!loading} />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Productos;
