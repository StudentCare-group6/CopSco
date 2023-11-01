import { ResponsiveBar } from "@nivo/bar";

const provincesData = {
  provinces: [
    {
      name: "Western Province",
      districts: ["Colombo", "Gampaha", "Kalutara"],
    },
    {
      name: "Central Province",
      districts: ["Kandy", "Nuwara Eliya", "Matale"],
    },
    {
      name: "Southern Province",
      districts: ["Galle", "Matara", "Hambantota"],
    },
    {
      name: "Eastern Province",
      districts: ["Batticaloa", "Trincomalee", "Ampara"],
    },
    {
      name: "Northern Province",
      districts: ["Jaffna", "Kilinochchi", "Mannar"],
    },
    {
      name: "North Western Province",
      districts: ["Kurunegala", "Puttalam"],
    },
    {
      name: "North Central Province",
      districts: ["Anuradhapura", "Polonnaruwa"],
    },
    {
      name: "Uva Province",
      districts: ["Badulla", "Monaragala"],
    },
    {
      name: "Sabaragamuwa Province",
      districts: ["Ratnapura", "Kegalle"],
    },
  ],
};



  export default function BarChart({ isDashboard = false, districtData }) {
    console.log(districtData);
  
    if (!Array.isArray(districtData)) {
      return <div>No data available</div>;
    }
  
    // Create a mapping of districts to provinces
    const districtToProvinceMap = {};
    provincesData.provinces.forEach((province) => {
      province.districts.forEach((district) => {
        districtToProvinceMap[district.toLowerCase()] = province.name;
      });
    });
  
    // Prepare data for a stacked bar chart
    const provinceDistrictCounts = {};
    districtData.forEach((item) => {
      const district = item.district.toLowerCase();
      const province = districtToProvinceMap[district];
      if (!provinceDistrictCounts[province]) {
        provinceDistrictCounts[province] = {};
      }
      provinceDistrictCounts[province][district] = parseInt(item.violationcount);
    });
  
    const stackedData = Object.keys(provinceDistrictCounts).map((province) => ({
      province,
      ...provinceDistrictCounts[province],
    }));
  
    return (
        <ResponsiveBar
          data={stackedData}
          keys={Object.keys(districtToProvinceMap).map((district) => district.toLowerCase())}
          indexBy="province"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Province",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Number of Violations",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          role="application"
          ariaLabel="Violations by Province and District"
        />
      );
    }