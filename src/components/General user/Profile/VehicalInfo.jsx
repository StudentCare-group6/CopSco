import { Card, CardContent } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

function VehicalInfo() {
  const keyValuePairs = [
    { key: 'Absoulute Owner', value: 'Osura Viduranga' },
    { key: 'Engine Number',   value: '200012702955' },
    { key: 'Chassis Number', value: '200012702955' },
    { key: 'Class of Vehicle', value: 'MOTOR CAR' },
    { key: 'Make', value: 'TOYOTA' },
    { key: 'Model', value: 'AQUA' },
    { key: 'YOM', value: '2017' }
  ];
  return (
    <Card className='m-3 shadow-md rounded-md' sx={{ boxShadow: 'none', width : '90%', padding: 1 }}>
      <Typography className='text-xl font-bold mt-2 text-zinc-600' align='center'>
        CAB-9698
      </Typography>
      <CardContent>
        <Grid container  alignItems='center' justifyContent='center'>
          {keyValuePairs.map((pair, index) => (
            <>
              <Grid item xs={12} sm={6} key={index} >
                <Typography variant='subtitle1' className = 'text-zinc-600' sx={{ marginLeft: '30px' }}>
                  {pair.key}:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant='subtitle1' className='text-zinc-600' sx={{ marginLeft: '30px', fontWeight:'bold' }}>
                  {pair.value}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default VehicalInfo


{/* <ul className="text-left">
<li>Absoulute Owner:&nbsp;&nbsp;<b>CDB FINANCE PLC</b></li>
<li>Engine Number:&nbsp;&nbsp;<b>LDA-MF6-4323456</b></li>
<li>Chassis Number:&nbsp;&nbsp;<b>LDA-MF6-4323456</b></li>
<li>Class of Vehicle:&nbsp;&nbsp;<b>MOTOR CAR</b></li>
<li>Make:&nbsp;&nbsp;<b>TOYOTA</b></li>
<li>Model:&nbsp;&nbsp;<b>AQUA</b></li>
<li>YOM:&nbsp;&nbsp;<b>2017</b></li>
</ul> */}