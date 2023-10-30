import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuItem } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";
import CustomPaginationActionsTable from "./PreviousViolations";
import image from "../../../images/copyright.png";
import useFormContext from "../../../hooks/useFormContext";
import Alert from "@mui/material/Alert";
import { policeDivisions, offences, demeritPoints } from "../../../data/Constants";
import useVideoContext from "../../../hooks/useVideoContext";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import VideoThumbnail from 'react-video-thumbnail';
import ThumbnailModal from "./ThumbnailModal";
import axios from "../../../api/posts";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#000000",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#000000",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#000000",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#000000",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const steps = ["Violation Details", "Previous Records", "Report violations"];


const MyForm = ({ pausedTime, videoUrl }) => {

  const { selectedVideo, setSelectedVideo, thumbnail } = useVideoContext();
  const { register, errors, handleSubmit, getValues, setValue } = useFormContext();
  var video = selectedVideo;
  if (video === null || video === undefined) {
    video = JSON.parse(localStorage.getItem('selectedVideo'));
    setSelectedVideo(video);
  }
  const showSuccessToast = () =>
    toast.success("Successfully submitted the violation details!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
    });
  const onSubmit = async (e) => {
    try {
      let formData = new FormData();
      formData.append("caseID", video.caseID);
      formData.append("offences", getValues("offences"));
      formData.append("divisionCode", getValues("divisionCode"));
      formData.append("violationStatus", getValues("violationStatus"));
      formData.append("remarks", getValues("remarks"));
      formData.append("deliveryTag", video.deleveryTag);
      const blob = getValues("thumbnail");
      const file = new File([blob], video.caseID, { type: "image/jpeg" });
      formData.append("priviewImage", file);
      formData.forEach(function (value, key) {
        console.log(key, value);
      });
      // const response = await axios.post("violations/getPastViolations/verifyUploads", formData);
      // console.log(response);
      // showSuccessToast();
    } catch (err) {
      console.log(err);
    }
  };
  // caseID , offences , divisionCode , violationStatus , remarks
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const isLastStep = activeStep === steps.length - 1;

  const stepContents = [
    <ViolationDetails />,
    <PreviousRecords />,
    <ReportViolations />,
  ];

  function ViolationDetails() {
    // Split the time string into hours and minutes
    var timeString;
    if (pausedTime === null || pausedTime === undefined) {
      timeString = "00:00"
    } else {
      timeString = pausedTime;
    }
    // Split the time string into minutes and seconds
    const [minutes, seconds] = timeString.split(':').map(Number);
    // Calculate the total number of seconds
    const totalSeconds = minutes * 60 + seconds;

    const [selectedOffences, setSelectedOffences] = useState([]); // State to hold selected offences
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedDemerit, setSelectedDemerit] = useState([]); // State to hold selected offences
    const thumbnailHandler = (image) => {
      // Convert the thumbnail URL to a Blob
      fetch(image)
        .then(response => response.blob())
        .then(thumbnailBlob => {
          setValue('thumbnail', thumbnailBlob);
          console.log(getValues('thumbnail'));
        })
        .catch(error => {
          console.error('Error fetching or converting thumbnail:', error);
        });
    };
    const handleOffencesChange = (event) => {
      const selectedValues = event.target.value;
      setSelectedOffences(selectedValues);

      const selectedPrices = selectedValues.map((offence) =>
        offences.get(offence)
      );
      setSelectedPrices(selectedPrices);

      const selectedDemerit = selectedValues.map((offence) =>
        demeritPoints.get(offence)
      );
      setSelectedDemerit(selectedDemerit);
      localStorage.setItem("selectedOffences", JSON.stringify(selectedValues));
    };
    useEffect(() => {
      const localStorageSelectedValues = localStorage.getItem("selectedOffences");

      if (localStorageSelectedValues) {
        // Parse the stored values (assuming it's stored as JSON)
        const parsedValues = JSON.parse(localStorageSelectedValues);

        // Update the selected offences state with the parsed values
        setSelectedOffences(parsedValues);
      }
    }, []);

    return (
      <>
        <div>
          <TextField
            label="Vehicle Number"
            defaultValue={video.vehicleNo}
            variant="outlined"
            sx={{ marginLeft: "10%", marginTop: "3%", width: "80%" }}
            {...register("vehicleNo", {
              required: "field required",
              pattern: {
                value: /^[A-Za-z]+-\d+$/i,
                message:
                  "Invalid vehicle Number, it should be of the form KN-3846",
              },
            })}
          />
          {errors.vehicleNo?.message ? (
            <Alert sx={{ marginLeft: "10%", marginTop: "3%", width: "80%" }} severity="error">
              {errors.vehicleNo?.message}
            </Alert>
          ) : (
            ""
          )}
        </div>
        <div className="ml-20">
          <Typography variant="caption">* Change if it is wrong</Typography>
        </div>

        {/* Time stamp */}
        <Stack direction='row' spacing={2}>
          <TextField
            label="Time Stamp"
            value={pausedTime}
            variant="outlined"
            fullWidth
            sx={{ marginLeft: "10%", marginTop: "3%", width: "50%" }}
            {...register("timeStamp", {
              required: "Please select a timeStamp"
            })}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '25%',
              height: 'auto',
              marginTop: '3%',
            }}
          >
            <ThumbnailModal videoUrl={videoUrl} totalSeconds={totalSeconds} />
          </div>
          <div style={{ display: 'none' }}>
            <VideoThumbnail videoUrl={videoUrl} thumbnailHandler={thumbnailHandler} snapshotAtTime={totalSeconds} renderThumbnail={false} />
          </div>
        </Stack>
        <div className="ml-20">
          <Typography variant="caption">
            *Pause the video at the position of the violation
          </Typography>
        </div>
        {/* Violation Type */}
        <div>
          <TextField
            id="offences"
            label="Violation(s)"
            sx={{ marginLeft: "10%", marginTop: "3%", width: "60%" }}
            select
            SelectProps={{
              multiple: true,
              value: selectedOffences,
              onChange: handleOffencesChange,
            }}
            {...register("offences")}
          >
            <MenuItem value='none'>
              <em>None</em>
            </MenuItem>
            {Array.from(offences.keys()).map((offence) => (
              <MenuItem key={offence} value={offence}>
                {offence}
              </MenuItem>
            ))}
          </TextField>
          {/* Display selected offences and their corresponding prices */}

          <Stack alignItems="flex-start" sx={{ marginLeft: "10%", marginTop: "3%", width: "80%", height: "100px", overflowX: 'hidden', overflowY: 'scroll', backgroundColor: 'white', padding: '10px' }}>
            <Typography
              variant="body1"
              color="initial"
              className="font-bold"
            >
              Selected offences and fine amounts:{" "}
            </Typography>
            <ul>
              {selectedOffences.map((offence, index) => (
                <li key={offence} align="left" className="mt-5 text-sm">
                  {offence}: {selectedPrices[index]}
                </li>
              ))}
            </ul>
          </Stack>
        </div>
      </>
    );
  }

  function PreviousRecords() {
    return (
      <Stack spacing={2}>
        <Typography variant="body1" align="center" className="font-light text-neutral-500">
          *Check for previous records
        </Typography>
        <CustomPaginationActionsTable />
      </Stack>
    );
  }

  function ReportViolations() {
    const [selectedDivision, setSelectedDivision] = useState([]);
    const [selectedDivisionCode, setSelectedDivisionCode] = useState(""); // State to hold selected offences
    const handleDivisionChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedDivision(selectedValue);

      const selectedDivisionCode = policeDivisions.get(selectedValue);
      setSelectedDivisionCode(selectedDivisionCode);
      setValue('divisionCode', selectedDivisionCode);
    };
    function Status(props) {

      if (props.text === 'Mark as a violation') {
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircleIcon sx={{ fontSize: 8 }} className='text-red-500' /> {/* Set the color dynamically */}
            <Typography component="div" className='text-red-500' variant='subtitle1' >{props.text}</Typography>
          </Stack>
        );
      } else if (props.text === 'Not a violation') {
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircleIcon sx={{ fontSize: 8 }} className='text-green-500' /> {/* Set the color dynamically */}
            <Typography component="div" className='text-green-500' variant='subtitle1'>{props.text}</Typography>
          </Stack>
        );
      } else {
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircleIcon sx={{ fontSize: 8 }} className='text-gray-500' /> {/* Set the color dynamically */}
            <Typography component="div" className='text-gray-500' variant='subtitle1'>{props.text}</Typography>
          </Stack>
        );
      }
    }

    return (
      <>
        <Stack width='100%' height="100%" justifyContent='center' alignItems='center' >
          <Typography variant="body1" align="center" className="font-light text-neutral-500">
            *Enter division according to the violation location
          </Typography>
          <TextField
            id="division"
            margin="normal"
            label="Division"
            select
            sx={{ marginTop: "3%", width: "80%" }}
            SelectProps={{
              sx: {
                height: "50px",
              },
              value: selectedDivision,
              onChange: handleDivisionChange,
            }}
            {...register("divisionTitle", {
              required: "field required",
            })}
          >
            {Array.from(policeDivisions.keys()).map((division) => (
              <MenuItem key={division} value={division} sx={{ marginTop: "3%", width: "80%" }}>
                {division}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="station"
            margin="normal"
            label="Violation status"
            select
            sx={{ marginTop: "3%", width: "80%" }}
            SelectProps={{
              sx: {
                height: "50px",
              },
            }}
            {...register("violationStatus", {
              required: "field required",
            })}
          >

            <MenuItem key={0} value={'accepted'} sx={{ color: '#ef4444' }}>
              <Status text='Mark as a violation' />
            </MenuItem>
            <MenuItem key={1} value={'rejected'} sx={{ color: '#22c55e' }}>
              <Status text='Not a violation' />
            </MenuItem>
            <MenuItem key={2} value={'rejected'} sx={{ color: '#6b7280' }}>
              <Status text='Reject evidence' />
            </MenuItem>
          </TextField>
          {errors.violationStatus?.message ? (
            <Alert sx={{ marginTop: "3%", width: "80%" }} severity="error">
              {errors.violationStatus?.message}
            </Alert>
          ) : (
            ""
          )}

          <TextField
            label="Mention the reason if rejecting the violation"
            placeholder="Video was not that clear"
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginTop: "3%", width: "80%" }}
            {...register("remarks", {
              required: "field required",
            })}
          />
        </Stack>


        <ToastContainer />
      </>
    );
  }


  return (
    <Stack
      sx={{ width: "90%", marginLeft: "3%", padding: '30px', height: '86vh' }}
      spacing={2}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center" className="font-light text-neutral-500">
            Enter Violation Details
          </Typography>
          <Stack sx={{ width: "100%" }} alignItems="center">
            <img alt="passwordImage" src={image} className="w-20" />
          </Stack>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<QontoConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box height='450px'>
            {stepContents[activeStep]}
          </Box>
          <Stack direction='row' justifyContent='space-evenly'>
            <Button
              sx={{ width: '20%' }}
              disabled={activeStep === 0}
              onClick={() => handleStepChange(activeStep - 1)}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              sx={{ width: '20%' }}
              disabled={activeStep === steps.length - 1}
              onClick={() => handleStepChange(activeStep + 1)}
              variant="contained"
            >
              Next
            </Button>

            {isLastStep && <Button sx={{ width: '20%' }} variant='outlined' type="submit">Finish</Button>}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default MyForm;
