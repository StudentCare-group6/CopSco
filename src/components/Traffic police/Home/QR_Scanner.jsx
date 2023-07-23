import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner({ isModalOpen }) {
  const [scanResult, setScanResult] = useState(null);
  let scanner = null; // Declare the scanner variable outside the useEffect

  useEffect(() => {
    if (isModalOpen) {
      scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5
      });
      scanner.render(success, error);
    }

    function success(result) {
      if (scanner) {
        scanner.clear();
      }
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }

    // Cleanup function
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };

  }, [isModalOpen]);

  return (
    <div>
      <h1>QR Code Scanning in React</h1>
      {scanResult ? <div>Success: {scanResult}</div> : <div id="reader"></div>}
    </div>
  );
}
