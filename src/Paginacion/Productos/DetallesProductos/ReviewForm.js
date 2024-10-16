import React, { useState } from 'react';
import ReactRating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { baseURL } from '../../../api.js';

const ReviewForm = ({ productId, userId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire({
        title: 'No estás logueado',
        text: 'Por favor, inicia sesión para dejar una reseña.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Registrarse'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';  // Redirigir a la página de inicio de sesión
        } else {
          window.location.href = '/register';  // Redirigir a la página de registro
        }
      });
      return;
    }

    // Validar la calificación
    if (rating < 1 || rating > 5) {
      Swal.fire({
        title: 'Calificación no válida',
        text: 'La calificación debe estar entre 1 y 5.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const newReview = {
      ID_usuario: userId,
      ID_producto: productId,
      calificacion: rating,
      comentario: review,
    };

    try {
      const response = await fetch(`${baseURL}/resenas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        Swal.fire({
          title: 'Éxito',
          text: 'Reseña enviada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        // Resetear el formulario
        setRating(0);
        setReview('');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al enviar la reseña',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error de red al enviar la reseña',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className="col-lg-6 ps-lg-5">
      <form onSubmit={handleSubmit}>
        <h5 className="mb-3">Escribe tu reseña</h5>
        <div className="mb-3">
          <label className="form-label">Calificación:</label>
          <ReactRating
            emptySymbol={<FaStar color="lightgray" size={32} />}
            fullSymbol={<FaStar color="gold" size={32} />}
            fractions={2}
            onClick={(value) => setRating(value)}
            initialRating={rating}
            className='d-block'
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="formGrouptextareaInput">Reseña:</label>
          <textarea
            className="form-control"
            id="formGrouptextareaInput"
            rows="3"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ReviewForm;
