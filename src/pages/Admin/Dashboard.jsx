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
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../..//api/posts";

function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await axios.get("admin/");
      console.log(response.data);
      setData(response.data);
      setLoading(false); // Mark loading as false when data is received
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const extractedData = {
    id: "Violations",
    color: "#020617",
    data: months.map((month, index) => ({
      x: month,
      y:
        parseInt(
          (data.violationCountByMonth || []).find(
            (item) => item.month_name === month
          )?.violationcount,
          10
        ) || 0,
    })),
  };

  const videoData = data.videoCountByStatus;
  const fineData = data.fineCountByStatus || []; // Ensure it's an array or set it to an empty array if undefined

  const transformedData = fineData.map((item, index) => ({
    id:
      item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase(),
    label:
      item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase(),
    value: parseInt(item.finecount),
    color: `hsl(${index * 100}, 70%, 50%)`, // You can adjust the color generation based on your requirements
  }));

  const districtData = data.violationCountByDistrict;
  console.log(districtData);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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
          className="bg-slate-300"
        >
          <StatBox
            title={
              loading
                ? "Loading..."
                : data.usersCount
                ? data.usersCount.usercount
                : "N/A"
            }
            subtitle="User Count"
            progress="0.75"
            increase="+14%"
            icon={<EmailIcon sx={{ color: "#334155", fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="bg-slate-300"
        >
          <StatBox
            title={
              loading
                ? "Loading..."
                : data.fineSum
                ? "Rs." + data.fineSum.finesum
                : "N/A"
            }
            subtitle="Total Fines"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon sx={{ color: "#334155", fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="bg-slate-300"
        >
          <StatBox
            title={
              loading
                ? "Loading..."
                : data.videoCount
                ? data.videoCount.videocount
                : "N/A"
            }
            subtitle="Videos Uploaded"
            progress="0.30"
            increase="+5%"
            icon={<PersonAddIcon sx={{ color: "#334155", fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="bg-slate-300"
        >
          <StatBox
            title={
              loading
                ? "Loading..."
                : data.violationCount
                ? data.violationCount.violationcount
                : "N/A"
            }
            subtitle="Total violations"
            progress="0.80"
            increase="+43%"
            icon={<TrafficIcon sx={{ color: "#334155", fontSize: "26px" }} />}
          />
        </Box>

        {/* ROW 2 */}
        <Box gridColumn="span 8" gridRow="span 2" className="bg-slate-300">
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
                Violations
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: "#334155" }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} lineData={extractedData} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          className="bg-slate-300"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid #f3f4f6`}
            colors="#334155"
            p="15px"
          >
            <Typography color="#334155" variant="h6" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {videoData && videoData.length > 0 ? (
            videoData.map((transaction, i) => (
              <Box
                key={`${transaction.description}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid #f3f4f6`}
                p="15px"
              >
                <Box>
                  <Typography color="#334155" variant="body1" fontWeight="600">
                    {transaction.description}
                  </Typography>
                  <Typography className="text-slate-500">
                    {transaction.vehicle_number}
                  </Typography>
                </Box>
                <Box color="#334155">{formatDate(transaction.date)}</Box>
                <Box
                  className="bg-green-700"
                  p="5px 10px"
                  borderRadius="4px"
                  color="#f3f4f6"
                >
                  Rs.{transaction.amount}
                </Box>
              </Box>
            ))
          ) : (
            <p>No video data available</p>
          )}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          className="bg-slate-300"
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
            <Typography variant="h5" color="#334155" sx={{ mt: "15px" }}>
              Rs. 48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" className="bg-slate-300">
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
            className="text-slate-700"
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} districtData={districtData} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          className="bg-slate-300"
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
            <PieChart isDashboard={true} pieData={transformedData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
