import React from 'react'
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Popup from "../../components/General user/video_upload/Popup";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const VerifyUserDocuments = () => {
  return (
    <div>
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
            <Box className="py-6 mb-7">
                <Stack direction="row" justifyContent="space-between">
                    <h2 className="text-3xl font-bold">Verify User Documents</h2>
                    <Popup />
                </Stack>
            </Box>
            <Divider/>

            <Box className="flex ml-20">
                <Box className="mt-5 ml-10">
                    <Card sx={{ maxWidth: 450 }}>
                        <CardMedia
                            sx={{ height: '500px' , width: '500px'}}
                            image="https://i.imgur.com/X3l01xC.jpg"
                            title="NIC front view"
                        />
                        <CardContent>
                            <Typography variant='h6'>
                                NIC Front View
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {/* Form Details */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>

                <Box className="mt-5 ml-10">
                    <Card sx={{ maxWidth: 450 }}>
                        <CardMedia
                            sx={{ height: '500px' , width: '500px'}}
                            image="https://i.imgur.com/X3l01xC.jpg"
                            title="NIC front view"
                        />
                        <CardContent>
                            <Typography variant='h6'>
                                NIC Rear View
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {/* Form Details */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>

                <Box className="mt-5 ml-10">
                    <Card sx={{ maxWidth: 450 }}>
                        <CardMedia
                            sx={{ height: '500px' , width: '500px'}}
                            image="https://i.imgur.com/X3l01xC.jpg"
                            title="NIC front view"
                        />
                        <CardContent>
                            <Typography variant='h6'>
                                User Photo
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {/* Form Details */}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
            
        </Box>
    </div>
  )
}

export default VerifyUserDocuments