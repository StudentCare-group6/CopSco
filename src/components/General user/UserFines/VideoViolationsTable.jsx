import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { videoFineData } from "../../../data/finesList2";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import VideoCard from "../video_upload/VideoCard";
import ViewFineModal from "./ViewFineModal";


export default function VideoViolationsTable() {

    const VideoCardRenderer = ({ vidName, vidPreview }) => {
        return <VideoCard vidName={vidName} vidPreview={vidPreview} />;
    };

    const ButtonRenderer = ({ status }) => {
        if (status === 'Accepted') {
            return (
                <Stack direction='row' gap={2}>
                    <Button variant="outlined" color="primary">Pay</Button>
                </Stack>
            )
        }
        return (
            <Stack direction='row' gap={2}>
                <ViewFineModal />
            </Stack>
        )
    }

    const StatusRenderer = ({ status }) => {
        if (status === 'Accepted') {
            return (
                <Stack direction='row' alignItems='center' spacing={1} className='px-3 p-2 border border-green-600 rounded-full'>
                    <CircleIcon sx={{ fontSize: 8 }} className='text-green-700' />
                    <Typography component="div" className='text-sm text-green-700'>
                        Accepted
                    </Typography>
                </Stack>

            );
        } else if (status === 'Settled') {
            return (
                <Stack direction='row' alignItems='center' spacing={1} className='px-3 p-2 border border-slate-400 rounded-full'>
                    <CircleIcon sx={{ fontSize: 8 }} className='text-slate-500' />
                    <Typography component="div" className='text-sm text-slate-500'>
                        Settled
                    </Typography>
                </Stack>
            );
        } else if (status === 'Over Due') {
            return (
                <Stack direction='row' alignItems='center' spacing={1} className='px-3 p-2 border border-red-500 rounded-full'>
                    <CircleIcon sx={{ fontSize: 8 }} className='text-red-600' />
                    <Typography component="div" className='text-sm text-red-600'>
                        Over Due
                    </Typography>
                </Stack>
            );
        } else {
            return (
                <Stack direction='row' alignItems='center' spacing={1} className='px-3 p-2 border border-blue-400 rounded-full'>
                    <CircleIcon sx={{ fontSize: 8 }} className='text-blue-500' />
                    <Typography component="div" className='text-sm text-blue-500'>
                        Pending
                    </Typography>
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
            renderCell: (params) => (
                <VideoCardRenderer
                    vidName={params.row.vidName}
                    vidPreview={params.row.vidPreview}
                />
            ),
            width: 200,
        },
        {
            field: "offence",
            headerName: "Offence(s)",
            flex: 1,
            headerAlign: "center",
        }
        ,
        {
            field: "status",
            headerName: "Status",
            width: 150,
            headerAlign: "center",
            renderCell: (params) => (
                <StatusRenderer
                    status={params.row.status}
                />
            ),
        },
        {
            field: "location",
            headerName: "Location",
            width: 150,
            headerAlign: "center"
        },
        {
            field: "division",
            headerName: "Police Division",
            width: 150,
            headerAlign: "center",
        },
        { field: "dueDate", headerName: "Due Date", width: 150, headerAlign: "center" },
        { field: "date", headerName: "Date", width: 150, headerAlign: "center" },
        { field: "time", headerName: "Time", width: 150, headerAlign: "center" },
        {
            field: "actions", headerName: "Actions", width: 150, headerAlign: "center", renderCell: (params) => (
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
        date: item.date,
        time: item.time,
        dueDate: item.dueDate,
    }));
    return (

        <div
            style={{
                height: "70vh",
                width: "95%",
                margin: "auto",
            }}

            className='shadow-md rounded-2xl'
        >
            <DataGrid className='shadow-md rounded-2xl border-none'
                {...videoFineData}
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