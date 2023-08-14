import * as React from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PopUpForm from './PopUpForm';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: '#020617',
          color: 'white',
          fontSize: '0.90rem',
          borderRadius: '10px',
          width: '200px',
          padding: '5px 15px',
          '&:hover': {
            background: 'black',
          },
        },
        outlined: {
          borderColor: '#020617',
          color: '#020617',
          fontSize: '0.90rem',
          padding: '5px 15px',
          width: '200px',
          borderRadius: '10px',
          '&:hover': {
            background: 'white',
            color: 'black',
          },
        },
      },
    },
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '10px',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.85),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'grey', 
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);

  const addNewPoliceOfficer = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className='flex'>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }} // Corrected attribute name
        />
      </Search>

      <div className='ml-[20px]'>
        <ThemeProvider theme={theme}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={addNewPoliceOfficer}>
              Add Police Officer
            </Button>
          </Stack>
        </ThemeProvider>
      </div>
    </div>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Police Officer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <PopUpForm />
        </DialogContentText>
      </DialogContent>
    </Dialog>
    </>
  );
}
