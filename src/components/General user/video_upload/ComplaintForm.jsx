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
import { Grid, TextField, MenuItem } from '@mui/material';
import violationImage from './violation.jpg';
import useFormContext from '../../../hooks/useFormContext';
import Stack from '@mui/material/Stack';
import VideoThumbnail from 'react-video-thumbnail';

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
  {
    value: 'motorcycle',
    label: 'Motorcycle',
  },
  {
    value: 'van',
    label: 'Van',
  },
  // Add more vehicle types here
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
  {
    value: '004',
    label: 'Running Red Light',
  },
  {
    value: '005',
    label: 'Seatbelt Violation',
  },
  // Add more violation types here
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
  {
    value: 'kandy',
    label: 'Kandy',
  },
  {
    value: 'matara',
    label: 'Matara',
  },
  // Add more districts here
];

const City = [
  {
    value: 'bambalapitiya',
    label: 'Bambalapitiya',
  },
  {
    value: 'wellawatta',
    label: 'Wellawatta',
  },
  {
    value: 'horana',
    label: 'Horana',
  },
  {
    value: 'kollupitiya',
    label: 'Kollupitiya',
  },
  {
    value: 'negombo',
    label: 'Negombo',
  },
  // Add more cities here
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

  const { page, setPage, videoUrl, videoDimensions } = useFormContext();
  const handleNext = () => setPage(page + 1);

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ color: theme.palette.primary[200] }}
        onClick={handleClickOpen}
        startIcon={<AddOutlinedIcon />}
      >
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
          <Grid container spacing={5}>
            <Grid item xs={6}>
              {/* Form */}
              <form action="" method="post">
                <Stack spacing={3}>
                  <TextField
                    name="vehical_number"
                    label="Vehicle Number:"
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="text"
                  />
                  <TextField
                    id="outlined-select-vehical-type"
                    select
                    label="Vehicle Type"
                    fullWidth
                    size="small"
                    helperText="Select vehicle type"
                  >
                    {vehicalTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-violation-type"
                    select
                    label="Violation Type"
                    fullWidth
                    size="small"
                    helperText="Violation Occurred"
                  >
                    {violationTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-district"
                    select
                    label="District"
                    fullWidth
                    size="small"
                    helperText="Select the district"
                  >
                    {District.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-select-city"
                    select
                    label="City"
                    fullWidth
                    size="small"
                    helperText="Select the city"
                  >
                    {City.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="outlined-multiline-description"
                    label="Description"
                    multiline
                    rows={5}
                    fullWidth
                  />
                </Stack>
              </form>
            </Grid>
            <Grid item xs={6}>
              {/* Preview and note */}
              <Stack spacing={3}>
                <VideoThumbnail
                  videoUrl={videoUrl}
                  width={videoDimensions.width}
                  height={videoDimensions.height}
                />
                <p className="font-bold mt-4">Why do we collect this information?</p>
                <SmallText text="By obtaining supplementary information related to the video evidence, law enforcement can strengthen the evidentiary value of the footage, establish a more accurate account of events, and conduct a thorough and fair investigation." />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ModalButton buttonText={"NEXT"} type={"primary"} onClick={handleNext} />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
