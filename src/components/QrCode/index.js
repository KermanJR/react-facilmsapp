import React, { useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  const videoRef = useRef(null);

  

  return (
    <div>
      <button onClick={startBarcodeScanner}>Abrir Leitor de Código de Barras</button>
      <div>
        <video ref={videoRef} />
      </div>
    </div>
  );
};

export default BarcodeScanner;
