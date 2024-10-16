import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { useLocalStorage } from 'react-use';


import Index from './Index';
import ProtectedRoute from './utilidades/ProtectedRoute';

import Header from '../Esquema/Header';
import Footer from '../Esquema/Footer';

import Productos from './Productos/Productos';

import Filtros from './Productos/Filtros';

import PrivacyPolicy from './Empresa/Privacidad/PrivacyPolicy';
import Terminos from './Empresa/TerminosCondiciones/TerminosCondiciones';
import CookiePolicy from './Empresa/Cookies/CookiePolicy';
import Contacto from './Empresa/Contacto/Contacto';
import Nosotros from './Empresa/Nosotros/Nosotros';

import Registro from './Registro/Registro';
import Login from './Login/Login';
import Login2 from './Login/Login2';
import MFA from './Login/MFA';
import Perfil from './Usuario/Perfil';
// import IndexCargaRapida from './Accesibilidad/CargaRapida/IndexCargaRapida';
// import TerminosCondicionesH from './Accesibilidad/CargaRapida/TerminosCondiciones/TerminosCondicionesH';
// import TextToSpeech from './Accesibilidad/Visual/TextToSpeech';
// import MenuAccessible from './Accesibilidad/Visual/MenuAccesible';
// import CookiePolicyV from './Accesibilidad/Visual/Cookies/CookiePolicyV';
import Recuperacion from './Recuperacion/Recuperacion';
import Token from './Recuperacion/Token';
// import EmailSender from './email/EmailSender';
import ResetPassword from './Recuperacion/ResetPassword';

import Sidebar from './Sidebar/Sidebar';
// import ActiveLastBreadcrumb from "../ActiveLastBreadcrumb";

// import ProductosComponent from './Productos/ProductosComponent';
import AdmProductos from './Administracion/Productos/AdmProductos';

import AgregarProducto from './Administracion/Productos/AgregarProducto';

import EditarProducto from './Administracion/Productos/EditarProducto';
// import Header2 from '../Esquema/Headerq';
// import Bodys from '../Esquema/Bodys';

import ComprasAdm1 from './Administracion/Compras';
//import Detalleventa from './Administracion/Detalleventa';
import ApiDataDisplay from './Administracion/Usuarios/ApiDataDisplay';

import Error404 from './Validaciones/Error404/Error404';
// import Error500 from './Validaciones/Error500/Error500';


import subirImagen from './Administracion/Productos/subirImagen';
import MapComponent from './Validaciones/MapComponent/MapComponent';


import Membresia from './Usuario/Membresia';
import HistorialMembresias from './Usuario/HistorialMembresias';

import Precios from './Membresillas/Precios';
import ProductosList from './Productos/ProductosList';
import ProductDetails from './Productos/DetallesProductos/product-details';
import Carrito from './Productos/Carrito';
import Checkout from './Productos/Checkout';
import PruebaAbrirModal from './Productos/PruebaAbrirModal';
import AgregarDireccionesEnvio from './Productos/AgregarDireccionesEnvio';
import Pregunta from './Recuperacion/Pregunta';
import MisDirecciones from './Usuario/Direccion/MisDirecciones';
import Login3 from './Login/Login3';
import EditarDireccionesEnvio from './Productos/EditarDireccionesEnvio';
import CheckoutDirecciones from './Productos/CheckoutDirecciones';
import ConfetiComponent from './utilidades/ConfetiComponent';
import CompraFinalizada from './Compras/CompraFinalizada';
import Spinner from './utilidades/Spinner';
import SimpleSlider from './utilidades/SimpleSlider';
import Membresias from './Membresillas/Membresias';
import Compras from './Usuario/Compras';
import Profile from './Usuario/Profile';
import AdmMembresiasClientes from './Administracion/Membresias/AdmMembresiasClientes';
import AdmTiposMembresias from './Administracion/Membresias/AdmTiposMembresias';
import MultiImageUploadForm from './utilidades/MultiImageUploadForm';


import IMCCalculator from './utilidades/IMCCalculator';
import DetalleCompra from './Usuario/DetalleCompra';
import Clientes from './Usuario/patron';
import MyImageUploader from './Administracion/Productos/MyImageUploader';


import slider from './slider';
import slider2 from './slider2';

import favoritos from './Productos/Favoritos/Favoritos';
import GenerarToken from './Usuario/Alexa/GenerarToken';
import Prediccion from '../Prediccion';
// import Error from './Validaciones/Error404/Error';
const Rutas = () => {
  const [user, setUser] = useLocalStorage('user');
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn');
  const [isLoggedInLogin, setIsLoggedInLogin] = useLocalStorage('isLoggedInTemp');
  const [tokenCheckout, setTokenCheckout] = useLocalStorage('tokenCheckout');
  const isAdmin = user && user.ID_rol === 1;
  console.log(isLoggedIn)
  // React.useEffect(() => {
  //   if (tokenCheckout) {
  //     console.log("Usuario registrado:", tokenCheckout);
  //   } else {
  //     console.log("No hay un usuario registrado.");
  //   }
  // }, [tokenCheckout]);
  return (
    <>
      {/* <ActiveLastBreadcrumb /> */}

      <Routes>

        <Route path="/" element={< Index />}></Route>

        <Route element={<ProtectedRoute canActivate={user} redirectPath='/login' />}>
          <Route path="/apiUser" element={<ApiDataDisplay />} />
          <Route path='/perfil' element={<Perfil />}></Route>
          <Route path='/mis-direcciones' element={<MisDirecciones />}></Route>
          <Route path='/agregar-direccion-envio' element={<AgregarDireccionesEnvio />}></Route>
          <Route path='/editar-direccion-envio/:ID_direccion' element={<EditarDireccionesEnvio />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/seleccionar-direccion-envio' element={<CheckoutDirecciones />}></Route>

          <Route path='/compra-finalizada/:id/:tipo' element={<CompraFinalizada />}></Route>


          <Route path='/historialMembresias' element={<HistorialMembresias />}></Route>

          <Route path='/mis-compras' element={<Compras />}></Route>
          <Route path='/compras' element={<ComprasAdm1 />}></Route>
          {/* 
          <Route path='/detalleventa' element={<Detalleventa />}></Route>
           */}
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/detalle-compra/:ID_pedido' element={<DetalleCompra />}></Route>
        
          <Route element={<ProtectedRoute canActivate={isAdmin} redirectPath='/perfil' />}>
            <Route path='/admMembresiasClientes' element={<AdmMembresiasClientes />}></Route>
            <Route path='/admtiposMembresias' element={<AdmTiposMembresias />}></Route>
          </Route>
        
        </Route>

        <Route path='/header' element={<Header />}></Route>
        <Route path='/footer' element={<Footer />}></Route>

        <Route path='/patron' element={<Clientes />}></Route>

        <Route path='/tienda' element={<Productos />}></Route>
        <Route path='/filtros' Component={Filtros}></Route>
        <Route path='/product-details/:id' element={<ProductDetails />}></Route>
        <Route path='/carrito' element={<Carrito />}></Route>

        <Route path='/modal' Component={PruebaAbrirModal}></Route>

        <Route path='/privacidad' element={<PrivacyPolicy />}></Route>
        <Route path='/terminos-y-condiciones' element={<Terminos />}></Route>
        <Route path='/cookies' element={<CookiePolicy />}></Route>
        <Route path='/contacto' element={<Contacto />}></Route>
        <Route path='/nosotros' element={<Nosotros />}></Route>

        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/login' element={<Login />}></Route>

        {/* <Route path='/login3' element={<Login3 />}></Route> */}


        <Route path='/membresia' Component={Membresia}></Route>

        <Route path='/membresias' element={<Membresias />}></Route>


        <Route path='/si' Component={Sidebar}></Route>

        {/* <Route path='/login2' Component={Login2}></Route> */}
        <Route path='/recuperacion' Component={Recuperacion}></Route>
        <Route path='/validacion' Component={Token}></Route>
        <Route path='/resetPassword' Component={ResetPassword}></Route>

        <Route path='/AdmProductos' Component={AdmProductos}></Route>
        <Route path='/AgregarProducto' Component={AgregarProducto}></Route>

        <Route path='/EditarProducto/:id' Component={EditarProducto}></Route>

        <Route path='/GenerarToken' Component={GenerarToken}></Route>


        <Route path='/subirImagen' Component={subirImagen}></Route>
        <Route path='/map' Component={MapComponent}></Route>


        {/* <Route path='/menuVisual' Component={ MenuAccessible }></Route> */}
        {/* 
        <Route path='/membresias' Component={MembershipComponent}></Route>
        <Route path='/suscripcion' Component={Suscripcion}></Route> */}


        {/* COMPONENTES QUE DEBEN SER MODIFICADOS CON ESTILOS  */}
        <Route path='/precios' Component={Precios}></Route>
        <Route path='/list' Component={ProductosList}></Route>
        <Route path='/details' Component={ProductDetails}></Route>

        <Route path='/admUsuarios' Component={ApiDataDisplay}></Route>

        <Route path='/pregunta' Component={Pregunta}></Route>


        {/* UTILIDADES  */}

        <Route path='/confeti' Component={ConfetiComponent}></Route>
        <Route path='/spiner' Component={Spinner}></Route>
        <Route path='/simple' Component={SimpleSlider}></Route>
        <Route path='/multi' Component={ MultiImageUploadForm }></Route>

        <Route path='/imc' Component={ IMCCalculator }></Route>

        <Route path='/m' Component={ MyImageUploader }></Route>

        <Route path='/slider' Component={ slider }></Route>
        <Route path='/slider2' Component={ slider2 }></Route>

        <Route path='/favoritos' Component={ favoritos }></Route>

        <Route path='/prediccion' Component={ Prediccion }></Route>

        <Route path='*' Component={Error404}></Route>

      </Routes>
    </>
  )
}

export default Rutas