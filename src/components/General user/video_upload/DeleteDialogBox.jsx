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

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        startIcon={<DeleteIcon />}
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        className="bg-red-700 rounded-full"
        sx = {{boxShadow: 'none', textTransform: 'none'}}
      >
        Delete submission
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Delete Video Permanently ? 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This video hasn't been verified yet. Deleting it will remove it from your view permanently.
            Do you wish to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Back
          </Button>
          <Button onClick={handleClose} autoFocus color = 'error'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
