import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/posts';
import useDetailsContext from '../../../hooks/useDetailsContext';

export default function QRScanner({ isModalOpen }) {

  const {
    LicenseDetails,
    personalDetails,
    previousOffences,
    setPreviousOffences,
    setPersonalDetails,
    setLicenseDetails,
    setLicenseNumber,
    setNic,
  } = useDetailsContext();

  const [scanResult, setScanResult] = useState(null);
  let scanner = null;
  const navigate = useNavigate();

  const handleVerification = async (result) => {
    const nic = '200012702905';
    const licenseNumber = 'B123123';

    try {
      const response = await axios.post('/getDriver',
        JSON.stringify({ licenseNumber : licenseNumber, nic: nic, }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        },
      );
      
      const data = response.data;
        setLicenseDetails(prevLicenseDetails => ({
          ...prevLicenseDetails, // Spread existing values
          demeritPoints: data.total_demerit_points,
          licenseNumber: data.license_number,
          dateOfIssue: data.date_of_issue,
          dateOfExpiry: data.date_of_expiry,
          vehicleClass: data.vehicle_details[0].vehicle_category,
          restrictions: data.restrictions,
          // Update other properties as needed
        }));

        setPersonalDetails(prevPersonalDetails => ({
          ...prevPersonalDetails, // Spread existing values
          fullName: data.surname + ' ' + data.other_names,
          address: data.address
          // Update other properties as needed
        }));

        setPreviousOffences(data.previous_fines);

      navigate('/traffic-police/user-details');
  
      
    } catch (err) {
      console.log(err.response.data.error);
    }
  };
  

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

    async function success(result) {
      if (scanner) {
        scanner.clear();
      }
      setScanResult(result);
      const parts = result.split('-');

      const firstPart = parts[0];
      const secondPart = parts[1];

      await handleVerification(result);
    }

    function error(err) {
      console.warn(err);
    }

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



// import React, { useState, useEffect, useRef } from 'react';
// import {Container, Card, CardContent, TextField} from '@mui/material';
// import Grid from '@mui/material/Grid';
// import {QrReader} from 'react-qr-reader';


// export default function QRScanner() {

// const [scanResult, setScanResult] = useState('');

// const handleErrorFile = (error) => {
//     console.log(error);
// }

// const handleScanFile = (result) => {
//     if(result){
//         setScanResult(result);
//         console.log(result);
//     }
// }

//   return(
//     <Container sx = {{marginTop:10}}>
//       <Card>
//         <h2> Generate Download & Scan QR code</h2>
//         <CardContent>
//           <Grid container spacing = {2}>
//             <Grid item xl = {4} md = {6} xs = {12}>
//                 <h3> Qr code scan by WebCam</h3>
//                 <QrReader
//                 delay = {300}
//                 style = {{width:'100%'}}
//                 onError = {handleErrorFile}
//                 onScan = {handleScanFile}
//                 legacyMode
//                 />
//             </Grid>
//             <h3>Scanned By webcame : {scanResult}</h3>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }









































