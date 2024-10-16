import React, { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./ImagenesProductos.css";
import { baseURL } from '../../../api';

const ImagenesProductos = ({ productId }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${baseURL}/products-with-imagens/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else {
          console.error('Error al cargar las imágenes del producto');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchImages();
  }, [productId]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slider-images">
          {images.length > 0 && (
            <img
              src={images[currentIndex].imagenUrl}
              alt={`Slide ${currentIndex + 1}`}
              className="slider-image"
            />
          )}
        </div>
        <div className="slider-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.imagenUrl}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail-image ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <button className="prev-arrow" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="next-arrow" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ImagenesProductos;
