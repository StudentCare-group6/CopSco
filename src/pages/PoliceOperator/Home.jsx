import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import AcceptedTable from "../../components/PoliceOperator/Home/AcceptedTable";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/posts";
import useFineContext from "../../hooks/useFineContext";

export default function UploadPage() {

  const { auth } = useAuth();
  const operatorData = {
    id: auth.user,
  };
  const { acceptedUploads , setAcceptedUploads } = useFineContext();
  
  const getvideos = async () => {
    try {
      const response = await axios.get("violations/viewUploadedViolations");
      console.log(response.data.videoUrls);
      setAcceptedUploads(response.data.videoUrls);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getvideos();
  }, []);

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Box className="py-6">
            
            <h2 className="text-3xl font-bold mb-10">User Reported Violations</h2>
         
            <AcceptedTable />
        </Box>
      </Box>
    </div>
  );
}
