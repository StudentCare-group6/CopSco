import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import DetailsList from "../DetailsList";
import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import "@fontsource/inter";

function Status() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CircleIcon sx={{ fontSize: 10 }} className="text-green-500" />
      <Typography component="div" className="text-xl text-green-500">
        Active
      </Typography>
    </Stack>
  );
}

function Demerits() {
  return (
    <Typography variant="h6" component="div" className="text-orange-500">
      8
    </Typography>
  );
}
const LicenseDetails = [
  "Ref No.",
  "Driver License No.",
  "Date of Issue",
  "Time of Issue",
  "Vehicle No.",
  "Fine Amount",
  "Type of Offence",
  "Police Division",
  "Demerit Points",
  "Due Date",
];
const LicenseData = [
    "123456789",
    "123456789",
    "01/01/2021",
    "01/01/2021",
    "123456789",
    "Rs. 500",
    "Speeding",
    "Colombo",
    "8",
    "01/01/2021",

];

export default function FinePrintCard() {
  return (
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
          borderRadius: 4,
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
          <DetailsList detailsArr={LicenseDetails} dataArr={LicenseData} />
          <Button variant="outlined">Back</Button>
        </Stack>
      </Paper>
    </Grid>
  );
}
