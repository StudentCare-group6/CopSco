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
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RejectionReason from './RejectionReason'

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

function createData(name, NICfrontview, NICrearview, NIC, fullname) {
  return {
    name: name,
    NICfrontview: NICfrontview,
    NICrearview: NICrearview,
    NIC : NIC,
    history: [{ NIC: NIC, fullname: fullname}],
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
      const newRows = response.data.documents.map((value) => createData(value.name, value.NICfrontview, value.NICreartview, value.NIC, value.fullname));    
      setValue(newRows);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);
  

  function Row(props) {
    const { row, onStatusChange, onUpdateHistory, openRow, setOpenRow } = props;
    const open = row === openRow;

    const handleStatusChange = async (NIC) => {
      const verifyData = {
        nic: NIC,
        verified: true,
        reason:" "
      };

      try {
        const response = await axiosPrivate.post("police-division/verifyDocuments", verifyData);
        window.location.reload();
  
      } catch (error) {
        console.log(error);
      }
    };

    const [openn, setOpen] = React.useState(false);
    const [nic, setNIC] = React.useState("");


    const handleClose = () => {
      setOpen(false);
    };

    const handleReject = (NIC) => {
      setNIC(NIC);
      setOpen(true);
    };

    row.isEditing = true;

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
                <Button variant="contained" color="primary" className="ml-[50%]" onClick={() => handleStatusChange(row.NIC)}>
                  Accept
                </Button>
                &nbsp;&nbsp;
                <Button variant="outlined" onClick={() => handleReject(row.NIC)}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
              {/* Image Modal */}
            
              <TableCell colSpan={4}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <div style={{ paddingLeft: '16px' }}>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="subtitle2" gutterBottom component="div">
                          Verify user documents
                        </Typography>
                              <div className="ml-5 mb-5 mt-5">
                                <Button variant="outlined" onClick={() => openImageModal(`http://localhost:8000/images/img/${row.NICfrontview}`)}>
                                  NIC Front View
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="outlined" onClick={() => openImageModal(`http://localhost:8000/images/img/${row.NICreartview}`)}>
                                  NIC Rear View
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="outlined" onClick={() => openImageModal(`http://localhost:8000/images/img/${row.verificationImage}`)}>
                                  User Picture
                                </Button>
                              </div>
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
                                  {row.isEditing ? (
                                    <TextField
                                      className=""
                                      label="Full Name"
                                      defaultValue={historyRow.fullname}
                                      onChange={(e) => handleFieldChange('fullname', e.target.value)}
                                    />
                                  ) : (
                                    historyRow.fullname
                                  )}
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
        <Dialog open={openn} onClose={handleClose}>
          <DialogTitle>Rejection Reason</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <RejectionReason NIC={nic} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* Image Modal */}
      <Modal
        open={isImageModalOpen}
        onClose={closeImageModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={isImageModalOpen}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={selectedImage} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </Fade>
      </Modal>
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
