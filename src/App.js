import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Sidebar from "./components/Traffic police/Sidebar";
import Home from "./pages/Traffic police/Home";
import UserDetails from "./pages/Traffic police/UserDetails";
import Notifications from "./pages/Traffic police/Notifications";
import Profile from "./pages/Traffic police/Profile";
import Statistics from "./pages/Traffic police/Statistics";
import Information from "./pages/Traffic police/Information";
import IssueFine from "./pages/Traffic police/IssueFine";
import FineConfirmation from "./pages/Traffic police/FineConfirmation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Traffic police/Header";
import CustomizedSteppers from "./components/Traffic police/Steppers";
import DrawerComponent from "./components/Traffic police/Appbar";
import Login from "./pages/Login";
import "./index.css";

function AppContent() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f3f4f6" }}>
      <CssBaseline />
      {isSmallScreen ? null : <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ height: "100%" }}>
        {isSmallScreen ? <DrawerComponent/> : <Header />}
          
            <Routes>
            {/* <Route path="/" element={<Login/>} /> */}
              <Route path="/home" element={<Home/>} />
              <Route path="/userdetails" element={<UserDetails/>} />
              <Route path="/notifications" element={<Notifications/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/statistics" element={<Statistics/>} />
              <Route path="/information" element={<Information/>} />
              <Route path="/fineform" element={<IssueFine/>} />
              <Route path="/fineconfirmation" element={<FineConfirmation/>} />
            </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default function App() {
  const THEME = createTheme({
    typography: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  // Use media query to detect small screen devices

  return (
    <ThemeProvider theme={THEME}>
      <AppContent />
    </ThemeProvider>
  );
}
