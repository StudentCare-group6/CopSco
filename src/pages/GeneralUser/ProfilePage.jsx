import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Link, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import InputForm from '../../components/General user/Profile/InputForm';
import VehicalInfo from '../../components/General user/Profile/VehicalInfo';
import SectionTitle from '../../components/General user/Profile/SectionTitle';
import ValueAndTitle from '../../components/General user/Profile/ValueAndTitle';

function ProfilePage() {
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
          <SectionTitle titleText={"Your Profile"} />
          <Avatar
            alt="Profile_Img"
            src="https://images.pexels.com/photos/5380635/pexels-photo-5380635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            sx={{ width: 200, height: 200, marginTop: 3 }}
          />
          <Typography sx={{ marginTop: 2 }}>
            Osura Viduranga
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <ValueAndTitle value={24} title={"Demerit Points"} />
            <Divider orientation="vertical" variant="middle" flexItem sx={{ marginX: 1 }} />
            <ValueAndTitle value={"3200.00 LRK"} title={"Rewards"} />
            <Divider orientation="vertical" variant="middle" flexItem sx={{ marginX: 1 }} />
            <ValueAndTitle value={"STARTER"} title={"Tier"} />
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, boxShadow:'none' }}>
          <SectionTitle titleText={"Your Secret QR"} />
          <Card sx={{ border: 'none' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="50"
                image="https://www.bdc.ca/globalassets/digizuite/40415-bdc-qr-code.jpg?v=498d76"
                alt="qr_code"
                sx={{ height: 200, width: 200, marginBottom: 1 }}
              />
              <CardContent>
                <Link href="#">Download My QR</Link>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} md={5} sx={{height:'93vh'}}>
        <Paper variant="outlined" sx={{ padding: 2, height:'100%' }}>
          <SectionTitle titleText={"Edit Your Personal Info"} />
          <InputForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} sx={{height:'93vh'}}>
        <Paper variant="outlined" sx={{ padding: 2 ,height:'100%'}}>
          <SectionTitle titleText={"Your Vehicle Info"} />
          <VehicalInfo />
          <VehicalInfo />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
