import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DetailsList from '../DetailsList';
import CircleIcon from '@mui/icons-material/Circle';
import LicenseImg from '../../../images/1.png';
import { useTheme } from '@emotion/react';
import "@fontsource/inter";

function Status() {
    return (
        <Stack direction = 'row' alignItems='center' spacing = {1}>
             <CircleIcon sx={{ fontSize: 10 }} className='text-green-500' />
            <Typography component="div" className='text-xl text-green-500'>
               
                Active
            </Typography>
        </Stack>

    );
}

function Demerits() {
    return (
        <Typography variant="h6" component="div" className='text-orange-500'>
            8
        </Typography>
    );
}
const LicenseDetails = ['Status', 'Demerit Points', 'License No.', 'Date of Issue', 'Date of Expiry', 'Vehicle Categories', 'Restrictions'];
const LicenseData = [<Status />, <Demerits />, '123456789', '01/01/2021', '01/01/2025', 'A1, B1, C1', 'None'];

export default function LicenseCard() {
    const theme = useTheme();
    return (

        <Grid item lg={12} align='center' sx = {{width:'100%'}} >
            <Paper className = 'shadow-md' sx={{ gap: 3, paddingLeft: 0 ,boxShadow: 'none', display: 'flex', width: '75%', flexDirection: 'column', padding: 5, borderRadius: 4 , [theme.breakpoints.down('sm')]: {width: '100%' }}}>
                <Typography component="div" className='text-2xl text-center text-slate-950 font-semibold subpixel-antialiased' sx={{ fontFamily: 'inter' }}>
                    License Details
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={5} justifyContent='space-evenly'>
                    <Stack >
                        <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-full">
                            <img
                                src={LicenseImg}
                                class="max-w-xs transition duration-300 ease-in-out hover:scale-110 rounded-full"
                                alt="Louvre" />
                        </div>
                    </Stack>

                    <Stack direction='column' sx={{ width: '100%' }} alignItems='center' >
                        <DetailsList detailsArr={LicenseDetails} dataArr={LicenseData} />
                    </Stack>
                </Stack>
            </Paper>
        </Grid>

    );
}

