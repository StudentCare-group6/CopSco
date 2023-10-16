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
];

const MyForm  = () => {

function ViolationDetails() {
  const { handleSubmit, control, formState: { errors } } = useForm();

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

  return (
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* Vehicle Number */}
        <div>
          <Controller
            name="violation"
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
  </form>
  );
}

function PreviousRecords() {
  return(
    <CustomPaginationActionsTable/>
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
