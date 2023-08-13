import React from 'react'
import { Typography } from '@mui/material';
import MultipleSelectPlaceholder from './Select';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ChevronRightOutlined } from '@mui/icons-material';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Actions = () => {
  return (

    <Stack direction = 'row' gap = {2} sx = {{marginLeft:'15%'}}>
      <Avatar {...stringAvatar('Oshada Rupesinghe')} />
      <Stack direction = 'column'>
        <Typography variant="body2">
          Uploaded by :
        </Typography>
        <Typography variant="subtitle">
          Oshada Rupesinghe
        </Typography>
      </Stack>
      <ChevronRightOutlined sx={{ fontSize: 40 }}/>
    </Stack>

  )
}

export default Actions