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
import SmallText from './SmallText';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import useFormContext from '../../../hooks/useFormContext';
import Stack from '@mui/material/Stack';
import VideoThumbnail from 'react-video-thumbnail';
import Alert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';

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

const Province = [
  {
    value: 'western',
    label: 'Western',
  },
  {
    value: 'southern',
    label: 'Southern',
  },
  {
    value: 'central',
    label: 'Central',
  },
  {
    value: 'north_central',
    label: 'North Central',
  },
  {
    value: 'north_western',
    label: 'North Western',
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

  const { page, getValues, setValue, setPage, videoUrl, trimmedVideo, register, errors, videoThumbnail, setVideoThumbnail } = useFormContext();
  const { auth } = useAuth();
  const handleNext = () => setPage(page + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue('video', trimmedVideo);
    setValue('user', auth.user);
    setValue('previewImage', videoThumbnail);
    console.log(getValues());
    handleNext();
  };
  const thumbnailHandler = (thumbnailUrl) => {
    // Convert the thumbnail URL to a Blob
    fetch(thumbnailUrl)
      .then(response => response.blob())
      .then(thumbnailBlob => {
        setVideoThumbnail(thumbnailBlob);
      })
      .catch(error => {
        console.error('Error fetching or converting thumbnail:', error);
      });
  };
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
          <Grid container spacing={5} alignItems='center'>
            <Grid item xs={6}>
              {/* Form */}
              <Grid component="form" container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="vehical_number"
                    label="Vehicle Number:"
                    variant="outlined"
                    fullWidth
                    type="text"
                    size="small"
                    helperText="Enter vehicle number"
                    {...register("vehicleNum")}
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    id="outlined-select-vehical-type"
                    select
                    label="Vehicle Type"
                    fullWidth
                    helperText="Select vehicle type"
                    size="small"
                    {...register("type", {
                      required: "field required",
                    })}
                  >
                    {vehicalTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  {errors.vehicleNum?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.vehicleNum?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={6}>
                  {errors.type?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.type?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-select-violation-type"
                    select
                    label="Violation Type"
                    fullWidth
                    helperText="Violation Occurred"
                    size="small"
                    {...register("violation", {
                      required: "field required",
                    })}
                  >
                    {violationTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  {errors.violation?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.violation?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-select-district"
                    select
                    label="Province"
                    fullWidth
                    size="small"
                    helperText="Select the province"
                    {...register("province", {
                      required: "field required",
                    })}
                  >
                    {Province.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-select-district"
                    select
                    label="District"
                    fullWidth
                    size="small"
                    helperText="Select the district"
                    {...register("district", {
                      required: "field required",
                    })}
                  >
                    {District.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-select-city"
                    select
                    label="City"
                    fullWidth
                    size="small"
                    helperText="Select the city"
                    {...register("city", {
                      required: "field required",
                    })}
                  >
                    {City.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  {errors.province?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.province?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4}>
                  {errors.district?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.district?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={4}>
                  {errors.city?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.city?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    id="outlined-multiline-description"
                    label="Description"
                    multiline
                    rows={5}
                    fullWidth
                    helperText="Enter a description about the incident"
                    {...register("description", {
                      required: "field required",
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  {errors.description?.message ? (
                    <Alert sx={{ mt: "10px" }} severity="error">
                      {errors.description?.message}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} padding={5}>
              {/* Preview and note */}
              <Stack spacing={5}>
                <Stack alignItems='center' justifyContent='center' width='100%' sx={{ backgroundColor: '#D9D9D9' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '70%',
                      height: 'auto',
                    }}
                  >
                    <VideoThumbnail videoUrl={videoUrl} thumbnailHandler={thumbnailHandler} />
                  </div>

                </Stack>
                <Stack gap={1}>
                  <Typography variant='subtitle2' sx={{ fontWeight: '600' }} color='#5A5A5A'>Why do we collect this information?</Typography>
                  <SmallText text="By obtaining supplementary information related to the video evidence, law enforcement can strengthen the evidentiary value of the footage, establish a more accurate account of events, and conduct a thorough and fair investigation." />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} >
            NEXT
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
