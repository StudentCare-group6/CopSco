import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Admin/Topbar";

export default function Dashboard() {
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='space-between'>
                <Header title="DASHBOARD" subtitle="Welcome to the dashboard" />
            </Box>
        </Box>
    );
}