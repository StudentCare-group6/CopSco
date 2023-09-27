import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useFormContext from '../../../hooks/useFormContext';
import useAuth from '../../../hooks/useAuth';
import Box from '@mui/material/Box';
import axios from "../../../api/posts";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.primary[200],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DeclarationForm() {

    const theme = useTheme();
    const { auth } = useAuth();
    const [open, setOpen] = React.useState(true);
    const { setPage, getValues } = useFormContext();

    const handleNext = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            //handling general data
            formData.append("video", getValues("video"));
            formData.append("username", getValues("username"));
            formData.append("vehicleNum", getValues("vehicleNum"));
            formData.append("type", getValues("type"));
            formData.append("violaton", getValues("violation"));
            formData.append("district", getValues("district"));
            formData.append("city", getValues("city"));
            formData.append("description", getValues("description"));
            formData.append("userID", auth.user_id);
            //handling thumbnail
            const blob = getValues("previewImage");
            const file = new File([blob], "thumbnail.jpg", { type: "image/jpeg" });
            formData.append("previewImage", file);

            const response = await axios.post("upload/upload-video", formData);
            console.log(response);
            setPage(0);
        } catch (err) {
            console.log(err);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" sx={{ color: theme.palette.primary[200] }} onClick={handleClickOpen} startIcon={<AddOutlinedIcon />}>
                Upload Evidence
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <center><b>Declaration Statement</b></center>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ height: '300px', overflow: 'scroll' }}>
                        <p style={{ width: '500px', textAlign: 'justify', textIndent: '20px', whiteSpace: 'pre-wrap', padding: '20px' }}>
                            To Whom It May Concern,

                            I, Oshada Rupesinghe, hereby affirm the veracity of the evidence I am presenting regarding the traffic violation incident involving describe the incident, e.g., "on Aug 12 2023 at Bambalapitiya", as an accurate account of the events that transpired.

                            I recognize the significance of providing accurate and honest information in this matter. I am fully aware of the potential legal and ethical consequences of providing false or misleading evidence. The details, statements, photographs, and any other materials submitted herewith are genuine and portray an exact representation of the incident.

                        </p>
                        <p style={{ width: '500px', textAlign: 'justify', textIndent: '20px', whiteSpace: 'pre-wrap', padding: '20px' }}>
                            I acknowledge that any inconsistencies or inaccuracies discovered in the evidence provided could lead to appropriate actions being taken, which may include penalties, fines, or legal proceedings.

                            By signing this declaration, I affirm that I have not omitted any pertinent information that may influence the accuracy or integrity of the evidence presented. I am committed to offering full cooperation and, if necessary, furnishing supplementary documentation or clarification to support the accuracy of my submission.

                            This declaration is made willingly and without any form of coercion, and I fully comprehend its implications.
                        </p>
                    </Box>

                </DialogContent>
                <Button onClick={handleNext} sx={{ padding: '20px' }}>
                    Accept & Sumbit
                </Button>
            </BootstrapDialog>

        </div>
    );
}