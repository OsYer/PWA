import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { baseURL } from "../../api.js";
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import Sidebar from "../../Esquema/Sidebar.js";
import UserProfile from "./UserProfile";
import ModalPregunta from "./ModalPregunta"; // Importa el componente del modal

import iconUserId from "./images/user-id-icon.svg";
import iconUser from "./images/user-icon.svg";
import iconAddress from "./images/address-svgrepo-com.svg";
import { FaUser, FaIdCard, FaShoppingCart, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
const Panel = () => {
  const [userImage, setUserImage] = useState(null);
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar si se muestra el modal

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      // console.log(user)
      setUser(user);
      setIsLoggedIn(loggedIn);

      // Realizar la petición a la API al cargar el perfil
      fetch(`${baseURL}/pregunta/${user.ID_usuario}`)

        .then(response => {
          console.log(`${baseURL}/pregunta/${user.ID_usuario}`)
          if (response.status === 404) {
            // Si la respuesta es un 404, mostrar el modal
            setShowModal(true);
            return null; // Devolver null para que el siguiente .then() no se ejecute
          }
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            // console.log("Respuesta de la API:", data);
          } else {
            // console.log("La respuesta de la API está vacía");
            setShowModal(true);
          }
        })
        .catch(error => console.error("Error al obtener la pregunta:", error));
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMembresia = () => {
    navigate('/membresia', { state: user });
  };

  const handleHistorialMembresia = () => {
    navigate('/historialMembresias', { state: user });
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className="main mt-4 p-3">
          <section className="mb-4 custom-section">
            <div className="card">
              <div className="row">
                <div className="col">
                  <UserProfile userImage={userImage} />
                </div>
                <div className="col second-col">
                  {user.ID_rol == "2" ? (
                    <>
                      <h5>Bienvenido, rol usuario</h5>
                      <button onClick={handleLogout} className='btn btn-warning'>Cerrar Sesión</button>
                    </>
                  ) : (
                    <>
                      <h5>Bienvenido, rol Administrador</h5>
                      <button onClick={handleLogout} className='btn btn-warning'>Cerrar Sesión</button>
                    </>
                  )}
                  <div>{user.usuario} {user.primerApellido} {user.segundoApellido}</div>
                  <p>{user.correo}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-4 custom-section">
            <div className="card">
              <ul>
                <li className="row my-3">
                  <div className="col">
                    <UserProfile userImage={iconUser} />
                  </div>
                  <div className="col">
                    <span>Datos de tu cuenta</span>
                    <p>Datos que representan a la cuenta en Sport Gym Center.</p>
                    <button onClick={() => { navigate('/profile'); }} >Mi cuenta</button>
                  </div>
                </li>
                <li className="row my-3">
                  <div className="col">
                    <UserProfile userImage={iconUserId} />
                  </div>
                  <div className="col second-col">
                    <span>Mis membresias</span>
                    <p>Información de tu identificación oficial y tu actividad fiscal.</p>
                    <button onClick={handleMembresia} >Mi membresia</button>
                    <button onClick={handleHistorialMembresia} >Mi historial de membresias</button>
                  </div>
                </li>
                <li className="row my-3">
                  <div className="col">
                    <UserProfile userImage={iconUserId} />
                  </div>
                  <div className="col second-col">
                    <span>Mis compras</span>
                    <p>Información sobre las compras realizadas.</p>
                    <button onClick={() => { navigate('/mis-compras'); }} >Mi compras</button>
                  </div>
                </li>

                <li className="row my-3">
                  <div className="col">
                    <UserProfile userImage={iconAddress} />
                  </div>
                  <div className="col">
                    <span>Direcciones</span>
                    <p>Direcciones guardadas en tu cuenta.</p>
                    <button onClick={() => navigate('/mis-direcciones', { state: user })} >Mis direcciones</button>
                  </div>
                </li>

                <li className="row my-3">
                  <div className="col">
                    <FaHeart size={32} />
                  </div>
                  <div className="col">
                    <span>Favoritos</span>
                    <p>Productos que has marcado como favoritos.</p>
                    <button onClick={() => navigate('/favoritos')} >Mis favoritos</button>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />

      {showModal && <ModalPregunta user={user} />}
    </>
  );
};

export default Panel;
