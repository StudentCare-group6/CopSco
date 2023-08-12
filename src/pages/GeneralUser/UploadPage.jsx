import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import VideoCard from "../../components/General user/video_upload/VideoCard";
import ComplaintDialog from "../../components/General user/video_upload/ComplaintForm";
import EditorDialog from "../../components/General user/video_upload/EditorDialog";

const VideoCardRenderer = ({ vidName, vidPreview }) => {
  return <VideoCard vidName={vidName} vidPreview={vidPreview} />;
};

const data = [
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
    location: "Colombo",
    date: "Jun 24, 2023",
  },
  {
    vidPreview: "violation.jpg",
    vidName:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nobis!",
    status: "Pending Review",
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
  { field: "status", headerName: "Status", width: 150, headerAlign: "center" },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    headerAlign: "center",
  },
  { field: "date", headerName: "Date", width: 150, headerAlign: "center" },
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
              {/* <UploadDialog /> */}
              <EditorDialog />
              {/* <ComplaintDialog /> */}
            </div>

            <div
              style={{
                height: "70vh",
                width: "95%",
                margin: "auto",
                marginTop: "4rem",
              }}
            >
              <DataGrid
                {...data}
                sx={{
                  "&	.MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                    color: "black",
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
