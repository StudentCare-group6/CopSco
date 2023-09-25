import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { videoFineData } from "../../../data/finesList2";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import VideoCard from "../video_upload/VideoCard";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Payment from '@mui/icons-material/Payment';
import CheckCircle from "@mui/icons-material/CheckCircle";
import ViewFineModal from "./VideoCardModal";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export default function VideoViolationsTable() {


    const ButtonRenderer = ({ status }) => {
        if (status === 'Settled') {
            return (
                <Button
                    startIcon={<CheckCircle />}
                    variant="contained"
                    color="error"
                    className="bg-green-700 rounded-full"
                    sx={{ boxShadow: 'none', textTransform: 'none' }}
                >
                    Fine Paid
                </Button>
            );
        } else {
            return (
                <Button
                    startIcon={<Payment />}
                    variant="contained"
                    color="error"
                    className="bg-slate-900 rounded-full"
                    sx={{ boxShadow: "none", textTransform: "none" }}
                >
                    Pay Fine
                </Button>
            )
        }
    }

    const StatusRenderer = ({ status }) => {
        if (status === 'Settled') {
            return (
                <Button
                    startIcon={<CheckIcon />}
                    variant="contained"
                    color="error"
                    className="bg-green-700 rounded-full"
                    sx={{ boxShadow: 'none', textTransform: 'none' }}
                >
                    Settled
                </Button>
            );
        } else if (status === 'Over Due') {
            return (
                <Button
                    startIcon={<ErrorIcon />}
                    variant="contained"
                    color="error"
                    className="bg-red-700 rounded-full"
                    sx={{ boxShadow: 'none', textTransform: 'none' }}
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
                    sx={{ boxShadow: 'none', textTransform: 'none' }}
                >
                    Pending
                </Button>
            );
        }
    }

    const AppealRenderer = ({ appeal }) => {
        if (appeal === 'Over Due') {
            return (
                <Stack direction="column" >
                    <Typography variant="body2" color="text.secondary" className="text-gray-600">
                        21 Jun 2023, 12:00 PM
                    </Typography>
                    <Button
                        startIcon={<AccessTimeIcon />}
                        className=" rounded-full"
                        color="error"
                        sx={{ boxShadow: 'none', textTransform: 'none' }}
                    >
                        Date passed
                    </Button>
                </Stack>
            );
        } else if (appeal === 'Settled') {
            return (
                <Stack direction="column" >
                    <Typography variant="body2" color="text.secondary" className="text-gray-400">
                        21 Jun 2023, 12:00 PM
                    </Typography>
                    <Button
                        startIcon={<AccessTimeIcon />}
                        className="text-gray-400 rounded-full"
                        sx={{ boxShadow: 'none', textTransform: 'none' }}
                    >
                        --
                    </Button>
                </Stack>
            );
        } else {
            return (
                <Stack direction="column" >
                    <Typography variant="body2" className="text-gray-600">
                        21 Jun 2023, 12:00 PM
                    </Typography>
                    <Button
                        startIcon={<AccessTimeIcon />}
                        className="text-gray-600 rounded-full"
                        sx={{ boxShadow: 'none', textTransform: 'none' }}
                    >
                        19h
                    </Button>
                </Stack>
            );
        }
    }

    const columns = [
        {
            field: "vidName",
            headerName: "Video Evidence",
            height: 'auto',
            padding: '20px',
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <ViewFineModal />
            ),
            flex: 1,
        },
        {
            field: "offence",
            headerName: "Offence",
            flex: 1,
            headerAlign: "center",
           
        }
        ,
        {
            field: "status",
            headerName: "Payment Status",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <StatusRenderer
                    status={params.row.status}
                />
            ),
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        { field: "dueDate", headerName: "Due Date", flex: 1, headerAlign: "center", align: "center" },
        {
            field: "appealBefore",
            headerName: "Appeal Before",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <AppealRenderer
                    appeal={params.row.status}
                />
            )
        },

        {
            field: "actions", headerName: "Actions", flex: 1, headerAlign: "center", align: "center", renderCell: (params) => (
                <ButtonRenderer status={params.row.status} />
            )
        }
    ];

    const rows = videoFineData.map((item, index) => ({
        id: index + 1,
        vidPreview: item.vidPreview,
        offence: item.offence,
        status: item.status,
        location: item.location,
        division: item.division,
        dueDate: item.dueDate,
    }));
    return (

        <div
            style={{
                height: "70vh",
                width: "95%",
                margin: "auto",
            }}

            className='rounded-2xl'
        >
            <DataGrid className='rounded-2xl border-none'
                {...videoFineData}
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
                    ...videoFineData.initialState,
                    sorting: {
                        ...videoFineData.initialState?.sorting,
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
    )
}