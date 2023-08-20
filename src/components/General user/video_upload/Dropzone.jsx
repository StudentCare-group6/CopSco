import React from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SmallText from './SmallText';
import useFormContext from '../../../hooks/useFormContext';

import Box from '@mui/system/Box';

export default function Dropzone(props) {
  const { page, setPage, setVideoUrl, setVideoDuration, setVideoDimensions } = useFormContext();
  const handleNext = () => setPage(page + 1);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 2,
    accept: {
      'mp4/jpeg': ['.mp4']
    }, // Accept all video file types
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // Create a temporary URL for the uploaded video
        const temporaryUrl = URL.createObjectURL(acceptedFiles[0]);
        setVideoUrl(temporaryUrl);

        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.src = temporaryUrl;

        videoElement.addEventListener('loadedmetadata', () => {
          // Extract the duration from the video's duration property
          const durationInSeconds = Math.floor(videoElement.duration);
          setVideoDuration(durationInSeconds);
          const videoWidth = videoElement.videoWidth;
          const videoHeight = videoElement.videoHeight;
          setVideoDimensions({ width: videoWidth, height: videoHeight });
        });

        handleNext();
      }
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => <li key={e.code}>{e.message}</li>)}
      </ul>
    </li>
  ));

  return (
    <section sx={{ padding: '10px', margin: '0 auto' }}>
      <Box
        {...getRootProps({
          sx: {
            border: '3px dashed #ccc',
            borderRadius: '10px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }
        })}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ width: '20%', height: '20%', color: '#888' }} />
        <p>
          <u>
            <b>Click to Upload</b>
          </u>{' '}
          or drag and drop
        </p>
        <p sx={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', color: '#888' }}>
          (Maximum File Size: 5MB)
        </p>
        <SmallText text={"Your videos will be private to you till you submit them"} />
      </Box>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}
