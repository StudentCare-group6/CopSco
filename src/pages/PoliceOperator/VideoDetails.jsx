import VideoMainDetails from "../../components/PoliceOperator/VideoDetails/VideoMainDetails";
import MyForm from "../../components/PoliceOperator/VideoDetails/MyForm";
import React, { useState } from "react";
import useVideoContext from "../../hooks/useVideoContext";
import ReactPlayer from "react-player";

const VideoDetails = () => {
  const { selectedVideo } = useVideoContext();
  const [pausedTime, setPausedTime] = useState(null);

  // Handle video pause event
  const handlePause = () => {
    const player = videoRef.current.getInternalPlayer(); 
    const pausedTime = player.getCurrentTime(); 
    const pausedTimeInSeconds = Math.floor(pausedTime);

  const minutes = Math.floor(pausedTimeInSeconds / 60);
  const seconds = Math.floor(pausedTimeInSeconds % 60);

  const formattedPausedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  setPausedTime(formattedPausedTime);
  console.log('Paused timestamp:', formattedPausedTime);
  };

  const videoRef = React.createRef();

  return (
    <div>
      {/* Video Verification */}
      <div className="flex">
        {/* Video Details */}
        <div className="w-[50%] ml-20 mt-5">
          {/* Video */}
          <div>
            {selectedVideo && (
              <ReactPlayer
                ref={videoRef}
                url={selectedVideo.video}
                controls
                width="100%"
                height="400px"
                onPause={handlePause}
                onReady={() => console.log('onReady callback')}
                onStart={() => console.log('onStart callback')}
                onEnded={() => console.log('onEnded callback')}
                onError={() => console.log('onError callback')}
              />
            )}
          </div>
          {/* Video details */}
          <div className="mt-[-45px] mb-10">
            <VideoMainDetails />
            {pausedTime !== null && (
              <div>
                <p>Paused Timestamp: {pausedTime}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="w-[50%]">
          <MyForm pausedTime={pausedTime} />
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
