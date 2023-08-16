import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function VehicalInfo() {
  return (
    <Card sx={{ margin: 3, boxShadow:'none' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        CAB-9698
      </Typography>
      <CardContent>
        <ul sx={{ paddingLeft: 0, listStyleType: 'none' }}>
          <li>
            Absoulute Owner:&nbsp;&nbsp;
            <b>CDB FINANCE PLC</b>
          </li>
          <li>
            Engine Number:&nbsp;&nbsp;
            <b>LDA-MF6-4323456</b>
          </li>
          <li>
            Chassis Number:&nbsp;&nbsp;
            <b>LDA-MF6-4323456</b>
          </li>
          <li>
            Class of Vehicle:&nbsp;&nbsp;
            <b>MOTOR CAR</b>
          </li>
          <li>
            Make:&nbsp;&nbsp;
            <b>TOYOTA</b>
          </li>
          <li>
            Model:&nbsp;&nbsp;
            <b>AQUA</b>
          </li>
          <li>
            YOM:&nbsp;&nbsp;
            <b>2017</b>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default VehicalInfo;
