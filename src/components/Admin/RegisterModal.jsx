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

const userRoles = ['Admin', 'Police Division Operator', 'Control Room Operator'];

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const { register, errors } = useFormContext();

    return (
        <React.Fragment>
            <Button onClick={handleOpen} fullWidth variant='contained'>Register User</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                    <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                        <Button onClick={handleClose} fullWidth>Confirm</Button>
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
    const { register, errors } = useFormContext();
    const [role, setRole] = React.useState('');
    const [selectedDivision, setSelectedDivision] = useState([]); // State to hold selected offences
    const [selectedDivisionCode, setSelectedDivisionCode] = useState(""); // State to hold selected offences
    const handleDivisionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDivision(selectedValue);

        const selectedDivisionCode = policeDivisions.get(selectedValue);
        setSelectedDivisionCode(selectedDivisionCode);
    };

    const handleChange = (event) => {
        setRole(event.target.value);
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
                <Box sx={style}>
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
                                {...register("email", {
                                    required: "field required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Invalid email address"
                                    }
                                }
                                )}
                            />
                            {errors.email?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.email?.message}</Alert> : ""}
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <TextField
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                {...register("fname", {
                                    required: "field required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Invalid first name"
                                    }
                                })}
                            />
                            {errors.firstName?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.firstName?.message}</Alert> : ""}
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoComplete="family-name"
                                {...register("lname", {
                                    required: "field required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Invalid last name"
                                    }
                                })}
                            />
                            {errors.lastName?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.lastName?.message}</Alert> : ""}
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
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
                                }
                                )}
                            />
                            {errors.email?.message ? <Alert sx={{ mt: '10px' }} severity="error">{errors.email?.message}</Alert> : ""}
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <TextField
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
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <TextField
                                id="division"
                                margin="normal"
                                label="Division"
                                select
                                fullWidth
                                sx={{ mt: 3 }}
                                SelectProps={{
                                    sx: {
                                        height: "50px",
                                    },
                                    value: selectedDivision,
                                    onChange: handleDivisionChange,
                                }}
                                {...register("divisionTitle", {
                                    required: "field required",
                                })}
                            >
                                {Array.from(policeDivisions.keys()).map((division) => (
                                    <MenuItem key={division} value={division}>
                                        {division}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {errors.division?.message ? (
                                <Alert sx={{ mt: "10px" }} severity="error">
                                    {errors.division?.message}
                                </Alert>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <TextField label='User Role' select value={role} onChange={handleChange} fullWidth SelectProps={{
                                sx: {
                                    height: '50px',
                                },
                            }}>
                                {userRoles.map((value) => (
                                    <MenuItem key={value} value={value}>{value}</MenuItem>
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