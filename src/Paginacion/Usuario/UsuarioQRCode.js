import React from 'react';
import QRCode from 'react-qr-code';

const UsuarioQRCode = ({ userData }) => {
  // Convertir los datos del usuario en una cadena JSON
  const userDataJSON = JSON.stringify(userData);

  return (
    <div>
      {/* Renderizar el código QR con los datos del usuario */}
      <QRCode value={userDataJSON} />
      {/* Mostrar los datos del usuario debajo del código QR */}
      {/* <pre>{userDataJSON}</pre> */}
    </div>
  );
};

export default UsuarioQRCode;
