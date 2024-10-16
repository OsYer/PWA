import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Footer2() {
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
              <div>
                <div>
                  <Link to={"/indexH"}><img src="/images/logo_letras.jpeg" alt="" style={{maxHeight: '75px'}} /></Link>
                </div>
                <ul>
                  <li className='text-white'>Dirección: Ote. 7 MZC LT7, Parque de Poblamiento, 43000 Huejutla de Reyes, Hgo.</li>
                  <li className='text-white'>Teléfono: +52 7717935563</li>
                  <li className='text-white'>Correo : sportgymcenterinfo@gmail.com</li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
              <div class="text-white">
                <h4 className='text-white'>Enlaces útiles</h4>
                <ul>
                  <li><a href="#" className='text-white'>Sobre nosotros</a></li>
                  <li><a href="#" className='text-white'>Quienes somos</a></li>
                  <li><a href="#" className='text-white'>Contacto</a></li>
                </ul>
                <ul>
                  <li><a href="#" className='text-white'>Política de privacidad</a></li>
                  <li><a href="/terminos-y-condicionesH" className='text-white'>Términos y condiciones</a></li>
                  <li><a href="#" className='text-white'>Política de Cookies</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div>
                <h4 className='text-white'>Síguenos</h4>
                <p className='text-white'>Buscanos en las siguientes redes sociales.</p>
                <div>
                  <a href="https://www.facebook.com/profile.php?id=100063449692054"><i class="fa fa-facebook"></i></a>
                  <a href="#"><i class="fa fa-instagram"></i></a>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                  <a href="#"><i class="fa fa-pinterest"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <div><p className='text-white'>
                  <Link to="#" className='text-white'>Privacidad | </Link>
                  <Link to="/terminos-y-condicionesH" className='text-white'>Términos y condiciones | </Link>
                  <Link to="#" className='text-white'>Cookies | </Link>
                  Copyright &copy;{currentYear} Todos los derechos reservados
                </p></div>
                
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer Section End --> */}
    </div>
  );
}

export default Footer2;
