import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CustomizedSteppers from "../../components/Traffic police/Steppers.jsx";
import FinePrintCard from "../../components/Traffic police/FineConfirmation/FinePrintCard";
import "@fontsource/inter";
import { useTheme } from "@emotion/react";
import useFormContext from '../../hooks/useFormContext';
import FormList from "../../components/Traffic police/FineConfirmation/FormList";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate} from 'react-router-dom';

function Text(props) {
  return (
    <Typography component="div" className='text-md font-bold'>
      {props.text}
    </Typography>
  );
}

export default function FineConfirmation() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { register, errors, handleSubmit, getValues, setValue } = useFormContext();
  const FineDetails = [
    "Driver License",
    "Date of Issue",
    "Time of Issue",
    "Vehicle No.",
    "Police Division",
    "Police Station",
  ];
  const FineData = [

    getValues('date'),
    getValues('time'),
    getValues('vehicleNo'),
    getValues('divisionTitle'),
    getValues('station'),
  ];

  //implement go back function
  const handleBack = () => {
    navigate('/traffic-police/issue-fine');
  };

  const violations = getValues('offences');
  const violationPrices = getValues('prices');
  const demeritPoints = getValues('demeritPoints');
  //get sum of violation prices
  const totalPrice = violationPrices.reduce((a, b) => a + b, 0);
  const totalDemeritPoints = demeritPoints.reduce((a, b) => a + b, 0);
  setValue('totalPrice', totalPrice);
  setValue('totalDemeritPoints', totalDemeritPoints);
  const ViolationDetails = [<Text text='Type of Offence(s):' />];
  const ViolationData = [''];
  violations.forEach(element => {
    ViolationDetails.push(element);
    ViolationData.push('Rs. ' + violationPrices[violations.indexOf(element)]);
  });
  ViolationDetails.push(<Text text='Total Fine Amount:' />);
  ViolationData.push('Rs. ' + totalPrice);
  ViolationDetails.push(<Text text='Total Demerit Points:' />);
  ViolationData.push(totalDemeritPoints);

  const onSubmit = async e => {
    const data = getValues();
    console.log(data);
};

  return (
    <>
      <Box>
        <CustomizedSteppers step={3} />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Stack direction="row" justifyContent='center' alignItems='center' >
          <Grid container component='form' justifyContent = 'center' onSubmit={handleSubmit(onSubmit)} gap={2} sx={{ width: '50%', [theme.breakpoints.down('sm')]: { width: '100%' } }}>
            <Grid item lg={12} align="center">
              <Paper
                className="shadow-md"
                sx={{
                  gap: 3,
                  boxShadow: "none",
                  display: "flex",
                  width: "75%",
                  flexDirection: "column",
                  padding: 5,
                  [theme.breakpoints.down('sm')]: { width: '100%' }
                }}
              >
                <Typography
                  component="div"
                  className="text-2xl text-center text-slate-950 font-semibold subpixel-antialiased"
                  sx={{ fontFamily: "inter" }}
                >
                  Fine Details
                </Typography>
                <Stack direction="column" alignItems="center" justifyContent="center">
                  <FormList detailsArr={FineDetails} dataArr={FineData} />
                </Stack>
              </Paper>
            </Grid>
            <Grid item lg={12} align="center">
              <Paper
                className="shadow-md"
                sx={{
                  gap: 3,
                  boxShadow: "none",
                  display: "flex",
                  width: "75%",
                  flexDirection: "column",
                  padding: 5,
                  [theme.breakpoints.down('sm')]: { width: '100%' }
                }}
              >
                <Typography
                  component="div"
                  className="text-2xl text-center text-slate-950 font-semibold subpixel-antialiased"
                  sx={{ fontFamily: "inter" }}
                >
                  Violation Details
                </Typography>
                <Stack direction="column" alignItems="center" justifyContent="center">
                  <FormList detailsArr={ViolationDetails} dataArr={ViolationData} />
                </Stack>
                <Stack direction='row' gap={2} className = 'mx-10' justifyContent='space-evenly'>
                  <Button
                    onClick={handleBack}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '150px' }}

                  >
                    Back
                  </Button>

                  <Button
                    type = 'submit'
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '150px' }}

                  >
                    Issue fine
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}
