import React from 'react';
import Header from '../../../Esquema/Header';
import Footer from '../../../Esquema/Footer';

const Nosotros = () => {

  return (
    <div>
      <Header />
      <section className="bg0 p-t-75 p-b-120">
        <div className='content'>
          <div className="container">
            <h2 className='h2Products'><b>Sobre Nosotros</b></h2>
            <div className="row p-b-148">
              <div className="col-md-7 col-lg-8">
                <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                  <h3>
                    Misión
                  </h3>
                  <p>
                    En Sport GYM Center, nos comprometemos a ser el catalizador que impulsa la transformación
                    positiva en la vida de nuestros miembros, proporcionando un espacio
                    inspirador y accesible donde cada individuo, independientemente de su nivel de
                    condición física, encuentre el apoyo y los recursos necesarios para alcanzar sus
                    metas de bienestar y fitness. Nos esforzamos por fomentar una comunidad saludable y
                    vibrante que motive a nuestros miembros a adoptar un estilo de vida activo y equilibrado.
                  </p>
                </div>
              </div>

              <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                <div className='my-3'>
                  <div>
                    <img src="/images/logo.jpeg" alt="IMG" style={{ maxHeight: '200px', width: 'auto' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="order-md-2 col-md-7 col-lg-8 p-b-30">
                <div>
                  <h3 >
                    Visión
                  </h3>
                  <p>
                    Nuestra visión es ser reconocidos como el referente líder en bienestar y fitness,
                    destacando por nuestra comunidad comprometida, instalaciones de vanguardia y
                    programas innovadores. Aspiramos a inspirar y capacitar a las personas de
                    todas las edades y niveles de condición física, convirtiéndonos en el
                    destino preferido para aquellos que buscan alcanzar sus metas de salud y
                    bienestar. En Sport GYM Center, visualizamos un futuro donde cada individuo
                    descubre su mejor versión a través de una vida activa y equilibrada.
                  </p>
                </div>
              </div>

              <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30 ">
                <div className='my-3'>
                  <div>
                    <img src="/images/logoFB.jpg" alt="IMG" style={{ maxHeight: '200px', width: 'auto' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="center">
              <div style={{ textAlign: "Center" }}>
                <div>
                  <h3 >
                    Valores
                  </h3>
                  <p>
                    Apego a la filosofía de la salud y el bienestar
                  </p>
                  <p>
                    Profesionalismo
                  </p>
                  <p>
                    Eficacia en el logro de los objetivos
                  </p>
                  <p>
                    Confianza
                  </p>
                  <p>
                    Excelencia
                  </p>
                  <p>
                    Responsabilidad y Respeto
                  </p>
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

export default Nosotros;
