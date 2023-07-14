import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import image from './license_card.png';
import ColorTextField from './TextField.jsx';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Test from './QR_Scanner.jsx';
const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection : 'column',
  alignItems : 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  height: '60%',
  bgcolor: 'background.paper',
  borderRadius : 5,
  boxShadow: 24,
  p: 4
};


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if(props.status === 'qr'){
    return (
      <div>
      <Button onClick={handleOpen}><Typography variant='h6' align='center' className='font-bold text-black'>{props.txt} <ChevronRightIcon fontSize='large' className='font-bold text-gray-700' /> </Typography> 
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} spacing = {2}>
          <Test/>
        </Box>
      </Modal>
    </div>
    );
  }else{
      return (
        <div>
          <Button onClick={handleOpen}><Typography variant='h6' align='center' className='font-bold text-black'>{props.txt} <ChevronRightIcon fontSize='large' className='font-bold text-gray-700' /> </Typography> 
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} spacing = {2}>
    
              <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton sx = {{color:'black'}}>
              <ArrowBackIcon fontSize='medium'/>
              </IconButton>
              
              <Typography id="modal-modal-title" variant="h5" component="h4" className='font-bold text-black'>
                Enter License No.
              </Typography>
                          
              </Stack>
              
                <img src={image} alt='License Image' style={{ width: '60%', height: 'auto' }} />
              <Stack spacing = {2}>
              <ColorTextField/>
              <Box textAlign= "center">
              <Button variant="contained" sx = {{width:'auto'}} >Confirm</Button>
              </Box>
    
              </Stack> 
              
    
            </Box>
          </Modal>
        </div>
      );
    }

}
