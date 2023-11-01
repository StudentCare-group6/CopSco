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

const Appeal = () => {
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

  const appeals = /^[a-zA-Z]+$/;
  const namePattern = /^[a-zA-Z]+$/;
  const policeNumber = /^[0-9]{3}$/;

  return (
    <div style={{ height: '500px', display: 'flex', flexDirection: 'column',}}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>

      <div className="mb-5">
          <Controller className="mt-5"
            name="caseid"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: namePattern,
                message: '*Appeal can not contain numbers or special characters.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Violation ID"
                placeholder=""
                variant="outlined"
                fullWidth
                error={!!errors.appeals}
                helperText={errors.appeals?.message}
                sx={{ marginLeft: '35px', marginTop: '25px',width: '80%', marginRight: '25px' }}
              />
            )}
          />
        </div>

        <div className="mb-5">
          <Controller className="mt-5"
            name="reason"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: namePattern,
                message: '*Appeal can not contain numbers or special characters.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reason"
                placeholder="Add the reason"
                variant="outlined"
                fullWidth
                error={!!errors.appeals}
                helperText={errors.appeals?.message}
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
              <Button variant="contained" type="submit" >
                {/* onClick={() => addNewAppeal(row.caseid)}> */}
                Add Appeal
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

export default Appeal;

