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
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
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

const RejectionReason = (NIC) => {
  const axiosPrivate = useAxiosPrivate();
  const [selectedColor, setSelectedColor] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (rejectionreason) => {
    const testing = {
      nic: NIC,
      verified: false,
      reason: rejectionreason, 
    };

    console.log(testing.nic.NIC, testing.verified, testing.reason.reason);

    const verifyData = {
      nic: testing.nic.NIC,
      verified: testing.verified,
      reason: testing.reason.reason
    };

    try {
        const response = await axiosPrivate.post("police-division/verifyDocuments", verifyData);
        window.location.reload();
        toast.success("Notification Sent!");
  
      } catch (error) { 
        console.log(error);
      }
  };

  const handleViolationStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColor(selectedValue); 
  };

  return (
    <div style={{ height: '150px', display: 'flex', flexDirection: 'column',}}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>

      <div className="mb-5">
          <Controller className="mt-5"
            name="reason"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rejection reason"
                placeholder=""
                variant="outlined"
                fullWidth
                sx={{ marginLeft: '35px', marginTop: '25px',width: '80%', marginRight: '25px',marginBottom: '30px'}}
              />
            )}
          />
        </div>
        
        <div className="flex justify-center ml-24 mt-10" >
          <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Reject
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

export default RejectionReason;

