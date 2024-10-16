import React from "react";
import "./Error404.css";
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  const handleInicio = () => {
    navigate('/');
  }

  return (
    <section className="page-404">
      <div className="container" >
        <div className="row">
          <div className="col-md-12">
            <img src="/gif/kobayashi-san.gif" alt="site logo" width="170px" className="mt-5" onClick={handleInicio} />
            <h1>404</h1>
            <h2>La página que buscaba no existe</h2>
            <button className="btn btn-main" onClick={handleInicio}>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;