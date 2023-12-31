import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UserIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import useFormContext from "../../hooks/useFormContext";
import MenuItem from "@mui/material/MenuItem";
import image from "../../images/security.png";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/posts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 5,
};

//const userRoles = ['admin', 'police-operator', 'police-division', 'traffic-police'];
const userRoles = [
  {
    value: "admin",
    label: "Administrator",
  },
  {
    value: "police-operator",
    label: "Control Room Operator",
  },
  {
    value: "police-division",
    label: "Police Division Operator",
  },
  {
    value: "traffic-police",
    label: "Traffic Police Officer",
  },
];

export default function UserroleUpdateModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [passwordCheckResult, setPasswordCheckResult] = useState(null);
  const { register, errors, getValues, setValue } = useFormContext();
  const [role, setRole] = React.useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (event) => {
    setRole(event.target.value);
    setValue("userRole", event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(props.officerId);
    console.log(getValues("userRole"));
    try {
      const response = axios.post(
        "admin/updateUserRole",
        JSON.stringify({
          userId: props.officerId,
          newUserRole: getValues("userRole"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setPasswordCheckResult(true);
      setAlertMessage("Userrole successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx = {{width:'150px'}}>
        {props.role}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h4"
                color="#020617"
                component="h2"
                align="center"
                sx={{ fontWeight: "600" }}
              >
                Change User Role
              </Typography>
              <Typography
                variant="h6"
                color="#020617"
                component="h2"
                align="center"
                sx={{ fontWeight: "600", marginTop: "20px" }}
              >
                User Id {props.officerId}
              </Typography>
              {passwordCheckResult !== null && (
                <Alert
                  severity={passwordCheckResult ? "success" : "error"}
                  sx={{ mt: "10px" }}
                >
                  {alertMessage}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                label="User Role"
                select
                value={role}
                onChange={handleChange}
                fullWidth
                SelectProps={{
                  sx: {
                    height: "50px",
                  },
                }}
              >
                {userRoles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <Button type="submit" fullWidth>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
