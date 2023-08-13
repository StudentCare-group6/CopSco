import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import TrafficPoliceRoutes from "./setup/routes/TrafficPolice";
import GeneralUserRoutes from "./setup/routes/GeneralUser";
import PoliceOperatorRoutes from "./setup/routes/PoliceOperator";
import PoliceDivisionRoutes from "./setup/routes/PoliceDivision";
import Home from "./pages/Traffic police/Home";
import UserDetails from "./pages/Traffic police/UserDetails";
import Notifications from "./pages/Traffic police/Notifications";
import Profile from "./pages/Traffic police/Profile";
import Statistics from "./pages/Traffic police/Statistics";
import Information from "./pages/Traffic police/Information";
import IssueFine from "./pages/Traffic police/IssueFine";
import FineConfirmation from "./pages/Traffic police/FineConfirmation";
import FinePrint from "./pages/Traffic police/FinePrint";
import UploadPage from "./pages/GeneralUser/UploadPage";
import Login2 from "./pages/Login2";
import { useState, useEffect } from "react";
import Registration from "./pages/GeneralUserRegistration/RegistrationPage";
import Login from "./pages/Login";
import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import useAuth from "./hooks/useAuth";
import PersistLogin from "./components/PersistLogin";
import {DetailsProvider} from "./context/userDetailsContext";
import {FineProvider} from "./context/userFinesContext";
import LandingPage from "./pages/LandingPage";
import UserFines from "./pages/GeneralUser/UserFines";
import PoliceHome from "./pages/PoliceOperator/Home";
import VideoDetails from "./pages/PoliceOperator/VideoDetails";
import AddingOfficers from "./pages/Police Division/AddingPoliceOfficers";


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


  return (
    <ThemeProvider theme={THEME}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<FormProvider><Registration /></FormProvider>} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="copsco/login" element={<Login2/>} />
          {/* protected routes */}

          {/* traffic police routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRole="traffic-police" />}>
              <Route path="traffic-police/" element={<TrafficPoliceRoutes />}>
                <Route path="" element={<DetailsProvider><Home /></DetailsProvider>} />
                <Route path="user-details" element={<DetailsProvider><UserDetails /></DetailsProvider>} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="information" element={<Information />} />
                <Route path="issue-fine" element={<DetailsProvider><FormProvider><IssueFine /></FormProvider></DetailsProvider>} />
                <Route
                  path="fine-confirmation"
                  element={<DetailsProvider><FormProvider><FineConfirmation /></FormProvider></DetailsProvider>}
                />
                <Route path="fine-print" element={<FinePrint />} />
              </Route>
            </Route>

            {/* general user routes */}
            <Route element={<RequireAuth allowedRole="general-user" />}>
              <Route path="general-user/" element={<GeneralUserRoutes />}>
                <Route path="" element={<FineProvider><UploadPage /></FineProvider>} />
                <Route path="fines" element={<FineProvider><UserFines /></FineProvider>} />
              </Route>
            </Route>
            {/* police operator routes */}
            <Route element={<RequireAuth allowedRole="police-operator" />}>
              <Route path="police-operator/" element={<PoliceOperatorRoutes />}>
                <Route path="" element={<PoliceHome />} />
                <Route path="video-details" element={<VideoDetails />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRole="police-division" />}>
              <Route path="police-division/" element={<PoliceDivisionRoutes />}>
                <Route path="" element={<AddingOfficers />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
