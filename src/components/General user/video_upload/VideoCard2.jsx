import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import VideoThumbnail from "react-video-thumbnail";


export default function MediaControlCard(props) {
  return (
    <Card
      sx={{ display: "flex", boxShadow: "none" }}
    >
      <CardMedia
        component="image"
        controls // This adds play/pause controls to the video
        loop // This makes the video loop
        muted // This mutes the video (remove if not needed)
        sx = {{ width: "auto", height: "210px"}}
      >
        {/* <source src={props.url} type="video/mp4" /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "210px",
          }}
        >
          <VideoThumbnail videoUrl={props.url} />
        </div>
        {/* Your browser does not support the video tag. */}
      </CardMedia>
    </Card>
  );
}
