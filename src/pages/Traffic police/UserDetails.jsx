import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../../components/Traffic police/Header';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import CustomizedSteppers from '../../components/Traffic police/Steppers.jsx';



export default function UserDetails() {
    const theme = useTheme();
    return (
        <Box>
            <Header />
            <Box>
                <CustomizedSteppers step={1} />
            </Box>
            <Box>
                <Stack direction="row" className='bg-red-500' sx = {{height:500}}>
                    <Grid container spacing={0} className = 'bg-red-400'>
                        <Grid item lg={12} className='bg-slate-700'>

                        </Grid>
                        <Grid item lg={12} className='bg-sky-300'>

                        </Grid>
                    </Grid>
                    <Grid container className = 'bg-red-300'>
                        
                    </Grid>

                </Stack>


            </Box>
        </Box>

    );
}