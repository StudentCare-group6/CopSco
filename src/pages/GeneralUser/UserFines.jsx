import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from "@mui/material"; // Import from @mui/material

// import finesList2 from "../../data/finesList2";
// import VideoPlayer from "../../components/General user/UserFines";

export default function UserFines() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="py-6">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="lab API tabs example"
        sx={{ borderBottom: 1, borderColor: "divider" }}
        centered
      >
        <Tab label="Video violations" sx={{ fontWeight: "bold" }} />
        <Tab label="On-spot violations" sx={{ fontWeight: "bold" }} />
      </Tabs>
      <TabPanel value={value} index={0} className="py-10">
        {/* Your content for the first tab */}
      </TabPanel>
      <TabPanel value={value} index={1} className="py-10">
        {/* Your content for the second tab */}
      </TabPanel>
    </Box>
  );
}

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
