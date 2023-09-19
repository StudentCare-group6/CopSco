import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FineCard from './VideoCard2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '15px',
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpen} sx = {{textTransform:'none'}}>Appeal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function NestedModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div class="relative flex justify-center items-center overflow-hidden bg-cover bg-no-repeat" style={{ width: '100%', height: 'auto' }} onClick={handleOpen}>
                <img
                    src={`data:image/jpeg;base64,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`}
                    class="transition duration-300 ease-in-out hover:scale-110"
                    alt="video-thumbnail" />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <FineCard/>
                    <ChildModal />
                </Box>
            </Modal>
        </div>
    );
}