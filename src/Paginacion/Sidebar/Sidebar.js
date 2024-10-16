import React, { useEffect } from "react";
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer";
import "./Sidebar.css"
import UserProfile from "./UserProfile";

import iconUserId from "./images/user-id-icon.svg";
import iconUser from "./images/user-icon.svg";
import iconAddress from "./images/address-svgrepo-com.svg";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [userImage, setUserImage] = React.useState(null);


  useEffect(() => {
    const hamBurger = document.querySelector(".toggle-btn");

    const handleClick = () => {
      document.querySelector("#sidebar").classList.toggle("expand");
    };

    hamBurger.addEventListener("click", handleClick);

    return () => {
      // Limpiar el event listener al desmontar el componente
      hamBurger.removeEventListener("click", handleClick);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleDropdownClick = () => {
    const sidebarDropdown = document.querySelector("#auth");
    sidebarDropdown.classList.toggle("show");
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <aside id="sidebar">
          <div className="d-flex">
            <button className="toggle-btn" type="button">
              <i class="icon-menu"></i>
            </button>
            <div className="sidebar-logo">
              <Link to="#">Mi cuenta</Link>
            </div>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="#" className="sidebar-link">
                <i class="icon-user"></i>
                <span>Perfil</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link collapsed has-dropdown"
                onClick={handleDropdownClick}>
                <i class="icon-shopping-bag"></i>
                <span>Compras</span>

              </Link>
              <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                <li className="sidebar-item">
                  <Link to="#" className="sidebar-link">Compras</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="#" className="sidebar-link">Favoritos</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="sidebar-footer">
            <Link to="#" className="sidebar-link">
              <i className="lni lni-exit"></i>
              <span>Logout</span>
            </Link>
          </div>
        </aside>
        <div className="main mt-4 p-3">
          <section className="mb-4 custom-section">
            <div className="card">
              <div className="row">
                <div className="col">
                  <UserProfile userImage={userImage} />
                </div>
                <div className="col second-col">
                  <div>Carlos Alberto Hernandez Hdez</div>
                  <p>carlosexequiel360@gmail.com</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-4 custom-section">
            <div className="card">
              <ul>
                <li className="row my-3">
                  <div className="col">
                  <UserProfile userImage={iconUserId} />
                  </div>
                  <div className="col second-col">
                    <span>Información personal</span>
                    <p>Información de tu identificación oficial y tu actividad fiscal.</p>
                  </div>
                </li>
                <li className="row my-3">
                  <div className="col">
                  <UserProfile userImage={iconUser} />
                  </div>
                  <div className="col">
                    <span>Datos de tu cuenta</span>
                    <p>Datos que representan a la cuenta en Sport Gym Center.</p>
                  </div>
                </li>
                <li className="row my-3">
                  <div className="col">
                  <UserProfile userImage={iconAddress} />
                  </div>
                  <div className="col">
                    <span>Direcciones</span>
                    <p>Direcciones guardadas en tu cuenta.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Sidebar;
