import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Typography } from '@mui/material';
import MultipleSelectPlaceholder from './Select';

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