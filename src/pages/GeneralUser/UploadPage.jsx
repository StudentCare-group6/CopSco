import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import VideoCard2 from "../../components/General user/video_upload/VideoCard2";
import Popup from "../../components/General user/video_upload/Popup";
import Stack from "@mui/material/Stack";
import video1 from "../../components/General user/video_upload/video1.mp4";
import video2 from "../../components/General user/video_upload/video 2.mp4";
import video3 from "../../components/General user/video_upload/video 3.mp4";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import {Typography} from "@mui/material";

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

      const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell'
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            renderCell: ({row: {role}}) => {
                return(
                  <VideoCard2
                  title="Driver trying to run a traffic light in Bambalapitiya"
                  reward="300"
                  rating="3"
                  url={video1}
                />

                )
            }
        },
    ];
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
            <Box
              m='40px 0 0 0'
              height='75vh'
              sx={{
                "& .MuiDataGrid-root": {
                  border: 'none',
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: 'none',
                },
                "& .name-column--cell": {
                  color: '#475569',
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: 'none',
                  backgroundColor: '#cbd5e1',
                  color: '#020617',
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: '#e2e8f0'
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: 'none',
                  backgroundColor: '#cbd5e1',
                  color: 'white',
                },
              }}
            >
              <DataGrid
                rows={mockDataTeam}
                columns={columns}
                rowHeight={210}
              />
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1} className="py-10">
            <VideoCard2
              title="Driver trying to run a traffic light in Bambalapitiya"
              reward="300"
              rating="3"
              url={video1}
            />
            <VideoCard2
              title="Driver ignoring pedestrian crosswalk in Colombo"
              reward="200"
              rating="2"
              url={video2}
            />
            <VideoCard2
              title="Reckless driving on Galle Road"
              reward="600"
              rating="5"
              url={video3}
            />
            <VideoCard2
              title="Red light violation at Liberty Roundabout"
              reward="1000"
              rating="3"
              url={video1}
            />
            <VideoCard2
              title="Near miss incident on Duplication Road"
              reward="300"
              rating="4"
              url={video2}
            />
          </TabPanel>

          <TabPanel value={value} index={2} className="py-10">
            <VideoCard2
              title="Driver trying to run a traffic light in Bambalapitiya"
              reward="300"
              rating="3"
              url={video1}
            />
            <VideoCard2
              title="Driver ignoring pedestrian crosswalk in Colombo"
              reward="200"
              rating="2"
              url={video2}
            />
            <VideoCard2
              title="Reckless driving on Galle Road"
              reward="600"
              rating="5"
              url={video3}
            />
            <VideoCard2
              title="Red light violation at Liberty Roundabout"
              reward="1000"
              rating="3"
              url={video1}
            />
            <VideoCard2
              title="Near miss incident on Duplication Road"
              reward="300"
              rating="4"
              url={video2}
            />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
