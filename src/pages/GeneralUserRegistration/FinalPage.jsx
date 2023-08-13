import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import checkedImg from '../../images/checked.png';
import useFormContext from '../../hooks/useFormContext';
import Snackbar from "../../components/GeneralUserRegistration/SnackBar";

export default function FinalPage() {
    const {data} = useFormContext();
   
    return (
        <div>      <Snackbar />
                <Stack sx={{ width: '100%' }} alignItems='center'>
                    <img src={checkedImg} className='w-48' />
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
        </div>
    );
}