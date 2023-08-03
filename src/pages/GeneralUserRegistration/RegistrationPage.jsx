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
import useFormContext from '../../hooks/useFormContext';
import FormInputs from './FormInputs';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';

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
    const {
        page,
        setPage,
        data,
        title,
        subtitle,
        canSubmit,
        handleSubmit,
        errors,
        watch,
        getValues,
    } = useFormContext();

    const onSubmit = e => {

        console.log(JSON.stringify(data))
    }

    const handlePrev = () => setPage(page - 1);
    const handleNext = () => {
        if (page === 0 && (getValues('firstName') === '' || getValues('lastName') === '' || getValues('email') === '')) {
            alert('Please fill all the fields');

        } else if (page === 1 && (getValues('photoUrl') === '')) {
            alert('Please upload a photo');

        } else {
            setPage(page + 1);
            console.log('photoUrl', getValues('photoUrl'));
        }
    };
    // useEffect(() => {
    //     const subscription = watch((value) => {
    //         console.log(value)
    //     });
    //     return () => subscription.unsubscribe();
    // }, [watch]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <Typography sx={{ margin: '20px' }} component="h1" variant="h5" className='font-extrabold text-black' >
                        CopSco
                    </Typography>
                    <Stack justifyContent="center" alignItems="center" spacing={3} sx={{ marginTop: '3%' }}>
                        <Typography component="h1" variant="h4" className='font-extrabold text-neutral-500' >
                            {title[page]}
                        </Typography>
                        <Typography component="h1" variant="h6" className='font-light text-neutral-500' >
                            {subtitle[page]}
                        </Typography>
                    </Stack>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                                <FormInputs />
                                <Stack direction='row' justifyContent='space-between' sx={{ marginTop: '30px' }}>
                                    {page === 0 && (
                                        <Button variant='contained' type="button" onClick={handleNext} sx={{ width: '30%' }}>
                                            Next
                                        </Button>
                                    )}
                                    {page > 0 && page < 4 && (
                                        <>
                                            <Button variant='outlined' type="button" onClick={handlePrev} sx={{ width: '30%' }}>
                                                Back
                                            </Button>
                                            <Button variant='contained' type="button" onClick={handleNext} sx={{ width: '30%' }}>
                                                Next
                                            </Button>
                                        </>
                                    )}
                                    {page === 4 && (
                                        <>
                                            <Button variant='outlined' type="button" onClick={handlePrev} sx={{ width: '30%' }}>
                                                Back
                                            </Button>
                                            <Button variant = 'contained' onClick={handleSubmit} sx={{ width: '30%' }}>
                                                Finish
                                            </Button>
                                        </>
                                    )}
                                </Stack>
                            </Box>
                        </Box>
                        <div>
                            {page === 3 && (
                                <Grid container justifyContent='center' className='mt-10'>
                                    <Grid item>
                                        Didn't receive OTP ?
                                        <Link href="#" className='ml-1' >
                                            Resend
                                        </Link>
                                    </Grid>
                                </Grid>
                            )}

                            {page !== 3 && page !== 5 && (
                                <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            )}
                        </div>
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