import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormList from './FormList';
import DropDown from './DropDown';
import MultipleDropDown from './MultipleDropDown';
import { useTheme } from '@emotion/react';
import "@fontsource/inter";

const policeDivisions = [
    "Colombo Central Police Division",
    "Colombo North Police Division",
    "Colombo South Police Division",
    "Nugegoda Police Division",
    "Mount Lavinia Police Division",
    "Kelaniya Police Division",
    "Gampaha Police Division",
    "Negombo Police Division",
    "Panadura Police Division",
    "Kalutara Police Division",
    "Kandy Police Division",
    "Gampola Police Division",
    "Theldeniya Police Division",
    "Matale Police Division",
    "Nuwaraeliya Police Division",
    "Hatton Police Division",
];
const policeStations = [
    "Pettah",
    "Keselwatta",
    "Dam Street",
    "Wolfendhal Street",
    "Fort",
    "Slave Island",
    "Maradana",
    "Maligawatta"
];


const LicenseDetails = ['Date', 'Time', 'Police Division', 'Police Station', 'Offence', 'Fine Amount', 'Demerit Points'];
const LicenseData = ['01/01/2021', '12:00 PM', <DropDown valuesArr={policeDivisions} />, <DropDown valuesArr={policeStations} />, <MultipleDropDown valuesArr={policeStations} />, 'Rs. 5000', '8'];

export default function ViolationForm() {
    const theme = useTheme();
    return (

        <Grid item lg={12} align='center'>
            <Paper className='shadow-md' sx={{
                gap: 3, boxShadow: 'none', display: 'flex', width: '50%', flexDirection: 'column', padding: 5, borderRadius: 4, [theme.breakpoints.down('md')]: {
                    width: '100%', // Width for small screens
                },
                [theme.breakpoints.between('md','xl')]: {
                    width: '80%', // Width for small screens
                }
            }}>
                <Typography component="div" className='text-2xl text-center text-slate-950 font-semibold subpixel-antialiased' sx={{ fontFamily: 'inter' }}>
                    Violation Details
                </Typography>
                <Stack direction='column' alignItems="center" spacing={5} justifyContent='space-evenly'>
                    <FormList detailsArr={LicenseDetails} dataArr={LicenseData} />
                </Stack>
            </Paper>
        </Grid>

    );
}

