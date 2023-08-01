import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Steppers from '../../components/GeneralUserRegistration/Steppers';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import checkedImg from '../../images/checked.png';
import Timer from '../../components/GeneralUserRegistration/Timer';


export default function FinalPage() {

    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert("Submitted");
        navigate('/');
    }

    return (
        <div>
            <Stack justifyContent="center" alignItems="center" spacing={3}>
                <Typography component="h1" variant="h4" className='font-extrabold text-neutral-500' >
                    Congratulations
                </Typography>
                <Typography component="h1" variant="h6" className='font-light text-neutral-500' >
                    You've successfully registered to CopSco !
                </Typography>
            </Stack>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                <Stack sx={{ width: '100%' }} alignItems='center'>
                    <img src={checkedImg} className='w-52' />
                </Stack>

                <Grid container spacing={2} >
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Typography component="h1" variant="subtitle1" className='mt-10 font-light text-neutral-500' >
                            We'll verify your details and send a notification to your contact number
                        </Typography>
                        <Typography component="h1" variant="subtitle1" className='mt-5 font-light text-neutral-500' >
                            If you didn't upload the verification documents , then please visit the nearest police station to verify yourself
                        </Typography>
                    </Grid>

                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2 }}
                >
                    Redirect to login
                </Button>

            </Box>
            <DevTool control={control} />
        </div>
    );
}