import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Admin/Topbar";
import Stack from "@mui/material/Stack";
import RegisterModal from "../../components/Admin/RegisterModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import UserStatusUpdater from "../../components/Admin/UserStatusUpdateModal";

function getRowId(row) {
  return row.userid;
}

export default function UserManagment() {
  const axios = useAxiosPrivate();
  const [data, setData] = useState({});
  const getUsers = async () => {
    try {
      const response = await axios.get("admin/getAllUsers");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      field: "userid",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "contactno",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "nic",
      headerName: "NIC",
      flex: 1,
    },
    {
      field: "datejoined",
      headerName: "Registered Date",
      flex: 1,
    },
    {
      field: "last_login",
      headerName: "Last Login",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status }, row:{userid} }) => {
        return (
         <UserStatusUpdater userrole={status} userid = {userid} />
        );
      }
    }
  ];

  return (
    <Box m="20px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Header title="USERS" subtitle="Manage users" />
      </Stack>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: "#475569",
          },
          "& .MuiDataGrid-columnHeaders": {
            color: "#475569",
            borderBottom: "none",
            backgroundColor: "#cbd5e1",
            color: "#020617",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#e2e8f0",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#cbd5e1",
            color: "white",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#475569",
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
}

