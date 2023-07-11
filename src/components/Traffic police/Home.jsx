import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Header from '../Traffic police/Header';
import Sidebar from '../Traffic police/Sidebar';
import Grid from '@mui/material/Grid';
import qr from './qr.png'
import license from './license.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OptionCard from './OptionCard';
import { useTheme } from '@mui/material/styles';
import CustomizedSteppers from './Steppers.jsx';


export default function Home() {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Box>
                    <Header />
                    <Box>
                        <CustomizedSteppers />
                    </Box>
                    <Box>
                        
                        <Grid container sx={{ justifyContent: 'center', marginTop: 10 }}>
                            <OptionCard txt={'Scan QR'} img={qr} />
                            <Grid item xs={12} sm={3} sx={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', [theme.breakpoints.up('sm')]: {
                                   height: 500
                                },

                                [theme.breakpoints.up('xs')]: {
                                    width: 200,
                                    height: 100,
                                },
                            }} >

                                <Typography variant='h3' align='center' className='font-bold text-gray-700'>OR</Typography>

                            </Grid>
                            <OptionCard txt={'Enter License No.'} img={license} />

                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
