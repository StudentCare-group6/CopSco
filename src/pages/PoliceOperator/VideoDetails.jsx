import VideoMainDetails from "../../components/PoliceOperator/VideoDetails/VideoMainDetails";
import MyForm from "../../components/PoliceOperator/VideoDetails/MyForm";
import React, { useContext } from "react";
import { VideoContext } from "../../context/VideoContext";
import ReactPlayer from "react-player";

const VideoDetails = () => {
  const { selectedVideo } = useContext(VideoContext);

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
                url={selectedVideo.video}
                controls
                width="100%"
                height="400px"
              />
            )}
          </div>
          {/* Video details */}
          <div className="mt-[-45px] mb-10">
            <VideoMainDetails />
          </div>
        </div>

        {/* Actions */}
        <div className="w-[50%]">
          <MyForm />
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
