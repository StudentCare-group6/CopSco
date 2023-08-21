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
import Editor from './Editor';
import ModalButton from './ModalButton';
import useFormContext from '../../../hooks/useFormContext';
import {createFFmpegCore} from '@ffmpeg/ffmpeg/dist';

const FFmpeg = createFFmpegCore({ log: true });


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

export default function EditorDialog() {

  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  const { page, setPage, endTime, startTime, videoUrl, videoFile } = useFormContext();

  const handleBack = () => setPage(page - 1);
  const handleTrim = async () => {
    // Convert start and end times to seconds or milliseconds
    const startSeconds = startTime; // Convert as needed
    const endSeconds = endTime;     // Convert as needed
   
    // Perform trimming using ffmpeg.js
    FFmpeg.FS('writeFile', 'input.mp4', videoFile);
    await FFmpeg.run('-i', 'input.mp4', '-ss', startSeconds, '-t', endSeconds - startSeconds, 'output.mp4');
    const trimmedVideoData =FFmpeg.FS('readFile', 'output.mp4');

    // Send the trimmed video to the backend
    const formData = new FormData();
    formData.append('trimmedVideo', new Blob([trimmedVideoData.buffer], { type: 'video/mp4' }));
    // Make a fetch or axios request to send the formData to the backend

    // Clean up
    FFmpeg.FS('unlink', 'input.mp4');
    FFmpeg.FS('unlink', 'output.mp4');

    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    handleBack();
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
        sx={{ height: '100vh' }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <center><b>Upload Evidence</b></center>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Editor />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrim} >
            Trim
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}



