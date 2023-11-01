import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import useFormContext from '../../hooks/useFormContext';
import MenuItem from '@mui/material/MenuItem';
import image from '../../images/security.png';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { policeDivisions } from "../../components/Traffic police/Constants";
import useAuth from '../../hooks/useAuth';
import axios from '../../api/posts'




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 5,
};

// const userRoles = ['admin', 'police-operator', 'police-division', 'traffic-police'];
const userRoles =[
    {
        value: 'admin',
        label: 'Administrator',
    },
    {
        value: 'police-operator',
        label: 'Control Room Operator',
    },
    {
        value: 'police-division',
        label: 'Police Division Operator',
    },
    {
        value: 'traffic-police',
        label: 'Traffic Police Officer',
    }
]

function ChildModal() {
    const { auth } = useAuth();
    const password = auth.pwd;
    const [open, setOpen] = React.useState(false);
    const [passwordCheckResult, setPasswordCheckResult] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const { register, errors, getValues } = useFormContext();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if the entered password matches the expected password
        const enteredPassword = getValues("pass"); // Assuming you have a 'pass' field in your form

        if (enteredPassword === password) {
            setPasswordCheckResult(true);
            console.log(getValues(''));
            try{
                // consaxios.post('/register', 
                // JSON.stringify({ policeid: getValues('policeId'), userrole: getValues('userRole')}),
                // {
                //   headers: { 'Content-Type': 'application/json' },
                //   withCredentials: true
                // },);
                const response = axios.post('admin/createUsers',
                JSON.stringify({ policeid: getValues('policeId'), userrole: getValues('userRole')}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },);
                console.log(response.data);
                setAlertMessage('Password is correct. User registered.');
                window.location.reload();
            }catch(err){
                console.log(err);
            }
            
            // Add your registration logic here
        } else {
            setPasswordCheckResult(false);
            setAlertMessage('Password is incorrect. User registration failed.');
       
        }
    };


    return (
        <React.Fragment>
            <Button onClick={handleOpen} fullWidth variant='contained'>Register User</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box component='form' onSubmit={handleSubmit} sx={{ ...style, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                        <Typography align="center" variant='h6' sx={{ fontWeight: '600' }} color='#020617'>
                            Admin Password Required
                        </Typography>
                    </Grid>
                    <Stack sx={{ width: "100%", marginTop: '5%' }} alignItems="center">
                        <img src={image} style={{ width: '150px' }} />
                    </Stack>
                    <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="pass"
                            label="Password"
                            type="password"
                            autoFocus
                            {...register("pass", {
                                required: "field required"
                            })}
                        />
                    </Grid>
                    {passwordCheckResult !== null && (
                        <Alert severity={passwordCheckResult ? 'success' : 'error'} sx={{ mt: '10px' }}>
                            {alertMessage}
                        </Alert>
                    )}
                    <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                        <Button type = 'submit' fullWidth>Confirm</Button>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}


export default function RegisterModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, errors, getValues, setValue } = useFormContext();
    const [role, setRole] = React.useState('');
    const handleChange = (event) => {
        setRole(event.target.value);
        setValue('userRole', event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(getValues());
    };
    return (
        <div>
            <Button onClick={handleOpen} startIcon={<UserIcon />} variant='contained'>Create User</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component='form' onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h6" color='#020617' component="h2" align="center" sx={{ fontWeight: '600' }}>
                                Register User
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <TextField
                                required
                                fullWidth
                                id="id"
                                label="Police ID"
                                {...register("policeId", {
                                    required: "field required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Invalid id"
                                    }
                                }
                                )}
                            />
                            {errors.email?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.email?.message}</Alert> : ""}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <TextField label='User Role' select value={role} onChange={handleChange} fullWidth SelectProps={{
                                sx: {
                                    height: '50px',
                                },
                            }}>
                                {userRoles.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <ChildModal />
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </div >
    );
}