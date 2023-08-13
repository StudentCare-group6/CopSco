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

const MyForm = () => {
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
  const phoneNumber = /^[0-9]{10}$/;
  const email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5">
        <Controller
          name="PoliceOfficerName"
          control={control}
          defaultValue=""
          rules={{
            required: '*This field is required.',
            pattern: {
              value: namePattern,
              message: '* Name can not contain numbers or special characters.',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Police Officer Name"
              className="border rounded w-[400px] p-2 ml-[15%] text-left text-md mt-[-750px]"
            />
          )}
        />
        {errors.PoliceOfficerName && <span className="text-red-500 text-sm ml-28">{errors.PoliceOfficerName.message}</span>}
        </div>

        <div>
            <Controller
            name="policeNumber"
            control={control}
            defaultValue=""
            rules={{
                required: '*This field is required.',
                pattern: {
                value: policeNumber,
                message: '* Invalid email.',
                },
            }}
            render={({ field }) => (
                <input
                {...field}
                placeholder="Police Number"
                className="border rounded w-[400px] p-2 ml-[15%] text-left text-md mt-2"
                />
            )}
            />
            {errors.policeNumber && <span className="text-red-500 text-sm ml-28">{errors.policeNumber.message}</span>}
        </div>
        


        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: '*This field is required.',
            pattern: {
            value: email,
            message: '* Number can not contain any letters.',
            },
        }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Email"
              className="border rounded w-[400px] p-2 ml-[15%] text-left text-md mt-2"
            />
          )}
        />
        {errors.email && <span className="text-red-500 text-sm ml-28">{errors.email.message}</span>}

        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{
            required: '*This field is required.',
            pattern: {
            value: phoneNumber,
            message: '* Invalid phone number.',
            },
        }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Phone Number"
              className="border rounded w-[400px] p-2 ml-[15%] text-left text-md mt-2"
            />
          )}
        />
        {errors.phoneNumber && <span className="text-red-500 text-sm ml-28">{errors.phoneNumber.message}</span>}


    <div className="flex justify-center ml-24 mt-10">
      <ThemeProvider theme={theme}>
        <Stack direction="row" spacing={2}>
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
