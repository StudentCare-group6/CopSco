// ResponsiveGrid.js
import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Evidence from './Evidence';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  border: 'none',
  boxShadow: 'none',
}));

export default function VideoSamples() {
  const videoData = [
    {
      video: 'video2.mp4',
      title: 'Improper Turn',
      date: '01.07.2023',
      time: '14:56 PM',
      location: 'Galle',
      status: 'Pending',
      uploaderPicture: 'propic1.png',
    },
    {
      video: 'video3.mp4',
      title: 'Drunk Driving',
      date: '01.07.2023',
      time: '14:56 PM',
      location: 'Dehiwala',
      status: 'Pending',
      uploaderPicture: 'propic1.png',
    },
    {
      video: 'video4.mp4',
      title: 'Over Speeding',
      date: '01.07.2023',
      time: '14:56 PM',
      location: 'Delkanda',
      status: 'Pending',
      uploaderPicture: 'propic1.png',
    },
    {
      video: 'video5.mp4',
      title: 'Drunk Driving',
      date: '01.07.2023',
      time: '14:56 PM',
      location: 'Piliyandala',
      status: 'Pending',
      uploaderPicture: 'propic1.png',
    },
    {
      video: 'video6.mp4',
      title: 'Parking Violation',
      date: '01.07.2023',
      time: '14:56 PM',
      location: 'Galle',
      status: 'Pending',
      uploaderPicture: 'propic1.png',
    },
    {
      video: 'video7.mp4',
      title: 'Drunk Driving',
      date: '01.07.2023',
      time: '14:56 PM',
      location: 'Trincomalee',
      status: 'Pending',
      uploaderPicture: 'propic1.png',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container height="100%" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ border: 'none' }}>
        {videoData.map((videoItem, index) => (
          <Grid item xs={2} sm={4} md={4} key={index} sx={{ border: 'none' }}>
            <Item>
              <Evidence videoData={[videoItem]} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
