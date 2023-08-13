import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import VideoCard from "../../components/General user/video_upload/VideoCard";
import ComplaintDialog from "../../components/General user/video_upload/ComplaintForm";
import EditorDialog from "../../components/General user/video_upload/EditorDialog";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import UploadDialog from "../../components/General user/video_upload/UploadDialog";


const VideoCardRenderer = ({ vidName, vidPreview }) => {
  return <VideoCard vidName={vidName} vidPreview={vidPreview} />;
};

const StatusRenderer = ({ status }) => {
  if (status == '1') {
    return (
      <Stack direction='row' alignItems='center' spacing={1} className='px-3 p-2 border border-green-600 rounded-full'>
        <CircleIcon sx={{ fontSize: 8 }} className='text-green-700' />
        <Typography component="div" className='text-sm text-green-700'>
          Verified
        </Typography>
      </Stack>

    );
  } else if (status == '3') {
    return (
      <Stack direction='row' alignItems='center' spacing={1} className='px-3 p-2 border border-orange-400 rounded-full'>
        <CircleIcon sx={{ fontSize: 8 }} className='text-orange-400' />
        <Typography component="div" className='text-sm text-orange-400'>
          Rejected
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

const data = [
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "1",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "1",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "2",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "2",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "3",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "1",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "2",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "1",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
];

const columns = [
  {
    field: "vidName",
    headerName: "Video Name",
    flex: 1,
    headerAlign: "center",
    renderCell: (params) => (
      <VideoCardRenderer
        vidName={params.row.vidName}
        vidPreview={params.row.vidPreview}
      />
    ),
  },
  {
    field: "status", headerName: "Review Status", width: 200, headerAlign: "center",
    renderCell: (params) => (
      <StatusRenderer
        status={params.row.status}
      />
    )
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    headerAlign: "center",
  },
  { field: "date", headerName: "Date", width: 200, headerAlign: "center" },
];

export default function UploadPage() {
  const rows = data.map((item, index) => ({
    id: index + 1,
    vidPreview: item.vidPreview,
    vidName: item.vidName,
    status: item.status,
    location: item.location,
    date: item.date,
  }));

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh' }}>
        <Box>
          <div className="flex flex-row justify-between mx-10 mt-14">
            <h1 className="text-3xl font-bold">Your Uploads</h1>
            <UploadDialog />
            {/* <EditorDialog /> */}
            {/* <ComplaintDialog /> */}
          </div>

          <div
            style={{
              height: "70vh",
              width: "95%",
              margin: "auto",
              marginTop: "2rem",
            }}
            className='shadow-md rounded-2xl'
          >
            <DataGrid className='shadow-md rounded-2xl border-none'
              {...data}
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
              rowHeight={100}
              rows={rows}
              columns={columns}
              initialState={{
                ...data.initialState,
                sorting: {
                  ...data.initialState?.sorting,
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
        </Box>
      </Box>
    </div>
  );
}
