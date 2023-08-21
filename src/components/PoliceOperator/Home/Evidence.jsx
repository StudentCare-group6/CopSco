import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Typography } from '@mui/material';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <video controls style={{ height: '100%', width: '100%' }}>
        <source src={videoUrl} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const Evidence = ({ videoData }) => {
  const navigate = useNavigate(); 

  const directVideoDetails = () => {
    navigate('/video'); 

  };

  return (
    <div className="overflow-y-hidden">
      {videoData.map((item, index) => (
        <div key={index} onClick={directVideoDetails}>
          <VideoPlayer videoUrl={item.video} />
          <ImageListItem key={item.video}>
            <ImageListItemBar
              title={
                <div>
                  <Typography variant="subtitle1" style={{ marginLeft: '3rem' }} className="text-left">
                    {item.title}
                  </Typography>
                  <div className="flex items-center w-full">
                    <img
                      src={item.uploaderPicture}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full mr-2"
                      style={{ marginTop: '-25px' }}
                    />
                    <div className="w-100">
                      <Typography variant="caption">
                        {item.date}, {item.time}, {item.location}
                      </Typography>
                      <span className="text-sm ml-[150px] text-[#1A932E] bg-[#1A932E] inline-flex items-center justify-center px-2 py-1 rounded-full md:bg-[#1A932E38] lg:bg-[#1A932E38]">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              }
              position="below"
            />
          </ImageListItem>
        </div>
      ))}
    </div>
  );
};

export default Evidence;
