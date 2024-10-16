import React, { useState } from 'react';
// import './Productos.css';
import Header from '../../Esquema/Header';
import Footer from '../../Esquema/Footer';

const Producto = () => {
  const [selectedImage, setSelectedImage] = useState('/images/Products/mancuernas.jpg');

  const handleImageClick = (newImage) => {
    setSelectedImage(newImage);
  };


  return (
    <div>
      <Header />
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img className="main-image" src={selectedImage} alt="..." />
              {/* Otras imágenes */}
              <div className="d-flex mt-3">
                <img
                  className="thumbnail-image"
                  src="/images/Products/mancuernas.jpg"
                  alt="Mancuernas 1"
                  onClick={() => handleImageClick('/images/Products/mancuernas.jpg')}
                />
                <img
                  className="thumbnail-image"
                  src="/images/Products/mancuernas2.jpg"
                  alt="Mancuernas 2"
                  onClick={() => handleImageClick('/images/Products/mancuernas2.jpg')}
                />
                <img
                  className="thumbnail-image"
                  src="/images/Products/mancuernas3.png"
                  alt="Mancuernas 3"
                  onClick={() => handleImageClick('/images/Products/mancuernas3.png')}
                />
                <img
                  className="thumbnail-image"
                  src="/images/Products/mancuernasqr.png"
                  alt="Mancuernas  QR"
                  onClick={() => handleImageClick('/images/Products/mancuernasqr.png')}
                />
                {/* Agrega más imágenes según sea necesario */}
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">Mancuernas Best JY3350-10 Gris</h1>
              <div className="product-description-container small mb-3 mx-4">
                <div className='my-2'>Lo que tienes que saber de este producto</div>
                <ul>
                  <li>Con recubrimiento de goma.</li>
                  <li>Hecha en: hierro.</li>
                  <li>Forma del producto redondo.</li>
                </ul>
              </div>
              <div className="star-rating">
                <ul className="list-inline">
                  <li className="list-inline-item"><i className="fa fa-star"></i></li>
                  <li className="list-inline-item"><i className="fa fa-star"></i></li>
                  <li className="list-inline-item"><i className="fa fa-star"></i></li>
                  <li className="list-inline-item"><i className="fa fa-star"></i></li>
                  <li className="list-inline-item"><i className="fa fa-star-half-o"></i></li>
                </ul>
              </div>

              <div>
                <div class="row mb-3">
                  <label for="inputText" class="col-sm-2 col-form-label">Cantidad:</label>
                  <div class="col-sm-10">
                    <input className="form-control" type="number" placeholder="Cantidad" />
                  </div>
                </div>
              </div>

              {/* Otra información adicional (precio, stock, etc.) */}
              <div class="col-12">
                <hr class="separator-line" />
                <div class="product-detail-data-container row" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
                  <meta itemprop="url" content="https://www.foodspring.es/pre-workout/naranja-limon" />
                  <div class="col-4">
                    <div class="product-detail-status"> <span class="product-detail-status-icon product-detail-status-icon-available">
                    </span> En stock </div><div class="product-detail-unit-info">
                      <span class="icon 3 icon-foodspring-icons icon-foodspring-icons-icon-info icon-sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00008 1.72389C4.53384 1.72389 1.72389 4.53384 1.72389 8.00008C1.72389 11.4663 4.53384 14.2763 8.00008 14.2763C11.4663 14.2763 14.2763 11.4663 14.2763 8.00008C14.2763 4.53384 11.4663 1.72389 8.00008 1.72389ZM0.657227 8.00008C0.657227 3.94474 3.94474 0.657227 8.00008 0.657227C12.0554 0.657227 15.3429 3.94474 15.3429 8.00008C15.3429 12.0554 12.0554 15.3429 8.00008 15.3429C3.94474 15.3429 0.657227 12.0554 0.657227 8.00008Z" fill="#0E1312"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00013 7.4668C8.29468 7.4668 8.53346 7.70558 8.53346 8.00013V11.6668C8.53346 11.9613 8.29468 12.2001 8.00013 12.2001C7.70558 12.2001 7.4668 11.9613 7.4668 11.6668V8.00013C7.4668 7.70558 7.70558 7.4668 8.00013 7.4668Z" fill="#0E1312"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00984 5.38223C8.01 5.38143 8.01002 5.38093 8.01003 5.38088C8.01003 5.38087 8.01003 5.38087 8.01003 5.38087C8.01003 5.38088 8.01003 5.38088 8.01003 5.38087C8.01002 5.38081 8.01 5.38032 8.00984 5.37952C8.00967 5.37867 8.0094 5.3778 8.00906 5.377C8.00841 5.37548 8.00771 5.37461 8.00724 5.37414C8.00676 5.37366 8.0059 5.37296 8.00437 5.37232C8.00358 5.37198 8.00271 5.37171 8.00186 5.37153C8.00106 5.37137 8.00056 5.37135 8.00051 5.37135C8.0005 5.37135 8.0005 5.37135 8.0005 5.37135C8.00055 5.37135 8.00003 5.37135 7.99915 5.37153C7.99829 5.37171 7.99743 5.37198 7.99663 5.37232C7.99511 5.37296 7.99424 5.37366 7.99377 5.37414C7.99329 5.37461 7.99259 5.37548 7.99195 5.377C7.99161 5.3778 7.99134 5.37867 7.99116 5.37952C7.99098 5.3804 7.99098 5.38092 7.99098 5.38087C7.99098 5.38087 7.99098 5.38087 7.99098 5.38088C7.99098 5.38093 7.991 5.38143 7.99116 5.38223C7.99134 5.38308 7.99161 5.38395 7.99195 5.38474C7.99259 5.38627 7.99329 5.38713 7.99377 5.38761C7.99424 5.38808 7.99511 5.38878 7.99663 5.38943C7.99743 5.38977 7.99829 5.39004 7.99915 5.39021C8.00003 5.39039 8.00055 5.3904 8.0005 5.3904C8.00046 5.3904 8.00097 5.39039 8.00186 5.39021C8.00271 5.39004 8.00358 5.38977 8.00437 5.38943C8.0059 5.38878 8.00676 5.38808 8.00724 5.38761C8.00771 5.38713 8.00841 5.38627 8.00906 5.38474C8.0094 5.38395 8.00967 5.38308 8.00984 5.38223ZM6.94336 5.38087C6.94336 4.79703 7.41666 4.32373 8.0005 4.32373C8.58435 4.32373 9.05764 4.79703 9.05764 5.38087C9.05764 5.96472 8.58435 6.43802 8.0005 6.43802C7.41666 6.43802 6.94336 5.96472 6.94336 5.38087Z" fill="#0E1312"></path>
                        </svg>
                      </span>
                      <font style={{ verticalAlign: 'inherit' }}>
                        <font style={{ verticalAlign: 'inherit' }}>16 disponibles</font>
                      </font>
                    </div>
                  </div>
                  <div class="col-8">
                    <meta itemprop="priceCurrency" content="EUR" />
                    <div class="product-detail-price-container">
                      <meta itemprop="price" content="22.99" />
                      <div class="product-detail-list-price-wrapper">
                        <div class="list-price-price">1190.00&nbsp;</div>
                      </div>
                      <span class="product-detail-price with-list-price">
                        <div class="unit-price">883.00&nbsp;
                        </div>
                        <div class="badge badge-danger product-discount-badge">-30%</div>
                      </span>
                    </div>
                    <div class="product-detail-price-additional"><small>

                      <div class="price-additional-element"> El precio total incluye IVA,
                        <a href="#" data-bs-toggle="modal" data-bs-target="#price_additional_information">más los gastos de envío</a>
                        <div class="modal fade" id="price_additional_information" tabindex="-1" role="dialog" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Gastos de envío</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerca">
                                </button>
                              </div>
                              <div class="modal-body text-start">
                                <p>
                                  El envío es gratuito para pedidos superiores a 60,00&nbsp;€. Hasta 60,00&nbsp;€ cobramos 4,90&nbsp;€ por los gastos de envío
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </small>
                    </div>
                  </div>
                </div>
                <hr class="separator-line" />
              </div>

              <div class="d-grid">
                <button class="btn btn-padding btn-primary btn-buy" title="¡Lo quiero!" aria-label="¡Lo quiero!">
                  <i class="bi-cart-fill me-1"></i>
                  Agregar al carrito
                </button>
              </div>


            </div>
          </div>
        </div>
      </section>


      {/* <!-- Related items section--> */}
      <section class="py-5 bg-light">
        <div class="container px-4 px-lg-5 mt-5">
          <h2 class="fw-bolder mb-4">Productos relacionados</h2>
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div class="col mb-5">
              <div class="card">
                <div className="thumbP">
                  <span className="wish-icon">
                    <i className="fa fa-heart-o"></i>
                  </span>
                  <div className="img-box">
                    <img src="/images/Products/all-in-one-post-workout.png" className="img-fluid" alt="Play Station" />
                  </div>
                  <div className="thumb-content">
                    <h4>Post-entrenamiento todo en uno</h4>
                    <div className="star-rating">
                      <ul className="list-inline">
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                      </ul>
                    </div>
                    <p className="item-price"><strike>$655.00</strike> <span>$600.00</span></p>
                    <a href="#" className="btn btn-primary">Agregar al carrito</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card">
                {/* <!-- Sale badge--> */}
                <div class="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                <div className="thumbP">
                  <span className="wish-icon">
                    <i className="fa fa-heart-o"></i>
                  </span>
                  <div className="img-box">
                    <img src="/images/Products/creatine-pulver.png" className="img-fluid" alt="Play Station" />
                  </div>
                  <div className="thumb-content">
                    <h4>Creatina en polvo</h4>
                    <div className="star-rating">
                      <ul className="list-inline">
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                      </ul>
                    </div>
                    <p className="item-price"><strike>$250.00</strike> <span>$200.00</span></p>
                    <a href="#" className="btn btn-primary">Agregar al carrito</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card">
                {/* <!-- Sale badge--> */}
                <div class="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
                <div className="thumbP">
                  <span className="wish-icon">
                    <i className="fa fa-heart-o"></i>
                  </span>
                  <div className="img-box">
                    <img src="/images/Products/creatine-pulver.png" className="img-fluid" alt="Play Station" />
                  </div>
                  <div className="thumb-content">
                    <h4>Creatina en polvo</h4>
                    <div className="star-rating">
                      <ul className="list-inline">
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                      </ul>
                    </div>
                    <p className="item-price"><strike>$250.00</strike> <span>$200.00</span></p>
                    <a href="#" className="btn btn-primary">Agregar al carrito</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card">
                <div className="thumbP">
                  <span className="wish-icon">
                    <i className="fa fa-heart-o"></i>
                  </span>
                  <div className="img-box">
                    <img src="/images/Products/creatine-pulver.png" className="img-fluid" alt="Play Station" />
                  </div>
                  <div className="thumb-content">
                    <h4>Creatina en polvo</h4>
                    <div className="star-rating">
                      <ul className="list-inline">
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                      </ul>
                    </div>
                    <p className="item-price"><strike>$250.00</strike> <span>$200.00</span></p>
                    <a href="#" className="btn btn-primary">Agregar al carrito</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card">
                <div className="thumbP">
                  <span className="wish-icon">
                    <i className="fa fa-heart-o"></i>
                  </span>
                  <div className="img-box">
                    <img src="/images/Products/creatine-pulver.png" className="img-fluid" alt="Play Station" />
                  </div>
                  <div className="thumb-content">
                    <h4>Creatina en polvo</h4>
                    <div className="star-rating">
                      <ul className="list-inline">
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                      </ul>
                    </div>
                    <p className="item-price"><strike>$250.00</strike> <span>$200.00</span></p>
                    <a href="#" className="btn btn-primary">Agregar al carrito</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-5">
              <div class="card">
                <div className="thumbP">
                  <span className="wish-icon">
                    <i className="fa fa-heart-o"></i>
                  </span>
                  <div className="img-box">
                    <img src="/images/Products/creatine-pulver.png" className="img-fluid" alt="Play Station" />
                  </div>
                  <div className="thumb-content">
                    <h4>Creatina en polvo</h4>
                    <div className="star-rating">
                      <ul className="list-inline">
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star"></i></li>
                        <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
                      </ul>
                    </div>
                    <p className="item-price"><strike>$250.00</strike> <span>$200.00</span></p>
                    <a href="#" className="btn btn-primary">Agregar al carrito</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Producto;
