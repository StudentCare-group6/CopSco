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

export default function FirstPage() {

    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const navigate = useNavigate();
    const onSubmit = (data) => {
        alert("Submitted");
        navigate('/registration/second');
    }

    return (
        <div>
            <Stack justifyContent="center" alignItems="center" spacing={3}>
                <Typography component="h1" variant="h4" className='font-extrabold text-neutral-500' >
                    Sign up to CopSco
                </Typography>
                <Typography component="h1" variant="h6" className='font-light text-neutral-500' >
                    You're taking the first step towards safer roads !
                </Typography>
            </Stack>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>

                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Steppers step={0} />
                    <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                        <TextField
                            autoComplete="given-name"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            {...register("firstName", {
                                required: "field required",
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "Invalid first name"
                                }
                            })}
                        />
                        {errors.firstName?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.firstName?.message}</Alert> : ""}
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoComplete="family-name"
                            {...register("lastName", {
                                required: "field required",
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "Invalid last name"
                                }
                            })}
                        />
                        {errors.lastName?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.lastName?.message}</Alert> : ""}
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            {...register("email", {
                                required: "field required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.email?.message}</Alert> : ""}
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="contact"
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

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Next
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>

            </Box>
            <DevTool control={control} />
        </div>
    );
}