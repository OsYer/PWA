import React, { useState } from "react";
import "./Producto2.css"
const PruebaAbrirModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Prueba para abrir un modal</h1>
      <button onClick={openModal}>Abrir Modal</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal}>Cerrar Modal</button>
            <p>Contenido del modal...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PruebaAbrirModal;

