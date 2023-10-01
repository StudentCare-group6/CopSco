import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import VideoThumbnail from 'react-video-thumbnail';
import { PreviewOutlined } from '@mui/icons-material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderStyle: 'none',
    borderRadius: '10px'
};

export default function ViewFineModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button startIcon={<PreviewOutlined />} onClick={handleOpen} variant = 'contained' className = 'rounded-full bg-slate-900' sx={{ boxShadow: "none", textTransform: "none" }}>
                View Thumbnail
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <VideoThumbnail videoUrl={props.videoUrl}  snapshotAtTime={props.totalSeconds}  />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}