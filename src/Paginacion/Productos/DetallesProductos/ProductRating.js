import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { baseURL } from '../../../api.js';

const ProductRating = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${baseURL}/resenas/${parseInt(productId, 10)}`);
        if (response.ok) {
          const data = await response.json();
          setTotalReviews(data.length);
          if (data.length > 0) {
            const sumRatings = data.reduce((sum, review) => sum + review.calificacion, 0);
            setAverageRating((sumRatings / data.length).toFixed(1));
          }
        } else {
          console.error('Error al cargar las reseñas del producto');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} color="gold" />
        ))}
        {halfStar && <FaStar key="half" color="gold" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} color="lightgray" />
        ))}
      </>
    );
  };

  return (
    <div className="product__details__rating">
      {renderStars(averageRating)}
      <span>({totalReviews} reseñas)</span>
    </div>
  );
};

export default ProductRating;
