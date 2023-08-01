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
import Snackbar from '../../components/GeneralUserRegistration/SnackBar';

export default function FifthPage() {

    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        navigate('/registration/final');
    }
    return (
        <div>
            <Snackbar/>
            <Stack justifyContent="center" alignItems="center" spacing={3}>
                <Typography component="h1" variant="h4" className='font-extrabold text-neutral-500' >
                    Verification Docs
                </Typography>
                <Typography component="h1" variant="h6" className='font-light text-neutral-500' >
                    You can upload these documents here itself or verify yourself manually from the nearest police station
                </Typography>
            </Stack>
            <Box component="form" sx={{ mt: 3 }} noValidate onSubmit={handleSubmit(onSubmit)}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="nic"
                            label="NIC"
                            {...register("nic", {
                                required: "field required",
                                pattern: {
                                    value: /^(?:\d{12}|(?:\d{9}[vVxX]))$/,
                                    message: "Invalid NIC No."
                                }
                            })}
                        />
                        {errors.nic?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.nic?.message}</Alert> : ""}
                    </Grid>
                    <Grid item xs={12}>
                        <div className='border-2 p-3 rounded-lg border-zinc-300'>
                            <label
                                for="nicFile"
                                class="mb-2 inline-block text-neutral-500 ">
                                Upload Front and Rear images of NIC*
                            </label>
                            <input
                                id="nicFile"
                                className='bg-gray-200 rounded-lg p-3'
                                type="file"
                                multiple
                                {...register("nicFile")} />
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Driver's License No."
                            type="text"
                            id="license"
                            {...register("license", {
                                required: "field required",
                                pattern: {
                                    value: /^[A-Z]\d{7}$/,
                                    message: "Invalid License No."
                                }
                            })}
                        />
                        {errors.license?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.license?.message}</Alert> : ""}
                    </Grid>
                    <Grid item xs={12} >
                        <div className='border-2 p-3 rounded-lg border-zinc-300'>
                            <label
                                for="licenseFile"
                                class="mb-2 inline-block text-neutral-500  text-md">
                                Upload Front and Rear images of Driver's License *
                            </label>
                            <input
                                type="file"
                                className='bg-gray-200 rounded-lg p-3'
                                multiple
                                {...register("licenseFile")} />
                        </div>


                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Finish
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}