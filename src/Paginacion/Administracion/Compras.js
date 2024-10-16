import React, { useState, useEffect } from 'react';
import Header from "../../Esquema/Header.js";
import Footer from "../../Esquema/Footer.js";
import Sidebar from "../../Esquema/Sidebar.js";
import Swal from 'sweetalert2';

const ComprasAdm1 = () => {
  const [compras, setCompras] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [direccion, setDireccion] = useState(null);

  useEffect(() => {
    const fetchComprasYProductos = async () => {
      try {
        const resCompras = await fetch('https://api44.vercel.app/api/orden-pedido/all');
        const dataCompras = await resCompras.json();
        
        const resProductos = await fetch('https://api44.vercel.app/api/products');
        const dataProductos = await resProductos.json();
        
        const comprasConProductos = dataCompras.map(compra => {
          const producto = dataProductos.find(prod => prod.precioFinal === compra.total);
          return {
            ...compra,
            productoNombre: producto?.nombre,
            productoPrecio: producto?.precioFinal
          };
        });

        setCompras(comprasConProductos);
        setLoading(false);
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al cargar los datos', 'error');
        setLoading(false);
      }
    };

    fetchComprasYProductos();
  }, []);

  const handleShowDetails = async (compra) => {
    try {
      const resUser = await fetch(`https://api44.vercel.app/api/users/${compra.ID_usuario}`);
      const userData = await resUser.json();

      const resDireccion = await fetch(`https://api44.vercel.app/api/direccion-envio/${compra.ID_usuario}`);
      const direccionData = await resDireccion.json();

      setUserDetails(userData);
      setDireccion(direccionData);
      setSelectedCompra(compra);
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al cargar los detalles', 'error');
    }
  };

  const handleCloseModal = () => {
    setSelectedCompra(null);
    setUserDetails(null);
    setDireccion(null);
  };

  const classStyles = {
    contentHeight: {
      minHeight: '450px'
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <Sidebar />
        <div className='container my-4'>
          <div className={classStyles.contentHeight}>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Compras</h5>
              </div>
              <div className="table-responsive scrollbar">
                {loading ? (
                  <p>Cargando...</p>
                ) : (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compras.map((compra, index) => (
                        <tr key={index}>
                          <td>{compra.productoNombre}</td>
                          <td>{compra.productoPrecio}</td>
                          <td>{compra.total}</td>
                          <td>
                            <button 
                              className="btn btn-primary btn-sm" 
                              onClick={() => handleShowDetails(compra)}
                            >
                              Detalles
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal para mostrar los detalles */}
      {selectedCompra && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalles de la Compra</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Usuario:</h6>
                <p>{userDetails?.nombre} {userDetails?.primerApellido} {userDetails?.segundoApellido}</p>
                <h6>Dirección:</h6>
                <p>{direccion?.direccion}, {direccion?.colonia}, {direccion?.ciudad}, {direccion?.estado}, {direccion?.pais}, {direccion?.codigoPostal}</p>
                <p>Teléfono: {direccion?.telefono}</p>
                <h6>Producto:</h6>
                <p>Nombre: {selectedCompra?.productoNombre}</p>
                <p>Precio: {selectedCompra?.productoPrecio}</p>
                <p>Total: {selectedCompra?.total}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComprasAdm1;
