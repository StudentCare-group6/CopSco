import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/Traffic police/Header';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CustomizedSteppers from '../../components/Traffic police/Steppers.jsx';
import LicenseCard from '../../components/Traffic police/UserDetails/LicenseCard';
import PersonalDetailsCard from '../../components/Traffic police/UserDetails/PersonalDetailsCard';
import PreviousOffences from '../../components/Traffic police/UserDetails/PreviousOffences';
import "@fontsource/inter";

export default function UserDetails() {

    return (
        <>
            <Box>
                <CustomizedSteppers step={1} />
            </Box>
            <Box sx={{ marginTop: '20px', height:'100%', backgroundColor:'#f3f4f6' }}>
                <Stack direction={{ xs: 'column', md: 'row' , sm:'column' }} spacing = {2}>
                    <Grid container spacing={2} >
                        <LicenseCard />
                        <PersonalDetailsCard />
                    </Grid>
                    <Grid container>
                        <PreviousOffences />
                    </Grid>
                </Stack>
            </Box>
       </>

    );
}