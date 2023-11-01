import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Payment from "@mui/icons-material/Payment";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ViewFineModal from "./VideoCardModal";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useFineContext from "../../../hooks/useFineContext";
import ResponsiveDialog from "./PaymentModal";
import image from "../../../images/like.png";

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

function hasDatePassed(dueDate) {
  // Parse the dueDate string into a Date object
  const dueDateObj = new Date(dueDate);

  // Get the current date
  const currentDate = new Date();

  // Compare the two dates
  return currentDate > dueDateObj;
}

export default function VideoViolationsTable() {
  const axios = useAxiosPrivate();
  const { setVideoFines } = useFineContext();
  const [details, setDetails] = useState([]);
  const getVideoViolations = async () => {
    try {
      const response = await axios.get("upload/getAppealedFines");
      console.log(response.data);
      setVideoFines(response.data);
      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideoViolations();
  }, []);
  const ButtonRenderer = (props) => {
    if (props.status === 1) {
      return (
        <Button
          startIcon={<CheckCircle />}
          variant="contained"
          color="error"
          className="bg-green-700 rounded-full"
          sx={{ boxShadow: "none", textTransform: "none" }}
        >
          Fine Paid
        </Button>
      );
    } else {
      return <ResponsiveDialog id={props.referenceId} />;
    }
  };

  const StatusRenderer = (props) => {
    const has_passed = hasDatePassed(props.dueDate);

    if (props.status === 1) {
      return (
        <Button
          startIcon={<CheckIcon />}
          variant="contained"
          color="error"
          className="bg-green-700 rounded-full"
          sx={{ boxShadow: "none", textTransform: "none" }}
        >
          Settled
        </Button>
      );
    } else {
      if (has_passed) {
        return (
          <Button
            startIcon={<ErrorIcon />}
            variant="contained"
            color="error"
            className="bg-red-700 rounded-full"
            sx={{ boxShadow: "none", textTransform: "none" }}
          >
            Overdue
          </Button>
        );
      } else {
        return (
          <Button
            startIcon={<PendingActionsIcon />}
            variant="contained"
            color="primary"
            className="rounded-full"
            sx={{ boxShadow: "none", textTransform: "none" }}
          >
            Pending
          </Button>
        );
      }
    }
  };

  const AppealRenderer = (props) => {
    return (
      <Stack direction="column">
        <Typography variant="body2" className="text-gray-600">
          {props.dateString}
        </Typography>
      </Stack>
    );
  };

  const columns = [
    {
      field: "vidName",
      headerName: "Video Evidence",
      height: "auto",
      padding: "20px",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ViewFineModal
          thumbnail={params.value[0]}
          items={params.value[1]}
          isPassed={params.value[2]}
        />
      ),
      flex: 1,
    },
    {
      field: "offence",
      headerName: "Offence",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "appealBefore",
      headerName: "Appealed on",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <AppealRenderer dateString={params.value} />,
    },
  ];

  if (details.length === 0 || details.length === undefined) {
    return (
      <div className="flex flex-col items-center  h-screen">
        <img src={image} alt="empty" className="w-10 h-10" />
        <Typography variant="h6" className="my-5">
          Great News! You have no video fines
        </Typography>
      </div>
    );
  } else {
    const rows = details.map((item, index) => ({
      id: index + 1,
      vidName: [item.thumbnail, item, hasDatePassed(item.due_date)],
      offence: item.description,
      status: [item.status, item.due_date],
      appealBefore: formatDate(item.date),
      location: item.city + ", " + item.district,
      division: item.division,
      dueDate: formatDate(item.due_date),
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
        <DataGrid
          className="rounded-2xl border-none"
          {...details}
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
          rowHeight={120}
          rows={rows}
          columns={columns}
          initialState={{
            ...details.initialState,
            sorting: {
              ...details.initialState?.sorting,
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
