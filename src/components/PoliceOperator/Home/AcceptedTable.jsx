import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Button } from "@mui/material";
import VideoCardModal from "./VideoCardModal";
import useFineContext from "../../../hooks/useFineContext";
import image from "../../../images/box.png";
import useGeneralUserContext from "../../../hooks/useGeneralUserContext";
import { useNavigate } from "react-router-dom";
import useVideoContext from "../../../hooks/useVideoContext";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}



export default function AcceptedTable() {

  const { searchKey } = useGeneralUserContext();
  const getRowSpacing = React.useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const navigate = useNavigate();
  const { setSelectedVideo } = useVideoContext();
  const directVideoDetails = (video) => {
    setSelectedVideo(video); // Set the selected video in the context
    localStorage.setItem("selectedVideo", JSON.stringify(video)); // Set the selected video in the local storage
    navigate("/police-operator/video-details");
  };

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
      renderCell: (params) => {
        return (
          <Button
            variant='contained'
            onClick={() => directVideoDetails(params.value)}
            className="bg-slate-900 rounded-full"
            sx={{ boxShadow: 'none', textTransform: 'none' }}
            startIcon={<AssignmentTurnedInOutlinedIcon />}
          >
            Verify
          </Button>
        );
      },
    },
  ];
  const { acceptedUploads } = useFineContext();
  console.log(acceptedUploads);

  if (acceptedUploads.length === 0 || acceptedUploads.length === undefined) {
    return (
      <div className="flex flex-col items-center mt-10">
        <img src={image} alt="empty" className="w-20 h-20" />
        <Typography variant="h6" className="my-5">
          No accepted videos, Don't worry keep uploading !
        </Typography>
      </div>
    );
  } else {
    const rows = acceptedUploads.map((item, index) => ({
      id: index + 1,
      video: [item.thumbnail, item.videokey],
      description: item.description,
      location: item.district + ", " + item.city,
      date: formatDate(item.date),
      actions: item
    }));

    return (
      <div
        style={{
          height: "70vh",
          width: "95%",
          margin: "auto",
        }}
        className="rounded-2xl"
      >
        <Box
          height="70vh"
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
      </div>
    );
  }
}
