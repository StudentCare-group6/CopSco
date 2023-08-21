import React from 'react';
import { Typography } from '@mui/material';

function SectionTitle({ titleText }) {
  return (
    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6B7280', fontSize: '18px', marginTop: 2, marginBottom: 2 }}>
      {titleText}
    </Typography>
  );
}

export default SectionTitle;
