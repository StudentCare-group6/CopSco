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
import otpImg from '../../images/otp.png';
import Timer from '../../components/GeneralUserRegistration/Timer';

export default function FourthPage() {

    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert("Submitted");
        navigate('/registration/fifth');
    }

    return (
        <div>
            <Stack justifyContent="center" alignItems="center" spacing={3}>
                <Typography component="h1" variant="h4" className='font-extrabold text-neutral-500' >
                    OTP Verification
                </Typography>
                <Typography component="h1" variant="h6" className='font-light text-neutral-500' >
                    We've sent you an OTP to the your contact number
                </Typography>
            </Stack>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                <Stack sx={{ width: '100%' }} alignItems='center'>
                    <img src={otpImg} className='w-52' />
                </Stack>
                <Timer/>
                <Grid container spacing={2} >
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1"/>
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1"/>
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1"/>
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" maxlength="1"/>
                            </div>
                        </div>
                       
                    </Grid>

                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Verify Account
                </Button>

                <Grid container justifyContent='center'>
                    <Grid item>
                    Didn't receive OTP ?
                        <Link href="#" className='ml-1' >
                             Resend
                        </Link>
                    </Grid>
                </Grid>

            </Box>
            <DevTool control={control} />
        </div>
    );
}