import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Popup from "../../components/General user/video_upload/Popup";
import Stack from "@mui/material/Stack";
import UploadsTable from "../../components/General user/video_upload/UploadsTable";

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
            sx={{ borderBottom: 1, borderColor: "divider" }}
            centered
          >
            <Tab
              label={
                <Badge badgeContent={0} color="primary">
                  Accepted
                </Badge>
              }
              sx={{ fontWeight: "bold" }}
            />

            <Tab
              label={
                <Badge badgeContent={1} color="primary">
                  Pending Review
                </Badge>
              }
              sx={{ fontWeight: "bold" }}
            />

            <Tab
              label={
                <Badge badgeContent={1} color="primary">
                  Rejected
                </Badge>
              }
              sx={{ fontWeight: "bold" }}
            />
          </Tabs>
          <TabPanel
            value={value}
            index={0}
            style={{ overflowY: "auto", height: "80vh" }}
          >
            <UploadsTable />
          </TabPanel>

          <TabPanel value={value} index={1} className="py-10">

          </TabPanel>

          <TabPanel value={value} index={2} className="py-10">

          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
