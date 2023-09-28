import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useVideoContext from '../../../hooks/useVideoContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '80%',
   // Adjust the percentage as needed
    verticalAlign: 'middle', // Center content vertically in the cell
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, detail) {
  return { name, detail };
}


export default function CustomizedTables() {
  const { selectedVideo } = useVideoContext();
  var video = selectedVideo;

  if(video === null || video === undefined){
    video = JSON.parse(localStorage.getItem('selectedVideo'));
  }
  const rows = [
    createData('Vehicle Number', video.vehicleNo),
    createData('Violation Type', 'Improper Turn'),
    createData('Violation Date', '01.07.2023'),
    createData('Violation Time', '14:56 PM'),
    createData('Location', video.location),
    createData('Severity', 'High'),
    createData('Remarks', 'Driver was drunk.'),
  ];
  return (
    <TableContainer component={Paper} sx = {{ boxShadow:'none'}}>
      <Table sx={{ minWidth: '100%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row) => (
            <StyledTableRow style={{ height: '50%' }} key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell className='text-gray-500'>{row.detail}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

