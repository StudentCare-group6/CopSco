import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TrafficPoliceRoutes from "./setup/routes/TrafficPolice";
import Home from "./pages/Traffic police/Home";
import UserDetails from "./pages/Traffic police/UserDetails";
import Notifications from "./pages/Traffic police/Notifications";
import Profile from "./pages/Traffic police/Profile";
import Statistics from "./pages/Traffic police/Statistics";
import Information from "./pages/Traffic police/Information";
import IssueFine from "./pages/Traffic police/IssueFine";
import FineConfirmation from "./pages/Traffic police/FineConfirmation";
import FinePrint from "./pages/Traffic police/FinePrint";
import { useState,useEffect } from "react";
import FirstPage from "./pages/GeneralUserRegistration/FirstPage";
import SecondPage from "./pages/GeneralUserRegistration/SecondPage";
import FifthPage from "./pages/GeneralUserRegistration/FifthPage";
import ThirdPage from "./pages/GeneralUserRegistration/ThirdPage";
import FourthPage from "./pages/GeneralUserRegistration/FourthPage";
import FinalPage from "./pages/GeneralUserRegistration/FinalPage";
import RegistrationPage from "./pages/GeneralUserRegistration/RegistrationPage";
import Login from "./pages/Login";
import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";


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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <ThemeProvider theme={THEME}>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/home"/>) } />
        <Route path="/registration" element={<RegistrationPage  />}>
            <Route path="" element={<FirstPage />} />
            <Route path="second" element={<SecondPage />} />
            <Route path="third" element={<ThirdPage />} />
            <Route path="fourth" element={<FourthPage />} />
            <Route path="fifth" element={<FifthPage />} />
            <Route path="final" element={<FinalPage />} />
        </Route>
        <Route path="/" element={isAuthenticated?(<TrafficPoliceRoutes setAuth={setAuth}/>):(<Navigate to = "/login"/> )}>
            <Route path="home" element={<Home />} />
            <Route path="userdetails" element={<UserDetails />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="information" element={<Information />} />
            <Route path="fineform" element={<IssueFine />} />
            <Route path="fineconfirmation" element={<FineConfirmation />} />
            <Route path="fineprint" element={<FinePrint />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
