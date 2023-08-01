import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, useMediaQuery } from "@mui/material";
import Header from "../../components/General user/Header";
import DrawerComponent from "../../components/Traffic police/Appbar";
import Sidebar from "../../components/General user/Sidebar";
import Box from "@mui/material/Box";
import UploadPage from "../../pages/GeneralUser/UploadPage";

export default function GeneralUserRoutes() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: "flex", backgroundColor: "#f3f4f6" }}>
      <CssBaseline />
      {isSmallScreen ? null : <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box>
          {isSmallScreen ? <DrawerComponent /> : <Header />}
          <Routes>
            <Route path="/home" element={<UploadPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
