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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModalButton from './ModalButton';
import SmallText from './SmallText';
import { Grid } from '@mui/material';
import violationImage from './violation.jpg'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import useFormContext from '../../../hooks/useFormContext';
import Stack from '@mui/material/Stack';

const vehicalTypes = [
  {
    value: 'motor_car',
    label: 'Motor Car',
  },
  {
    value: 'motor_bicycle',
    label: 'Motor Bicycle',
  },
  {
    value: 'lorry',
    label: 'Lorry',
  },
];

const violationTypes = [
  {
    value: '001',
    label: 'Drunk Driving',
  },
  {
    value: '002',
    label: 'Speeding',
  },
  {
    value: '003',
    label: 'Reckless Driving',
  },
];

const District = [
  {
    value: 'colombo',
    label: 'Colombo',
  },
  {
    value: 'gampaha',
    label: 'Gampaha',
  },
  {
    value: 'kalutara',
    label: 'Kalutara',
  },
];

const City = [
  {
    value: 'bambalapiyita',
    label: 'Bambalapiyiya',
  },
  {
    value: 'wellawatta',
    label: 'Wellawatta',
  },
  {
    value: 'horana',
    label: 'Horana',
  },
];


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

export default function ComplaintDialog() {

  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { page, setPage } =
    useFormContext();
  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);

  return (
    <div>
      <Button variant="outlined" sx={{ color: theme.palette.primary[200] }} onClick={handleClickOpen} startIcon={<AddOutlinedIcon />}>
        Upload Evidence
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <center><b>Edit Details</b></center>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={10} >
            <Grid item xs={6}>
              {/* Form */}
              <form action="" method="post">
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <TextField
                      name="vehical_number"
                      label="Vehical Number:"
                      variant="outlined"
                      fullWidth
                      size='small'
                      type='text'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      fullWidth
                      size='small'
                      helperText="Select vehical type"
                    >
                      {vehicalTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      fullWidth
                      size='small'
                      helperText="Violation Occured"
                    >
                      {violationTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      fullWidth
                      size='small'
                      helperText="Select the district"
                    >
                      {District.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      fullWidth
                      size='small'
                      helperText="Select the city"
                    >
                      {City.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={5}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={6}>
              {/* Preview and note */}
              <Grid item xs={12}>
                <img className='w-90 h-auto' alt='preview_image' src={violationImage} />
              </Grid>
              <Grid item xs={12}>
                <p className='font-semibold mt-4'>Why we collect these information?</p><br />
                <SmallText text="By obtaining supplementary information related to the video evidence, law enforcement can strengthen the evidentiary value of the footage, establish a more accurate account of events, and conduct a thorough and fair investigation."></SmallText>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ModalButton buttonText={"NEXT"} type={"primary"} />
        </DialogActions>
      </BootstrapDialog>

    </div>
  );
}