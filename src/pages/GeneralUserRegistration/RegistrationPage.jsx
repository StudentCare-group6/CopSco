import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageSlideShow from '../../components/Login/ImageCarousel';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Steppers from '../../components/GeneralUserRegistration/Steppers';
import { Outlet } from "react-router-dom";



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>

                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <Typography sx={{ margin: '20px' }} component="h1" variant="h5" className='font-extrabold text-black' >
                        CopSco
                    </Typography>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Outlet />
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                </Grid>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}

                >
                    <ImageSlideShow />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}