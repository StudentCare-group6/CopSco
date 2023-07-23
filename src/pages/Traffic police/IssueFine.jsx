import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/Traffic police/Header';
import Stack from '@mui/material/Stack';
import CustomizedSteppers from '../../components/Traffic police/Steppers.jsx';
import ViolationForm from '../../components/Traffic police/IssueFine/ViolationForm';
import "@fontsource/inter";

export default function IssueFine() {

    return (
        <>
            <Box>
                <CustomizedSteppers step={2} />
            </Box>
            <Box sx={{ marginTop: '3%' }} x>
                <Stack direction="column" justifyContent='center' sx={{ width: '100%' }}>
                    <ViolationForm />
                </Stack>
            </Box>
        </>

    );
}