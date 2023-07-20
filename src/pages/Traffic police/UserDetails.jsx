import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/Traffic police/Header';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CustomizedSteppers from '../../components/Traffic police/Steppers.jsx';
import LicenseCard from '../../components/Traffic police/LicenseCard';
import PersonalDetailsCard from '../../components/Traffic police/PersonalDetailsCard';
import PreviousOffences from '../../components/Traffic police/PreviousOffences';
import Button from '@mui/material/Button';
import "@fontsource/inter";

export default function UserDetails() {

    return (
        <Box>
            <Header />
            <Box>
                <CustomizedSteppers step={1} />
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <Stack direction="row">
                    <Grid container spacing={2} >
                        <LicenseCard/>
                        <PersonalDetailsCard />
                    </Grid>
                    <Grid container>
                        <PreviousOffences />
                    </Grid>
                </Stack>
            </Box>
        </Box>

    );
}