import React from 'react'
import { Typography } from '@mui/material';
import MultipleSelectPlaceholder from './Select';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    <div>
      <div className='flex mt-[80px]'>
        <div className='ml-2'>
          <img
            src={'propic1.png'}
            alt="User Profile"
            className="w-14 h-14 rounded-full mr-2 ml-20"
            style={{ marginTop: '-50px'}}
          /> 
        </div>
        <div className='mt-[-45px] ml-3'>
          <div>
            <Typography variant="body2">
              Uploaded by : 
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle">
              Oshada Rupesinghe 
            </Typography>
          </div>
        </div>
        <div className='w-5 h-5 mt-[-35px] ml-3'>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  )
}

export default Actions