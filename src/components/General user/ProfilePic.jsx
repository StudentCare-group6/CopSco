import React from 'react';
import { Typography, Stack } from '@mui/material';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export default function Profile(props) {

    return (
        <Stack direction='row' alignItems='center' margin>
            <div className='px-5'>
                <Typography variant='subtitle1'>Mr. {props.profile.name}</Typography>
            </div>
            <div className="ml-auto flex items-center">
                <HelpOutlineOutlinedIcon className="mr-4" />
                <Avatar sx={{ bgcolor: deepOrange[500] }}>O</Avatar>
            </div>
        </Stack>

    )
}