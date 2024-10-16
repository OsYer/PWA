import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const handleMouseOver = (textToRead) => {
    // Crear un objeto de mensaje de voz
    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Hacer que el navegador hable el texto
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <p onMouseOver={() => handleMouseOver('Hola, soy un ejemplo de texto a voz.')} >Texto que se leerá al pasar el ratón sobre él.</p>
      <p onMouseOver={() => handleMouseOver('¡Gracias por usar la función de texto a voz!')} >Otro texto para probar.</p>
    </div>
  );
};

export default TextToSpeech;
