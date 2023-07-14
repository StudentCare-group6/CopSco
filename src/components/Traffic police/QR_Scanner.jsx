import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

export default function Test()  {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState('No result');

  const handleScan = (data) => {
    setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  // const previewStyle = {
  //   height: '100%',
  //   width: '100%',
  //   borderRadius: '2'
  // };

  return (
    <div>
      <QrReader
        delay={delay}
        className = 'h-5 w-5 rounded'
        onError={handleError}
        onScan={handleScan}
      />
      <p>{JSON.stringify(result)}</p>
    </div>
  );
};



