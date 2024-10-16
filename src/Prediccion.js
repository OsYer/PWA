// src/components/Prediccion.js

import React from 'react';

import Header from "./Esquema/Header.js";
import Footer from "./Esquema/Footer.js";

const Prediccion = () => {
  return (
    <>
      <Header />
      <div style={{ width: '100%', height: '100vh' }}>
        <iframe
          src="https://gym-prediction.onrender.com/"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Prediccion"
        />
      </div>
      <Footer />
    </>

  );
};

export default Prediccion;
