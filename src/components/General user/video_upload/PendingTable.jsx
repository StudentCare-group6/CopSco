import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Button } from "@mui/material";
import VideoCardModal from "./VideoCardModal";
import useFineContext from "../../../hooks/useFineContext";
import image from "../../../images/box.png";
import ResponsiveDialog from "./DeleteDialogBox";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

export default function PendingTable() {
  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);
  const columns = [
    {
      field: "video",
      headerName: "Video",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <VideoCardModal url={params.value[0]} videoKey={params.value[1]} />
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
      field: "reward",
      headerName: "Reward",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: () => {
        return (
          <Button
            startIcon={<PendingActionsIcon />}
            variant="contained"
            color="error"
            className="bg-orange-600 rounded-full"
            sx={{ boxShadow: "none", textTransform: "none" }}
          >
            Pending
          </Button>
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
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: () => {
        return <ResponsiveDialog />;
      },
    },
  ];
  const { pendingUploads } = useFineContext();

  if (pendingUploads.length === 0 || pendingUploads.length === undefined) {
    return (
      <div className="flex flex-col items-center mt-10">
        <img src={image} alt="empty" className="w-20 h-20" />
        <Typography variant="h6" className="my-5">
          No pending videos, Click on the upload button to upload a video
        </Typography>
      </div>
    );
  } else {
    const rows = pendingUploads.map((item, index) => ({
      id: index + 1,
      video: [item.thumbnail, item.videokey],
      description: item.description,
      location: item.district + ", " + item.city,
      date: formatDate(item.reportdate),
    }));

    return (
      <Box
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {},
          "& .name-column--cell": {
            color: "#475569",
            borderTop: "solid 1px #e0e0e0",

          },
          "& .MuiDataGrid-columnHeaders": {
            borderTop: "solid 1px #e0e0e0",
            color: "#020617",
            fontWeight: "extra-bold",
            fontSize: "16px",
          },
          "& .MuiDataGrid-virtualScroller": {},
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            color: "white",
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} rowHeight={120} getRowSpacing={getRowSpacing} />
      </Box>
    );
  }
}
