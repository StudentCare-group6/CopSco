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
const violations = [
  { title: 'Drunk Driving', points: 5 },
  { title: 'Improper Turn', points: 2 },
  { title: 'Driving without a License', points: 4 },
  { title: 'Speeding in a School Zone', points: 4 },
  { title: 'Running a Red Light', points: 3 },
  { title: 'Reckless Driving', points: 4 },
  { title: 'Texting While Driving', points: 3 },
  { title: 'Failure to Yield', points: 3 },
  { title: 'Hit and Run', points: 5 },
  { title: 'Driving with Expired Registration', points: 2 },
  { title: 'Driving in a Bus Lane', points: 2 },
  { title: 'Street Racing', points: 5 },
  { title: 'Driving without Insurance', points: 3 },
];

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
    //timeout to show toast
    setTimeout(() => {
      navigate('/police-operator/');
    }, 2000);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[80%] ml-28 mt-5 mb-5">
          <Divider textAlign="center">Mark violation status</Divider>
        </div>
        <Controller
          name="violationStatus"
          control={control}
          defaultValue=""
          rules={{ required: '*This field is required.' }}
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" error={!!errors.violationStatus} >
              <InputLabel sx={{ marginLeft: '15%' }} id="violationStatus-label">Mark the violation status</InputLabel>
              <Select
                labelId="violationStatus-label"
                label="Mark the violation status"
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                sx={{ width: '80%', marginLeft: '15%' }}
                renderValue={(selected) => {
                  let color = '';
                  if (selected === 'pending') {
                    color = 'orange';
                  } else if (selected === 'markAsAViolation') {
                    color = 'red';
                  } else if (selected === 'notAViolation') {
                    color = 'green';
                  }
                  return (
                    <span style={{ color }}>
                      {selected === '' ? <Status text='Mark the violation status' /> : ''}
                      {selected === 'pending' ? <Status text='Pending Review' /> : ''}
                      {selected === 'markAsAViolation' ? <Status text='Marked as a violation' /> : ''}
                      {selected === 'notAViolation' ? <Status text='Not a violation' /> : ''}
                    </span>
                  );
                }}
              >
                <MenuItem value="" sx={{ color: 'grey' }} ><Status text='Mark the violation status' /></MenuItem>
                <MenuItem value="pending" sx={{ color: 'orange' }}><Status text='Pending Review' /></MenuItem>
                <MenuItem value="markAsAViolation" sx={{ color: 'red' }}><Status text='Marked as a violation' /></MenuItem>
                <MenuItem value="notAViolation" sx={{ color: 'green' }} ><Status text='Not a violation' /></MenuItem>
              </Select>

              {errors.violationStatus && <FormHelperText sx={{ marginLeft: '15%' }}>{errors.violationStatus.message}</FormHelperText>}
            </FormControl>
          )}
        />

        <div>
          <div className="w-[80%] ml-28 mt-5 mb-5">
            <Divider textAlign="center">Vehicle number</Divider>
          </div>
          <Controller
            name="vehicleNumber"
            control={control}
            defaultValue=""
            rules={{
              required: '*This field is required.',
              pattern: {
                value: vehicleNumberPattern,
                message: '*Invalid vehicle number. Format should be ABC 1234 or AB 4578.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Vehicle Number"
                placeholder="ABC 1234"
                variant="outlined"
                fullWidth
                error={!!errors.vehicleNumber}
                helperText={errors.vehicleNumber?.message}
                sx={{ marginLeft: '15%', width: '80%' }}
              />
            )}
          />
        </div>
        <div>
          <div className="w-[80%] ml-28 mt-5 mb-[-10px]">
            <Divider textAlign="center">Violation Types</Divider>
          </div>

          <div className="w-[80%] ml-6 mt-4">
            <Controller
              name="violationTypes"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={violations}
                  getOptionLabel={(option) => option.title}
                  value={field.value}
                  onChange={(event, newValue) => field.onChange(newValue)}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) => option.title === value.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Add violations"
                      className="border rounded p-2 mt-2 text-left text-md"
                      style={{ marginLeft: '15%', marginTop: '2px' }}
                    />
                  )}
                />
              )}
            />
          </div>
          <div className="ml-28">
            <Typography variant = 'h6'>Selected violation types:</Typography>
            <br />
            {violationTypes.map((item, index) => (
              <span key={index} className = 'mx-10 font-bold mt-5'>
                {item.title}
                {index !== violationTypes.length - 1 && ' '}
                <br />
              </span>
            ))}
          </div>
        </div>

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
