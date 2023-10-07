import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Admin/Topbar";
import Stack from '@mui/material/Stack';
import RegisterModal from "../../components/Admin/RegisterModal";

export default function UserManagment() {
    

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
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
            align: 'left',
            flex: 1,
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
            flex: 1
        },
        {
            field: 'policeDivision',
            headerName: 'Police Division',
            flex: 1,
        },
        {
            field: 'nic',
            headerName: 'NIC',
            flex: 1,
        },
        {
            field: 'registeredDate',
            headerName: 'Registered Date',
            flex: 1,
        },
        {
            field: 'lastLogin',
            headerName: 'Last Login',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
        }

    ];

    

    return (
        <Box m='20px'>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Header title="USERS" subtitle="Manage users" />
                <RegisterModal />
            </Stack>
            <Box
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
                        color: '#475569',
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: '#475569',
                    },
                }}
            >
                <DataGrid
                    rows={mockDataContacts}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}