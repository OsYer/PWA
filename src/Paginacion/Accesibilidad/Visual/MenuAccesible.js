import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import './MenuAccesible.css';

const MenuAccessible = () => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const handleMouseEnter = (text, sectionId) => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      speakText(text);
    }, 100);
    setTimeoutId(newTimeoutId);

    // Marcar la sección como activa al pasar el mouse
    setHoveredSection(sectionId);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // Limpiar la marca de la sección al salir del mouse
    setHoveredSection(null);
  };

  return (
    <div>
      <h2 className="menu-title">Menu de información</h2>
      <div className="menu-container">
      <Link to="/">
          <div id="regresar"
            className={`section ${hoveredSection === 'regresar' ? 'hover-section' : ''}`}
            onMouseEnter={() => handleMouseEnter('Regresar', 'regresar')}
            onMouseLeave={handleMouseLeave} >
            Regresar
          </div>
      </Link>
      <Link to="/tiendaV">
        <div
          id="tienda"
          className={`section ${hoveredSection === 'tienda' ? 'hover-section' : ''}`}
          onMouseEnter={() => handleMouseEnter('Tienda', 'tienda')}
          onMouseLeave={handleMouseLeave}
        >
          Tienda
        </div>
      </Link>
      <Link to="/contactoV">
        <div
          id="contacto"
          className={`section ${hoveredSection === 'contacto' ? 'hover-section' : ''}`}
          onMouseEnter={() => handleMouseEnter('Contacto', 'contacto')}
          onMouseLeave={handleMouseLeave}
        >
          Contacto
        </div>
      </Link>
      <Link to="/privacidadV">
        <div id="privacidad" className={`section ${hoveredSection === 'privacidad' ? 'hover-section' : ''}`}
          onMouseEnter={() => handleMouseEnter('Política de privacidad', 'privacidad')}
          onMouseLeave={handleMouseLeave} >
          Política de privacidad
        </div>
      </Link>
      <Link to="/privacidadV">
        <div
          id="terminos" className={`section ${hoveredSection === 'terminos' ? 'hover-section' : ''}`}
          onMouseEnter={() => handleMouseEnter('Términos y condiciones', 'terminos')}
          onMouseLeave={handleMouseLeave} >
          Términos y condiciones
        </div>
      </Link>
      <Link to="/cookiesV">
        <div id="cookies" className={`section ${hoveredSection === 'cookies' ? 'hover-section' : ''}`}
          onMouseEnter={() => handleMouseEnter('Política de Cookies', 'cookies')}
          onMouseLeave={handleMouseLeave} >
          Política de Cookies
        </div>
      </Link>
      </div>
    </div>
  );
};

export default MenuAccessible;
