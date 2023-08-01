import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Steppers from '../../components/GeneralUserRegistration/Steppers';
import WebCam from '../../components/GeneralUserRegistration/WebCam';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SecondPage() {
    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        navigate('/registration/third');
        // navigate(`/registration/third?photoURL=${encodeURIComponent(photoURL)}`);
    }

    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photoURL, setPhotoURL] = useState('');
    const getVideo = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        width: 1920,
                        height: 1080,
                    },
                })
                .then(stream => {
                    let video = videoRef.current;
                    if (video) {
                        video.srcObject = stream;
                        video.play().catch(err => {
                            console.log(err);
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
    const takePhoto = (event) => {
        event.preventDefault();
        const width = 396;
        const height = width / (16 / 9);
        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        photo.toBlob((blob) => {
            // Store the Blob in local storage
            localStorage.setItem('takenPhoto', blob);
            setPhotoURL(URL.createObjectURL(blob));
            setHasPhoto(true);
        });

    }

    const closePhoto = (event) => {
        event.preventDefault();
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    }

    useEffect(() => {
        getVideo();
    }, []);
    return (

        <div>
            <Stack justifyContent="center" alignItems="center" spacing={3}>
                <Typography component="h1" variant="h4" className='font-extrabold text-neutral-500' >
                    Verify yourself
                </Typography>
                <Typography textAlign='center' component="h1" variant="h6" className='font-light text-neutral-500' >
                    We require a photo of you for verification purposes only !
                </Typography>
            </Stack>
            <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} sx={{ mt: 3, height: '300px' }} >
                        <div className="webcam-container">
                            <div className={`video ${hasPhoto ? 'behind' : ''}`}>
                                <video ref={videoRef}></video>
                                <Stack sx={{ mt: '20px' }}>
                                    <Button variant='outlined' onClick={takePhoto}>TAKE PHOTO</Button>
                                </Stack>
                            </div>
                            <div className={`photo ${hasPhoto ? 'active' : ''}`}>
                                <canvas ref={photoRef}></canvas>
                                <Stack sx={{ mt: '20px' }}>
                                    <Button variant='contained' className='bg-black' onClick={closePhoto}>RETAKE</Button>
                                </Stack>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} className='font-light text-neutral-500' >
                        Please use your device's camera to take the photo and click on the "Take Photo" button.
                    </Grid>
                    <Grid item xs={12} className='font-light text-neutral-500'>
                        Make sure that your face is clearly visible in the photo.
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Next
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}



