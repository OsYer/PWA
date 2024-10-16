import React from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';

// import './HeaderV.css'
import { Link } from 'react-router-dom';

const styles = {
  p: {
      fontSize: '25px',
  },
};


function HeaderV() {
  return (
    <>
    </>
    // <Navbar variant="dark" expand="lg" className='Header fontGoogle'>
    //   <Container>
    //     <Navbar.Brand href="#" className="me-5" style={styles.p}> 
    //       <img
    //         src="/images/logo_2.jpeg"
    //         height="30"
    //         className="d-inline-block align-top mx-1"
    //         alt="Logo"
    //       />
    //       Sport Gym Center
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#" style={styles.p}>Inicio</Nav.Link>
    //         <Nav.Link href="#" style={styles.p}>Tienda</Nav.Link>
    //         <Nav.Link href="#" style={styles.p}>Nosotros</Nav.Link>
    //         <Nav.Link href="#" style={styles.p}>Contacto</Nav.Link>
    //       </Nav>
    //       <Form className="d-flex">
    //         <FormControl type="text" placeholder="Buscar" className="mr-2" style={{ fontSize: '20px' }}/>
    //       </Form>

    //       <div className="mx-2">
    //         <Link to="#"> 
    //           <i className="icon-user mx-2 icon-color" style={{ fontSize: '25px' }} />
    //         </Link>
    //         <Link to="#"> 
    //           <i className="icon-shopping-cart mx-2 icon-color" style={{ fontSize: '25px' }} />
    //         </Link>
    //       </div>
          
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}

export default HeaderV;
