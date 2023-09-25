import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import video1 from './video1.mp4';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


export default function RecipeReviewCard(props) {
  const axiosPrivate = useAxiosPrivate();
  const [video, setVideo] = React.useState(null); // [video, setVideo
  const getVideo = async () => {
    try {
      const response = await axiosPrivate.get(`upload/view-video/${props.access}`);
      setVideo(response.data.url);
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

  const keyValuePairs = [
    { key: 'Due Date', value: 'Aug 15, 2023' },
    { key: 'Vehicle No.', value: 'KN-3846' },
    { key: 'Appeal Before', value: 'Aug 15, 2023' },
    { key: 'Police Division', value: 'Cinnamon Gardens' },
    { key: 'Amount', value: '5000.00' },
    { key: 'Demerit Points', value: '10' }
  ];

  return (
    <Card sx={{ maxWidth: 400, boxShadow: 'none', borderRadius: '15px' }}>
      <CardMedia
        component="video"
        height="194"
        src={video1}
        autoPlay
        controls
      />
      <CardContent>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          {keyValuePairs.map((pair, index) => (
            <>
              <Grid item xs={6} sm={6} key={index}>
                <Typography variant='body2' fontWeight='bold'>
                  {pair.key}:
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} key={index}>
                <Typography variant='body2'>
                  {pair.value}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}