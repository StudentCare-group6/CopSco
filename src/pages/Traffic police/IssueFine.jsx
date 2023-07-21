import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/Traffic police/Header';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CustomizedSteppers from '../../components/Traffic police/Steppers.jsx';
import ViolationForm from '../../components/Traffic police/ViolationForm';
import PersonalDetailsCard from '../../components/Traffic police/PersonalDetailsCard';
import PreviousOffences from '../../components/Traffic police/PreviousOffences';
import Button from '@mui/material/Button';
import "@fontsource/inter";

export default function IssueFine() {

    return (
        <Box>
            <Header />
            <Box>
                <CustomizedSteppers step={2} />
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <Stack direction="column" justifyContent='center' sx = {{width:'100%'}}>
                        <ViolationForm/>
                </Stack>
            </Box>
        </Box>

    );
}