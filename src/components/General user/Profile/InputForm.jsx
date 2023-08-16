import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';

const InputForm = () => {
  const [formData, setFormData] = useState({
    fname: 'Osura',
    lname: 'Viduranga',
    username: '200012702955',
    email: 'OV@gmail.com'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, for example, submit data to server or perform some action
    // console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={5} sx={{ padding: 5, marginTop: 3 }}>
        <Grid item xs={6}>
          <TextField
            name="fname"
            label="First Name"
            variant="outlined"
            fullWidth
            value={formData.fname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lname"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formData.lname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: '48px', textTransform: 'none', paddingY: '12px' }}
          >
            Update Information
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Secret"
            disabled
            variant="outlined"
            value={"64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <div sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <ChangePassword />
            <DeleteProfile />
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default InputForm;
