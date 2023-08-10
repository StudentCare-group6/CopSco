import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link2 from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageSlideShow from '../components/Login/ImageCarousel';
import { Stack, useMediaQuery } from '@mui/material';
import GoogleButton from 'react-google-button';
import Divider from '@mui/material/Divider';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/posts'
import { useNavigate, useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link2 color="inherit" href="https://mui.com/">
        Your Website
      </Link2>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const userRef = useRef();

  const [user, resetUser, userAttributes] = useInput('user','');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = useToggle('persist', false);

  const handleClose = () => {
    setErrMsg('');
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const formWidth = isXsScreen ? '70%' : '50%';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('auth/login',
        JSON.stringify({ username: user, pass: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        },
      );
      const accessToken = response.data.accessToken;
      const role = response.data.userrole;
      setAuth({ user, pwd, role, accessToken });
      // setUser('');
      resetUser();
      setPwd('');
      if (role === 'traffic-police') {
        navigate('/traffic-police');
      } else if (role === 'general-user') {
        navigate('/general-user');
      } else if (role === 'police-operator') {
        navigate('/police-operator');
      } else {
        navigate(from);
      }

    } catch (err) {
      if (!err?.response) {
        setErrMsg('Network error');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed, try again');
      }
     
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        open={Boolean(errMsg)}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          severity="error"
          onClose={handleClose}
          role="alert"
          variant = "filled"
        >
          {errMsg}
        </Alert>
      </Snackbar>
      <Grid container component="main" sx={{ height: '100vh' }}>

        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Typography sx={{ margin: '20px' }} component="h1" variant="h5" className='font-extrabold text-black' >
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: formWidth }}>

              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="username"
                ref={userRef}
                label="Username"
                autoComplete='on'
                {...userAttributes}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
              <FormControlLabel
                control={
                <Checkbox 
                   color="primary"
                   id = "remember"
                   onChange={toggleCheck}
                   checked={check}
                  />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link2 href="#" variant="body2">
                    Forgot password?
                  </Link2>
                </Grid>
                <Grid item>
                  <Link2 href="/registration" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link2>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6}>
          <ImageSlideShow />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}