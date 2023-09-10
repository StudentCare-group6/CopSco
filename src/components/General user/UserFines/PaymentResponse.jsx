import React from 'react';

const PaymentResponse = ({ htmlResponse }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlResponse }} />
  );
};

export default PaymentResponse;