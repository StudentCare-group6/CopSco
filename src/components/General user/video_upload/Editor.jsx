import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import ReactPlayer from 'react-player';
import { Grid } from '@mui/material';

const Editor = ({ open, onClose }) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setStartTime(newValue[0]);
    setEndTime(newValue[1]);
  };

  return (
    <div className='px-10 py-3'>
        <ReactPlayer url="https://www.youtube.com/watch?v=MeIk9ap1u_E" controls width="100%" height="20rem" className="my-3 "/>
        <Grid container className='flex flex-row justify-between my-6' spacing={4}>
            <Grid item xs={6}>
                <TextField
                label="Starts-at (in seconds)"
                type="number"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                fullWidth
                size='small'
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                label="Ends-at (in seconds)"
                type="number"
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                fullWidth
                size='small'
                />
            </Grid>
        </Grid>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          disableSwap
          value={[startTime, endTime]}
          onChange={handleSliderChange}
          min={0}
          max={100} // Set this based on the duration of your video
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} sec`}
          className='my-3'
          // Customize the track and thumb styles using the sx prop
            sx={{
                '& .MuiSlider-rail':{
                    height: 40,
                    backgroundColor:'#d6d6d6'
                },
                '& .MuiSlider-track': {
                height: 40, // Change the track height here
                 // Adjust the track border radius if needed
                backgroundColor: '#a1eeff', // Change the track color
                border:'none'
                },
                '& .MuiSlider-thumb': {
                width: 10, // Change the thumb width
                height: 45, // Change the thumb height
                backgroundColor: '#2196f3', // Change the thumb color
                borderRadius: '0'
                },
                '& .MuiSlider-mark': {
                backgroundColor: '#f44336', // Change the marker color
                },
                '& .MuiSlider-markActive': {
                backgroundColor: '#ff5722', // Change the active marker color
                },
            }}
        />
      </div>
  );
};

export default Editor;
