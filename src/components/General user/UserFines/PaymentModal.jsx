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
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Stack from "@mui/material/Stack";
import paymentImg from "../../../images/credit-card.png";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {Payhere, AccountCategory} from "@payhere-js-sdk/client";
import {Customer, CurrencyType, PayhereCheckout, CheckoutParams} from '@payhere-js-sdk/client';

function onPayhereCheckoutError(errorMsg) {
  alert(errorMsg)
}

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
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
      const response = await axios.get("payfine/payfine_online", {
        params: fineData,
      });
      console.log(response.data[0]);
      Payhere.init(response.data[0].merchant_id,AccountCategory.SANDBOX);
      const customer = new Customer({
        first_name: "Demo",
        last_name: "User",
        phone: "+94771234567",
        email: "user@example.com",
        address: "No. 50, Highlevel Road",
        city: "Panadura",
        country: "Sri Lanka",
      })
      const checkoutData = new CheckoutParams({
        returnUrl: 'http://localhost:3000/general-user/fines',
        cancelUrl: 'http://localhost:3000/general-user/fines',
        notifyUrl: 'http://localhost:3000/general-user/fines',
        order_id: response.data[0].reference_id,
        itemTitle: 'Spot Fine Payment',
        currency: CurrencyType.LKR,
        amount: response.data[0].amount,
        hash : response.data[0].hash,
      })
      const checkout = new PayhereCheckout(customer,checkoutData,onPayhereCheckoutError)
      checkout.start()
     
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

