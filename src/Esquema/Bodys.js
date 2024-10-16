import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from './Headerq';
import Footer from './Footer';
import styles from "../Paginacion/Empresa/Contacto/Contacto.module.css";
// import './Header.css';

const Bodys= () => {
  return (
    <>
    <Header />
    <section >
        <div class="container">
          <h2 className='h2'><b>Contáctanos</b></h2>
          <div class="row"> 
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className={`${styles.contactWidget}`}>
                <span class="icon-phone"></span>
                <h4>Teléfono</h4>
                <p>+52 7717935563</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className={`${styles.contactWidget}`}>
                <span class="icon-ubicacion"></span>
                <h4>Dirección</h4>
                <p>Ote. 7 MZC LT7, Parque de Poblamiento, 43000 Huejutla de Reyes, Hgo.</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className={`${styles.contactWidget}`}>
                <span class="icon-clock-1"></span>
                <h4>Tiempo abierto</h4>
                <p>8:00 am a 12:00 pm</p>
                <p>4:00 pm to 10:00 pm</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className={`${styles.contactWidget}`}>
                <span class="icon-correo"></span>
                <h4>Correo electrónico</h4>
                <p>sportgymcenterinfo@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class={`${styles.map}`}>
        <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.036044992767!2d-98.38401482587831!3d21.150963783572227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d725db91202525%3A0xfcb308bede75f77b!2sSport%20Gym%20Center!5e0!3m2!1ses!2smx!4v1700597387464!5m2!1ses!2smx"
          height="500" style={{ border: '0' }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        {/* <div class="map-inside">
          <i class="icon_pin"></i>
          <div class="inside-widget">
            <h4>Huejutla de Reyes</h4>
            <ul>
              <li>Teléfono: +52 7717935563</li>
              <li>Ote. 7 MZC LT7, Parque de Poblamiento, 43000 Huejutla de Reyes, Hgo.</li>
            </ul>
          </div>
        </div> */}
      </div>

      <div class={`${styles.contactForm} ${styles.spad} spad`}> 
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class={`${styles.contactFormTitle}`}>
                <h2>Deja un mensaje</h2>
              </div>
            </div>
          </div>
          <form action="#">
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <input type="text" placeholder="Nombre" />
              </div>
              <div class="col-lg-6 col-md-6">
                <input type="text" placeholder="Correo electrónico" />
              </div>
              <div class="col-lg-12 text-center">
                <textarea placeholder="Tu mensaje"></textarea>
                <button type="submit" class="site-btn">ENVIAR MENSAJE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default Bodys;
