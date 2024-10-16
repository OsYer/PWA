import React from 'react';
import ReactLoading from 'react-loading';

const Spinner = ({ type = "spin", color = "#000", height = '10%', width = '10%', contentReady = false }) => {

  return (
    <>
      {!contentReady && <ReactLoading type={type} color={color} height={height} width={width} />}
  
    </>
  );
};

export default Spinner;
