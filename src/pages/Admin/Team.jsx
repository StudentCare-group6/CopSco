import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from "../../components/Admin/Topbar";


export default function Team() {
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
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
            align: 'left'
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
            flex: 1,
            renderCell: ({row: {role}}) => {
                return(
                    <Box
                        width = "60%"
                        m = "0 auto"
                        p= "5px"
                        display = "flex"
                        justifyContent = "center"
                        gap={2}
                        backgroundColor = { role === 'admin' ? 'primary.main' : 'success.main'}
                        borderRadius = '4px'
                        >
                            {role === 'admin' && <AdminPanelSettingsOutlinedIcon fontSize="xs" className="text-slate-100"/>}
                            {role === 'general-user' && <LockOpenOutlinedIcon  fontSize="xs"  className="text-slate-100"/>}
                            {role === 'traffic-police' && <SecurityOutlinedIcon fontSize="xs"  className="text-slate-100"/>}
                            <Typography variant="subtitle1" className="text-slate-100">
                                {role}
                            </Typography>
                    </Box>

                )
            }
        },
    ];
    return (
        <Box m='20px'>
            <Header title="ROLES" subtitle="Manage user roles" />
            <Box
            m = '40px 0 0 0'
            height = '75vh'
            sx = {{
                "& .MuiDataGrid-root": {
                    border: 'none',
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: 'none',
                },
                "& .name-column--cell": {
                    color : '#475569',
                },
                "& .MuiDataGrid-columnHeaders": {
                    borderBottom : 'none',
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
            }}
            >
                <DataGrid
                    rows={mockDataTeam}
                    columns={columns}
                />
            </Box>
        </Box>
    )
}