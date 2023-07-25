import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CustomizedSteppers from "../../components/Traffic police/Steppers.jsx";
import FinePrintCard from "../../components/Traffic police/FineConfirmation/FinePrintCard";
import "@fontsource/inter";
import { useTheme } from "@emotion/react";

export default function FineConfirmation() {
  const theme = useTheme();
  return (
    <>
      <Box>
        <CustomizedSteppers step={3} />
      </Box>
      <Box sx={{ marginTop: "20px"}}>
        <Stack direction="row" justifyContent='center' >
          <Grid container sx = {{width:'50%',[theme.breakpoints.down('sm')]: {width: '100%' }}}>
            <FinePrintCard/>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}
