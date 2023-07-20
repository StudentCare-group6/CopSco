import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DetailsList from './DetailsList';
import "@fontsource/inter";

const PersonalDetails = ['Full Name', 'Age', 'Address', 'Phone No.', 'NIC No.'];
const PersonalData = ['M.A.V Lochana', 25, 'No. 123, Galle Road, Colombo 03', '0712345678', '123456789V'];

export default function PersonalDetailsCard() {
    return (

        <Grid item lg={12} align='center'>
            <Paper className = 'shadow-md' sx={{ gap: 3, boxShadow: 'none', display: 'flex', width: '75%', flexDirection: 'column', padding: 5, borderRadius: 4 }}>
                <Typography component="div" className='text-2xl text-center text-slate-950 font-semibold subpixel-antialiased' sx={{ fontFamily: 'inter' }}>
                    Personal Details
                </Typography>
                <Stack direction='row' justifyContent='center'>
                    <Stack direction='column' sx={{ width: '100%' }} alignItems='center' >
                        <DetailsList detailsArr={PersonalDetails} dataArr={PersonalData} />
                    </Stack>
                </Stack>
            </Paper>
        </Grid>

    );
}

