import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function ResponsiveAppBar() {
  return (
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '25px' }}>
          <Typography variant="body2" noWrap component="span" sx={{color:'#979797' ,  marginRight: '10px'}}>
            Ms A.J.U. Dakshika
          </Typography>

          <Avatar alt="User Profile" src="/static/images/avatar/2.jpg" sx={{ marginLeft: '5px'}} />
        </Box>
      </Toolbar>
  );
}

export default ResponsiveAppBar;
