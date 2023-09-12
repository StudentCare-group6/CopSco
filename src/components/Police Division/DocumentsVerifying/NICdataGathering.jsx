import React, { useState } from "react";
import { useForm, Controller, useWatch } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Updated import
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';


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

const vehicleNumberPattern = /^[A-Z]{2,3}\s\d{4}$/;

const MyForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const violationTypes = useWatch({ control, name: 'violationTypes', defaultValue: [] });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    console.log("Selected violation types:", data.violationTypes);
    toast.success("Sent to relevant division!");

    setTimeout(() => {
      navigate('/police-operator/');
    }, 2000);
  };

  const [isRejected, setIsRejected] = useState(false); 
  const [rejectionReason, setRejectionReason] = useState("");

  const handleReject = () => {
    setIsRejected(true);
  };

  function Status(props) {
    return (
      <Stack direction='row' alignItems='center' spacing={1}>
        <CircleIcon sx={{ fontSize: 8 }} />
        <Typography component="div">
          {props.text}
        </Typography>
      </Stack>

    );
  }

  return (
    <div>
    
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="mt-[-100px]">
          <Controller
            name="NICnumber"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: vehicleNumberPattern,
                message: '*Invalid NIC number.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="NIC number"
                placeholder="200079300637"
                variant="outlined"
                fullWidth
                error={!!errors.vehicleNumber}
                helperText={errors.vehicleNumber?.message}
                sx={{ marginLeft: '32%', width: '40%', marginTop: '-28px' }}
              />
            )}
          />
        </div>

        <div className="mt-[15px]">
          <Controller
            name="Address"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: vehicleNumberPattern,
                message: '*Invalid address.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                placeholder="No. 123, Galle Road, Colombo 03"
                variant="outlined"
                fullWidth
                error={!!errors.vehicleNumber}
                helperText={errors.vehicleNumber?.message}
                sx={{ marginLeft: '32%', width: '40%', marginTop: '1px' }}
              />
            )}
          />
        </div>

        <div className="mt-[15px]">
          <Controller
            name="Birth Date"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: vehicleNumberPattern,
                message: '* Invalid Birthdate.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Birth Date"
                placeholder="19/10/2000"
                variant="outlined"
                fullWidth
                error={!!errors.vehicleNumber}
                helperText={errors.vehicleNumber?.message}
                sx={{ marginLeft: '32%', width: '40%', marginTop: '1px' }}
              />
            )}
          />
        </div>

        <div className="flex justify-center ml-24 mt-10">
          <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Verify
              </Button>
              <Button variant="outlined" onClick={handleReject}>
                Reject
              </Button>
            </Stack>
          </ThemeProvider>
        </div>

        {isRejected && ( 
          <div className="ml-24 mt-4">
            <TextField
              label="Rejection Reason"
              placeholder="Enter reason for rejection"
              variant="outlined"
              fullWidth
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              sx={{ marginLeft: '24%', width: '50%', height: '250px' }}
            />
        </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}

export default MyForm;
