import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'

function createData(name, NICfront, NICback, UserPic) {
  return { name, NICfront, NICback, UserPic };
}

const rows = [
  createData('Oshada Rupesinghe', '-', '-' , '-' ),
  createData('Tharindu Dhananjaya', 'Uploaded', 'Uploaded', 'Uploaded'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User name</TableCell>
            <TableCell align="right">NIC front view</TableCell>
            <TableCell align="right">NIC rear view</TableCell>
            <TableCell align="right">User photo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {/* <Link to={`/police-division/VerifyUserDocuments/${row.name}`}>{row.name}</Link> */}
                <Link to={`/police-division/VerifyUserDocuments/`}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.NICfront}</TableCell>
              <TableCell align="right">{row.NICback}</TableCell>
              <TableCell align="right">{row.UserPic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
