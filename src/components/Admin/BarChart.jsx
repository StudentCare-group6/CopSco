// import { ResponsiveBar } from '@nivo/bar';
// import { mockBarData as data } from '../../data/mockData';

// const data = [
//     {
//       country: "AD",
//       "hot dog": 22,
//       "hot dogColor": "hsl(352, 70%, 50%)",
//       burger: 112,
//       burgerColor: "hsl(112, 70%, 50%)",
//       sandwich: 90,
//       sandwichColor: "hsl(317, 70%, 50%)",
//       kebab: 54,
//       kebabColor: "hsl(262, 70%, 50%)",
//       fries: 68,
//       friesColor: "hsl(296, 70%, 50%)",
//       donut: 62,
//       donutColor: "hsl(128, 70%, 50%)",
//     },
//     {
//       country: "AE",
//       "hot dog": 200,
//       "hot dogColor": "hsl(205, 70%, 50%)",
//       burger: 125,
//       burgerColor: "hsl(339, 70%, 50%)",
//       sandwich: 18,
//       sandwichColor: "hsl(273, 70%, 50%)",
//       kebab: 177,
//       kebabColor: "hsl(210, 70%, 50%)",
//       fries: 115,
//       friesColor: "hsl(163, 70%, 50%)",
//       donut: 63,
//       donutColor: "hsl(164, 70%, 50%)",
//     },
//     {
//       country: "AF",
//       "hot dog": 193,
//       "hot dogColor": "hsl(109, 70%, 50%)",
//       burger: 142,
//       burgerColor: "hsl(121, 70%, 50%)",
//       sandwich: 55,
//       sandwichColor: "hsl(78, 70%, 50%)",
//       kebab: 75,
//       kebabColor: "hsl(121, 70%, 50%)",
//       fries: 178,
//       friesColor: "hsl(155, 70%, 50%)",
//       donut: 94,
//       donutColor: "hsl(263, 70%, 50%)",
//     },
//     {
//       country: "AG",
//       "hot dog": 88,
//       "hot dogColor": "hsl(77, 70%, 50%)",
//       burger: 111,
//       burgerColor: "hsl(100, 70%, 50%)",
//       sandwich: 147,
//       sandwichColor: "hsl(350, 70%, 50%)",
//       kebab: 27,
//       kebabColor: "hsl(17, 70%, 50%)",
//       fries: 86,
//       friesColor: "hsl(42, 70%, 50%)",
//       donut: 80,
//       donutColor: "hsl(345, 70%, 50%)",
//     },
//     {
//       country: "AI",
//       "hot dog": 35,
//       "hot dogColor": "hsl(213, 70%, 50%)",
//       burger: 193,
//       burgerColor: "hsl(282, 70%, 50%)",
//       sandwich: 161,
//       sandwichColor: "hsl(250, 70%, 50%)",
//       kebab: 159,
//       kebabColor: "hsl(320, 70%, 50%)",
//       fries: 196,
//       friesColor: "hsl(49, 70%, 50%)",
//       donut: 92,
//       donutColor: "hsl(132, 70%, 50%)",
//     },
//     {
//       country: "AL",
//       "hot dog": 167,
//       "hot dogColor": "hsl(326, 70%, 50%)",
//       burger: 132,
//       burgerColor: "hsl(98, 70%, 50%)",
//       sandwich: 31,
//       sandwichColor: "hsl(170, 70%, 50%)",
//       kebab: 153,
//       kebabColor: "hsl(54, 70%, 50%)",
//       fries: 142,
//       friesColor: "hsl(219, 70%, 50%)",
//       donut: 50,
//       donutColor: "hsl(10, 70%, 50%)",
//     },
//     {
//       country: "AM",
//       "hot dog": 40,
//       "hot dogColor": "hsl(99, 70%, 50%)",
//       burger: 77,
//       burgerColor: "hsl(102, 70%, 50%)",
//       sandwich: 190,
//       sandwichColor: "hsl(151, 70%, 50%)",
//       kebab: 65,
//       kebabColor: "hsl(309, 70%, 50%)",
//       fries: 13,
//       friesColor: "hsl(80, 70%, 50%)",
//       donut: 192,
//       donutColor: "hsl(96, 70%, 50%)",
//     },
//   ];

// export default function BarChart({isDashboard = false}) {
//     return (
//         <ResponsiveBar
//             data={data}
//             theme = {{
//                 axis: {
//                     domain: {
//                         line: {
//                             stroke: "#1e293b",
//                         }
//                     },
//                     legend: {
//                         text: {
//                             fill: "#475569",
//                         }
//                     },
//                     ticks: {
//                         line: {
//                             stroke: "#1e293b",
//                             strokeWidth: 1,
//                         },
//                         text: {
//                             fill: "#475569",
//                         }
//                     }
//                 },
//                 legends: {
//                     text: {
//                         fill: "#475569",
//                     }
//                 },
//             }}
//             keys={[
//                 'hot dog',
//                 'burger',
//                 'sandwich',
//                 'kebab',
//                 'fries',
//                 'donut'
//             ]}
//             indexBy="country"
//             margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//             padding={0.3}
//             valueScale={{ type: 'linear' }}
//             indexScale={{ type: 'band', round: true }}
//             colors={{ scheme: 'nivo' }}
//             defs={[
//                 {
//                     id: 'dots',
//                     type: 'patternDots',
//                     background: 'inherit',
//                     color: '#38bcb2',
//                     size: 4,
//                     padding: 1,
//                     stagger: true
//                 },
//                 {
//                     id: 'lines',
//                     type: 'patternLines',
//                     background: 'inherit',
//                     color: '#eed312',
//                     rotation: -45,
//                     lineWidth: 6,
//                     spacing: 10
//                 }
//             ]}
//             borderColor={{
//                 from: 'color',
//                 modifiers: [
//                     [
//                         'darker',
//                         1.6
//                     ]
//                 ]
//             }}
//             axisTop={null}
//             axisRight={null}
//             axisBottom={{
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//                 legend: isDashboard ? undefined : 'country',
//                 legendPosition: 'middle',
//                 legendOffset: 32
//             }}
//             axisLeft={{
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//                 legend: isDashboard ? undefined : 'food',
//                 legendPosition: 'middle',
//                 legendOffset: -40
//             }}
//             enableLabel={false}
//             labelSkipWidth={12}
//             labelSkipHeight={12}
//             labelTextColor={{
//                 from: 'color',
//                 modifiers: [
//                     [
//                         'darker',
//                         1.6
//                     ]
//                 ]
//             }}
//             legends={[
//                 {
//                     dataFrom: 'keys',
//                     anchor: 'bottom-right',
//                     direction: 'column',
//                     justify: false,
//                     translateX: 120,
//                     translateY: 0,
//                     itemsSpacing: 2,
//                     itemWidth: 100,
//                     itemHeight: 20,
//                     itemDirection: 'left-to-right',
//                     itemOpacity: 0.85,
//                     symbolSize: 20,
//                     effects: [
//                         {
//                             on: 'hover',
//                             style: {
//                                 itemOpacity: 1
//                             }
//                         }
//                     ]
//                 }
//             ]}
//             role="application"
//             ariaLabel="Nivo bar chart demo"
//             barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
//         />
//     )

// }

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
  
    // Organize the data by province
    const provinceCounts = {};
    districtData.forEach((item) => {
      const district = item.district.toLowerCase();
      const province = districtToProvinceMap[district];
      if (!provinceCounts[province]) {
        provinceCounts[province] = 0;
      }
      provinceCounts[province] += parseInt(item.violationcount);
    });
  
    const data = Object.entries(provinceCounts).map(([province, count]) => ({
      province,
      count,
    }));
  
    return (
      <ResponsiveBar
        data={data}
        keys={["count"]}
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
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Violations by Province and District"
        barAriaLabel={(e) =>
          `${e.id}: ${e.formattedValue} violations in Province ${e.indexValue}`
        }
      />
    );
  }