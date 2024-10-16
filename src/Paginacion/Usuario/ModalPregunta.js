import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { baseURL } from "../../api.js";

export default function ModalPregunta({ user }) {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const preguntas = {
    1: '¿Cuál es el nombre de tu mascota?',
    2: '¿Cuál es el nombre de tu primer colegio?',
    3: '¿Cuál es tu película favorita?',
    4: '¿Cuál es tu comida favorita?',
    5: '¿Dónde nació tu madre?',
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}/pregunta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuario: user.ID_usuario,
          pregunta: preguntas[selectedQuestion],
          respuesta: answer,
        }),
      });
      if (!response.ok) {
        throw new Error('Error al enviar la pregunta secreta.');
      }
      // Aquí puedes manejar la respuesta del servidor si es necesario
      console.log('Pregunta secreta enviada correctamente.');
      setShowModal(false); // Cierra el modal solo cuando la inserción se ha realizado con éxito
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => {}}>
      <Modal.Header>
        <Modal.Title>Recuperación de contraseña por pregunta secreta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Estos datos serán utilizados en el futuro en caso de que necesites recuperar tu contraseña mediante el método
          de pregunta secreta.
        </p>
        {error && <p>Error: {error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="selectQuestion">
            <Form.Label>Seleccione una pregunta secreta</Form.Label>
            <Form.Control
              as="select"
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
              required
            >
              <option value="">Seleccionar pregunta</option>
              <option value="1">¿Cuál es el nombre de tu mascota?</option>
              <option value="2">¿Cuál es el nombre de tu primer colegio?</option>
              <option value="3">¿Cuál es tu película favorita?</option>
              <option value="4">¿Cuál es tu comida favorita?</option>
              <option value="5">¿Dónde nació tu madre?</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="answer" className="mb-3">
            <Form.Label>Respuesta</Form.Label>
            <Form.Control type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
