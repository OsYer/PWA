import React, { useState, useEffect } from 'react';

// Definimos una interfaz para el servicio de clientes
class ServicioClientes {
  async obtenerClientes() {
    // Método para obtener clientes, implementado por el sujeto real
  }
}

// Implementación real del servicio de clientes que solicita datos a la API
class ServicioClientesReal extends ServicioClientes {
  async obtenerClientes() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Error al obtener clientes');
    }
    const data = await response.json();
    console.log(data)
    return data;
  }
}

// Proxy para controlar el acceso al servicio de clientes y agregar funcionalidades adicionales
class ProxyServicioClientes extends ServicioClientes {
  constructor() {
    super();
    this.servicioReal = new ServicioClientesReal();
    this.cache = null;
  }

  async obtenerClientes() {
    // Antes de solicitar los datos, comprobamos si ya están en caché
    if (!this.cache) {
      // Si no están en caché, solicitamos los datos al servicio real y los almacenamos en caché
      this.cache = await this.servicioReal.obtenerClientes();
    }
    return this.cache;
  }
}

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const proxyServicioClientes = new ProxyServicioClientes();

    const fetchClientes = async () => {
      try {
        const clientesData = await proxyServicioClientes.obtenerClientes();
        setClientes(clientesData);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h2>Listado de Clientes</h2>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id}>{cliente.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Clientes;
