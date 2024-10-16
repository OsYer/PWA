import React, { useRef } from "react";
import ImagenDefault from "./images/user.svg";
import ImagenCambio from "./images/image-pen.svg";

import "./UserProfile.css";

const UserProfile = ({ userImage }) => {
  const inputRef = useRef(null);

  const handleImageUpload = async (formData) => {
    alert("Imagen subiendo, nah puro pedo... no jala xd")
    // try {
    //   const response = await fetch("URL_DEL_ENDPOINT_PARA_SUBIR_IMAGEN", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     // Manejar la respuesta si la carga de la imagen fue exitosa
    //     console.log("Imagen cargada exitosamente");
    //   } else {
    //     // Manejar la respuesta si hubo algún error en la carga de la imagen
    //     console.error("Error al cargar la imagen:", response.statusText);
    //   }
    // } catch (error) {
    //   // Manejar el error si ocurre algún problema durante la solicitud
    //   console.error("Error al cargar la imagen:", error.message);
    // }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      handleImageUpload(formData);
    }
  };

  return (
    <div className="user-profile">
      <div className="image-container">
        <div className="container">
        <img
          src={userImage ? userImage : ImagenDefault}
          alt="Imagen del usuario"
          className="user-image p-2"
          onClick={handleClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          src={ImagenCambio}
          alt="Cambiar imagen"
          className="change-image"
          onClick={handleClick}
        />
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
