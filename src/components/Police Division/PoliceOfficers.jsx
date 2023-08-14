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
  
  '&.status-inactive': {
    color: 'red',
    fontWeight: 'bold',
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
  createData('A.J.U. Dakshika', '7845596', 'Inactive', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Active', '14:56 PM'),
  createData('A.J.U. Dakshika', '7845596', 'Inactive', '14:56 PM'),
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
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  className={`status-${row[column.id].toLowerCase()}`}
                >
                  {column.id === 'ActiveStatus' ? (
                    row[column.id] === 'Active' ? (
                      <button className="flex items-center h-8 px-6 w-28 font-semibold border border-green-600 rounded-full text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Active
                      </button>
                    ) : (
                      <button className="flex items-center h-8 px-6 w-28 font-semibold border border-red-600 rounded-full text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                        Inactive
                    </button>
                    )
                  ) : (
                    row[column.id]
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
