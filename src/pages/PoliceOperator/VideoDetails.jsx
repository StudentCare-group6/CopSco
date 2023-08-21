import React from "react";
import styled from "@mui/material/styles/styled";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Typography } from "@mui/material";
import CustomSeparator from "../../components/PoliceOperator/VideoDetails/Breadcrumbs";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import VideoMainDetails from "../../components/PoliceOperator/VideoDetails/VideoMainDetails";
import Actions from "../../components/PoliceOperator/VideoDetails/Actions";
import MyForm from "../../components/PoliceOperator/VideoDetails/MyForm";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video controls style={{ height: "100%", width: "100%" }}>
        <source src={videoUrl} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const videoData = [
  {
    video: "video2.mp4",
    title: "Improper Turn",
    date: "01.07.2023",
    time: "14:56 PM",
    location: "Thummulla",
    status: "Pending",
    uploaderPicture: "propic1.png",
  },
];

function VideoDetails() {
  return (
    <div>
      {/* Video Verification */}
      <div className="flex">
        {/* Video Details */}
        <div className="w-[50%] ml-20 mt-5">
          {/* Video */}
          <div>
            {videoData.map((item, index) => (
              <React.Fragment key={index}>
                <VideoPlayer videoUrl={item.video} />
                <ImageListItem key={index}>
                  <ImageListItemBar title={<div></div>} position="below" />
                </ImageListItem>
              </React.Fragment>
            ))}
          </div>
          {/* Video details */}
          <div className="mt-[-45px] mb-10">
            <VideoMainDetails />
          </div>
        </div>

        {/* Actions */}
        <div className="w-[50%]">
          <Actions />
          <MyForm />
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
