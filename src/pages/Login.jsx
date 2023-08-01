import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageSlideShow from '../components/Login/ImageCarousel';
import { Stack } from '@mui/material';
import GoogleButton from 'react-google-button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useMediaQuery } from '@mui/material';

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

export default function Login({setAuth}) {

  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const formWidth = isXsScreen ? '70%' : '50%';
  const handleSubmit = async(event) => {  
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // try{
    //   const body = {email: data.get('email'), password: data.get('password')};
    //   const response = await fetch("http://localhost:3000/auth/login",{
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(body)
    //   });
    //   const parseRes = await response.json();
    //   console.log(parseRes);
    // }catch(err){
    //   console.error(err.message);
    // }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>

        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Typography sx = {{margin:'20px'}} component="h1" variant="h5" className='font-extrabold text-black' >
          CopSco
        </Typography>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Stack justifyContent="center" alignItems="center" spacing={3}>
              <Typography component="h1" variant="h4" className='font-extrabold text-neutral-500' >
                Login to your account
              </Typography>
              <Typography component="h1" variant="h6" className='font-light text-neutral-500' >
                Welcome back! Select a method to login
              </Typography>

              <GoogleButton
                onClick={() => { console.log('Google button clicked') }}
              />
            </Stack>

            <Stack sx={{ width: formWidth, margin: '50px' }}>
              <Divider>OR</Divider>
            </Stack>


            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1,width: formWidth }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setAuth(true)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registration" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
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