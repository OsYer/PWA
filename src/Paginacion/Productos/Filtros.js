import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Productos.module.css'; 
import Header from '../../Esquema/Header';
import Footer from '../../Esquema/Footer';

const Filtros = () => {
  
  const [showFilters, setShowFilters] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };


  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid my-5">
        <div>
          {/* Filtros para pantallas pequeñas */}
          {showFilters && (
            <div className={`mobile-filters ${screenSize < 768 ? '' : 'd-none'}`}>
              <h2>Filtros</h2>
              <div className={`${styles.sidebarSection}`}>
                <h3>Marca</h3>
                <ul>
                  <li><a href="#"><span>Marca 1</span></a></li>
                  <li><a href="#"><span>Marca 2</span></a></li>
                  <li><a href="#"><span>Marca 3</span></a></li>
                  {/* Agrega más marcas según sea necesario */}
                </ul>
              </div>
              <div className={`${styles.sidebarSection}`}>
                <h3>Sabor</h3>
                <ul>
                  <li><a href="#"><span>Sabor 1</span></a></li>
                  <li><a href="#"><span>Sabor 2</span></a></li>
                  <li><a href="#"><span>Sabor 3</span></a></li>
                  {/* Agrega más sabores según sea necesario */}
                </ul>
              </div>
              <div className={`${styles.sidebarSection}`}>
                <h3>Precio</h3>
                <ul>
                  <li><a href="#"><span>Precio 1</span></a></li>
                  <li><a href="#"><span>Precio 2</span></a></li>
                  {/* Agrega más precios según sea necesario */}
                </ul>
                <form>
                  <input type="text" placeholder="Precio mínimo" style={{ width: '100px', marginRight: '10px' }} />
                  <input type="text" placeholder="Precio máximo" style={{ width: '100px', marginRight: '10px' }} />
                  <button type="submit">Filtrar</button>
                </form>
              </div>
            </div>
          )}
          {/* Products */}
          <div className="row">
            {/* Botón para mostrar filtros en pantallas pequeñas */}
            <div className="col-md-9 mb-3 d-md-none">
              <button onClick={toggleFilters}>Mostrar Filtros</button>
            </div>
            <div className="col-md-3 d-none d-md-block">
              <div className={`${styles.sidebar}`}>
                <h2>Sidebar</h2>
                {/* Agrega aquí los elementos de tu sidebar */}
                <div className={`${styles.sidebarSection}`}>
                  <h3>Marca</h3>
                  <ul>
                    <li><a href="#"><span>Marca 1</span></a></li>
                    <li><a href="#"><span>Marca 2</span></a></li>
                    <li><a href="#"><span>Marca 3</span></a></li>
                    {/* Agrega más marcas según sea necesario */}
                  </ul>
                </div>
                <div className={`${styles.sidebarSection}`}>
                  <h3>Sabor</h3>
                  <ul>
                    <li><a href="#"><span>Sabor 1</span></a></li>
                    <li><a href="#"><span>Sabor 2</span></a></li>
                    <li><a href="#"><span>Sabor 3</span></a></li>
                    {/* Agrega más sabores según sea necesario */}
                  </ul>
                </div>
                <div className={`${styles.sidebarSection}`}>
                  <h3>Precio</h3>
                  <ul>
                    <li><a href="#"><span>Precio 1</span></a></li>
                    <li><a href="#"><span>Precio 2</span></a></li>
                    {/* Agrega más precios según sea necesario */}
                  </ul>
                  <form>
                    <input type="text" placeholder="Precio mínimo" style={{ width: '100px', marginRight: '10px' }} />
                    <input type="text" placeholder="Precio máximo" style={{ width: '100px', marginRight: '10px' }} />
                    <button type="submit">Filtrar</button>
                  </form>
                </div>

              </div>
            </div>
            <div className="col-md-9">

              <div className="row">
                <div className="col-md-4 mb-4">
                  <Link to="/verdetalleproducto">
                    <div className={`${styles.productCard} card`}>
                      <img src="https://conteudo.imguol.com.br/c/entretenimento/2f/2016/10/03/black-goku-1475521150782_615x300.jpg" alt="Producto 1" className="card-img-top" />
                      <div className={`${styles.cardBody} card-body`}>
                        <h5 className="card-title">Producto 1</h5>
                        <div className="star-rating">
                          <ul className="list-inline">
                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                            <li className="list-inline-item"><i className="fa fa-star"></i></li>
                            <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                          </ul>
                        </div>
                        <p className="card-text">
                          <span className="text-muted">$100</span>
                          <br />
                          <span className="text-danger"><strike>$120</strike></span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Filtros;
