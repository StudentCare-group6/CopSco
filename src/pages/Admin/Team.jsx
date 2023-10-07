import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Admin/Topbar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import RegisterModal from "../../components/Admin/RegisterModal";
import Stack from "@mui/system/Stack";

function getRowId(row) {
  return row.officerid;
}

export default function Team() {
  const axios = useAxiosPrivate();
  const [data, setData] = useState({});
  const getUsers = async () => {
    try {
      const response = await axios.get("admin/getUsers");
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
      field: "officerid",
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
      field: "nic",
      headerName: "NIC",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
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
      field: "location",
      headerName: "Division",
      flex: 1,
    },
    {
      field: "userrole",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { userrole } }) => {
        return (
          <Box
            width="100%"
            justifyContent="center"
            m="0 auto"
            p="5px"
            display="flex"
            gap={2}
            backgroundColor={
              userrole === "admin" ? "primary.main" : "success.main"
            }
            borderRadius="4px"
          >
            {/* {userrole === "admin" && (
              <AdminPanelSettingsOutlinedIcon
                fontSize="sm"
                className="text-slate-100"
              />
            )}
            {userrole === "general-user" && (
              <LockOpenOutlinedIcon fontSize="sm" className="text-slate-100" />
            )}
            {userrole === "traffic-police" && (
              <SecurityOutlinedIcon fontSize="sm" className="text-slate-100" />
            )} */}
            <Typography variant="subtitle1" className="text-slate-100">
              {userrole}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // const rows = data.map((item,index)=>({

  // }))

  return (
    <Box m="20px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Header title="ROLES" subtitle="Manage user roles" />
        <RegisterModal />
      </Stack>
      <Box
        m="40px 0 0 0"
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
        }}
      >
        <DataGrid getRowId={getRowId} rows={data} columns={columns} />
      </Box>
    </Box>
  );
}
