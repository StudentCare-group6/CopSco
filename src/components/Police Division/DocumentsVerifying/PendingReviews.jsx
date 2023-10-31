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

function createData(name, NICfrontview, NICrearview, NIC, fullname, location) {
  return {
    name: name,
    NICfrontview: NICfrontview,
    NICrearview: NICrearview,
    history: [{ NIC: NIC, fullname: fullname, location: location }],
    historyEntry: {
      NIC: '',
      fullname: '',
      location: '',
      status: '',
    },
  };
}

export default function CollapsibleTable() {
  const [value, setValue] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth();
  
  const userData = {
    police_username: 43956,
  };

  const getDocuments = async () => {
    try {
      const response = await axiosPrivate.get("police-division/viewDocuments", { params: userData });
      console.log(response.data);
      const newRows = response.data.documents.map((value) => createData(value.name, value.NICfrontview, value.NICreartview));    
      setValue(newRows);

    } catch (error) {
      console.log(error);
    }
  };

  // const rows = [
  //   createData('Uthpalani', '', '', '200079300637', 'Uthpalani Jayasinghe', 'Galle'),
  //   createData('Oshada', '', '', '200079300637', 'Uthpalani Jayasinghe', 'Galle'),
  //   createData('Tharindu', '', '', '200079300637', 'Uthpalani Jayasinghe', 'Galle'),
  //   createData('Vishal', '', '', '200079300637', 'Uthpalani Jayasinghe', 'Galle'),
  // ];

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);
  

  function Row(props) {
    const { row, onStatusChange, onUpdateHistory, openRow, setOpenRow } = props;
    const open = row === openRow;

    const handleStatusChange = () => {
      const newStatus = 'Verified';
      onStatusChange(row, newStatus);
    };

    const handleReject = () => {
      const newStatus = 'Rejected';
      onStatusChange(row, newStatus);
    };

    row.isEditing = true;

    const handleSave = () => {
      onUpdateHistory(row, [...row.history]);
    };

    const handleFieldChange = (field, value) => {
      row.historyEntry[field] = value;
    };

    // State for the image modal
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

  // Function to open the image modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setSelectedImage('');
    setImageModalOpen(false);
  };

  
  return (
    <React.Fragment>
    <Table>
    <TableBody>
    {/* {value.map((row, index) => ( */}
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
              
              <TableCell component="th" scope="row">
                <Typography>{row.name}</Typography>
              </TableCell>
              <TableCell component="td" scope="row">
                {/* {row.status} */}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" className="ml-[50%]" onClick={handleStatusChange}>
                  Accept
                </Button>
                &nbsp;&nbsp;
                <Button variant="outlined" onClick={handleReject}>
                  Reject
                </Button>
              </TableCell>

              {/* Image Modal */}
            </TableRow>
    {/* )) */}
    {/* } */}
    </TableBody>
    </Table>
    </React.Fragment>
  );
}

  const [tableData, setTableData] = React.useState(value);
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

  const handleUpdateHistory = (row, updatedHistory) => {
    const updatedData = tableData.map((dataRow) => {
      if (dataRow === row) {
        return { ...dataRow, history: updatedHistory };
      }
      return dataRow;
    });
    setTableData(updatedData);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {value.map((row, index) => (
            <Row
              key={index}
              row={row}
              onStatusChange={handleStatusChange}
              onUpdateHistory={handleUpdateHistory}
              openRow={openRow}
              setOpenRow={setOpenRow}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
