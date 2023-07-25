import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import SmallText from './SmallText';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Dropzone from './Dropzone';



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
  
  export default function UploadDialog() {

    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" sx={{color:theme.palette.primary[200]}} onClick={handleClickOpen}  startIcon={<AddOutlinedIcon />}>
          Upload Evidence
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            <center><b>Upload Evidence</b></center>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Dropzone />
          </DialogContent>
          <DialogActions>
            <center>
                <SmallText text={"By submitting your videos to CopSco, you acknowledge that you agree to CopSco Terms of Service and Community Guidelines. Please make sure that you do not violate others' copyright or privacy rights. Learn more"} />
            </center>
        </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }

