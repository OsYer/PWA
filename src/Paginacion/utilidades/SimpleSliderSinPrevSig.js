import React from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSliderSinPrevSig({ imagenes }) {
  const numImagenes = imagenes.length;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: numImagenes,
    slidesToScroll: numImagenes,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: numImagenes >= 3 ? 3 : numImagenes, // Limita slidesToShow a 3 si hay 3 o más imágenes
          slidesToScroll: numImagenes >= 3 ? 3 : numImagenes,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: numImagenes >= 2 ? 2 : numImagenes, // Limita slidesToShow a 2 si hay 2 o más imágenes
          slidesToScroll: numImagenes >= 2 ? 2 : numImagenes,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <Slider {...settings}>
            {imagenes.map((url, index) => (
              <div key={index} className="px-2">
                <img src={url} alt={`Slide ${index + 1}`} className="img-fluid" />
                {console.log(url)}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default SimpleSliderSinPrevSig;
