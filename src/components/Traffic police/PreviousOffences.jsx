import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import StickyHeadTable from './PreviousOffenseTable';
import Button from '@mui/material/Button';
import "@fontsource/inter";

export default function PreviousOffences() {
    return (

        <Grid item lg={12} align='center'>
            <Paper className='shadow-md' sx={{ gap: 3, boxShadow: 'none', display: 'flex', width: '75%', flexDirection: 'column', padding: 5, borderRadius: 4 }}>
                <Typography component="div" className='text-2xl text-center text-slate-950 font-semibold subpixel-antialiased' sx={{ fontFamily: 'inter' }}>
                    Previous Offences
                </Typography>
                <Stack direction='row' justifyContent='center'>
                    <Stack direction='column' sx={{ width: '100%' }} alignItems='center' >
                        <StickyHeadTable />
                        <Button variant="contained" size="large" className='rounded-full mt-10 px-10 py-4'>
                            Issue Fine
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>

    );
}
