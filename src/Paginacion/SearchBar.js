import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone, faSpinner } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Función para manejar cambios en el input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para manejar búsqueda cuando se hace clic en el ícono de "Buscar"
  const handleSearch = (query) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  // Función para iniciar el reconocimiento de voz
  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.lang = 'es-ES';  // Establecemos el idioma a español
    recognition.interimResults = false;  // Para evitar resultados intermedios
    recognition.maxAlternatives = 1;  // Solo obtenemos una alternativa de resultado

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      console.log("voiceInput", voiceInput);  // Verificación en consola
      setSearchTerm(voiceInput);  // Actualiza el input con el texto reconocido
      handleSearch(voiceInput);  // Envia el texto reconocido automáticamente
      setIsListening(false);
    };

    recognition.onspeechend = () => {
      recognition.stop();  // Dejamos de escuchar cuando el usuario deja de hablar
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Error en reconocimiento de voz:", event.error);
      setIsListening(false);
    };
  };

  return (
    <div style={styles.searchContainer}>
      <div style={styles.inputContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.icon} onClick={() => handleSearch(searchTerm)} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar..."
          style={styles.input}
        />
        {/* Cambia el ícono del micrófono y el color cuando está escuchando */}
        <FontAwesomeIcon
          icon={isListening ? faSpinner : faMicrophone}
          style={isListening ? styles.iconMicActive : styles.iconMic}
          onClick={handleVoiceSearch}
          spin={isListening}  // Añadimos un efecto de "spin" cuando está activo
        />
      </div>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    flexWrap: 'wrap',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',  // Color gris del input
    borderRadius: '30px',
    padding: '8px',
    width: '300px',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',  // Fondo transparente para el input
    border: 'none',
    outline: 'none',
    padding: '0 10px',
    fontSize: '16px',
  },
  icon: {
    color: '#666',
    cursor: 'pointer',
    fontSize: '18px',
  },
  iconMic: {
    color: '#666',
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: '10px',
    transition: 'color 0.3s ease',
  },
  iconMicActive: {
    color: '#f44336',  // Color rojo cuando está escuchando
    cursor: 'pointer',
    fontSize: '18px',
    marginLeft: '10px',
    transition: 'color 0.3s ease',
  },
};

export default SearchBar;
