import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import Breadcrumbs from "./Breadcrumbs"; // Ajusta la ruta de importación según la ubicación del archivo Breadcrumbs
import { baseURL } from '../api.js';
import { useLocalStorage } from 'react-use';

const Header = () => {
  const [user, setUser] = useLocalStorage('user');
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn');
  const [totalProductosEnCarrito, setTotalProductosEnCarrito] = useState(0);
  const [cantidadFavoritos, setCantidadFavoritos] = useState(0);

  useEffect(() => {
    $(".humberger__open").on("click", function () {
      $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
      $(".humberger__menu__overlay").addClass("active");
      $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on("click", function () {
      $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
      $(".humberger__menu__overlay").removeClass("active");
      $("body").removeClass("over_hid");
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchTotalProductosEnCarrito();
      fetchCantidadFavoritos();
    }
  }, [isLoggedIn]);

  const fetchTotalProductosEnCarrito = async () => {
    try {
      const response = await fetch(`${baseURL}/carrito-compras-total-usuario/${user.ID_usuario}`);
      if (response.ok) {
        const data = await response.json();
        setTotalProductosEnCarrito(data.totalProductosEnCarrito);
      } else {
        console.error("Error al obtener la cantidad total de productos en el carrito");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const fetchCantidadFavoritos = async () => {
    try {
      const response = await fetch(`${baseURL}/favoritos-cantidad/${user.ID_usuario}`);
      if (response.ok) {
        const data = await response.json();
        // console.log("fetchCantidadFavoritos", data)
        setCantidadFavoritos(data.cantidad);
      } else {
        console.error("Error al obtener la cantidad de favoritos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };


  return (
    <>
      <div className="humberger__menu__overlay"></div>
      <div className="humberger__menu__wrapper">
        <div className="humberger__menu__logo">
          <Link to="/"><img src="images/logo_letras.jpeg" alt="" /></Link>
        </div>
        <div className="humberger__menu__cart">
          <ul>
            <li><Link to="/favoritos"><i className="fa fa-heart"></i> <span>{cantidadFavoritos}</span></Link></li>
            <li><Link to="/carrito"><i className="fa fa-shopping-bag"></i> <span>{totalProductosEnCarrito}</span></Link></li>
          </ul>
          <div className="header__cart__price">item: <span>$150.00</span></div>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__auth__sm">
            <Link to="/login"><i className="fa fa-user"></i> Login</Link>
          </div>
        </div>
        <nav className="humberger__menu__nav">
          <ul>
            <li className="active"><Link to="/">Inicio</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/imc">Tienda</Link></li>
            <li>
              <a href="#">Empresa</a>
              <ul className="header__menu__dropdown">
                <li><Link to="/Nosotros">Nosotros</Link></li>
                <li><Link to="/Contacto">Contacto</Link></li>
                <li><a href="./checkout.html">Check Out</a></li>
                <li><a href="./blog-details.html">Blog Details</a></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="header__top__right__social">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-pinterest-p"></i></a>
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li><i className="fa fa-envelope"></i> sportgymcenterinfo@gmail.com</li>
          </ul>
        </div>
      </div>

      <header className="header sticky-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link to="/"><img src="images/logo_letras.jpeg" alt="" /></Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className="active"><Link to="/">Inicio</Link></li>
                  <li><Link to="/tienda">Tienda</Link></li>
                  <li><Link to="/membresias">Membresías</Link></li>
                  {/* <li><Link to="/prediccion">Predecir</Link></li> */}
                  {/* <li><Link to="/imc">Calculadora</Link></li> */}
                  <li>
                    <Link to="#">Empresa</Link>
                    <ul className="header__menu__dropdown">
                      <li><Link to="/nosotros">Nosotros</Link></li>
                      <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__cart">
                <ul>
                  <li><Link to="/favoritos"><i class="fa fa-heart"></i> <span>{cantidadFavoritos}</span></Link></li>
                  <li><Link to="/carrito"><i className="fa fa-shopping-bag"></i> <span>{totalProductosEnCarrito}</span></Link></li>
                </ul>
                {isLoggedIn ? (
                  <>
                    <div className="header__top__right__auth">
                      <Link to="/perfil"><i className="fa fa-user"></i> Ver mi perfil</Link>
                    </div>
                    <div className="header__cart__price ms-4">Bienvenido, <span>{user.usuario}</span> ...!</div>
                  </>
                ) : (
                  <>
                    <div className="header__top__right__auth">
                      <Link to="/login"><i className="fa fa-user"></i> Login</Link>
                    </div>
                    <div className="header__cart__price ms-4">item: <span>$150.00</span></div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="humberger__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumbs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
