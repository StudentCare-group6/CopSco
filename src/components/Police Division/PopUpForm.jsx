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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

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

const MyForm = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data) => {
    console.log(data);

    const testing = {
      nic: data.nic,
      officerID: data.policeNumber,
    };
    console.log(testing);

      try {
        const response = await axiosPrivate.post("police-division/addPoliceOfficers", testing);
        window.location.reload();
        toast.success("Added Successfully!");
      } catch (error) { 
        console.log(error);
      }
};

  const handleViolationStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColor(selectedValue); 
  };

  const policeNumber = /^[0-9]{5}$/;
  const nic = /^[0-9]{12}$/;

  return (
    <div style={{ height: '250px', display: 'flex', flexDirection: 'column',}}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
        
        {/* Police ID */}
        <div className='mt-5'>
          <Controller className="mt-5"
            name="policeNumber"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: policeNumber,
                message: '*Invalid police number. Please enter a correct number.',
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
        
        {/* NIC */}
        <div>
          <Controller className="mt-5"
            name="nic"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: nic,
                message: '*Invalid NIC number. Please enter a valid NIC number.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="NIC"
                placeholder="NIC"
                variant="outlined"
                fullWidth
                error={!!errors.nic}
                helperText={errors.nic?.message}
                sx={{ marginLeft: '35px', marginTop: '25px',width: '80%', marginRight: '25px', marginBottom: '100px' }}
              />
            )}
          />
        </div>

        <div>
          <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2} sx={{ marginTop: '-60px', marginBottom: '20px'}}>
              <Button variant="contained" type="submit">
                Continue
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

export default MyForm;
