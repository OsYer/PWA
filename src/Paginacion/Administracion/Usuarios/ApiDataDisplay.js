import React, { useState, useEffect } from 'react';

const ApiDataDisplay = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API
  const fetchData = async () => {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY)

    try {
      const token = localStorage.getItem('jwtToken'); // Obtener el token JWT del localStorage
      console.log(token)
      // Verificar si el token está presente
      if (!token) {
        throw new Error('Token JWT no encontrado en localStorage');
      }

      // Realizar la solicitud a tu API incluyendo el token en el encabezado de autorización
      const response = await fetch('ttp://localhost:4000/api/users/count', {
        headers: {
          'Authorization': `Bearer ${token}` // Agregar el token al encabezado de autorización
        }
      });

      // Verificar si la respuesta es exitosa
      if (response.ok) {
        // Convertir la respuesta a formato JSON
        const data = await response.json();
        // Actualizar el estado con los datos obtenidos
        setApiData(data);
      } else if (response.status === 401) {
        // Acceso no autorizado (token no proporcionado o inválido)
        console.log('Acceso no autorizado. Debe iniciar sesión.');
      } else if (response.status === 403) {
        // Acceso prohibido (token válido pero no tiene permisos suficientes)
        console.log('Acceso prohibido. No tiene permisos suficientes.');
      } else if (response.status === 419) {
        // Sesión expirada debido a la caducidad del token
        console.log('La sesión ha expirado debido a la caducidad del token. Por favor, inicie sesión nuevamente.');
        // Puedes redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login';
      } else {
        // Otro error no manejado
        console.log('Error desconocido:', response.statusText);
      }
    } catch (error) {
      // Manejar errores de solicitud
      console.error('Error de solicitud:', error);
    } finally {
      // Indicar que la carga ha terminado
      setLoading(false);
    }
  };

  // Efecto para ejecutar la función de obtención de datos cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []); // El segundo argumento vacío indica que el efecto solo se ejecuta una vez, al montar el componente

  return (
    <div>
      <h2>Resultado de la API:</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        // Mostrar los datos obtenidos de la API
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      )}
    </div>
  );
};

export default ApiDataDisplay;
