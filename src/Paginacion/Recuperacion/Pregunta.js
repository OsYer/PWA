import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { baseURL } from "../../api.js";
const Pregunta = () => {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Datos a enviar en la solicitud
      const requestData = {
        idUsuario: user.ID_usuario,
        pregunta: selectedQuestion, // Aquí enviamos el texto de la pregunta seleccionada
        respuesta: answer
      };
  
      // Configuración de la solicitud
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      };

      // Realizar la solicitud a la API
      const response = await fetch(`${baseURL}/pregunta/buscar`, requestOptions);
      const data = await response.json();
  
      // Verificar la respuesta de la API
      if (response.ok) {
        // Si la respuesta es exitosa, navegar a la página de resetPassword
        console.log("respuestas", data);
        navigate('/resetPassword');
      } else {
        // Si la respuesta indica un error, mostrar el mensaje de error
        setError(data.message);
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error('Error al enviar la pregunta secreta:', error);
      setError('Ocurrió un error al enviar la pregunta secreta.');
    }
  };
  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="border p-4">
            <h2 className="text-center">Recuperación de contraseña por pregunta secreta</h2>
            {error && <p className="text-danger text-center">Error: {error}</p>}
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
                  <option value="¿Cuál es el nombre de tu mascota?">¿Cuál es el nombre de tu mascota?</option>
                  <option value="¿Cuál es el nombre de tu primer colegio?">¿Cuál es el nombre de tu primer colegio?</option>
                  <option value="¿Cuál es tu película favorita?">¿Cuál es tu película favorita?</option>
                  <option value="¿Cuál es tu comida favorita?">¿Cuál es tu comida favorita?</option>
                  <option value="¿Dónde nació tu madre?">¿Dónde nació tu madre?</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="answer">
                <Form.Label>Respuesta</Form.Label>
                <Form.Control type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Pregunta;
