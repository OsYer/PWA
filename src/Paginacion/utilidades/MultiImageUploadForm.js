import React, { useState } from 'react';

const MultiImageUploadForm = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 1.5 * 1024 * 1024; // 1.5 MB

    setError('');
    const newImages = Array.from(fileList).filter(file => {
      if (!validImageTypes.includes(file.type)) {
        setError('Por favor, seleccione solo archivos de imagen (JPEG, PNG, GIF).');
        return false;
      }
      if (file.size > maxSize) {
        setError('El tamaño de la imagen debe ser menor a 1.5 MB.');
        return false;
      }
      return true;
    });

    const imageArray = newImages.map(file => URL.createObjectURL(file));

    setImages(prevImages => [...prevImages, ...imageArray]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Simular el guardado de los datos del formulario
    console.log('Datos del formulario:', formData);
    
    // Simular el guardado de las imágenes
    console.log('Imágenes seleccionadas:', images);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label htmlFor="images">Subir imágenes:</label>
          <input type="file" id="images" accept="image/*" multiple onChange={handleImageChange} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {images.map((image, index) => (
            <img key={index} src={image} alt={`imagen-${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
          ))}
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default MultiImageUploadForm;
