import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../../Esquema/Header.js"; // Asegúrate de ajustar la ruta según sea necesario
import Footer from "../../../Esquema/Footer.js";
import { baseURL } from '../../../api.js'; // Asegúrate de ajustar la ruta según sea necesario
import { useLocalStorage } from 'react-use';

const GenerarToken = () => {
  const [token, setToken] = useState(null);
  const [user] = useLocalStorage('user'); // Obtener el usuario del almacenamiento local

  const generateToken = async () => {
    const newToken = Math.floor(1000 + Math.random() * 9000); // Genera un token de 4 dígitos
    setToken(newToken);
    toast.success(`Token generado: ${newToken}`);

    if (user && user.ID_usuario) {
      console.log("ID", user.ID_usuario)
      const ID_usuario = user.ID_usuario;
      const fechaGeneracion = new Date().toISOString();
      try {
        const response = await fetch(`${baseURL}/tokensAlexa`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ID_usuario, fechaGeneracion, token: newToken }),
        });

        if (response.ok) {
          toast.success('Token guardado en la base de datos');
        } else {
          toast.error('Error al guardar el token');
        }
      } catch (error) {
        toast.error('Error de red al guardar el token');
      }
    } else {
      toast.error('No se encontró el ID de usuario en el almacenamiento local');
    }
  };

  return (
    <>
      <Header />
      <div className="favorites-container container">
        <div className="token-container">
          <h5 className="token-title">Generar Token</h5>
          <button className="btn btn-primary" onClick={generateToken}>Generar Token</button>
          {token && (
            <div className="token-display">
              <p>Tu token es: <strong>{token}</strong></p>
            </div>
          )}
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GenerarToken;
