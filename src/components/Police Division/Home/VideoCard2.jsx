import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { CardActions, Typography } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import { offences, demeritPoints } from "../../../data/Constants";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import DeleteDialogBox from "./DeleteDialogBox";

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

export default function RecipeReviewCard(props) {
  const axiosPrivate = useAxiosPrivate();
  const values = props.data;
  const [video, setVideo] = React.useState({}); // [video, setVideo]
  var demeritPointsList = [];
  var amountList = [];

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const getVideo = async () => {
    const userData = {
      caseID: props.caseId,
    };
    try {
      const response = await axiosPrivate.get(
        `police-division/viewVerifiedVideoDetails`,
        { params: userData }
      );
      console.log(response);
      setVideo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    console.log(video); // Log the updated video value when it changes
  }, [video]);

  var keyValuePairs = [
    { key: "Due Date", value: formatDate(video.date) },
    { key: "Vehicle No.", value: video.vehicleno },
    { key: "Location", value: video.district + ", " + video.city },
  ];

  if (video.violations != null) {
    for (var i = 0; i < video.violations.length; i++) {
      keyValuePairs.push({
        key: "Violation " + (i + 1),
        value: video.violations[i],
      });
      var violation = video.violations[i];
      if (demeritPoints.has(violation) && offences.has(violation)) {
        demeritPointsList.push(demeritPoints.get(violation));
        amountList.push(offences.get(violation));
      }
    }
    console.log(demeritPointsList);
    console.log(amountList);
  }
  var totalDemeritPoints = 0;
  var totalAmount = 0;
  for (var i = 0; i < demeritPointsList.length; i++) {
    totalDemeritPoints += demeritPointsList[i];
    totalAmount += amountList[i];
  }
  keyValuePairs.push({
    key: "Demerit Points",
    value: totalDemeritPoints + " Points",
  });
  keyValuePairs.push({ key: "Total Amount", value: "Rs." + totalAmount });

  return (
    <ThemeProvider theme={darkTheme}>
      <Card sx={{ maxWidth: "100%", boxShadow: "none", borderRadius: "15px" }}>
        <CardMedia
          component="video"
          height="194"
          src={video.videoLink}
          controls
        />
        <CardContent>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {keyValuePairs.map((pair, index) => (
              <>
                <Grid item xs={12} sm={4} key={index}>
                  <Typography variant="body1" sx={{ marginLeft: "30px" }}>
                    {pair.key}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} key={index}>
                  <Typography variant="body1" sx={{ marginLeft: "30px" }}>
                    {pair.value}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} justifyContent={'space-evenly'} sx = {{width:'100%', padding:'10px'}}>
            <DeleteDialogBox vehicleNo = {video.vehicleno} caseId = {props.caseId} violations = {video.violations} demeritPoints = {demeritPointsList} amounts = {amountList} />
            <Button
              variant="text"
              className="bg-red-500 rounded-full"
              sx={{ textTransform: "none" }}
              color = 'error'
            >
              Reject Fine
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
