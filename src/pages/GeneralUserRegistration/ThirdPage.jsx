import * as React from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import otpImg from '../../images/otp.png';
import useFormContext from '../../hooks/useFormContext';
import Steppers from '../../components/GeneralUserRegistration/Steppers';

export default function ThirdPage() {

    const { data, handleChange, form, register, control, errors } = useFormContext();

    return (
        <div> 
            <Steppers step={2} />
            <Grid container spacing={2} sx = {{marginTop:'8%'}}>
               
                <Stack sx={{ width: '100%' }} alignItems='center'>
                    <img src={otpImg} className='w-52' />
                </Stack>
                <Typography component="h1" variant="subtitle1" className='mt-10 mb-5 font-light text-neutral-500' >
                    Enter your contact number :
                </Typography>
                <Grid container spacing={2} >
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            id="contact"
                            defaultValue={data.contact}
                            label="Contact No."
                            {...register("contact", {
                                required: "field required",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Contact number should have 10 digits"
                                }
                            })}
                        />
                        {errors.contact?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.contact?.message}</Alert> : ""}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}