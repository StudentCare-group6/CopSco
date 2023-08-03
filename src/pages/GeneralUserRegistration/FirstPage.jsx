import * as React from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Steppers from '../../components/GeneralUserRegistration/Steppers';
import Alert from '@mui/material/Alert';
import useFormContext  from '../../hooks/useFormContext';

export default function FirstPage() {

    const {data, register, errors} = useFormContext();
    return (
        <div>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Steppers step={0} />
                    <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                        <TextField
                            autoComplete="given-name"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            defaultValue={data.firstName}
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
                    <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            defaultValue={data.lastName}
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
                            defaultValue={data.email}
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

                </Grid>
            
        </div>
    );
}