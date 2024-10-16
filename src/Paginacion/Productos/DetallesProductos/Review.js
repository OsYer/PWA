import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { baseURL } from '../../../api.js';
import moment from 'moment';
import 'moment/locale/es';

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${baseURL}/resenas/${parseInt(productId, 10)}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Error al cargar las reseñas del producto');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="col-lg-6 mb-4 mb-lg-0">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index}>
            <div className="mb-1">
              {[...Array(review.calificacion)].map((_, i) => (
                <span key={i} className="fa fa-star text-warning fs-10"></span>
              ))}
              {[...Array(5 - review.calificacion)].map((_, i) => (
                <span key={i} className="fa fa-star-o text-warning fs-10"></span>
              ))}
              <span className="ms-3 text-1100 fw-semi-bold">{review.comentario}</span>
            </div>
            <p className="fs-10 mb-2 text-600">Por {review.nombre} • {moment(review.fechaResena).locale('es').format('LL')}</p>
            <hr className="my-4" />
          </div>
        ))
      ) : (
        <p>No hay reseñas disponibles para este producto.</p>
      )}
    </div>
  );
};

export default Review;
