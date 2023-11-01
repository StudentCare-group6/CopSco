import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import ChangePassword from './ChangePassword';
import DeleteProfile from './DeleteProfile';
import {banks, branches } from "../../../data/Constants";
import MenuItem from '@mui/material/MenuItem';
import UpdateIcon from '@mui/icons-material/Update';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const InputForm = (props) => {
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
      <Grid container spacing={5} sx={{ padding: 5 }}>
        <Grid item xs={12}>

          <TextField
            id="province"
            label="Bank"
            margin="normal"
            fullWidth
            select
            defaultValue={props.bank.bank}
          >
            {banks.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm = {6} md = {6}>
          <TextField
            id="province"
            label="Branch"
            fullWidth
            select
            defaultValue={props.bank.branch}
          >
            {branches.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm = {6} md = {6}>
          <TextField
            name="username"
            label="Account Number"
            variant="outlined"
            fullWidth
            value={props.bank.accountno}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Account Holder Name"
            variant="outlined"
            fullWidth
            type='email'
            value={props.bank.acc_holder}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} align='center'>
          <Button
            startIcon={<UpdateIcon />}
            type="submit"
            variant="contained"
            color="primary"
            className="rounded-full"
            sx={{ textTransform: 'none' }}
          >
            Update Information
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography className='text-zinc-500 ' sx={{ fontWeight: 'bold', paddingTop: 1, }}>
            {"Your secret :"}
          </Typography>
          <Typography variant = 'body1' className='text-zinc-400' sx = {{ paddingBottom: 2}}>
            {"Do not share this with anyone"}
          </Typography>
          <Box className='bg-slate-200 rounded-xl'>
            <Typography className='text-zinc-500 ' sx={{ fontWeight: 'bold', padding: 1.8, textAlign: 'center', wordWrap: 'break-word' }}>
              {props.secret}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between'>
            <ChangePassword />
            <DeleteProfile />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default InputForm;
