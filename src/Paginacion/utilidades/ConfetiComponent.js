import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  const [confetiActive, setConfetiActive] = useState(false);

  const activateConfeti = () => {
    setConfetiActive(true);
    setTimeout(() => {
      setConfetiActive(false);
    }, 5000); 
  };

  useEffect(() => {
    activateConfeti();
  }, []); 
  return (
    <>
      {confetiActive && <Confetti width={window.innerWidth} height={600} recycle={false} />}
    </>
  );
}

export default ConfettiComponent;
