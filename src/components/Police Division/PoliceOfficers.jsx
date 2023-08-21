import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { id: 'name', label: 'Police Officer Name'},
  { id: 'policeNumber', label: 'Police Number'},
  { id: 'ActiveStatus', label: 'Status'},
  { id: 'lastLoginTime', label: 'Last Login Time'},
];

function createData(name, policeNumber, ActiveStatus, lastLoginTime) {
  return { name, policeNumber, ActiveStatus, lastLoginTime };
}

const rows = [
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper} className='mt-10'>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.width }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align}>
                  {row[column.id]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
