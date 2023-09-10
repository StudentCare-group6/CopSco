import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Payment } from "@mui/icons-material";
import axios from "../../../api/posts";
import Stack from "@mui/material/Stack";
import paymentImg from "../../../images/credit-card.png";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fineData = {
    fineID: props.id,
  };
  const pay = async () => {
    try {
      const response = await axios.get("finePayment/payfine_online", {
        params: fineData,
      });
      const formData = new FormData();
      formData.append("merchant_id", "1223908");
      formData.append("return_url", "http://localhost:3000/general-user/fines");
      formData.append("cancel_url", "http://localhost:3000/general-user/fines");
      formData.append("notify_url", "http://localhost:3000/general-user/fines");
      formData.append("order_id", "ItemNo12345");
      formData.append("items", "Door bell wireless");
      formData.append("currency", "LKR");
      formData.append("amount", "1000");
      formData.append("first_name", "Saman");
      formData.append("last_name", "Perera");
      formData.append("email", "samanp@gmail.com");
      formData.append("phone", "0771234567");
      formData.append("address", "No.1, Galle Road");
      formData.append("city", "Colombo");
      formData.append("country", "Sri Lanka");
      formData.append("hash", response.data[0].hash);
      try {
        const response = await fetch(
          "https://sandbox.payhere.lk/pay/checkout",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.text(); // Get response as text
          console.log("Payment response:", responseData);
        } else {
          // Handle non-200 status codes here
          console.error("Payment error:", response.statusText);
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button
          startIcon={<Payment />}
          variant="contained"
          color="error"
          onClick={handleClickOpen}
          className="bg-slate-900 rounded-full"
          sx={{ boxShadow: "none", textTransform: "none" }}
        >
          Pay Fine
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Stack justifyContent="center" alignItems="center">
            <DialogTitle id="responsive-dialog-title" fontWeight="bold">
              Do you wish to pay ?
            </DialogTitle>
          </Stack>

          <DialogContent>
            <Stack justifyContent="center" alignItems="center">
              <img
                src={paymentImg}
                alt="payment"
                style={{ height: "25%", width: "25%" }}
              />
            </Stack>
            <DialogContentText sx={{ marginTop: "5%", textAlign: "center" }}>
              You can use our payment gateway to pay your fine online. Do you
              wish to continue ?
            </DialogContentText>
          </DialogContent>

          <DialogActions sx={{ marginBottom: "10px" }}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              width="100%"
            >
              <Button
                autoFocus
                onClick={handleClose}
                variant="contained"
                color="error"
                sx={{ width: "20%", textTransform: "none" }}
              >
                No
              </Button>
              <Button
                onClick={pay}
                autoFocus
                variant="contained"
                sx={{ width: "20%", textTransform: "none" }}
              >
                Yes
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
