import React from "react";
import { Box } from "@mui/material";
import SearchBar from "../../components/Police Division/SearchBar";
import PoliceOfficers from "../../components/Police Division/PoliceOfficers";


export default function Home() {
  
  return (
    
    <Box>
      <div className="w-[20%] ml-auto mr-44 mt-7">
        <SearchBar />
      </div>
      <PoliceOfficers />
    </Box>
  );
}
