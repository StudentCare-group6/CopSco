import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {MapPinIcon, CalendarDaysIcon, ClockIcon, QuestionMarkCircleIcon, DocumentTextIcon, ChartBarIcon} from '@heroicons/react/24/outline';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'black',
          color: 'white',
          fontSize: '0.75rem',
          padding: '5px 75px',
          '&:hover': {
            background: 'black', // Set the same background color as the contained state
          },
        },
        outlined: {
          borderColor: 'black', // Set the border color for the outlined variant
          color: 'black', // Set the text color for the outlined variant
          fontSize: '0.75rem',
          padding: '5px 50px',
          '&:hover': {
            background: 'white', // Set the background color on hover for the outlined variant
            color: 'black', // Set the text color on hover for the outlined variant
          },
        },
      },
    },
  },
});

function Filters() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={3} direction="row" className="custom-margin-left mb-4">
        <Button variant="outlined" className="flex items-center">
          <ChartBarIcon className="w-6 h-6 text-black mr-2 flex-shrink-0" /> Card
        </Button>

        <Button variant="contained" className="flex items-center">
          <MapPinIcon className="w-6 h-6 text-white mr-2 flex-shrink-0" /> Location
        </Button>
        <Button variant="contained" className="flex items-center">
          <CalendarDaysIcon className="w-6 h-6 text-white mr-2 flex-shrink-0" /> Date
        </Button>
        <Button variant="contained" className="flex items-center">
          <ClockIcon className="w-6 h-6 text-white mr-2 flex-shrink-0" /> Time
        </Button>
        <Button variant="contained" className="flex items-center">
          <QuestionMarkCircleIcon className="w-6 h-6 text-white mr-2 flex-shrink-0" /> Severity
        </Button>
        <Button variant="contained" className="flex items-center">
          <DocumentTextIcon className="w-6 h-6 text-white mr-2 flex-shrink-0" /> Status
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

export default Filters;
