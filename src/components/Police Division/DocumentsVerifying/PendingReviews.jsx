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

// Import the Modal and Backdrop components
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

function createData(name, status, NIC, username, location) {
  return {
    name,
    status,
    history: [{ NIC, username, location }],
    historyEntry: {
      NIC: '',
      username: '',
      location: '',
    },
    isEditing: false,
  };
}

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
          {row.status}
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
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div style={{ paddingLeft: '16px' }}>
              <Box sx={{ margin: 1 }}>
                <Typography variant="subtitle2" gutterBottom component="div">
                  Verify user documents
                </Typography>

                <Table size="small" aria-label="purchases">
                  <TableBody>
                    <TableRow>
                      <div className="ml-5 mb-5 mt-5">
                        <Button variant="outlined" onClick={() => openImageModal('https://i.imgur.com/X3l01xC.jpg')}>
                          NIC Front View
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="outlined" onClick={() => openImageModal('https://i.imgur.com/X3l01xC.jpg')}>
                          NIC Rear View
                        </Button>
                      </div>
                    </TableRow>

                    {/* Documents */}
                    {row.history.map((historyRow, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {row.isEditing ? (
                            <TextField
                              className=""
                              label="NIC number"
                              value={historyRow.NIC}
                              onChange={(e) => handleFieldChange('NIC', e.target.value)}
                            />
                          ) : (
                            historyRow.NIC
                          )}
                        </TableCell>

                        <TableCell>
                          {row.isEditing ? (
                            <TextField
                              className=""
                              label="User Name"
                              value={historyRow.username}
                              onChange={(e) => handleFieldChange('username', e.target.value)}
                            />
                          ) : (
                            historyRow.username
                          )}
                        </TableCell>

                        <TableCell>
                          {row.isEditing ? (
                            <TextField
                              className=""
                              label="Location"
                              value={historyRow.location}
                              onChange={(e) => handleFieldChange('location', e.target.value)}
                            />
                          ) : (
                            historyRow.location
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {row.isEditing && (
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Button variant="outlined" onClick={handleSave}>
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>

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
        }}
      >
        <Fade in={isImageModalOpen}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img src={selectedImage} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
    historyEntry: PropTypes.shape({
      date: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onUpdateHistory: PropTypes.func.isRequired,
  openRow: PropTypes.object,
  setOpenRow: PropTypes.func,
};

const rows = [
  createData('Uthpalani Jayasinghe', 'Verify', '200079300637', 'Uthpalani Jayasinghe', 'Galle'),
  createData('Amal Perera', 'Verified', '200079300568', 'Amal Perera', 'Colombo'),
];

export default function CollapsibleTable() {
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
          {tableData.map((row, index) => (
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
