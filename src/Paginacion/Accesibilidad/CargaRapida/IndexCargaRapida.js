import React from 'react';
import Header from '../Esquema/HeaderH';
import Footer from '../Esquema/FooterH';

function IndexCargaRapida() {
  return (
    <div>
      <Header />
      <body>
        <div>
          {/* Carrusel */}
          
              <img
                src="/images/Carrusel/1.jpg" // Ruta de la primera imagen del carrusel
                alt="Primera imagen"
              />

              <img
                src="/images/Carrusel/2.jpg" // Ruta de la primera imagen del carrusel
                alt="Primera imagen"
              />
             
  
              <img
                src="/images/Carrusel/3.jpg" 
                alt="Primera imagen"
              />
              
          {/* Sección 1 */}
          <section>
            <h3>¿Qué temas de interesan?</h3>
            <p>Contenido de la sección 1.</p>
          </section>

          {/* Sección 2 */}
          <section>
            <h1>Sección 2</h1>
            <p>Contenido de la sección 2.</p>
            <div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <img
                    src="/images/productos/clear-whey.png"
                    alt="brazos"
                    style={{ maxWidth: '100px', height: '200px' }}
                  />
                </div>
                <div>
                  <div>
                    <h5>Producto 1</h5>
                    <p>Descripción del Producto 1</p>
                  </div>
                  <div>
                    <p>$10.99</p>
                    <button>¡Lo necesito!</button>
                  </div>
                </div>
              </div>


              <div>
                <img src="/images/productos/creatine.png" alt="quitabarrigas"
                  style={{ maxWidth: '100px', height: '200px' }} />
                <div>
                  <h5>Card title</h5>
                  <p>This card has supporting text below as a natural lead-in to additional content.</p>
                  <p><small>Last updated 3 mins ago</small></p>
                </div>
              </div>
              <div>
                <img src="/images/productos/vegan_protein.png" alt="quitabarrigas"
                  style={{ maxWidth: '100px', height: '200px' }} />
                <div>
                  <h5>Card title</h5>
                  <p>This card has supporting text below as a natural lead-in to additional content.</p>
                  <p><small>Last updated 3 mins ago</small></p>
                </div>
              </div>
              <div>
                <img src="/images/productos/wheb_protein.png" alt="quitabarrigas"
                  style={{ maxWidth: '100px', height: '200px' }} />
                <div>
                  <h5>Card title</h5>
                  <p>This card has supporting text below as a natural lead-in to additional content.</p>
                  <p><small>Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 3 */}
          <section>
            <h1>Sección 3</h1>
            <p>Contenido de la sección 3.</p>
          </section>
        </div>
        <Footer />
      </body>
    </div>


  );
}

export default IndexCargaRapida;
