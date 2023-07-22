import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DarkDetailsList from './DarkDetailsList';

function FinePaid() {
    return (
        <Typography component="div" className='text-green-500'>
            Yes
        </Typography>
    );
}

const OffenceDetails = ['Offence', 'Date', 'Location', 'Fine Settled'];
const OffenceData = ['Speeding', '01/01/2021', 'Kandy', <FinePaid />];

export default function BasicCard() {


    return (
        <Stack>
            <Paper className='bg-slate-950 opacity-90' sx={{ display: 'flex', width: 400, flexDirection: 'column', padding: 4, borderRadius: 7, marginTop: 2 }}>
                <Stack direction='column' sx={{ width: '100%' }} alignItems='center'>
                    <DarkDetailsList detailsArr={OffenceDetails} dataArr={OffenceData} />
                </Stack>
            </Paper>
        </Stack>
    );
}