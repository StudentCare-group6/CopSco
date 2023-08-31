import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import video1 from './video1.mp4';


export default function RecipeReviewCard() {

  return (
    <Card sx={{ maxWidth: 700, borderStyle:'none', borderRadius:'10px' }}>
     
      <CardMedia
        component="video"
        height="auto"
        src={video1}
        autoPlay
        controls
      />
    </Card>
  );
}