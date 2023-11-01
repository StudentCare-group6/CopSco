import React, { useState } from "react";
import { useForm, Controller, useWatch } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: '#020617',
          color: 'white',
          fontSize: '0.90rem',
          borderRadius: '10px',
          width: '200px',
          padding: '5px 15px',
          '&:hover': {
            background: 'black', 
          },
        },
        outlined: {
          borderColor: '#020617', 
          color: '#020617',
          fontSize: '0.90rem',
          padding: '5px 15px',
          width: '200px',
          borderRadius: '10px',
          '&:hover': {
            background: 'white', 
            color: 'black',
          },
        },
      },
    },
  },
});

export default ManualFine = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    
      console.log("Submitted data:", data);
      toast.success("Added Successfully!");
  };
  

  const handleViolationStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColor(selectedValue); 
  };

  const namePattern = /^[a-zA-Z]+$/;
  const policeNumber = /^[0-9]{3}$/;
  // const phoneNumber = /^[0-9]{10}$/;
  // const email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  return (
    <div style={{ height: '500px', display: 'flex', flexDirection: 'column',}}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>

        {/* Violation type */}
        <div className="mb-5">
          <Controller className="mt-5"
            name="violation"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: namePattern,
                message: '*Violation can not contain numbers or special characters.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Violation"
                placeholder=""
                variant="outlined"
                fullWidth
                error={!!errors.violation}
                helperText={errors.violation?.message}
                sx={{ marginLeft: '35px', marginTop: '25px',width: '80%', marginRight: '25px' }}
              />
            )}
          />
        </div>

        {/* Amount */}
        <div className="mb-5">
          <Controller className="mt-5"
            name="amount"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: namePattern,
                message: '*Amount can not contain letters.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                placeholder=""
                variant="outlined"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message}
                sx={{ marginLeft: '35px', marginTop: '25px',width: '80%', marginRight: '25px' }}
              />
            )}
          />
        </div>
        
        {/* Police number */}
        <div className="mb-5">
          <Controller className="mt-5"
            name="policeNumber"
            control={control}
            defaultValue="43956"
            rules={{
              required: '*This field is required.',
              pattern: {
                value: policeNumber,
                message: '*Invalid number.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Police Number"
                placeholder="Police Number"
                variant="outlined"
                fullWidth
                error={!!errors.policeNumber}
                helperText={errors.policeNumber?.message}
                sx={{ marginLeft: '35px', marginTop: '25px',width: '80%', marginRight: '25px' }}
              />
            )}
          />
        </div>

        <div className="flex justify-center ml-24 mb-5" >
          <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Payment Done
              </Button>
              <Button variant="outlined" onClick={() => window.location.reload()}>
                Cancel
              </Button>
            </Stack>
          </ThemeProvider>
        </div>

      </form>
      <ToastContainer />
    </div>
  );
}
