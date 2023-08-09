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

export default function FineConfirmation() {
  const theme = useTheme();
  const { register, errors, handleSubmit, getValues, setValue } = useFormContext();
  const data = getValues('date');
  const LicenseDetails = [
    "Ref No.",
    "Driver License No.",
    "Date of Issue",
    "Time of Issue",
    "Vehicle No.",
    "Fine Amount",
    "Type of Offence(s)",
    "Police Division",
    "Demerit Points",
    "Due Date",
  ];
  const LicenseData = [
      "123456789",
      "123456789",
      getValues('date'),
      getValues('time'),
      getValues('vehicleNo'),
      "Rs. 500",
      getValues('offences')[0],
      getValues('offences')[1],
      getValues('offences')[2],
      "Colombo",
      "8",
      "01/01/2021",
  
  ];
  console.log(data);
  return (
    <>
      <Box>
        <CustomizedSteppers step={3} />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Stack direction="row" justifyContent='center' >
          <Grid container sx={{ width: '50%', [theme.breakpoints.down('sm')]: { width: '100%' } }}>
            <Grid item lg={12} align="center" sx={{ width: '100%' }}>
              <Paper
                className="shadow-md"
                sx={{
                  gap: 3,
                  boxShadow: "none",
                  display: "flex",
                  width: "75%",
                  flexDirection: "column",
                  padding: 5,
                  borderRadius: 4,
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
                  <FormList detailsArr={LicenseDetails} dataArr={LicenseData} />

                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}
