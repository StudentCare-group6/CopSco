// ResponsiveGrid.js
import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Evidence from "./Evidence";
import axios from "../../../api/posts";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Image } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  border: "none",
  boxShadow: "none",
}));

export default function VideoSamples() {
  const { auth } = useAuth();
  const [videoData1, setVideoData] = useState([]);
  const operatorData = {
    id: auth.user,
  };
  const getvideos = async () => {
    try {
      const response = await axios.get("violations/viewUploadedViolations");
      setVideoData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getvideos();
    console.log(videoData1);
  }, []);

  if (videoData1.length === 0 || videoData1.length === undefined) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Typography variant="h6" className="my-5">
          No accepted videos, Don't worry keep uploading !
        </Typography>
      </div>
    );
  } else {
    const rows = videoData1.map((item, index) => ({
      id: index + 1,
      video: [item.thumbnail, item.videokey],
      description: item.description,
      reward: "500",
      location: item.district + ", " + item.city,
      date: item.reportdate,
    }));

    for (let i = 0; i < videoData1.length; i++) {
      const videoItem = videoData1[i];

      const videoUrl = videoItem.video;
      const videoTitle = videoItem.title;

      console.log(`Video URL: ${videoUrl}`);
      console.log(`Video Title: ${videoTitle}`);
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          height="100%"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ border: "none" }}
        >
          {videoData1.map((videoItem, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} sx={{ border: "none" }}>
              <Item>
                <Evidence videoData={[videoItem]} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}
