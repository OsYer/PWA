import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { baseURL } from '../../api.js';

const StripeCheckoutForm = ({ amount, currency, productos, userID, currentURL, ID_direccion }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica que Stripe y los elementos estén disponibles
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Crea un PaymentMethod usando Stripe.js
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      // Maneja el error aquí si es necesario
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      try {
        // Envia los detalles del pago al backend
        const response = await fetch(`${baseURL}/procesar-pago`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: amount,
            currency: currency,
            ID_usuario: userID, // Incluye userID
            currentURL: currentURL, // Incluye currentURL
            ID_direccion: ID_direccion, // Incluye ID_direccion
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Pago exitoso:', data);
          // Maneja la respuesta aquí si es necesario
        } else {
          console.error('Error en el pago:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar ${amount} {currency.toUpperCase()}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
