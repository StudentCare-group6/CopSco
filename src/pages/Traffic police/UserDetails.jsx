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
                <Stack direction="row" className='bg-red-500' sx={{ height: '100%' }}>
                    <Grid container spacing={0}>
                        <Grid item>

                        </Grid>
                        <Grid item>

                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>

                        </Grid>
                        <Grid item>

                        </Grid>
                    </Grid>

                </Stack>


            </Box>
        </Box>

    );
}