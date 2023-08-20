import * as React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Header from "../../components/Admin/Topbar";
import BarChart from "../../components/Admin/BarChart";
import PieChart from "../../components/Admin/PieChart";
import LineChart from "../../components/Admin/LineChart";
import RadarChart from "../../components/Admin/RadarChart";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../../components/Admin/StatBox";
import ProgressCircle from "../../components/Admin/ProgressCircle";
import { Pie } from "@nivo/pie";


const Dashboard = () => {

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className='bg-slate-300'
                >
                    <StatBox
                        title="12,361"
                        subtitle="Emails Sent"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <EmailIcon
                                sx={{ color: '#334155', fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className='bg-slate-300'
                >
                    <StatBox
                        title="431,225"
                        subtitle="Sales Obtained"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <PointOfSaleIcon
                                sx={{ color: '#334155', fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className='bg-slate-300'
                >
                    <StatBox
                        title="32,441"
                        subtitle="New Clients"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <PersonAddIcon
                                sx={{ color: '#334155', fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className='bg-slate-300'
                >
                    <StatBox
                        title="1,325,134"
                        subtitle="Traffic Received"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <TrafficIcon
                                sx={{ color: '#334155', fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    className='bg-slate-300'
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="600"
                                className="text-slate-600"
                            >
                                Revenue Generated
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                className="text-slate-700"
                            >
                                Rs. 59,342.32
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: '#334155' }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    className='bg-slate-300'
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid #f3f4f6`}
                        colors='#334155'
                        p="15px"
                    >
                        <Typography color='#334155' variant="h6" fontWeight="600">
                            Recent Transactions
                        </Typography>
                    </Box>
                    {mockTransactions.map((transaction, i) => (
                        <Box
                            key={`${transaction.txId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid #f3f4f6`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color='#334155'
                                    variant="body1"
                                    fontWeight="600"
                                >
                                    {transaction.txId}
                                </Typography>
                                <Typography className="text-slate-500">
                                    {transaction.user}
                                </Typography>
                            </Box>
                            <Box color='#334155'>{transaction.date}</Box>
                            <Box
                                className="bg-green-700"
                                p="5px 10px"
                                borderRadius="4px"
                                color='#f3f4f6'
                            >
                                Rs.{transaction.cost}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    className='bg-slate-300'
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600" className="text-slate-700">
                        Campaign
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" />
                        <Typography
                            variant="h5"
                            color='#334155'
                            sx={{ mt: "15px" }}
                        >
                            Rs. 48,352 revenue generated
                        </Typography>
                        <Typography>Includes extra misc expenditures and costs</Typography>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    className='bg-slate-300'
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                        className="text-slate-700"
                    >
                        Sales Quantity
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    className='bg-slate-300'
                    padding="30px"
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        className="text-slate-700"
                        sx={{ marginBottom: "15px" }}
                    >
                        Geography Based Traffic
                    </Typography>
                    <Box height="200px">
                        <PieChart isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;