import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import Img from "../../../images/fine.png";
import Stack from "@mui/material/Stack";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    }
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // caseID
  // vehicleNumber
  // typeOfOffence,
  // fineAmount,
  //  demeritPoints,

  const deleteVideo = async (props) => {
    const fineData = {
      caseID: props.caseId,
      vehicleNumber: props.vehicleNo,
      typeOfOffence: props.violations,
      fineAmount: props.amounts,
      demeritPoints: props.demeritPoints,
    };

   
    try {
      const response = await axiosPrivate.post('police-division/issueFine', fineData );
      console.log(response.data)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button
          variant="text"
          onClick={handleClickOpen}
          sx={{ boxShadow: 'none', textTransform: 'none' }}
        >Issued Fines
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Stack justifyContent="center" alignItems="center">
            <DialogTitle id="responsive-dialog-title">
              Issue Fine ?
            </DialogTitle>
          </Stack>
          <DialogContent>
            <Stack justifyContent="center" alignItems="center">
              <img
                src={Img}
                alt="delete"
                style={{ height: "15%", width: "15%" }}
              />
            </Stack>
            <DialogContentText sx={{ marginTop: "5%", textAlign: "center" }}>
              Please make sure that the details are correct. <br />
              Once Issued this action is irreversible. <br />
              Do you wish to continue ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              width="100%"
            >
              <Button autoFocus onClick={handleClose} >
                Back
              </Button>
              <Button onClick={()=>deleteVideo(props)} autoFocus color='error' >
                Yes
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider >
  );
}