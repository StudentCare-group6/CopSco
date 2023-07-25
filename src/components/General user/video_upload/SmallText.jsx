import React from 'react'
import { Typography } from '@mui/material'

function SmallText({text}) {
  return (
    <Typography className='text-gray-400 text-[12px] font-normal'>
        {text}
    </Typography>
  )
}

export default SmallText