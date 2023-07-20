import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

export default function DetailsList(props) {


    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {props.detailsArr.map((value) => (
                <ListItem
                    key={value}
                    disableGutters
                    secondaryAction={
                        <Typography className = 'font-medium text-neutral-400'>
                            {props.dataArr[props.detailsArr.indexOf(value)]}
                        </Typography>
                    }
                >

                    <Typography sx={{ wordWrap: 'break-word' }} className = 'font-semibold text-neutral-600'>
                        {`${value}:`}
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
}