import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import useFineContext from "../../../hooks/useFineContext";
import { policeDivisions } from "../Constants";
import image from "../../../images/like.png";


function formatDate(inputDate) {
  const parts = inputDate.split(/[-T:Z]/);

  const year = parts[0];
  const day = parts[2];
  const month = parts[1]; // Adding 1 to adjust for zero-indexed months

  return `${year}/${month}/${day}`;
}

function getDivisionName(divisionId) {
  for (const [divisionName, id] of policeDivisions) {
    if (id === divisionId) {
      return divisionName;
    }
  }
  return "Unknown Division"; // Return a default value if the division ID is not found
}

export default function SpotFinesTable() {
  const { spotFines } = useFineContext();

  if (spotFines.length === 0 || spotFines.length === undefined) {
    return (
      <div className="flex flex-col items-center  h-screen">
        <img src={image} alt="empty" className="w-10 h-10" />
        <Typography variant="h6" className="my-5">
          Great News! You have no Spot Fines
        </Typography>
      </div>
    );
  } else {
    const spotFineData = spotFines.map((fine) => ({
      referenceId: fine.reference_id,
      offence: fine.description,
      status: fine.status,
      division: getDivisionName(fine.police_divisionid),
      date: formatDate(fine.date),
      dueDate: formatDate(fine.due_date),
      amount: `Rs. ${fine.amount.toFixed(2)}`,
      time: fine.time,
      demerits: fine.demerit_points,
    }));

    const StatusRenderer = ({ status }) => {
      if (status == "1") {
        return (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="px-3 p-2 border border-green-600 rounded-full"
          >
            <CircleIcon sx={{ fontSize: 8 }} className="text-green-700" />
            <Typography component="div" className="text-sm text-green-700">
              Settled
            </Typography>
          </Stack>
        );
      } else if (status == "Over Due") {
        return (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="px-3 p-2 border border-red-500 rounded-full"
          >
            <CircleIcon sx={{ fontSize: 8 }} className="text-red-600" />
            <Typography component="div" className="text-sm text-red-600">
              Over Due
            </Typography>
          </Stack>
        );
      } else {
        return (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="px-3 p-2 border border-blue-400 rounded-full"
          >
            <CircleIcon sx={{ fontSize: 8 }} className="text-blue-500" />
            <Typography component="div" className="text-sm text-blue-500">
              Pending
            </Typography>
          </Stack>
        );
      }
    };

    const columns = [
      {
        field: "offence",
        headerName: "Offence(s)",
        flex: 1,
        headerAlign: "center",
      },
      {
        field: "status",
        headerName: "Payment Status",
        width: 150,
        headerAlign: "center",
        renderCell: (params) => <StatusRenderer status={params.row.status} />,
      },
      {
        field: "division",
        headerName: "Police Division",
        width: 200,
        headerAlign: "center",
      },
      {
        field: "amount",
        headerName: "Total Payable",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        width: 150,
        headerAlign: "center",
      },
      {
        field: "demerits",
        headerName: "Demerit Points",
        width: 150,
        headerAlign: "center",
      },
      { field: "date", headerName: "Date", width: 150, headerAlign: "center" },
      { field: "time", headerName: "Time", width: 150, headerAlign: "center" },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        headerAlign: "center",
        renderCell: (params) => {
          return <ResponsiveDialog id={params.value} />;
        },
      },
    ];

    const rows = spotFineData.map((item, index) => ({
      id: index + 1,
      offence: item.offence,
      status: item.status,
      division: item.division,
      amount: item.amount,
      dueDate: item.dueDate,
      date: item.date,
      time: item.time,
      demerits: item.demerits,
      actions: item.referenceId,
    }));
    return (
      <div
        style={{
          height: "70vh",
          width: "95%",
          margin: "auto",
        }}
        className="shadow-md rounded-2xl"
      >
        <DataGrid
          className="shadow-md rounded-2xl border-none"
          {...spotFineData}
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "white",
              color: "#020617",
              fontWeight: "bold",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: "#020617",
            },
            "& .MuiDataGrid-root": {
              backgroundColor: "white",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "white",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            },
          }}
          rowHeight={90}
          rows={rows}
          columns={columns}
          initialState={{
            ...spotFineData.initialState,
            sorting: {
              ...spotFineData.initialState?.sorting,
              sortModel: [
                {
                  field: "rating",
                  sort: "desc",
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}
