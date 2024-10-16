import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css"; // Asegúrate de importar el archivo CSS

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Función para capitalizar la primera letra
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-light">
        <li className="breadcrumb-item">
          <Link to="/">Inicio</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li className="breadcrumb-item active" aria-current="page" key={routeTo}>
              {capitalize(name)}
            </li>
          ) : (
            <li className="breadcrumb-item" key={routeTo}>
              <Link to={routeTo}>{capitalize(name)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
