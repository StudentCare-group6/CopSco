import React, { useState } from 'react';
import {
  Box,
  Divider,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
} from '@mui/material';
import Popup from '../../components/General user/video_upload/Popup';
import NICdataGathering from '../../components/Police Division/DocumentsVerifying/NICdataGathering';


const VerifyUserDocuments = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const imageList = [
    {
      title: 'NIC Front View',
      imageUrl: 'https://i.imgur.com/X3l01xC.jpg',
    },
    {
      title: 'NIC Rear View',
      imageUrl: 'https://i.imgur.com/X3l01xC.jpg',
    },
    {
      title: 'User Photo',
      imageUrl: 'https://i.imgur.com/X3l01xC.jpg',
    },
  ];

  const [imageSelections, setImageSelections] = useState(
    Array(imageList.length).fill('')
  );

  const handleOpen = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const handleImageSelection = (event, index) => {
    const newSelections = [...imageSelections];
    newSelections[index] = event.target.value;
    setImageSelections(newSelections);
  };

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '80vh' }}>
        <Box className="py-6">
          <Stack direction="row" justifyContent="space-between">
            <h2 className="text-3xl font-bold">Verify User Documents</h2>
            <Popup />
          </Stack>
        </Box>
        <Divider />

        <Box className="flex ml-10">
          {imageList.map((item, index) => (
            <Box key={index} className="mt-5 ml-10">
              <Card sx={{ maxWidth: 450 }}>
                <CardMedia
                  sx={{ height: '250px', width: '450px', cursor: 'pointer' }}
                  image={item.imageUrl}
                  title={item.title}
                  onClick={() => handleOpen(item.imageUrl, index)}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Form Details */}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpen(item.imageUrl, index)}>
                    Clear View
                  </Button>
                <Select
                    value={imageSelections[index]}
                    onChange={(event) => handleImageSelection(event, index)}
                    variant="outlined"
                    style={{ marginLeft: '58%', width : '20%', height:'35px', borderRadius:'15px' }}
                >
                    <MenuItem value="">
                    <em>Select</em>
                    </MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                </Select>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Modal for Larger Image */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Larger View"
                  style={{
                    width: '50%',
                    maxHeight: '100vh',
                    margin: 'auto',
                    display: 'block',
                  }}
                />
              )}
            </div>
          </Fade>
        </Modal>
      </Box>

      <div>
        <NICdataGathering />
      </div>
    </div>
  );
};

export default VerifyUserDocuments;
