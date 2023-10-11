import React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { videoFineData } from "../../../data/finesList2";
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
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";


function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate;
}


export default function VideoViolationsTable() {

    const axios = useAxiosPrivate();
    const [details, setDetails] = useState([]);
    const getVideoViolations = async () => {
        try {
            const response = await axios.get("upload/video-fines");
            console.log(response.data);
            setDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getVideoViolations();
    }, []);
    const ButtonRenderer = ({ status }) => {
        if (status === 1) {
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

    const AppealRenderer = (props) => {

        const dateString = props.dateString; //21 Jun 2023 format string
        const time = props.time; //12:23 format string
        const inputDate = new Date(dateString + ' ' + time);

        // Calculate the date and time 48 hours from the given date and time
        const resultDate = new Date(inputDate.getTime() + 48 * 60 * 60 * 1000); // 48 hours in milliseconds

        // Calculate the hours remaining until the appeal
        const currentDateTime = new Date();
        const hoursRemaining = Math.round((resultDate - currentDateTime) / (60 * 60 * 1000));

        // Format the result date and time
        const resultDateString = resultDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        const resultTimeString = resultDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const status = props.status;

        if (status === 0) {
            if (hoursRemaining > 0) {
                return (
                    <Stack direction="column" >
                        <Typography variant="body2" className="text-gray-600">
                            {resultDateString}, {resultTimeString}
                        </Typography>
                        <Button
                            startIcon={<AccessTimeIcon />}
                            className="text-gray-600 rounded-full"
                            sx={{ boxShadow: 'none', textTransform: 'none' }}
                        >
                            {hoursRemaining}h
                        </Button>
                    </Stack>
                );
            } else {
                return (
                    <Stack direction="column" >
                        <Typography variant="body2" color="text.secondary" className="text-gray-600">
                            {resultDateString}, {resultTimeString}
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
            }
        } else {
            return (
                <Stack direction="column" >
                    <Button
                        startIcon={<AccessTimeIcon />}
                        className="text-gray-600 rounded-full"
                        sx={{ boxShadow: 'none', textTransform: 'none' }}
                    >
                        Paid
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
                <ViewFineModal thumbnail={params.value} />
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
                    dateString={params.value[0]} time={params.value[1]} status={params.value[2]}
                />
            )
        },

        {
            field: "actions", headerName: "Actions", flex: 1, headerAlign: "center", align: "center",
            renderCell: (params) => (
                <ButtonRenderer status={params.row.status} />
            )
        }
    ];

    const rows = details.map((item, index) => ({
        id: index + 1,
        vidName: item.thumbnail,
        offence: item.description,
        status: item.status,
        appealBefore: [formatDate(item.due_date), item.time, item.status],
        location: item.city + ', ' + item.district,
        division: item.division,
        dueDate: formatDate(item.due_date),
        actions: item.status,
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
    )
}