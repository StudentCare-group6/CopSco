import * as React from 'react';
import { useState } from 'react'; 
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { Button } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import CustomPaginationActionsTable from './PreviousViolations';

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


const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000000',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#000000',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#000000',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#000000',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const steps = [
  'Violation Details',
  'Previous Records',
  'Report violations',
];

const MyForm  = ({ pausedTime }) => {

function ViolationDetails() {
  const { handleSubmit, control, formState: { errors } } = useForm(); // Added useForm hook setup

  const onSubmit = (data) => {
    console.log("Submitted data:", data);

    const showSuccessToast = () =>
    toast.success('Successfully submitted the violation details!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });

    showSuccessToast();
  };

  const violationTypes = useWatch({ control, name: 'violationTypes', defaultValue: [] });

  return (
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* Vehicle Number */}
        <div>
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
                sx={{ marginLeft: '10%', marginTop: '3%', width: '80%' }}
              />
            )}
          />
        </div>
        <div className='ml-20'>
          <Typography variant="caption">* Change if it is wrong</Typography>
        </div>

    {/* Time stamp */}
    <div className="flex">
      <div className="w-[50%]">
        <Controller

          name="timeStamp"
          control={control}
          defaultValue= {pausedTime}
          rules={{
            required: '*This field is required.',
          }}
          render={({ field }) => (
            <TextField

              {...field}
              label="Time Stamp"
              placeholder="00:00:00"
              variant="outlined"
              fullWidth
              error={!!errors.timeStamp}
              helperText={errors.timeStamp?.message}
              sx={{ marginLeft: '20%', marginTop: '10%', width: '250px' }}
            />
          )}
        />
      </div>
    </div>
    <div className='ml-20'>
      <Typography variant="caption">Click on the scroll bar when you see the violation.</Typography>
    </div>

    {/* Violation Type */}
    <div>
          <div className="w-[80%]">
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
                      style={{ marginLeft: '11%', marginTop: '6%' }}
                    />
                  )}
                />
              )}
            />
          </div>
          <div>
            <Typography style={{ marginLeft: '11%', marginTop: '6%' }} variant = "caption">Selected violation types:</Typography>
            <br />
            {violationTypes.map((item, index) => (
              <span key={index} style={{ marginLeft: '11%', marginTop: '6%', fontSize: '15px', fontWeight: '2rem'}}>
                {item.title}
                {index !== violationTypes.length - 1 && ' '}
                <br />
              </span>
            ))}
          </div>
    </div>
  </form>
  );
}

function PreviousRecords() {
  return(
    <CustomPaginationActionsTable />
  );
}

function ReportViolations() {
  const { handleSubmit, control, formState: { errors } } = useForm(); // Added useForm hook setup

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  const violationTypes = useWatch({ control, name: 'violationTypes', defaultValue: [] });

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
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* Violation Type */}
    
    <div>
      <div className="w-[80%]">
          <Controller
            name="violationStatus"
            control={control}
            defaultValue=""
            rules={{ required: '*This field is required.' }}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined" error={!!errors.violationStatus}>
                <Select
                  labelId="violationStatus-label"
                  label="Mark the violation status"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="border rounded p-2 mt-2 text-left text-md"
                      style={{ marginLeft: '11%', marginTop: '6%' }}
                    />
                  )}
                  sx={{ width: '80%', marginLeft: '13%', marginTop: '6%' }}
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
                        {selected === 'pending' ? <Status text='Pending Review' /> : ''}
                        {selected === 'markAsAViolation' ? <Status text='Marked as a violation' /> : ''}
                        {selected === 'notAViolation' ? <Status text='Not a violation' /> : ''}
                      </span>
                    );
                  }}
                >
                  <MenuItem value="" sx={{ color: 'grey' }}>
                    <em>Mark the violation status</em>
                  </MenuItem>
                  {/* Other options */}
                  <MenuItem value="pending" sx={{ color: 'orange' }}>
                    Pending Review
                  </MenuItem>
                  <MenuItem value="markAsAViolation" sx={{ color: 'red' }}>
                    Marked as a violation
                  </MenuItem>
                  <MenuItem value="notAViolation" sx={{ color: 'green' }}>
                    Not a violation
                  </MenuItem>
                </Select>

                {errors.violationStatus && <FormHelperText sx={{ marginLeft: '15%' }}>{errors.violationStatus.message}</FormHelperText>}
              </FormControl>
            )}
          />
      </div>
    </div>

    <div>
          <Controller
            name="reason"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Mention the reason if rejecting the violation"
                placeholder="Video was not that clear"
                variant="outlined"
                fullWidth
                error={!!errors.reason}
                helperText={errors.reason?.message}
                sx={{ marginLeft: '10%', marginTop: '8%', width: '80%' }}
              />
            )}
          />
    </div>
    <ToastContainer />
  </form>
  );
}

  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const isLastStep = activeStep === steps.length - 1;

  const stepContents = [
    <ViolationDetails />,
    <PreviousRecords />,
    <ReportViolations />,
  ];

  return (
    <Stack sx={{ width: '100%', marginLeft: '3%', marginTop: '10%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {stepContents[activeStep]}

      <div className='ml-20'>
        <Button
          disabled={activeStep === 0}
          onClick={() => handleStepChange(activeStep - 1)}
        >
          Back
        </Button>
        <Button
          disabled={activeStep === steps.length - 1}
          onClick={() => handleStepChange(activeStep + 1)}
        >
          Next
        </Button>

        {isLastStep && (
          <Button type="submit">Finish</Button>
        )}
      </div>
    </Stack>
  );
}

export default MyForm;
