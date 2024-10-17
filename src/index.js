import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);

        // Detectar nuevas versiones del Service Worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Nueva versión disponible
                console.log('Nueva versión disponible. Recargar la página para actualizar.');
                // if (window.confirm('Nueva versión disponible. ¿Recargar ahora?')) {
                //   window.location.reload();
                // }
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}

