import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { uploadData } from "../../../data/finesList2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoCardModal from './VideoCardModal';


export default function UploadsTable() {
    const columns = [
        {
            field: 'video',
            headerName: 'Video',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: () => {
                return (
                    <VideoCardModal />
                )
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            headerAlign: 'center',
            align: 'left',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Typography variant="body2" fontWeight='bold'>
                        {params.value}
                    </Typography>
                )
            }
        },
        {
            field: 'reward',
            headerName: 'Reward',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Stack className='rounded-full bg-green-800 p-2'>
                        <Typography variant="body2" color='white'>
                            {params.value}
                        </Typography>
                    </Stack>

                )
            }
        },
        {
            field: 'location',
            headerName: 'Location',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Typography variant="body2" fontWeight='bold'>
                        {params.value}
                    </Typography>
                )
            }
        },
        {
            field: 'date',
            headerName: 'Date',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Stack direction="column" alignItems='center'>
                        <Typography variant="body2" fontWeight='bold'>
                            {params.value}
                        </Typography>
                        <Typography variant="body2" fontWeight='bold' color="text.secondary">
                            Submitted
                        </Typography>
                    </Stack>
                )
            }

        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: () => {
                return (

                    <Button startIcon={<DeleteIcon />} variant="outlined" color='primary' >
                        Remove
                    </Button>

                )
            }
        }

    ];
    const rows = uploadData.map((item, index) => ({
        id: index + 1,
        video: item.video,
        description: item.description,
        reward: item.reward,
        location: item.location,
        date: item.date
    }));
    return (
        <Box
            height='70vh'
            sx={{
                "& .MuiDataGrid-root": {
                    border: 'none',
                },
                "& .MuiDataGrid-cell": {

                },
                "& .name-column--cell": {
                    color: '#475569',

                },
                "& .MuiDataGrid-columnHeaders": {
                    borderTop: 'solid 1px #e0e0e0',
                    color: '#020617',
                    fontWeight: 'extra-bold',
                    fontSize: '16px',
                },
                "& .MuiDataGrid-virtualScroller": {
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: 'none',
                    color: 'white',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={120}
            />
        </Box >
    )
}
