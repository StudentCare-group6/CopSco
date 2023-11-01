import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FineCard from './VideoCard2';
import useFineContext from '../../../hooks/useFineContext';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import RateReviewIcon from '@mui/icons-material/RateReview';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SmallText from './SmallText';
import useFormContext from '../../../hooks/useFormContext';
import { Alert } from '@mui/material';
import DialogBox from './AppealConfirmDialog';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '15px',
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 5,
};

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    }
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    }
});

const appealTypes = [
    {
        value: 'The evidence is fake or tampered with',
    },
    {
        value: 'I was not the driver of the vehicle',
    },
    {
        value: 'The vehicle was stolen',
    },
    {
        value: 'I was the previous owner of the vehicle',
    },
    {
        value: "There doesn't seem to be a violation ",
    },
    {
        value: 'I was already fined for this violation',
    }
    ,
    {
        value: 'Other',
    },
    // Add more violation types here
];

export default function NestedModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <div className="relative flex justify-center items-center overflow-hidden bg-cover bg-no-repeat" style={{ width: '100%', height: 'auto' }} onClick={handleOpen}>
                    <img
                        src={`http://localhost:8000/images/previews/${props.thumbnail}`}
                        className="transition duration-300 ease-in-out hover:scale-110"
                        alt="video-thumbnail" />
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: '25%' }}>
                        <FineCard data={props.items} caseId = {props.caseId}/>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}