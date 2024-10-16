import React, { useState, useEffect } from 'react';
import Header from '../../Esquema/Header';
import Footer from '../../Esquema/Footer';
import { useLocalStorage } from 'react-use';
import { baseURL } from '../../api.js';
import './Membresias.css';
import { obtenerFechaHoraActual, calcularFechaVencimiento } from "../utilidades/dateUtils.js";
import Swal from 'sweetalert2';

import moment from 'moment';

const Membresias = () => {
  const [user, setUser] = useLocalStorage('user');
  const [fechaVencimientoAcumulada, setFechaVencimientoAcumulada] = useState(null);
  const [fechaVencimientoAcumuladaFormateada, setFechaVencimientoAcumuladaFormateada] = useState(null);
  const [isVencimientoCalculated, setIsVencimientoCalculated] = useState(false);

  const [nombre, setNombre] = useState('');
  const [costo, setCosto] = useState('');
  const [ID_tipoMembresia, setID_tipoMembresia] = useState('');
  const [ID_UnicoMembresia, setID_UnicoMembresia] = useState('');
  const [ID_membresiaUsuario, setID_membresiaUsuario] = useState('');

  const [planDetails, setPlanDetails] = useState([]);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/membershipTypes`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("planDetails", data);
        setPlanDetails(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchPlanDetails();
  }, []);

  function esURLSegura(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  }

  const handleRealizarPedidoActualizar = async (nombre, total, ID_tipoMembresia, ID_UnicoMembresia, fechaVencimientoAcumuladaFormateada) => {
    const currentURL = new URL(window.location.href);
    const host = "http://localhost:3000";
    // const host = currentURL.protocol + '//' + currentURL.hostname;
    // console.log(host); 
    const id = user.ID_usuario;
    const createOrderResponse = await fetch(`${baseURL}/paypal/create-order-membresia-actualizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_membresiaUsuario,
        ID_usuario: id,
        total,
        currentURL: host,
        nombre,
        tipoMembresiaID: ID_tipoMembresia,
        ID_UnicoMembresia,
        correo: user.correo,
        fechaVencimiento: fechaVencimientoAcumulada
      }),
    });

    if (createOrderResponse.ok) {
      const data = await createOrderResponse.json();
      // console.log(data);
      if (data.links && Array.isArray(data.links) && data.links.length >= 2) {
        const redirectUrl = data.links[1].href;

        if (esURLSegura(redirectUrl)) {
          window.location.href = redirectUrl;
        } else {
          console.error("La URL de redirección no es segura.");
        }
      } else {
        console.error("No se encontraron suficientes enlaces válidos en los datos proporcionados.");
      }
    } else {
      alert(`Hubo un error con la petición: ${createOrderResponse.status} ${createOrderResponse.statusText}`);
    }
  };

  const handleRealizarPedido = async (nombre, total, ID_tipoMembresia, ID_UnicoMembresia) => {
    const currentURL = new URL(window.location.href);
    const host = "http://localhost:3000";
    // const host = currentURL.protocol + '//' + currentURL.hostname;
    // console.log(host); 
    const id = user.ID_usuario;
    const createOrderResponse = await fetch(`${baseURL}/paypal/create-order-membresia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_usuario: id,
        total,
        currentURL: host,
        nombre,
        tipoMembresiaID: ID_tipoMembresia,
        ID_UnicoMembresia,
        correo: user.correo
      }),
    });

    if (createOrderResponse.ok) {
      const data = await createOrderResponse.json();
      // console.log(data);
      if (data.links && Array.isArray(data.links) && data.links.length >= 2) {
        const redirectUrl = data.links[1].href;

        if (esURLSegura(redirectUrl)) {
          window.location.href = redirectUrl;
        } else {
          console.error("La URL de redirección no es segura.");
        }
      } else {
        console.error("No se encontraron suficientes enlaces válidos en los datos proporcionados.");
      }
    } else {
      alert(`Hubo un error con la petición: ${createOrderResponse.status} ${createOrderResponse.statusText}`);
    }
  };


  const calcularNuevaFechaVencimiento = async (fechaVencimiento, planId) => {
    console.log("La fecha de vencimiento es:", fechaVencimiento, planId);

    // Obtener la fecha y hora actual
    const fechaHoraActual = await obtenerFechaHoraActual();

    // Convertir las fechas a objetos Moment
    const fechaActualMoment = moment(fechaHoraActual);
    const fechaVencimientoMoment = moment(fechaVencimiento);

    // Ajustar la diferencia horaria
    const offset = fechaActualMoment.utcOffset();
    fechaActualMoment.subtract(offset, 'minutes');

    // Calcular los días restantes hasta la fecha de vencimiento actual
    const diasRestantes = Math.ceil(fechaVencimientoMoment.diff(fechaActualMoment, 'days', true));

    console.log("Días restantes:", diasRestantes);

    // Calcular la nueva fecha de vencimiento
    const nuevaFechaVencimiento = await calcularFechaVencimiento(planId);

    // Convertir la nueva fecha de vencimiento a un objeto Moment
    const nuevaFechaVencimientoMoment = moment(nuevaFechaVencimiento);

    // Verificar si la nueva fecha de vencimiento es posterior a la fecha actual
    if (nuevaFechaVencimientoMoment.isAfter(fechaActualMoment)) {
      // Sumar los días restantes a la nueva fecha de vencimiento
      const fechaVencimientoAcumulada = nuevaFechaVencimientoMoment.add(diasRestantes, 'days');
      setFechaVencimientoAcumuladaFormateada(moment(fechaVencimientoAcumulada).format('DD [de] MMMM [del] YYYY'));
      setFechaVencimientoAcumulada(fechaVencimientoAcumulada.format("YYYY-MM-DDTHH:mm:ssZ"));
      setIsVencimientoCalculated(true);
      console.log("La nueva fecha de vencimiento acumulada es:", fechaVencimientoAcumulada.format("YYYY-MM-DDTHH:mm:ssZ"));
    } else {
      console.log("La nueva fecha de vencimiento no es válida.");
    }
  };

  useEffect(() => {
    if (isVencimientoCalculated) {
      const mensajeConfirmacion = `Confirma para actualizar la compra. La nueva fecha de vencimiento es: ${fechaVencimientoAcumuladaFormateada}`;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡No es posible adquirir una nueva membresía debido a que tiene una membresía activa!",
        footer: '<a href="/membresia">Ver mi membresía</a>',
        showCancelButton: true,
        cancelButtonText: "Actualizar compra",
        cancelButtonColor: '#d33',
        showConfirmButton: false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          // Aquí se muestra el segundo SweetAlert
          Swal.fire({
            title: '¿Estás seguro?',
            text: mensajeConfirmacion,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualizar ahora',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {

              console.log("fechaVencimientoAcumulada", fechaVencimientoAcumulada)
              // accionAdicional(fechaVencimiento, planId);
              handleRealizarPedidoActualizar(nombre, costo, ID_tipoMembresia, ID_UnicoMembresia, fechaVencimientoAcumuladaFormateada);

            }
          });
        }
      });

      setIsVencimientoCalculated(false); // Restablecer el flag
    }
  }, [isVencimientoCalculated, fechaVencimientoAcumuladaFormateada]);

  const fetchMembresia = async (planId) => {
    // alert(planId)
    try {
      const response = await fetch(`${baseURL}/membresiasIdUnico/${planId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log("data", data);
      // console.log(user)
      const responseExiste = await fetch(`${baseURL}/membresia-usuario/${user.ID_usuario}`);
      if (!responseExiste.ok) {
        throw new Error('Error al obtener la información del usuario');
      }

      const datosMembresiaUsuario = await responseExiste.json();
      console.log(user)
      console.log("datosMembresiaUsuario", datosMembresiaUsuario);
      if (datosMembresiaUsuario.length > 0) {
        console.log('Existe');
        setNombre(data.nombre);
        setCosto(data.costo);
        setID_tipoMembresia(data.ID_tipoMembresia);
        setID_UnicoMembresia(data.ID_UnicoMembresia);
        const datosMembresia = datosMembresiaUsuario[0];

        const fechaVencimiento = datosMembresia.fechaVencimiento;
        setID_membresiaUsuario(datosMembresia.ID_membresiaUsuario);

        const fechaHoraActual = await obtenerFechaHoraActual();

        // console.log("fechaHoraActual", fechaHoraActual)
        if (fechaHoraActual > fechaVencimiento) {
          console.log("Ha vencido...")
          handleRealizarPedido(data.nombre, data.costo, data.ID_tipoMembresia, data.ID_UnicoMembresia);
        } else {
          console.log("se ejecuta esto...?")
          setIsVencimientoCalculated(false);
          await calcularNuevaFechaVencimiento(fechaVencimiento, planId);
        }
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSubscriptionClick = (planId) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'No estás logueado',
        text: 'Para hacer una suscripción, debes estar logueado en el sitio.',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'; // Cambia '/login' por la ruta correcta de tu página de login
        }
      });
    } else {
      fetchMembresia(planId);
    }
  };
  return (
    <>
      <Header />
      <section id="pricing" className="our_pricing section-padding">
        <div className="container">
          <div className="row">
            <div className="section-title text-center">
              <h1 className="section-title-white">Planes de precios</h1>
              <p className="section-title-white">Explora nuestros planes de membresía diseñados para satisfacer diferentes necesidades y presupuestos. Desbloquea todo el potencial de nuestros servicios y elige el plan que mejor se adapte a tu estilo de vida y objetivos.</p>
            </div>
            {planDetails.map((plan, index) => (
              <div key={index} className="col-xs-12 col-sm-4 col-lg-4">
                <div className="pricingTable pricingTable-2">
                  <div className="pricingTable-header">
                    <h3 className="title">{plan.nombre}</h3>
                    <h1 className="price-value">{plan.costo}</h1>
                  </div>
                  <ul className="pricing-content">
                    {/* <li>Duración: {plan.duracion}</li> */}
                    {/* Agrega más detalles si es necesario */}
                  </ul>
                  <button onClick={() => handleSubscriptionClick(plan.ID_UnicoMembresia)} className="btn btn-lg btn-price-bg">Suscribirse</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Membresias;
