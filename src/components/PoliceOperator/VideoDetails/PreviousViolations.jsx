import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Button } from "@mui/material";
import VideoCardModal from "./VideoCardModal";


function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

export default function AcceptedTable() {

  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);
  const columns = [
    {
      field: "thumbnail",
      headerName: "Image",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <VideoCardModal url={params.value}/>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="column" alignItems="center">
            <Typography variant="body2" fontWeight="bold">
              {params.value}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              color="text.secondary"
            >
              Submitted
            </Typography>
          </Stack>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      thumbnail: 'blob.jpg',
      description: 'helllo',
      location: "Piliyandala",
      date: "2021-10-10"
    },
    {
      id: 2,
      thumbnail: 'thumbnail.jpg',
      description: 'helllo',
      location: "Piliyandala",
      date: "2021-10-10"
    },
    {
      id: 3,
      thumbnail: 'thumbnail.jpg',
      description: 'helllo',
      location: "Piliyandala",
      date: "2021-10-10"
    },
    {
      id: 4,
      thumbnail: 'thumbnail.jpg',
      description: 'helllo',
      location: "Piliyandala",
      date: "2021-10-10"
    },
  ];

  return (
    <Box
      height="45vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {},
        "& .name-column--cell": {
          color: "#475569",
        },
        "& .MuiDataGrid-columnHeaders": {
          borderTop: "solid 1px #e0e0e0",
          fontWeight: "bold",
          fontSize: "16px",
        },
        "& .MuiDataGrid-virtualScroller": {},
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          color: "white",
        },
      }}
    >
      <DataGrid rows={rows} columns={columns} rowHeight={100} getRowSpacing={getRowSpacing} />
    </Box>
  );
}
