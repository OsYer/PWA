import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import './FooterV.css';

const styles = {
  p: {
      fontSize: '25px',
  },
};


function FooterV() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Actualiza el año actual al montar el componente
    setCurrentYear(new Date().getFullYear());
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>
      {/* <!-- Footer Section Begin --> */}
      <footer class="footer2 spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="footer__about">
                <div class="footer__about__logo">
                  <a href="./index.html"><img src="/images/logo_letras.jpeg" alt="" style={{maxHeight: '75px'}} /></a>
                </div>
                <ul>
                  <li className='text-white' style={styles.p}>Dirección: Ote. 7 MZC LT7, Parque de Poblamiento, 43000 Huejutla de Reyes, Hgo.</li>
                  <li className='text-white' style={styles.p}>Teléfono: +52 7717935563</li>
                  <li className='text-white' style={styles.p}>Correo : sportgymcenterinfo@gmail.com</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div class="footer__widget text-white">
                <h6 className='text-white'>Enlaces útiles</h6>
                <ul>
                  <li><a href="#" className='text-white' style={styles.p}>Sobre nosotros</a></li>
                  <li><a href="#" className='text-white' style={styles.p}>Quienes somos</a></li>
                  <li><a href="#" className='text-white' style={styles.p}>Contacto</a></li>
                </ul>
                <ul>
                  <li><a href="/privacidad" className='text-white' style={styles.p}>Política de privacidad</a></li>
                  <li><a href="/terminos-y-condiciones" className='text-white' style={styles.p}>Términos y condiciones</a></li>
                  <li><a href="/cookies" className='text-white' style={styles.p}>Política de Cookies</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div class="footer__widget">
                <h6 className='text-white' style={styles.p}>Síguenos</h6>
                <p className='text-white' style={styles.p}>Buscanos en las siguientes redes sociales.</p>
                {/* <h6>Join Our Newsletter Now</h6>
                                <p>Get E-mail updates about our latest shop and special offers.</p>
                                <form action="#">
                                    <input type="text" placeholder="Enter your mail" />
                                    <button type="submit" class="site-btn">Subscribe</button>
                                </form> */}
                <div class="footer__widget__social" >
                  <a href="https://www.facebook.com/profile.php?id=100063449692054"><i class="fa fa-facebook" style={styles.p}></i></a>
                  <a href="#"><i class="fa fa-instagram" style={styles.p}></i></a>
                  <a href="#"><i class="fa fa-twitter" style={styles.p}></i></a>
                  <a href="#"><i class="fa fa-pinterest" style={styles.p}></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="footer__copyright">
                <div class="footer__copyright__text"><p className='text-white' style={styles.p}>
                  <Link to="#" className='text-white' style={styles.p}>Privacidad | </Link>
                  <Link to="#" className='text-white' style={styles.p}>Términos y condiciones | </Link>
                  <Link to="/cookiesV" className='text-white' style={styles.p}>Cookies | </Link>
                  Copyright &copy;{currentYear} Todos los derechos reservados
                </p></div>
                <div class="footer__copyright__payment"><img src="/img/payment-item.png" alt="" /></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer Section End --> */}
    </div>
  );
}

export default FooterV;
