import VideoMainDetails from "../../components/PoliceOperator/VideoDetails/VideoMainDetails";
import MyForm from "../../components/PoliceOperator/VideoDetails/MyForm";
import React, { useState } from "react";
import useVideoContext from "../../hooks/useVideoContext";
import ReactPlayer from "react-player";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';


const VideoDetails = () => {
  const { selectedVideo, setSelectedVideo, setThumbnail } = useVideoContext();
  
  var video = selectedVideo;
  if (video === null || video === undefined) {
    video = JSON.parse(localStorage.getItem('selectedVideo'));
    setSelectedVideo(video);
  }
  const [pausedTime, setPausedTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const isSmOrMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  // Handle video ready event
  const handlePlay = () => {
    setIsPaused(false);
  };

  // Handle video pause event
  const handlePause = () => {
    const currentTime = videoRef.current.getCurrentTime();
    const pausedTimeInSeconds = Math.floor(currentTime);

    const minutes = Math.floor(pausedTimeInSeconds / 60);
    const seconds = Math.floor(pausedTimeInSeconds % 60);

    const formattedPausedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    setPausedTime(formattedPausedTime);
    setIsPaused(true);
    console.log("Paused timestamp:", formattedPausedTime);
  };

  const videoRef = React.createRef();

  return (
    <Grid container margin sx={{ height: '87vh' }} gap={2} >
      <Grid item sm={12} md={12} lg={6} sx={{
        padding: '10px',
        height: isSmOrMd ? 'fit-content' : '100%', // Conditionally set height
        backgroundColor: 'white',
      }} className='shadow-xl'>
        {/* Video */}
        <Stack alignItems='center' width='100%' >
          <Box width='100%'className = 'bg-black' >
            {video && (
              <ReactPlayer
                ref={videoRef}
                url={video.url}
                controls
                width="100%"
                height="400px"
                alignSelf="center"
                onPause={handlePause}
                onPlay={handlePlay}
              />
            )}
            
          </Box>
          {/* Video details */}
          <Box width='100%' >
            <VideoMainDetails />
          </Box>
        </Stack>
      </Grid>

      {/* Actions */}
      <Grid item sm={12} md={12} lg={5.5} className='shadow-xl' sx={{
        height: isSmOrMd ? 'fit-content' : '100%', // Conditionally set height
        backgroundColor: 'white',
      }}>
        <MyForm pausedTime={pausedTime} videoUrl = {video.url} />
      </Grid>
    </Grid>

  );
};

export default VideoDetails;
