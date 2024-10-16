import React, { useState } from 'react';
import Swal from "sweetalert2";

const SubirImagen = () => {
  const [imagen, setImagen] = useState(null);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si se seleccionó una imagen
    if (!imagen) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor selecciona una imagen.',
      });
      return;
    }

    // Crear un objeto FormData para enviar la imagen
    const formData = new FormData();
    formData.append('nombre', "vaar")
    formData.append('imagen', imagen);

    try {
      // Realizar la solicitud para subir la imagen
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La imagen se ha subido correctamente.',
        });

        const data = await response.json();
        
        console.log(data);
        const imagenUrl = data.secure_url;
        console.log("imagenUrl=1", data.secure_url);
        console.log("imagenUrl=2", data.url);
        console.log("imagenUrl=3", imagenUrl);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al subir la imagen.',
        });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al subir la imagen.',
      });
    }
  };

  return (
    <div>
      <h2>Subir Imagen</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Selecciona una imagen:</label>
          <input
            type="file"
            required
            accept="image/*" // Agrega el atributo "accept" para limitar la selección de archivos a imágenes
            className="form-control"
            onChange={(event) => {
              const selectedFile = event.target.files[0];
              // Valida si el archivo seleccionado es una imagen y si su tamaño es menor a 3 MB
              if (selectedFile && selectedFile.type.includes("image/") && selectedFile.size <= 3 * 1024 * 1024) {
                setImagen(selectedFile); // Actualiza el estado de "imagen" con el archivo seleccionado
              } else {
                // Muestra un mensaje de error si el archivo seleccionado no es una imagen o su tamaño es mayor a 3 MB
                alert("Por favor selecciona una imagen con un tamaño menor a 3 MB.");
                event.target.value = null; // Limpia el valor del input para permitir seleccionar otro archivo
              }
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">Subir Imagen</button>
      </form>
    </div>
  );
};

export default SubirImagen;
