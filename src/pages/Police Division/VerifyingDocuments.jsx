import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Popup from "../../components/General user/video_upload/Popup";
import Stack from "@mui/material/Stack";
import PendingReviews from "../../components/Police Division/DocumentsVerifying/PendingReviews";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

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

export default function VerifyingDocuments() {
  const [value, setValue] = useState(0);

  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth();

  
  const userData = {
    police_username: 43956,
  };

  console.log(auth.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getDocuments = async () => {
    try {
      const response = await axiosPrivate.get("police-division/viewDocuments", { params: userData });
      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Box className="py-6">
          <Stack direction="row" justifyContent="space-between">
            <h2 className="text-3xl font-bold">Verify User Documents</h2>
            <Popup />
          </Stack>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ borderBottom: 1, borderColor: "divider" }}
            centered
          >
            <Tab
              label={
                <Badge badgeContent={0} color="primary">
                  Pending Review
                </Badge>
              }
              sx={{ fontWeight: "bold" }}
            />
          </Tabs>
          <TabPanel value={value} index={0} className="py-10">
            <PendingReviews />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
