// import logo from './logo.svg';
import "./Paginacion/utilidades/utilidades_css.css";
import Rutas from './Paginacion/Rutas';
import React, { useEffect } from 'react';
function App() {
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      document.getElementById('install-button').style.display = 'block';
    };

    const handleInstallClick = () => {
      document.getElementById('install-button').style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario rechazó la instalación');
        }
        deferredPrompt = null;
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    document.getElementById('install-button').addEventListener('click', handleInstallClick);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      document.getElementById('install-button').removeEventListener('click', handleInstallClick);
    };
  }, []);
  
  return (
    <>
      <Rutas />
    </>
  );
}

export default App;
