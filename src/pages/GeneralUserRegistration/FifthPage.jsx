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
import useFormContext from '../../hooks/useFormContext';

export default function FifthPage() {

    const { data, handleChange, form, register, control, errors } = useFormContext();
    return (
        <div>
            <Snackbar/>
            <Steppers step={3} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="nic"
                            label="NIC"
                            defaultValue={data.nic}
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
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            
        </div>
    );
}