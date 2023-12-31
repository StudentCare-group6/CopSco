import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Button } from "@mui/material";
import VideoCardModal from "./VideoCardModal";
import useFineContext from "../../../hooks/useFineContext";
import image from "../../../images/box.png";
import ResponsiveDialog from "./RemoveDialogBox";
import WalletIcon from "@mui/icons-material/Wallet";
import useGeneralUserContext from "../../../hooks/useGeneralUserContext";
import { useEffect, useState } from "react";

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
  const columns = [
    {
      field: "video",
      headerName: "Video",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <VideoCardModal thumbnail={params.value[0]} caseId={params.value[1]}/>
        );
      },
    },
    {
      field: "description",
      headerName: "Operator Remarks",
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
      field: "caseid",
      headerName: "Case ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="column" alignItems="center" className = 'bg-zinc-300 rounded-lg' sx = {{padding:2}}>
            <Typography variant="body2" fontWeight="bold">
              {params.value}
            </Typography>
          </Stack>
        );
      }

    },
  ];
  const { pendingUploads } = useFineContext();
//   const [filteredRows, setFilteredRows] = useState([]);
//   useEffect(() => {
//     // Filter rows based on the search key
//     const newFilteredRows = acceptedUploads.filter((item) => {
//       const description = item.description.toLowerCase();
//       return description.includes(searchKey.toLowerCase());
//     });

//     setFilteredRows(newFilteredRows);
//   }, [searchKey, acceptedUploads]);

  if (pendingUploads.length === 0 || pendingUploads.length === undefined) {
    return (
      <div className="flex flex-col items-center mt-10">
        <img src={image} alt="empty" className="w-20 h-20" />
        <Typography variant="h6" className="my-5">
          No accepted videos, Don't worry keep uploading !
        </Typography>
      </div>
    );
  } else {
    const rows = pendingUploads.map((item, index) => ({
      id: index + 1,
      video: [item.thumbnail, item.caseID],
      description: item.remarks,
      reward: "500",
      location: item.district + ", " + item.city,
      date: formatDate(item.date),
      caseid: item.caseID
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