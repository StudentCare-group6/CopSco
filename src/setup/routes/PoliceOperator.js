import * as React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline, useMediaQuery } from "@mui/material";
import Header from "../../components/PoliceOperator/Header";
import DrawerComponent from "../../components/Traffic police/Appbar";
import Sidebar from "../../components/PoliceOperator/Sidebar";
import Box from "@mui/material/Box";

export default function PoliceOperatorRoutes() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: "flex", backgroundColor: "#f3f4f6" }}>
      <CssBaseline />
      {isSmallScreen ? null : <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box>
          {isSmallScreen ? <DrawerComponent /> : <Header />}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
