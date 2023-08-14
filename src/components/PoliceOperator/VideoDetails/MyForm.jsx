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

const violations = [
  { title: 'Drunk Driving', points: 5 },
  { title: 'Improper Turn', points: 2 },
  { title: 'Driving', points: 3 },
  { title: 'Speed Driving', points: 3 },
];

const vehicleNumberPattern = /^[A-Z]{2,3}\s\d{4}$/;

const MyForm = () => {
  const [selectedColor, setSelectedColor] = useState(""); // State to hold the selected color

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
    
  };
  

  const handleViolationStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedColor(selectedValue); // Set the selected color
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <Controller
      name="violationStatus"
      control={control}
      defaultValue=""
      rules={{
        required: '*This field is required.',
      }}
      render={({ field }) => (
        <div className="flex items-center">
          
          <select
            {...field}
            name="violationStatus"
            value={field.value} 
            rules={{
              required: '*This field is required.',
            }}
            onChange={(e) => field.onChange(e.target.value)} 
            className="border rounded w-[550px] p-4 ml-28 mt-14 text-center text-lg "
          >
            <option value="">Mark the violation status</option>
            <option value="pending">Pending</option>
            <option value="markAsAViolation">Marked as a violation</option>
            <option value="notAViolation">Not a violation</option>
          </select>
          <div
            className={`w-6 h-6 mt-12 ml-4 rounded-full ${
              field.value === "pending"
                ? "bg-green-500"
                : field.value === "markAsAViolation"
                ? "bg-red-500"
                : field.value === "notAViolation"
                ? "bg-yellow-500"
                : ""
            }`}
          />
          {errors.violationStatus && <span className="text-red-500 text-sm mt-10">{errors.violationStatus.message}</span>}

        </div>
        
      )}
    />

      </div>

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
            <input
              {...field}
              placeholder="ABC 1234"
              className="border rounded w-[600px] p-2 ml-[15%] text-left text-md mt-[-750px]"
            />
          )}
        />
        {errors.vehicleNumber && <span className="text-red-500 text-sm ml-28">{errors.vehicleNumber.message}</span>}
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
          Selected violation types: <br />{violationTypes.map((item) => item.title).join(" , ")}
        </div>
      </div>

      <div>
        <div className="w-[80%] ml-28 mt-5 mb-5">
          <Divider textAlign="center">Vehicle Owner Details</Divider>
        </div>
        
        <Controller
          name="vehicleOwnerDetails"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              placeholder="Vehicle owner name"
              className="border rounded w-[600px] p-2 ml-[15%] text-left text-md mt-[-750px]"
            />
          )}
        />
        <Controller
          name="vehicleOwnerContact"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              placeholder="Contact number"
              className="border rounded w-[600px] p-2 ml-[15%] text-left text-md mt-2"
            />
          )}
        />
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
