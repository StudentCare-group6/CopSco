import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Popup from "../../components/General user/video_upload/Popup";
import Stack from "@mui/material/Stack";
import AcceptedTable from "../../components/Police Division/Home/AcceptedTable";
import PendingTable from "../../components/Police Division/Home/PendingTable";
import RejectedTable from "../../components/Police Division/Home//RejectedTable";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFineContext from "../../hooks/useFineContext";
import axios from '../../api/posts';
import useAuth from '../../hooks/useAuth';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UploadPage() {

  const [value, setValue] = useState(0);
  const {auth} = useAuth();
  const userData = {
    police_username: 43956,
  };
  const { acceptedUploads, rejectedUploads, pendingUploads, setAcceptedUploads, setRejectedUploads, setPendingUploads } = useFineContext();
  const getUploads = async () => {
    
    try {
      const response = await axios.get("police-division/viewVerifiedVideos", { params: userData });
      console.log(response.data);
      for (let i = 0; i < response.data.videos.length; i++) {
        const upload = response.data.videos[i];
        console.log(upload);
        const isDuplicate = pendingUploads.some((item) => item.id === upload.id) || acceptedUploads.some((item) => item.id === upload.id) || rejectedUploads.some((item) => item.id === upload.id);
        if (!isDuplicate) {
          if (upload.divisionStatus === "Pending") {
            setPendingUploads((prevPendingUploads) => [...prevPendingUploads, upload]);
          } else if (upload.status === "Accepted") {
            setAcceptedUploads((prevAcceptedUploads) => [...prevAcceptedUploads, upload]);
          } else if (upload.status === "Rejected") {
            setRejectedUploads((prevRejectedUploads) => [...prevRejectedUploads, upload]);
          } else {
            console.log("Error in getting uploads");
          }
        }
        
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUploads();
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Box className="py-6">
          <Stack direction="row" justifyContent="space-between">
            <h2 className="text-3xl font-bold">Manage your Uploads</h2>
            <Popup />
          </Stack>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ borderColor: "divider" }}
            centered
          >
            <Tab
              label={
                <Badge badgeContent={0} color="primary">
                  Pending Fines
                </Badge>
              }
              sx={{ fontWeight: "bold" }}
            />

            <Tab
              label={
                <Badge badgeContent={0} color="primary">
                  Issued Fines
                </Badge>
              }
              sx={{ fontWeight: "bold" }}
            />

            <Tab
              label={
                <Badge badgeContent={0} color="primary">
                  Rejected Fines
                </Badge>
              }
              sx={{ fontWeight: "bold" }}
            />
          </Tabs>
          <TabPanel value={value} index={0} style={{ overflowY: "auto", height: "80vh" }}>
            <AcceptedTable />
          </TabPanel>
          <TabPanel value={value} index={1} style={{ overflowY: "auto", height: "80vh" }}>
            <PendingTable />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ overflowY: "auto", height: "80vh" }}>
            <RejectedTable />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}

