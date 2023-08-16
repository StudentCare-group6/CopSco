import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Stack } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";

function Reward(props) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <PaidIcon sx={{ fontSize: 26 }} className="text-green-500" />
      <Typography component="div" className="text-2xl text-green-500">
        Reward: Rs. {props.text}
      </Typography>
    </Stack>
  );
}

function Rating(props) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <StarIcon sx={{ fontSize: 30 }} className="text-yellow-500" />
      <Typography component="div" className="text-2xl text-yellow-500">
        {props.text}
      </Typography>
    </Stack>
  );
}

export default function MediaControlCard(props) {
  const theme = useTheme();

  return (
    <Card
      sx={{ display: "flex", boxShadow: "none" }}
      className="shadow-sm rounded-lg mb-5 "
    >
      <CardMedia
        component="video"
        controls // This adds play/pause controls to the video
        loop // This makes the video loop
        muted // This mutes the video (remove if not needed)
        sx={{ width: 400, height: "auto" }}
      >
        <source src={props.url} type="video/mp4" />
        Your browser does not support the video tag.
      </CardMedia>
      <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6" className="font-bold">
            {props.title}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Stack gap = {1}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Date : 2021-10-10
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Time : 12:30 PM
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Police Division : Bambalapitiya
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Reviewed by : Mr. G.M.L Perera
              </Typography>
            </Stack>
            <Box>
              <Stack gap={3}>
                <Reward text={props.reward} />
                <Button variant="outlined" color="error" className="rounded-full">
                  Delete
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
}
