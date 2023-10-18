import React, { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner'),
        },
        decoder: {
          readers: ['ean_reader', 'code_128_reader'], // Pode adicionar outros formatos de código de barras
        },
      },
      function (err) {
        if (err) {
          console.error('Erro ao inicializar Quagga:', err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      console.log('Código de barras detectado:', data.codeResult.code);
      // Faça algo com o código de barras, como enviá-lo para o servidor ou exibi-lo na interface.
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return <div id="barcode-scanner"></div>;
};

export default BarcodeScanner;
