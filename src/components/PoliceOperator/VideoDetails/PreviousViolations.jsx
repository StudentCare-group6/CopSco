import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Button } from "@mui/material";
import VideoCardModal from "./VideoCardModal";
import axios from "../../../api/posts";
import { useEffect, useState } from "react";
import useFormContext from "../../../hooks/useFormContext";
import image from "../../../images/box.png";

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

export default function AcceptedTable() {

  const { getValues } = useFormContext();
  const [pastData, setPastData] = useState([]);

  const violationData = {
    violations: getValues("offences"),
    vehicle_no: getValues("vehicleNo")
  };

  const getPastViolations = async () => {
    try {
      const response = await axios.get("violations/getPastViolations", {
        params: violationData
      });
      setPastData(response.data.pastViolations);
      console.log(response.data.pastViolations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPastViolations(); // Fetch data when the component mounts
  }, []);

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
          <VideoCardModal url={params.value} />
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

  if (pastData == undefined ) {
    return (
      <div className="flex flex-col items-center mt-10">
        <img src={image} alt="empty" className="w-20 h-20" />
        <Typography variant="subtitle1" className="my-5">
          No past uploads related to this vehicle
        </Typography>
      </div>
    );
  } else {
    const rows = pastData.map((item, index) => ({
      id: index + 1,
      thumbnail: item.image,
      description: item.description,
      location: item.district + ', ' + item.city,
      date: formatDate(item.date)
    }))

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

}
