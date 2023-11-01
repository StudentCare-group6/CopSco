import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

// Import the Modal and Backdrop components
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

  function createData(caseid, violation, appealhistory, history) {
    return {
      caseid: caseid,
      violation: violation,
      appealhistory: appealhistory,
      history: history,
    };
  }


export default function CollapsibleTable() {
  const [value, setValue] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth();
  
  const userData = {
    police_username: 43956,
  };

  // const getDocuments = async () => {
  //   try {
  //     const response = await axiosPrivate.get("police-division/viewDocuments", { params: userData });
  //     console.log(response.data);
  //     const newRows = response.data.documents.map((value) => createData(value.name, value.NICfrontview, value.NICreartview));    
  //     setValue(newRows);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const rows = [
    createData('C123','Reckless Driving', ''),
    createData('C345','High Speed', ''),
  ];

  // useEffect(() => {
  //   getDocuments();
  // }, []);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);
  

  function Row(props) {
    const { row, openRow, setOpenRow } = props;
    const open = row === openRow;

    const handleStatusChange = () => {
      // Add appeal button content

    };

    const handleFieldChange = (field, value) => {
      row.historyEntry[field] = value;
    };
  
  return (
    <React.Fragment>
    <Table>
      <TableBody>
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpenRow(open ? null : row)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              {/* Case ID */}
              <TableCell component="th" scope="row">
                <Typography>{row.caseid}</Typography>
              </TableCell>
              {/* Violation */}
              <TableCell component="th" scope="row">

              </TableCell>

              {/* Add Appeal button */}
              <TableCell>
                <Button variant="contained" color="primary" className="ml-[50%]" onClick={() => handleStatusChange(row.caseid)}>
                  Add Appeal
                </Button>
              </TableCell>
            </TableRow>

            {/* Collapsible part */}
            <TableCell colSpan={4}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <div style={{ paddingLeft: '16px' }}>
                      <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                            {/* Documents */}
                            {row.history.map((historyRow, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                    <TextField
                                      className=""
                                      label="NIC number"
                                      defaultValue={historyRow.NIC}
                                      onChange={(e) => handleFieldChange('NIC', e.target.value)}
                                    />
                                </TableCell>

                                <TableCell>
                                    <TextField
                                      className=""
                                      label="Full Name"
                                      defaultValue={historyRow.fullname}
                                      onChange={(e) => handleFieldChange('fullname', e.target.value)}
                                    />
                                </TableCell>
                              </TableRow>
                            ))}
                        </Table>
                      </Box>
                    </div>
                  </Collapse>
              </TableCell>
      </TableBody>
    </Table>
    </React.Fragment>
  );
}

  const [tableData, setTableData] = React.useState(rows);
  const [openRow, setOpenRow] = React.useState(null);

  const handleStatusChange = (row, newStatus) => {
    const updatedData = tableData.map((dataRow) => {
      if (dataRow === row) {
        return { ...dataRow, status: newStatus };
      }
      return dataRow;
    });
    setTableData(updatedData);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {tableData.map((row, index) => (
            <Row
              key={index}
              row={row}
              onStatusChange={handleStatusChange}
              openRow={openRow}
              setOpenRow={setOpenRow}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
