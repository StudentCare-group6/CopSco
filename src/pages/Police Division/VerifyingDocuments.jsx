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

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Box className="py-6">
          <Stack direction="row" justifyContent="space-between">
            <h2 className="text-3xl font-bold">Verify User Documents</h2>
            <Popup />
          </Stack>

          <Tabs
            // value={value}
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
          <TabPanel>
            <PendingReviews />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
