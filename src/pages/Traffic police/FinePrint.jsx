import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Traffic police/Header";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CustomizedSteppers from "../../components/Traffic police/Steppers.jsx";
import FinePrintCard from "../../components/Traffic police/FinePrint/FinePrintCard";
import "@fontsource/inter";

export default function UserDetails() {
  return (
    <Box>
      <Header />
      <Box>
        <CustomizedSteppers step={3} />
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Stack direction="row" justifyContent='center'>
          <Grid container sx = {{width:'50%'}}>
            <FinePrintCard/>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
