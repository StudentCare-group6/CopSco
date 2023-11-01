import React from "react";
import { Box } from "@mui/material";
import SearchBar from "../../components/Police Division/SearchBar";
import PoliceOfficers from "../../components/Police Division/PoliceOfficers";


export default function Home() {
  
  return (
    
    <Box height = '100vh'>
      <div className="w-[20%] ml-auto mr-44 mt-7" sx={{ height: '100vh' }}>
        <SearchBar />
      </div>
      <PoliceOfficers />
    </Box>
  );
}
